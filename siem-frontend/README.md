# 🖥️ SIEM / SOAR — Frontend

> Angular 17 · Leaflet.js · D3.js · Socket.io · RxJS

![Angular](https://img.shields.io/badge/Angular-17-red?style=for-the-badge&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=for-the-badge&logo=typescript)
![D3.js](https://img.shields.io/badge/D3.js-7.x-orange?style=for-the-badge&logo=d3.js)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9-green?style=for-the-badge&logo=leaflet)
![Socket.io](https://img.shields.io/badge/Socket.io-4.x-black?style=for-the-badge&logo=socket.io)

---

## 📁 Folder Structure

```
siem-frontend/
│
├── 📄 angular.json
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 proxy.conf.json              ← proxies /api + socket.io → :5000
│
└── 📁 src/
    ├── 📄 main.ts
    ├── 📄 index.html
    ├── 📄 styles.css               ← global dark theme
    │
    └── 📁 app/
        ├── 📄 app.config.ts
        ├── 📄 app.routes.ts
        ├── 📄 app.component.ts
        │
        ├── 📁 models/
        │   ├── 📄 threat-event.model.ts    ← ThreatEvent interface
        │   └── 📄 osint.model.ts           ← OSINT data interface
        │
        ├── 📁 services/
        │   ├── 📄 socket.service.ts        ← Socket.io client
        │   ├── 📄 osint.service.ts         ← OSINT HTTP calls
        │   └── 📄 playbook.service.ts      ← SOAR playbook runner
        │
        ├── 📁 utils/
        │   └── 📄 severity.utils.ts        ← color/label helpers
        │
        ├── 📁 pages/
        │   └── 📁 dashboard/              ← main dashboard page
        │       ├── dashboard.component.ts
        │       ├── dashboard.component.html
        │       └── dashboard.component.css
        │
        └── 📁 shared/
            ├── 📁 attack-map/             ← Leaflet world map
            ├── 📁 live-map/               ← Live map overlay
            ├── 📁 triage-queue/           ← Threat triage panel
            ├── 📁 osint-graph/            ← D3.js force graph
            ├── 📁 workbench-drawer/       ← Analysis slide-in drawer
            ├── 📁 stats-strip/            ← Severity counters bar
            ├── 📁 execution-playbooks/    ← SOAR playbooks panel
            └── 📁 node-detail-card/       ← IP popup detail card
```

---

## 🏠 Dashboard Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│  🛡️  NEXT-GEN SIEM / SOAR PLATFORM                    [dark theme]  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  📊  STATS STRIP                                              │  │
│  │  🔴 Critical: 14   🟠 High: 38   🟡 Medium: 61   🔵 Low: 22  │  │
│  │  ⚡ Total Today: 135    📡 Live: CONNECTED                    │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌────────────────────────────┐  ┌────────────────────────────────┐ │
│  │                            │  │                                │ │
│  │   🗺️  ATTACK MAP            │  │   📋  TRIAGE QUEUE             │ │
│  │                            │  │                                │ │
│  │   [World map with live     │  │   🔴 DDoS  · 185.x.x.x → US   │ │
│  │    animated attack lines]  │  │   🟠 SQLi  · 91.x.x.x  → DE   │ │
│  │                            │  │   🟡 Scan  · 45.x.x.x  → UK   │ │
│  │   Red   = Critical         │  │   🔵 Probe · 12.x.x.x  → JP   │ │
│  │   Orange = High            │  │                                │ │
│  │   Yellow = Medium          │  │   [Ack] [Escalate] [Dismiss]   │ │
│  │   Blue  = Low              │  │                                │ │
│  │                            │  │                                │ │
│  └────────────────────────────┘  └────────────────────────────────┘ │
│                                                                     │
│  ┌────────────────────────────┐  ┌────────────────────────────────┐ │
│  │                            │  │                                │ │
│  │   🔗  OSINT GRAPH           │  │   ▶️  EXECUTION PLAYBOOKS       │ │
│  │                            │  │                                │ │
│  │   [D3.js force-directed    │  │   ■ Block IP Address           │ │
│  │    graph of IP nodes and   │  │   ■ Isolate Host               │ │
│  │    threat relationships]   │  │   ■ Notify SOC Team            │ │
│  │                            │  │   ■ Run Antivirus Scan         │ │
│  │   ● = Malicious IP         │  │   ■ Capture Network Traffic    │ │
│  │   ◉ = C2 Server            │  │                                │ │
│  │   ○ = Victim IP            │  │   [status logs here]           │ │
│  │                            │  │                                │ │
│  └────────────────────────────┘  └────────────────────────────────┘ │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  🧪  WORKBENCH DRAWER  ░░░░░░░░░░░░░░░░░░░░░  [slide-in →]   │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Real-Time Data Flow

```
  Backend emits  threat:new
         │
         ▼
  SocketService (socket.service.ts)
         │
         │  Observable<ThreatEvent>
         │
    ┌────┴─────────────────────────────────────┐
    ▼                  ▼                       ▼
AttackMap          TriageQueue            StatsStrip
draws new          adds new row           increments
attack line        at top of list         severity counter
    │
    ▼ (user clicks IP on map)
OsintService.enrich(ip)
    │
    ▼
Backend /api/osint/:ip
    │
    ▼  osint:result event
OsintGraph
adds new node
    │
    ▼ (user clicks node)
NodeDetailCard
shows VT score,
ports, CVEs
    │
    ▼ (user opens threat)
WorkbenchDrawer
shows full
timeline + logs
    │
    ▼ (user runs playbook)
PlaybookService
POST /api/playbooks/execute
    │
    ▼
ExecutionPlaybooks
shows run status
```

---

## 🧩 Component Reference

### 📍 Attack Map

```
attack-map.component.ts
│
├── Uses: Leaflet.js
├── Input: ThreatEvent stream (Socket.io)
│
├── On threat:new ──► draw animated polyline
│                     source coords → destination coords
│                     color = severity
│
├── Auto-removes lines after 8 seconds
│
└── Renders on:  dark tile layer (CartoDB dark matter)
```

```
Severity Color Mapping:
  critical  ──►  #ff2222  (bright red)
  high      ──►  #ff8800  (orange)
  medium    ──►  #ffcc00  (yellow)
  low       ──►  #0088ff  (blue)
```

---

### 📋 Triage Queue

```
triage-queue.component.ts
│
├── Input: ThreatEvent[] (Socket.io + initial HTTP load)
├── Sort: by severity → timestamp (newest first)
│
├── Each row shows:
│   ├── Severity badge (color-coded)
│   ├── Attack type label
│   ├── Source IP + country flag
│   ├── Destination IP + country flag
│   ├── Timestamp
│   └── Action buttons:
│       ├── [Acknowledge]  → triageStatus = 'acknowledged'
│       ├── [Escalate]     → triageStatus = 'escalated'
│       ├── [Dismiss]      → triageStatus = 'dismissed'
│       └── [Investigate]  → opens WorkbenchDrawer
│
└── Emits: triage:action via SocketService
```

---

### 🔗 OSINT Graph

```
osint-graph.component.ts
│
├── Uses: D3.js force-directed simulation
├── Input: ThreatIntelligence[] (osint:result events)
│
├── Node types:
│   ├── ● Malicious IP    (red, large)
│   ├── ◉ C2 Server       (purple, large)
│   ├── ○ Victim IP       (blue, medium)
│   └── □ Domain/ASN      (grey, small)
│
├── Edge types:
│   ├── ─── communicates with
│   ├── ──► attacks
│   └── ···  related to
│
├── On node click ──► opens NodeDetailCard
│
└── Physics: charge repulsion + link tension
```

---

### 🧪 Workbench Drawer

```
workbench-drawer.component.ts
│
├── Triggered by: triage queue "Investigate" click
├── Animates in from right side (CSS slide transition)
│
├── Tabs:
│   ├── 📅 Timeline    → event log with timestamps
│   ├── 📄 Raw Logs    → raw log string
│   ├── 🔍 OSINT       → VirusTotal score, Shodan ports, CVEs
│   ├── 🌍 Geo         → source/destination map pins
│   └── ▶️  Actions    → trigger playbooks from here
│
└── Closes on: backdrop click or [X] button
```

---

### 📊 Stats Strip

```
stats-strip.component.ts
│
├── Input: ThreatEvent stream
├── Maintains counters:
│   ├── critical count
│   ├── high count
│   ├── medium count
│   ├── low count
│   └── total (24h)
│
├── Updates in real time on every threat:new
│
└── Visual:
    🔴 Critical: 14   🟠 High: 38   🟡 Medium: 61   🔵 Low: 22
```

---

### ▶️ Execution Playbooks

```
execution-playbooks.component.ts
│
├── Uses: PlaybookService
│
├── Available playbooks:
│   ├── 🚫 Block IP Address       → firewall rule via API
│   ├── 🔒 Isolate Host           → network isolation
│   ├── 📢 Notify SOC Team        → alert/email trigger
│   ├── 🔍 Run Antivirus Scan     → endpoint scan
│   └── 📦 Capture Network Traffic → PCAP capture
│
├── On execute:
│   POST /api/playbooks/execute
│   { threatId, playbookType }
│
└── Shows: execution log with status (running / success / failed)
```

---

## 🔌 Services

### SocketService

```typescript
// Subscribes to real-time events
threats$    = Observable<ThreatEvent>        // threat:new
updates$    = Observable<ThreatEvent>        // threat:updated
osintData$  = Observable<ThreatIntelligence> // osint:result
stats$      = Observable<StatsObject>        // stats:update

// Emits to backend
triageAction(id, action)
requestOsint(ip)
executePlaybook(threatId, type)
```

### OsintService

```typescript
// HTTP calls
getOsint(ip: string): Observable<ThreatIntelligence>
  → GET /api/osint/:ip
```

### PlaybookService

```typescript
// Execute SOAR automation
executePlaybook(threatId: string, type: PlaybookType): Observable<PlaybookResult>
  → POST /api/playbooks/execute
```

---

## ⚙️ Configuration

### Proxy (proxy.conf.json)

```json
{
  "/api": {
    "target": "http://localhost:5000",
    "secure": false
  },
  "/socket.io": {
    "target": "http://localhost:5000",
    "secure": false,
    "ws": true
  }
}
```

### Severity Color Utility

```
severity.utils.ts

  getSeverityColor(severity):
    critical  →  #ff2222
    high      →  #ff8800
    medium    →  #ffcc00
    low       →  #0088ff

  getSeverityLabel(severity):
    critical  →  "CRITICAL"
    high      →  "HIGH"
    medium    →  "MEDIUM"
    low       →  "LOW"
```

---

## 🚀 Getting Started

```bash
cd siem-frontend
npm install
npm start           # → http://localhost:4200
```

### Scripts

```
npm start        → ng serve --proxy-config proxy.conf.json
npm run build    → ng build  (production output → dist/)
npm run watch    → ng build --watch (dev mode)
```

---

## 📜 License

MIT
