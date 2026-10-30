import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'pump', name: 'Pump.fun', symbol: 'PUMP', cgId: 'pump-fun', host: 'mercados.10am.pro/pump',
  sector: 'Solana memecoin launchpad & AMM',
  tagline: 'Revenue de launches + PumpSwap, buyback agresivo — el token más ligado al ciclo de memes.',
  description: 'Pump.fun ($PUMP) en vivo: fees y revenue del launchpad y PumpSwap, buyback, supply overhang on-chain (tesorería, ICO, exchanges), TA con forecast y tripwires. 10AMPRO.',
  stance: 'trade-the-cycle', reviewed: '30 Oct 2026',
  ta: {
    updated: '30 Oct 2026', bias: 'BEAR',
    read: 'El stop del remanente se cerró con margen y la EMA100 se perdió en la misma vela. Después del 23 Oct el precio hizo tres cierres laterales (0.004312, 0.004231, 0.004278) y tres verdes (0.004353, 0.004533 el 29 Oct, +4.1%) que llegaron a 1% de la EMA50 y a 2% de la EMA20 sin tocar ninguna — un rebote de seis sesiones de +7% con menos del promedio de volumen. El 30 Oct cerró 0.00394, −13.1%: todo el rebote devuelto y 9% más en una vela, 5.4% debajo de 0.004163 (cierre del 19 Oct, el mínimo de la caída y el stop del remanente — cumplido) y 2.7% debajo de la EMA100 (0.004048), que no estaba en ninguna lectura porque el precio nunca había llegado; mínimo de 30 días al cierre, el cierre más bajo desde el 25 Sep (0.00385, el +1M, a 2.3%). Hoy 0.004069, +3.3%: una impresión verde 0.5% sobre la EMA100 y 2.3% debajo de 0.004163 — la media está siendo probada en vivo, y el nivel perdido queda arriba. Volumen $302M, 172% del promedio de 20 días ($175M, que está en el 83% del de 90): la barra más grande en tres semanas, roja — no son los $400M que la lectura pedía para llamar capitulación bajo 0.004163, pero es la primera vez en la caída que una ruptura viene con volumen y no con dos tercios del promedio. Tres de siete, sin cambio: el precio sobre la 200 (0.00342, +7.8% en 20 días), la 50 sobre la 200 y la 200 subiendo; debajo de la EMA20 (0.004538), de la 50 (0.004549) y de la 100 (0.004048) — y la 20 cruzó debajo de la 50 hoy, justo sobre el cierre del 29 Oct (0.004533): el techo del rebote, la EMA20 y la EMA50 son ahora un solo racimo a 0.4% de ancho. RSI 42.9, desde 44.9 — el motor lo imprime así, dos puntos abajo con una vela de −13%: se cita como imprime, y no dice sobreventa; el rebote técnico desde 9.4 (18 Oct) se gastó entero y el oscilador quedó a mitad de camino. El histograma del MACD sigue negativo y achicándose (−0.00006), con el precio en mínimos nuevos: sola, no es señal. Relativo: −10.4% en siete días con SOL −7.2%, 1.4× — la semana arranca en 0.004548 (23 Oct) — el múltiplo más bajo de las alts de la página; en el día, −13.1% con SOL −6.7%, 2×: el día fue del mercado entero (SOL con $5.8B, el doble de su promedio) y PUMP lo cayó al doble, con su propio volumen. Lo que cambió: el stop se cumplió con margen y con la primera barra grande de la caída, la EMA100 se perdió al cierre, la EMA20 cruzó bajo la EMA50 y el techo del rebote (0.004533) quedó marcado como el pivote nuevo. Lo que no cambió: el impulso de octubre devuelto (ahora en un 97%), 0.00385 a 2% con nada en el medio, y el revenue como la única variable que convierte 0.00385 en piso. La invalidación baja de 0.005126 a 0.004533: el cierre del 29 Oct, el techo del rebote de seis sesiones, con la EMA20 (0.004538) y la EMA50 (0.004549) encima — un máximo decreciente de verdad, no un número. Trade-the-cycle ya salió; lo que esto decide es dónde se vuelve a mirar: en 0.00385 con $400M+ y una vela que cierre arriba.',
    pattern: '<b>Impulso de octubre devuelto en un 97%; trendline de junio rota dos veces, el mínimo de la caída (0.004163) cerrado con volumen y la EMA100 perdida; el rebote de seis sesiones marcó el pivote (0.004533) con la EMA20 cruzando bajo la EMA50 encima.</b> Mínimos crecientes 0.0014 → 0.0027 → 0.0035 → 0.00385 (25 Sep); la trendline de junio (hoy ~0.0047) se rompió el 18 Oct, se recuperó el 21 y se rompió de vuelta el 23 Oct — dejó de ser soporte y hoy es techo junto con las medias. El 5 Oct (0.00652) sigue siendo un máximo de agotamiento; el tramo desde 0.00385 devolvió el 86% (0.004163, 19 Oct), recuperó el 36% hasta 0.005126 (22 Oct), lo devolvió en una vela, lateralizó seis sesiones hasta 0.004533 (29 Oct) con menos del promedio y el 30 Oct cayó −13.1% con $302M hasta 0.00394: el 97% del impulso devuelto, 0.004163 cerrado por 5.4% y la EMA100 (0.004048) perdida. Hoy 0.004069, de vuelta sobre la media por 0.5% en vivo. Un rebote de seis sesiones con menos del promedio que no toca ninguna media y se devuelve con −13% y la barra más grande en tres semanas es distribución terminando, no un piso formándose; el piso de esta estructura es 0.00385 — el último mínimo creciente, a 2% — y se compra con $400M+ y una vela que cierre arriba, o no se compra. Encima, 0.004048 (EMA100) y 0.004163 (el mínimo cerrado) son el techo inmediato, 0.004533–0.004549 (cierre del 29 Oct + EMA20 + EMA50, el racimo y la invalidación) el segundo, 0.00468–0.0047 (la trendline rota) el tercero, 0.005126 (techo del rebote del 22 Oct) el cuarto; debajo, 0.00385, 0.00348 (14 Sep) y 0.0032 (61.8% junio → octubre, con la EMA200 en 0.00342 pegada).',
    watch: '<b>0.00385 y 0.004163.</b> Abajo: 0.00385 (mínimo del 25 Sep, el último mínimo creciente y el +1M) está a 2% del cierre; con $400M+ y vela de rechazo que cierre arriba es la capitulación donde empieza la watchlist — hoy hubo $302M y una vela roja que cerró en el mínimo: tres cuartos del volumen, y la vela equivocada. El cierre bajo 0.00385 con volumen deja la estructura de agosto–septiembre sin mínimos crecientes y abre 0.00348 y 0.0032 (EMA200) sin nada en el medio. Arriba: 0.004048 (EMA100) y 0.004163 (el mínimo cerrado) son el primer techo, 1–2% arriba — recuperados al cierre con $300M+ verdes, el 30 Oct fue un barrido; el que anula el sesgo bajista es el cierre sobre 0.004533 (cierre del 29 Oct, el techo del rebote, con la EMA20 en 0.004538 y la EMA50 en 0.004549 encima — un racimo de 0.4%) con $300M+; 0.0047 (trendline rota) y 0.005126 después. <b>RSI:</b> 42.9 — el motor lo imprime dos puntos abajo con una vela de −13%; se cita así; ni sobreventa ni fuerza. Sobre 50 con el precio sobre 0.004533 cambia la foto. <b>Volumen:</b> $302M, 172% del promedio — la primera ruptura de la caída con volumen; $400M+ con vela roja bajo 0.00385 es la capitulación; $300M+ con vela verde sobre 0.004163, el barrido. <b>Medias:</b> la EMA20 cruzó bajo la EMA50 justo en el techo del rebote: el racimo 0.004533–0.004549 es el techo que importa. <b>Revenue:</b> la capa de network manda — si el revenue diario hizo máximos mientras el precio devolvía 13%, el buyback sostiene 0.00385; si no, el rebote fue solo chart. <b>Relativo:</b> −10.4% vs SOL −7.2% en la semana (1.4×, el múltiplo más bajo de las alts), −13.1% vs −6.7% en el día (2×): el día fue del mercado, PUMP lo cayó al doble.',
    decision: [
      'Con posición: <b>el stop del remanente se cumplió — cierre bajo 0.004163, por 5.4%, con $302M</b>: lo que quedaba después de la salida del 22–23 Oct salió en el cierre del 30 Oct o sale en el rebote a 0.004048–0.004163 (EMA100 + el mínimo cerrado), que es el primer techo, 1–2% arriba. No se repone en 0.0040 porque es la EMA100: el precio la perdió al cierre con la barra más grande en tres semanas y la impresión verde de hoy no la recuperó con volumen — y 0.00385 está a 2% con nada en el medio, que es exactamente lo que trade-the-cycle no quiere tener.',
      'Sin posición: <b>nada</b>. La watchlist de abajo empieza en 0.00385 con volumen de capitulación ($400M+) y vela de rechazo que cierre arriba — 25% del tamaño, stop en el cierre bajo 0.00348; hoy el nivel está a 2% y la vela fue la contraria con tres cuartos del volumen. La entrada por fuerza es el cierre sobre 0.004533 (el racimo del techo del rebote + EMA20 + EMA50) con $300M+ y el revenue en máximos. Comprar 0.0040 porque ya cayó 13% es comprar la EMA100 el día que se pierde con volumen, con el último mínimo creciente a 2% y sin la vela.',
      'Trigger único que anula el sesgo bajista: <b>cierre diario &gt; 0.004533</b> (cierre del 29 Oct, el techo del rebote de seis sesiones, con la EMA20 en 0.004538 y la EMA50 en 0.004549 encima — se recuperan en la misma vela) con volumen sobre $300M → 0.0047 (trendline rota) → 0.005126 (techo del rebote del 22 Oct) → 0.00546 (mínimo 10 Oct) → 0.00652.',
    ],
    invalidation: { level: 0.004533, text: 'Cierre diario sobre 0.004533 (cierre del 29 Oct, el techo del rebote de seis sesiones que se devolvió con −13%; la EMA20 en 0.004538 y la EMA50 en 0.004549 están encima y se recuperan en la misma vela; la EMA100 en 0.004048 y 0.004163 son los escalones hasta ahí) con volumen sobre $300M anula el path bajista: el 30 Oct queda como un barrido del mínimo del 19 Oct y la tendencia de junio sigue → 0.0047 (trendline rota), 0.005126 (techo del rebote del 22 Oct) y 0.00652 (máximo del 5 Oct).' },
    path: [
      { d: 30, h: '+1M', target: 0.00385, how: 'Mínimo del 25 Sep, el último mínimo creciente: 0.004163 (mínimo de la caída, el stop) cerrado el 30 Oct por 5.4% con $302M y la EMA100 (0.004048) perdida en la misma vela → 0.00385, a 2%, sin nada en el medio. Es donde empieza la watchlist, con $400M+ y una vela que cierre arriba. Si cierra sobre 0.004533 con $300M+, el +1M es el rango 0.0047–0.0051 y el sesgo vuelve a alcista.' },
      { d: 90, h: '+3M', target: 0.00348, how: 'Mínimo del 14 Sep, el último de la escalera de agosto–septiembre: el escenario de 0.00385 perdido con volumen y el revenue de memes cayendo con el mercado; si el revenue hace máximos mientras el precio baja, el +3M vuelve al racimo 0.0045 (EMA20 + EMA50) desde abajo.' },
      { d: 365, h: '+1Y', target: 0.0032, how: '61.8% del tramo junio → octubre (0.0012 → 0.00652), que hoy coincide con la EMA200 (0.00342). Solo si la manía se apaga y el buyback no alcanza; con el ciclo de memes de vuelta, el +1Y recupera 0.00652.' },
    ],
    levels: {
      resistance: [[0.004048, 'EMA100 — perdida el 30 Oct · probada desde abajo en vivo'], [0.004163, 'Cierre 19 Oct · mínimo de la caída · stop del remanente — cumplido el 30 Oct por 5.4%'], [0.004533, 'INVALIDACIÓN bajista · cierre 29 Oct · techo del rebote de seis sesiones'], [0.004538, 'EMA20 — cruzó bajo la EMA50 el 30 Oct'], [0.004549, 'EMA50 — perdida el 23 Oct · el rebote llegó a 1%'], [0.0047, 'Trendline de junio — rota el 18 Oct, recuperada el 21, rota de vuelta el 23 Oct'], [0.00502, 'Cierre 14 Oct'], [0.005126, 'Cierre 22 Oct · techo del rebote · invalidación vieja'], [0.00546, 'Mínimo 10 Oct'], [0.00563, 'Cierre 12 Oct'], [0.00652, 'Máximo 5 Oct · máximo del año'], [0.0071, 'Máximo Oct-25']],
      support: [[0.004069, 'Hoy · 0.5% sobre la EMA100 · el precio está acá'], [0.00394, 'Cierre 30 Oct · mínimo de 30 días al cierre · $302M, 172% del promedio'], [0.00385, 'Mínimo 25 Sep · +1M · último mínimo creciente · la watchlist, con $400M+'], [0.00348, 'Mínimo 14 Sep · +3M · stop de la próxima entrada'], [0.00342, 'EMA200 — subiendo 7.8%/20d'], [0.0032, '61.8% junio → octubre · +1Y'], [0.00267, 'Mínimo 17 Ago']],
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
