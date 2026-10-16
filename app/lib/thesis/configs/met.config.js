import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'met', name: 'Meteora', symbol: 'MET', cgId: 'meteora', host: 'mercados.10am.pro/met',
  sector: 'Solana liquidity layer (DLMM / DAMM)',
  tagline: 'TVL, volumen y fees de la capa de liquidez — con buyback y 52% del supply todavía por emitir.',
  description: 'Meteora ($MET) en vivo: TVL, volumen DLMM/DAMM, fees y revenue, unlocks y buyback, supply overhang on-chain, TA con forecast y tripwires. 10AMPRO.',
  stance: 'hold-trim-at-0.50', reviewed: '16 Oct 2026',
  ta: {
    updated: '16 Oct 2026', bias: 'BULL',
    read: 'El retest no aguantó. El 14 Oct cerró 0.3856, un día más sobre el máximo del 28 Sep (0.3809) — el segundo de los dos que pedía el plan — y el 15 Oct lo perdió por 0.0004 (0.3805), el 16 Oct sin discusión (0.3754). Hoy 0.3679, 2% sobre la EMA20 (0.3606). La confirmación nunca llegó: la entrada de 0.38–0.40 queda sin ejecutar, y eso es lo correcto — el nivel que la validaba cedió antes de la segunda vela. Seis de siete (era siete): el MACD ya está negativo y es el único que cambió; el precio sigue sobre las cuatro EMAs, la 200 subiendo 13% en 20 días, RSI 63. Es un retroceso dentro de una tendencia fuerte, no una ruptura — pero devolvió el 66% del gap del 8 Oct (0.3278 → 0.4447) y los gaps que se devuelven dos tercios suelen llenarse. Volumen $11M, un sexto del promedio de 20 días ($67M) y un vigésimo del día del gap ($243M): la caída sigue sin vendedores, que es lo que salva la lectura, y sin compradores, que es lo que la deja sin piso hasta la EMA20. Relativo: −13.9% en siete días con SOL −3.0% — 4.6× el mercado. La semana pasada MET caía con el mercado sin devolver el gap; esta semana cae sola y el gap se está devolviendo. La fuerza propia del 8 Oct se gastó. Lo que no sé desde el chart sigue igual — qué fue el 8 Oct — y el chart empezó a contestar: un movimiento que pierde dos tercios en ocho sesiones sin volumen se parece más a un evento que a una tendencia. La invalidación de 0.33 queda 10% abajo; hasta ahí el sesgo es alcista, pero ya no se suma.',
    pattern: '<b>Tendencia alcista con mínimos crecientes desde junio, en retroceso del gap:</b> 0.0975 → 0.129 → 0.157 → 0.185 → 0.2942 (3 Oct). El gap del 8 Oct (0.3278 → 0.4447) se devolvió el 66%: el máximo del 28 Sep (0.3809), que lo defendía, aguantó cuatro sesiones y se perdió el 15 Oct. Debajo quedan la EMA20 (0.3606) y la base del gap (0.3278); encima, 0.3809 pasó a ser techo. Un gap de ruptura que se respeta en el primer retest es continuación; uno que se devuelve dos tercios en ocho sesiones era un evento — y el que decide es 0.33: con el gap lleno, el 8 Oct no cuenta.',
    watch: '<b>0.3606 y 0.3809.</b> Abajo: la EMA20 es el último nivel antes de la base del gap; cierre bajo 0.3606 abre 0.33 directo. Arriba: recuperar 0.3809 al cierre reabre la entrada del plan; dos cierres sobre 0.3856 (cierre del 14 Oct) y el retest fallido fue un barrido. <b>Volumen:</b> $11M, un sexto del promedio — un rebote con $20M es nada; si vuelven $200M con el precio bajo 0.36, es la distribución del unlock del 23 Sep. <b>Relativo:</b> MET cayó 4.6× SOL en la semana; el 8 Oct se pagó. Hasta que MET suba más que SOL en un día verde, no hay demanda propia. <b>Buyback:</b> la wallet auditable sigue siendo lo único que convierte el 8 Oct en tesis; sin ella, el gap se llena.',
    decision: [
      'Con posición: <b>mantener con el 0.33 intacto; no sumar</b>. La entrada de 0.38–0.40 no confirmó y se cancela. El parcial en 0.50 queda en pie solo si llega; si cierra bajo 0.3606, se reduce en el rebote a 0.38, no en pánico.',
      'Sin posición: <b>nada hasta que el gap decida</b>. La próxima entrada es el retest de la base del gap (0.33–0.3278) que aguante al cierre con volumen seco, 25% del tamaño y el stop en el cierre bajo 0.33 — o el cierre de vuelta sobre 0.3809 con volumen. Entre 0.36 y 0.38 es el medio del gap.',
      'Trigger único que anula el sesgo: <b>cierre diario &lt; 0.33</b> = gap lleno. Ahí el 8 Oct fue un evento → 0.3053 (EMA50) → 0.2942 (mínimo del 3 Oct) → 0.256.',
    ],
    invalidation: { level: 0.33, text: 'Cierre diario bajo 0.33 llena por completo el gap del 8 Oct (base 0.3278) = el movimiento fue un evento, no una tendencia → 0.3053 (EMA50) y 0.2942 (mínimo post-unlock del 3 Oct); debajo, 0.256 (meseta de septiembre, piso de la tesis).' },
    path: [
      { d: 30, h: '+1M', target: 0.4447, how: 'EMA20 (0.3606) que aguanta → cierre sobre 0.3809 → retest del máximo del 8 Oct. Sin 0.3809 de vuelta, el +1M es el rango 0.33–0.38 y el gap se llena.' },
      { d: 90, h: '+3M', target: 0.50, how: 'Mitad de la caída Oct-Nov 25. Requiere el cierre sobre 0.4447 con volumen y el buyback trimestral ejecutado desde la wallet auditable; sin eso, 0.4447 es el techo del trimestre.' },
      { d: 365, h: '+1Y', target: 0.56, how: '78.6% de la caída Oct-25 → Jun-26 (0.687 → 0.094). Solo con el revenue del sector dejando de contraerse y dos buybacks consecutivos; sin eso, 0.50 es el techo del año y el ATH (0.687) no entra en el horizonte.' },
    ],
    levels: {
      resistance: [[0.3754, 'Cierre 16 Oct'], [0.3809, 'Máximo 28 Sep · defendía el gap, perdido el 15 Oct — a recuperar'], [0.3856, 'Cierre 14 Oct'], [0.424, 'Cierre 12 Oct'], [0.4447, 'Máximo 8 Oct · +1M'], [0.50, 'Mitad de la caída Oct-Nov 25 · +3M'], [0.56, '78.6% de la caída Oct-25 → Jun-26 · +1Y'], [0.687, 'ATH 23 Oct 25']],
      support: [[0.3606, 'EMA20 · último nivel antes de la base del gap'], [0.33, 'INVALIDACIÓN · gap lleno'], [0.3278, 'Cierre 7 Oct · base del gap'], [0.3053, 'EMA50'], [0.2942, 'Mínimo 3 Oct · post-unlock'], [0.256, 'Meseta de septiembre · piso de la tesis']],
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
