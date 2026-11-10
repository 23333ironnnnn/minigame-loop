# Memory: rules and entry format

The rules live here; the entries live in the project's `docs/loop/memory.md`.

## Four kinds of knowledge, four places

1. Constraints (hard rules): "Platforms and hard limits" in `project.md`, the project's own dev rules, platform docs. Not copied into memory.
2. **Lessons: `memory.md`.**
3. Process: this skill and the project's own dev / release docs.
4. Events: the PRD §0 decision log and the `bets.md` ledger.

## How to write an entry

- One entry = a claim + its evidence. No process, no numbers that will go stale (numbers stay in the PRD / settlement record; say where).
- Three evidence levels: **observation** (seen it, don't know why), **mechanism** (know why: code, docs or the rule text), **inference** (reasoned, not verified). Observation- and inference-level entries may not say "significant", "always" or "certainly".
- Every new entry starts as "candidate". After one settlement or a second independent event confirms it, it becomes "active". When disproved → "retired", with the date and reason; the entry is never deleted, so whoever wants to try again first sees why it was retired.
- Keep the scope narrow: if it's only been verified in this game, scope it to this game. Lessons copied from other projects always start as "candidate".
- Keep numbering going; never reuse a number.

```markdown
### M-<n> <the claim in one line>
- Scope: <this game / a platform / all games>
- Evidence: observation / mechanism / inference — <basis: file, PRD item, settlement B-<n>, the user's words>
- Status: candidate / active / retired (<date> <reason>)
```

## When to read, when to write

- Read: at the start of every session, find related entries; cite their numbers in a bet card's "Basis".
- Write: after settling (a hit upgrades, a miss downgrades); after a pitfall once you've found its cause; when the user says "remember this". Show the user new entries.

## Ledger header (copy into `docs/loop/memory.md` on first use)

```markdown
# Lessons

Rules: minigame-loop's memory.md.

## Entries

- (none)
```

What real entries look like: <https://github.com/23333ironnnnn/minigame-loop/blob/main/examples/kacha-bear.en.md>
