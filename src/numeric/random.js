import { finite, probability, normalizeWeights } from './math.js';

const UINT32_SIZE = 0x100000000;
function uint32(value) {
  if (!Number.isInteger(value) || value < 0 || value >= UINT32_SIZE) throw new RangeError('Expected uint32');
  return value;
}

/** Mulberry32 v1: explicit uint32 seed (including zero), period 2^32 state.
 * Not cryptographic. No implicit time/Math.random source. JSON state is versioned.
 */
export function createRandom(seed) {
  let state = uint32(seed);
  function nextUint32() {
    state = (state + 0x6D2B79F5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return (t ^ (t >>> 14)) >>> 0;
  }
  function next() { return nextUint32() / UINT32_SIZE; }
  return Object.freeze({
    nextUint32, next,
    snapshot: () => ({ algorithm: 'mulberry32', version: 1, state }),
    /** Real interval [min,max), except a degenerate interval returns min. */
    uniform(min, max) {
      finite(min); finite(max);
      if (min > max || !Number.isFinite(max - min)) throw new RangeError('Invalid or overflowing interval');
      if (min === max) return min;
      const value = min + (max - min) * next();
      // Very narrow real intervals can round to max: fail explicitly.
      if (value >= max) throw new RangeError('Real interval lacks sufficient floating-point precision');
      return value;
    },
    /** Inclusive safe integer endpoints, width <= 2^32; rejection avoids modulo bias. */
    integer(min, max) {
      if (!Number.isSafeInteger(min) || !Number.isSafeInteger(max) || min > max) throw new RangeError('Invalid integer interval');
      const width = max - min + 1;
      if (width > UINT32_SIZE) throw new RangeError('Integer interval too wide');
      if (width === 1) return min;
      const limit = UINT32_SIZE - (UINT32_SIZE % width);
      let draw;
      do { draw = nextUint32(); } while (draw >= limit);
      return min + draw % width;
    },
    chance(p) {
      probability(p);
      if (p === 0 || p === 1) return p === 1; // Certain outcomes consume no draw.
      return next() < p;
    },
    /** General relative-weight index sampler; no event eligibility or game rules. */
    weightedIndex(weights) {
      const normalized = normalizeWeights(weights);
      const draw = next();
      let cumulative = 0, lastPositive;
      for (let i = 0; i < normalized.length; i++) {
        if (normalized[i] === 0) continue;
        lastPositive = i;
        cumulative += normalized[i];
        if (draw < cumulative) return i;
      }
      return lastPositive; // Final summation roundoff; never select a zero weight.
    },
  });
}

export function restoreRandom(snapshot) {
  if (snapshot === null || typeof snapshot !== 'object' ||
      snapshot.algorithm !== 'mulberry32' || snapshot.version !== 1 ||
      Object.keys(snapshot).sort().join(',') !== 'algorithm,state,version') throw new TypeError('Unsupported random snapshot');
  return createRandom(uint32(snapshot.state));
}
