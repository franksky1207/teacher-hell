import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {validateStoryDraft,seedCodesFromMarkdown,topicIdsFromMarkdown} from '../scripts/story-draft-validator.js';
import {readTopicWindows} from '../scripts/story-windows.js';
import {compileStoryPreview} from '../src/runtime/story-preview-content.js';
import {storyVisibleLength,storyAvgVisibleLength} from '../scripts/story-visible-length.js';
import {normalizeT1AvgParity} from './support/t1-avg-parity.js';

const read=p=>readFileSync(join(process.cwd(),p),'utf8');
const base='content/events-v1/T/T1-高一上/T1-5-首次校慶擺攤/活動前/';
const topicText=read('docs/T1-T6-特定故事20主題與觸發日期.md');
const rules={stateRulesVersion:3,stage:'full',
 seeds:seedCodesFromMarkdown(read('docs/事件四數值三層平衡種子2400組.md')),
 topics:topicIdsFromMarkdown(topicText),windows:readTopicWindows(topicText)};
const ids=Array.from({length:24},(_,i)=>'T1-'+(127+i));
const resultsFor=md=>[...md.matchAll(/### (R[1-8])｜([^\n]+)\n\n([\s\S]*?)(?=\n### |\n$)/g)]
 .map(([,id,title,block])=>({id,title,text:block.match(/- \*\*玩家可見結果\*\*：(.+)/)?.[1]}));
test('T1-127~150: 24 fixed-seed V3 manuscripts and four-day before pool',()=>{
 const dates=new Map();
 for(const id of ids){
  const md=read(base+id+'.md'),v=validateStoryDraft(md,rules);
  assert.deepEqual(v.errors,[],id+' '+JSON.stringify(v.errors));
  assert.ok(!/已經賣完|營收已經|運動會結束/.test(md),id+' must not predict future event');
  assert.ok(md.includes('T1-5:before'),id+' before pool');
  const date=md.match(/\| \`quota_date\`｜配額歸屬日 \| (\d{4}-\d{2}-\d{2}) \|/)?.[1];
  assert.ok(date,id+' quota date');
  dates.set(date,(dates.get(date)||0)+1);
 }
 assert.deepEqual(Object.fromEntries(dates),{'2026-12-07':6,'2026-12-08':6,'2026-12-09':6,'2026-12-10':6});
});
test('T1-127~150: 192 results and AVG pages have exact written-text parity',()=>{
 let count=0,pages=0;
 for(const id of ids){
  const md=read(base+id+'.md');
  assert.ok(md.indexOf('\x60\x60\x60avg')<md.indexOf('### 開場'),id+' AVG placement');
  const avg=JSON.parse(md.match(/\x60{3}avg\n([\s\S]*?)\n\x60{3}/)[1]);
  const items=resultsFor(md);
  assert.equal(items.length,8,id+' results');
  const opening=[...md.matchAll(/^- \*\*(P\d+｜[^*]+\*\*：.+)$/gm)].map(m=>'- **'+m[1]).join('\n');
  const music=md.match(/\| `music`｜事件配樂 \| (\S+) \|/)?.[1] || 'school';
  const preview=compileStoryPreview({storyId:id,title:id,opening,music,options:['A','B','C','D'].map(c=>({id:c,text:c})),results:items,sourceMarkdown:md});
  assert.equal(preview.pages.length,3,id+' opening');
  assert.equal(preview.resultPages.length,8,id+' endings');
  for(let j=0;j<8;j++){
   const result=items[j],script=avg.results['R'+(j+1)].pages;
   assert.equal(normalizeT1AvgParity(script.map(p=>p.text).join('')),normalizeT1AvgParity(result.text),id+' R'+(j+1)+' parity');
   assert.ok(storyAvgVisibleLength(preview.resultPages[j])>0,id+' R'+(j+1)+' visible text');
   assert.ok(storyVisibleLength(result.text)>=70,id+' R'+(j+1)+' too short for basic narrative');
   assert.ok(preview.resultPages[j].every(p=>p.cast.length<=2),id+' cast cap');
   count++;pages+=script.length;
  }
 }
 assert.equal(count,192);assert.ok(pages>=576);
});

const evidenceNames=[
 '驗收紀錄/活動前-127-138-創作選項與逐格因果初審.json',
 '驗收紀錄/活動前-139-150-創作選項與逐格因果初審.json'
];
const reviews=new Map(evidenceNames.flatMap(name=>JSON.parse(read(base+name)).stories).map(x=>[x.storyId,x]));
const dualStudentIds=new Set(['T1-129','T1-138','T1-143','T1-144']);
test('T1-127~150: 24 reviews cover 192 results and 768 causal cells',()=>{
 assert.equal(reviews.size,24);
 let cells=0;
 for(const id of ids){
  const md=read(base+id+'.md'),ev=reviews.get(id);
  assert.ok(ev,id+' review record');
  const choices=[...md.matchAll(/^\| ([ABCD]) \| ([^|]+) \| (true|false) \| ([^|]+) \| ([^|]+) \|$/gm)];
  assert.equal(choices.length,4,id+' choices');
  const emotional=choices.filter(x=>x[3]==='true');
  assert.equal(emotional.length,1,id+' emotional choice count');
  const sel=ev.ordinaryChoiceSelection;
  assert.equal(sel.ordinaryCandidates.length,6,id+' six candidates');
  assert.equal(new Set(sel.selectedIds).size,3,id+' three selected candidates');
  for(const x of choices){
   const selected=sel.finalChoiceMap[x[1]];
   assert.ok(selected==='emotional'||sel.selectedIds.includes(selected),id+' choice selection mismatch');
   if(selected==='emotional')assert.equal(x[3],'true',id+' emotion mapping');
  }
  const results=resultsFor(md);
  assert.equal(ev.resultAudit.length,8,id+' eight result audits');
  for(let i=0;i<8;i++){
   const section=md.match(new RegExp('### R'+(i+1)+'｜[\\s\\S]*?- \\*\\*合法底層增減\\*\\*：([^\\n]+)'));
   assert.ok(section,id+' settlement missing');
   assert.equal(ev.resultAudit[i].delta,section[1],id+' stale result audit R'+(i+1));
   assert.ok(storyVisibleLength(results[i].text)>=90,id+' brief result R'+(i+1));
  }
  const matrix=new Map([...md.matchAll(/^\| ([ABCD]) \| ([0124]) \| ([0124]) \| ([0124]) \| ([0124]) \| ([0124]) \| ([0124]) \| ([0124]) \| ([0124]) \|$/gm)]
   .map(m=>[m[1],m.slice(2,10).map(Number)]));
  assert.equal(matrix.size,4,id+' matrix');
  assert.equal(ev.causal32Evidence.length,32,id+' causal evidence');
  for(const cell of ev.causal32Evidence){
   assert.equal(cell.weight,matrix.get(cell.choice)[Number(cell.result.slice(1))-1],id+' weight mismatch');
   assert.equal(cell.actionPreserved,true,id+' action preserved');
   assert.ok(cell.reason.length>=25,id+' causal rationale');
   cells++;
  }
  if(dualStudentIds.has(id)){
   const avg=JSON.parse(md.match(/\x60{3}avg\n([\s\S]*?)\n\x60{3}/)[1]);
   const actors=new Set(Object.values(avg.results).flatMap(r=>r.pages.map(x=>x.speaker)).filter(Boolean));
   assert.ok(actors.has('student_a')&&actors.has('student_b'),id+' both roles must speak');
  }
 }
 assert.equal(cells,768);
});
