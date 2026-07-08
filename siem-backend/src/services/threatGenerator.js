'use strict';

/**
 * threatGenerator.js
 * ──────────────────
 * Generates randomised, realistic cyber-attack event payloads that match
 * the ThreatEvent Mongoose schema. All data is synthetic and is intended
 * purely for dashboard visualisation and testing purposes.
 */

// ── Lookup tables ─────────────────────────────────────────────────────────

const COUNTRIES = [
  { name: 'China',          lat:  35.8617,  long: 104.1954 },
  { name: 'Russia',         lat:  61.5240,  long: 105.3188 },
  { name: 'United States',  lat:  37.0902,  long:  -95.7129 },
  { name: 'Brazil',         lat: -14.2350,  long:  -51.9253 },
  { name: 'Germany',        lat:  51.1657,  long:   10.4515 },
  { name: 'India',          lat:  20.5937,  long:   78.9629 },
  { name: 'North Korea',    lat:  40.3399,  long:  127.5101 },
  { name: 'Iran',           lat:  32.4279,  long:   53.6880 },
  { name: 'United Kingdom', lat:  55.3781,  long:   -3.4360 },
  { name: 'France',         lat:  46.2276,  long:    2.2137 },
  { name: 'Japan',          lat:  36.2048,  long:  138.2529 },
  { name: 'Australia',      lat: -25.2744,  long:  133.7751 },
  { name: 'Canada',         lat:  56.1304,  long:  -106.3468 },
  { name: 'South Korea',    lat:  35.9078,  long:  127.7669 },
  { name: 'Netherlands',    lat:  52.1326,  long:    5.2913 },
  { name: 'Ukraine',        lat:  48.3794,  long:   31.1656 },
  { name: 'Nigeria',        lat:   9.0820,  long:    8.6753 },
  { name: 'Pakistan',       lat:  30.3753,  long:   69.3451 },
  { name: 'Turkey',         lat:  38.9637,  long:   35.2433 },
  { name: 'Mexico',         lat:  23.6345,  long: -102.5528 },
];

/** Known APT / threat-actor IP blocks (subnets are illustrative, not real). */
const IP_PREFIXES = [
  '45.33',  '103.21', '185.220', '194.165', '79.134',
  '192.168', '10.0',  '172.16',  '91.108',  '5.188',
  '198.51',  '203.0', '198.18',  '100.64',  '198.19',
];

const ATTACK_CONFIGS = [
  {
    attack_type:  'SSH Brute Force',
    severities:   ['Medium', 'High'],
    portRange:    [22, 22],
    descTemplate: (src, tgt) =>
      `Repeated SSH login attempts detected from ${src} targeting ${tgt} — possible credential stuffing.`,
    packetRange:  [500,  5000],
  },
  {
    attack_type:  'SQL Injection',
    severities:   ['High', 'Critical'],
    portRange:    [80, 443],
    descTemplate: (src, tgt) =>
      `Malicious SQL payloads detected in HTTP requests from ${src} to ${tgt} web service.`,
    packetRange:  [10,   200],
  },
  {
    attack_type:  'DDoS',
    severities:   ['High', 'Critical'],
    portRange:    [80, 443],
    descTemplate: (src, tgt) =>
      `Volumetric DDoS flood originating from ${src} — ${tgt} services under sustained pressure.`,
    packetRange:  [50000, 500000],
  },
  {
    attack_type:  'Port Scan',
    severities:   ['Low', 'Medium'],
    portRange:    [1, 65535],
    descTemplate: (src, tgt) =>
      `Systematic port scan from ${src} against ${tgt} — reconnaissance phase likely in progress.`,
    packetRange:  [200,  2000],
  },
  {
    attack_type:  'Malware',
    severities:   ['High', 'Critical'],
    portRange:    [443, 8443],
    descTemplate: (src, tgt) =>
      `Malware C2 beacon traffic detected from ${tgt} back to ${src} over encrypted channel.`,
    packetRange:  [50,   500],
  },
  {
    attack_type:  'Phishing',
    severities:   ['Medium', 'High'],
    portRange:    [25, 587],
    descTemplate: (src, tgt) =>
      `Phishing campaign email originating from ${src} targeting users at ${tgt}.`,
    packetRange:  [1,    50],
  },
  {
    attack_type:  'Man-in-the-Middle',
    severities:   ['High', 'Critical'],
    portRange:    [443, 443],
    descTemplate: (src, tgt) =>
      `TLS certificate mismatch detected — possible MitM interception between ${src} and ${tgt}.`,
    packetRange:  [100,  1000],
  },
  {
    attack_type:  'Zero-Day Exploit',
    severities:   ['Critical'],
    portRange:    [0, 65535],
    descTemplate: (src, tgt) =>
      `Unknown exploit signature detected from ${src} — CVE pending. Target: ${tgt}.`,
    packetRange:  [1,    100],
  },
  {
    attack_type:  'Ransomware',
    severities:   ['Critical'],
    portRange:    [445, 445],
    descTemplate: (src, tgt) =>
      `Ransomware lateral movement via SMB detected — originating from ${src}, targeting ${tgt}.`,
    packetRange:  [300,  3000],
  },
  {
    attack_type:  'DNS Spoofing',
    severities:   ['Medium', 'High'],
    portRange:    [53, 53],
    descTemplate: (src, tgt) =>
      `Forged DNS response from ${src} redirecting ${tgt} resolver queries.`,
    packetRange:  [20,   200],
  },
];

// ── Helper utilities ──────────────────────────────────────────────────────

/**
 * Returns a random integer in the inclusive range [min, max].
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns a random element from an array.
 * @template T
 * @param {T[]} arr
 * @returns {T}
 */
function randItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generates a plausible random IPv4 address using known threat-actor prefixes.
 * @returns {string}
 */
function generateIP() {
  const prefix = randItem(IP_PREFIXES);
  const octets = prefix.split('.');
  while (octets.length < 4) {
    octets.push(String(randInt(1, 254)));
  }
  return octets.join('.');
}

/**
 * Adds a small ±jitter (up to ±2°) to a country's centroid so that multiple
 * events from the same country don't all stack on the exact same map pin.
 * @param {number} base
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function jitterCoord(base, min, max) {
  const jitter = (Math.random() - 0.5) * 4; // ±2°
  return Math.min(max, Math.max(min, parseFloat((base + jitter).toFixed(4))));
}

// ── Core generator ────────────────────────────────────────────────────────

/**
 * Generates a single randomised ThreatEvent payload.
 * The returned object matches the ThreatEvent Mongoose schema and can be
 * passed directly to `new ThreatEvent(payload)`.
 *
 * @returns {object} Raw threat event data object
 */
function generateThreatEvent() {
  // Pick two distinct countries for source and target
  const sourceCountry = randItem(COUNTRIES);
  let   targetCountry = randItem(COUNTRIES);
  while (targetCountry.name === sourceCountry.name) {
    targetCountry = randItem(COUNTRIES);
  }

  // Pick a random attack config
  const config   = randItem(ATTACK_CONFIGS);
  const sourceIP = generateIP();
  const targetIP = generateIP();

  const payload = {
    source_ip:      sourceIP,
    target_ip:      targetIP,
    source_country: sourceCountry.name,
    target_country: targetCountry.name,

    // Slight geo-jitter so the globe shows dispersed attack origins
    coordinates: {
      lat:  jitterCoord(sourceCountry.lat,   -90,  90),
      long: jitterCoord(sourceCountry.long, -180, 180),
    },

    attack_type:  config.attack_type,
    severity:     randItem(config.severities),
    description:  config.descTemplate(sourceIP, targetIP),
    packet_count: randInt(...config.packetRange),
    timestamp:    new Date(),
  };

  return payload;
}

module.exports = { generateThreatEvent };
