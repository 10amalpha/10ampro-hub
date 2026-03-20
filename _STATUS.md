# 10AMPRO Hub — _STATUS.md
**Last updated:** March 20, 2026 (session 3)
**Live URL:** https://10ampro-hub.vercel.app
**Repo:** 10amalpha/10ampro-hub
**Vercel Project ID:** prj_lKkui80lHh4x3Fietp6nC4CRfupB

---

## Architecture

- **Framework:** Next.js 14.0.4 (App Router)
- **page.jsx** — Server component, fetches Yahoo/CoinGecko directly + calls `/api/briefing` for FRED + FMP data + fetches Supabase for Info Diet. `force-dynamic` with ISR revalidate 300s.
- **HubClient.jsx** — Client component (`'use client'`), receives all data as props, handles interactivity (watchlist filters, comment expand/collapse, responsive breakpoints).
- **API Routes** (all `force-dynamic`):
  - `/api/briefing` — FRED (6 series) + FMP economic calendar + FMP earnings per-ticker
  - `/api/watchlist` — Yahoo Finance stocks + CoinGecko crypto + USD/COP (legacy, not used by page)
  - `/api/debug` — Shows env var status (can delete when stable)

## Env Variables (Vercel)

| Variable | Status | Used by |
|---|---|---|
| `FRED_API_KEY` | ✅ Set | NET LIQ, US M2, CN M2 |
| `FMP_API_KEY` | ✅ Set (paid plan, annual) | Economic calendar + Earnings Radar |
| `FINNHUB_API_KEY` | ⚠️ No longer needed | Can be removed from Vercel |

## Section Status

### 1. HEADER ✅ COMPLETE
- Logo + 10AMPRO brand + "BRIEFING DIARIO" subtitle (gold sutil `rgba(212,168,67,0.4)`) + date/COT + ISR 5min
- All text grays bumped to `#71717a` for readability (PRO brand color `#3F3F46` preserved)
- **Do NOT change**

### 2. SIGNAL + MACRO BAR ✅ COMPLETE — LIVE DATA
**MKT Row (6 cells) — Yahoo Finance, 5 min refresh:**
- S&P 500, VIX (red >25), DXY, WTI, USD/JPY, USD/COP

**LIQ Row (5 cells):**
- NET LIQ — FRED (WALCL−TGA−RRP), weekly Wed
- US M2 — FRED M2SL, monthly
- CN M2 — FRED MYAGM2CNM189N (yuan ÷ 1e12), monthly
- US 10Y, US 2Y — Yahoo, 5 min

**Signals:** RISK ON/MIXED/RISK OFF + EXPANDING/NEUTRAL/TIGHTENING
**Layout:** MKT=6col grid, LIQ=5col grid, signal boxes 120px, labels 20px, aligned.

### 3. CALENDAR ✅ COMPLETE — LIVE DATA (FMP) + SMART FILTER
- **Source:** Financial Modeling Prep (FMP) stable endpoint `/stable/economic-calendar`
- **Refresh:** Every 1 hour (FMP updates every 15 min on their side)
- HOY split into high-impact (blue times, red dots, blue bg) + low-impact (muted, below separator)
- MAÑANA shows next-day US events with yellow times (filtered)
- Times converted to ET timezone
- Estimates + previous values displayed
- US events only (filtered by `country === 'US'` or `currency === 'USD'`)
- **Smart filtering (Mar 20):** 3-tier relevance system in `page.jsx`
  - **Blocked:** CFTC speculative positions, Bill/Bond/Note/TIPS/FRN Auctions
  - **Tier 1 (always show):** Fed/FOMC, NFP, Jobless Claims, CPI/PPI/PCE, GDP, Retail Sales, ISM, Consumer Confidence, Michigan, Home Sales, Balance of Trade, Powell
  - **Tier 2 (context):** Mortgage Rates, Wholesale, EIA, Housing Starts, Building Permits, Durable Goods, Industrial Production, Fed Balance Sheet
  - **HOY minimum: 5 events guaranteed** — if tiers 1+2 < 5, pulls from remaining non-blocked events
  - **MAÑANA: no minimum** — just removes blocked noise

### 4. WATCHLIST ✅ COMPLETE — LIVE DATA (30 tickers)
**Stocks (15) — Yahoo Finance, 5 min refresh:**
PLTR, HOOD, TSLA, HIMS, QSI, DUOL, STKE, MP, OKLO, AMD, NVDA, MSTR, BE, IBIT, STRC

**Crypto (15) — CoinGecko, 2 min refresh:**
BTC, SOL, SUI, ETH, JUP, NOS, JTO, SHDW, 2Z, MET, HNT, ZEC, JITOSOL, XRP, JLP

**2Z** fetched via Solana contract address: `J6pQQ3FAcJQeWPPGppWRb4nM8jU3wLyYbRrLh7feMfvd`

**CoinGecko ID Map:**
```
BTC: bitcoin, SOL: solana, SUI: sui, ETH: ethereum,
JUP: jupiter-exchange-solana, NOS: nosana,
JTO: jito-governance-token, SHDW: genesysgo-shadow,
2Z: 2z-protocol (contract addr), MET: metaplex,
HNT: helium, ZEC: zcash, JITOSOL: jito-staked-sol,
XRP: ripple, JLP: jupiter-perpetuals-liquidity-provider-token
```

**Features:** 7→3 col responsive, green/red bg by magnitude, ALL/STK/CRY filters, 💬 comments (hardcoded), movers line.

### 5. INFO DIET + EARNINGS RADAR ✅ BOTH LIVE

**Info Diet:** ✅ LIVE from Supabase `feed_items` table (same source as info-diet.vercel.app).
- Fetches last 5 items via Supabase REST API, 5 min ISR
- Source name auto-extracted from URL domain
- **Badge = category emoji** (⚡Tech, 📈Markets, ₿Crypto, 📊Macro, 🤖AI, 🌍Geopolitics, 📡 fallback). 42px box, 22px emoji.
- "ago" calculated from timestamp `id`
- Fields used: `id`, `take` (title), `content` (URL), `category` (tag), `type`
- No `who` field in Supabase — author line removed, shows `Source · Xh`
- Subtitle: "Lo que estamos compartiendo en el chat de 10am.pro"
- Supabase anon key shared with info-diet app

**Earnings Radar:** ✅ LIVE from FMP (migrated from Finnhub Mar 20).
- **Per-ticker approach:** `/stable/earnings?symbol=X` for each of 13 watchlist stocks
- Parallel `Promise.all` fetch, 6-hour ISR cache
- Shows: emoji, ticker, name, **EPS estimate** (`EPS est: $X.XX`), **AMC/BMO badge** (when available), date, days countdown, NEXT UP badge
- FMP `time` field: `"amc"` → AMC, `"bmo"` → BMO, null → hidden (normal for dates 30+ days out)
- Sorted by nearest date, first item gets NEXT UP badge
- Tickers: PLTR, HOOD, TSLA, STKE, QSI, MP, HIMS, OKLO, AMD, NVDA, DUOL, MSTR, BE (no IBIT/STRC — ETFs/no earnings)
- Finnhub dependency fully removed (dead code cleaned from page.jsx + route.js)
- **Debug log active:** `Earnings ${ticker}: date=... time=... eps=... keys=...` — remove once AMC/BMO confirmed working

### 6. EDITORIAL INSIGHTS 🔶 LAYOUT DONE — DATA HARDCODED
6 mini-explainers, colored tags, Substack links. TODO: CMS.

### 7. FOOTER ✅ COMPLETE

---

## Data Refresh Rates

| Data | Source | Refresh | Updates when |
|---|---|---|---|
| MKT row (S&P, VIX, DXY, WTI, JPY, COP) | Yahoo | 5 min | Market hours Mon-Fri |
| US 10Y, US 2Y | Yahoo | 5 min | Market hours |
| NET LIQ | FRED | 1 hour | Wednesdays (weekly) |
| US M2 | FRED M2SL | 1 hour | ~4th Tuesday monthly |
| CN M2 | FRED MYAGM2CNM189N | 1 hour | Monthly (IMF, ~2mo lag) |
| Calendar (HOY/MAÑANA) | FMP | 1 hour | Continuous (FMP updates 15 min) |
| Watchlist stocks (15) | Yahoo | 5 min | Market hours Mon-Fri |
| Watchlist crypto (15) | CoinGecko | 2 min | 24/7 |
| Earnings (13 tickers) | FMP `/stable/earnings` per-ticker | 6 hours | As companies announce |
| Info Diet (5 items) | Supabase `feed_items` | 5 min | When items added via info-diet app |

## Key Lessons Learned

1. **Env vars are case-sensitive** on Vercel. `Fred_api_key` ≠ `FRED_API_KEY`.
2. **Static pages can't read env vars at runtime.** Use `export const dynamic = 'force-dynamic'`.
3. **Yahoo v7 requires crumb auth.** `getYahooCrumb()` handles cookie→crumb flow.
4. **FRED units:** WALCL/WDTGAL/RRPONTSYD = millions. M2SL = billions. CN M2 = yuan (÷1e12).
5. **Don't change the header.**
6. **Work in chunks.** One section at a time.
7. **FMP v3 endpoints are legacy** (blocked for new accounts after Aug 2025). Use `/stable/` prefix.
8. **2Z token** uses CoinGecko contract address endpoint, not standard ID lookup.
9. **Supabase anon key** — copy exact from source repo. One-char typo in JWT signature breaks silently (returns empty array, no error).
10. **Info Diet badges** — use category-based emoji not source-domain abbreviations. 42px box, 22px emoji.
11. **FMP earnings-calendar vs earnings:** The general `/stable/earnings-calendar?from=X&to=Y` returns bulk data but may miss tickers without confirmed dates. Use `/stable/earnings?symbol=X` per-ticker for complete coverage.
12. **FMP AMC/BMO field** — `time` field on earnings is often null 30+ days out. Only shows "amc"/"bmo" closer to the event. Code handles gracefully with conditional render.

## Next Steps (priority order)

1. **Watchlist comments:** Move from hardcoded to Supabase or editable JSON
2. **Editorial Insights:** Decide CMS approach (Supabase table vs Google Doc)
3. **Remove `FINNHUB_API_KEY`** from Vercel env vars (no longer used)
4. **Remove earnings debug log** once AMC/BMO confirmed working
5. **Delete `/api/debug`** route once stable
6. **Mobile testing** — verify 700px breakpoint on all sections
