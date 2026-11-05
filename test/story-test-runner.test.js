import test from 'node:test';
import assert from 'node:assert/strict';
import {testSelection} from '../scripts/test.js';
const REQUIRED=['test/story.test.js','test/story-view.test.js','test/story-controller.test.js','test/story-shell.test.js'];
test('13-G: story web cases are included in integration, quick and regression suites',()=>{
 for(const suite of ['integration','quick','regression']){
  const selected=testSelection([suite]).files;
  for(const file of REQUIRED)assert.ok(selected.includes(file),suite+' must run '+file);
 }
});
test('13-G: focused story modules can be selected without running 30-year simulation',()=>{
 const selection=testSelection(['module=story,story-view,story-controller,story-shell']);
 assert.deepEqual(selection.files,REQUIRED);
});
