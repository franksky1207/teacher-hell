import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validateStory,validateStoryReference,resolveStory,T01_DRAFT_STORIES,t01DraftCatalogue} from '../src/runtime/story-content.js';
import {validateEventDefinitions,buildEventCandidates} from '../src/runtime/event-candidates.js';
import {auditContent} from '../scripts/content-audit.js';
import {apply,storyAction,advanceDemo} from './support/story-scenario.js';
import {eventWorld,draw} from './support/event-fixtures.js';
import {readStory} from '../src/runtime/story.js';
import {runtimeOf,restoreWorldState} from '../src/runtime/model.js';
import {projectIssues} from '../src/runtime/issues.js';
import {directedKey} from '../src/world/relationships.js';
const records=Array.from({length:8},(_,i)=>JSON.parse(readFileSync(`work/18b-t01-0${i+1}-authoring.json`)).records).flat();
const catalogue=t01DraftCatalogue();
const definition=id=>catalogue.definitions.find(d=>d.id==='content:18b-t01-'+id);

test('T01 whole-batch story, candidate, immutable reference and isolation contracts',()=>{
 const ids=new Set();validateEventDefinitions(catalogue.definitions);
 assert.equal(T01_DRAFT_STORIES.length,records.length);
 for(const record of records){
  const s=record.story;assert.ok(!ids.has(s.definitionId));ids.add(s.definitionId);
  assert.equal(s.status,'engineering-test');validateStory(s);
  assert.deepEqual(resolveStory(record.definition.content),s);validateStoryReference(record.definition);
  assert.deepEqual(definition(s.definitionId.replace('content:18b-t01-','')),record.definition);
  for(const stage of s.stages){assert.equal(stage.choices.length,4);assert.ok(stage.choices.filter(c=>c.emotional).length>=1);}
 }
 // Count semantic review independently; same-model subagent assessments never set approved.
 const report=auditContent(records,{catalogueDefinitions:catalogue.definitions});
 assert.equal(report.structurallyValid,records.length);assert.equal(report.semanticReviewed,0);
 assert.equal(report.resolverReady,records.length);assert.equal(report.catalogueReady,records.length);
});

function begin(definitions){
 let w=eventWorld(1,'2026-09-01','early');
 w=apply(w,[draw(definitions)]);
 const selected=runtimeOf(w).history.findLast(h=>h.type==='event-selection').data.selected[0];
 assert.ok(selected,'bounded fixed seed selects a legal T01 event');
 for(let i=0;i<16&&w.position.slotId!==selected.slotId;i++)w=advanceDemo(w);
 assert.equal(w.position.slotId,selected.slotId);w=apply(w,[{type:'admit-event',eventId:selected.eventId}]);
 return {w,eventId:selected.eventId};
}
function lastPage(w,eventId){for(let i=0;i<8&&readStory(w,eventId).canNext;i++)w=apply(w,[storyAction(eventId,'next')]);assert.equal(readStory(w,eventId).canNext,false);return w;}
function confirm(w,eventId,option){w=lastPage(w,eventId);w=apply(w,[storyAction(eventId,'select',option)]);return apply(w,[storyAction(eventId,'confirm')]);}

test('runtime group 1: same receipt root across days/topics, weighted evidence and save',()=>{
 let {w,eventId}=begin([definition('03-28')]);
 assert.equal(buildEventCandidates(w,[definition('04-31')],{engineering:true}).candidates.length,0,'no root cannot invent a cross-topic continuation');
 w=confirm(w,eventId,'refer');let issues=projectIssues(w);assert.equal(issues.length,1);assert.equal(issues[0].state,'open');
 const root=issues[0].id;
 const bound=buildEventCandidates(w,[definition('04-31')],{engineering:true}).candidates;
 assert.ok(bound.some(c=>c.issueOptions.some(b=>b.issueId===root)),'cross-topic candidates bind the actual known root');
 assert.deepEqual(projectIssues(restoreWorldState(JSON.stringify(w))),issues);
 w=apply(w,[storyAction(eventId,'finish')]);
 for(let i=0;i<40&&!readStory(w,eventId).canResume;i++)w=advanceDemo(w);
 assert.ok(readStory(w,eventId).canResume);w=apply(w,[storyAction(eventId,'resume')]);
 w=confirm(w,eventId,'check-receipt');
 const fact=runtimeOf(w).facts.findLast(f=>f.eventId===eventId&&f.data.type==='story-action');
 assert.ok(['documented','pending'].includes(fact.data.variantId));
 issues=projectIssues(w);assert.equal(issues[0].id,root);assert.equal(issues[0].state,fact.data.variantId==='documented'?'closed':'open');
 assert.deepEqual(restoreWorldState(JSON.stringify(w)),w);
 const after=buildEventCandidates(w,[definition('04-31')],{engineering:true}).candidates;
 assert.equal(after.some(c=>c.issueOptions.some(b=>b.issueId===root)),fact.data.variantId==='pending');
});

test('runtime group 2: private claim transmission, directional relationship and save',()=>{
 let {w,eventId}=begin([definition('01-14')]);
 const student=w.events.find(e=>e.id===eventId).participantIds[0],teacher=w.identity.playerId;
 w=confirm(w,eventId,'care');
 const r=runtimeOf(w),fact=r.facts.findLast(f=>f.eventId===eventId&&f.data.type==='story-action');
 const claim=r.claims.find(c=>c.factId===fact.id);
 assert.ok(claim,'authored subjective feeling becomes a sourced claim');
 assert.ok(r.knowledge.some(k=>k.actorId===teacher&&k.claimId===claim.id));
 const other=w.numeric.evolution.world.classroom.studentIds.find(id=>id!==student);
 assert.ok(!r.knowledge.some(k=>k.actorId===other&&k.claimId===claim.id));
 const effects=r.history.filter(h=>h.type==='effect').flatMap(h=>h.data.changes);
 assert.ok(effects.some(e=>e.target.id===directedKey(student,teacher)&&e.code==='5-1'));
 assert.ok(!effects.some(e=>e.target.id===directedKey(teacher,student)&&e.code==='5-1'));
 assert.deepEqual(restoreWorldState(JSON.stringify(w)),w);
});

test('runtime group 3: full isolated catalogue registration/draw/admission/save; release remains closed',()=>{
 let w=eventWorld(1,'2026-09-01','early');
 assert.equal(buildEventCandidates(w,catalogue.definitions,{engineering:false}).candidates.length,0,'unreviewed content cannot enter a formal draw');
 const built=buildEventCandidates(w,catalogue.definitions,{engineering:true});
 const expected=catalogue.definitions.filter(d=>!d.eligibility.issue).map(d=>d.id);
 assert.deepEqual([...new Set(built.candidates.map(c=>c.definitionId))].sort(),expected.sort(),'every direct draft qualifies; issue continuation correctly waits for a root');
 w=apply(w,[catalogue]);w=restoreWorldState(JSON.stringify(w));
 w=apply(w,[{type:'draw-events',catalogueId:catalogue.catalogueId}]);
 const selected=runtimeOf(w).history.findLast(h=>h.type==='event-selection').data.selected[0];assert.ok(selected);
 for(let i=0;i<16&&w.position.slotId!==selected.slotId;i++)w=advanceDemo(w);
 w=apply(w,[{type:'admit-event',eventId:selected.eventId}]);
 assert.ok(readStory(w,selected.eventId));assert.deepEqual(restoreWorldState(JSON.stringify(w)),w);
});


// Focused story examples: editorial hashes are not approval evidence.
test('T01 eight editorial exemplars retain distinct tactics and real follow-up boundaries',()=>{
 const exemplars=['01-22','02-09','03-01','04-01','05-01','06-03','07-02','08-07'];
 for(const id of exemplars){
  const s=records.find(r=>r.story.resourceId==='content:18b-t01-'+id)?.story;
  assert.ok(s,'missing exemplar '+id);validateStory(s);
  const entry=s.stages[0];assert.equal(entry.pages.length,3,'story includes a third context page');
  assert.equal(entry.choices.length,4);assert.equal(new Set(entry.choices.map(c=>c.text)).size,4);
  assert.equal(new Set(entry.choices.map(c=>c.outcome.fact)).size,4,'choices must cause distinguishable recorded facts');
  assert.ok(entry.choices.every(c=>c.outcome.world),'every action has an explicit knowledge boundary');
  assert.equal(s.status,'engineering-test');
  const d=definition(id);assert.ok(d.eligibility.slotIds.length>=1);
  // Opening language is checked semantically rather than by first word.
  assert.ok(s.stages[0].pages[0].text.length>8,'opening has context '+id);
 }
 for(const id of ['01-22','03-01']){
  const s=records.find(r=>r.story.resourceId==='content:18b-t01-'+id).story;
  assert.equal(s.stages.length,2);assert.equal(s.stages[1].choices.length,4);
  assert.ok(s.stages[0].choices.some(c=>c.outcome.next.stage==='next-contact'&&c.outcome.next.afterDays===1));
 }
});


test('T01 new representative next-day contacts resume without pre-claiming resolution',()=>{
 for(const [id,option] of [['01-22','observe'],['03-01','refer']]){
  let {w,eventId}=begin([definition(id)]);
  w=confirm(w,eventId,option);
  const selected=runtimeOf(w).facts.findLast(f=>f.eventId===eventId&&f.data.type==='story-action');
  assert.ok(selected,'selected event must record its actual fact');
  w=apply(w,[storyAction(eventId,'finish')]);
  for(let i=0;i<40&&!readStory(w,eventId).canResume;i++)w=advanceDemo(w);
  assert.ok(readStory(w,eventId).canResume,'next-day story should be resumable '+id);
  w=apply(w,[storyAction(eventId,'resume')]);
  w=confirm(w,eventId,'follow-1');
  assert.deepEqual(restoreWorldState(JSON.stringify(w)),w);
 }
});
