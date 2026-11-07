/** Read-only, disclosed teacher responsibilities. Do not turn other staff's cases into player tasks. */
import {readProcedures} from '../src/runtime/procedures.js';
import {readPlayerView} from '../src/runtime/views.js';
import {currentStory} from './story-controller.js';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const labels={protect:'學生安全保護',report:'依法通報','child-report':'兒少保護通報','suicide-report':'自殺防治通報','school-safety-report':'校園安全通報',investigation:'調查程序','accept-notice':'受理通知',refer:'轉介處理',transfer:'移送權責單位','urgent-education-report':'緊急教育通報','emergency-response':'緊急應變'};
/** Read-only availability; cannot authorize a separate story or school operation. */
export function storyTaskAvailability(status,{activeEventId=null,eventId,date}={}){
 if(!status||status.mode==='ended')return {availability:'not-ready',hint:'目前沒有可接續的事件階段。',navigation:null};
 if(activeEventId===eventId)return {availability:'ready',hint:'目前可以返回這件事件繼續處理。',navigation:'story'};
 if(status.mode==='waiting'&&status.dueDate&&status.dueDate>date)return {availability:'waiting',hint:'後續預計於 '+status.dueDate+' 或符合校曆條件後接續。',navigation:null};
 if(status.mode==='waiting')return {availability:'waiting',hint:'尚待正式校曆或事件條件允許接續。',navigation:null};
 return {availability:'blocked',hint:activeEventId?'需先處理主畫面目前的事件。':'目前需透過正式事件流程繼續。',navigation:null};
}
export function projectNotebookTasks(world){
 const player=world.identity.playerId,known=new Set(readPlayerView(world).facts.map(f=>f.id));
 const state=readProcedures(world),items=[];
 const activeEventId=currentStory(world)?.eventId??null;
 for(const c of state.cases){
  if(c.closedAt||c.handlerId!==player||!known.has(c.originFactId))continue;
  for(const o of c.obligations)if(o.responsibleId===player&&!o.completedAt&&!o.suspendedAt){
   items.push({id:c.id+':'+o.id,label:labels[o.id]??'案件待處理事項',due:o.due??null,overdue:!!o.overdueAt||!!o.due&&o.due<world.position.date,context:'校務程序',unit:o.unit,availability:'procedural',hint:'依正式校務程序及當前權責處理；筆記本不會直接執行通報或調查。',navigation:null});
  }
 }
 // Continued narrative events are pending only after their story has begun.
 // A due date describes the teacher's known follow-up, never the hidden outcome.
 const storyIds=new Set(world.events.map(e=>e.id)),seen=new Set();
 for(const h of [...world.extensions['teacher-hell/world'].history].reverse()){
  if(h.type!=='story'||!storyIds.has(h.eventId)||seen.has(h.eventId))continue;
  seen.add(h.eventId);
  const status=h.data?.state;
  if(!status||status.mode==='ended')continue;
  const access=storyTaskAvailability(status,{activeEventId,eventId:h.eventId,date:world.position.date});
  items.push({id:'story:'+h.eventId,eventId:h.eventId,label:status.dueDate?'已發生事件的後續安排':'尚待完成的事件互動',due:status.dueDate??null,
   overdue:!!status.dueDate&&status.dueDate<world.position.date,context:'事件後續',...access});
 }
 for(const duty of state.duties){
  if(duty.endedAt||duty.holderId!==player||!duty.history.some(h=>known.has(h.basisFactId)))continue;
  if(duty.status==='offered'||duty.status==='pending-resolution')items.push({id:'duty:'+duty.id,label:'校務兼任或職責待確認',due:duty.until??null,overdue:false,context:'校務工作',availability:'procedural',hint:'由校務事件中的正式選擇回覆，筆記本不直接接受或拒絕職務。',navigation:null});
 }
 items.sort((a,b)=>Number(b.overdue)-Number(a.overdue)||(a.due??'9999-12-31').localeCompare(b.due??'9999-12-31')||a.id.localeCompare(b.id));
 return {items,date:world.position.date};
}
export function renderNotebookTasks(data){
 if(!data||!Array.isArray(data.items))throw new TypeError('Invalid notebook tasks projection');
 return `<section class="notebook-tasks" aria-label="待辦事項"><p class="notebook-hint">只顯示教師已知、本人負責的未結事項。可接續的事件可以直接返回主畫面；所有處理仍由正式事件及校務流程決定，查閱本頁不推進遊戲時間。</p>${data.items.length?data.items.map(x=>{
  const ready=x.availability==='ready'&&x.navigation==='story'&&typeof x.eventId==='string';
  return `<article class="notebook-history-item notebook-task-item"><strong>${esc(x.label)}</strong><p>${esc(x.context)}・${x.due?'期限 '+esc(x.due):'無明確期限'}${x.overdue?'・期限已過':''}</p><p class="notebook-task-hint">${esc(x.hint??'請依遊戲中的正式事件或校務日程處理。')}</p>${ready?`<button type="button" data-action="notebook-task-story:${esc(x.eventId)}">返回這件事件</button>`:''}</article>`;
 }).join(''):'<p>目前沒有符合條件的待辦事項。</p>'}</section>`;
}
