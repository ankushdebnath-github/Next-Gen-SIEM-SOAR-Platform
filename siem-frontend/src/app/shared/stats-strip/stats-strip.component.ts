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
  private recentTimestamps: number[] = [];
  private sub = new Subscription();

  constructor(
    private socketService: SocketService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.sub.add(
      this.socketService.onHistory().subscribe(({ data }) => {
        data.forEach(e => this.ingest(e));
        this.recalc();
        this.cdr.markForCheck();
      })
    );

    this.sub.add(
      this.socketService.onLiveThreat().subscribe(e => {
        this.ingest(e);
        this.recalc();
        this.cdr.markForCheck();
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

    this.recentTimestamps.push(Date.now());
    const cutoff = Date.now() - 60_000;
    this.recentTimestamps = this.recentTimestamps.filter(t => t > cutoff);
  }

  private recalc(): void {
    // Top attack type
    let maxAt = 0;
    this.attackTypeCounts.forEach((v, k) => { if (v > maxAt) { maxAt = v; this.stats.topAttackType = k; } });

    // Top source country
    let maxC = 0;
    this.countryCounts.forEach((v, k) => { if (v > maxC) { maxC = v; this.stats.topCountry = k; } });

    this.stats.eventsPerMin = this.recentTimestamps.length;
  }

  ngOnDestroy(): void { this.sub.unsubscribe(); }
}
