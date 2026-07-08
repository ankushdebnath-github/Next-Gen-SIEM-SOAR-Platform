# SIEM / SOAR Platform — Backend (Phase 1)

Real-time cybersecurity event streaming engine built on **Node.js · Express · MongoDB · Socket.io**.  
Designed as the data backbone for a Next-Gen SIEM and SOAR visualization platform (Angular frontend in Phase 2).

---

## Architecture

```
siem-backend/
├── src/
│   ├── config/
│   │   └── database.js          # Mongoose connection + lifecycle hooks
│   ├── models/
│   │   └── ThreatEvent.js       # Mongoose schema + indexes + toSocketPayload()
│   ├── services/
│   │   ├── threatGenerator.js   # Randomised attack-event factory
│   │   └── threatWorker.js      # setInterval worker — generate → save → broadcast
│   └── server.js                # Express app + Socket.io bootstrap + REST API
├── .env.example                 # Environment variable template
├── .gitignore
└── package.json
```

---

## Prerequisites

| Requirement | Version |
|---|---|
| Node.js | ≥ 18.x |
| npm | ≥ 9.x |
| MongoDB | ≥ 6.x (local or Atlas) |

---

## Quick Start

```bash
# 1. Install dependencies
cd siem-backend
npm install

# 2. Create your local environment file
cp .env.example .env
# Edit .env and set MONGODB_URI if using Atlas

# 3. Start in development mode (auto-restart with nodemon)
npm run dev

# 4. Start in production mode
npm start
```

The server starts on **http://localhost:5000** by default.

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5000` | Express server port |
| `NODE_ENV` | `development` | `development` \| `production` \| `test` |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/siem_soar` | MongoDB connection string |
| `CORS_ORIGIN` | `http://localhost:4200` | Comma-separated allowed origins |
| `THREAT_INTERVAL_MS` | `800` | Worker cadence in milliseconds |

---

## REST API

### Health check
```
GET /api/health
```
Returns server status, uptime, and timestamp.

### List recent threats
```
GET /api/threats?limit=100&severity=High&type=DDoS
```
| Param | Type | Description |
|---|---|---|
| `limit` | number | 1–500, default `100` |
| `severity` | string | `Low` \| `Medium` \| `High` \| `Critical` |
| `type` | string | Any valid `attack_type` value |

### Aggregated stats
```
GET /api/threats/stats
```
Returns total event count, grouped by `attack_type` and `severity`.

---

## Socket.io Events

### Server → Client

| Event | Payload | Description |
|---|---|---|
| `live-threat` | `ThreatEvent` object | Emitted every ~800 ms with a new attack event |
| `history` | `{ count, data[] }` | Last 50 events sent immediately on connection |
| `filtered-threats` | `{ count, data[] }` | Response to a `filter-threats` request |
| `threat-acknowledged` | `{ threatId, acknowledgedBy }` | Broadcast when an analyst acks a threat |

### Client → Server

| Event | Payload | Description |
|---|---|---|
| `filter-threats` | `{ severity?, attack_type? }` | Request filtered event set |
| `acknowledge-threat` | `{ threatId }` | Mark a threat as reviewed |

---

## Angular Integration Example

```typescript
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
  transports: ['websocket'],
});

// Receive initial history on connect
socket.on('history', ({ data }) => {
  this.threats = data;
});

// Stream live threats
socket.on('live-threat', (threat) => {
  this.threats.unshift(threat);
});

// Request filtered view
socket.emit('filter-threats', { severity: 'Critical' });

// Acknowledge a threat from the SOAR workflow
socket.emit('acknowledge-threat', { threatId: '...' });
```

---

## ThreatEvent Schema

```js
{
  source_ip:      String,   // Attacker IP
  target_ip:      String,   // Victim IP
  source_country: String,   // Attacker's country
  target_country: String,   // Victim's country
  coordinates: {
    lat:  Number,           // Source latitude  (±2° geo-jitter applied)
    long: Number,           // Source longitude (±2° geo-jitter applied)
  },
  attack_type:    String,   // Enum — see below
  severity:       String,   // Low | Medium | High | Critical
  description:    String,   // Human-readable event summary
  packet_count:   Number,   // Simulated packet volume
  timestamp:      Date,
}
```

**Supported attack types:** SSH Brute Force, SQL Injection, DDoS, Port Scan, Malware, Phishing, Man-in-the-Middle, Zero-Day Exploit, Ransomware, DNS Spoofing

---

## Phase 2 Roadmap (Angular Frontend)

- [ ] 3D Globe (Three.js / CesiumJS) with animated attack arcs
- [ ] Real-time threat feed table with filtering and sorting
- [ ] Severity heatmap and attack-type pie charts (Chart.js / D3)
- [ ] SOAR playbook trigger panel with automated response workflows
- [ ] Analyst acknowledgement and case management UI
