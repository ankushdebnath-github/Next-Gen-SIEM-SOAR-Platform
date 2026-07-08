# 🛡️ Next-Gen SIEM / SOAR Platform

> Real-time cybersecurity threat visualization and automated response platform

![Platform](https://img.shields.io/badge/Platform-SIEM%20%2F%20SOAR-blue?style=for-the-badge)
![Angular](https://img.shields.io/badge/Angular-17-red?style=for-the-badge&logo=angular)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-brightgreen?style=for-the-badge&logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

---

## 🗺️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        BROWSER (Angular 17)                         │
│                                                                     │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐  ┌──────────┐  │
│  │  Attack Map │  │ Triage Queue │  │ OSINT Graph│  │Workbench │  │
│  │ (Leaflet.js)│  │              │  │  (D3.js)   │  │ Drawer   │  │
│  └──────┬──────┘  └──────┬───────┘  └─────┬──────┘  └────┬─────┘  │
│         └────────────────┴────────────────┴──────────────┘        │
│                              Socket.io Client                       │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │  WebSocket (real-time)
                                   │  HTTP REST (initial load)
┌──────────────────────────────────┴──────────────────────────────────┐
│                     NODE.JS + EXPRESS BACKEND                        │
│                                                                     │
│  ┌─────────────┐  ┌───────────────┐  ┌──────────────────────────┐  │
│  │  REST API   │  │  Socket.io    │  │    Threat Worker         │  │
│  │  /api/*     │  │  Server       │  │  (Background Interval)   │  │
│  └─────────────┘  └───────────────┘  └──────────────────────────┘  │
│                                                                     │
│  ┌─────────────────────┐    ┌──────────────────────────────────┐   │
│  │  OSINT Enrichment   │    │       Threat Generator           │   │
│  │  VirusTotal + Shodan│    │  (Simulated Attack Events)       │   │
│  └─────────────────────┘    └──────────────────────────────────┘   │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │         MongoDB              │
                    │  ┌───────────────────────┐  │
                    │  │  ThreatEvents         │  │
                    │  │  ThreatIntelligence   │  │
                    │  └───────────────────────┘  │
                    └─────────────────────────────┘
```

---

## 🔄 Real-Time Data Flow

```
                    ┌─────────────────────┐
                    │   Threat Worker     │
                    │  (every 800ms)      │
                    └──────────┬──────────┘
                               │ generates
                               ▼
                    ┌─────────────────────┐
                    │   ThreatEvent       │──── saved ──► MongoDB
                    │   (new attack)      │
                    └──────────┬──────────┘
                               │ emits
                    ┌──────────▼──────────┐
                    │    Socket.io        │
                    │  threat:new event   │
                    └──────────┬──────────┘
                               │ broadcasts to all clients
          ┌────────────────────┼─────────────────────┐
          ▼                    ▼                     ▼
  ┌───────────────┐   ┌────────────────┐   ┌─────────────────┐
  │  Attack Map   │   │  Triage Queue  │   │   Stats Strip   │
  │  draws line   │   │   new row      │   │ counter +1      │
  └───────────────┘   └────────────────┘   └─────────────────┘
```

---

## 🏗️ Project Structure

```
Next-Gen-SIEM-SOAR-Platform/
│
├── 📁 siem-backend/
│   ├── 📁 src/
│   │   ├── 📄 server.js                  ← Express + Socket.io entry point
│   │   ├── 📁 config/
│   │   │   └── 📄 database.js            ← MongoDB connection
│   │   ├── 📁 models/
│   │   │   ├── 📄 ThreatEvent.js         ← Attack event schema
│   │   │   └── 📄 ThreatIntelligence.js  ← OSINT intel schema
│   │   └── 📁 services/
│   │       ├── 📄 threatGenerator.js     ← Fake threat factory
│   │       ├── 📄 threatWorker.js        ← Background interval worker
│   │       └── 📄 osint-enrichment.js    ← VirusTotal + Shodan
│   ├── 📄 .env.example
│   └── 📄 package.json
│
└── 📁 siem-frontend/
    ├── 📁 src/app/
    │   ├── 📁 pages/dashboard/           ← Main dashboard page
    │   ├── 📁 shared/
    │   │   ├── 📁 attack-map/            ← Leaflet world map
    │   │   ├── 📁 live-map/              ← Live overlay map
    │   │   ├── 📁 triage-queue/          ← Threat triage panel
    │   │   ├── 📁 osint-graph/           ← D3.js graph
    │   │   ├── 📁 workbench-drawer/      ← Analysis drawer
    │   │   ├── 📁 stats-strip/           ← Severity counters
    │   │   ├── 📁 execution-playbooks/   ← SOAR playbooks
    │   │   └── 📁 node-detail-card/      ← IP detail popup
    │   ├── 📁 services/                  ← Socket, OSINT, Playbook
    │   └── 📁 models/                    ← TypeScript interfaces
    └── 📄 package.json
```

---

## ⚙️ Tech Stack

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND                           │
│                                                         │
│   Angular 17  ──  D3.js  ──  Leaflet.js  ──  RxJS      │
│   Socket.io-client  ──  TypeScript 5.4                  │
├─────────────────────────────────────────────────────────┤
│                      BACKEND                            │
│                                                         │
│   Node.js 18+  ──  Express 4  ──  Socket.io 4           │
│   Mongoose 8  ──  Helmet  ──  CORS  ──  Morgan          │
├─────────────────────────────────────────────────────────┤
│                      DATABASE                           │
│                                                         │
│             MongoDB (Local or Atlas)                    │
├─────────────────────────────────────────────────────────┤
│                      OSINT APIs                         │
│                                                         │
│          VirusTotal v3  ──  Shodan API                  │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

```
✅ Node.js >= 18
✅ MongoDB (local) or Atlas URI
✅ Angular CLI  →  npm install -g @angular/cli
✅ Git
```

### Setup in 3 Steps

```
Step 1: Clone
─────────────────────────────────────────────
git clone https://github.com/ankushdebnath-github/Next-Gen-SIEM-SOAR-Platform.git
cd Next-Gen-SIEM-SOAR-Platform

Step 2: Backend
─────────────────────────────────────────────
cd siem-backend
cp .env.example .env       ← add your API keys
npm install
npm run dev                ← runs on http://localhost:5000

Step 3: Frontend
─────────────────────────────────────────────
cd ../siem-frontend
npm install
npm start                  ← runs on http://localhost:4200
```

---

## 📡 Feature Map

```
┌──────────────────────────────────────────────────────────────┐
│                    DASHBOARD LAYOUT                          │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              📊 STATS STRIP                            │  │
│  │   🔴 Critical: 12  🟠 High: 34  🟡 Medium: 56  🔵 Low │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────┐  ┌──────────────────────────┐  │
│  │                          │  │                          │  │
│  │    🗺️ ATTACK MAP          │  │    📋 TRIAGE QUEUE        │  │
│  │    (Leaflet.js)           │  │    (Incoming Threats)    │  │
│  │    Live attack lines      │  │    Severity sorted       │  │
│  │    world map              │  │    Ack/Escalate/Dismiss  │  │
│  │                          │  │                          │  │
│  └──────────────────────────┘  └──────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────┐  ┌──────────────────────────┐  │
│  │                          │  │                          │  │
│  │    🔗 OSINT GRAPH         │  │  ▶️ EXECUTION PLAYBOOKS   │  │
│  │    (D3.js)                │  │    SOAR automation       │  │
│  │    IP relationships       │  │    Block IP / Isolate    │  │
│  │    Threat actors          │  │    Notify SOC / Scan     │  │
│  │                          │  │                          │  │
│  └──────────────────────────┘  └──────────────────────────┘  │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐     │
│  │  🧪 WORKBENCH DRAWER (slide-in)                     │     │
│  │  Full threat timeline · Raw logs · OSINT · Actions  │     │
│  └─────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔑 Environment Variables

| Variable             | Required | Description                          |
|----------------------|----------|--------------------------------------|
| `MONGODB_URI`        | ✅       | MongoDB connection string             |
| `VT_API_KEY`         | ✅       | VirusTotal v3 API key                 |
| `SHODAN_API_KEY`     | ✅       | Shodan API key                        |
| `PORT`               | ❌       | Server port (default: 5000)           |
| `THREAT_INTERVAL_MS` | ❌       | Threat generation speed (default: 800)|
| `OSINT_MOCK`         | ❌       | Use mock OSINT data (default: true)   |
| `CORS_ORIGIN`        | ❌       | Allowed frontend origin               |

---

## 📄 Documentation

| Document | Description |
|----------|-------------|
| [Backend README](./siem-backend/README.md) | API endpoints, Socket.io events, data models, services |
| [Frontend README](./siem-frontend/README.md) | Components, data flow, real-time visualization |

---

## 📜 License

MIT — feel free to use, modify, and distribute.
