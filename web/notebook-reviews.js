import {projectSeniorSummary,renderSeniorSummary} from './senior-summary.js';
/** Formal, already saved summaries only: no time advancement or simulation. */
import {readSemesterReviews,pendingSemesterReview} from '../src/runtime/reviews.js';
import {readAnnualResults} from '../src/runtime/annual.js';
import {readCareerCompletion} from '../src/runtime/career.js';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=n=>typeof n==='number'&&Number.isFinite(n)?String(Math.round(n*100)/100):'—';
const period=p=>String(p??'學期').replace(/(\d{4}):(autumn|spring)/g,(_,y,t)=>(Number(y)-(t==='spring'?1:0))+'學年度'+(t==='autumn'?'上':'下')+'學期');
export function projectNotebookReviews(w){
 const semesters=readSemesterReviews(w).map(r=>({id:r.id,periodId:r.periodId,date:r.at.date,status:r.status,abilities:r.abilities,events:r.events.map(e=>({summary:e.summary})),summary:r.summary}));
 const years=readAnnualResults(w).map(r=>({year:r.year,date:r.at?.date??null,status:r.status,summary:r.summary}));
 return {semesters,years,pendingId:pendingSemesterReview(w)?.id??null};
}
export function projectNotebookCareer(w){
 const r=readCareerCompletion(w);
 return r?{senior:projectSeniorSummary(w),completed:true,serviceYear:r.years,date:r.at?.date??null,grade:r.rating?.grade,score:r.rating?.score,ending:r.ending?.text??'',cohorts:(r.cohorts??[]).map(c=>({years:c.years,students:c.students,graduated:c.qualification?.eligible??null,status:c.qualification?.status??'unavailable'})) }:{senior:projectSeniorSummary(w),completed:false,serviceYear:w.position.serviceYear};
}
export function renderNotebookReviews(d,selected=null,ack=false){
 if(!d||!Array.isArray(d.semesters)||!Array.isArray(d.years))throw new TypeError('Invalid review projection');
 if(selected!==null&&!d.semesters.some(s=>s.id===selected))throw new RangeError('Unknown review');
 const active=d.semesters.find(s=>s.id===selected)??d.semesters.at(-1);
 const buttons=d.semesters.map(s=>`<button type="button" data-action="notebook-review:${esc(s.id)}" aria-pressed="${active?.id===s.id}">${esc(period(s.periodId))}・${esc(s.date)}${s.status==='unread'?'（未閱讀）':''}</button>`).join('');
 const summary=active?`<article class="notebook-review-details"><h3>${esc(period(active.periodId))}</h3><p>${esc(active.summary)}</p><h4>六項長期能力變化</h4><div class="notebook-review-scores">${Object.entries(active.abilities).map(([k,v])=>`<p>${esc(k)}：${fmt(v.start)} → ${fmt(v.end)}（${v.delta>0?'+':''}${fmt(v.delta)}）</p>`).join('')}</div><h4>重要事件</h4>${active.events.length?`<ul>${active.events.map(e=>`<li>${esc(e.summary)}</li>`).join('')}</ul>`:'<p>沒有達到回顧門檻的已知重要事件。</p>'}${ack&&active.id===d.pendingId?`<button type="button" data-action="review-ack:${esc(active.id)}">已閱讀學期總結，繼續</button>`:''}</article>`:'<p>目前尚無已完成的學期總結。</p>';
 return `<section class="notebook-reviews" aria-label="學期及學年回顧"><p class="notebook-hint">以下僅顯示正式保存的教師回顧，不會提前公開學生的成績及學分。</p><div class="notebook-review-picker">${buttons}</div>${summary}<h3>學年結算紀錄</h3>${d.years.length?d.years.map(y=>`<article class="notebook-annual-card"><h4>遊玩第 ${fmt(y.year)} 學年</h4><p>${esc(y.summary??'')}</p><p>結算日期：${esc(y.date??'未標示')}</p></article>`).join(''):'<p>目前尚無學年結算紀錄。</p>'}</section>`;
}
export function renderNotebookCareer(d){
 if(!d||typeof d.completed!=='boolean')throw new TypeError('Invalid career projection');
 if(!d.completed)return `<section class="notebook-career" aria-label="教師職涯"><h3>生涯進行中</h3><p>遊玩第 ${fmt(d.serviceYear)} 學年。正式結局尚未產生。</p>${d.senior?renderSeniorSummary(d.senior):''}</section>`;
 return `<section class="notebook-career" aria-label="教師職涯"><h3>三年生涯完成紀錄</h3><p>完成日期：${esc(d.date??'未標示')}</p><p>正式評等：${esc(d.grade??'未標示')}・總分：${fmt(d.score)}</p><div class="notebook-ending">${esc(d.ending??'')}</div><h4>結屆班級</h4>${d.cohorts.map(c=>`<p>遊玩第 ${c.years.map(fmt).join('、')} 年：學生 ${fmt(c.students)} 人${c.graduated===null?'':'，符合畢業資格 '+fmt(c.graduated)+' 人'}</p>`).join('')}${d.senior?renderSeniorSummary(d.senior):''}<p>完成存檔維持原有三槽，提供唯讀查閱。</p></section>`;
}
