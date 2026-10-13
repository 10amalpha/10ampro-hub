import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'met', name: 'Meteora', symbol: 'MET', cgId: 'meteora', host: 'mercados.10am.pro/met',
  sector: 'Solana liquidity layer (DLMM / DAMM)',
  tagline: 'TVL, volumen y fees de la capa de liquidez — con buyback y 52% del supply todavía por emitir.',
  description: 'Meteora ($MET) en vivo: TVL, volumen DLMM/DAMM, fees y revenue, unlocks y buyback, supply overhang on-chain, TA con forecast y tripwires. 10AMPRO.',
  stance: 'hold-trim-at-0.50', reviewed: '13 Oct 2026',
  ta: {
    updated: '13 Oct 2026', bias: 'BULL',
    read: 'La consolidación se amplió hacia abajo y el gap sigue respetado — por poco. 0.424 el 12 Oct, −9.4% el 13 Oct a 0.384 y hoy 0.3871: tocó el máximo del 28 Sep (0.3809), el nivel que escribí como el que defiende el gap del 8 Oct, y cerró 0.8% arriba. Es el retest que el plan pedía como entrada — 0.38–0.40 que aguante — y está pasando ahora, con un solo día de confirmación. Siete de siete todavía: todo sobre todo, EMA200 subiendo 13.7% en 20 días, RSI 60; pero el MACD ya baja y es el primero que se da vuelta si 0.38 cede. Volumen $29M, la mitad del promedio de 20 días ($59M) y un octavo del día del gap ($243M): la caída no tuvo vendedores, que es exactamente lo que se quiere ver en un retest. Relativo: +21.6% en siete días con SOL −11.7% — sigue siendo el movimiento más propio de la página; el pullback de esta semana cayó con el mercado (JUP −7%, JTO −10%) sin devolver el gap. Lo que no sé desde el chart sigue igual: qué fue el 8 Oct. El buyback trimestral o un listing es tesis; un rumor es un gap que se llena.',
    pattern: '<b>Tendencia alcista con mínimos crecientes desde junio:</b> 0.0975 → 0.129 → 0.157 → 0.185 → 0.2942 (3 Oct). Sin techo definido entre 0.4447 y 0.50. El nivel es el gap del 8 Oct (0.3278 → 0.4447): el 13 Oct lo probó desde arriba — 0.384 contra el máximo del 28 Sep, 0.3809 — y aguantó un día. Un gap de ruptura que se respeta en el primer retest es continuación; uno que se llena en dos semanas era un evento.',
    watch: '<b>0.3809.</b> Dos cierres más sobre el máximo del 28 Sep con volumen seco y el retest es válido; un cierre debajo abre la EMA20 (0.356) y el gap entero hasta 0.33. <b>Volumen:</b> $29M en la caída — seco, bien; si vuelven $200M con el precio bajo 0.40, es distribución de los que recibieron tokens el 23 Sep. <b>Buyback:</b> la wallet auditable sigue siendo lo único que convierte el 8 Oct en tesis. <b>Beta:</b> MET devolvió 13% desde 0.4447 mientras SOL devolvía lo mismo — por primera vez desde el gap, MET cae con el mercado. Si SOL rebota y MET no recupera 0.42, el movimiento ya se pagó.',
    decision: [
      'Con posición: <b>mantener; parcial en 0.50</b> sigue en pie si llega sin dato de buyback. No sumar en 0.42–0.44; si querés más, es acá — 0.38–0.40 — y solo después de dos cierres sobre 0.3809.',
      'Sin posición: <b>el retest del plan está en curso</b>. 25% del tamaño objetivo en 0.38–0.40 con el segundo cierre sobre 0.3809 y el stop en el cierre bajo 0.33; cierre sobre 0.4447 con volumen es el segundo tramo. Nada antes de la confirmación.',
      'Trigger único que anula el sesgo: <b>cierre diario &lt; 0.33</b> = gap lleno. Ahí el 8 Oct fue un evento → 0.2965 (EMA50, hoy sobre el mínimo del 3 Oct) → 0.256.',
    ],
    invalidation: { level: 0.33, text: 'Cierre diario bajo 0.33 llena por completo el gap del 8 Oct (base 0.3278) = el movimiento fue un evento, no una tendencia → 0.2965 (EMA50, que hoy coincide con el mínimo post-unlock del 3 Oct, 0.2942) y 0.256 (meseta de septiembre, piso de la tesis).' },
    path: [
      { d: 30, h: '+1M', target: 0.50, how: 'Retest de 0.38–0.40 que aguanta → cierre sobre 0.4447 con volumen → 0.50, la mitad de la caída Oct-Nov 25. Sin el cierre, el +1M es el rango 0.38–0.44.' },
      { d: 90, h: '+3M', target: 0.60, how: 'Entre la mitad de la caída y el ATH. Requiere el buyback trimestral ejecutado desde la wallet auditable y el share de volumen aguantando contra PumpSwap; sin eso, 0.50 es el techo del trimestre.' },
      { d: 365, h: '+1Y', target: 0.687, how: 'Retest del ATH del 23 Oct 25. Solo con el revenue del sector dejando de contraerse y dos buybacks consecutivos ejecutados; sin eso, 0.50–0.60 es el techo del año.' },
    ],
    levels: {
      resistance: [[0.424, 'Cierre 12 Oct'], [0.4447, 'Máximo 8 Oct · techo de la consolidación'], [0.50, 'Mitad de la caída Oct-Nov 25'], [0.60, 'Techo del año sin revenue del sector'], [0.687, 'ATH 23 Oct 25']],
      support: [[0.384, 'Cierre 13 Oct · el retest'], [0.3809, 'Máximo 28 Sep · defiende el gap'], [0.356, 'EMA20'], [0.33, 'INVALIDACIÓN · gap lleno'], [0.3278, 'Cierre 7 Oct · base del gap'], [0.2965, 'EMA50 · sobre el mínimo del 3 Oct (0.2942)'], [0.256, 'Meseta de septiembre · piso de la tesis']],
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
