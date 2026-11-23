import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {validateStoryDraft,seedCodesFromMarkdown,topicIdsFromMarkdown} from '../scripts/story-draft-validator.js';
import {readTopicWindows} from '../scripts/story-windows.js';
import {storyVisibleLength} from '../scripts/story-visible-length.js';
import {reviewEvidence,validateCausalEvidence} from '../scripts/story-review-evidence.js';

const root='content/events-v1/T/T3-高二上/T3-1-英文歌曲比賽前後/活動前/';
const read=p=>readFileSync(join(process.cwd(),p),'utf8');
const topics=read('docs/T1-T6-特定故事20主題與觸發日期.md');
const rules={stateRulesVersion:3,stage:'full',
 seeds:seedCodesFromMarkdown(read('docs/事件四數值三層平衡種子2400組.md')),
 topics:topicIdsFromMarkdown(topics),windows:readTopicWindows(topics)};
const ids=Array.from({length:30},(_,i)=>'T3-'+String(i+1).padStart(3,'0'));
const dates=['2027-11-12','2027-11-15','2027-11-16','2027-11-17','2027-11-18'];

test('T3-001–030: all 30 stories have valid full-stage schemas and original seed/quota',()=>{
 const quota={};
 for(const id of ids){
   const md=read(root+id+'.md');
   const r=validateStoryDraft(md,rules);
   assert.deepEqual(r.errors,[],id+': '+JSON.stringify(r.errors));
   assert.match(md,/\| `required_window`｜必要合法日期／活動窗口 \| T3-1:before \|/);
   const date=md.match(/\| `quota_date`｜配額歸屬日 \| (\d{4}-\d\d-\d\d) \|/)?.[1];
   assert.ok(date&&dates.includes(date),id+' quota date');
   quota[date]=(quota[date]||0)+1;
 }
 assert.deepEqual(quota,Object.fromEntries(dates.map(d=>[d,6])));
});
test('T3-001–030: 90 opening pages render actual text and 240 R agree with AVG',()=>{
 let openings=0,results=0;
 for(const id of ids){
   const md=read(root+id+'.md');
   const match=md.match(/```avg\n([\s\S]*?)\n```/);
   assert.ok(match,id+' missing AVG');
   const avg=JSON.parse(match[1]);
   const ps=[...md.matchAll(/^- \*\*(P\d\d)｜([^\n]*?)\*\*：([^\n]+)/gm)];
   assert.equal(ps.length,3,id+' opening P count');
   for(const [,p,who,text] of ps){
      const page=avg.opening[p];
      assert.ok(page&&page.text===text,id+' '+p+' opening text');
      assert.ok(storyVisibleLength(text)>0,id+' '+p+' empty text');
      if(who==='旁白')assert.equal(page.presentation,'narration');
      openings++;
   }
   const rs=[...md.matchAll(/^### (R[1-8])｜([^\n]+)\n\n- \*\*玩家可見結果\*\*：([^\n]+)/gm)];
   assert.equal(rs.length,8,id+' R count');
   const names=[...md.matchAll(/^\| ((?:student|guardian)_[a-z]) \|/gm)].map(m=>m[1]);
   const speaking=new Set(Object.values(avg.results).flatMap(r=>r.pages.map(p=>p.speaker)).filter(Boolean));
   for(const name of names)assert.ok(speaking.has(name),id+' missing independent speaker '+name);
   for(const [,rid,title,text] of rs){
      assert.ok(storyVisibleLength(text)>=90,id+' '+rid+' short result');
      const pages=avg.results[rid]?.pages;
      assert.ok(Array.isArray(pages)&&pages.length>=2,id+' '+rid+' pages');
      assert.equal(pages.map(p=>p.text).join(''),text,id+' '+rid+' prose parity');
      results++;
   }
   for(const page of [...Object.values(avg.opening),...Object.values(avg.results).flatMap(r=>r.pages)]){
      if(page.speaker==='guardian_a'){
         assert.ok(page.presentation==='chat'||page.presentation==='phone',id+' guardian remote only');
         assert.ok(!page.enter?.includes('guardian_a'),id+' guardian cannot enter classroom');
      }
   }
 }
 assert.equal(openings,90);
 assert.equal(results,240);
});
test('T3-001–030: shared 5-day pool never assumes the contest has happened',()=>{
 for(const id of ids){
  const md=read(root+id+'.md');
  const story=md.slice(md.indexOf('## 2｜'));
  for(const invalid of [/明天(?:就是|要)(?:比賽|正式上臺)/,/昨天(?:剛|已經)?(?:比完|演出完)/,/今年英文歌曲比賽(?:已經|早就)(?:結束|評完)/])
     assert.doesNotMatch(story,invalid,id+' must be playable on all 5 dates');
 }
});

test('T3-001–030: formal review evidence is complete for 960 causal cells and all five pool days',()=>{
 let total=0;
 for(const id of ids){
  const md=read(root+id+'.md');
  const report=validateStoryDraft(md,rules);
  assert.deepEqual(report.errors,[],id+' story must be valid before auditing evidence');
  const evidence=JSON.parse(read(root+'驗收紀錄/evidence/'+id+'.json'));
  assert.equal(evidence.verdict,'approved',id+' verdict');
  assert.equal(evidence.causal32Evidence?.length,32,id+' missing cells');
  assert.deepEqual(evidence.sharedPoolDateReview?.map(x=>x.date),dates,id+' incomplete pool dates');
  assert.ok(evidence.sharedPoolDateReview.every(x=>x.eligible===true),id+' must be eligible each date');
  reviewEvidence(evidence,report.details.choiceFlags,report.details.npcAudit,3);
  validateCausalEvidence(evidence,report.details.matrix);
  const seen=new Set();
  for(const cell of evidence.causal32Evidence){
    assert.match(cell.reason||'',/[^\s]/u,id+' unexplained causal cell');
    const key=cell.choice+'-'+cell.result;
    assert.ok(!seen.has(key),id+' duplicate '+key);
    seen.add(key);
    total++;
  }
  assert.equal(seen.size,32,id+' incomplete 4x8 evidence');
 }
 assert.equal(total,960);
});
