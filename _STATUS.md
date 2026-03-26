# 10AMPRO Hub — _STATUS.md
**Last updated:** March 26, 2026
**Live URL:** https://10ampro-hub.vercel.app
**Repo:** 10amalpha/10ampro-hub
**Vercel Project ID:** prj_lKkui80lHh4x3Fietp6nC4CRfupB

---

## Architecture

- **Framework:** Next.js 14.0.4 (App Router)
- **page.jsx** — Server component. Phase 1: parallel fetch (Yahoo macro+stocks, CoinGecko, FRED, FMP calendar+earnings, Supabase). Phase 2: builds market snapshot from Phase 1 data, passes to `getInsights()`. `force-dynamic` with ISR revalidate 300s.
- **HubClient.jsx** — Client component (`'use client'`), receives all data as props, handles interactivity (watchlist filters, comment expand/collapse, responsive breakpoints, per-section share via html2canvas).
- **app/lib/insights.js** — Shared module for AI insight generation. Called directly by `page.jsx` (NOT via HTTP self-fetch). Has 8h in-memory cache. Accepts pre-fetched market data as parameter to avoid redundant Yahoo/CoinGecko calls.
- **app/lib/briefing.js** — Shared module for FRED + FMP data. Called directly by `page.jsx` (NOT via HTTP self-fetch). Contains `getFedData()`, `getEconomicCalendar()`, `getEarnings()`, `getBriefingData()`.
- **API Routes:**
  - `/api/briefing` — Slim wrapper around `lib/briefing.js` for external access only (17 lines)
  - `/api/insights` — External access to AI-generated insights (reuses `lib/insights.js`)
  - `/api/og` — Dynamic OG image 1200×630 (Node.js runtime). Live market data for social previews.
  - `/api/story` — Dynamic story image 1080×1920 (Node.js runtime). Vertical format for IG stories / WhatsApp status.

## Env Variables (Vercel)

| Variable | Status | Used by |
|---|---|---|
| `FRED_API_KEY` | ✅ Set | NET LIQ, US M2, CN M2 (lib/briefing.js) |
| `FMP_API_KEY` | ✅ Set (paid plan, annual) | Economic calendar + Earnings Radar (lib/briefing.js) |
| `ANTHROPIC_API_KEY` | ✅ Set (key name: Briefing10am) | AI Editorial Insights (lib/insights.js) |
| `FINNHUB_API_KEY` | ⚠️ No longer needed | Can be removed from Vercel |

## Section Status

### 1. HEADER ✅ COMPLETE — Do NOT change

### 2. SIGNAL + MACRO BAR ✅ COMPLETE — LIVE DATA
**MKT Row (6 cells):** S&P 500, VIX, DXY, WTI, USD/JPY, USD/COP — Yahoo, 5 min
**LIQ Row (6 cells):** NET LIQ (FRED), US M2 (FRED), CN M2 (FRED), US 10Y (Yahoo), US 2Y (Yahoo), **MOVE Index** (Yahoo `^MOVE`, red >100)

### 3. CALENDAR ✅ COMPLETE — FMP + Smart 3-tier filter (fixed Mar 26)
- **Tier 1 (always show):** FOMC, NFP, Jobless Claims, CPI, PPI, PCE, GDP, Retail Sales, ISM, Michigan, Home Sales, Balance of Trade, Interest Rate, Powell, Fed Funds Rate
- **Tier 2 (fills remaining slots):** Fed speeches (Barr, Jefferson, Cook, Daly, etc.), Fed Balance Sheet, Mortgage Rates, Wholesale, EIA, Housing Starts, Building Permits, Durable Goods, Industrial Production, Crude Oil, Natural Gas
- **Blocked:** CFTC, Speculative Net Positions, Bill/Bond/Note/TIPS/FRN Auctions, regional Fed indices (Kansas, Dallas, Philadelphia, Richmond, Chicago, NY Empire State, Philly Fed)
- **Caps:** HOY max 8 (min 5 guaranteed) · MAÑANA max 6
- **Dedup:** events with identical names collapsed (e.g. Fed Balance Sheet appearing twice)
- **Mar 26 fix:** `'Fed '` keyword in Tier 1 was too broad — matched speeches, regional indices, balance sheet, causing 14+ items in HOY. Removed `'Fed '`, tightened to specific keywords, moved speeches to Tier 2, blocked regional Fed, added max caps + dedup.

### 4. WATCHLIST ✅ COMPLETE — 30 tickers (15 stocks Yahoo + 15 crypto CoinGecko)

### 5. INFO DIET + EARNINGS RADAR ✅ BOTH LIVE
- Info Diet: 7 items from Supabase `feed_items`
- Earnings: 13 tickers from FMP per-ticker

### 6. EDITORIAL INSIGHTS ✅ AI-GENERATED
- Anthropic Claude Sonnet, 8h in-memory cache, ~$1.80/month
- Market data passed from page.jsx (includes MOVE)
- MOVE framework in prompt: <80 calm, 80-100 tension, >100 bond stress, >120 crisis

### 7. SUBSCRIBE CTA ✅ NEW
- Banner between insights and quick access cards
- Links to `10am.pro/subscribe` with UTM tracking

### 8. QUICK ACCESS CARDS ✅ NEW
- 📊 FORECAST 2026 → forecast2026.vercel.app (portfolio tracker)
- 🗓️ EVENTOS 10AMPRO → Luma calendar (Ep200, meetups)

### 9. PER-SECTION SHARE BUTTONS ✅ NEW
- 📤 SHARE button on: Watchlist, Info Diet, Insights
- Client-side screenshot via `html2canvas` (dynamic import, ~40kb on first use)
- Each screenshot adds branded footer: `10am.pro | @10ampro`
- Mobile: native Web Share API (share image to WhatsApp/IG directly)
- Desktop: downloads PNG

### 10. SHARE BAR ✅
- 📸 Compartir mi briefing (downloads story PNG from `/api/story`)
- 🔗 Compartir link (Web Share API / clipboard)

### 11. OG IMAGE + STORY IMAGE ✅ NEW
- `/api/og` — 1200×630 for social link previews (WhatsApp, X, Slack)
- `/api/story` — 1080×1920 vertical for IG stories / WhatsApp status
- Both: Node.js runtime (NOT Edge — Edge fails silently with Yahoo fetches)
- Both: live market data, 10AMPRO branding, signal badge
- Meta tags: `og:image` + `twitter:card=summary_large_image` in layout.js

### 12. UTM TRACKING ✅ NEW
All hub links to 10am.pro tagged for Substack CSV tracking:

| UTM params | Link |
|---|---|
| `utm_source=hub&utm_medium=insights&utm_campaign=article-link` | Insight article links (AI-generated) |
| `utm_source=hub&utm_medium=insights&utm_campaign=deep-dive-cta` | "Más análisis y deep dives" bottom CTA |
| `utm_source=hub&utm_medium=cta&utm_campaign=subscribe` | Subscribe CTA banner |
| `utm_source=hub&utm_medium=footer&utm_campaign=nav` | Footer Substack link |
| `utm_source=hub&utm_medium=card&utm_campaign=forecast` | Forecast 2026 card |
| `utm_source=hub&utm_medium=card&utm_campaign=eventos` | Luma events card |

UTMs added at render time in HubClient.jsx so both AI-generated and fallback insight links get tagged.

### 13. PWA ✅ COMPLETE
### 14. FOOTER ✅ Substack + @holdmybirra

---

## Performance Architecture

### HTTP Calls per render: 27 (down from 35)
- **Eliminated:** self-fetch to /api/briefing, redundant Yahoo+CoinGecko in briefing and insights
- **Yahoo crumb:** cached 30min in-memory
- **AI Insights:** cached 8h in-memory (~3 calls/day, ~$1.80/month)
- **Dead code removed:** /api/watchlist, /api/debug (348 lines deleted)

### Cache Architecture
| Data | Cache | TTL |
|---|---|---|
| Yahoo crumb | In-memory | 30 min |
| AI Insights | In-memory | 8 hours |
| ISR page | Next.js | 5 min |
| FRED data | Next.js fetch | 1 hour |
| FMP calendar | Next.js fetch | 1 hour |
| FMP earnings | Next.js fetch | 6 hours |
| CoinGecko | Next.js fetch | 2 min |

---

## Key Lessons Learned

1. **Never self-fetch from server components.** Use direct import of shared modules.
2. **Read env vars inside functions, not module scope.** Module-scope reads can be undefined during SSR import on Vercel.
3. **ISR revalidate ≠ API cache.** Without internal cache, Anthropic was called ~288 times/day ($5.76/day). Always add in-memory cache for expensive APIs.
4. **Check Anthropic credits before debugging code.** Error logging: 402=credits, 401=key, 429=rate limit.
5. **Yahoo crumb is reusable.** Cache 30min to avoid 2 extra HTTP calls per fetchYahoo().
6. **Pass data downstream instead of re-fetching.** page.jsx passes market data to getInsights().
7. **OG Image: Node.js runtime, not Edge.** Edge fails silently with Yahoo fetches.
8. **OG Image: no .map() in ImageResponse.** Satori renderer has JSX limitations.
9. **MOVE Index** (`^MOVE` on Yahoo) is the VIX of bonds. >100 = bond stress. MOVE+VIX double signal.
10. **UTMs for Substack tracking.** Substack CSV reports referrer URLs including query params. Structure: `utm_source=hub&utm_medium={section}&utm_campaign={action}`.
11. **html2canvas for client-side screenshots.** Dynamic import to avoid bundle bloat. Branded footer injected via DOM clone.
12. **Vercel Hobby vs Pro:** Same speed, same CDN. Pro gives 10x limits + commercial use license. Not needed yet at current traffic (~39 visits/2months). Upgrade when >500 visits/day or when analytics needed.
13. **Calendar keyword filters need specificity.** `'Fed '` matched everything (speeches, regional indices, balance sheet). Use exact event names or narrow keywords. Always pair keyword filter with a MAX cap — min guarantees without max caps dump unlimited items.

## Next Steps (priority order)

1. **Facebook Pixel** — Install pixel `1538054851084565` on hub for retargeting audience
2. **Vercel Web Analytics** — Free on Pro, manual setup on Hobby. Need traffic data.
3. **Mobile responsive checkup** — LIQ row 6 cols + MOVE may break on mobile
4. **"Qué Cambió" (approach C)** — Vercel cron at 10am COT saves snapshot to Supabase. Hub shows deltas since morning.
5. **Push notifications** — PWA push or WhatsApp bot. Daily 10am trigger.
6. **Watchlist comments** — Move from hardcoded to Supabase
7. **Remove `FINNHUB_API_KEY`** from Vercel env vars
