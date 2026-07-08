import {
  Component, Input, AfterViewInit, OnChanges, OnDestroy,
  ElementRef, ViewChild, NgZone, SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

import { ThreatEvent } from '../../models/threat-event.model';
import { severityColor, severityWeight, severityGlow } from '../../utils/severity.utils';

const ARC_SEGMENTS = 80;

/**
 * Country centroid lookup table — identical to the backend and live-map.
 * Ensures arcs draw to the correct country locations.
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
  selector:        'app-attack-map',
  standalone:      true,
  imports:         [CommonModule],
  templateUrl:     './attack-map.component.html',
  styleUrls:       ['./attack-map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttackMapComponent implements AfterViewInit, OnChanges, OnDestroy {

  @Input() event: ThreatEvent | null = null;

  @ViewChild('mapEl', { static: true })
  private mapEl!: ElementRef<HTMLDivElement>;

  private map!:      L.Map;
  private arcLayer!: L.LayerGroup;
  private viewReady = false;

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => this.initMap());
    this.viewReady = true;
    if (this.event) {
      this.zone.runOutsideAngular(() => this.renderEvent());
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['event'] && this.viewReady) {
      this.zone.runOutsideAngular(() => {
        this.arcLayer?.clearLayers();
        if (this.event) this.renderEvent();
      });
    }
  }

  // ── Map bootstrap ────────────────────────────────────────────────────────

  private initMap(): void {
    this.map = L.map(this.mapEl.nativeElement, {
      center:             [20, 10],
      zoom:               2,
      minZoom:            1,
      maxZoom:            7,
      zoomControl:        true,
      attributionControl: false,
      worldCopyJump:      true,
    });

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      { subdomains: 'abcd', maxZoom: 19, noWrap: false }
    ).addTo(this.map);

    this.arcLayer = L.layerGroup().addTo(this.map);
  }

  // ── Render one arc for the current event ─────────────────────────────────

  private renderEvent(): void {
    const evt = this.event!;
    const src = evt.coordinates;
    const tgt = this.deriveTargetCoords(evt);

    if (!src) return;

    const color  = severityColor(evt.severity);
    const weight = severityWeight(evt.severity);
    const glow   = severityGlow(evt.severity, 0.4);

    const srcLatLng: L.LatLngExpression = [src.lat, src.long];
    const tgtLatLng: L.LatLngExpression = [tgt.lat, tgt.long];

    // ── Arc ────────────────────────────────────────────────────────────────
    const arcPts = this.greatCirclePoints([src.lat, src.long], [tgt.lat, tgt.long]);

    // Glow
    L.polyline(arcPts, {
      color: glow, weight: weight * 8, opacity: 0.5,
      smoothFactor: 1, interactive: false,
    }).addTo(this.arcLayer);

    // Core line
    L.polyline(arcPts, {
      color, weight: weight + 1, opacity: 1,
      smoothFactor: 1, interactive: false,
      dashArray: evt.severity === 'Critical' ? '8 4' : undefined,
    }).addTo(this.arcLayer);

    // ── Animated pulsing ring at source ────────────────────────────────────
    // Outer pulse ring (decorative — added as a DivIcon marker)
    const pulseIcon = L.divIcon({
      className: '',
      html: `<div class="atk-pulse-ring" style="--c:${color}"></div>`,
      iconSize:   [40, 40],
      iconAnchor: [20, 20],
    });
    L.marker(srcLatLng, { icon: pulseIcon, interactive: false, zIndexOffset: -10 })
      .addTo(this.arcLayer);

    // ── Source marker — red attacker pin ───────────────────────────────────
    const srcIcon = L.divIcon({
      className: '',
      html: `
        <div class="atk-marker atk-src" style="--c:${color}">
          <span class="atk-marker-dot"></span>
        </div>`,
      iconSize:   [16, 16],
      iconAnchor: [8, 8],
    });
    L.marker(srcLatLng, { icon: srcIcon, zIndexOffset: 100 })
      .bindPopup(this.srcPopup(evt, color), { maxWidth: 220, className: 'atk-popup' })
      .addTo(this.arcLayer);

    // ── Target marker — cyan target pin ───────────────────────────────────
    const tgtIcon = L.divIcon({
      className: '',
      html: `
        <div class="atk-marker atk-tgt">
          <span class="atk-marker-dot"></span>
        </div>`,
      iconSize:   [16, 16],
      iconAnchor: [8, 8],
    });
    L.marker(tgtLatLng, { icon: tgtIcon, zIndexOffset: 100 })
      .bindPopup(this.tgtPopup(evt), { maxWidth: 220, className: 'atk-popup' })
      .addTo(this.arcLayer);

    // ── Floating labels (DivIcon, non-interactive) ─────────────────────────
    const srcLabel = L.divIcon({
      className: '',
      html: `<div class="atk-label atk-label-src" style="--c:${color}">${evt.source_ip}<br><small>${evt.source_country}</small></div>`,
      iconSize:   [0, 0],
      iconAnchor: [-12, 20],
    });
    L.marker(srcLatLng, { icon: srcLabel, interactive: false, zIndexOffset: 200 })
      .addTo(this.arcLayer);

    const tgtLabel = L.divIcon({
      className: '',
      html: `<div class="atk-label atk-label-tgt">${evt.target_ip}<br><small>${evt.target_country}</small></div>`,
      iconSize:   [0, 0],
      iconAnchor: [-12, 20],
    });
    L.marker(tgtLatLng, { icon: tgtLabel, interactive: false, zIndexOffset: 200 })
      .addTo(this.arcLayer);

    // ── Fit bounds to both endpoints ───────────────────────────────────────
    const bounds = L.latLngBounds([srcLatLng, tgtLatLng]);
    setTimeout(() => {
      this.map.fitBounds(bounds, { padding: [48, 48], maxZoom: 5, animate: true });
    }, 80);
  }

  // ── Popup HTML helpers ────────────────────────────────────────────────────

  private srcPopup(evt: ThreatEvent, color: string): string {
    return `
      <div class="atk-popup-inner">
        <div class="atk-popup-title" style="color:${color}">⚔ ATTACKER</div>
        <div class="atk-popup-row"><b>IP</b><span>${evt.source_ip}</span></div>
        <div class="atk-popup-row"><b>Country</b><span>${evt.source_country}</span></div>
        <div class="atk-popup-row"><b>Attack</b><span>${evt.attack_type}</span></div>
        <div class="atk-popup-row"><b>Severity</b>
          <span style="color:${color};font-weight:700">${evt.severity}</span>
        </div>
        <div class="atk-popup-row"><b>Packets</b><span>${evt.packet_count.toLocaleString()}</span></div>
      </div>`;
  }

  private tgtPopup(evt: ThreatEvent): string {
    return `
      <div class="atk-popup-inner">
        <div class="atk-popup-title" style="color:#00d4ff">🎯 TARGET</div>
        <div class="atk-popup-row"><b>IP</b><span>${evt.target_ip}</span></div>
        <div class="atk-popup-row"><b>Country</b><span>${evt.target_country}</span></div>
        <div class="atk-popup-row"><b>Asset</b><span>Internal</span></div>
      </div>`;
  }

  // ── Great-circle interpolation (same as live-map) ─────────────────────────

  private greatCirclePoints(
    from: [number, number],
    to:   [number, number],
  ): L.LatLngExpression[] {
    const points: L.LatLngExpression[] = [];
    const [lat1, lng1] = from.map(d => (d * Math.PI) / 180);
    const [lat2, lng2] = to.map(d   => (d * Math.PI) / 180);

    const d = 2 * Math.asin(Math.sqrt(
      Math.sin((lat2 - lat1) / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin((lng2 - lng1) / 2) ** 2
    ));

    const bulge = Math.min(d * 0.5, 0.8);

    for (let i = 0; i <= ARC_SEGMENTS; i++) {
      const f = i / ARC_SEGMENTS;

      if (d < 0.0001) {
        points.push([from[0] + (to[0] - from[0]) * f, from[1] + (to[1] - from[1]) * f]);
        continue;
      }

      const A = Math.sin((1 - f) * d) / Math.sin(d);
      const B = Math.sin(f * d)       / Math.sin(d);

      const x = A * Math.cos(lat1) * Math.cos(lng1) + B * Math.cos(lat2) * Math.cos(lng2);
      const y = A * Math.cos(lat1) * Math.sin(lng1) + B * Math.cos(lat2) * Math.sin(lng2);
      const z = A * Math.sin(lat1)                  + B * Math.sin(lat2);

      let lat = (Math.atan2(z, Math.sqrt(x * x + y * y)) * 180) / Math.PI;
      const lng = (Math.atan2(y, x) * 180) / Math.PI;

      lat += bulge * Math.sin(f * Math.PI) * (180 / Math.PI);
      points.push([lat, lng]);
    }

    return points;
  }

  private deriveTargetCoords(evt: ThreatEvent): { lat: number; long: number } {
    const centroid = COUNTRY_CENTROIDS[evt.target_country];
    if (centroid) {
      const jitterLat  = (Math.random() - 0.5) * 2;
      const jitterLong = (Math.random() - 0.5) * 2;
      return {
        lat:  Math.max(-85, Math.min(85, centroid.lat + jitterLat)),
        long: Math.max(-180, Math.min(180, centroid.long + jitterLong)),
      };
    }
    const hash = evt.target_ip.split('.').reduce(
      (acc, oct, i) => acc + parseInt(oct, 10) * (i + 1) * 17, 0
    );
    return { lat: (hash * 7 % 170) - 85, long: (hash * 13 % 360) - 180 };
  }

  ngOnDestroy(): void {
    if (this.map) this.map.remove();
  }
}
