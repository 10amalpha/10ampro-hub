// /api/hub/[hub]/ta — server-side TA snapshot (same engine as the page: ta.js) for editorial review passes.
// Returns trend (EMA stack, MACD, RSI, regime), auto-structure, forecast and recent pivots as compact JSON.
// Accepts any registered hub slug plus 'nosana' (standalone page, cgId 'nosana').
import { getHub } from '../../../../lib/thesis/registry';
import { computeTrend, autoStructure, buildForecast } from '../../../../lib/thesis/ta';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const CG = 'https://api.coingecko.com/api/v3';
const json = (b, ttl = 300) => new Response(JSON.stringify(b), { status: 200, headers: { 'content-type': 'application/json', 'cache-control': `public, s-maxage=${ttl}, stale-while-revalidate=${ttl * 4}` } });
const r3 = (v) => (v == null || !isFinite(v) ? null : +Number(v).toPrecision(4));
const day = (ts) => new Date(ts).toISOString().slice(0, 10);
export async function GET(req, { params }) {
  const TOKEN = getHub(params.hub);
  const cgId = TOKEN?.cgId || (params.hub === 'nosana' ? 'nosana' : null);
  if (!cgId) return new Response('{"ok":false,"error":"unknown hub"}', { status: 404, headers: { 'content-type': 'application/json' } });
  try {
    const [h, m] = await Promise.all([
      fetch(`${CG}/coins/${cgId}/market_chart?vs_currency=usd&days=365&interval=daily`, { headers: { accept: 'application/json' }, next: { revalidate: 300 } }).then((r) => r.json()),
      fetch(`${CG}/coins/${cgId}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`, { headers: { accept: 'application/json' }, next: { revalidate: 300 } }).then((r) => r.json()),
    ]);
    const t = (h.prices || []).map((p) => p[0]), c = (h.prices || []).map((p) => p[1]), v = (h.total_volumes || []).map((p) => p[1]);
    const series = { t, c, v };
    const trend = computeTrend(c, v);
    const st = autoStructure(series);
    const md = m.market_data || {};
    const fc = buildForecast(trend, st, series, { ath: md.ath?.usd });
    const n = c.length;
    const win = (d) => { const s = c.slice(-d); return { hi: r3(Math.max(...s)), lo: r3(Math.min(...s)) }; };
    const pv = (arr) => arr.map((p) => ({ d: day(p[0]), px: r3(p[1]) }));
    const avgV = (d) => r3(v.slice(-d).reduce((a, b) => a + b, 0) / Math.min(d, v.length));
    return json({
      ok: true, hub: params.hub, cgId, asOf: day(t[n - 1]),
      price: r3(md.current_price?.usd), mcap: r3(md.market_cap?.usd), fdv: r3(md.fully_diluted_valuation?.usd), vol24: r3(md.total_volume?.usd),
      ath: r3(md.ath?.usd), athDate: md.ath_date?.usd?.slice(0, 10), atl: r3(md.atl?.usd), atlDate: md.atl_date?.usd?.slice(0, 10),
      chg: { d1: r3(md.price_change_percentage_24h), d7: r3(md.price_change_percentage_7d), d30: r3(md.price_change_percentage_30d), d60: r3(md.price_change_percentage_60d), d200: r3(md.price_change_percentage_200d), y1: r3(md.price_change_percentage_1y) },
      trend: trend && { last: r3(trend.last), e20: r3(trend.e20), e50: r3(trend.e50), e100: r3(trend.e100), e200: r3(trend.e200), hist: r3(trend.hist), histUp: trend.histUp, rsi: r3(trend.rsi), slope200: r3(trend.slope200), score: trend.score, regime: trend.regime, volRatio: r3(trend.volRatio), checks: trend.checks.filter((x) => x[1]).map((x) => x[0]) },
      structure: st && { pattern: st.pattern, bias: st.bias, apex: st.apexT ? day(st.apexT) : null, height: r3(st.height), resNow: r3(st.resNow), supNow: r3(st.supNow), res: st.res && { a: { d: day(st.res.a[0]), px: r3(st.res.a[1]) }, b: { d: day(st.res.b[0]), px: r3(st.res.b[1]) }, touches: st.res.touches }, sup: st.sup && { a: { d: day(st.sup.a[0]), px: r3(st.sup.a[1]) }, b: { d: day(st.sup.b[0]), px: r3(st.sup.b[1]) }, touches: st.sup.touches }, highs: pv(st.highs), lows: pv(st.lows), measured: st.measured, rangeHigh: r3(st.rangeHigh), rangeLow: r3(st.rangeLow) },
      forecast: fc && { dir: fc.dir, invalidation: fc.invalidation, path: fc.path.map((p) => ({ h: p.h, target: p.target })) },
      windows: { d7: win(7), d30: win(30), d90: win(90), d180: win(180), d365: win(n) },
      volume: { avg20: avgV(20), avg90: avgV(90), last: r3(v[n - 1]), max30: r3(Math.max(...v.slice(-30))) },
      recentCloses: c.slice(-12).map(r3),
    }, 300);
  } catch (e) { return json({ ok: false, error: e.message }, 0); }
}
