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

test('14-F3: class summary counts only disclosed student facts without extrapolating to whole class',()=>{
 const {world}=beginDemo(),data=projectNotebookPeople(world);
 assert.equal(data.classSummary.enrollment,data.people.filter(p=>p.kind==='student').length);
 const studentIds=new Set(data.people.filter(p=>p.kind==='student').map(p=>p.id));
 const facts=data.facts.filter(f=>f.subjectIds.some(id=>studentIds.has(id)));
 const covered=new Set(facts.flatMap(f=>f.subjectIds.filter(id=>studentIds.has(id))));
 assert.equal(data.classSummary.studentsWithKnownRecords,covered.size);
 assert.equal(data.classSummary.knownStudentFacts,facts.length);
 const html=renderNotebookPeople(data);
 assert.match(html,/班級已知概況/);
 assert.match(html,/不能代表全班的整體表現/);
 assert.doesNotMatch(html,/全班都|所有學生都/);
});
test('14-F3: individual observations disclose only the selected student facts, never other classmates',()=>{
 const data={className:'智班',classSummary:{enrollment:2,studentsWithKnownRecords:1,knownStudentFacts:1,archived:false},
 people:[{id:'s1',name:'甲同學',kind:'student',relation:'導師班學生'},{id:'s2',name:'乙同學',kind:'student',relation:'導師班學生'}],
 facts:[{id:'f1',description:'甲已公開的班級活動',subjectIds:['s1'],occurredAt:{date:'2026-11-07'}},{id:'f2',description:'乙未選取的私事',subjectIds:['s2'],occurredAt:{date:'2026-11-07'}}],claims:[]};
 const selected=renderNotebookPeople(data,'s1');
 assert.match(selected,/導師目前掌握的觀察/);
 assert.match(selected,/最近已知紀錄（2026-11-07）：甲已公開的班級活動/);
 assert.doesNotMatch(selected,/乙未選取的私事/);
 const empty=renderNotebookPeople(data,'s2');
 assert.doesNotMatch(empty,/甲已公開的班級活動/);
});
test('14-F3: incomplete observations are explicitly unknown, with HTML escaping',()=>{
 const data={className:'<智班>',classSummary:{enrollment:1,studentsWithKnownRecords:0,knownStudentFacts:0,archived:true},
 people:[{id:'s',name:'<同學>',kind:'student',relation:'導師班學生'}],facts:[],claims:[]};
 const html=renderNotebookPeople(data,'s');
 assert.match(html,/封存班級紀錄/);
 assert.match(html,/不能據此判定學生的個性或表現/);
 assert.match(html,/&lt;同學&gt;/);
 assert.doesNotMatch(html,/<同學>/);
});

test('15-F notebook: selected student portrait is opt-in, happy, and absent for caregivers',()=>{
 const people=[
  {id:'s',name:'學生肖像',kind:'student',seatNo:11,relation:'導師班學生'},
  {id:'c',name:'家長',kind:'caregiver',relation:'學生家長',relatedTo:['學生肖像']}
 ];
 const data={className:'導師班',people,facts:[],claims:[]};
 const portrait={artId:'student-001',wear:'uniform-winter',cell:null};
 const normal=renderNotebookPeople(data,'s','', 'student',portrait);
 assert.match(normal,/data-action="notebook-portrait-toggle"/);
 assert.match(normal,/data-expression="happy"/);
 assert.match(normal,/data-story-portrait="student-001"/);
 assert.match(normal,/data-story-wear="uniform-winter"/);
 assert.match(normal,/id="notebook-student-portrait"[^>]* hidden/);
 assert.doesNotMatch(renderNotebookPeople(data,'s'),/notebook-portrait-toggle/);
 const parent=renderNotebookPeople(data,'c','','caregiver',portrait);
 assert.doesNotMatch(parent,/notebook-portrait-toggle|data-story-portrait/);
});
test('15-F notebook: casual scene cell is preserved, unapproved art stays hidden',()=>{
 const data={className:'導師班',people:[{id:'s',name:'學生',kind:'student',relation:'導師班學生'}],facts:[],claims:[]};
 const casual=renderNotebookPeople(data,'s','','student',{artId:'student-044',wear:'casual',cell:'graduation-trip-2'});
 assert.match(casual,/data-story-portrait="student-044"/);
 assert.match(casual,/data-expression="happy"/);
 assert.match(casual,/data-story-wear="casual"/);
 assert.match(casual,/data-story-cell="graduation-trip-2"/);
 assert.doesNotMatch(renderNotebookPeople(data,'s','','student',{artId:'student-999',wear:'uniform-summer'}),/notebook-portrait-toggle/);
});
