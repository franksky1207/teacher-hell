function makeStory(plan,d){
  const bt=String.fromCharCode(96),id=plan.id,codes=plan.codes;
  const shuffled=items=>{let a=[...items];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
  if(d.normal.length!==6||d.results.length!==8||d.roles.length<1||d.roles.length>2||d.opening.length<2)throw Error('incomplete '+id);
  const pool=d.normal.map((a,i)=>({...a,id:i+1})),chosen=shuffled(pool).slice(0,3),choices=shuffled([...chosen,{...d.emotional,id:'emotional'}]),letters=['A','B','C','D'];
  const groups={A:[1,1,0,0,-1,-1,-2,-2],B:[2,0,-1,-1,-1,-1,-1,-1],C:[1,1,0,-1,-1,-1,-1,-2],D:[2,1,0,-1,-1,-1,-2,-2],E:[1,1,1,0,-1,-2,-2,-2]};
  let stats,selectedGroups,attempt=0;
  do{selectedGroups=shuffled(Object.keys(groups)).slice(0,4);const col=selectedGroups.map(k=>shuffled(groups[k]));stats=Array.from({length:8},(_,i)=>col.map(c=>c[i]));attempt++}while(stats.some(x=>x.filter(n=>n===0).length>2)&&attempt<10000);
  if(attempt>=10000)throw Error('stats cannot generate');
  const open={};
  const openLines=d.opening.map((p,i)=>{
    const key='P'+String(i+1).padStart(2,'0');const cue={};
    if(i===0){cue.scene=d.scene||'school:classroom';cue.enter=d.roles;cue.expression=Object.fromEntries(d.roles.map(role=>[role,'calm']))}
    if(p.expression)cue.expression={...(cue.expression||{}),[p.speaker||'student_a']:p.expression};
    open[key]=cue;
    return '- **'+key+'｜'+(p.speaker?'{{'+p.speaker+'.name}}':'旁白')+'**：'+p.text;
  });
  let avgResults={},resLines=[],resAudit=[],weights={};
  for(let i=0;i<8;i++){
    const r=d.results[i],rid='R'+(i+1);if(r.parts.length<2||r.parts.length>5)throw Error(id+rid+' invalid pages');
    for(const p of r.parts)if(!p.text||p.text.length<8||p.speaker&&!d.roles.includes(p.speaker))throw Error(id+rid+' invalid speaker/page');
    const text=r.parts.map(p=>p.text).join('');if(text.length<90)throw Error(id+rid+' short '+text.length);
    avgResults[rid]={pages:r.parts.map(p=>p.speaker?{text:p.text,speaker:p.speaker,presentation:'dialogue',expression:{[p.speaker]:p.expression||'calm'}}:{text:p.text,presentation:'narration'})};
    const delta=r.delta===0?'無':(r.role||'student_a')+':'+codes[r.codeIndex]+':'+(r.delta>0?'+':'')+r.delta;
    resLines.push('### '+rid+'｜'+r.title+'\n\n- **玩家可見結果**：'+text+'\n- **客觀後果**：'+r.consequence+'\n- **合法底層增減**：'+delta+'\n- **玩家四狀態**（精神、熱忱、情緒、掌控）：'+stats[i].join(',')+'\n');
    resAudit.push({id:rid,chars:text.length,delta,consequence:r.consequence,stats:stats[i]});
  }
  const weightLines=choices.map((c,i)=>{let w=d.results.map(r=>(r.support||[]).includes(c.id)?4:(r.hinder||[]).includes(c.id)?1:2);weights[letters[i]]=w;return '| '+letters[i]+' | '+w.join(' | ')+' |'});
  const people=d.roles.map(role=>{let desc=plan.people.find(x=>x.role===role)?.desc||'本班一對一交流學生';return '| '+role+' | 本班在籍學生 | '+desc+'；僅對自己的配對經歷知情，不代表日方全校 | 是；本人合法完整持有本篇四碼 |'}).join('\n');
  const use=codes.map((code,i)=>'| '+code+' | '+d.roles.join('／')+' | '+(plan.use?.[i]||'由本篇學生判斷、情緒與行動的具體後果決定；不把日方夥伴變成數值角色')+' |').join('\n');
  const sm=plan.summary,required='11/11日本學校數百名學生來本校，高一原則上一對一陪伴一位日方學生；本班學生在籍且知情、實際參與配對交流；不得假稱前往日本學校或預設前池故事已發生。';
  const lines=[
    '# '+plan.title,'','## 1｜故事基本資料','','| 欄位鍵 | 填寫值 |','| --- | --- |',
    '| state_rules_version｜數值規則版本 | 3 |',
    '| '+bt+'story_id'+bt+'｜正式故事ID | '+id+' |','| '+bt+'seed_id'+bt+'｜種子ID | '+plan.seed+' |',
    '| '+bt+'quota_date'+bt+'｜配額歸屬日 | '+plan.date+' |',
    '| '+bt+'event_type'+bt+'｜事件類型 | T |','| '+bt+'music'+bt+'｜事件配樂 | '+(d.music||'school')+' |',
    '| '+bt+'t_topic_id'+bt+'｜T主題ID | T1-4 |',
    '| '+bt+'tags'+bt+'｜T/G共用11類多標籤 | '+plan.tags+' |',
    '| '+bt+'required_window'+bt+'｜必要合法日期／活動窗口 | T1-4:after |',
    '| '+bt+'required_conditions'+bt+'｜必要人物／資格／已知條件 | '+required+' |',
    '','## 2｜四欄創意摘要','','| 固定欄位 | 故事摘要 |','| --- | --- |',
    '| 事件起因 | '+sm.origin+' |','| 核心衝突 | '+sm.conflict+' |','| 導師困境 | '+sm.dilemma+' |','| 故事獨特性 | '+sm.unique+' |',
    '','## 3｜四碼種子及角色槽位','','- **本篇四碼**：'+codes.join('／'),
    '- **選角方向**：'+(d.direction||'偏正向'),
    '- **常駐數值角色槽位**：','',
    '| 槽位鍵 | 人物資格／類別 | 必要在籍、關係、職權與知情限制 | 參與四碼抽選／合法結算 |',
    '| --- | --- | --- | --- |',people,'',
    '- **無數值情境角色**：已離校的日方配對夥伴僅為本篇既成經驗或正式允許的後續訊息；不建永久數值與跨篇固定關係。',
    '- **四碼的必要因果用途**：','',
    '| 種子碼 | 合法持有者槽位 | 如何實際參與故事起因／衝突／人物反應／結果 |',
    '| --- | --- | --- |',use,'',
    '## 4｜玩家可見開場與四個行動','',
    bt+bt+bt+'avg',JSON.stringify({opening:open,results:avgResults},null,2),bt+bt+bt,'',
    '### 開場（依自然閱讀長度分頁）','',...openLines,'',
    '### 四個最終教師選項（內部固定A～D；玩家顯示另外隨機排列）','',
    '| 選項ID | 玩家可見短句（當下可做的行動） | '+bt+'emotional'+bt+' | 教師已完成的客觀行動／確認事實 | 採取此方案的實際取捨（不顯示玩家） |',
    '| --- | --- | --- | --- | --- |',
    ...choices.map((c,i)=>'| '+letters[i]+' | '+c.short+' | '+(c.id==='emotional'?'true':'false')+' | '+c.action+' | '+c.tradeoff+' |'),
    '','## 5｜R1～R8共用結果、結算與4×8因果矩陣','',...resLines,
    '### 四選項對八共用結果的權重','',
    '| 選項／結果 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 |','| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |',
    ...weightLines,'','- **0權重因果理由**：無。',''];
  const evidence={storyId:id,ordinaryChoiceSelection:{ordinaryCandidates:pool.map(c=>({id:c.id,short:c.short,action:c.action,tradeoff:c.tradeoff})),selectedIds:chosen.map(c=>c.id),finalChoiceMap:Object.fromEntries(choices.map((c,i)=>[letters[i],c.id]))},selectedTeacherStateGroups:selectedGroups,resultAudit:resAudit,causal32Evidence:choices.flatMap((c,i)=>d.results.map((r,j)=>{let v=weights[letters[i]][j];return {choice:letters[i],result:'R'+(j+1),weight:v,compatibility:'相容',causalDirection:v===4?'促進':v===1?'抑制':'中性',reason:v===4?'已完成「'+c.action+'」，與「'+r.consequence+'」可形成直接促進鏈。':v===1?'已完成「'+c.action+'」，但與「'+r.consequence+'」的方向有張力；當事人仍可能自行調整。':'已完成「'+c.action+'」不排斥「'+r.consequence+'」，但不能據此斷定強力促進。',actionPreserved:true}}))};
  return {story:lines.join('\n'),evidence};
}
return makeStory;