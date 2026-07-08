// ── Graph primitives ──────────────────────────────────────────────────────

export type NodeType = 'ip' | 'vt' | 'engine' | 'shodan' | 'asn' | 'port';

export interface GraphNode {
  id:    string;
  type:  NodeType;
  label: string;
  data:  Record<string, unknown>;
  // D3 simulation mutable fields (added at runtime)
  x?:  number;
  y?:  number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface GraphEdge {
  source: string | GraphNode;
  target: string | GraphNode;
  label:  string;
}

export interface OsintGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

// ── Sub-documents ─────────────────────────────────────────────────────────

export interface OsintMeta {
  risk_score:        number;
  risk_level:        'None' | 'Low' | 'Medium' | 'High' | 'Critical';
  enrichment_status: string;
  enriched_at:       string;
  created_at:        string;
}

export interface VTStats {
  malicious:  number;
  suspicious: number;
  harmless:   number;
  undetected: number;
  timeout:    number;
}

export interface VTEngineResult {
  engine_name: string;
  category:    string;
  result:      string | null;
  method:      string | null;
}

export interface VirusTotalData {
  reputation:          number;
  last_analysis_stats: VTStats;
  engine_results:      VTEngineResult[];
  country:             string;
  as_owner:            string;
  asn:                 number;
  network:             string;
  tags:                string[];
  last_analysis_date:  string;
}

export interface ShodanPort {
  port:     number;
  protocol: string;
  service:  string;
  banner:   string;
  product:  string;
  version:  string;
  cves:     string[];
}

export interface ShodanData {
  org:         string;
  isp:         string;
  asn:         string;
  os:          string | null;
  open_ports:  ShodanPort[];
  hostnames:   string[];
  tags:        string[];
  last_update: string;
  total_ports: number;
}

// ── Full API response ─────────────────────────────────────────────────────

export interface OsintResponse {
  ip:         string;
  meta:       OsintMeta;
  virustotal: VirusTotalData;
  shodan:     ShodanData;
  graph:      OsintGraph;
}
