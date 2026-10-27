import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'pump', name: 'Pump.fun', symbol: 'PUMP', cgId: 'pump-fun', host: 'mercados.10am.pro/pump',
  sector: 'Solana memecoin launchpad & AMM',
  tagline: 'Revenue de launches + PumpSwap, buyback agresivo — el token más ligado al ciclo de memes.',
  description: 'Pump.fun ($PUMP) en vivo: fees y revenue del launchpad y PumpSwap, buyback, supply overhang on-chain (tesorería, ICO, exchanges), TA con forecast y tripwires. 10AMPRO.',
  stance: 'trade-the-cycle', reviewed: '26 Oct 2026',
  ta: {
    updated: '23 Oct 2026', bias: 'BEAR',
    read: 'La EMA20 se cerró y al día siguiente se perdieron la EMA20, la EMA50 y la trendline en una vela. El 22 Oct cerró 0.005126 — +5.6%, tercer cierre verde seguido, +23% desde 0.004163 (19 Oct) — 4.3% sobre 0.004916, la invalidación bajista, y sobre 0.00502 (cierre del 14 Oct): por regla, el sesgo pasó a alcista con ese cierre. El 23 Oct cerró 0.004548, −11.3%: debajo de la EMA20 (0.004879), de la EMA50 (0.004661) y de la trendline de junio (0.00468) en una sola vela — el stop que la lectura ponía al rebote (cierre bajo 0.00462) se cumplió el día después de que el trigger alcista se cumpliera. Hoy 0.004575, +0.6%. Un cierre sobre la media que define el sesgo que dura exactamente una sesión y se devuelve con −11% es una ruptura falsa, y una ruptura falsa en la EMA20 deja el sesgo donde estaba: bajista, con el pivote nuevo en 0.005126. El volumen fue $154.5M, 69% del promedio de 20 días ($225M) — ni la ruptura ni la devolución trajeron los $300M que la lectura pedía; el 20 días sigue 9% sobre el 90 días. Tres de siete, desde cuatro: el precio perdió la 50 de vuelta; quedan el precio sobre la 200 (0.00334, +13% en 20 días), la 50 sobre la 200 y la 200 subiendo. RSI 36.6, desde 27.7 — salió de la sobreventa con el rebote y la caída de −11% apenas lo movió: el rebote técnico desde 9.4 ya se gastó entero. El histograma del MACD sigue negativo, achicándose por cuarta sesión. Relativo: +2.8% en siete días con SOL −2.5% — PUMP le ganó a SOL en la semana por primera vez desde el 5 Oct, y lo devolvió en un día: −11.3% con SOL −3.2%, 3.5× el mercado en la caída, el múltiplo propio de siempre. Lo que cambió: el techo del rebote está marcado (0.005126) y la trendline de junio se perdió por segunda vez en una semana — dos rupturas en cinco sesiones ya no son un barrido, son una línea que dejó de sostener. Lo que no cambió: el impulso de octubre sigue devuelto en un 86%, el +1M (0.00385) tiene camino directo de vuelta y el volumen nunca confirmó nada en ninguna dirección. Trade-the-cycle dijo reducir en 0.0045–0.0050; el rebote fue hasta 0.0051 y volvió a 0.0045: la salida se dio.',
    pattern: '<b>Impulso de octubre devuelto; trendline de junio rota el 18 Oct, recuperada el 21 Oct y rota de vuelta el 23 Oct — ruptura falsa sobre la EMA20.</b> Mínimos crecientes 0.0014 → 0.0027 → 0.0035 → 0.00385 (25 Sep), trendline hoy en 0.00468: perdida tres cierres (18–20 Oct), recuperada dos (0.004856, 0.005126) y perdida de vuelta con 0.004548 (23 Oct). Una línea que se rompe dos veces en cinco sesiones dejó de ser soporte: el último mínimo creciente (0.00385) es el único piso estructural que queda. El 5 Oct (0.00652) sigue siendo un máximo de agotamiento; el tramo desde 0.00385 devolvió el 86%, recuperó el 36% hasta 0.005126 y devolvió eso en una vela. Encima, la EMA50 (0.004661) y la trendline (0.00468) son techo inmediato, la EMA20 (0.004879) el segundo y 0.005126 el pivote que anula el sesgo; debajo, 0.004163 (cierre del 19 Oct) y 0.00385 sin nada en el medio. Un rebote de +23% con dos tercios del volumen que se devuelve en una sesión es la forma de una distribución, no de un piso.',
    watch: '<b>0.004163 y 0.005126.</b> Abajo: el cierre bajo 0.004163 (mínimo de la caída) deja el rebote del 20–22 Oct como la vela de distribución y abre 0.00385 directo; con $400M+ es la capitulación que empieza la watchlist. Arriba: la trendline (0.00468) y la EMA50 (0.004661) son el primer techo, 2% arriba; el que anula el sesgo bajista es el cierre sobre 0.005126 (cierre del 22 Oct) con $300M+ — un cierre sobre la EMA20 (0.004879) solo, ya se vio lo que dura. <b>RSI:</b> 36.6 — ni sobreventa ni fuerza; el rebote desde 9.4 se gastó; sobre 50 con el precio sobre 0.005126 cambia la foto. <b>Volumen:</b> $154.5M, 69% del promedio; ruptura y devolución sin volumen — el día que aparezcan $400M con vela roja bajo 0.004163 es la capitulación; con vela verde sobre 0.005126, la vuelta. <b>Revenue:</b> la capa de network manda — si el revenue diario hizo máximos mientras el precio devolvía 11%, el buyback sostiene 0.00385; si no, el rebote fue solo chart. <b>Relativo:</b> +2.8% vs SOL −2.5% en la semana, −11.3% vs −3.2% en el día: ganó la semana y la devolvió en una sesión, 3.5× el mercado.',
    decision: [
      'Con posición: <b>la salida se dio — el rebote llegó a 0.005126 y volvió</b>. Lo que quede, con stop en el cierre bajo 0.004163 (mínimo del 19 Oct): ahí 0.00385 vuelve a estar abierto y es lo que trade-the-cycle no quiere tener. No se repone en 0.0045 porque ya cayó 11%: la trendline se rompió dos veces en una semana.',
      'Sin posición: <b>nada</b>. La entrada por fuerza se disparó por precio el 22 Oct (cierre sobre 0.004916) sin los $300M y el 23 Oct la dejó −11%: si la tomaste, el stop es el cierre bajo 0.004163. La entrada nueva es el cierre sobre 0.005126 con $300M+ y el revenue en máximos; la watchlist de abajo sigue en 0.00385 con volumen de capitulación ($400M+).',
      'Trigger único que anula el sesgo bajista: <b>cierre diario &gt; 0.005126</b> (cierre del 22 Oct, el techo del rebote, con la EMA20 en 0.004879 debajo) con volumen sobre $300M → 0.00546 (mínimo 10 Oct) → 0.00563 (cierre 12 Oct) → 0.00652.',
    ],
    invalidation: { level: 0.005126, text: 'Cierre diario sobre 0.005126 (cierre del 22 Oct, el techo del rebote; la EMA20 en 0.004879 y el cierre del 14 Oct en 0.00502 son los escalones hasta ahí) con volumen sobre $300M anula el path bajista: el 23 Oct queda como un barrido y la tendencia de junio sigue → 0.00546 (mínimo del 10 Oct) y 0.00652 (máximo del 5 Oct).' },
    path: [
      { d: 30, h: '+1M', target: 0.00385, how: 'Trendline (0.00468) y EMA50 (0.004661) perdidas el 23 Oct con dos tercios del volumen → cierre bajo 0.004163 → mínimo del 25 Sep. Si cierra sobre 0.005126 con $300M+, el +1M es el rango 0.0049–0.0055 y el sesgo vuelve a alcista.' },
      { d: 90, h: '+3M', target: 0.00348, how: 'Mínimo del 14 Sep, el último de la escalera de agosto–septiembre. Es el escenario de revenue de memes cayendo con el mercado; si el revenue hace máximos mientras el precio baja, el +3M vuelve a la EMA20 (0.0049).' },
      { d: 365, h: '+1Y', target: 0.0032, how: '61.8% del tramo junio → octubre (0.0012 → 0.00652), que hoy coincide con la EMA200 (0.00334). Solo si la manía se apaga y el buyback no alcanza; con el ciclo de memes de vuelta, el +1Y recupera 0.00652.' },
    ],
    levels: {
      resistance: [[0.004661, 'EMA50 — perdida el 23 Oct'], [0.00468, 'Trendline de junio — rota el 18 Oct, recuperada el 21, rota de vuelta el 23 Oct'], [0.004879, 'EMA20 — cerrada el 22 Oct, perdida el 23 Oct'], [0.00502, 'Cierre 14 Oct'], [0.005126, 'INVALIDACIÓN bajista · cierre 22 Oct · techo del rebote'], [0.00546, 'Mínimo 10 Oct · invalidación vieja'], [0.00563, 'Cierre 12 Oct'], [0.00652, 'Máximo 5 Oct · máximo del año'], [0.0071, 'Máximo Oct-25']],
      support: [[0.004548, 'Cierre 23 Oct · el precio está acá'], [0.00448, 'Cierre 20 Oct'], [0.004163, 'Cierre 19 Oct · mínimo de la caída · stop del remanente'], [0.004024, 'EMA100'], [0.00385, 'Mínimo 25 Sep · +1M · último mínimo creciente'], [0.00348, 'Mínimo 14 Sep · +3M'], [0.0032, 'EMA200 + 61.8% junio → octubre · +1Y'], [0.00267, 'Mínimo 17 Ago']],
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
