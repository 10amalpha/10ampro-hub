// /api/equity/[sym]/quarters — discrete quarterly revenue / gross profit / operating income for review passes.
// Two independent sources returned side by side so every number can be cross-checked before it is committed:
//   sec: XBRL companyfacts from 10-Q/10-K (discrete 3-month facts; Q4 = FY minus Q1–Q3)
//   yahoo: fundamentals-timeseries (quarterly)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const ALLOWED = new Set(['TEM', 'IBRX', 'CAI', 'HIMS', 'PBLS', 'RXRX', 'NGEN', 'NAUT', 'INKT']);
const SEC_UA = '10AMPRO research info@10am.pro';
const YUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const TAGS = {
  revenue: ['Revenues', 'RevenueFromContractWithCustomerExcludingAssessedTax', 'RevenueFromContractWithCustomerIncludingAssessedTax', 'SalesRevenueNet'],
  cost: ['CostOfRevenue', 'CostOfGoodsAndServicesSold', 'CostOfServices', 'CostOfGoodsSold'],
  gross: ['GrossProfit'],
  op: ['OperatingIncomeLoss'],
  opex: ['OperatingExpenses', 'CostsAndExpenses'],
  net: ['NetIncomeLoss'],
};
const days = (a, b) => (new Date(b) - new Date(a)) / 86400000;

async function sec(sym) {
  const map = await (await fetch('https://www.sec.gov/files/company_tickers.json', { headers: { 'User-Agent': SEC_UA }, next: { revalidate: 86400 } })).json();
  const hit = Object.values(map).find((x) => x.ticker === sym);
  if (!hit) return { error: 'no CIK' };
  const cik = String(hit.cik_str).padStart(10, '0');
  const j = await (await fetch(`https://data.sec.gov/api/xbrl/companyfacts/CIK${cik}.json`, { headers: { 'User-Agent': SEC_UA }, next: { revalidate: 3600 } })).json();
  const g = j.facts?.['us-gaap'] || {};
  const out = {};
  for (const [k, tags] of Object.entries(TAGS)) {
    const q = {}, fy = {};
    for (const tag of tags) {
      const units = g[tag]?.units?.USD; if (!units) continue;
      for (const f of units) {
        if (!f.start || !f.end) continue;
        const len = days(f.start, f.end);
        if (len > 80 && len < 100) { if (!q[f.end] || f.filed > q[f.end].filed) q[f.end] = { v: f.val, filed: f.filed, form: f.form, tag }; }
        else if (len > 350 && len < 380) { if (!fy[f.end] || f.filed > fy[f.end].filed) fy[f.end] = { v: f.val, start: f.start, filed: f.filed, tag }; }
      }
    }
    // derive Q4 = FY - (Q1+Q2+Q3) when the 10-K has no discrete Q4 fact
    for (const [end, F] of Object.entries(fy)) {
      if (q[end]) continue;
      const qs = Object.entries(q).filter(([e]) => e > F.start && e < end).map(([, x]) => x.v);
      if (qs.length === 3) q[end] = { v: F.v - qs.reduce((a, b) => a + b, 0), derived: true, tag: F.tag };
    }
    out[k] = Object.fromEntries(Object.entries(q).sort().slice(-8).map(([e, x]) => [e, { v: Math.round(x.v / 1e4) / 100, ...(x.derived ? { derived: true } : {}), tag: x.tag }]));
  }
  // filers that tag only total operating expenses: operating income = revenue − opex
  for (const [e, x] of Object.entries(out.opex || {})) if (!out.op[e]) out.op[e] = { v: Math.round(((out.revenue[e]?.v || 0) - x.v) * 100) / 100, fromOpex: true };
  out.op = Object.fromEntries(Object.entries(out.op).sort().slice(-8));
  return { cik, name: j.entityName, ...out };
}

async function yahoo(sym) {
  const now = Math.floor(Date.now() / 1000);
  const types = ['quarterlyTotalRevenue', 'quarterlyGrossProfit', 'quarterlyOperatingIncome', 'quarterlyNetIncome'];
  const r = await fetch(`https://query1.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/${sym}?type=${types.join(',')}&period1=1672531200&period2=${now}`, { headers: { 'User-Agent': YUA }, next: { revalidate: 3600 } });
  const j = await r.json();
  const out = {};
  for (const res of j?.timeseries?.result || []) {
    const t = res.meta?.type?.[0]; const arr = res[t] || [];
    out[t] = Object.fromEntries(arr.filter(Boolean).map((x) => [x.asOfDate, Math.round(x.reportedValue.raw / 1e4) / 100]));
  }
  return out;
}

export async function GET(req, { params }) {
  const sym = String(params.sym || '').toUpperCase();
  if (!ALLOWED.has(sym)) return new Response('{"ok":false}', { status: 404 });
  const [s, y] = await Promise.allSettled([sec(sym), yahoo(sym)]);
  return new Response(JSON.stringify({ ok: true, sym, unit: 'USD millions', sec: s.status === 'fulfilled' ? s.value : { error: String(s.reason) }, yahoo: y.status === 'fulfilled' ? y.value : { error: String(y.reason) } }), { headers: { 'content-type': 'application/json', 'cache-control': 's-maxage=3600' } });
}
