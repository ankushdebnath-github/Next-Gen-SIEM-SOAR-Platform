import {
  Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SocketService } from '../../services/socket.service';
import { ThreatEvent }   from '../../models/threat-event.model';

interface StatsState {
  total:          number;
  critical:       number;
  high:           number;
  blocked:        number;
  topAttackType:  string;
  topCountry:     string;
  eventsPerMin:   number;
}

/** Recalc is expensive — only push to the DOM at most every 500 ms. */
const RECALC_INTERVAL_MS = 500;

@Component({
  selector:        'app-stats-strip',
  standalone:      true,
  imports:         [CommonModule],
  templateUrl:     './stats-strip.component.html',
  styleUrls:       ['./stats-strip.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsStripComponent implements OnInit, OnDestroy {

  stats: StatsState = {
    total: 0, critical: 0, high: 0, blocked: 0,
    topAttackType: '—', topCountry: '—', eventsPerMin: 0,
  };

  private attackTypeCounts = new Map<string, number>();
  private countryCounts    = new Map<string, number>();
  /** Rolling 60-second window — store timestamps as a ring buffer. */
  private recentTimestamps: number[] = [];
  private sub = new Subscription();

  /** Set to true when new events have arrived but recalc hasn't run yet. */
  private dirty = false;
  private recalcTimer!: ReturnType<typeof setInterval>;

  constructor(
    private socketService: SocketService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // Periodic flush: only update the DOM when data has actually changed.
    this.recalcTimer = setInterval(() => {
      if (this.dirty) {
        this.dirty = false;
        this.recalc();
        this.cdr.markForCheck();
      }
    }, RECALC_INTERVAL_MS);

    this.sub.add(
      this.socketService.onHistory().subscribe(({ data }) => {
        data.forEach(e => this.ingest(e));
        this.dirty = false;
        this.recalc();
        this.cdr.markForCheck();
      })
    );

    this.sub.add(
      this.socketService.onLiveThreat().subscribe(e => {
        this.ingest(e);
        this.dirty = true;   // defer DOM update to the recalc interval
      })
    );

    this.sub.add(
      this.socketService.onThreatMitigated().subscribe(evt => {
        this.stats = { ...this.stats, blocked: this.stats.blocked + evt.mitigated_count };
        this.cdr.markForCheck();
      })
    );
  }

  private ingest(e: ThreatEvent): void {
    this.stats.total++;
    if (e.severity === 'Critical') this.stats.critical++;
    if (e.severity === 'High')     this.stats.high++;

    this.attackTypeCounts.set(e.attack_type, (this.attackTypeCounts.get(e.attack_type) ?? 0) + 1);
    this.countryCounts.set(e.source_country, (this.countryCounts.get(e.source_country) ?? 0) + 1);

    const now    = Date.now();
    const cutoff = now - 60_000;
    this.recentTimestamps.push(now);
    // Prune from the front only — avoids filter() allocation on every event
    while (this.recentTimestamps.length > 0 && this.recentTimestamps[0] < cutoff) {
      this.recentTimestamps.shift();
    }
  }

  private recalc(): void {
    let maxAt = 0, maxC = 0;
    let topType = this.stats.topAttackType, topCountry = this.stats.topCountry;

    this.attackTypeCounts.forEach((v, k) => { if (v > maxAt) { maxAt = v; topType = k; } });
    this.countryCounts.forEach((v, k)    => { if (v > maxC)  { maxC  = v; topCountry = k; } });

    this.stats = {
      ...this.stats,
      topAttackType: topType,
      topCountry,
      eventsPerMin: this.recentTimestamps.length,
    };
  }

  ngOnDestroy(): void {
    clearInterval(this.recalcTimer);
    this.sub.unsubscribe();
  }
}
