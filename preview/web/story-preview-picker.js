// Story catalog stays a lightweight index. Full Markdown/AVG is fetched only for a selected story.
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const AVG_PICKER_LIMIT=50;
export const AVG_TOPIC_NAMES={
 "T1-1": "首次進班與建班",
 "T1-2": "高中新生適應",
 "T1-3": "高一上家長日",
 "T1-4": "日本學校參訪前後",
 "T1-5": "首次校慶擺攤",
 "T2-1": "班呼／校歌比賽前後",
 "T3-1": "英文歌曲比賽前後",
 "T3-2": "高二校慶擺攤",
 "T4-1": "第二次升學輔導與大學博覽會",
 "T4-2": "畢業旅行行前安排",
 "T5-1": "高三教師節活動",
 "T5-2": "最後一次運動會",
 "T5-3": "最後一次校慶（高三不擺攤）",
 "T5-4": "最後一次聖誕晚會",
 "T5-5": "學測前最後階段特殊安排",
 "T6-1": "學測成績公布後的學生心情",
 "T6-2": "申請入學第一階段篩選",
 "T6-3": "申請入學第二階段面試安排",
 "T6-4": "最後一次園遊會",
 "T6-5": "畢業典禮前的特殊師生請求"
};
export const storyKind=s=>s.type??(/^P[1-6]-/.test(s.storyId)?'P':/^G-/.test(s.storyId)?'G':'T');
export const storyNumber=s=>Number(s.storyId.match(/(\d+)$/)?.[1])||0;
export const storyPClass=s=>s.storyId.match(/^(P[1-6])-/)?.[1]??'P';
export const storyPEvent=s=>String(s.eventId??s.eventTypeId??s.eventKey??s.poolId??s.topicId??'其他事件');
export const storyGroup=s=>Math.floor(Math.max(0,storyNumber(s)-1)/AVG_PICKER_LIMIT)+1;
const sortIds=(a,b)=>a.storyId.localeCompare(b.storyId,'en',{numeric:true});
const unique=items=>[...new Set(items)];
export function pickAvgStories(index,filter={}){
 const {kind='T',term='all',topic='all',group='all',pClass='all',event='all',query=''}=filter;
 const q=query.trim().toLocaleLowerCase();
 let base=index.filter(s=>storyKind(s)===kind).sort(sortIds);
 if(kind==='T'){
  if(term!=='all')base=base.filter(s=>s.topicId?.startsWith(term+'-'));
  if(topic!=='all')base=base.filter(s=>s.topicId===topic);
 }else if(kind==='G'){
  if(group!=='all')base=base.filter(s=>storyGroup(s)===Number(group));
 }else{
  if(pClass!=='all')base=base.filter(s=>storyPClass(s)===pClass);
  if(event!=='all')base=base.filter(s=>storyPEvent(s)===event);
  if(group!=='all')base=base.filter(s=>storyPickerGroup(s,index)===Number(group));
 }
 if(q)base=base.filter(s=>s.storyId.toLocaleLowerCase().includes(q)||s.title.toLocaleLowerCase().includes(q));
 return base;
}
const field=(name,label,items,selected)=>'<label>'+label+'<select data-avg-filter="'+name+'">'+items.map(([value,title])=>
 '<option value="'+esc(value)+'"'+(value===selected?' selected':'')+'>'+esc(title)+'</option>').join('')+'</select></label>';
// P3-P6 first group by their concrete event, then split that event into pages of 50.
export function storyPickerGroup(s,index){
 if(storyKind(s)!=='P'||['P1','P2'].includes(storyPClass(s)))return storyGroup(s);
 const same=index.filter(other=>storyKind(other)==='P'&&storyPClass(other)===storyPClass(s)&&storyPEvent(other)===storyPEvent(s)).sort(sortIds);
 return Math.floor(Math.max(0,same.findIndex(other=>other.storyId===s.storyId))/AVG_PICKER_LIMIT)+1;
}
const groups=(stories,index)=>unique(stories.map(s=>storyPickerGroup(s,index))).sort((a,b)=>a-b).map(n=>[String(n),'第 '+String(n).padStart(2,'0')+' 組（最多50篇）']);
export function renderAvgStoryPicker(index,filter={},selectedId=''){
 const state={kind:'T',term:'all',topic:'all',group:'all',pClass:'all',event:'all',query:'',...filter};
 const base=index.filter(s=>storyKind(s)===state.kind).sort(sortIds);
 const terms=unique(base.map(s=>s.topicId?.match(/^T[1-6]/)?.[0]).filter(Boolean)).sort();
 const matchingTerm=state.term==='all'?base:base.filter(s=>s.topicId?.startsWith(state.term+'-'));
 const topics=unique(matchingTerm.map(s=>s.topicId).filter(Boolean)).sort((a,b)=>a.localeCompare(b,'en',{numeric:true}));
 const categories=unique(base.map(storyPClass)).sort();
 const matchingCategory=state.pClass==='all'?base:base.filter(s=>storyPClass(s)===state.pClass);
 const events=unique(matchingCategory.map(storyPEvent)).sort();
 const relevant=state.kind==='G'?base:matchingCategory.filter(s=>state.event==='all'||storyPEvent(s)===state.event);
 const groupList=groups(relevant,index);
 let fields='<div class="avg-picker__filters">';
 if(state.kind==='T'){
  fields+=field('term','學期',[['all','全部學期'],...terms.map(t=>[t,({T1:'高一上',T2:'高一下',T3:'高二上',T4:'高二下',T5:'高三上',T6:'高三下'}[t]??t)+'（'+t+'）'])],state.term);
  fields+=field('topic','主題',[['all','全部主題'],...topics.map(t=>[t,t+'｜'+(AVG_TOPIC_NAMES[t]??t)])],state.topic);
 }else if(state.kind==='G'){
  fields+=field('group','50 篇分組',[['all','全部組別'],...groupList],state.group);
 }else{
  fields+=field('pClass','被動事件類別',[['all','全部類別'],...categories.map(c=>[c,c])],state.pClass);
  if(!['P1','P2'].includes(state.pClass)){
   fields+=field('event','事件分類',[['all','全部事件'],...events.map(e=>[e,e])],state.event);
  }
  fields+=field('group','50 篇分組',[['all','全部組別'],...groupList],state.group);
 }
 fields+='</div>';
 const matches=pickAvgStories(index,state);
 const page=Math.max(0,Number(state.page)||0),offset=page*AVG_PICKER_LIMIT;
 const visible=matches.slice(offset,offset+AVG_PICKER_LIMIT);
 const types=[['T','T 特定'],['G','G 通用'],['P','P 被動']];
 return '<section class="avg-picker" aria-label="選擇試演故事"><div class="avg-picker__tabs" role="group" aria-label="故事類型">'+types.map(([type,label])=>'<button type="button" data-action="avg-kind:'+type+'"'+(state.kind===type?' aria-pressed="true" class="selected"':' aria-pressed="false"')+'>'+label+'</button>').join('')+'</div>'+
 '<label class="avg-picker__search">搜尋編號或名稱<input type="search" data-avg-search value="'+esc(state.query)+'" placeholder="例如：T1-008、冷氣、匿名"></label>'+fields+
 '<p class="avg-picker__count">符合 '+matches.length+' 篇；每頁最多 '+AVG_PICKER_LIMIT+' 篇</p>'+
 '<div class="avg-picker__results" role="list" aria-label="故事搜尋結果">'+(visible.length?visible.map(s=>'<button type="button" role="listitem" data-action="avg-select-story:'+esc(s.storyId)+'"'+(s.storyId===selectedId?' class="selected"':'')+'><strong>'+esc(s.storyId)+'</strong><span>'+esc(s.title)+'</span></button>').join(''):'<p>沒有符合條件的已發布故事。</p>')+'</div>'+
 '<div class="avg-picker__paging"><button type="button" data-action="avg-page:previous"'+(page===0?' disabled':'')+'>上一頁</button><span>'+(matches.length?Math.min(page+1,Math.ceil(matches.length/AVG_PICKER_LIMIT)):0)+'／'+Math.ceil(matches.length/AVG_PICKER_LIMIT)+'</span><button type="button" data-action="avg-page:next"'+(offset+AVG_PICKER_LIMIT>=matches.length?' disabled':'')+'>下一頁</button></div></section>';
}
