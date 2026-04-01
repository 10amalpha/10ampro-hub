'use client';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Wallet, Plus, X, RefreshCw, LogOut } from 'lucide-react';

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

function trackEmbed(wallet, event, data = {}) {
  fetch(`${TRACKER_API}/api/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ wallet, event, ...data }),
  }).catch(() => {});
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

  const [availableWallets, setAvailableWallets] = useState([]);
  const providerRef = useRef(null);
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [addingWallet, setAddingWallet] = useState(false);
  const [addError, setAddError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  function detectChainFromAddr(address) {
    if (!address || typeof address !== 'string') return null;
    const t = address.trim();
    if (/^0x[a-fA-F0-9]{40}$/.test(t)) return 'ethereum';
    if (/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(t) || /^bc1[a-zA-HJ-NP-Z0-9]{25,90}$/.test(t)) return 'bitcoin';
    if (/^r[1-9A-HJ-NP-Za-km-z]{24,34}$/.test(t)) return 'xrp';
    if (/^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(t)) return 'tron';
    if (/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(t)) return 'solana';
    return null;
  }

  const detectedChain = detectChainFromAddr(newAddress);

  // Add tracked wallet
  const handleAddWallet = async () => {
    const trimmed = newAddress.trim();
    const chain = detectChainFromAddr(trimmed);
    if (!chain) { setAddError('Dirección no reconocida'); return; }
    if (trimmed === walletAddr) { setAddError('Ya está incluida'); return; }
    if (trackedWallets.some(tw => tw.tracked_address === trimmed)) { setAddError('Ya está siendo rastreada'); return; }
    setAddingWallet(true); setAddError('');
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/tracked_wallets`, {
        method: 'POST', headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
        body: JSON.stringify({ owner_wallet: walletAddr, tracked_address: trimmed, chain, added_at: new Date().toISOString() }),
      });
      setNewAddress(''); setShowAddPanel(false);
      trackEmbed(walletAddr, 'add_wallet', { chains: [chain], walletCount: trackedWallets.length + 2 });
      const tws = await sbFetch(`tracked_wallets?owner_wallet=eq.${walletAddr}&select=*`);
      setTrackedWallets(Array.isArray(tws) ? tws : []);
      setState('load_holdings');
    } catch { setAddError('Error al guardar'); }
    finally { setAddingWallet(false); }
  };

  // Remove tracked wallet
  const handleRemoveWallet = async (addr) => {
    await fetch(`${SUPABASE_URL}/rest/v1/tracked_wallets?owner_wallet=eq.${walletAddr}&tracked_address=eq.${addr}`, {
      method: 'DELETE', headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    });
    const tws = await sbFetch(`tracked_wallets?owner_wallet=eq.${walletAddr}&select=*`);
    setTrackedWallets(Array.isArray(tws) ? tws : []);
    setState('load_holdings');
  };

  // Refresh holdings
  const handleRefresh = () => { setRefreshing(true); trackEmbed(walletAddr, 'refresh'); setState('load_holdings'); };

  // Disconnect wallet
  const handleDisconnect = () => {
    if (providerRef.current?.disconnect) providerRef.current.disconnect();
    setWalletAddr(null); setHoldings([]); setPrices({}); setTrackedWallets([]);
    setExpanded(false); setState('disconnected');
  };

  // Detect all Solana wallet providers
  function getProviders() {
    const providers = [];
    if (window?.phantom?.solana?.isPhantom) providers.push({ name: 'Phantom', provider: window.phantom.solana, icon: '👻' });
    if (window?.backpack?.solana) providers.push({ name: 'Backpack', provider: window.backpack.solana, icon: '🎒' });
    if (window?.xnft?.solana) providers.push({ name: 'xNFT', provider: window.xnft.solana, icon: '🔗' });
    // Fallback: window.solana if not already captured
    if (providers.length === 0 && window?.solana) providers.push({ name: 'Wallet', provider: window.solana, icon: '💳' });
    return providers;
  }

  // Step 1: detect wallets, try silent connect on each
  useEffect(() => {
    const init = async () => {
      await new Promise(r => setTimeout(r, 400));
      const providers = getProviders();
      if (providers.length === 0) { if (mounted.current) setState('no_wallet'); return; }
      if (mounted.current) setAvailableWallets(providers);

      // Try silent connect on each provider
      for (const w of providers) {
        try {
          const resp = await w.provider.connect({ onlyIfTrusted: true });
          if (mounted.current) {
            providerRef.current = w.provider;
            setWalletAddr(resp.publicKey.toString());
            setState('check_activation');
          }
          return;
        } catch { /* not trusted yet, continue */ }
      }
      // No silent connect worked
      if (mounted.current) setState('disconnected');
    };
    init();
  }, []);

  // Manual connect with a specific provider
  const handleConnect = async (provider) => {
    try {
      const resp = await provider.connect();
      providerRef.current = provider;
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
        if (mounted.current) {
          setPrices(merged);
          setState('ready');
          setRefreshing(false);

          // Track session with full portfolio data
          const totalVal = all.reduce((s, h) => {
            const p = merged[h.symbol]?.usd || h.price_usd || 0;
            return s + h.quantity * p;
          }, 0);
          const chains = [...new Set(all.map(h => h.chain || 'solana'))];
          const tokensByValue = all
            .map(h => ({ symbol: h.symbol, val: h.quantity * (merged[h.symbol]?.usd || h.price_usd || 0) }))
            .filter(t => t.val >= 1)
            .sort((a, b) => b.val - a.val)
            .map(t => t.symbol);
          trackEmbed(walletAddr, 'session', {
            totalValue: totalVal,
            chains,
            topTokens: tokensByValue,
            walletCount: (wallets || []).length + 1,
          });
        }
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
  const labelStyle = { fontSize: mb ? 11 : 12, fontWeight: 700, color: '#D4A843', letterSpacing: '0.5px' };

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
          <span style={{ fontSize: mb ? 11 : 12, color: 'var(--text-muted)' }}>
            {isMobile ? 'Abrir en Phantom para conectar wallet' : 'Instala Phantom para ver tu portafolio'}
          </span>
        </div>
        <Wallet size={14} color="#D4A843" />
      </a>
    );
  }

  // ─── DISCONNECTED — show available wallets ───
  if (state === 'disconnected') {
    return (
      <div style={{ ...barStyle, padding: padX, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={labelStyle}>MI PORTAFOLIO</span>
          <span style={{ fontSize: mb ? 11 : 12, color: 'var(--text-muted)' }}>Conecta tu wallet</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {availableWallets.map(w => (
            <button
              key={w.name}
              onClick={() => handleConnect(w.provider)}
              style={{
                background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 3,
                padding: '4px 10px', fontSize: 11, fontWeight: 600, cursor: 'pointer',
                color: 'var(--text-secondary)', fontFamily: "'Space Grotesk', sans-serif",
                display: 'flex', alignItems: 'center', gap: 4,
                transition: 'border-color 0.15s',
              }}
            >
              <span style={{ fontSize: 11 }}>{w.icon}</span> {w.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ─── NOT ACTIVATED ───
  if (state === 'not_activated') {
    return (
      <div style={{ ...barStyle, padding: padX }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={labelStyle}>MI PORTAFOLIO</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>{short(walletAddr)}</span>
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
              padding: '5px 10px', color: 'var(--text-primary)', fontSize: 13,
              fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase',
              letterSpacing: '1px', outline: 'none', flex: 1, minWidth: 140,
            }}
          />
          <button
            onClick={handleActivate}
            disabled={activating || !code.trim()}
            style={{
              background: '#D4A843', color: '#0c0c0e', border: 'none', borderRadius: 3,
              padding: '5px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
              fontFamily: "'Space Grotesk', sans-serif", opacity: activating || !code.trim() ? 0.5 : 1,
            }}
          >
            {activating ? '...' : 'Activar'}
          </button>
        </div>
        {codeError && <div style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{codeError}</div>}
        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 6 }}>
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
        onClick={() => { if (!expanded) trackEmbed(walletAddr, 'expand', { topTokens: visible.map(h => h.symbol) }); setExpanded(!expanded); }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: padX, cursor: 'pointer', userSelect: 'none' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: mb ? 8 : 12 }}>
          <span style={labelStyle}>MI PORTAFOLIO</span>
          <span style={{ fontSize: mb ? 18 : 22, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px', fontFamily: "'Space Grotesk', sans-serif" }}>
            {fmt(totalValue)}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontSize: mb ? 12 : 14, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace",
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
                <span style={{ fontSize: 10, color: CHAIN_COLORS[chain], fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{CHAIN_LABELS[chain]}</span>
              </div>
              {grouped[chain].map((h, i) => {
                const price = prices[h.symbol]?.usd || 0;
                const value = h.quantity * price;
                const chg = prices[h.symbol]?.change24h || 0;
                return (
                  <div key={`${chain}-${i}`} style={{
                    display: 'grid', gridTemplateColumns: mb ? '1fr 1fr' : '2fr 1fr 1fr',
                    padding: '6px 14px', fontSize: 13, borderBottom: '1px solid var(--border-subtle)', alignItems: 'center',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {h.image ? (
                        <img src={h.image} alt={h.symbol} width={20} height={20} style={{ borderRadius: '50%', background: 'var(--surface)' }} onError={e => { e.target.style.display = 'none'; }} />
                      ) : (
                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>
                          {h.symbol?.charAt(0) || '?'}
                        </div>
                      )}
                      <div>
                        <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 11 }}>{h.symbol}</span>
                        {h.name && <div style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1 }}>{h.name}</div>}
                      </div>
                    </div>
                    {!mb && <span style={{ textAlign: 'right', color: 'var(--text-secondary)', fontSize: 10 }}>{fmtQty(h.quantity)}</span>}
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{value > 0 ? fmt(value) : '—'}</span>
                      {chg !== 0 && <div style={{ fontSize: 11, color: chg >= 0 ? '#22c55e' : '#ef4444' }}>{chg >= 0 ? '+' : ''}{chg.toFixed(1)}%</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
          {visible.length === 0 && (
            <div style={{ padding: '12px 14px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 10 }}>No se encontraron tokens con valor &gt; $1</div>
          )}

          {/* ─── Wallet management footer ─── */}
          <div style={{ padding: '8px 14px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {/* Add wallet panel */}
            {showAddPanel ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <input
                      value={newAddress}
                      onChange={e => { setNewAddress(e.target.value); setAddError(''); }}
                      onKeyDown={e => e.key === 'Enter' && handleAddWallet()}
                      placeholder="Pega dirección (SOL, ETH, BTC, TRX, XRP)"
                      spellCheck={false}
                      autoFocus
                      style={{
                        width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 3,
                        padding: '5px 10px', paddingRight: detectedChain ? 70 : 10, color: 'var(--text-primary)',
                        fontSize: 12, fontFamily: "'JetBrains Mono', monospace", outline: 'none',
                      }}
                    />
                    {detectedChain && (
                      <span style={{
                        position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                        fontSize: 10, fontWeight: 700, color: CHAIN_COLORS[detectedChain], textTransform: 'uppercase',
                        letterSpacing: '0.5px', background: 'var(--bg)', padding: '1px 4px', borderRadius: 2,
                        border: `1px solid ${CHAIN_COLORS[detectedChain]}30`,
                      }}>
                        {CHAIN_LABELS[detectedChain]}
                      </span>
                    )}
                  </div>
                  <button onClick={handleAddWallet} disabled={addingWallet || !detectedChain}
                    style={{ background: '#D4A843', color: '#0c0c0e', border: 'none', borderRadius: 3, padding: '5px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer', opacity: addingWallet || !detectedChain ? 0.5 : 1, fontFamily: "'Space Grotesk', sans-serif", whiteSpace: 'nowrap' }}>
                    {addingWallet ? '...' : 'Rastrear'}
                  </button>
                  <button onClick={() => { setShowAddPanel(false); setNewAddress(''); setAddError(''); }}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 2 }}>
                    <X size={12} />
                  </button>
                </div>
                {addError && <span style={{ fontSize: 10, color: '#ef4444' }}>{addError}</span>}
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={() => setShowAddPanel(true)}
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 3, padding: '4px 10px', fontSize: 11, fontWeight: 600, cursor: 'pointer', color: 'var(--text-secondary)', fontFamily: "'Space Grotesk', sans-serif", display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Plus size={10} /> Rastrear otra wallet
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button onClick={handleRefresh} title="Actualizar"
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 2, display: 'flex' }}>
                    <RefreshCw size={11} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
                  </button>
                  <button onClick={handleDisconnect} title="Desconectar wallet"
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 2, display: 'flex', transition: 'color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                    <LogOut size={11} />
                  </button>
                </div>
              </div>
            )}

            {/* Tracked wallet pills */}
            {trackedWallets.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {trackedWallets.map(tw => (
                  <div key={tw.tracked_address} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 3,
                    padding: '2px 6px', fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-muted)',
                  }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: CHAIN_COLORS[tw.chain], display: 'inline-block' }} />
                    <span>{short(tw.tracked_address)}</span>
                    <button onClick={() => handleRemoveWallet(tw.tracked_address)}
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, display: 'flex' }}>
                      <X size={8} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Chain status + connected wallet */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {sortedChains.map(c => (
                  <span key={c} style={{ fontSize: 10, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: CHAIN_COLORS[c], display: 'inline-block' }} />
                    {grouped[c].length} en {CHAIN_LABELS[c]}
                  </span>
                ))}
                {trackedWallets.length > 0 && <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>· {trackedWallets.length + 1} wallets</span>}
              </div>
              <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>{short(walletAddr)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
