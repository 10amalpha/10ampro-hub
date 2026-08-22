// ============================================================
// /api/nosana — server-side proxy for Nosana network + market data
// Fetches server-to-server (no browser CORS) from:
//   - Nosana API   : https://dashboard.k8s.prd.nos.ci  (same backend as explore.nosana.com)
//   - CoinGecko    : price / market cap / history
// Modes (query params):
//   (none)                       -> summary KPIs { completed, jobHours, running, queued, hosts, price, mcap, chg }
//   ?series=hours|count&period=S -> Nosana time-series { data:[{x,y}] }  (period in seconds, 0 = ALL)
//   ?history=90|365|max          -> CoinGecko price + market-cap history
// ============================================================

export const dynamic = 'force-dynamic';

const NOS = 'https://dashboard.k8s.prd.nos.ci';
const CG = 'https://api.coingecko.com/api/v3';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function jget(url, ms = 12000) {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), ms);
  try {
    const r = await fetch(url, {
      headers: { Accept: 'application/json', 'User-Agent': UA },
      cache: 'no-store',
      signal: c.signal,
    });
    if (!r.ok) throw new Error(String(r.status));
    return await r.json();
  } finally {
    clearTimeout(t);
  }
}

const json = (body, sMaxAge) =>
  Response.json(body, {
    headers: sMaxAge
      ? { 'Cache-Control': `public, s-maxage=${sMaxAge}, stale-while-revalidate=${sMaxAge * 2}` }
      : {},
  });

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const series = searchParams.get('series');
  const period = searchParams.get('period');
  const history = searchParams.get('history');

  try {
    // ---- Nosana time-series (compute hours / job count) ----
    if (series) {
      const ep = series === 'count' ? 'timestamps' : 'timestamps-hours';
      const j = await jget(`${NOS}/api/jobs/stats/${ep}?period=${encodeURIComponent(period || '0')}`);
      return json({ ok: true, data: Array.isArray(j?.data) ? j.data : [] }, 300);
    }

    // ---- CoinGecko price + market-cap history ----
    if (history) {
      const days = ['90', '365', 'max'].includes(history) ? history : '365';
      const url = `${CG}/coins/nosana/market_chart?vs_currency=usd&days=${days}${days !== 'max' ? '&interval=daily' : ''}`;
      const j = await jget(url, 15000);
      return json({ ok: true, prices: j.prices || [], market_caps: j.market_caps || [], volumes: j.total_volumes || [] }, 600);
    }

    // ---- summary KPIs ----
    const [statsR, runR, quR, mktR, cgR] = await Promise.allSettled([
      jget(`${NOS}/api/jobs/stats`),
      jget(`${NOS}/api/jobs?limit=1&offset=0&state=RUNNING`),
      jget(`${NOS}/api/jobs?limit=1&offset=0&state=QUEUED`),
      jget(`${NOS}/api/markets`),
      jget(`${CG}/simple/price?ids=nosana&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`),
    ]);

    const stats = statsR.status === 'fulfilled' ? statsR.value || {} : {};
    const running = runR.status === 'fulfilled' ? (runR.value?.totalJobs ?? null) : null;
    const queued = quR.status === 'fulfilled' ? (quR.value?.totalJobs ?? null) : null;

    let hosts = null;
    if (mktR.status === 'fulfilled' && Array.isArray(mktR.value)) {
      const q = mktR.value.reduce(
        (a, b) => a + (b?.queueType === 1 && Array.isArray(b.queue) ? b.queue.length : 0),
        0
      );
      hosts = q + (running || 0);
    }

    const cg = cgR.status === 'fulfilled' ? (cgR.value?.nosana || {}) : {};

    return json(
      {
        ok: true,
        completed: stats.completed ?? null,
        jobHours: stats.duration != null ? Math.round(stats.duration / 3600) : null,
        running,
        queued,
        hosts,
        price: cg.usd ?? null,
        mcap: cg.usd_market_cap ?? null,
        chg: cg.usd_24h_change ?? null,
        ts: Date.now(),
      },
      60
    );
  } catch (e) {
    return json({ ok: false, error: String(e && e.message ? e.message : e) });
  }
}
