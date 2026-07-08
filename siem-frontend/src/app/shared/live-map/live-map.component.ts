import {
  Component, OnInit, OnDestroy, AfterViewInit,
  ElementRef, ViewChild, NgZone, ChangeDetectionStrategy,
  ChangeDetectorRef, Input, OnChanges, SimpleChanges,
} from '@angular/core';
import { CommonModule }    from '@angular/common';
import * as L              from 'leaflet';
import { Subscription }    from 'rxjs';

import { SocketService }   from '../../services/socket.service';
import { ThreatEvent }     from '../../models/threat-event.model';
import {
  severityColor, severityWeight, severityGlow,
} from '../../utils/severity.utils';

/** One entry in the active-arc registry — arc + glow + cleanup timer. */
interface ActiveArc {
  arc:      L.Polyline;
  glow:     L.Polyline;
  timer:    ReturnType<typeof setTimeout>;
  sourceIp: string;           // ← NEW: IP that generated this arc
}

/** One time-bucket in the sparkline (1 bucket = 5 s). */
interface SparkBucket {
  time:  number;   // epoch ms (start of bucket)
  count: number;
}

/** Duration (ms) before an arc fades and is removed from the map. */
const ARC_TTL_MS = 5000;

/** Max concurrent arcs before the oldest is force-evicted. */
const MAX_ARCS = 120;

/** Number of intermediate points that shape the curved arc. */
const ARC_SEGMENTS = 80;

/** Sparkline: keep up to 60 buckets × 5 s = 5 minutes of history. */
const SPARK_BUCKET_MS  = 5_000;
const SPARK_MAX_BUCKETS = 60;

/**
 * Country name → centroid lookup table.
 * Must match the backend COUNTRIES table exactly so arcs draw to correct
 * geographic locations. Fixes the "wrong country path" bug.
 */
const COUNTRY_CENTROIDS: Record<string, { lat: number; long: number }> = {
  'China':          { lat:  35.8617,  long: 104.1954 },
  'Russia':         { lat:  61.5240,  long: 105.3188 },
  'United States':  { lat:  37.0902,  long:  -95.7129 },
  'Brazil':         { lat: -14.2350,  long:  -51.9253 },
  'Germany':        { lat:  51.1657,  long:   10.4515 },
  'India':          { lat:  20.5937,  long:   78.9629 },
  'North Korea':    { lat:  40.3399,  long:  127.5101 },
  'Iran':           { lat:  32.4279,  long:   53.6880 },
  'United Kingdom': { lat:  55.3781,  long:   -3.4360 },
  'France':         { lat:  46.2276,  long:    2.2137 },
  'Japan':          { lat:  36.2048,  long:  138.2529 },
  'Australia':      { lat: -25.2744,  long:  133.7751 },
  'Canada':         { lat:  56.1304,  long:  -106.3468 },
  'South Korea':    { lat:  35.9078,  long:  127.7669 },
  'Netherlands':    { lat:  52.1326,  long:    5.2913 },
  'Ukraine':        { lat:  48.3794,  long:   31.1656 },
  'Nigeria':        { lat:   9.0820,  long:    8.6753 },
  'Pakistan':       { lat:  30.3753,  long:   69.3451 },
  'Turkey':         { lat:  38.9637,  long:   35.2433 },
  'Mexico':         { lat:  23.6345,  long: -102.5528 },
};

@Component({
  selector:        'app-live-map',
  standalone:      true,
  imports:         [CommonModule],
  templateUrl:     './live-map.component.html',
  styleUrls:       ['./live-map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveMapComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @ViewChild('mapContainer', { static: true })
  private mapContainer!: ElementRef<HTMLDivElement>;

  @ViewChild('sparkCanvas', { static: false })
  private sparkCanvas!: ElementRef<HTMLCanvasElement>;

  /**
   * When set, the map dims all arcs NOT from this IP
   * and the sparkline panel shows timeline for this IP.
   * null = show everything normally.
   */
  @Input() selectedIp: string | null = null;

  private map!: L.Map;
  private arcLayer!: L.LayerGroup;

  /** Registry: arcId → { arc, glow, timer, sourceIp } */
  private activeArcs = new Map<string, ActiveArc>();

  /**
   * Per-IP sparkline data: ip → list of time buckets.
   * Each bucket covers SPARK_BUCKET_MS milliseconds.
   */
  private ipSparkData = new Map<string, SparkBucket[]>();

  private subscription = new Subscription();

  // Stats visible in template
  totalArcs    = 0;
  eventsPerSec = 0;
  isFullscreen = false;
  /** Total events recorded for the selected IP (shown in sparkline panel). */
  selectedIpCount = 0;

  private eventCount   = 0;
  private statsTimer!: ReturnType<typeof setInterval>;

  /** Pending CD update from drawArc — batched so zone.run fires at most once per rAF. */
  private cdPending = false;

  /** All arcs currently fading out — stepped by the single shared rAF loop. */
  private fadingArcs = new Map<string, {
    glow: L.Polyline; arc: L.Polyline; dot: L.CircleMarker;
    arcId: string; opacity: number;
  }>();
  /** Single shared rAF handle for the fade loop — null when nothing is fading. */
  private fadeRafHandle: number | null = null;

  constructor(
    private socketService: SocketService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // Track events/sec counter outside Angular zone to avoid CD overhead
    this.ngZone.runOutsideAngular(() => {
      this.statsTimer = setInterval(() => {
        this.ngZone.run(() => {
          this.eventsPerSec = this.eventCount;
          this.eventCount   = 0;
        });
      }, 1000);
    });
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initMap();
      this.bindSocketEvents();
    });
  }

  // ── Input change: react when selectedIp is set/cleared by the parent ──

  ngOnChanges(changes: SimpleChanges): void {
    if ('selectedIp' in changes) {
      this.ngZone.runOutsideAngular(() => this.applyIpFilter());
      this.updateSparklinePanel();
    }
  }

  /**
   * Dims all arcs that don't belong to selectedIp.
   * When selectedIp is null, restores all arcs to full opacity.
   */
  private applyIpFilter(): void {
    const ip = this.selectedIp;
    this.activeArcs.forEach((entry) => {
      const isMatch = !ip || entry.sourceIp === ip;
      entry.arc.setStyle({
        opacity:     isMatch ? 1.0 : 0.08,
      });
      entry.glow.setStyle({
        opacity:     isMatch ? 0.6 : 0.03,
      });
    });
  }

  /** Rebuilds the selectedIpCount and redraws the sparkline canvas. */
  private updateSparklinePanel(): void {
    const ip = this.selectedIp;
    if (!ip) {
      this.selectedIpCount = 0;
      this.cdr.markForCheck();
      return;
    }
    const buckets = this.ipSparkData.get(ip) ?? [];
    this.selectedIpCount = buckets.reduce((s, b) => s + b.count, 0);
    this.cdr.markForCheck();

    // Draw after CD flushes so sparkCanvas ref is live
    setTimeout(() => this.drawSparkline(ip), 0);
  }

  /** Draws a bar-sparkline on the canvas for the given IP. */
  private drawSparkline(ip: string): void {
    const canvasEl = this.sparkCanvas?.nativeElement;
    if (!canvasEl) return;

    const ctx   = canvasEl.getContext('2d');
    if (!ctx) return;

    const W = canvasEl.offsetWidth  || canvasEl.width  || 320;
    const H = canvasEl.offsetHeight || canvasEl.height || 60;
    canvasEl.width  = W;
    canvasEl.height = H;

    ctx.clearRect(0, 0, W, H);

    const buckets = this.ipSparkData.get(ip) ?? [];
    if (buckets.length === 0) {
      // Nothing to draw yet
      ctx.fillStyle = 'rgba(0,212,255,0.3)';
      ctx.font = '10px monospace';
      ctx.fillText('No data yet', 8, H / 2 + 4);
      return;
    }

    const maxCount = Math.max(...buckets.map(b => b.count), 1);
    const barW     = Math.max(2, Math.floor((W - 2) / SPARK_MAX_BUCKETS) - 1);
    const gap      = 1;

    buckets.forEach((bucket, i) => {
      const barH  = Math.max(2, Math.round((bucket.count / maxCount) * (H - 6)));
      const x     = 1 + i * (barW + gap);
      const y     = H - barH - 2;

      // Gradient bar
      const grad = ctx.createLinearGradient(x, y, x, H);
      grad.addColorStop(0, 'rgba(0,212,255,0.9)');
      grad.addColorStop(1, 'rgba(0,212,255,0.2)');
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, barW, barH);
    });

    // Axis line
    ctx.strokeStyle = 'rgba(0,212,255,0.2)';
    ctx.lineWidth   = 1;
    ctx.beginPath();
    ctx.moveTo(0, H - 2);
    ctx.lineTo(W, H - 2);
    ctx.stroke();
  }

  // ── Map initialisation ─────────────────────────────────────────────────

  private initMap(): void {
    this.map = L.map(this.mapContainer.nativeElement, {
      center:          [20, 10],
      zoom:            2,
      minZoom:         2,
      maxZoom:         6,
      zoomControl:     true,
      attributionControl: false,
      worldCopyJump:   true,
    });

    // Dark tile layer — uses dark_all which shows continent outlines clearly.
    // noWrap: false is intentional (allows panning past antimeridian).
    // The horizontal red/pink line seen before was from SVG renderer stroke
    // artifacts; using Canvas renderer + renderer option fixes it.
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      { subdomains: 'abcd', maxZoom: 19, noWrap: false }
    ).addTo(this.map);

    // Dedicated layer group for arcs so we can clear them independently
    this.arcLayer = L.layerGroup().addTo(this.map);
  }

  // ── Socket event binding ───────────────────────────────────────────────

  private bindSocketEvents(): void {
    // Hydrate map with last 50 events on connect
    this.subscription.add(
      this.socketService.onHistory().subscribe(({ data }) => {
        data.forEach((evt) => this.drawArc(evt));
      })
    );

    // Draw each live threat arc
    this.subscription.add(
      this.socketService.onLiveThreat().subscribe((evt) => {
        this.drawArc(evt);
        this.eventCount++;
      })
    );
  }

  // ── Arc drawing ────────────────────────────────────────────────────────

  /**
   * Draws a curved arc from source → target on the Leaflet map.
   *
   * Arc shape: We interpolate ARC_SEGMENTS points along a great-circle path.
   * Leaflet handles geodesic rendering correctly, so we don't need to manually
   * split at the antimeridian or add artificial bulge.
   *
   * Two polylines are drawn for each arc:
   *   1. A thick, low-opacity "glow" line for the bloom effect.
   *   2. A thin, opaque "core" line for the sharp leading edge.
   *
   * Both are removed after ARC_TTL_MS via opacity animation + cleanup.
   */
  private drawArc(event: ThreatEvent): void {
    const src = event.coordinates;
    const tgt = this.deriveTargetCoords(event);

    if (!src || !tgt) return;

    const color  = severityColor(event.severity);
    const weight = severityWeight(event.severity);
    const glow   = severityGlow(event.severity, 0.35);
    const arcId  = `${event.id ?? Date.now()}-${Math.random()}`;

    // ── Sparkline bucket recording ─────────────────────────────────────
    this.recordSparkBucket(event.source_ip);

    const points = this.greatCirclePoints(
      [src.lat, src.long],
      [tgt.lat, tgt.long],
    );

    // Determine opacity based on current IP filter
    const isHighlighted = !this.selectedIp || event.source_ip === this.selectedIp;
    const arcOpacity  = isHighlighted ? 1.0  : 0.08;
    const glowOpacity = isHighlighted ? 0.6  : 0.03;

    // Glow layer (wide, translucent)
    const glowLine = L.polyline(points, {
      color:   glow,
      weight:  weight * 6,
      opacity: glowOpacity,
      smoothFactor: 1,
      interactive: false,
    }).addTo(this.arcLayer);

    // Core arc (narrow, fully opaque)
    const arcLine = L.polyline(points, {
      color,
      weight:  weight,
      opacity: arcOpacity,
      smoothFactor: 1,
      interactive: false,
      dashArray: event.severity === 'Critical' ? '6 3' : undefined,
    }).addTo(this.arcLayer);

    // Animated dot at the source origin
    const dot = L.circleMarker([src.lat, src.long], {
      radius:      event.severity === 'Critical' ? 5 : 3,
      color,
      fillColor:   color,
      fillOpacity: isHighlighted ? 0.9 : 0.08,
      weight:      1,
      interactive: false,
    }).addTo(this.arcLayer);

    // Evict oldest arc if we're over the limit
    if (this.activeArcs.size >= MAX_ARCS) {
      const oldestId = this.activeArcs.keys().next().value;
      if (oldestId) this.removeArc(oldestId);
    }

    // Schedule fade + removal after TTL
    const timer = setTimeout(() => {
      this.fadeAndRemove(glowLine, arcLine, dot, arcId);
    }, ARC_TTL_MS - 600);

    this.activeArcs.set(arcId, { arc: arcLine, glow: glowLine, timer, sourceIp: event.source_ip });

    // Batch Angular CD updates — only enter the zone once per rAF frame
    if (!this.cdPending) {
      this.cdPending = true;
      requestAnimationFrame(() => {
        this.cdPending = false;
        this.ngZone.run(() => {
          this.totalArcs = this.activeArcs.size;
          if (this.selectedIp === event.source_ip) {
            this.updateSparklinePanel();
          }
        });
      });
    }
  }

  /**
   * Records a count increment into the correct time bucket for this IP.
   * Prunes buckets older than SPARK_MAX_BUCKETS * SPARK_BUCKET_MS.
   */
  private recordSparkBucket(ip: string): void {
    const now        = Date.now();
    const bucketTime = now - (now % SPARK_BUCKET_MS); // floor to bucket start
    let buckets = this.ipSparkData.get(ip);
    if (!buckets) {
      buckets = [];
      this.ipSparkData.set(ip, buckets);
    }

    const last = buckets[buckets.length - 1];
    if (last && last.time === bucketTime) {
      last.count++;
    } else {
      buckets.push({ time: bucketTime, count: 1 });
    }

    // Prune old buckets
    const cutoff = now - SPARK_MAX_BUCKETS * SPARK_BUCKET_MS;
    while (buckets.length > 0 && buckets[0].time < cutoff) {
      buckets.shift();
    }
  }

  /** Gradually reduce opacity then remove all three layers. */
  private fadeAndRemove(
    glow: L.Polyline, arc: L.Polyline, dot: L.CircleMarker, arcId: string
  ): void {
    this.fadingArcs.set(arcId, { glow, arc, dot, arcId, opacity: 1.0 });
    if (this.fadeRafHandle === null) {
      this.fadeRafHandle = requestAnimationFrame(this._sharedFadeLoop);
    }
  }

  /**
   * Single rAF loop that steps ALL fading arcs forward in one pass per frame.
   * Replaces the previous pattern of one rAF chain per arc (up to 120 chains).
   */
  private _sharedFadeLoop = (): void => {
    if (this.fadingArcs.size === 0) {
      this.fadeRafHandle = null;
      return;
    }

    this.fadingArcs.forEach((entry, id) => {
      entry.opacity -= 0.12;
      if (entry.opacity <= 0) {
        // Fully faded — remove from map
        [entry.glow, entry.arc, entry.dot].forEach((l) => {
          try { this.arcLayer.removeLayer(l); } catch (_) {}
        });
        this.activeArcs.delete(id);
        this.fadingArcs.delete(id);
      } else {
        entry.arc.setStyle({ opacity: entry.opacity });
        entry.glow.setStyle({ opacity: entry.opacity * 0.6 });
        entry.dot.setStyle({ fillOpacity: entry.opacity, opacity: entry.opacity });
      }
    });

    // If any arcs were removed, update the zone counter (batched)
    if (!this.cdPending) {
      this.cdPending = true;
      requestAnimationFrame(() => {
        this.cdPending = false;
        this.ngZone.run(() => { this.totalArcs = this.activeArcs.size; });
      });
    }

    // Continue the loop only if there are still fading arcs
    if (this.fadingArcs.size > 0) {
      this.fadeRafHandle = requestAnimationFrame(this._sharedFadeLoop);
    } else {
      this.fadeRafHandle = null;
    }
  };

  /** Immediately remove an arc and cancel its timer (force eviction). */
  private removeArc(arcId: string): void {
    const entry = this.activeArcs.get(arcId);
    if (!entry) return;
    clearTimeout(entry.timer);
    this.arcLayer.removeLayer(entry.arc);
    this.arcLayer.removeLayer(entry.glow);
    this.activeArcs.delete(arcId);
  }

  // ── Great-circle interpolation ─────────────────────────────────────────

  /**
   * Returns an array of LatLng points forming a great-circle arc between
   * two geographic coordinates. A small vertical "bulge" is applied at the
   * midpoint to give the arc a curved appearance on the Mercator projection.
   *
   * @param from  [lat, lng]
   * @param to    [lat, lng]
   * @returns     L.LatLngExpression[] of ARC_SEGMENTS + 1 points
   */
  private greatCirclePoints(
    from: [number, number],
    to:   [number, number],
  ): L.LatLngExpression[] {
    const points: L.LatLngExpression[] = [];

    const [lat1, lng1] = from.map((d) => (d * Math.PI) / 180);
    const [lat2, lng2] = to.map((d)   => (d * Math.PI) / 180);

    // Angular distance between the two points
    const d = 2 * Math.asin(
      Math.sqrt(
        Math.sin((lat2 - lat1) / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin((lng2 - lng1) / 2) ** 2
      )
    );

    // Bulge factor — much smaller now, max 10° regardless of distance
    const bulge = Math.min(d * 0.15, 0.175); // radians, ~10° max

    for (let i = 0; i <= ARC_SEGMENTS; i++) {
      const f = i / ARC_SEGMENTS;

      if (d < 0.0001) {
        // Near-identical points: straight line
        points.push([
          from[0] + (to[0] - from[0]) * f,
          from[1] + (to[1] - from[1]) * f,
        ]);
        continue;
      }

      const A = Math.sin((1 - f) * d) / Math.sin(d);
      const B = Math.sin(f * d)       / Math.sin(d);

      const x = A * Math.cos(lat1) * Math.cos(lng1) + B * Math.cos(lat2) * Math.cos(lng2);
      const y = A * Math.cos(lat1) * Math.sin(lng1) + B * Math.cos(lat2) * Math.sin(lng2);
      const z = A * Math.sin(lat1)                  + B * Math.sin(lat2);

      let lat = Math.atan2(z, Math.sqrt(x * x + y * y));
      let lng = Math.atan2(y, x);

      // Apply bulge: lift midpoint latitude to create the arc curve
      // Use radians throughout to keep the math consistent
      const bulgeOffset = bulge * Math.sin(f * Math.PI);
      lat += bulgeOffset;

      // Clamp to valid lat/lng ranges and convert to degrees
      lat = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, lat)) * (180 / Math.PI);
      lng = lng * (180 / Math.PI);

      // Normalize longitude to -180...180
      while (lng > 180)  lng -= 360;
      while (lng < -180) lng += 360;

      points.push([lat, lng]);
    }

    return points;
  }

  /**
   * Derives a target coordinate from the ThreatEvent's target_country field.
   * Looks up the centroid from the COUNTRY_CENTROIDS table. If the country
   * is not found, falls back to a hash-based scatter (for unknown countries).
   */
  private deriveTargetCoords(event: ThreatEvent): { lat: number; long: number } {
    const centroid = COUNTRY_CENTROIDS[event.target_country];
    if (centroid) {
      // Add slight jitter (±1°) so multiple attacks to the same country don't stack
      const jitterLat  = (Math.random() - 0.5) * 2;
      const jitterLong = (Math.random() - 0.5) * 2;
      return {
        lat:  Math.max(-85, Math.min(85, centroid.lat + jitterLat)),
        long: Math.max(-180, Math.min(180, centroid.long + jitterLong)),
      };
    }
    // Fallback: hash of target_ip (for countries not in the lookup table)
    const hash = event.target_ip.split('.').reduce(
      (acc, octet, i) => acc + parseInt(octet, 10) * (i + 1) * 17, 0
    );
    return {
      lat:  ((hash * 7  % 170) - 85),
      long: ((hash * 13 % 360) - 180),
    };
  }

  // ── Fullscreen toggle ─────────────────────────────────────────────────

  toggleFullscreen(): void {
    this.isFullscreen = !this.isFullscreen;
    this.cdr.markForCheck();

    // Leaflet needs to know the container size changed
    setTimeout(() => {
      this.ngZone.runOutsideAngular(() => {
        this.map?.invalidateSize({ animate: false });
      });
    }, 280); // wait for CSS transition to finish
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    clearInterval(this.statsTimer);
    this.activeArcs.forEach((_, id) => this.removeArc(id));
    if (this.fadeRafHandle !== null) {
      cancelAnimationFrame(this.fadeRafHandle);
      this.fadeRafHandle = null;
    }
    if (this.map) this.map.remove();
  }
}
