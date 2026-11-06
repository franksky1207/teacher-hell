/** Saved ceremony/weekly journals and public admissions, at the world's own date. */
import {readAdmissions} from '../src/runtime/academics.js';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function projectSeniorSummary(w){
 const r=w.extensions['teacher-hell/world'],ceremony=r.facts.findLast(f=>f.data.graduationSummary)?.data.graduationSummary??null;
 const weeks=r.history.filter(h=>h.type==='aftercare-week-summary').map(h=>({startDate:h.data.startDate,endDate:h.data.endDate,summary:h.data.summary}));
 const outcomes=r.history.filter(h=>h.type==='cohort-completion').flatMap(h=>h.data.outcomes).map(o=>({id:o.personId,name:w.numeric.evolution.world.registry.profiles[o.personId].displayName,status:o.qualification.eligible?'graduation':o.qualification.certificateEligible?'completion-certificate':'incomplete'}));
 const admissions=readAdmissions(w),students=Object.values(admissions?.students??{});
 return {outcomes,date:w.position.date,ceremony:ceremony?structuredClone(ceremony):null,weeks,knownOffers:students.reduce((n,p)=>n+p.offers.length,0),confirmed:students.filter(p=>p.confirmed).length,pending:students.filter(p=>p.pending.length).length};
}
export function renderSeniorSummary(d){
 if(!d.ceremony&&!d.weeks.length&&!d.outcomes?.length)return '';
 return `<section aria-label="畢典與六月紀錄"><h4>畢典與六月紀錄（截至 ${esc(d.date)}）</h4>${d.ceremony?`<p>${esc(d.ceremony.description)}</p>${d.ceremony.representatives.map(p=>`<p>${esc(p.interaction)}</p>`).join('')}`:'<p>此存檔未保存畢典敘事，不補造歷史。</p>'}<p>已公布結果項目 ${d.knownOffers}；確認錄取 ${d.confirmed} 人，仍有待辦 ${d.pending} 人。七、八月尚未公布的結果維持未知。</p>${d.outcomes?.length?['graduation','completion-certificate','incomplete'].map(status=>{const rows=d.outcomes.filter(o=>o.status===status);return `<p>${({'graduation':'符合畢業資格','completion-certificate':'符合修業證明資格',incomplete:'尚未完成修業資格'})[status]} ${rows.length} 人：${rows.map(o=>esc(o.name)).join('、')||'無'}</p>`;}).join(''):''}${d.weeks.map(q=>`<p>${esc(q.startDate)}～${esc(q.endDate)}：${esc(q.summary)}</p>`).join('')}</section>`;
}
