import test from 'node:test';
import assert from 'node:assert/strict';
import {projectNotebookEvents,renderNotebookEvents,EVENT_PAGE_SIZE} from '../web/notebook-events.js';
import {beginDemo,apply,storyAction} from './support/story-scenario.js';
import {readStory} from '../src/runtime/story.js';
import {readPlayerView} from '../src/runtime/views.js';

test('14-C: only the teacher-disclosed knowledge is projected, and reading is pure',()=>{
 const {world}=beginDemo(),before=JSON.stringify(world);
 const safe=projectNotebookEvents(world),player=readPlayerView(world);
 assert.equal(safe.entries.filter(x=>x.kind==='fact').length,new Set(player.facts.map(x=>x.id)).size);
 assert.equal(safe.entries.filter(x=>x.kind==='claim').length,new Set(player.claims.map(x=>JSON.stringify([x.claimId,x.versionId]))).size);
 assert.equal(JSON.stringify(world),before);
 assert.ok(safe.entries.some(x=>x.text.includes('小考')));
 for(const e of safe.entries)assert.ok(!Object.hasOwn(e,'subjectIds')&&!Object.hasOwn(e,'participantIds')&&!Object.hasOwn(e,'eventId'));
});
test('14-C: selecting without confirming an event does not expose new facts',()=>{
 let {world,eventId}=beginDemo();
 const before=projectNotebookEvents(world).entries;
 while(readStory(world,eventId).canNext)world=apply(world,[storyAction(eventId,'next')]);
 world=apply(world,[storyAction(eventId,'select','listen')]);
 assert.deepEqual(projectNotebookEvents(world).entries,before);
});
test('14-C: chronological cross-year filtering and second-page pagination',()=>{
 const entries=Array.from({length:30},(_,i)=>({kind:'fact',learnedDate:i<20?'2026-11-06':'2027-02-05',occurredDate:null,text:'事實'+i}));
 entries.push({kind:'claim',learnedDate:'2025-12-03',occurredDate:null,text:'舊說法',sourceName:'家長',belief:'尚待確認'});
 const data={entries};
 const first=renderNotebookEvents(data);
 assert.match(first,/符合條件：31 筆/);
 assert.equal((first.match(/class="notebook-history-item"/g)||[]).length,EVENT_PAGE_SIZE);
 const second=renderNotebookEvents(data,{page:2});
 assert.match(second,/2／3/);
 assert.equal((second.match(/class="notebook-history-item"/g)||[]).length,12);
 const previous=renderNotebookEvents(data,{year:'2025',kind:'claim'});
 assert.match(previous,/舊說法/);assert.doesNotMatch(previous,/事實29/);
 assert.match(renderNotebookEvents(data,{year:'2027'}),/符合條件：10 筆/);
 assert.throws(()=>renderNotebookEvents(data,{year:'2024'}),RangeError);
 assert.throws(()=>renderNotebookEvents(data,{kind:'secret'}),RangeError);
});
test('14-C: occurred versus learned dates and claims remain clearly separated',()=>{
 const data={entries:[{kind:'fact',learnedDate:'2027-02-01',occurredDate:'2026-10-01',text:'後來才知道'},{kind:'claim',learnedDate:'2026-08-01',occurredDate:null,text:'傳聞，不是事實',sourceName:'家長',belief:'尚待確認'}]};
 const html=renderNotebookEvents(data);
 assert.match(html,/2027-02-01 得知/);assert.match(html,/事情發生：2026-10-01/);
 assert.match(html,/已知說法/);assert.match(html,/來源：家長/);assert.match(html,/尚待確認/);
 assert.doesNotMatch(html,/成功率|NPC|H01-|事件權重/);
});
test('14-C: narrative strings escape HTML and no write actions are emitted',()=>{
 const data={entries:[{kind:'fact',learnedDate:'2026-12-01',occurredDate:null,text:'<img src=x onerror=bad()>'},{kind:'claim',learnedDate:'2026-11-01',text:'<script>alert(1)</script>',sourceName:'<家長>',belief:'尚待確認'}]};
 const html=renderNotebookEvents(data);
 assert.doesNotMatch(html,/<img|<script>|<[^>]+ onerror=/);
 assert.match(html,/&lt;img/);assert.match(html,/&lt;script&gt;/);assert.match(html,/&lt;家長&gt;/);
 assert.doesNotMatch(html,/data-story-action|data-action="advance-time"|data-option-id/);
});
