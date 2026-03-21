# 10AMPRO Hub — _STATUS.md
**Last updated:** March 21, 2026 (session 5 — final)
**Live URL:** https://10ampro-hub.vercel.app
**Repo:** 10amalpha/10ampro-hub
**Vercel Project ID:** prj_lKkui80lHh4x3Fietp6nC4CRfupB

---

## Architecture

- **Framework:** Next.js 14.0.4 (App Router)
- **page.jsx** — Server component. Phase 1: parallel fetch (Yahoo macro+stocks, CoinGecko, FRED, FMP calendar+earnings, Supabase). Phase 2: builds market snapshot from Phase 1 data, passes to `getInsights()`. `force-dynamic` with ISR revalidate 300s.
- **HubClient.jsx** — Client component (`'use client'`), receives all data as props, handles interactivity (watchlist filters, comment expand/collapse, responsive breakpoints).
- **app/lib/insights.js** — Shared module for AI insight generation. Called directly by `page.jsx` (NOT via HTTP self-fetch). Has 8h in-memory cache. Accepts pre-fetched market data as parameter to avoid redundant Yahoo/CoinGecko calls.
- **app/lib/briefing.js** — Shared module for FRED + FMP data. Called directly by `page.jsx` (NOT via HTTP self-fetch). Contains `getFedData()`, `getEconomicCalendar()`, `getEarnings()`, `getBriefingData()`.
- **API Routes** (all `force-dynamic`):
  - `/api/briefing` — Slim wrapper around `lib/briefing.js` for external access only (17 lines). Page does NOT call this.
  - `/api/insights` — External access to AI-generated insights (reuses `lib/insights.js`)
  - `/api/og` — Dynamic OG image generation (Node.js runtime, `ImageResponse`). Fetches Yahoo+CoinGecko, renders 1200×630 PNG with market data + signal.

## Env Variables (Vercel)

| Variable | Status | Used by |
|---|---|---|
| `FRED_API_KEY` | ✅ Set | NET LIQ, US M2, CN M2 (lib/briefing.js) |
| `FMP_API_KEY` | ✅ Set (paid plan, annual) | Economic calendar + Earnings Radar (lib/briefing.js) |
| `ANTHROPIC_API_KEY` | ✅ Set (key name: Briefing10am) | AI Editorial Insights (lib/insights.js) |
| `FINNHUB_API_KEY` | ⚠️ No longer needed | Can be removed from Vercel |

## Section Status

### 1. HEADER ✅ COMPLETE
- Logo + 10AMPRO brand + "BRIEFING DIARIO" subtitle + date/COT + ISR 5min
- **Do NOT change**

### 2. SIGNAL + MACRO BAR ✅ COMPLETE — LIVE DATA
**MKT Row (6 cells) — Yahoo Finance, 5 min refresh:**
- S&P 500, VIX (red >25), DXY, WTI, USD/JPY, USD/COP

**LIQ Row (6 cells):**
- NET LIQ — FRED (WALCL−TGA−RRP), weekly Wed
- US M2 — FRED M2SL, monthly
- CN M2 — FRED MYAGM2CNM189N (yuan ÷ 1e12), monthly
- US 10Y, US 2Y — Yahoo, 5 min
- **MOVE Index** — Yahoo `^MOVE`, 5 min. Color: red >100 (bond stress), yellow ≤100

**Signals:** RISK ON/MIXED/RISK OFF + EXPANDING/NEUTRAL/TIGHTENING
**Layout:** MKT=6col grid, LIQ=6col grid

### 3. CALENDAR ✅ COMPLETE — LIVE DATA (FMP) + SMART FILTER
- **Source:** FMP `/stable/economic-calendar`
- HOY split into high-impact + low-impact. MAÑANA next-day US events.
- 3-tier relevance system. HOY minimum 5 events guaranteed.

### 4. WATCHLIST ✅ COMPLETE — LIVE DATA (30 tickers)
**Stocks (15) — Yahoo, 5 min:** PLTR, HOOD, TSLA, HIMS, QSI, DUOL, STKE, MP, OKLO, AMD, NVDA, MSTR, BE, IBIT, STRC
**Crypto (15) — CoinGecko, 2 min:** BTC, SOL, SUI, ETH, JUP, NOS, JTO, SHDW, 2Z, MET, HNT, ZEC, JITOSOL, XRP, JLP
**2Z** via Solana contract: `J6pQQ3FAcJQeWPPGppWRb4nM8jU3wLyYbRrLh7feMfvd`

### 5. INFO DIET + EARNINGS RADAR ✅ BOTH LIVE
**Info Diet:** 7 items from Supabase `feed_items`, 5 min ISR. Category emoji badges.
**Earnings Radar:** 13 tickers from FMP per-ticker, 6h ISR. EPS estimates, AMC/BMO badges, NEXT UP.

### 6. EDITORIAL INSIGHTS ✅ COMPLETE — AI-GENERATED
- **Module:** `app/lib/insights.js`
- **Flow:** RSS (rss2json.com) + pre-fetched market data (from page.jsx) → Anthropic Claude Sonnet → 6 insights
- **Cache:** 8h in-memory. ~3 calls/day. ~$1.80/month estimated.
- **Market data:** Passed from page.jsx (no redundant fetches). Includes S&P, VIX, DXY, WTI, US10Y, COP, BTC, SOL, MOVE.
- **MOVE framework in prompt:** <80 calm, 80-100 tension, >100 bond stress, >120 liquidity crisis. MOVE >100 + VIX >25 = double risk signal.
- **CRITICAL:** `process.env.ANTHROPIC_API_KEY` must be read inside the function, NOT at module scope.
- **CRITICAL:** `page.jsx` calls `getInsights()` directly via import — NOT via HTTP self-fetch.

### 7. OG IMAGE ✅ COMPLETE — DYNAMIC SOCIAL CARD
- **Route:** `/api/og` (Node.js runtime, `force-dynamic`)
- **Output:** 1200×630 PNG with live market data
- **Content:** 10AMPRO branding + RISK signal + 6 tickers (S&P, VIX, BTC, SOL, DXY, COP) with prices and % changes
- **Dark theme** matching hub aesthetic
- **Meta tags:** `og:image` + `twitter:card=summary_large_image` in layout.js
- **Usage:** WhatsApp, X, Slack, iMessage — any platform that reads OG tags
- **CRITICAL:** Must use Node.js runtime (NOT Edge). Edge runtime fails silently with external fetches.

### 8. PWA ✅ COMPLETE
- `public/manifest.json`, apple-touch-icon, PWA icons. `display: standalone`.

### 9. FOOTER ✅ COMPLETE
- Substack + @holdmybirra (Cerebro removed)

---

## Performance Architecture (Session 5)

### Before (35 HTTP calls per render)
- page.jsx → self-fetch to /api/briefing (deadlock risk)
- /api/briefing internally fetched Yahoo + CoinGecko (redundant)
- lib/insights.js fetched Yahoo + CoinGecko independently (redundant)
- Yahoo crumb auth: 2 calls per fetchYahoo() × 2 = 4 extra calls
- /api/watchlist, /api/debug = dead code

### After (27 HTTP calls per render)
- **Direct imports:** page.jsx imports `lib/briefing.js` and `lib/insights.js` directly (no self-fetch)
- **No redundant fetches:** Market data fetched once by page.jsx, passed to `getInsights()` as parameter
- **Yahoo crumb cached:** 30min in-memory TTL. Second `fetchYahoo()` reuses crumb instantly.
- **Dead code removed:** /api/watchlist + /api/debug deleted. /api/briefing slimmed to 17-line wrapper.
- **348 lines of code deleted**

### Cache Architecture
| Data | Cache | TTL |
|---|---|---|
| Yahoo crumb | In-memory | 30 min |
| AI Insights | In-memory | 8 hours |
| ISR page | Next.js | 5 min |
| FRED data | Next.js fetch cache | 1 hour |
| FMP calendar | Next.js fetch cache | 1 hour |
| FMP earnings | Next.js fetch cache | 6 hours |
| CoinGecko | Next.js fetch cache | 2 min |

## Data Refresh Rates

| Data | Source | Refresh |
|---|---|---|
| MKT row (S&P, VIX, DXY, WTI, JPY, COP) | Yahoo | 5 min |
| LIQ row (US 10Y, US 2Y, MOVE) | Yahoo | 5 min |
| NET LIQ, US M2, CN M2 | FRED | 1 hour |
| Calendar | FMP | 1 hour |
| Watchlist stocks (15) | Yahoo | 5 min |
| Watchlist crypto (15) | CoinGecko | 2 min |
| Earnings (13 tickers) | FMP per-ticker | 6 hours |
| Info Diet (7 items) | Supabase | 5 min |
| Editorial Insights (6) | Anthropic + RSS | 8h cache |
| OG Image | Yahoo + CoinGecko | On-demand per request |

## Key Lessons Learned

1. **Env vars are case-sensitive** on Vercel.
2. **Static pages can't read env vars at runtime.** Use `force-dynamic`.
3. **Yahoo v7 requires crumb auth.** `getYahooCrumb()` with cookie→crumb flow.
4. **FRED units:** WALCL/WDTGAL/RRPONTSYD = millions. M2SL = billions. CN M2 = yuan (÷1e12).
5. **Don't change the header.**
6. **FMP:** Use `/stable/` prefix for new accounts.
7. **2Z token** uses CoinGecko contract address endpoint.
8. **Supabase anon key** — one-char typo breaks silently.
9. **FMP AMC/BMO field** — often null 30+ days out.
10. **Never self-fetch from server components.** Use direct import of shared module.
11. **Substack RSS** at `{domain}/feed`, use rss2json.com as proxy.
12. **Read env vars inside functions, not module scope.** Module-scope reads can be undefined during SSR import.
13. **ISR revalidate ≠ API cache.** Without internal cache, expensive API calls fire on every ISR render. Always add in-memory cache for Anthropic/expensive APIs.
14. **Check Anthropic credits before debugging code.** 402 = credits, 401 = key, 429 = rate limit.
15. **Gray readability:** Use `#9ca3af` minimum for secondary text on dark bg.
16. **Yahoo crumb is reusable.** Cache in memory (30min TTL) to avoid 2 extra HTTP calls per fetchYahoo().
17. **Pass data downstream instead of re-fetching.** page.jsx already has market data — pass it to getInsights() instead of letting it fetch again.
18. **OG Image: Node.js runtime, not Edge.** Edge runtime fails silently with Yahoo Finance fetches. Node.js works reliably.
19. **OG Image: no .map() in ImageResponse.** Satori (the renderer) has JSX limitations. Use explicit elements instead of dynamic lists.
20. **MOVE Index** (^MOVE on Yahoo) is the VIX of bonds. >100 = bond stress. MOVE >100 + VIX >25 = double signal.

## Next Steps

1. **Watchlist comments:** Move from hardcoded to Supabase or editable JSON
2. **Remove `FINNHUB_API_KEY`** from Vercel env vars
3. **Monitor Anthropic costs** — should be ~$1.80/month with 8h cache
4. **Mobile 700px breakpoint** — verify LIQ row 6-col renders correctly on mobile
5. **OG Image refinement** — consider adding WTI or MOVE to the card
