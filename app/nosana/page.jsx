'use client';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

// ============================================================
// NOSANA // NETWORK TELEMETRY
// mercados.10am.pro/nosana
// Live tracker for Nosana's main data points + NOS market data.
// Green = network fundamentals (Nosana API). Blue = market (CoinGecko).
// Data flows through same-origin /api/nosana (server-side proxy, no CORS).
// Point-in-time KPIs are snapshotted to localStorage to build evolution.
// ============================================================

const GRN = '#22c55e';
const BLU = '#5b8cff';
const AMB = '#f59e0b';
const RED = '#ef4444';

// Seed fallbacks (Aug 1 2026 telemetry) if the live feed is unreachable.
const SEED = {
  completed: 4036795, jobHours: 4040866, hosts: 965, running: 840, queued: 44,
  price: 0.2537, mcap: 25370000, ath: 7.83, peakHours: 220000,
};

const PERIODS = [
  { k: '2592000', label: '30D' },
  { k: '7776000', label: '90D' },
  { k: '31536000', label: '1Y' },
  { k: '0', label: 'ALL' },
];

// ---------- formatters ----------
const fmtInt = (n) => (n == null || isNaN(n) ? '—' : Math.round(n).toLocaleString('en-US'));
const fmtM = (n) => (n == null || isNaN(n) ? '—' : '$' + (n / 1e6).toLocaleString('en-US', { maximumFractionDigits: 2 }) + 'M');
const fmtPx = (n) => (n == null || isNaN(n) ? '—' : '$' + Number(n).toFixed(4));
const monthLabel = (ms) => new Date(ms).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
const dayLabel = (ms) => new Date(ms).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

// ---------- SVG area chart with hover ----------
function AreaChart({ points, color, fmtY, height = 260, monthly = false }) {
  const wrapRef = useRef(null);
  const [w, setW] = useState(680);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver((es) => setW(Math.max(280, es[0].contentRect.width)));
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const pad = { l: 52, r: 12, t: 14, b: 26 };
  const iw = w - pad.l - pad.r;
  const ih = height - pad.t - pad.b;

  const data = points || [];
  const ready = data.length > 1;
  const ys = data.map((p) => p.y);
  const yMin = ready ? Math.min(...ys) : 0;
  const yMax = ready ? Math.max(...ys) : 1;
  const span = yMax - yMin || 1;
  const lo = yMin - span * 0.08;
  const hi = yMax + span * 0.08;

  const X = (i) => pad.l + (data.length <= 1 ? 0 : (i / (data.length - 1)) * iw);
  const Y = (v) => pad.t + ih - ((v - lo) / (hi - lo || 1)) * ih;

  const line = ready ? data.map((p, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)},${Y(p.y).toFixed(1)}`).join(' ') : '';
  const area = ready ? `${line} L${X(data.length - 1).toFixed(1)},${(pad.t + ih).toFixed(1)} L${X(0).toFixed(1)},${(pad.t + ih).toFixed(1)} Z` : '';

  const yticks = 4;
  const gridY = Array.from({ length: yticks + 1 }, (_, i) => lo + ((hi - lo) * i) / yticks);
  const gid = useMemo(() => 'g' + Math.random().toString(36).slice(2, 8), []);

  const onMove = (e) => {
    if (!ready) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * w;
    let idx = Math.round(((px - pad.l) / (iw || 1)) * (data.length - 1));
    idx = Math.max(0, Math.min(data.length - 1, idx));
    setHover(idx);
  };

  return (
    <div ref={wrapRef} style={{ width: '100%', position: 'relative' }}>
      <svg width="100%" height={height} viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none"
        onMouseMove={onMove} onMouseLeave={() => setHover(null)} style={{ display: 'block' }}>
        <defs>
          <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {gridY.map((v, i) => (
          <g key={i}>
            <line x1={pad.l} x2={w - pad.r} y1={Y(v)} y2={Y(v)} stroke="rgba(255,255,255,.05)" strokeWidth="1" />
            <text x={pad.l - 8} y={Y(v) + 3} textAnchor="end" fontSize="10" fill="var(--text-muted)" fontFamily="'JetBrains Mono',monospace">
              {fmtY ? fmtY(v) : Math.round(v)}
            </text>
          </g>
        ))}
        {ready && <path d={area} fill={`url(#${gid})`} />}
        {ready && <path d={line} fill="none" stroke={color} strokeWidth="2" />}
        {/* x labels: first, middle, last */}
        {ready && [0, Math.floor((data.length - 1) / 2), data.length - 1].map((i, k) => (
          <text key={k} x={X(i)} y={height - 8} textAnchor={k === 0 ? 'start' : k === 2 ? 'end' : 'middle'}
            fontSize="10" fill="var(--text-muted)" fontFamily="'JetBrains Mono',monospace">
            {monthly ? monthLabel(data[i].t) : dayLabel(data[i].t)}
          </text>
        ))}
        {hover != null && ready && (
          <g>
            <line x1={X(hover)} x2={X(hover)} y1={pad.t} y2={pad.t + ih} stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <circle cx={X(hover)} cy={Y(data[hover].y)} r="3.5" fill={color} />
          </g>
        )}
        {!ready && (
          <text x={w / 2} y={height / 2} textAnchor="middle" fontSize="11" fill="var(--text-muted)" fontFamily="'JetBrains Mono',monospace">
            loading series…
          </text>
        )}
      </svg>
      {hover != null && ready && (
        <div style={{
          position: 'absolute', top: 6,
          left: Math.min(Math.max(8, (X(hover) / w) * 100 + '%' ? (X(hover) / w) * (wrapRef.current?.clientWidth || w) - 60 : 8), (wrapRef.current?.clientWidth || w) - 130),
          background: 'var(--bg)', border: `1px solid ${color}`, borderRadius: 4, padding: '5px 8px',
          fontSize: 11, pointerEvents: 'none', whiteSpace: 'nowrap', fontFamily: "'JetBrains Mono',monospace",
        }}>
          <div style={{ color: 'var(--text-muted)' }}>{monthly ? monthLabel(data[hover].t) : dayLabel(data[hover].t)}</div>
          <div style={{ color, fontWeight: 700 }}>{fmtY ? fmtY(data[hover].y) : fmtInt(data[hover].y)}</div>
        </div>
      )}
    </div>
  );
}

// ---------- small pieces ----------
function Delta({ cur, prev, pct = true }) {
  if (prev == null || cur == null || isNaN(prev) || isNaN(cur))
    return <span style={pill('var(--text-muted)', 'rgba(255,255,255,.04)')}>— no prior</span>;
  const d = cur - prev;
  if (Math.abs(d) < 1e-9) return <span style={pill('var(--text-muted)', 'rgba(255,255,255,.04)')}>± 0</span>;
  const up = d > 0;
  const clr = up ? GRN : RED;
  const val = pct ? (prev !== 0 ? ((d / prev) * 100).toFixed(2) + '%' : 'n/a') : fmtInt(Math.abs(d));
  return <span style={pill(clr, up ? 'rgba(34,197,94,.12)' : 'rgba(239,68,68,.12)')}>{up ? '▲' : '▼'} {val}</span>;
}
const pill = (color, bg) => ({ color, background: bg, fontSize: 11, fontWeight: 600, padding: '1px 5px', borderRadius: 3, letterSpacing: '.02em' });

function Eyebrow({ children, dot = GRN }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, margin: '26px 2px 12px', fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: dot }} />
      {children}
    </div>
  );
}
const panel = { border: '1px solid var(--border)', borderRadius: 4, background: 'var(--surface)', padding: 16 };

// ============================================================
export default function NosanaTelemetry() {
  const [d, setD] = useState(null);          // summary
  const [prev, setPrev] = useState(null);     // previous snapshot
  const [net, setNet] = useState([]);         // network series points
  const [pxHist, setPxHist] = useState({ price: [], mcap: [] });
  const [metric, setMetric] = useState('hours');
  const [period, setPeriod] = useState('31536000');
  const [days, setDays] = useState('365');
  const [snaps, setSnaps] = useState([]);
  const [updated, setUpdated] = useState('—');
  const [clock, setClock] = useState('—');
  const [status, setStatus] = useState('booting');
  const [mb, setMb] = useState(false);

  useEffect(() => {
    const f = () => setMb(window.innerWidth < 760);
    f(); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setClock(new Date().toLocaleTimeString('en-GB', { hour12: false })), 1000);
    return () => clearInterval(t);
  }, []);

  const loadSnaps = () => { try { return JSON.parse(localStorage.getItem('nosana:snapshots') || '[]'); } catch { return []; } };
  const saveSnaps = (a) => { try { localStorage.setItem('nosana:snapshots', JSON.stringify(a.slice(-400))); } catch {} };

  // ---- summary + snapshot ----
  const refresh = useCallback(async (manual) => {
    setStatus('fetching…');
    const prevSnaps = loadSnaps();
    setPrev(prevSnaps.length ? prevSnaps[prevSnaps.length - 1] : null);
    let s = {};
    try {
      const r = await fetch('/api/nosana', { cache: 'no-store' });
      s = await r.json();
    } catch { s = { ok: false }; }

    const merged = {
      completed: s.completed ?? SEED.completed,
      jobHours: s.jobHours ?? SEED.jobHours,
      running: s.running ?? SEED.running,
      queued: s.queued ?? SEED.queued,
      hosts: s.hosts ?? SEED.hosts,
      price: s.price ?? SEED.price,
      mcap: s.mcap ?? SEED.mcap,
      chg: s.chg ?? null,
    };
    setD(merged);
    const live = s.ok && (s.completed != null || s.price != null);
    setStatus(live ? 'ok · live feed' : 'ok · seeded (live feed unreachable)');
    setUpdated(new Date().toLocaleTimeString('en-GB', { hour12: false }));

    // snapshot throttle: 1 per 6h (manual allows >5min)
    const snap = { t: new Date().toISOString(), price: merged.price, mcap: merged.mcap, completed: merged.completed, jobHours: merged.jobHours, hosts: merged.hosts, running: merged.running, queued: merged.queued };
    const arr = prevSnaps.slice();
    const last = arr[arr.length - 1];
    const gapH = last ? (Date.now() - new Date(last.t)) / 3600000 : 999;
    if (!last || gapH >= 6 || (manual && gapH > 0.08)) { arr.push(snap); saveSnaps(arr); }
    setSnaps(arr);
  }, []);

  // ---- network series ----
  const loadNet = useCallback(async () => {
    setNet([]);
    try {
      const r = await fetch(`/api/nosana?series=${metric}&period=${period}`, { cache: 'no-store' });
      const j = await r.json();
      let data = Array.isArray(j.data) ? j.data.slice() : [];
      if (data.length > 2) data = data.slice(1, -1); // drop partial edge buckets (matches explorer)
      setNet(data.map((p) => ({ t: new Date(p.x).getTime(), y: Math.round(p.y) })));
    } catch { setNet([]); }
  }, [metric, period]);

  // ---- price history ----
  const loadHist = useCallback(async () => {
    try {
      const r = await fetch(`/api/nosana?history=${days}`, { cache: 'no-store' });
      const j = await r.json();
      const step = Math.max(1, Math.floor((j.prices || []).length / 180));
      const price = [], mcap = [];
      for (let i = 0; i < (j.prices || []).length; i += step) {
        price.push({ t: j.prices[i][0], y: +j.prices[i][1].toFixed(4) });
        if (j.market_caps && j.market_caps[i]) mcap.push({ t: j.market_caps[i][0], y: Math.round(j.market_caps[i][1]) });
      }
      setPxHist({ price, mcap });
    } catch { setPxHist({ price: [], mcap: [] }); }
  }, [days]);

  useEffect(() => { refresh(false); }, [refresh]);
  useEffect(() => { loadNet(); }, [loadNet]);
  useEffect(() => { loadHist(); }, [loadHist]);

  // ---- derived thesis metrics ----
  const monthlyNet = period === '0' || Number(period) > 10512000;
  const netHours = useMemo(() => {
    if (metric !== 'hours' || !net.length) return null;
    const ys = net.map((p) => p.y);
    const peak = Math.max(...ys, SEED.peakHours);
    const latest = ys[ys.length - 1];
    return { latest, peak, rec: peak ? Math.round((latest / peak) * 100) : 0 };
  }, [net, metric]);

  const drawdown = useMemo(() => {
    const p = pxHist.price;
    if (!p.length) return null;
    return Math.round((p[p.length - 1].y / SEED.ath - 1) * 100);
  }, [pxHist]);

  // recovery for tripwires (independent of chart metric) — reuse netHours if on hours+ALL-ish, else estimate from seed
  const recPct = netHours ? netHours.rec : null;

  const netColor = netHours ? (netHours.rec >= 90 ? GRN : netHours.rec >= 60 ? AMB : RED) : 'var(--text-primary)';
  const divergence = (() => {
    if (recPct != null && recPct < 70 && drawdown != null)
      return { txt: `Network at ${recPct}% of peak while price ${drawdown}% below ATH — both soft; no confirmation yet.`, c: AMB };
    if (recPct != null && recPct >= 90)
      return { txt: `Network re-accelerating (${recPct}% of peak) — watch for market to follow.`, c: GRN };
    return { txt: `Network ${recPct != null ? recPct + '% of peak' : '—'} · price ${drawdown != null ? drawdown + '% below ATH' : '—'}.`, c: 'var(--text-secondary)' };
  })();

  const seg = (on) => ({
    fontFamily: "'JetBrains Mono',monospace", fontSize: 11, padding: '5px 10px', cursor: 'pointer',
    border: 0, background: on ? 'rgba(34,197,94,.13)' : 'transparent', color: on ? GRN : 'var(--text-muted)', letterSpacing: '.03em',
  });
  const segBlue = (on) => ({ ...seg(on), background: on ? 'rgba(91,140,255,.14)' : 'transparent', color: on ? BLU : 'var(--text-muted)' });
  const segWrap = { display: 'flex', border: '1px solid var(--border)', borderRadius: 3, overflow: 'hidden' };

  const kpi = (label, value, sub, valColor) => (
    <div style={{ ...panel, padding: '13px 13px 12px', minHeight: 104, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</div>
      <div style={{ fontSize: 23, fontWeight: 800, letterSpacing: '-.01em', lineHeight: 1.05, marginTop: 8, color: valColor || 'var(--text-bright)' }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 5, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>{sub}</div>
    </div>
  );

  const trips = useMemo(() => {
    const T = [];
    if (recPct != null) {
      T.push(recPct >= 90
        ? ['pass', '✓', 'Compute hours recovering toward peak', `Latest ≈ ${recPct}% of the Oct-25 peak. Sustained recovery = demand not purely incentive-driven.`]
        : ['fail', '!', 'Compute hours below peak', `Latest ≈ ${recPct}% of Oct-25 peak (~220k/mo). The #1 warning sign until it re-trends up.`]);
    } else {
      T.push(['watch', '◦', 'Compute hours vs peak', 'Switch the chart to COMPUTE HRS · ALL to read recovery vs the ~220k Oct-25 peak.']);
    }
    const hosts = d?.hosts;
    T.push(hosts && hosts > 965
      ? ['pass', '✓', 'Host count above baseline', `${fmtInt(hosts)} online GPU hosts (>965 baseline). Growth toward ~2,000 = supply-side conviction.`]
      : ['watch', '◦', 'Host count', `${fmtInt(hosts)} online hosts. Track durable growth above the ~965 baseline.`]);
    T.push(['watch', '◦', 'Paid revenue disclosure', 'No published USDC/USD paid-compute revenue yet. THE decisive signal — watch for a paid-vs-incentivized split.']);
    T.push(['watch', '◦', 'Staked NOS stabilizing', 'Staking fell ~29.7M → ~14M NOS; APR cut ~20%→~4% (NNP-0001). Watch for it to stop bleeding.']);
    T.push(['watch', '◦', 'Roadmap ships (SSH · confidential compute)', 'Q3/Q4 2026 promises. Confirm they ship, not slip — the $SHDW failure mode is perpetual "upcoming".']);
    return T;
  }, [recPct, d]);

  const tripStyle = { pass: [GRN, 'rgba(34,197,94,.12)'], fail: [RED, 'rgba(239,68,68,.12)'], watch: [AMB, 'rgba(245,158,11,.13)'] };

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: mb ? '16px 12px 50px' : '22px 20px 60px', fontFamily: "'JetBrains Mono',ui-monospace,monospace", minHeight: '100vh' }}>

      {/* HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', border: '1px solid var(--border)', background: 'var(--surface)', padding: '12px 16px', borderRadius: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 800, letterSpacing: '.02em' }}>
          <svg width="22" height="22" viewBox="0 0 32 32" fill="none"><path d="M6 24V8l10 12V8m4 0v16" stroke={GRN} strokeWidth="3.2" strokeLinecap="square" /></svg>
          NOSANA
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: GRN, boxShadow: `0 0 8px ${GRN}` }} />
          <span style={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase' }}>Network Telemetry</span>
        </div>
        <div style={{ flex: 1 }} />
        {!mb && <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>SYS.TIME <b style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{clock}</b> · UPD <b style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{updated}</b></div>}
        <button onClick={() => refresh(true)} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--text-primary)', background: 'transparent', border: '1px solid var(--border)', borderRadius: 3, padding: '6px 11px', cursor: 'pointer' }}>↻ REFRESH</button>
      </div>
      <div style={{ margin: '10px 2px 0', color: 'var(--text-muted)', fontSize: 12 }}>
        &gt; executing telemetry.sh … <span style={{ color: status.includes('seeded') ? AMB : GRN }}>{status}</span>
      </div>

      {/* THESIS STRIP */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
        {[
          ['Network signal · fundamentals', netHours ? `${netHours.rec}% of peak` : '—', netHours ? `Latest ${fmtInt(netHours.latest)} vs Oct-25 peak ${fmtInt(netHours.peak)} compute hrs` : 'GPU compute hours, latest vs Oct-25 peak', GRN, netColor],
          ['Market signal · price', drawdown != null ? `${drawdown}%` : '—', pxHist.price.length ? `NOS ${fmtPx(pxHist.price[pxHist.price.length - 1].y)} vs ATH $${SEED.ath}` : 'NOS vs all-time high', BLU, RED],
          ['Divergence watch', null, null, AMB, null],
        ].map((c, i) => (
          <div key={i} style={{ flex: 1, minWidth: 210, border: '1px solid var(--border)', borderRadius: 4, background: 'var(--surface)', padding: '12px 14px', position: 'relative', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: c[3] }} />
            <div style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{c[0]}</div>
            {i < 2 ? (
              <>
                <div style={{ fontSize: 22, fontWeight: 800, marginTop: 6, color: c[4] }}>{c[1]}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{c[2]}</div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 14.5, fontWeight: 700, marginTop: 6, lineHeight: 1.35, color: divergence.c }}>{divergence.txt}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>Thesis confirms when network re-accelerates & market follows</div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* KPIs */}
      <Eyebrow>Core data points</Eyebrow>
      <div style={{ display: 'grid', gridTemplateColumns: mb ? 'repeat(2,1fr)' : 'repeat(6,1fr)', gap: 10 }}>
        {kpi('NOS Price', fmtPx(d?.price), <>
          {d?.chg != null && <span style={pill(d.chg >= 0 ? GRN : RED, d.chg >= 0 ? 'rgba(34,197,94,.12)' : 'rgba(239,68,68,.12)')}>{d.chg >= 0 ? '▲' : '▼'} {Math.abs(d.chg).toFixed(2)}% 24h</span>}
          {prev && <Delta cur={d?.price} prev={prev.price} />}
        </>, BLU)}
        {kpi('Market Cap', fmtM(d?.mcap), prev ? <Delta cur={d?.mcap} prev={prev.mcap} /> : <span style={pill('var(--text-muted)', 'rgba(255,255,255,.04)')}>baseline</span>)}
        {kpi('Completed Jobs', fmtInt(d?.completed), prev ? <Delta cur={d?.completed} prev={prev.completed} pct={false} /> : <span style={pill('var(--text-muted)', 'rgba(255,255,255,.04)')}>baseline</span>, GRN)}
        {kpi('Total Job Hours', fmtInt(d?.jobHours), prev ? <Delta cur={d?.jobHours} prev={prev.jobHours} pct={false} /> : <span style={pill('var(--text-muted)', 'rgba(255,255,255,.04)')}>baseline</span>, GRN)}
        {kpi('Online GPU Hosts', fmtInt(d?.hosts), prev ? <Delta cur={d?.hosts} prev={prev.hosts} pct={false} /> : <span style={pill('var(--text-muted)', 'rgba(255,255,255,.04)')}>baseline</span>, GRN)}
        {kpi('Running / Queued', fmtInt(d?.running), <span style={{ color: 'var(--text-muted)' }}>{fmtInt(d?.queued)} queued</span>)}
      </div>

      {/* NETWORK EVOLUTION */}
      <Eyebrow>Network evolution — is real usage growing?</Eyebrow>
      <div style={panel}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{metric === 'hours' ? 'GPU Compute Hours' : 'Completed Jobs'}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{metric === 'hours' ? 'Monthly throughput — leading indicator of paid demand vs incentives' : 'Jobs processed per bucket'}</div>
          </div>
          <div style={{ display: 'flex', gap: 6, marginLeft: 'auto', flexWrap: 'wrap' }}>
            <div style={segWrap}>
              <button style={seg(metric === 'hours')} onClick={() => setMetric('hours')}>COMPUTE HRS</button>
              <button style={seg(metric === 'count')} onClick={() => setMetric('count')}>JOBS</button>
            </div>
            <div style={segWrap}>
              {PERIODS.map((p) => <button key={p.k} style={seg(period === p.k)} onClick={() => setPeriod(p.k)}>{p.label}</button>)}
            </div>
          </div>
        </div>
        <AreaChart points={net} color={GRN} monthly={monthlyNet} fmtY={(v) => (v >= 1000 ? (v / 1000).toFixed(0) + 'k' : Math.round(v))} height={mb ? 220 : 300} />
        {netHours && (
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>
            Latest bucket ≈ <b style={{ color: GRN }}>{fmtInt(netHours.latest)}</b> compute hrs · peak ≈ {fmtInt(netHours.peak)} · <b>{netHours.rec}%</b> of peak.
          </div>
        )}
      </div>

      {/* MARKET */}
      <Eyebrow dot={BLU}>Market context — price & market cap (CoinGecko)</Eyebrow>
      <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : '1fr 1fr', gap: 14 }}>
        <div style={panel}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
            <div><div style={{ fontSize: 13, fontWeight: 700, color: BLU }}>NOS Price</div><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>USD</div></div>
            <div style={{ ...segWrap, marginLeft: 'auto' }}>
              {['90', '365', 'max'].map((k) => <button key={k} style={segBlue(days === k)} onClick={() => setDays(k)}>{k === 'max' ? 'MAX' : k === '90' ? '90D' : '1Y'}</button>)}
            </div>
          </div>
          <AreaChart points={pxHist.price} color={BLU} monthly={days !== '90'} fmtY={(v) => '$' + v.toFixed(2)} height={mb ? 200 : 240} />
        </div>
        <div style={panel}>
          <div style={{ marginBottom: 6 }}><div style={{ fontSize: 13, fontWeight: 700, color: BLU }}>Market Cap</div><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>USD · fully circulating (~100M NOS)</div></div>
          <AreaChart points={pxHist.mcap} color={BLU} monthly={days !== '90'} fmtY={(v) => '$' + (v / 1e6).toFixed(0) + 'M'} height={mb ? 200 : 240} />
        </div>
      </div>

      {/* SNAPSHOT LOG */}
      <Eyebrow>Tracked snapshots — accumulates every visit → your own history</Eyebrow>
      <div style={panel}>
        <div style={{ marginBottom: 8 }}><span style={{ fontSize: 13, fontWeight: 700 }}>Data-point log</span> <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>· auto-saved in this browser (max 1 per 6h). Deltas above are vs the previous row.</span></div>
        {snaps.length === 0 ? (
          <div style={{ color: 'var(--text-muted)', fontSize: 12, padding: '10px 2px' }}>No snapshots yet — this is your first read. Revisit to build the trend.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead><tr>{['Timestamp', 'NOS $', 'Mkt Cap', 'Completed', 'Job hrs', 'Hosts', 'Running'].map((h, i) => (
                <th key={h} style={{ textAlign: i ? 'right' : 'left', padding: '7px 8px', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontWeight: 500, fontSize: 10, letterSpacing: '.05em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
              ))}</tr></thead>
              <tbody>
                {snaps.slice(-12).reverse().map((s, i) => (
                  <tr key={i}>
                    <td style={td(1)}>{new Date(s.t).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false })}</td>
                    <td style={td()}>{fmtPx(s.price)}</td>
                    <td style={td()}>{fmtM(s.mcap)}</td>
                    <td style={td()}>{fmtInt(s.completed)}</td>
                    <td style={td()}>{fmtInt(s.jobHours)}</td>
                    <td style={td()}>{fmtInt(s.hosts)}</td>
                    <td style={td()}>{fmtInt(s.running)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* TRIPWIRES */}
      <Eyebrow>Thesis tripwires — materialization checklist (from due-diligence)</Eyebrow>
      <div>
        {trips.map(([cls, ic, t, desc], i) => (
          <div key={i} style={{ display: 'flex', gap: 11, padding: '11px 12px', border: '1px solid var(--border)', borderRadius: 4, background: 'var(--surface)', alignItems: 'flex-start', marginBottom: 8 }}>
            <div style={{ width: 20, height: 20, borderRadius: 4, flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, marginTop: 1, color: tripStyle[cls][0], background: tripStyle[cls][1] }}>{ic}</div>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 600 }}>{t}</div>
              <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 2, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div style={{ marginTop: 26, borderTop: '1px solid var(--border)', paddingTop: 14, color: 'var(--text-muted)', fontSize: 11, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif", lineHeight: 1.6 }}>
        <b style={{ color: 'var(--text-secondary)' }}>Sources.</b> Network data via server-side proxy to the Nosana API (dashboard.k8s.prd.nos.ci — same backend as <a href="https://explore.nosana.com/" target="_blank" rel="noopener" style={{ color: GRN }}>explore.nosana.com</a>). Market data: CoinGecko.<br />
        <b style={{ color: 'var(--text-secondary)' }}>Green</b> = network fundamentals · <b style={{ color: 'var(--text-secondary)' }}>blue</b> = market. The dashboard's job is to show whether the two converge. The network-evolution chart is native historical series; point-in-time KPIs are snapshotted per visit.<br />
        <b style={{ color: 'var(--text-secondary)' }}>Note.</b> Completed jobs / compute hours include incentivized, grant and charity (Folding@Home) activity — not a clean paid-revenue signal. Watch the tripwires for real materialization. Data & research context, not investment advice.
      </div>
    </div>
  );
}
const td = (first) => ({ textAlign: first ? 'left' : 'right', padding: '7px 8px', borderBottom: '1px solid var(--border-subtle)', whiteSpace: 'nowrap' });
