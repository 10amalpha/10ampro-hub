import { decisionBuilder, tw, fmt } from '../framework';

// DoubleZero publishes network stats quarterly (and hourly at doublezero.xyz/dashboard, no public JSON). Seed series below = quarterly updates; burn is live from the mint.
const Q = (d, v) => [d, v];

export const TOKEN = {
  slug: '2z', name: 'DoubleZero', symbol: '2Z', cgId: 'doublezero', host: 'mercados.10am.pro/2z',
  sector: 'DePIN · fiber network for validators',
  tagline: 'Stake de Solana sobre fibra dedicada, seat fees en 2Z y burn — la red que Solana ya usa, con un token que todavía no lo refleja.',
  description: 'DoubleZero ($2Z) en vivo: % del stake de Solana conectado, validadores, TCV, burn de seat fees, unlocks, supply overhang on-chain, TA con forecast y tripwires. 10AMPRO.',
  stance: 'accumulate-slowly-below-unlocks', reviewed: '27 Ago 2026',
  sources: 'Network telemetry: DoubleZero quarterly updates (Q4-25 → Q2-26), data.malbeclabs.com. Burn: on-chain supply vs 10B minted.',
  rule: 'stake weight conectado cayendo trimestre a trimestre = tesis rota, salir; burn acelerando + stake >60% + Edge con suscriptores pagando = subir posición aunque el chart esté feo.',
  thesis: [
    '<b>Qué es.</b> DoubleZero es una red de fibra dedicada entre data centers, permissionless, por la que los validadores de Solana enrutan su tráfico en lugar del internet público. Los validadores pagan un "seat fee" (5% de su revenue de validación) en 2Z; parte va a los contribuidores de fibra y parte se quema. Edge vende datos de mercado en tiempo real (Kalshi, shreds de Solana) por suscripción.',
    '<b>La tesis.</b> Es el único DePIN de los cinco con adopción medible y no incentivada: 59% del stake de Solana ya corre sobre DoubleZero (Q2-26), sin que nadie lo pague por usarlo. El token captura valor vía burn de seat fees y, eventualmente, staking. El problema es la curva de supply: 34.7% circulante, 10B total, unlocks grandes (1.62B en ~3 meses) y un ATH de $0.75 en el día 1 que dejó a todo el mundo bajo agua.',
    '<b>Lo que valida.</b> Stake weight conectado subiendo (25% → 46% → 59%), TCV creciendo, burn on-chain acelerando (supply bajando vs 10B), Edge con suscriptores pagando en USDC, y expansión a otras chains.',
    '<b>Lo que rompe.</b> Unlocks no absorbidos (Foundation y validator sale desbloqueando), stake weight estancado o cayendo, Solana bajando el revenue de validación (menos seat fees), o Alpenglow/Rotor reduciendo la ventaja de latencia.',
  ],
  network: {
    title: 'Solana stake weight on DZ · validators · TCV · burn',
    note: 'Serie trimestral (Q4-25 → Q2-26) de los network updates oficiales; se actualiza manualmente cada quarter. Burn = 10B minted − supply on-chain, leído en vivo.',
    metrics: [
      { key: 'stake', label: 'Solana stake on DZ', source: 'manual', unit: 'pct', primary: true, mode: 'level', note: 'Quarterly network update', points: [Q('2025-10-02', 22), Q('2025-12-31', 25), Q('2026-03-31', 46.2), Q('2026-06-30', 59)] },
      { key: 'validators', label: 'Connected validators', source: 'manual', unit: 'num', mode: 'level', note: 'Quarterly network update', points: [Q('2025-09-28', 386), Q('2026-03-31', 448), Q('2026-06-30', 462)] },
      { key: 'tcv', label: 'Total connected value', source: 'manual', unit: 'usd', mode: 'level', note: 'Quarterly network update', points: [Q('2026-03-31', 17e9), Q('2026-04-30', 18e9), Q('2026-06-30', 21.7e9)] },
      { key: 'capacity', label: 'Capacity (Tbps)', source: 'manual', unit: 'num', mode: 'level', note: 'Quarterly network update', points: [Q('2026-03-31', 9.52), Q('2026-06-30', 10.14)] },
      { key: 'burn', label: 'Burned 2Z (live)', source: 'rpc-supply', mint: 'J6pQQ3FAcJQeWPPGppWRb4nM8jU3wLyYbRrLh7feMfvd', minted: 10_000_000_000, unit: 'num' },
    ],
  },
  onchain: {
    mint: 'J6pQQ3FAcJQeWPPGppWRb4nM8jU3wLyYbRrLh7feMfvd', supply: 10_000_000_000, decimals: 8, treasuryPct: 3,
    labels: {},
    programs: {},
    staking: { manual: { label: 'Staking', total: null, source: 'not live yet', note: 'Staking de 2Z anunciado, no activo' } },
    read: ({ chain, d, fmtNum, pctS }) => {
      const ho = chain.holders; if (!ho) return 'Holders scan unavailable.';
      const tr = ho.treasuryLike, ex = ho.exchange, daily = d?.price && d?.vol24 ? d.vol24 / d.price : null;
      const burned = chain.onchainSupply ? 10e9 - chain.onchainSupply : null;
      return `<b>2Z es 65% supply no circulante.</b> ${pctS(tr)} del supply en wallets sin etiqueta ≥3% — Foundation ("unlocked but unmoved", según su propia disclosure), validator sale con cliff, equipo e inversores a 4 años. El próximo unlock grande es <b>1.62B 2Z (16% del supply)</b>: eso es el evento que define el siguiente trimestre. ${burned != null ? `<div style="margin-top:6px"><b>Burn:</b> ${fmtNum(burned)} 2Z quemados desde el TGE (${(burned / 10e9 * 100).toFixed(3)}% del supply). Es real pero chico frente a los unlocks; la tesis de burn solo gana a 3+ años.</div>` : ''}<div style="margin-top:6px"><b>Exchanges:</b> ${fmtNum(ex)} 2Z (${pctS(ex)}) en CEX etiquetados${daily ? `, ≈${(ex / daily).toFixed(1)} días de volumen` : ''}. Binance es la venue principal; el float de exchange es suficiente para absorber, no para sostener.</div><div style="margin-top:6px"><b>Decisión:</b> › no comprar antes del unlock de 1.62B; comprar <b>después</b> si el precio lo absorbe en una semana sin nuevo mínimo. › Foundation moviendo tokens "unmoved" a CEX = salir. › Burn acelerando + stake weight &gt;60% = la única combinación que justifica ponderar más que un trade.</div>`;
    },
  },
  tripwires: ({ M, chain, trend, fc }) => [
    tw.metric(M, 'stake', { good: 95, watch: 80, unit: 'pct' }),
    tw.metric(M, 'tcv', { good: 95, watch: 80 }),
    tw.custom(M?.burn?.latest > 0 ? 'pass' : 'watch', M?.burn?.latest > 0 ? '✓' : '◦', 'Seat fees burning 2Z', M?.burn?.latest > 0 ? `${fmt.M(M.burn.latest)} 2Z quemados (on-chain, vivo). El mecanismo funciona; la magnitud todavía no mueve el supply.` : 'Sin lectura de burn.'),
    tw.concentration(chain, { exchangeWarnPct: 10, treasuryWarnPct: 40 }),
    tw.trend(trend, fc),
    tw.custom('fail', '!', 'Unlock 1.62B 2Z (16% supply) in ~3 months', 'Mayor evento de supply del año. Hasta que pase y se vea absorbido, el chart no manda: manda el calendario. Pasa a ✓ si el precio no hace nuevo mínimo en los 7 días posteriores.'),
    tw.custom('watch', '◦', 'Edge revenue (USDC)', '447 suscriptores distintos desde abril (Q2-26). Es el primer revenue no ligado a seat fees. Falta que DoubleZero publique el run-rate; cuando lo haga, pasa a ✓ o ! según sea >$1M/año o no.'),
  ],
  decision: decisionBuilder('2Z', {
    flips: ({ net, M: Mf }) => {
      const s = net?.stake, b = net?.burn;
      return [
        `<b>Unlock de 1.62B absorbido</b> sin nuevo mínimo en 7 días — el mercado tiene demanda para el float nuevo. Hasta entonces, no hay prisa.`,
        `Stake weight conectado ${s?.latest ? `sobre <b>60%</b> en el Q3 update (hoy ${s.latest}%)` : 'subiendo trimestre a trimestre'}; si baja un trimestre, la tesis de adopción orgánica se rompe.`,
        `Burn on-chain acelerando ${b?.latest ? `(hoy ${Mf(b.latest)} 2Z acumulado)` : ''} = los seat fees se monetizan. Es la única captura de valor real hoy.`,
        `Foundation moviendo tokens "unmoved" a exchanges = salir sin esperar el chart.`,
      ];
    },
  }),
};
