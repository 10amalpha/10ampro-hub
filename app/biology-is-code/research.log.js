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
  { d: '2026-09-23', cat: 'noticias', h: 9, est: true, note: 'Continuous tracking Jun–Sep (~40 min / week × 14 weeks): podcasts, news, threads' },
];
