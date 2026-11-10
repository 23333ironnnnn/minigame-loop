# New-game pipeline

For starting a new mini-game (a new repo, or a new build target inside an existing project). Iterating a live game doesn't use this file.

## Kickoff card (goes into the new PRD §0; no spike until the user approves)

- Gameplay in one line: the core action is one verb ("tap to jump", "squeeze to reshape").
- Reference image: the one the user picked during research.
- North star and data source: inherit from `project.md`, or set one for this game; if the platform gives you no data of your own, pick only what its console shows.
- Boundaries: package size cap, minimum OS / client version, network access, no one else's IP. For capabilities like workers, offscreen canvas or WASM, check the platform docs for whether and from which version they're supported, and keep a path for versions that don't support them.
- Relation to existing games: shared saves / characters / accounts? If shared, decide how they're read first.
- The user's part: create the app on the platform and get its ID, create leaderboards in the platform console if needed, approve the new build target.

## Order (stop after each step and wait for the user's OK)

1. **Spike**: only the core action + one level; measure feel on a real device and the package size. Continue only after the user approves.
2. **Assets**: list first, then set a style anchor, then produce in batches.
3. **Level factory** (for games with levels).
4. **Result card / score / leaderboard**: each round ends with a result worth sharing and a score worth comparing.
5. **Package audit**: self-check against platform rules (size, banned APIs, copy); the user uploads; test on both iOS and Android.
6. **Promotion + bet**: launching a new game is itself a bet card.

## Foundation: reuse the fixed layer, write the variable layer

Ask the user before the spike where it goes (a new build target in the same repo, or a new repo with a copy of the foundation).

- Fixed layer (proven in an existing project): build config, platform adaptation (same code, per-platform implementations), save read / write, bridges to platform features (login, share, leaderboard), share posters, announcements. Make your own copy following the same patterns; don't edit the old game's files directly.
- Variable layer (written fresh for the new game): scenes, controls, physics, level generation, result-card content, assets, copy.
- Your first game has no fixed layer: once it ships, tidying the items above into something reusable is the foundation for the next one.

## Level factory (for games with levels)

- Don't hand-place levels one by one: each level = generation algorithm + parameters + seed, and the same inputs always produce the same level.
- Answer two questions before choosing an approach: is every generated level guaranteed beatable? Is checking beatability expensive? Guaranteed → generate at runtime from the level number; not guaranteed → generate and check offline, and ship only the levels that pass.
- Write the difficulty curve as one table, "parameters as a function of level number", in the PRD, not scattered across `if`s in the code.
- A debug entry `?debug&level=N&seed=S` jumps straight to a level through the same generation path players use.
- When the generation algorithm changes, diff every level: same seed, before vs. after; only the expected levels may change.
- When a player reports a bad level, the level number + seed reproduces it exactly.

## Assets

- List them first (characters / scenes / UI / sounds, and where each is used) in the PRD, then start making them.
- Style anchor: the first image the user approves becomes the reference for all later images; don't re-describe the style each time.
- Group sounds by type: music / interactions (jump, land, tap) / states (level clear, fail) / UI.
- Assets are original or licensed (sources go into `CREDITS`); never take original images or audio from reference works.
