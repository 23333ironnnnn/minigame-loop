// Run from the repo root: node evals/settle.test.mjs
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const zh = new URL('../skills/zh/minigame-loop/settle.js', import.meta.url);
const en = new URL('../skills/en/minigame-loop/settle.js', import.meta.url);

const cases = [
  [[200, 1000, 260, 1000, 23, 28], 'hit'],
  [[20, 100, 26, 100, 23, 28], "can't tell"],
  [[2000, 10000, 2010, 10000, 23, 28], 'miss'],
  [[300, 1000, 220, 1000, 32, 36], 'miss'],
  [[200, 1000, 400, 1000, 23, 28], 'miss'],
  [[3, 40, 9, 40, 15, 25], "can't tell"],
  [[200, 1000, 250, 1000, 18, 25], 'not a bet'],
  [[500, 1000, 500, 1000, '--guard', 5], 'held'],
  [[600, 1000, 500, 1000, '--guard', 2], 'broken'],
  [[500, 1000, 480, 1000, '--guard', 2], "can't tell"],
];

function verdict(args) {
  let out;
  try {
    out = execFileSync(process.execPath, [fileURLToPath(zh), ...args.map(String)], { encoding: 'utf8' });
  } catch (e) {
    out = e.stdout; // "not a bet" exits with code 1
  }
  return /verdict\s+(.+?):/.exec(out)?.[1];
}

let failed = 0;
if (readFileSync(zh, 'utf8') !== readFileSync(en, 'utf8')) {
  console.log('FAIL skills/zh and skills/en settle.js differ');
  failed++;
}
for (const [args, want] of cases) {
  const got = verdict(args);
  if (got !== want) failed++;
  console.log(`${got === want ? 'ok  ' : 'FAIL'} ${args.join(' ')} -> ${got} (want ${want})`);
}
process.exit(failed ? 1 : 0);
