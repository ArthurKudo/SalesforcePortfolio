export type MockupKind = "console" | "dashboard" | "journey" | "flow" | "schema" | "portal" | "approval" | "scoring";

interface MockupOptions {
  kind: MockupKind;
  app: string;
  tabs: string[];
  accent: string;
  from: string;
  to: string;
}

const FONT = "Lexend, 'Segoe UI', Arial, sans-serif";
const INK = "#032d60";
const LINE = "#c9d3df";
const SOFT = "#e6ebf1";
const PAGE = "#f3f6f9";

const r = (x: number, y: number, w: number, h: number, fill: string, rx = 6, extra = "") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" ${extra}/>`;
const t = (x: number, y: number, text: string, size = 9, fill = INK, weight = 600, anchor = "start") =>
  `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${text}</text>`;
const bar = (x: number, y: number, w: number, fill = LINE, h = 6) => r(x, y, w, h, fill, h / 2);
const card = (x: number, y: number, w: number, h: number) => r(x, y, w, h, "#fff", 8, `stroke="${SOFT}"`);

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function consoleBody(a: string) {
  let out = card(46, 100, 150, 262) + t(58, 118, "Cases", 10);
  const prio = ["#e4524c", "#f2a33a", a, "#2e844a", a, "#f2a33a"];
  for (let i = 0; i < 6; i++) {
    const y = 128 + i * 38;
    if (i === 1) out += r(50, y - 4, 142, 34, `${a}1a`, 6);
    out += `<circle cx="62" cy="${y + 9}" r="4" fill="${prio[i]}"/>` + bar(72, y + 2, 90 - (i % 3) * 14, i === 1 ? a : LINE) + bar(72, y + 14, 58, SOFT, 5);
  }
  out += card(206, 100, 328, 64) + r(218, 112, 36, 36, a, 8) + t(264, 126, "Case 00012874", 11) + bar(264, 134, 140, SOFT, 5) + bar(264, 145, 96, SOFT, 5);
  out += r(452, 116, 70, 22, a, 11) + t(487, 131, "Escalate", 8, "#fff", 600, "middle");
  const steps = 5;
  const sw = 328 / steps;
  for (let i = 0; i < steps; i++) {
    const x = 206 + i * sw;
    const fill = i < 2 ? `${a}cc` : i === 2 ? a : SOFT;
    out += `<path d="M${x} 174 h${sw - 8} l8 9 l-8 9 h-${sw - 8} l8 -9 z" fill="${fill}"/>`;
  }
  out += card(206, 202, 200, 160);
  for (let i = 0; i < 5; i++) out += bar(218, 218 + i * 28, 46, SOFT, 5) + bar(218, 228 + i * 28, 120 - (i % 2) * 30, LINE);
  out += card(414, 202, 120, 160) + t(426, 220, "Activity", 9);
  for (let i = 0; i < 4; i++) out += `<circle cx="430" cy="${240 + i * 30}" r="5" fill="${i === 0 ? a : LINE}"/>` + bar(442, 236 + i * 30, 74, SOFT, 5) + bar(442, 246 + i * 30, 50, SOFT, 4);
  return out;
}

function dashboardBody(a: string, seed: number) {
  const rnd = seeded(seed);
  let out = "";
  const kpis = [["R$ 4.2M", "Pipeline"], ["38%", "Win rate"], ["1,284", "Open cases"]];
  kpis.forEach(([v, l], i) => {
    const x = 46 + i * 166;
    out += card(x, 100, 156, 62) + t(x + 12, 124, v, 15, INK, 700) + t(x + 12, 140, l, 8, "#66738a", 500);
    let d = `M${x + 96} 146`;
    for (let k = 1; k <= 6; k++) d += ` L${x + 96 + k * 8} ${146 - rnd() * 22}`;
    out += `<path d="${d}" fill="none" stroke="${a}" stroke-width="2" stroke-linecap="round"/>`;
  });
  out += card(46, 172, 300, 190) + t(58, 192, "Opportunities by stage", 9);
  for (let i = 0; i < 8; i++) {
    const h = 30 + rnd() * 110;
    out += r(64 + i * 34, 346 - h, 20, h, i === 5 ? a : `${a}66`, 4);
  }
  out += `<line x1="58" y1="347" x2="334" y2="347" stroke="${SOFT}"/>`;
  out += card(354, 172, 180, 190) + t(366, 192, "Case mix", 9);
  const circ = 2 * Math.PI * 40;
  const parts = [0.46, 0.32, 0.22];
  const colors = [a, `${a}99`, "#f2a33a"];
  let offset = 0;
  parts.forEach((p, i) => {
    out += `<circle cx="444" cy="262" r="40" fill="none" stroke="${colors[i]}" stroke-width="16" stroke-dasharray="${p * circ} ${circ}" stroke-dashoffset="${-offset}" transform="rotate(-90 444 262)"/>`;
    offset += p * circ;
  });
  out += t(444, 266, "1,284", 11, INK, 700, "middle");
  parts.forEach((_, i) => (out += r(374, 318 + i * 13, 8, 8, colors[i], 2) + bar(388, 319 + i * 13, 50 + i * 10, SOFT, 6)));
  return out;
}

function journeyBody(a: string) {
  let out = r(46, 100, 488, 262, "#fff", 8, `stroke="${SOFT}"`);
  for (let x = 58; x < 534; x += 16) for (let y = 112; y < 362; y += 16) out += `<circle cx="${x}" cy="${y}" r="0.8" fill="${LINE}"/>`;
  const node = (x: number, y: number, label: string, fill: string, shape: "circle" | "square" | "diamond" = "square") => {
    let s = "";
    if (shape === "circle") s += `<circle cx="${x}" cy="${y}" r="17" fill="${fill}"/>`;
    else if (shape === "diamond") s += `<path d="M${x} ${y - 19} L${x + 19} ${y} L${x} ${y + 19} L${x - 19} ${y} Z" fill="${fill}"/>`;
    else s += r(x - 17, y - 17, 34, 34, fill, 8);
    s += `<path d="M${x - 7} ${y - 4} h14 v9 h-14 z M${x - 7} ${y - 4} l7 5 l7 -5" fill="none" stroke="#fff" stroke-width="1.6"/>`;
    return s + t(x, y + 32, label, 8, INK, 500, "middle");
  };
  const link = (d: string) => `<path d="${d}" fill="none" stroke="${LINE}" stroke-width="2"/>`;
  out += link("M98 231 H150") + link("M184 231 H226") + link("M260 231 H300") + link("M338 231 C360 231 360 180 390 180") + link("M338 231 C360 231 360 282 390 282") + link("M424 180 H470") + link("M424 282 H470");
  out += node(80, 231, "Entry", "#2e844a", "circle") + node(167, 231, "Welcome", a) + node(243, 231, "Wait 2d", "#7c8aa5", "circle");
  out += node(319, 231, "Engaged?", "#f2a33a", "diamond") + node(407, 180, "Offer", a) + node(407, 282, "Reminder", `${a}aa`);
  out += `<circle cx="487" cy="180" r="10" fill="none" stroke="${LINE}" stroke-width="2"/><circle cx="487" cy="282" r="10" fill="none" stroke="${LINE}" stroke-width="2"/>`;
  out += r(58, 112, 120, 22, `${a}14`, 6) + t(68, 127, "Onboarding · v3", 9, a, 600);
  return out;
}

function flowBody(a: string) {
  let out = r(46, 100, 488, 262, PAGE, 8, `stroke="${SOFT}"`);
  const box = (cx: number, y: number, label: string, color: string) =>
    r(cx - 62, y, 124, 30, "#fff", 8, `stroke="${SOFT}"`) + r(cx - 56, y + 6, 18, 18, color, 5) + t(cx - 32, y + 19, label, 8.5);
  const v = (x: number, y1: number, y2: number) => `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${LINE}" stroke-width="2"/>`;
  out += r(250, 110, 80, 22, "#2e844a", 11) + t(290, 125, "Start", 9, "#fff", 600, "middle") + v(290, 132, 146);
  out += box(290, 146, "Get Records", "#e4524c") + v(290, 176, 190);
  out += `<path d="M290 190 L312 208 L290 226 L268 208 Z" fill="#f2a33a"/>` + t(322, 212, "Approved?", 8.5, INK, 500);
  out += `<path d="M268 208 H170 V244 M312 208 H410 V244" fill="none" stroke="${LINE}" stroke-width="2"/>`;
  out += box(170, 244, "Update Opp", a) + box(410, 244, "Notify Owner", `${a}aa`);
  out += `<path d="M170 274 V300 H290 M410 274 V300 H290 V316" fill="none" stroke="${LINE}" stroke-width="2"/>`;
  out += `<circle cx="290" cy="330" r="12" fill="#fff" stroke="${a}" stroke-width="2"/>` + r(285, 325, 10, 10, a, 2);
  out += r(58, 112, 104, 22, "#fff", 6, `stroke="${SOFT}"`) + t(68, 127, "Record-Triggered", 8.5, a, 600);
  return out;
}

function schemaBody(a: string) {
  let out = r(46, 100, 488, 262, PAGE, 8, `stroke="${SOFT}"`);
  const obj = (x: number, y: number, name: string, color: string, fields: number) => {
    let s = r(x, y, 112, 30 + fields * 16, "#fff", 8, `stroke="${SOFT}"`) + r(x, y, 112, 24, color, 8) + r(x, y + 16, 112, 8, color, 0);
    s += t(x + 10, y + 16, name, 9, "#fff", 700);
    for (let i = 0; i < fields; i++) s += bar(x + 10, y + 32 + i * 16, 50 + ((i * 17) % 40), i === 0 ? `${color}88` : LINE, 5);
    return s;
  };
  const link = (d: string) => `<path d="${d}" fill="none" stroke="${a}" stroke-width="1.6" stroke-dasharray="4 3"/>`;
  out += link("M170 150 H220") + link("M332 150 H382") + link("M276 222 V250") + link("M170 290 H220") + link("M438 222 V262");
  out += obj(58, 116, "Account", a, 5) + obj(220, 116, "Opportunity", "#5a1ba9", 6) + obj(382, 116, "Quote__c", "#0b827c", 6);
  out += obj(58, 256, "Contact", `${a}cc`, 4) + obj(220, 250, "Case", "#e4524c", 5) + obj(382, 262, "Approval__c", "#f2a33a", 4);
  return out;
}

function portalBody(a: string) {
  let out = r(46, 100, 488, 262, "#fff", 8, `stroke="${SOFT}"`);
  out += `<defs><linearGradient id="hero" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="#032d60"/></linearGradient></defs>`;
  out += r(46, 100, 488, 110, "url(#hero)", 8) + t(70, 140, "How can we help?", 16, "#fff", 700);
  out += r(70, 156, 260, 28, "#fff", 14) + bar(86, 167, 120, SOFT, 6) + `<circle cx="314" cy="170" r="7" fill="${a}"/>`;
  const tiles = ["Orders", "Warranty", "Dealers", "Financing"];
  tiles.forEach((label, i) => {
    const x = 62 + i * 118;
    out += card(x, 222, 106, 76) + r(x + 12, 234, 26, 26, `${a}22`, 8) + r(x + 19, 241, 12, 12, a, 3) + t(x + 12, 278, label, 9) + bar(x + 12, 285, 70, SOFT, 4);
  });
  out += card(62, 308, 456, 44) + bar(76, 322, 160, LINE) + bar(76, 334, 220, SOFT, 5) + r(436, 318, 70, 24, a, 12) + t(471, 334, "Open case", 8, "#fff", 600, "middle");
  return out;
}

function approvalBody(a: string) {
  let out = card(46, 100, 488, 64) + r(58, 112, 36, 36, a, 8) + t(104, 126, "Discount Request · 18%", 11) + bar(104, 136, 160, SOFT, 5);
  out += r(392, 114, 64, 24, "#2e844a", 12) + t(424, 130, "Approve", 8, "#fff", 600, "middle") + r(462, 114, 60, 24, "#fff", 12, `stroke="${LINE}"`) + t(492, 130, "Reject", 8, INK, 600, "middle");
  out += card(46, 174, 300, 188) + t(58, 194, "Approval history", 9);
  const rows: [string, string][] = [["Approved", "#2e844a"], ["Pending", "#f2a33a"], ["Approved", "#2e844a"], ["Rejected", "#e4524c"], ["Approved", "#2e844a"]];
  rows.forEach(([label, color], i) => {
    const y = 206 + i * 30;
    out += `<circle cx="66" cy="${y + 8}" r="7" fill="${SOFT}"/>` + bar(80, y + 2, 110, LINE) + bar(80, y + 12, 70, SOFT, 4);
    out += r(270, y, 64, 18, `${color}22`, 9) + t(302, y + 12, label, 7.5, color, 700, "middle");
  });
  out += card(354, 174, 180, 188) + t(366, 194, "SLA", 9);
  out += `<circle cx="444" cy="262" r="44" fill="none" stroke="${SOFT}" stroke-width="12"/><circle cx="444" cy="262" r="44" fill="none" stroke="${a}" stroke-width="12" stroke-dasharray="${0.82 * 2 * Math.PI * 44} 999" transform="rotate(-90 444 262)" stroke-linecap="round"/>`;
  out += t(444, 266, "82%", 14, INK, 700, "middle") + t(444, 330, "approved in 24h", 8, "#66738a", 500, "middle");
  return out;
}

function scoringBody(a: string, seed: number) {
  const rnd = seeded(seed);
  let out = card(46, 100, 320, 262) + t(58, 120, "Leads · Einstein Score", 9);
  out += `<line x1="58" y1="130" x2="354" y2="130" stroke="${SOFT}"/>`;
  for (let i = 0; i < 7; i++) {
    const y = 140 + i * 31;
    const score = Math.round(95 - i * 9 - rnd() * 6);
    const color = score > 75 ? "#2e844a" : score > 55 ? "#f2a33a" : "#e4524c";
    out += `<circle cx="70" cy="${y + 9}" r="8" fill="${SOFT}"/>` + bar(86, y + 3, 90, LINE) + bar(86, y + 13, 60, SOFT, 4);
    out += r(220, y + 4, 90, 8, SOFT, 4) + r(220, y + 4, (score / 100) * 90, 8, color, 4) + t(330, y + 12, String(score), 9, color, 700, "middle");
  }
  out += card(374, 100, 160, 140) + t(386, 120, "Conversion lift", 9);
  out += `<path d="M394 214 A60 60 0 0 1 514 214" fill="none" stroke="${SOFT}" stroke-width="12" stroke-linecap="round"/><path d="M394 214 A60 60 0 0 1 494 172" fill="none" stroke="${a}" stroke-width="12" stroke-linecap="round"/>`;
  out += t(454, 210, "+27%", 15, INK, 700, "middle");
  out += card(374, 248, 160, 114) + t(386, 268, "Top factors", 9);
  for (let i = 0; i < 4; i++) out += bar(386, 280 + i * 18, 40 + (4 - i) * 22, i === 0 ? a : `${a}55`, 8);
  return out;
}

export function mockup({ kind, app, tabs, accent, from, to }: MockupOptions) {
  const seed = app.length * 31 + kind.length * 7;
  const bodies: Record<MockupKind, string> = {
    console: consoleBody(accent),
    dashboard: dashboardBody(accent, seed),
    journey: journeyBody(accent),
    flow: flowBody(accent),
    schema: schemaBody(accent),
    portal: portalBody(accent),
    approval: approvalBody(accent),
    scoring: scoringBody(accent, seed),
  };
  let tabX = 150;
  const tabMarkup = tabs
    .map((tab, i) => {
      const x = tabX;
      tabX += tab.length * 5.6 + 22;
      return t(x, 77, tab, 8.5, i === 0 ? INK : "#66738a", i === 0 ? 600 : 500) + (i === 0 ? r(x - 2, 85, tab.length * 5.6 + 4, 3, accent, 1.5) : "");
    })
    .join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 400">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient>
<filter id="sh" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#021a3a" flood-opacity=".35"/></filter>
<clipPath id="win"><rect x="34" y="34" width="512" height="340" rx="12"/></clipPath>
</defs>
<rect width="580" height="400" fill="url(#bg)"/>
<circle cx="520" cy="40" r="120" fill="#fff" fill-opacity=".08"/>
<circle cx="40" cy="380" r="90" fill="#fff" fill-opacity=".06"/>
<rect x="34" y="34" width="512" height="340" rx="12" fill="#fff" filter="url(#sh)"/>
<g clip-path="url(#win)">
<rect x="34" y="34" width="512" height="24" fill="#eef2f6"/>
<circle cx="50" cy="46" r="4" fill="#ff5f57"/><circle cx="63" cy="46" r="4" fill="#febc2e"/><circle cx="76" cy="46" r="4" fill="#28c840"/>
${r(150, 40, 280, 12, "#fff", 6)}
<rect x="34" y="58" width="512" height="30" fill="#fff"/>
<circle cx="52" cy="73" r="9" fill="${accent}"/>
<path d="M47.5 74.5a3 3 0 0 1 2.2-4.3 3.6 3.6 0 0 1 6.3.9 2.7 2.7 0 0 1 .3 5.4h-7.8a2.1 2.1 0 0 1-1-2z" fill="#fff"/>
${t(66, 77, app, 10, INK, 700)}
${tabMarkup}
<rect x="34" y="88" width="512" height="1" fill="${SOFT}"/>
<rect x="34" y="89" width="512" height="285" fill="${PAGE}"/>
${bodies[kind]}
</g>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
