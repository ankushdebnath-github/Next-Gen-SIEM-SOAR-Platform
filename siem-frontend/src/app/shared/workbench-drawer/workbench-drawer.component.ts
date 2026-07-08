import {
  Component, Input, Output, EventEmitter, OnChanges,
  SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable }   from 'rxjs';

import { OsintService }               from '../../services/osint.service';
import { OsintGraphComponent }        from '../osint-graph/osint-graph.component';
import { NodeDetailCardComponent }    from '../node-detail-card/node-detail-card.component';
import { AttackMapComponent }         from '../attack-map/attack-map.component';
import { OsintResponse, GraphNode }   from '../../models/osint.model';
import { ThreatEvent }                from '../../models/threat-event.model';

export type DrawerTab = 'graph' | 'vt' | 'shodan' | 'attack';

@Component({
  selector:        'app-workbench-drawer',
  standalone:      true,
  imports:         [
    CommonModule,
    OsintGraphComponent,
    NodeDetailCardComponent,
    AttackMapComponent,
  ],
  templateUrl:     './workbench-drawer.component.html',
  styleUrls:       ['./workbench-drawer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkbenchDrawerComponent implements OnChanges {

  @Input()  ip:    string | null      = null;
  @Input()  event: ThreatEvent | null = null;
  @Output() drawerClosed = new EventEmitter<void>();

  readonly data$:    Observable<OsintResponse | null>;
  readonly loading$: Observable<boolean>;
  readonly error$:   Observable<string | null>;

  selectedNode:  GraphNode | null = null;
  activeTab:     DrawerTab        = 'attack';

  constructor(
    private osintService: OsintService,
    private cdr: ChangeDetectorRef,
  ) {
    this.data$    = this.osintService.data$;
    this.loading$ = this.osintService.loading$;
    this.error$   = this.osintService.error$;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ip'] && this.ip) {
      this.selectedNode = null;
      this.activeTab    = 'attack';
      this.osintService.fetchForIp(this.ip).subscribe();
    }
  }

  onNodeSelected(node: GraphNode): void {
    this.selectedNode = node;
    this.cdr.markForCheck();
  }

  retry(): void {
    if (this.ip) this.osintService.fetchForIp(this.ip).subscribe();
  }

  closeDrawer(): void {
    this.osintService.clear();
    this.drawerClosed.emit();
  }

  // ── Template helpers ────────────────────────────────────────────────────

  severityColor(sev: string): string {
    switch (sev?.toLowerCase()) {
      case 'critical': return '#ef4444';
      case 'high':     return '#f97316';
      case 'medium':   return '#f59e0b';
      case 'low':      return '#22c55e';
      default:         return '#7ba7cc';
    }
  }

  severityBg(sev: string): string {
    switch (sev?.toLowerCase()) {
      case 'critical': return 'rgba(239,68,68,0.12)';
      case 'high':     return 'rgba(249,115,22,0.12)';
      case 'medium':   return 'rgba(245,158,11,0.12)';
      case 'low':      return 'rgba(34,197,94,0.12)';
      default:         return 'rgba(123,167,204,0.08)';
    }
  }

  /** Computes port distribution data for the bar chart. */
  portChartBars(data: OsintResponse): Array<{ label: string; value: number; pct: number; color: string }> {
    const ports = data?.shodan?.open_ports ?? [];
    if (!ports.length) return [];

    const SERVICE_COLORS: Record<string, string> = {
      SSH:     '#00bcd4',
      HTTP:    '#4caf50',
      HTTPS:   '#2196f3',
      FTP:     '#ff9800',
      MySQL:   '#9c27b0',
      Redis:   '#f44336',
      SMB:     '#e91e63',
      RDP:     '#ff5722',
      DNS:     '#00acc1',
    };

    const max = Math.max(...ports.map(p => p.port), 1);
    return ports.map(p => ({
      label: p.service ? `${p.port}/${p.service}` : `${p.port}/${p.protocol}`,
      value: p.port,
      pct:   Math.max(20, Math.round((p.port / max) * 100)),
      color: SERVICE_COLORS[p.service ?? ''] ?? '#00d4ff',
    }));
  }

  formatTimestamp(iso: string): string {
    return new Date(iso).toLocaleString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false,
    });
  }

  // ── SVG Chart helpers ───────────────────────────────────────────────────

  /**
   * Builds SVG arc-path segments for the VT donut chart.
   * Returns an array of { path, color, label, count } slices.
   */
  vtDonutSlices(data: OsintResponse): Array<{
    path: string; color: string; label: string; count: number; pct: number;
  }> {
    const stats = data?.virustotal?.last_analysis_stats;
    if (!stats) return [];

    const segments = [
      { label: 'Malicious',  count: stats.malicious  ?? 0, color: '#ef4444' },
      { label: 'Suspicious', count: stats.suspicious ?? 0, color: '#f59e0b' },
      { label: 'Harmless',   count: stats.harmless   ?? 0, color: '#22c55e' },
      { label: 'Undetected', count: stats.undetected ?? 0, color: '#334e68' },
    ];

    const total = segments.reduce((s, x) => s + x.count, 0) || 1;
    const cx = 80, cy = 80, R = 58, r = 34;   // outer/inner radii

    let angle = -Math.PI / 2;   // start at 12 o'clock
    const result: Array<{ path: string; color: string; label: string; count: number; pct: number }> = [];

    segments.forEach(seg => {
      if (seg.count === 0) return;
      const slice = (seg.count / total) * 2 * Math.PI;
      const pct   = Math.round((seg.count / total) * 100);

      const x1 = cx + R * Math.cos(angle);
      const y1 = cy + R * Math.sin(angle);
      const x2 = cx + R * Math.cos(angle + slice);
      const y2 = cy + R * Math.sin(angle + slice);
      const ix1 = cx + r * Math.cos(angle + slice);
      const iy1 = cy + r * Math.sin(angle + slice);
      const ix2 = cx + r * Math.cos(angle);
      const iy2 = cy + r * Math.sin(angle);
      const large = slice > Math.PI ? 1 : 0;

      const path = [
        `M ${x1} ${y1}`,
        `A ${R} ${R} 0 ${large} 1 ${x2} ${y2}`,
        `L ${ix1} ${iy1}`,
        `A ${r} ${r} 0 ${large} 0 ${ix2} ${iy2}`,
        'Z',
      ].join(' ');

      result.push({ path, color: seg.color, label: seg.label, count: seg.count, pct });
      angle += slice;
    });

    return result;
  }

  /** Total VT engines analysed (for donut centre label). */
  vtTotal(data: OsintResponse): number {
    const s = data?.virustotal?.last_analysis_stats;
    if (!s) return 0;
    return (s.malicious ?? 0) + (s.suspicious ?? 0) + (s.harmless ?? 0) + (s.undetected ?? 0);
  }

  /**
   * Returns the SVG path for the risk-score gauge arc.
   * The gauge is a 180° semicircle; the fill arc covers (score/100) × 180°.
   */
  gaugeArcPath(score: number, filled: boolean): string {
    // semicircle from 180° to 0° (left to right), centre 90,70, radius 60
    const cx = 90, cy = 70, R = 60;
    const startAngle = Math.PI;                          // leftmost point
    const endAngle   = filled
      ? Math.PI - (score / 100) * Math.PI               // filled portion
      : 0;                                               // full track

    const x1 = cx + R * Math.cos(startAngle);
    const y1 = cy + R * Math.sin(startAngle);
    const x2 = cx + R * Math.cos(endAngle);
    const y2 = cy + R * Math.sin(endAngle);
    const large = filled ? ((score / 100) > 0.5 ? 1 : 0) : 1;
    const sweep  = filled ? 0 : 1;

    return `M ${x1} ${y1} A ${R} ${R} 0 ${large} ${sweep} ${x2} ${y2}`;
  }

  /** Needle tip coords for the risk gauge. */
  gaugeNeedle(score: number): { x2: number; y2: number } {
    const cx = 90, cy = 70, len = 52;
    const angle = Math.PI - (score / 100) * Math.PI;
    return {
      x2: cx + len * Math.cos(angle),
      y2: cy + len * Math.sin(angle),
    };
  }

  gaugeColor(score: number): string {
    if (score >= 80) return '#ef4444';
    if (score >= 60) return '#f97316';
    if (score >= 40) return '#f59e0b';
    if (score >= 20) return '#22c55e';
    return '#334e68';
  }

  /**
   * Horizontal bar chart data for open ports — used in the attack panel charts row.
   * Bars represent CVE exposure weight: ports with CVEs get a red fill, clean ports cyan.
   */
  attackPortBars(data: OsintResponse): Array<{
    label: string; cveCount: number; pct: number; color: string;
  }> {
    const ports = data?.shodan?.open_ports ?? [];
    if (!ports.length) return [];
    // Normalise by port number so bars have variable width (more visual interest)
    const max = Math.max(...ports.map(p => p.port), 1);
    return ports.map(p => ({
      label:    `${p.port}${p.service ? '/' + p.service : ''}`,
      cveCount: p.cves?.length ?? 0,
      pct:      Math.max(15, Math.round((p.port / max) * 100)),
      color:    (p.cves?.length ?? 0) > 0 ? '#ef4444' : '#00bcd4',
    }));
  }
}
