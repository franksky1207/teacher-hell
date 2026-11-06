import test from 'node:test';
import assert from 'node:assert/strict';
import {projectNotebookPeople,renderNotebookPeople} from '../web/notebook-people.js';
import {beginDemo,apply,storyAction} from './support/story-scenario.js';
import {readStory} from '../src/runtime/story.js';
test('14-B: projection reads only official class roster and player disclosures',()=>{
 const {world:w}=beginDemo();
 const before=JSON.stringify(w);
 const p=projectNotebookPeople(w);
 assert.ok(p.people.some(x=>x.kind==='student'));
 assert.equal(p.people.length,new Set(p.people.map(x=>x.id)).size);
 assert.ok(p.facts.every(f=>Array.isArray(f.subjectIds)&&typeof f.description==='string'));
 assert.ok(p.facts.some(f=>f.description.includes('小考'))); // Opening prehistory is already player-disclosed.
 assert.equal(JSON.stringify(w),before);
 const raw=JSON.stringify(p);
 for(const forbidden of ['numeric','random','receipts','evolution','hidden'])assert.ok(!raw.includes(forbidden));
});
test('14-B: event not yet disclosed is absent from notebook despite internal history',()=>{
 let {world:w,eventId}=beginDemo();
 const noKnowledge=projectNotebookPeople(w);
 const alreadyKnown=structuredClone(noKnowledge.facts);
 while(readStory(w,eventId).canNext)w=apply(w,[storyAction(eventId,'next')]);
 w=apply(w,[storyAction(eventId,'select','listen')]);
 assert.deepEqual(projectNotebookPeople(w).facts,alreadyKnown); // Selection is not confirmation.
});

test('14-B: colon-delimited IDs render as one encoded action',()=>{
 const id='student:cohort:123';
 const data={className:'智班',people:[{id,name:'同學',kind:'student',relation:'導師班學生'}],facts:[],claims:[]};
 const html=renderNotebookPeople(data,id);
 assert.match(html,/data-action="notebook-person:student:cohort:123"/);
});
