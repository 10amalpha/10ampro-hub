'use client';
import { useState, useEffect, useCallback } from 'react';
import {
  Activity, TrendingUp, TrendingDown, DollarSign, Zap, Globe,
  Clock, RefreshCw, Loader2, Calendar, ExternalLink, ChevronRight,
  Radio, BookOpen, Mic, AlertTriangle, Shield, Fuel, BarChart3
} from 'lucide-react';

// ============================================================
// CONTENT MAP — Links macro themes to Substack content
// ============================================================
const CONTENT_MAP = {
  liquidity: [
    { title: 'El Hombre que Está Reprogramando la Economía de EEUU', type: 'article', url: 'https://10am.substack.com/p/el-hombre-que-esta-reprogramando', tag: 'Bessent / Treasury' },
    { title: 'E190: Forecast 2026', type: 'podcast', url: 'https://10am.substack.com/p/e190-forecast-2026', tag: 'Macro / Liquidez' },
    { title: 'Los Dashboards de 10am', type: 'article', url: 'https://10am.substack.com/p/los-dashboards-de-10am', tag: 'Herramientas' },
  ],
  earnings: [
    { title: 'Robinhood: El Puente se Construye', type: 'article', url: 'https://10am.substack.com/p/robinhood-el-puente-se-construye', tag: 'HOOD Earnings', tickers: ['HOOD'] },
    { title: 'Palantir: La Empresa Que No Necesita Explicarse', type: 'article', url: 'https://10am.substack.com/p/palantir-la-empresa', tag: 'PLTR Analysis', tickers: ['PLTR'] },
  ],
  crypto: [
    { title: 'Firedancer: La Infraestructura Invisible', type: 'article', url: 'https://10am.substack.com/p/firedancer-la-infraestructura', tag: 'Solana / Firedancer' },
    { title: 'E189: La Oportunidad Única Colombia-Venezuela', type: 'podcast', url: 'https://10am.substack.com/p/e189-la-oportunidad-unica', tag: 'Macro / LATAM' },
  ],
  macro: [
    { title: 'E191: Las 5 Señales del Cambio de Era', type: 'podcast', url: 'https://10am.substack.com/p/e191-las-5-senales', tag: 'Macro Thesis' },
    { title: 'Buena Vista Social Club, AI y Mis Amigos de Mas de 50', type: 'article', url: 'https://10am.substack.com/p/buena-vista-social-club-ai', tag: 'AI / Culture' },
    { title: 'SpaceX + xAI: La Convergencia del Trillón', type: 'article', url: 'https://10am.substack.com/p/spacex-xai-convergencia', tag: 'xAI / SpaceX' },
  ],
};

// ============================================================
// STYLES
// ============================================================
const mono = "'JetBrains Mono', monospace";
const sans = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";

const signalColors = {
  'RISK ON': { bg: 'rgba(16, 185, 129, 0.12)', border: '#10b981', text: '#34d399', glow: '0 0 40px rgba(16, 185, 129, 0.15)' },
  'RISK OFF': { bg: 'rgba(239, 68, 68, 0.12)', border: '#ef4444', text: '#f87171', glow: '0 0 40px rgba(239, 68, 68, 0.15)' },
  'CAUTION': { bg: 'rgba(245, 158, 11, 0.12)', border: '#f59e0b', text: '#fbbf24', glow: '0 0 40px rgba(245, 158, 11, 0.15)' },
  'NEUTRAL': { bg: 'rgba(100, 116, 139, 0.12)', border: '#64748b', text: '#94a3b8', glow: 'none' },
};

// ============================================================
// HELPER COMPONENTS
// ============================================================
const Badge = ({ children, color = '#6b7280' }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: '4px',
    padding: '2px 8px', borderRadius: '4px', fontSize: '10px',
    fontWeight: 600, fontFamily: mono, letterSpacing: '0.5px',
    backgroundColor: `${color}18`, color, border: `1px solid ${color}30`,
    textTransform: 'uppercase',
  }}>
    {children}
  </span>
);

const Delta = ({ value, suffix = '%' }) => {
  if (value == null) return null;
  const positive = value >= 0;
  return (
    <span style={{
      fontSize: '11px', fontFamily: mono, fontWeight: 600,
      color: positive ? '#34d399' : '#f87171',
    }}>
      {positive ? '▲' : '▼'} {Math.abs(value).toFixed(1)}{suffix}
    </span>
  );
};

const Pulse = ({ color = '#34d399' }) => (
  <span style={{
    display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%',
    backgroundColor: color, animation: 'pulse 2s infinite',
  }} />
);

const SectionHeader = ({ icon: Icon, label, color = '#94a3b8' }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: '8px',
    marginBottom: '12px', paddingBottom: '8px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  }}>
    <Icon style={{ width: '14px', height: '14px', color }} />
    <span style={{
      fontSize: '10px', fontWeight: 700, fontFamily: mono,
      letterSpacing: '1.5px', textTransform: 'uppercase', color,
    }}>
      {label}
    </span>
  </div>
);

const ContentLink = ({ item }) => (
  <a
    href={item.url}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: 'flex', alignItems: 'center', gap: '10px',
      padding: '8px 12px', borderRadius: '8px', textDecoration: 'none',
      backgroundColor: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.04)',
      transition: 'all 0.2s',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)';
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)';
    }}
  >
    <span style={{ fontSize: '14px' }}>
      {item.type === 'podcast' ? '🎙️' : '📝'}
    </span>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{
        fontSize: '12px', fontWeight: 600, color: '#d1d5db',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>
        {item.title}
      </div>
      <div style={{ fontSize: '10px', color: '#6b7280' }}>{item.tag}</div>
    </div>
    <ChevronRight style={{ width: '12px', height: '12px', color: '#4b5563', flexShrink: 0 }} />
  </a>
);

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function Briefing() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [now, setNow] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const [wlLoading, setWlLoading] = useState(true);
  const [wlSort, setWlSort] = useState({ key: 'change', dir: 'desc' });
  const [wlFilter, setWlFilter] = useState('all');

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const fetchData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    try {
      const res = await fetch('/api/briefing');
      if (res.ok) setData(await res.json());
    } catch { /* silent */ }
    finally { setLoading(false); setRefreshing(false); }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => fetchData(true), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Watchlist fetch
  useEffect(() => {
    const fetchWl = async () => {
      setWlLoading(true);
      try {
        const res = await fetch('/api/watchlist');
        if (res.ok) {
          const json = await res.json();
          setWatchlist(json.assets || []);
        }
      } catch { /* silent */ }
      setWlLoading(false);
    };
    fetchWl();
    const interval = setInterval(fetchWl, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const sortedWatchlist = (() => {
    let items = wlFilter === 'all' ? watchlist : watchlist.filter(a => a.type === wlFilter);
    return [...items].sort((a, b) => {
      const av = a[wlSort.key] ?? -Infinity;
      const bv = b[wlSort.key] ?? -Infinity;
      return wlSort.dir === 'desc' ? bv - av : av - bv;
    });
  })();

  const toggleWlSort = (key) => {
    setWlSort(prev => ({ key, dir: prev.key === key && prev.dir === 'desc' ? 'asc' : 'desc' }));
  };

  // Greeting based on time
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches';
  const dateStr = now.toLocaleDateString('es-CO', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  if (loading && !data) {
    return (
      <div style={{
        minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#e2e8f0',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontFamily: sans, gap: '16px',
      }}>
        <img src="/logo.jpg" alt="10AMPRO" style={{ width: '64px', height: '64px', borderRadius: '50%', opacity: 0.8 }} />
        <Loader2 style={{ width: '20px', height: '20px', color: '#34d399', animation: 'spin 1s linear infinite' }} />
        <span style={{ fontSize: '12px', fontFamily: mono, color: '#6b7280', letterSpacing: '1px' }}>LOADING BRIEFING...</span>
      </div>
    );
  }

  const d = data || {};
  const sig = signalColors[d.signal] || signalColors['NEUTRAL'];
  const fed = d.fed || {};
  const mkt = d.market || {};
  const crypto = d.crypto || {};
  const calendar = d.calendar || [];
  const earnings = (d.earnings || []).filter((e) => e.date);
  const nextEarning = earnings[0];

  // Days until
  const daysUntil = (dateStr) => {
    if (!dateStr) return null;
    return Math.ceil((new Date(dateStr) - now) / (1000 * 60 * 60 * 24));
  };

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#e2e8f0',
      fontFamily: sans,
    }}>
      <div style={{
        maxWidth: '900px', margin: '0 auto',
        padding: isMobile ? '16px' : '24px 24px 48px',
      }}>

        {/* ============================================================ */}
        {/* HEADER */}
        {/* ============================================================ */}
        <header style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          marginBottom: '24px', flexWrap: 'wrap', gap: '12px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/logo.jpg" alt="" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(212,168,67,0.2)' }} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: isMobile ? '18px' : '20px', letterSpacing: '-0.03em' }}>
                  <span style={{ color: '#D4A843' }}>10</span><span style={{ color: '#22C55E' }}>AM</span><span style={{ color: '#3F3F46' }}>PRO</span>
                </span>
                <Pulse color={sig.text} />
              </div>
              <div style={{ fontSize: '8px', color: '#27272A', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '-2px', fontFamily: mono }}>Daily Briefing</div>
              <div style={{ fontSize: '11px', color: '#6b7280', fontFamily: mono }}>
                {greeting} · {dateStr}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => fetchData(true)}
              disabled={refreshing}
              style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                padding: '6px 12px', borderRadius: '6px', fontSize: '11px',
                fontFamily: mono, fontWeight: 500, cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.08)',
                backgroundColor: 'rgba(255,255,255,0.03)', color: '#9ca3af',
              }}
            >
              {refreshing ? <Loader2 style={{ width: '12px', height: '12px', animation: 'spin 1s linear infinite' }} /> : <RefreshCw style={{ width: '12px', height: '12px' }} />}
              {refreshing ? '...' : 'Refresh'}
            </button>
            <a href="https://10am.substack.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: '#6b7280', textDecoration: 'none', fontFamily: mono }}>
              10am.pro →
            </a>
          </div>
        </header>

        {/* ============================================================ */}
        {/* HERO SIGNAL */}
        {/* ============================================================ */}
        <div style={{
          padding: isMobile ? '16px' : '20px 24px',
          borderRadius: '12px', marginBottom: '16px',
          backgroundColor: sig.bg,
          border: `1px solid ${sig.border}40`,
          boxShadow: sig.glow,
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: '12px',
          }}>
            <div>
              <div style={{
                fontSize: isMobile ? '28px' : '36px', fontWeight: 800,
                fontFamily: mono, color: sig.text, letterSpacing: '-1px',
                lineHeight: 1,
              }}>
                {d.signal || 'LOADING'}
              </div>
              <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
                {d.bullish || 0} bullish · {d.caution || 0} caution · {d.bearish || 0} bearish
              </div>
            </div>
            <div style={{
              display: 'flex', gap: isMobile ? '12px' : '20px', fontFamily: mono, flexWrap: 'wrap',
            }}>
              {/* Net Liquidity */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '10px', color: '#6b7280', letterSpacing: '0.5px' }}>NET LIQUIDITY</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#22d3ee' }}>
                  ${fed.netLiquidity?.toFixed(2) || '—'}T
                </div>
              </div>
              {/* BTC */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '10px', color: '#6b7280', letterSpacing: '0.5px' }}>BTC</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: '18px', fontWeight: 700, color: '#f7931a' }}>
                    ${crypto.btcPrice?.toLocaleString(undefined, { maximumFractionDigits: 0 }) || '—'}
                  </span>
                  <Delta value={crypto.btcChange} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MARKET TICKER ROW */}
        {/* ============================================================ */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)',
          gap: '8px', marginBottom: '20px',
        }}>
          {[
            { label: 'S&P 500', value: mkt.sp500?.toLocaleString(undefined, { maximumFractionDigits: 0 }), change: mkt.sp500Change },
            { label: 'NASDAQ', value: mkt.nasdaq?.toLocaleString(undefined, { maximumFractionDigits: 0 }), change: mkt.nasdaqChange },
            { label: 'VIX', value: mkt.vix?.toFixed(1), change: mkt.vixChange },
            { label: 'DXY', value: mkt.dxy?.toFixed(2), change: mkt.dxyChange },
            { label: 'GOLD', value: `$${mkt.gold?.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, change: mkt.goldChange },
            { label: 'SOL', value: `$${crypto.solPrice?.toFixed(0) || '—'}`, change: crypto.solChange },
          ].map((item, i) => (
            <div key={i} style={{
              padding: '10px 12px', borderRadius: '8px',
              backgroundColor: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.04)',
            }}>
              <div style={{ fontSize: '9px', fontFamily: mono, color: '#6b7280', letterSpacing: '1px', marginBottom: '4px' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, fontFamily: mono, color: '#e2e8f0' }}>
                {item.value || '—'}
              </div>
              <Delta value={item.change} />
            </div>
          ))}
        </div>

        {/* ============================================================ */}
        {/* TWO COLUMN: ECONOMIC CALENDAR + EARNINGS */}
        {/* ============================================================ */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '16px', marginBottom: '20px',
        }}>

          {/* Economic Calendar */}
          <div style={{
            padding: '16px', borderRadius: '12px',
            backgroundColor: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}>
            <SectionHeader icon={Calendar} label="Economic Calendar" color="#60a5fa" />
            {calendar.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {calendar.map((event, i) => {
                  const eventDate = new Date(event.date);
                  const isToday = eventDate.toDateString() === now.toDateString();
                  return (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '8px 10px', borderRadius: '6px',
                      backgroundColor: isToday ? 'rgba(96, 165, 250, 0.08)' : 'transparent',
                      border: isToday ? '1px solid rgba(96, 165, 250, 0.15)' : '1px solid transparent',
                    }}>
                      <div style={{
                        fontSize: '10px', fontFamily: mono, color: isToday ? '#60a5fa' : '#6b7280',
                        minWidth: '44px', fontWeight: isToday ? 700 : 400,
                      }}>
                        {isToday ? 'HOY' : eventDate.toLocaleDateString('es', { month: 'short', day: 'numeric' })}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: '12px', fontWeight: 600, color: '#d1d5db',
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        }}>
                          {event.event}
                        </div>
                        <div style={{ fontSize: '10px', fontFamily: mono, color: '#6b7280' }}>
                          {event.estimate != null && `Est: ${event.estimate}`}
                          {event.previous != null && ` · Prev: ${event.previous}`}
                          {event.actual != null && (
                            <span style={{ color: '#34d399', fontWeight: 700 }}> · Actual: {event.actual}</span>
                          )}
                        </div>
                      </div>
                      <div style={{
                        width: '6px', height: '6px', borderRadius: '50%',
                        backgroundColor: '#ef4444', flexShrink: 0,
                      }} title="High Impact" />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ fontSize: '12px', color: '#4b5563', fontStyle: 'italic', padding: '12px 0' }}>
                No high-impact US events this week
              </div>
            )}
            <a
              href="https://tradingeconomics.com/calendar"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                marginTop: '10px', fontSize: '10px', color: '#4b5563',
                textDecoration: 'none', fontFamily: mono,
              }}
            >
              Full calendar → tradingeconomics.com
              <ExternalLink style={{ width: '10px', height: '10px' }} />
            </a>
          </div>

          {/* Earnings Radar */}
          <div style={{
            padding: '16px', borderRadius: '12px',
            backgroundColor: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}>
            <SectionHeader icon={BarChart3} label="Earnings Radar" color="#a78bfa" />
            {nextEarning && (
              <div style={{
                padding: '12px', borderRadius: '8px', marginBottom: '10px',
                backgroundColor: 'rgba(167, 139, 250, 0.08)',
                border: '1px solid rgba(167, 139, 250, 0.15)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '16px', marginRight: '6px' }}>{nextEarning.emoji}</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, fontFamily: mono, color: '#e2e8f0' }}>
                      {nextEarning.ticker}
                    </span>
                    <span style={{ fontSize: '12px', color: '#9ca3af', marginLeft: '6px' }}>{nextEarning.name}</span>
                  </div>
                  <Badge color="#a78bfa">NEXT UP</Badge>
                </div>
                <div style={{ fontSize: '11px', fontFamily: mono, color: '#6b7280', marginTop: '6px' }}>
                  {new Date(nextEarning.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  {' · '}{daysUntil(nextEarning.date)}d away
                  {nextEarning.quarter && ` · ${nextEarning.quarter}`}
                </div>
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {earnings.slice(nextEarning ? 1 : 0, 6).map((e, i) => (
                <a key={i} href={e.ir} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '6px 10px', borderRadius: '6px', textDecoration: 'none',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(ev) => ev.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'}
                onMouseLeave={(ev) => ev.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13px' }}>{e.emoji}</span>
                    <span style={{ fontSize: '12px', fontWeight: 600, fontFamily: mono, color: '#d1d5db' }}>{e.ticker}</span>
                    <span style={{ fontSize: '11px', color: '#6b7280' }}>{e.name}</span>
                  </div>
                  <div style={{ fontSize: '11px', fontFamily: mono, color: '#6b7280' }}>
                    {new Date(e.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                    <span style={{ color: '#4b5563' }}> · {daysUntil(e.date)}d</span>
                  </div>
                </a>
              ))}
            </div>
            <a
              href="https://earningswatch.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                marginTop: '10px', fontSize: '10px', color: '#4b5563',
                textDecoration: 'none', fontFamily: mono,
              }}
            >
              Full earnings calendar →
              <ExternalLink style={{ width: '10px', height: '10px' }} />
            </a>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MACRO GRID — Liquidity + Key Indicators */}
        {/* ============================================================ */}
        <div style={{
          padding: '16px', borderRadius: '12px', marginBottom: '20px',
          backgroundColor: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
        }}>
          <SectionHeader icon={Activity} label="Liquidity & Macro" color="#22d3ee" />

          {/* Net Liquidity Formula */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '12px 16px', borderRadius: '8px', marginBottom: '14px',
            backgroundColor: 'rgba(34, 211, 238, 0.06)',
            border: '1px solid rgba(34, 211, 238, 0.12)',
            flexWrap: 'wrap', fontFamily: mono, fontSize: '13px',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#22d3ee' }}>${fed.fedBalance?.toFixed(2)}T</div>
              <div style={{ fontSize: '9px', color: '#6b7280' }}>FED BAL</div>
            </div>
            <span style={{ color: '#ef4444', fontSize: '18px' }}>−</span>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#fbbf24' }}>${fed.tga?.toFixed(3)}T</div>
              <div style={{ fontSize: '9px', color: '#6b7280' }}>TGA</div>
            </div>
            <span style={{ color: '#ef4444', fontSize: '18px' }}>−</span>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#a78bfa' }}>${fed.rrp?.toFixed(3)}T</div>
              <div style={{ fontSize: '9px', color: '#6b7280' }}>RRP</div>
            </div>
            <span style={{ color: '#22d3ee', fontSize: '18px' }}>=</span>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#34d399' }}>${fed.netLiquidity?.toFixed(2)}T</div>
              <div style={{ fontSize: '9px', color: '#6b7280' }}>NET LIQ</div>
            </div>
          </div>

          {/* Key metrics grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: '8px',
          }}>
            {[
              { label: 'TGA', value: `$${((fed.tga || 0) * 1000).toFixed(0)}B`, status: (fed.tga || 0) > 0.65 ? 'caution' : 'bullish', note: (fed.tga || 0) > 0.65 ? 'Draining liquidity' : 'Below stress' },
              { label: 'RRP', value: `$${((fed.rrp || 0) * 1000).toFixed(0)}B`, status: (fed.rrp || 0) < 0.1 ? 'bullish' : 'caution', note: (fed.rrp || 0) < 0.1 ? 'Fully drained' : 'Still active' },
              { label: 'US 10Y', value: `${(mkt.us10y || 0).toFixed(2)}%`, status: (mkt.us10y || 0) > 5 ? 'bearish' : (mkt.us10y || 0) > 4.5 ? 'caution' : 'neutral', note: 'Treasury yield' },
              { label: 'WTI', value: `$${(mkt.wti || 0).toFixed(2)}`, status: (mkt.wti || 0) < 80 ? 'bullish' : 'bearish', note: (mkt.wti || 0) < 80 ? 'Under control' : 'Inflation risk' },
            ].map((item, i) => {
              const colors = {
                bullish: '#34d399', bearish: '#f87171', caution: '#fbbf24', neutral: '#94a3b8',
              };
              const c = colors[item.status];
              return (
                <div key={i} style={{
                  padding: '10px 12px', borderRadius: '8px',
                  backgroundColor: `${c}08`, border: `1px solid ${c}20`,
                }}>
                  <div style={{ fontSize: '9px', fontFamily: mono, color: '#6b7280', letterSpacing: '1px', marginBottom: '4px' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 700, fontFamily: mono, color: c }}>
                    {item.value}
                  </div>
                  <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '2px' }}>{item.note}</div>
                </div>
              );
            })}
          </div>

          <a
            href="https://liquidityflow-five.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              marginTop: '12px', fontSize: '10px', color: '#4b5563',
              textDecoration: 'none', fontFamily: mono,
            }}
          >
            Full liquidity dashboard →
            <ExternalLink style={{ width: '10px', height: '10px' }} />
          </a>
        </div>

        {/* ============================================================ */}
        {/* CONTENT — "Lo que escribimos sobre esto" */}
        {/* ============================================================ */}
        <div style={{
          padding: '16px', borderRadius: '12px', marginBottom: '20px',
          backgroundColor: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
        }}>
          <SectionHeader icon={BookOpen} label="Lo que escribimos sobre esto" color="#f59e0b" />
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '8px',
          }}>
            <div>
              <div style={{ fontSize: '9px', fontFamily: mono, color: '#6b7280', letterSpacing: '1px', marginBottom: '8px', paddingLeft: '4px' }}>
                MACRO & LIQUIDEZ
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {CONTENT_MAP.liquidity.map((item, i) => <ContentLink key={i} item={item} />)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '9px', fontFamily: mono, color: '#6b7280', letterSpacing: '1px', marginBottom: '8px', paddingLeft: '4px' }}>
                CRYPTO & TECH
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {CONTENT_MAP.crypto.map((item, i) => <ContentLink key={i} item={item} />)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '9px', fontFamily: mono, color: '#6b7280', letterSpacing: '1px', marginBottom: '8px', paddingLeft: '4px' }}>
                EARNINGS & ANÁLISIS
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {CONTENT_MAP.earnings.map((item, i) => <ContentLink key={i} item={item} />)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '9px', fontFamily: mono, color: '#6b7280', letterSpacing: '1px', marginBottom: '8px', paddingLeft: '4px' }}>
                TESIS & IDEAS
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {CONTENT_MAP.macro.map((item, i) => <ContentLink key={i} item={item} />)}
              </div>
            </div>
          </div>
          <a
            href="https://10am.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              marginTop: '12px', fontSize: '10px', color: '#4b5563',
              textDecoration: 'none', fontFamily: mono,
            }}
          >
            All articles & episodes →
            <ExternalLink style={{ width: '10px', height: '10px' }} />
          </a>
        </div>

        {/* ============================================================ */}
        {/* TOOLS — Links to other dashboards */}
        {/* ============================================================ */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: '8px', marginBottom: '24px',
        }}>
          {[
            { label: 'LiquidityFlow', url: 'https://liquidityflow-five.vercel.app', icon: '💧', color: '#22d3ee' },
            { label: 'Race to Target', url: 'https://forecast2026.vercel.app', icon: '🏇', color: '#a855f7' },
            { label: 'EarningsWatch', url: 'https://earningswatch.vercel.app', icon: '📅', color: '#10b981' },
            { label: 'Info Diet', url: 'https://info-diet.vercel.app', icon: '📓', color: '#ef4444' },
          ].map((tool, i) => (
            <a key={i} href={tool.url} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px 12px', borderRadius: '8px', textDecoration: 'none',
              backgroundColor: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.04)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.borderColor = `${tool.color}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)';
            }}
            >
              <span style={{ fontSize: '16px' }}>{tool.icon}</span>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af' }}>{tool.label}</span>
              <ChevronRight style={{ width: '10px', height: '10px', color: '#4b5563', marginLeft: 'auto' }} />
            </a>
          ))}
        </div>

        {/* ============================================================ */}
        {/* WATCHLIST — compact grid */}
        {/* ============================================================ */}
        <div style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BarChart3 style={{ width: '14px', height: '14px', color: '#10b981' }} />
              <span style={{ fontFamily: sans, fontWeight: 700, fontSize: '13px', color: '#e5e7eb' }}>Watchlist</span>
            </div>
            <div style={{ display: 'flex', gap: '3px' }}>
              {['all', 'stock', 'crypto', 'fx'].map(f => (
                <button key={f} onClick={() => setWlFilter(f)} style={{
                  padding: '1px 6px', borderRadius: '3px', border: 'none', cursor: 'pointer',
                  fontFamily: mono, fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.05em',
                  backgroundColor: wlFilter === f ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.03)',
                  color: wlFilter === f ? '#34d399' : '#6b7280',
                }}>{f}</button>
              ))}
            </div>
          </div>

          {wlLoading ? (
            <div style={{ textAlign: 'center', padding: '24px 0', color: '#6b7280', fontFamily: mono, fontSize: '10px' }}>
              <Loader2 style={{ width: '14px', height: '14px', animation: 'spin 1s linear infinite', margin: '0 auto 6px' }} />
              Loading...
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)',
              gap: '4px',
            }}>
              {sortedWatchlist.map(a => {
                const up = a.change > 0;
                const down = a.change < 0;
                const borderColor = up ? 'rgba(52,211,153,0.25)' : down ? 'rgba(248,113,113,0.25)' : 'rgba(255,255,255,0.06)';
                return (
                  <div key={a.ticker} style={{
                    padding: '6px 8px', borderRadius: '6px',
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    border: `1px solid ${borderColor}`,
                    fontFamily: mono,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: '#e5e7eb', letterSpacing: '0.02em' }}>{a.ticker}</span>
                      <span style={{
                        fontSize: '8px', padding: '0 3px', borderRadius: '2px',
                        backgroundColor: a.type === 'stock' ? 'rgba(59,130,246,0.15)' : a.type === 'crypto' ? 'rgba(245,158,11,0.15)' : 'rgba(139,92,246,0.15)',
                        color: a.type === 'stock' ? '#60a5fa' : a.type === 'crypto' ? '#fbbf24' : '#a78bfa',
                      }}>{a.type === 'stock' ? 'S' : a.type === 'crypto' ? 'C' : 'FX'}</span>
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#d1d5db', marginBottom: '1px' }}>
                      {a.price != null ? (a.price >= 1 ? `$${a.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : `$${a.price.toFixed(4)}`) : '—'}
                    </div>
                    <div style={{
                      fontSize: '10px', fontWeight: 700,
                      color: up ? '#34d399' : down ? '#f87171' : '#6b7280',
                    }}>
                      {a.change != null ? `${up ? '▲' : down ? '▼' : ''}${Math.abs(a.change).toFixed(2)}%` : '—'}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* FOOTER */}
        {/* ============================================================ */}
        <footer style={{
          textAlign: 'center', paddingTop: '16px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          fontSize: '11px', color: '#4b5563',
        }}>
          <p style={{ margin: '0 0 4px', fontStyle: 'italic', fontFamily: sans }}>
            &quot;Calm mind, fit body, house full of love&quot;
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '8px' }}>
            <a href="https://10am.substack.com" target="_blank" rel="noopener noreferrer" style={{ color: '#6b7280', textDecoration: 'none', fontFamily: mono, fontSize: '10px' }}>10am.pro</a>
            <a href="https://x.com/holdmybirra" target="_blank" rel="noopener noreferrer" style={{ color: '#10b981', textDecoration: 'none', fontFamily: mono, fontSize: '10px' }}>@holdmybirra</a>
          </div>
          <div style={{ marginTop: '8px', fontFamily: mono, fontSize: '9px', color: '#374151' }}>
            {d.timestamp && `Last fetch: ${new Date(d.timestamp).toLocaleTimeString()}`}
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        * { box-sizing: border-box; }
        body { -webkit-font-smoothing: antialiased; }
      `}</style>
    </div>
  );
}
