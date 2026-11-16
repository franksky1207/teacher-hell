import { fieldDefinition } from './dictionary.js';
import { numericValue, applyDelta } from './math.js';

/** JSON contract: own code -> number (set) or null (applicable, unset).
 * Absent code = not applicable. Metadata, identity and history belong elsewhere.
 * Each record describes one explicit holder/context, e.g. A→B, not all NPCs.
 */
export function validateRecord(record) {
  if (record === null || typeof record !== 'object' ||
      ![Object.prototype, null].includes(Object.getPrototypeOf(record))) throw new TypeError('Expected a plain numeric record');
  for (const key of Reflect.ownKeys(record)) {
    fieldDefinition(key);
    const descriptor = Object.getOwnPropertyDescriptor(record, key);
    if (!descriptor.enumerable || !Object.hasOwn(descriptor, 'value')) throw new TypeError('Expected enumerable data fields');
    if (descriptor.value !== null) numericValue(descriptor.value);
  }
  return record;
}

export function createRecord(applicableCodes) {
  if (!Array.isArray(applicableCodes)) throw new TypeError('Expected code array');
  const result = {};
  for (const code of applicableCodes) {
    fieldDefinition(code);
    if (Object.hasOwn(result, code)) throw new RangeError('Duplicate applicable code');
    result[code] = null;
  }
  return result;
}

export function readField(record, code) {
  fieldDefinition(code); validateRecord(record);
  if (!Object.hasOwn(record, code)) return { status: 'not-applicable' };
  if (record[code] === null) return { status: 'unset' };
  return { status: 'value', value: record[code] };
}

/** Required-source accessor for future panel projection; missing never becomes 0/50. */
export function requireValue(record, code) {
  const result = readField(record, code);
  if (result.status !== 'value') throw new RangeError(`Required ${code}: ${result.status}`);
  return result.value;
}

/** Immutable explicit assignment; cannot add an inapplicable field. */
export function setValue(record, code, value) {
  numericValue(value);
  const result = readField(record, code);
  if (result.status === 'not-applicable') throw new RangeError('Field is not applicable');
  return { ...record, [code]: value };
}

export function updateValue(record, code, delta) {
  return setValue(record, code, applyDelta(requireValue(record, code), delta));
}
