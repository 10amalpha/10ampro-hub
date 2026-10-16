// Editor TA per ticker. Same shape as TOKEN.ta in the Solana hub configs:
// { updated, bias: 'BULL'|'BEAR', read, pattern, watch, decision: [], invalidation: { level, text }, path: [{ d, h, target, how }], levels: { resistance: [[px, why]], support: [[px, why]] } }
// A ticker without an entry falls back to the live auto-forecast (lib/thesis/ta.js).
// Review pass data: /api/equity/{SYM}?summary=1 — basis for this pass: daily closes through 15 Oct 2026 (Thursday); the 16 Oct opening print (~09:45 ET) is cited only where flagged as such. Previous pass: 13 Oct 2026. Daily refresh: only reads with a material change are rewritten (15 Oct: HIMS, PBLS, RXRX, NGEN; 13 Oct: HIMS, PBLS, RXRX, INKT; 12 Oct: TEM, PBLS, NGEN, QSI).
const U = '15 Oct 2026';

export const EDITOR_TA = {
  TEM: {
    updated: U, bias: 'BULL',
    read: 'The trendline went on Oct 12. After the −14% session of Oct 6 (83.55 → 71.98) TEM held 69–71 for three days, then closed 67.99 on Oct 12 (−4.1%, 257M shares, below the 20-day average) — under the higher-lows trendline (~70.3–71.5 depending on the pivot) and 0.14 above the EMA50 (67.85). Score 4/7, regime NEUTRAL: price below EMA20 (73.4), MACD negative; EMA50 and EMA200 (60.5, rising) still below price. RSI 39 and falling. Five of the last six sessions closed down; the 30-day range is now 58.74–85.08 and price is in the lower half of it.',
    pattern: '<b>Uptrend, failed breakout above 80.4, trendline lost on Oct 12 — EMA50 is the last line.</b> Support 41.55 (Jul 29) → 58.74 (Sep 10), 3 touches; the line passes ~70.3–71.5 today and price closed below it. No ceiling line: 85.08 (Sep 28) is the leg high. The Sep 15–17 gap (68.6–72.7) was filled on Oct 6 and is now being traded through from below. The structure since July is one close from a range.',
    watch: '<b>67.8.</b> The close of Oct 12 is a hair above the EMA50; one more down day confirms the breakdown and the measured target of the engine (37) becomes the long-range risk, with 64 and 58.74 the near stops. <b>Reclaim:</b> a close back above 70.3–71.5 (the trendline) within two sessions makes Oct 12 an undercut; above 73.4 (EMA20) the bias is repaired. <b>Volume:</b> the Oct 12 bar was light (42% of the 20-day average) — a drift, not a capitulation; that cuts both ways.',
    decision: [
      'Holding: <b>keep it only while it closes above 67.8</b> (EMA50) — this is the line, today. No adds until it reclaims 73.4 (EMA20) on volume.',
      'Not holding: <b>do not buy the trendline break.</b> First tranche only on a close back above 71.5 that holds two sessions, or at 58.7–60.5 (Sep 10 low / EMA200) if the EMA50 goes.',
      'Single trigger that flips the bias: <b>daily close &lt; 67.8</b> — trendline and EMA50 gone, range 58.7–85.',
    ],
    invalidation: { level: 67.8, text: 'A daily close below 67.8 (EMA50; the higher-lows trendline is already lost) breaks the structure that has held since July → next stop 64 and 58.74 (Sep 10 low, EMA200 60.5).' },
    path: [
      { d: 30, h: '+1M', target: 72, how: 'Hold the EMA50, close back above the trendline (70.3–71.5). The EMA20 at 73.4 is the stretch; 85 is not on the table in a month after a trendline break.' },
      { d: 90, h: '+3M', target: 85, how: 'Retest of the Sep 28 / Oct 5 highs. Requires the EMA50 to hold now and Q3 results (Nov) to repeat the GAAP profit.' },
      { d: 365, h: '+1Y', target: 103, how: '12-month high. Unchanged; the October reversal changes the timing, not the destination — unless 67.8 goes, in which case the 12-month path runs through 58.7 first.' },
    ],
    levels: {
      resistance: [[70.3, 'Higher-lows trendline — lost Oct 12'], [73.4, 'EMA20 — first reclaim'], [80.36, 'Sep 17 high · old flag top'], [85.08, 'Sep 28 high · leg high'], [103.3, '12-month high']],
      support: [[67.99, 'Oct 12 close — today'], [67.8, 'INVALIDATION · EMA50'], [64, 'Jul–Aug shelf'], [58.74, 'Sep 10 low · EMA200 60.5']],
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
    read: 'The floor got its test and held. Oct 14 printed −6.7% to 27.72 — through the rising floor line (~29.6) that was the first warning of the last pass and 0.28 above the 27.44 invalidation — and Oct 15 took it all back, +6.0% to 29.38. A 6% round trip in two sessions that leaves HIMS where it was. The engine went from 4/7 to 1/7 (STRONG BEAR) on the way: the EMA20/50/100 are bunched at 29.3–29.4 and price closed inside the bunch, under the EMA200 (30.5); MACD flat, RSI 52. The rising line of the triangle is lost on close, the horizontal floor (27.44) is not. The engine forecast stays BEAR (invalidation 30.4); the editor keeps BULL on the floor test only — the Nov 9 print is inside the window and the chart still has not chosen. The Oct 16 open printed 29.24, flat.',
    pattern: '<b>Symmetrical triangle — upside break failed (Oct 9–13), floor tested (Oct 14), held.</b> Ceiling 38.28 (Jul 6) → 30.43 (Sep 22), 3 touches; the horizontal 30.43 is what matters above. Floor 14.52 (Feb 27) → 27.44 (Sep 10), 3 touches — the rising line passes ~29.8 today and price closed under it, so the triangle is now the 27.44–30.92 box, nothing finer. Height ~11 → measure 38–40 up / 14–17 down, both far.',
    watch: '<b>27.44 and 30.4.</b> The box is 27.44–30.92 and price closed in the middle of it. A second test of the floor is the one that counts: a close under 27.44 resolves the contraction down. Above, 30.43–30.92 has to be reclaimed and held two sessions for the break to count again. <b>Volume:</b> 20-day at 75% of 90-day — the month is still trading light for a stock that moved 6% twice in two days. <b>Q3 earnings Nov 9:</b> the triangle will most likely resolve on the print, not before.',
    decision: [
      'Holding: <b>keep it while it closes above 27.44</b> (triangle floor, Sep 10 low). The Oct 14 test was the stop check and it passed; no add until 30.9 is held.',
      'Not holding: <b>wait</b>. The floor retest at 27.7 came and went in one session; the next entry is a second test of 27.5–28 (stop 27.44) or a close back above 30.9 with volume — not 29.4 in the middle of the box.',
      'Single trigger that flips the bias: <b>daily close &lt; 27.44</b> — the floor goes and the triangle resolves down.',
    ],
    invalidation: { level: 27.44, text: 'A daily close below 27.44 (Sep 10 low, triangle floor; tested Oct 14 at 27.72) resolves the contraction to the downside → next stop 25.0 (Jul low) and 22.' },
    path: [
      { d: 30, h: '+1M', target: 30.9, how: 'Back to the Oct 9 high; the 27.4–31 box holds into the Nov 9 print.' },
      { d: 90, h: '+3M', target: 33.8, how: 'Aug 17 gap, after a clean Q3 (guided +47–50%) and a second, held break of 30.4. The 38.3 measure is not a 3-month call after a failed break.' },
      { d: 365, h: '+1Y', target: 48, how: 'Half the way back to the 65.3 high. Requires the peptide channel (post-PCAC) to show in subscriber growth.' },
    ],
    levels: {
      resistance: [[29.4, 'EMA50 / EMA100 cluster'], [30.43, 'Sep 22 high · triangle ceiling — reclaimed Oct 9, lost Oct 13'], [30.92, 'Oct 9 high'], [33.8, 'Aug 17 gap'], [38.28, 'Jul 6 high · triangle measure'], [48, '+1Y target']],
      support: [[29.38, 'Oct 15 close — today'], [29.25, 'EMA20'], [27.72, 'Oct 14 close · floor test'], [27.44, 'INVALIDATION · Sep 10 low'], [25.0, 'Jul low']],
    },
  },

  PBLS: {
    updated: U, bias: 'BEAR',
    read: 'At the floor. Two more red closes — 25.89 (Oct 14) and 25.18 (Oct 15, −2.7%) — put PBLS 0.17 above the post-IPO low of 25.01, and the Oct 16 open printed 24.41 (−3.1%): under the post-IPO low and under the 52-week low (24.51) on an intraday basis, no close yet. Nine of the last ten sessions closed down. Score 1/7, RSI 16, STRONG BEAR. Price is 15% below the EMA20 (29.8) and 23% below the EMA50 (32.5); the drawdown from the 41.73 climax (Sep 18) is −40% at the Oct 15 close. The 20-day volume average (28.6M) is in line with the 90-day — the selling is still steady, not climactic; there is no reversal bar anywhere in the decline. The +1M target of the last pass (25.0) is reached.',
    pattern: '<b>Post-IPO range 25–42 — the floor is being traded through at the Oct 16 open, not yet on a close.</b> No pivot trendlines possible yet (90 sessions); the engine now returns no clean structure. 28.6 (78.6%) was lost Oct 8, reclaimed Oct 12 for one close, lost again Oct 13 — the failed reclaim has been the continuation signal it usually is. Below 25.01: 24.51 (52-week low), then nothing before 22. Above: 27.5–28.6 is resistance, 29.8 (EMA20) the bounce ceiling. RSI at 15–25 for seven sessions without a reversal bar: the oversold condition is being worked off in price, not time.',
    watch: '<b>25.0 on a closing basis.</b> The Oct 16 print is already under it; a daily close under 25.01 confirms the break and the next reference is 22 (the +3M target), with the mid-December lockup supply on top. A reversal bar at 24–25 on volume above 50M is the first place a bounce is worth trading — there has not been one. <b>Reversal needs</b> 28.6 reclaimed and held two closes, then 29.8 (EMA20) on volume above the 20-day average — until then every bounce is a sell. <b>Lockup:</b> IPO was June → 180-day expiry mid-December is the supply event in sight.',
    decision: [
      'Holding: <b>the reduce zone (28–28.6) closed on Oct 13</b>; at 25 there is nothing to sell into. Either hold through the December lockup with that supply priced, or exit on the next bounce to 27.5–28.6.',
      'Not holding: <b>wait</b>. The zone of interest is 22–25 into the December lockup expiry; the first tranche only on a reversal bar at 24–25 with volume above 50M, otherwise at 22.',
      'Single trigger that flips the bias: <b>daily close &gt; 29.8</b> (EMA20) with volume.',
    ],
    invalidation: { level: 29.8, text: 'A daily close above 29.8 (EMA20) reclaims the middle of the range and voids the bias → next stop 32.5 (EMA50) and 36.' },
    path: [
      { d: 30, h: '+1M', target: 23, how: 'Close under 25.01 (the Oct 16 open is already there); below the IPO range there is no reference, 22–23 is the extension.' },
      { d: 90, h: '+3M', target: 22, how: 'New post-IPO low into the mid-December lockup expiry.' },
      { d: 365, h: '+1Y', target: 25, how: 'Flat from here on a 12-month view: the lockup supply gets absorbed in H1 2027 and the first Helicon clinical data decides the direction.' },
    ],
    levels: {
      resistance: [[27.48, 'Oct 9 low — lost Oct 13'], [28.59, '78.6% of the range — reclaimed Oct 12, lost Oct 13'], [29.8, 'INVALIDATION · EMA20'], [32.5, 'EMA50']],
      support: [[25.18, 'Oct 15 close — today'], [25.01, 'Post-IPO low — under it at the Oct 16 open (24.41)'], [24.51, '52-week low'], [22, '+3M target']],
    },
  },

  RXRX: {
    updated: U, bias: 'BULL',
    read: 'The EMA50 held on the first touch. Oct 14 closed 3.74 — on the EMA50, 0.04 above the 3.70 invalidation — and Oct 15 printed +11.2% to 4.16, back above the EMA20 (3.97): the reclaim the last pass asked for within the week, delivered in two sessions. The Oct 16 open gave 7% of it back (3.87, under the EMA20 again), so the reclaim is one close old and already being tested. Engine 4/7 NEUTRAL, RSI 52, MACD still negative; EMA50 (3.73) and EMA200 (3.77) both below price, the 200 rising, the 50 still 0.04 under the 200 — the cross is not done. From the 4.78 high (Oct 5) the pullback bottomed at −22% (3.74) and the structure is the same as before: 3.70 is the line, 3.98 the reclaim, 4.36–4.78 the zone above.',
    pattern: '<b>Descending-triangle breakout — EMA50 retest held (Oct 14), EMA20 reclaimed (Oct 15), under test again.</b> Old ceiling 3.96 (Jul 6) → 3.63 (Sep 4), 3 touches, now ~3.40 — still below price. Floor 2.84 (Mar 30) → 2.89 (Jul 20), 3 touches. Measure (~4.75) was met Oct 5. The Oct 14 close (3.74) replaces 3.95 as the retest low of the breakout; as long as it holds, the give-back from 4.78 was a post-measure retrace and the next leg starts from the EMA20.',
    watch: '<b>3.98 and 3.74.</b> The EMA20 decides whether Oct 15 was a reclaim or a one-day spike: two closes above it reopen 4.36 (Oct 9 close) and 4.78. A close back under 3.74 (Oct 14 low) puts the EMA50 on the line again with 3.70 as the stop. <b>Volume:</b> the 20-day average (128M) is 1.6× the 90-day — the breakout month is still the heavy one; a reclaim on light volume is the thing to distrust.',
    decision: [
      'Holding: <b>keep it while it closes above 3.70</b> (EMA50). The add is the second close above 3.98, not the first.',
      'Not holding: <b>the first tranche at 3.70–3.80 triggered on Oct 14</b> (EMA50 held on the first touch). If missed, 3.80–3.90 on the Oct 16 pullback with 3.70 as the stop; second tranche on a close &gt; 4.36.',
      'Single trigger that flips the bias: <b>daily close &lt; 3.70</b> — breakout, retest and the EMA50 all fail, back into the triangle.',
    ],
    invalidation: { level: 3.7, text: 'A daily close below 3.70 (EMA50; the Oct 14 retest low is 3.74) puts price back inside the old triangle → next stop 3.40 (old ceiling) and 3.16 (Sep 10 low).' },
    path: [
      { d: 30, h: '+1M', target: 4.36, how: 'Second close above the EMA20 (3.98), then the Oct 9 close. 4.78 is not a one-month call after a 22% retrace.' },
      { d: 90, h: '+3M', target: 4.8, how: 'Retest of the Oct 5 high / triangle measure. Requires 3.74 to hold and the Q3 print (Nov) to show the opex cut holding.' },
      { d: 365, h: '+1Y', target: 7.2, how: '52-week high. Needs a clinical readout from the AI-designed pipeline, not just cost control.' },
    ],
    levels: {
      resistance: [[3.98, 'EMA20 — reclaimed Oct 15, under it at the Oct 16 open'], [4.16, 'Oct 15 close'], [4.36, 'Oct 9 close'], [4.78, 'Oct 5 high · triangle measure'], [5.5, 'Feb–Mar shelf'], [7.18, '52-week high']],
      support: [[3.87, 'Oct 16 open'], [3.77, 'EMA200'], [3.74, 'Oct 14 close · EMA50 retest low'], [3.7, 'INVALIDATION · EMA50'], [3.4, 'Old triangle ceiling'], [3.16, 'Sep 10 low']],
    },
  },

  NGEN: {
    updated: U, bias: 'BEAR',
    read: 'The 52-week low went. Oct 14 closed 1.565 (−4.0%), under the 1.58–1.59 shelf (Jul low / 52-week low) that was the watch of the last two passes; Oct 15 bounced +3.5% to 1.62 and the Oct 16 open is flat at 1.615. Zero of seven, STRONG BEAR; RSI 27, under 30 since Oct 12. EMA20 1.79, EMA50 1.91, EMA200 2.54, all falling, and price is 10% under the nearest of them. The break came on nothing: the 20-day volume average (812K) is 68% of the 90-day — no capitulation bar, no volume at the low, a drift through a level rather than a flush. The +1M target of the last pass (1.58) is reached. The descending line from 4.39 (Apr 6) now passes ~1.90, on the EMA50.',
    pattern: '<b>Downtrend — lower highs, 52-week low lost on Oct 14, one-session bounce.</b> Resistance line 4.39 (Apr 6) → 2.27 (Sep 17), 3 touches, today ~1.90 (coincides with the EMA50). No support line: 1.565 (Oct 14 close) and 1.55 (intraday low) are the only references now, then round numbers — 1.50 — and the engine measure at 1.41.',
    watch: '<b>1.565 and 1.90.</b> The Oct 14 close is the new low; a second close under it opens 1.50 and the 1.41 measure, with no shelf in between. The bounce has 1.79 (EMA20) as its ceiling and it is a trade, not a change of trend. <b>Reversal needs</b> a close above 1.90 (descending line + EMA50) — the first lower high taken out since April. <b>Cash:</b> funded to the 1H28 readout, so the overhang is time, not solvency.',
    decision: [
      'Holding: <b>nothing to do under 1.90</b>. The thesis is the 2028 readout; the chart is dead money until then.',
      'Not holding: <b>wait for the close &gt; 1.90</b>; one session of bounce off a new low is not an entry.',
      'Single trigger that flips the bias: <b>daily close &gt; 1.90</b> with 2× volume.',
    ],
    invalidation: { level: 1.9, text: 'A daily close above 1.90 (descending line from Apr 6 and the EMA50) breaks the lower-highs sequence → next stop 2.27 (Sep 17 high) and 2.54 (EMA200).' },
    path: [
      { d: 30, h: '+1M', target: 1.5, how: 'A second close under 1.565 on the current drift; round number, no reference.' },
      { d: 90, h: '+3M', target: 1.41, how: 'Engine measure; nothing on the calendar before year-end to change it.' },
      { d: 365, h: '+1Y', target: 1.9, how: 'A base through 2027 as the Ph3 enrolls; a re-rate before the 1H28 readout is a 2027 story, not a 2026 one.' },
    ],
    levels: {
      resistance: [[1.79, 'EMA20 · bounce ceiling'], [1.9, 'INVALIDATION · descending line / EMA50'], [2.27, 'Sep 17 high'], [2.54, 'EMA200']],
      support: [[1.62, 'Oct 15 close — today'], [1.565, 'Oct 14 close · 52-week closing low'], [1.55, '52-week intraday low'], [1.5, '+1M target'], [1.41, 'Engine measure · +3M target']],
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
    read: 'Six of seven, and the record bar got no follow-through: Oct 9 printed +25% to 1.53 on 62.3M shares (the biggest volume bar in the 2-year series), Oct 12 gave back −11% to 1.36 on 13.9M — average volume, no buyers at the top. RSI drops from 73 to 66, back under the overbought line. The range of the last seven sessions is 1.22–1.55 and price closed in the middle of it. The pullback floor is unchanged: 1.22 (Oct 6 and Oct 8 lows) above 1.07 (Sep 30 close, the EMA200 reclaim). EMA20 1.11, EMA50 0.96, EMA200 1.00 and rising — the 50/200 cross is the one check still missing. The move still tracks NAUT (−3.6% on the same day); the proteomics pair is consolidating together.',
    pattern: '<b>Bear-triangle failure → breakout → higher low.</b> Floor 0.70–0.72 (Jul 29, Aug 18, Sep 15) held; ceiling 1.28 → 0.85 broke Sep 29. Measured move (~1.30) met Oct 1. The Oct 6/8 lows at 1.22 are the first higher low above the old June high (1.28 was lost on close but the EMA20 and the 1.07 gap held). A close above 1.55 (Oct 2 high) starts the second leg toward the 2.63 air pocket.',
    watch: '<b>1.55 and 1.22.</b> Above 1.55 the next shelf is 1.75 then 2.06; a close under 1.22 (Oct 6/8 lows) sends it back to the 1.07 gap. <b>Volume:</b> the Oct 9 record bar was not followed through — Oct 12 was a down day on average volume, which reads as a one-day blow-off inside the range, not a breakout. The next up day needs volume above the 20-day average (12.8M) to reopen 1.55. <b>RSI 66:</b> the overbought flag is off; the chart can consolidate 1.28–1.45 without damage. <b>Nasdaq $1 compliance:</b> no longer a live risk above 1.2. <b>Q3 print Nov 5.</b>',
    decision: [
      'Holding: <b>keep the core while it closes above 1.22</b>; shares plus 2027 calls are the sensor leg of the chain — the calls do the work above 1.55.',
      'Not holding: <b>wait for a hold of 1.28–1.35</b> on falling volume — the Oct 12 close (1.36) is at the top of that zone; two more holds there and it is an entry.',
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
      support: [[1.36, 'Oct 12 close — today'], [1.28, 'Jun 4 high'], [1.22, 'INVALIDATION · Oct 6/8 lows'], [1.07, 'Sep 30 close · EMA200 reclaim'], [0.96, 'EMA50'], [0.72, 'Triangle floor, 3 touches']],
    },
  },

  INKT: {
    updated: U, bias: 'BEAR',
    read: 'Score 2/7, RSI 18. Eight straight down closes from 12.73 (Oct 1) to 10.23 (Oct 13, −2.8%), −20% in eight sessions, and the 90-day low (10.24, Jul 22) is gone by a cent. The Oct 13 bar was 71K shares — under a third of the 20-day average — so the last leg is a drift lower on no bids, not distribution; the heavy bars were Oct 6–9. The three EMAs are bunched at 11.53–11.58, 13% above price. Below 10.23 there is no horizontal reference before 8.48–8.56 (52-week low / Mar 24 low). Market cap is ~$51M against $8.8M of cash.',
    pattern: '<b>Symmetrical triangle — resolved down (Oct 6–9), 90-day low lost (Oct 13).</b> Ceiling 14.21 (Apr 17) → 12.73 (Oct 1), today ~12.6. Floor 8.56 (Mar 24) → 10.95 (Sep 1), 3 touches, today ~11.6 — price is 12% below it. Height ~5.3; the measure from the break at 11.5 is ~8.5, which coincides with the 52-week low. The 10.24 shelf was the one stop between the break and the measure and it did not hold.',
    watch: '<b>8.5.</b> With 10.24 gone the next reference is the 52-week low zone; the measure, the Mar 24 low and the 52-week low all sit at 8.48–8.56, so that is where the chart becomes interesting. <b>RSI 18:</b> the most oversold reading in the basket; a 2–3 session bounce toward 10.7–11.0 is likely and is a sell unless 11.55 (EMA cluster) is reclaimed. <b>Reversal needs</b> a close back above 11.6 and then 12.2 (Aug 21 high). <b>Cash $8.8M:</b> a raise is the overhang and the lower the stock, the more dilutive it gets; the ARDS Ph2 readout is the only thing that changes this chart.',
    decision: [
      'Holding: <b>reduce on a bounce to 10.7–11.0</b> unless the EMA cluster (11.55) is reclaimed and held.',
      'Not holding: <b>wait</b>. The zone of interest is 8.5–9.5, with the raise terms known; 10.2 after eight red closes is not it.',
      'Single trigger that flips the bias: <b>daily close &gt; 12.2</b> (Aug 21 high, back inside the upper triangle) with volume.',
    ],
    invalidation: { level: 12.2, text: 'A daily close above 12.2 (Aug 21 high) puts price back in the upper half of the triangle and voids the breakdown → next stop 12.73 (Oct 1 high) and 14.2.' },
    path: [
      { d: 30, h: '+1M', target: 9.5, how: 'Between the lost 90-day low and the 8.5 zone, on the current drift; an oversold bounce to 10.7–11.0 first.' },
      { d: 90, h: '+3M', target: 8.6, how: 'Triangle measure and the Mar 24 / 52-week low. The raise lands in this window.' },
      { d: 365, h: '+1Y', target: 10, how: 'Flat-to-down on a 12-month view until the ARDS Ph2 reads out; the option is the readout, not the chart.' },
    ],
    levels: {
      resistance: [[10.72, 'Oct 9 close · bounce target'], [11.55, 'EMA20/50/200 cluster — first reclaim'], [12.2, 'INVALIDATION · Aug 21 high'], [12.73, 'Oct 1 high']],
      support: [[10.23, 'Oct 13 close — today · under the 90-day low (10.24)'], [9.5, '+1M target'], [8.56, 'Mar 24 low · triangle origin'], [8.48, '52-week low']],
    },
  },
};
