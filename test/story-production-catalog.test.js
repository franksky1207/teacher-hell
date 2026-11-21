import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {inspectCatalog} from '../scripts/check-story-production.mjs';
import {readTopicWindows} from '../scripts/story-windows.js';
import {seedCodesFromMarkdown} from '../scripts/story-draft-validator.js';
import {validateCausalEvidence} from '../scripts/story-review-evidence.js';

const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const seeds=seedCodesFromMarkdown(read('docs/事件四數值三層平衡種子2400組.md'));
const windows=readTopicWindows(read('docs/T1-T6-特定故事20主題與觸發日期.md'));
const {selections}=JSON.parse(read('data/story-production-selected-seeds-T1-001-030.json'));
const options={seeds,windows,selections};
function story(slot,seedId,date,topicId='T1-1',phase='single'){
 const directory={single:'單一池',before:'活動前',after:'活動後'}[phase];
 return {
  storyId:slot,declaredId:slot,path:resolve('content/events-v1/T/T1-高一上',topicId+'-主題',directory,slot+'.md'),
  seedId,type:'T',date,topicId,poolId:topicId+':'+phase,tags:['G03'],summary:{}
 };
}

test('fixed seeds and quota reservations distinguish unused from available',()=>{
 const row=selections[0];
 const first=story(row.slot,row.seedId,row.quotaDate);
 const result=inspectCatalog([first],options);
 assert.deepEqual(result.issues,[]);
 assert.equal(result.owners.get(row.seedId),row.slot);
 assert.equal(result.pendingDays[row.quotaDate],5);
 assert.ok(result.unused.includes(selections[12].seedId));
 assert.ok(!result.available.includes(selections[12].seedId));
 const wrong=story('T1-031',row.seedId,row.quotaDate);
 const messages=inspectCatalog([first,wrong],options).issues.map(issue=>issue.message);
 assert.ok(messages.some(message=>message.includes('種子重複')));
 assert.ok(messages.some(message=>message.includes('配額超額')));
 assert.ok(messages.some(message=>message.includes('已預選給')));
});

test('overlapping T pools share a single six-story date quota',()=>{
 assert.equal(windows.topics.size,20);
 assert.equal(windows.pools.size,28);
 assert.equal(windows.days.size,108);
 const [date,topics]=[...windows.days].find(([, ids])=>ids.size>1);
 const pools=[...topics].map(id=>[...windows.pools.values()].find(p=>p.topicId===id&&p.dates.has(date)));
 const available=inspectCatalog([],options).available;
 const records=Array.from({length:7},(_,i)=>{
  const pool=pools[i%pools.length];
  const prefix=pool.topicId.split('-')[0];
  const item=story(prefix+'-'+(100+i),available[i],date,pool.topicId,pool.phase);
  item.path=item.path.replace('/T1-高一上/','/'+prefix+'-學期/');
  return item;
 });
 assert.deepEqual(inspectCatalog(records.slice(0,6),options).issues,[]);
 assert.match(inspectCatalog(records,options).issues.at(-1).message,/共享單日六篇/);
});

test('formal evidence requires all 32 cells and matches Markdown weights',()=>{
 const matrix=Object.fromEntries([... 'ABCD'].map(id=>[id,Array(8).fill(2)]));
 const cells=Object.entries(matrix).flatMap(([choice,weights])=>weights.map((weight,index)=>({
  choice,result:'R'+(index+1),weight,compatibility:'相容',causalDirection:'中性',
  reason:'理由欄測試資料',actionPreserved:'既成行動欄測試資料'
 })));
 assert.doesNotThrow(()=>validateCausalEvidence({causal32Evidence:cells},matrix));
 assert.throws(()=>validateCausalEvidence({causal32Evidence:cells.slice(1)},matrix),/32格/);
 cells[0].weight=4;
 assert.throws(()=>validateCausalEvidence({causal32Evidence:cells},matrix),/正文權重/);
});
