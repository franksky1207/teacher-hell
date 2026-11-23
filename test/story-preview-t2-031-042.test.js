import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {validateStoryDraft,seedCodesFromMarkdown,topicIdsFromMarkdown} from '../scripts/story-draft-validator.js';
import {readTopicWindows} from '../scripts/story-windows.js';
import {storyVisibleLength} from '../scripts/story-visible-length.js';
import {reviewEvidence,validateCausalEvidence} from '../scripts/story-review-evidence.js';

const root='content/events-v1/T/T2-高一下/T2-1-班呼／校歌比賽前後/活動後/';
const read=p=>readFileSync(join(process.cwd(),p),'utf8');
const topics=read('docs/T1-T6-特定故事20主題與觸發日期.md');
const rules={stateRulesVersion:3,stage:'full',
 seeds:seedCodesFromMarkdown(read('docs/事件四數值三層平衡種子2400組.md')),
 topics:topicIdsFromMarkdown(topics),windows:readTopicWindows(topics)};
const ids=Array.from({length:12},(_,i)=>'T2-'+String(i+31).padStart(3,'0'));
const outcomeBlocks=md=>[...md.matchAll(/### (R[1-8])｜([^\n]+)\n\n- \*\*玩家可見結果\*\*：([^\n]+)/g)].map(([,id,title,text])=>({id,title,text}));
const matrix=md=>Object.fromEntries([...md.matchAll(/^\| ([ABCD]) \| ((?:[0124] \| ){7}[0124]) \|$/gm)].map(m=>[m[1],m[2].split(' | ').map(Number)]));

test('T2-031–042: 12 complete V3 stories, fixed seeds and two-day quota',()=>{
 const quota={};
 for(const id of ids){
  const md=read(root+id+'.md');
  const report=validateStoryDraft(md,rules);
  assert.deepEqual(report.errors,[],id+' '+JSON.stringify(report.errors));
  assert.match(md,/T2-1:after/);
  const date=md.match(/\| `quota_date`｜配額歸屬日 \| (\d{4}-\d{2}-\d{2}) \|/)?.[1];
  assert.ok(date,id+' quota date');
  quota[date]=(quota[date]||0)+1;
 }
 assert.deepEqual(quota,{'2027-04-12':6,'2027-04-13':6});
});
test('T2-031–042: all 96 R results match AVG and both protagonists speak',()=>{
 let count=0;
 for(const id of ids){
  const md=read(root+id+'.md');
  const avg=JSON.parse(md.match(/```avg\n([\s\S]*?)\n```/)[1]);
  const outcomes=outcomeBlocks(md);
  assert.equal(outcomes.length,8,id+' result count');
  const names=[...md.matchAll(/^\| ((?:student|guardian)_[a-z]) \|/gm)].map(m=>m[1]);
  const speakers=new Set(Object.values(avg.results).flatMap(r=>r.pages.map(p=>p.speaker)).filter(Boolean));
  for(const role of names)assert.ok(speakers.has(role),id+' missing speaking role '+role);
  for(const r of outcomes){
   const pages=avg.results[r.id]?.pages;
   assert.ok(Array.isArray(pages)&&pages.length>=3,id+' '+r.id+' AVG pages');
   assert.equal(pages.map(p=>p.text).join(''),r.text,id+' '+r.id+' AVG parity');
   assert.ok(storyVisibleLength(r.text)>=90,id+' '+r.id+' prose too short');
   count++;
  }
  if(id==='T2-041'){
   assert.ok(!Object.values(avg.opening).some(p=>p.enter?.includes('guardian_a')),id+' remote guardian must not enter classroom');
   assert.ok(Object.values(avg.results).flatMap(r=>r.pages).filter(p=>p.speaker==='guardian_a').every(p=>p.presentation==='chat'),id+' guardian uses remote chat');
  }
 }
 assert.equal(count,96);
});
test('T2-031–042: formal evidence covers 384 causal cells and warnings',()=>{
 let cells=0;
 for(const id of ids){
  const md=read(root+id+'.md'),e=JSON.parse(read(root+'驗收紀錄/evidence/'+id+'.json'));
  const report=validateStoryDraft(md,rules);
  reviewEvidence(e,report.details.choiceFlags,report.details.npcAudit,3);
  validateCausalEvidence(e,report.details.matrix);
  assert.deepEqual(e.sharedPoolDateReview?.map(x=>x.date)||e.sharedPoolDates?.map(x=>x.date)||e.dateReview?.map(x=>x.date),['2027-04-12','2027-04-13'],id+' dates');
  assert.equal(e.causal32Evidence.length,32,id+' cells');
  cells+=32;
 }
 assert.equal(cells,384);
});
test('T2-031–042: both legal days preserve the post-event chronology',()=>{
 for(const id of ids){
  const md=read(root+id+'.md');
  const story=md.slice(md.indexOf('## 2｜'));
  for(const re of [/明天(?:就|是|要).{0,10}(?:比賽|上臺|正式演出)/,/比賽(?:還沒|尚未|即將)開始/,/賽後最後一天/,/只有四月十三日才/])
   assert.doesNotMatch(story,re,id+' pool must not depend on quota date');
 }
});
