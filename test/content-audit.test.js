import test from 'node:test';
import assert from 'node:assert/strict';
import {auditContent} from '../scripts/content-audit.js';
import {PHASE17D_READY_STORIES,phase17dSampleCatalogue,DEMO_STORY} from '../src/runtime/story-content.js';
import {buildEventCandidates,validateEventDefinitions,eventIndex,numericSources} from '../src/runtime/event-candidates.js';
import {eventWorld} from './support/event-fixtures.js';
import {beginDemo,apply,storyAction,advanceDemo} from './support/story-scenario.js';
import {readStory,storyState,availableStoryChoices} from '../src/runtime/story.js';
import {targetRecord} from '../src/changes/targets.js';
import {PILOT_18B_T10_03_RECORDS} from './fixtures/18b-t10-03-pilot.js';
import {runtimeOf,restoreWorldState} from '../src/runtime/model.js';

const catalogue=phase17dSampleCatalogue();
const row=(i=0)=>({
 story:structuredClone(PHASE17D_READY_STORIES[i]),
 definition:structuredClone(catalogue.definitions[i])
});
const edited=(r,metadata={})=>({...r,editorial:{
 cause:'學生提供新的學習時間表而且指出執行上的落差',
 teacherResponsibility:'導師與學生釐清可執行的小目標，不代替學生做決定',
 knowledgeSource:'學生當面出示時間表，完成與否尚待追蹤',
 distinctiveConsequence:'約定隔日再檢查真實執行狀況',
 ...metadata
},editorialReview:{verdict:'approved',reviewer:'AI editorial review - independent pass',
 rationale:'已依照客觀起因、教師權限及不同後果逐項檢視，並留待跨主題重複性巡查'}});

test('18-A: authoritative 17-D pilots validate without claiming auto-published campaigns or automatic semantic approval',()=>{
 const records=[row(0),row(1),row(2)];
 const report=auditContent(records,{catalogueDefinitions:catalogue.definitions});
 assert.equal(report.topics,128);
 assert.equal(report.authored,3);
 assert.equal(report.structurallyValid,3);
 assert.equal(report.resolverReady,3);
 assert.equal(report.catalogueReady,3);
 assert.equal(report.semanticReviewed,0);
 assert.equal(report.publishedInNewCareers,'not-assessed');
 assert.equal(report.byTopic['T01-01'].remainingDraftToMinimum,19);
 assert.equal(report.byTopic['T01-01'].remainingToMinimum,20,'unreviewed drafts cannot be counted as completed');
 assert.equal(report.byTopic['T10-04'].remainingDraftToMinimum,19);
 assert.equal(report.byTopic['T14-01'].remainingDraftToMinimum,19);
 assert.equal(report.byTopic['T01-02'].remainingToMinimum,20);
 assert.equal(report.maximumPerTopic,null,'20 is a floor not a production ceiling');
 assert.equal(report.duplicates.length,0);
});

test('18-A: catches malformed options, nonexistent topics and mismatched reference without altering world state',()=>{
 const noFourth=row(0);noFourth.story.stages[0].choices.pop();
 const unknownTopic=row(1);unknownTopic.story.topicId='T99-01';
 const wrongVersion=row(2);wrongVersion.definition.content.version='out-of-sync';
 const report=auditContent([noFourth,unknownTopic,wrongVersion]);
 assert.equal(report.structurallyValid,0);
 assert.match(report.items[0].errors.join(' / '),/CONTENT_CHOICE|CHOICE|four/i);
 assert.match(report.items[1].errors.join(' / '),/128 T-coded/);
 assert.match(report.items[2].errors.join(' / '),/identities/);
});

test('18-A: detects duplicate identities and exact or strong causal premise similarity, never silently deletes',()=>{
 const a=row(0),b=row(0);
 b.story.resourceId='content:another-event';b.story.definitionId='content:another-event';
 b.definition.id=b.story.definitionId;b.definition.content.resourceId=b.story.resourceId;
 const r=auditContent([a,b]);
 assert.equal(r.structurallyValid,2);
 assert.equal(r.duplicates.length,1);
 assert.equal(r.duplicates[0].reason,'identical-objective-cause');
 assert.equal(r.duplicates[0].action,'semantic-review-not-auto-delete');
 const duplicates=auditContent([a,a]);
 assert.ok(duplicates.items[1].errors.some(e=>e.includes('duplicate immutable identity')));
});

test('18-A: event + same choice can have multiple weighted outcomes without being mistaken for duplicated stories',()=>{
 const record=edited(row(0));
 const r=auditContent([record]);
 assert.equal(r.structurallyValid,1);
 assert.equal(r.semanticReviewed,1);
 assert.equal(r.duplicates.length,0);
 assert.ok(!r.items[0].warnings.some(x=>x.includes('identical actual consequences')));
 const variant=record.story.stages[0].choices[0];
 assert.equal(variant.variants.length,2);
 assert.notEqual(variant.variants[0].outcome.fact,variant.variants[1].outcome.fact);
 assert.ok(variant.variants.every(x=>x.weight>0));
 const identical=row(0);
 identical.story.stages[0].choices[0].variants[1].outcome=structuredClone(identical.story.stages[0].choices[0].variants[0].outcome);
 const flagged=auditContent([identical]);
 assert.equal(flagged.structurallyValid,1);
 assert.ok(flagged.items[0].warnings.some(x=>x.includes('identical actual consequences')));
});

test('18-A: 20 events is only the minimum; 21+ events have no enforced upper cap',()=>{
 const many=Array.from({length:21},(_,i)=>{
  const r=row(0);
  r.story.resourceId='content:bulk-'+i;
  r.story.definitionId=r.story.resourceId;
  r.definition.id=r.story.definitionId;
  r.definition.content.resourceId=r.story.resourceId;
  r.story.premise.description='不同主題練習記錄'+i;
  return r;
 });
 const report=auditContent(many);
 assert.equal(report.structurallyValid,21);
 assert.equal(report.byTopic['T01-01'].authored,21);
 assert.equal(report.byTopic['T01-01'].remainingDraftToMinimum,0);
 assert.equal(report.byTopic['T01-01'].remainingValidatedToMinimum,0);
 assert.equal(report.byTopic['T01-01'].remainingReviewedToMinimum,20,'21 drafts without review are not a completed topic');
 assert.equal(report.maximumPerTopic,null);
 assert.equal(report.resolverReady,0,'new story must be explicitly wired to the immutable asset resolver');
});

test('18-A: editorial label alone cannot certify the content without written evidence',()=>{
 const plain=row(0);
 const withReview=edited(row(0));
 withReview.editorialReview.rationale='好';
 assert.equal(auditContent([plain]).semanticReviewed,0);
 assert.equal(auditContent([withReview]).semanticReviewed,0);
 withReview.editorialReview.rationale='劇情起因、權責、不同選項後果、非換皮理由皆已分項核對，供後續跨批再審查';
 assert.equal(auditContent([withReview]).semanticReviewed,1);
});


test('18-B: comparison with previous batches flags cross-batch duplicate without counting baseline',()=>{
 const previous=row(0);
 const current=row(0);
 current.story.resourceId='content:new-batch-001';
 current.story.definitionId=current.story.resourceId;
 current.definition.id=current.story.definitionId;
 current.definition.content.resourceId=current.story.resourceId;
 const report=auditContent([current],{referenceRecords:[previous]});
 assert.equal(report.authored,1);
 assert.equal(report.referenceRecordsCompared,1);
 assert.equal(report.byTopic['T01-01'].authored,1);
 assert.equal(report.duplicates.length,1);
 assert.deepEqual(report.duplicates[0].ids,[previous.story.resourceId,current.story.resourceId]);
 assert.ok(report.items[0].warnings.some(x=>x.includes('similarity')));
 const unchanged=auditContent([current],{referenceRecords:[]});
 assert.equal(unchanged.duplicates.length,0);
});
test('18-B: old-old similarities are excluded from this batch report',()=>{
 const previous=row(0),other=row(0),current=row(1);
 other.story.resourceId='content:prior-other';other.story.definitionId=other.story.resourceId;
 other.definition.id=other.story.definitionId;other.definition.content.resourceId=other.story.resourceId;
 const report=auditContent([current],{referenceRecords:[previous,other]});
 assert.equal(report.duplicates.length,0);
 assert.equal(report.referenceRecordsCompared,2);
});

test('18-B pilot: 20 isolated T10-03 event definitions satisfy formal contracts without publishing',async()=>{
 const {PILOT_18B_T10_03_RECORDS:records}=await import('./fixtures/18b-t10-03-pilot.js');
 assert.equal(records.length,20);
 const slots=records.map(r=>r.definition.eligibility.slotIds[0]);
 assert.equal(slots.length,20);
 assert.ok(records.every(r=>r.definition.eligibility.dayKinds.length===1&&r.definition.eligibility.dayKinds[0]==='school'),'do not assume summer or winter camp cleaning/meal routines');
 assert.deepEqual([slots[2],slots[6],slots[10],slots[12],slots[18]],['lunch','early','noon','noon','lunch'],'meal/pre-class/rest slots must match situation');
 assert.ok(slots.every(x=>['lunch','early','noon'].includes(x)));

 assert.equal(new Set(records.map(x=>x.editorial.cause)).size,20);
 assert.match(records[0].story.premise.description,/無法確認/,'do not assert an unverified swapped label');
 assert.match(records[14].story.premise.description,/還沒確認內容/,'receipt identity must remain unknown at discovery');
 assert.doesNotMatch(records[9].story.premise.description,/誤拿/,'do not assert neighbouring class was at fault');
 assert.ok(records.every(x=>x.story.status==='engineering-test'&&x.story.resourceId.startsWith('engineering:')));
 assert.ok(records.every(x=>x.story.stages[0].choices.length===4));
 assert.ok(records.every(x=>x.story.stages[0].choices.some(o=>o.emotional)));
 assert.equal(records.filter(x=>x.story.stages[0].choices.some(c=>c.variants?.length===2)).length,14,'multi-result belongs only where uncertainty is plausible');
 assert.equal(records.filter(x=>!x.story.stages[0].choices.some(c=>c.variants)).length,6,'simple daily stories need not invent a weighted result');
 assert.ok(records.some(x=>x.story.stages[0].choices[1].variants?.length===2),'uncertain outcomes are not always attached to the first option');
 assert.ok(records.some(x=>x.story.stages[0].choices[0].emotional)&&records.some(x=>x.story.stages[0].choices[3].emotional),'emotional approach is not hard-coded to the fourth slot');
 for(const index of [4,16,19]){
  const pages=records[index].story.stages[0].pages;
  assert.ok(pages.some(p=>p.text.includes(index===4?'不要求試吃':index===16?'暫停食用與交換餐點':'移離公開張貼處')),'food/privacy safeguard must precede the four choices');
 }
 for(const index of [2,4,5,9,16,19]){
  const choices=records[index].story.stages[0].choices;
  assert.equal(choices.length,4);
  assert.equal(new Set(choices.map(c=>c.text)).size,4,'each repaired event needs four distinct authored options');
  assert.equal(new Set(choices.map(c=>c.outcome.fact)).size,4,'repaired options must have distinct authored consequences');
 }
 assert.ok(records[19].story.stages[1].pages.some(p=>p.text.includes('交接草稿')),'next day followup cannot assume the first note was kept public');
 for(const index of [7,15,18]){
  const pages=records[index].story.stages[0].pages;
  assert.ok(pages.some(p=>p.text.includes(index===7?'停止靠近積水區':index===15?'停止這區的清潔劑使用':'制止比賽吃飯')),'mandatory safety response must precede every choice');
 }
 for(const [index,prohibited] of [[6,'昨天排的順序'],[10,'昨天有試拉一半'],[12,'先問過本人'],[19,'我把名字拿掉了']]){
  assert.ok(records[index].story.stages[1].pages.every(p=>!p.text.includes(prohibited)),'followup cannot presume a prior option happened');
 }
 assert.equal(records.filter(x=>x.story.stages.length>1).length,5,'meaningful subset has next-day consequences');
 assert.equal(records[2].story.stages.length,3,'T10-03-03 has one conditional and one neutral next-day stage');
 const canteen=records[2].story.stages[0].choices;
 assert.equal(canteen.filter(c=>c.outcome.next.stage==='followup-canteen').length,1);
 assert.ok(canteen.some(c=>c.outcome.next.stage==='followup-canteen'&&c.text.includes('補餐方案')));
 assert.ok(canteen.filter(c=>c.outcome.next.stage==='followup').length===3);
 assert.match(records[2].story.stages.find(s=>s.id==='followup-canteen').pages[0].text,/昨天請餐務窗口查詢/);
 assert.ok(records[12].story.stages[0].choices.some(c=>c.replacement?.requires?.some(x=>x.role==='participant'&&x.code==='1-3')));

 assert.equal(records.filter(x=>x.story.stages[0].choices.length===4 && x.story.stages[0].choices.some(c=>c.replacement)).length,5,'qualified replacements exist');
 assert.ok(new Set(records.map(x=>x.story.stages[0].pages[0].scene)).size>=3,'not every situation occurs in one location');
 assert.ok(records.some(x=>x.story.stages[0].choices.some(c=>c.outcome.changes.length)),'not all choices are text-only');
 assert.ok(records.every(x=>x.story.stages.every(s=>s.choices.length===4)));
 assert.ok(records.filter(x=>x.story.stages.length>1).every(x=>x.story.stages[0].choices.every(c=>[c,...(c.replacement?[c.replacement]:[])].every(o=>
   [o.outcome,...(o.variants??[]).map(v=>v.outcome)].every(r=>x.story.stages.some(stage=>stage.id===r.next.stage)&&r.next.afterDays===1)))));
 assert.ok(records.filter(x=>x.story.stages[0].choices.some(c=>c.variants)).every(x=>x.story.stages[0].choices.find(c=>c.variants).variants[0].modifiers?.length===1));
 const report=auditContent(records);
 assert.equal(report.structurallyValid,20,JSON.stringify(report.items.filter(x=>x.errors.length)));
 assert.equal(report.authored,20);
 assert.equal(report.items.length,20,'each trial story receives an independent structural result');
 assert.equal(report.semanticReviewed,0,'independent editorial review has not been performed');
 assert.equal(report.byTopic['T10-03'].authored,20);
 assert.equal(report.resolverReady,0,'engineering pilot remains outside official resolver');
 assert.equal(report.catalogueReady,0);
 assert.equal(report.publishedInNewCareers,'not-assessed');
 assert.equal(report.duplicates.length,0,'inspect meaningful duplicates separately');
});


/** 18-B causal authority tests: existing runtime engine, no official T10-03 registration.
 * Separate engine capability proofs from editorial quality of the 20 trial stories.
 */
const reachChoice=(world,eventId)=>{
 let w=world;
 while(readStory(w,eventId).canNext)w=apply(w,[storyAction(eventId,'next')]);
 return w;
};
const choose=(world,eventId,optionId)=>apply(
 apply(world,[storyAction(eventId,'select',optionId)]),
 [storyAction(eventId,'confirm')]
);

test('18-B causal witness A: existing participant numeric state changes legal candidate eligibility',()=>{
 const world=eventWorld(74);
 const d=structuredClone(phase17dSampleCatalogue().definitions.find(x=>x.topicId==='T01-01'));
 d.eligibility.dayKinds=[];d.eligibility.slotIds=[];
 const base=buildEventCandidates(world,[d]).candidates;
 const people=[...new Set(base.map(c=>c.participantIds[0]))];
 assert.ok(people.length>=2,'need at least two real eligible students');
 const numbers=people.map(id=>({id,value:numericSources(world,id,['participant'],['1-3'])[0]})).sort((a,b)=>a.value-b.value);
 const min=numbers[0],max=numbers.at(-1);
 assert.ok(max.value>min.value,'need different actual student numeric inputs');
 const threshold=(min.value+max.value)/2;
 d.eligibility.numeric=[{source:'participant',code:'1-3',min:threshold,max:100}];
 assert.doesNotThrow(()=>validateEventDefinitions([d]));
 const filtered=buildEventCandidates(world,[d]);
 assert.ok(filtered.candidates.some(c=>c.participantIds[0]===max.id),'higher participant score should meet threshold');
 assert.ok(!filtered.candidates.some(c=>c.participantIds[0]===min.id),'lower participant score must not meet threshold');
 assert.ok(filtered.rejected.some(c=>JSON.parse(c.key)[1].includes(min.id)&&c.reason==='numeric-condition'),'actual engine should report numeric-condition');
});

test('18-B causal witness B: persisted H03-1 event history unlocks cumulative candidate for the same student',()=>{
 const {world:initial,eventId}=beginDemo(1,DEMO_STORY);
 const person=runtimeOf(initial).history.find(h=>h.type==='event-selection').data.selected[0].participantIds[0];
 const d=structuredClone(phase17dSampleCatalogue().definitions.find(x=>x.topicId==='T10-04'));
 d.type='cumulative';d.eligibility.dayKinds=[];d.eligibility.slotIds=[];
 d.eligibility.history=[{code:'H03-1',minimum:1,status:'any'}];
 assert.doesNotThrow(()=>validateEventDefinitions([d]));
 const before=buildEventCandidates(initial,[d]);
 assert.ok(!before.candidates.some(c=>c.participantIds[0]===person));
 assert.ok(before.rejected.some(c=>JSON.parse(c.key)[1].includes(person)&&c.reason==='history-threshold'));
 const chosen=choose(reachChoice(initial,eventId),eventId,'listen');
 const afterFact=runtimeOf(chosen).facts.find(f=>f.categoryCodes?.includes('H03-1')&&f.subjectIds?.includes(person));
 assert.ok(afterFact,'the confirmed first-day outcome must be stored as participant-scoped H03-1');
 const after=buildEventCandidates(chosen,[d]);
 assert.ok(after.candidates.some(c=>c.participantIds[0]===person),'real runtime history index should admit the same student');
 const restored=restoreWorldState(JSON.stringify(chosen));
 assert.ok(buildEventCandidates(restored,[d]).candidates.some(c=>c.participantIds[0]===person),'qualification must survive save/load');
});

test('18-B causal witness C: different actual first-day choices produce different resumed second-day stages',()=>{
 const outcomes=[];
 for(const firstChoice of ['listen','angry']){
  const {world:initial,eventId}=beginDemo(1,DEMO_STORY);
  let w=choose(reachChoice(initial,eventId),eventId,firstChoice);
  const firstFact=runtimeOf(w).facts.findLast(f=>f.data?.type==='story-action');
  assert.ok(firstFact);
  w=apply(w,[storyAction(eventId,'finish')]);
  const restored=restoreWorldState(JSON.stringify(w));
  assert.deepEqual(readStory(w,eventId),readStory(restored,eventId));
  w=restored;
  let steps=0;
  while(!readStory(w,eventId).canResume&&steps++<25)w=advanceDemo(w);
  assert.ok(readStory(w,eventId).canResume);
  w=apply(w,[storyAction(eventId,'resume')]);
  const secondDay=readStory(w,eventId);
  outcomes.push({firstChoice,stage:storyState(w,eventId).stage,page:secondDay.page.text});
  w=choose(reachChoice(w,eventId),eventId,'plan');
  const lastFact=runtimeOf(w).facts.findLast(f=>f.data?.type==='story-action');
  assert.ok(lastFact.causeIds.includes(firstFact.id),'second-day consequence links back to first-day result');
 }
 assert.notEqual(outcomes[0].stage,outcomes[1].stage,'first-day options cause different resumed narrative stages');
 assert.notEqual(outcomes[0].page,outcomes[1].page,'resumed dialogue is genuinely different');
});


test('18-B actual T10-03-13 participant numeric state changes an authored birthday-card option',()=>{
 const story=PILOT_18B_T10_03_RECORDS[12].story;
 const stage=story.stages[0];
 const replacement=stage.choices.find(c=>c.replacement);
 assert.ok(replacement,'birthday card option must have a conditional alternative');
 assert.equal(replacement.replacement.requires[0].role,'participant');
 const source=eventWorld(74);
 const candidates=buildEventCandidates(source,[phase17dSampleCatalogue().definitions[0]]).candidates;
 assert.ok(candidates.length>0);
 const participantId=candidates[0].participantIds[0];
 const event={participantIds:[participantId]};
 const low=structuredClone(source),high=structuredClone(source);
 targetRecord(low.numeric.evolution.world,{kind:'person',id:participantId})['1-3']=40;
 targetRecord(high.numeric.evolution.world,{kind:'person',id:participantId})['1-3']=80;
 const before=availableStoryChoices(low,event,stage);
 const after=availableStoryChoices(high,event,stage);
 assert.equal(before.length,4);assert.equal(after.length,4);
 assert.ok(before.some(c=>c.id===replacement.id),'low state preserves the baseline teacher response');
 assert.ok(!before.some(c=>c.id===replacement.replacement.id));
 assert.ok(after.some(c=>c.id===replacement.replacement.id),'high state unlocks a distinct teacher response');
 assert.ok(!after.some(c=>c.id===replacement.id));
 assert.notEqual(replacement.text,replacement.replacement.text);
 assert.notEqual(replacement.outcome.fact,replacement.replacement.outcome.fact);
});
