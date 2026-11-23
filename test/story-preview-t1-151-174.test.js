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

const reviewFiles=[
 '驗收紀錄/活動後-151-158-數值與32格初審.json',
 '驗收紀錄/活動後-159-166-數值與32格初審.json',
 '驗收紀錄/活動後-167-174-數值與32格初審.json'
];
test('T1-151–174: evidence matches 24 current drafts, 192 results and 768 weighted causal cells',()=>{
 const reviews=reviewFiles.flatMap(p=>JSON.parse(read(base+p)).stories);
 assert.equal(reviews.length,24,'one review per story');
 assert.equal(new Set(reviews.map(x=>x.storyId)).size,24,'unique review stories');
 let checked=0;
 for(const id of ids){
  const draft=read(base+id+'.md');
  const review=reviews.find(x=>x.storyId===id);
  assert.ok(review,id+' missing review');
  const outcomes=mdResults(draft);
  assert.equal(review.resultAudit.length,8,id+' eight audited endings');
  const choices=[...draft.matchAll(/^\| ([ABCD]) \| ([^|]+) \| (true|false) \| ([^|]+) \| ([^|]+) \|$/gm)];
  const selected=review.ordinaryChoiceSelection;
  assert.equal(selected.ordinaryCandidates.length,6,id+' six lawful candidates');
  assert.equal(selected.selectedIds.length,3,id+' selected three ordinary candidates');
  assert.equal(new Set(selected.selectedIds).size,3,id+' selected candidates distinct');
  for(const choice of choices){
   const src=selected.finalChoiceMap[choice[1]];
   assert.ok(src==='emotional'||selected.selectedIds.includes(src),id+' choice selection provenance');
   assert.equal(choice[3]==='true',src==='emotional',id+' emotional selection mapping');
   if(src!=='emotional'){
    const c=selected.ordinaryCandidates.find(x=>x.id===src);
    assert.equal(choice[2],c.text,id+' selected choice text');
    assert.equal(choice[4],c.action,id+' selected completed action');
   }
  }
  for(let i=0;i<8;i++){
   const audit=review.resultAudit[i],outcome=outcomes[i];
   assert.equal(audit.id,outcome.id,id+' result order');
   assert.equal(audit.chars,storyVisibleLength(outcome.text),id+' prose length R'+(i+1));
   assert.equal(audit.delta,outcome.delta,id+' settlement R'+(i+1));
   assert.deepEqual(audit.stats,outcome.stats,id+' V3 values R'+(i+1));
  }
  const matrix=new Map([...draft.matchAll(/^\| ([ABCD]) \| ([0124]) \| ([0124]) \| ([0124]) \| ([0124]) \| ([0124]) \| ([0124]) \| ([0124]) \| ([0124]) \|$/gm)]
    .map(m=>[m[1],m.slice(2).map(Number)]));
  assert.equal(matrix.size,4,id+' matrix');
  assert.equal(review.causal32Evidence.length,32,id+' 32 distinct cells');
  const keys=new Set();
  for(const cell of review.causal32Evidence){
   const index=Number(cell.result.slice(1))-1;
   const key=cell.choice+cell.result;
   assert.ok(!keys.has(key),id+' duplicate causal cell '+key);
   keys.add(key);
   assert.equal(cell.weight,matrix.get(cell.choice)?.[index],id+' matrix/evidence '+key);
   assert.equal(cell.actionPreserved,true,id+' preserve action '+key);
   assert.ok(typeof cell.reason==='string'&&cell.reason.length>=25,id+' rationale missing '+key);
   checked++;
  }
  assert.equal(keys.size,32,id+' full causal grid');
 }
 assert.equal(checked,768);
});
