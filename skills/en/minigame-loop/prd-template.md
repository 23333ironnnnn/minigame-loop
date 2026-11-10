# PRD template

When starting a new version, create `docs/loop/versions/<version>.md` from this (or wherever `project.md` says). Sections with nothing to say get "none"; don't delete them. `<…>` is to be filled in.

````markdown
# <Game> <version> · <one line: what this version does>

> Branch: `<branch>` (cut from `<branch>@<commit>` on <date>; the user approved the branch). Bump the version number on release day.
> Previous version: `<path to previous PRD>` (<release date>); its bets: <B-numbers settled / pending>.
> North star: <the two in project.md>.

## 0. Decision log

- **<date time> User**: "<exact words>" → <what was decided>.
- **<date> AI's call (reversible)**: <…>.

## 1. Research (show, don't tell)

- Reference: <the image the user picked, path>; not picked: <…>.
- Core action: <one verb>; how a round ends: <…>; what makes people play again: <…>.

## 2. Scope

| Item | <Platform A> | <Platform B> | Step |
| --- | --- | --- | --- |
| <…> | ✓ | ✓ | S1 |

**Not in this version**: <…>

## 3. S1 <name>

<One section per step: write the spec as dev actions (which file, which parameter); the last paragraph says what acceptance measures.>

### 3.x Acceptance

- <what automated checks measure, which screenshots, what the user tries on a real device>

## <n>. Bets (cards live in bets.md; only numbers here)

| Card | Change | Primary metric | Guardrails | Settlement date | Status |
| --- | --- | --- | --- | --- | --- |
| B-<n> | <…> | <from the north star> | <…> | <day N after release> | to open / shipped, awaiting / settled |

## <n+1>. Package size (only for platforms with a size cap)

- Baseline: <previous version's size>; stop line: <…>; record at every step.

## <n+2>. Steps (✅ done and approved / 🟡 done, awaiting approval / ⬜ not started)

0. ⬜ Kickoff: previous version's due cards settled, research picked by the user, this PRD created, bet placeholders in bets.md.
1. ⬜ S1 <…>.
<k>. ⬜ Release (wait for the user to say "ship it").
<k+1>. ⬜ Promotion (each channel gets its own source parameter).
<k+2>. ⬜ Settlement (pull data and compare on the dates in bets.md).
<k+3>. ⬜ Learn + clean up (new memory.md entries, cleanup list).

## <n+3>. Waiting on the user / the user's own tasks

- <…>
````
