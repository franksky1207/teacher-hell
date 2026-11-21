import test from 'node:test';
import assert from 'node:assert/strict';
import {AVG_DEMO_DETAIL} from '../web/story-performance-demo.js';
import {loadStoryIndex,loadStoryPreview} from '../web/story-performance-preview.js';

const sourceBranch='content/events-production-v1';
const makeIndex=version=>({schemaVersion:1,sourceCommit:version,sourceBranch,count:1,stories:[{
 storyId:'T1-004',detail:'stories/T1-004.json',title:'測試',type:'T',topicId:'T1-1',quotaDate:'2026-07-20'
}]});
const makeDetail=version=>({...AVG_DEMO_DETAIL,storyId:'T1-004',sourceCommit:version,sourceBranch});
const reply=value=>({ok:true,json:async()=>value});
function simulate(t,handler){
 const before=globalThis.fetch;
 globalThis.fetch=async (url,options)=>{
  assert.equal(options.cache,'no-store');
  assert.ok(new URL(url).searchParams.has('preview_refresh'));
  return reply(handler(new URL(url)));
 };
 t.after(()=>{globalThis.fetch=before;});
}
test('AVG index attaches release identity and rejects an unversioned index',async t=>{
 simulate(t,url=>makeIndex('new'));
 const [summary]=await loadStoryIndex(new URL('https://example.test/data/'));
 assert.equal(summary.sourceCommit,'new');
 assert.equal(summary.sourceBranch,sourceBranch);
});
test('AVG detail snapshot mismatch must not play stale results',async t=>{
 simulate(t,url=>url.pathname.endsWith('/index.json')?makeIndex('current'):makeDetail('stale'));
 const [summary]=await loadStoryIndex(new URL('https://example.test/data/'));
 await assert.rejects(loadStoryPreview(new URL('https://example.test/data/'),summary),/故事版本仍未同步/);
});
test('AVG refreshes version pair and recovers from a transient Pages publication race',async t=>{
 let details=0;
 simulate(t,url=>{
  if(url.pathname.endsWith('/index.json'))return makeIndex('new');
  details++;
  return makeDetail(details===1?'old':'new');
 });
 const [summary]=await loadStoryIndex(new URL('https://example.test/data/'));
 const preview=await loadStoryPreview(new URL('https://example.test/data/'),summary);
 assert.equal(preview.detail.sourceCommit,'new');
 assert.equal(details,2);
 assert.equal(preview.resultPages.length,8);
});
