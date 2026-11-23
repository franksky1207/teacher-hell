import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,rm} from 'node:fs/promises';
import {readStoryCatalog} from '../scripts/story-catalog.js';
import {exportReaderData} from '../scripts/export-story-reader.mjs';
import {loadStoryIndex,loadStoryPreview,storyPreviewProjection} from '../web/story-performance-preview.js';
import {pickAvgStories} from '../web/story-preview-picker.js';

// Exercise the real exporter, index/detail loader, compiler and screen projection.
// Discover every manuscript: future batches cannot pass by updating a fixed ID list.
test('every catalog story survives export, picker, versioned loading and every P/R page',async t=>{
 const output='work/catalog-playback-test-'+process.pid;
 const entries=await readStoryCatalog('content/events-v1');
 await exportReaderData({output,sourceCommit:'playback-test',sourceBranch:'content/events-production-v1'});
 const before=globalThis.fetch;
 globalThis.fetch=async url=>({ok:true,json:async()=>JSON.parse(await readFile(output+new URL(url).pathname.replace('/data',''),'utf8'))});
 t.after(async()=>{globalThis.fetch=before;await rm(output,{recursive:true,force:true});});
 const base=new URL('https://example.test/data/'),index=await loadStoryIndex(base);
 assert.equal(index.length,entries.length);
 for(const item of index){
  await t.test(item.storyId,async()=>{
   assert.ok(pickAvgStories(index,{kind:item.type,query:item.storyId}).some(s=>s.storyId===item.storyId));
   const preview=await loadStoryPreview(base,item);
   assert.equal(preview.detail.sourceCommit,'playback-test');
   assert.equal(preview.detail.options.length,4);
   assert.equal(preview.resultPages.length,8);
   assert.ok(preview.pages.length);
   const state={page:0,selected:null,showingResult:false,resultPage:0};
   for(let page=0;page<preview.pages.length;page++){
    const p=storyPreviewProjection(preview,{...state,page});
    assert.ok(p.view.page.text.trim());
    if(page===preview.pages.length-1)assert.equal(p.view.choices.length,4);
   }
   for(const result of preview.detail.results){
    const pages=preview.resultPages[Number(result.id.slice(1))-1];
    assert.ok(pages.length);
    for(let resultPage=0;resultPage<pages.length;resultPage++){
     const p=storyPreviewProjection(preview,{...state,showingResult:true,resultId:result.id,resultPage});
     assert.ok(p.view.page.text.trim());
     assert.equal(p.view.pageCount,pages.length);
    }
   }
  });
 }
});
