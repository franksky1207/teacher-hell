/** Read-only, disclosed teacher responsibilities. Do not turn other staff's cases into player tasks. */
import {readProcedures} from '../src/runtime/procedures.js';
import {readPlayerView} from '../src/runtime/views.js';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const labels={protect:'學生安全保護',report:'依法通報','child-report':'兒少保護通報','suicide-report':'自殺防治通報','school-safety-report':'校園安全通報',investigation:'調查程序','accept-notice':'受理通知',refer:'轉介處理',transfer:'移送權責單位','urgent-education-report':'緊急教育通報','emergency-response':'緊急應變'};
export function projectNotebookTasks(world){
 const player=world.identity.playerId,known=new Set(readPlayerView(world).facts.map(f=>f.id));
 const state=readProcedures(world),items=[];
 for(const c of state.cases){
  if(c.closedAt||c.handlerId!==player||!known.has(c.originFactId))continue;
  for(const o of c.obligations)if(o.responsibleId===player&&!o.completedAt&&!o.suspendedAt){
   items.push({id:c.id+':'+o.id,label:labels[o.id]??'案件待處理事項',due:o.due??null,overdue:!!o.overdueAt||!!o.due&&o.due<world.position.date,context:'校務程序',unit:o.unit});
  }
 }
 for(const duty of state.duties){
  if(duty.endedAt||duty.holderId!==player||!duty.history.some(h=>known.has(h.basisFactId)))continue;
  if(duty.status==='offered'||duty.status==='pending-resolution')items.push({id:'duty:'+duty.id,label:'校務兼任或職責待確認',due:duty.until??null,overdue:false,context:'校務工作'});
 }
 items.sort((a,b)=>Number(b.overdue)-Number(a.overdue)||(a.due??'9999-12-31').localeCompare(b.due??'9999-12-31')||a.id.localeCompare(b.id));
 return {items,date:world.position.date};
}
export function renderNotebookTasks(data){
 if(!data||!Array.isArray(data.items))throw new TypeError('Invalid notebook tasks projection');
 return `<section class="notebook-tasks" aria-label="待辦事項"><p class="notebook-hint">僅列出教師已知、由本人負責且尚未完成的正式程序。此處供查閱，不能直接完成任務或改變時間。</p>${data.items.length?data.items.map(x=>`<article class="notebook-history-item"><strong>${esc(x.label)}</strong><p>${esc(x.context)}・${x.due?'期限 '+esc(x.due):'無明確期限'}${x.overdue?'・期限已過':''}</p></article>`).join(''):'<p>目前沒有符合條件的待辦事項。</p>'}</section>`;
}
