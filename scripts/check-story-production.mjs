#!/usr/bin/env node
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {relative, resolve, sep} from 'node:path';
import {readStoryCatalog} from './story-catalog.js';
import {readTopicWindows, storyPlaybackWindow, queryTWindowEligibility} from './story-windows.js';
import {validateStoryDraft, seedCodesFromMarkdown} from './story-draft-validator.js';
import {reviewEvidence, validateCausalEvidence} from './story-review-evidence.js';

const root=fileURLToPath(new URL('../',import.meta.url));
const storyRoot=resolve(root,'content/events-v1');
const tagIds=Array.from({length:11},(_,i)=>'G'+String(i+1).padStart(2,'0'));
const normalize=text=>String(text??'').normalize('NFKC').toLowerCase().replace(/[\s\p{P}\p{S}]+/gu,'');
function grams(text){
 const chars=[...normalize(text)],pairs=new Set();
 for(let i=1;i<chars.length;i++)pairs.add(chars[i-1]+chars[i]);
 return pairs;
}
function similarity(a,b){
 const left=grams(a),right=grams(b);
 if(!left.size||!right.size)return 0;
 return 2*[...left].filter(g=>right.has(g)).length/(left.size+right.size);
}
function compareSummaries(story,records){
 const fields=['事件起因','核心衝突','導師困境'];
 return records.filter(other=>other!==story).map(other=>{
  const exact=fields.every(k=>normalize(story.summary[k])&&normalize(story.summary[k])===normalize(other.summary[k]));
  const scores=fields.map(key=>similarity(story.summary[key],other.summary[key]));
  return {storyId:other.storyId,exact,score:Number((scores.reduce((a,b)=>a+b,0)/3).toFixed(3)),summary:other.summary};
 }).filter(hit=>hit.exact||hit.score>0)
  .sort((a,b)=>Number(b.exact)-Number(a.exact)||b.score-a.score);
}

export function inspectCatalog(records,{seeds,windows,selections}){
 const issues=[],ids=new Set(),owners=new Map(),days=new Map(),summaries=new Map();
 const counts={T:0,G:0,P:0};
 const planned=new Map(selections.map(row=>[row.slot,row]));
 const selectedOwners=new Map(selections.map(row=>[row.seedId,row.slot]));
 const tagCounts=Object.fromEntries(tagIds.map(tag=>[tag,0]));
 if(planned.size!==30||selectedOwners.size!==30||
  selections.some((row,i)=>row.slot!=='T1-'+String(i+1).padStart(3,'0')||!seeds.has(row.seedId)))
  throw Error('T1 首批 30 組預選種子異常');
 for(const row of selections)storyPlaybackWindow({...row,date:row.quotaDate},windows);
 for(const story of records){
  const {storyId,seedId,type,declaredId,topicId,poolId,date,tags}=story;
  const fail=message=>issues.push({storyId,message});
  if(ids.has(storyId))fail('故事ID重複');
  ids.add(storyId);
  const [category,semester,topicDir,poolDir]=relative(storyRoot,story.path).split(sep);
  if(declaredId!==storyId||type!==storyId[0]||category!==type)fail('檔名、正式ID、類型或目錄不一致');
  if(!Object.hasOwn(counts,type))continue;
  counts[type]++;
  if(type==='P')continue; // P creation and validation follow their separate calendar specifications.
  const summaryKey=['事件起因','核心衝突','導師困境'].map(key=>normalize(story.summary[key]));
  if(summaryKey.every(Boolean)){
   const key=JSON.stringify(summaryKey);
   if(summaries.has(key))fail('三欄故事摘要與 '+summaries.get(key)+' 完全相同');
   else summaries.set(key,storyId);
  }
  if(!tags.length||new Set(tags).size!==tags.length||tags.some(tag=>!tagIds.includes(tag)))fail('G01～G11標籤缺漏或重複');
  else for(const tag of tags)tagCounts[tag]++;
  if(!seeds.has(seedId))fail('未知或缺少正式種子');
  else{
   if(owners.has(seedId))fail('種子重複占用：'+seedId+' / '+owners.get(seedId));
   owners.set(seedId,storyId);
  }
  if(selectedOwners.has(seedId)&&selectedOwners.get(seedId)!==storyId)fail('種子已預選給 '+selectedOwners.get(seedId));
  const selection=planned.get(storyId);
  if(selection&&(seedId!==selection.seedId||topicId!==selection.topicId||poolId!==selection.poolId||date!==selection.quotaDate))
   fail('與首批預選種子、主題、池或配額日不符');
  if(type==='T'){
   try{
    const window=storyPlaybackWindow(story,windows);
    const poolName={before:'活動前',after:'活動後',single:'單一池'}[window.phase];
    if(!semester?.startsWith(storyId.split('-')[0]+'-')||!topicDir?.startsWith(topicId+'-')||poolDir!==poolName)
     fail('T學期、主題或故事池目錄不符');
    const eligibility=queryTWindowEligibility(story,{date,topicId,phase:window.phase,grade:Math.ceil(Number(topicId[1])/2)},windows);
    if(!eligibility.windowEligible)fail('T配額日期不具校曆資格：'+eligibility.reasons.join('、'));
    days.set(date,(days.get(date)??0)+1);
   }catch(error){fail(error.message)}
  }else if(topicId||date||poolId?.startsWith('T'))fail('G不得占用T主題、故事池或日期');
 }
 const pendingDays=new Map();
 for(const row of selections)if(!ids.has(row.slot))pendingDays.set(row.quotaDate,(pendingDays.get(row.quotaDate)??0)+1);
 for(const date of new Set([...days.keys(),...pendingDays.keys()])){
  if((days.get(date)??0)+(pendingDays.get(date)??0)>6)
   issues.push({date,message:'T跨主題共享單日六篇配額超額（含首批預留名額）'});
 }
 if(counts.T>648||counts.G>1752)issues.push({message:'T648／G1752總配額超額'});
 if(counts.G&&counts.T!==648)issues.push({message:'T648完成前不得正式驗收G'});
 const unused=[...seeds.keys()].filter(id=>!owners.has(id));
 const available=unused.filter(id=>!selectedOwners.has(id));
 return {issues,counts,tagCounts,days:Object.fromEntries(days),pendingDays:Object.fromEntries(pendingDays),owners,selectedOwners,unused,available};
}

async function main(){
 const [cmd='help',idOrFlag,...rest]=process.argv.slice(2);
 const usage='用法：npm run content:production -- status | available [S0001] | windows <主題或故事ID> | duplicates <故事ID> | audit [故事ID] [--evidence <JSON>]';
 if(cmd==='help'||cmd==='--help'){console.log(usage);return}
 if(!['status','available','windows','duplicates','audit'].includes(cmd))throw Error(usage);
 const args=[idOrFlag,...rest].filter(value=>value!==undefined);
 const evidenceIndex=args.indexOf('--evidence');
 if(evidenceIndex>=0&&(cmd!=='audit'||evidenceIndex!==1||args.length!==3))throw Error(usage);
 if(evidenceIndex<0&&(args.length>1||(cmd==='status'&&args.length)||( ['windows','duplicates'].includes(cmd)&&!args.length)))throw Error(usage);
 const read=path=>readFile(resolve(root,path),'utf8');
 const [seedText,topicText,selectionText,records]=await Promise.all([
  read('docs/事件四數值三層平衡種子2400組.md'),read('docs/T1-T6-特定故事20主題與觸發日期.md'),
  read('data/story-production-selected-seeds-T1-001-030.json'),readStoryCatalog(storyRoot)
 ]);
 const seeds=seedCodesFromMarkdown(seedText),windows=readTopicWindows(topicText);
 if(seeds.size!==2400||windows.topics.size!==20||windows.pools.size!==28||windows.days.size!==108)
  throw Error('固定種子或T窗口來源數量異常');
 const catalog=inspectCatalog(records,{seeds,windows,selections:JSON.parse(selectionText).selections});
 const {issues,counts,tagCounts,days,pendingDays,owners,selectedOwners,unused,available}=catalog;
 const story=records.find(row=>row.storyId===idOrFlag);
 let response;
 if(cmd==='status'){
  response={counts,targets:{T:648,G:1752},days,pendingDays,tagCounts,seedCounts:{total:seeds.size,used:owners.size,unused:unused.length,available:available.length},issues};
 }else if(cmd==='available'){
  if(idOrFlag&&!seeds.has(idOrFlag))throw Error('未知種子：'+idOrFlag);
  response=idOrFlag?{seedId:idOrFlag,codes:seeds.get(idOrFlag),usedBy:owners.get(idOrFlag)??null,
   selectedFor:selectedOwners.get(idOrFlag)??null,available:available.includes(idOrFlag)}:{available,unused};
 }else if(cmd==='windows'){
  const poolList=windows.topicPools.get(idOrFlag);
  if(!story&&!poolList)throw Error('找不到主題或故事：'+idOrFlag);
  response=story?storyPlaybackWindow(story,windows):poolList.map(id=>{
   const pool=windows.pools.get(id);return {...pool,dates:[...pool.dates]};
  });
 }else if(cmd==='duplicates'){
  if(!story)throw Error('找不到故事：'+idOrFlag);
  response={storyId:idOrFlag,candidates:compareSummaries(story,records),requiresSemanticReview:true};
 }else{
  if(idOrFlag&&!story)throw Error('找不到故事：'+idOrFlag);
  const evidence=evidenceIndex>=0?JSON.parse(await readFile(resolve(args[2]),'utf8')):null;
  const targets=story?.type==='G'?[story,...records.filter(row=>row.type==='T')]:story?[story]:records.filter(row=>row.type!=='P');
  if(story?.type==='P')throw Error('P 依獨立日型與 H4 規格驗收');
  const reports=targets.map(row=>{
   const report=validateStoryDraft(row.markdown,{seeds,topics:new Set(windows.topics.keys()),windows});
   if(evidence&&row===story){
    reviewEvidence(evidence,report.details.choiceFlags,report.details.npcAudit,3);
    validateCausalEvidence(evidence,report.details.matrix);
   }
   return {storyId:row.storyId,...report};
  });
  response={issues,reports,reviewEvidenceChecked:Boolean(evidence),requiresSemanticReview:true};
  if(issues.length||reports.some(report=>!report.mechanicalPass))process.exitCode=1;
 }
 console.log(JSON.stringify(response,null,2));
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 main().catch(error=>{console.error(error.message);process.exitCode=2});
}
