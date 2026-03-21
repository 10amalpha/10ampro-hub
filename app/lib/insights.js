// ============================================================
// lib/insights.js — Shared insights generation logic
// Called directly by page.jsx (avoids self-fetch deadlock)
// Also used by /api/insights for external access
// ============================================================

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

// ─── Fetch Substack RSS via rss2json ────────────────────────
export async function fetchSubstackArticles() {
  try {
    const res = await fetch(
      'https://api.rss2json.com/v1/api.json?rss_url=https://www.10am.pro/feed',
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    if (data.status !== 'ok') return [];
    return (data.items || []).map(item => ({
      title: item.title,
      url: item.link,
      description: (item.description || '').replace(/<[^>]*>/g, '').slice(0, 300),
      date: item.pubDate,
    }));
  } catch (e) {
    console.error('RSS fetch error:', e.message);
    return [];
  }
}

// ─── Fetch market snapshot ──────────────────────────────────
export async function fetchMarketSnapshot() {
  try {
    const symbols = '^GSPC,^VIX,DX-Y.NYB,CL=F,^TNX,COP=X';
    let quotes = [];
    for (const host of ['query2.finance.yahoo.com', 'query1.finance.yahoo.com']) {
      try {
        const res = await fetch(`https://${host}/v7/finance/quote?symbols=${encodeURIComponent(symbols)}`, {
          headers: { 'User-Agent': UA }, next: { revalidate: 300 },
        });
        if (res.ok) {
          const data = await res.json();
          quotes = data.quoteResponse?.result || [];
          if (quotes.length > 0) break;
        }
      } catch { continue; }
    }
    const q = (sym) => quotes.find(x => x.symbol === sym);

    let btc = null, sol = null;
    try {
      const cgRes = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,solana&vs_currencies=usd&include_24hr_change=true',
        { next: { revalidate: 300 } }
      );
      if (cgRes.ok) {
        const cg = await cgRes.json();
        btc = cg.bitcoin; sol = cg.solana;
      }
    } catch {}

    const p = (x) => x?.regularMarketPrice;
    const c = (x) => x?.regularMarketChangePercent;
    return {
      sp500: { price: p(q('^GSPC')), change: c(q('^GSPC')) },
      vix: { price: p(q('^VIX')), change: c(q('^VIX')) },
      dxy: { price: p(q('DX-Y.NYB')), change: c(q('DX-Y.NYB')) },
      wti: { price: p(q('CL=F')), change: c(q('CL=F')) },
      us10y: { price: p(q('^TNX')) },
      usdcop: { price: p(q('COP=X')), change: c(q('COP=X')) },
      btc: btc ? { price: btc.usd, change: btc.usd_24h_change } : null,
      sol: sol ? { price: sol.usd, change: sol.usd_24h_change } : null,
    };
  } catch (e) {
    console.error('Market snapshot error:', e.message);
    return {};
  }
}

// ─── Fallback insights ──────────────────────────────────────
export const FALLBACK_INSIGHTS = [
  { tag: 'MACRO', color: '#60a5fa', text: 'Mercados en modo wait-and-see. La atención está en datos de empleo y las minutas de la Fed.', link: { label: 'El framework macro de 10AMPRO →', url: 'https://www.10am.pro' } },
  { tag: 'RISK', color: '#facc15', text: 'VIX es el termómetro. Debajo de 20 es complacencia, arriba de 30 es miedo.', link: null },
  { tag: 'LIQ', color: '#22d3ee', text: 'Net Liquidity (FED BAL − TGA − RRP) es el indicador clave. Cuando sube, risk assets suben.', link: { label: 'El framework de liquidez →', url: 'https://www.10am.pro/p/el-hombre-que-esta-reprogramando' } },
  { tag: 'BTC', color: '#f59e0b', text: 'Bitcoin sigue correlacionado con Net Liquidity. La tesis de largo plazo no cambia.', link: null },
  { tag: 'COP', color: '#a78bfa', text: 'El peso colombiano se mueve con DXY y riesgo político local.', link: null },
  { tag: 'AI', color: '#06b6d4', text: 'La carrera de AI sigue acelerando. PLTR para gobierno, NVDA para infra, DUOL para consumer.', link: null },
];

// ─── Generate insights via Anthropic ────────────────────────
export async function generateInsights(articles, market) {
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) {
    console.error('No ANTHROPIC_API_KEY');
    return null;
  }

  const articleList = articles.slice(0, 25).map((a, i) =>
    `${i + 1}. "${a.title}" — ${a.url}\n   ${a.description}`
  ).join('\n');

  const f = (v, d = 2) => v != null ? Number(v).toFixed(d) : '?';
  const marketBlock = [
    `S&P 500: ${f(market.sp500?.price)} (${f(market.sp500?.change)}%)`,
    `VIX: ${f(market.vix?.price, 1)} (${f(market.vix?.change)}%)`,
    `DXY: ${f(market.dxy?.price, 1)} (${f(market.dxy?.change)}%)`,
    `WTI: $${f(market.wti?.price, 1)} (${f(market.wti?.change)}%)`,
    `US 10Y: ${f(market.us10y?.price)}%`,
    `USD/COP: ${f(market.usdcop?.price, 0)} (${f(market.usdcop?.change)}%)`,
    `BTC: $${market.btc?.price?.toLocaleString() ?? '?'} (${f(market.btc?.change)}%)`,
    `SOL: $${f(market.sol?.price)} (${f(market.sol?.change)}%)`,
  ].join('\n');

  const systemPrompt = `Eres el motor editorial de 10AMPRO, una plataforma de inversión táctica para audiencia LATAM. Generas los insights editoriales del morning briefing.

VOZ Y TONO:
- Escribe como Hernán Jaramillo le hablaría al Búnker (comunidad privada de 10AMPRO). Directo, con opinión, sin rodeos.
- No eres Bloomberg. Eres el comentario que le harías a un amigo inversor mientras toman café.
- Conversacional pero informado. "El mercado no sabe qué hacer", "Esto se mueve por narrativa, no por fundamentales", "La tesis sigue intacta".
- Irreverente cuando toca, siempre con sustancia detrás.
- NUNCA genérico. "Los inversores deben estar atentos" no dice nada. Prohibido.
- Máximo 2-3 oraciones por insight. Conciso y punchy.
- En español. LATAM-friendly. Términos de mercado en inglés están bien (pricing in, risk-on, rally, etc).
- Cada insight debe aportar información de VALOR REAL — un dato, un nivel de precio, un framework, una conexión no obvia. Nada de relleno.

FRAMEWORK MACRO DE 10AMPRO (tu lente de análisis):
- Net Liquidity (FED BAL − TGA − RRP) = indicador líder. Cuando sube, risk assets suben.
- M2 global expandiendo = positivo para BTC y growth stocks en 3-6 meses.
- VIX < 20 = complacencia. 20-25 = indecisión. > 25 = miedo. > 30 = pánico.
- DXY débil = bueno para LATAM, emergentes, COP.
- Bessent "3-3-3": déficit a 3% GDP, 3% crecimiento, 3M bpd oil.
- El mercado se mueve por narrativa, no solo por fundamentales.
- Tesis secular: macro regime shift — liquidez global expandiendo, AI como catalizador secular, cripto como infraestructura financiera.

WATCHLIST CLAVE:
Stocks: PLTR, HOOD, TSLA, HIMS, QSI, DUOL, STKE, MP, OKLO, AMD, NVDA, MSTR, BE, IBIT
Crypto: BTC, SOL, SUI, ETH, JUP, NOS, JTO, HNT

REGLAS ESTRICTAS:
1. Genera exactamente 6 insights.
2. Tags permitidos y sus colores: MACRO=#60a5fa, RISK=#facc15, LIQ=#22d3ee, COP=#a78bfa, BTC=#f59e0b, SOL=#9333ea, TSLA=#f87171, PLTR=#22c55e, HOOD=#4ade80, BE=#34d399, AI=#06b6d4, EARNINGS=#fb923c, CRIPTO=#f59e0b, LATAM=#a78bfa, ENERGIA=#f97316, o cualquier ticker del watchlist.
3. EXACTAMENTE 2 de los 6 insights deben incluir un link a un artículo real del catálogo RSS. No más, no menos. Usa URLs exactas del catálogo — NO inventes URLs.
4. Los otros 4 insights NO llevan link. Solo texto de valor.
5. Los links deben ser contextualmente relevantes. Si hablas de liquidez, linkea el artículo de liquidez.
6. El label del link: descriptivo y atractivo. No "Leer más →".
7. No repitas el mismo tag dos veces.
8. CADA insight debe contener información táctica: un nivel de precio relevante, un dato macro concreto, un framework de decisión, o una conexión entre variables que no es obvia.
9. Responde SOLO con un JSON array válido. Sin markdown, sin backticks, sin explicaciones.

FORMATO:
[
  { "tag": "MACRO", "color": "#60a5fa", "text": "Tu insight con datos concretos.", "link": { "label": "Texto del link →", "url": "https://www.10am.pro/p/..." } },
  { "tag": "BTC", "color": "#f59e0b", "text": "Insight táctico sin link.", "link": null }
]`;

  const userPrompt = `DATOS DE MERCADO HOY (${new Date().toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}):

${marketBlock}

CATÁLOGO DE ARTÍCULOS RECIENTES DE 10AM.PRO:
${articleList}

Genera los 6 insights editoriales. Exactamente 2 con link, 4 sin link. Solo JSON.`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`Anthropic API error: HTTP ${res.status} — ${res.status === 402 ? 'INSUFFICIENT CREDITS' : res.status === 401 ? 'INVALID API KEY' : res.status === 429 ? 'RATE LIMITED' : 'UNKNOWN'}`);
      console.error('Response:', errText.substring(0, 200));
      return null;
    }

    const data = await res.json();
    const text = (data.content || []).map(b => b.text || '').join('');
    const clean = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    const insights = JSON.parse(clean);

    if (!Array.isArray(insights) || insights.length === 0) return null;
    return insights;
  } catch (e) {
    console.error('Insights generation error:', e.message);
    return null;
  }
}

// ─── In-memory cache (survives across ISR renders within same serverless instance) ───
let _cachedInsights = null;
let _cachedAt = 0;
const CACHE_TTL = 8 * 60 * 60 * 1000; // 8 hours in ms

// ─── Main entry point ───────────────────────────────────────
export async function getInsights() {
  // Return cached if fresh
  const now = Date.now();
  if (_cachedInsights && (now - _cachedAt) < CACHE_TTL) {
    console.log(`Insights: returning cached (age: ${Math.round((now - _cachedAt) / 60000)}min)`);
    return _cachedInsights;
  }

  try {
    const [articles, market] = await Promise.all([
      fetchSubstackArticles(),
      fetchMarketSnapshot(),
    ]);

    console.log(`Insights: ${articles.length} RSS articles, ${Object.keys(market).length} market keys — calling Anthropic`);

    const insights = await generateInsights(articles, market);
    if (insights && insights.length > 1) {
      _cachedInsights = insights;
      _cachedAt = Date.now();
      console.log('Insights: cached fresh AI-generated insights');
      return insights;
    }

    console.warn('Insights generation failed — using fallback');
    return FALLBACK_INSIGHTS;
  } catch (e) {
    console.error('getInsights error:', e.message);
    return FALLBACK_INSIGHTS;
  }
}
