// Editor TA per ticker. Same shape as TOKEN.ta in the Solana hub configs:
// { updated, bias: 'BULL'|'BEAR', read, pattern, watch, decision: [], invalidation: { level, text }, path: [{ d, h, target, how }], levels: { resistance: [[px, why]], support: [[px, why]] } }
// A ticker without an entry falls back to the live auto-forecast (lib/thesis/ta.js).
// Review pass data: /api/equity/{SYM}?summary=1 — basis for this pass: daily closes through 23 Sep 2026 (QSI added 2 Oct 2026, data through Oct 2).
const U = '23 Sep 2026';

export const EDITOR_TA = {
  TEM: {
    updated: U, bias: 'BULL',
    read: 'Seven of seven checks green. On Sep 17 TEM closed at 80.36 (+15% on the day, volume 3.6× the 90-day average) and has consolidated between 76 and 78 since without giving the jump back: that is a flag, not a top. Clean higher lows: 41.55 (Jul 29) → 49.36 (Aug 18) → 58.74 (Sep 10). EMA20 68.6, EMA50 62.0, EMA200 58.2 and rising. What is missing: RSI 71 — not a level you chase — and between 80 and 103 (12-month high) there are no support pivots, so the next drop, if it comes, is fast down to 72.7.',
    pattern: '<b>Uptrend with a flag above the Sep 15–17 gap.</b> Support 41.55 → 58.74, 3 touches, today at ~64. No valid resistance line: every high took out the prior one (61.6 → 72.7 → 80.4). Flagpole 58.7 → 80.4 = 21.6; measured from the prior high of 72.7 → ~94.',
    watch: '<b>The retest.</b> 72.7 (Aug 21 high) is the logical floor of a pullback; 68.6 (EMA20, start of the gap) is the last one. A retest of 72–74 on falling volume is a buy on structure. <b>Volume:</b> 20d at 123% of 90d — it must not dry up on the break of 80.4.',
    decision: [
      'Holding: <b>keep it while it closes above 68.6</b>. Add at 72–74, not at 80.',
      'Not holding: <b>first tranche at 72–74</b> if the pullback arrives on low volume; second on a close &gt; 80.4 with 2× volume.',
      'Single trigger that flips the bias: <b>daily close &lt; 68.6</b> — the gap fills and the chart goes back to 64 (trendline).',
    ],
    invalidation: { level: 68.6, text: 'A daily close below 68.6 (EMA20 and the start of the Sep 15 gap) fills the gap and voids the flag → next stop 64 (trendline) and 58.7 (Sep 10 low).' },
    path: [
      { d: 30, h: '+1M', target: 85, how: 'Retest of 72–74 → break of 80.4 on volume → 85. Without a retest and with RSI above 70 the path is slower, but the destination does not change.' },
      { d: 90, h: '+3M', target: 94, how: 'Flag measure (72.7 + 21.6). The first level where taking some off makes sense.' },
      { d: 365, h: '+1Y', target: 103, how: '12-month high. Requires the Q2 GAAP profit to repeat and revenue to keep growing &gt;20%.' },
    ],
    levels: {
      resistance: [[80.36, 'Sep 17 high — record close of the leg'], [85, '+1M target'], [94, 'Flag measure'], [103.3, '12-month high']],
      support: [[72.69, 'Aug 21 high — retest floor'], [68.6, 'INVALIDATION · EMA20 / gap'], [64, 'Higher-lows trendline'], [58.74, 'Sep 10 low · EMA200 58.2']],
    },
  },

  IBRX: {
    updated: U, bias: 'BULL',
    read: 'Seven of seven checks, but the important datum is structural: the triangle that had been compressing since February (ceiling 11.55 → 8.40, floor 5.64 → 6.83) broke to the upside. Close of 9.29 on Sep 22 (+10%, volume 1.4× average) and today it gives back to 8.63. Higher lows remain intact: 6.72 (Jun 16) → 6.83 (Jul 29) → 7.72 (Sep 10). EMA20 8.26, EMA50 8.00, EMA200 6.87 and rising. What is missing: 20-day volume is flat (98% of 90d) — a breakout without volume gets retested. And the catalyst that matters is binary: PDUFA on Jan 6, 2027.',
    pattern: '<b>Symmetrical triangle — bullish breakout (Sep 22).</b> Ceiling from 11.55 (Feb 24), 3 touches, today at ~7.94. Floor from 5.64 (Feb 5), 3 touches, today at ~7.21. Apex ~Oct 23: the breakout came early, so it counts. Height ~5.8 → measure 13.7.',
    watch: '<b>The retest of the broken ceiling.</b> 7.9–8.0 (triangle ceiling + EMA50) has to hold; 7.72 is the last higher low. <b>PDUFA Jan 6, 2027:</b> the chart will rise into the event if 7.7 holds — and there the risk turns binary. Size before the PDUFA, not during.',
    decision: [
      'Holding: <b>keep it while it closes above 7.72</b>. Consider trimming part at 11.5 ahead of the PDUFA.',
      'Not holding: <b>first tranche at 7.9–8.1</b> (retest of the ceiling); second on a close &gt; 9.44 with volume.',
      'Single trigger that flips the bias: <b>daily close &lt; 7.72</b> — the breakout was false and price goes back inside the triangle.',
    ],
    invalidation: { level: 7.72, text: 'A daily close below 7.72 (last higher low, Sep 10) puts price back inside the triangle → next stop 7.21 (triangle floor) and 6.87 (EMA200).' },
    path: [
      { d: 30, h: '+1M', target: 9.45, how: 'Retest of 7.9–8.0 → reclaims 9.29 → 9.44, the Jul 2 high. Without volume it stays in the 8–9.3 range.' },
      { d: 90, h: '+3M', target: 11.5, how: 'February high, right before the PDUFA. The market usually pays for the run-up into the event.' },
      { d: 365, h: '+1Y', target: 13.7, how: 'Triangle measure. Requires approval on Jan 6 and ANKTIVA sales sustaining the +90% annual pace.' },
    ],
    levels: {
      resistance: [[9.29, 'Sep 22 close — breakout day'], [9.44, 'Jul 2 high'], [11.55, 'February high · origin of the ceiling'], [13.7, 'Triangle measure']],
      support: [[8.0, 'EMA50 · broken triangle ceiling'], [7.72, 'INVALIDATION · Sep 10 low'], [7.21, 'Triangle floor'], [6.87, 'EMA200']],
    },
  },

  CAI: {
    updated: U, bias: 'BULL',
    read: 'Seven of seven, but extended: +30% since Sep 11 (24.34), RSI 79. The sequence is textbook — lows 14.55 (May 15) → 15.38 → 20.97 → 24.03 (Sep 9), highs 23.4 → 28.0 → 31.65 — and volume confirms (20d at ~175% of 90d). The problem is where it sits: 32.95–33.66 is the 12-month high, 4–6% from price. EMA20 26.9, EMA50 23.7, EMA200 22.1 rising. The trend is fine; the entry is not.',
    pattern: '<b>Accelerating uptrend — higher lows, no ceiling in the window.</b> Broke 28.0 (Aug 25 high) on Sep 17. The real ceiling is horizontal: 33–33.7, the 52-week high. From 28 the leg measure (height ~17) gives ~45.',
    watch: '<b>33.0–33.7.</b> First time in a year it gets there; most likely it stalls and retests 28. That retest is the entry. <b>RSI:</b> above 75 you do not buy; wait for it to cool to 55–60 with price above 28.',
    decision: [
      'Holding: <b>keep it while it closes above 26.0</b>. Take some off at 33–34 if it arrives with RSI above 80.',
      'Not holding: <b>wait for the retest of 28–29</b>. Second tranche on a close &gt; 33.7 with 2× volume.',
      'Single trigger that flips the bias: <b>daily close &lt; 26.0</b> — loses the EMA20 and the start of the Sep 14 leg.',
    ],
    invalidation: { level: 26.0, text: 'A daily close below 26.0 (EMA20 and the start of the Sep 14 leg) voids the acceleration → next stop 24.0 (Sep 9 low) and 22–23.7 (EMA200 / EMA50).' },
    path: [
      { d: 30, h: '+1M', target: 33.7, how: 'Pullback to 28–29 with RSI cooling → return to the 52-week high. In 1M the likelier outcome is that 33.7 stalls, not that it breaks.' },
      { d: 90, h: '+3M', target: 39.3, how: 'Break of 33.7 → 39.3, the post-IPO high. Needs the third record quarter in a row and Caris Detect adoption.' },
      { d: 365, h: '+1Y', target: 45, how: 'Leg measure from 28. Requires positive adjusted EBITDA to turn into positive cash flow.' },
    ],
    levels: {
      resistance: [[33.66, '52-week high'], [39.3, 'Post-IPO high'], [45, 'Leg measure']],
      support: [[28.0, 'Aug 25 high — retest zone'], [26.0, 'INVALIDATION · EMA20 / start of the leg'], [24.03, 'Sep 9 low'], [22.05, 'EMA200']],
    },
  },

  HIMS: {
    updated: U, bias: 'BEAR',
    read: 'One of seven: price is below all three EMAs (20: 28.85 · 50: 29.48 · 200: 30.62) and the EMA200 is already falling. Yesterday it touched 30.43 — exactly the triangle ceiling — and today gave back 6.7%. The chart is sitting on the floor (lows 25.0 → 27.39 → 27.44) with the apex on Oct 7: it resolves soon. 20-day volume is at 62% of 90d — nobody is buying the dip. The divergence with the business is real (Q3 guide +47–50%), but with the FTC and Visa overhead the chart is not paying for it.',
    pattern: '<b>Symmetrical triangle below the EMA200 — bearish continuation until proven otherwise.</b> Ceiling from 38.28 (Jul 6) → 33.78 (Aug 21), today at ~30.55. Floor from 14.52 (Feb 27) → 27.44 (Sep 10), today at ~28.3. Apex ~Oct 7. In a bearish regime these patterns resolve with the prior trend ~2:1.',
    watch: '<b>27.4.</b> It is the triangle floor and the August–September double low; a close below opens 25.0 fast. <b>30.6</b> is the ceiling + EMA200 — the only zone where the bias changes. <b>Q3 earnings (early Nov):</b> the +47–50% guide is the catalyst that can turn the chart, but it lands after the apex.',
    decision: [
      'Holding: <b>reduce on bounces to 30–30.5</b>; do not average down while below the EMA200.',
      'Not holding: <b>wait</b>. Entry only on a close &gt; 30.7 with volume, or at 22–25 if it gets there.',
      'Single trigger that flips the bias: <b>daily close &gt; 30.7</b> with 2× volume — breaks the ceiling and reclaims the EMA200.',
    ],
    invalidation: { level: 30.7, text: 'A daily close above 30.7 (triangle ceiling + EMA200) invalidates the bearish bias → next stop 33.8 (Aug 21 high).' },
    path: [
      { d: 30, h: '+1M', target: 25.0, how: 'Loses 27.4 before the apex → 25.0, the Jul 29 low.' },
      { d: 90, h: '+3M', target: 22.3, how: 'May 18 low. If Q3 delivers the guide, this is the floor where the business takes over again.' },
      { d: 365, h: '+1Y', target: 19.8, how: 'Half the triangle measure. Only if the regulatory issue (FTC / payment network) escalates.' },
    ],
    levels: {
      resistance: [[29.48, 'EMA50'], [30.7, 'INVALIDATION · triangle ceiling + EMA200'], [33.78, 'Aug 21 high'], [38.28, 'Jul 6 high']],
      support: [[27.44, 'Triangle floor · Sep 10 low'], [25.0, 'Jul 29 low'], [22.29, 'May 18 low'], [19.8, 'Half measure']],
    },
  },

  PBLS: {
    updated: U, bias: 'BEAR',
    read: 'Only 72 sessions since the June IPO — the EMA200 means nothing yet; the useful frame is the 25.01–41.73 range. On Sep 18 it printed 41.73 on volume 14× the 90-day average — a climax — and in three sessions fell to 33.31 (−20%; −12.7% today alone), losing the EMA20 (37.8) and EMA50 (36.2), RSI 36. Today it closed right on the 50% of the range (33.37). 20-day volume is 55% above 90d: the selling has size. Off the chart: $1.1B of cash against $5B of market cap and zero revenue — flows move the price, not the numbers.',
    pattern: '<b>Post-IPO range 25–42, violent rejection at the top.</b> Not enough history for pivot trendlines. Fibonacci levels of the range: 50% 33.37 (where it is), 61.8% 31.40, 78.6% 28.59. If the lockup is the standard 180 days, it expires mid-December — inside the 3M horizon.',
    watch: '<b>33.4.</b> If the 50% does not hold within two or three sessions, 31.4 is the next stop. <b>Lockup:</b> the year-end expiry is the biggest supply event in sight. <b>Recovery:</b> only a close above 37.8 (EMA20) says the drop was a shakeout.',
    decision: [
      'Holding: <b>reduce if it loses 31.4</b>; buy back lower near the lockup.',
      'Not holding: <b>wait</b>. The zone of interest is 25–28.6, ideally around the lockup.',
      'Single trigger that flips the bias: <b>daily close &gt; 37.8</b> (EMA20) with volume.',
    ],
    invalidation: { level: 37.8, text: 'A daily close above 37.8 (EMA20) reclaims the upper range and voids the bias → next stop 41.7 (Sep 18 high).' },
    path: [
      { d: 30, h: '+1M', target: 31.4, how: 'Loses the 50% of the range → 61.8% (31.4).' },
      { d: 90, h: '+3M', target: 28.6, how: '78.6% of the range, with the year-end lockup as supply pressure.' },
      { d: 365, h: '+1Y', target: 25.0, how: 'Retest of the post-IPO low. With no Helicon clinical data in the window, price goes back to where it started.' },
    ],
    levels: {
      resistance: [[36.2, 'EMA50'], [37.8, 'INVALIDATION · EMA20'], [41.73, 'Sep 18 closing high']],
      support: [[33.37, '50% of the post-IPO range — where it is today'], [31.4, '61.8% of the range'], [28.59, '78.6% of the range'], [25.01, 'Post-IPO low']],
    },
  },

  RXRX: {
    updated: U, bias: 'BULL',
    read: 'Four of seven — neutral regime, but the structure is moving. The July–September descending triangle (ceiling 3.96 → 3.63, flat floor 2.84–2.89) broke to the upside on Sep 17–18 and reached 4.05 on the 22nd. Today it gave back 8.6% to 3.70: exactly the EMA200 (3.71), which is still falling. A descending triangle that breaks up is a bear trap — if it holds. Volume is flat (100% of 90d): no confirmation yet. The lows are rising: 2.89 (Jul 20) → 3.09 → 3.16 (Sep 10).',
    pattern: '<b>Descending triangle — bullish breakout on retest.</b> Ceiling from 3.96 (Jul 6), 3 touches, today at ~3.53. Flat floor ~2.9, 3 touches. Height ~1.08 → measure 4.6 from the breakout. Price right at the EMA200: this week\u2019s close decides.',
    watch: '<b>3.53.</b> The broken ceiling has to work as a floor; a close below turns the breakout into a false one. <b>EMA200 (3.71):</b> two consecutive closes above 3.75 and the 200 starts to turn. <b>Genentech:</b> the option on the first neuro target is the kind of news that validates the opex cut.',
    decision: [
      'Holding: <b>keep it while it closes above 3.50</b>.',
      'Not holding: <b>small tranche at 3.55–3.65</b> with a stop at 3.50; second on a close &gt; 4.05 with volume.',
      'Single trigger that flips the bias: <b>daily close &lt; 3.50</b> — false breakout, back to the 3.1–3.5 range.',
    ],
    invalidation: { level: 3.5, text: 'A daily close below 3.50 (broken triangle ceiling) marks a false breakout → next stop 3.16 (Sep 10 low) and 2.9 (triangle floor).' },
    path: [
      { d: 30, h: '+1M', target: 4.05, how: 'Holds 3.53 → reclaims the Sep 22 high.' },
      { d: 90, h: '+3M', target: 4.6, how: 'Triangle measure. Requires volume above 1.5× on the break of 4.05.' },
      { d: 365, h: '+1Y', target: 4.96, how: '6-month high. Anything higher needs clinical data, not just cost cuts.' },
    ],
    levels: {
      resistance: [[3.71, 'EMA200 — where it is today'], [4.05, 'Sep 22 high'], [4.6, 'Triangle measure'], [4.96, '6-month high']],
      support: [[3.53, 'Broken triangle ceiling'], [3.5, 'INVALIDATION'], [3.16, 'Sep 10 low'], [2.89, 'Triangle floor']],
    },
  },

  NGEN: {
    updated: U, bias: 'BEAR',
    read: 'Zero of seven. Price below all three EMAs (20: 2.10 · 50: 2.07 · 200: 2.69, down 4% in 20 days), RSI 28 — oversold. After the May–June drop (3.63 → 1.73) price built a 1.59–2.34 range and today sits in the lower half, at 1.96. Volume is drying up (80% of 90d). No clinical catalyst nearby: RESTORE is only starting screening and the readout is 1H28. That leaves the chart without an engine of its own for a long time.',
    pattern: '<b>Base range 1.59–2.34 inside a downtrend.</b> Range highs: 2.20 (Jun 18), 2.12 (Jul 2), 2.335 (Aug 27). Lows: 1.73 (Jun 10), 1.59 (Jul 29), 1.68 (Aug 17). The range ceiling coincides with the falling EMA50: that is the real resistance.',
    watch: '<b>1.68–1.73.</b> The zone of the June and August lows; with RSI 28 the likely outcome is a bounce, not a break. <b>2.34:</b> range ceiling — a close above on volume is the first sign the base is done. <b>Dilution:</b> with no data until 2028, any financing gets sold against the price.',
    decision: [
      'Holding: <b>do not average down</b> until it closes above 2.34.',
      'Not holding: <b>only small tranches at 1.6–1.75</b> as a long-term option, knowing there is no catalyst until 2028.',
      'Single trigger that flips the bias: <b>daily close &gt; 2.34</b> with volume — range breakout.',
    ],
    invalidation: { level: 2.34, text: 'A daily close above 2.34 (range ceiling, Aug 27) invalidates the bearish bias → next stop 2.69 (EMA200).' },
    path: [
      { d: 30, h: '+1M', target: 1.73, how: 'Loses 1.90 → Jun 10 low. With RSI 28 the drop is slow.' },
      { d: 90, h: '+3M', target: 1.59, how: 'Retest of the range floor (Jul 29).' },
      { d: 365, h: '+1Y', target: 1.46, how: '2-year low. Only with dilutive financing and no RESTORE news.' },
    ],
    levels: {
      resistance: [[2.1, 'EMA20 · EMA50 2.07'], [2.34, 'INVALIDATION · range ceiling'], [2.69, 'EMA200']],
      support: [[1.73, 'Jun 10 low'], [1.68, 'Aug 17 low'], [1.59, 'Range floor · Jul 29'], [1.46, '2-year low']],
    },
  },

  NAUT: {
    updated: U, bias: 'BEAR',
    read: 'Two of seven. The downtrend from 3.95 (Mar 24) still rules: EMA200 at 1.75 and falling 9% in 20 days, EMA50 at 1.18. But something changed: price is now above the lower-highs line (today at ~0.89) and the lows stopped falling — 0.852 (Aug 18) and nothing below since. The Sep 9 jump to 1.12 was given back entirely. Off the chart: cash exceeds market cap, and price has spent most of a month below $1 — the risk of a Nasdaq minimum-price notice is real.',
    pattern: '<b>Downtrend with the ceiling line just broken — base forming at 0.85–1.12.</b> Ceiling from 3.95, 4 touches (2.36 → 1.90 → 1.77 → 1.12). No valid support line yet. The base needs a second higher low to confirm.',
    watch: '<b>0.85.</b> The Aug 18 low is the floor of the base. <b>1.12–1.18:</b> the Sep 9 high + EMA50 — a close above is the first sign of a trend change. <b>$1:</b> holding above matters for Nasdaq compliance, not just for the chart. Possible reverse split if it does not reclaim it.',
    decision: [
      'Holding: <b>keep it only as an option</b> backed by cash; do not add below the EMA50.',
      'Not holding: <b>wait for a close &gt; 1.18</b>, or a small tranche at 0.85–0.90 with a stop below 0.80.',
      'Single trigger that flips the bias: <b>daily close &gt; 1.18</b> (EMA50) with volume.',
    ],
    invalidation: { level: 1.18, text: 'A daily close above 1.18 (EMA50, above the Sep 9 high) invalidates the bearish bias → next stop 1.64–1.77 (July zone) and 1.75 (EMA200).' },
    path: [
      { d: 30, h: '+1M', target: 0.85, how: 'Bounces rejected below 1.0 → retest of the Aug 18 low.' },
      { d: 90, h: '+3M', target: 0.77, how: 'Loses 0.85 → bearish measure. A reverse split in this window usually adds pressure.' },
      { d: 365, h: '+1Y', target: 0.64, how: '2-year low. Cash above market cap is the floor argument — the market is not paying for it.' },
    ],
    levels: {
      resistance: [[1.0, '$1 — Nasdaq threshold'], [1.12, 'Sep 9 high'], [1.18, 'INVALIDATION · EMA50'], [1.75, 'EMA200']],
      support: [[0.89, 'Broken ceiling line (now floor)'], [0.852, 'Aug 18 low'], [0.767, 'Bearish measure'], [0.639, '2-year low']],
    },
  },

  QSI: {
    updated: '2 Oct 2026', bias: 'BULL',
    read: 'Five of seven checks green and the two missing ones are the story: RSI 88 and a 200-day slope still negative (0.98, falling). This is a vertical breakout, not a trend: 0.72 (Sep 15) → 1.43 (Oct 1) is +98% in 12 sessions, with Oct 1 printing 16.2M shares against a 20-day average of 5.9M (2.7×) on the HUPO interim data. Price cleared every EMA (20 at 0.93, 50 at 0.86, 200 at 0.98) and the Jun 4 high of 1.28 in two days. The structure the engine still draws — a descending triangle from 1.28/0.85 over a 0.70–0.73 floor — was resolved to the upside on Sep 29–30, so the auto bear path is stale; the editor path replaces it. What is missing: time. Nothing between 1.43 and 2.63 (12-month high, Nov 2025 base) has traded since the spring.',
    pattern: '<b>Bear-triangle failure → vertical breakout.</b> Three-touch floor 0.70–0.73 (Jul 29, Aug 18, Sep 15) held, then the ceiling (1.28 → 0.85) broke on Sep 29 with the gap to 0.96 and never closed. Measured move from the floor plus the triangle height (0.60): ~1.30, already met. The next reference is the 52-week range: 2.63 high, 3.10 above it.',
    watch: '<b>The first red week.</b> After +98% in 12 sessions the pullback is a question of when, not if. 1.28 (Jun 4 high, now support) is where the breakout gets tested; 0.98 (EMA200) is the last line. A pullback that holds 1.28 on falling volume is a buy on structure. <b>Volume:</b> it must stay above the 90-day average (4.4M) through the consolidation — if it drops back to 2–3M on the retest, the move was a data spike. <b>Catalyst:</b> HUPO follow-through and any Proteus timeline update (currently Q2 2027).',
    decision: [
      'Holding: <b>keep the core while it closes above 1.28</b>; with RSI at 88 this is where part of a trading tranche comes off, not where you add.',
      'Not holding: <b>wait for the retest of 1.28–1.35</b> on falling volume; chasing 1.40+ buys the top of a 12-session spike.',
      'Single trigger that flips the bias: <b>daily close &lt; 1.28</b> — the breakout above the June high failed and the chart returns to the EMA cluster at 0.93–0.98.',
    ],
    invalidation: { level: 1.28, text: 'A daily close below 1.28 (Jun 4 high, the level that was taken out on Oct 1) voids the breakout → next stop 0.98 (EMA200 / Sep 29 gap) and 0.72 (triangle floor).' },
    path: [
      { d: 30, h: '+1M', target: 1.75, how: 'Retest of 1.28–1.35 on low volume → consolidation above the June high → new leg. Without a retest the path is a sideways 1.20–1.45 range first.' },
      { d: 90, h: '+3M', target: 2.30, how: 'Mid of the spring air pocket (1.43 → 2.63). Requires volume to stay above 90d average through the consolidation and no financing hitting the chart.' },
      { d: 365, h: '+1Y', target: 3.10, how: '52-week high. Requires Proteus still on track for Q2 2027 and the HUPO data converting into a named customer or partner.' },
    ],
    levels: {
      resistance: [[1.43, 'Oct 1 high — top of the breakout'], [1.75, '+1M target'], [2.63, '12-month high · Nov 2025'], [3.10, '52-week high']],
      support: [[1.28, 'INVALIDATION · Jun 4 high, now support'], [0.98, 'EMA200 · Sep 29 gap'], [0.85, 'Aug 25 high — broken ceiling'], [0.72, 'Triangle floor, 3 touches']],
    },
  },

  INKT: {
    updated: U, bias: 'BULL',
    read: 'Seven of seven, but in a compressed regime: all four EMAs sit between 11.46 and 11.75 and the 200 is almost flat (+0.4% in 20 days). The March–September triangle (ceiling 14.21 → 12.2, floor 8.56 → 10.95) broke to the upside: 12.35 today, above the ceiling at ~11.7. What is missing: volume. The 20-day average is at 65% of 90d, and daily dollar volume is around $160k — any order moves the price. RSI 70. Off the chart: $8.8M of cash, so an equity raise is likely and hits this chart directly.',
    pattern: '<b>Symmetrical triangle — bullish breakout without volume.</b> Ceiling from 14.21 (Apr 17), today at ~11.67. Floor from 8.56 (Mar 24), 3 touches, today at ~11.28. Apex ~Oct 6. Height ~5.3 → measure 17.',
    watch: '<b>Volume on the breakout.</b> Without 2× the average, this breakout can be undone in one session. <b>11.3–11.7:</b> broken ceiling + triangle floor + EMAs — if price comes back there, that is the test. <b>Financing:</b> with $8.8M of cash, an offering announcement is the biggest risk on the chart.',
    decision: [
      'Holding: <b>keep it while it closes above 11.3</b>; small size because of liquidity.',
      'Not holding: <b>wait for the retest of 11.7</b>, or a close &gt; 12.8 with volume.',
      'Single trigger that flips the bias: <b>daily close &lt; 11.3</b> — loses the triangle floor and the EMAs.',
    ],
    invalidation: { level: 11.3, text: 'A daily close below 11.3 (triangle floor and EMA cluster) voids the breakout → next stop 10.95 (Sep 1 low) and 10.24 (Jul 22).' },
    path: [
      { d: 30, h: '+1M', target: 12.8, how: 'Holds 11.7 → Jun 3 high.' },
      { d: 90, h: '+3M', target: 14.2, how: 'Origin of the ceiling (Apr 17). Needs the first Ph2 ARDS data point or financing resolved.' },
      { d: 365, h: '+1Y', target: 17.0, how: 'Triangle measure. Requires positive randomized data.' },
    ],
    levels: {
      resistance: [[12.76, 'Jun 3 high'], [14.21, 'Apr 17 high'], [16.3, '12-month high'], [17.0, 'Triangle measure']],
      support: [[11.7, 'Broken triangle ceiling · EMA20'], [11.3, 'INVALIDATION · triangle floor'], [10.95, 'Sep 1 low'], [10.24, 'Jul 22 low']],
    },
  },
};
