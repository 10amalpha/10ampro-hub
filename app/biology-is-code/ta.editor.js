// Editor TA per ticker. Same shape as TOKEN.ta in the Solana hub configs:
// { updated, bias: 'BULL'|'BEAR', read, pattern, watch, decision: [], invalidation: { level, text }, path: [{ d, h, target, how }], levels: { resistance: [[px, why]], support: [[px, why]] } }
// A ticker without an entry falls back to the live auto-forecast (lib/thesis/ta.js).
// Review pass data: /api/equity/{SYM}?summary=1 — basis for this pass: daily closes through 9 Oct 2026 (Friday). Previous pass: 23 Sep 2026 (QSI 2 Oct).
const U = '9 Oct 2026';

export const EDITOR_TA = {
  TEM: {
    updated: U, bias: 'BULL',
    read: 'The flag broke, then the breakout failed. From 76.6 (Sep 23) TEM ran to 85.08 (Sep 28, the 30-day high) and 83.55 (Oct 5), then printed a −14% session on Oct 6 (83.55 → 71.98) with no company news and has sat at 69–71 since. Score drops from 7/7 to 4/7: price is below EMA20 (73.97) and the MACD turned down; it still holds EMA50 (67.84) and EMA200 (60.39, rising). RSI 41 — the overbought reading of September is gone. Higher lows 41.55 → 58.74 are intact; the trendline sits at ~70.3, which is exactly where it closed on Oct 9 (70.93).',
    pattern: '<b>Uptrend, failed breakout above 80.4, now sitting on the higher-lows trendline.</b> Support 41.55 (Jul 29) → 58.74 (Sep 10), 3 touches, today at ~70.3. No ceiling line: 85.08 is the new leg high. The Sep 15–17 gap (68.6–72.7) was filled in one session on Oct 6, which voids the flag measure (94). What is left is the trendline and the EMA50.',
    watch: '<b>70.3 and 67.8.</b> A close above the trendline on Oct 9 is the first good sign after the dump; the EMA50 (67.84) is the last line before the structure is in doubt. <b>Volume:</b> 20d at 146% of 90d, but it is sell-side volume — the Oct 6 bar was the biggest down day since July. The bias stays BULL only because the higher lows are intact; a close under 67.8 turns this into a range 58.7–85.',
    decision: [
      'Holding: <b>keep it while it closes above 67.8</b> (EMA50). No adds until it reclaims 74 (EMA20) on volume.',
      'Not holding: <b>first tranche at 68–70</b> only if the trendline holds for three sessions; second on a close &gt; 74.',
      'Single trigger that flips the bias: <b>daily close &lt; 67.8</b> — trendline and EMA50 gone, next stop 58.7.',
    ],
    invalidation: { level: 67.8, text: 'A daily close below 67.8 (EMA50, just under the higher-lows trendline) breaks the structure that has held since July → next stop 64 and 58.74 (Sep 10 low, EMA200 60.4).' },
    path: [
      { d: 30, h: '+1M', target: 74, how: 'Hold 70, reclaim the EMA20 at 74 and close the Oct 6 gap partially. Not 85 — the failed breakout has to be repaired first.' },
      { d: 90, h: '+3M', target: 85, how: 'Retest of the Sep 28 / Oct 5 highs. Requires Q3 results (Nov) to repeat the GAAP profit.' },
      { d: 365, h: '+1Y', target: 103, how: '12-month high. Unchanged from the prior pass; the Oct 6 reversal changes the timing, not the destination.' },
    ],
    levels: {
      resistance: [[73.97, 'EMA20 — first reclaim'], [80.36, 'Sep 17 high · old flag top'], [85.08, 'Sep 28 high · leg high'], [103.3, '12-month high']],
      support: [[70.3, 'Higher-lows trendline — today'], [67.8, 'INVALIDATION · EMA50'], [64, 'Jul–Aug shelf'], [58.74, 'Sep 10 low · EMA200 60.4']],
    },
  },

  IBRX: {
    updated: U, bias: 'BULL',
    read: 'Seven of seven and this time with volume. The Sep 22 breakout (9.29) got its retest at 8.44–8.64 (Sep 23–25) and then ran: 9.44 (Sep 30), 10.28 (Oct 2), 10.51 (Oct 9, +6% on 1.5× average volume). 30-day volume is 148% of the 90-day average — the missing ingredient of the last pass is now there. Higher lows 6.72 → 6.83 → 7.72 → 8.44 (Sep 25). EMA20 9.25, EMA50 8.59, EMA200 7.16 and rising. RSI 69 — getting warm, not yet overbought. Next resistance is 11.55 (Feb 24 high) and then 12.43 (52-week high).',
    pattern: '<b>Triangle breakout confirmed, retested, extended.</b> The old ceiling 11.55 → 8.40 is now ~7.7 and well below price. Floor 6.66 (Mar 30) → 6.83 (Jul 29), 3 touches, today ~6.9. Triangle measure 13.7 stays the 3-month objective. The retest low of 8.44 (Sep 25) is the new structural level.',
    watch: '<b>11.55.</b> The February high is the first real seller zone; a clean close above it with volume opens 12.4 and the measure at 13.7. <b>PDUFA Jan 6, 2027:</b> the chart is pricing it in early — RSI near 70 three months before a binary event means the sizing question comes sooner than planned. <b>Pullback floor:</b> 9.25 (EMA20) then 8.44.',
    decision: [
      'Holding: <b>keep it while it closes above 8.44</b>. Trim a third at 11.5–12.4 ahead of the PDUFA; do not go into Jan 6 with the full position.',
      'Not holding: <b>wait for 9.2–9.5</b> (EMA20 retest); chasing 10.5 after a 25% month buys a warm RSI.',
      'Single trigger that flips the bias: <b>daily close &lt; 8.44</b> — the retest low fails and the breakout is back in question.',
    ],
    invalidation: { level: 8.44, text: 'A daily close below 8.44 (Sep 25 retest low) undoes the breakout follow-through → next stop 7.72 (Sep 10) and 7.16 (EMA200).' },
    path: [
      { d: 30, h: '+1M', target: 11.6, how: 'Push into the Feb 24 high. Probably a pause there; the first dip to 9.3–9.5 is the add.' },
      { d: 90, h: '+3M', target: 13.7, how: 'Triangle measure. Lines up with the run into the Jan 6 PDUFA — where part of the position comes off.' },
      { d: 365, h: '+1Y', target: 15.8, how: 'Requires a positive PDUFA and ANKTIVA sales still compounding sequentially. Binary; size for it.' },
    ],
    levels: {
      resistance: [[11.55, 'Feb 24 high'], [12.43, '52-week high'], [13.7, 'Triangle measure'], [15.8, '+1Y target']],
      support: [[9.25, 'EMA20'], [8.44, 'INVALIDATION · Sep 25 retest low'], [7.72, 'Sep 10 low'], [7.16, 'EMA200']],
    },
  },

  CAI: {
    updated: U, bias: 'BULL',
    read: 'Five of seven. The run from 24 (Sep 10) to 32.27 (Sep 24) reversed hard on Oct 1 (30.63 → 28.35) and again Oct 6 (30.39 → 27.45), then recovered +8% on Oct 9 to 29.70 — a volatile two weeks that netted out flat. Price sits a hair above EMA20 (28.70) and above EMA50 (26.10) and EMA200 (23.0, rising). RSI 46, MACD turned down. The structure is still an uptrend with higher lows (14.55 → 15.38 → 24.03), but the 30-day range 24–32 is now a box until one side gives.',
    pattern: '<b>Uptrend in a 24–32.3 box.</b> Higher-lows trendline from 14.55 (May 15) and 15.38 (Jul 22) is far below (~16.3) — not actionable. The actionable frame is the box: 32.27 (Sep 24) is the ceiling, 27.1 (Oct 7) and 24.03 (Sep 10) the floors. No ceiling line because every high since May took out the prior one.',
    watch: '<b>27.1 and 32.3.</b> The Oct 7 low is the near floor; losing it on volume sends it to the 26.1 EMA50 and then 24. A close above 32.3 resumes the uptrend toward 33.65 (52-week high). <b>Volume:</b> 20d at 156% of 90d, split between the up days and the Oct 1 / Oct 6 drops — no edge either way yet.',
    decision: [
      'Holding: <b>keep it while it closes above 26.1</b> (EMA50). Add on a hold of 27–28 with volume, not at 32.',
      'Not holding: <b>first tranche at 27–28</b>; second on a close &gt; 32.3.',
      'Single trigger that flips the bias: <b>daily close &lt; 26.1</b> — the EMA50 goes and the box floor at 24 is next.',
    ],
    invalidation: { level: 26.1, text: 'A daily close below 26.1 (EMA50) breaks the near structure → next stop 24.03 (Sep 10 low) and 23.0 (EMA200).' },
    path: [
      { d: 30, h: '+1M', target: 32.3, how: 'Back to the Sep 24 high; the box resolves up if 27 holds.' },
      { d: 90, h: '+3M', target: 36, how: 'Break of 33.65 (52-week high) on Q3 results (Nov) with adj-EBITDA still positive.' },
      { d: 365, h: '+1Y', target: 45, how: 'Requires Caris Detect (MCED) revenue to show up in guidance.' },
    ],
    levels: {
      resistance: [[32.27, 'Sep 24 high · box top'], [33.65, '52-week high'], [36, '+3M target'], [45, '+1Y target']],
      support: [[28.7, 'EMA20'], [27.1, 'Oct 7 low · near floor'], [26.1, 'INVALIDATION · EMA50'], [24.03, 'Sep 10 low · box floor']],
    },
  },

  HIMS: {
    updated: U, bias: 'BULL',
    read: 'Five of seven, and the Oct 9 session changed the picture: +10% to 30.92 on 494M, the biggest bar in a month, closing above EMA20 (29.23), EMA50 (29.43) and EMA200 (30.48) in one move. For four weeks HIMS had been pinned in a 27.4–30.4 contraction — 15 closes between 28 and 30 — and the triangle apex was days away. The break is up. What is still missing: EMA50 below EMA200 (the 200 is still falling, slope −1%) and 20-day volume at 71% of 90d. The Oct 9 bar is one day; it needs a follow-through above 30.4 to count.',
    pattern: '<b>Symmetrical triangle — upside break on Oct 9.</b> Ceiling 38.28 (Jul 6) → 30.43 (Sep 22), 3 touches, today ~28.7. Floor 14.52 (Feb 27) → 27.44 (Sep 10), 3 touches, today ~29.4. Price closed above both lines. Height ~11 → measure 38–40 (coincides with the Jul 6 high). The Sep 22 high (30.43) is the retest level.',
    watch: '<b>30.4 holds or it does not.</b> A close back under 30.4 within the week makes Oct 9 a false break and the chart returns to the 28–30 box. Above 32.2 (+1M) the next shelf is 33.8 and then 38.3. <b>Volume:</b> the Oct 9 bar must be followed by at least average volume on the next up day. <b>Q3 earnings Nov 9:</b> the triangle break lines up with the run into the print.',
    decision: [
      'Holding: <b>keep it while it closes above 27.44</b> (triangle floor, Sep 10 low). Add on a hold of 30.4 after the break, not on the +10% day.',
      'Not holding: <b>first tranche at 29.5–30.4</b> (retest of the ceiling); second on a close &gt; 32.2 with volume.',
      'Single trigger that flips the bias: <b>daily close &lt; 27.44</b> — the floor goes and the triangle resolves down.',
    ],
    invalidation: { level: 27.44, text: 'A daily close below 27.44 (Sep 10 low, triangle floor) resolves the contraction to the downside → next stop 25.0 (Jul low) and 22.' },
    path: [
      { d: 30, h: '+1M', target: 33.8, how: 'Follow-through on the triangle break → 32.2 → the Aug 17 gap at 33.8. Into the Nov 9 print.' },
      { d: 90, h: '+3M', target: 38.3, how: 'Triangle measure and the Jul 6 high. Requires a clean Q3 (guided +47–50%) and no new FTC headline.' },
      { d: 365, h: '+1Y', target: 48, how: 'Half the way back to the 65.3 high. Requires the peptide channel (post-PCAC) to show in subscriber growth.' },
    ],
    levels: {
      resistance: [[32.2, '+1M target'], [33.8, 'Aug 17 gap'], [38.28, 'Jul 6 high · triangle measure'], [48, '+1Y target']],
      support: [[30.43, 'Sep 22 high · broken ceiling'], [29.4, 'EMA50 / triangle floor line'], [27.44, 'INVALIDATION · Sep 10 low'], [25.0, 'Jul low']],
    },
  },

  PBLS: {
    updated: U, bias: 'BEAR',
    read: 'Score 2/7, RSI 19 — the most oversold chart in the basket. From the 41.73 climax (Sep 18) PBLS has fallen 12 of 15 sessions to 27.48 (Oct 9), −34%, with every Fibonacci level of the post-IPO range giving way on first touch: 33.4 (Sep 23), 31.4 (Oct 1), 28.6 (Oct 8). Only 85 sessions of history; EMA200 (32.8) means little, but price is 15% below EMA20 (32.2) and below EMA50 (33.9). Volume on the way down has been 1.8× the 90-day average — distribution, not a drift. The post-IPO low of 25.01 is 9% away.',
    pattern: '<b>Post-IPO range 25–42, full retracement in progress.</b> No pivot trendlines possible yet. All three Fibonacci levels broke; the next reference is the range floor 25.01 and the 52-week low 24.51. RSI below 20 has marked short-term bottoms in every IPO this size, but it is a bounce signal, not a reversal signal.',
    watch: '<b>25.0.</b> A hold there with a volume climax is the first place a bounce is worth trading; a break opens 20–22. <b>Reversal needs</b> a close back above 28.6 (78.6% level) and then 32.2 (EMA20). <b>Lockup:</b> IPO was June → 180-day expiry mid-December is the supply event in sight. <b>RSI 19:</b> expect a 2–4 session bounce; sell it unless 28.6 is reclaimed.',
    decision: [
      'Holding: <b>reduce on any bounce to 30–31</b> unless 28.6 is reclaimed and held; buy back near the lockup.',
      'Not holding: <b>wait</b>. The zone of interest is 22–25, ideally into the December lockup expiry.',
      'Single trigger that flips the bias: <b>daily close &gt; 32.2</b> (EMA20) with volume.',
    ],
    invalidation: { level: 32.2, text: 'A daily close above 32.2 (EMA20) reclaims the middle of the range and voids the bias → next stop 33.9 (EMA50) and 36.' },
    path: [
      { d: 30, h: '+1M', target: 25.0, how: 'Retest of the post-IPO low after an oversold bounce to 29–30 fails.' },
      { d: 90, h: '+3M', target: 22, how: 'Break of 25 into the mid-December lockup expiry; new post-IPO low.' },
      { d: 365, h: '+1Y', target: 25, how: 'Flat from here on a 12-month view: the lockup supply gets absorbed in H1 2027 and the first Helicon clinical data decides the direction.' },
    ],
    levels: {
      resistance: [[28.59, '78.6% of the range — broken Oct 8'], [31.4, '61.8% of the range'], [32.2, 'INVALIDATION · EMA20'], [33.9, 'EMA50']],
      support: [[27.48, 'Oct 9 close — today'], [25.01, 'Post-IPO low'], [24.51, '52-week low'], [22, '+3M target']],
    },
  },

  RXRX: {
    updated: U, bias: 'BULL',
    read: 'Six of seven. The descending triangle (3.96 → 3.63 ceiling) that was the frame in September is gone: price broke out on Sep 29 (4.03), ran to 4.78 (Oct 5, +16% on the day), gave back to 3.95 (Oct 8) and bounced +10% to 4.36 (Oct 9) on 1.3× average volume. Higher lows 2.84 → 2.89 → 3.16 (Sep 10) → 3.70 (Sep 28). EMA20 3.99, EMA50 3.69, EMA200 3.76 — price above all three, and the 50 is about to cross the 200 (the one check still missing). RSI 56 after the shakeout.',
    pattern: '<b>Descending-triangle breakout, retested at the EMA20.</b> Old ceiling 3.96 (Jul 6) → 3.63 (Sep 4), 3 touches, now ~3.44 — well below price. Floor 2.84 (Mar 30) → 2.89 (Jul 20), 3 touches. Height ~1.1 → measure from the breakout at 3.65: ~4.75, met on Oct 5. The Oct 8 low (3.95) is the retest of the EMA20 and the new structural level.',
    watch: '<b>3.95.</b> The Oct 8 retest low has to hold; under it, 3.69 (EMA50) is the last line of the breakout. <b>4.78</b> is the near ceiling — a close above it on volume is the signal for the next leg (5.5, then 7.18 52-week high). <b>EMA50 × EMA200 cross</b> within days would make it 7/7.',
    decision: [
      'Holding: <b>keep it while it closes above 3.69</b> (EMA50). Add on a hold of 3.95–4.1, not above 4.6.',
      'Not holding: <b>first tranche at 3.95–4.1</b>; second on a close &gt; 4.78.',
      'Single trigger that flips the bias: <b>daily close &lt; 3.69</b> — breakout and retest both fail, back into the triangle.',
    ],
    invalidation: { level: 3.69, text: 'A daily close below 3.69 (EMA50) puts price back inside the old triangle → next stop 3.44 (old ceiling) and 3.16 (Sep 10 low).' },
    path: [
      { d: 30, h: '+1M', target: 4.8, how: 'Retest of the Oct 5 high after the EMA20 held.' },
      { d: 90, h: '+3M', target: 5.5, how: 'Break of 4.78 → the Feb–Mar shelf at 5.5. Requires the Q3 print (Nov) to show the opex cut holding and another partner milestone.' },
      { d: 365, h: '+1Y', target: 7.2, how: '52-week high. Needs a clinical readout from the AI-designed pipeline, not just cost control.' },
    ],
    levels: {
      resistance: [[4.78, 'Oct 5 high · triangle measure'], [5.5, 'Feb–Mar shelf'], [7.18, '52-week high'], [10.9, 'Engine +1Y (ATH-based)']],
      support: [[3.99, 'EMA20'], [3.95, 'Oct 8 retest low'], [3.69, 'INVALIDATION · EMA50'], [3.16, 'Sep 10 low']],
    },
  },

  NGEN: {
    updated: U, bias: 'BEAR',
    read: 'Zero of seven. The Sep 17 lower high (2.27) was the third touch of a descending line from 4.39 (Apr 6); since then nine of thirteen sessions closed down and NGEN sits at 1.73 (Oct 9), 1% above the 52-week low of 1.58 (Jul 30 area, −1.7 in 90d window). EMA20 1.89, EMA50 1.98, EMA200 2.59, all falling. RSI 32 and 20-day volume at 73% of 90d — no capitulation bar yet, just a drift. The Ph3 RESTORE screening start (Sep) did nothing for the chart.',
    pattern: '<b>Downtrend — lower highs, no floor.</b> Resistance line 4.39 (Apr 6) → 2.27 (Sep 17), 3 touches, today ~1.99 (coincides with the EMA50). No support line: 1.58–1.59 (Jul low) is a horizontal level, not a trend.',
    watch: '<b>1.58.</b> A hold with a volume spike is the first place a bounce makes sense; a break puts it in sub-$1.50 territory with no reference below. <b>Reversal needs</b> a close above 1.99 (descending line + EMA50) — the first lower high taken out since April. <b>Cash:</b> funded to the 1H28 readout, so the overhang is time, not solvency.',
    decision: [
      'Holding: <b>nothing to do under 1.99</b>. The thesis is the 2028 readout; the chart is dead money until then.',
      'Not holding: <b>wait for the close &gt; 1.99</b>; a bounce off 1.58 without it is a trade, not an entry.',
      'Single trigger that flips the bias: <b>daily close &gt; 1.99</b> with 2× volume.',
    ],
    invalidation: { level: 1.99, text: 'A daily close above 1.99 (descending line from Apr 6 and the EMA50) breaks the lower-highs sequence → next stop 2.33 (Sep high) and 2.59 (EMA200).' },
    path: [
      { d: 30, h: '+1M', target: 1.58, how: 'Retest of the 52-week low on the current drift.' },
      { d: 90, h: '+3M', target: 1.45, how: 'Marginal new low; nothing on the calendar before year-end to change it.' },
      { d: 365, h: '+1Y', target: 1.9, how: 'A base through 2027 as the Ph3 enrolls; a re-rate before the 1H28 readout is a 2027 story, not a 2026 one.' },
    ],
    levels: {
      resistance: [[1.89, 'EMA20'], [1.99, 'INVALIDATION · descending line / EMA50'], [2.33, 'Sep high'], [2.59, 'EMA200']],
      support: [[1.73, 'Oct 9 close — today'], [1.58, '52-week low'], [1.45, '+3M target']],
    },
  },

  NAUT: {
    updated: U, bias: 'BULL',
    read: 'Five of seven and the chart of the month in the basket: 0.95 (Sep 25) → 2.25 (Oct 9), +136% in ten sessions, +24% on the last day alone on 43.8M shares (11× the 90-day average). Catalysts: the Nature Methods tau-proteoform paper, two initiations (Roth Buy $3.50, Leerink Outperform $4) and the Linares pieces — the stock went from cash-below-market-cap to re-rated in two weeks. RSI 81. The two missing checks are the EMA200 (1.73, still falling) and the 50/200 cross; price is 30% above the EMA200 after being 45% below it a month ago. The old symmetrical triangle (3.95 → 1.12 ceiling) is irrelevant now — price is above the whole structure.',
    pattern: '<b>Vertical breakout out of a 5-month triangle.</b> Ceiling 3.95 (Mar 24) → 1.12 (Sep 9), 4 touches, broken on Sep 29 (1.365). Floor 0.852 → 0.891 held. Height ~2.3 at the March end; the breakout point (1.12) plus the triangle height projects ~3.4, which is where the sell-side targets sit. The air pocket above: 2.68 (Jul 90-day high) and 3.95 (Mar 24 high).',
    watch: '<b>The first red week.</b> After +136% the pullback is a question of when: 1.57 (Oct 1 close, the day it cleared the EMA200) is where the breakout gets tested; 1.49 (EMA20) is the last line. A pullback that holds 1.57 on falling volume is the add. <b>2.68</b> is the near ceiling; above it only 3.95. <b>Volume:</b> it must stay above the 90-day average through the consolidation — the 11× bar on Oct 9 is a climax print.',
    decision: [
      'Holding: <b>keep the core while it closes above 1.57</b>. With RSI at 81 this is where a trading tranche comes off, not where you add; the experimental position (avg ~0.91) is now 2.5×.',
      'Not holding: <b>wait for the retest of 1.57–1.75</b> on falling volume; chasing 2.25 buys the top of a ten-session spike.',
      'Single trigger that flips the bias: <b>daily close &lt; 1.57</b> — the EMA200 reclaim fails and price returns to the 1.1–1.4 triangle zone.',
    ],
    invalidation: { level: 1.57, text: 'A daily close below 1.57 (Oct 1 close, the EMA200 reclaim) voids the breakout follow-through → next stop 1.49 (EMA20), 1.12 (old ceiling) and 0.95.' },
    path: [
      { d: 30, h: '+1M', target: 2.4, how: 'Consolidation 1.75–2.25, then a push to the Jul high. Without a retest, a sideways range first.' },
      { d: 90, h: '+3M', target: 2.7, how: 'Break of 2.68 (90-day high). Requires volume to stay above average and the raise (guided before mid-2027) not to hit the chart first.' },
      { d: 365, h: '+1Y', target: 3.95, how: 'Mar 24 high and the top of the triangle. Lines up with the sell-side targets (3.50–4.00) and ~20 proteoform assays by mid-2028.' },
    ],
    levels: {
      resistance: [[2.25, 'Oct 9 close — leg high'], [2.68, 'Jul high · 90-day high'], [3.5, 'Roth target'], [3.95, 'Mar 24 high · triangle top']],
      support: [[1.96, 'Oct 2 / Oct 7 closes'], [1.73, 'EMA200'], [1.57, 'INVALIDATION · Oct 1 close'], [1.12, 'Old ceiling · Sep 9']],
    },
  },

  QSI: {
    updated: U, bias: 'BULL',
    read: 'Six of seven. The +98% spike of the last pass (0.72 → 1.43) got its pullback — 1.55 (Oct 2 high) → 1.22 (Oct 6 and Oct 8) — and the pullback held where it had to: above 1.07 (Sep 30 close, the EMA200 reclaim). The 1.28 line of the last pass was lost on close twice (Oct 6, Oct 8) and recovered both times, so the invalidation moves down to the actual lows. Oct 9: +25% to 1.53 on 62.3M shares, the biggest volume bar in the 2-year series, 5× the 20-day average. EMA20 1.09, EMA50 0.94, EMA200 1.00 and now rising (slope flipped positive) — the 50/200 cross is the one check still missing. RSI 73. The move is moving with NAUT: the proteomics pair re-rated together this week.',
    pattern: '<b>Bear-triangle failure → breakout → higher low.</b> Floor 0.70–0.72 (Jul 29, Aug 18, Sep 15) held; ceiling 1.28 → 0.85 broke Sep 29. Measured move (~1.30) met Oct 1. The Oct 6/8 lows at 1.22 are the first higher low above the old June high (1.28 was lost on close but the EMA20 and the 1.07 gap held). A close above 1.55 (Oct 2 high) starts the second leg toward the 2.63 air pocket.',
    watch: '<b>1.55 and 1.22.</b> Above 1.55 the next shelf is 1.75 then 2.06; a close under 1.22 (Oct 6/8 lows) sends it back to the 1.07 gap. <b>Volume:</b> Oct 9 was a record bar; it must be followed by above-average volume on the next up day or it reads as a blow-off. <b>Nasdaq $1 compliance:</b> no longer a live risk above 1.2. <b>Q3 print Nov 5.</b>',
    decision: [
      'Holding: <b>keep the core while it closes above 1.22</b>; shares plus 2027 calls are the sensor leg of the chain — the calls do the work above 1.55.',
      'Not holding: <b>wait for a hold of 1.28–1.35</b> on falling volume; buying 1.53 the day after a +25% record-volume bar is paying the climax.',
      'Single trigger that flips the bias: <b>daily close &lt; 1.22</b> — the higher low fails and the chart returns to the 1.07 gap and the 0.94–1.00 EMA cluster.',
    ],
    invalidation: { level: 1.22, text: 'A daily close below 1.22 (Oct 6 / Oct 8 lows, first higher low) voids the second leg → next stop 1.07 (Sep 30 close, EMA200 reclaim) and 0.94 (EMA50).' },
    path: [
      { d: 30, h: '+1M', target: 1.75, how: 'Break of 1.55 → 1.75. Into the Nov 5 print; a consolidation 1.3–1.55 first is the healthier version.' },
      { d: 90, h: '+3M', target: 2.1, how: 'Lower third of the spring air pocket (1.55 → 2.63). Requires Proteus still on track for Q2 2027 and no financing off the $300M shelf hitting the chart.' },
      { d: 365, h: '+1Y', target: 3.1, how: '52-week high. Requires a named Proteus pre-order / early-access customer and all 20 amino acids on the integrated instrument.' },
    ],
    levels: {
      resistance: [[1.55, 'Oct 2 high — near ceiling'], [1.75, '+1M target'], [2.06, 'Engine +3M'], [2.63, '12-month high · Nov 2025'], [3.1, '52-week high']],
      support: [[1.28, 'Jun 4 high'], [1.22, 'INVALIDATION · Oct 6/8 lows'], [1.07, 'Sep 30 close · EMA200 reclaim'], [0.94, 'EMA50'], [0.72, 'Triangle floor, 3 touches']],
    },
  },

  INKT: {
    updated: U, bias: 'BEAR',
    read: 'Score 2/7, RSI 26. The triangle resolved down: from 12.73 (Oct 1, the 30-day high) INKT fell six straight sessions to 10.72 (Oct 9), −16%, through the EMA20 (11.79), EMA50 (11.68) and EMA200 (11.55) in one week and through the 10.95 (Sep 1) higher low that was the structural level of the last pass. Volume on the slide at 1.3× the 90-day average — distribution on a $53M market cap. The next references are 10.24 (90-day low) and 8.48–8.56 (52-week low / Mar 24 low).',
    pattern: '<b>Symmetrical triangle — resolved down (Oct 6–9).</b> Ceiling 14.21 (Apr 17) → 12.20 (Aug 21), 2 touches, today ~11.4. Floor 8.56 (Mar 24) → 10.95 (Sep 1), 3 touches, today ~11.5 — price closed below it on Oct 7. Height ~5.6 at the April end; a conservative measure from the break at 11.5 is ~8.5, which coincides with the 52-week low.',
    watch: '<b>10.24.</b> The 90-day low is the last horizontal reference before the 8.5 zone. <b>Reversal needs</b> a close back above 11.55 (EMA200, inside the triangle) and then 12.2 (Aug 21 high). <b>RSI 26:</b> a 2–3 session bounce is likely; it is a sell unless 11.55 is reclaimed. <b>Cash $8.8M:</b> a raise is the overhang; the ARDS Ph2 readout is the only thing that changes this chart.',
    decision: [
      'Holding: <b>reduce on a bounce to 11.3–11.5</b> unless the EMA200 is reclaimed and held.',
      'Not holding: <b>wait</b>. The zone of interest is 8.5–9.5, with the raise terms known.',
      'Single trigger that flips the bias: <b>daily close &gt; 12.2</b> (Aug 21 high, back inside the upper triangle) with volume.',
    ],
    invalidation: { level: 12.2, text: 'A daily close above 12.2 (Aug 21 high) puts price back in the upper half of the triangle and voids the breakdown → next stop 12.73 (Oct 1 high) and 14.2.' },
    path: [
      { d: 30, h: '+1M', target: 10.2, how: 'Retest of the 90-day low after an oversold bounce to 11.3 fails.' },
      { d: 90, h: '+3M', target: 8.6, how: 'Triangle measure and the Mar 24 / 52-week low. The raise lands in this window.' },
      { d: 365, h: '+1Y', target: 10, how: 'Flat-to-down on a 12-month view until the ARDS Ph2 reads out; the option is the readout, not the chart.' },
    ],
    levels: {
      resistance: [[11.55, 'EMA200 — first reclaim'], [11.79, 'EMA20'], [12.2, 'INVALIDATION · Aug 21 high'], [12.73, 'Oct 1 high']],
      support: [[10.72, 'Oct 9 close — today'], [10.24, '90-day low'], [8.56, 'Mar 24 low · triangle origin'], [8.48, '52-week low']],
    },
  },
};
