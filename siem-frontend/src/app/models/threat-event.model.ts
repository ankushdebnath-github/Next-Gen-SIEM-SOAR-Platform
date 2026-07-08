// ── ThreatEvent ───────────────────────────────────────────────────────────
// Mirrors the backend ThreatEvent Mongoose schema exactly so the Angular
// template can bind with full type-safety.

export type Severity = 'Low' | 'Medium' | 'High' | 'Critical';

export interface ThreatCoordinates {
  lat:  number;
  long: number;
}

export interface ThreatEvent {
  id:             string;
  source_ip:      string;
  target_ip:      string;
  source_country: string;
  target_country: string;
  coordinates:    ThreatCoordinates;   // source (attacker) coordinates
  attack_type:    string;
  severity:       Severity;
  description:    string;
  packet_count:   number;
  timestamp:      string;              // ISO string from JSON
}

// ── History payload from Socket.io 'history' event ───────────────────────
export interface ThreatHistoryPayload {
  count: number;
  data:  ThreatEvent[];
}

// ── OSINT result payload from Socket.io 'osint-result' event ─────────────
export interface OsintResult {
  threat_event_id:   string;
  source_ip:         string;
  enrichment_status: string;
  intel?: {
    risk_score:   number;
    risk_level:   string;
    vt_malicious: number;
    shodan_ports: number;
  };
}

// ── SOAR 'threat-mitigated' Socket.io event payload ───────────────────────
export interface ThreatMitigatedEvent {
  ip:              string;
  threat_event_id: string | null;
  mitigated_ids:   string[];
  mitigated_count: number;
  playbook:        string;
  executed_at:     string;
}
