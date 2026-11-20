import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,mkdtempSync,writeFileSync,rmSync,mkdirSync} from 'node:fs';
import {join,relative} from 'node:path';
import {spawnSync} from 'node:child_process';
import {manuscriptDigest as sha,stateMatrix,unchangedStory} from '../scripts/story-state-revision.js';
import {validateStoryDraft,seedCodesFromMarkdown,topicIdsFromMarkdown} from '../scripts/story-draft-validator.js';
import {readTopicWindows} from '../scripts/story-production-ledger.js';
import {exportReaderData} from '../scripts/export-story-reader.mjs';
const root=new URL('..',import.meta.url).pathname;
const read=p=>readFileSync(join(root,p),'utf8');
const seeds=seedCodesFromMarkdown(read('docs/事件四數值三層平衡種子2400組.md')),topicsText=read('docs/T1-T6-特定故事20主題與觸發日期.md');
const options={stage:'full',stateRulesVersion:2,seeds,topics:topicIdsFromMarkdown(topicsText),windows:readTopicWindows(topicsText)};
test('isolated CLI same-ID revision guards, historical/current audit and reader latest only',{skip:!JSON.parse(read('data/story-production-ledger.json')).candidates['T-DRAFT-0009']},()=>{
 const current=JSON.parse(read('data/story-production-ledger.json'));
 // A real historical manuscript is used as an immutable byte-level baseline, in an isolated ledger.
 const originalRow=current.candidates['T-DRAFT-0009'].manuscriptVersions?.[0]??current.candidates['T-DRAFT-0009'];
 const row={...current.candidates['T-DRAFT-0009'],...originalRow};
 delete row.manuscriptVersions;delete row.manuscriptVersion;delete row.stateRevision;delete row.stateRulesVersion;
 const temp=mkdtempSync(join(root,'content/events-v1/正式成品/.state-revision-test-'));
 try{
  const p=name=>relative(root,join(temp,name)),put=(name,text)=>writeFileSync(join(temp,name),text);
  const original=read(originalRow.manuscriptPath),oldReview=read(originalRow.review.filePath);
  row.manuscriptPath=p('original.md');row.review={...row.review,filePath:p('original.json')};
  put('original.md',original);put('original.json',oldReview);
  let i=0;const revised=original.replace(/(\*\*玩家四狀態\*\*[^：\n]*：)[^\n]*/g,(_,label)=>label+[[-1,2,1,1],[-1,1,1,1],[-1,-2,-1,-2],[-1,-1,-1,-1],[-1,1,1,1],[-1,-2,-1,-2],[-1,2,2,2],[-1,1,1,1]][i++].join(','));
  const report=validateStoryDraft(revised,options);assert.equal(report.mechanicalPass,true);
  const proof={kind:'teacher-states-v1-to-v2',verdict:'approved',reviewer:'Test isolation',version:2,storyId:row.storyId,originalManuscriptDigest:sha(original),originalReviewDigest:sha(oldReview),manuscriptDigest:sha(revised),before:stateMatrix(original),after:stateMatrix(revised),otherFieldsUnchanged:true,causality:Array.from({length:8},(_,i)=>({result:'R'+(i+1),states:Array(4).fill('隔離測試用合成證據，不作為正式故事審查或核准')})),distributionReview:'隔離測試只驗機制，不宣稱這組合成數值有劇情合理性。',mechanicalReport:report};
  const revisedReview=JSON.stringify({...JSON.parse(oldReview),stateRevision:proof});
  put('v2.md',revised);put('v2.json',revisedReview);
  const ledger={...current,candidates:{[row.draftRef]:row},history:[]};put('ledger.json',JSON.stringify(ledger));
  const bin=join(temp,'bin');mkdirSync(bin);
  const head='a'.repeat(40);
  // Deterministic Git responses isolate CLI remote compare logic from live GitHub.
  writeFileSync(join(bin,'git'),'#!/bin/sh\ncase "$1" in\nrev-parse) echo '+head+';;\nls-remote) echo "'+head+' refs/heads/content/events-production-v1";;\n*) exit 1;;\nesac\n',{mode:0o755});
  const cli=(args,env={})=>spawnSync(process.execPath,['scripts/manage-story-production.mjs',...args,'--state-rules-version','2','--ledger',join(temp,'ledger.json')],{cwd:root,encoding:'utf8',env:{...process.env,PATH:bin+':'+process.env.PATH,...env}});
  const args=['revise-locked','--ref',row.draftRef,'--owner',row.owner,'--file',join(temp,'v2.md'),'--review',join(temp,'v2.json'),'--expect-manuscript-sha',row.manuscriptDigest,'--expect-review-sha',row.review.digest,'--expect-head',head,'--expect-ledger-sha',sha(read(p('ledger.json')))];
  for(const [key,value,message] of [['--expect-head','b'.repeat(40),'HEAD'],['--expect-ledger-sha','0'.repeat(64),'帳本SHA'],['--expect-manuscript-sha','0'.repeat(64),'原SHA']]){
   const bad=[...args];bad[bad.indexOf(key)+1]=value;const result=cli(bad);assert.equal(result.status,1);assert.match(result.stderr,new RegExp(message));
  }
  const preview=cli(args);assert.equal(preview.status,0,preview.stderr);assert.equal(JSON.parse(preview.stdout).applied,false);
  const stale=cli([...args,'--apply','--expect-revision',String(ledger.revision-1)]);assert.equal(stale.status,1);assert.match(stale.stderr,/修訂版/);
  const applied=cli([...args,'--apply','--expect-revision',String(ledger.revision)]);assert.equal(applied.status,0,applied.stderr);
  assert.equal(read(p('original.md')),original);assert.equal(read(p('original.json')),oldReview);
  const audit=cli(['audit']);assert.equal(audit.status,0,audit.stderr+audit.stdout);assert.equal(JSON.parse(audit.stdout).audit.versionsChecked,2);
  put('original.md',original+'x');assert.equal(cli(['audit']).status,1);put('original.md',original);
  put('v2.md',revised+'x');assert.equal(cli(['audit']).status,1);put('v2.md',revised);
  return exportReaderData({ledgerPath:join(temp,'ledger.json'),output:'work/revision-reader-test'}).then(()=>{
   const index=JSON.parse(read('work/revision-reader-test/index.json'));assert.equal(index.count,1);
   const detail=JSON.parse(read('work/revision-reader-test/stories/'+row.storyId+'.json'));
   assert.equal(detail.sourceMarkdown,revised);assert.equal(detail.results[0].playerStates,'-1,2,1,1');
  }).finally(()=>{rmSync(temp,{recursive:true,force:true});rmSync(join(root,'work/revision-reader-test'),{recursive:true,force:true})});
 }catch(error){rmSync(temp,{recursive:true,force:true});throw error;}
});

test('all 30 reviewed stories: 14 V2 revisions, 16 explicit blockers, original bytes and identity preserved',{skip:!JSON.parse(read('data/story-production-ledger.json')).candidates['T-DRAFT-0031']},()=>{
 const ledger=JSON.parse(read('data/story-production-ledger.json'));
 const report=JSON.parse(read('docs/story-production-v1/state-v2-review/results.json'));
 const blockers=JSON.parse(read('docs/story-production-v1/state-v2-review/blocked-stories.json')).stories;
 assert.equal(report.batchStatus,'partial-not-complete');assert.equal(report.stories.length,30);
 assert.equal(report.approved,14);assert.equal(blockers.length,16);assert.equal(ledger.revision,108);
 assert.equal(Object.values(ledger.candidates).filter(r=>r.status==='locked').length,30);
 assert.equal(ledger.candidates['T-DRAFT-0001'].status,'revoked');
 assert.equal(sha(JSON.stringify(ledger.candidates['T-DRAFT-0001'])),report.revokedEntryDigest);
 assert.equal(sha(JSON.stringify(ledger.history.slice(0,report.originalHistoryLength))),report.originalHistoryDigest);
 let approved=0;
 for(const item of report.stories){
  const row=ledger.candidates[item.storyId.replace('T1-','T-DRAFT-0')],old=structuredClone(row);
  if(row.manuscriptVersions?.length){
   const first=row.manuscriptVersions[0];old.manuscriptPath=first.manuscriptPath;old.manuscriptDigest=first.manuscriptDigest;old.review=first.review;
   for(const key of ['stateRulesVersion','manuscriptVersions','manuscriptVersion','stateRevision'])delete old[key];
  }
  assert.equal(sha(JSON.stringify(old)),item.originalEntryDigest);
  for(const key of ['storyId','seedId','date','tags','summary','poolId','topicId','status'])assert.deepEqual(row[key],old[key]);
  const original=read(item.originalManuscriptPath),latest=read(row.manuscriptPath);
  assert.equal(sha(original),old.manuscriptDigest);assert.equal(sha(read(item.originalReviewPath)),old.review.digest);
  assert.equal(sha(latest),row.manuscriptDigest);
  assert.equal(unchangedStory(original,latest),true);
  const full=validateStoryDraft(latest,options);assert.deepEqual(item.mechanicalReport,full);
  if(row.stateRulesVersion===2){
   approved++;assert.equal(full.mechanicalPass,true);
   const review=JSON.parse(read(row.review.filePath));
   const {stateRevision,...preserved}=review;assert.deepEqual(preserved,JSON.parse(read(old.review.filePath)));
   assert.equal(stateRevision.verdict,'approved');assert.deepEqual(stateRevision.after,stateMatrix(latest));
   assert.equal(stateRevision.causality.length,8);assert.equal(row.manuscriptVersions[0].manuscriptDigest,old.manuscriptDigest);
  }else{
   assert.equal(full.mechanicalPass,false);assert.equal(latest,original);assert.deepEqual(row,old);
   const proof=blockers.find(b=>b.storyId===item.storyId);assert.equal(proof.status,'blocked');
   assert.ok(proof.resultReview.filter(r=>r.physicalAssessment.value===0).length>=3);
   assert.equal(proof.resultReview.length,8);assert.ok(proof.resultReview.every(r=>r.after===null));
  }
 }
 assert.equal(approved,14);
});
