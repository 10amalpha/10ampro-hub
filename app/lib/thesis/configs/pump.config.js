import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'pump', name: 'Pump.fun', symbol: 'PUMP', cgId: 'pump-fun', host: 'mercados.10am.pro/pump',
  sector: 'Solana memecoin launchpad & AMM',
  tagline: 'Revenue de launches + PumpSwap, buyback agresivo — el token más ligado al ciclo de memes.',
  description: 'Pump.fun ($PUMP) en vivo: fees y revenue del launchpad y PumpSwap, buyback, supply overhang on-chain (tesorería, ICO, exchanges), TA con forecast y tripwires. 10AMPRO.',
  stance: 'trade-the-cycle', reviewed: '21 Oct 2026',
  ta: {
    updated: '21 Oct 2026', bias: 'BEAR',
    read: 'La trendline y la EMA50 se recuperaron al cierre; la EMA20 no. El 21 Oct cerró 0.004856 — +8.4%, el segundo día verde seguido desde 0.004163 (19 Oct), +16.6% en dos sesiones — sobre la trendline de junio (0.00462 hoy) y sobre la EMA50 (0.004655): el techo del rebote que la lectura del 18 Oct ponía en 0.0045–0.00465 se pasó al cierre. Hoy 0.004772, −1.7%, apoyado en la EMA50 por 0.1% — un empate. La EMA20 (0.004916) quedó 1.2% arriba del cierre y es la que manda: la ruptura del 18 Oct duró tres cierres (0.00434, 0.004163, 0.00448) y se recuperó con $189M, 74% del promedio de 20 días ($254M) — un barrido de la trendline, no una ruptura, pero recuperado con tres cuartos del volumen y sin tocar la media que define el sesgo. Cuatro de siete, desde tres: el precio sobre la 50 y la 200 (0.00331, +15% en 20 días), la 50 sobre la 200 y la 200 subiendo; faltan la EMA20, el RSI sobre 50 (27.7, desde 20 ayer y 9.4 el 18 Oct — la más baja del token) y el MACD, negativo, con el histograma achicándose por segunda sesión. RSI 27.7: todavía sobrevendido después de +17% en dos días, lo que dice cuán lejos había ido. Relativo: −6.1% en siete días con SOL −0.2%, todavía el múltiplo propio que arrastra desde hace cuatro revisiones; en el día, +8.4% con SOL +1.3% — el primer día en que PUMP sube con SOL casi plano desde el 5 Oct, que es la condición que la lectura ponía para decir que el ciclo se reabre, y uno solo no lo reabre. Lo que cambió: el +1M (0.00385) no tiene camino directo mientras la trendline (0.00462) aguante, y la tendencia de junio vuelve a existir en el precio, no solo en las medias. Lo que no cambió: el impulso de octubre devolvió el 86% y recuperó el 26%, la EMA20 sigue arriba y el volumen sigue debajo del promedio — un rebote de sobreventa con RSI 9 que llega a la EMA20 con tres cuartos del volumen es el rebote que se vende, y acá está. El ciclo se reabre con el cierre sobre 0.004916 y $300M; hasta ahí, trade-the-cycle dice reducir.',
    pattern: '<b>Impulso de octubre devuelto; trendline de junio barrida (18–20 Oct) y recuperada al cierre del 21 Oct.</b> Mínimos crecientes 0.0014 → 0.0027 → 0.0035 → 0.00385 (25 Sep), trendline hoy en 0.00462: perdida tres cierres (0.00434, 0.004163, 0.00448) y recuperada con 0.004856 — una ruptura que dura tres sesiones sin volumen y se recupera es un barrido, y el último mínimo creciente (0.00385) sigue en pie. El 5 Oct (0.00652) sigue siendo un máximo de agotamiento: el tramo desde 0.00385 devolvió el 86% y recuperó el 26%. La estructura es la escalera de junio con la EMA20 (0.004916) como techo inmediato y la EMA50 (0.004655, el precio está acá) como piso del rebote; debajo, la trendline (0.00462) y 0.00385. Un rebote de dos días con tres cuartos del volumen que se frena en la EMA20 es el retest clásico después de un barrido: sobre 0.004916 con volumen la tendencia de junio sigue y el rango 0.0045–0.0065 vuelve; debajo, la segunda pierna a 0.00385.',
    watch: '<b>0.004916 y 0.00462.</b> Arriba: cierre sobre la EMA20 (0.004916) con volumen sobre $300M anula el sesgo bajista — 1.2% arriba del cierre del 21 Oct; con $190M es el rebote tocando su techo. Después, 0.00502 (cierre del 14 Oct) y 0.00546 (mínimo del 10 Oct). Abajo: perder la EMA50 (0.004655) al cierre deja los dos días verdes como el rebote técnico y la trendline (0.00462) decide de vuelta; perderla otra vez con $250M+ es la ruptura buena y 0.00385 llega rápido. <b>RSI:</b> 27.7, todavía bajo 30 después de +17% — el rebote técnico desde 9.4 ya se dio en dos tercios; sobre 50 con el precio sobre 0.004916 cambia la foto. <b>Volumen:</b> $189M, 74% del promedio; el 20 días sigue 25% sobre el 90 días — el interés está, la convicción no. <b>Revenue:</b> la capa de network manda — si el revenue diario rebotó con el precio, el buyback sostiene 0.00462; si no, el rebote es solo chart. <b>Relativo:</b> +8.4% con SOL +1.3% en el día, el primero así desde el 5 Oct; −6.1% vs −0.2% en la semana. Un día propio; el ciclo se reabre con dos o tres y la EMA20 cerrada.',
    decision: [
      'Con posición: <b>reducir acá — el rebote a 0.0045–0.0050 llegó</b> (0.004856 al cierre, 0.004772 hoy, entre la EMA50 y la EMA20) con el 74% del volumen: es la salida que la lectura del 18 Oct pedía. Lo que quede, con stop en el cierre bajo 0.00462 (trendline recuperada): ahí el 21 Oct fue solo el rebote y 0.00385 vuelve a estar abierto.',
      'Sin posición: <b>nada</b>. La trendline recuperada con tres cuartos del volumen no es entrada — la entrada por fuerza es el cierre sobre 0.004916 con $300M+ y el revenue en máximos; la watchlist de abajo sigue en 0.00385 con volumen de capitulación ($400M+). Comprar 0.0048 porque "recuperó la trendline" es comprar a 1% de la EMA20 lo que todavía tiene RSI 28.',
      'Trigger único que anula el sesgo bajista: <b>cierre diario &gt; 0.004916</b> (EMA20, con la trendline y la EMA50 ya recuperadas) con volumen sobre $300M → 0.00502 (cierre 14 Oct) → 0.00546 (mínimo 10 Oct) → 0.00652.',
    ],
    invalidation: { level: 0.004916, text: 'Cierre diario sobre 0.004916 (EMA20, con el cierre del 14 Oct, 0.00502, pegado encima; la trendline de junio en 0.00462 y la EMA50 en 0.004655 ya recuperadas el 21 Oct) anula el path bajista: la ruptura del 18 Oct queda como un barrido → 0.00546 (mínimo del 10 Oct) y 0.00652 (máximo del 5 Oct).' },
    path: [
      { d: 30, h: '+1M', target: 0.00385, how: 'Rebote frenado en la EMA20 (0.004916) con el 74% del volumen → EMA50 (0.004655) y trendline (0.00462) perdidas de vuelta → mínimo del 25 Sep. Si cierra sobre 0.004916 con $300M+, el +1M es el rango 0.0049–0.0055 y el sesgo vuelve a alcista.' },
      { d: 90, h: '+3M', target: 0.00348, how: 'Mínimo del 14 Sep, el último de la escalera de agosto–septiembre. Es el escenario de revenue de memes cayendo con el mercado; si el revenue hace máximos mientras el precio baja, el +3M vuelve a la EMA20 (0.0049).' },
      { d: 365, h: '+1Y', target: 0.0032, how: '61.8% del tramo junio → octubre (0.0012 → 0.00652), que hoy coincide con la EMA200 (0.00331). Solo si la manía se apaga y el buyback no alcanza; con el ciclo de memes de vuelta, el +1Y recupera 0.00652.' },
    ],
    levels: {
      resistance: [[0.004916, 'INVALIDACIÓN bajista · EMA20 · 1.2% sobre el cierre del 21 Oct'], [0.00502, 'Cierre 14 Oct'], [0.00546, 'Mínimo 10 Oct · invalidación vieja'], [0.00563, 'Cierre 12 Oct'], [0.00652, 'Máximo 5 Oct · máximo del año'], [0.0071, 'Máximo Oct-25']],
      support: [[0.004856, 'Cierre 21 Oct · techo del rebote hasta ahora'], [0.004655, 'EMA50 — recuperada el 21 Oct · el precio está acá'], [0.00462, 'Trendline de junio — barrida el 18–20 Oct, recuperada el 21 Oct · stop del rebote'], [0.00448, 'Cierre 20 Oct'], [0.004163, 'Cierre 19 Oct · mínimo de la caída'], [0.003995, 'EMA100'], [0.00385, 'Mínimo 25 Sep · +1M · último mínimo creciente'], [0.00348, 'Mínimo 14 Sep · +3M'], [0.0032, 'EMA200 + 61.8% junio → octubre · +1Y'], [0.00267, 'Mínimo 17 Ago']],
    },
  },
  sources: 'Network telemetry: DefiLlama (pump.fun fees/revenue, PumpSwap volume).',
  rule: 'revenue mensual <40% del pico + buyback cayendo = salir del todo (no hay tesis de largo plazo sin volumen de memes); revenue en máximos con buyback ≥ 2% del supply/mes = mantener.',
  forecast: {
    updated: '21 Sep 2026', score1m: 52, score3m: 58,
    body: [
      '<b>1M · 52/100.</b> El buyback mas agresivo de Solana y de casi todo cripto: <b>$446.65M acumulados al 3 Sep, 16.38% del supply original quemado</b>, con revenue de 90 dias en ~$1.21M/dia. PUMP y HYPE juntos son ~90% de los $638M en buybacks de cripto en 2026. El mecanismo funciona y es visible on-chain — pero el activo sigue siendo trade-the-cycle: sin mania de memes, el revenue se apaga y el buyback con el.',
      '<b>3M · 58/100.</b> Mejora a 3M por la misma logica de siempre: el buyback compone si el revenue sostiene, y la rotacion alt (si BTC.D afloja) le pega primero a los tokens con caja. La regla de la casa queda intacta: revenue <40% del pico + buyback cayendo = salir del todo.',
      '<b>Invalidacion ·</b> volumen de memes migrando de chain o de launchpad, buyback reducido por la DAO, o tesoreria/equipo apareciendo en CEX.',
    ],
  },
  thesis: [
    '<b>Qué es.</b> Pump.fun es el launchpad de memecoins de Solana y, desde 2025, también el AMM (PumpSwap) donde gradúan. Cobra fee sobre cada trade del bonding curve y del AMM. Revenue en SOL, enorme en los picos del ciclo, y una parte se usa para comprar PUMP en el mercado.',
    '<b>La tesis.</b> No es una inversión de largo plazo: es el activo con más beta al ciclo de memes de Solana. Cuando hay manía, el revenue es de los más altos de todo cripto y el buyback es visible en el chart; cuando no, se apaga. La estructura de supply (ICO de $600M, tesorería enorme, 33% en equipo/inversores) añade overhang permanente.',
    '<b>Lo que valida.</b> Revenue mensual volviendo a máximos, buyback sostenido (≥1–2% del supply/mes), PumpSwap ganando share vs Raydium/Meteora en tokens graduados.',
    '<b>Lo que rompe.</b> Volumen de memes migrando a otra chain o a otro launchpad (BONK/LetsBonk, etc.), regulación sobre launchpads, buyback reducido, o tesorería/equipo vendiendo. El riesgo reputacional (lawsuits) es estructural.',
  ],
  network: {
    title: 'fees · revenue · PumpSwap volume (DefiLlama)',
    note: 'Fees = cobrado en bonding curves + PumpSwap (monthly sum). Revenue = parte del protocolo (fuente del buyback). Volume = swaps en PumpSwap.',
    metrics: [
      { key: 'revenue', label: 'Protocol revenue', source: 'llama-fees', slug: 'pump.fun', dataType: 'dailyRevenue', unit: 'usd', primary: true },
      { key: 'fees', label: 'Total fees', source: 'llama-fees', slug: 'pump.fun', dataType: 'dailyFees', unit: 'usd' },
      { key: 'swapvol', label: 'PumpSwap volume', source: 'llama-dex', slug: 'pumpswap', unit: 'usd' },
    ],
  },
  onchain: {
    mint: 'pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H7Dfn', supply: 1_000_000_000_000, decimals: 6, treasuryPct: 3,
    labels: {},
    programs: {},
    staking: null,
    read: ({ chain, d, fmtNum, pctS }) => {
      const ho = chain.holders; if (!ho) return 'Holders scan unavailable.';
      const tr = ho.treasuryLike, ex = ho.exchange, daily = d?.price && d?.vol24 ? d.vol24 / d.price : null;
      return `<b>PUMP tiene el overhang más grande de los cinco.</b> ${pctS(tr)} del supply en wallets sin etiqueta ≥3%: tesorería, equipo (20%) e inversores (13%) con vesting, más la reserva de ecosistema. No hay staking que lockee nada. <div style="margin-top:6px"><b>Exchanges:</b> ${fmtNum(ex)} PUMP (${pctS(ex)}) en CEX etiquetados${daily ? `, ≈${(ex / daily).toFixed(1)} días de volumen` : ''}. El float que circula es ICO + airdrop + mercado secundario — y el buyback compra contra eso.</div><div style="margin-top:6px"><b>Decisión:</b> › el único número: <b>buyback mensual / supply circulante</b>. ≥1.5%/mes sostiene el precio aunque el revenue caiga; &lt;0.5%/mes y el overhang gana. › Wallets de tesorería moviéndose a CEX = salir el mismo día. › No hay razón para holdear PUMP en un ciclo sin memes: es trade, no inversión.</div>`;
    },
  },
  tripwires: ({ M, chain, trend, fc }) => [
    tw.metric(M, 'revenue', { good: 75, watch: 40 }),
    tw.metric(M, 'fees', { good: 75, watch: 40 }),
    tw.metric(M, 'swapvol', { good: 70, watch: 40 }),
    tw.concentration(chain, { exchangeWarnPct: 10, treasuryWarnPct: 35 }),
    tw.trend(trend, fc),
    tw.custom('watch', '◦', 'Buyback intensity', 'El buyback se financia con revenue; sin tesis de largo plazo, la intensidad del buyback (% del supply/mes) es lo único que sostiene el precio entre ciclos. Mirar la wallet de buyback on-chain, no anuncios.'),
    tw.custom('watch', '◦', 'Launchpad share', 'BONK/LetsBonk, Bags y otros launchpads compiten por el mismo flujo. Si la share de launches de Pump.fun cae bajo 50% sostenido, el revenue no vuelve a máximos aunque el ciclo vuelva.'),
  ],
  decision: decisionBuilder('PUMP', {
    flips: ({ net, U }) => {
      const r = net?.revenue;
      return [
        `<b>Ciclo de memes activo</b>: revenue mensual ${r?.peak ? `sobre <b>${U(r.peak * 0.75)}</b> (hoy ${U(r.latest)})` : 'en máximos'} con share de launchpad estable. Sin esto, no hay caso.`,
        `Buyback ≥1.5% del supply circulante por mes, verificable on-chain.`,
        `Tesorería / inversores moviéndose a exchanges = salir sin esperar el chart. En PUMP esto es lo que más rápido rompe el precio.`,
        `Launchpad share cayendo bajo 50% = el revenue no vuelve aunque el ciclo vuelva. Reducir.`,
      ];
    },
  }),
};
