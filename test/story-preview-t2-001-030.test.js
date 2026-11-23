import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {validateStoryDraft,seedCodesFromMarkdown,topicIdsFromMarkdown} from '../scripts/story-draft-validator.js';
import {readTopicWindows} from '../scripts/story-windows.js';
import {storyVisibleLength} from '../scripts/story-visible-length.js';

const read=p=>readFileSync(join(process.cwd(),p),'utf8');
const base='content/events-v1/T/T2-高一下/T2-1-班呼校歌比賽前後/活動前/';
const topicText=read('docs/T1-T6-特定故事20主題與觸發日期.md');
const rules={stateRulesVersion:3,stage:'full',
 seeds:seedCodesFromMarkdown(read('docs/事件四數值三層平衡種子2400組.md')),
 topics:topicIdsFromMarkdown(topicText),windows:readTopicWindows(topicText)};
const ids=Array.from({length:30},(_,i)=>'T2-'+String(i+1).padStart(3,'0'));
const outcomes=md=>[...md.matchAll(/### (R[1-8])｜([^\n]+)\n\n- \*\*玩家可見結果\*\*：([^\n]+)/g)]
 .map(([,id,title,text])=>({id,title,text}));

test('T2-001–030: one combined class chant and school-song contest, valid V3 story drafts',()=>{
 const dates=new Map();
 for(const id of ids){
  const md=read(base+id+'.md');
  const report=validateStoryDraft(md,rules);
  assert.deepEqual(report.errors,[],id+' '+JSON.stringify(report.errors));
  assert.match(md,/T2-1:before/,id+' pre-contest window');
  assert.ok(!/班呼比賽和校歌比賽|班呼與校歌分別得獎|兩場獨立競賽/.test(md),id+' invalid two-competition premise');
  const date=md.match(/\| `quota_date`｜配額歸屬日 \| (\d{4}-\d{2}-\d{2}) \|/)?.[1];
  assert.ok(date,id+' quota date');
  dates.set(date,(dates.get(date)||0)+1);
 }
 assert.deepEqual(Object.fromEntries(dates),{
  '2027-03-31':6,'2027-04-01':6,'2027-04-02':6,'2027-04-07':6,'2027-04-08':6});
});

test('T2-001–030: all 240 outcomes match the AVG source text exactly',()=>{
 let count=0;
 for(const id of ids){
  const md=read(base+id+'.md');
  const match=md.match(/```avg\n([\s\S]*?)\n```/);
  assert.ok(match,id+' AVG block');
  const avg=JSON.parse(match[1]);
  const rs=outcomes(md);
  assert.equal(rs.length,8,id+' outcome count');
  for(const r of rs){
   const pages=avg.results[r.id]?.pages;
   assert.ok(Array.isArray(pages)&&pages.length>=2,id+' '+r.id+' AVG pages');
   assert.equal(pages.map(p=>p.text).join(''),r.text,id+' '+r.id+' visible/AVG exact match');
   assert.ok(storyVisibleLength(r.text)>=90,id+' '+r.id+' requires prose review: '+storyVisibleLength(r.text));
   count++;
  }
 }
 assert.equal(count,240);
});

test('T2-001–030: every story stays playable on every date of its five-day shared pool',()=>{
 const forbidden=[
  /(?:四月[七八]日|4月[78]日|2027[/-]04[/-]0[78])/,
  /(?:明天|後天).{0,15}(?:正式比賽|整場|上台|場地|得名)/,
  /(?:賽前最後一次|最後一天|最後一次完整彩排|比賽前一天|隔天比賽|比賽只剩幾天)/,
 ];
 for(const id of ids){
  const md=read(base+id+'.md');
  const storyText=md.slice(md.indexOf('## 2｜')); // exclude quota_date and shared-pool calendar metadata
  assert.ok(storyText.length>0,id+' must have story contents');
  for(const pattern of forbidden){
   assert.doesNotMatch(storyText,pattern,id+' must not assume its quota date equals playback date');
  }
  assert.match(md,/T2-1:before/,id+' shared playback pool');
 }
});
