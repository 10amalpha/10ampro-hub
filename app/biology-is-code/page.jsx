'use client';
import { useState, useEffect } from 'react';
import BioTA from './BioTA';

// ============================================================
// BIOLOGY IS CODE — The Biological Operating System
// mercados.10am.pro/biology-is-code
// Point-in-time snapshot (see AS_OF). Read · Orchestrate · Write.
// ============================================================

const AS_OF = 'Sep 4, 2026';

const C_REV = '#85B7EB';
const C_GP = '#185FA5';
const C_OP = '#f59e0b';

const LAYER_COLOR = { READ: '#378ADD', ORCHESTRATE: '#D4A843', WRITE: '#22c55e' };

// Market caps / prices: Sep 4, 2026 close. Moves daily.
const TICKERS = [
  { sym: 'TEM', name: 'Tempus AI', layer: 'READ', mcap: '$11.7B', price: '$64.62', note: 'Deep oncology data, integrated with hospitals. Q2 rev $382.5M (+22%), first GAAP profit; +70% in 30 days on the Merck/Moderna mRNA-vaccine Ph3 win (Personalis deal).' },
  { sym: 'IBRX', name: 'ImmunityBio', layer: 'WRITE', mcap: '$8.6B', price: '$8.08', note: 'Immune system reboot (IL-15 superagonist). Q2 ANKTIVA sales $50.7M (+92%), 8th straight sequential gain; PDUFA Jan 6, 2027.' },
  { sym: 'CAI', name: 'Caris Life Sciences', layer: 'READ', mcap: '$7.1B', price: '$25.07', note: 'Molecular profiling. Record Q2 ($263.7M rev, +45%), adj-EBITDA positive; Caris Detect (MCED) launched.' },
  { sym: 'HIMS', name: 'Hims & Hers Health', layer: 'ORCHESTRATE', mcap: '$6.4B', price: '$27.71', note: 'D2C rails, the incentive provider. Q2 rev $753M (+38%); Q3 guided +47\u201350%. Stock \u221213% since Aug 17 on FTC suit, Visa dispute monitoring and margin compression.' },
  { sym: 'PBLS', name: 'Parabilis Medicines', layer: 'WRITE', mcap: '$5.0B', price: '$40.42', note: 'Helicon peptides for flat / undruggable proteins. IPO Jun 2026; $1.1B cash after first public quarter.' },
  { sym: 'RXRX', name: 'Recursion Pharmaceuticals', layer: 'READ', mcap: '$1.95B', price: '$3.63', note: 'Wetlab simulation; physics\u2192chemistry\u2192biology. Q2: opex cut ~40%, Genentech optioned first neuro target.' },
  { sym: 'NGEN', name: 'NervGen Pharma', layer: 'WRITE', mcap: '$249M', price: '$2.32', note: 'Nervous-system regeneration (NVG-291). Ph3 RESTORE screening starts Sep 2026; funded to 1H28 readout.' },
  { sym: 'NAUT', name: 'Nautilus Biotechnology', layer: 'READ', mcap: '$115M', price: '$0.90', note: '10B-protein mapping. First revenue booked in Q2; Nature Methods tau-proteoform paper (Sep 4). Cash still tops market cap.' },
  { sym: 'INKT', name: 'MiNK Therapeutics', layer: 'WRITE', mcap: '$55M', price: '$11.07', note: 'Immune bypass \u2014 iNKT cells target stable lipids, not peptides. Randomized Ph2 in ARDS dosing; $8.8M cash.' },
];

// Income statements ($M). type:'chart' renders bars; type:'card' is pre-revenue / newly public.
const FIN = {
  HIMS: { type: 'chart', name: 'Hims & Hers Health', sub: 'HIMS · ≈ $27.71/sh · ORCHESTRATE', mcap: '$6.4B', years: [2022, 2023, 2024, 2025, 2026],
    revenue: [526.9, 872.0, 1476.5, 2347.6, 3200], gross: [408.7, 714.9, 1173.1, 1733.4, null], op: [-68.7, -29.5, 61.9, 105.6, null], projIdx: 4,
    note: 'FY2022–FY2025 actuals shown. Q2 FY2026 (reported Aug 10): revenue $753M (+38% YoY), ~2.9M subscribers (+19%, +300K net adds), and monthly revenue per average subscriber of $92 vs $76 a year ago (+21%) — both curves rising while marketing fell 5 pts YoY to 34% of revenue. International revenue grew ~17x to $131M (incl. ~$40M from Eucalyptus, closed June; organic +13% QoQ), with the UK, Australia and Germany each above a $100M annualized run rate. Adjusted EBITDA $60M (8% margin, +1 pt QoQ); GAAP net loss -$86M, hit by ~$81M of one-time costs (Eucalyptus close, restructuring, $47.5M FTC accrual); gross margin compressed to 64% on branded-GLP-1 and international mix. Guidance implies acceleration: Q3 at $880–900M (+47–50% YoY), FY2026 raised to $3.1–3.3B (+32–41%) with $275–325M adj. EBITDA; 2030 targets of $6.5B+ revenue / $1.3B+ adj. EBITDA reiterated. The AI-native Hers Weight Loss rollout (July) showed 3x messaging engagement, 80% of questions answered by AI within clinical protocols, ~50% fewer non-clinical support tasks, and lower cancellations in the new-experience cohorts — management expects AI investment to pay back in 12–18 months. Since the print the tape has been dominated by regulation rather than growth: the FTC (with Utah and LA County) sued on Jul 29 over subscription disclosures, cancellation friction and health-data sharing with ad platforms; Visa placed the company in its Acquirer Monitoring Program in August after weight-loss chargebacks spiked (an ~$8 surcharge per dispute, and a 1.5% dispute-rate ceiling to exit); and gross margin has now compressed four quarters in a row. Against that, CEO Dudum\u2019s Aug 19 CNBC rebuttal of the FTC case lifted the stock 14% in a day, and the Aug 31 Australia launch (GLP-1s plus men\u2019s health) marks the first Asia-Pacific market. Net: the stock sits at ~$27.7, down ~13% since mid-August; Q3 (Nov 9) has to show the promised H2 FCF and margin inflection.' },
  TEM: { type: 'chart', name: 'Tempus AI', sub: 'TEM · ≈ $64.62/sh · READ', mcap: '$11.7B', years: [2022, 2023, 2024, 2025],
    revenue: [320.7, 531.8, 693.4, 1271.8], gross: [130.2, 286.2, 381.1, 797.9], op: [-265.4, -196.1, -691.1, -252.9],
    note: 'FY2022–FY2025. Revenue crossed $1.27B in 2025 (+83% YoY); gross profit scaled with it. The operating loss spiked in 2024 on heavy opex, then narrowed in 2025. Q2 FY2026 (Jul 30): revenue $382.5M (+22%), gross profit $246.5M (+26%), oncology test volume +31%, MRD volume 9,000 tests (from 6,500), Data & Applications $93.2M (+28%) with ~$200M of new data licenses signed — and the first GAAP profitable quarter ($5.6M net income, helped by $98.5M of unrealized gains; adj. EBITDA $8.0M vs \u2013$5.6M). FY2026 guidance raised to $1.595\u20131.605B revenue and ~$65M adj. EBITDA; cash and securities $820.7M after a $460M zero-coupon convertible. The pending ~$1.5B Personalis acquisition (tumor-informed MRD) was initially punished, then re-rated on Aug 19 when Merck/Moderna\u2019s personalized mRNA cancer vaccine hit its Phase 3 endpoint using Personalis sequencing — TEM +23% that day, ~+70% in 30 days. FDA 510(k) for ECG-PH (Aug 24) added a third cleared cardiology AI product; PRISM2 multimodal foundation model published in Nature Medicine (Aug 4).' },
  CAI: { type: 'chart', name: 'Caris Life Sciences', sub: 'CAI · ≈ $25.07/sh · READ', mcap: '$7.1B', years: [2024, 2025],
    revenue: [412.3, 812.0], gross: [227, 528], op: [-378, -538],
    note: 'IPO Jun 2025, so only FY2024–FY2025 are public. Revenue nearly doubled to $812M (+97%). Gross profit is estimated (~55% / 65% margin); the FY2025 operating figure is approximate and inflated by IPO-related stock comp. Q2 FY2026 (Aug 5) was a record: revenue $263.7M (+45% YoY), gross margin 68%, and the company turned adjusted-EBITDA positive (~$56M) with GAAP roughly breakeven — a genuine profitability inflection. FY2026 revenue guidance raised to ~$1.03–1.04B. ~59,200 clinical cases in the quarter (+12% QoQ); TTM revenue now ~$990M with positive TTM net income (~$105M). Caris Detect, a whole-genome multi-cancer early-detection blood test, launched commercially in July, and a $100M buyback is authorized. Sell-side targets cluster $26\u201333 (BTIG $33); the stock has round-tripped from $19 to $25 since mid-August.' },
  IBRX: { type: 'chart', name: 'ImmunityBio', sub: 'IBRX · ≈ $8.08/sh · WRITE', mcap: '$8.6B', years: [2022, 2023, 2024, 2025],
    revenue: [0.24, 0.62, 14.7, 113], gross: [0.24, 0.61, 14.6, 112], op: [-405, -361, -344, -250],
    note: 'FY2022–FY2025. Revenue is ANKTIVA product sales: ~$113M in 2025 (+700% YoY) after FDA approval in Apr 2024. Operating income for 2022 and 2025 is approximate (derived from R&D + SG&A). Q2 FY2026 (Aug 4): record net product revenue $50.7M (+92% YoY, +15% QoQ) — the eighth consecutive quarter of sequential growth since launch; H1 revenue $94.8M (+121%). Adjusted net loss narrowed to $81M; cash and securities $357M. ANKTIVA is now approved or authorized in five jurisdictions (~34 countries), including the UAE (Jul 29). Next catalyst: PDUFA Jan 6, 2027 for the sBLA in BCG-unresponsive papillary NMIBC, plus a planned 2026 sBLA for BCG-naïve CIS (QUILT-2.005). A securities class action tied to the May FDA warning letter on promotional claims remains an overhang.' },
  RXRX: { type: 'chart', name: 'Recursion Pharmaceuticals', sub: 'RXRX · ≈ $3.63/sh · READ', mcap: '$1.95B', years: [2022, 2023, 2024, 2025],
    revenue: [39.7, 43.9, 58.5, 74.3], gross: [-8.6, 1.3, 13.3, 3.3], op: [-245.7, -350.1, -479.0, -648.1],
    note: 'FY2022–FY2025. Revenue is mostly partnership / collaboration income. Gross profit is thin and volatile; the operating loss widened sharply as R&D scaled. Q2 FY2026 (Aug 5): $7.7M revenue (vs ~$12M consensus), EPS \u2013$0.25; management cut 2026 opex guidance ~40%, cited >$500M of cumulative partnership inflows and ended the quarter with $557M cash (runway into 2028). Genentech optioned the collaboration\u2019s first neuroscience target into a joint discovery program — the platform\u2019s clearest external validation to date. Five clinical programs with readouts over the next 12\u201318 months.' },
  NAUT: { type: 'chart', name: 'Nautilus Biotechnology', sub: 'NAUT · ≈ $0.90/sh · READ', mcap: '$115M', years: [2022, 2023, 2024, 2025],
    revenue: [0, 0, 0, 0], gross: [0, 0, 0, 0], op: [-63.6, -76.2, -81.5, -71.4],
    note: 'FY2022–FY2025. Pre-revenue (proteomics platform not yet commercial); the chart shows operating loss only. Shares have fallen below $1, so the ~$129M cash balance (Q2 FY2026, runway into Q1 2028) now exceeds the ~$113M market cap. Q2 opex ~$15.9M; R&D refocused on proteoform assays, and Q2 FY2026 (Jul 28) booked the company\u2019s first revenue ($190K) from the Voyager early-access program. On Sep 4 a Nature Methods paper reported the first large-scale single-molecule quantification of tau proteoforms — disease-associated modifications that read directly as biomarkers and drug targets for neurodegeneration, the READ-layer thesis in one publication.' },
  INKT: { type: 'chart', name: 'MiNK Therapeutics', sub: 'INKT · ≈ $11.07/sh · WRITE', mcap: '$55M', years: [2021, 2022, 2023, 2024, 2025],
    revenue: [0, 0, 0, 0, 0], gross: [0, 0, 0, 0, 0], op: [-18.6, -30.9, -22.9, -10.7, -11.4],
    note: 'FY2021–FY2025. Clinical-stage, no product revenue. The operating loss shrank ~63% from its 2022 peak after aggressive cost cuts. Q2 FY2026 (Aug 13): net loss $3.1M ($0.62/sh) vs $4.2M a year ago; cash $8.8M — the tightest runway in the basket. The quarter moved agenT-797 into randomized validation: first ventilated ARDS patients in the Phase 2 C-1300-02 trial (run in Ukraine) were alive at Day 28 with improved oxygenation and liberation from vasopressors, and an international paid named-patient access program was launched. Small n, blinded, preliminary — but it is the first controlled test of the off-the-shelf iNKT thesis.' },
  PBLS: { type: 'card', name: 'Parabilis Medicines', sub: 'PBLS · ≈ $40.42/sh · WRITE', mcap: '$5.0B',
    stats: [['Stage', 'Clinical-stage · pre-revenue'], ['Q2 FY2026 net loss', '-$52.5M (R&D $39.4M) · H1 -$97.8M'], ['Cash (Jun 30)', '$1.1B · IPO + private placement raised $787.9M net'], ['Platform', 'Helicon peptides — the ~80% "undruggable" flat proteome']],
    note: 'Just IPO\u2019d (Jun 10, 2026), so no multi-year public income statement yet; the first public quarter (Aug 13) showed $148K collaboration revenue and 123.5M shares outstanding. Lead asset zolucatetide targets the Wnt/\u03b2-catenin node and is heading into a planned Phase 3 in desmoid tumors; Regeneron partnership (antibody-Helicon conjugates, $50M upfront) worth up to ~$2.3B. Trades ~2x the $20 IPO price.' },
  NGEN: { type: 'card', name: 'NervGen Pharma', sub: 'NGEN · ≈ $2.32/sh · WRITE', mcap: '$249M',
    stats: [['Stage', 'Phase 3-ready · pre-revenue'], ['Cash (Jun 30)', 'US$61.1M · funded through 1H 2028 readout'], ['Q2 FY2026 opex', 'C$12.2M (R&D C$7.9M) · net loss C$29.2M incl. C$19.4M non-cash warrant mark'], ['Lead asset', 'NVG-291 — neuroreparative peptide for spinal cord injury']],
    note: 'Limited public financial history. The "GLP-1 of the nervous system" thesis: a 35-amino-acid peptide that removes the chemical brake on axon repair. Pre-revenue, so no income-statement chart yet. Q2 FY2026 (Aug 13): FDA-aligned Phase 3 RESTORE (~150 adults with chronic cervical SCI, 12 weeks of daily NVG-291 vs placebo, primary endpoint GRASSP hand function at week 12) begins site activation and screening in September 2026; enrollment completes 2H 2027, topline 1H 2028. Independent blinded gait analyses from CONNECT SCI (May) showed statistically significant gains in coordination, effort and postural stability — neural recovery, not compensation. $60M raised in May plus a $50M ATM; 107.5M shares outstanding.' },
};


// FCF per share, quarterly. FCF = operating cash flow minus capex, from 10-K/10-Q filings
// via Macrotrends (YTD figures converted to discrete quarters). Per-share uses current
// diluted shares held constant (HIMS ~231M, TEM ~180M) to isolate the cash trend.
const FCF = {
  HIMS: { name: 'Hims & Hers Health', shares: '231M sh',
    q: [['Q1\u201925', 50.1], ['Q2\u201925', -69.4], ['Q3\u201925', 79.4], ['Q4\u201925', -2.6], ['Q1\u201926', 53.0], ['Q2\u201926', -68.2]],
    note: 'Official Q2\u201926 deck reconciliation. Q2\u201926 FCF of \u2013$68M reflects working capital absorbed by the branded-Wegovy ramp \u2014 covered with a $400M receivables facility plus a ~$400M convertible, ending the quarter with $840M+ in cash. Management expects a return to FCF generation in H2 2026.' },
  TEM: { name: 'Tempus AI', shares: '180M sh',
    q: [['Q1\u201925', -109.0], ['Q2\u201925', 34.7], ['Q3\u201925', -127.9], ['Q4\u201925', -43.1], ['Q1\u201926', -83.3], ['Q2\u201926', -18.6]],
    note: 'Lumpy but improving: Q2\u201926 burn of \u2013$18.6M is the smallest outflow in the series; Q2\u201925 was FCF-positive.' },
  IBRX: { name: 'ImmunityBio', shares: '1,047M sh',
    q: [['Q1\u201925', -87.0], ['Q2\u201925', -80.8], ['Q3\u201925', -69.7], ['Q4\u201925', -71.3], ['Q1\u201926', -77.1], ['Q2\u201926', -70.0]],
    note: 'Remarkably stable burn (~$70\u201380M/q) despite ANKTIVA revenue ramp. Huge share count keeps per-share burn at pennies.' },
  RXRX: { name: 'Recursion Pharmaceuticals', shares: '540M sh',
    q: [['Q1\u201925', -133.8], ['Q2\u201925', -79.6], ['Q3\u201925', -117.6], ['Q4\u201925', -47.3], ['Q1\u201926', -81.4], ['Q2\u201926', -106.0]],
    note: 'Volatile burn despite 30% opex cuts \u2014 partnership inflows make quarters lumpy. Cash $665M, runway to early 2028.' },
  NAUT: { name: 'Nautilus Biotechnology', shares: '127M sh',
    q: [['Q1\u201925', -14.2], ['Q2\u201925', -13.7], ['Q3\u201925', -11.5], ['Q4\u201925', -12.6], ['Q1\u201926', -13.6], ['Q2\u201926', -14.2]],
    note: 'Metronomic ~$13M/q burn, pre-revenue. FY25 burn actually declined 15% vs FY24 \u2014 disciplined for a platform builder.' },
  INKT: { name: 'MiNK Therapeutics', shares: '5.0M sh',
    q: [['Q1\u201925', -1.3], ['Q2\u201925', -1.6], ['Q3\u201925', -0.9], ['Q4\u201925', -2.1], ['Q1\u201926', -1.7], ['Q2\u201926', -2.5]],
    note: 'Smallest absolute burn of the basket (~$1\u20133M/q), but the ~5M-share float makes each quarter \u2248 \u2013$0.30\u20130.50/sh. Q2\u201926 bar is an estimate from the reported $3.1M net loss (cash fell $0.7M to $8.8M); the 10-Q cash-flow statement will replace it.' },
  NGEN: { name: 'NervGen Pharma', shares: '81M sh',
    q: [['Q1\u201925', -2.9], ['Q2\u201925', -2.8], ['Q3\u201925', -3.9], ['Q4\u201925', -4.5], ['Q1\u201926', -6.0], ['Q2\u201926', -8.5]],
    note: 'Now 6 quarters. Burn accelerating as Phase 3 RESTORE start-up costs land: Q2\u201926 bar is an estimate from reported opex (C$12.2M \u2248 US$8.9M, less non-cash comp); $60M raised May 2026, cash US$61.1M funds through the 1H28 readout.' },
};
const FCF_SH = { HIMS: 231, TEM: 180.4, IBRX: 1047, RXRX: 540, NAUT: 126.6, INKT: 5.0, NGEN: 80.9 };

// IPOs too recent for any public quarterly FCF series \u2014 real annual/TTM burn shown instead.
const FCF_CARDS = [
  ['CAI', '\u2013$538M', 'FY25 net loss (distorted by IPO stock comp); TTM net income has since flipped to ~+$105M on ~$990M TTM revenue. IPO Jun 2025: first 6-quarter FCF series completes with the Q3\u201926 filing.'],
  ['PBLS', '\u2013$52.5M', 'Q2\u201926 net loss (first public quarter, Aug 13); H1\u201926 \u2013$97.8M. $1.1B cash after the $770.5M IPO + $75M Regeneron placement \u2014 ~5 years of runway at the current burn. A 6-quarter FCF series builds from here.'],
];

function FcfChart({ sym, mb }) {
  const d = FCF[sym];
  const shares = FCF_SH[sym];
  const vals = d.q.map((x) => x[1] / shares);
  const maxAbs = Math.max(...vals.map((v) => Math.abs(v))) * 1.15;
  const W = 300, H = 150, padL = 6, padR = 40, top = 14, bot = 26;
  const plotW = W - padL - padR, plotH = H - top - bot;
  const zeroY = top + plotH * (maxAbs / (2 * maxAbs));
  const scale = plotH / (2 * maxAbs);
  const bw = 22, gap = (plotW - d.q.length * bw) / (d.q.length + 1);
  return (
    <svg viewBox={'0 0 ' + W + ' ' + H} width="100%" role="img" aria-label={'FCF per share by quarter for ' + d.name}>
      <desc>Free cash flow per share, last six quarters.</desc>
      <line x1={padL} y1={zeroY} x2={W - padR + 4} y2={zeroY} stroke="var(--border)" strokeWidth="1.5" />
      {d.q.map((q, i) => {
        const v = q[1] / shares;
        const h = Math.max(Math.abs(v) * scale, 1.5);
        const x = padL + gap + i * (bw + gap);
        const y = v >= 0 ? zeroY - h : zeroY;
        return (
          <g key={q[0]}>
            <rect x={x} y={y} width={bw} height={h} rx="2" fill={v >= 0 ? '#22c55e' : '#993556'} />
            <text x={x + bw / 2} y={v >= 0 ? y - 4 : y + h + 11} textAnchor="middle" fontSize="8.5"
              fill="var(--text-secondary)" fontFamily="'JetBrains Mono',monospace">
              {(v >= 0 ? '+' : '\u2013') + '$' + Math.abs(v).toFixed(2)}
            </text>
            <text x={x + bw / 2} y={H - 6} textAnchor="middle" fontSize="8.5" fill="var(--text-muted)"
              fontFamily="'JetBrains Mono',monospace">{q[0]}</text>
          </g>
        );
      })}
      <text x={W - padR + 6} y={zeroY + 3} fontSize="8.5" fill="var(--text-muted)" fontFamily="'JetBrains Mono',monospace">$0.00</text>
    </svg>
  );
}

// Quarterly revenue ($M), Q1'25 – Q2'26: the six most recent reported quarters, so 2026 executed
// revenue (Q1+Q2) is visible next to its 2025 comps. Source: company 8-K/10-Q press releases.
// guide = FY2026 revenue guidance midpoint ($M) where the company gives one.
const QL = ['Q1\u201925', 'Q2\u201925', 'Q3\u201925', 'Q4\u201925', 'Q1\u201926', 'Q2\u201926'];
const QREV = {
  HIMS: { name: 'Hims & Hers Health', q: [586.0, 544.8, 599.0, 617.8, 608.1, 753.0], guide: 3200, guideTxt: '$3.1\u20133.3B', next: 'Q3 · Nov 9 · guided $880\u2013900M (+47\u201350%)',
    note: 'Q1\u201926 was the trough (+4% YoY) as compounded GLP-1s were pulled for branded Wegovy; Q2\u201926 re-accelerated to +38% on ~$131M international and 2.9M subscribers. H1\u201926 = $1.36B, 42.5% of the $3.2B guidance midpoint \u2014 back-half loaded, so Q3 has to print the guided $880\u2013900M.' },
  TEM: { name: 'Tempus AI', q: [255.7, 314.6, 334.2, 367.3, 348.1, 382.5], guide: 1600, guideTxt: '$1.595\u20131.605B', next: 'Q3 · early Nov',
    note: 'Six straight quarters of growth; Q1\u201926 +36%, Q2\u201926 +22% (tougher comp). H1\u201926 = $731M, 45.7% of the $1.6B guide. Q4\u201925 is derived from FY2025 ($1,271.8M) minus the three reported quarters.' },
  CAI: { name: 'Caris Life Sciences', q: [120.9, 181.4, 216.8, 292.9, 216.2, 263.7], guide: 1035, guideTxt: '$1.03\u20131.04B', next: 'Q3 · early Nov',
    note: 'Q4\u201925 ($292.9M) included ~$81M of prior-period reimbursement true-ups, which is why Q1\u201926 stepped down sequentially while still growing +79% YoY. Q2\u201926 +45%. H1\u201926 = $480M, 46.4% of the ~$1.035B guide.' },
  IBRX: { name: 'ImmunityBio', q: [16.5, 26.4, 31.8, 38.3, 44.2, 50.7], guide: null, guideTxt: 'no guidance', next: 'Q3 · early Nov · prelim revenue usually pre-announced',
    note: 'ANKTIVA net product revenue only. Eight consecutive sequential increases since launch; +15% QoQ in both 2026 quarters, +168% / +92% YoY. H1\u201926 = $94.8M vs $113M for all of FY2025 \u2014 2026 will more than double. Q3\u201925 is derived from FY2025 minus reported quarters.' },
  RXRX: { name: 'Recursion Pharmaceuticals', q: [14.7, 19.2, 5.2, 35.5, 6.5, 7.7], guide: null, guideTxt: 'no guidance', next: 'Q3 · early Nov',
    note: 'Collaboration revenue, so timing-driven and lumpy: Q4\u201925 spiked on the second Roche/Genentech phenomap milestone ($30M); Q1\u201926 $6.5M and Q2\u201926 $7.7M both missed consensus. H1\u201926 = $14.2M vs $33.9M in H1\u201925. Read the cash ($557M, runway to 2028), not the revenue line.' },
};
// Revenue-negligible or pre-revenue names: what 2026 actually printed.
const QREV_CARDS = [
  ['NAUT', '$0.19M', 'Q2\u201926 (Jul 28): first revenue ever, from the Voyager early-access program. Q1\u201926 and all of 2025 were $0. Not a revenue story until the platform is commercial (targeted 2027).'],
  ['PBLS', '$0.15M', 'Q2\u201926 (Aug 13): $148K of collaboration revenue in the first public quarter after the Jun 10 IPO. Pre-revenue; watch the $50M Regeneron upfront and milestones instead.'],
  ['INKT', '$0', 'No revenue in 2025 or 2026. Clinical-stage; a paid named-patient access program launched in Q2\u201926 but has not produced reported revenue yet.'],
  ['NGEN', '$0', 'No revenue in 2025 or 2026. Phase 3-ready; the only 2026 cash inflows are financings ($60M May raise + $50M ATM).'],
];

function fmtQ(v) {
  if (v >= 1000) return '$' + (v / 1000).toFixed(2) + 'B';
  if (v >= 100) return '$' + Math.round(v) + 'M';
  return '$' + v.toFixed(1) + 'M';
}

function QRevChart({ sym }) {
  const d = QREV[sym];
  const max = Math.max(...d.q) * 1.22;
  const W = 300, H = 160, padL = 6, padR = 6, top = 22, bot = 26;
  const plotW = W - padL - padR, plotH = H - top - bot;
  const bw = 34, gap = (plotW - d.q.length * bw) / (d.q.length + 1);
  return (
    <svg viewBox={'0 0 ' + W + ' ' + H} width="100%" role="img" aria-label={'Quarterly revenue for ' + d.name}>
      <desc>Revenue by quarter, last six reported quarters; 2026 bars highlighted with year-over-year change.</desc>
      <line x1={padL} y1={H - bot} x2={W - padR} y2={H - bot} stroke="var(--border)" strokeWidth="1.5" />
      {d.q.map((v, i) => {
        const is26 = i >= 4;
        const h = Math.max(v / max * plotH, 1.5);
        const x = padL + gap + i * (bw + gap);
        const y = H - bot - h;
        const yoy = is26 ? (v / d.q[i - 4] - 1) * 100 : null;
        return (
          <g key={QL[i]}>
            <rect x={x} y={y} width={bw} height={h} rx="2" fill={C_REV} opacity={is26 ? 1 : 0.42} />
            <text x={x + bw / 2} y={y - 4} textAnchor="middle" fontSize="8.5" fontWeight={is26 ? 700 : 400}
              fill={is26 ? 'var(--text-bright)' : 'var(--text-secondary)'} fontFamily="'JetBrains Mono',monospace">{fmtQ(v)}</text>
            {is26 && (
              <text x={x + bw / 2} y={y - 13} textAnchor="middle" fontSize="8" fontWeight="700"
                fill={yoy >= 0 ? '#22c55e' : '#993556'} fontFamily="'JetBrains Mono',monospace">{(yoy >= 0 ? '+' : '') + Math.round(yoy) + '% YoY'}</text>
            )}
            <text x={x + bw / 2} y={H - 6} textAnchor="middle" fontSize="8.5" fontWeight={is26 ? 700 : 400}
              fill={is26 ? 'var(--gold)' : 'var(--text-muted)'} fontFamily="'JetBrains Mono',monospace">{QL[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

const TABS = ['HIMS', 'TEM', 'CAI', 'IBRX', 'RXRX', 'NAUT', 'INKT', 'PBLS', 'NGEN'];

const STACK = [
  { lvl: 'Level 5', label: 'Clinical outcomes', desc: 'Human health, lifespan, systemic performance.', c: '#22c55e' },
  { lvl: 'Level 4', label: 'Proteins & proteoforms', desc: '3D Lego-like structures that execute function. Disfunction here is the root of all disease.', c: '#378ADD' },
  { lvl: 'Level 3', label: 'Peptides', desc: 'Short chains — the body\u2019s biological instruction set.', c: '#888780' },
  { lvl: 'Level 2', label: 'Amino acids & chemistry', desc: 'Raw dietary inputs and chemical compilers.', c: '#7F77DD' },
  { lvl: 'Level 1', label: 'Atoms', desc: 'The lowest level of abstraction — the physical hardware.', c: '#993556' },
];

const CHAIN = {
  READ: { tag: 'READ', sub: 'Data extraction', items: [
    ['Nautilus ($NAUT)', '10B-protein mapping; Tau proteoforms / neuro.'],
    ['Tempus & Caris ($TEM / $CAI)', 'Deep oncology data integrated with hospitals.'],
    ['Recursion ($RXRX)', 'Wetlab simulation lowering chemical toxicity.'],
  ] },
  ORCHESTRATE: { tag: 'ORCHESTRATE', sub: 'Distribution & inference', items: [
    ['Hims ($HIMS)', 'D2C infrastructure, longitudinal biomarker aggregation — the incentive provider that owns the consumer. AI "load bearing, not decorative": the only closed loop of intake → treatment → follow-up → outcome at ~3M-subscriber scale, aiming to sell $50–150K/yr concierge-level care by subscription.'],
  ] },
  WRITE: { tag: 'WRITE', sub: 'Biological intervention', items: [
    ['ImmunityBio ($IBRX)', 'Immune-system reboot (IL-15 superagonist).'],
    ['MiNK ($INKT)', 'Immune bypass — iNKT cells / stable lipids.'],
    ['NervGen ($NGEN)', 'Nervous-system regeneration (NVG-291).'],
    ['Parabilis ($PBLS)', 'Solving flat-protein errors (Helicon peptides).'],
  ] },
};

function fmtM(v) {
  const s = v < 0 ? '-' : '';
  const a = Math.abs(v);
  if (a >= 1000) return s + '$' + (a / 1000).toFixed(2) + 'B';
  return s + '$' + Math.round(a) + 'M';
}
function pct(v) { return (v > 0 ? '+' : '') + Math.round(v) + '%'; }

function stats(arr, years) {
  const start = arr[0], end = arr[arr.length - 1], n = years.length - 1;
  if (start === 0 && end === 0) return { na: true };
  if (start > 0 && end > 0) {
    return { cagr: pct((Math.pow(end / start, 1 / n) - 1) * 100), tot: pct((end / start - 1) * 100), na: false };
  }
  const tot = ((end - start) / Math.abs(start)) * 100;
  const cagr = Math.sign(Math.abs(end) - Math.abs(start)) * (Math.pow(Math.abs(end) / Math.abs(start), 1 / n) - 1) * 100;
  return { cagr: pct(-cagr), tot: pct(tot), na: false };
}

function Chip({ color, label, s }) {
  return (
    <div style={{ flex: 1, minWidth: 150, border: '1px solid var(--border)', borderRadius: 6, padding: '7px 11px', background: 'var(--surface)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
        <span style={{ width: 9, height: 9, borderRadius: 2, background: color }} />{label}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 3 }}>
        {s.na ? <span style={{ color: 'var(--text-muted)' }}>no revenue</span>
          : <>CAGR <b style={{ fontWeight: 700 }}>{s.cagr}</b> · Total <b style={{ fontWeight: 700 }}>{s.tot}</b></>}
      </div>
    </div>
  );
}

function IncomeChart({ d, mb }) {
  const W = 640, H = mb ? 280 : 340, padR = 56, padL = 8, padT = 22, padB = 26;
  const all = [...d.revenue, ...d.gross, ...d.op].filter((v) => v != null);
  all.push(0);
  let max = Math.max(...all), min = Math.min(...all);
  const span = (max - min) || 1; max += span * 0.06; min -= span * 0.04;
  const y = (v) => padT + (max - v) / (max - min) * (H - padT - padB);
  const plotW = W - padR - padL, n = d.years.length, groupW = plotW / n, barGap = 4;
  const bw = Math.min(16, (groupW - barGap * 2 - 12) / 3);
  const y0 = y(0);
  const series = [{ k: 'revenue', c: C_REV }, { k: 'gross', c: C_GP }, { k: 'op', c: C_OP }];
  const ticks = 5;
  const gridLines = [], yLabels = [];
  for (let i = 0; i <= ticks; i++) {
    const v = max - (max - min) * i / ticks, yy = y(v);
    gridLines.push(<line key={'g' + i} x1={padL} y1={yy} x2={W - padR} y2={yy} stroke="var(--border-subtle)" strokeWidth="1" />);
    yLabels.push(<text key={'l' + i} x={W - padR + 6} y={yy + 3.5} fontSize="10.5" fill="var(--text-muted)" fontFamily="'JetBrains Mono',monospace">{fmtM(v)}</text>);
  }
  const bars = [];
  d.years.forEach((yr, i) => {
    const isProj = d.projIdx === i;
    const gx = padL + i * groupW + (groupW - (bw * 3 + barGap * 2)) / 2;
    series.forEach((s, j) => {
      const v = d[s.k][i], bx = gx + j * (bw + barGap);
      if (v == null) return;
      if (v === 0) {
        bars.push(<rect key={i + s.k} x={bx} y={y0 - 1} width={bw} height={2} rx={1} fill={s.c} opacity={0.45} />);
      } else {
        const yy = y(v), h = Math.abs(yy - y0), top = v >= 0 ? yy : y0;
        const projStyle = isProj ? { opacity: 0.4, stroke: s.c, strokeWidth: 1.4, strokeDasharray: '3 2' } : {};
        bars.push(<rect key={i + s.k} x={bx} y={top} width={bw} height={Math.max(h, 1.5)} rx={2} fill={s.c} {...projStyle} />);
      }
    });
    bars.push(<text key={'yr' + i} x={padL + i * groupW + groupW / 2} y={H - 8} textAnchor="middle" fontSize="11" fill={isProj ? 'var(--gold)' : 'var(--text-secondary)'} fontFamily="'JetBrains Mono',monospace">{isProj ? yr + 'E' : yr}</text>);
  });
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={`Income statement bars for ${d.name}`}>
        <desc>Revenue, gross profit and operating income by fiscal year.</desc>
        {gridLines}
        <line x1={padL} y1={y0} x2={W - padR} y2={y0} stroke="var(--border)" strokeWidth="1.5" />
        {bars}
        {yLabels}
      </svg>
    </div>
  );
}

export default function BiologyIsCode() {
  const [active, setActive] = useState('HIMS');
  const [theme, setTheme] = useState('dark');
  const [mb, setMb] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('10am-theme') || 'dark';
    setTheme(saved);
    document.documentElement.classList.toggle('light', saved === 'light');
    const onR = () => setMb(window.innerWidth <= 768);
    onR();
    window.addEventListener('resize', onR);
    return () => window.removeEventListener('resize', onR);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('10am-theme', next);
    document.documentElement.classList.toggle('light', next === 'light');
  };

  const d = FIN[active];
  const sectionLabel = { fontSize: 12, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.5px', marginBottom: 10, fontFamily: "'JetBrains Mono',monospace" };

  return (
    <div style={{ maxWidth: 920, margin: '0 auto', padding: mb ? '6px 8px' : '10px 20px' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)', marginBottom: 18 }}>
        <a href="https://10am.pro?utm_source=biology-is-code&utm_medium=header&utm_campaign=hub" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <img src="/logo.jpg" alt="10AMPRO" style={{ width: 34, height: 34, borderRadius: 6 }} />
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>← 10am.pro</span>
        </a>
        <button onClick={toggleTheme} title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text-primary)', fontSize: 16, width: 36, height: 32, cursor: 'pointer' }}>
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </header>

      {/* HERO */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', letterSpacing: '1px', marginBottom: 8, fontFamily: "'JetBrains Mono',monospace" }}>● BIOLOGY IS CODE — THE BIOLOGICAL OPERATING SYSTEM</div>
        <h1 style={{ fontSize: mb ? 25 : 38, fontWeight: 800, color: 'var(--text-bright)', lineHeight: 1.1, fontFamily: "'Space Grotesk',sans-serif", marginBottom: 12 }}>
          We are moving from reactive chemistry to a predictive Biological OS
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.6, maxWidth: 700 }}>
          Companies bridging the gap between molecular reality and AI computation are generating the largest asymmetric wealth-creation event of the decade. The thesis reduces to three verbs: <b style={{ color: 'var(--text-primary)' }}>Read the code, orchestrate the data, write the biology.</b>
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
          {['Read the Code', 'Orchestrate the Data', 'Write the Biology'].map((t, i) => (
            <span key={t} style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, padding: '5px 11px', borderRadius: 6,
              border: '1px solid ' + [LAYER_COLOR.READ, LAYER_COLOR.ORCHESTRATE, LAYER_COLOR.WRITE][i] + '55',
              color: [LAYER_COLOR.READ, LAYER_COLOR.ORCHESTRATE, LAYER_COLOR.WRITE][i] }}>{t}</span>
          ))}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 14, fontFamily: "'JetBrains Mono',monospace" }}>Snapshot · {AS_OF} · 9 tickers</div>
      </div>

      {/* SCALING LAW */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: mb ? '14px' : '16px 20px', marginBottom: 24 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-bright)', fontFamily: "'Space Grotesk',sans-serif", marginBottom: 6 }}>The new scaling law is <span style={{ color: '#22c55e' }}>Healthspan per Token</span></div>
        <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.6, margin: 0 }}>
          Old scaling laws governed software: more parameters → more intelligence. The next massive consumer reallocation of capital is biological. Consumers exhibit near-full price elasticity for platforms that demonstrably add years of healthy life — bending the curve from traditional aging (1 year lived = 1 year lost) toward <b style={{ color: 'var(--text-primary)' }}>longevity escape velocity</b>, where predictive ontologies return more than a year of healthspan per year lived.
        </p>
      </div>

      {/* PROTEOMIC STACK */}
      <div style={{ marginBottom: 24 }}>
        <div style={sectionLabel}>"SICKNESS IS SIMPLY A BUG IN THE PROTEOMIC NETWORK"</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {STACK.map((s) => (
            <div key={s.lvl} style={{ display: 'flex', alignItems: 'stretch', gap: 10, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{ width: 5, background: s.c }} />
              <div style={{ padding: '9px 4px 9px 0', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono',monospace", color: 'var(--text-muted)' }}>{s.lvl}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-bright)', fontFamily: "'Space Grotesk',sans-serif" }}>{s.label}</span>
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.45, marginTop: 2 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 8, fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.5 }}>
          To fix a bug at Level 5, AI must compute the physics of Level 1 and write code via Level 3. Read the proteome, then write back with precision.
        </div>
      </div>

      {/* VALUE CHAIN */}
      <div style={{ marginBottom: 24 }}>
        <div style={sectionLabel}>MAPPING THE BIO-OS VALUE CHAIN</div>
        <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : '1fr 1fr 1fr', gap: 8 }}>
          {['READ', 'ORCHESTRATE', 'WRITE'].map((key) => {
            const col = CHAIN[key];
            return (
              <div key={key} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: LAYER_COLOR[key], letterSpacing: '0.5px', fontFamily: "'JetBrains Mono',monospace" }}>{col.tag}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 10, fontFamily: "'JetBrains Mono',monospace" }}>{col.sub}</div>
                {col.items.map((it) => (
                  <div key={it[0]} style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-bright)', fontFamily: "'Space Grotesk',sans-serif" }}>{it[0]}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.45, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{it[1]}</div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 8, fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.5 }}>
          Read and Write are brilliant tools, but they lack the end-consumer relationship. The platform that owns distribution and provides incentives (the D2C ontological flywheel) captures the majority of the economic value — an insurmountable "singularity scaler."
        </div>
      </div>

      {/* MARKET CAP TABLE */}
      <div style={{ marginBottom: 24 }}>
        <div style={sectionLabel}>MARKET CAP · {AS_OF}</div>
        <div style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
          {TICKERS.map((t, i) => (
            <div key={t.sym} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: mb ? '10px 12px' : '11px 16px', borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)', background: 'var(--surface)' }}>
              <div style={{ width: mb ? 52 : 60 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-bright)', fontFamily: "'JetBrains Mono',monospace" }}>{t.sym}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.price}</div>
              </div>
              <div style={{ width: mb ? 16 : 96 }}>
                <span style={{ fontSize: 9.5, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", letterSpacing: '0.5px',
                  color: LAYER_COLOR[t.layer] }}>{mb ? t.layer[0] : t.layer}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, color: 'var(--text-primary)', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600 }}>{t.name}</div>
                {!mb && <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.note}</div>}
              </div>
              <div style={{ fontSize: mb ? 15 : 18, fontWeight: 700, color: 'var(--text-bright)', fontFamily: "'JetBrains Mono',monospace" }}>{t.mcap}</div>
            </div>
          ))}
        </div>
      </div>

      {/* INCOME STATEMENTS */}
      <div style={{ marginBottom: 24 }}>
        <div style={sectionLabel}>INCOME STATEMENTS · annual · USD millions</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
          {TABS.map((sym) => {
            const on = sym === active;
            return (
              <button key={sym} onClick={() => setActive(sym)}
                style={{ padding: '6px 12px', fontSize: 13, fontWeight: on ? 700 : 400, fontFamily: "'JetBrains Mono',monospace",
                  border: '1px solid ' + (on ? 'var(--gold)' : 'var(--border)'), borderRadius: 6, cursor: 'pointer',
                  background: on ? 'var(--surface-2)' : 'transparent', color: on ? 'var(--text-bright)' : 'var(--text-secondary)' }}>
                {sym}
              </button>
            );
          })}
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: mb ? '14px' : '16px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-bright)', fontFamily: "'Space Grotesk',sans-serif" }}>{d.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: "'JetBrains Mono',monospace" }}>{d.sub}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Market cap</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-bright)', fontFamily: "'JetBrains Mono',monospace" }}>{d.mcap}</div>
            </div>
          </div>

          {d.type === 'chart' ? (
            <>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                {(() => {
                  const aLen = d.projIdx ?? d.years.length;
                  const yrs = d.years.slice(0, aLen);
                  return (<>
                    <Chip color={C_REV} label="Revenue" s={stats(d.revenue.slice(0, aLen), yrs)} />
                    <Chip color={C_GP} label="Gross profit" s={stats(d.gross.slice(0, aLen), yrs)} />
                    <Chip color={C_OP} label="Operating income" s={stats(d.op.slice(0, aLen), yrs)} />
                  </>);
                })()}
              </div>
              <IncomeChart d={d} mb={mb} />
              {d.projIdx != null && (
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6, fontFamily: "'Plus Jakarta Sans',sans-serif", display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ display: 'inline-block', width: 11, height: 9, borderRadius: 2, border: '1.4px dashed ' + C_REV, background: C_REV, opacity: 0.4 }} />
                  <span><b style={{ color: 'var(--gold)' }}>2026E</b> = FY2026 revenue guidance midpoint (~$3.2B); CAGR chips use FY2022–FY2025 actuals only.</span>
                </div>
              )}
            </>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : '1fr 1fr', gap: 8, marginBottom: 4 }}>
              {d.stats.map((s) => (
                <div key={s[0]} style={{ background: 'var(--surface-2)', borderRadius: 6, padding: '10px 12px' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: "'JetBrains Mono',monospace", marginBottom: 3 }}>{s[0]}</div>
                  <div style={{ fontSize: 13.5, color: 'var(--text-primary)', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, lineHeight: 1.4 }}>{s[1]}</div>
                </div>
              ))}
            </div>
          )}
          <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 10, lineHeight: 1.5, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{d.note}</div>
        </div>
      </div>

      {/* QUARTERLY REVENUE — 2026 EXECUTED */}
      <div style={{ marginBottom: 24 }}>
        <div style={sectionLabel}>INGRESOS POR TRIMESTRE · Q1\u201925 \u2192 Q2\u201926 · lo ejecutado en 2026 vs. sus comps</div>
        <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: 8, marginBottom: 10 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'JetBrains Mono',monospace", fontSize: mb ? 11 : 12, minWidth: 560 }}>
            <thead>
              <tr style={{ background: 'var(--surface-2)' }}>
                {['Ticker', 'Q1\u201926', 'YoY', 'Q2\u201926', 'YoY', 'H1\u201926', 'H1 YoY', 'FY26 guide', '% guide'].map((h, i) => (
                  <th key={h} style={{ textAlign: i === 0 ? 'left' : 'right', padding: '8px 10px', color: 'var(--text-muted)', fontWeight: 600, fontSize: 10.5, borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(QREV).map((sym, ri) => {
                const d = QREV[sym];
                const q1 = d.q[4], q2 = d.q[5], h1 = q1 + q2, h1p = d.q[0] + d.q[1];
                const y1 = (q1 / d.q[0] - 1) * 100, y2 = (q2 / d.q[1] - 1) * 100, yh = (h1 / h1p - 1) * 100;
                const P = ({ v }) => <span style={{ color: v >= 0 ? '#22c55e' : '#993556', fontWeight: 600 }}>{(v >= 0 ? '+' : '') + Math.round(v) + '%'}</span>;
                const td = { textAlign: 'right', padding: '8px 10px', borderTop: ri === 0 ? 'none' : '1px solid var(--border-subtle)', whiteSpace: 'nowrap', color: 'var(--text-primary)' };
                return (
                  <tr key={sym} style={{ background: 'var(--surface)' }}>
                    <td style={{ ...td, textAlign: 'left', fontWeight: 700, color: 'var(--text-bright)' }}>{sym}</td>
                    <td style={td}>{fmtQ(q1)}</td><td style={td}><P v={y1} /></td>
                    <td style={{ ...td, fontWeight: 700, color: 'var(--text-bright)' }}>{fmtQ(q2)}</td><td style={td}><P v={y2} /></td>
                    <td style={td}>{fmtQ(h1)}</td><td style={td}><P v={yh} /></td>
                    <td style={{ ...td, color: 'var(--text-secondary)' }}>{d.guideTxt}</td>
                    <td style={{ ...td, color: d.guide ? 'var(--gold)' : 'var(--text-muted)', fontWeight: d.guide ? 700 : 400 }}>{d.guide ? Math.round(h1 / d.guide * 1000) / 10 + '%' : '\u2014'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : '1fr 1fr', gap: 8, marginBottom: 8 }}>
          {Object.keys(QREV).map((sym) => (
            <div key={sym} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6, gap: 8, flexWrap: 'wrap' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-bright)', fontFamily: "'Space Grotesk',sans-serif" }}>{QREV[sym].name}</div>
                <div style={{ fontSize: 10.5, color: 'var(--text-muted)', fontFamily: "'JetBrains Mono',monospace" }}>{sym} · revenue $M · 6Q</div>
              </div>
              <QRevChart sym={sym} />
              <div style={{ fontSize: 11, color: 'var(--gold)', marginTop: 4, fontFamily: "'JetBrains Mono',monospace" }}>Next print: {QREV[sym].next}</div>
              <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.5, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{QREV[sym].note}</div>
            </div>
          ))}
        </div>
        <div style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
          {QREV_CARDS.map((c, i) => (
            <div key={c[0]} style={{ display: 'flex', alignItems: 'baseline', gap: 10, padding: '9px 16px', borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)', background: 'var(--surface)' }}>
              <div style={{ width: 52, fontSize: 13, fontWeight: 700, color: 'var(--text-bright)', fontFamily: "'JetBrains Mono',monospace" }}>{c[0]}</div>
              <div style={{ width: 72, fontSize: 13, fontWeight: 700, color: c[1] === '$0' ? 'var(--text-muted)' : C_REV, fontFamily: "'JetBrains Mono',monospace" }}>{c[1]}</div>
              <div style={{ flex: 1, minWidth: 0, fontSize: 11.5, color: 'var(--text-secondary)', fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.45 }}>{c[2]}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 8, fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.5 }}>
          Reported GAAP revenue by quarter from each company\u2019s 8-K / 10-Q (IBRX = ANKTIVA net product revenue). 2026 bars are solid, 2025 comps faded. TEM Q4\u201925 and IBRX Q3\u201925 are derived from the FY2025 total minus the other three reported quarters. \u201c% guide\u201d = H1\u201926 revenue over the FY2026 guidance midpoint; a healthy back-half-weighted business sits around 42\u201347% at this point.
        </div>
      </div>

      {/* FCF PER SHARE */}
      <div style={{ marginBottom: 24 }}>
        <div style={sectionLabel}>FCF POR ACCIÓN · quarterly · last 6 quarters</div>
        <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : '1fr 1fr', gap: 8, marginBottom: 8 }}>
          {Object.keys(FCF).map((sym) => (
            <div key={sym} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-bright)', fontFamily: "'Space Grotesk',sans-serif" }}>{FCF[sym].name}</div>
                <div style={{ fontSize: 10.5, color: 'var(--text-muted)', fontFamily: "'JetBrains Mono',monospace" }}>{sym} · {FCF[sym].shares} · {FCF[sym].q.length}Q</div>
              </div>
              <FcfChart sym={sym} mb={mb} />
              <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 8, lineHeight: 1.5, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{FCF[sym].note}</div>
            </div>
          ))}
        </div>
        <div style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
          {FCF_CARDS.map((c, i) => (
            <div key={c[0]} style={{ display: 'flex', alignItems: 'baseline', gap: 10, padding: '9px 16px', borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)', background: 'var(--surface)' }}>
              <div style={{ width: 52, fontSize: 13, fontWeight: 700, color: 'var(--text-bright)', fontFamily: "'JetBrains Mono',monospace" }}>{c[0]}</div>
              <div style={{ width: 72, fontSize: 13, fontWeight: 700, color: c[1].startsWith('+') ? '#22c55e' : '#993556', fontFamily: "'JetBrains Mono',monospace" }}>{c[1]}</div>
              <div style={{ flex: 1, minWidth: 0, fontSize: 11.5, color: 'var(--text-secondary)', fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.45 }}>{c[2]}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 8, fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.5 }}>
          Discrete quarterly FCF (operating cash flow − capex) from 10-K/10-Q filings via Macrotrends, YTD converted to standalone quarters. The latest INKT and NGEN bars (Q2'26) are flagged estimates derived from reported net loss / opex until the 10-Q cash-flow statements are in the data feed. CAI and PBLS IPO'd too recently for any public quarterly series; their real annual/quarterly burn is shown above instead of an invented one.
        </div>
      </div>

      {/* TECHNICAL ANALYSIS + FORECAST — live, same engine as the Solana hubs */}
      <BioTA tickers={TICKERS} mb={mb} sectionLabel={sectionLabel} />

      {/* COMPUTE BOTTLENECK */}
      <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '14px 16px', marginBottom: 24 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-bright)', fontFamily: "'Space Grotesk',sans-serif", marginBottom: 5 }}>The compute required for biology dwarfs today\u2019s AI infrastructure</div>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.6, margin: 0 }}>
          Every H100 GPU installed on Earth would provide only <b style={{ color: '#22c55e' }}>~0.02%</b> of the compute needed to build an exhaustive proteomic map of a single human for a single year. We are at the absolute infancy of biological computation — the singularity scalers that solve this bottleneck can eclipse the scale of today\u2019s tech giants.
        </p>
      </div>

      {/* METHODOLOGY */}
      <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '14px 16px', marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.5px', marginBottom: 8, fontFamily: "'JetBrains Mono',monospace" }}>METODOLOGÍA & NOTAS</div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.7, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          <li>Market caps and prices are a point-in-time snapshot ({AS_OF}) and move daily.</li>
          <li>Income-statement charts are annual GAAP actuals (FY2022–FY2025) from company filings and Yahoo Finance. NAUT and INKT are pre-revenue, so only operating income is plotted.</li>
          <li>2026 executed revenue is charted in the INGRESOS POR TRIMESTRE section (Q1'25–Q2'26, reported GAAP revenue from 8-K/10-Q releases); the annual bars stop at FY2025 because FY2026 is not yet complete. Q2 FY2026 results for all nine tickers (reported Jul 28 – Aug 13, 2026) are also reflected in each ticker's commentary. HIMS figures are from its Aug 10 Q2 deck and call; the rest from company press releases and 10-Q/8-K filings. Post-quarter developments through Sep 4 (FTC/Visa at HIMS, Merck–Moderna readout for TEM, Nature Methods for NAUT) are noted where material.</li>
          <li>CAI (IPO Jun 2025) shows only FY2024–FY2025; its gross profit is estimated from margin and its operating income is approximate (2025 distorted by IPO stock comp).</li>
          <li>IBRX operating income for 2022 and 2025 is approximate (derived from R&D + SG&A).</li>
          <li>PBLS (IPO Jun 2026) and NGEN (Nasdaq Jan 2026) are pre-revenue with limited public history — shown as info cards, not charts.</li>
          <li>FCF per share uses discrete quarterly FCF (OCF − capex) from company filings via Macrotrends — except HIMS, whose series comes directly from the official Q2 FY2026 investor deck reconciliation — divided by current diluted shares held constant across the series to isolate the cash trend. Pre-revenue names show TTM/annual burn because no 6-quarter public series exists.</li>
          <li>This is data and research context, not investment advice.</li>
        </ul>
      </div>

      <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderTop: '1px solid var(--border)', fontFamily: "'JetBrains Mono',monospace" }}>
        <a href="https://10am.pro" style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none' }}>10am.pro</a>
        <span style={{ fontSize: 12, color: '#22c55e', fontWeight: 700 }}>Hasta la muerte, toda derrota es psicológica.</span>
      </footer>
    </div>
  );
}
