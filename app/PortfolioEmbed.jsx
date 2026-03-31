'use client';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Wallet } from 'lucide-react';

const TRACKER_API = 'https://portafoliotracker.vercel.app';
const SUPABASE_URL = 'https://bzpraigsuwgjgpnclcpd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6cHJhaWdzdXdnamdwbmNsY3BkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1Mzk2NDEsImV4cCI6MjA4NTExNTY0MX0.tBtsac6Mq65BiG93MhYtn1KV8iOGpEpVdlD3tqShrzE';

const CHAIN_LABELS = { solana: 'Solana', ethereum: 'Ethereum', bitcoin: 'Bitcoin', xrp: 'XRP', tron: 'TRON' };
const CHAIN_COLORS = { solana: '#9945FF', ethereum: '#627EEA', bitcoin: '#F7931A', xrp: '#00AAE4', tron: '#FF0013' };

async function sbFetch(path) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  return r.ok ? r.json() : [];
}

export default function PortfolioEmbed({ mb }) {
  // States: checking | no_wallet | disconnected | not_activated | loading | ready | error
  const [state, setState] = useState('checking');
  const [walletAddr, setWalletAddr] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [prices, setPrices] = useState({});
  const [trackedWallets, setTrackedWallets] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [activating, setActivating] = useState(false);
  const mounted = useRef(true);

  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);

  // Step 1: detect Phantom, try silent connect
  useEffect(() => {
    const init = async () => {
      await new Promise(r => setTimeout(r, 400));
      const phantom = window?.phantom?.solana || window?.solana;
      if (!phantom?.isPhantom) { if (mounted.current) setState('no_wallet'); return; }
      try {
        const resp = await phantom.connect({ onlyIfTrusted: true });
        if (mounted.current) { setWalletAddr(resp.publicKey.toString()); setState('check_activation'); }
      } catch {
        if (mounted.current) setState('disconnected');
      }
    };
    init();
  }, []);

  // Manual connect
  const handleConnect = async () => {
    const phantom = window?.phantom?.solana || window?.solana;
    if (!phantom) return;
    try {
      const resp = await phantom.connect();
      setWalletAddr(resp.publicKey.toString());
      setState('check_activation');
    } catch { /* user rejected */ }
  };

  // Step 2: check activation
  useEffect(() => {
    if (state !== 'check_activation' || !walletAddr) return;
    (async () => {
      const users = await sbFetch(`portfolio_users?wallet_address=eq.${walletAddr}&select=wallet_address`);
      if (!mounted.current) return;
      if (users.length > 0) { setState('load_holdings'); }
      else { setState('not_activated'); }
    })();
  }, [state, walletAddr]);

  // Handle activation code submit
  const handleActivate = async () => {
    if (!code.trim() || !walletAddr) return;
    setActivating(true);
    setCodeError('');
    try {
      const res = await fetch(`${TRACKER_API}/api/activate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: walletAddr, code: code.trim().toUpperCase() }),
      });
      const data = await res.json();
      if (res.ok) {
        setState('load_holdings');
      } else {
        setCodeError(data.error || 'Código inválido');
      }
    } catch {
      setCodeError('Error de conexión');
    } finally {
      setActivating(false);
    }
  };

  // Step 3: fetch holdings
  useEffect(() => {
    if (state !== 'load_holdings' || !walletAddr) return;
    setState('loading');
    (async () => {
      try {
        const tws = await sbFetch(`tracked_wallets?owner_wallet=eq.${walletAddr}&select=*`);
        if (mounted.current) setTrackedWallets(Array.isArray(tws) ? tws : []);
        const wallets = Array.isArray(tws) ? tws : [];
        const ts = Date.now();
        const promises = [];

        // Connected Solana wallet
        promises.push(
          fetch(`${TRACKER_API}/api/holdings?wallet=${walletAddr}&t=${ts}`)
            .then(r => r.ok ? r.json() : [])
            .then(d => (Array.isArray(d) ? d : []).map(h => ({ ...h, chain: 'solana' })))
            .catch(() => [])
        );

        // Tracked wallets
        for (const tw of wallets) {
          const endpoints = {
            solana: `${TRACKER_API}/api/holdings?wallet=${tw.tracked_address}&t=${ts}`,
            ethereum: `${TRACKER_API}/api/eth-holdings?address=${tw.tracked_address}&t=${ts}`,
            bitcoin: `${TRACKER_API}/api/btc-holdings?address=${tw.tracked_address}&t=${ts}`,
            xrp: `${TRACKER_API}/api/xrp-holdings?address=${tw.tracked_address}&t=${ts}`,
            tron: `${TRACKER_API}/api/tron-holdings?address=${tw.tracked_address}&t=${ts}`,
          };
          const ep = endpoints[tw.chain];
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

        // Prices: Solana has embedded price_usd, others need CoinGecko
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
        if (mounted.current) { setPrices(merged); setState('ready'); }
      } catch (e) {
        console.error('Portfolio embed error:', e);
        if (mounted.current) setState('error');
      }
    })();
  }, [state, walletAddr]);

  // ─── Computed ───
  const totalValue = holdings.reduce((s, h) => s + h.quantity * (prices[h.symbol]?.usd || 0), 0);
  const totalChange = holdings.reduce((s, h) => {
    const p = prices[h.symbol]?.usd || 0;
    const c = prices[h.symbol]?.change24h || 0;
    return s + (h.quantity * p * c) / 100;
  }, 0);
  const changePct = totalValue > 0 ? (totalChange / (totalValue - totalChange)) * 100 : 0;
  const isPos = changePct >= 0;

  const visible = holdings.filter(h => h.quantity * (prices[h.symbol]?.usd || 0) >= 1);
  const aggMap = {};
  for (const h of visible) {
    const key = `${h.chain || 'solana'}:${h.symbol}`;
    if (aggMap[key]) aggMap[key].quantity += h.quantity; else aggMap[key] = { ...h };
  }
  const grouped = {};
  for (const h of Object.values(aggMap)) {
    const c = h.chain || 'solana';
    if (!grouped[c]) grouped[c] = [];
    grouped[c].push(h);
  }
  for (const c in grouped) grouped[c].sort((a, b) => (b.quantity * (prices[b.symbol]?.usd || 0)) - (a.quantity * (prices[a.symbol]?.usd || 0)));
  const sortedChains = ['solana', 'ethereum', 'bitcoin', 'tron', 'xrp'].filter(c => grouped[c]?.length > 0);

  const fmt = v => { if (v >= 1e6) return `$${(v/1e6).toFixed(2)}M`; if (v >= 1000) return `$${v.toLocaleString('en-US',{maximumFractionDigits:0})}`; if (v < 0.01 && v > 0) return `$${v.toFixed(4)}`; return `$${v.toFixed(2)}`; };
  const fmtQty = q => { if (q >= 1e6) return `${(q/1e6).toFixed(2)}M`; if (q >= 1000) return q.toLocaleString('en-US',{maximumFractionDigits:2}); if (q < 0.01) return q.toFixed(6); return q.toFixed(4); };
  const short = a => a ? `${a.slice(0,4)}...${a.slice(-4)}` : '';

  const barStyle = {
    marginBottom: 6, border: '1px solid var(--border)', borderRadius: 3,
    overflow: 'hidden', background: 'var(--surface)',
  };
  const padX = mb ? '8px 10px' : '10px 14px';
  const labelStyle = { fontSize: mb ? 9 : 10, fontWeight: 700, color: '#D4A843', letterSpacing: '0.5px' };

  // ─── CHECKING ───
  if (state === 'checking') return null;

  // ─── NO WALLET ───
  if (state === 'no_wallet') {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator?.userAgent || '');
    const phantomDeepLink = `https://phantom.app/ul/browse/${encodeURIComponent(window.location.href)}?ref=${encodeURIComponent(window.location.origin)}`;

    return (
      <a
        href={isMobile ? phantomDeepLink : 'https://phantom.app'}
        target={isMobile ? '_self' : '_blank'}
        rel="noopener noreferrer"
        style={{ ...barStyle, padding: padX, display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', cursor: 'pointer' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={labelStyle}>MI PORTAFOLIO</span>
          <span style={{ fontSize: mb ? 9 : 10, color: 'var(--text-muted)' }}>
            {isMobile ? 'Abrir en Phantom para conectar wallet' : 'Instala Phantom para ver tu portafolio'}
          </span>
        </div>
        <Wallet size={14} color="#D4A843" />
      </a>
    );
  }

  // ─── DISCONNECTED ───
  if (state === 'disconnected') {
    return (
      <div onClick={handleConnect} style={{ ...barStyle, padding: padX, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={labelStyle}>MI PORTAFOLIO</span>
          <span style={{ fontSize: mb ? 9 : 10, color: 'var(--text-muted)' }}>Conecta tu wallet para ver tu portafolio</span>
        </div>
        <Wallet size={14} color="var(--text-muted)" />
      </div>
    );
  }

  // ─── NOT ACTIVATED ───
  if (state === 'not_activated') {
    return (
      <div style={{ ...barStyle, padding: padX }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={labelStyle}>MI PORTAFOLIO</span>
          <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>{short(walletAddr)}</span>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={code}
            onChange={e => setCode(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleActivate()}
            placeholder="CÓDIGO DE ACTIVACIÓN"
            maxLength={20}
            autoFocus
            style={{
              background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 3,
              padding: '5px 10px', color: 'var(--text-primary)', fontSize: 11,
              fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase',
              letterSpacing: '1px', outline: 'none', flex: 1, minWidth: 140,
            }}
          />
          <button
            onClick={handleActivate}
            disabled={activating || !code.trim()}
            style={{
              background: '#D4A843', color: '#0c0c0e', border: 'none', borderRadius: 3,
              padding: '5px 14px', fontSize: 10, fontWeight: 700, cursor: 'pointer',
              fontFamily: "'Space Grotesk', sans-serif", opacity: activating || !code.trim() ? 0.5 : 1,
            }}
          >
            {activating ? '...' : 'Activar'}
          </button>
        </div>
        {codeError && <div style={{ fontSize: 9, color: '#ef4444', marginTop: 4 }}>{codeError}</div>}
        <div style={{ fontSize: 8, color: 'var(--text-muted)', marginTop: 6 }}>
          Los suscriptores de <a href="https://10am.pro/subscribe" target="_blank" rel="noopener noreferrer" style={{ color: '#D4A843', textDecoration: 'none' }}>10am.pro</a> reciben su código al suscribirse.
        </div>
      </div>
    );
  }

  // ─── LOADING ───
  if (state === 'loading') {
    return (
      <div style={{ ...barStyle, padding: padX, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={labelStyle}>MI PORTAFOLIO</span>
        <div style={{ width: 80, height: 14, background: 'var(--border-subtle)', borderRadius: 2 }} />
      </div>
    );
  }

  if (state === 'error' || state !== 'ready') return null;

  // ─── READY ───
  return (
    <div style={barStyle}>
      <div
        onClick={() => setExpanded(!expanded)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: padX, cursor: 'pointer', userSelect: 'none' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: mb ? 8 : 12 }}>
          <span style={labelStyle}>MI PORTAFOLIO</span>
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

      {expanded && (
        <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
          {sortedChains.map(chain => (
            <div key={chain}>
              <div style={{ padding: '4px 14px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: CHAIN_COLORS[chain], display: 'inline-block' }} />
                <span style={{ fontSize: 8, color: CHAIN_COLORS[chain], fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{CHAIN_LABELS[chain]}</span>
              </div>
              {grouped[chain].map((h, i) => {
                const price = prices[h.symbol]?.usd || 0;
                const value = h.quantity * price;
                const chg = prices[h.symbol]?.change24h || 0;
                return (
                  <div key={`${chain}-${i}`} style={{
                    display: 'grid', gridTemplateColumns: mb ? '1fr 1fr' : '2fr 1fr 1fr',
                    padding: '6px 14px', fontSize: 11, borderBottom: '1px solid var(--border-subtle)', alignItems: 'center',
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
                      {chg !== 0 && <div style={{ fontSize: 9, color: chg >= 0 ? '#22c55e' : '#ef4444' }}>{chg >= 0 ? '+' : ''}{chg.toFixed(1)}%</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
          {visible.length === 0 && (
            <div style={{ padding: '12px 14px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 10 }}>No se encontraron tokens con valor &gt; $1</div>
          )}
          <div style={{ padding: '6px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {sortedChains.map(c => (
                <span key={c} style={{ fontSize: 8, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: CHAIN_COLORS[c], display: 'inline-block' }} />
                  {grouped[c].length} en {CHAIN_LABELS[c]}
                </span>
              ))}
            </div>
            <a href="https://portafoliotracker.vercel.app" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 8, color: '#D4A843', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 3 }}>
              Gestionar <ExternalLink size={8} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
