import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { restoreSave } from '../../src/storage/format.js';

export function retiredSaveFixture(file) {
  return JSON.parse(gunzipSync(readFileSync(new URL('../fixtures/' + file, import.meta.url))));
}

export const retiredSaveError = { code:'VERSION', message:'VERSION: Unsupported save format/version' };

export function assertRetiredSave(save) {
  const before = JSON.stringify(save);
  assert.equal(save.kind,'teacher-hell-save');
  assert.equal(save.version,1);
  assert.throws(()=>restoreSave(save),retiredSaveError);
  assert.throws(()=>restoreSave(before),retiredSaveError);
  assert.equal(JSON.stringify(save),before);
}
