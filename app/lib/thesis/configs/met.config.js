import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'met', name: 'Meteora', symbol: 'MET', cgId: 'meteora', host: 'mercados.10am.pro/met',
  sector: 'Solana liquidity layer (DLMM / DAMM)',
  tagline: 'TVL, volumen y fees de la capa de liquidez — con buyback y 52% del supply todavía por emitir.',
  description: 'Meteora ($MET) en vivo: TVL, volumen DLMM/DAMM, fees y revenue, unlocks y buyback, supply overhang on-chain, TA con forecast y tripwires. 10AMPRO.',
  stance: 'wait-for-unlock-absorption', reviewed: '22 Sep 2026',
  ta: {
    updated: '22 Sep 2026', bias: 'BULL',
    read: '+46% en la semana, +49% desde el cierre del 16 Sep, RSI 78 — y el unlock de la Ecosystem Reserve es mañana. Ese es el chart. La estructura de fondo es buena: siete de siete, mínimos crecientes desde el 0.0975 de junio (0.129 → 0.157 → 0.185), la 200 subiendo y el volumen en 152% del promedio. Pero el precio corrió hacia el evento, no después de él, y el cierre de hoy (0.293) es el más alto en 90 días: no hay pivotes de referencia entre acá y el 0.687 del ATH. El mercado ya compró la absorción del unlock. El trabajo ahora es ver si la absorbe.',
    pattern: '<b>Tendencia alcista extendida contra un evento de supply.</b> Línea de soporte 0.0975 (11 Jun) → 0.129 (18 Jul), hoy en ~0.187. Pivotes que mandan: 0.185 (5 Sep), 0.1965 (16 Sep), 0.256–0.26 (la meseta del 19–21 Sep, donde el precio respiró antes del último tramo), 0.293 (hoy). Arriba, nada hasta 0.40–0.50 (zona de la caída de Nov-25) y 0.687 (ATH del 23 Oct 25).',
    watch: '<b>72 horas después del unlock.</b> La regla de la casa: si el precio no absorbe el float nuevo en 72h, el mercado no tiene demanda para él. Absorber = cerrar sobre 0.256 el viernes. <b>RSI 78</b> con el evento encima: cualquier venta de los que reciben tokens encuentra un comprador cansado. <b>Volumen:</b> el día del unlock debería ser el más alto del mes (hoy el máximo de 30d es $119M); si el volumen sube y el precio no, es distribución del float nuevo. <b>Buyback:</b> el trimestral desde la wallet auditable es lo que convierte esto en tesis; hasta entonces es beta al volumen DEX de Solana.',
    decision: [
      'Con posición: <b>mantener mientras cierre sobre 0.256</b>. Nada de sumar antes del unlock; parcial en 0.32–0.33 si el evento pasa y el precio sigue sin retest.',
      'Sin posición: <b>esperar el unlock</b>. Wait-for-unlock-absorption es literal: entrada en 0.23–0.26 (EMA20 + meseta) si el 23 Sep se absorbe con cierre sobre 0.256; nada a 0.29 con RSI 78.',
      'Trigger único que anula el sesgo: <b>cierre diario &lt; 0.256</b> en los 3 días posteriores al unlock. Ahí el float nuevo ganó y el objetivo es 0.20 (mínimo 16 Sep) y 0.185.',
    ],
    invalidation: { level: 0.256, text: 'Cierre diario bajo 0.256 (la meseta del 19–21 Sep) en la ventana de 72h post-unlock = float no absorbido → 0.233 (EMA20), 0.20 (mínimo 16 Sep) y 0.185.' },
    path: [
      { d: 30, h: '+1M', target: 0.32, how: 'Unlock absorbido (cierre sobre 0.256 al viernes) → retest de la meseta → continuación a 0.32. Sin absorción, el +1M es 0.20.' },
      { d: 90, h: '+3M', target: 0.40, how: 'Primera zona de oferta desde la caída de Nov-25. Requiere el buyback trimestral ejecutado y el share de volumen aguantando contra PumpSwap.' },
      { d: 365, h: '+1Y', target: 0.50, how: 'Mitad de la caída Oct-Nov 25. Solo con el revenue del sector dejando de contraerse; sin eso, 0.32–0.40 es el techo del año.' },
    ],
    levels: {
      resistance: [[0.32, 'Extensión del impulso post-unlock'], [0.40, 'Zona de oferta Nov-25'], [0.50, 'Mitad de la caída Oct-Nov 25'], [0.687, 'ATH 23 Oct 25']],
      support: [[0.256, 'Meseta 19–21 Sep · INVALIDACIÓN'], [0.233, 'EMA20'], [0.208, 'EMA50'], [0.20, 'Mínimo 16 Sep'], [0.185, 'Mínimo 5 Sep · trendline desde junio']],
    },
  },
  sources: 'Network telemetry: DefiLlama (Meteora TVL, DEX volume, fees, revenue). Unlocks: Tokenomist via CoinGecko.',
  rule: 'revenue mensual <50% del pico + unlock mensual no absorbido en 72h = reducir; buyback trimestral ≥ unlocks del trimestre = mantener aunque el chart esté feo.',
  catalyst: {
    title: 'Unlock de la Ecosystem Reserve',
    date: '23 Sep 2026 — pasado manana · 55.06% del supply ya desbloqueado',
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
