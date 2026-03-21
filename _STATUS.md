# 10AMPRO Hub — _STATUS.md
**Last updated:** March 21, 2026 (session 6)
**Live URL:** https://10ampro-hub.vercel.app
**Repo:** 10amalpha/10ampro-hub
**Vercel Project ID:** prj_lKkui80lHh4x3Fietp6nC4CRfupB

---

## Architecture

- **Framework:** Next.js 14.0.4 (App Router)
- **page.jsx** — Server component. Phase 1: parallel fetch Yahoo/CoinGecko/FRED/FMP/Supabase. Phase 2: pass market data to `getInsights()`. `force-dynamic`, ISR 300s.
- **HubClient.jsx** — Client component (`'use client'`), receives all data as props.
- **app/lib/insights.js** — AI insight generation. 8h in-memory cache. Called directly by page.jsx.
- **app/lib/briefing.js** — FRED + FMP data. Called directly by page.jsx (no self-fetch).
- **API Routes:**
  - `/api/briefing` — External access to briefing data (reuses `lib/briefing.js`)
  - `/api/insights` — External access to AI insights (reuses `lib/insights.js`)
  - `/api/og` — Dynamic OG image for social sharing (🔶 WIP — rendering issue)

## Env Variables (Vercel)

| Variable | Status | Used by |
|---|---|---|
| `FRED_API_KEY` | ✅ Set | NET LIQ, US M2, CN M2 |
| `FMP_API_KEY` | ✅ Set (paid plan, annual) | Economic calendar + Earnings Radar |
| `ANTHROPIC_API_KEY` | ✅ Set (key name: Briefing10am) | AI Editorial Insights |
| `FINNHUB_API_KEY` | ⚠️ No longer needed | Can be removed |

## Section Status

### 1. HEADER ✅ COMPLETE
- Logo + 10AMPRO brand + "BRIEFING DIARIO" subtitle + date/COT + ISR 5min
- Grays: `#9ca3af` for readability. **Do NOT change.**

### 2. SIGNAL + MACRO BAR ✅ COMPLETE — LIVE DATA
**MKT Row (6 cells):** S&P 500, VIX (red >25), DXY, WTI, USD/JPY, USD/COP
**LIQ Row (6 cells):** NET LIQ, US M2, CN M2, US 10Y, US 2Y, **MOVE** (red >100, yellow ≤100)
**Signals:** RISK ON/MIXED/RISK OFF + EXPANDING/NEUTRAL/TIGHTENING

### 3. CALENDAR ✅ COMPLETE — LIVE DATA (FMP) + SMART FILTER
- 3-tier relevance: Blocked → Tier 1 (market-moving) → Tier 2 (context)
- HOY: min 5 events. MAÑANA: no minimum.

### 4. WATCHLIST ✅ COMPLETE — LIVE DATA (30 tickers)
- Stocks (15): PLTR, HOOD, TSLA, HIMS, QSI, DUOL, STKE, MP, OKLO, AMD, NVDA, MSTR, BE, IBIT, STRC
- Crypto (15): BTC, SOL, SUI, ETH, JUP, NOS, JTO, SHDW, 2Z, MET, HNT, ZEC, JITOSOL, XRP, JLP

### 5. INFO DIET + EARNINGS RADAR ✅ BOTH LIVE
- **Info Diet:** 7 items from Supabase `feed_items`, 5 min ISR
- **Earnings:** 13 tickers from FMP per-ticker, 6h ISR

### 6. EDITORIAL INSIGHTS ✅ COMPLETE — AI-GENERATED
- **Module:** `app/lib/insights.js` with 8h in-memory cache
- **Model:** claude-sonnet-4-20250514
- **Flow:** page.jsx passes market data → getInsights() fetches RSS only → calls Anthropic → returns 6 insights
- **Link rule:** Exactly 2/6 with Substack links (30%). Other 4 pure value.
- **MOVE Index** included in prompt context with framework: <80 calm, 80-100 tension, >100 bond stress, >120 crisis
- **Cost:** ~$1.80/month (3 calls/day × $0.02)
- **CRITICAL:** `process.env.ANTHROPIC_API_KEY` read inside function, not module scope.

### 7. PWA ✅ COMPLETE
- `manifest.json`, `apple-touch-icon.png`, `icon-192x192.png`, `icon-512x512.png`
- `display: standalone`, `short_name: "10AMPRO"`, dark bg

### 8. OG IMAGE 🔶 WIP
- `/api/og` route created with dynamic market data card
- Node.js runtime, fetches Yahoo + CoinGecko, renders 1200x630 PNG
- **Issue:** Image renders blank in browser. Needs debugging — possibly Satori JSX constraints or fetch timing.
- `og:image` + `twitter:card` meta tags already in layout.js pointing to `/api/og`

### 9. FOOTER ✅ COMPLETE
- Substack + @holdmybirra (Cerebro removed — paid-only)

---

## Performance (Session 6 Tuning)

### HTTP Calls per Render
**Before tuning:** ~35 calls (many redundant)
**After tuning:** ~27 calls

| Fix | What | Calls saved |
|---|---|---|
| #1 Pass market data to insights | Eliminated duplicate Yahoo+CoinGecko in lib/insights.js | -3 |
| #2 Direct import briefing | Eliminated self-fetch + duplicate Yahoo+CoinGecko in /api/briefing | -3 |
| #3 Yahoo crumb cache (30min) | Second fetchYahoo() reuses crumb from first | -2 |
| Cleanup | Deleted /api/watchlist, /api/debug, slimmed /api/briefing | -348 lines |

### Caching Strategy
| Data | Cache | Refresh |
|---|---|---|
| Yahoo crumb | In-memory 30min | Auth token reuse |
| Market data (page ISR) | Vercel ISR 5min | Every visitor after 5min |
| FRED data | Next.js fetch cache 1h | Weekly/monthly FRED updates |
| FMP calendar | Next.js fetch cache 1h | Continuous |
| FMP earnings | Next.js fetch cache 6h | As companies announce |
| Info Diet | Next.js fetch cache 5min | When items added in Supabase |
| AI Insights | In-memory 8h | ~3 calls/day to Anthropic |

---

## Key Lessons Learned

1. **Env vars case-sensitive** on Vercel.
2. **`force-dynamic`** required for runtime env var access.
3. **Yahoo v7 requires crumb auth.** Cache the crumb.
4. **FRED units:** WALCL/WDTGAL/RRPONTSYD = millions. M2SL = billions. CN M2 = yuan (÷1e12).
5. **Don't change the header.**
6. **Work in chunks.** One section at a time.
7. **FMP:** Use `/stable/` prefix, not v3.
8. **2Z token:** CoinGecko contract address endpoint.
9. **Supabase anon key:** One-char typo breaks silently.
10. **Never self-fetch from server components.** Direct import shared modules.
11. **Read env vars inside functions,** not module scope.
12. **ISR revalidate ≠ API cache.** Add in-memory cache for expensive calls (Anthropic).
13. **Check Anthropic credits before debugging code.** 402 = credits, 401 = key, 429 = rate limit.
14. **Substack RSS** at `{domain}/feed`. Use rss2json.com as proxy.
15. **Gray readability:** Minimum `#9ca3af` on `#0c0c0e` background.
16. **Vercel OG ImageResponse:** Edge Runtime may fail with external fetches. Use Node.js runtime instead.
17. **MOVE Index:** `^MOVE` on Yahoo Finance. >100 = bond market stress.

## Next Steps

1. **Fix OG image** — debug blank rendering, possibly Satori JSX issue
2. **Watchlist comments** — move from hardcoded to Supabase
3. **Remove `FINNHUB_API_KEY`** from Vercel env vars
4. **Monitor Anthropic costs** — should be ~$1.80/month with 8h cache
