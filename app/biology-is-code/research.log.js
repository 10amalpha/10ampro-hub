// Research-hours ledger for /biology-is-code. The counter at the top of the page sums this file.
// Rule: no shares bought until GOAL hours of documented research.
// est: true = retroactive estimate (reconstructed 23 Sep 2026 from project history); new entries are logged as they happen.
// To add hours: append { d: 'YYYY-MM-DD', cat, h, note }.
// STANDING RULE: every work session on Biology is Code logs its hours here in the same push, unasked.
// h = the session's real working time (research + review), rounded to 0.5; one entry per category touched.
// Hours Hernán reports himself (podcasts, reading, charting outside chat) are added as he says them.
export const GOAL = 100;

export const CATS = {
  fuentes: { label: 'Podcasts & sources', color: '#8b5cf6' },
  tesis: { label: 'Thesis & framework', color: '#D4A843' },
  earnings: { label: 'Earnings & filings', color: '#378ADD' },
  modelo: { label: 'Financial modeling', color: '#85B7EB' },
  charting: { label: 'Charting / TA', color: '#22c55e' },
  noticias: { label: 'News tracking', color: '#f59e0b' },
};

export const LOG = [
  { d: '2026-06-12', cat: 'fuentes', h: 6, est: true, note: 'Source podcast + synthesis of the deck "The Next Computing Supercycle Runs on Human Biology"' },
  { d: '2026-06-17', cat: 'tesis', h: 6, est: true, note: 'First thesis: 5 tickers, READ → MODEL → REBOOT → EXECUTE chain, market caps and FY22–25 income statements' },
  { d: '2026-08-17', cat: 'tesis', h: 8, est: true, note: 'Bio-OS Read · Orchestrate · Write, Healthspan per Token, proteomic stack; screening and onboarding of HIMS, CAI, PBLS, NGEN' },
  { d: '2026-08-17', cat: 'modelo', h: 3, est: true, note: 'Income statements for the 4 new tickers' },
  { d: '2026-08-18', cat: 'earnings', h: 3, est: true, note: 'HIMS Q2 FY26: investor deck + call' },
  { d: '2026-08-18', cat: 'earnings', h: 10, est: true, note: 'Q2 FY26 for the other 8 tickers: press releases, 8-K / 10-Q' },
  { d: '2026-08-18', cat: 'modelo', h: 3, est: true, note: 'FCF per share, 6 quarters (HIMS from the official reconciliation)' },
  { d: '2026-09-06', cat: 'noticias', h: 5, est: true, note: 'Sep 4 snapshot: FTC / Visa at HIMS, Merck–Moderna at TEM, Nature Methods at NAUT' },
  { d: '2026-09-15', cat: 'modelo', h: 4, est: true, note: 'Quarterly revenue Q1’25–Q2’26 and % of guidance executed' },
  { d: '2026-09-23', cat: 'charting', h: 6, est: true, note: '9 charts: regime, structure, levels, 1M / 3M / 1Y paths with invalidation' },
  { d: '2026-09-24', cat: 'modelo', h: 1, note: 'Quarterly P&L Q1’25–Q2’26 for the 9 tickers (revenue, gross margin, operating and net result), verified against SEC XBRL and Yahoo' },
  { d: '2026-09-29', cat: 'modelo', h: 1.5, note: 'Cash on hand for the 9 tickers at Jun 30 ’26 (10-Q/8-K), burn, runway and live cash/mcap' },
  { d: '2026-09-29', cat: 'fuentes', h: 1.5, note: 'NAUT: read and synthesized "Nautilus: Tesla for Proteomics" (A. Linares, post-Q2 FY26) → Research module in the dossier' },
  { d: '2026-09-29', cat: 'tesis', h: 1, note: 'Preferred entry order (HOLDING / BUILD / STUDY / OPTION / MONITOR) and public holders with sources' },
  { d: '2026-09-30', cat: 'fuentes', h: 2, note: 'Read and synthesized "Life Extension per Token" (A. Linares, RXRX / TEM / NAUT Q2 ER update) → Research modules for RXRX, TEM, HIMS, IBRX, INKT; NAUT update; holders refreshed' },
  { d: '2026-10-02', cat: 'fuentes', h: 2, note: 'QSI onboarded as the 10th ticker (READ): synthesized Hernán\u2019s "AI + Biología = Quantum-Si" (Nov 2025) and "La Cadena" (May 2026) → Research module, holders, chain position' },
  { d: '2026-10-02', cat: 'earnings', h: 1.5, note: 'QSI: FY22–FY25 income statements, Q1\u201925–Q2\u201926 P&L and FCF from 8-K/10-Q, cash on hand, Proteus delay / RIF / 18-AA / HUPO data' },
  { d: '2026-10-11', cat: 'charting', h: 3, note: 'Full TA pass on all 10 tickers with closes through Oct 9: editor reads, invalidations, paths and levels rewritten; board prices/mcaps refreshed; NAUT +136% and QSI +25%-day read, TEM failed breakout, HIMS triangle break, PBLS/INKT breakdowns' },
  { d: '2026-10-12', cat: 'charting', h: 0.5, note: 'Daily TA refresh (closes through Oct 12): TEM rewritten (higher-lows trendline lost, close 67.99 on the EMA50, inv 67.8 intact), PBLS (oversold bounce reclaimed 28.6, inv to EMA20 31.9), NGEN (RSI through 30 at 24), QSI (−11% after the record bar, RSI back under 70); IBRX, CAI, HIMS, RXRX, NAUT, INKT no material change. Board prices/mcaps at Oct 12 close' },
  { d: '2026-10-13', cat: 'charting', h: 0.5, note: 'Daily TA refresh (closes through Oct 13): HIMS rewritten (Oct 9 break failed — back under 30.4 at 29.71, engine forecast flipped BEAR, editor BULL on the 27.44 floor only), PBLS (bounce failed in one session, −7% to 26.85 under the Oct 9 low, inv to EMA20 31.4), RXRX (3.95 retest low lost, 3.835 under the EMA20, inv 3.70 = EMA50 is the line), INKT (eighth red close, 90-day low 10.24 lost at 10.23, RSI 18); TEM held the EMA50 by 0.36 — inv 67.8 intact; IBRX, CAI, QSI, NAUT, NGEN no material change. Board prices/mcaps at Oct 13 close' },
  { d: '2026-10-16', cat: 'charting', h: 0.5, note: 'Daily TA refresh (closes through Oct 15): HIMS rewritten (floor test — 27.72 on Oct 14, 0.28 above the 27.44 invalidation, +6% back to 29.38; engine 1/7, editor BULL on the floor only), PBLS (25.18, 0.17 above the post-IPO low, traded through at the Oct 16 open; inv to EMA20 29.8; +1M 25 → 23), RXRX (EMA50 held on the first touch at 3.74, +11% to 4.16 reclaimed the EMA20; inv 3.70 intact), NGEN (52-week low lost at 1.565 on Oct 14, bounce to 1.62; inv 1.99 → 1.90, +1M 1.58 → 1.50); TEM reclaimed 71.13 then −2.8% at the open, inv 67.8 intact; IBRX, CAI, QSI, NAUT, INKT no material change. Board prices/mcaps at Oct 15 close' },
  { d: '2026-10-19', cat: 'charting', h: 0.5, note: 'Daily TA refresh (closes through Oct 19, Oct 16 folded in): four invalidations fired — TEM (64.72 on Oct 16 through 67.8, bias BULL → BEAR, bear inv 71.2), IBRX (8.42 on Oct 19 through 8.44 by 0.02, BULL → BEAR, inv 9.44), RXRX (3.465 on Oct 16 through 3.70, BULL → BEAR, inv 3.90), QSI (1.12 on Oct 16 through 1.22, BULL → BEAR, inv 1.22 from below); PBLS rewritten (post-IPO low lost on Oct 16 at 22.75, +11% reversal bar on Oct 19 on 1.85× volume, inv 29.8 → 29.2), NGEN (second close under 1.565 — new 52-week low 1.54), NAUT (+28% to 2.63 out of the 2.05–2.25 box, inv 1.57 → 2.05, path 2.95/3.4/3.95); CAI, HIMS, INKT no material change. Board prices/mcaps at Oct 19 close; NAUT now above QSI by mcap' },
  { d: '2026-10-20', cat: 'charting', h: 0.5, note: 'Daily TA refresh (closes through Oct 20): no invalidation fired; four reads rewritten — TEM (oversold bounce to 66.75 stopped 1 under the lost EMA50, RSI back over 30 — the sell zone, bias BEAR, inv 71.2), IBRX (bounce to 8.77 = the EMA50 to the cent, the reduce zone; engine structure flipped back to BULL off 6.95, editor stays BEAR, inv 9.44), PBLS (second green day +6.8% to 27.08 on 1.35× volume, RSI back over 30, 0.40 under the 27.48 exit window; inv 29.2 → 29.0 EMA20), INKT (+1M 9.5 printed at 9.41 on Oct 16 — new 90-day low — then a two-day bounce to 9.86 on a third of average volume; +1M → 9.4); CAI, HIMS, RXRX, NGEN, NAUT, QSI no material change. Board prices/mcaps at Oct 20 close' },
  { d: '2026-10-02', cat: 'fuentes', h: 0.5, note: 'Linares X post: QSI reads the letters, NAUT keeps the whole molecule — complementary READ pair → cards in both dossiers, QSI price to Oct 1 close' },
  { d: '2026-09-23', cat: 'noticias', h: 9, est: true, note: 'Continuous tracking Jun–Sep (~40 min / week × 14 weeks): podcasts, news, threads' },
];
