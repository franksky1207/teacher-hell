import test from 'node:test';
import assert from 'node:assert/strict';
import {auditContent} from '../scripts/content-audit.js';
import {PHASE17D_READY_STORIES,phase17dSampleCatalogue} from '../src/runtime/story-content.js';

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
 assert.equal(new Set(records.map(x=>x.editorial.cause)).size,20);
 assert.ok(records.every(x=>x.story.status==='engineering-test'&&x.story.resourceId.startsWith('engineering:')));
 assert.ok(records.every(x=>x.story.stages[0].choices.length===4));
 assert.ok(records.every(x=>x.story.stages[0].choices.some(o=>o.emotional)));
 assert.ok(records.every(x=>x.story.stages[0].choices.filter(c=>c.variants?.length===2).length===1));
 assert.ok(records.some(x=>x.story.stages[0].choices[1].variants?.length===2),'uncertain outcomes are not always attached to the first option');
 assert.equal(records.filter(x=>x.story.stages.length===2).length,5,'meaningful subset has next-day consequences');
 assert.equal(records.filter(x=>x.story.stages[0].choices.length===4 && x.story.stages[0].choices.some(c=>c.replacement)).length,5,'qualified replacements exist');
 assert.ok(new Set(records.map(x=>x.story.stages[0].pages[0].scene)).size>=3,'not every situation occurs in one location');
 assert.ok(records.some(x=>x.story.stages[0].choices.some(c=>c.outcome.changes.length)),'not all choices are text-only');
 assert.ok(records.every(x=>x.story.stages.every(s=>s.choices.length===4)));
 assert.ok(records.filter(x=>x.story.stages.length===2).every(x=>x.story.stages[0].choices.every(c=>[c,...(c.replacement?[c.replacement]:[])].every(o=>
   [o.outcome,...(o.variants??[]).map(v=>v.outcome)].every(r=>r.next.stage==='followup'&&r.next.afterDays===1)))));
 assert.ok(records.every(x=>x.story.stages[0].choices.find(c=>c.variants).variants[0].modifiers?.length===1));
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
