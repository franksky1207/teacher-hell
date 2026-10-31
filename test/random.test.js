import test from 'node:test';
import assert from 'node:assert/strict';
import { createRandom, restoreRandom } from '../src/numeric/random.js';

const sequence = rng => Array.from({ length: 1000 }, () => [rng.next(), rng.integer(-50, 50), rng.chance(0.3), rng.weightedIndex([0, 1, 3])]);

test('fixed seed, distinct seeds and versioned JSON state replay exactly', () => {
  assert.deepEqual(sequence(createRandom(0)), sequence(createRandom(0)));
  assert.notDeepEqual(sequence(createRandom(0)), sequence(createRandom(1)));
  const rng = createRandom(0xffffffff);
  sequence(rng);
  const saved = JSON.parse(JSON.stringify(rng.snapshot()));
  assert.deepEqual(sequence(rng), sequence(restoreRandom(saved)));
  // Independent Mulberry32 golden vector for seed 1; pins algorithm/version.
  const golden = createRandom(1);
  assert.deepEqual(Array.from({ length: 5 }, () => golden.nextUint32()), [2693262067, 11749833, 2265367787, 4213581821, 4159151403]);
});

test('invalid seeds/state and ranges fail; probability endpoints and degenerate ranges consume no draws', () => {
  for (const seed of [-1, 2 ** 32, 0.5, NaN, Infinity, '1', null]) assert.throws(() => createRandom(seed));
  for (const saved of [null, {}, { algorithm: 'other', version: 1, state: 0 }, { algorithm: 'mulberry32', version: 2, state: 0 },
    { algorithm: 'mulberry32', version: 1, state: -1 }, { algorithm: 'mulberry32', version: 1, state: 0, extra: 1 }]) assert.throws(() => restoreRandom(saved));
  const rng = createRandom(0), saved = rng.snapshot();
  assert.equal(rng.chance(0), false); assert.equal(rng.chance(1), true);
  assert.equal(rng.integer(100, 100), 100); assert.equal(rng.uniform(100, 100), 100);
  assert.deepEqual(rng.snapshot(), saved);
  for (const p of [-0.01, 1.01, NaN, '0.5', null]) assert.throws(() => rng.chance(p));
  for (const bounds of [[2, 1], [NaN, 1], [0, Infinity], ['0', 1], [-1e308, 1e308]]) assert.throws(() => rng.uniform(...bounds));
  for (const bounds of [[2, 1], [0.1, 1], [0, 2 ** 32], [0, Infinity], [0, Number.MAX_SAFE_INTEGER + 1]]) assert.throws(() => rng.integer(...bounds));
  for (const weights of [[], [0, 0], [-1], [NaN]]) assert.throws(() => rng.weightedIndex(weights));
  assert.deepEqual(rng.snapshot(), saved);
  assert.equal(rng.weightedIndex([0, 1, 0]), 1);
  const near = createRandom(0);
  let precisionFailure = false;
  for (let i = 0; i < 100; i++) {
    try { assert.equal(near.uniform(1, 1 + Number.EPSILON), 1); }
    catch (e) { assert.ok(e instanceof RangeError); precisionFailure = true; break; }
  }
  assert.ok(precisionFailure);
});

test('100,000 fixed-seed samples: uniform bins, mean, serial correlation, integer and weighted frequencies', t => {
  const n = 100000, rng = createRandom(20261031);
  const bins = Array(10).fill(0), ints = Array(7).fill(0), weighted = Array(4).fill(0);
  let total = 0, squares = 0, pairs = 0, previous, first, last, chance = 0;
  for (let i = 0; i < n; i++) {
    const x = rng.next();
    assert.ok(x >= 0 && x < 1);
    bins[Math.floor(x * 10)]++;
    total += x; squares += x * x;
    if (i) pairs += previous * x; else first = x;
    previous = last = x;
    const integer = rng.integer(-3, 3);
    assert.ok(Number.isInteger(integer) && integer >= -3 && integer <= 3);
    ints[integer + 3]++;
    const real = rng.uniform(-100, 100);
    assert.ok(real >= -100 && real < 100);
    const full = rng.integer(0, 0xffffffff);
    assert.ok(full >= 0 && full <= 0xffffffff);
    const wide = rng.integer(0, 2 ** 31); // ~50% rejection exercises that path.
    assert.ok(wide >= 0 && wide <= 2 ** 31);
    weighted[rng.weightedIndex([0, 1, 3, 6])]++;
    chance += rng.chance(0.3);
  }
  const chi = (counts, expected) => counts.reduce((s, c, i) => s + (c - expected[i]) ** 2 / expected[i], 0);
  const uniformChi = chi(bins, bins.map(() => n / 10));
  const integerChi = chi(ints, ints.map(() => n / 7));
  const weightedChi = chi(weighted.slice(1), [n * 0.1, n * 0.3, n * 0.6]);
  const mean = total / n;
  const covariance = pairs / (n - 1) - ((total - last) / (n - 1)) * ((total - first) / (n - 1));
  const correlation = covariance / (squares / n - mean ** 2);
  // Conservative fixed thresholds, deterministic seeds; regression checks, not RNG certification.
  assert.ok(uniformChi < 40); assert.ok(integerChi < 35); assert.ok(weightedChi < 25);
  assert.ok(Math.abs(mean - 0.5) < 0.005);
  assert.ok(Math.abs(correlation) < 0.02);
  assert.equal(weighted[0], 0);
  assert.ok(Math.abs(chance / n - 0.3) < 0.005);
  t.diagnostic(JSON.stringify({ n, bins, ints, weighted, uniformChi, integerChi, weightedChi, mean, correlation, chance }));
});
