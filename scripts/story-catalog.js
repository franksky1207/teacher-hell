import {readFile, readdir} from 'node:fs/promises';
import {basename, dirname, join, relative, sep} from 'node:path';

export const storyIdPattern=/^(?:T[1-6]-\d{3,}|G-\d{4,}|P[1-6]-\d{3,})$/;
export const storyMetadataHeading='## 1｜故事基本資料';
export const storyMetadataKeys=new Set([
 'story_id','seed_id','event_type','t_topic_id','tags','required_window','quota_date',
 'required_conditions','state_rules_version','music'
]);
export const seedIdPattern=/^S\d{4}$/;
export const summaryLabels=['事件起因','核心衝突','導師困境','故事獨特性'];
export const tableRows=text=>text.split(/\r?\n/).filter(line=>/^\s*\|.*\|\s*$/.test(line))
 .map(line=>line.trim().slice(1,-1).split('|').map(cell=>cell.trim()));

export async function isUnfinishedGStory(entry){
 if(!entry||(entry.type!=='G'&&!/^G\d{4}$/.test(entry.storyId)))return false;
 if(/【待填/.test(entry.markdown??''))return true;
 if(!/^G\d{4}$/.test(entry.storyId))return false;
 try{
  const evidencePath=join(dirname(entry.path),'驗收紀錄','evidence',entry.storyId+'.json');
  const evidence=JSON.parse(await readFile(evidencePath,'utf8'));
  return evidence?.stages?.stage3?.semanticApproved!==true;
 }catch{
  return true;
 }
}

export function readStoryMetadata(markdown,storyId,path){
 const header=markdown.split(/^## 1｜故事基本資料[ \t]*\r?$/m)[1]?.split(/^## [2-5]｜/m,1)[0]??'';
 const info={};
 for(const [label,value] of tableRows(header)){
  const key=label.replaceAll('`','').match(/^([a-z_]+)｜/)?.[1];
  if(key)info[key]=value;
 }
 const summarySection=markdown.split(/^## 2｜[^\r\n]*/m)[1]?.split(/^## [3-5]｜/m,1)[0]??'';
 const summary=Object.fromEntries(tableRows(summarySection).filter(([key])=>summaryLabels.includes(key)));
 return {
  storyId,path,declaredId:info.story_id,type:info.event_type??storyId[0],
  title:markdown.match(/^# ([^\r\n]+)/m)?.[1]??storyId,
  topicId:info.t_topic_id==='無'?null:info.t_topic_id??null,
  poolId:info.required_window==='無'?null:info.required_window??null,
  date:info.quota_date==='無'?null:info.quota_date??null,
  seedId:seedIdPattern.test(info.seed_id)?info.seed_id:null,
  tags:(info.tags??'').split(/[、，,;\s／/]+/).filter(Boolean),
  requiredConditions:info.required_conditions??'',summary,markdown
 };
}

export async function readStoryCatalog(root){
 const entries=await readdir(root,{recursive:true,withFileTypes:true});
 const paths=entries.filter(entry=>entry.isFile()&&entry.name.endsWith('.md')&&storyIdPattern.test(entry.name.slice(0,-3)))
  .map(entry=>join(entry.parentPath,entry.name))
  .filter(path=>['T','G','P'].includes(relative(root,path).split(sep)[0]));
 const records=await Promise.all(paths.map(async path=>readStoryMetadata(
  await readFile(path,'utf8'),basename(path,'.md'),path
 )));
 return records.sort((a,b)=>a.storyId.localeCompare(b.storyId,'en',{numeric:true})||a.path.localeCompare(b.path));
}
