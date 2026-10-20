import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'pump', name: 'Pump.fun', symbol: 'PUMP', cgId: 'pump-fun', host: 'mercados.10am.pro/pump',
  sector: 'Solana memecoin launchpad & AMM',
  tagline: 'Revenue de launches + PumpSwap, buyback agresivo — el token más ligado al ciclo de memes.',
  description: 'Pump.fun ($PUMP) en vivo: fees y revenue del launchpad y PumpSwap, buyback, supply overhang on-chain (tesorería, ICO, exchanges), TA con forecast y tripwires. 10AMPRO.',
  stance: 'trade-the-cycle', reviewed: '20 Oct 2026',
  ta: {
    updated: '18 Oct 2026', bias: 'BEAR',
    read: 'La trendline de junio se perdió al cierre. El 17 Oct cerró 0.004534, plano sobre la línea (0.0045) — el test —, y el 18 Oct 0.00434, 3.6% debajo: la tendencia de mínimos crecientes desde el ATL (0.0012) dejó de ser argumento. Hoy 0.004216, −6.4%, sexta sesión seguida para abajo desde 0.005016. El tramo 0.00385 → 0.00652 devolvió el 86%; el objetivo de un impulso que devuelve más de tres cuartos es su base, y está a 9%. Tres de siete sin cambios — la EMA200 subiendo (0.00328, +17% en 20 días) y la 50 sobre la 200: la tendencia larga existe en las medias, no en el precio, que está 9% debajo de la EMA50 (0.00465) y 16% debajo de la EMA20 (0.00499), con el MACD negativo y ampliándose. RSI 9.4 — desde 18 ayer y 37 el 16 Oct — la lectura más baja del token desde que cotiza: no es un dato a favor, es la misma foto que 2Z lleva dos semanas mostrando con el precio en mínimos cada día. La sobreventa en un token de memes que devolvió el 86% del impulso es el permiso para un rebote técnico, y el rebote es para salir. Volumen $111M, 39% del promedio de 20 días ($285M): la trendline se rompió con menos volumen que cualquier día de la caída — nadie la defendió y nadie vendió con pánico; la actividad del token se está apagando, que es exactamente lo que la capa de revenue debería estar mostrando. Relativo: −25% en siete días con SOL −6.7%, 3.7× el mercado, el peor de la página por cuarta revisión seguida. Con trade-the-cycle como stance, el ciclo ya dijo que no: la trendline rota convierte la tendencia de junio en un rango 0.0032–0.0050, y el precio está yendo a buscar la base.',
    pattern: '<b>Impulso de octubre devuelto; la trendline de junio rota el 18 Oct.</b> Mínimos crecientes 0.0014 → 0.0027 → 0.0035 → 0.00385 (25 Sep), trendline hoy en 0.00454 — el cierre del 18 Oct (0.00434) quedó debajo y hoy el precio 7% debajo. El 5 Oct (0.00652) fue un máximo de agotamiento: trece sesiones después devolvió el 86% del tramo desde 0.00385 y perdió la EMA20 (13 Oct), la EMA50 (16 Oct) y la trendline (18 Oct). Lo que queda de la estructura es el mínimo del 25 Sep (0.00385), el último mínimo creciente; debajo, el 14 Sep (0.00348) y la EMA200 (0.00328), que coincide con el 61.8% de todo el tramo junio → octubre. Con la trendline rota, la tendencia de junio es un rango 0.0032–0.0050 hasta que el precio recupere la EMA20; un rebote desde acá con RSI 9 es el que toca la trendline desde abajo y falla.',
    watch: '<b>0.00385 y 0.0045.</b> Abajo: cierre bajo 0.00385 (mínimo del 25 Sep) cumple el +1M y abre 0.00348 directo — la escalera de agosto-septiembre entera en juego. Arriba: la trendline rota (0.0045) y la EMA50 (0.00465) son el techo del rebote de sobreventa; el que anula el sesgo bajista es un cierre sobre la EMA20 (0.00499) con volumen sobre $300M. <b>RSI:</b> 9.4 — la lectura más baja del token; el rebote técnico que suele traer vale para reducir en 0.0045–0.0050, no para sumar, mientras el volumen no supere $300M. <b>Volumen:</b> $111M, 39% del promedio; un rebote con $150M es cortos cerrando; un día de $400M+ bajo 0.00385 es la salida de los que compraron sobre 0.006, y ahí empieza la watchlist. <b>Revenue:</b> la capa de network manda — si el revenue diario bajó con el precio, el buyback no sostiene 0.00385 y 0.00348 llega rápido. <b>Relativo:</b> 3.7× SOL en la semana, peor de la página; el día que PUMP suba con SOL plano, el ciclo volvió a abrirse. Hasta ahí, no.',
    decision: [
      'Con posición: <b>reducir en cualquier rebote a 0.0045–0.0050</b> (trendline rota, EMA50 y EMA20) — con RSI 9 ese rebote es probable, y es la salida. Lo que quede, con stop en el cierre bajo 0.00385 (mínimo del 25 Sep): ahí el último mínimo creciente cedió y el siguiente nivel es 0.00348.',
      'Sin posición: <b>nada</b>. La watchlist empieza en 0.00385 con volumen de capitulación ($400M+) y el revenue en máximos; la entrada por fuerza es el cierre sobre 0.00499 con volumen sobre $300M. Comprar con RSI 9 y el volumen a un tercio es comprar el rebote técnico de una tendencia que acaba de romperse.',
      'Trigger único que anula el sesgo bajista: <b>cierre diario &gt; 0.00499</b> (EMA20, con la trendline y la EMA50 recuperadas en el camino) con volumen sobre el promedio → 0.00546 (mínimo 10 Oct) → 0.00652.',
    ],
    invalidation: { level: 0.00499, text: 'Cierre diario sobre 0.00499 (EMA20, con la trendline de junio en 0.0045 y la EMA50 en 0.00465 recuperadas en el camino) anula el path bajista: la ruptura del 18 Oct queda como un barrido → 0.00546 (mínimo del 10 Oct) y 0.00652 (máximo del 5 Oct).' },
    path: [
      { d: 30, h: '+1M', target: 0.00385, how: 'Trendline de junio rota (18 Oct) → mínimo del 25 Sep, el tramo de octubre devuelto entero. Con el revenue sosteniendo $1M+/día y un rebote con volumen desde 0.00385, el +1M es 0.00385–0.0045.' },
      { d: 90, h: '+3M', target: 0.00348, how: 'Mínimo del 14 Sep, el último de la escalera de agosto–septiembre. Es el escenario de revenue de memes cayendo con el mercado; si el revenue hace máximos mientras el precio baja, el +3M vuelve a la EMA20 (0.0050).' },
      { d: 365, h: '+1Y', target: 0.0032, how: '61.8% del tramo junio → octubre (0.0012 → 0.00652), que hoy coincide con la EMA200 (0.00328). Solo si la manía se apaga y el buyback no alcanza; con el ciclo de memes de vuelta, el +1Y recupera 0.00652.' },
    ],
    levels: {
      resistance: [[0.00434, 'Cierre 18 Oct · el día de la ruptura'], [0.0045, 'Trendline de junio — rota el 18 Oct · techo del rebote'], [0.00465, 'EMA50'], [0.00477, 'Cierre 15 Oct'], [0.00499, 'INVALIDACIÓN bajista · EMA20'], [0.00502, 'Cierre 14 Oct'], [0.00546, 'Mínimo 10 Oct · invalidación vieja'], [0.00563, 'Cierre 12 Oct'], [0.00652, 'Máximo 5 Oct · máximo del año'], [0.0071, 'Máximo Oct-25']],
      support: [[0.00395, 'EMA100'], [0.00385, 'Mínimo 25 Sep · +1M · último mínimo creciente'], [0.00348, 'Mínimo 14 Sep · +3M'], [0.0032, 'EMA200 + 61.8% junio → octubre · +1Y'], [0.00267, 'Mínimo 17 Ago']],
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
