/** Finite numbers only; no coercion, fallback, or silent corruption repair. */
export function finite(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) throw new TypeError('Expected a finite number');
  return value;
}

export function inRange(value, min, max) {
  finite(value); finite(min); finite(max);
  if (min > max || value < min || value > max) throw new RangeError('Number outside ordered range');
  return value;
}

export function clamp(value, min = 0, max = 100) {
  finite(value); finite(min); finite(max);
  if (min > max) throw new RangeError('Reversed range');
  return Math.max(min, Math.min(max, value));
}

export function numericValue(value) { return inRange(value, 0, 100); }

/** Saturation before addition prevents overflow even for MAX_VALUE deltas. */
export function applyDelta(value, delta) {
  numericValue(value); finite(delta);
  if (delta >= 100 - value) return 100;
  if (delta <= -value) return 0;
  return value + delta;
}

/** Reflect a natural perturbation at 0/100, without accumulating a boundary atom.
 * Direct/externally determined changes continue to use saturating applyDelta.
 */
export function reflectDelta(value, delta) {
  numericValue(value); finite(delta);
  if (delta === 0) return value;
  const folded = ((value + delta % 200) % 200 + 200) % 200;
  return folded <= 100 ? folded : 200 - folded;
}

export function probability(value) { return inRange(value, 0, 1); }
export function toProbability(value) { return numericValue(value) / 100; }

/** Display-only rounding: stored and calculated values remain IEEE-754 doubles. */
export function roundForDisplay(value, digits = 0) {
  numericValue(value);
  if (!Number.isInteger(digits) || digits < 0 || digits > 6) throw new RangeError('Display digits must be 0..6');
  return Number(value.toFixed(digits));
}

// Neumaier compensated summation; inputs here are already bounded/scaled.
function sum(values) {
  let total = 0, correction = 0;
  for (const value of values) {
    const next = total + value;
    correction += Math.abs(total) >= Math.abs(value) ? (total - next) + value : (value - next) + total;
    total = next;
  }
  return total + correction;
}

/** Relative nonnegative weights. Scaling avoids overflow of their raw sum. */
export function normalizeWeights(weights) {
  if (!Array.isArray(weights) || weights.length === 0) throw new RangeError('Weights must be a nonempty dense array');
  let max = 0;
  for (const weight of weights) {
    finite(weight);
    if (weight < 0) throw new RangeError('Negative weight');
    max = Math.max(max, weight);
  }
  if (max === 0) throw new RangeError('Total weight is zero');
  const scaled = weights.map(weight => weight / max);
  // A positive weight must not silently disappear through IEEE-754 underflow.
  const total = sum(scaled);
  const result = scaled.map(weight => weight / total);
  result.forEach((weight, i) => {
    if (weights[i] > 0 && weight === 0) throw new RangeError('Weight ratio is below representable precision');
  });
  return result;
}

/** Only combine caller-selected quantities with the same meaning/scale (0..100). */
export function weightedMean(values, weights) {
  if (!Array.isArray(values) || !Array.isArray(weights) || values.length !== weights.length) throw new RangeError('Mismatched arrays');
  for (const value of values) numericValue(value);
  const normalized = normalizeWeights(weights);
  // Clamp only the final roundoff, never invalid source data.
  return clamp(sum(values.map((value, i) => value * normalized[i])));
}
