#!/usr/bin/env node
/** Build the static reader snapshot from the checked-out Markdown. */
import {mkdir, writeFile, rm, rename} from 'node:fs/promises';
import {readStoryCatalog, isUnfinishedGStory, storyMetadataHeading, summaryLabels, tableRows} from './story-catalog.js';
import {dirname, resolve, relative, join, sep} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const DEFAULT_OUTPUT='work/story-reader-data';
function sections(markdown){
 const headings=[...markdown.matchAll(/^## ([1-5])｜[^\r\n]+/gm)];
 if(headings.length!==5||headings.some((h,i)=>Number(h[1])!==i+1)||headings[0][0].trimEnd()!==storyMetadataHeading)
  throw Error('故事須有依序排列的五個正式區塊');
 return headings.map((h,i)=>markdown.slice(h.index,headings[i+1]?.index??markdown.length));
}
function requireValue(value,label){
 if(!value||/【待填】/.test(value))throw Error('缺少完整欄位：'+label);
 return value;
}
/** Extract without rewriting any player-facing words. The original manuscript is also retained. */
export function parseReaderStory(markdown,entry){
 const [,,,s4,s5]=sections(markdown);
 const title=entry.title;
 for(const label of summaryLabels)requireValue(entry.summary[label],label);
 const openingMatch=s4.match(/### 開場[^\r\n]*\r?\n([\s\S]*?)(?=### 四個最終教師選項)/);
 if(!openingMatch)throw Error('缺少開場／選項分段：'+entry.storyId);
 const opening=openingMatch[1].trim();
 const options=tableRows(s4).filter(row=>/^[ABCD]$/.test(row[0])).map(row=>({
  id:row[0],text:requireValue(row[1],row[0]+'選項'),
  emotional:row[2]==='true',action:row[3]??'',tradeoff:row[4]??''
 }));
 if(options.length!==4||options.map(x=>x.id).join('')!=='ABCD')throw Error('四選項缺漏：'+entry.storyId);
 const resultHeads=[...s5.matchAll(/^### (R[1-8])｜([^\r\n]+)/gm)];
 if(resultHeads.length!==8||resultHeads.some((m,i)=>m[1]!=='R'+(i+1)))
  throw Error('八結果缺漏：'+entry.storyId);
 const results=resultHeads.map((m,i)=>{
  const part=s5.slice(m.index,resultHeads[i+1]?.index??s5.length).split(/^### 四選項對八共用結果的權重/m)[0];
  const field=label=>part.match(new RegExp('^\\s*-\\s*\\*\\*'+label+'\\*\\*[^：\\r\\n]*：([^\\r\\n]*)','m'))?.[1]?.trim()??'';
  return {id:m[1],title:m[2],text:requireValue(field('玩家可見結果'),m[1]+'結果文字'),
   consequence:field('客觀後果'),deltas:field('合法底層增減'),playerStates:field('玩家四狀態')};
 });
 const matrixStart=s5.indexOf('### 四選項對八共用結果的權重');
 if(matrixStart<0)throw Error('缺少4×8矩陣：'+entry.storyId);
 const matrixRows=tableRows(s5.slice(matrixStart)).filter(row=>/^[ABCD]$/.test(row[0]));
 if(matrixRows.length!==4||matrixRows.some((row,i)=>row[0]!=='ABCD'[i]||row.length!==9||row.slice(1).some(v=>!['0','1','2','4'].includes(v))))
  throw Error('4×8矩陣無效：'+entry.storyId);
 return {
  ...readerRecord(entry),opening,options,results,
  matrix:Object.fromEntries(matrixRows.map(r=>[r[0],r.slice(1).map(Number)])),
  seedId:entry.seedId??null,
  // Complete exact source: supports later full-fidelity reading even if presentation parsing evolves.
  sourceMarkdown:markdown
 };
}
function readerRecord(entry){
 const {storyId,type,topicId,poolId,date,title,tags,summary,requiredConditions,seedId}=entry;
 return {storyId,type,topicId,poolId,quotaDate:date,title,tags,summary,requiredConditions,seedId};
}
function outputDirectory(value){
 const abs=resolve(ROOT,value);
 if(!abs.startsWith(ROOT+sep)||abs===ROOT)throw Error('輸出須位於專案內');
 if(!relative(ROOT,abs).startsWith('work'+sep))throw Error('第一批只允許寫入git忽略的work/目錄');
 return abs;
}
/** Build to a temporary sibling directory and replace the output only after complete success. */
export async function exportReaderData({storyRoot=join(ROOT,'content/events-v1'),output=DEFAULT_OUTPUT,sourceCommit,sourceBranch}={}){
 const entries=await readStoryCatalog(storyRoot),dir=outputDirectory(output);
 const generated=[],index=[],ids=new Set(),warnings=[];
 const counts=new Map();
 for(const {storyId} of entries)counts.set(storyId,(counts.get(storyId)??0)+1);
 for(const entry of entries){
  if(await isUnfinishedGStory(entry))continue;
  const {storyId,markdown}=entry;
  if(counts.get(storyId)>1){
   if(!ids.has(storyId))warnings.push(storyId+'：檔名重複，請檢查故事目錄');
   ids.add(storyId);
   continue;
  }
  let story;
  try{
   story=parseReaderStory(markdown,entry);
  }catch(error){
   story={...readerRecord(entry),sourceMarkdown:markdown,previewIssue:error.message};
  }
  const filename='stories/'+storyId+'.json';
  // Bind each detail to the exact release snapshot that produced the index.
  generated.push([filename,JSON.stringify({...story,sourceCommit,sourceBranch})]);
  index.push({...readerRecord(entry),detail:filename});
 }
 const staging=dir+'.staging-'+process.pid;
 await rm(staging,{recursive:true,force:true});
 try{
  await mkdir(join(staging,'stories'),{recursive:true});
  for(const [file,data] of generated)await writeFile(join(staging,file),data,'utf8');
  await writeFile(join(staging,'index.json'),JSON.stringify({
   schemaVersion:1,sourceCommit,sourceBranch,count:index.length,warnings,stories:index
  }), 'utf8');
  await rm(dir,{recursive:true,force:true});
  await rename(staging,dir);
 }catch(error){await rm(staging,{recursive:true,force:true});throw error}
 return {count:index.length,output:relative(ROOT,dir)};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const argv=process.argv.slice(2);
 if(argv.length>2||argv.some(x=>x.startsWith('-')&&x!=='--output')||
    (argv.length>0&&(argv[0]!=='--output'||!argv[1]))){
  console.error('用法：node scripts/export-story-reader.mjs [--output work/story-reader-data]');
  process.exitCode=2;
 }else{
  exportReaderData({output:argv[1]??DEFAULT_OUTPUT,sourceCommit:process.env.STORY_SOURCE_COMMIT,sourceBranch:process.env.STORY_SOURCE_BRANCH}).then(result=>console.log(JSON.stringify(result)))
   .catch(error=>{console.error('故事閱讀資料產生失敗：'+error.message);process.exitCode=1});
 }
}
