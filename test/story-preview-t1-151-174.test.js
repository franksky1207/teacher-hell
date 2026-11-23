import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {validateStoryDraft,seedCodesFromMarkdown,topicIdsFromMarkdown} from '../scripts/story-draft-validator.js';
import {readTopicWindows} from '../scripts/story-windows.js';
import {compileStoryPreview} from '../src/runtime/story-preview-content.js';
import {storyVisibleLength,storyAvgVisibleLength} from '../scripts/story-visible-length.js';

const read=p=>readFileSync(join(process.cwd(),p),'utf8');
const base='content/events-v1/T/T1-高一上/T1-5-首次校慶擺攤/活動後/';
const topicText=read('docs/T1-T6-特定故事20主題與觸發日期.md');
const rules={stateRulesVersion:3,stage:'full',
 seeds:seedCodesFromMarkdown(read('docs/事件四數值三層平衡種子2400組.md')),
 topics:topicIdsFromMarkdown(topicText),windows:readTopicWindows(topicText)};
const ids=Array.from({length:24},(_,i)=>'T1-'+(151+i));
const legalGroups=[
 [1,1,0,0,-1,-1,-2,-2],
 [2,0,-1,-1,-1,-1,-1,-1],
 [1,1,0,-1,-1,-1,-1,-2],
 [2,1,0,-1,-1,-1,-2,-2],
 [1,1,1,0,-1,-2,-2,-2]
].map(x=>x.sort((a,b)=>a-b).join(','));
const mdResults=md=>[...md.matchAll(/### (R[1-8])｜([^\n]+)\n\n([\s\S]*?)(?=\n### |\n$)/g)]
 .map(([,id,title,block])=>({id,title,text:block.match(/- \*\*玩家可見結果\*\*：(.+)/)?.[1],
  delta:block.match(/- \*\*合法底層增減\*\*：(.+)/)?.[1],
  stats:block.match(/- \*\*玩家四狀態\*\*[^：]*：(.+)/)?.[1]?.split(',').map(Number)}));

test('T1-151–174: 24 after-festival V3 stories match fixed seeds and four-day quota',()=>{
 const dates=new Map();
 for(const id of ids){
  const md=read(base+id+'.md');
  const result=validateStoryDraft(md,rules);
  assert.deepEqual(result.errors,[],id+' '+JSON.stringify(result.errors));
  assert.match(md,/T1-5:after/);
  const date=md.match(/\| `quota_date`｜配額歸屬日 \| (\d{4}-\d{2}-\d{2}) \|/)?.[1];
  assert.ok(date,id+' quota date');
  dates.set(date,(dates.get(date)||0)+1);
 }
 assert.deepEqual(Object.fromEntries(dates),{'2026-12-15':6,'2026-12-16':6,'2026-12-17':6,'2026-12-18':6});
});

test('T1-151–174: all 192 outcomes agree with AVG, and on-screen text is complete',()=>{
 let count=0;
 for(const id of ids){
  const md=read(base+id+'.md');
  assert.ok(md.indexOf('```avg')<md.indexOf('### 開場'),id+' AVG placement');
  const avg=JSON.parse(md.match(/\x60{3}avg\n([\s\S]*?)\n\x60{3}/)[1]);
  const results=mdResults(md);
  assert.equal(results.length,8,id+' eight results');
  const opening=[...md.matchAll(/^- \*\*(P\d+｜[^*]+\*\*：.+)$/gm)].map(m=>'- **'+m[1]).join('\n');
  const music=md.match(/\| `music`｜事件配樂 \| (\S+) \|/)?.[1]||'school';
  const preview=compileStoryPreview({storyId:id,title:id,opening,music,options:['A','B','C','D'].map(c=>({id:c,text:c})),results,sourceMarkdown:md});
  assert.equal(preview.pages.length,3,id+' opening pages');
  assert.equal(preview.resultPages.length,8,id+' result sets');
  for(let i=0;i<8;i++){
   const script=avg.results['R'+(i+1)]?.pages;
   assert.ok(Array.isArray(script)&&script.length,id+' R'+(i+1)+' AVG pages');
   assert.equal(script.map(p=>p.text).join(''),results[i].text,id+' R'+(i+1)+' exact original parity');
   assert.equal(storyAvgVisibleLength(preview.resultPages[i]),storyVisibleLength(results[i].text),id+' visible text count');
   assert.ok(storyVisibleLength(results[i].text)>=90,id+' R'+(i+1)+' too short');
   assert.ok(preview.resultPages[i].every(p=>p.cast.length<=2),id+' at most two NPC at once');
   count++;
  }
 }
 assert.equal(count,192);
});

test('T1-151–174: each story has four legal choices, 32 result weights, and V3 state columns',()=>{
 for(const id of ids){
  const md=read(base+id+'.md');
  const choices=[...md.matchAll(/^\| ([ABCD]) \| ([^|]+) \| (true|false) \| ([^|]+) \| ([^|]+) \|$/gm)];
  assert.equal(choices.length,4,id+' choices');
  assert.equal(choices.filter(x=>x[3]==='true').length,1,id+' one emotional action');
  assert.equal(new Set(choices.map(x=>x[2])).size,4,id+' different actual actions');
  const rows=[...md.matchAll(/^\| ([ABCD]) \| ([0124]) \| ([0124]) \| ([0124]) \| ([0124]) \| ([0124]) \| ([0124]) \| ([0124]) \| ([0124]) \|$/gm)];
  assert.equal(rows.length,4,id+' four weight rows');
  for(const row of rows)assert.ok(row.slice(2).filter(x=>x==='0').length<=2,id+' zero weight limit');
  const outcomes=mdResults(md);
  assert.equal(outcomes.length,8,id+' result count');
  for(const outcome of outcomes){
   assert.equal(outcome.stats?.length,4,id+' V3 per-result state columns');
   assert.ok(outcome.stats.filter(x=>x===0).length<=2,id+' at most 2 zero states');
  }
  for(let col=0;col<4;col++){
   const actual=outcomes.map(x=>x.stats[col]).sort((a,b)=>a-b).join(',');
   assert.ok(legalGroups.includes(actual),id+' invalid V3 column '+col+': '+actual);
   assert.equal(outcomes.reduce((a,r)=>a+r.stats[col],0),-4,id+' V3 column total');
  }
  const dual=['T1-157','T1-158'].includes(id);
  if(dual){
   const avg=JSON.parse(md.match(/\x60{3}avg\n([\s\S]*?)\n\x60{3}/)[1]);
   const speakers=new Set(Object.values(avg.results).flatMap(r=>r.pages.map(p=>p.speaker)).filter(Boolean));
   assert.ok(speakers.has('student_a')&&speakers.has('student_b'),id+' both students must speak');
  }
 }
});
