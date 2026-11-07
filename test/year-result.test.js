import test from 'node:test';
import assert from 'node:assert/strict';
import {renderYearResult,projectYearResult} from '../web/year-result.js';
import {ABILITY_NAMES,STATE_NAMES} from '../src/player/panel.js';

const comparison=Object.fromEntries([...ABILITY_NAMES,...STATE_NAMES].map(name=>[name,{start:50,end:52,delta:2}]));
const sample=(kind)=>({id:'history:test',kind,year:2,date:'2028-06-29',summary:'已儲存的<結果>，不可執行HTML',comparison,
 events:['已公開重要事件'],causes:['原導師職務確定中斷'],pending:1,
 grade:kind==='failure'?null:'B',score:kind==='failure'?null:72.5,retryEligible:kind==='failure',failureId:kind==='failure'?'history:test':null});

test('14-F1 failure pages show formal reason and 12 values but never an invented rating',()=>{
 const d=sample('failure');
 const intro=renderYearResult(d,0),stats=renderYearResult(d,1),history=renderYearResult(d,2),ending=renderYearResult(d,3);
 assert.match(intro,/本學年導師職務中斷/);
 assert.doesNotMatch(intro,/正式評等/);
 assert.match(intro,/已儲存的&lt;結果&gt;/);
 assert.match(stats,/教師能力與狀態變化/);
 for(const name of [...ABILITY_NAMES,...STATE_NAMES])assert.ok(stats.includes(name));
 assert.match(history,/原導師職務確定中斷/);
 assert.match(history,/已公開重要事件/);
 assert.match(ending,/data-action="year-retry"/);
});
test('14-F1 success pages never offer retry and retain formal rating',()=>{
 const d=sample('success');
 assert.match(renderYearResult(d,0),/正式評等：B・分數 72.5/);
 assert.doesNotMatch(renderYearResult(d,3),/data-action="year-retry"/);
});
test('14-F1 invalid page and empty history are safe',()=>{
 assert.throws(()=>renderYearResult(sample('success'),4),TypeError);
 assert.equal(projectYearResult({position:{serviceYear:1},extensions:{'teacher-hell/world':{history:[]}}}),null);
});
