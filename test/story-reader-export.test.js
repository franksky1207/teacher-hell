import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile, mkdtemp, rm} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {exportReaderData,parseReaderStory} from '../scripts/export-story-reader.mjs';

test('only valid locked manuscripts are exported, with full story text and options/results',async()=>{
 const ledger=JSON.parse(await readFile('data/story-production-ledger.json','utf8'));
 const count=Object.values(ledger.candidates).filter(c=>c.status==='locked').length;
 const revoked=new Set(Object.values(ledger.candidates).filter(c=>c.status==='revoked').map(c=>c.storyId));
 const folder='work/story-reader-test-'+process.pid;
 try{
  const report=await exportReaderData({output:folder});
  assert.equal(report.count,count);
  const index=JSON.parse(await readFile(join(folder,'index.json'),'utf8'));
  assert.equal(index.count,count);
  assert.equal(index.ledgerRevision,ledger.revision);
  assert.equal(index.stories.length,count);
  assert.equal(new Set(index.stories.map(s=>s.storyId)).size,count);
  for(const item of index.stories){
   assert.equal(revoked.has(item.storyId),false);
   const detail=JSON.parse(await readFile(join(folder,item.detail),'utf8'));
   assert.equal(detail.storyId,item.storyId);
   assert.equal(detail.title,item.title);
   assert.equal(detail.options.length,4);
   assert.equal(detail.results.length,8);
   assert.equal(Object.keys(detail.matrix).length,4);
   for(const row of Object.values(detail.matrix))assert.equal(row.length,8);
   assert.match(detail.sourceMarkdown,/^## 5｜/m);
   assert.match(detail.opening,/P\d\d/);
   assert.ok(detail.results.every(r=>r.text.length>0));
  }
 }finally{await rm(folder,{force:true,recursive:true})}
});
test('parser rejects incomplete five-part manuscripts',()=>{
 assert.throws(()=>parseReaderStory('# 假故事\n## 1｜不足', {draftRef:'X'}),/五個正式區塊/);
});
