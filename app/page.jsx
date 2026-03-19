// ============================================================
// 10AMPRO HUB v5p — Bloomberg Terminal Aesthetic
// Bloque 1: Header + Signal Banner + Macro Bar
// Pure Server Component — zero client JS
// ============================================================

const YAHOO_SYMBOLS = ['%5EGSPC','%5EVIX','DX-Y.NYB','CL%3DF','JPY%3DX','COP%3DX'];
const YAHOO_LABELS = { '%5EGSPC':'S&P 500','%5EVIX':'VIX','DX-Y.NYB':'DXY','CL%3DF':'WTI','JPY%3DX':'USD/JPY','COP%3DX':'USD/COP' };
const YAHOO_SHORT  = { '%5EGSPC':'S&P','%5EVIX':'VIX','DX-Y.NYB':'DXY','CL%3DF':'WTI','JPY%3DX':'JPY','COP%3DX':'COP' };

// LIQ row symbols
const LIQ_SYMBOLS = ['%5ETNX','%5EIRX'];
const LIQ_LABELS = { '%5ETNX':'US 10Y','%5EIRX':'US 2Y' };
const LIQ_SHORT  = { '%5ETNX':'US10Y','%5EIRX':'US2Y' };

async function fetchYahoo(symbols) {
  const joined = symbols.join(',');
  const urls = [
    `https://query2.finance.yahoo.com/v7/finance/quote?symbols=${joined}`,
    `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${joined}`,
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
        next: { revalidate: 300 },
      });
      if (!res.ok) continue;
      const data = await res.json();
      if (data?.quoteResponse?.result?.length) return data.quoteResponse.result;
    } catch { continue; }
  }
  return [];
}

async function fetchCrypto() {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,solana&vs_currencies=usd&include_24hr_change=true',
      { next: { revalidate: 120 } }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

function fmt(n, decimals = 2) {
  if (n == null || isNaN(n)) return '—';
  if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (Math.abs(n) >= 1e4) return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
  return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function pct(n) {
  if (n == null || isNaN(n)) return '—';
  const s = n >= 0 ? '+' : '';
  return s + n.toFixed(2) + '%';
}

function cellColor(val) {
  if (val == null || isNaN(val)) return {};
  if (val > 0) return { background: '#052e16', color: '#22c55e' };
  if (val < 0) return { background: '#1c0a0a', color: '#ef4444' };
  return { background: '#111114', color: '#a1a1aa' };
}

// Determine risk signal from market data
function calcSignal(quotes) {
  if (!quotes.length) return { risk: 'MIXED', liq: 'NEUTRAL' };
  const find = (sym) => quotes.find(q => q.symbol === sym.replace(/%5E/g, '^').replace(/%3D/g, '=').replace(/%3DF/g, '=F'));
  
  const vix = find('%5EVIX');
  const dxy = find('DX-Y.NYB');
  const sp = find('%5EGSPC');
  
  let riskScore = 0;
  if (vix?.regularMarketPrice < 18) riskScore += 2;
  else if (vix?.regularMarketPrice < 22) riskScore += 1;
  else if (vix?.regularMarketPrice > 28) riskScore -= 2;
  else if (vix?.regularMarketPrice > 22) riskScore -= 1;

  if (dxy?.regularMarketChangePercent < -0.3) riskScore += 1;
  if (dxy?.regularMarketChangePercent > 0.5) riskScore -= 1;

  if (sp?.regularMarketChangePercent > 0.5) riskScore += 1;
  if (sp?.regularMarketChangePercent < -0.5) riskScore -= 1;

  let risk = 'MIXED';
  if (riskScore >= 2) risk = 'RISK ON';
  if (riskScore <= -2) risk = 'RISK OFF';

  // Liquidity signal from yields
  const us10 = find('%5ETNX');
  let liq = 'NEUTRAL';
  if (us10?.regularMarketPrice < 4.0) liq = 'EXPANDING';
  if (us10?.regularMarketPrice > 4.5) liq = 'TIGHTENING';

  return { risk, liq };
}

function SignalBadge({ label, value, type }) {
  const colors = {
    'RISK ON': { bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.3)', color: '#22c55e' },
    'RISK OFF': { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', color: '#ef4444' },
    'MIXED': { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', color: '#f59e0b' },
    'EXPANDING': { bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.3)', color: '#22c55e' },
    'TIGHTENING': { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', color: '#ef4444' },
    'NEUTRAL': { bg: 'rgba(161,161,170,0.1)', border: 'rgba(161,161,170,0.3)', color: '#a1a1aa' },
  };
  const c = colors[value] || colors['NEUTRAL'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 10, color: '#71717a', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</span>
      <span style={{
        padding: '3px 10px', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em',
        borderRadius: 4, background: c.bg, border: `1px solid ${c.border}`, color: c.color,
      }}>{value}</span>
    </div>
  );
}

function MacroCell({ label, price, change, isVix, isCop }) {
  // VIX: invert color logic (high VIX = red, low = green)
  let changeVal = change;
  let displayChange = pct(change);
  let colorStyle = cellColor(isVix ? -change : change);

  // COP: format as integer, invert (COP up = bad for LatAm)
  let displayPrice = isCop ? fmt(price, 0) : fmt(price);

  return (
    <div style={{
      padding: '6px 10px', borderRadius: 4, textAlign: 'center', minWidth: 0,
      ...colorStyle,
    }}>
      <div style={{ fontSize: 9, color: '#71717a', letterSpacing: '0.1em', marginBottom: 2, textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.2 }}>
        {displayPrice}
      </div>
      <div style={{ fontSize: 10, opacity: 0.8 }}>
        {displayChange}
      </div>
    </div>
  );
}

export default async function HubPage() {
  // Fetch all Yahoo data in parallel
  const allSymbols = [...YAHOO_SYMBOLS, ...LIQ_SYMBOLS];
  const [quotes, crypto] = await Promise.all([
    fetchYahoo(allSymbols),
    fetchCrypto(),
  ]);

  const signal = calcSignal(quotes);

  // Parse market data
  const findQuote = (sym) => {
    const clean = sym.replace(/%5E/g, '^').replace(/%3D/g, '=').replace(/%3DF/g, '=F');
    return quotes.find(q => q.symbol === clean);
  };

  // BTC + SOL from CoinGecko
  const btcPrice = crypto?.bitcoin?.usd;
  const btcChange = crypto?.bitcoin?.usd_24h_change;
  const solPrice = crypto?.solana?.usd;
  const solChange = crypto?.solana?.usd_24h_change;

  const now = new Date();
  const timeStr = now.toLocaleString('es-CO', { 
    timeZone: 'America/Bogota', 
    hour: '2-digit', minute: '2-digit', 
    day: 'numeric', month: 'short' 
  });

  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '16px 12px' }}>
      {/* ═══ HEADER ═══ */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 0', marginBottom: 12,
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img
            src="/logo.jpg" alt="10AMPRO"
            style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid rgba(212,168,67,0.2)' }}
          />
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 18, lineHeight: 1 }}>
              <span style={{ color: '#D4A843' }}>10</span>
              <span style={{ color: '#22C55E' }}>AM</span>
              <span style={{ color: '#3F3F46' }}>PRO</span>
            </div>
            <div style={{ fontSize: 8, letterSpacing: '0.2em', color: '#27272A', textTransform: 'uppercase' }}>
              MORNING INTELLIGENCE TERMINAL
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 10, color: '#71717a' }}>{timeStr} COT</div>
          <div style={{ fontSize: 9, color: '#3f3f46' }}>ISR 5min</div>
        </div>
      </header>

      {/* ═══ SIGNAL BANNER ═══ */}
      <section style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 14px', marginBottom: 12,
        background: 'var(--surface)', borderRadius: 6,
        border: '1px solid var(--border-subtle)',
        flexWrap: 'wrap', gap: 8,
      }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <SignalBadge label="MKT" value={signal.risk} />
          <SignalBadge label="LIQ" value={signal.liq} />
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {btcPrice && (
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 10, color: '#71717a', marginRight: 6 }}>BTC</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: btcChange >= 0 ? '#22c55e' : '#ef4444' }}>
                ${fmt(btcPrice, 0)}
              </span>
              <span style={{ fontSize: 10, marginLeft: 4, color: btcChange >= 0 ? '#22c55e' : '#ef4444' }}>
                {pct(btcChange)}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ═══ MACRO BAR — MKT Row ═══ */}
      <section style={{ marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', color: '#3f3f46',
            padding: '2px 6px', background: 'rgba(63,63,70,0.15)', borderRadius: 3,
          }}>MKT</span>
          <div className="macro-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4, flex: 1,
          }}>
            {YAHOO_SYMBOLS.map(sym => {
              const q = findQuote(sym);
              return (
                <MacroCell
                  key={sym}
                  label={YAHOO_SHORT[sym]}
                  price={q?.regularMarketPrice}
                  change={q?.regularMarketChangePercent}
                  isVix={sym === '%5EVIX'}
                  isCop={sym === 'COP%3DX'}
                />
              );
            })}
          </div>
        </div>

        {/* ═══ MACRO BAR — LIQ Row ═══ */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', color: '#3f3f46',
            padding: '2px 6px', background: 'rgba(63,63,70,0.15)', borderRadius: 3,
          }}>LIQ</span>
          <div className="macro-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4, flex: 1,
          }}>
            {/* NET LIQ placeholder */}
            <MacroCell label="NET LIQ" price={null} change={null} />
            {/* US M2 placeholder */}
            <MacroCell label="US M2" price={null} change={null} />
            {/* CN M2 placeholder */}
            <MacroCell label="CN M2" price={null} change={null} />
            {/* US 10Y */}
            {LIQ_SYMBOLS.map(sym => {
              const q = findQuote(sym);
              return (
                <MacroCell
                  key={sym}
                  label={LIQ_SHORT[sym]}
                  price={q?.regularMarketPrice}
                  change={q?.regularMarketChangePercent}
                />
              );
            })}
            {/* SOL */}
            {solPrice && (
              <MacroCell label="SOL" price={solPrice} change={solChange} />
            )}
          </div>
        </div>
      </section>

      {/* ═══ PLACEHOLDER for bloques 2-5 ═══ */}
      <section style={{
        marginTop: 24, padding: 20, textAlign: 'center',
        border: '1px dashed var(--border)', borderRadius: 6,
        color: '#3f3f46', fontSize: 11,
      }}>
        BLOQUES 2–5 COMING: Calendar · Watchlist · Info Diet + Earnings · Editorial
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{
        marginTop: 24, padding: '12px 0', borderTop: '1px solid var(--border-subtle)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: 10, color: '#3f3f46',
      }}>
        <span>© 2026 10AMPRO</span>
        <a href="https://forecast2026.vercel.app" style={{ color: '#71717a', fontSize: 10 }}>
          forecast2026 →
        </a>
      </footer>
    </main>
  );
}
