/** Phase 13-A: display-only projection from formal readStory(). World changes belong to the host. */
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const button=(label,action,attrs='')=>`<button type="button" data-story-action="${action}"${attrs?' '+attrs:''}>${esc(label)}</button>`;
export function renderStoryView(v){
 if(!v||!v.page||typeof v.page.text!=='string'||!Number.isInteger(v.pageIndex)||!Number.isInteger(v.pageCount)||v.pageCount<1||v.pageIndex<0||v.pageIndex>=v.pageCount)throw new TypeError('Invalid readStory projection');
 const p=v.page,format=['dialogue','narration','phone','chat'].includes(p.presentation)?p.presentation:'narration';
 const last=v.pageIndex===v.pageCount-1,previous=!!v.canPrevious,next=!!v.canNext&&!last;
 const choices=Array.isArray(v.choices)?v.choices:[],confirming=!!v.confirmation,waiting=!!v.waiting,ended=!!v.ended;
 if(choices.some(o=>!o||typeof o.id!=='string'||typeof o.text!=='string'))throw new TypeError('Invalid choices');
 if(confirming&&(typeof v.confirmation.text!=='string'||typeof v.confirmation.optionId!=='string'))throw new TypeError('Invalid confirmation');
 const choosing=last&&!confirming&&!waiting&&!ended&&choices.length>0;
 if(choosing&&(choices.length<3||choices.length>8))throw new RangeError('Decisions require 3–8 choices');
 const finish=!!v.canFinish&&!choosing&&!confirming&&!waiting&&!ended,resume=!!v.canResume&&waiting;
 const speaker=p.speaker===null?'旁白':format==='phone'?'通話':format==='chat'?'訊息':'對話';
 // A surface click is only a next-page intent; finish/confirm/resume are button-only.
 const advance=next?' data-story-advance="next"':'';
 let actions='';
 if(confirming&&!waiting&&!ended)actions=`<section class="story-confirm"><p>已選擇：${esc(v.confirmation.text)}</p><div class="story-decision-actions">${button('返回選項','cancel')}${button('確認選擇','confirm')}</div></section>`;
 else if(choosing)actions=`<section class="story-choice-panel" aria-label="選擇回應"><div class="story-choice-grid">${choices.map(o=>button(o.text,'select',`data-option-id="${esc(o.id)}"`)).join('')}</div></section>`;
 else if(finish)actions=`<div class="story-finish">${button('結束','finish')}</div>`;
 else if(resume)actions=`<div class="story-resume">${button('繼續','resume')}</div>`;
 const state=ended?'ended':waiting?'waiting':confirming?'confirming':finish?'finishing':'reading';
 return `<section class="story-view" aria-label="劇情" data-story-format="${format}" data-story-state="${state}"><div class="story-reader" aria-label="劇情閱讀"${advance}><div class="story-speaker">${speaker}</div><p class="story-text">${esc(p.text)}</p></div><nav class="story-navigation" aria-label="劇情翻頁"><span class="story-page-number" aria-label="頁碼">${v.pageIndex+1}／${v.pageCount}</span>${previous?button('上一頁','previous'):''}${next?button('下一頁','next'):''}</nav>${actions}</section>`;
}
