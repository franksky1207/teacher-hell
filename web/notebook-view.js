import {renderNotebookPeople} from './notebook-people.js';
/** Phase 14-A notebook shell. Data tabs are deliberately unimplemented until 14-B–E.
 * Only passed-in public UI context may appear here. Never inspect world numeric/history. */
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const NOTEBOOK_TABS=Object.freeze([
 {id:'overview',label:'總覽',description:'目前的導師工作紀錄'},
 {id:'people',label:'人物',description:'認識的人物與已知互動'},
 {id:'events',label:'事件歷史',description:'已發生且可查閱的事件'},
 {id:'academics',label:'學業成績',description:'班級成績與學分資訊'},
 {id:'semesters',label:'學期回顧',description:'歷年學期與學年結算'},
 {id:'career',label:'職涯紀錄',description:'教師生涯與過往班級'}
]);
export function renderNotebookView({date,grade,readonly=false,tab='overview',people=null,selectedPersonId=null}){
 if(typeof date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(date)||![1,2,3].includes(grade))throw new TypeError('Invalid notebook public context');
 const chosen=NOTEBOOK_TABS.find(x=>x.id===tab);
 if(!chosen)throw new RangeError('Unknown notebook tab');
 const tabs=NOTEBOOK_TABS.map(item=>`<button type="button" role="tab" id="notebook-tab-${item.id}" aria-controls="notebook-content" aria-selected="${item.id===tab}" data-action="notebook-tab:${item.id}" class="notebook-tab${item.id===tab?' notebook-tab--active':''}">${esc(item.label)}</button>`).join('');
 const body=tab==='overview'
  ?`<div class="notebook-summary"><p><strong>紀錄日期</strong> ${esc(date)}</p><p><strong>導師班</strong> 高${'一二三'[grade-1]}</p><p><strong>紀錄模式</strong> ${readonly?'已完成生涯・唯讀':'目前生涯・唯讀查閱'}</p></div><p class="notebook-hint">筆記本只提供查閱，不會推進時間或變更存檔。其他分類將依後續批次逐步開放。</p>`
  :tab==='people'&&people?renderNotebookPeople(people,selectedPersonId)
  :`<div class="notebook-empty"><h3>${esc(chosen.label)}</h3><p>${esc(chosen.description)}</p><p>此分類內容尚未接入，將於第14批後續開發提供。</p></div>`;
 return `<div class="notebook" aria-label="筆記本"><nav class="notebook-tabs" role="tablist" aria-label="筆記本分類">${tabs}</nav><section class="notebook-content" id="notebook-content" role="tabpanel" aria-labelledby="notebook-tab-${tab}">${body}</section></div>`;
}
