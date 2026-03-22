# 10AMPRO Hub — "El Tab Fijo"

## Qué es

La página gratuita que reemplaza TradingView, TradingEconomics y Bloomberg Terminal para la audiencia LATAM de inversión. Un solo tab pinneado en Chrome que se chequea 1–5 veces al día.

## Para qué existe (posición en el funnel)

Es el FREE TIER del flywheel. No es un dashboard interno — es un producto público de captación.

**Lógica:** El Hub te da datos tácticos suficientes para que confíes en 10AMPRO → te pica la curiosidad → entras al Substack deep dive → te unes al WhatsApp → pagas.

El Hub no vende. **Engancha.**

## La promesa al usuario

"Abro una sola pestaña y en 30 segundos sé dónde estoy parado."

Mercados, macro, earnings, liquidez, cripto — todo lo que necesito para tomar decisiones hoy, filtrado por gente que sabe lo que hace.

## Qué lo diferencia de TradingView / TradingEconomics

- No es un mar de datos — es una opinión curada (RISK ON / CAUTION / RISK OFF)
- Cada dato está conectado a contenido de 10AMPRO que lo explica
- Diseñado para LATAM, en español, con el lens de las tesis del equipo
- No necesita cuenta, no necesita configurar nada — funciona desde el primer load

## V1 (live — March 13, 2026)

| Sección | Qué muestra |
|---------|-------------|
| Hero Signal Banner | RISK ON / CAUTION / RISK OFF calculado de 5 indicadores (TGA, RRP, VIX, DXY, WTI). Net Liquidity + BTC price. Color-coded con glow. |
| Market Ticker Row | S&P 500, NASDAQ, VIX, DXY, Gold, SOL — precio + delta %. Auto-refresh 5 min (Yahoo Finance + CoinGecko). |
| Economic Calendar | Eventos high-impact US de la semana (Finnhub). Hoy resaltado con label "HOY". Estimate, previous, actual. |
| Earnings Radar | Watchlist de 13 acciones (PLTR, HOOD, TSLA, STKE, QSI, MP, HIMS, OKLO, AMD, NVDA, DUOL, MSTR, BE). Countdown al próximo earnings. |
| Liquidity & Macro | Net Liquidity: FED BAL − TGA − RRP = NET LIQ. Cuatro métricas clave con badges de color. Link a LiquidityFlow completo. |
| "Lo que escribimos sobre esto" | Content map: Macro & Liquidez, Crypto & Tech, Earnings & Análisis, Tesis & Ideas. Cada dato lleva a un artículo o episodio. |
| Dashboard Quick Links | LiquidityFlow, Race to Target, EarningsWatch, Info Diet. |

## Rendering Architecture (updated March 21, 2026)

**Two-phase render: ISR shell + client-side price refresh.**

Previously `page.jsx` used `force-dynamic`, which forced a full server render on every visit — including a Claude Sonnet API call for editorial insights. This made first loads take 5–10 seconds.

**Current flow:**

1. **ISR (Incremental Static Regeneration):** `page.jsx` exports `revalidate = 300` (5 min). Vercel caches the full HTML (all data + insights). First visitor after cache expires triggers a background regeneration; all other visitors get instant cached response (<200ms).
2. **Client-side refresh:** `HubClient.jsx` calls `/api/prices` on mount and every 5 minutes. This updates: MKT row (S&P, VIX, DXY, WTI, JPY, COP), LIQ row (US 10Y, US 2Y, MOVE — NOT NET LIQ/M2/CN M2 which need FRED server-side), watchlist prices, and risk/liquidity signals.
3. **Header indicator:** Shows "ISR 5min" on initial load, switches to "● LIVE {time}" (green) once client-side refresh completes.

**What stays ISR-only (not refreshed client-side):**
- NET LIQ, US M2, CN M2 (require FRED_API_KEY, server-side only)
- Economic calendar (FMP/Finnhub)
- Earnings radar
- Editorial insights (Claude Sonnet API call)
- Info Diet (Supabase feed_items)

**Key files:**
- `app/page.jsx` — Server component. Fetches all data (Yahoo, CoinGecko, FRED, FMP, Supabase, Anthropic) and passes to HubClient. ISR 5min.
- `app/HubClient.jsx` — Client component. Renders UI, manages state, client-side price refresh via `/api/prices`.
- `app/api/prices/route.js` — Lightweight endpoint. Fetches only Yahoo (macro + stocks) + CoinGecko (crypto). No FRED, no Anthropic, no Finnhub. Returns mkt, liq (partial), signal, watchlist. Cache-Control: `s-maxage=60, stale-while-revalidate=120`.
- `app/lib/briefing.js` — FRED + FMP data. Called by page.jsx directly (no self-fetch).
- `app/lib/insights.js` — Fetches Substack RSS + calls Anthropic Claude Sonnet to generate 6 editorial insights. Called by page.jsx. **This is the slowest call (~3-8s) — only runs during ISR regeneration, never on client.**

**Performance lesson:** Never put `force-dynamic` on a page that calls an LLM API. ISR + client-side refresh gives the best of both worlds: instant load + fresh prices.

## V2+ Roadmap (por resolver)

1. **"Qué Cambió" Diff Engine** — Comparar snapshot de ayer vs hoy. Deltas visuales: "TGA subió $50B esta semana", "VIX cruzó 20 ayer". ESTA es la feature que hace que la gente abra el tab a diario.
2. **Push Notifications** — Service worker: alerta cuando signal cambia (RISK ON → CAUTION), earnings en 24h, o dato macro significativo. PWA-ready.
3. **Trump / Bessent X Feed** — Embed o fetch posts de @ScottBessent, @realDonaldTrump. Alto valor para contexto matutino.
4. **Content Map dinámico** — De JSON estático a sistema dinámico. Si TGA se dispara, automáticamente surface el artículo de Bessent.
5. **BTC Pension + InvestmentSim Widgets** — Collapsible dentro del briefing. Expand on click.
6. **Move insights to cron + Supabase** — Instead of generating insights during ISR (which still takes 3-8s on regeneration), run a Vercel cron every 30min that calls Anthropic and stores the result in Supabase. Page just reads the cached JSON. Eliminates the slowest call from the render path entirely.

## Pregunta abierta

¿Qué datos son realmente útiles a diario vs. ruido? Hay que masajear esto. ¿Qué hace que alguien vuelva 5 veces al día? El CTA bridge entre "vi datos útiles" y "me suscribo" todavía no está definido.

## Infraestructura

| Campo | Valor |
|-------|-------|
| URL | https://10ampro-hub.vercel.app |
| Repo | 10amalpha/10ampro-hub |
| Framework | Next.js 14.0.4 (App Router) |
| Vercel Project ID | prj_lKkui80lHh4x3Fietp6nC4CRfupB |
| Typography | JetBrains Mono + Plus Jakarta Sans |

### Environment Variables (Vercel)

| Variable | Source | Used By |
|----------|--------|---------|
| FRED_API_KEY | Same as liquidityflow | Fed Balance, TGA, RRP, Reserves, M2, CN M2 |
| FINNHUB_API_KEY | Same as earningswatch | Economic Calendar + Earnings |
| ANTHROPIC_API_KEY | Anthropic | Editorial insights generation (lib/insights.js) |

### API Architecture

**Server-side (ISR, page.jsx):**

| Source | Data | Refresh | Auth |
|--------|------|---------|------|
| FRED | Fed Balance Sheet, TGA, RRP, Bank Reserves, M2, CN M2 | 1 hour | API Key |
| Yahoo Finance | VIX, DXY, WTI, S&P, USD/JPY, USD/COP, US 10Y, US 2Y, MOVE | 5 min | Crumb auth |
| CoinGecko | BTC, SOL, SUI, ETH, JUP, NOS, JTO, SHDW, 2Z, MET, HNT, ZEC, JITOSOL, XRP, JLP | 2 min | None |
| FMP/Finnhub | Economic calendar + earnings per ticker | 1–6 hours | API Key |
| Supabase | Info Diet feed_items (7 latest) | 5 min | Anon key |
| Anthropic | 6 editorial insights (Claude Sonnet) | On ISR regen | API Key |

**Client-side (/api/prices, HubClient.jsx):**

| Source | Data | Refresh | Auth |
|--------|------|---------|------|
| Yahoo Finance | Macro row (6 tickers) + stocks (15 tickers) | On mount + every 5 min | Crumb auth |
| CoinGecko | All crypto tickers (15 tokens) | On mount + every 5 min | None |

## Reglas de ejecución

- **Commits incrementales** — cada paso que compila se pushea inmediatamente. NUNCA acumular múltiples edits para un solo push.
- Para edits grandes, usar `create_file` (archivo completo) en vez de encadenar `str_replace`.
- Siempre empezar clonando el repo.
- `npx next build` antes de push para verificar compilación.
- **Never use `force-dynamic` on pages that call external APIs (especially LLMs).** Use ISR + client-side refresh instead.

---

*Last updated: March 21, 2026*
