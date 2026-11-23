import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {join} from 'node:path';

const root=join(process.cwd(),'content/events-v1/T/T1-高一上');
const files=[];
function collect(dir){
 for(const x of readdirSync(dir,{withFileTypes:true})){
  const file=join(dir,x.name);
  if(x.isDirectory()) collect(file);
  else if(/^T1-\d{3}\.md$/.test(x.name)) files.push(file);
 }
}
collect(root);
files.sort();

test('T1 shared pools: all 174 stories and all eight outcomes retain AVG exact text',()=>{
 assert.equal(files.length,174,'all T1 stories must be present');
 let results=0;
 for(const path of files){
  const md=readFileSync(path,'utf8'),id=path.match(/T1-\d{3}/g)?.at(-1);
  const block=md.match(/```avg\n([\s\S]*?)\n```/);
  assert.ok(block,id+' has AVG');
  const avg=JSON.parse(block[1]);
  const rs=[...md.matchAll(/### (R[1-8])｜([^\n]+)\n\n- \*\*玩家可見結果\*\*：([^\n]+)/g)];
  assert.equal(rs.length,8,id+' has eight outcomes');
  for(const [,rid,,visible] of rs){
   const pages=avg.results[rid]?.pages;
   assert.ok(Array.isArray(pages)&&pages.length>0,id+' '+rid+' AVG');
   assert.equal(pages.map(p=>p.text).join(''),visible,id+' '+rid+' exact visible/AVG');
   results++;
  }
 }
 assert.equal(results,1392);
});

test('T1 shared-pool date-only wording must not recur in stories',()=>{
 const forbidden=[
  /高中第一天終於開始了/,
  /新班第一天就這樣叫我/,
  /第一天就決定以後都找我/,
  /第一天就強制採用同一種公開方式/,
  /前一天另一份/,
  /明天是不是也要排人來做/,
  /下課時終於知道明天要做什麼/,
  /第二天，有同學拿著自行查到的公告問/,
  /明天要看哪份通知/,
  /(?:明天|後天).{0,15}(?:校慶|家長日|日本參訪|正式參訪|正式擺攤)/,
  /(?:校慶|家長日|日本參訪|正式參訪).{0,15}(?:就在明天|就在後天)/,
  /(?:活動|校慶|參訪|家長日)(?:前|後)最後一天/,
 ];
 for(const path of files){
  const md=readFileSync(path,'utf8');
  const story=md.slice(md.indexOf('## 2｜'));
  assert.ok(story.length>0,path);
  for(const pattern of forbidden) assert.doesNotMatch(story,pattern,path);
 }
});
