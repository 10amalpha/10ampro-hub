import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'met', name: 'Meteora', symbol: 'MET', cgId: 'meteora', host: 'mercados.10am.pro/met',
  sector: 'Solana liquidity layer (DLMM / DAMM)',
  tagline: 'TVL, volumen y fees de la capa de liquidez — con buyback y 52% del supply todavía por emitir.',
  description: 'Meteora ($MET) en vivo: TVL, volumen DLMM/DAMM, fees y revenue, unlocks y buyback, supply overhang on-chain, TA con forecast y tripwires. 10AMPRO.',
  stance: 'hold-trim-at-0.50', reviewed: '29 Oct 2026',
  ta: {
    updated: '29 Oct 2026', bias: 'BEAR',
    read: 'La EMA50 se recuperó dos cierres, se perdió en el tercero y el +1M llegó en vivo. El 27 Oct cerró 0.3206 — +6.9%, la impresión que la lectura anterior tenía en vivo quedó impresa: 2.6% sobre la EMA50 — y el 28 Oct 0.32 (−0.2%): dos cierres sobre la media, el motor en cuatro de siete (NEUTRAL) esos dos días, y el rebote que la lectura mandaba vender llegó justo al primer nivel (0.3278, base del gap) sin tocarlo — se quedó a 2%. El 29 Oct cerró 0.3079, −3.8%: 1.4% debajo de la EMA50 (0.3123), el motor de vuelta en tres de siete — el cierre decidió, y decidió que el 26 Oct no fue un barrido sino el primer cierre de tres bajo la media. Hoy 0.2941, −7.5%: 0.2942 — el mínimo del 3 Oct, el último mínimo creciente de la escalera de junio y el +1M de la lectura — empatado al diezmilésimo, mínimo de 30 días en vivo; a esa distancia en esta página se escribe como alcanzado. Volumen $10.2M, 30% del promedio de 20 días ($34.1M, bajando desde $62M a medida que salen los días del 8–10 Oct; el promedio real cuando terminen de salir es $26M): el rebote a 0.32 con $11M, la devolución con $10M y el +1M alcanzado con lo mismo — nadie compró la media y nadie la vendió; el precio bajó solo. RSI 25.9, desde 29.4 — quinta revisión bajo 30 sin cruzar: el rebote de dos cierres no alcanzó para sacarlo y la caída de hoy lo devolvió al sótano. El histograma del MACD sigue negativo, achicándose por tercera sesión con el precio en mínimos: la caída frenó de velocidad, no de dirección. Tres de siete, sin cambio al cierre: el precio sobre la 200 (0.2412, +10.7% en 20 días), la 50 sobre la 200 y la 200 subiendo; debajo de la EMA20 (0.3306, que cayó bajo la invalidación 0.3384 y es ahora el primer escalón), de la 50 (0.3123) y a 8% de la 100 (0.2714). Relativo: −12.7% en siete días con SOL −3.5%, 3.6× — la semana pasada 1.3× porque la ventana había soltado la ruptura; esta arranca en el rebote del 22 Oct (0.3579) y MET lo devolvió todo y más. En el día, −7.5% con SOL −2.3%: 3.3×, el peor de la página en el día. Lo que cambió: la EMA50 aguantó dos cierres y se perdió en el tercero (0.3079), el rebote no llegó a 0.3278, el motor volvió a tres de siete al cierre, y 0.2942 — el último mínimo de la escalera — está alcanzado en vivo con el 30% del volumen. Lo que no cambió: el volumen no existe en ninguna dirección, el RSI no sale de la sobreventa, y la wallet del buyback sigue sin ser auditable. La invalidación sigue en 0.3384 — el techo de los tres cierres que aguantaron 0.33; la EMA20 (0.3306) cayó debajo y es el primer escalón, la base del gap (0.3278) el segundo. El +1M pasa a la EMA100 (0.2714): si 0.2942 se cierra, entre el mínimo del 3 Oct y la media no hay un cierre que sostenga; debajo, 0.256 (meseta de septiembre) sigue siendo el piso de la tesis y el +3M.',
    pattern: '<b>Tendencia alcista con mínimos crecientes desde junio; el gap del 8 Oct lleno al cierre (24 Oct), 0.33 cerrado en el cuarto test, la EMA50 cerrada (26 Oct), recuperada dos cierres (27–28 Oct), perdida de vuelta (29 Oct) y el último mínimo de la escalera (0.2942) alcanzado en vivo:</b> 0.0975 → 0.129 → 0.157 → 0.185 → 0.2942 (3 Oct). El gap (0.3278 → 0.4447) se devolvió el 83% al cierre del 18 Oct, aguantó tres cierres sobre 0.33 (0.3349 / 0.3377 / 0.3384) con el 18% del volumen, rebotó a la EMA20 (0.3579, 22 Oct) con el 11% y devolvió todo en cuatro velas hasta 0.2998 (26 Oct, 4% bajo la EMA50); rebotó dos cierres sobre la media (0.3206, 0.32) sin llegar a la base del gap (0.3278) y la perdió de vuelta en el tercero (0.3079, 29 Oct); hoy 0.2941, empatado con 0.2942. Una media que se cierra, se recupera dos días con el 19% del volumen y se pierde de vuelta con el 30% es una media que dejó de ordenar el precio; un rebote que no llega al primer techo (0.3278) y se devuelve entero en una impresión es la continuación, y el precio llegó al último mínimo creciente de la escalera de junio con el libro vacío — ni la capitulación ($50M+ con vela roja) ni la defensa (vela de rechazo con volumen). Lo que queda de la escalera de junio es este nivel; debajo, la EMA100 (0.2714) es el +1M y 0.256 (meseta de septiembre) el piso de la tesis. Arriba, 0.3079 (el cierre que perdió la media) y la EMA50 (0.3123) son el primer techo, 0.32–0.3206 (los dos cierres sobre la media) el segundo, 0.3278 (base del gap) el tercero, 0.3306–0.3384 (EMA20 + el nivel perdido + los tres cierres que lo aguantaron) el racimo que anula el sesgo, y 0.3579 el techo del rebote del 22 Oct.',
    watch: '<b>0.2942 y 0.3384.</b> Abajo: 0.2942 (mínimo del 3 Oct, el último de la escalera de junio) es el precio — empatado en vivo, escrito como alcanzado; el cierre que lo aguante con vela de rechazo y $50M+ es la única entrada que queda (25%, stop en el cierre bajo la EMA100, 0.2714), y el cierre debajo abre la EMA100 (0.2714, el +1M nuevo) y 0.256 sin un nivel en el medio; con $50M+ y vela roja bajo 0.2942 es la capitulación, y ahí empieza la watchlist. Arriba: 0.3079–0.3123 (el cierre que perdió la media + la EMA50) es el primer techo del rebote, 0.32–0.3206 el segundo, 0.3278 (base del gap) el tercero; el cierre sobre 0.3384 (techo de los tres cierres que aguantaron 0.33, con la EMA20 en 0.3306 debajo) con $60M+ deja los cierres bajo 0.33 y bajo la EMA50 como barridos y anula el sesgo bajista — con $10M es el rebote llegando al nivel perdido, y ahí se reduce. <b>Volumen:</b> $10.2M, 30% del promedio — la media se recuperó y se perdió con lo mismo, y el +1M llegó con lo mismo; el promedio real cuando salga el 8–10 Oct es $26M, y ni eso aparece. <b>RSI:</b> 25.9, quinta revisión bajo 30 — el rebote de dos cierres no lo sacó; vale como señal solo con una vela verde con volumen desde 0.2942 que cierre, no con una impresión. <b>Motor:</b> tres de siete al cierre — los dos días en cuatro (NEUTRAL) fueron los dos cierres sobre la EMA50; con 0.3123 perdido, el régimen es BEAR de vuelta. <b>Relativo:</b> MET −12.7% vs SOL −3.5% en la semana (3.6×, desde 1.3×: la ventana arranca en el rebote del 22 Oct) y −7.5% vs −2.3% en el día, el peor de la página — la única vela propia de la semana fue la del 27 Oct (+6.9% con SOL −0.4%), y se devolvió entera. <b>Buyback:</b> la wallet auditable sigue siendo lo único que convierte el 8 Oct en tesis; sin ella, el gap lleno y la escalera en su último mínimo son la foto completa.',
    decision: [
      'Con posición: <b>el stop de lo que quedaba se cerró (0.2998, 26 Oct) y el rebote para reducir llegó a 0.3206 sin tocar 0.3278; ahora el +1M es el precio</b>. Lo que quedaba salió en el cierre bajo 0.313 o en 0.32: el rebote fue la oportunidad y duró dos cierres con el 19% del volumen. Si todavía tenés, 0.2942 no es lugar para vender en pánico ni para promediar: es el último mínimo de la escalera, y se decide con el cierre — un cierre debajo con $50M+ es la capitulación y ahí se mira; un cierre que lo aguante con vela de rechazo es el primer retest de verdad. Sin ninguna de las dos velas, el siguiente nivel es la EMA100 (0.2714) y ahí no se espera con la posición entera.',
      'Sin posición: <b>nada hasta la vela en 0.2942</b>. La entrada es el retest del mínimo del 3 Oct que aguante al cierre con vela de rechazo y $50M+, 25% del tamaño y el stop en el cierre bajo 0.2714 (EMA100) — hoy el nivel está, y llega con $10M, RSI 26 y una impresión de −7.5%: eso no es el retest, es el precio pasando por el número. O el cierre de vuelta sobre 0.3384 con $60M+ y la wallet del buyback auditada. Comprar 0.294 porque es el último mínimo creciente es comprar el nivel que, si se cierra, deja la escalera de junio sin mínimos.',
      'Trigger único que anula el sesgo bajista: <b>cierre diario &gt; 0.3384</b> (cierre del 21 Oct, el techo de los tres cierres que aguantaron 0.33; la EMA50 en 0.3123, la base del gap en 0.3278 y la EMA20 en 0.3306 se recuperan en el camino) con volumen sobre $60M → 0.3579 (cierre 22 Oct) → 0.3809 (máximo 28 Sep) → 0.4447 (máximo 8 Oct).',
    ],
    invalidation: { level: 0.3384, text: 'Cierre diario sobre 0.3384 (cierre del 21 Oct, el más alto de los tres que aguantaron 0.33 antes del cuarto test; la EMA50 en 0.3123, 0.33, la base del gap en 0.3278 y la EMA20 en 0.3306 se recuperan en el camino) con volumen sobre $60M anula el path bajista: el cierre del 24 Oct bajo 0.33, los del 26 y 29 Oct bajo la EMA50 y el 0.2942 alcanzado el 29 Oct fueron barridos y el gap del 8 Oct vuelve a defenderse → 0.3579 (cierre del 22 Oct), 0.3809 (máximo del 28 Sep) y 0.4447 (máximo del 8 Oct).' },
    path: [
      { d: 30, h: '+1M', target: 0.2714, how: 'EMA100: el +1M anterior (0.2942, mínimo del 3 Oct) alcanzado en vivo el 29 Oct con el 30% del volumen, después de que la EMA50 se recuperara dos cierres (0.3206, 0.32) y se perdiera de vuelta (0.3079) → cierre bajo 0.2942 → la media, a 8%, sin un cierre que sostenga en el medio. Si 0.2942 aguanta al cierre con vela de rechazo y $50M+, el +1M es el rebote a 0.3079–0.3123 (el cierre que perdió la media + la EMA50).' },
      { d: 90, h: '+3M', target: 0.256, how: 'Meseta de septiembre, el piso de la tesis, justo debajo de la EMA100 (0.2714): el escenario de 0.2942 perdido con el revenue del sector contrayéndose y el buyback sin auditar. Con la wallet auditable y un buyback trimestral ejecutado, el +3M vuelve a 0.3384 desde abajo.' },
      { d: 365, h: '+1Y', target: 0.3809, how: 'Retest del máximo del 28 Sep, el techo que defendía el gap, desde abajo — con la EMA200 todavía subiendo. A un año el gap lleno es un evento devuelto dentro de la tendencia de junio si 0.256 aguanta; 0.4447 (máximo del 8 Oct) requiere dos buybacks consecutivos y el revenue del sector creciendo, y hoy no está ninguno.' },
    ],
    levels: {
      resistance: [[0.2998, 'Cierre 26 Oct · el primer cierre bajo la EMA50'], [0.3079, 'Cierre 29 Oct · el cierre que perdió la EMA50 de vuelta'], [0.3123, 'EMA50 · cerrada el 26 Oct, recuperada el 27–28, perdida el 29 Oct'], [0.32, 'Cierre 28 Oct'], [0.3206, 'Cierre 27 Oct · techo del rebote de dos días · no llegó a 0.3278'], [0.3278, 'Cierre 7 Oct · base del gap — llena al cierre el 24 Oct'], [0.33, 'Invalidación vieja · cerrada el 24 Oct en el cuarto test'], [0.3306, 'EMA20 — ya debajo de la invalidación · primer escalón'], [0.3349, 'Cierre 19 Oct'], [0.3384, 'INVALIDACIÓN bajista · cierre 21 Oct · techo de los tres cierres que aguantaron 0.33'], [0.3579, 'Cierre 22 Oct · techo del rebote'], [0.3809, 'Máximo 28 Sep · +1Y'], [0.4447, 'Máximo 8 Oct'], [0.50, 'Mitad de la caída Oct-Nov 25'], [0.687, 'ATH 23 Oct 25']],
      support: [[0.2942, 'Mínimo 3 Oct · post-unlock · último mínimo creciente · +1M viejo · empatado en vivo el 29 Oct — se decide con el cierre'], [0.2941, 'Hoy · mínimo de 30 días en vivo · el precio está acá'], [0.2714, 'EMA100 · +1M · stop de la próxima entrada'], [0.256, 'Meseta de septiembre · piso de la tesis · +3M'], [0.2412, 'EMA200 — subiendo 10.7%/20d'], [0.185, 'Mínimo 5 Sep']],
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
