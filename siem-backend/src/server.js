'use strict';

/**
 * server.js  –  SIEM / SOAR Platform — Entry Point
 * ─────────────────────────────────────────────────
 * Bootstraps:
 *   • Express HTTP server with security middleware
 *   • Mongoose connection to MongoDB
 *   • Socket.io for real-time bi-directional communication
 *   • Background threat-generation worker
 */

// Load environment variables first so every subsequent module can read them
require('dotenv').config();

const http    = require('http');
const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');
const morgan  = require('morgan');
const { Server: SocketIOServer } = require('socket.io');

const { connectDatabase }   = require('./config/database');
const { startThreatWorker, stopThreatWorker } = require('./services/threatWorker');
const ThreatEvent            = require('./models/ThreatEvent');
const ThreatIntelligence     = require('./models/ThreatIntelligence');
const { enrichIP }           = require('./services/osint-enrichment.service');

// ── Express application ───────────────────────────────────────────────────

const app = express();

// Security headers (removes X-Powered-By, adds CSP etc.)
app.use(helmet());

// CORS — in production replace the origin with your Angular app's domain
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:4200').split(',');
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. curl, Postman, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin '${origin}' is not allowed`));
    },
    methods:          ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders:   ['Content-Type', 'Authorization'],
    credentials:      true,
  })
);

// Request body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// HTTP request logging (skip in test environments)
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// ── REST API routes ───────────────────────────────────────────────────────

/**
 * GET /api/health
 * Lightweight health-check used by load balancers and Docker HEALTHCHECK.
 */
app.get('/api/health', (_req, res) => {
  res.json({
    status:    'ok',
    service:   'siem-soar-backend',
    timestamp: new Date().toISOString(),
    uptime:    process.uptime(),
  });
});

/**
 * GET /api/threats
 * Returns the most recent threat events (default: last 100).
 * Useful for the Angular dashboard to populate the initial state before
 * real-time events start flowing through Socket.io.
 *
 * Query params:
 *   limit    {number}  Number of events to return (1–500, default 100)
 *   severity {string}  Filter by severity: Low | Medium | High | Critical
 *   type     {string}  Filter by attack_type
 */
app.get('/api/threats', async (req, res) => {
  try {
    const limit    = Math.min(Math.max(parseInt(req.query.limit || '100', 10), 1), 500);
    const filter   = {};

    if (req.query.severity) filter.severity    = req.query.severity;
    if (req.query.type)     filter.attack_type = req.query.type;

    const events = await ThreatEvent
      .find(filter)
      .sort({ timestamp: -1 })
      .limit(limit)
      .lean();        // plain JS objects — faster for read-only endpoints

    res.json({ count: events.length, data: events });
  } catch (err) {
    console.error('[API] GET /api/threats error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/threats/stats
 * Returns aggregated counts grouped by attack_type and severity.
 * Feeds the summary cards and pie charts on the Angular dashboard.
 */
app.get('/api/threats/stats', async (req, res) => {
  try {
    const [byType, bySeverity] = await Promise.all([
      ThreatEvent.aggregate([
        { $group: { _id: '$attack_type', count: { $sum: 1 } } },
        { $sort:  { count: -1 } },
      ]),
      ThreatEvent.aggregate([
        { $group: { _id: '$severity',    count: { $sum: 1 } } },
        { $sort:  { count: -1 } },
      ]),
    ]);

    res.json({
      total:      await ThreatEvent.estimatedDocumentCount(),
      by_type:    byType,
      by_severity: bySeverity,
    });
  } catch (err) {
    console.error('[API] GET /api/threats/stats error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ── OSINT / ThreatIntelligence endpoints ─────────────────────────────────

/**
 * GET /api/intel/:ip
 * Returns all enrichment records for a given IP address, newest first.
 * Used by the Angular detail panel when an analyst clicks a threat row.
 *
 * Query params:
 *   limit  {number}  1–50, default 10
 *   status {string}  pending | in_progress | completed | failed
 */
app.get('/api/intel/:ip', async (req, res) => {
  try {
    const ip     = req.params.ip;
    const limit  = Math.min(Math.max(parseInt(req.query.limit || '10', 10), 1), 50);
    const filter = { ip };
    if (req.query.status) filter.enrichment_status = req.query.status;

    const records = await ThreatIntelligence
      .find(filter)
      .sort({ created_at: -1 })
      .limit(limit)
      .lean();

    res.json({ ip, count: records.length, data: records });
  } catch (err) {
    console.error('[API] GET /api/intel/:ip error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/threats/:id/intel
 * Returns the enrichment record(s) linked to a specific ThreatEvent by ID.
 * Allows the Angular dashboard to associate a threat row with its OSINT panel.
 */
app.get('/api/threats/:id/intel', async (req, res) => {
  try {
    const records = await ThreatIntelligence
      .find({ threat_event_id: req.params.id })
      .sort({ created_at: -1 })
      .lean();

    if (!records.length) {
      return res.status(404).json({ error: 'No intelligence found for this threat event' });
    }
    res.json({ threat_event_id: req.params.id, count: records.length, data: records });
  } catch (err) {
    console.error('[API] GET /api/threats/:id/intel error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/intel/enrich
 * Manually triggers OSINT enrichment for any IP address on demand.
 * Body: { "ip": "1.2.3.4" }
 * Useful for the SOAR analyst panel to investigate arbitrary IPs.
 */
app.post('/api/intel/enrich', async (req, res) => {
  try {
    const { ip } = req.body;
    if (!ip || !/^(\d{1,3}\.){3}\d{1,3}$/.test(ip)) {
      return res.status(400).json({ error: 'A valid IPv4 address is required in the request body' });
    }

    // Kick off enrichment — respond immediately with the pending stub,
    // then the worker completes it asynchronously in the background.
    const intel = await enrichIP(ip, null);
    res.status(202).json({
      message: 'Enrichment triggered',
      intel:   intel.toSummary(),
    });
  } catch (err) {
    console.error('[API] POST /api/intel/enrich error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/intel/stats
 * Aggregated OSINT stats for the analytics dashboard.
 * Returns risk level distribution and top high-risk IPs.
 */
app.get('/api/intel/stats', async (req, res) => {
  try {
    const [byRisk, topRiskyIPs, statusCounts] = await Promise.all([
      ThreatIntelligence.aggregate([
        { $match: { enrichment_status: 'completed' } },
        { $group: { _id: '$risk_level', count: { $sum: 1 } } },
        { $sort:  { count: -1 } },
      ]),
      ThreatIntelligence.aggregate([
        { $match: { enrichment_status: 'completed', risk_score: { $gte: 60 } } },
        { $sort:  { risk_score: -1 } },
        { $limit: 10 },
        { $project: { ip: 1, risk_score: 1, risk_level: 1, enriched_at: 1 } },
      ]),
      ThreatIntelligence.aggregate([
        { $group: { _id: '$enrichment_status', count: { $sum: 1 } } },
      ]),
    ]);

    res.json({
      total:          await ThreatIntelligence.estimatedDocumentCount(),
      by_risk_level:  byRisk,
      top_risky_ips:  topRiskyIPs,
      by_status:      statusCounts,
    });
  } catch (err) {
    console.error('[API] GET /api/intel/stats error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ── v1 SOAR Playbook endpoints ────────────────────────────────────────────

/**
 * POST /api/v1/playbooks/block
 * ────────────────────────────
 * Executes the "Block IP / Quarantine Asset" SOAR playbook.
 *
 * Body: { "ip": "1.2.3.4", "threat_event_id": "<optional mongo id>" }
 *
 * Actions:
 *   1. Finds all Active ThreatEvents whose source_ip matches the given IP.
 *   2. Bulk-updates their status → 'Mitigated', sets mitigated_at + mitigated_by.
 *   3. Broadcasts a 'threat-mitigated' Socket.io event to all clients with the
 *      IP and the list of affected event IDs so the UI can react instantly.
 *   4. Returns a summary of the action taken.
 */
app.post('/api/v1/playbooks/block', async (req, res) => {
  try {
    const { ip, threat_event_id } = req.body;

    if (!ip || !/^(\d{1,3}\.){3}\d{1,3}$/.test(ip)) {
      return res.status(400).json({ error: 'A valid IPv4 address is required in the request body' });
    }

    const now = new Date();

    // Build the filter: if a specific event ID was supplied only update that
    // one; otherwise update ALL active events from this source IP.
    const filter = threat_event_id
      ? { _id: threat_event_id, source_ip: ip, status: 'Active' }
      : { source_ip: ip, status: 'Active' };

    const updateResult = await ThreatEvent.updateMany(filter, {
      $set: {
        status:        'Mitigated',
        mitigated_at:  now,
        mitigated_by:  'block-ip',
      },
    });

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({
        error: `No active threat events found for IP ${ip}`,
      });
    }

    // Fetch the updated IDs to include in the broadcast
    const mitigatedEvents = await ThreatEvent
      .find(filter.hasOwnProperty('_id')
        ? { _id: threat_event_id }
        : { source_ip: ip, status: 'Mitigated', mitigated_by: 'block-ip', mitigated_at: { $gte: new Date(now - 5000) } }
      )
      .select('_id source_ip severity attack_type')
      .lean();

    // Broadcast to every connected Angular client
    const socketPayload = {
      ip,
      threat_event_id: threat_event_id ?? null,
      mitigated_ids:   mitigatedEvents.map((e) => e._id),
      mitigated_count: updateResult.modifiedCount,
      playbook:        'block-ip',
      executed_at:     now.toISOString(),
    };

    io.emit('threat-mitigated', socketPayload);

    console.log(
      `[SOAR] 🔒 Block-IP playbook executed for ${ip} — ` +
      `${updateResult.modifiedCount} event(s) mitigated`
    );

    res.json({
      success:         true,
      ip,
      playbook:        'block-ip',
      mitigated_count: updateResult.modifiedCount,
      mitigated_ids:   mitigatedEvents.map((e) => e._id),
      executed_at:     now.toISOString(),
    });

  } catch (err) {
    console.error('[API] POST /api/v1/playbooks/block error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ── v1 OSINT Workbench endpoint ───────────────────────────────────────────

/**
 * GET /api/v1/osint/:ip
 * ─────────────────────
 * Returns the latest completed ThreatIntelligence document for the given IP,
 * shaped specifically for the Angular OSINT Workbench graph component.
 *
 * The response includes:
 *   • meta          — ip, risk_score, risk_level, enriched_at
 *   • virustotal    — full VT sub-document (stats + engine_results)
 *   • shodan        — full Shodan sub-document (open_ports, org, asn, os …)
 *   • graph_nodes   — pre-built node/edge list consumed by the D3 graph
 *
 * Graph node types:
 *   ip        — the central attacker IP node
 *   vt        — VirusTotal aggregate node
 *   engine    — individual AV engine verdict (malicious only)
 *   shodan    — Shodan aggregate node
 *   port      — individual open port/service
 *   asn       — ASN node
 *
 * If no completed record is found the endpoint triggers a fresh enrichment
 * and returns 202 so the client can poll or subscribe via Socket.io.
 */
app.get('/api/v1/osint/:ip', async (req, res) => {
  try {
    const { ip } = req.params;

    // Basic IPv4 validation
    if (!/^(\d{1,3}\.){3}\d{1,3}$/.test(ip)) {
      return res.status(400).json({ error: 'Invalid IPv4 address' });
    }

    // Find the most recent completed enrichment for this IP
    let intel = await ThreatIntelligence
      .findOne({ ip, enrichment_status: 'completed' })
      .sort({ created_at: -1 })
      .lean();

    // No cached result — run enrichment now and await it (VT + Shodan in parallel, ~1-2s)
    if (!intel) {
      console.log(`[API /v1/osint] On-demand enrichment triggered for ${ip} by analyst`);
      try {
        const intelDoc = await enrichIP(ip, null);
        intel = intelDoc.toObject();
      } catch (enrichErr) {
        console.error(`[API /v1/osint] Enrichment failed for ${ip}:`, enrichErr.message);
        return res.status(502).json({
          error:   'OSINT enrichment failed',
          detail:  enrichErr.message,
          ip,
        });
      }
    }

    // ── Build the D3-ready graph payload ──────────────────────────────────
    const nodes = [];
    const edges = [];
    let   nodeId = 0;

    const mkId = () => `n${nodeId++}`;

    // Central IP node
    const ipNodeId = mkId();
    nodes.push({
      id:    ipNodeId,
      type:  'ip',
      label: ip,
      data:  { ip, risk_score: intel.risk_score, risk_level: intel.risk_level },
    });

    // ── VirusTotal branch ─────────────────────────────────────────────────
    const vtStats = intel.virustotal?.last_analysis_stats ?? {};
    const vtNodeId = mkId();
    nodes.push({
      id:    vtNodeId,
      type:  'vt',
      label: 'VirusTotal',
      data:  {
        reputation:  intel.virustotal?.reputation,
        malicious:   vtStats.malicious  ?? 0,
        suspicious:  vtStats.suspicious ?? 0,
        harmless:    vtStats.harmless   ?? 0,
        undetected:  vtStats.undetected ?? 0,
        country:     intel.virustotal?.country,
        as_owner:    intel.virustotal?.as_owner,
        asn:         intel.virustotal?.asn,
        network:     intel.virustotal?.network,
        tags:        intel.virustotal?.tags ?? [],
        last_analysis_date: intel.virustotal?.last_analysis_date,
      },
    });
    edges.push({ source: ipNodeId, target: vtNodeId, label: 'analyzed_by' });

    // Malicious engine verdict nodes (max 8 to keep the graph readable)
    const maliciousEngines = (intel.virustotal?.engine_results ?? [])
      .filter((e) => e.category === 'malicious')
      .slice(0, 8);

    for (const eng of maliciousEngines) {
      const engNodeId = mkId();
      nodes.push({
        id:    engNodeId,
        type:  'engine',
        label: eng.engine_name,
        data:  { engine_name: eng.engine_name, result: eng.result, method: eng.method, category: eng.category },
      });
      edges.push({ source: vtNodeId, target: engNodeId, label: 'detected_by' });
    }

    // ── Shodan branch ──────────────────────────────────────────────────────
    const shodanNodeId = mkId();
    nodes.push({
      id:    shodanNodeId,
      type:  'shodan',
      label: 'Shodan',
      data:  {
        org:        intel.shodan?.org,
        isp:        intel.shodan?.isp,
        asn:        intel.shodan?.asn,
        os:         intel.shodan?.os,
        hostnames:  intel.shodan?.hostnames ?? [],
        tags:       intel.shodan?.tags      ?? [],
        last_update: intel.shodan?.last_update,
        total_ports: intel.shodan?.total_ports ?? 0,
      },
    });
    edges.push({ source: ipNodeId, target: shodanNodeId, label: 'scanned_by' });

    // ASN node
    if (intel.shodan?.asn) {
      const asnNodeId = mkId();
      nodes.push({
        id:    asnNodeId,
        type:  'asn',
        label: intel.shodan.asn,
        data:  { asn: intel.shodan.asn, org: intel.shodan.org, isp: intel.shodan.isp },
      });
      edges.push({ source: shodanNodeId, target: asnNodeId, label: 'belongs_to' });
    }

    // Open port nodes (max 10)
    const ports = (intel.shodan?.open_ports ?? []).slice(0, 10);
    for (const port of ports) {
      const portNodeId = mkId();
      nodes.push({
        id:    portNodeId,
        type:  'port',
        label: `${port.port}/${port.protocol}`,
        data:  {
          port:     port.port,
          protocol: port.protocol,
          service:  port.service,
          product:  port.product,
          version:  port.version,
          banner:   port.banner,
          cves:     port.cves ?? [],
        },
      });
      edges.push({ source: shodanNodeId, target: portNodeId, label: 'exposes' });
    }

    res.json({
      ip,
      meta: {
        risk_score:        intel.risk_score,
        risk_level:        intel.risk_level,
        enrichment_status: intel.enrichment_status,
        enriched_at:       intel.enriched_at,
        created_at:        intel.created_at,
      },
      virustotal: intel.virustotal,
      shodan:     intel.shodan,
      graph: { nodes, edges },
    });

  } catch (err) {
    console.error('[API] GET /api/v1/osint/:ip error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 404 handler for unknown routes
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[Express] Unhandled error:', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

// ── HTTP + Socket.io server ───────────────────────────────────────────────

const httpServer = http.createServer(app);

const io = new SocketIOServer(httpServer, {
  cors: {
    origin:      allowedOrigins,
    methods:     ['GET', 'POST'],
    credentials: true,
  },
  // Prefer WebSocket; fall back to long-polling for restrictive proxies
  transports:         ['websocket', 'polling'],
  pingTimeout:        60000,
  pingInterval:       25000,
  upgradeTimeout:     30000,
  allowEIO3:          true,   // allow Socket.io v3 clients (Angular might use it)
});

// ── Socket.io connection lifecycle ───────────────────────────────────────

io.on('connection', (socket) => {
  const clientAddress = socket.handshake.address;
  console.log(`[Socket.io] Client connected    → id=${socket.id}  addr=${clientAddress}`);

  // Send the last 50 events so the client has an immediate feed on connect
  ThreatEvent
    .find({})
    .sort({ timestamp: -1 })
    .limit(50)
    .lean()
    .then((recentEvents) => {
      socket.emit('history', { count: recentEvents.length, data: recentEvents });
    })
    .catch((err) => console.error('[Socket.io] Failed to send history:', err.message));

  // ── Inbound events from the Angular client ────────────────────────────

  /**
   * 'filter-threats' — client requests a filtered subset in real-time.
   * Payload: { severity?: string, attack_type?: string }
   */
  socket.on('filter-threats', async (filterCriteria) => {
    try {
      const filter = {};
      if (filterCriteria?.severity)    filter.severity    = filterCriteria.severity;
      if (filterCriteria?.attack_type) filter.attack_type = filterCriteria.attack_type;

      const events = await ThreatEvent.find(filter).sort({ timestamp: -1 }).limit(100).lean();
      socket.emit('filtered-threats', { count: events.length, data: events });
    } catch (err) {
      socket.emit('error', { message: 'Failed to apply filter' });
    }
  });

  /**
   * 'acknowledge-threat' — analyst marks a threat as reviewed.
   * Payload: { threatId: string }
   */
  socket.on('acknowledge-threat', (data) => {
    const { threatId } = data || {};
    if (!threatId) return;
    // Broadcast acknowledgement to all other clients (e.g. update UI state)
    socket.broadcast.emit('threat-acknowledged', { threatId, acknowledgedBy: socket.id });
    console.log(`[Socket.io] Threat acknowledged → id=${threatId} by socket=${socket.id}`);
  });

  socket.on('disconnect', (reason) => {
    console.log(`[Socket.io] Client disconnected → id=${socket.id}  reason=${reason}`);
  });

  socket.on('error', (err) => {
    console.error(`[Socket.io] Socket error → id=${socket.id}:`, err.message);
  });
});

// ── Application bootstrap ─────────────────────────────────────────────────

const PORT = parseInt(process.env.PORT || '5000', 10);

async function bootstrap() {
  try {
    // 1. Establish DB connection (throws on failure)
    await connectDatabase();

    // 2. Start the HTTP + Socket.io server
    httpServer.listen(PORT, () => {
      console.log('');
      console.log('╔══════════════════════════════════════════════════════╗');
      console.log('║        SIEM / SOAR Platform  ·  Backend Ready        ║');
      console.log('╠══════════════════════════════════════════════════════╣');
      console.log(`║  HTTP  →  http://localhost:${PORT}                      ║`);
      console.log(`║  WS    →  ws://localhost:${PORT}                        ║`);
      console.log(`║  Env   →  ${(process.env.NODE_ENV || 'development').padEnd(42)}║`);
      console.log('╚══════════════════════════════════════════════════════╝');
      console.log('');
    });

    // 3. Start the background threat-generation worker
    startThreatWorker(io);

    // ── Graceful shutdown ─────────────────────────────────────────────
    const shutdown = async (signal) => {
      console.log(`\n[Server] ${signal} received — shutting down gracefully…`);
      stopThreatWorker();
      io.close(() => console.log('[Socket.io] Server closed.'));
      httpServer.close(async () => {
        console.log('[HTTP] Server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT',  () => shutdown('SIGINT'));

    // Catch unhandled promise rejections so the process doesn't silently die
    process.on('unhandledRejection', (reason) => {
      console.error('[Process] Unhandled rejection:', reason);
    });

  } catch (err) {
    console.error('[Bootstrap] Fatal error — could not start server:', err.message);
    process.exit(1);
  }
}

bootstrap();

module.exports = { app, httpServer, io }; // exported for testing
