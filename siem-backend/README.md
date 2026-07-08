# 🔧 SIEM / SOAR — Backend

> Node.js · Express · Socket.io · MongoDB · VirusTotal · Shodan

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey?style=for-the-badge&logo=express)
![Socket.io](https://img.shields.io/badge/Socket.io-4.x-black?style=for-the-badge&logo=socket.io)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-brightgreen?style=for-the-badge&logo=mongodb)

---

## 📁 Folder Structure

```
siem-backend/
│
├── 📄 package.json
├── 📄 .env.example
├── 📄 .gitignore
│
└── 📁 src/
    ├── 📄 server.js                       ← Entry point
    │
    ├── 📁 config/
    │   └── 📄 database.js                 ← Mongoose connection
    │
    ├── 📁 models/
    │   ├── 📄 ThreatEvent.js              ← Attack event schema
    │   └── 📄 ThreatIntelligence.js       ← OSINT intel schema
    │
    └── 📁 services/
        ├── 📄 threatGenerator.js          ← Creates fake threat events
        ├── 📄 threatWorker.js             ← Runs on interval (800ms)
        └── 📄 osint-enrichment.service.js ← VirusTotal + Shodan calls
```

---

## 🔄 How the Backend Works — Full Flow

```
  ┌─────────────────────────────────────────────────────────────────┐
  │                        server.js boots                          │
  └───────────────┬───────────────┬────────────────┬───────────────┘
                  │               │                │
                  ▼               ▼                ▼
         ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐
         │   Express    │  │  MongoDB     │  │  Socket.io       │
         │   REST API   │  │  connects    │  │  Server starts   │
         └──────────────┘  └──────────────┘  └──────────────────┘
                                                       │
                                                       ▼
                                           ┌───────────────────────┐
                                           │    Threat Worker      │
                                           │   starts interval     │
                                           │   (every 800ms)       │
                                           └───────────┬───────────┘
                                                       │
                                                       ▼
                                           ┌───────────────────────┐
                                           │  threatGenerator.js   │
                                           │  creates new event    │
                                           └───────────┬───────────┘
                                                       │
                              ┌────────────────────────┤
                              ▼                        ▼
                   ┌─────────────────┐     ┌─────────────────────┐
                   │  Save to        │     │  Emit via           │
                   │  MongoDB        │     │  socket threat:new  │
                   └─────────────────┘     └──────────┬──────────┘
                                                       │
                              ┌────────────────────────┼────────────────┐
                              ▼                        ▼                ▼
                   ┌─────────────────┐   ┌─────────────────┐  ┌──────────────┐
                   │  Attack Map     │   │  Triage Queue   │  │  Stats Strip │
                   │  draws line     │   │  new row        │  │  counter +1  │
                   └─────────────────┘   └─────────────────┘  └──────────────┘
```

---

## 🌐 REST API Endpoints

```
┌────────────────────────────────────────────────────────────────────┐
│                        REST API  /api/*                            │
├────────────┬─────────────────────────┬──────────────────────────  │
│  Method    │  Endpoint               │  Description               │
├────────────┼─────────────────────────┼──────────────────────────  │
│  GET       │  /api/health            │  Server health check       │
│  GET       │  /api/threats           │  Latest threat events      │
│  GET       │  /api/osint/:ip         │  OSINT data for an IP      │
│  POST      │  /api/threats/:id/triage│  Triage action on threat   │
│  POST      │  /api/playbooks/execute │  Run a SOAR playbook       │
└────────────┴─────────────────────────┴──────────────────────────  ┘
```

### GET /api/health
```json
{
  "status": "ok",
  "service": "siem-soar-backend",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.45
}
```

### GET /api/threats
```json
[
  {
    "_id": "...",
    "severity": "critical",
    "attackType": "DDoS",
    "sourceIP": "192.168.1.1",
    "sourceCountry": "Russia",
    "destinationIP": "10.0.0.1",
    "destinationCountry": "United States",
    "port": 443,
    "protocol": "TCP",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "triageStatus": "new"
  }
]
```

---

## 🔌 Socket.io Events

```
┌──────────────────────────────────────────────────────────────────┐
│                   SOCKET.IO EVENT BUS                            │
│                                                                  │
│   SERVER  ──────────────────────────────────────►  CLIENT       │
│                                                                  │
│   threat:new        ──►  new attack event object                │
│   threat:updated    ──►  triage status changed                  │
│   osint:result      ──►  IP enrichment data ready               │
│   stats:update      ──►  severity counter snapshot              │
│                                                                  │
│   CLIENT  ──────────────────────────────────────►  SERVER       │
│                                                                  │
│   triage:action     ──►  { id, action }                         │
│   osint:request     ──►  { ip }                                 │
│   playbook:execute  ──►  { threatId, type }                     │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🔬 OSINT Enrichment Pipeline

```
  Client or Worker sends IP
           │
           ▼
  ┌─────────────────────────┐
  │  osint-enrichment       │
  │  .service.js            │
  └────────────┬────────────┘
               │
       ┌───────┴────────┐
       ▼                ▼
  ┌─────────┐      ┌──────────┐
  │VirusTotal│      │  Shodan  │
  │  API v3  │      │  API     │
  └────┬─────┘      └────┬─────┘
       │                 │
       ▼                 ▼
  VT Score          Open Ports
  Detections        ISP / Country
  Malicious?        CVEs found
  Community votes   Hostnames
       │                 │
       └────────┬────────┘
                ▼
  ┌─────────────────────────┐
  │  ThreatIntelligence     │
  │  saved to MongoDB       │
  └────────────┬────────────┘
               │
               ▼
  socket emit  osint:result  ──► Angular OSINT Graph
```

---

## 🗄️ Data Models

### ThreatEvent Schema

```
ThreatEvent {
  ┌─────────────────────┬────────────────────────────────────┐
  │ Field               │ Type / Values                      │
  ├─────────────────────┼────────────────────────────────────┤
  │ id                  │ String (UUID)                      │
  │ timestamp           │ Date                               │
  │ severity            │ critical | high | medium | low     │
  │ attackType          │ DDoS | SQLi | BruteForce | ...     │
  │ sourceIP            │ String (IPv4)                      │
  │ sourceCountry       │ String                             │
  │ sourceLat/Lng       │ Number (coordinates)               │
  │ destinationIP       │ String (IPv4)                      │
  │ destinationCountry  │ String                             │
  │ destLat/Lng         │ Number (coordinates)               │
  │ protocol            │ TCP | UDP | ICMP | HTTP | HTTPS    │
  │ port                │ Number                             │
  │ triageStatus        │ new | acknowledged | escalated...  │
  │ rawLog              │ String (simulated log line)        │
  └─────────────────────┴────────────────────────────────────┘
}
```

### ThreatIntelligence Schema

```
ThreatIntelligence {
  ┌──────────────────┬─────────────────────────────────────┐
  │ Field            │ Type / Values                       │
  ├──────────────────┼─────────────────────────────────────┤
  │ ip               │ String (IPv4)                       │
  │ vtScore          │ Number (0–100 malicious score)      │
  │ vtDetections     │ Number (engines that flagged it)    │
  │ isMalicious      │ Boolean                             │
  │ shodanPorts      │ Number[] (open ports)               │
  │ isp              │ String                              │
  │ country          │ String                              │
  │ hostnames        │ String[]                            │
  │ cves             │ String[] (CVE IDs)                  │
  │ tags             │ String[] (e.g. "botnet", "scanner") │
  │ lastSeen         │ Date                                │
  └──────────────────┴─────────────────────────────────────┘
}
```

---

## 🛡️ Middleware Stack

```
Incoming Request
      │
      ▼
  ┌─────────┐
  │ Helmet  │  ← sets security headers (CSP, HSTS, etc.)
  └────┬────┘
       ▼
  ┌─────────┐
  │  CORS   │  ← only allows configured origins
  └────┬────┘
       ▼
  ┌─────────────────┐
  │  Body Parser    │  ← JSON, limit 10kb
  └────┬────────────┘
       ▼
  ┌─────────┐
  │ Morgan  │  ← HTTP request logger
  └────┬────┘
       ▼
  ┌─────────────┐
  │  Route      │  ← /api/health, /api/threats, etc.
  │  Handlers   │
  └─────────────┘
```

---

## ⚙️ Environment Variables

| Variable             | Required | Default                              | Description                    |
|----------------------|----------|--------------------------------------|--------------------------------|
| `PORT`               | ❌       | `5000`                               | Express server port            |
| `NODE_ENV`           | ❌       | `development`                        | Environment mode               |
| `MONGODB_URI`        | ✅       | —                                    | MongoDB connection string      |
| `CORS_ORIGIN`        | ❌       | `http://localhost:4200`              | Allowed frontend origin        |
| `THREAT_INTERVAL_MS` | ❌       | `800`                                | Threat generation interval     |
| `VT_API_KEY`         | ✅       | —                                    | VirusTotal v3 API key          |
| `SHODAN_API_KEY`     | ✅       | —                                    | Shodan API key                 |
| `OSINT_MOCK`         | ❌       | `true`                               | Use mock OSINT (no real calls) |

---

## 🚀 Getting Started

```bash
cd siem-backend
cp .env.example .env      # fill in your values
npm install
npm run dev               # starts on http://localhost:5000
```

### Scripts

```
npm start       → node src/server.js        (production)
npm run dev     → nodemon src/server.js     (development, auto-restart)
npm run lint    → eslint src/**/*.js        (code linting)
```

---

## 📜 License

MIT
