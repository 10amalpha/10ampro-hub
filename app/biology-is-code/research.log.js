// Research-hours ledger for /biology-is-code. The counter at the top of the page sums this file.
// Rule: no shares bought until GOAL hours of documented research.
// est: true = retroactive estimate (reconstructed 23 Sep 2026 from project history); new entries are logged as they happen.
// To add hours: append { d: 'YYYY-MM-DD', cat, h, note }.
// STANDING RULE: every work session on Biology is Code logs its hours here in the same push, unasked.
// h = the session's real working time (research + review), rounded to 0.5; one entry per category touched.
// Hours Hernán reports himself (podcasts, reading, charting outside chat) are added as he says them.
export const GOAL = 100;

export const CATS = {
  fuentes: { label: 'Podcasts y fuentes', color: '#8b5cf6' },
  tesis: { label: 'Tesis y framework', color: '#D4A843' },
  earnings: { label: 'Earnings y filings', color: '#378ADD' },
  modelo: { label: 'Modelado financiero', color: '#85B7EB' },
  charting: { label: 'Charting / TA', color: '#22c55e' },
  noticias: { label: 'Seguimiento de noticias', color: '#f59e0b' },
};

export const LOG = [
  { d: '2026-06-12', cat: 'fuentes', h: 6, est: true, note: 'Podcast fuente + síntesis del deck "The Next Computing Supercycle Runs on Human Biology"' },
  { d: '2026-06-17', cat: 'tesis', h: 6, est: true, note: 'Primera tesis: 5 tickers, cadena READ → MODEL → REBOOT → EXECUTE, market caps e income statements FY22–25' },
  { d: '2026-08-17', cat: 'tesis', h: 8, est: true, note: 'Bio-OS Read · Orchestrate · Write, Healthspan per Token, stack proteómico; screening y alta de HIMS, CAI, PBLS, NGEN' },
  { d: '2026-08-17', cat: 'modelo', h: 3, est: true, note: 'Income statements de los 4 tickers nuevos' },
  { d: '2026-08-18', cat: 'earnings', h: 3, est: true, note: 'HIMS Q2 FY26: deck del inversionista + call' },
  { d: '2026-08-18', cat: 'earnings', h: 10, est: true, note: 'Q2 FY26 de los otros 8 tickers: press releases, 8-K / 10-Q' },
  { d: '2026-08-18', cat: 'modelo', h: 3, est: true, note: 'FCF por acción, 6 trimestres (HIMS desde la reconciliación oficial)' },
  { d: '2026-09-06', cat: 'noticias', h: 5, est: true, note: 'Snapshot 4 Sep: FTC / Visa en HIMS, Merck–Moderna en TEM, Nature Methods en NAUT' },
  { d: '2026-09-15', cat: 'modelo', h: 4, est: true, note: 'Ingresos trimestrales Q1’25–Q2’26 y % de guía ejecutada' },
  { d: '2026-09-23', cat: 'charting', h: 6, est: true, note: '9 charts: régimen, estructura, niveles, paths 1M / 3M / 1Y con invalidación' },
  { d: '2026-09-23', cat: 'noticias', h: 9, est: true, note: 'Seguimiento continuo jun–sep (~40 min / semana × 14 semanas): podcasts, noticias, hilos' },
];
