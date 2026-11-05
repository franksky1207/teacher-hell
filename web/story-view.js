/** Phase 13-A: display-only story page/choice projection from runtime readStory().
 * Not an event scheduler, dialogue author, or replacement for transaction actions.
 * The caller must dispatch data-story-action through formal runtime story operations. */
const escapeHtml=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const control=(label,action,extra='')=>`<button type="button" data-story-action="${action}" ${extra}>${escapeHtml(label)}</button>`;
export function renderStoryView(view){
 if(!view||!view.page||typeof view.page.text!=='string'||!Number.isInteger(view.pageIndex)||!Number.isInteger(view.pageCount)||view.pageCount<1||view.pageIndex<0||view.pageIndex>=view.pageCount)throw new TypeError('A valid readStory projection is required');
 const p=view.page;
 const format=['dialogue','narration','phone','chat'].includes(p.presentation)?p.presentation:'narration';
 const speaker=p.speaker===null?'旁白':'對話';
 const choices=Array.isArray(view.choices)?view.choices:[];
 const done=Boolean(view.ended||view.waiting);
 const page=`<div class="story-reader" data-story-format="${format}" aria-label="劇情閱讀"><div class="story-speaker">${speaker}</div><p class="story-text">${escapeHtml(p.text)}</p><div class="story-navigation"><span aria-label="頁碼">${view.pageIndex+1}／${view.pageCount}</span>${view.canPrevious?control('上一頁','previous'):''}${view.canNext?control('下一頁','next'):''}</div></div>`;
 let actions='';
 if(view.confirmation){
  actions=`<section class="story-confirm"><p>已選擇：${escapeHtml(view.confirmation.text)}</p><div class="story-decision-actions">${control('返回選項','cancel')}${control('確認選擇','confirm')}</div></section>`;
 }else if(choices.length){
  actions=`<section class="story-choice-panel" aria-label="選擇回應"><div class="story-choice-grid">${choices.map(o=>control(o.text,'select',`data-option-id="${escapeHtml(o.id)}"`)).join('')}</div></section>`;
 }else if(view.canFinish){
  actions=`<div class="story-finish">${control('結束','finish')}</div>`;
 }else if(view.canResume){
  actions=`<div class="story-resume">${control('繼續','resume')}</div>`;
 }
 if(done&&!view.canResume&& !view.canFinish)actions='';
 return page+actions;
}
