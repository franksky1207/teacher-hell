import { seniorRosterAt } from './academic-roster.js';
import { aftercareWindow } from './aftercare-calendar.js';
import { readSeniorAcademicReview,readAdmissions } from './academics.js';
import { directedKey } from '../world/relationships.js';
const r=w=>w.extensions['teacher-hell/world'];
export function graduationSummary(w){
 const bounds=aftercareWindow(w);if(!bounds||w.position.date!==bounds.ceremonyDate||w.position.slotId!=='morning')return null;
 const review=readSeniorAcademicReview(w,bounds.termId),admissions=readAdmissions(w),ids=seniorRosterAt(w,w.position.date).people.map(p=>p.id);
 const rows=ids.map(id=>{const outcome=review?.outcomes.find(o=>o.personId===id),p=admissions?.students[id];return {personId:id,qualification:outcome?.qualification??null,pendingRemedies:outcome?.pendingRemedies??[],confirmed:p?.confirmed??null,route:p?.route??null,publishedOffers:(p?.offers??[]).filter(o=>o.publishedAt<=w.position.date).map(o=>({id:o.id,route:o.route,programmeLabel:o.programmeLabel,publishedStatus:o.publishedStatus,status:o.status,publishedAt:o.publishedAt})),pending:p?.pending??[]};});
 const count={eligible:rows.filter(x=>x.qualification?.eligible).length,certificate:rows.filter(x=>!x.qualification?.eligible&&x.qualification?.certificateEligible).length,incomplete:rows.filter(x=>x.qualification&&!x.qualification.eligible&&!x.qualification.certificateEligible).length,unknown:rows.filter(x=>!x.qualification).length,confirmed:rows.filter(x=>x.confirmed).length,publishedPending:rows.filter(x=>!x.confirmed&&x.publishedOffers.some(o=>['regular','waitlist'].includes(o.publishedStatus))).length};
 const n=w.numeric.evolution.world,rank=ids.map(id=>({id,trust:n.relationships[directedKey(w.identity.playerId,id)]?.values['5-1']??50,history:r(w).history.filter(h=>h.type==='event-exposure'&&h.data.participantIds.includes(id)).length})).sort((a,b)=>b.history-a.history||Math.abs(b.trust-50)-Math.abs(a.trust-50)||a.id.localeCompare(b.id));
 const representatives=rank.slice(0,3).map(x=>({...rows.find(y=>y.personId===x.id),trust:x.trust,historyCount:x.history,interaction:x.trust>=60?'留下較親近的道別與後續聯絡方式。':x.trust<40?'保留距離，簡短確認後續聯絡管道。':'簡短道別，必要事項仍可另約聯繫。'}));
 for(const p of representatives){p.interaction+=(p.qualification?.eligible?'依正式資格完成告別。':p.qualification?.certificateEligible?'保留修業證明與後續規劃。':p.qualification?'另約未完成學業事項的後續處理。':'尚無審查來源，不宣稱已取得證書。')+(p.confirmed?'談到已確認的升學去向。':p.publishedOffers.length?'核對已公布的升學狀態，未確認結果仍待後續。':'升學與生涯方向仍依本人進度保留。');}
 return {version:1,termId:bounds.termId,reviewDate:review?.date??null,sourceOrders:review?.sourceOrders??[],admissionsNodes:admissions?.completed??[],count,students:rows,representatives,description:`畢業典禮回顧這一班共同走過的日子。五月審查：${count.eligible}人符合畢業資格、${count.certificate}人符合修業證明資格、${count.incomplete}人仍未完成、${count.unknown}人尚無正式審查來源。當時已確認升學${count.confirmed}人，另有${count.publishedPending}人已有公布的正備取資訊但尚未確認；其餘依各自進度保留待辦。少數學生留下不同距離的道別，沒有要求全班輪流發言。`};
}
