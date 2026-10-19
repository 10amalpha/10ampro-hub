import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'met', name: 'Meteora', symbol: 'MET', cgId: 'meteora', host: 'mercados.10am.pro/met',
  sector: 'Solana liquidity layer (DLMM / DAMM)',
  tagline: 'TVL, volumen y fees de la capa de liquidez — con buyback y 52% del supply todavía por emitir.',
  description: 'Meteora ($MET) en vivo: TVL, volumen DLMM/DAMM, fees y revenue, unlocks y buyback, supply overhang on-chain, TA con forecast y tripwires. 10AMPRO.',
  stance: 'hold-trim-at-0.50', reviewed: '19 Oct 2026',
  ta: {
    updated: '18 Oct 2026', bias: 'BULL',
    read: 'La EMA20 cedió y el gap se llenó intradía. El 17 Oct cerró 0.37, todavía sobre la EMA20 (0.3605); el 18 Oct la perdió sin discusión: 0.348, el primer cierre debajo de la media desde el 3 Oct. Hoy 0.3206, −9.9% en el día — debajo de la base del gap del 8 Oct (0.3278) y debajo de la invalidación (0.33). Al cierre no se cumplió: la regla es cierre diario bajo 0.33 y el último cierre es 0.348, 5% arriba. Pero la lección de las últimas tres revisiones es que el nivel que se toca intradía con esta velocidad se cierra en la siguiente sesión, así que la decisión se escribe como si ya hubiera pasado y el sesgo queda alcista solo porque la regla no se cumplió. El gap devolvió el 83% al cierre y el 106% intradía: el 8 Oct fue un evento, y el chart ya lo contestó. Cinco de siete (era seis): perdió la EMA20; quedan la 50 (0.3075), la 200 (0.2379, +13% en 20 días), la 50 sobre la 200 y el RSI sobre 50 — por nada: 52.9, desde 60 ayer. El MACD negativo y ampliándose. Volumen $11.8M, 18% del promedio de 20 días ($65M) y un vigésimo del día del gap ($243M): el gap se llenó con el volumen más bajo del mes — no fue distribución, fue la ausencia total de compradores en el nivel que debía defender el movimiento. Relativo: −22.4% en siete días con SOL −6.7%, 3.3× el mercado. Hace dos semanas MET era el único verde de la página; hoy devolvió el gap entero mientras SOL corrige 7%. La fuerza propia del 8 Oct se gastó por completo. Lo que queda es la EMA50 (0.3075), el mínimo post-unlock del 3 Oct (0.2942) y la meseta de septiembre (0.256), que es el piso de la tesis; y la única pregunta que importa sigue siendo la del 13 Oct — qué fue el 8 Oct — con la respuesta del chart cada día más clara: un evento, no una tendencia.',
    pattern: '<b>Tendencia alcista con mínimos crecientes desde junio; el gap del 8 Oct lleno:</b> 0.0975 → 0.129 → 0.157 → 0.185 → 0.2942 (3 Oct). El gap (0.3278 → 0.4447) se devolvió el 83% al cierre del 18 Oct (0.348) y se llenó intradía hoy (0.3206). El máximo del 28 Sep (0.3809), que lo defendía, se perdió el 15 Oct; la EMA20 (0.3559) el 18 Oct. Un gap de ruptura que se llena en diez sesiones sin volumen era un evento — y con el gap lleno, el 8 Oct no cuenta: la estructura vuelve a ser la escalera desde junio, con la EMA50 (0.3075) y el mínimo del 3 Oct (0.2942) como los niveles que la sostienen. Encima, la base del gap (0.3278) y la EMA20 pasan a ser techo.',
    watch: '<b>0.33 y 0.3559.</b> Abajo: el cierre de hoy debajo de 0.33 cumple la invalidación — el precio ya está debajo y se escribe como cumplida — y abre la EMA50 (0.3075) directo, después 0.2942. Arriba: recuperar 0.33 y la base del gap (0.3278) al cierre es el rebote; el que reabre el caso es un cierre sobre la EMA20 (0.3559) con volumen sobre $60M. <b>Volumen:</b> $11.8M, 18% del promedio — un rebote con $20M es nada; si vuelven $200M con el precio bajo 0.33, es la distribución del unlock del 23 Sep y 0.2942 llega rápido. <b>Relativo:</b> MET cayó 3.3× SOL en la semana; el 8 Oct se pagó entero. Hasta que MET suba más que SOL en un día verde, no hay demanda propia. <b>Buyback:</b> la wallet auditable sigue siendo lo único que convierte el 8 Oct en tesis; sin ella, el gap lleno es la respuesta.',
    decision: [
      'Con posición: <b>no sumar; reducir en el rebote a 0.33–0.3559</b> (la invalidación y la EMA20) lo que no querés tener en 0.2942. El cierre bajo 0.33 todavía no se imprimió, pero el precio está debajo: se actúa como si lo hubiera hecho. Lo que quede, con stop en el cierre bajo 0.3075 (EMA50).',
      'Sin posición: <b>nada hasta que la EMA50 decida</b>. La próxima entrada es el retest de 0.3075–0.2942 (EMA50 + mínimo del 3 Oct) que aguante al cierre con vela de rechazo, 25% del tamaño y el stop en el cierre bajo 0.2942 — o el cierre de vuelta sobre 0.3559 con volumen. Comprar 0.32 porque \"el gap ya se llenó\" es comprar el primer nivel de una caída que no mostró volumen.',
      'Trigger único que anula el sesgo: <b>cierre diario &lt; 0.33</b> = gap lleno al cierre. Ahí el 8 Oct fue un evento → 0.3075 (EMA50) → 0.2942 (mínimo del 3 Oct) → 0.256.',
    ],
    invalidation: { level: 0.33, text: 'Cierre diario bajo 0.33 llena el gap del 8 Oct al cierre (base 0.3278; intradía ya se llenó el 18 Oct) = el movimiento fue un evento, no una tendencia → 0.3075 (EMA50) y 0.2942 (mínimo post-unlock del 3 Oct); debajo, 0.256 (meseta de septiembre, piso de la tesis).' },
    path: [
      { d: 30, h: '+1M', target: 0.3559, how: 'Rebote desde la EMA50 (0.3075) que recupera 0.33 → retest de la EMA20 desde abajo, donde se reduce. Sin 0.33 de vuelta al cierre, el +1M es 0.2942–0.33 y el sesgo pasa a bajista.' },
      { d: 90, h: '+3M', target: 0.3809, how: 'Máximo del 28 Sep, el techo que defendía el gap. Requiere la EMA20 recuperada con volumen y el buyback trimestral ejecutado desde la wallet auditable; sin eso, 0.3559 es el techo del trimestre.' },
      { d: 365, h: '+1Y', target: 0.4447, how: 'Retest del máximo del 8 Oct. Solo con el revenue del sector dejando de contraerse y dos buybacks consecutivos; sin eso, 0.3809 es el techo del año y 0.50–0.56 (mitad y 78.6% de la caída Oct-25 → Jun-26) salen del horizonte.' },
    ],
    levels: {
      resistance: [[0.3278, 'Cierre 7 Oct · base del gap — perdida intradía el 18 Oct'], [0.33, 'INVALIDACIÓN · gap lleno al cierre'], [0.348, 'Cierre 18 Oct'], [0.3559, 'EMA20 — perdida el 18 Oct · +1M'], [0.37, 'Cierre 17 Oct'], [0.3809, 'Máximo 28 Sep · +3M'], [0.3856, 'Cierre 14 Oct'], [0.4447, 'Máximo 8 Oct · +1Y'], [0.50, 'Mitad de la caída Oct-Nov 25'], [0.687, 'ATH 23 Oct 25']],
      support: [[0.3075, 'EMA50 · primer nivel de la escalera'], [0.2942, 'Mínimo 3 Oct · post-unlock'], [0.2591, 'EMA100'], [0.256, 'Meseta de septiembre · piso de la tesis'], [0.2379, 'EMA200 — subiendo 13%/20d']],
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
