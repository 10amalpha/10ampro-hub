import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'pump', name: 'Pump.fun', symbol: 'PUMP', cgId: 'pump-fun', host: 'mercados.10am.pro/pump',
  sector: 'Solana memecoin launchpad & AMM',
  tagline: 'Revenue de launches + PumpSwap, buyback agresivo — el token más ligado al ciclo de memes.',
  description: 'Pump.fun ($PUMP) en vivo: fees y revenue del launchpad y PumpSwap, buyback, supply overhang on-chain (tesorería, ICO, exchanges), TA con forecast y tripwires. 10AMPRO.',
  stance: 'trade-the-cycle', reviewed: '22 Sep 2026',
  ta: {
    updated: '11 Oct 2026', bias: 'BULL',
    read: '+46% en el mes y −10% en la semana: eso es lo que parece un pullback en tendencia, no un techo. El 5 Oct hizo 0.00652 — el máximo del año, por encima del techo de Oct-25 (0.0071 quedó como el siguiente, no como el anterior) — y devolvió a 0.0055 en cuatro sesiones, parándose en la EMA20 (0.00543) con RSI 56. Seis de siete; lo único rojo es el MACD, que gira negativo cuando el precio deja de subir y no dice más que eso. La EMA200 sube 19% en 20 días: es el chart con más pendiente de la página. El +1M de 0.0052 del 22 Sep se cumplió y se pasó; el +3M de 0.0071 quedó a 8%. Volumen 165% del 90d en el promedio, pero $146M hoy es el día más bajo del mes contra $579M el máximo: la corrección se está secando, que es lo que uno quiere ver. Lo que no dice el chart: revenue. Si la actividad de memes bajó con el mercado esta semana, el buyback diario pone menos piso del que el chart sugiere — la capa de network lo dice antes que el precio.',
    pattern: '<b>Tendencia alcista desde el mínimo de junio</b> (0.0012, 26 Jun): mínimos crecientes 0.0014 → 0.0027 → 0.0035 → 0.00385 (25 Sep), trendline hoy en 0.0043. El 5 Oct (0.00652) rompió el techo de Oct-25 y es el máximo del año — no hay resistencia estructural hasta 0.0071 y el ATH (0.0088). La corrección de la semana es la primera desde el 25 Sep y devolvió el 38% del tramo 0.00385 → 0.00652: retroceso de libro, mientras la EMA20 aguante.',
    watch: '<b>0.00543.</b> Mientras la EMA20 aguante al cierre, la corrección es un pullback; dos cierres debajo y el nivel pasa a ser la EMA50 (0.00467). <b>Volumen:</b> hoy $146M, el más bajo del mes — la corrección se seca, bien. Lo que lo rompe: un día de $400M+ con cierre bajo 0.0054 — ahí el pullback era distribución. <b>Revenue:</b> la capa de network dice si el buyback diario tiene con qué comprar; si el revenue cayó más que el precio esta semana, el piso real está más abajo que el chart.',
    decision: [
      'Con posición: <b>mantener; parcial en 0.0071</b> (máximo Oct-25) si llega sin el revenue en máximos. Sumar en 0.0050–0.0054 (EMA20) con el 0.00385 intacto.',
      'Sin posición: <b>la entrada es 0.0052–0.0054</b>, 25% del tamaño objetivo, con el volumen seco. Segundo tramo en el cierre sobre 0.00652 con volumen. Nada a 0.0062 persiguiendo el máximo.',
      'Trigger único que anula el sesgo: <b>cierre diario &lt; 0.0050</b>. Ahí la EMA20 falló → 0.00467 (EMA50) → 0.00434 (trendline) → 0.00385.',
    ],
    invalidation: { level: 0.0050, text: 'Cierre diario bajo 0.0050 (pierde la EMA20 y el mínimo del 10 Oct con margen) anula el path → 0.00467 (EMA50), 0.00434 (trendline de mínimos) y 0.00385 (mínimo del 25 Sep).' },
    path: [
      { d: 30, h: '+1M', target: 0.0065, how: 'Retest del máximo del 5 Oct desde la EMA20. Con el volumen seco en la corrección y expandiendo en la subida es continuación; al revés, es doble techo.' },
      { d: 90, h: '+3M', target: 0.0071, how: 'Máximo de Oct-25, el siguiente techo histórico. Requiere revenue sosteniendo $1M+/día para que el buyback siga poniendo piso bajo cada pullback.' },
      { d: 365, h: '+1Y', target: 0.0088, how: 'Retest del ATH de Sep-25. Solo con manía de memes de vuelta: sin ella, el revenue se apaga y el +1Y es el rango 0.0052–0.0065.' },
    ],
    levels: {
      resistance: [[0.0059, 'Cierre 1 Oct · zona 0.0058–0.0062'], [0.00623, 'Cierre 8 Oct'], [0.00652, 'Máximo 5 Oct · máximo del año'], [0.0071, 'Máximo Oct-25'], [0.0088, 'ATH Sep-25']],
      support: [[0.00546, 'Mínimo 10 Oct'], [0.00543, 'EMA20 · zona de sumar'], [0.0050, 'INVALIDACIÓN · EMA20 con margen'], [0.00467, 'EMA50'], [0.00434, 'Trendline de mínimos desde junio'], [0.00385, 'Mínimo 25 Sep'], [0.00318, 'EMA200 — subiendo 19%/20d']],
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
