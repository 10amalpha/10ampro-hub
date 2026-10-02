// Date stamps for TA charts — same format as biology-is-code (BioTA.jsx): data through / chart built / editor read.
// Plus: the close on the editor's read date and the move since, so a path drawn weeks ago reads correctly against today's price.
const DAY = 86400000;
export const fmtD = (x) => { const dt = x == null ? null : new Date(typeof x === 'number' && x < 1e12 ? x * 1000 : x); return dt && !isNaN(dt) ? dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }) : '—'; };
// Parses the editor's 'DD Mon YYYY' date (Spanish or English month abbreviations) to a UTC timestamp.
export function parseReadDate(s) {
  if (!s) return null; const m = String(s).trim().match(/^(\d{1,2})\s+([A-Za-zñ]{3,5})\.?\s+(\d{4})$/); if (!m) return null;
  const MON = { ene: 0, jan: 0, feb: 1, mar: 2, abr: 3, apr: 3, may: 4, jun: 5, jul: 6, ago: 7, aug: 7, sep: 8, set: 8, oct: 9, nov: 10, dic: 11, dec: 11 };
  const k = m[2].toLowerCase().slice(0, 3); if (!(k in MON)) return null; return Date.UTC(+m[3], MON[k], +m[1]);
}
// Close of the read day: the daily point at (readDate + 1d) 00:00 UTC, else the nearest point within 2 days.
export function closeOnRead(series, readTs) {
  if (!series?.t?.length || readTs == null) return null;
  const want = readTs + DAY; let best = null, bd = Infinity;
  series.t.forEach((t, i) => { const dd = Math.abs(t - want); if (dd < bd) { bd = dd; best = series.c[i]; } });
  return bd <= 2 * DAY ? best : null;
}
// Everything the stamp line needs. `updated` is the editor's read date string (TOKEN.ta.updated / TA.reviewed).
export function taStamps(series, updated, livePrice) {
  const t = series?.t || []; const n = t.length;
  let lastClose = null; for (let i = n - 1; i >= 0; i--) { if (t[i] % DAY === 0) { lastClose = t[i]; break; } }
  const dataThrough = fmtD(lastClose ?? (n ? t[n - 1] : null)), builtOn = fmtD(Date.now());
  const readTs = parseReadDate(updated); const atRead = closeOnRead(series, readTs);
  const sinceRead = atRead && livePrice ? livePrice / atRead - 1 : null;
  const daysAgo = readTs != null ? Math.max(0, Math.round((Date.now() - readTs) / DAY)) : null;
  return { dataThrough, builtOn, readTs, atRead, sinceRead, daysAgo };
}
