import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'pump', name: 'Pump.fun', symbol: 'PUMP', cgId: 'pump-fun', host: 'mercados.10am.pro/pump',
  sector: 'Solana memecoin launchpad & AMM',
  tagline: 'Revenue de launches + PumpSwap, buyback agresivo — el token más ligado al ciclo de memes.',
  description: 'Pump.fun ($PUMP) en vivo: fees y revenue del launchpad y PumpSwap, buyback, supply overhang on-chain (tesorería, ICO, exchanges), TA con forecast y tripwires. 10AMPRO.',
  stance: 'trade-the-cycle', reviewed: '22 Sep 2026',
  ta: {
    updated: '22 Sep 2026', bias: 'BULL',
    read: 'Siete de siete en el tablero, pero el detalle que importa es el RSI en 52 con el precio +25% en la semana: el impulso de junio a agosto (0.0012 → 0.0052, 4×) se convirtió en un rango de 0.0035–0.0052 y este rebote es la tercera visita a la mitad de arriba. La EMA200 sube 11% en 20 días — la tendencia de fondo más fuerte de la página — y los mínimos crecientes son limpios (0.0012 → 0.0014 → 0.0027 → 0.0035). Lo que falta: un cierre sobre 0.0052 (máximo del 24 Ago). Hasta que no aparezca, esto es comprar abajo del rango y vender arriba, que es exactamente lo que dice el stance. El buyback pone piso, no techo.',
    pattern: '<b>Rango de un mes dentro de una tendencia alcista.</b> Línea de soporte 0.0012 (26 Jun) → 0.0035 (14 Sep), 3 toques, hoy en ~0.0037. Sin techo en la estructura salvo el máximo del 24 Ago (0.0052) y el 0.0071 de Oct-25. Altura del rango 0.0017 → medida 0.0069 si rompe arriba, 0.0018 si rompe abajo (la EMA200 en 0.0028 llega antes).',
    watch: '<b>0.0052.</b> El día que cierre arriba con 2× volumen, el rango deja de existir y el objetivo es 0.0069–0.0071. Sin ese cierre, 0.0045–0.0052 es zona de vender, no de sumar. <b>Volumen:</b> 145% del 90d, $235M el día del rebote — hay flujo. <b>Revenue:</b> el de 90 días está en ~$1.2M/día; si el ritmo de buyback cae un 40% desde el pico, el piso técnico de 0.0035 deja de tener sostén fundamental y el rango rompe abajo. <b>Memes:</b> mirá si el volumen de launches migra de plataforma antes de mirar el chart.',
    decision: [
      'Con posición: <b>mantener mientras cierre sobre 0.0035</b>. Trade-the-cycle: parcial en 0.0050–0.0052 sin ruptura confirmada, recompra en 0.0037–0.0040.',
      'Sin posición: <b>0.0037–0.0040</b> (trendline + EMA20) es la entrada del rango; o cierre &gt; 0.0052 con 2× volumen para el breakout. Nunca en 0.0045–0.0050, la mitad muerta.',
      'Trigger único que anula el sesgo: <b>cierre diario &lt; 0.0035</b>. Ahí el rango rompe abajo y la EMA200 (0.0028) y 0.0027 (mínimo 17 Ago) son los objetivos.',
    ],
    invalidation: { level: 0.0035, text: 'Cierre diario bajo 0.0035 (mínimo del 14 Sep y trendline de mínimos) rompe el rango para abajo → 0.0028 (EMA200) y 0.0027 (mínimo 17 Ago).' },
    path: [
      { d: 30, h: '+1M', target: 0.0052, how: 'Retest del máximo del 24 Ago. La tercera visita al techo del rango suele romper si el volumen expande; si no, se vende ahí.' },
      { d: 90, h: '+3M', target: 0.0071, how: 'Medida del rango (0.0069) y máximo de Oct-25 (0.0071). Requiere revenue sosteniendo $1M+/día para que el buyback siga poniendo piso.' },
      { d: 365, h: '+1Y', target: 0.0088, how: 'Retest del ATH de Sep-25. Solo con manía de memes de vuelta: sin ella, el revenue se apaga y el +1Y es 0.0052.' },
    ],
    levels: {
      resistance: [[0.00506, 'Máximo de 30 días'], [0.005225, 'Máximo 24 Ago · techo del rango'], [0.0071, 'Máximo Oct-25 · medida del rango'], [0.0088, 'ATH Sep-25']],
      support: [[0.004055, 'EMA20'], [0.00372, 'Trendline de mínimos · entrada del rango'], [0.003662, 'EMA50'], [0.0035, 'INVALIDACIÓN · mínimo 14 Sep'], [0.002757, 'EMA200'], [0.002666, 'Mínimo 17 Ago']],
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
