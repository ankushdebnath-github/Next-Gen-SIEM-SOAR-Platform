'use strict';

const mongoose = require('mongoose');

// ── VirusTotal sub-schemas ────────────────────────────────────────────────

/**
 * Stores the last_analysis_stats block from the VT /ip_addresses/{ip} endpoint.
 * Fields match the official v3 response structure exactly so the Angular
 * template can bind to them without any transformation.
 */
const VTStatsSchema = new mongoose.Schema(
  {
    harmless:   { type: Number, default: 0 },
    malicious:  { type: Number, default: 0 },
    suspicious: { type: Number, default: 0 },
    undetected: { type: Number, default: 0 },
    timeout:    { type: Number, default: 0 },
  },
  { _id: false }
);

/**
 * One engine verdict row from the last_analysis_results map.
 * We flatten the map into an array so it can be stored in Mongo without
 * dynamic field names (which would break indexing).
 */
const VTEngineResultSchema = new mongoose.Schema(
  {
    engine_name: { type: String, required: true },
    category:    { type: String },   // malicious | suspicious | harmless | undetected
    result:      { type: String },   // human-readable label, e.g. "Malware.Generic"
    method:      { type: String },   // blacklist | heuristic | etc.
  },
  { _id: false }
);

const VirusTotalSchema = new mongoose.Schema(
  {
    /** Raw reputation score (-100 … 100) from VirusTotal. */
    reputation:          { type: Number },
    /** Aggregated engine verdicts. */
    last_analysis_stats: { type: VTStatsSchema },
    /** Top engine results (capped at 20 to stay under BSON 16 MB limit). */
    engine_results:      { type: [VTEngineResultSchema], default: [] },
    /** Geographic info returned by VT. */
    country:             { type: String },
    /** ASN owner / ISP string. */
    as_owner:            { type: String },
    asn:                 { type: Number },
    /** Network CIDR block the IP belongs to. */
    network:             { type: String },
    /** Community-contributed tags, e.g. ["tor-exit-node", "scanner"]. */
    tags:                { type: [String], default: [] },
    /** ISO timestamp of the last VT analysis. */
    last_analysis_date:  { type: Date },
  },
  { _id: false }
);

// ── Shodan sub-schemas ────────────────────────────────────────────────────

/**
 * Represents a single open port / service banner returned by Shodan.
 */
const ShodanPortSchema = new mongoose.Schema(
  {
    port:      { type: Number, required: true },
    protocol:  { type: String, enum: ['tcp', 'udp'], default: 'tcp' },
    service:   { type: String },   // HTTP, SSH, FTP, RDP …
    /** Raw banner snippet (first 512 chars). */
    banner:    { type: String, maxlength: 512 },
    /** CPE string for the detected product, e.g. "cpe:/a:apache:http_server:2.4.51" */
    product:   { type: String },
    version:   { type: String },
    /** CVEs associated with this service/version. */
    cves:      { type: [String], default: [] },
  },
  { _id: false }
);

const ShodanSchema = new mongoose.Schema(
  {
    /** Organisation that owns the IP block. */
    org:           { type: String },
    /** ISP / hosting provider. */
    isp:           { type: String },
    /** ASN string, e.g. "AS15169". */
    asn:           { type: String },
    /** Operating system fingerprint, if detected. */
    os:            { type: String },
    /** Open ports with service detail. */
    open_ports:    { type: [ShodanPortSchema], default: [] },
    /** Hostnames that resolve to this IP. */
    hostnames:     { type: [String], default: [] },
    /** Shodan tags, e.g. ["cloud", "vpn", "self-signed"]. */
    tags:          { type: [String], default: [] },
    /** Timestamp of when Shodan last crawled this IP. */
    last_update:   { type: Date },
    /** Total number of open ports (convenience field for quick filtering). */
    total_ports:   { type: Number, default: 0 },
  },
  { _id: false }
);

// ── Root ThreatIntelligence schema ────────────────────────────────────────

const ThreatIntelligenceSchema = new mongoose.Schema(
  {
    // ── Linkage ───────────────────────────────────────────────────────────
    /** The IP address that was enriched (source_ip from ThreatEvent). */
    ip: {
      type:     String,
      required: true,
      trim:     true,
      index:    true,
      match: [
        /^(\d{1,3}\.){3}\d{1,3}$/,
        'ip must be a valid IPv4 address',
      ],
    },

    /**
     * Reference to the originating ThreatEvent document.
     * Allows $lookup / populate in aggregation pipelines.
     */
    threat_event_id: {
      type:  mongoose.Schema.Types.ObjectId,
      ref:   'ThreatEvent',
      index: true,
    },

    // ── Provider data ─────────────────────────────────────────────────────
    virustotal: { type: VirusTotalSchema },
    shodan:     { type: ShodanSchema     },

    // ── Derived risk assessment ───────────────────────────────────────────
    /**
     * Composite risk score computed after enrichment (0–100).
     * Formula: weighted blend of VT malicious detections + Shodan open ports
     * + CVE count. High scores trigger automated SOAR playbooks.
     */
    risk_score: {
      type: Number,
      min:  0,
      max:  100,
    },

    /** Human-readable risk tier derived from risk_score. */
    risk_level: {
      type: String,
      enum: ['None', 'Low', 'Medium', 'High', 'Critical'],
    },

    // ── Pipeline status ───────────────────────────────────────────────────
    /**
     * Tracks where the enrichment job is in its lifecycle so the Angular
     * dashboard can show a spinner vs. results panel.
     */
    enrichment_status: {
      type:    String,
      enum:    ['pending', 'in_progress', 'completed', 'failed'],
      default: 'pending',
      index:   true,
    },

    /** ISO timestamp when enrichment was triggered. */
    enriched_at: { type: Date },

    /** Error message captured when enrichment_status === 'failed'. */
    error_message: { type: String, maxlength: 1000 },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
    collection: 'threat_intelligence',
  }
);

// ── Indexes ───────────────────────────────────────────────────────────────
// Most common query: get all intel for an IP sorted by recency
ThreatIntelligenceSchema.index({ ip: 1, created_at: -1 });
// Support dashboard filtering by risk level
ThreatIntelligenceSchema.index({ risk_level: 1, created_at: -1 });
// Pipeline monitoring: find all jobs still in progress
ThreatIntelligenceSchema.index({ enrichment_status: 1, created_at: -1 });

// ── Instance helpers ──────────────────────────────────────────────────────

/**
 * Returns a concise summary object for Socket.io broadcast and API responses.
 */
ThreatIntelligenceSchema.methods.toSummary = function () {
  return {
    id:               this._id,
    ip:               this.ip,
    threat_event_id:  this.threat_event_id,
    risk_score:       this.risk_score,
    risk_level:       this.risk_level,
    enrichment_status: this.enrichment_status,
    vt_malicious:     this.virustotal?.last_analysis_stats?.malicious ?? null,
    shodan_ports:     this.shodan?.total_ports ?? null,
    enriched_at:      this.enriched_at,
  };
};

const ThreatIntelligence = mongoose.model('ThreatIntelligence', ThreatIntelligenceSchema);

module.exports = ThreatIntelligence;
