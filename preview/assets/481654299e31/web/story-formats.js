/** Phase 13-E: static phone/chat/document presentation, no simulated messages. */
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const titles={notice:'校內公告',email:'電子郵件',news:'新聞報導'};
export function renderSpecialStoryBody(format,text,speaker,history=[]){
 if(typeof text!=='string')throw new TypeError('Story text required');
 if(format==='phone')return `<section class="story-phone" aria-label="電話通話"><div class="story-phone-status">通話中</div><p class="story-phone-speaker">${esc(speaker)}</p><p class="story-phone-content">${esc(text)}</p></section>`;
 if(format==='chat'){
  const messages=Array.isArray(history)&&history.length?history:[{speaker, text,own:false}];
  return `<section class="story-chat" aria-label="聊天紀錄">${messages.map(m=>{
   if(typeof m?.text!=='string'||typeof m?.speaker!=='string')throw new TypeError('Invalid chat message');
   return `<div class="story-chat-line${m.own===true?' story-chat-line--own':''}"><span class="story-chat-person">${esc(m.speaker)}</span><p class="story-chat-bubble">${esc(m.text)}</p></div>`;
  }).join('')}</section>`;
 }
 if(Object.hasOwn(titles,format))return `<article class="story-document" aria-label="${titles[format]}"><h3>${titles[format]}</h3><p class="story-document-content">${esc(text)}</p></article>`;
 return `<p class="story-text">${esc(text)}</p>`;
}
