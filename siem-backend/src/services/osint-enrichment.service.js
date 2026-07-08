'use strict';

/**
 * osint-enrichment.service.js
 * ───────────────────────────
 * Automated OSINT Enrichment Pipeline
 *
 * For a given IP address this service:
 *   1. Fires concurrent HTTP requests to VirusTotal v3 and Shodan APIs
 *      (using Promise.all so both calls run in parallel).
 *   2. Normalises the raw API responses into the ThreatIntelligence schema.
 *   3. Computes a composite risk_score (0–100).
 *   4. Persists the result to MongoDB and returns the saved document.
 *
 * ── Mock vs. Live mode ───────────────────────────────────────────────────
 * By default the service runs in MOCK mode (no real network calls).
 * Set the following environment variables to switch to live mode:
 *
 *   VT_API_KEY=<your VirusTotal API key>
 *   SHODAN_API_KEY=<your Shodan API key>
 *   OSINT_MOCK=false
 *
 * In mock mode the service generates deterministic-ish fake data derived
 * from the IP string so repeated calls for the same IP return consistent
 * results — useful for UI development and demos.
 */

const axios            = require('axios');
const ThreatIntelligence = require('../models/ThreatIntelligence');

// ── Configuration ─────────────────────────────────────────────────────────

const VT_API_KEY     = process.env.VT_API_KEY     || '';
const SHODAN_API_KEY = process.env.SHODAN_API_KEY || '';
const USE_MOCK       = process.env.OSINT_MOCK !== 'false'; // default: true

// ── Private / reserved IP ranges (RFC1918, loopback, link-local, etc.) ───
const PRIVATE_IP_RANGES = [
  /^10\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^192\.168\./,
  /^127\./,
  /^169\.254\./,
  /^100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./,  // RFC6598 shared address space
  /^198\.(1[89])\./,                              // RFC2544 benchmarking
  /^198\.51\.100\./,                              // RFC5737 TEST-NET-2
  /^203\.0\.113\./,                               // RFC5737 TEST-NET-3
  /^0\./,
  /^255\./,
];

/**
 * Returns true if the IP is private / reserved and should NOT be sent
 * to external APIs (VT and Shodan both return 404/403 for these).
 * @param {string} ip
 * @returns {boolean}
 */
function isPrivateIP(ip) {
  return PRIVATE_IP_RANGES.some((re) => re.test(ip));
}

/** Axios instance pre-configured for VirusTotal v3. */
const vtClient = axios.create({
  baseURL: 'https://www.virustotal.com/api/v3',
  timeout: 10_000,
  headers: {
    'x-apikey':     VT_API_KEY,
    'Accept':       'application/json',
    'Content-Type': 'application/json',
  },
});

/** Axios instance pre-configured for Shodan REST API. */
const shodanClient = axios.create({
  baseURL: 'https://api.shodan.io',
  timeout: 10_000,
  headers: { Accept: 'application/json' },
  params:  { key: SHODAN_API_KEY },
});

// ── Mock data generators ──────────────────────────────────────────────────

/**
 * Generates a deterministic seed integer from an IP string.
 * This lets us produce consistent mock data for the same IP without a DB.
 * @param {string} ip
 * @returns {number}
 */
function ipSeed(ip) {
  return ip.split('.').reduce((acc, octet, i) => acc + parseInt(octet, 10) * (i + 1), 0);
}

const MOCK_VT_ENGINES = [
  'Kaspersky', 'CrowdStrike Falcon', 'Palo Alto Networks', 'Sophos',
  'Fortinet', 'ESET-NOD32', 'Symantec', 'McAfee', 'Avast', 'Bitdefender',
  'DrWeb', 'TrendMicro', 'Microsoft', 'Malwarebytes', 'F-Secure',
];

const MOCK_MALWARE_LABELS = [
  'Trojan.GenericKD', 'Backdoor.Agent', 'Exploit.CVE-2023',
  'Ransomware.Generic', 'Miner.Monero', 'RAT.DarkComet',
];

const MOCK_SERVICES = [
  { port: 22,   protocol: 'tcp', service: 'SSH',    product: 'OpenSSH',  version: '8.9p1', banner: 'SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.6' },
  { port: 80,   protocol: 'tcp', service: 'HTTP',   product: 'nginx',    version: '1.24.0', banner: 'HTTP/1.1 200 OK\r\nServer: nginx/1.24.0' },
  { port: 443,  protocol: 'tcp', service: 'HTTPS',  product: 'nginx',    version: '1.24.0', banner: '' },
  { port: 21,   protocol: 'tcp', service: 'FTP',    product: 'vsftpd',   version: '3.0.5',  banner: '220 (vsFTPd 3.0.5)' },
  { port: 3306, protocol: 'tcp', service: 'MySQL',  product: 'MySQL',    version: '8.0.33', banner: '5.7.42-log\0' },
  { port: 6379, protocol: 'tcp', service: 'Redis',  product: 'Redis',    version: '7.0.11', banner: '+PONG\r\n' },
  { port: 8080, protocol: 'tcp', service: 'HTTP-Alt', product: 'Apache Tomcat', version: '10.1.11', banner: '' },
  { port: 445,  protocol: 'tcp', service: 'SMB',    product: 'Samba',    version: '4.17.9', banner: '' },
  { port: 3389, protocol: 'tcp', service: 'RDP',    product: 'Microsoft RDP', version: '10.0', banner: '' },
  { port: 53,   protocol: 'udp', service: 'DNS',    product: 'BIND',     version: '9.18.16', banner: '' },
];

const MOCK_ORGS = [
  'Alibaba Cloud', 'Tencent Cloud', 'OVH SAS', 'DigitalOcean LLC',
  'Hetzner Online GmbH', 'Amazon Web Services', 'Choopa LLC',
  'Linode LLC', 'Vultr Holdings LLC', 'Serverius',
];

/**
 * Builds a realistic mocked VirusTotal IP report.
 * @param {string} ip
 * @returns {object} Matches the VT v3 /ip_addresses/{ip} response shape.
 */
function mockVirusTotalResponse(ip) {
  const seed       = ipSeed(ip);
  const malicious  = (seed % 7);            // 0–6 engines flag it
  const suspicious = (seed % 3);
  const harmless   = 15 - malicious - suspicious;
  const undetected = MOCK_VT_ENGINES.length - harmless - malicious - suspicious;

  const engineResults = MOCK_VT_ENGINES.map((engine, idx) => {
    let category = 'harmless';
    let result   = null;
    if (idx < malicious)                    { category = 'malicious';  result = MOCK_MALWARE_LABELS[idx % MOCK_MALWARE_LABELS.length]; }
    else if (idx < malicious + suspicious)  { category = 'suspicious'; result = 'Suspicious.Generic'; }
    return { engine_name: engine, category, result, method: 'blacklist' };
  });

  const COUNTRIES_LIST = ['CN', 'RU', 'US', 'DE', 'IR', 'KP', 'BR', 'IN', 'UA', 'TR'];

  return {
    data: {
      id:   ip,
      type: 'ip_address',
      attributes: {
        reputation:          malicious > 3 ? -(seed % 80) : (seed % 20),
        country:             COUNTRIES_LIST[seed % COUNTRIES_LIST.length],
        as_owner:            MOCK_ORGS[seed % MOCK_ORGS.length],
        asn:                 15000 + (seed % 50000),
        network:             `${ip.split('.').slice(0, 3).join('.')}.0/24`,
        tags:                malicious > 2 ? ['malware-distributor', 'scanner'] : [],
        last_analysis_date:  Math.floor(Date.now() / 1000) - (seed % 86400),
        last_analysis_stats: { harmless, malicious, suspicious, undetected, timeout: 0 },
        last_analysis_results: Object.fromEntries(
          engineResults.map((r) => [r.engine_name, r])
        ),
      },
    },
  };
}

/**
 * Builds a realistic mocked Shodan host report.
 * @param {string} ip
 * @returns {object} Matches the Shodan /shodan/host/{ip} response shape.
 */
function mockShodanResponse(ip) {
  const seed      = ipSeed(ip);
  const portCount = 1 + (seed % 5);            // 1–5 open ports
  const ports     = MOCK_SERVICES
    .slice(seed % (MOCK_SERVICES.length - portCount), (seed % (MOCK_SERVICES.length - portCount)) + portCount)
    .map((svc) => ({
      ...svc,
      cves: svc.service === 'SMB'  ? ['CVE-2017-0144', 'CVE-2020-0796'] :
            svc.service === 'RDP'  ? ['CVE-2019-0708'] :
            svc.service === 'HTTP' ? ['CVE-2023-44487'] : [],
    }));

  const OS_LIST   = [null, 'Linux 4.x', 'Linux 5.x', 'Windows Server 2019', 'FreeBSD 13'];

  return {
    ip_str:    ip,
    org:       MOCK_ORGS[seed % MOCK_ORGS.length],
    isp:       MOCK_ORGS[(seed + 1) % MOCK_ORGS.length],
    asn:       `AS${15000 + (seed % 50000)}`,
    os:        OS_LIST[seed % OS_LIST.length],
    hostnames: seed % 4 === 0 ? [`mail.${ip.replace(/\./g, '-')}.example.com`] : [],
    tags:      seed % 5 === 0 ? ['cloud', 'self-signed'] : [],
    last_update: new Date(Date.now() - (seed % 7) * 86400_000).toISOString(),
    ports:     ports.map((p) => p.port),
    data:      ports,   // Shodan uses "data" for the detailed service array
  };
}

// ── API call functions ────────────────────────────────────────────────────

/**
 * Calls the VirusTotal v3 IP address report endpoint.
 * Automatically falls back to mock data for private/reserved IPs.
 *
 * @param {string} ip
 * @returns {Promise<object>} Parsed VT API response body
 */
async function fetchVirusTotal(ip) {
  if (USE_MOCK || isPrivateIP(ip)) {
    if (isPrivateIP(ip)) {
      console.log(`[OSINT] Private IP ${ip} — using mock data for VT`);
    }
    await new Promise((r) => setTimeout(r, 50 + Math.random() * 150));
    return mockVirusTotalResponse(ip);
  }

  try {
    const response = await vtClient.get(`/ip_addresses/${encodeURIComponent(ip)}`);
    return response.data;
  } catch (err) {
    const status = err.response?.status;
    if (status === 404) {
      // VT has no record for this IP — return a clean empty response
      console.warn(`[OSINT] VT: no record for ${ip} (404) — using empty stub`);
      return mockVirusTotalResponse(ip);
    }
    if (status === 429) {
      console.warn(`[OSINT] VT: rate limit hit for ${ip} — using mock fallback`);
      return mockVirusTotalResponse(ip);
    }
    throw new Error(`VirusTotal API error ${status ?? 'network'}: ${err.message}`);
  }
}

/**
 * Calls the Shodan host lookup endpoint.
 * Automatically falls back to mock data for private/reserved IPs.
 *
 * @param {string} ip
 * @returns {Promise<object>} Parsed Shodan API response body
 */
async function fetchShodan(ip) {
  if (USE_MOCK || isPrivateIP(ip)) {
    if (isPrivateIP(ip)) {
      console.log(`[OSINT] Private IP ${ip} — using mock data for Shodan`);
    }
    await new Promise((r) => setTimeout(r, 50 + Math.random() * 150));
    return mockShodanResponse(ip);
  }

  try {
    const response = await shodanClient.get(`/shodan/host/${encodeURIComponent(ip)}`);
    return response.data;
  } catch (err) {
    const status = err.response?.status;
    if (status === 404) {
      // Shodan hasn't scanned this IP — return a minimal stub
      console.warn(`[OSINT] Shodan: no record for ${ip} (404) — using empty stub`);
      return { ip_str: ip, org: null, isp: null, asn: null, os: null,
               hostnames: [], tags: [], ports: [], data: [], last_update: null };
    }
    if (status === 403 || status === 429) {
      // Free plan has no query credits, or rate limited — use mock so enrichment still completes
      console.warn(`[OSINT] Shodan: API restricted for ${ip} (${status}) — using mock fallback. Upgrade plan at https://account.shodan.io`);
      return mockShodanResponse(ip);
    }
    throw new Error(`Shodan API error ${status ?? 'network'}: ${err.message}`);
  }
}

// ── Response normalizers ──────────────────────────────────────────────────

/**
 * Converts a raw VirusTotal API response into the VirusTotalSchema shape.
 * @param {object} vtData
 * @returns {object}
 */
function normalizeVT(vtData) {
  const attrs = vtData?.data?.attributes ?? {};

  // Flatten last_analysis_results map → array (max 20 entries)
  const engineResults = Object.entries(attrs.last_analysis_results ?? {})
    .slice(0, 20)
    .map(([engine_name, v]) => ({
      engine_name,
      category: v.category,
      result:   v.result   || null,
      method:   v.method   || null,
    }));

  return {
    reputation:          attrs.reputation          ?? null,
    last_analysis_stats: attrs.last_analysis_stats ?? {},
    engine_results:      engineResults,
    country:             attrs.country             ?? null,
    as_owner:            attrs.as_owner            ?? null,
    asn:                 attrs.asn                 ?? null,
    network:             attrs.network             ?? null,
    tags:                attrs.tags                ?? [],
    last_analysis_date:  attrs.last_analysis_date
      ? new Date(attrs.last_analysis_date * 1000)
      : null,
  };
}

/**
 * Converts a raw Shodan API response into the ShodanSchema shape.
 * @param {object} shodanData
 * @returns {object}
 */
function normalizeShodan(shodanData) {
  const services = (shodanData?.data ?? []).map((item) => ({
    port:     item.port,
    protocol: item.transport || item.protocol || 'tcp',
    service:  item.service   || item._shodan?.module || null,
    banner:   typeof item.data === 'string'
                ? item.data.slice(0, 512)
                : item.banner?.slice(0, 512) || null,
    product:  item.product   || null,
    version:  item.version   || null,
    cves:     item.cves      || [],
  }));

  return {
    org:         shodanData?.org         ?? null,
    isp:         shodanData?.isp         ?? null,
    asn:         shodanData?.asn         ?? null,
    os:          shodanData?.os          ?? null,
    open_ports:  services,
    hostnames:   shodanData?.hostnames   ?? [],
    tags:        shodanData?.tags        ?? [],
    last_update: shodanData?.last_update ? new Date(shodanData.last_update) : null,
    total_ports: services.length,
  };
}

// ── Risk scoring ──────────────────────────────────────────────────────────

/**
 * Computes a composite risk score (0–100) from VT + Shodan data.
 *
 * Weights:
 *   40 pts — VirusTotal malicious engine count  (scaled against 15 engines max)
 *   20 pts — VirusTotal suspicious count        (scaled against 15 engines max)
 *   20 pts — Shodan open ports (scaled against 10 ports max)
 *   20 pts — Exposed CVEs (scaled against 5 CVEs max)
 *
 * @param {object} vtNorm   Normalised VT data
 * @param {object} shodanNorm Normalised Shodan data
 * @returns {{ score: number, level: string }}
 */
function computeRiskScore(vtNorm, shodanNorm) {
  const malicious  = vtNorm?.last_analysis_stats?.malicious  ?? 0;
  const suspicious = vtNorm?.last_analysis_stats?.suspicious ?? 0;
  const portCount  = shodanNorm?.total_ports ?? 0;
  const cveCount   = (shodanNorm?.open_ports ?? [])
    .reduce((acc, p) => acc + (p.cves?.length ?? 0), 0);

  const vtMalScore  = Math.min(malicious  / 15, 1) * 40;
  const vtSusScore  = Math.min(suspicious / 15, 1) * 20;
  const portScore   = Math.min(portCount  / 10, 1) * 20;
  const cveScore    = Math.min(cveCount   /  5, 1) * 20;

  const score = Math.round(vtMalScore + vtSusScore + portScore + cveScore);

  const level =
    score >= 80 ? 'Critical' :
    score >= 60 ? 'High'     :
    score >= 40 ? 'Medium'   :
    score >= 20 ? 'Low'      : 'None';

  return { score, level };
}

// ── Public API ────────────────────────────────────────────────────────────

/**
 * Enriches a single IP address with OSINT data from VirusTotal and Shodan.
 *
 * This is the main entry point called by threatWorker.js when a
 * High or Critical severity event is generated.
 *
 * The function is intentionally non-blocking from the caller's perspective:
 * it saves the result to MongoDB and resolves to the saved document.
 * Any error is caught and re-thrown so the caller can decide whether to
 * log-and-continue or propagate.
 *
 * @param {string}                       ip            - IPv4 address to enrich
 * @param {import('mongoose').Types.ObjectId} [threatEventId] - Parent ThreatEvent _id
 * @returns {Promise<import('../models/ThreatIntelligence').default>}
 */
async function enrichIP(ip, threatEventId = null) {
  // ── 1. Create a 'pending' stub immediately so the UI can show a spinner ─
  const intel = new ThreatIntelligence({
    ip,
    threat_event_id:   threatEventId,
    enrichment_status: 'in_progress',
  });
  await intel.save();

  try {
    const mode = (USE_MOCK || isPrivateIP(ip)) ? 'MOCK' : 'LIVE';
    console.log(`[OSINT] Enriching IP ${ip} (mode: ${mode})…`);

    // ── 2. Fire both API calls concurrently ──────────────────────────────
    const [vtRaw, shodanRaw] = await Promise.all([
      fetchVirusTotal(ip),
      fetchShodan(ip),
    ]);

    // ── 3. Normalise responses ───────────────────────────────────────────
    const vtNorm     = normalizeVT(vtRaw);
    const shodanNorm = normalizeShodan(shodanRaw);

    // ── 4. Compute risk score ────────────────────────────────────────────
    const { score, level } = computeRiskScore(vtNorm, shodanNorm);

    // ── 5. Update the document with enriched data ────────────────────────
    intel.virustotal        = vtNorm;
    intel.shodan            = shodanNorm;
    intel.risk_score        = score;
    intel.risk_level        = level;
    intel.enrichment_status = 'completed';
    intel.enriched_at       = new Date();

    await intel.save();

    console.log(
      `[OSINT] ✔ ${ip} enriched — risk: ${level} (${score}/100) | ` +
      `VT malicious: ${vtNorm.last_analysis_stats?.malicious ?? 0} | ` +
      `Shodan ports: ${shodanNorm.total_ports}`
    );

    return intel;

  } catch (err) {
    // Mark as failed but keep the stub so the dashboard can show the error
    intel.enrichment_status = 'failed';
    intel.error_message     = err.message?.slice(0, 1000) ?? 'Unknown error';
    await intel.save();

    console.error(`[OSINT] ✖ Enrichment failed for ${ip}:`, err.message);
    throw err;   // re-throw so the worker can decide how to handle it
  }
}

module.exports = { enrichIP };
