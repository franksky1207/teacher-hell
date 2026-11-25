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
const base='content/events-v1/T/T1-高一上/T1-4-日本學校參訪前後/';
const folder=base+'活動後/';
const topicText=read('docs/T1-T6-特定故事20主題與觸發日期.md');
const rules={stateRulesVersion:3,stage:'full',
 seeds:seedCodesFromMarkdown(read('docs/事件四數值三層平衡種子2400組.md')),
 topics:topicIdsFromMarkdown(topicText),windows:readTopicWindows(topicText)};
const ids=Array.from({length:12},(_,i)=>'T1-'+(115+i));
const evidenceFiles=['115-117','118-120','121-123','124-126'];
const records=new Map(evidenceFiles.flatMap(group=>JSON.parse(read(base+'驗收紀錄/活動後-'+group+'-創作抽選及因果初審.json')).stories).map(x=>[x.storyId,x]));

test('T1-115~126: all twelve V3 manuscripts have valid seeds, two-day pool, and real one-to-one setting',()=>{
 const dates=new Map;
 for(const id of ids){
  const md=read(folder+id+'.md'),checked=validateStoryDraft(md,rules);
  assert.deepEqual(checked.errors,[],id+' official V3 mechanical validation');
  assert.equal(md.indexOf('\x60\x60\x60avg')<md.indexOf('### 開場'),true,id+' AVG must precede player opening');
  assert.equal((md.match(/^\x60{3}avg$/gm)||[]).length,1,id+' unique AVG block');
  assert.ok(!/昨天|昨日|隔天|沒去的人|未參與者/.test(md),id+' must be playable on Nov 12 or 13');
  assert.ok(md.includes('日本學校數百名學生來本校'),id+' real on-campus 1:1 setting');
  assert.ok(md.includes('一對一'),id+' partner ratio');
  assert.ok(!/(我們去日本|赴日參訪|進入日本學校觀課|親眼看到日本學校)/.test(md),id+' no fictional Japan school visit');
  if(['T1-117','T1-120','T1-124'].includes(id)){
   assert.ok(md.includes('student_a:')&&md.includes('student_b:'),id+' two-student story must settle both student_a and student_b deltas');
  }
  const date=md.match(/\| \x60quota_date\x60｜配額歸屬日 \| (\d{4}-\d{2}-\d{2}) \|/)?.[1];
  assert.ok(date,id+' quota date');
  dates.set(date,(dates.get(date)||0)+1);
 }
 assert.deepEqual(Object.fromEntries(dates),{'2026-11-12':6,'2026-11-13':6});
});
test('T1-115~126: 96 separate R outcomes compile with 384 non-leaking AVG pages and actual faces',()=>{
 let totalResults=0,totalOpen=0,totalPages=0;
 for(const id of ids){
  const md=read(folder+id+'.md'),avg=JSON.parse(md.match(/\x60{3}avg\n([\s\S]*?)\n\x60{3}/)[1]);
  const opening=[...md.matchAll(/^- \*\*(P\d+｜[^*]+\*\*：.+)$/gm)].map(m=>'- **'+m[1]).join('\n');
  const results=[...md.matchAll(/### (R[1-8])｜([^\n]+)\n\n([\s\S]*?)(?=\n### |\n$)/g)].map(m=>({id:m[1],title:m[2],text:m[3].match(/- \*\*玩家可見結果\*\*：(.+)/)?.[1]}));
  assert.equal(results.length,8,id+' eight R');
  const preview=compileStoryPreview({storyId:id,title:id,opening,music:md.match(/\| \x60music\x60｜事件配樂 \| (\S+) \|/)?.[1]||'school',
    options:['A','B','C','D'].map(x=>({id:x,text:x})),results,sourceMarkdown:md});
  assert.equal(preview.pages.length,3,id+' opening 3 pages');
  assert.equal(preview.resultPages.length,8,id+' outcomes 8');
  const resultSpeakers=new Set();
  for(let i=0;i<8;i++){
   const authored=avg.results['R'+(i+1)].pages,pages=preview.resultPages[i];
   assert.equal(pages.length,authored.length,id+' R'+(i+1)+' stage length');
   assert.ok(storyVisibleLength(results[i].text)>=90,id+' R'+(i+1)+' narrative complete');
   assert.equal(normalizeT1AvgParity(authored.map(x=>x.text).join('')),normalizeT1AvgParity(results[i].text),id+' AVG text parity');
   assert.equal(storyAvgVisibleLength(pages),storyVisibleLength(results[i].text),id+' AVG visible length');
   for(let j=0;j<pages.length;j++){
    const a=authored[j],p=pages[j];
    assert.equal(p.text,a.text,id+' R'+(i+1)+' P'+j+' playback text');
    assert.ok(!/\x60{3}avg|"opening"\s*:|"results"\s*:/.test(p.text),id+' raw JSON leaked');
    assert.ok(p.cast.length<=2,id+' maximum 2 NPC');
    if(a.speaker){
     resultSpeakers.add(a.speaker);
     const actor=p.cast.find(x=>x.role===a.speaker);
     assert.ok(actor,id+' R'+(i+1)+' missing speaker '+a.speaker);
     assert.equal(actor.expression,a.expression[a.speaker],id+' R'+(i+1)+' expression');
    }else assert.equal(p.speaker,null,id+' narration speaker');
    totalPages++;
   }
  }
  if(['T1-117','T1-120','T1-124'].includes(id)){
   assert.ok(resultSpeakers.has('student_a')&&resultSpeakers.has('student_b'),id+' both students must speak in results');
  }
  totalOpen+=preview.pages.length;
  totalResults+=results.length;
 }
 assert.equal(totalOpen,36);assert.equal(totalResults,96);assert.equal(totalPages,384);
});
test('T1-115~126: 384 real option × result cells agree with current audit, and emotional A-D maps remain authentic',()=>{
 let count=0;
 for(const id of ids){
  const md=read(folder+id+'.md'),ev=records.get(id);
  assert.ok(ev,id+' evidence');
  const choices=[...md.matchAll(/^\| ([ABCD]) \| ([^|]+) \| (true|false) \| ([^|]+) \| ([^|]+) \|$/gm)];
  assert.equal(choices.length,4,id+' choices');
  const emotional=choices.filter(m=>m[3]==='true');
  assert.equal(emotional.length,1,id+' one legitimate emotional option');
  assert.equal(ev.emotionalChoice.option,emotional[0][1],id+' emotion audit slot');
  assert.equal(ev.emotionalChoice.short,emotional[0][2].trim(),id+' emotion audit text');
  const matrix=new Map([...md.matchAll(/^\| ([ABCD]) \| ([0124]) \| ([0124]) \| ([0124]) \| ([0124]) \| ([0124]) \| ([0124]) \| ([0124]) \| ([0124]) \|$/gm)]
   .map(m=>[m[1],m.slice(2,10).map(Number)]));
  assert.equal(matrix.size,4,id+' matrix rows');
  assert.equal(ev.causal32Evidence.length,32,id+' causal evidence count');
  for(const cell of ev.causal32Evidence){
   const index=Number(cell.result.slice(1))-1;
   assert.equal(matrix.get(cell.choice)[index],cell.weight,id+' '+cell.choice+cell.result+' weight');
   assert.equal(cell.causalDirection,cell.weight===4?'促進':cell.weight===1?'抑制':'中性',id+' direction');
   assert.ok(cell.reason.length>=25,id+' specific causal rationale');
   assert.equal(cell.actionPreserved,true,id+' preserved action');
   count++;
  }
 }
 assert.equal(count,384);
});
