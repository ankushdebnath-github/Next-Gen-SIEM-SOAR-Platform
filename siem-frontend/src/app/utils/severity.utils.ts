import { Severity } from '../models/threat-event.model';

/**
 * Returns the CSS hex colour associated with a severity level.
 * Used for Leaflet polyline stroke colours and badge tints.
 */
export function severityColor(severity: Severity): string {
  switch (severity) {
    case 'Critical': return '#ef4444';
    case 'High':     return '#f97316';
    case 'Medium':   return '#f59e0b';
    case 'Low':      return '#22c55e';
    default:         return '#7ba7cc';
  }
}

/**
 * Returns the CSS class name for the severity badge span.
 */
export function severityBadgeClass(severity: Severity): string {
  return `badge badge-${severity.toLowerCase()}`;
}

/**
 * Returns the Leaflet polyline weight (thickness in px) for a severity.
 */
export function severityWeight(severity: Severity): number {
  switch (severity) {
    case 'Critical': return 2.5;
    case 'High':     return 2.0;
    case 'Medium':   return 1.5;
    case 'Low':      return 1.0;
    default:         return 1.0;
  }
}

/**
 * Returns a rgba string with reduced opacity — used for the arc glow layer.
 */
export function severityGlow(severity: Severity, alpha = 0.25): string {
  const hex = severityColor(severity);
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
