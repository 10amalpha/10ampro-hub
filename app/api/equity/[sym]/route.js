// /api/equity/[sym] — daily OHLC-close series for a US equity (Yahoo v8 chart) + server-side TA snapshot.
// Same engine as the crypto hubs (lib/thesis/ta.js). ?summary=1 drops the raw series (compact JSON for editorial review passes).
import { computeTrend, autoStructure, buildForecast } from '../../../lib/thesis/ta';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const ALLOWED = new Set(['TEM', 'IBRX', 'CAI', 'HIMS', 'PBLS', 'RXRX', 'NGEN', 'NAUT', 'INKT']);
const json = (b, ttl = 900) => new Response(JSON.stringify(b), { status: 200, headers: { 'content-type': 'application/json', 'cache-control': `public, s-maxage=${ttl}, stale-while-revalidate=${ttl * 4}` } });
const r4 = (v) => (v == null || !isFinite(v) ? null : +Number(v).toPrecision(4));
const day = (ts) => new Date(ts).toISOString().slice(0, 10);

async function chart(sym) {
  let last = 'no response';
  for (const host of ['query1.finance.yahoo.com', 'query2.finance.yahoo.com']) {
    try {
      const r = await fetch(`https://${host}/v8/finance/chart/${sym}?range=2y&interval=1d&includePrePost=false&events=div%2Csplit`, { headers: { 'User-Agent': UA, accept: 'application/json' }, next: { revalidate: 900 } });
      if (!r.ok) { last = `yahoo ${r.status}`; continue; }
      const j = await r.json(); const res = j?.chart?.result?.[0];
      if (!res?.timestamp?.length) { last = 'empty chart'; continue; }
      return res;
    } catch (e) { last = e.message; }
  }
  throw new Error(last);
}

export async function GET(req, { params }) {
  const sym = String(params.sym || '').toUpperCase();
  if (!ALLOWED.has(sym)) return new Response('{"ok":false,"error":"unknown ticker"}', { status: 404, headers: { 'content-type': 'application/json' } });
  const summary = new URL(req.url).searchParams.get('summary');
  try {
    const res = await chart(sym);
    const q = res.indicators?.quote?.[0] || {};
    const adj = res.indicators?.adjclose?.[0]?.adjclose;
    const t = [], c = [], v = [];
    res.timestamp.forEach((ts, i) => { const px = (adj && adj[i]) || q.close?.[i]; if (px != null && px > 0) { t.push(ts * 1000); c.push(+px); v.push((q.volume?.[i] || 0) * px); } });
    const m = res.meta || {};
    const price = m.regularMarketPrice ?? c[c.length - 1];
    // keep today's live print as the last close so live TA matches the quote
    if (price && c.length && Math.abs(t[t.length - 1] - (m.regularMarketTime || 0) * 1000) < 86400000) c[c.length - 1] = price;
    let prev = c[c.length - 2];
    try { const r1 = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${sym}?range=1d&interval=1d`, { headers: { 'User-Agent': UA }, next: { revalidate: 900 } }); const m1 = (await r1.json())?.chart?.result?.[0]?.meta; if (m1?.chartPreviousClose) prev = m1.chartPreviousClose; } catch {}
    const series = { t, c, v };
    const trend = computeTrend(c, v), st = autoStructure(series), hi = Math.max(...c);
    const fc = buildForecast(trend, st, series, { ath: hi });
    const base = {
      ok: true, sym, asOf: day(t[t.length - 1]), bars: c.length, price: r4(price), prevClose: r4(prev),
      chg: prev ? r4((price / prev - 1) * 100) : null,
      hi2y: r4(hi), lo2y: r4(Math.min(...c)), hi52: r4(m.fiftyTwoWeekHigh), lo52: r4(m.fiftyTwoWeekLow), marketTime: m.regularMarketTime ? new Date(m.regularMarketTime * 1000).toISOString() : null,
    };
    if (!summary) return json({ ...base, t, c, v });
    const n = c.length, win = (d) => { const s = c.slice(-d); return { hi: r4(Math.max(...s)), lo: r4(Math.min(...s)) }; };
    const pv = (arr) => arr.map((p) => ({ d: day(p[0]), px: r4(p[1]) }));
    const avgV = (d) => r4(v.slice(-d).reduce((a, b) => a + b, 0) / Math.min(d, v.length));
    return json({
      ...base,
      trend: trend && { last: r4(trend.last), e20: r4(trend.e20), e50: r4(trend.e50), e100: r4(trend.e100), e200: r4(trend.e200), hist: r4(trend.hist), histUp: trend.histUp, rsi: r4(trend.rsi), slope200: r4(trend.slope200), chg7: r4(trend.chg7), chg30: r4(trend.chg30), score: trend.score, regime: trend.regime, volRatio: r4(trend.volRatio), checks: trend.checks.filter((x) => x[1]).map((x) => x[0]) },
      structure: st && { pattern: st.pattern, bias: st.bias, apex: st.apexT ? day(st.apexT) : null, height: r4(st.height), resNow: r4(st.resNow), supNow: r4(st.supNow), res: st.res && { a: { d: day(st.res.a[0]), px: r4(st.res.a[1]) }, b: { d: day(st.res.b[0]), px: r4(st.res.b[1]) }, touches: st.res.touches }, sup: st.sup && { a: { d: day(st.sup.a[0]), px: r4(st.sup.a[1]) }, b: { d: day(st.sup.b[0]), px: r4(st.sup.b[1]) }, touches: st.sup.touches }, highs: pv(st.highs), lows: pv(st.lows), measured: st.measured },
      forecast: fc && { dir: fc.dir, invalidation: fc.invalidation, path: fc.path.map((p) => ({ h: p.h, target: p.target })) },
      windows: { d7: win(7), d30: win(30), d90: win(90), d180: win(180), d365: win(Math.min(252, n)), all: win(n) },
      volume: { avg20: avgV(20), avg90: avgV(90), last: r4(v[n - 1]), max30: r4(Math.max(...v.slice(-30))) },
      recent: t.slice(-15).map((ts, i) => [day(ts), r4(c[n - 15 + i])]),
    });
  } catch (e) { return json({ ok: false, sym, error: e.message }, 0); }
}
