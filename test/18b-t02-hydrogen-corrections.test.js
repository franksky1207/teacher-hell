/** Focused post-review acceptance. No semantic re-audit, simulation or publication. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {eventWorld} from './support/event-fixtures.js';
import {buildEventCandidates} from '../src/runtime/event-candidates.js';
import {entranceCondition} from '../src/runtime/entrance.js';
import {admissionCalendar} from '../src/calendar/admissions.js';
import {SENIOR_CALENDAR_VERSION} from '../src/calendar/calendar.js';
const read=p=>JSON.parse(readFileSync(new URL('../'+p,import.meta.url),'utf8'));
const manifest=read('work/18b-t02-hydrogen-corrections.json');
const all=Array.from({length:8},(_,i)=>read(`work/18b-t02-${String(i+1).padStart(2,'0')}-authoring.json`).records).flat();
const byId=new Map(all.map(r=>[r.definition.id.slice(-5),r]));
const sorted=x=>Array.isArray(x)?x.map(sorted):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,sorted(x[k])])):x;
const digest=x=>createHash('sha256').update(JSON.stringify(sorted(x))).digest('hex');

test('T02 correction: passed and held originals remain intact; no formal candidates',()=>{
 assert.equal(Object.keys(manifest.passedUnchanged).length,23);
 assert.equal(Object.keys(manifest.held).length,8);
 for(const [id,hash] of Object.entries(manifest.passedUnchanged))assert.equal(digest(byId.get(id)),hash,id);
 for(const [id,hold] of Object.entries(manifest.held)){
  assert.equal(hold.status,'held');assert.equal(hold.formalCandidate,false);
  assert.equal(digest(byId.get(id)),hold.sha256,id);
 }
 const disposition=[...manifest.resolvedIds,...Object.keys(manifest.blocked),...Object.keys(manifest.held)];
 assert.equal(disposition.length,185);assert.equal(new Set(disposition).size,185);
 const result=buildEventCandidates(eventWorld(1,'2028-09-11','early'),all.map(r=>r.definition));
 assert.deepEqual(result.candidates,[],'engineering drafts must never enter the formal candidate pool');
});

test('T02 correction: actual admission gates reject premature and unrelated students; windows follow existing calendar',()=>{
 const r=byId.get('06-05');
 const s={entrance:{completed:[],students:{student:{applications:[]},other:{applications:[]}}}};
 const eligible=id=>r.definition.eligibility.entrance.every(c=>entranceCondition(s,id,c));
 assert.equal(eligible('student'),false);
 s.entrance.completed.push({id:'application-screen'});
 assert.equal(eligible('student'),false,'school-wide result does not qualify an unscreened student');
 s.entrance.students.student.applications.push({status:'screened'});
 assert.equal(eligible('student'),true);assert.equal(eligible('other'),false);
 const nodes=admissionCalendar(2026,SENIOR_CALENDAR_VERSION);
 const previous=date=>new Date(Date.parse(date+'T00:00:00Z')-86400000).toISOString().slice(0,10);
 assert.equal(r.definition.eligibility.until,previous(nodes.find(n=>n.id==='application-review').date));
 assert.equal(byId.get('05-04').definition.eligibility.until,previous(nodes.find(n=>n.id==='stars-screen').date));
 const caregiver=byId.get('06-03');
 assert.equal(caregiver.definition.eligibility.people[0],'caregiver');
 assert.equal(!!entranceCondition(s,'caregiver',{kind:'application-screened'}),false);
 assert.ok(manifest.blocked['06-03'],'unsupported caregiver-to-student qualification must remain blocked');
});

test('T02 correction: remote conversations have no in-person contact or mismatched recorded claims',()=>{
 const ids=['01-10','01-15','02-11','03-22','05-19','06-03','07-03','07-16','08-04','08-16','08-21','08-25'];
 for(const id of ids){
  const stage=byId.get(id).story.stages[0];
  assert.ok(['chat','phone'].includes(stage.pages[1].presentation),id);
  for(const c of stage.choices){
   assert.deepEqual(c.outcome.world.contacts,[],id);
   for(const claim of c.outcome.claims.filter(x=>x.role==='participant'))assert.equal(claim.statement,stage.pages[1].text,id);
  }
 }
});
