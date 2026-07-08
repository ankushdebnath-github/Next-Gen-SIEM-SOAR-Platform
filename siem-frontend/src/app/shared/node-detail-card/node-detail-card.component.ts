import {
  Component, Input, Output, EventEmitter,
  ChangeDetectionStrategy, OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphNode }    from '../../models/osint.model';

const NODE_LABELS: Record<string, string> = {
  ip:     '⬡  IP Address',
  vt:     '🛡  VirusTotal',
  engine: '⚠  AV Engine',
  shodan: '📡  Shodan',
  asn:    '🌐  ASN',
  port:   '🔌  Open Port',
};

@Component({
  selector:        'app-node-detail-card',
  standalone:      true,
  imports:         [CommonModule],
  templateUrl:     './node-detail-card.component.html',
  styleUrls:       ['./node-detail-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeDetailCardComponent implements OnChanges {

  @Input()  node!:  GraphNode;
  @Output() closed = new EventEmitter<void>();

  /** Formatted JSON string shown in the pre block. */
  prettyJson = '';
  typeLabel  = '';

  /** Flat key-value rows for the summary table (top-level scalar fields). */
  summaryRows: Array<{ key: string; value: string; highlight: boolean }> = [];

  ngOnChanges(): void {
    if (!this.node) return;

    this.typeLabel  = NODE_LABELS[this.node.type] ?? this.node.type;
    this.prettyJson = JSON.stringify(this.node.data, null, 2);

    // Build a concise summary of scalar fields only
    this.summaryRows = Object.entries(this.node.data)
      .filter(([, v]) => v !== null && v !== undefined && !Array.isArray(v) && typeof v !== 'object')
      .map(([key, value]) => ({
        key,
        value:     String(value),
        highlight: key === 'result' || key === 'category' || key === 'risk_level'
                   || key === 'risk_score' || key === 'service' || key === 'version',
      }));
  }

  /** Returns CSS class for a summary value cell based on its content. */
  valueClass(row: { key: string; value: string }): string {
    if (row.key === 'category' || row.key === 'risk_level') {
      const v = row.value.toLowerCase();
      if (v === 'malicious' || v === 'critical') return 'val-critical';
      if (v === 'suspicious' || v === 'high')    return 'val-high';
      if (v === 'medium')                        return 'val-medium';
      if (v === 'low' || v === 'harmless')       return 'val-low';
    }
    return '';
  }

  arrayEntries(key: string): string[] {
    const v = this.node?.data?.[key];
    return Array.isArray(v) ? v.map(String) : [];
  }
}
