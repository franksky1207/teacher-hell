#!/usr/bin/env node
import {execFileSync} from 'node:child_process';
import {validateStateRevision} from './story-state-revision.js';
/** Production ledger CLI V1. Preview by default; --apply writes one local ledger.
 * GitHub cross-machine concurrency requires normal SHA/PR conflict checking.
 */
import {readFile,writeFile,open,rename,mkdir,rm,realpath,stat} from 'node:fs/promises';
import {resolve,join,dirname,relative,isAbsolute,extname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {seedCodesFromMarkdown,topicIdsFromMarkdown,validateStoryDraft} from './story-draft-validator.js';
import {readTopicWindows,ledgerProgress,validateLedger,changeProductionLedger,duplicateCandidates,extractDraftSummary,storyPlaybackWindow} from './story-production-ledger.js';

const argv=process.argv.slice(2),cmd=argv[0]??'help',option=k=>{const i=argv.indexOf(k);return i<0?null:argv[i+1]??null};
const has=k=>argv.includes(k),root=join(dirname(fileURLToPath(import.meta.url)),'..');
const ledgerPath=resolve(option('--ledger')||join(root,'data','story-production-ledger.json'));
const outside=path=>isAbsolute(path)||path==='..'||path.startsWith('../')||path.startsWith('..\\');
const fixturePath=path=>/(^|[\\/])test[\\/]fixtures([\\/]|$)/i.test(path);
async function evidencePath(path,extension){
 const resolved=resolve(root,path);
 const local=relative(root,resolved);
 if(outside(local)||fixturePath(local)||extname(local).toLowerCase()!==extension)throw Error('證據須為專案內非測試素材 '+extension+' 路徑');
 const physical=await realpath(resolved);
 const physicalLocal=relative(await realpath(root),physical);
 if(outside(physicalLocal)||fixturePath(physicalLocal)||!(await stat(physical)).isFile())throw Error('證據實際路徑須為專案內非測試檔案');
 return physical;
}
const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
const usage=[
 '17D T/G量產帳本V1（預設只預覽；--apply 才會寫入）',
 'node scripts/manage-story-production.mjs windows (--topic TOPIC | --ref REF) [--ledger FILE]',
 'node scripts/manage-story-production.mjs status [--ledger FILE]',
 'node scripts/manage-story-production.mjs audit [--ledger FILE] [--json REPORT]',
 'node scripts/manage-story-production.mjs available [--seed S0001] [--ledger FILE]',
 'node scripts/manage-story-production.mjs duplicates --ref REF [--ledger FILE] [--json REPORT]',
 'node scripts/manage-story-production.mjs propose --ref REF --owner AI --file SUMMARY.md [--date YYYY-MM-DD] [--apply --expect-revision N]',
 'node scripts/manage-story-production.mjs reserve --ref REF --owner AI --seed S0001 --reason "..." [--apply --expect-revision N]',
 'node scripts/manage-story-production.mjs revise --ref REF --owner AI --file STORY.md [--reason "..."] [--apply --expect-revision N]',
 'node scripts/manage-story-production.mjs release|reject --ref REF --owner AI --reason "..." [--apply --expect-revision N]',
 'node scripts/manage-story-production.mjs revoke --ref REF --owner AI --reason "..." [--apply --expect-revision N]',
 'node scripts/manage-story-production.mjs lock --ref REF --owner AI --file STORY.md --review REVIEW.json [--apply --expect-revision N]',
 'node scripts/manage-story-production.mjs revise-locked --ref REF --owner AI --file NEW.md --review NEW.json --expect-manuscript-sha SHA --expect-review-sha SHA --expect-ledger-sha SHA256 --expect-head HEAD [--apply --expect-revision N]',
 'note: G proposals/locks require T648 locked; SAMPLE drafts never enter production.'
].join('\n');
if(cmd==='help'||has('--help'))console.log(usage);
else{
 let lockHandle=null,lockPath=ledgerPath+'.lock';
 try{
  const seedText=await readFile(join(root,'docs','事件四數值三層平衡種子2400組.md'),'utf8');
  const topicText=await readFile(join(root,'docs','T1-T6-特定故事20主題與觸發日期.md'),'utf8');
  const seeds=seedCodesFromMarkdown(seedText),windows=readTopicWindows(topicText),topics=topicIdsFromMarkdown(topicText);
  if(seeds.size!==2400||windows.topics.size!==20||windows.days.size!==108)throw Error('來源資料數量異常，停止操作');
  const mutating=['propose','reserve','revise','release','reject','lock','revoke','revise-locked'].includes(cmd);
  if(mutating&&['propose','revise','lock','revise-locked'].includes(cmd)&&ledgerPath===resolve(root,'data/story-production-ledger.json')&&Number(option('--state-rules-version')||3)!==3)throw Error('正式量產只接受V3；歷史版本參數僅供讀取或隔離驗收');
  const report=option('--json');
  if(has('--json')&&(!report||!['audit','duplicates'].includes(cmd)))throw Error('--json 只支援 audit／duplicates 的獨立報告檔');
  if(report&&[ledgerPath,lockPath,resolve(root,'data/story-production-ledger.json')].includes(resolve(report)))throw Error('報告不得覆寫帳本或鎖檔');
  if(mutating&&has('--apply')){
   if(!/^\d+$/.test(option('--expect-revision')||''))throw Error('正式寫入必須附 --expect-revision 整數');
   await mkdir(dirname(ledgerPath),{recursive:true});
   lockHandle=await open(lockPath,'wx');
  }
  let ledger;
  try{ledger=JSON.parse(await readFile(ledgerPath,'utf8'))}
  catch(e){if(e.code==='ENOENT'&&ledgerPath===resolve(join(root,'data','story-production-ledger.json')))throw Error('缺少正式帳本，請確認分支及檔案');throw e}
  if(lockHandle&&Number(option('--expect-revision'))!==ledger.revision)throw Error('帳本修訂版已改變，請重新讀取預覽；禁止覆寫舊版');
  if(cmd==='revise-locked'){
   const expectedHead=option('--expect-head');
   if(!/^[a-f0-9]{40}$/.test(expectedHead??'')||execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8',timeout:30000}).trim()!==expectedHead||execFileSync('git',['ls-remote','origin','refs/heads/'+(option('--branch')||'content/events-production-v1')],{cwd:root,encoding:'utf8',timeout:30000}).split(/\s/)[0]!==expectedHead)throw Error('本機／遠端HEAD與預期不符');
   if(digest(await readFile(ledgerPath))!==option('--expect-ledger-sha'))throw Error('帳本SHA已改變');
  }
  validateLedger(ledger,{seeds,windows});
  let response={action:cmd,applied:false};
  if(cmd==='windows'){
   if(option('--ref')){const r=ledger.candidates[option('--ref')];if(!r)throw Error('找不到指定候選');response.window=storyPlaybackWindow(r,windows)}
   else {const ids=windows.topicPools.get(option('--topic'));if(!ids)throw Error('未知T主題');response.pools=ids.map(id=>{const p=windows.pools.get(id);return {...p,dates:[...p.dates]}})}
   response.scope='window-only; knowledge, roles and used story IDs require further checks';
  }else if(cmd==='status'){
   response.progress=ledgerProgress(ledger,{seeds,windows});
  }else if(cmd==='audit'){
   const problems=[];
   let versionsChecked=0;
   const validateDraft=(s,stage)=>validateStoryDraft(s,{stage,stateRulesVersion:Number(option('--state-rules-version')||3),seeds,topics,windows});
   for(const current of Object.values(ledger.candidates).filter(x=>['locked','revoked'].includes(x.status))){
    for(const row of [...(current.manuscriptVersions??[]).map(v=>({...current,...v})),current]){
    versionsChecked++;
    if(!row.manuscriptPath){problems.push({ref:row.draftRef,reason:'已鎖作品未記錄來源路徑'});continue}
    for(const [label,path,hash,extension] of [
     ['完整稿',row.manuscriptPath,row.manuscriptDigest,'.md'],
     ['內容審查紀錄',row.review.filePath,row.review.digest,'.json']
    ]){
     try{
      if(isAbsolute(path))throw Error('帳本證據須使用相對路徑');
      const bytes=await readFile(await evidencePath(path,extension));
      if(digest(bytes)!==hash)problems.push({ref:row.draftRef,reason:label+' SHA256不一致'});
      if(extension==='.md'){
       const parsed=extractDraftSummary(bytes.toString('utf8'));
       if(parsed.draftRef!==row.draftRef||parsed.seedId!==row.seedId||parsed.type!==row.type||
          parsed.topicId!==row.topicId||parsed.poolId!==row.poolId)throw Error('稿件識別、種子或T故事池與帳本不符');
      }
     }catch(e){problems.push({ref:row.draftRef,reason:label+'無法稽核：'+e.message})}
    }
   }
    if(current.manuscriptVersions?.length){
     try{
      const chain=[...current.manuscriptVersions,{...current,version:current.manuscriptVersion}];
      for(let i=1;i<chain.length;i++){
       const original=chain[i-1],latest=chain[i];
       const originalMarkdown=await readFile(await evidencePath(original.manuscriptPath,'.md'),'utf8'),originalReviewText=await readFile(await evidencePath(original.review.filePath,'.json'),'utf8');
       const markdown=await readFile(await evidencePath(latest.manuscriptPath,'.md'),'utf8'),reviewText=await readFile(await evidencePath(latest.review.filePath,'.json'),'utf8');
       validateStateRevision({...current,...original,status:'locked',manuscriptVersions:i>1?chain.slice(0,i-1):undefined}, {targetStateRulesVersion:latest.stateRulesVersion,originalMarkdown,originalReviewText,markdown,reviewText,manuscriptDigest:latest.manuscriptDigest,reviewDigest:latest.review.digest,expectedManuscriptDigest:original.manuscriptDigest,expectedReviewDigest:original.review.digest,manuscriptPath:latest.manuscriptPath,reviewFile:latest.review.filePath},(s,stage)=>validateStoryDraft(s,{stage,stateRulesVersion:latest.stateRulesVersion,seeds,topics,windows}));
      }
     }catch(e){problems.push({ref:current.draftRef,reason:'修訂鏈無法稽核：'+e.message})}
    }
   }
   response.audit={versionsChecked,pass:problems.length===0,lockedFilesChecked:Object.values(ledger.candidates).filter(x=>['locked','revoked'].includes(x.status)).length,problems};
   if(problems.length)process.exitCode=1;
  }else if(cmd==='available'){
   const taken=new Set(Object.values(ledger.candidates).filter(r=>['reserved','locked'].includes(r.status)).map(r=>r.seedId).filter(Boolean));
   const wanted=option('--seed');
   if(wanted){
    if(!seeds.has(wanted))throw Error('未知種子 '+wanted);
    response.seedId=wanted;response.codes=seeds.get(wanted);
    response.status=taken.has(wanted)?'occupied':'available';
    response.holder=Object.values(ledger.candidates).find(r=>['reserved','locked'].includes(r.status)&&r.seedId===wanted)?.draftRef||null;
   }else{
    response.available=seeds.size-taken.size;
    response.note='未指定種子時只回傳數量；請依故事四碼因果自行挑選，不自動占用或指派易寫的種子';
   }
  }else if(cmd==='duplicates'){
   const r=ledger.candidates[option('--ref')];if(!r)throw Error('找不到指定候選');
   response.possiblePairs=duplicateCandidates(r.summary,ledger,r.draftRef);
   response.warning='字面分數僅用於候選檢索，不代表已完成語意審查；零候選也不等於自動通過';
  }else if(mutating){
   const file=option('--file');
   const manuscriptPath=file?relative(root,resolve(file)).replaceAll('\\','/'):null;
   const markdownBytes=file?await readFile(['lock','revise-locked'].includes(cmd)?await evidencePath(manuscriptPath,'.md'):resolve(file)):null;
   const markdown=markdownBytes?.toString('utf8')??null;
   const reviewPath=option('--review')?relative(root,resolve(option('--review'))).replaceAll('\\','/'):null;
   const reviewBytes=['lock','revise-locked'].includes(cmd)&&reviewPath?await readFile(await evidencePath(reviewPath,'.json')):null;
   const review=reviewBytes?JSON.parse(reviewBytes.toString('utf8')):null;
   const validateDraft=(s,stage)=>validateStoryDraft(s,{stage,stateRulesVersion:Number(option('--state-rules-version')||3),seeds,topics,windows});
   const request={action:cmd,ref:option('--ref'),owner:option('--owner'),seedId:option('--seed'),
    targetStateRulesVersion:Number(option('--state-rules-version')||3),reason:option('--reason'),date:option('--date'),markdown,review,
    reviewFile:reviewPath,reviewDigest:reviewBytes?digest(reviewBytes):null,
    manuscriptPath,manuscriptDigest:markdownBytes?digest(markdownBytes):null};
   if(cmd==='revise-locked'){
    const current=ledger.candidates[request.ref];if(!current)throw Error('找不到原稿');
    request.originalMarkdown=await readFile(await evidencePath(current.manuscriptPath,'.md'),'utf8');
    request.originalReviewText=await readFile(await evidencePath(current.review.filePath,'.json'),'utf8');
    request.reviewText=reviewBytes?.toString('utf8');
    request.expectedManuscriptDigest=option('--expect-manuscript-sha');request.expectedReviewDigest=option('--expect-review-sha');
    const used=new Set(Object.values(ledger.candidates).flatMap(r=>[r,...(r.manuscriptVersions??[])].flatMap(v=>[v.manuscriptPath,v.review?.filePath])));
    if(used.has(request.manuscriptPath)||used.has(request.reviewFile))throw Error('新版路徑已被歷史或其他稿件使用');
   }
   const result=changeProductionLedger(ledger,request,{seeds,windows,validateDraft});
   response.change=result.change;response.progress=ledgerProgress(result.ledger,{seeds,windows});
   if(has('--apply')){
    const tmp=ledgerPath+'.tmp-'+process.pid;
    try{await writeFile(tmp,JSON.stringify(result.ledger,null,2)+'\n',{encoding:'utf8',flag:'wx'});await rename(tmp,ledgerPath)}
    catch(e){await rm(tmp,{force:true});throw e}
    response.applied=true;
   }else{
    if(cmd==='lock')response.change.storyId=null;
    response.note='預覽成功，帳本沒有修改；需加入 --apply --expect-revision '+ledger.revision+' 才寫入';
   }
  }else throw Error('未知命令：'+cmd);
  console.log(JSON.stringify(response,null,2));
  if(option('--json')){
   const target=resolve(option('--json'));await mkdir(dirname(target),{recursive:true});await writeFile(target,JSON.stringify(response,null,2)+'\n',{encoding:'utf8',flag:'wx'});
  }
 }catch(e){console.error('PRODUCTION_LEDGER: '+e.message);process.exitCode=1}
 finally{if(lockHandle){await lockHandle.close();await rm(lockPath,{force:true})}}
}
