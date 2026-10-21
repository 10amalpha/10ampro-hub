import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'met', name: 'Meteora', symbol: 'MET', cgId: 'meteora', host: 'mercados.10am.pro/met',
  sector: 'Solana liquidity layer (DLMM / DAMM)',
  tagline: 'TVL, volumen y fees de la capa de liquidez — con buyback y 52% del supply todavía por emitir.',
  description: 'Meteora ($MET) en vivo: TVL, volumen DLMM/DAMM, fees y revenue, unlocks y buyback, supply overhang on-chain, TA con forecast y tripwires. 10AMPRO.',
  stance: 'hold-trim-at-0.50', reviewed: '21 Oct 2026',
  ta: {
    updated: '21 Oct 2026', bias: 'BULL',
    read: 'El 0.33 aguantó tres cierres — sin volumen. El 18 Oct la lectura escribió la invalidación como cumplida porque el precio había tocado 0.3206 intradía; el cierre nunca llegó: 0.3349 (19 Oct), 0.3377 (20 Oct) y el 21 Oct 0.3384 (+0.2%), tres cierres sobre 0.33 y sobre la base del gap (0.3278), cada uno un poco más alto. Hoy 0.3465, +2.4%, a 1.9% de la EMA20 (0.3531). Es el primer nivel tocado así en esta página en el mes que no se cerró en la sesión siguiente — y la razón está en el volumen: $11.5M, 18% del promedio de 20 días ($64M), por tercer día el más bajo del mes. Nadie vendió 0.33 y nadie lo compró: el nivel aguantó porque el libro estaba vacío, no porque hubiera demanda, y un piso sin volumen es un piso hasta que llega el primer vendedor con tamaño. Cuatro de siete, desde cinco: perdió el RSI sobre 50 — el oscilador cayó a 18.6 desde 50 con el precio plano tres sesiones, terminando de descontar las doce sesiones de caída desde 0.4447; no cayó el precio, cayó el indicador, y es la lectura más baja desde junio. Quedan la 50 (0.3118) y la 200 (0.2411, +13% en 20 días), la 50 sobre la 200 y la 200 subiendo; el MACD negativo y todavía ampliándose. Relativo: −7.9% en siete días con SOL −0.2% — el gap del 8 Oct se pagó entero la semana pasada y esta semana MET siguió cayendo con SOL plano; en el día, +2.4% con SOL +2.8%: beta, no demanda propia. Lo que cambió: 0.33 no se cerró, y la decisión del 18 Oct, escrita como si hubiera pasado, resultó correcta igual — el precio no fue a ningún lado. Lo que no cambió: el gap devolvió el 83% al cierre, la EMA20 sigue arriba, el volumen no existe y la única pregunta — qué fue el 8 Oct — sigue con la misma respuesta del chart: un evento. El sesgo queda alcista por regla, sobre un nivel que aguantó tres veces por 1.5–2.5% con el 18% del volumen; se vuelve algo más con el cierre sobre 0.3531 y $60M.',
    pattern: '<b>Tendencia alcista con mínimos crecientes desde junio; el gap del 8 Oct devuelto al 83%, con 0.33 aguantando tres cierres sin volumen:</b> 0.0975 → 0.129 → 0.157 → 0.185 → 0.2942 (3 Oct). El gap (0.3278 → 0.4447) se devolvió el 83% al cierre del 18 Oct (0.348), se llenó intradía (0.3206) y no al cierre: 0.3349 / 0.3377 / 0.3384 son tres cierres sobre la base del gap, con el 18% del volumen. El máximo del 28 Sep (0.3809) se perdió el 15 Oct; la EMA20 (0.3531) el 18 Oct — las dos son techo. Un gap de ruptura que se devuelve 83% en diez sesiones sin volumen fue un evento; tres cierres planos sobre la base con el volumen más bajo del mes no lo convierten en tendencia, lo dejan en pausa. La estructura es la escalera desde junio, con la EMA50 (0.3118) y el mínimo del 3 Oct (0.2942) como los niveles que la sostienen; encima, la EMA20 (0.3531) y 0.3809 deciden si el 8 Oct vuelve a contar.',
    watch: '<b>0.3531 y 0.33.</b> Arriba: el cierre sobre la EMA20 (0.3531) con volumen sobre $60M reabre el caso — a 1.9% del precio de hoy; con $12M es el rebote llegando a la media, y ahí se reduce. Después, 0.3809 (máximo del 28 Sep). Abajo: 0.33 aguantó tres veces por 1.5–2.5%; el cuarto test con $50M+ es el que lo decide — un cierre debajo cumple la invalidación y abre la EMA50 (0.3118) directo, después 0.2942. <b>Volumen:</b> $11.5M, 18% del promedio, tres días seguidos los más bajos del mes — un piso sin volumen no es un piso; si vuelven $200M con el precio bajo 0.33, es la distribución del unlock del 23 Sep. <b>RSI:</b> 18.6 con el precio plano — el indicador terminó de descontar la caída; vale como sobreventa solo si viene una vela verde con volumen desde acá. <b>Relativo:</b> MET −7.9% vs SOL −0.2% en la semana y +2.4% vs +2.8% en el día: beta. Hasta que MET suba más que SOL en un día verde con volumen, no hay demanda propia. <b>Buyback:</b> la wallet auditable sigue siendo lo único que convierte el 8 Oct en tesis.',
    decision: [
      'Con posición: <b>no sumar; reducir en el rebote a 0.3465–0.3531</b> (hoy y la EMA20) lo que no querés tener en 0.2942. El 0.33 aguantó tres cierres con el 18% del volumen — eso no es un piso defendido, es un libro vacío — y la decisión del 18 Oct sigue igual aunque la regla no se haya cumplido. Lo que quede, con stop en el cierre bajo 0.3118 (EMA50).',
      'Sin posición: <b>nada hasta que la EMA50 o la EMA20 decidan</b>. La próxima entrada es el retest de 0.3118–0.2942 (EMA50 + mínimo del 3 Oct) que aguante al cierre con vela de rechazo, 25% del tamaño y el stop en el cierre bajo 0.2942 — o el cierre de vuelta sobre 0.3531 con $60M+. Comprar 0.34 porque "el 0.33 aguantó tres veces" es comprar un nivel que nadie defendió con volumen.',
      'Trigger único que anula el sesgo: <b>cierre diario &lt; 0.33</b> = gap lleno al cierre. Ahí el 8 Oct fue un evento → 0.3118 (EMA50) → 0.2942 (mínimo del 3 Oct) → 0.256.',
    ],
    invalidation: { level: 0.33, text: 'Cierre diario bajo 0.33 llena el gap del 8 Oct al cierre (base 0.3278; intradía ya se llenó el 18 Oct; tres cierres sobre el nivel el 19–21 Oct con el 18% del volumen) = el movimiento fue un evento, no una tendencia → 0.3118 (EMA50) y 0.2942 (mínimo post-unlock del 3 Oct); debajo, 0.256 (meseta de septiembre, piso de la tesis).' },
    path: [
      { d: 30, h: '+1M', target: 0.3531, how: 'Rebote desde 0.33 que llega a la EMA20 — el precio está a 1.9% —, donde se reduce; sin volumen, es el techo del mes. Sin 0.33 al cierre, el +1M es 0.3118–0.2942 y el sesgo pasa a bajista.' },
      { d: 90, h: '+3M', target: 0.3809, how: 'Máximo del 28 Sep, el techo que defendía el gap. Requiere la EMA20 recuperada con volumen y el buyback trimestral ejecutado desde la wallet auditable; sin eso, 0.3531 es el techo del trimestre.' },
      { d: 365, h: '+1Y', target: 0.4447, how: 'Retest del máximo del 8 Oct. Solo con el revenue del sector dejando de contraerse y dos buybacks consecutivos; sin eso, 0.3809 es el techo del año y 0.50–0.56 (mitad y 78.6% de la caída Oct-25 → Jun-26) salen del horizonte.' },
    ],
    levels: {
      resistance: [[0.348, 'Cierre 18 Oct'], [0.3531, 'EMA20 — perdida el 18 Oct · +1M · donde se reduce'], [0.37, 'Cierre 17 Oct'], [0.3809, 'Máximo 28 Sep · +3M'], [0.3856, 'Cierre 14 Oct'], [0.4447, 'Máximo 8 Oct · +1Y'], [0.50, 'Mitad de la caída Oct-Nov 25'], [0.687, 'ATH 23 Oct 25']],
      support: [[0.3384, 'Cierre 21 Oct · tercer cierre sobre 0.33'], [0.3349, 'Cierre 19 Oct · mínimo de la caída al cierre'], [0.33, 'INVALIDACIÓN · gap lleno al cierre · aguantó tres cierres sin volumen'], [0.3278, 'Cierre 7 Oct · base del gap — llena intradía el 18 Oct (0.3206), no al cierre'], [0.3118, 'EMA50 · primer nivel de la escalera · stop'], [0.2942, 'Mínimo 3 Oct · post-unlock'], [0.2641, 'EMA100'], [0.256, 'Meseta de septiembre · piso de la tesis'], [0.2411, 'EMA200 — subiendo 13%/20d']],
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
