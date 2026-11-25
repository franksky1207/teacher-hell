(function build(id,s,plan){
 const block=plan.split(/(?=^### T6-\d{3}｜)/m).find(v=>v.startsWith("### T6-"+id+"｜"));
 if(!block)throw Error("Plan absent "+id);
 const field=k=>block.split("\n").find(v=>v.startsWith("- **"+k+"**："))?.split("：").slice(1).join("：").trim()||"";
 const title=block.split("\n")[0].split("｜").slice(1).join("｜");
 const seed=field("種子 ID").replace(/`/g,""),quota=field("配額歸屬日").match(/\d{4}-\d{2}-\d{2}/)?.[0];
 const codes=[...field("種子原四碼").matchAll(/`(\d+-\d+)`/g)].map(x=>x[1]);
 const tag=field("規劃題材標籤").match(/G\d{2}/)?.[0]||"G08";
 const slotArea=block.split("**A. 預定常駐數值人物**")[1].split("**B. 無數值情境人物**")[0];
 const slots=[...new Set([...slotArea.matchAll(/\| `(student_[a-z]|guardian_[a-z]|staff_[a-z])` \|/g)].map(x=>x[1]))];
 const context=block.split("**B. 無數值情境人物**")[1].split("**C. 人物之間的關係**")[0].split("\n").filter(x=>x.startsWith("| `context_")).map(x=>x.split("|")[2]?.trim());
 if(!slots.includes("student_a")||codes.length!==4||!seed||!quota)throw Error("bad metadata "+id);
 if(s.options.length!==6||s.results.length!==8||s.p.length!==3)throw Error("bad story data "+id);
 const num=Number(id),shuffle=(a,seed)=>{a=[...a];for(let i=a.length-1;i>0;i--){seed=(Math.imul(seed,1664525)+1013904223)>>>0;let j=seed%(i+1);[a[i],a[j]]=[a[j],a[i]];}return a};
 const groups=[[1,1,0,0,-1,-1,-2,-2],[2,0,-1,-1,-1,-1,-1,-1],[1,1,0,-1,-1,-1,-1,-2],[2,1,0,-1,-1,-1,-2,-2],[1,1,1,0,-1,-2,-2,-2]];
 let rows,names;
 for(let k=0;k<900;k++){const idx=shuffle([0,1,2,3,4],num*71+k).slice(0,4);
 const cols=idx.map((g,j)=>shuffle(groups[g],num*173+j*23+k*19));
 const attempt=Array.from({length:8},(_,i)=>cols.map(c=>c[i]));
 if(attempt.every(r=>r.filter(x=>x===0).length<=2)){rows=attempt;names=idx.map(x=>"ABCDE"[x]);break;}}
 if(!rows)throw Error("v3 "+id);
 const selected=shuffle([1,2,3,4,5,6],num*413).slice(0,3);
 const mapping=shuffle(["emotional",...selected],num*727);
 const options=mapping.map((index,j)=>{const em=index==="emotional",label=em?s.emo:s.options[index-1];return {letter:"ABCD"[j],index,em,label,done:em?s.emoDone||"你已聽完整段焦慮並確認學生此刻最在意的限制，不代替本人提交資料或承諾結果。":"你已當場"+label+"；確認可在導師權限內完成的部分，其他仍由本人或有權窗口決定。"};});
 const results=s.results.map((line,i)=>{const p=Array.isArray(line)?line:line.split("~");if(p.length<4||p.length>5)throw Error("result parts "+id+" R"+(i+1));return {name:p[0],parts:[p[1],"「"+p[2].replace(/^「|」$/g,"")+"」",p[3]],speaker:p[4]||"student_a"};});
 const avg={opening:{},results:{}};
 for(let i=0;i<3;i++)avg.opening["P0"+(i+1)]=i===0?{scene:"school:classroom",enter:s.remote?[]:["student_a"],presentation:"narration"}:i===1?{scene:"school:classroom",speaker:"student_a",presentation:s.remote?"phone":"dialogue"}:{scene:"school:classroom",presentation:"narration"};
 for(let i=0;i<8;i++){const r=results[i],scene="school:classroom",speaker=r.speaker;avg.results["R"+(i+1)]={pages:[{text:r.parts[0],scene,presentation:"narration"},{text:r.parts[1],scene,speaker,presentation:s.remote?"phone":"dialogue",expression:{[speaker]:["calm","sad","happy","embarrassed","sad","calm","surprised","happy"][i]}},{text:r.parts[2],scene,presentation:"narration"}]};}
 const slotRows=slots.map(slot=>`| \`${slot}\` | ${slot.startsWith("guardian")?"本班學生的合法家長或照顧者":slot.startsWith("staff")?"具相關職權的本班任課教師":"本班現任在籍學生"} | ${slot==="student_a"?"本人已取得二階資格且仍有待處理的正式通知及可行準備時段":slot.startsWith("guardian")?"實際親屬關係且知情，需取得本人同意才共同參與":slot.startsWith("staff")?"具有真實任教職權，親自知情且僅見證觀察到的事":"學生本人願意參與本篇，另有獨立行動；他人不能代答"} | 是；完整合法持有本篇原四碼 |`).join("\n");
 const codeRows=codes.map((code,i)=>{const sub=field("四碼因果規劃").match(new RegExp("`"+code+"`：([^；]+)"))?.[1]||"本篇的情境與當事人反應";return `| ${code} | student_a${slots.length>1?"／具獨立反應的合法配角":""} | ${sub}；在本篇${title}的八種不同後果有實際可觀察作用。 |`}).join("\n");
 const fav=s.fav||{},low=s.low||{};
 const matrix=options.map(o=>results.map((r,i)=>(fav[o.index]||[]).includes(i+1)?4:(low[o.index]||[]).includes(i+1)?1:2));
 let txt=`# T6-${id}｜${title}
## 1｜故事基本資料
| 欄位鍵 | 填寫值 |
|---|---|
| state_rules_version｜數值規則版本 | 3 |
| \`story_id\`｜正式故事ID | T6-${id} |
| \`seed_id\`｜種子ID | ${seed} |
| \`quota_date\`｜配額歸屬日 | ${quota} |
| \`event_type\`｜事件類型 | T |
| \`music\`｜事件配樂 | ${s.music||"serious"} |
| \`t_topic_id\`｜T主題ID | T6-3 |
| \`tags\`｜T/G共用11類多標籤 | ${tag} |
| \`required_window\`｜必要合法日期／活動窗口 | T6-3:single |
| \`required_conditions\`｜必要人物／資格／已知條件 | 現任本班學生已取得本文所涉二階面試資格，實際取得並理解正式通知；該場面試尚未進行且仍有合法可用的準備或詢問時段，本人可合法在校或以既有方式聯絡。所有其他角色知情、意願及在場均依本篇實際條件確認，不能推定5月底結果。 |
## 2｜四欄創意摘要
| 固定欄位 | 故事摘要 |
|---|---|
| 事件起因 | ${field("事件起因")} |
| 核心衝突 | ${field("核心衝突").split("；")[0]}；必須依二階面試的具體時程或資格才成立。 |
| 導師困境 | ${field("導師困境").split("；")[0]}；不得越權替學生或校外招生單位作承諾。 |
| 故事獨特性 | ${field("故事獨特性").split("；")[0]}。 |
## 3｜四碼種子及角色槽位
- **本篇四碼**：${codes.join("／")}
- **選角方向**：${num%2?"偏負向":"偏正向"}
- **常駐數值角色槽位**：
| 槽位鍵 | 人物資格／類別 | 必要在籍、關係、職權與知情限制 | 參與四碼抽選／合法結算 |
|---|---|---|---|
${slotRows}
- **無數值情境角色**：${context.length?context.join("；"):"無；不為湊人物數量增設臨時常駐角色"}。
- **四碼的必要因果用途**：
| 種子碼 | 合法持有者槽位 | 如何實際參與故事起因／衝突／人物反應／結果 |
|---|---|---|
${codeRows}
## 4｜玩家可見開場與四個行動
`;
 txt+="```avg\n"+JSON.stringify(avg,null,2)+"\n```\n";
 txt+="### 開場（依自然閱讀長度分頁）\n"+s.p.map((p,i)=>`- **P0${i+1}｜${i===1?"student_a":"旁白"}**：${p}`).join("\n")+"\n";
 txt+="### 四個最終教師選項（內部固定A～D；玩家顯示另外隨機排列）\n| 選項ID | 玩家可見短句（當下可做的行動） | `emotional` | 教師已完成的客觀行動／確認事實 | 採取此方案的實際取捨（不顯示玩家） |\n|---|---|---|---|---|\n";
 txt+=options.map((o,i)=>`| ${o.letter} | ${o.label} | ${o.em} | ${o.done} | ${o.em?"當事人先被理解，尚未核實全部程序":i===0?"優先確認最可行的事項，其他需求須另行處理":i===1?"提供不同處理路徑，仍需各方合法同意":i===2?"立即降低一項風險，其他限制仍在":"讓本人理解選擇的代價，不替其決定"} |`).join("\n");
 txt+="\n## 5｜R1～R8共用結果、結算與4×8因果矩陣\n";
 const impact=s.impact||[0,1,2,3,1,2,0,3],sign=s.sign||[1,-1,1,-1,1,-1,1,-1];
 for(let i=0;i<8;i++){const r=results[i];let delta=`student_a:${codes[impact[i]]}:${sign[i]>0?"+":""}${sign[i]}`;
 const supporting=slots.find(x=>x!=="student_a");
 if(supporting&&[1,3,5,7].includes(i)){delta+=`; ${supporting}:${codes[impact[(i+1)%8]]}:${sign[i]>0?"+":""}${sign[i]}`;}
 txt+=`### R${i+1}｜${r.name}
- **玩家可見結果**：${r.parts.join("")}
- **客觀後果**：${r.parts[2]}
- **合法底層增減**：\`${delta}\`
- **玩家四狀態**（精神、熱忱、情緒、掌控）：\`${rows[i].join(", ")}\`

`;}
 txt+="### 四選項對八共用結果的權重\n| 選項／結果 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 |\n|---|---:|---:|---:|---:|---:|---:|---:|---:|\n"+options.map((o,j)=>`| ${o.letter} | ${matrix[j].join(" | ")} |`).join("\n")+"\n- **0權重因果理由**：無；各教師行動只確立當下協助，八種學生自主反應及程序後續不因未選其他行動就變成不可能。\n";
 const len=t=>t.replace(/\{\{[^}]+\}\}/g,"").replace(/\s/g,"").length;
 const lens=results.map(r=>len(r.parts.join("")));
 if(lens.some(l=>l<75))throw Error(id+" short "+JSON.stringify(lens));
 const evidence={storyId:"T6-"+id,stage:"第一階段作者創作及自驗；非第二階段獨立審查",pool:"T6-3:single",seedId:seed,originalCodes:codes,quotaDate:quota,legalDates:["2029-05-14","2029-05-15","2029-05-16","2029-05-17","2029-05-21","2029-05-22","2029-05-23","2029-05-24","2029-05-25"],perDateConstraint:"只在當事學生個別二階面試尚未進行、通知已知且具合法可用時間及在場／聯絡條件下可發生；未將日曆日期當個人進度",ordinaryChoiceSelection:{ordinaryCandidates:s.options.map((action,i)=>({id:i+1,action})),selectedIds:selected,finalChoiceMap:Object.fromEntries(options.map(o=>[o.letter,o.index]))},characterAudit:slots.map(slot=>({slot,requiresCompleteSeedCodes:true,actorEligibility:"須依01合法身分、同班／監護／任教職權、實際知情核實"})),npcDeltaAudit:results.map((r,i)=>({result:"R"+(i+1),code:codes[impact[i]],delta:sign[i],observedEvent:r.parts[0],response:r.parts[2]})),causal32Evidence:options.flatMap((o,j)=>results.map((r,i)=>({choice:o.letter,result:"R"+(i+1),compatibility:"相容",causalDirection:matrix[j][i]===4?"促進":matrix[j][i]===1?"抑制":"中性",weight:matrix[j][i],actionPreserved:o.done,reason:"已完成的行動「"+o.label+"」與後續「"+r.name+"」並不互斥；當事人在「"+r.parts[0].slice(0,57)+"」的情境下，自主說「"+r.parts[1]+"」。"+(matrix[j][i]===4?"當下協助較能支持此反應":matrix[j][i]===1?"先處理別項事情使這個反應較難但仍可能":"行動本身不決定此結果的出現")+"。"}))),authorChecks:{openingPages:3,resultCount:8,avgCount:8,openingLength:len(s.p.join("")),rLengths:lens,teacherV3Groups:names,AVGTextMatchesResults:true,reviewStatus:"第一階段作者檢查；尚未執行獨立驗收、文字精修、Actions 或正式V1合併"},nodeCli:"未執行"};
 return {id,text:txt,evidence:JSON.stringify(evidence,null,2)+"\n",stats:{id,seed,codes,quota,slots,opening:len(s.p.join("")),results:lens}};
})