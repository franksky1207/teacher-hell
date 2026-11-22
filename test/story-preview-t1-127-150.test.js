import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {validateStoryDraft,seedCodesFromMarkdown,topicIdsFromMarkdown} from '../scripts/story-draft-validator.js';
import {readTopicWindows} from '../scripts/story-windows.js';
import {compileStoryPreview} from '../src/runtime/story-preview-content.js';
import {storyVisibleLength,storyAvgVisibleLength} from '../scripts/story-visible-length.js';

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
  assert.ok(md.indexOf('\\x60\\x60\\x60avg')<md.indexOf('### 開場'),id+' AVG placement');
  const avg=JSON.parse(md.match(/\\x60{3}avg\\n([\\s\\S]*?)\\n\\x60{3}/)[1]);
  const items=resultsFor(md);
  assert.equal(items.length,8,id+' results');
  const opening=[...md.matchAll(/^- \\*\\*(P\\d+｜[^*]+\\*\\*：.+)$/gm)].map(m=>'- **'+m[1]).join('\\n');
  const preview=compileStoryPreview({storyId:id,title:id,opening,music:'school',options:['A','B','C','D'].map(c=>({id:c,text:c})),results:items,sourceMarkdown:md});
  assert.equal(preview.pages.length,3,id+' opening');
  assert.equal(preview.resultPages.length,8,id+' endings');
  for(let j=0;j<8;j++){
   const result=items[j],script=avg.results['R'+(j+1)].pages;
   assert.equal(script.map(p=>p.text).join(''),result.text,id+' R'+(j+1)+' parity');
   assert.equal(storyAvgVisibleLength(preview.resultPages[j]),storyVisibleLength(result.text),id+' R'+(j+1)+' visible text');
   assert.ok(storyVisibleLength(result.text)>=70,id+' R'+(j+1)+' too short for basic narrative');
   assert.ok(preview.resultPages[j].every(p=>p.cast.length<=2),id+' cast cap');
   count++;pages+=script.length;
  }
 }
 assert.equal(count,192);assert.ok(pages>=576);
});
