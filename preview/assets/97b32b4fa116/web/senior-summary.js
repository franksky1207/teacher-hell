/** Saved ceremony/weekly journals and public admissions, at the world's own date. */
import {readAdmissions,academicState} from '../src/runtime/academics.js';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function projectSeniorSummary(w){
 const r=w.extensions['teacher-hell/world'];if(r.plan.validation!=='fixed-calendar-v2')return null;
 const ceremonyFact=r.facts.findLast(f=>f.data.graduationSummary),ceremony=ceremonyFact?.data.graduationSummary??null;
 const weeks=r.history.filter(h=>h.type==='aftercare-week-summary').map(h=>({startDate:h.data.startDate,endDate:h.data.endDate,summary:h.data.summary}));
 const outcomes=r.history.filter(h=>h.type==='cohort-completion').flatMap(h=>h.data.outcomes).map(o=>({id:o.personId,name:w.numeric.evolution.world.registry.profiles[o.personId].displayName,status:o.qualification.eligible?'graduation':o.qualification.certificateEligible?'completion-certificate':'incomplete'}));
 const academic=academicState(w),admissions=readAdmissions(w,null,academic),students=Object.values(admissions?.students??{});
 return {admissionsKnown:!!admissions,legacyAdmissionsCount:(academic.admissions??[]).filter(a=>a.date<=w.position.date).length,outcomes,date:w.position.date,ceremonyDate:ceremonyFact?.occurredAt.date??null,ceremony:ceremony?structuredClone(ceremony):null,weeks,knownOffers:students.reduce((n,p)=>n+p.offers.length,0),confirmed:students.filter(p=>p.confirmed).length,pending:students.filter(p=>p.pending.length).length};
}
export function renderSeniorSummary(d){
 if(!d.ceremony&&!d.weeks.length&&!d.outcomes?.length)return '';
 return `<section aria-label="畢典與六月紀錄"><h4>畢典與六月紀錄（截至 ${esc(d.date)}）</h4>${d.ceremony?`<p>畢業典禮${d.ceremonyDate?'（'+esc(d.ceremonyDate)+'）':''}</p><p>${esc(d.ceremony.description)}</p>${d.ceremony.representatives.map(p=>`<p>${esc(p.interaction)}</p>`).join('')}`:'<p>此存檔未保存畢典敘事，不補造歷史。</p>'}${d.admissionsKnown===false?`<p>${d.legacyAdmissionsCount?'原保存政策的升學階段紀錄仍可由學生學業頁查閱；不推定新制錄取或確認。':'尚無可查閱的升學明細；不推定錄取或確認。'}</p>`:`<p>已公布結果項目 ${d.knownOffers}；確認錄取 ${d.confirmed} 人，仍有待辦 ${d.pending} 人。七、八月尚未公布的結果維持未知。</p>`}${d.outcomes?.length?['graduation','completion-certificate','incomplete'].map(status=>{const rows=d.outcomes.filter(o=>o.status===status);return `<p>${({'graduation':'符合畢業資格','completion-certificate':'符合修業證明資格',incomplete:'尚未完成修業資格'})[status]} ${rows.length} 人：${rows.map(o=>esc(o.name)).join('、')||'無'}</p>`;}).join(''):''}${d.weeks.map(q=>`<p>${esc(q.startDate)}～${esc(q.endDate)}：${esc(q.summary)}</p>`).join('')}</section>`;
}
