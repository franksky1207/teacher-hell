import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {T03_BATCH_RECORDS} from '../src/runtime/content/t03.js';
import {validateStory} from '../src/runtime/story-content.js';
import {validateEventDefinitions,buildEventCandidates} from '../src/runtime/event-candidates.js';
import {eventWorld} from './support/event-fixtures.js';
import {applySchoolOperation} from '../src/world/registry.js';
import {canonicalData} from '../src/changes/settlement.js';
import {createHash} from 'node:crypto';

const source=sub=>JSON.parse(readFileSync(new URL('../work/18b-t03-'+sub+'-authoring.json',import.meta.url),'utf8'));
const focusedIds=process.env.T03_EVENT_IDS ? new Set(process.env.T03_EVENT_IDS.split(',').filter(Boolean)) : null;
const scope=records=>focusedIds?records.filter(r=>focusedIds.has(r.definition.id)):records;
test('T03 engineering drafts preserve all eight independent source files and isolation',()=>{
 const all=scope(Array.from({length:8},(_,i)=>source(String(i+1).padStart(2,'0')).records).flat());
 const builtRecords=scope(T03_BATCH_RECORDS);
 assert.equal(builtRecords.length,all.length);
 assert.equal(new Set(all.map(r=>r.definition.id)).size,all.length);
 if(focusedIds)assert.equal(all.length,focusedIds.size,'every requested ID exists exactly once');
 else assert.ok(all.length>=45);
 for(let i=0;i<all.length;i++){
  const r=all[i],built=builtRecords[i];
  assert.equal(canonicalData(built),canonicalData({story:r.story,definition:r.definition,binding:r.binding}),r.definition.id);
  assert.equal(r.story.status,'engineering-test',r.definition.id);
  assert.equal(r.definition.content.status,'engineering-test',r.definition.id);
  assert.equal(r.story.definitionId,r.definition.id);
  assert.equal(r.story.topicId,r.definition.topicId);
  assert.equal(r.story.version,r.definition.content.version);
  assert.equal(r.story.resourceId,r.definition.content.resourceId);
  if(focusedIds){
   const sub=r.definition.topicId.slice(-2);
   const exploration=JSON.parse(readFileSync(new URL('../work/18b-t03-'+sub+'-exploration.json',import.meta.url),'utf8'));
   assert.ok(exploration.scenarios.some(s=>s.candidateId===r.editorial.candidateId&&s.title===r.editorial.title),r.definition.id+' exploration provenance');
  }
 }
});
test('T03 story compiler and event eligibility contracts accept only isolated draft sources',()=>{
 const all=scope(T03_BATCH_RECORDS);
 for(const item of all){
  assert.doesNotThrow(()=>validateStory(item.story),item.definition.id);
 }
 assert.doesNotThrow(()=>validateEventDefinitions(all.map(r=>r.definition)));
});
test('T03 exploration counts are not falsely counted as reviewed playable events',()=>{
 for(let i=1;i<=8;i++){
  const sub=String(i).padStart(2,'0');
  const explored=JSON.parse(readFileSync(new URL('../work/18b-t03-'+sub+'-exploration.json',import.meta.url),'utf8'));
  const screen=JSON.parse(readFileSync(new URL('../work/18b-t03-'+sub+'-screening.json',import.meta.url),'utf8'));
  const drafts=source(sub);
  assert.ok(explored.scenarios.length>20);
  assert.equal(screen.evaluations.length,explored.scenarios.length);
  assert.ok(drafts.records.every(r=>r.definition.content.status==='engineering-test'));
  assert.ok(new Set(drafts.records.map(r=>r.definition.id)).size===drafts.records.length);
  assert.ok(drafts.records.every(r=>r.story.status!=='ready'));
 }
});

test('Newcomer narratives cannot be assigned to the original 40 students',()=>{
 const gated=new Set([1,2,3,4,5,10,12,13,14,17,21,22,24,25].map(n=>'content:18b-t03-05-'+String(n).padStart(2,'0')));
 const definitions=source('05').records.map(r=>r.definition);
 for(const d of definitions)if(gated.has(d.id))assert.deepEqual(d.eligibility.roleIds,[17],d.id);
 const w=eventWorld(74,'2028-09-11','early');
 const roster=w.numeric.evolution.world.classroom.studentIds;
 assert.equal(roster.length,40);
 assert.ok(roster.every(id=>!w.numeric.evolution.world.people[id].roleIds.includes(17)));
 const candidates=buildEventCandidates(w,definitions.filter(d=>gated.has(d.id)),{engineering:true});
 assert.equal(candidates.candidates.length,0,'Opening-class students must not be mistaken for new transfers');
});

test('T03 genuine enrollment history produces legitimate candidates while initial roster is excluded',()=>{
 const newcomer=source('05').records.find(r=>r.definition.id==='content:18b-t03-05-01').definition;
 const returning=source('06').records.find(r=>r.definition.id==='content:18b-t03-06-05').definition;
 const w=eventWorld(74,'2027-03-11','early');
 const n=w.numeric.evolution.world;
 const first=n.classroom.studentIds[0],home=n.registry.homeClassId;
 const old=buildEventCandidates(w,[newcomer,returning],{engineering:true});
 assert.equal(old.candidates.length,0,'No original student may masquerade as a newcomer or recent returnee');
 applySchoolOperation(n,{type:'school-leave',personId:first,status:'suspended',reason:'test:documented-leave'},'2027-02-01');
 applySchoolOperation(n,{type:'school-enroll',personId:first,classId:home,action:'return',source:'test:documented-return'},'2027-03-01');
 const before=new Set(Object.keys(n.people));
 // This new arrival must be within the story's 0–1 day enrollmentContext window on 2027-03-11.
 applySchoolOperation(n,{type:'school-enroll',personId:null,classId:home,action:'transfer-in',source:'test:transfer'},'2027-03-10');
 const entrant=Object.keys(n.people).find(id=>!before.has(id)&&n.people[id].kind==='student');
 assert.ok(entrant,'real transfer generated a student');
 assert.ok(n.people[entrant].roleIds.includes(17),'newcomer role comes from registry');
 const chosen=buildEventCandidates(w,[newcomer,returning],{engineering:true}).candidates;
 assert.ok(chosen.some(c=>c.definitionId===newcomer.id&&c.participantIds[0]===entrant),'newcomer is actually eligible');
 assert.ok(chosen.some(c=>c.definitionId===returning.id&&c.participantIds[0]===first),'returned student is eligible');
 assert.ok(!chosen.some(c=>c.definitionId===newcomer.id&&c.participantIds[0]===first),'returnee is not masquerading as transfer newcomer');
});

// The reconciliation run exercises only the newly added returnee gate.
test('T03 reconciliation new returnee respects documented leave and return window', {skip:!focusedIds?.has('content:18b-t03-06-28')},()=>{
 const definition=source('06').records.find(r=>r.definition.id==='content:18b-t03-06-28').definition;
 const w=eventWorld(74,'2027-03-11','p4'),n=w.numeric.evolution.world;
 const student=n.classroom.studentIds[0],home=n.registry.homeClassId;
 const eligible=()=>buildEventCandidates(w,[definition],{engineering:true}).candidates.some(c=>c.participantIds[0]===student);
 assert.equal(eligible(),false,'ordinary initial student is not a documented returnee');
 applySchoolOperation(n,{type:'school-leave',personId:student,status:'suspended',reason:'test:documented-leave'},'2027-02-01');
 applySchoolOperation(n,{type:'school-enroll',personId:student,classId:home,action:'return',source:'test:documented-return'},'2027-03-01');
 assert.equal(eligible(),true,'documented long leave and recent return qualifies');
 const expired=structuredClone(definition);
 expired.eligibility.enrollmentContext.maxDays=9;
 assert.equal(buildEventCandidates(w,[expired],{engineering:true}).candidates.some(c=>c.participantIds[0]===student),false,'return date is actually checked');
});

test('T03 reconciliation 59 final decisions match source revisions and review totals', {skip:!focusedIds},()=>{
 const read=path=>JSON.parse(readFileSync(new URL('../'+path,import.meta.url),'utf8'));
 const groups=['01-04','05-08'].map(g=>read('work/18b-t03-reconciliation/t03-held-triage-'+g+'.json'));
 const unique=read('work/18b-t03-reconciliation/t03-pr76-three-unique-editorial-triage.json');
 const decisions=[...groups.flatMap(g=>g.records),...unique.records];
 assert.equal(decisions.length,59);
 assert.equal(new Set(decisions.map(r=>r.id)).size,59,'original IDs have exactly one final decision');
 const global=read('work/18b-t03-controller-content-disposition.json');
 const canonical=value=>Array.isArray(value)?value.map(canonical):value&&typeof value==='object'?Object.fromEntries(Object.keys(value).sort().map(k=>[k,canonical(value[k])])):value;
 let accepted=0,held=0;
 for(const decision of decisions){
  const id=decision.adaptedId??decision.id,sub=id.split('-').at(-2);
  const src=source(sub).records.find(r=>r.definition.id===id);
  assert.ok(src,id);
  assert.equal(createHash('sha256').update(JSON.stringify(canonical(src))).digest('hex'),decision.reviewedRecordSha256,id+' reviewed source hash');
  assert.ok(['accepted','held'].includes(decision.finalDisposition),id);
  const local=read('work/18b-t03-'+sub+'-controller-semantic-review.json').records.find(r=>r.id===id);
  const index=global.records.find(r=>r.id===id);
  assert.equal(index.contentVerdict,local.contentVerdict,id);
  assert.equal(index.reason,decision.finalReason,id);
  assert.equal(index.reviewedRecordSha256,decision.reviewedRecordSha256,id);
  assert.equal(decision.finalDisposition==='accepted',index.contentVerdict==='controller-content-accepted',id);
  assert.equal(src.story.status,'engineering-test',id);
  if(decision.finalDisposition==='accepted')accepted++;else held++;
  if(decision.adaptedId){
   assert.notEqual(decision.adaptedId,decision.id);
   assert.ok(read(decision.preservedSourcePath).records.some(r=>r.definition.id===decision.id),'preserved original');
  }
 }
 assert.equal(accepted+held,59);
 assert.equal(global.totals.accepted,168+accepted);
 assert.equal(global.totals.held,held);
 assert.equal(global.totals.authored,224+unique.records.length);
 assert.equal(global.totals.published,0);
 for(const topic of global.byTopic){
  const rows=global.records.filter(r=>r.topicId===topic.topicId);
  const count=rows.filter(r=>r.contentVerdict==='controller-content-accepted').length;
  assert.equal(topic.authored,rows.length);assert.equal(topic.accepted,count);assert.equal(topic.held,rows.length-count);
 }
 assert.deepEqual(new Set(groups[0].verificationScope.eventIds),focusedIds,'CI selection matches recorded actual payload changes');
});
