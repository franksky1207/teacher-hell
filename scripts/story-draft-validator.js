import {compileStoryPreview,storySlotRows,storySlotIdentity,storySlotKind,storyMusicFromMarkdown} from '../src/runtime/story-preview-content.js';
import {resolveTopicPool} from './story-production-ledger.js';
/** 17D Markdown V1 draft checker. Read-only: not a game engine or approval. */
const personal=new Set('1-1 1-2 1-3 1-4 2-1 2-2 2-3 2-4 3-1 3-2 3-3 3-4 4-1 4-2 4-3 4-4 6-1 6-2 6-3 6-4 7-1 7-2 7-3 7-4 8-3 8-4 11-1 11-2'.split(' '));
const relationship=new Set('5-1 5-2 5-3 5-4 8-1 8-2 9-1 9-2 10-1 10-2 10-3 10-4 11-3 11-4 12-1 12-2 12-3 12-4'.split(' '));
const clean=x=>String(x??'').trim().replaceAll(String.fromCharCode(96),'');
const unfilled=x=>!clean(x)||/【|】|待填/.test(clean(x));
const rows=s=>s.split(/\r?\n/).filter(x=>/^\s*\|.*\|\s*$/.test(x)).map(x=>x.trim().slice(1,-1).split('|').map(clean));
const named=(s,k)=>{const v=s.split(/\r?\n/).find(x=>x.includes('**'+k+'**'));return v?clean(v.slice(v.indexOf('：')+1)):''};
function holderType(description){
 if(/其他班|其他年級|校外|無數值|臨時|私人/.test(description))return null;
 const identity=storySlotIdentity(description);
 const kind=storySlotKind(identity);
 if(kind==='student')return /本班學生|導師班學生/.test(identity)?kind:null;
 if(/本班規範任課|實際參與導師班規範/.test(identity))return 'class_staff';
 return kind;
}
const eligible=(role,c)=>role==='student'?personal.has(c)||relationship.has(c)||['9-3','9-4'].includes(c):role==='teacher'?personal.has(c)||['9-3','9-4'].includes(c):role==='guardian'?personal.has(c)||relationship.has(c):role==='class_staff'?personal.has(c)||relationship.has(c)||c==='9-4':role==='staff'?personal.has(c)||(relationship.has(c)&&c!=='9-1')||c==='9-4':false;
export function seedCodesFromMarkdown(s){const result=new Map();for(const l of s.split(/\r?\n/)){const m=l.match(/^\|\s*(S\d{4})\s*\|\s*(\d{1,2}-[1-4])\s*\|\s*(\d{1,2}-[1-4])\s*\|\s*(\d{1,2}-[1-4])\s*\|\s*(\d{1,2}-[1-4])\s*\|/);if(m)result.set(m[1],m.slice(2,6))}return result}
export function topicIdsFromMarkdown(s){return new Set([...s.matchAll(/^\|\s*\*\*(T[1-6]-\d+)\*\*\s*\|/gm)].map(m=>m[1]))}
export function validateStoryDraft(md,{stage='full',seeds=new Map(),topics=new Set(),windows}={}){
 if(!['summary','choices','full'].includes(stage))throw Error('stage must be summary, choices or full');
 const errors=[],warnings=[],fail=(code,detail)=>errors.push({code,detail});
 const headings=[...md.matchAll(/^ {0,3}##[ \t]+([0-9０-９]+)[ \t]*[｜|]([^\r\n]*)/gm)],sec=new Map();
 for(let i=0;i<headings.length;i++){
  const heading=headings[i],id=heading[1],title=heading[2];
  if(!/^[1-5]$/.test(id)){fail('section_id','非法故事區塊編號：'+id);continue;}
  if(!heading[0].startsWith('## '+id+'｜'))fail('section_format','第'+id+'區標題須使用範本格式');
  if(unfilled(title))fail('section_title','第'+id+'區標題未完成');
  if(sec.has(Number(id)))fail('section_duplicate','重複第'+id+'區');
  sec.set(Number(id),md.slice(heading.index,headings[i+1]?.index??md.length));
 }
 const needed=stage==='summary'?[1,2]:stage==='choices'?[1,2,3,4]:[1,2,3,4,5];
 for(const n of needed)if(!sec.has(n))fail('section','缺少第'+n+'區塊');
 const one=sec.get(1)||'',two=sec.get(2)||'',three=sec.get(3)||'',four=sec.get(4)||'',five=sec.get(5)||'';
 const data=new Map();
 for(const r of rows(one)){const key=r[0].match(/^([a-z_]+)｜/);if(key){if(data.has(key[1]))fail('metadata_duplicate',key[1]+' 重複');if(r.length!==2)fail('metadata_format',key[1]+' 欄數錯誤');data.set(key[1],r[1])}}
 for(const k of ['draft_ref','event_type','t_topic_id','tags','required_window','required_conditions'])if(unfilled(data.get(k)))fail('metadata',k+' 尚未完成');
 if(!/^[A-Za-z][A-Za-z0-9_-]{2,63}$/.test(data.get('draft_ref')||''))fail('draft_ref','稿件暫識別格式錯誤');
 if(!data.has('story_id')||!clean(data.get('story_id'))||(unfilled(data.get('story_id'))&&data.get('story_id')!=='【待驗收鎖定後由管理端配號】'))fail('story_id','正式ID必填合法ID或配號占位');
 const type=data.get('event_type');
 if(type&&!unfilled(type)&&!['T','G'].includes(type))fail('type','僅接受T或G');
 const tags=clean(data.get('tags')).split(/[、，,;\s／/]+/).filter(Boolean);
 if(!unfilled(data.get('tags'))&&(!tags.length||new Set(tags).size!==tags.length||tags.some(x=>!/^G(0[1-9]|1[01])$/.test(x))))fail('tags','G01～G11標籤格式／重複錯誤');
 const topic=data.get('t_topic_id'),window=data.get('required_window'),storyId=data.get('story_id');
 if(storyId&&!unfilled(storyId)){const valid=type==='G'?/^G-\d{4,}$/.test(storyId):type==='T'?/^T[1-6]-\d{3,}$/.test(storyId):false;if(!valid)fail('story_id','正式故事ID與T/G類型不符');}
 if(type==='T'&&(!/^T[1-6]-\d+$/.test(topic||'')||!topics.has(topic)||unfilled(window)||window==='無'))fail('topic','T必須填合法T主題及窗口');
 if(type==='G'&&topic!=='無')fail('topic','G的T主題應填無');
 if(type==='T'){
  if(!windows)fail('window','缺少正式T故事池來源');
  else try{resolveTopicPool(windows,topic,window)}catch(e){fail('window',e.message)}
 }
 if(type==='G'&&/^T[1-6]-\d+:/.test(window||''))fail('window','G不能指定T故事池');
 for(const k of ['事件起因','核心衝突','導師困境','故事獨特性']){const found=rows(two).filter(r=>r[0]===k);if(found.length!==1||found[0]?.length!==2||unfilled(found[0]?.[1]))fail('summary',k+' 缺少、重複或格式錯誤');}
 let fourCodes=[],slots=new Map(),sid=null,choiceFlags=null;
 if(stage!=='summary'){
  sid=named(three,'種子ID').match(/^S\d{4}$/)?.[0];
  if(!seeds.has(sid))fail('seed','種子ID不在正式表');
  fourCodes=named(three,'本篇四碼').split(/[／/,，、]/).map(clean).filter(Boolean);
  if(fourCodes.length!==4||new Set(fourCodes).size!==4||fourCodes.some(c=>!/^(?:[1-9]|1[0-2])-[1-4]$/.test(c)))fail('codes','需填4個不同合法碼');
  if(seeds.has(sid)&&fourCodes.slice().sort().join()!==seeds.get(sid).slice().sort().join())fail('seed_mismatch','種子ID與四碼不一致');
  if(!['偏正向','偏負向'].includes(named(three,'選角方向')))fail('direction','請選偏正向／偏負向');
  for(const r of storySlotRows(three)){
   if(r.length!==4||!/^[a-z][a-z0-9_]*$/.test(r[0])||r[0]==='teacher'){fail('slot_format',r[0]+' 槽位格式錯誤');continue;}
   if(slots.has(r[0]))fail('slot_duplicate',r[0]+' 重複');
   const role=holderType(r[1]);if(!role)fail('slot_type',r[0]+' 資格類別不明');
   if(r.slice(1).some(unfilled))fail('slot_incomplete',r[0]+' 資格資訊不足');
   for(const c of fourCodes)if(!eligible(role,c))fail('slot_eligibility',r[0]+' 未完整持有四碼：'+c);
   slots.set(r[0],role);
  }
  if(unfilled(named(three,'無數值情境角色')))fail('context','情境角色必須填描述或無');
  const causePart=three.split('- **四碼的必要因果用途**')[1]||'',seen=new Set();
  for(const r of rows(causePart)){
   if(r[0]==='種子碼'||r.every(c=>/^:?-+:?$/.test(c)))continue;
   if(r.length!==3||!/^\d{1,2}-[1-4]$/.test(r[0])){fail('cause_format',r[0]+' 因果表格式錯誤');continue;}
   if(seen.has(r[0]))fail('cause_duplicate',r[0]+' 重複');seen.add(r[0]);
   if(!fourCodes.includes(r[0]))fail('cause_code',r[0]+' 不在種子中');
   if(unfilled(r[2]))fail('cause_missing',r[0]+' 缺少因果作用');
   const actors=r[1].split(/[、，,;\s／/]+/).filter(Boolean);
   if(!actors.length)fail('cause_holder',r[0]+' 無合法持有者');
   for(const a of actors){
    if(a!=='teacher'&&!slots.has(a))fail('cause_holder',a+' 槽位未建立');
    else if(!eligible(a==='teacher'?'teacher':slots.get(a),r[0]))fail('cause_eligibility',a+' 不能持有 '+r[0]);
   }
  }
  for(const c of fourCodes)if(!seen.has(c))fail('cause_missing',c+' 無因果說明');
  const opening=four.split('### 開場')[1]?.split('### 四個最終教師選項')[0]||'';
  if(!/^\s*-\s*\*\*P\d{2}｜/m.test(opening)||/【|】|待填/.test(opening))fail('opening','開場頁面未完成');
  const pages=[...opening.matchAll(/^\s*-\s*\*\*P(\d{2})｜([^\n]*?)\*\*：([^\n]*)/gm)],pageIds=new Set();
  for(const [,id,speaker,text] of pages){if(pageIds.has(id))fail('opening_duplicate','P'+id+' 重複');pageIds.add(id);if(unfilled(speaker)||unfilled(text))fail('opening','P'+id+' 未完成');}
  const optionPart=four.split('### 四個最終教師選項')[1]||'',choices=new Map();
  for(const r of rows(optionPart)){
   if(r[0]==='選項ID'||r.every(c=>/^:?-+:?$/.test(c)))continue;
   if(r.length!==5||!/^[A-D]$/.test(r[0])){fail('choice_format',r[0]+' 選項格式錯誤');continue;}
   if(choices.has(r[0]))fail('choice_duplicate',r[0]+' 重複');
   choices.set(r[0],r);
   if(r.slice(1).some(unfilled))fail('choice_blank',r[0]+' 有未填欄位');
   if(!['true','false'].includes(r[2]))fail('choice_flag',r[0]+' emotional只能true／false');
  }
  for(const id of 'ABCD')if(!choices.has(id))fail('choice_missing','缺少 '+id);
  if([...choices.values()].filter(x=>x[2]==='true').length!==1)fail('emotional','必須恰好一個情緒選項');
  choiceFlags=Object.fromEntries([...choices].map(([id,r])=>[id,r[2]==='true']));
  const labels=[...choices.values()].map(r=>r[1].replace(/\s/g,''));if(new Set(labels).size!==labels.length)fail('choice_same','有完全重複的選項文字');
  for(const [,slot] of four.matchAll(/{{\s*([a-z][a-z0-9_]*)\.[a-z_]+\s*}}/g))if(slot!=='teacher'&&!slots.has(slot))fail('placeholder','未知人物槽位 '+slot);
 }
 let resultCount=0,matrix=null,stateDistribution=null;
 if(stage==='full'){
  const stateNames=['體力','精神','熱忱','情緒'],stateRows=new Map();
  const markers=[...five.matchAll(/^### R(\d+)｜([^\n]*)/gm)],results=new Map(),total=new Map(),states=[0,0,0,0],texts=[];
  if(markers.length!==8)fail('result_count','必須恰好八個結果');
  const matrixPos=five.indexOf('### 四選項對八共用結果的權重');
  for(let i=0;i<markers.length;i++){
   const r=markers[i],n=+r[1],end=Math.min(markers[i+1]?.index??five.length,matrixPos<0?five.length:matrixPos);
   if(!/^[1-8]$/.test(r[1]))fail('result_id','非法結果ID R'+r[1]);
   if(results.has(n))fail('result_duplicate','R'+n+' 重複');
   results.set(n,five.slice(r.index,end));if(unfilled(r[2]))fail('result_title','R'+n+' 標題未填');
  }
  for(let n=1;n<=8;n++){
   const body=results.get(n);
   if(!body){fail('result_missing','缺少R'+n);continue}resultCount++;
   const content=named(body,'玩家可見結果'),fact=named(body,'客觀後果'),effects=named(body,'合法底層增減'),rawStates=named(body,'玩家四狀態');
   if(unfilled(content))fail('result_text','R'+n+' 結果未填');
   if(unfilled(fact))fail('result_fact','R'+n+' 客觀後果未填');
   texts.push(content.replace(/\s/g,''));
   if(unfilled(effects))fail('delta_empty','R'+n+' 底層增減未填');
   else if(effects!=='無'){
    const used=new Set();
    for(const value of effects.split(';').map(clean).filter(Boolean)){
     const m=value.match(/^([a-z][a-z0-9_]*):(\d{1,2}-[1-4]):([+-]?\d+)$/);
     if(!m){fail('delta_format','R'+n+' 格式錯誤 '+value);continue}
     const [,who,code,raw]=m,key=who+':'+code,d=Number(raw);
     if(used.has(key))fail('delta_duplicate','R'+n+' '+key+' 重複');used.add(key);
     if(!fourCodes.includes(code))fail('delta_code','R'+n+' '+code+' 非種子碼');
     if(who!=='teacher'&&!slots.has(who))fail('delta_holder','R'+n+' '+who+' 未建立');
     if(!eligible(who==='teacher'?'teacher':slots.get(who),code))fail('delta_eligibility','R'+n+' '+who+' 無資格 '+code);
     if(d<-8||d>8)fail('delta_range','R'+n+' '+key+' 超出−8～+8');
     total.set(key,(total.get(key)||0)+d);
    }
   }
   const q=rawStates.split(/[，,]/).map(clean);
   if(q.length!==4||q.some(v=>!/^[-+]?\d+$/.test(v)))fail('state_format','R'+n+' 必須填4個整數');
   else {
    const values=q.map(Number);
    if(values.some(d=>!Number.isSafeInteger(d))){fail('state_format','R'+n+' 必須填4個安全整數');continue;}
    stateRows.set('R'+n,values);
    if(values.filter(d=>d===0).length>1)fail('state_zero_row','R'+n+' 四狀態最多一個0');
    values.forEach((d,i)=>{states[i]+=d;if(d<-6||d>6)fail('state_range','R'+n+' '+stateNames[i]+' 超出−6～+6')});
   }
  }
  if(resultCount===8&&new Set(texts).size!==8)fail('result_same','八結果有完全相同文字');
  for(const [k,sum] of total)if(Math.abs(sum)>24)fail('delta_mean',k+' 八R等權平均超出−3～+3');
  const complete=stateRows.size===8;
  stateDistribution={complete,resultsParsed:stateRows.size,zeroTotal:0,zeroByResult:{},byState:{},absoluteCounts:Object.fromEntries(Array.from({length:7},(_,i)=>[i,0])),identicalGroups:[],identicalResultCount:0};
  const groups=new Map();
  for(const [id,values] of stateRows){
   const zeros=values.filter(d=>d===0).length;
   stateDistribution.zeroByResult[id]=zeros;stateDistribution.zeroTotal+=zeros;
   for(const d of values)if(Math.abs(d)<=6)stateDistribution.absoluteCounts[Math.abs(d)]++;
   const key=values.join(',');if(!groups.has(key))groups.set(key,[]);groups.get(key).push(id);
  }
  stateNames.forEach((name,i)=>{
   const values=[...stateRows.values()].map(row=>row[i]),zeros=values.filter(d=>d===0).length;
   stateDistribution.byState[name]={zeros,positive:values.filter(d=>d>0).length,negative:values.filter(d=>d<0).length,mean:complete?states[i]/8:null};
   // Incomplete matrices report partial counts, without derivative column/mean errors.
   if(complete&&zeros>2)fail('state_zero_column',name+' 八結果最多兩個0，目前'+zeros+'個');
   if(complete&&Math.abs(states[i])>16)fail('state_mean',name+' 八R等權平均超出−2～+2');
  });
  stateDistribution.identicalGroups=[...groups.values()].filter(ids=>ids.length>1);
  stateDistribution.identicalResultCount=stateDistribution.identicalGroups.reduce((sum,ids)=>sum+ids.length,0);
  if(complete&&stateDistribution.absoluteCounts[1]===32)warnings.push('四狀態32格全為±1，請審查幅度是否符合實際後果；此警示不影響通過。');
  if(complete&&stateDistribution.identicalResultCount)warnings.push('四狀態有完全相同排列：'+stateDistribution.identicalGroups.map(ids=>ids.join('、')).join('；')+'；須審查因果，非硬性配額。');
  const mat=five.split('### 四選項對八共用結果的權重')[1]||'',table=rows(mat);
  if(!table.some(r=>r[0]==='選項／結果'&&r.slice(1).join()==='R1,R2,R3,R4,R5,R6,R7,R8'))fail('matrix_header','結果順序須R1～R8');
  matrix=new Map();
  for(const r of table){
   if(r[0]==='選項／結果'||r.every(c=>/^:?-+:?$/.test(c)))continue;
   if(!/^[A-D]$/.test(r[0])){fail('matrix_id','非法矩陣列 '+r[0]);continue;}
   if(matrix.has(r[0]))fail('matrix_duplicate',r[0]+' 重複');
   if(r.length!==9||r.slice(1).some(v=>!['0','1','2','4'].includes(v))){fail('matrix_weight',r[0]+' 必須是8個0／1／2／4');continue}
   const ws=r.slice(1).map(Number);matrix.set(r[0],ws);
   if(!ws.some(x=>x>0))fail('matrix_unreachable',r[0]+' 無可達結果');
   if(ws.filter(x=>x===0).length>2)fail('matrix_row_zero',r[0]+' 超過2個0');
  }
  for(const a of 'ABCD')if(!matrix.has(a))fail('matrix_missing',a+' 列不存在');
  const zeros=[];
  if(matrix.size===4)for(let n=0;n<8;n++){
   const choices=[...matrix].filter(([,ws])=>ws[n]===0).map(([id])=>id);
   if(choices.length>1)fail('matrix_column_zero','R'+(n+1)+' 超過1個0');
   for(const c of choices)zeros.push(c+'→R'+(n+1));
  }
  const why=named(mat,'0權重因果理由');
  if(zeros.length&&unfilled(why))fail('zero_reason','必須說明所有0的理由');
  for(const item of zeros)if(!why.includes(item))fail('zero_reason','缺少 '+item+' 的理由');
  if(!zeros.length&&unfilled(why))fail('zero_reason','沒有0時填「無」');
  warnings.push('程式不判斷32組真實敘事因果、角色知情與跨批重複；須由同一創作AI另行檢查並留下證據。');
 }
 try{if(storyMusicFromMarkdown(md)===undefined&&stage==='full')warnings.push('尚未指定事件音樂');}
 catch(error){fail('music',error.message);}
 if(stage!=='summary'&&/^\s*```avg(?:\s|$)/m.test(md)){
  const opening=four.split('### 開場')[1]?.split('### 四個最終教師選項')[0]??'';
  const results=[...five.matchAll(/^### (R[1-8])｜([^\r\n]*)/gm)]
   .map(([,id,title])=>({id,title,text:''}));
  // At choices stage the results may not have been authored yet.
  const previewResults=stage==='full'?results:Array.from({length:8},(_,i)=>({id:'R'+(i+1),title:'',text:''}));
  try{compileStoryPreview({sourceMarkdown:md,opening,results:previewResults},slots);}
  catch(error){fail('avg_performance',error.message);}
 }
 return {stage,mechanicalPass:errors.length===0,errors,warnings,details:{stateRulesVersion:2,stateDistribution,choiceFlags,seedId:sid,resultsChecked:resultCount,matrix:matrix?Object.fromEntries(matrix):null}};
}
