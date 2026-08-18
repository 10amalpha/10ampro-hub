# 10AMPRO Hub — _STATUS.md
**Last updated:** August 17, 2026
**Live URL:** https://10ampro-hub.vercel.app · **Prod domain:** https://mercados.10am.pro
**Repo:** 10amalpha/10ampro-hub
**Vercel Project ID:** prj_lKkui80lHh4x3Fietp6nC4CRfupB

---

## Recent changes (Aug 12, 2026)

- **/el-10x-mas-rapido — snapshot refresh 23 jun → 12 ago 2026.** Caps/precios: HIMS $29.58/$7.0B, HOOD $94.38/$85B (techo 10x baja a $850B), SOL $76/$44B, PLTR $174.94/$420B (techo sube a $4.2T), TSLA $328/$1.3T, BTC $64K/$1.28T. Catalizadores: PCAC-FDA avaló 6/7 péptidos (23–24 jul, decisión FDA pendiente) + HIMS Q2 $753M +38% con pérdida de $86M; CLARITY sin voto en agosto (cloture 8 ago, Senado retoma 14 sep); PLTR Q2 beat + guía $8.15B + Burry en puts; TSLA Cybercab production-ready + fab de chips $16.8B. Macro: quinto hold Fed 3.50–3.75% (~50/50 alza en sep), CPI jul 3.4%, 10Y 4.68%, money markets récord $7.91T (ICI 6 ago), WTI ~$78 con Hormuz cerrado al sexto mes. capDiameter recalibrado a nuevos min/max (7.0 / 1310).

## Architecture

- **Framework:** Next.js 14.0.4 (App Router)
- **page.jsx** — Server component. Phase 1: parallel fetch (Yahoo macro+stocks, CoinGecko, FRED, FMP calendar+earnings, Supabase). Phase 2: builds market snapshot from Phase 1 data, passes to `getInsights()`. `force-dynamic` with ISR revalidate 300s.
- **HubClient.jsx** — Client component (`'use client'`), receives all data as props, handles interactivity (watchlist filters, comment expand/collapse, responsive breakpoints, per-section share via html2canvas).
- **PortfolioEmbed.jsx** — Client-only component (dynamic import, SSR disabled). Full feature parity with standalone portafoliotracker. Multi-wallet support: detects Phantom, Backpack, xNFT via native window providers. Silent auto-connect tries all providers, falls back to wallet chooser buttons. Inline activation flow (code input inside hub, no redirect). Mobile deep link opens Phantom browser. Full wallet management: add/remove tracked wallets (5 chains, auto-detect), disconnect wallet, refresh holdings, tracked wallet pills with remove buttons. Fires analytics events cross-origin to portafoliotracker `/api/track` (session, expand, refresh, add_wallet). Checks activation + wallet tracking via shared Supabase REST API. Fetches holdings cross-origin from portafoliotracker.vercel.app APIs (CORS middleware). Zero new npm deps. Five states: no_wallet → disconnected → not_activated → loading → ready. Sits between macro bar and calendar.
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

### 1. HEADER ✅ COMPLETE — Do NOT change (except theme toggle added Mar 26)
- ☀️/🌙 toggle button next to timestamp
- Persists to `localStorage` (`10am-theme`)
- Toggles `.light` class on `<html>` → swaps all CSS custom properties
- Smooth 0.3s transition on background/color

### 2. SIGNAL + MACRO BAR ✅ COMPLETE — LIVE DATA
**MKT Row (6 cells):** S&P 500, VIX, DXY, WTI, USD/JPY, USD/COP — Yahoo, 5 min
**LIQ Row (6 cells):** NET LIQ (FRED), US M2 (FRED), CN M2 (FRED), US 10Y (Yahoo), US 2Y (Yahoo), **MOVE Index** (Yahoo `^MOVE`, red >100)

### 3. CALENDAR ✅ COMPLETE — FMP + Smart 3-tier filter + Actual values + Time progression
- **Actual values (added Mar 27):** When FMP publishes actual data (e.g., Michigan Consumer Sentiment = 53.3), it displays in bold next to the event name. Color-coded: green (beat estimate), red (miss), yellow (inline with estimate or no estimate to compare). The `est:` label dims when actual is present so actual takes visual priority.
- **Time display fix (Apr 1):** `formatTime()` now normalizes FMP's space-separated format (`"2026-04-01 14:00:00"`) to ISO before parsing. Previously only handled `T`-separated ISO strings — FMP format fell through and dumped the full datetime string (date + time) on every row. Now shows just `HH:MM` in ET.
- **Time progression (added Mar 27, simplified Apr 1):** Past events use `var(--text-secondary)` color (no opacity hacks). Upcoming events stay bright with blue time + blue background tint. No row-level opacity — all dimming is done via color alone, matching CONTEXTO section readability.
- **Chronological sort (Apr 1):** Events now sort by time after tier filtering. Previously tier priority determined display order (tier 1 first, tier 2 next), causing 10:00 events to show above 08:30 events. Now both HOY and MAÑANA columns read top-to-bottom chronologically.
- **Timezone label (Apr 1):** Header changed from "UTC" to "ET" since `formatTime()` converts all times to Eastern.
- **FMP calendar cache reduced from 1h → 15min (Mar 27):** Actuals now appear within ~20min of release (15min FMP cache + 5min ISR regen).
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

## Standalone Thesis Pages (Research Routes — added June 2026)

Self-contained client-component pages under `app/<route>/page.jsx`. They reuse the global theme system (`globals.css` CSS vars + `10am-theme` localStorage) and Bloomberg aesthetic, but are independent of the hub data pipeline (no Yahoo/FMP/Supabase fetch — data is a hardcoded point-in-time snapshot). Each is discoverable via a link card in `HubClient.jsx`.

### `/biology-is-code` ✅ LIVE — "Biology is Code: The Biological Operating System"
- **URL:** https://mercados.10am.pro/biology-is-code
- **Thesis:** Biology shifting from a discovery lottery to a computable search problem. Framework = **Read · Orchestrate · Write** (Bio-OS value chain).
- **Sections:** hero (paradigm shift), Healthspan-per-Token scaling law + longevity escape velocity, 5-level proteomic abstraction stack (Atoms→Chemistry→Peptides→Proteins→Clinical), Read/Orchestrate/Write value-chain grid, 9-ticker market-cap table (layer-tagged), tabbed income-statement SVG charts, compute-bottleneck stat (~0.02%), methodology notes (ES), footer.
- **9 tickers (Aug 17, 2026 snapshot — post-Q2 FY2026, hardcoded):**
  - READ: TEM ($9.3B), CAI ($5.5B — turned adj-EBITDA positive in Q2), RXRX ($1.7B), NAUT ($113M — cash ~$129M now exceeds market cap)
  - ORCHESTRATE: HIMS ($7.3B — dipped ~7% on Q2 print; raised FY26 rev guide to $3.1–3.3B)
  - WRITE: IBRX ($7.7B), PBLS ($4.5B, record IPO Jun 2026), NGEN ($131M), INKT ($53M)
- **Chart data:** 7 tickers with multi-year income statements (HIMS, TEM, CAI, IBRX, RXRX, NAUT, INKT); PBLS + NGEN render as pre-revenue / newly-public info cards (no chart).
- **HIMS 2026E bar:** HIMS chart includes a dashed/translucent projected revenue bar (FY2026 guidance midpoint ~$3.2B) via a `projIdx` flag on the FIN entry. `IncomeChart` skips null gross/op for projected years; CAGR chips slice to actuals only so the projection never distorts them. Pattern is reusable for any ticker (set `projIdx` + null the unknown series).
- **Q2 FY2026 handling:** annual bars stay FY2022–FY2025 actuals; each ticker's Q2 result lives in its commentary note (HIMS from the uploaded Aug 10 Q2 deck/transcript; TEM/CAI/IBRX/RXRX/NAUT reported late Jul–mid Aug).
- **Data caveats (in methodology block):** CAI gross profit margin-estimated, FY2025 op income distorted by IPO stock comp; IBRX 2022/2025 op income ≈ R&D + SG&A; NAUT/INKT pre-revenue (op-loss only).
- **History:** built 5-ticker (e69177a) → expanded to 9 + Bio-OS framework (36fbb8d) → hub button → 10am.pro (bdb70ee) → Q2 FY2026 refresh + stale-NAUT fix (2c52b5f) → HIMS 2026E guidance bar.

### `/el-10x-mas-rapido` ✅ LIVE (added separately)
- Speed-to-10x tearsheet (prob × velocity matrix, Laffont). Cover + paywall CTA funneling to subscribe.

### Hub-button rule (IMPORTANT)
On every standalone page, the header hub/back button **must link to `https://10am.pro`** (the main site), NOT `mercados.10am.pro`. Driving traffic to 10am.pro is the priority. Use UTM: `?utm_source=<route>&utm_medium=header&utm_campaign=hub`.

---

## Theme System (added Mar 26)

- **Dark mode** (default): Bloomberg terminal aesthetic, `#0c0c0e` background
- **Light mode**: High-contrast light, `#f8f9fa` background — inspired by Situation Room
- All colors use CSS custom properties in `globals.css` (`:root` dark, `:root.light` light)
- HubClient inline styles reference `var(--bg)`, `var(--text-primary)`, etc.
- Color helper functions (`cBg`, `cBd`, `cC`) return CSS var strings
- Share screenshots resolve theme at capture time (html2canvas needs real hex, not CSS vars)
- Brand accents (#D4A843 gold, #22C55E green, section colors like #60a5fa, #fbbf24, #a78bfa) stay constant across themes

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
| FMP calendar | Next.js fetch | 15 min |
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
14. **FMP timestamps have no timezone.** FMP returns `"2026-03-27 14:00:00"` (no `T`, no `Z`). Browsers parse this as local time, breaking UTC comparisons. Always normalize to ISO: `str.replace(' ', 'T') + 'Z'` via `toISOUTC()` helper.
15. **Server-side date bucketing must use ET, not UTC.** Vercel runs in UTC — after 7pm ET, `new Date().toISOString().split('T')[0]` returns tomorrow's date. This causes Monday's events to appear in Sunday's HOY column. Fix: `new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }))` for all date-only comparisons.
16. **FMP date format breaks `formatTime()`.** FMP returns `"2026-04-01 14:00:00"` (space-separated, no `T`). The original `formatTime()` only handled ISO `T` format — FMP's format fell through the `if (timeStr.includes('T'))` guard and returned the full datetime string. Fix: normalize first (`str.replace(' ', 'T') + 'Z'`), then parse. Always test `formatTime` with actual FMP output, not assumed ISO input.
17. **Never use opacity for text dimming.** Stacking `color: var(--text-muted)` AND `opacity: 0.6` double-dims text into invisibility on dark backgrounds. Use color steps alone (`--text-primary` → `--text-secondary` → `--text-muted`). One mechanism, not two.
18. **Sort after filtering, not before.** Tier-based filtering (tier 1 first, tier 2 fills remaining) produces results ordered by tier, not by time. Always `.sort()` by timestamp as the last step before rendering. The filter picks WHICH events; the sort decides display ORDER.
19. **Global font size pass (Apr 1).** Every `fontSize` in HubClient.jsx and PortfolioEmbed.jsx bumped +2px (8→10, 9→11, 10→12, 11→13, 12→14, 13→15). Ternary mobile sizes also bumped (e.g. `mb ? 11 : 14` → `mb ? 13 : 16`). Time column width 38→46px. Use a Python `str.replace()` script for bulk edits like this — more reliable than chaining 80+ `str_replace` tool calls. Always bump ALL components in the same pass (PortfolioEmbed was missed on first pass).
20. **Standalone thesis pages use hardcoded snapshots, not the live data layer.** Research/thesis routes (`/biology-is-code`, etc.) are independent client components with point-in-time market data baked in. Keep an `AS_OF` constant + a methodology block stating figures move daily and flagging any estimated/approximate numbers. Wiring them into the hub's Yahoo layer is optional and deferred.
21. **Hub button → 10am.pro, always.** On any standalone page, the header back/hub button links to `https://10am.pro` (main site), never `mercados.10am.pro`. Driving traffic to 10am.pro is a top priority. Tag with `utm_source=<route>&utm_medium=header&utm_campaign=hub`.

## Next Steps (priority order)

1. **Facebook Pixel** — Install pixel `1538054851084565` on hub for retargeting audience
2. **Vercel Web Analytics** — Free on Pro, manual setup on Hobby. Need traffic data.
3. **Mobile responsive checkup** — LIQ row 6 cols + MOVE may break on mobile
4. **"Qué Cambió" (approach C)** — Vercel cron at 10am COT saves snapshot to Supabase. Hub shows deltas since morning.
5. **Push notifications** — PWA push or WhatsApp bot. Daily 10am trigger.
6. **Watchlist comments** — Move from hardcoded to Supabase
7. **Remove `FINNHUB_API_KEY`** from Vercel env vars

## 2026-08-10 — biology-is-code data refresh
- Snapshot actualizado Jun 25 → Aug 10, 2026 (cierres Aug 7 / intradía Aug 10).
- Precios y market caps de los 9 tickers actualizados; tabla reordenada por mcap (IBRX $7.7B ahora arriba de HIMS $7.3B).
- Notas: CAI Q2 récord ($264M, +18% pop), HIMS reporta Q2 el 10-ago tras el cierre.
- Income statements FY (anuales) sin cambios — no hay cierres fiscales nuevos.

## 2026-08-10 — nueva sección FCF/share
- Sección "FCF POR ACCIÓN · quarterly" agregada entre Income Statements y Compute Bottleneck.
- HIMS y TEM: 6 trimestres discretos reales (FCF = OCF − capex, filings vía Macrotrends, YTD convertido a discreto). Barras SVG verde/rojo con línea cero, grid responsive 2-col → 1-col mobile.
- IBRX/CAI/RXRX/NAUT/INKT/PBLS/NGEN: tabla de burn real TTM/anual (sin serie trimestral pública de 6Q por ser pre-revenue o IPO reciente).
- Nota de metodología agregada (shares diluidas actuales constantes para aislar tendencia de caja).

## 2026-08-10 (2) — FCF/share: chart para cada ticker
- Sección FCF POR ACCIÓN ampliada: 7 charts trimestrales (HIMS, TEM, IBRX, RXRX, NAUT, INKT con 6 trimestres discretos; NGEN con 5 = toda su historia pública). Data real de filings vía Macrotrends (YTD→discreto).
- CAI y PBLS: cards con burn anual/TTM real — IPOs jun'25/jun'26, sin serie trimestral pública de FCF todavía.
- Shares usadas (constantes): HIMS 231M, TEM 180.4M, IBRX 1,047M, RXRX 540M, NAUT 126.6M, INKT 5.0M, NGEN 80.9M.

## 2026-08-18 — HIMS Q2 FY2026: datos oficiales del deck
- Serie FCF de HIMS reemplazada con la reconciliación oficial del investor deck Q2'26 (slide 38): Q1'25 +50.1, Q2'25 −69.4, Q3'25 +79.4, Q4'25 −2.6, Q1'26 +53.0, Q2'26 −68.2. Los valores previos (Macrotrends) diferían levemente del deck — lección aplicada: el deck del inversionista manda sobre datos scrapeados.
- Nota FCF actualizada: Q2'26 negativo por working capital del ramp de Wegovy de marca; cubierto con facility de receivables $400M + convertible ~$400M; $840M+ en caja; FCF positivo esperado en H2.
- Commentary de income statement HIMS enriquecido: ARPU $92 vs $76 (+21%), 2.9M subs (+19%, +300K netos), marketing 34% de revenue (−5 pts YoY), internacional ~17x a $131M (incl. $40M Eucalyptus, +13% QoQ orgánico), UK/Australia/Alemania >$100M anualizados c/u, guía Q3 $880–900M (+47–50% = aceleración), FY26 $3.1–3.3B, provisión FTC $47.5M, piloto AI Hers Weight Loss (3x engagement, 80% respondido por AI, −50% tareas no clínicas, menos cancelaciones, payback 12–18 meses).
- Item ORCHESTRATE actualizado con el framing del call: "AI load bearing, not decorative", closed loop intake→treatment→follow-up→outcome a escala de ~3M subs, visión de vender el concierge de $50–150K/año por suscripción.
- Nota de metodología ajustada: FCF de HIMS ahora viene del deck oficial, no de Macrotrends.
