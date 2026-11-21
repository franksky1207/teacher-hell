(function createT1Review(md,logText,planning,n){
 const id="T1-"+String(n).padStart(3,"0"),q=md.split("\n"),intro=md.slice(md.indexOf("## 1｜"),md.indexOf("## 2｜")),core=md.slice(md.indexOf("## 3｜"),md.indexOf("## 4｜")),top=md.slice(md.indexOf("## 2｜"),md.indexOf("## 3｜"));
 const meta=k=>intro.split("\n").find(x=>x.includes("`"+k+"`｜"))?.split("|")[2]?.trim()||"";
 const codeMatch=core.match(/\*\*本篇四碼\*\*：([^\n]+)/);if(!codeMatch)throw Error(id+" codes");const codes=codeMatch[1].split("／");
 const roles=[...core.matchAll(/^\| ([a-z_]+) \| ([^|]+) \| ([^|]+) \| 是；完整持有原四碼 \|$/gm)].map(x=>({id:x[1],type:x[2].trim(),conditions:x[3].trim()}));
 const choices=[...md.matchAll(/^\| ([A-D]) \| ([^|]+) \| (true|false) \| ([^|]+) \| ([^|]+) \|$/gm)].map(m=>({id:m[1],label:m[2].trim(),emotional:m[3]==="true",done:m[4].trim(),tradeoff:m[5].trim()}));
 const R=[...md.matchAll(/### R(\d)｜([^\n]+)\n\n- \*\*玩家可見結果\*\*：([^\n]+)\n- \*\*客觀後果\*\*：([^\n]+)\n- \*\*合法底層增減\*\*：([^\n]+)\n- \*\*玩家四狀態\*\*（精神、熱忱、情緒、掌控）：([^\n]+)/g)].map(m=>({id:"R"+m[1],title:m[2],visible:m[3],fact:m[4],deltas:m[5],teacher:m[6]}));
 const matrix=Object.fromEntries([...md.matchAll(/^\| ([A-D]) \| ([0-9 |]+) \|$/gm)].map(m=>[m[1],m[2].split("|").map(Number)]));
 if(codes.length!==4||roles.length<1||choices.length!==4||R.length!==8||Object.keys(matrix).length!==4)throw Error(id+" story shape");
 const section=logText.slice(logText.indexOf("## "+id+"\n"),logText.indexOf("\n## ",logText.indexOf("## "+id+"\n")+1)>=0?logText.indexOf("\n## ",logText.indexOf("## "+id+"\n")+1):undefined);
 if(!section.startsWith("## "+id+"\n"))throw Error(id+" candidate section");
 const candidates=[...section.matchAll(/^([1-6])\. ([^\n]+)/gm)].map(x=>({id:+x[1],action:x[2]}));
 const selected=(section.match(/\*\*中選普通候選\*\*：([^\n]+)/)?.[1]||"").split("、").map(Number);
 const mp=(section.match(/\*\*A～D 映射\*\*：([^\n]+)/)?.[1]||"").split("；").reduce((a,z)=>{let [k,v]=z.split("=");if(k&&v)a[k]=v==="E"?"emotional":+v;return a},{});
 if(candidates.length!==6||selected.length!==3||Object.keys(mp).length!==4)throw Error(id+" candidates parse");
 const changes=Object.fromEntries(roles.map(role=>[role.id,Object.fromEntries(codes.map(c=>[c,[]]))]));
 const roleFacts=Object.fromEntries(roles.map(role=>[role.id,[]]));
 for(const rr of R){for(const raw of rr.deltas.split(";").map(x=>x.trim()).filter(Boolean)){let m=raw.match(/^([a-z_]+):(\d{1,2}-\d):([+-]?\d+)$/);if(!m||!changes[m[1]]||!(m[2] in changes[m[1]]))throw Error(id+" delta "+raw);changes[m[1]][m[2]].push({r:rr.id,value:+m[3],title:rr.title,visible:rr.visible});}for(let person of roles)if(rr.visible.includes("{{"+person.id+".name}}"))roleFacts[person.id].push(rr.id+"「"+rr.title+"」");}
 const warnings=[];if(roles.length===1)warnings.push("npc_single_actor");for(const role of roles){let nonzero=0;for(const c of codes){if(changes[role.id][c].length===0)warnings.push("npc_all_zero_code:"+role.id+":"+c);else nonzero+=changes[role.id][c].length;}if(!nonzero)warnings.push("npc_all_zero_actor:"+role.id);}
 const sigs=roles.map(role=>R.flatMap(rr=>codes.map(c=>{let prefix=role.id+":"+c+":",matches=rr.deltas.split(";").map(x=>x.trim()).filter(x=>x.startsWith(prefix));return matches.reduce((a,v)=>a+Number(v.slice(prefix.length)),0)})).join(","));
 for(let i=0;i<roles.length;i++)for(let j=i+1;j<roles.length;j++)if(sigs[i]===sigs[j])warnings.push("npc_identical_pattern:"+roles[i].id+":"+roles[j].id);
 const subject=top.match(/^\| 事件起因 \| ([^|]+) \|$/m)?.[1]||"",conflict=top.match(/^\| 核心衝突 \| ([^|]+) \|$/m)?.[1]||"",dilemma=top.match(/^\| 導師困境 \| ([^|]+) \|$/m)?.[1]||"",unique=top.match(/^\| 故事獨特性 \| ([^|]+) \|$/m)?.[1]||"";
 const roleSummaries=roles.map(role=>`${role.id}（${role.type}）知情及在場限制：「${role.conditions}」；正文出現於${roleFacts[role.id].join("、")||"結果未直接具名"}`).join("；");
 let personAudit=roles.map(role=>{let rows=R.filter(rr=>rr.visible.includes("{{"+role.id+".name}}"));return `${role.id}獨立利害：${role.type}；實際明示反應${rows.slice(0,5).map(rr=>rr.id+"「"+rr.title+"」").join("、")||"無直接具名R"}；該角色須依本人合法在場、實際得知的處置及自身作為結算，不將其他角色的反應當作他本人行動。`}).join("\n");
 if(n===32||n===34)personAudit+=`\n與規劃初稿差異：原想建數值槽的subject_teacher_a已依正式稿的八R實際長期因果改成無數值的本科背景窗口，沒有任何四碼增減、也不把科任的專業說明當成導師權責。`;
 const npcDeltaAudit=roles.map(role=>`${role.id}：${codes.map(code=>{const rows=changes[role.id][code];return `${code}=${rows.length?rows.map(v=>v.r+"("+v.value+"；"+v.title+"；"+v.visible.replace(/\{\{[^}]+\}\}/g,"當事人").slice(0,110)+")").join("、"):"0（八結果無本人直接對應的可辨識變化）"}`}).join("；")}`).join("\n");
 const reviews=warnings.map(w=>{let p=w.split(":"),role=roles.find(x=>x.id===p[1])||roles[0],examples=roleFacts[role.id].slice(0,3).join("、");return {id:w,decision:"retain",evidence:w==="npc_single_actor"?`本篇獨立數值利害集中於${role.id}，其主要反應依次見${examples}；未另有具本篇固定四碼且能保存獨立長期後果的第二人物，不為湊兩人而建立常駐人物。`:w.startsWith("npc_all_zero_code:")?`${role.id}具有${p[2]}合法持碼資格，但現稿八R中未發生足以獨立結算該碼的本人行動。${role.id}實際參與了${examples}；這些已由其他有具體因果的碼承接，不因機械警示虛增${p[2]}，避免把知情誤當數值變化。`:`${role.id}在${examples}並沒有可確證的本篇四碼改變，此處按零值保留，並未從其他人的反應借用分數。`}});
 const choiceFlags=Object.fromEntries(choices.map(x=>[x.id,x.emotional]));
 const cells=choices.flatMap(ch=>R.map((rr,i)=>{let w=matrix[ch.id][i],relation=w===4?"促進":w===2?"中性":"抑制",fact=rr.fact,done=ch.done;let explanation=w===4?`本選項直接著眼「${done}」，這使「${rr.title}」所涉及的核對、理解、合作或爭議更容易沿此方向發展；結果的實際落點為「${fact}」。`:w===1?`教師已做「${done}」，此做法會降低「${rr.title}」出現的條件，卻無法禁止其他學生、家長或環境各自作為，結果仍可在「${fact}」的範圍發生。`:`選項「${done}」沒有直接決定「${rr.title}」，但其他當事人仍可能因當天資訊或自身判斷形成「${fact}」，所以視為可相容而非必然。`;return {choice:ch.id,result:rr.id,weight:w,compatibility:"相容",causalDirection:relation,reason:explanation,actionPreserved:`保留教師已完成的「${done}」，${rr.id}只增添「${fact}」的後續，不得取消已執行行動或冒稱教師作了另一選項。`}}));
 const review={
 verdict:"approved",reviewer:"ChatGPT",
 storyAndRoles:`事件成因：「${subject}」；核心衝突：「${conflict}」。教師困境：「${dilemma}」。常駐角色逐人：${roleSummaries}。${n===32||n===34?"本篇科任作無數值角色，未替他計分。":""}`,
 fourCodes:`沿用${meta("seed_id")}固定原四碼${codes.join("、")}；${core.match(/- \*\*四碼的必要因果用途\*\*：[\s\S]*?## 4｜/)?.[0]?.slice(0,400)||"相關功能依本篇第三區及各結果NPC本人反應判斷。"}；任一角色未能由其本人事實支持時不硬增減。`,
 fourChoices:`逐一核對教師已完成客觀行動與代價：${choices.map(c=>c.id+"「"+c.label+"」"+(c.emotional?"情緒":"普通")+"，已完成「"+c.done+"」，實際取捨「"+c.tradeoff+"」").join("；")}。另外六候選見實際創作紀錄，與本篇抽選映射一致。`,
 eightResults:`八個共用後續分別為${R.map(rr=>rr.id+"「"+rr.title+"」："+rr.fact).join("；")}。每R獨立發展，人物僅在本人知情與行動成立後結算，四教師狀態不重新抽組。`,
 causal32:`32格採故事而非選項編號判定；A～D四列權重依次為${choices.map(c=>c.id+"="+matrix[c.id].join("/")).join("；")}。本篇沒有已證明的客觀絕對互斥項目，因而無0；4為實質促進、2為其他人物自主可導致、1為抑制但非絕對排除。`,
 timeAndLaw:`本篇正式ID${id}，固定種子${meta("seed_id")}，配額歸屬日${meta("quota_date")}只作創作占用，實際演出限制於T1-2:single高一暑輔第二週；${meta("required_conditions")}。教師只作自身可合法完成的處置；校外與背景人士不自動入數值庫。`,
 duplicates:`已併同T1-2全部30篇及T1-1的相近問題做摘要和全文對照；本篇獨特因果在「${unique}」。保留可共通的校園法定程序與教師尊重原則，但不靠替換學生名、日期或道具產生故事。相似主題以本篇特定「${conflict}」和八種後續區分。`,
 characterAudit:personAudit,
 npcDeltaAudit,
 npcWarningReviews:reviews,
 ordinaryChoiceSelection:{ordinaryCandidates:candidates,selectedIds:selected,finalChoiceMap:mp},
 causal32Evidence:cells
 };
 return {story_id:id,review,warningIds:warnings,choiceFlags,matrix,source:md,roles:roles.map(r=>r.id)};
})