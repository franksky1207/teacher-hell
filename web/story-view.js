import {renderSpecialStoryBody} from './story-formats.js';
import {renderStoryScene} from './story-scene.js';
/** Phase 13-A: display-only projection from formal readStory(). World changes belong to the host. */
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const button=(label,action,attrs='')=>`<button type="button" data-story-action="${action}"${attrs?' '+attrs:''}>${esc(label)}</button>`;

/** A result is visible only after the core has confirmed the choice.
 * Use disclosed facts and the public twelve-item panel; no hidden values. */
function renderConfirmedResult(v){
 const facts=Array.isArray(v.result)?v.result.filter(s=>typeof s==='string'&&s.trim()):[];
 const allowed=['教學能力','班級經營','溝通協調','行政應對','危機處理','情緒調適','體力','精神','抗壓','聲望','熱忱','情緒'];
 const delta=v.teacherDelta&&typeof v.teacherDelta==='object'&&!Array.isArray(v.teacherDelta)?v.teacherDelta:{};
 const changes=allowed.flatMap(name=>{
  const raw=delta[name];if(typeof raw!=='number'||!Number.isFinite(raw))return [];
  const value=Math.round(raw);return value===0?[]:[{name,value:(value>0?'+':'')+value}];
 });
 const details=facts.length?`<ul class="story-result-facts">${facts.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>`:'<p>目前沒有新增的已知事件資訊。</p>';
 const summary=changes.length?`<div class="story-result-deltas">${changes.map(x=>`<span>${esc(x.name)} ${x.value}</span>`).join('')}</div>`:'<p>教師面板沒有可顯示的整數變化。</p>';
 return `<section class="story-result" aria-label="事件結果" aria-live="polite"><h3>目前已知</h3>${details}<h3>本事件教師面板累積變化</h3>${summary}</section>`;
}
export function renderStoryView(v){
 if(!v||!v.page||typeof v.page.text!=='string'||!Number.isInteger(v.pageIndex)||!Number.isInteger(v.pageCount)||v.pageCount<1||v.pageIndex<0||v.pageIndex>=v.pageCount)throw new TypeError('Invalid readStory projection');
 const p=v.page,format=['dialogue','narration','phone','chat','notice','email','news'].includes(p.presentation)?p.presentation:'narration';
 const last=v.pageIndex===v.pageCount-1,previous=!!v.canPrevious,next=!!v.canNext&&!last;
 const choices=Array.isArray(v.choices)?v.choices:[],confirming=!!v.confirmation,waiting=!!v.waiting,ended=!!v.ended;
 if(choices.some(o=>!o||typeof o.id!=='string'||typeof o.text!=='string'))throw new TypeError('Invalid choices');
 if(confirming&&(typeof v.confirmation.text!=='string'||typeof v.confirmation.optionId!=='string'))throw new TypeError('Invalid confirmation');
 const choosing=last&&!confirming&&!waiting&&!ended&&choices.length>0;
 if(choosing&&(choices.length<3||choices.length>8))throw new RangeError('Decisions require 3–8 choices');
 const finish=!!v.canFinish&&!choosing&&!confirming&&!waiting&&!ended,resume=!!v.canResume&&waiting;
 const speaker=typeof v.sceneView?.speaker==='string'?v.sceneView.speaker:p.speaker===null?'旁白':format==='phone'?'通話':format==='chat'?'訊息':'對話';
 // A surface click is only a next-page intent; finish/confirm/resume are button-only.
 const advance=next?' data-story-advance="next"':'';
 let actions='';
 if(confirming&&!waiting&&!ended)actions=`<section class="story-confirm"><p>已選擇：${esc(v.confirmation.text)}</p><div class="story-decision-actions">${button('返回選項','cancel')}${button('確認選擇','confirm')}</div></section>`;
 else if(choosing)actions=`<section class="story-choice-panel" aria-label="選擇回應"><div class="story-choice-grid">${choices.map(o=>button(o.text,'select',`data-option-id="${esc(o.id)}"`)).join('')}</div></section>`;
 else if(finish)actions=`<div class="story-finish">${button('結束','finish')}</div>`;
 else if(resume)actions=`<div class="story-resume">${button('繼續','resume')}</div>`;
 const state=ended?'ended':waiting?'waiting':confirming?'confirming':finish?'finishing':'reading';
 return `<section class="story-view" aria-label="劇情" data-story-format="${format}" data-story-state="${state}">${['phone','chat','notice','email','news'].includes(format)?'':v.sceneView?renderStoryScene(v.sceneView):''}<div class="story-reader" aria-label="劇情閱讀"${advance}><div class="story-speaker">${esc(speaker)}</div>${renderSpecialStoryBody(format,p.text,speaker,v.chatMessages)}</div><nav class="story-navigation" aria-label="劇情翻頁"><span class="story-page-number" aria-label="頁碼">${v.pageIndex+1}／${v.pageCount}</span>${previous?button('上一頁','previous'):''}${next?button('下一頁','next'):''}</nav>${finish&&v.resultConfirmed===true?renderConfirmedResult(v):''}${actions}</section>`;
}
