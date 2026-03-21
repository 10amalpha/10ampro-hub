# 10AMPRO Hub — _STATUS.md
**Last updated:** March 21, 2026 (session 5)
**Live URL:** https://10ampro-hub.vercel.app
**Repo:** 10amalpha/10ampro-hub
**Vercel Project ID:** prj_lKkui80lHh4x3Fietp6nC4CRfupB

---

## Architecture

- **Framework:** Next.js 14.0.4 (App Router)
- **page.jsx** — Server component, fetches Yahoo/CoinGecko directly + calls `/api/briefing` for FRED + FMP data + fetches Supabase for Info Diet + calls `getInsights()` from shared lib. `force-dynamic` with ISR revalidate 300s.
- **HubClient.jsx** — Client component (`'use client'`), receives all data as props, handles interactivity (watchlist filters, comment expand/collapse, responsive breakpoints).
- **app/lib/insights.js** — Shared module for AI insight generation. Called directly by `page.jsx` (avoids self-fetch deadlock). Has its own 8h in-memory cache — does NOT call Anthropic on every ISR render.
- **API Routes** (all `force-dynamic`):
  - `/api/briefing` — FRED (6 series) + FMP economic calendar + FMP earnings per-ticker
  - `/api/insights` — External access to AI-generated insights (reuses `lib/insights.js`)
  - `/api/watchlist` — Legacy, not used by page. Can delete.
  - `/api/debug` — Shows env var status. Can delete when stable.

## Env Variables (Vercel)

| Variable | Status | Used by |
|---|---|---|
| `FRED_API_KEY` | ✅ Set | NET LIQ, US M2, CN M2 |
| `FMP_API_KEY` | ✅ Set (paid plan, annual) | Economic calendar + Earnings Radar |
| `ANTHROPIC_API_KEY` | ✅ Set (key name: Briefing10am) | AI Editorial Insights generation |
| `FINNHUB_API_KEY` | ⚠️ No longer needed | Can be removed from Vercel |

## Section Status

### 1. HEADER ✅ COMPLETE
- Logo + 10AMPRO brand + "BRIEFING DIARIO" subtitle (gold sutil `rgba(212,168,67,0.4)`) + date/COT + ISR 5min
- All text grays bumped to `#9ca3af` for readability
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
- **Smart filtering:** 3-tier relevance system in `page.jsx`
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
- Fetches last **7 items** via Supabase REST API, 5 min ISR
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
- Finnhub dependency fully removed

### 6. EDITORIAL INSIGHTS ✅ COMPLETE — AI-GENERATED (Anthropic API + RSS)
- **Module:** `app/lib/insights.js` — shared logic, imported directly by `page.jsx`
- **Flow:** Fetch 10am.pro RSS (via rss2json.com) → fetch market snapshot (Yahoo + CoinGecko) → call Anthropic Claude Sonnet → return 6 insights
- **Model:** `claude-sonnet-4-20250514`
- **Voice:** 10AMPRO / Hernán / Búnker tone — direct, opinionated, tactical, never generic
- **Link rule:** Exactly 2 of 6 insights (30%) link to real Substack articles from RSS. Other 4 are pure tactical value.
- **Content rule:** Each insight must contain tactical info — price levels, frameworks, data, non-obvious connections. Zero filler.
- **RSS source:** `https://www.10am.pro/feed` — auto-updates when new articles are published on Substack
- **Cache:** 8h in-memory cache inside `getInsights()`. Does NOT call Anthropic on every ISR render. ~3 calls/day, estimated ~$1.80/month.
- **Fallback:** Static 6-insight array if API key missing, credits exhausted, or generation fails
- **Error logging:** HTTP status mapped to human-readable cause (402=credits, 401=key, 429=rate limit)
- **Env var:** `ANTHROPIC_API_KEY` (Vercel, All Environments, key name: Briefing10am)
- **CRITICAL:** `process.env.ANTHROPIC_API_KEY` must be read inside the function, NOT at module scope. Module-scope reads fail during SSR import.
- **CRITICAL:** `page.jsx` calls `getInsights()` directly via import — NOT via HTTP self-fetch. Self-fetch causes deadlock.

### 7. PWA ✅ COMPLETE
- `public/manifest.json` — `display: standalone`, `short_name: "10AMPRO"`, dark bg `#0c0c0e`
- `public/apple-touch-icon.png` (180x180) — logo on dark bg, no white borders
- `public/icon-192x192.png`, `public/icon-512x512.png` — PWA icons
- `layout.js` has `<link rel="apple-touch-icon">` + `<link rel="manifest">`

### 8. FOOTER ✅ COMPLETE
- Links: Substack + @holdmybirra (Cerebro link removed — paid-only product)

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
| Info Diet (7 items) | Supabase `feed_items` | 5 min | When items added via info-diet app |
| Editorial Insights (6) | Anthropic API + RSS + Yahoo + CoinGecko | 8h in-memory cache | ~3x daily |

## Key Lessons Learned

1. **Env vars are case-sensitive** on Vercel. `Fred_api_key` ≠ `FRED_API_KEY`.
2. **Static pages can't read env vars at runtime.** Use `export const dynamic = 'force-dynamic'`.
3. **Yahoo v7 requires crumb auth.** `getYahooCrumb()` handles cookie→crumb flow.
4. **FRED units:** WALCL/WDTGAL/RRPONTSYD = millions. M2SL = billions. CN M2 = yuan (÷1e12).
5. **Don't change the header.**
6. **Work in chunks.** One section at a time.
7. **FMP v3 endpoints are legacy** (blocked for new accounts after Aug 2025). Use `/stable/` prefix.
8. **2Z token** uses CoinGecko contract address endpoint, not standard ID lookup.
9. **Supabase anon key** — copy exact from source repo. One-char typo in JWT signature breaks silently.
10. **Info Diet badges** — use category-based emoji not source-domain abbreviations. 42px box, 22px emoji.
11. **FMP earnings-calendar vs earnings:** Use `/stable/earnings?symbol=X` per-ticker for complete coverage.
12. **FMP AMC/BMO field** — `time` field often null 30+ days out. Shows "amc"/"bmo" closer to the event.
13. **Never self-fetch from server components.** Use direct import of shared module instead.
14. **Substack RSS** is publicly available at `{domain}/feed`. Use rss2json.com as proxy for JSON conversion.
15. **Anthropic API in serverless:** First call ~8-12s. Subsequent ISR-cached pages are instant.
16. **Read env vars inside functions, not module scope.** Module-scope `const X = process.env.X` can be undefined during SSR import on Vercel.
17. **ISR revalidate ≠ API cache.** page.jsx ISR=300s causes re-render every 5min. If getInsights() has no internal cache, it calls Anthropic ~288 times/day ($5.76/day). Always add in-memory cache for expensive API calls.
18. **Check Anthropic credits before debugging code.** 402 errors from Anthropic mean insufficient credits, not a code bug. The error logging now distinguishes: 402=credits, 401=key, 429=rate limit.
19. **Gray readability:** `#71717a` is too dark on `#0c0c0e` background. Use `#9ca3af` minimum for secondary text.

## Next Steps (priority order)

1. **Performance tuning:** Pass market data from page.jsx to getInsights() instead of re-fetching. Move `/api/briefing` logic to shared module (eliminate self-fetch).
2. **Watchlist comments:** Move from hardcoded to Supabase or editable JSON
3. **Remove `FINNHUB_API_KEY`** from Vercel env vars (no longer used)
4. **Delete `/api/debug`** route once stable
5. **Delete `/api/watchlist`** route (legacy, page fetches Yahoo/CoinGecko directly)
6. **Monitor Anthropic costs** — should be ~$1.80/month with 8h cache. If higher, check cache is working.
