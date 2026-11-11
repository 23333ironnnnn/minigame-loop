# Bets: rules and the card

The rules live here (they upgrade with the skill); the ledger lives in the project's `docs/loop/bets.md`.

## When to bet

New gameplay, core feel, home screen / main flow, sharing / scoring / leaderboard rules, a new game launch. Bug fixes, copy edits and parameter tweaks need no bet.

## The bet card (copy this block; keep numbering going, never reuse a number)

```markdown
### B-<n> <one line> (<date opened>, <version / PRD item>)
- Status: pending / shipped, awaiting settlement (<release date>) / settled
- What changed: <one line the user can see>
- Primary metric: <which north-star metric; which dashboard block and row / which console number>; definition: <which platforms, new vs. returning users, bots excluded or not>
- Now: <value> (<date range>)
- Expected: <range>; settlement date: <date>
- Guardrails: <metrics that must not get worse, e.g. completion rate, error rate>
- Wrong if: <what result means we were wrong, e.g. primary metric below the low end of the range, or a guardrail worse by more than 2 percentage points>
- Basis: <memory.md M-numbers / reference images / the user's own words>
- Settlement: <date> <actual value> → hit / miss / can't tell; reason; memory changes (M-<n> up / down / retired / new)
```

## Rules for writing and settling

- The primary metric comes only from the north star in `project.md`; pick guardrails separately, one or two per card.
- "Now" is a window before release of the same length (usually 7 days) as the settlement window. Don't compare 3 days with 14.
- Wait for the window to finish before settling: for day-1 retention, the people who arrived on the window's last day must have had their day 2; same idea for day-7. On platforms with review, count from the day it actually goes live.
- The range must be breakable: "goes up a bit" is not a bet, and the range may not contain "Now", or you're not betting that anything changes. If unsure, make it wide, but write numbers.
- Before comparing before/after, check sources: promotion, a big account reposting, holidays in the window? Then separate them, or write "can't tell".
- Prefer A/B whenever you can; see the table below for how many people each group needs, and don't look at p-values before you have them. When it ends, hard-code the winner and remove the switch.
- When a platform gives you none of your own data, the primary metric can only come from numbers its console shows; ask the user for screenshots.
- A miss is not a failure, and overshooting the high end is a miss too (the basis underestimated): trace which basis was wrong and downgrade or retire that memory entry. That is what bets are for.

## How to judge: hit / miss / can't tell

Don't do it in your head. Express the primary metric and guardrails as proportions (retention, conversion, completion rate; turn per-user averages into "share of people who did it at least once"), then run `settle.js` from this folder (just Node, nothing to install):

```bash
node settle.js 200 1000 260 1000 23 28       # before 200/1000, after 260/1000, expected 23%–28%
node settle.js 500 1000 480 1000 --guard 2   # guardrail: may drop at most 2 points
```

A/B works the same way: "before" is the control group, "after" the variant. Copy the last line, `verdict`, into the card's "Settlement":

| Output | Write on the card | Meaning |
| --- | --- | --- |
| `hit` | hit | Inside the expected range, and the change is beyond noise |
| `miss` | miss | The whole 95% interval is outside the expected range (overshooting counts), or it moved the opposite way |
| `can't tell` | can't tell | Can't separate it from noise: push the settlement date, or collect more samples |
| `not a bet` | rewrite the card | The expected range contains "Now" |
| `held` / `broken` | guardrail held / broken | Use `--guard` for guardrails |

## How many people each group needs

To have an 80% chance of seeing it (significance 0.05), each group (the windows before and after release, or each A/B group) needs roughly:

| Current value | 2-point difference | 3 points | 5 points | 10 points |
| --- | --- | --- | --- | --- |
| 5% | 1,900 | 830 | 300 | 80 |
| 10% | 3,500 | 1,600 | 570 | 140 |
| 20% | 6,300 | 2,800 | 1,000 | 250 |
| 30% | 8,200 | 3,700 | 1,300 | 330 |
| 50% | 9,800 | 4,400 | 1,600 | 390 |

To compute it yourself: people per group ≈ 16 × p × (1 − p) ÷ difference² (p and the difference as decimals).

When a window has fewer people than the table says:

- bet only on big changes (an expected difference around 10 points), and skip bets on small ones;
- lengthen the window (two weeks, a month) and move the settlement date with it;
- "can't tell" is still useful: at your current scale, changes like this one can't be measured, so treat them as small changes when prioritizing.

## Ledger header (copy into `docs/loop/bets.md` on first use)

```markdown
# Bet ledger

Rules: minigame-loop's bets.md. North star and data definitions: `project.md`.

## Pending / shipped, awaiting settlement

- (none)

## Settled

- (none)
```
