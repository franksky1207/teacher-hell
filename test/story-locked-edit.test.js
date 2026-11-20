import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {seedCodesFromMarkdown,topicIdsFromMarkdown,validateStoryDraft} from '../scripts/story-draft-validator.js';
import {readTopicWindows,changeProductionLedger,ledgerProgress,validateLedger} from '../scripts/story-production-ledger.js';

const load=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const digest=s=>createHash('sha256').update(s).digest('hex');
const seeds=seedCodesFromMarkdown(load('docs/事件四數值三層平衡種子2400組.md'));
const topicSource=load('docs/T1-T6-特定故事20主題與觸發日期.md');
const topics=topicIdsFromMarkdown(topicSource),windows=readTopicWindows(topicSource);
const validateDraft=(s,stage)=>validateStoryDraft(s,{stage,stateRulesVersion:3,seeds,topics,windows});
const base=JSON.parse(load('data/story-production-ledger.json'));
const item=base.candidates['T-DRAFT-0001'];
if(!item||item.status!=='locked')throw Error('缺少正式T1-001測試基準');
const originalMarkdown=load(item.manuscriptPath),originalReviewText=load(item.review.filePath);
const revised=originalMarkdown.replace(/^# ([^\n]+)$/m,(_full,title)=>'# '+title+'（隔離修訂驗收示意）');
if(revised===originalMarkdown)throw Error('隔離修訂測試用文字不存在');
const review=JSON.parse(originalReviewText);
review.eightResults+=' 本次已核對文字修訂對八結果、四狀態和矩陣因果的影響。';
const reviewText=JSON.stringify(review,null,2)+'\n';
const input={
 action:'edit-locked',ref:item.draftRef,owner:item.owner,reason:'修正一處結果文字並完成因果複查',
 markdown:revised,review,reviewText,
 originalMarkdown,originalReviewText,hash:digest,
 manuscriptPath:item.manuscriptPath,manuscriptDigest:digest(revised),
 reviewFile:item.review.filePath,reviewDigest:digest(reviewText),
 expectedManuscriptDigest:item.manuscriptDigest,expectedReviewDigest:item.review.digest,
 sourceCommit:'a'.repeat(40)
};
const act=(request=input)=>changeProductionLedger(base,request,{seeds,windows,validateDraft});
test('locked story allows in-place content update with fixed identity/seed/number of stories',()=>{
 const result=act(),before=ledgerProgress(base,{seeds,windows}),after=ledgerProgress(result.ledger,{seeds,windows});
 const next=result.ledger.candidates[item.draftRef];
 assert.equal(next.storyId,item.storyId);
 assert.equal(next.seedId,item.seedId);
 assert.equal(next.poolId,item.poolId);
 assert.equal(next.topicId,item.topicId);
 assert.equal(next.date,item.date);
 assert.equal(next.status,'locked');
 assert.equal(next.manuscriptPath,item.manuscriptPath);
 assert.equal(next.review.filePath,item.review.filePath);
 assert.equal(next.contentVersion,(item.contentVersion??1)+1);
 assert.equal(next.contentHistory.length,(item.contentHistory?.length??0)+1);
 assert.equal(next.contentHistory.at(-1).manuscriptDigest,item.manuscriptDigest);
 assert.equal(after.locked.total,before.locked.total);
 assert.equal(after.seedStatus.unused,before.seedStatus.unused);
 assert.equal(after.revision,base.revision+1);
 assert.deepEqual(validateLedger(result.ledger,{seeds,windows}).T,12);
});
test('rejects outdated source SHA and changes of protected identity or seed',()=>{
 assert.throws(()=>act({...input,expectedManuscriptDigest:'0'.repeat(64)}),/SHA/);
 const changedSeed=revised.replace('- **種子ID**：'+item.seedId,'- **種子ID**：S0001');
 assert.throws(()=>act({...input,markdown:changedSeed,manuscriptDigest:digest(changedSeed)}),/識別|種子/);
 assert.throws(()=>act({...input,manuscriptPath:'content/other.md'}),/路徑/);
});
test('rejects invalid review or failed full validation',()=>{
 assert.throws(()=>act({...input,review:{...review,verdict:'pending'}}),/核准/);
 const broken=revised.replace('### R8｜','### R9｜');
 assert.throws(()=>act({...input,markdown:broken,manuscriptDigest:digest(broken)}),/full|完整稿|八結果/);
});
