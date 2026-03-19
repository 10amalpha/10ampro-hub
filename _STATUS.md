# 10AMPRO Hub — _STATUS.md
**Last updated:** March 19, 2026
**Live URL:** https://10ampro-hub.vercel.app
**Repo:** 10amalpha/10ampro-hub
**Vercel Project ID:** prj_lKkui80lHh4x3Fietp6nC4CRfupB

---

## Architecture

- **Framework:** Next.js 14.0.4 (App Router)
- **page.jsx** — Server component, fetches Yahoo/CoinGecko directly + calls `/api/briefing` for FRED data. `force-dynamic` with ISR revalidate 300s.
- **HubClient.jsx** — Client component (`'use client'`), receives all data as props, handles interactivity (watchlist filters, comment expand/collapse, responsive breakpoints).
- **API Routes** (all `force-dynamic`):
  - `/api/briefing` — FRED (WALCL, WDTGAL, RRPONTSYD, WRESBAL, M2SL, MYAGM2CNM189N) + Yahoo Finance + CoinGecko + Finnhub calendar + Finnhub earnings
  - `/api/watchlist` — Yahoo Finance stocks + CoinGecko crypto + USD/COP
  - `/api/debug` — Shows env var status (can delete later)

## Env Variables (Vercel)

| Variable | Status |
|---|---|
| `FRED_API_KEY` | ✅ Set (was `Fred_api_key` — case-sensitive fix applied Mar 19) |
| `FINNHUB_API_KEY` | ✅ Set |

## Section Status (top to bottom, per v5p design)

### 1. HEADER ✅ COMPLETE
- Logo (`/logo.jpg`) + 10AMPRO brand (Space Grotesk) + "MORNING INTELLIGENCE TERMINAL" subtitle
- Date/time in COT timezone + ISR 5min badge
- **Do NOT change** — this is the standard header

### 2. SIGNAL + MACRO BAR ✅ COMPLETE — LIVE DATA
**MKT Row (6 cells) — Yahoo Finance, refreshes 5 min:**
- S&P 500 (`^GSPC`), VIX (`^VIX`, turns red >25), DXY (`DX-Y.NYB`), WTI (`CL=F`), USD/JPY (`JPY=X`), USD/COP (`COP=X`)

**LIQ Row (5 cells):**
- NET LIQ — FRED via `/api/briefing` (WALCL−TGA−RRP), updates weekly Wed
- US M2 — FRED `M2SL` (billions → displayed as trillions), updates monthly
- CN M2 — FRED `MYAGM2CNM189N` (yuan → divided by 1T, displayed as ¥194T), updates monthly
- US 10Y — Yahoo `^TNX`, refreshes 5 min
- US 2Y — Yahoo `^IRX`, refreshes 5 min

**Signal Logic:**
- RISK ON/MIXED/RISK OFF: VIX level + DXY % change + S&P % change (score-based)
- EXPANDING/NEUTRAL/TIGHTENING: US 10Y yield (<4.0% expanding, >4.5% tightening)

**Layout:** Both rows use CSS grid (MKT=6col, LIQ=5col). Signal boxes fixed `width: 120px`, MKT/LIQ vertical labels fixed `width: 20px`. Both aligned.

### 3. CALENDAR 🔶 LAYOUT DONE — DATA PARTIAL
- HOY/MAÑANA split working
- Data comes from `/api/briefing` → Finnhub economic calendar
- Currently shows "Sin eventos de alto impacto hoy" — Finnhub only returns high-impact US events, may be empty on quiet days
- **TODO:** Verify Finnhub returns low-impact events too (briefing route filters `impact === 3` only). Need to also return impact 1-2 for the "low impact" section below the separator in HOY.

### 4. WATCHLIST 🔶 LAYOUT DONE — DATA LIVE
- 21-ticker Bloomberg grid: 15 stocks (Yahoo) + 6 crypto (CoinGecko)
- Stocks: PLTR, HOOD, TSLA, HIMS, QSI, DUOL, STKE, MP, OKLO, AMD, NVDA, MSTR, BE, IBIT, DNA
- Crypto: BTC, SOL, SUI, ETH, JUP, NOS
- 7-col desktop / 3-col mobile grid
- Green/red cell backgrounds by % magnitude
- ALL/STK/CRY filters working
- 💬 comment dots + expandable comment cards working
- Movers summary line (top 3 by magnitude) working
- **Comments are hardcoded** in page.jsx (PLTR, TSLA, STKE, BE). TODO: move to CMS/Supabase.

### 5. INFO DIET + EARNINGS RADAR 🔶 LAYOUT DONE — DATA MIXED
**Info Diet (left column):**
- Layout matches v5p: thumbnail (source initials in brand color), title, source, who shared, time ago, tag
- **Data is hardcoded** (5 placeholder articles). TODO: wire to info-diet.vercel.app data source or Supabase.
- No exit links (hub is the anchor) ✅

**Earnings Radar (right column):**
- NEXT UP highlighted with purple badge ✅
- Compact list with emoji + ticker + name + date + days countdown ✅
- **Data is LIVE from Finnhub** via `/api/briefing` → earnings calendar
- No exit links ✅

### 6. EDITORIAL INSIGHTS 🔶 LAYOUT DONE — DATA HARDCODED
- 6 mini-explainers with colored tags (MACRO, TSLA, RISK, LIQ, BE, COP)
- Left border colored by tag ✅
- Plus Jakarta Sans editorial text ✅
- Optional 📎 Substack deep dive links ✅
- CTA "Más análisis y deep dives en 10am.pro →" ✅
- **All content is hardcoded** in page.jsx. TODO: move to CMS (Supabase table or Google Doc).

### 7. FOOTER ✅ COMPLETE
- Substack + @holdmybirra + Cerebro links
- No exit links except those three ✅

---

## Data Flow Summary

```
page.jsx (Server Component, force-dynamic)
├── fetchYahoo() — direct, crumb-based auth
│   ├── Macro: ^GSPC, ^VIX, DX-Y.NYB, CL=F, JPY=X, COP=X, ^TNX, ^IRX
│   └── Watchlist: PLTR, HOOD, TSLA, ... (15 stocks)
├── fetchCrypto() — CoinGecko direct
│   └── BTC, SOL, SUI, ETH, JUP, NOS
├── fetchBriefing() — calls /api/briefing internally
│   ├── FRED: WALCL, WDTGAL, RRPONTSYD, WRESBAL, M2SL, MYAGM2CNM189N
│   ├── Finnhub: economic calendar (US events, 3 days)
│   └── Finnhub: earnings (14 tickers, 90-day window)
└── Passes all data as props to HubClient.jsx
```

## Key Lessons Learned (for next sessions)

1. **Env vars are case-sensitive** on Vercel. `Fred_api_key` ≠ `FRED_API_KEY`.
2. **Static pages can't read env vars at runtime.** Must use `export const dynamic = 'force-dynamic'` on both page and API routes.
3. **Yahoo Finance v7 API requires crumb auth.** The `getYahooCrumb()` function in page.jsx handles cookie → crumb → authenticated fetch.
4. **FRED series units:** WALCL, WDTGAL, RRPONTSYD are all in **millions USD**. M2SL is in **billions USD**. MYAGM2CNM189N (CN M2) is in **yuan** (divide by 1e12 for trillions).
5. **Don't change the header.** Logo + brand + subtitle + date/COT + ISR badge is the standard.
6. **Work in chunks.** Complete one section fully before moving to next.
7. **`/api/debug` route exists** — hit it to verify env vars. Delete when no longer needed.

## Next Steps (priority order)

1. **Calendar:** Fix Finnhub to return all impact levels, split high/low in HOY
2. **Watchlist comments:** Move from hardcoded to Supabase or editable JSON
3. **Info Diet:** Wire to actual data source (check info-diet repo for how data is stored)
4. **Editorial Insights:** Decide CMS approach (Supabase table vs Google Doc)
5. **Delete `/api/debug`** route once stable
6. **Mobile testing** — verify 700px breakpoint on all sections
7. **Clean up dead code** — `fetchCalendar()` and `fetchEarnings()` functions in page.jsx are unused (data comes from briefing now)
