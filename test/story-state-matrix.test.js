import test from 'node:test';
import assert from 'node:assert/strict';
import {generateStateMatrix,validateStateMatrix,STATE_NAMES} from '../scripts/story-state-matrix.mjs';
import {STATE_GROUPS,validateStoryDraft,seedCodesFromMarkdown,topicIdsFromMarkdown} from '../scripts/story-draft-validator.js';
import {readTopicWindows} from '../scripts/story-production-ledger.js';
import {readFileSync} from 'node:fs';

const text=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('numeric-first generator emits four unique A-E columns with exact totals and legal zero rows',()=>{
 for(let i=0;i<200;i++){
  const matrix=generateStateMatrix();
  assert.deepEqual(matrix.stateNames,STATE_NAMES);
  assert.equal(new Set(matrix.groups).size,4);
  const rows=matrix.rows.map(r=>r.values);
  assert.equal(rows.length,8);
  assert.equal(validateStateMatrix({groups:matrix.groups,rows}).pass,true);
  for(let c=0;c<4;c++){
   assert.deepEqual(rows.map(r=>r[c]).sort((a,b)=>a-b),[...STATE_GROUPS[matrix.groups[c]]].sort((a,b)=>a-b));
   assert.equal(rows.reduce((s,row)=>s+row[c],0),-4);
  }
  assert.ok(rows.every(row=>row.filter(v=>v===0).length<=2));
 }
});
test('generator checker rejects duplicate groups, incorrect columns and three zeroes in an R',()=>{
 const sample=generateStateMatrix();
 const rows=sample.rows.map(r=>r.values);
 assert.equal(validateStateMatrix({groups:[sample.groups[0],sample.groups[0],sample.groups[2],sample.groups[3]],rows}).pass,false);
 const incorrect=rows.map(r=>[...r]);incorrect[0][0]=10;
 assert.equal(validateStateMatrix({groups:sample.groups,rows:incorrect}).pass,false);
 const crafted=[...rows.map(r=>[...r])];crafted[0]=[0,0,0,1];
 assert.equal(validateStateMatrix({groups:sample.groups,rows:crafted}).pass,false);
});
test('existing 12 locked V3 story manuscripts already use four distinct groups',()=>{
 const ledger=JSON.parse(text('data/story-production-ledger.json'));
 const records=Object.values(ledger.candidates).filter(r=>r.status==='locked' && /^T1-0(?:0[1-9]|1[0-2])$/.test(r.storyId));
 assert.ok(records.length>0,'至少須有一篇正式作品可檢查');
 const seeds=seedCodesFromMarkdown(text('docs/事件四數值三層平衡種子2400組.md'));
 const topicSource=text('docs/T1-T6-特定故事20主題與觸發日期.md');
 const topics=topicIdsFromMarkdown(topicSource),windows=readTopicWindows(topicSource);
 for(const row of records){
  const markdown=text(row.manuscriptPath);
  const report=validateStoryDraft(markdown,{stage:'full',stateRulesVersion:3,seeds,topics,windows});
  assert.equal(report.mechanicalPass,true,row.storyId+': '+JSON.stringify(report.errors));
  const selected=STATE_NAMES.map(n=>report.details.stateDistribution.byState[n].group);
  assert.equal(new Set(selected).size,4,row.storyId);
 }
});
test('full validator rejects duplicate A-E groups on an existing complete V3 story',()=>{
 const ledger=JSON.parse(text('data/story-production-ledger.json'));
 const entry=ledger.candidates['T-DRAFT-0001'];
 const original=text(entry.manuscriptPath);
 const raw=[...original.matchAll(/^(- \*\*玩家四狀態\*\*（精神、熱忱、情緒、掌控）：)([^\n]+)/gm)];
 assert.equal(raw.length,8);
 const updated=original.replace(/^(- \*\*玩家四狀態\*\*（精神、熱忱、情緒、掌控）：)([^\n]+)/gm,(_whole,start,values)=>{
  const v=values.split(',');return start+[v[0],v[0],v[2],v[3]].join(',');
 });
 const seeds=seedCodesFromMarkdown(text('docs/事件四數值三層平衡種子2400組.md'));
 const topicSource=text('docs/T1-T6-特定故事20主題與觸發日期.md');
 const report=validateStoryDraft(updated,{stage:'full',stateRulesVersion:3,seeds,topics:topicIdsFromMarkdown(topicSource),windows:readTopicWindows(topicSource)});
 assert.ok(report.errors.some(e=>e.code==='state_group_duplicate'));
});
