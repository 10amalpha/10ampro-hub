'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

const TRACKER_API = 'https://portafoliotracker.vercel.app';
const SUPABASE_URL = 'https://bzpraigsuwgjgpnclcpd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6cHJhaWdzdXdnamdwbmNsY3BkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1Mzk2NDEsImV4cCI6MjA4NTExNTY0MX0.tBtsac6Mq65BiG93MhYtn1KV8iOGpEpVdlD3tqShrzE';

const CHAIN_LABELS = { solana: 'Solana', ethereum: 'Ethereum', bitcoin: 'Bitcoin', xrp: 'XRP', tron: 'TRON' };
const CHAIN_COLORS = { solana: '#9945FF', ethereum: '#627EEA', bitcoin: '#F7931A', xrp: '#00AAE4', tron: '#FF0013' };

function detectChain(address) {
  if (!address || typeof address !== 'string') return null;
  const t = address.trim();
  if (/^0x[a-fA-F0-9]{40}$/.test(t)) return 'ethereum';
  if (/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(t) || /^bc1[a-zA-HJ-NP-Z0-9]{25,90}$/.test(t)) return 'bitcoin';
  if (/^r[1-9A-HJ-NP-Za-km-z]{24,34}$/.test(t)) return 'xrp';
  if (/^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(t)) return 'tron';
  if (/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(t)) return 'solana';
  return null;
}

export default function PortfolioEmbed({ mb }) {
  const [state, setState] = useState('checking'); // checking | no_wallet | not_connected | not_activated | loading | ready | error
  const [wallet, setWallet] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [prices, setPrices] = useState({});
  const [trackedWallets, setTrackedWallets] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  // Step 1: Detect Phantom + silent connect
  useEffect(() => {
    const init = async () => {
      await new Promise(r => setTimeout(r, 300)); // Let Phantom inject
      const phantom = window?.phantom?.solana || window?.solana;
      if (!phantom?.isPhantom) {
        if (mounted.current) setState('no_wallet');
        return;
      }
      try {
        const resp = await phantom.connect({ onlyIfTrusted: true });
        const addr = resp.publicKey.toString();
        if (mounted.current) {
          setWallet(addr);
          setState('connected');
        }
      } catch {
        if (mounted.current) setState('not_connected');
      }
    };
    init();
  }, []);

  // Step 2: Check activation + fetch holdings
  useEffect(() => {
    if (!wallet || state !== 'connected') return;
    const load = async () => {
      try {
        // Check activation
        const actRes = await fetch(
          `${SUPABASE_URL}/rest/v1/portfolio_users?wallet_address=eq.${wallet}&select=wallet_address`,
          { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
        );
        const actData = await actRes.json();
        if (!actData || actData.length === 0) {
          if (mounted.current) setState('not_activated');
          return;
        }

        if (mounted.current) setState('loading');

        // Get tracked wallets
        const twRes = await fetch(
          `${SUPABASE_URL}/rest/v1/tracked_wallets?owner_wallet=eq.${wallet}&select=*`,
          { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
        );
        const twData = await twRes.json();
        const tws = Array.isArray(twData) ? twData : [];
        if (mounted.current) setTrackedWallets(tws);

        // Fetch all holdings in parallel
        const ts = Date.now();
        const promises = [];

        // Connected Solana wallet
        promises.push(
          fetch(`${TRACKER_API}/api/holdings?wallet=${wallet}&t=${ts}`)
            .then(r => r.ok ? r.json() : [])
            .then(d => (Array.isArray(d) ? d : []).map(h => ({ ...h, chain: 'solana' })))
            .catch(() => [])
        );

        // Tracked wallets
        for (const tw of tws) {
          let ep = '';
          if (tw.chain === 'solana') ep = `${TRACKER_API}/api/holdings?wallet=${tw.tracked_address}&t=${ts}`;
          else if (tw.chain === 'ethereum') ep = `${TRACKER_API}/api/eth-holdings?address=${tw.tracked_address}&t=${ts}`;
          else if (tw.chain === 'bitcoin') ep = `${TRACKER_API}/api/btc-holdings?address=${tw.tracked_address}&t=${ts}`;
          else if (tw.chain === 'xrp') ep = `${TRACKER_API}/api/xrp-holdings?address=${tw.tracked_address}&t=${ts}`;
          else if (tw.chain === 'tron') ep = `${TRACKER_API}/api/tron-holdings?address=${tw.tracked_address}&t=${ts}`;
          if (ep) {
            promises.push(
              fetch(ep)
                .then(r => r.ok ? r.json() : [])
                .then(d => (Array.isArray(d) ? d : []).map(h => ({ ...h, chain: tw.chain })))
                .catch(() => [])
            );
          }
        }

        const results = await Promise.all(promises);
        const all = results.flat();
        if (!mounted.current) return;
        setHoldings(all);

        // Build prices: Solana has price_usd embedded, others need CoinGecko
        const merged = {};
        for (const h of all) {
          if (h.price_usd != null) merged[h.symbol] = { usd: h.price_usd, change24h: h.change_24h || 0 };
        }
        const nonSol = [...new Set(all.filter(h => h.chain !== 'solana' && h.price_usd == null).map(h => h.symbol))];
        if (nonSol.length > 0) {
          try {
            const pr = await fetch(`${TRACKER_API}/api/prices?symbols=${nonSol.join(',')}&t=${ts}`);
            if (pr.ok) Object.assign(merged, await pr.json());
          } catch {}
        }
        if (mounted.current) {
          setPrices(merged);
          setState('ready');
        }
      } catch (e) {
        console.error('Portfolio embed error:', e);
        if (mounted.current) setState('error');
      }
    };
    load();
  }, [wallet, state]);

  // ─── Computed values ───
  const totalValue = holdings.reduce((s, h) => {
    const p = prices[h.symbol]?.usd || 0;
    return s + h.quantity * p;
  }, 0);

  const totalChange = holdings.reduce((s, h) => {
    const p = prices[h.symbol]?.usd || 0;
    const c = prices[h.symbol]?.change24h || 0;
    return s + (h.quantity * p * c) / 100;
  }, 0);

  const changePct = totalValue > 0 ? (totalChange / (totalValue - totalChange)) * 100 : 0;
  const isPos = changePct >= 0;

  const visibleHoldings = holdings.filter(h => {
    const p = prices[h.symbol]?.usd || 0;
    return h.quantity * p >= 1;
  });

  // Aggregate same-symbol per chain
  const aggMap = {};
  for (const h of visibleHoldings) {
    const key = `${h.chain || 'solana'}:${h.symbol}`;
    if (aggMap[key]) aggMap[key].quantity += h.quantity;
    else aggMap[key] = { ...h };
  }
  const agg = Object.values(aggMap);
  const grouped = {};
  for (const h of agg) {
    const c = h.chain || 'solana';
    if (!grouped[c]) grouped[c] = [];
    grouped[c].push(h);
  }
  // Sort by value within each chain
  for (const c in grouped) {
    grouped[c].sort((a, b) => {
      const va = a.quantity * (prices[a.symbol]?.usd || 0);
      const vb = b.quantity * (prices[b.symbol]?.usd || 0);
      return vb - va;
    });
  }
  const chainOrder = ['solana', 'ethereum', 'bitcoin', 'tron', 'xrp'];
  const sortedChains = chainOrder.filter(c => grouped[c]?.length > 0);

  const fmt = (v) => {
    if (v >= 1e6) return `$${(v / 1e6).toFixed(2)}M`;
    if (v >= 1000) return `$${v.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    if (v < 0.01 && v > 0) return `$${v.toFixed(4)}`;
    return `$${v.toFixed(2)}`;
  };
  const fmtQty = (q) => {
    if (q >= 1e6) return `${(q / 1e6).toFixed(2)}M`;
    if (q >= 1000) return q.toLocaleString('en-US', { maximumFractionDigits: 2 });
    if (q < 0.01) return q.toFixed(6);
    return q.toFixed(4);
  };

  // ─── CTA bar (no wallet / not connected / not activated) ───
  if (state === 'checking') return null; // don't flash anything while detecting

  if (state === 'no_wallet' || state === 'not_connected' || state === 'not_activated') {
    return (
      <a
        href="https://portafoliotracker.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: mb ? '8px 10px' : '10px 14px',
          marginBottom: 6,
          border: '1px solid var(--border)',
          borderRadius: 3,
          background: 'var(--surface)',
          textDecoration: 'none',
          transition: 'border-color 0.2s',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: mb ? 9 : 10, fontWeight: 700, color: '#D4A843', letterSpacing: '0.5px' }}>MI PORTAFOLIO</span>
          <span style={{ fontSize: mb ? 9 : 10, color: 'var(--text-muted)' }}>
            {state === 'not_activated' ? 'Activa con el código del Búnker' : 'Conecta tu wallet para ver tu portafolio'}
          </span>
        </div>
        <ExternalLink size={12} color="var(--text-muted)" />
      </a>
    );
  }

  if (state === 'loading') {
    return (
      <div style={{
        padding: mb ? '10px 10px' : '12px 14px', marginBottom: 6,
        border: '1px solid var(--border)', borderRadius: 3, background: 'var(--surface)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{ fontSize: mb ? 9 : 10, fontWeight: 700, color: '#D4A843', letterSpacing: '0.5px' }}>MI PORTAFOLIO</span>
        <div style={{ width: 80, height: 14, background: 'var(--border-subtle)', borderRadius: 2, animation: 'pulse 1.5s infinite' }} />
      </div>
    );
  }

  if (state === 'error') return null;

  // ─── Ready: collapsed bar + expandable holdings ───
  return (
    <div style={{ marginBottom: 6, border: '1px solid var(--border)', borderRadius: 3, overflow: 'hidden', background: 'var(--surface)' }}>
      {/* Collapsed header */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: mb ? '8px 10px' : '10px 14px',
          cursor: 'pointer', userSelect: 'none',
          transition: 'background 0.15s',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: mb ? 8 : 12 }}>
          <span style={{ fontSize: mb ? 9 : 10, fontWeight: 700, color: '#D4A843', letterSpacing: '0.5px' }}>MI PORTAFOLIO</span>
          <span style={{ fontSize: mb ? 16 : 20, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px', fontFamily: "'Space Grotesk', sans-serif" }}>
            {fmt(totalValue)}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontSize: mb ? 10 : 12, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace",
            padding: '2px 8px', borderRadius: 3,
            background: isPos ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
            color: isPos ? '#22c55e' : '#ef4444',
            border: `1px solid ${isPos ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
          }}>
            {isPos ? '▲' : '▼'} {isPos ? '+' : '-'}{fmt(Math.abs(totalChange))} ({isPos ? '+' : ''}{changePct.toFixed(2)}%)
          </span>
          {expanded ? <ChevronUp size={14} color="var(--text-muted)" /> : <ChevronDown size={14} color="var(--text-muted)" />}
        </div>
      </div>

      {/* Expanded holdings */}
      {expanded && (
        <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
          {sortedChains.map(chain => (
            <div key={chain}>
              {/* Chain header */}
              <div style={{ padding: '4px 14px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: CHAIN_COLORS[chain], display: 'inline-block' }} />
                <span style={{ fontSize: 8, color: CHAIN_COLORS[chain], fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{CHAIN_LABELS[chain]}</span>
              </div>
              {/* Holdings */}
              {grouped[chain].map((h, i) => {
                const price = prices[h.symbol]?.usd || 0;
                const value = h.quantity * price;
                const chg = prices[h.symbol]?.change24h || 0;
                return (
                  <div key={`${chain}-${i}`} style={{
                    display: 'grid',
                    gridTemplateColumns: mb ? '1fr 1fr' : '2fr 1fr 1fr',
                    padding: '6px 14px', fontSize: 11, borderBottom: '1px solid var(--border-subtle)',
                    alignItems: 'center',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {h.image ? (
                        <img src={h.image} alt={h.symbol} width={20} height={20} style={{ borderRadius: '50%', background: 'var(--surface)' }} onError={e => { e.target.style.display = 'none'; }} />
                      ) : (
                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: 'var(--text-muted)' }}>
                          {h.symbol?.charAt(0) || '?'}
                        </div>
                      )}
                      <div>
                        <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 11 }}>{h.symbol}</span>
                        {h.name && <div style={{ fontSize: 8, color: 'var(--text-muted)', lineHeight: 1 }}>{h.name}</div>}
                      </div>
                    </div>
                    {!mb && <span style={{ textAlign: 'right', color: 'var(--text-secondary)', fontSize: 10 }}>{fmtQty(h.quantity)}</span>}
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{value > 0 ? fmt(value) : '—'}</span>
                      {chg !== 0 && (
                        <div style={{ fontSize: 9, color: chg >= 0 ? '#22c55e' : '#ef4444' }}>
                          {chg >= 0 ? '+' : ''}{chg.toFixed(1)}%
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
          {visibleHoldings.length === 0 && (
            <div style={{ padding: '12px 14px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 10 }}>
              No se encontraron tokens con valor &gt; $1
            </div>
          )}
          {/* Footer */}
          <div style={{ padding: '6px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {sortedChains.map(c => (
                <span key={c} style={{ fontSize: 8, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: CHAIN_COLORS[c], display: 'inline-block' }} />
                  {grouped[c].length} en {CHAIN_LABELS[c]}
                </span>
              ))}
            </div>
            <a
              href="https://portafoliotracker.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 8, color: '#D4A843', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 3 }}
            >
              Gestionar <ExternalLink size={8} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
