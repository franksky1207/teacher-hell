#!/usr/bin/env node
/**
 * Story library: read-only export for the eventual /stories/ reader.
 * Its one source of truth is the production ledger plus revision-controlled official manuscripts.
 * This does not change the ledger, story files, game runtime or Pages.
 */
import {readFile, mkdir, writeFile, realpath, rm, rename} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {dirname, resolve, relative, isAbsolute, join, sep} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const DEFAULT_OUTPUT='work/story-reader-data';
const trim=s=>String(s??'').trim();
const hash=b=>createHash('sha256').update(b).digest('hex');
const tableRows=s=>s.split(/\r?\n/).filter(x=>/^\s*\|.*\|\s*$/.test(x))
  .map(line=>line.trim().slice(1,-1).split('|').map(trim));

function sections(markdown){
 const headings=[...markdown.matchAll(/^## ([1-5])｜[^\r\n]+/gm)];
 if(headings.length!==5||headings.some((h,i)=>Number(h[1])!==i+1))
  throw Error('故事須有依序排列的五個正式區塊');
 return headings.map((h,i)=>markdown.slice(h.index,headings[i+1]?.index??markdown.length));
}
function requireValue(value,label){
 if(!value||/【待填】/.test(value))throw Error('缺少完整欄位：'+label);
 return value;
}
/** Extract without rewriting any player-facing words. The original manuscript is also retained. */
export function parseReaderStory(markdown,entry){
 const [s1,s2,s3,s4,s5]=sections(markdown);
 const heading=markdown.match(/^# ([^\r\n]+)/m)?.[1];
 const info={};
 for(const row of tableRows(s1)){
  // Formal Markdown template encloses metadata keys in backticks; normalize only the key.
  const match=row[0]?.replaceAll('`','').match(/^([a-z_]+)｜/);
  if(match)info[match[1]]=row[1];
 }
 const title=requireValue(heading,'故事標題');
 if(info.draft_ref!==entry.draftRef||info.event_type!==entry.type||
    (entry.type==='T'&&(info.t_topic_id!==entry.topicId||info.required_window!==entry.poolId)))
  throw Error('稿件身分與帳本不符：'+entry.draftRef);
 const summary={};
 for(const label of ['事件起因','核心衝突','導師困境','故事獨特性']){
  summary[label]=requireValue(tableRows(s2).find(r=>r[0]===label)?.[1],label);
 }
 const openingMatch=s4.match(/### 開場[^\r\n]*\r?\n([\s\S]*?)(?=### 四個最終教師選項)/);
 if(!openingMatch)throw Error('缺少開場／選項分段：'+entry.draftRef);
 const opening=openingMatch[1].trim();
 const options=tableRows(s4).filter(row=>/^[ABCD]$/.test(row[0])).map(row=>({
  id:row[0],text:requireValue(row[1],row[0]+'選項'),
  emotional:row[2]==='true',action:row[3]??'',tradeoff:row[4]??''
 }));
 if(options.length!==4||options.map(x=>x.id).join('')!=='ABCD')throw Error('四選項缺漏：'+entry.draftRef);
 const resultHeads=[...s5.matchAll(/^### (R[1-8])｜([^\r\n]+)/gm)];
 if(resultHeads.length!==8||resultHeads.some((m,i)=>m[1]!=='R'+(i+1)))
  throw Error('八結果缺漏：'+entry.draftRef);
 const results=resultHeads.map((m,i)=>{
  const part=s5.slice(m.index,resultHeads[i+1]?.index??s5.length).split(/^### 四選項對八共用結果的權重/m)[0];
  const field=label=>part.match(new RegExp('^\\s*-\\s*\\*\\*'+label+'\\*\\*[^：\\r\\n]*：([^\\r\\n]*)','m'))?.[1]?.trim()??'';
  return {id:m[1],title:m[2],text:requireValue(field('玩家可見結果'),m[1]+'結果文字'),
   consequence:field('客觀後果'),deltas:field('合法底層增減'),playerStates:field('玩家四狀態')};
 });
 const matrixStart=s5.indexOf('### 四選項對八共用結果的權重');
 if(matrixStart<0)throw Error('缺少4×8矩陣：'+entry.draftRef);
 const matrixRows=tableRows(s5.slice(matrixStart)).filter(row=>/^[ABCD]$/.test(row[0]));
 if(matrixRows.length!==4||matrixRows.some((row,i)=>row[0]!=='ABCD'[i]||row.length!==9||row.slice(1).some(v=>!['0','1','2','4'].includes(v))))
  throw Error('4×8矩陣無效：'+entry.draftRef);
 return {
  storyId:entry.storyId,draftRef:entry.draftRef,type:entry.type,topicId:entry.topicId??null,
  poolId:entry.poolId??null,quotaDate:entry.date??null,title,
  requiredConditions:info.required_conditions??'',tags:entry.tags??[],
  summary,opening,options,results,
  matrix:Object.fromEntries(matrixRows.map(r=>[r[0],r.slice(1).map(Number)])),
  seedId:entry.seedId??null,
  // Complete exact source: supports later full-fidelity reading even if presentation parsing evolves.
  sourceMarkdown:markdown
 };
}
function safeRepoRelative(value){
 if(typeof value!=='string'||!value||isAbsolute(value)||value.includes('\\')||value.split('/').includes('..'))throw Error('帳本稿件路徑不安全');
 const abs=resolve(ROOT,value);
 if(!abs.startsWith(ROOT+sep))throw Error('帳本稿件超出專案目錄');
 if(!value.startsWith('content/events-v1/正式成品/'))throw Error('非正式成品稿件路徑');
 return abs;
}
async function exactManuscript(entry){
 const path=safeRepoRelative(entry.manuscriptPath);
 const actual=await realpath(path);
 if(!actual.startsWith(ROOT+sep))throw Error('稿件實體路徑超出專案目錄');
 const bytes=await readFile(actual);
 if(hash(bytes)!==entry.manuscriptDigest)throw Error('稿件SHA256與唯一帳本不符：'+entry.draftRef);
 return bytes.toString('utf8');
}
function eligibleEntries(ledger){
 if(ledger.schemaVersion!==1||!ledger.candidates||!Number.isInteger(ledger.revision))
  throw Error('帳本版本不支援');
 return Object.values(ledger.candidates).filter(x=>x.status==='locked')
  .sort((a,b)=>a.storyId.localeCompare(b.storyId,'en',{numeric:true}));
}
function outputDirectory(value){
 const abs=resolve(ROOT,value);
 if(!abs.startsWith(ROOT+sep)||abs===ROOT)throw Error('輸出須位於專案內');
 if(!relative(ROOT,abs).startsWith('work'+sep))throw Error('第一批只允許寫入git忽略的work/目錄');
 return abs;
}
/** Build to a temporary sibling directory and replace the output only after complete success. */
export async function exportReaderData({ledgerPath=join(ROOT,'data/story-production-ledger.json'),output=DEFAULT_OUTPUT}={}){
 const ledger=JSON.parse(await readFile(ledgerPath,'utf8')),entries=eligibleEntries(ledger),dir=outputDirectory(output);
 const generated=[],index=[],ids=new Set();
 for(const entry of entries){
  if(!/^(?:T[1-6]-\d+|G-\d+)$/.test(entry.storyId??'')||ids.has(entry.storyId))
   throw Error('正式故事ID缺漏或重複');
  ids.add(entry.storyId);
  const story=parseReaderStory(await exactManuscript(entry),entry);
  const filename='stories/'+story.storyId+'.json';
  generated.push([filename,JSON.stringify(story)]);
  index.push({storyId:story.storyId,draftRef:story.draftRef,title:story.title,type:story.type,
   topicId:story.topicId,poolId:story.poolId,quotaDate:story.quotaDate,tags:story.tags,
   summary:story.summary,detail:filename});
 }
 const staging=dir+'.staging-'+process.pid;
 await rm(staging,{recursive:true,force:true});
 try{
  await mkdir(join(staging,'stories'),{recursive:true});
  for(const [file,data] of generated)await writeFile(join(staging,file),data,'utf8');
  await writeFile(join(staging,'index.json'),JSON.stringify({
   schemaVersion:1,ledgerRevision:ledger.revision,count:index.length,stories:index
  }), 'utf8');
  await rm(dir,{recursive:true,force:true});
  await rename(staging,dir);
 }catch(error){await rm(staging,{recursive:true,force:true});throw error}
 return {count:index.length,ledgerRevision:ledger.revision,output:relative(ROOT,dir)};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const argv=process.argv.slice(2);
 if(argv.length>2||argv.some(x=>x.startsWith('-')&&x!=='--output')||
    (argv.length>0&&(argv[0]!=='--output'||!argv[1]))){
  console.error('用法：node scripts/export-story-reader.mjs [--output work/story-reader-data]');
  process.exitCode=2;
 }else{
  exportReaderData({output:argv[1]??DEFAULT_OUTPUT}).then(result=>console.log(JSON.stringify(result)))
   .catch(error=>{console.error('故事閱讀資料產生失敗：'+error.message);process.exitCode=1});
 }
}
