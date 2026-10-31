import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { CATEGORIES, FIELDS, isCode, fieldDefinition } from '../src/numeric/dictionary.js';
import { createRecord, validateRecord, readField, requireValue, setValue, updateValue } from '../src/numeric/record.js';
import * as math from '../src/numeric/math.js';

const bad = [NaN, Infinity, -Infinity, null, undefined, '50', true, {}, [], 1n];

test('dictionary matches every category, code, name and definition in the formal source', () => {
  const source = readFileSync(new URL('../docs/02-隱藏數值與事件引擎.md', import.meta.url), 'utf8');
  const rows = [...source.matchAll(/^\| (\d+)\. ([^|]+) \|.*?\| (.*) \|$/gm)];
  assert.equal(rows.length, 12);
  assert.equal(CATEGORIES.length, 12);
  assert.equal(FIELDS.length, 48);
  assert.equal(new Set(FIELDS.map(f => f.code)).size, 48);
  rows.forEach((row, i) => {
    const expected = [...row[3].matchAll(/\*\*(\d+-\d) ([^*]+)\*\*：([^；|]+)/g)]
      .map(([, code, name, description]) => ({ code, name, description: description.trim() }));
    assert.deepEqual(CATEGORIES[i], { id: i + 1, name: row[2].trim(), fields: expected });
    assert.equal(expected.length, 4);
    expected.forEach((field, j) => {
      assert.equal(field.code, `${i + 1}-${j + 1}`);
      assert.deepEqual(fieldDefinition(field.code), { ...field, categoryId: i + 1, categoryName: row[2].trim() });
    });
  });
  for (const code of ['0-1', '13-1', '1-5', '01-1', '1-1 ', '體力', '__proto__', null, 1, Symbol()]) {
    assert.equal(isCode(code), false);
    assert.throws(() => fieldDefinition(code));
  }
  assert.throws(() => { FIELDS[0].name = 'changed'; });
  assert.throws(() => { CATEGORIES[0].fields.push({}); });
});

test('record distinguishes zero, unset, not-applicable and corrupt; JSON preserves contract', () => {
  let record = createRecord(['1-1', '5-1']);
  assert.deepEqual(readField(record, '1-1'), { status: 'unset' });
  assert.deepEqual(readField(record, '2-1'), { status: 'not-applicable' });
  assert.throws(() => requireValue(record, '1-1'));
  assert.throws(() => requireValue(record, '2-1'));
  const initial = record;
  record = setValue(record, '1-1', 0);
  assert.equal(initial['1-1'], null);
  assert.deepEqual(readField(record, '1-1'), { status: 'value', value: 0 });
  assert.equal(requireValue(record, '1-1'), 0);
  record = updateValue(record, '1-1', 25.125);
  assert.equal(record['1-1'], 25.125);
  assert.deepEqual(validateRecord(JSON.parse(JSON.stringify(record))), record);
  assert.equal(updateValue(record, '1-1', -1e308)['1-1'], 0);
  assert.equal(updateValue(record, '1-1', 1e308)['1-1'], 100);
  assert.throws(() => updateValue(record, '5-1', 1));
  assert.throws(() => setValue(record, '2-1', 50));
  assert.deepEqual(createRecord([]), {});
  assert.throws(() => createRecord(['1-1', '1-1']));
  assert.throws(() => createRecord(['13-1']));
  assert.throws(() => createRecord(null));
  for (const value of [...bad, -1, 101]) {
    assert.throws(() => setValue(record, '1-1', value));
    if (value !== null) assert.throws(() => validateRecord({ '1-1': value }));
  }
  for (const corrupt of [null, [], new Date(), Object.create({ '1-1': 10 }), { '13-1': 1 }, { panel: 40 },
    Object.defineProperty({}, '1-1', { value: 50 }), { get '1-1'() { throw Error('getter ran'); } }, { [Symbol()]: 0 }]) {
    assert.throws(() => validateRecord(corrupt));
  }
  assert.equal(validateRecord(Object.create(null)) !== null, true);
  assert.throws(() => readField({ '1-1': NaN }, '2-1'));
});

test('finite range validation and explicit clamp, including extreme deltas', () => {
  for (const value of bad) {
    assert.throws(() => math.finite(value));
    assert.throws(() => math.clamp(value));
    assert.throws(() => math.applyDelta(50, value));
  }
  for (const value of [0, 0.1, 50.555, 100]) assert.equal(math.numericValue(value), value);
  for (const value of [-Number.MIN_VALUE, 100.001, Number.MAX_VALUE]) assert.throws(() => math.numericValue(value));
  assert.equal(math.clamp(-1e308), 0);
  assert.equal(math.clamp(1e308), 100);
  assert.throws(() => math.clamp(0, 2, 1));
  assert.throws(() => math.inRange(0, NaN, 1));
  assert.equal(math.applyDelta(0, -Number.MAX_VALUE), 0);
  assert.equal(math.applyDelta(100, Number.MAX_VALUE), 100);
  assert.equal(math.applyDelta(10, -3.5), 6.5);
  assert.equal(math.applyDelta(0, Number.MIN_VALUE), Number.MIN_VALUE);
  assert.throws(() => math.applyDelta(101, -1));
  let value = 0;
  for (let i = 0; i < 10000; i++) value = math.applyDelta(value, 0.001);
  assert.ok(Math.abs(value - 10) < 1e-10);
  assert.equal(math.roundForDisplay(50.125, 2), 50.13);
  assert.equal(math.roundForDisplay(50.125), 50);
  for (const digits of [-1, 7, 0.5, '2']) assert.throws(() => math.roundForDisplay(50, digits));
});

test('normalization and means handle zero, extreme, invalid and underflow weights explicitly', () => {
  assert.deepEqual(math.normalizeWeights([1, 3, 0]), [0.25, 0.75, 0]);
  assert.deepEqual(math.normalizeWeights([Number.MAX_VALUE, Number.MAX_VALUE]), [0.5, 0.5]);
  assert.deepEqual(math.normalizeWeights([Number.MIN_VALUE, Number.MIN_VALUE]), [0.5, 0.5]);
  assert.equal(math.weightedMean([0, 100, 80], [1, 3, 0]), 75);
  assert.equal(math.weightedMean([100, 100], [Number.MAX_VALUE, Number.MAX_VALUE]), 100);
  for (const weights of [[], [0], [0, 0], [-1, 1], [NaN], [Infinity], ['1'], [null], Array(2), [Number.MIN_VALUE, Number.MAX_VALUE], null]) {
    assert.throws(() => math.normalizeWeights(weights));
  }
  for (const [values, weights] of [[[], []], [[1], []], [[101], [1]], [[NaN], [0]], [Array(2), [1, 1]], [null, []]]) {
    assert.throws(() => math.weightedMean(values, weights));
  }
  for (const p of [0, 0.5, 1]) assert.equal(math.probability(p), p);
  for (const p of [...bad, -Number.MIN_VALUE, 1.01]) assert.throws(() => math.probability(p));
  assert.equal(math.toProbability(100), 1);
  assert.equal(math.toProbability(0), 0);
});

test('runtime dependency graph is local, acyclic, browser-compatible and has no placeholder/batch modules', async () => {
  const root = new URL('../src/numeric/', import.meta.url);
  const files = readdirSync(root);
  assert.deepEqual(files.sort(), ['dictionary.js', 'math.js', 'random.js', 'record.js']);
  const graph = new Map();
  for (const file of files) {
    const source = readFileSync(new URL(file, root), 'utf8');
    assert.ok(source.trim().length > 100);
    assert.doesNotMatch(source.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, ''), /Math\.random|Date\.now|node:|process\.|document\.|window\.|\brequire\(|\bTODO\b/);
    const imports = [...source.matchAll(/from ['"]([^'"]+)['"]/g)].map(m => m[1]);
    imports.forEach(path => assert.match(path, /^\.\/[^/]+\.js$/));
    graph.set(file, imports.map(p => p.slice(2)));
    await import(new URL(file, root));
  }
  function visit(file, stack = []) {
    assert.ok(!stack.includes(file), `Cycle: ${[...stack, file]}`);
    graph.get(file).forEach(dep => visit(dep, [...stack, file]));
  }
  files.forEach(file => visit(file));
});

test('cross-holder sources stay separate; derived displays cannot become numeric fields', () => {
  const player = setValue(createRecord(['3-1']), '3-1', 60);
  const aToB = setValue(createRecord(['5-1']), '5-1', 20);
  const bToA = setValue(createRecord(['5-1']), '5-1', 80);
  assert.equal(math.weightedMean([requireValue(player, '3-1'), requireValue(aToB, '5-1')], [1, 1]), 40);
  assert.equal(requireValue(bToA, '5-1'), 80);
  assert.throws(() => requireValue(player, '5-1'));
  assert.throws(() => validateRecord({ ...player, 教學能力: 40 }));
  assert.deepEqual(player, { '3-1': 60 });
});

test('10,000 deterministic numeric cases preserve bounds and weight scale invariance', () => {
  for (let i = 0; i < 10000; i++) {
    const value = (i % 1001) / 10;
    const delta = ((i * 37) % 2001) / 10 - 100;
    const updated = math.applyDelta(value, delta);
    assert.ok(updated >= 0 && updated <= 100 && Number.isFinite(updated));
    assert.ok(Math.abs(updated - Math.max(0, Math.min(100, value + delta))) < 1e-12);
    const values = [value, 100 - value, 50];
    const weights = [i % 101, i % 97, 1];
    const actual = math.weightedMean(values, weights);
    const expected = values.reduce((s, x, j) => s + x * weights[j], 0) / weights.reduce((a, b) => a + b);
    assert.ok(Math.abs(actual - expected) < 1e-12);
    assert.ok(Math.abs(actual - math.weightedMean(values, weights.map(w => w * 1e200))) < 1e-12);
  }
});
