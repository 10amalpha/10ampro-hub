import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'pump', name: 'Pump.fun', symbol: 'PUMP', cgId: 'pump-fun', host: 'mercados.10am.pro/pump',
  sector: 'Solana memecoin launchpad & AMM',
  tagline: 'Revenue de launches + PumpSwap, buyback agresivo — el token más ligado al ciclo de memes.',
  description: 'Pump.fun ($PUMP) en vivo: fees y revenue del launchpad y PumpSwap, buyback, supply overhang on-chain (tesorería, ICO, exchanges), TA con forecast y tripwires. 10AMPRO.',
  stance: 'trade-the-cycle', reviewed: '13 Oct 2026',
  ta: {
    updated: '13 Oct 2026', bias: 'BEAR',
    read: 'El trigger se dio. El 13 Oct cerró 0.004969, bajo 0.0050 — la EMA20 (0.00533) perdida con margen y el mínimo del 10 Oct (0.00546) también — con −11.7% en una vela; hoy 0.00492. El plan del 11 Oct era claro: cierre bajo 0.0050 anula el sesgo. Se anula. Lo que lo hace pesar más es el relativo: −22.6% en siete días con SOL −11.7%, el doble del mercado, en un token cuyo revenue depende de la actividad de memes que se apaga primero cuando el mercado corrige. Cuatro de siete (era seis): perdió la 20 y el MACD; sigue sobre la EMA50 (0.00469, 5% abajo) y la EMA200 (0.00323, +18% en 20 días). RSI 37. La tendencia desde junio existe todavía — los mínimos crecientes 0.0014 → 0.0027 → 0.0035 → 0.00385 no se tocaron — pero el impulso de octubre falló: 0.00652 el 5 Oct fue un máximo del año que no se sostuvo ni una semana, y devolver más de la mitad del tramo 0.00385 → 0.00652 (0.00519) en seis sesiones es distribución, no pullback. Volumen $222M hoy, debajo del promedio de 20 días ($316M): la caída no tiene pánico, tiene ausencia de compradores. Sesgo bajista hasta que recupere 0.00546 al cierre; con trade-the-cycle como stance, esto es reducir, no promediar.',
    pattern: '<b>Impulso de octubre fallido dentro de la tendencia de junio.</b> Mínimos crecientes 0.0014 → 0.0027 → 0.0035 → 0.00385 (25 Sep), trendline hoy en 0.0044. El 5 Oct (0.00652) rompió el techo de Oct-25 (0.0071 quedó sin tocar) y seis sesiones después el precio devolvió el 55% del tramo 0.00385 → 0.00652. Un máximo del año que no aguanta una semana es un máximo de agotamiento, no de ruptura. La EMA50 (0.00469) y la trendline (0.0044) son el primer soporte real; el mínimo del 25 Sep (0.00385) es el último antes de que la tendencia de junio se rompa.',
    watch: '<b>0.00469 y 0.00546.</b> Abajo: la EMA50 (0.00469) es el primer piso y la trendline (0.0044) el segundo; cierre bajo 0.0044 abre 0.00385 directo. Arriba: cierre sobre 0.00546 (mínimo del 10 Oct, con la EMA20 recuperada) anula el sesgo bajista y vuelve a poner el pullback en tendencia. <b>Volumen:</b> $222M en la caída, debajo del promedio — un rebote con $150M es cortos cerrando; un día de $400M+ bajo 0.0047 es la salida de los que compraron el máximo. <b>Revenue:</b> la capa de network manda: si el revenue cayó más que el precio esta semana, el buyback tiene menos con qué comprar y el piso de la EMA50 no vale.',
    decision: [
      'Con posición: <b>reducir en los rebotes a 0.0052–0.0054</b> (EMA20) mientras no cierre sobre 0.00546. Lo que quede, con stop en el cierre bajo 0.0044 (trendline): ahí la tendencia de junio deja de ser argumento.',
      'Sin posición: <b>nada</b> hasta un cierre sobre 0.00546 con volumen, o un retest de 0.0044–0.0047 (trendline + EMA50) que aguante con el revenue en máximos — y aun ahí, 25% del tamaño. Trade-the-cycle: el ciclo acaba de decir que no.',
      'Trigger único que anula el sesgo bajista: <b>cierre diario &gt; 0.00546</b> con volumen sobre el promedio → 0.00563 (cierre 12 Oct) → 0.00652.',
    ],
    invalidation: { level: 0.00546, text: 'Cierre diario sobre 0.00546 (mínimo del 10 Oct, con la EMA20 en 0.00533 recuperada) anula el path bajista → 0.00563 (cierre del 12 Oct) y 0.00652 (máximo del 5 Oct).' },
    path: [
      { d: 30, h: '+1M', target: 0.0044, how: 'Rebote a la EMA20 (0.0052–0.0053) que falla → EMA50 (0.00469) → trendline de mínimos desde junio en 0.0044. Con el revenue sosteniendo $1M+/día, el retest de 0.0044 aguanta; sin eso, no.' },
      { d: 90, h: '+3M', target: 0.00385, how: 'Mínimo del 25 Sep: el tramo de octubre devuelto entero. Es el escenario de revenue de memes cayendo con el mercado; si el revenue hace máximos mientras el precio baja, el +3M vuelve a 0.0052–0.0055.' },
      { d: 365, h: '+1Y', target: 0.00348, how: 'Mínimo del 14 Sep, el último de la escalera de agosto–septiembre. Solo si la manía se apaga y el buyback no alcanza; con el revenue en máximos y el ciclo de memes de vuelta, el +1Y recupera 0.00652.' },
    ],
    levels: {
      resistance: [[0.00533, 'EMA20 — perdida el 13 Oct'], [0.00546, 'INVALIDACIÓN · mínimo 10 Oct'], [0.00563, 'Cierre 12 Oct'], [0.00623, 'Cierre 8 Oct'], [0.00652, 'Máximo 5 Oct · máximo del año'], [0.0071, 'Máximo Oct-25']],
      support: [[0.00497, 'Cierre 13 Oct'], [0.00469, 'EMA50'], [0.0044, 'Trendline de mínimos desde junio'], [0.00385, 'Mínimo 25 Sep'], [0.00348, 'Mínimo 14 Sep'], [0.00323, 'EMA200 — subiendo 18%/20d']],
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
