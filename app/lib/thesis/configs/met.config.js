import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'met', name: 'Meteora', symbol: 'MET', cgId: 'meteora', host: 'mercados.10am.pro/met',
  sector: 'Solana liquidity layer (DLMM / DAMM)',
  tagline: 'TVL, volumen y fees de la capa de liquidez — con buyback y 52% del supply todavía por emitir.',
  description: 'Meteora ($MET) en vivo: TVL, volumen DLMM/DAMM, fees y revenue, unlocks y buyback, supply overhang on-chain, TA con forecast y tripwires. 10AMPRO.',
  stance: 'hold-trim-at-0.50', reviewed: '23 Oct 2026',
  ta: {
    updated: '23 Oct 2026', bias: 'BULL',
    read: 'El cuarto test de 0.33 llegó a 0.001 y en vivo ya está debajo. El 22 Oct cerró 0.3579 — +5.8%, el cierre más alto desde el 17 Oct — sobre la EMA20 (0.3531 entonces), que era el nivel de arriba de la lectura: el cierre sobre la EMA20 con $60M reabría el caso; con $12M era el rebote llegando a la media, y ahí se reducía. El 23 Oct cerró 0.331, −7.5%: la EMA20 devuelta en una vela, el rebote entero devuelto y más (0.3384 → 0.3579 → 0.331), y el cierre a 0.001 de 0.33 — 0.3% de margen, que en esta página se escribe como cumplido: siete de ocho niveles a menos del 1% se cerraron en la sesión siguiente, y hoy 0.3295 ya está debajo intradía. El sesgo queda alcista por regla hasta que el cierre imprima bajo 0.33; la lectura se escribe como si ya lo hubiera hecho. El volumen fue $6.75M, 11% del promedio de 20 días ($63.9M) — el más bajo del mes por cuarta vez: el cierre sobre la EMA20 del 22 Oct no trajo los $60M y la devolución tampoco trajo vendedores; el 0.33 lo prueba un libro vacío por cuarta vez, y la diferencia con las tres anteriores es que esta vez llegó desde arriba, después de fallar en la media. Cuatro de siete sin cambio: el precio sobre la 50 (0.3137) y la 200 (0.2395, +13% en 20 días), la 50 sobre la 200 y la 200 subiendo; faltan la EMA20 (0.3498), el RSI sobre 50 y el MACD, negativo y todavía ampliándose. RSI 25.4, desde 18.6 — sigue bajo 30 después de un +5.8% y un −7.5%; el oscilador ya había descontado la caída la semana pasada y el precio ahora lo alcanza. Relativo: −10.4% en siete días con SOL −2.5%, 4× el mercado — el peor múltiplo de la página esta semana junto con 2Z; en el día, −7.5% con SOL −3.2%, 2.3×: la beta en contra de vuelta, sin ningún día de demanda propia desde el 8 Oct. Lo que cambió: el rebote a la EMA20 que la lectura pedía para reducir llegó (0.3579) y se vendió solo; 0.33 va por el cuarto test con el precio ya debajo en vivo. Lo que no cambió: el gap del 8 Oct fue un evento, el volumen no existe y la única pregunta sigue teniendo la misma respuesta. El sesgo alcista por regla sobrevive a 0.001 de la invalidación; se escribe como si no.',
    pattern: '<b>Tendencia alcista con mínimos crecientes desde junio; el gap del 8 Oct devuelto, el rebote a la EMA20 vendido en una sesión y 0.33 en el cuarto test — en vivo debajo:</b> 0.0975 → 0.129 → 0.157 → 0.185 → 0.2942 (3 Oct). El gap (0.3278 → 0.4447) se devolvió el 83% al cierre del 18 Oct, se llenó intradía (0.3206) y aguantó tres cierres sobre 0.33 (0.3349 / 0.3377 / 0.3384) con el 18% del volumen; el 22 Oct (0.3579) cerró sobre la EMA20 por primera vez desde el 17 Oct y el 23 Oct (0.331, −7.5%) devolvió todo con el 11% del volumen. Un rebote a la media que se vende entero al día siguiente sin volumen es la EMA20 confirmada como techo, no como soporte recuperado. La estructura es la escalera desde junio, con la EMA50 (0.3137) y el mínimo del 3 Oct (0.2942) como los niveles que la sostienen debajo de 0.33; encima, la EMA20 (0.3498) y 0.3809 (máximo del 28 Sep) son el techo. Si el cierre imprime bajo 0.33, el gap queda lleno al cierre y el 8 Oct fue un evento: 0.3137 y 0.2942 son el camino.',
    watch: '<b>0.33 y 0.3498.</b> Abajo: el cierre bajo 0.33 — a 0.001, en vivo ya debajo — llena el gap al cierre y cumple la invalidación: ahí el sesgo pasa a bajista y la EMA50 (0.3137) y 0.2942 son el +1M; con $50M+ llega rápido. Arriba: el cierre de vuelta sobre la EMA20 (0.3498) con $60M+ reabre el caso — el del 22 Oct fue con $7M y duró un día. <b>Volumen:</b> $6.75M, 11% del promedio, el más bajo del mes — cuatro tests de 0.33 sin volumen no son un piso defendido; si vuelven $200M con el precio bajo 0.33, es la distribución del unlock del 23 Sep. <b>RSI:</b> 25.4, bajo 30 por segunda revisión con el precio ya cayendo — sobreventa real, no indicador adelantado; vale como señal solo con una vela verde con volumen desde 0.3137–0.2942. <b>Relativo:</b> MET −10.4% vs SOL −2.5% en la semana (4×) y −7.5% vs −3.2% en el día: beta en contra, ningún día propio desde el 8 Oct. <b>Buyback:</b> la wallet auditable sigue siendo lo único que convierte el 8 Oct en tesis.',
    decision: [
      'Con posición: <b>no sumar; el rebote a la EMA20 ya se vendió</b> — 0.3579 el 22 Oct era el lugar de reducir y el 23 Oct lo confirmó devolviéndolo entero. Lo que quede, con stop en el cierre bajo 0.3137 (EMA50): el cierre bajo 0.33 se escribe como hecho (a 0.001, en vivo debajo) y ahí 0.3137–0.2942 es el camino; no promediar en 0.32 porque llenó el gap.',
      'Sin posición: <b>nada hasta que la EMA50 decida</b>. La próxima entrada es el retest de 0.3137–0.2942 (EMA50 + mínimo del 3 Oct) que aguante al cierre con vela de rechazo y $50M+, 25% del tamaño y el stop en el cierre bajo 0.2942 — o el cierre de vuelta sobre 0.3498 con $60M+. Comprar 0.33 en el cuarto test es comprar un nivel que tres veces aguantó sin volumen y la cuarta llegó desde arriba, después de fallar en la media.',
      'Trigger único que anula el sesgo: <b>cierre diario &lt; 0.33</b> = gap lleno al cierre; está a 0.001 y en vivo ya pasó. Ahí el 8 Oct fue un evento → 0.3137 (EMA50) → 0.2942 (mínimo del 3 Oct) → 0.256.',
    ],
    invalidation: { level: 0.33, text: 'Cierre diario bajo 0.33 llena el gap del 8 Oct al cierre (base 0.3278; intradía se llenó el 18 Oct; tres cierres sobre el nivel el 19–21 Oct, rebote a 0.3579 el 22 Oct y 0.331 el 23 Oct, a 0.001, con el precio en vivo debajo) = el movimiento fue un evento, no una tendencia → 0.3137 (EMA50) y 0.2942 (mínimo post-unlock del 3 Oct); debajo, 0.256 (meseta de septiembre, piso de la tesis).' },
    path: [
      { d: 30, h: '+1M', target: 0.3498, how: 'Rebote desde 0.33 que llega a la EMA20 — ya pasó una vez (0.3579, 22 Oct) y se vendió — donde se reduce. Con 0.33 cerrado (a 0.001), el +1M es 0.3137–0.2942 y el sesgo pasa a bajista.' },
      { d: 90, h: '+3M', target: 0.3809, how: 'Máximo del 28 Sep, el techo que defendía el gap. Requiere la EMA20 recuperada con volumen y el buyback trimestral ejecutado desde la wallet auditable; sin eso, 0.3498 es el techo del trimestre.' },
      { d: 365, h: '+1Y', target: 0.4447, how: 'Retest del máximo del 8 Oct. Solo con el revenue del sector dejando de contraerse y dos buybacks consecutivos; sin eso, 0.3809 es el techo del año y 0.50–0.56 (mitad y 78.6% de la caída Oct-25 → Jun-26) salen del horizonte.' },
    ],
    levels: {
      resistance: [[0.3349, 'Cierre 19 Oct'], [0.3384, 'Cierre 21 Oct'], [0.348, 'Cierre 18 Oct'], [0.3498, 'EMA20 — cerrada el 22 Oct, devuelta el 23 Oct · +1M · donde se reduce'], [0.3579, 'Cierre 22 Oct · techo del rebote'], [0.37, 'Cierre 17 Oct'], [0.3809, 'Máximo 28 Sep · +3M'], [0.3856, 'Cierre 14 Oct'], [0.4447, 'Máximo 8 Oct · +1Y'], [0.50, 'Mitad de la caída Oct-Nov 25'], [0.687, 'ATH 23 Oct 25']],
      support: [[0.331, 'Cierre 23 Oct · cuarto test de 0.33 · a 0.001'], [0.33, 'INVALIDACIÓN · gap lleno al cierre · en vivo debajo'], [0.3278, 'Cierre 7 Oct · base del gap — llena intradía el 18 Oct (0.3206), no al cierre'], [0.3137, 'EMA50 · primer nivel de la escalera · stop'], [0.2942, 'Mínimo 3 Oct · post-unlock'], [0.2668, 'EMA100'], [0.256, 'Meseta de septiembre · piso de la tesis'], [0.2395, 'EMA200 — subiendo 13%/20d']],
    },
  },
  sources: 'Network telemetry: DefiLlama (Meteora TVL, DEX volume, fees, revenue). Unlocks: Tokenomist via CoinGecko.',
  rule: 'revenue mensual <50% del pico + unlock mensual no absorbido en 72h = reducir; buyback trimestral ≥ unlocks del trimestre = mantener aunque el chart esté feo.',
  catalyst: {
    title: 'Unlock de la Ecosystem Reserve',
    date: '23 Sep 2026 — ABSORBIDO: ningún cierre bajo 0.256, mínimo post-unlock 0.2942 (3 Oct), +36% el 8 Oct · 55.06% del supply desbloqueado',
    body: [
      '<b>Que pasa.</b> El proximo unlock del calendario de MET cae el 23 de septiembre y va a la Ecosystem Reserve — la misma reserva del 34% que ya es el bloque mas grande del overhang. Con 55.06% del supply desbloqueado, cada tramo nuevo compite por los mismos compradores. El contexto no ayuda: las fees on-chain del sector DEX cayeron 57% interanual en Q2 y Meteora es parte de esa caida.',
      '<b>El contrapeso.</b> La wallet de buyback existe y es auditable (FzULv8…EJtoG9): el que quiera verificar si la tesoreria esta comprando, puede. La regla de la casa aplica tal cual esta escrita abajo: unlock no absorbido en 72h = reducir; buyback trimestral cubriendo unlocks = mantener aunque el chart este feo.',
      '<b>LECTURA ·</b> Este unlock no es sorpresa — esta en el calendario desde el TGE. Lo que importa no es el dia, es la semana. <b>Decision:</b> › mirar el precio 72h post-23 Sep contra el nivel previo, no el candle del dia. › el proximo anuncio de buyback trimestral es el tripwire que manda. › Ecosystem Reserve moviendose a CEX despues del unlock = salir sin esperar el chart.',
    ],
  },
  forecast: {
    updated: '21 Sep 2026', score1m: 34, score3m: 40,
    body: [
      '<b>1M · 34/100.</b> Capado por el unlock del 23 Sep y por un revenue de sector en contraccion (fees DEX -57% interanual en Q2). El stance sigue siendo wait-for-unlock-absorption: no hay apuro en ser el comprador del float nuevo.',
      '<b>3M · 40/100.</b> Mejora si pasan dos cosas verificables: buyback trimestral anunciado y ejecutado desde la wallet auditable, y PumpSwap sin comerle el flujo de long-tail que es ~50% de las fees. El volumen DEX de Solana en maximos ($10B+/semana) es la marea que lo puede levantar — si el share aguanta.',
      '<b>Invalidacion ·</b> unlock del 23 Sep no absorbido en 72h, buyback salteado un trimestre, o share de volumen cayendo contra PumpSwap.',
    ],
  },
  thesis: [
    '<b>Qué es.</b> Meteora es la capa de liquidez de Solana: DLMM (liquidez concentrada dinámica), DAMM v2, vaults y el launchpad que usa buena parte del long tail (incluido PumpFun). Cobra 5–20% de las fees de cada pool como revenue del protocolo.',
    '<b>La tesis.</b> MET es un token de revenue real con dos problemas de supply: 52% del total vesting lineal a 6 años (equipo + reserva) y un TGE que salió con 48% en circulación. El buyback trimestral (Q4-25: $10M USDC, 2.3% del supply) es el contrapeso. La tesis funciona si el buyback absorbe los unlocks y el revenue se sostiene sin depender del ciclo de memecoins.',
    '<b>Lo que valida.</b> Revenue mensual estable aunque caiga el volumen de memes (diversificación), TVL creciendo en SOL, buyback trimestral anunciado y ejecutado on-chain, MET staked (Comet Points) creciendo.',
    '<b>Lo que rompe.</b> ~50% de las fees vienen de PumpFun/long-tail: si ese flujo migra a PumpSwap u otro AMM, el revenue se parte. Unlocks diarios (~7.3M MET/mes) sin demanda, o buyback suspendido.',
  ],
  network: {
    title: 'TVL · DEX volume · fees · revenue (DefiLlama)',
    note: 'Volume = swaps en pools Meteora (monthly sum). Revenue = take del protocolo (5–20% de fees). TVL en USD — sube con SOL.',
    metrics: [
      { key: 'revenue', label: 'Protocol revenue', source: 'llama-fees', slug: 'meteora', dataType: 'dailyRevenue', unit: 'usd', primary: true },
      { key: 'fees', label: 'Total fees', source: 'llama-fees', slug: 'meteora', dataType: 'dailyFees', unit: 'usd' },
      { key: 'volume', label: 'DEX volume', source: 'llama-dex', slug: 'meteora', unit: 'usd' },
      { key: 'tvl', label: 'TVL', source: 'llama-tvl', slug: 'meteora', unit: 'usd' },
    ],
  },
  onchain: {
    mint: 'METvsvVRapdj9cFLzq4Tr43xK4tAjQfwX76z3n6mWQL', supply: 1_000_000_000, decimals: 6, treasuryPct: 3,
    labels: {},
    programs: {},
    staking: { manual: { label: 'Staked MET (Comet)', total: null, source: 'app.meteora.ag — referral staking program', note: 'Ver app.meteora.ag para total staked' } },
    read: ({ chain, d, fmtNum, pctS }) => {
      const ho = chain.holders; if (!ho) return 'Holders scan unavailable.';
      const tr = ho.treasuryLike, ex = ho.exchange, ve = ho.vesting, daily = d?.price && d?.vol24 ? d.vol24 / d.price : null;
      return `<b>MET es una carrera entre unlocks y buyback.</b> 52% del supply (equipo 18% + reserva 34%) vesting lineal a 6 años ≈ <b>7.3M MET/mes</b> entrando al float. ${pctS(tr)} del supply está en wallets sin etiqueta ≥3% (reserva de ecosistema, equipo) y ${pctS(ve)} en cuentas tipo vesting. <div style="margin-top:6px"><b>Exchanges:</b> ${fmtNum(ex)} MET (${pctS(ex)}) en CEX etiquetados${daily ? `, ≈${(ex / daily).toFixed(1)} días de volumen` : ''}. Binance/OKX/Coinbase dan liquidez para absorber unlocks; el problema no es el float, es quién compra el float nuevo.</div><div style="margin-top:6px"><b>Decisión:</b> › el número que manda: <b>buyback del trimestre vs 22M MET de unlocks</b> del trimestre. Si el buyback lo cubre, HOLD; si no, el precio baja por aritmética. › Reserva de ecosistema moviéndose a CEX = salir. › Staked MET subiendo con el precio bajando = acumulación; con el precio subiendo = fin del ciclo de farming.</div>`;
    },
  },
  tripwires: ({ M, chain, trend, fc }) => [
    tw.metric(M, 'revenue', { good: 80, watch: 50 }),
    tw.metric(M, 'volume', { good: 70, watch: 45 }),
    tw.metric(M, 'tvl', { good: 85, watch: 60 }),
    tw.concentration(chain, { exchangeWarnPct: 10, treasuryWarnPct: 30 }),
    tw.trend(trend, fc),
    tw.custom('watch', '◦', 'Buyback vs unlocks', 'Q4-25: $10M USDC de buyback ≈ 2.3% del supply. Unlocks ≈ 7.3M MET/mes (0.73%/mes). El buyback cubre los unlocks solo si se sostiene cada trimestre. Tripwire pasa a ✓ con el siguiente anuncio ejecutado on-chain, a ! si se salta un trimestre.'),
    tw.custom('watch', '◦', 'Dependencia de PumpFun', '~50% de las fees vienen de long-tail / PumpFun. Si PumpSwap internaliza ese flujo, el revenue de Meteora se parte. Mirar share de volumen Meteora vs PumpSwap, no solo el total.'),
  ],
  decision: decisionBuilder('MET', {
    flips: ({ net, U }) => {
      const r = net?.revenue;
      return [
        `<b>Buyback trimestral ≥ unlocks del trimestre</b>, ejecutado on-chain desde la wallet única anunciada. Ahí MET deja de ser dilutivo en la práctica.`,
        `Revenue mensual ${r?.peak ? `volviendo sobre <b>${U(r.peak * 0.8)}</b> (hoy ${U(r.latest)})` : 'en máximos'} sin depender del ciclo de memecoins (share PumpFun bajando, revenue estable).`,
        `Reserva de ecosistema moviéndose a exchanges = salir sin esperar el chart.`,
        `Buyback suspendido o reducido = la única defensa contra 6 años de vesting se cae. Reducir.`,
      ];
    },
  }),
};
