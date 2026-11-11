#!/usr/bin/env node
// Settle a bet on a proportion metric (retention, share conversion, completion rate).
//   node settle.js <hits_before> <total_before> <hits_after> <total_after> <expected_low%> <expected_high%>
//   node settle.js <hits_before> <total_before> <hits_after> <total_after> --guard <max_drop_points>
// For A/B tests, "before" is the control group and "after" the variant.

const args = process.argv.slice(2);
const [x1, n1, x2, n2] = args.slice(0, 4).map(Number);
const guard = args[4] === '--guard';
const t = guard ? Number(args[5]) / 100 : NaN;
const [lo, hi] = guard ? [NaN, NaN] : [Number(args[4]) / 100, Number(args[5]) / 100].sort((a, b) => a - b);

const counts = [x1, n1, x2, n2].every(Number.isInteger) && x1 >= 0 && x2 >= 0 && x1 <= n1 && x2 <= n2 && n1 > 0 && n2 > 0;
if (!counts || !(guard ? t >= 0 : Number.isFinite(lo) && Number.isFinite(hi))) {
  console.error('usage: node settle.js x1 n1 x2 n2 low% high%   |   node settle.js x1 n1 x2 n2 --guard points');
  process.exit(2);
}

const Z = 1.96; // 95%, two-sided
const p1 = x1 / n1;
const p2 = x2 / n2;
const d = p2 - p1;
const se2 = Math.sqrt((p2 * (1 - p2)) / n2);
const seD = Math.sqrt((p1 * (1 - p1)) / n1 + (p2 * (1 - p2)) / n2);
const [lo2, hi2] = [p2 - Z * se2, p2 + Z * se2];
const [loD, hiD] = [d - Z * seD, d + Z * seD];
const pct = (v) => `${(v * 100).toFixed(1)}%`;
const pts = (v) => `${v >= 0 ? '+' : ''}${(v * 100).toFixed(1)} pts`;

console.log(`before    ${pct(p1)}  (${x1}/${n1})`);
console.log(`after     ${pct(p2)}  (${x2}/${n2})   95% CI ${pct(lo2)} to ${pct(hi2)}`);
console.log(`change    ${pts(d)}   95% CI ${pts(loD)} to ${pts(hiD)}`);
console.log(guard ? `guard     may drop at most ${(t * 100).toFixed(1)} pts` : `expected  ${pct(lo)} to ${pct(hi)}`);

function judge() {
  if (!guard && p1 >= lo && p1 <= hi) return ['not a bet', 'the expected range contains the baseline'];
  // The normal approximation is unreliable with very few events on either side.
  if (Math.min(x1, n1 - x1, x2, n2 - x2) < 10) return ["can't tell", 'fewer than 10 events on one side; collect more data'];
  if (guard) {
    if (loD >= -t) return ['held', 'even the low end of the change interval is within the allowed drop'];
    if (d < -t && hiD < 0) return ['broken', 'dropped more than allowed, beyond noise'];
    return ["can't tell", 'the change interval straddles the allowed drop'];
  }
  const up = lo > p1;
  if (up ? hiD < 0 : loD > 0) return ['miss', 'moved the opposite way, beyond noise'];
  if (hi2 < lo || lo2 > hi) return ['miss', 'the whole after interval is outside the expected range'];
  if (p2 >= lo && p2 <= hi && (up ? loD > 0 : hiD < 0)) return ['hit', 'inside the expected range, and the change is beyond noise'];
  return ["can't tell", 'cannot separate the result from noise yet; extend the window or the sample'];
}

const [label, why] = judge();
console.log(`verdict   ${label}: ${why}`);
process.exitCode = label === 'not a bet' ? 1 : 0;
