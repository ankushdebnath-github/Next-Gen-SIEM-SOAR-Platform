import {
  Component, OnInit, OnDestroy, ChangeDetectionStrategy,
  ChangeDetectorRef, TrackByFunction, Output, EventEmitter,
} from '@angular/core';
import { CommonModule }       from '@angular/common';
import { Subscription }       from 'rxjs';
import { SocketService }      from '../../services/socket.service';
import { ThreatEvent }        from '../../models/threat-event.model';
import { severityBadgeClass } from '../../utils/severity.utils';

const MAX_ROWS         = 200;
const NEW_ROW_CLASS_MS = 1300;

@Component({
  selector:        'app-triage-queue',
  standalone:      true,
  imports:         [CommonModule],
  templateUrl:     './triage-queue.component.html',
  styleUrls:       ['./triage-queue.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TriageQueueComponent implements OnInit, OnDestroy {

  threats:      ThreatEvent[] = [];
  newRowIds     = new Set<string>();
  activeFilter  = '';
  counts        = { Low: 0, Medium: 0, High: 0, Critical: 0, Total: 0 };
  selectedId:   string | null = null;

  /** IP → risk_level cache from OSINT results */
  ipReputations = new Map<string, string>();

  @Output() rowClick = new EventEmitter<ThreatEvent>();

  readonly severityBadgeClass = severityBadgeClass;
  readonly trackById: TrackByFunction<ThreatEvent> = (_, item) => item.id;

  private sub = new Subscription();

  constructor(
    private socketService: SocketService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // Hydrate on connect
    this.sub.add(
      this.socketService.onHistory().subscribe(({ data }) => {
        data.forEach((e) => this.addRow(e, false));
        this.cdr.markForCheck();
      })
    );

    // Live stream
    this.sub.add(
      this.socketService.onLiveThreat().subscribe((e) => {
        this.addRow(e, true);
        this.cdr.markForCheck();
      })
    );

    // Cache OSINT reputation results for badge display
    this.sub.add(
      this.socketService.onOsintResult().subscribe((result) => {
        if (result.intel?.risk_level) {
          this.ipReputations.set(result.source_ip, result.intel.risk_level);
          this.cdr.markForCheck();
        }
      })
    );

    // SOAR: when a Block-IP playbook fires, remove every row whose
    // source_ip matches the mitigated IP from the triage queue instantly.
    this.sub.add(
      this.socketService.onThreatMitigated().subscribe((evt) => {
        const idSet = new Set(evt.mitigated_ids.map(String));
        const before = this.threats.length;

        this.threats = this.threats.filter((t) => {
          const isTargeted = t.source_ip === evt.ip || idSet.has(String(t.id));
          if (isTargeted && t.severity in this.counts) {
            (this.counts as Record<string, number>)[t.severity]--;
            this.counts.Total--;
          }
          return !isTargeted;
        });

        const removed = before - this.threats.length;
        if (removed > 0) {
          console.log(`[TriageQueue] Removed ${removed} mitigated row(s) for IP ${evt.ip}`);
          // Clear selection if the selected row was just removed
          if (this.selectedId && idSet.has(this.selectedId)) {
            this.selectedId = null;
          }
          this.cdr.markForCheck();
        }
      })
    );
  }

  // ── Row management ─────────────────────────────────────────────────────

  private addRow(evt: ThreatEvent, animate: boolean): void {
    this.threats.unshift(evt);
    this.counts.Total++;
    if (evt.severity in this.counts) {
      (this.counts as Record<string, number>)[evt.severity]++;
    }
    if (this.threats.length > MAX_ROWS) {
      const removed = this.threats.splice(MAX_ROWS);
      removed.forEach((r) => {
        if (r.severity in this.counts) {
          (this.counts as Record<string, number>)[r.severity]--;
          this.counts.Total--;
        }
      });
    }
    if (animate && evt.id) {
      this.newRowIds.add(evt.id);
      setTimeout(() => {
        this.newRowIds.delete(evt.id);
        this.cdr.markForCheck();
      }, NEW_ROW_CLASS_MS);
    }
  }

  // ── Selection ──────────────────────────────────────────────────────────

  selectRow(evt: ThreatEvent): void {
    this.selectedId = evt.id;
    this.rowClick.emit(evt);
    this.cdr.markForCheck();
  }

  // ── Filtering ──────────────────────────────────────────────────────────

  setFilter(s: string): void {
    this.activeFilter = this.activeFilter === s ? '' : s;
    this.cdr.markForCheck();
  }

  get filteredThreats(): ThreatEvent[] {
    return this.activeFilter
      ? this.threats.filter((t) => t.severity === this.activeFilter)
      : this.threats;
  }

  rowClass(evt: ThreatEvent): Record<string, boolean> {
    return {
      'row-new':      this.newRowIds.has(evt.id),
      'row-selected': this.selectedId === evt.id,
      [`row-${evt.severity.toLowerCase()}`]: true,
    };
  }

  getCount(sev: string): number {
    return (this.counts as Record<string, number>)[sev] ?? 0;
  }

  formatTime(iso: string): string {
    return new Date(iso).toLocaleTimeString('en-GB', { hour12: false });
  }

  /** Returns CSS class for the reputation dot next to each source IP. */
  reputationDotClass(ip: string): string {
    const level = this.ipReputations.get(ip);
    if (!level) return 'rep-dot rep-unknown';
    const l = level.toLowerCase();
    if (l === 'critical' || l === 'high') return 'rep-dot rep-danger';
    if (l === 'medium')                   return 'rep-dot rep-warn';
    if (l === 'low' || l === 'none')      return 'rep-dot rep-safe';
    return 'rep-dot rep-unknown';
  }

  ngOnDestroy(): void { this.sub.unsubscribe(); }
}
