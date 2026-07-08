'use strict';

/**
 * threatWorker.js
 * ───────────────
 * Background worker that runs on a fixed cadence (default: every 800 ms).
 * On each tick it:
 *   1. Generates a randomised cyber-attack event.
 *   2. Persists it to MongoDB via Mongoose.
 *   3. Broadcasts the lean Socket.io payload to every connected client
 *      on the 'live-threat' channel.
 *
 * NOTE: OSINT enrichment (VirusTotal / Shodan) is intentionally NOT triggered
 * here. It is only fired on-demand when an analyst clicks an IP in the
 * dashboard — this avoids burning API quota on every generated event and
 * prevents 403 rate-limit errors from automated scanning.
 * See: GET /api/v1/osint/:ip in server.js
 */

const ThreatEvent             = require('../models/ThreatEvent');
const { generateThreatEvent } = require('./threatGenerator');

// ── Configuration ─────────────────────────────────────────────────────────

const WORKER_INTERVAL_MS = parseInt(process.env.THREAT_INTERVAL_MS || '800', 10);

// Tracks the setInterval handle so the caller can stop the worker cleanly.
let workerHandle = null;

// ── Worker ────────────────────────────────────────────────────────────────

/**
 * Starts the threat-generation worker.
 *
 * @param {import('socket.io').Server} io - The live Socket.io Server instance.
 * @returns {NodeJS.Timeout} The interval handle (can be passed to stopWorker).
 */
function startThreatWorker(io) {
  if (workerHandle) {
    console.warn('[Worker] Already running — ignoring duplicate start request.');
    return workerHandle;
  }

  console.log(`[Worker] Starting threat generator (interval: ${WORKER_INTERVAL_MS} ms)…`);

  workerHandle = setInterval(async () => {
    try {
      // ── Step 1: Generate ──────────────────────────────────────────────
      const rawPayload = generateThreatEvent();

      // ── Step 2: Persist ───────────────────────────────────────────────
      const event = new ThreatEvent(rawPayload);
      await event.save();

      // ── Step 3: Broadcast live threat to all clients ──────────────────
      const socketPayload = event.toSocketPayload();
      io.emit('live-threat', socketPayload);

      if (process.env.NODE_ENV !== 'production') {
        console.log(
          `[Worker] ⚡ [${socketPayload.severity.padEnd(8)}] ${socketPayload.attack_type.padEnd(22)} ` +
          `${socketPayload.source_country} → ${socketPayload.target_country}`
        );
      }

    } catch (err) {
      // Log the error but do NOT kill the interval — a transient DB hiccup
      // should not halt the entire streaming pipeline.
      console.error('[Worker] Error on threat tick:', err.message);
    }
  }, WORKER_INTERVAL_MS);

  return workerHandle;
}

/**
 * Gracefully stops the threat-generation worker.
 */
function stopThreatWorker() {
  if (workerHandle) {
    clearInterval(workerHandle);
    workerHandle = null;
    console.log('[Worker] Threat generator stopped.');
  }
}

module.exports = { startThreatWorker, stopThreatWorker };
