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
 assert.equal(report.byTopic['T01-01'].remainingToMinimum,19);
 assert.equal(report.byTopic['T10-04'].remainingToMinimum,19);
 assert.equal(report.byTopic['T14-01'].remainingToMinimum,19);
 assert.equal(report.byTopic['T01-02'].remainingToMinimum,20);
 assert.equal(report.maximumPerTopic,null,'20 is a floor not a production ceiling');
 assert.equal(report.duplicates.length,0);
});

test('18-A: catches malformed options, nonexistent topics and mismatched reference without altering world state',()=>{
 const invalid=row(0);
 invalid.story.stages[0].choices.pop();
 invalid.story.topicId='T99-01';
 invalid.definition.content.version='out-of-sync';
 const report=auditContent([invalid]);
 assert.equal(report.structurallyValid,0);
 assert.match(report.items[0].errors.join(' / '),/CONTENT_CHOICE|CHOICE|four/i);
 assert.match(report.items[0].errors.join(' / '),/128 T-coded/);
 assert.match(report.items[0].errors.join(' / '),/identities/);
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
 assert.equal(report.byTopic['T01-01'].remainingToMinimum,0);
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
