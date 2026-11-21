const trim=x=>String(x??'').trim();

export function reviewEvidence(review,choiceFlags,npcAudit,stateRulesVersion){
 if(!review||review.verdict!=='approved'||typeof review.reviewer!=='string'||!review.reviewer.trim())throw Error('缺少明確內容審查核准者');
 for(const name of ['storyAndRoles','fourCodes','fourChoices','eightResults','causal32','timeAndLaw','duplicates']){
  if(typeof review[name]!=='string'||trim(review[name]).length<16)throw Error('內容審查證據不足：'+name);
 }
 if(review.isFixture===true||review.isTest===true)throw Error('試作不得鎖定');
 if(stateRulesVersion===3){
  if(typeof review.characterAudit!=='string'||trim(review.characterAudit).length<40)throw Error('缺少全文重要人物反向盤點與數值角色資格證據');
  if(typeof review.npcDeltaAudit!=='string'||trim(review.npcDeltaAudit).length<40)throw Error('缺少逐NPC四碼變化與零值因果審查證據');
  const warnings=npcAudit?.warningIds??[];
  if(!Array.isArray(review.npcWarningReviews))throw Error('缺少NPC品質警示逐項複查清單');
  const handled=new Set();
  for(const item of review.npcWarningReviews){
   if(!item||typeof item.id!=='string'||!warnings.includes(item.id)||handled.has(item.id))throw Error('NPC警示複查ID無效或重複');
   if(!['retain','revise'].includes(item.decision)||typeof item.evidence!=='string'||trim(item.evidence).length<40)throw Error('NPC警示必須記錄具體處理決策與情節證據');
   if(item.decision==='revise')throw Error('仍有待修正的NPC品質警示，須修改稿件後重新檢查');
   handled.add(item.id);
  }
  for(const id of warnings)if(!handled.has(id))throw Error('NPC品質警示未完成複查：'+id);
 }

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
export function validateCausalEvidence(review,matrix){
 const cells=review.causal32Evidence;
 if(!Array.isArray(cells)||cells.length!==32)throw Error('須附完整32格因果證據');
 const seen=new Set();
 for(const cell of cells){
  const {choice,result,weight,compatibility,causalDirection,reason,actionPreserved}=cell??{};
  const key=choice+'→'+result;
  if(!/^[ABCD]$/.test(choice)||!/^R[1-8]$/.test(result)||seen.has(key)||
   matrix?.[choice]?.[Number(result[1])-1]!==weight||
   !trim(compatibility)||!trim(causalDirection)||!trim(reason)||!trim(actionPreserved))
   throw Error('因果證據重複、缺欄或與正文權重不一致：'+key);
  seen.add(key);
 }
}
