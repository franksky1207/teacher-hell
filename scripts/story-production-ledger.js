import {calendarDay,gradeAt,SENIOR_CALENDAR_VERSION} from '../src/calendar/calendar.js';
/** 17D isolated production ledger V1; immutable 2400 seed source is external.
 * No game runtime hooks. Tool decisions != narrative quality certification.
 */
const TAGS=Array.from({length:11},(_,i)=>'G'+String(i+1).padStart(2,'0'));
const ID_PLACEHOLDER='【待驗收鎖定後由管理端配號】';
const draftIdPattern=/^[A-Za-z][A-Za-z0-9_-]{2,63}$/;
const otherIdPattern=/^(?:S\d{4}|T[1-6]-\d+|G-\d{4,})$/i;
const SCHEMA=1,MAX_T=648,MAX_G=1752;
const normalize=x=>String(x??'').normalize('NFKC').toLowerCase().replace(/[\s\p{P}\p{S}]+/gu,'');
const trim=x=>String(x??'').trim();
const cells=line=>/^\|.*\|\s*$/.test(line.trim())?line.trim().slice(1,-1).split('|').map(x=>trim(x).replaceAll(String.fromCharCode(96),'')):null;
export const initialProductionLedger=()=>({schemaVersion:SCHEMA,revision:0,candidates:{},history:[]});
export function extractDraftSummary(markdown){
 const heads=[...markdown.matchAll(/^## ([1-5])｜/gm)],sections=new Map();
 for(let i=0;i<heads.length;i++)sections.set(Number(heads[i][1]),markdown.slice(heads[i].index,heads[i+1]?.index??markdown.length));
 const info=new Map();
 for(const line of (sections.get(1)||'').split('\n')){
  const row=cells(line),m=row?.[0].match(/^([a-z_]+)｜/);
  if(m)info.set(m[1],row[1]);
 }
 const summary={};
 for(const name of ['事件起因','核心衝突','導師困境','故事獨特性']){
  const value=(sections.get(2)||'').split('\n').map(cells).find(x=>x?.[0]===name)?.[1];
  if(!value||/[【】]/.test(value))throw Error('摘要欄位缺漏：'+name);
  summary[name]=value;
 }
 const tags=trim(info.get('tags')).split(/[、，,\s;/／]+/).filter(Boolean);
 if(!tags.length||new Set(tags).size!==tags.length||tags.some(x=>!TAGS.includes(x)))throw Error('無效的G01～G11多標籤');
 const type=info.get('event_type'),topicId=info.get('t_topic_id');
 if(!['T','G'].includes(type))throw Error('無效T/G分類');
 const draftRef=info.get('draft_ref');
 if(!draftIdPattern.test(draftRef??''))throw Error('草稿識別碼不合法');
 const section3=sections.get(3)||'';
 return {draftRef,type,topicId:type==='T'?topicId:null,poolId:type==='T'?info.get('required_window'):null,tags,summary,
  seedId:section3.match(/^\s*-\s*\*\*種子ID\*\*：\s*(S\d{4})/m)?.[1]??null,
  storyId:info.get('story_id')||null};
}
export function readTopicWindows(source){
 const map=new Map(),dayTopics=new Map(),pools=new Map(),topicPools=new Map();
 const date=s=>{const m=s.trim().match(/^(?:(\d{4})\/)?(?:(\d{1,2})\/)?(\d{1,2})$/);return m?m.slice(1).map(v=>v?+v:null):null};
 const stamp=(y,m,d)=>{
  if(!y||!m||!d)return null;
  const dt=new Date(Date.UTC(y,m-1,d));
  return dt.getUTCFullYear()===y&&dt.getUTCMonth()+1===m&&dt.getUTCDate()===d?dt.toISOString().slice(0,10):null;
 };
 for(const line of source.split(/\r?\n/)){
  const row=cells(line),m=row?.[0].match(/^\*\*(T[1-6]-\d+)\*\*$/);if(!m)continue;
  if(map.has(m[1]))throw Error('重複T主題：'+m[1]);
  const spec=row[2],set=new Set();let y=null,mon=null;
  for(const chunk of spec.split('、')){
   const [begin,end]=chunk.split('～').map(x=>date(x));
   if(!begin)throw Error('無法解析T日期：'+chunk);
   y=begin[0]??y;mon=begin[1]??mon;
   const from=stamp(y,mon,begin[2]);if(!from)throw Error('無效T日期：'+chunk);
   let to=from;
   if(end){const ey=end[0]??y,em=end[1]??mon;to=stamp(ey,em,end[2]);if(!to||to<from)throw Error('無效T日期範圍：'+chunk);y=ey;mon=em}
   for(let t=Date.parse(from+'T00:00:00Z');t<=Date.parse(to+'T00:00:00Z');t+=86400000){
    const day=new Date(t).toISOString().slice(0,10);set.add(day);
    const group=dayTopics.get(day)||new Set();group.add(m[1]);dayTopics.set(day,group);
   }
  }
  const [poolSpec,...flags]=(row[5]||'').split(';'),allowedFlags=['phase-unconfirmed','published-and-known'];
  if(flags.some(f=>!allowedFlags.includes(f)))throw Error('未知T窗口註記：'+m[1]);
  const dates=[...set],ids=[];let offset=0;
  for(const entry of poolSpec.split(',')){
   const part=entry.match(/^(before|after|single):([1-9]\d*)$/);
   if(!part)throw Error('缺少或無效T故事池註記：'+m[1]);
   const phase=part[1],count=Number(part[2]),id=m[1]+':'+phase;
   if(pools.has(id)||offset+count>dates.length)throw Error('T池別重複或超出日期：'+id);
   const pool={topicId:m[1],poolId:id,phase,dates:new Set(dates.slice(offset,offset+count)),
    phaseConfirmed:!flags.includes('phase-unconfirmed'),
    prerequisites:flags.includes('published-and-known')?['results-published','participant-informed']:[],sourceNotes:row[4]};
   pools.set(id,pool);ids.push(id);offset+=count;
  }
  if(offset!==dates.length||dates.length!==Number(row[3])||(ids.length>1&&ids.some(id=>id.endsWith(':single'))))throw Error('T故事池日期未完整分配：'+m[1]);
  topicPools.set(m[1],ids);
  map.set(m[1],set);
 }
 return {topics:map,days:dayTopics,pools,topicPools};
}
/** Resolve a pool from the sole Markdown source; never infer it from a quota day. */
export function resolveTopicPool(windows,topicId,poolId){
 const pool=windows.pools?.get(poolId);
 if(!pool||pool.topicId!==topicId)throw Error('T主題與故事池不符：'+topicId+' / '+poolId);
 return pool;
}
/** Read-only contract. Returned dates are pool dates, not a new capacity counter. */
export function storyPlaybackWindow(story,windows){
 if(story.type!=='T')throw Error('只有T故事有T播放窗口');
 const pool=resolveTopicPool(windows,story.topicId,story.poolId);
 if(!pool.dates.has(story.date))throw Error('T配額歸屬日不屬於故事池：'+story.date);
 return {...pool,dates:[...pool.dates],prerequisites:[...pool.prerequisites],quotaDate:story.date};
}
/** Window/calendar qualification only. It never approves knowledge, roles or repeat use. */
export function queryTWindowEligibility(story,{date,topicId,phase,grade},windows){
 const pool=storyPlaybackWindow(story,windows),reasons=[];
 if(topicId!==pool.topicId)reasons.push('topic-mismatch');
 if(phase!==pool.phase)reasons.push('phase-mismatch');
 if(!pool.dates.includes(date))reasons.push('outside-pool');
 const expectedGrade=Math.ceil(Number(pool.topicId[1])/2);
 if(grade!==expectedGrade)reasons.push('grade-mismatch');
 try{
  const day=calendarDay(date,grade,SENIOR_CALENDAR_VERSION);
  if(gradeAt(date,2026)!==expectedGrade||!['school','summer-camp','winter-camp'].includes(day.kind)||day.exam||day.activities.length||day.holiday.length)reasons.push('calendar-forbidden');
 }catch{reasons.push('calendar-forbidden')}
 return {windowEligible:reasons.length===0,reasons,topicId:pool.topicId,poolId:pool.poolId,phase:pool.phase,
  quotaDate:pool.quotaDate,playableDates:pool.dates,
  requiredChecks:[...pool.prerequisites,...(!pool.phaseConfirmed?['phase-boundary-review']:[]),'roles-present-and-authorized','story-not-yet-triggered','story-specific-conditions'],
  scope:'window-and-calendar-only'};
}
function grams(s){const a=[...normalize(s)],out=new Set();for(let i=0;i<a.length-1;i++)out.add(a[i]+a[i+1]);return out}
function dice(a,b){const A=grams(a),B=grams(b);if(!A.size||!B.size)return 0;let n=0;for(const v of A)if(B.has(v))n++;return 2*n/(A.size+B.size)}
const fields=['事件起因','核心衝突','導師困境'];
export function duplicateCandidates(summary,ledger,exclude=null){
 const result=[];
 for(const record of Object.values(ledger.candidates)){
  if(record.draftRef===exclude||['rejected','revoked'].includes(record.status))continue;
  const exact=fields.every(k=>normalize(summary[k])===normalize(record.summary[k]));
  const scores=fields.map(k=>dice(summary[k],record.summary[k]));
  const score=Number(((scores[0]+scores[1]+scores[2])/3).toFixed(3));
  // Candidates are hints only; neither low score nor zero hits means semantic approval.
  if(exact||scores.some(x=>x>0))result.push({ref:record.draftRef,status:record.status,type:record.type,
   exact,score,fieldScores:scores.map(n=>Number(n.toFixed(3))),summary:record.summary});
 }
 return result.sort((a,b)=>Number(b.exact)-Number(a.exact)||b.score-a.score||a.ref.localeCompare(b.ref));
}
export function validateLedger(ledger,{seeds,windows}){
 if(!ledger||ledger.schemaVersion!==SCHEMA||!Number.isSafeInteger(ledger.revision)||ledger.revision<0||
 !ledger.candidates||typeof ledger.candidates!=='object'||!Array.isArray(ledger.history))throw Error('帳本結構無效');
 const seedOwners=new Map(),storyIds=new Set(),dates=new Map();
 let T=0,G=0,GEntries=0;
 for(const [key,r] of Object.entries(ledger.candidates)){
  if(!draftIdPattern.test(key)||otherIdPattern.test(key)||/^(?:SAMPLE|TEST)[-_]/i.test(key)||key!==r.draftRef||!['proposed','reserved','locked','rejected','revoked'].includes(r.status)||!['T','G'].includes(r.type)||
  !Array.isArray(r.tags)||!r.tags.length||r.tags.some(t=>!TAGS.includes(t)))throw Error('帳本候選資料錯誤：'+key);
  if(r.type==='T'){try{storyPlaybackWindow(r,windows)}catch(e){throw Error('帳本T窗口不合法：'+key+' '+e.message)}}
  if(r.type==='G'&&(r.topicId!==null||r.date!==null||r.poolId!=null))throw Error('G不應有T日期：'+key);
  if(r.status==='reserved'||r.status==='locked'){
   if(!seeds.has(r.seedId))throw Error('帳本出現未知種子：'+key);
   if(seedOwners.has(r.seedId))throw Error('種子重複占用：'+r.seedId);
   seedOwners.set(r.seedId,key);
  }else if(r.status!=='revoked'&&r.seedId!==null)throw Error('未暫用項目卻持有種子：'+key);
  if(r.type==='G'&&!['rejected','revoked'].includes(r.status))GEntries++;
  if(!['locked','revoked'].includes(r.status)&&r.storyId!=null)throw Error('未鎖定候選不得持有正式故事ID：'+key);
  if(['locked','revoked'].includes(r.status)){
   if(r.status==='revoked'&&(!r.revocation||!Number.isSafeInteger(r.revocation.revision)||r.revocation.revision<1||trim(r.revocation.reason).length<12||!seeds.has(r.seedId)))throw Error('撤銷作品缺少原因、原種子或修訂紀錄：'+key);
   if(!r.storyId||storyIds.has(r.storyId)||!/^[a-f0-9]{64}$/.test(r.manuscriptDigest??'')||!trim(r.manuscriptPath)||!r.review||!/^[a-f0-9]{64}$/.test(r.review.digest??'')||!trim(r.review.filePath))throw Error('正式故事缺ID、稿件或審查檔案的路徑／SHA256：'+key);
   if(!new RegExp(r.type==='G'?'^G-\\d{4,}$':'^'+r.topicId.split('-')[0]+'-\\d{3,}$').test(r.storyId))throw Error('正式故事ID類型錯誤：'+key);
   storyIds.add(r.storyId);
   if(r.status==='locked'){
    if(r.type==='T'){T++;dates.set(r.date,(dates.get(r.date)||0)+1)}
    else G++;
   }
  }
 }
 if(T>MAX_T||G>MAX_G||[...dates.values()].some(n=>n>6))throw Error('T／G或T單日超出配額');
 if(GEntries>0&&T!==MAX_T)throw Error('T648未完成前不得登記或鎖定G');
 return {T,G,usedSeeds:seedOwners.size,lockedIds:storyIds.size,days:dates};
}
export function ledgerProgress(ledger,{seeds,windows}){
 const {T,G,usedSeeds}=validateLedger(ledger,{seeds,windows});
 const byTag=Object.fromEntries(TAGS.map(t=>[t,0]));
 const stats={proposed:0,reserved:0,rejected:0,locked:0,revoked:0};
 const unused=seeds.size-usedSeeds;
 for(const r of Object.values(ledger.candidates)){
  stats[r.status]++;
  if(r.status==='locked')for(const tag of new Set(r.tags))byTag[tag]++;
 }
 const totalHits=Object.values(byTag).reduce((a,b)=>a+b,0);
 return {revision:ledger.revision,stats,targets:{T:MAX_T,G:MAX_G,total:MAX_T+MAX_G},
  locked:{T,G,total:T+G},seedStatus:{total:seeds.size,unused,reserved:stats.reserved,locked:stats.locked},
  tagOccurrences:totalHits,tagCounts:byTag,tagPercent:Object.fromEntries(TAGS.map(k=>[k,totalHits?Number((byTag[k]*100/totalHits).toFixed(3)):null])),
  remainingT:MAX_T-T,remainingG:MAX_G-G};
}
function reviewEvidence(review,choiceFlags){
 if(!review||review.verdict!=='approved'||typeof review.reviewer!=='string'||!review.reviewer.trim())throw Error('缺少明確內容審查核准者');
 for(const name of ['storyAndRoles','fourCodes','fourChoices','eightResults','causal32','timeAndLaw','duplicates']){
  if(typeof review[name]!=='string'||trim(review[name]).length<16)throw Error('內容審查證據不足：'+name);
 }
 if(review.isFixture===true||review.isTest===true)throw Error('試作不得鎖定');
 const selection=review.ordinaryChoiceSelection,fail=detail=>{throw Error('六選三審查紀錄：'+detail)};
 if(!selection||typeof selection!=='object'||Array.isArray(selection))fail('缺少ordinaryChoiceSelection');
 const {ordinaryCandidates:candidates,selectedIds:ids,finalChoiceMap:map}=selection;
 if(!Array.isArray(candidates)||candidates.length!==6)fail('必須六個普通候選');
 const legal=id=>Number.isInteger(id)&&id>=1&&id<=6;
 if(candidates.some(c=>!c||!legal(c.id)||typeof c.action!=='string'||!c.action.trim())||new Set(candidates.map(c=>c.id)).size!==6)fail('候選ID須1～6各一次且行動非空字串');
 if(!Array.isArray(ids)||ids.length!==3||ids.some(id=>!legal(id))||new Set(ids).size!==3)fail('中選須三個不同合法ID');
 if(!map||typeof map!=='object'||Array.isArray(map)||Object.keys(map).sort().join()!=='A,B,C,D')fail('最終映射須恰好A～D');
 const values=Object.values(map),ordinary=values.filter(v=>v!=='emotional');
 if(values.filter(v=>v==='emotional').length!==1||ordinary.length!==3||new Set(ordinary).size!==3||ordinary.some(v=>!ids.includes(v)))fail('映射須一情緒及三中選ID各一次');
 if(!choiceFlags||Object.keys(choiceFlags).sort().join()!=='A,B,C,D'||Object.keys(map).some(id=>choiceFlags[id]!== (map[id]==='emotional')))fail('映射與正文情緒標記不一致');

}
function storyIdFor(type,ledger,topicId){
 const prefix=type==='G'?'G':topicId.split('-')[0],pattern=new RegExp('^'+prefix+'-(\\d+)$');
 const used=Object.values(ledger.candidates).filter(r=>['locked','revoked'].includes(r.status)).map(r=>r.storyId).filter(Boolean);
 let top=0;for(const id of used){const m=id.match(pattern);if(m)top=Math.max(top,+m[1])}
 return prefix+'-'+String(top+1).padStart(type==='G'?4:3,'0');
}
export function changeProductionLedger(ledger,request,{seeds,windows,validateDraft,readReview}){
 const before=validateLedger(ledger,{seeds,windows}),next=JSON.parse(JSON.stringify(ledger));
 const {action,ref,owner}=request;
 if(!['propose','reserve','release','revise','reject','lock','revoke'].includes(action))throw Error('不支援的管理動作');
 if(!draftIdPattern.test(ref??''))throw Error('候選ID格式錯誤');
 if(action==='propose'&&/^(SAMPLE|TEST)[-_]/i.test(ref))throw Error('試作草稿不得進正式量產帳本');
 if(otherIdPattern.test(ref))throw Error('候選ID不得使用種子、T主題或正式故事ID');
 const prior=Object.hasOwn(next.candidates,ref)?next.candidates[ref]:null;
 let similar=[];
 const expectedOwner=trim(owner);
 if(action==='propose'){
  if(prior)throw Error('草稿ID已存在');
  if(!expectedOwner)throw Error('必須提供創作AI／負責者識別');
  const parsed=extractDraftSummary(request.markdown);
  if(parsed.storyId!==ID_PLACEHOLDER)throw Error('正式故事ID必須由管理器在鎖定時配號');
  if(parsed.draftRef!==ref)throw Error('稿內draft_ref與命令識別不一致');
  const check=validateDraft(request.markdown,'summary');
  if(!check.mechanicalPass)throw Error('摘要機械檢查不通過：'+JSON.stringify(check.errors));
  if(parsed.type==='T'){
   const pool=resolveTopicPool(windows,parsed.topicId,parsed.poolId);
   if(!pool.dates.has(request.date))throw Error('T主題、故事池與指定配額日期不符');
  }else if(request.date)throw Error('G不應指定T日期');
  if(parsed.type==='G'&&before.T!==MAX_T)throw Error('T648未完成前不得建立G量產候選');
  similar=duplicateCandidates(parsed.summary,next);
  if(similar.some(x=>x.exact))throw Error('已存在三欄完全相同的故事摘要');
  next.candidates[ref]={draftRef:ref,owner:expectedOwner,status:'proposed',type:parsed.type,
   topicId:parsed.topicId,poolId:parsed.poolId,date:parsed.type==='T'?request.date:null,tags:parsed.tags,summary:parsed.summary,
   seedId:null,storyId:null,manuscriptDigest:null,attempts:0,reason:null};
 }else{
  if(!prior)throw Error('找不到草稿ID：'+ref);
  if(prior.owner!==expectedOwner)throw Error('只能由原登記負責者操作，跨AI需先交接');
  if(action==='revoke'){
   if(prior.status!=='locked')throw Error('只有已鎖定作品可以撤銷');
   if(trim(request.reason).length<12)throw Error('撤銷須附具體事實及審查原因');
   prior.status='revoked';
   prior.revocation={revision:next.revision+1,reason:trim(request.reason)};
  }else if(prior.status==='locked')throw Error('已鎖定作品不可退還、改寫或重新占用');
  if(prior.status==='rejected')throw Error('已退件候選不可再修改，須使用新draft_ref');
  if(prior.status==='revoked'&&action!=='revoke')throw Error('已撤銷作品不可再修改或重新鎖定');
  if(action==='reserve'){
   if(prior.status!=='proposed')throw Error('只能對尚未暫用的候選領取種子');
   if(!seeds.has(request.seedId))throw Error('種子不在固定2400組');
   if(Object.values(next.candidates).some(r=>['reserved','locked'].includes(r.status)&&r.seedId===request.seedId))throw Error('種子已被暫用或鎖定');
   if(trim(request.reason).length<12)throw Error('暫用種子須附故事四碼相容性理由');
   prior.seedId=request.seedId;prior.status='reserved';prior.attempts++;prior.reason=request.reason;
  }else if(action==='release'||action==='reject'){
   if(trim(request.reason).length<8)throw Error('退還或退件須記錄實際原因');
   if(action==='release'&&prior.status!=='reserved')throw Error('只有暫用中的種子可退還');
   prior.status=action==='release'?'proposed':'rejected';prior.seedId=null;prior.reason=request.reason;
  }else if(action==='revise'){
   const parsed=extractDraftSummary(request.markdown);
   if(parsed.storyId!==ID_PLACEHOLDER)throw Error('正式故事ID必須由管理器在鎖定時配號');
   if(parsed.draftRef!==ref||parsed.type!==prior.type||parsed.topicId!==prior.topicId||parsed.poolId!==prior.poolId)throw Error('修訂不得改識別／T-G／T主題／故事池');
   const check=validateDraft(request.markdown,'summary');
   if(!check.mechanicalPass)throw Error('修訂摘要檢查未通過：'+JSON.stringify(check.errors));
   if(prior.status==='reserved'&&parsed.seedId&&parsed.seedId!==prior.seedId)throw Error('修訂稿種子與占用種子不同');
   similar=duplicateCandidates(parsed.summary,next,ref);
   if(similar.some(x=>x.exact))throw Error('與既有故事三欄完全相同');
   prior.summary=parsed.summary;prior.tags=parsed.tags;prior.reason=trim(request.reason)||'摘要修訂';
  }else if(action==='lock'){
   if(prior.status!=='reserved')throw Error('只有已暫用種子的故事才能鎖定');
   if(!request.markdown||!/^[a-f0-9]{64}$/.test(request.manuscriptDigest??'')||!trim(request.manuscriptPath)||!/^[a-f0-9]{64}$/.test(request.reviewDigest??'')||!trim(request.reviewFile))throw Error('鎖定須附完整Markdown、內容審查JSON、兩個檔案位置及SHA256');
   if(/\b(?:SAMPLE|TEST)[-_]/i.test(request.markdown.match(/^\|\s*.?draft_ref.?｜[^|]*\|\s*([^|]*)/m)?.[1]??''))throw Error('試作標記不可鎖定');
   const parsed=extractDraftSummary(request.markdown);
   if(parsed.storyId!==ID_PLACEHOLDER)throw Error('正式故事ID必須由管理器在鎖定時配號');
   if(parsed.draftRef!==ref||parsed.type!==prior.type||parsed.topicId!==prior.topicId||parsed.poolId!==prior.poolId||
   parsed.seedId!==prior.seedId||JSON.stringify(parsed.tags)!==JSON.stringify(prior.tags)||
   fields.some(k=>normalize(parsed.summary[k])!==normalize(prior.summary[k])))throw Error('稿件與登記內容不同，請先修訂摘要與標籤');
   const result=validateDraft(request.markdown,'full');
   if(!result.mechanicalPass)throw Error('完整稿機械驗收未通過：'+JSON.stringify(result.errors));
   reviewEvidence(request.review,result.details?.choiceFlags);
   similar=duplicateCandidates(parsed.summary,next,ref);
   if(similar.some(x=>x.exact))throw Error('跨T/G既有摘要重複');
   if(prior.type==='T'){
    if(before.T>=MAX_T)throw Error('T648已滿');
    if((before.days.get(prior.date)||0)>=6)throw Error('T日期六篇配額已滿');
   }else if(before.T!==MAX_T||before.G>=MAX_G)throw Error('須完成T648後才鎖G，且G最多1752篇');
   prior.status='locked';prior.storyId=storyIdFor(prior.type,next,prior.topicId);
   prior.manuscriptDigest=request.manuscriptDigest;
   prior.manuscriptPath=request.manuscriptPath||null;
   prior.review={reviewer:request.review.reviewer,verdict:'approved',filePath:request.reviewFile,digest:request.reviewDigest,possibleDuplicateCount:similar.length};
   prior.reason='內容及機械驗收後鎖定';
  }
 }
 const r=next.candidates[ref];
 next.revision++;
 next.history.push({revision:next.revision,action,ref,owner:expectedOwner,
   seedId:r.seedId,storyId:r.storyId,reason:trim(request.reason)||null});
 validateLedger(next,{seeds,windows});
 return {ledger:next,change:{action,ref,status:r.status,seedId:r.seedId,storyId:r.storyId,
  similarCount:similar.length,similarCandidatesPreview:similar.slice(0,10).map(x=>({ref:x.ref,status:x.status,exact:x.exact,score:x.score})),
  note:similar.length>10?'這裡只顯示前10組候選；使用duplicates命令可查看完整比對結果，並非只檢查前10組':null}};
}
