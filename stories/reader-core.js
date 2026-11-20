/* Pure helpers: no DOM, storage, network or game dependencies. */
/* Only human-readable labels; official topic/pool IDs remain the filter values. */
const TOPIC_TITLES=Object.freeze({
 'T1-1':'首次進班與建班','T1-2':'高中新生適應',
 'T1-3':'高一上家長日','T1-4':'日本學校參訪前後','T1-5':'首次校慶擺攤',
 'T2-1':'班呼／校歌比賽前後',
 'T3-1':'英文歌曲比賽前後','T3-2':'高二校慶擺攤',
 'T4-1':'第二次升學輔導與大學博覽會','T4-2':'畢業旅行行前安排',
 'T5-1':'高三教師節活動','T5-2':'最後一次運動會',
 'T5-3':'最後一次校慶（高三不擺攤）','T5-4':'最後一次聖誕晚會',
 'T5-5':'學測前最後階段特殊安排',
 'T6-1':'學測成績公布後的學生心情','T6-2':'申請入學第一階段篩選',
 'T6-3':'申請入學第二階段面試安排','T6-4':'最後一次園遊會',
 'T6-5':'畢業典禮前的特殊師生請求'
});
export function topicDisplayName(id){return TOPIC_TITLES[id]??id;}
export function poolDisplayName(id){
 const m=String(id??'').match(/^(T[1-6]-\d+):(before|after|single)$/);
 if(!m)return id;
 const phase={before:'活動前',after:'活動後',single:''}[m[2]];
 return topicDisplayName(m[1])+(phase?'（'+phase+'）':'');
}
export const semesters=['T1','T2','T3','T4','T5','T6','G'];
export function matchesStory(story,filters={}){
 const q=String(filters.query??'').trim().toLocaleLowerCase('zh-Hant');
 const semester=filters.semester??'',topic=filters.topic??'',pool=filters.pool??'';
 if(semester&&(semester==='G'?story.type!=='G':story.topicId?.split('-')[0]!==semester))return false;
 if(topic&&story.topicId!==topic)return false;
 if(pool&&story.poolId!==pool)return false;
 if(!q)return true;
 const fields=[story.storyId,story.draftRef,story.title,story.topicId,story.poolId,
   ...Object.values(story.summary??{})].filter(Boolean);
 return fields.some(x=>String(x).toLocaleLowerCase('zh-Hant').includes(q));
}
export function filterStories(stories,filters){
 return stories.filter(story=>matchesStory(story,filters));
}
export function selectOptions(stories,field,parentFilter){
 const values=new Set(stories.filter(x=>!parentFilter||parentFilter(x)).map(x=>x[field]).filter(Boolean));
 return [...values].sort((a,b)=>a.localeCompare(b,'zh-Hant',{numeric:true}));
}
export function neighboringIds(stories,storyId){
 const i=stories.findIndex(s=>s.storyId===storyId);
 return {previous:i>0?stories[i-1].storyId:null,next:i>=0&&i<stories.length-1?stories[i+1].storyId:null};
}
export function sanitizeReaderPreferences(value={}){
 return {
  theme:['paper','light','dark'].includes(value.theme)?value.theme:'paper',
  size:Number.isFinite(Number(value.size))?Math.max(15,Math.min(25,Math.round(Number(value.size)))):18
 };
}
export function safeDetailPath(path){
 if(typeof path!=='string'||!/^stories\/(?:T[1-6]-\d+|G-\d+)\.json$/.test(path))
  throw Error('非法故事資料路徑');
 return path;
}
export function validateReaderIndex(index){
 if(index?.schemaVersion!==1||!Array.isArray(index.stories)||index.count!==index.stories.length)
  throw Error('故事索引格式不符');
 const ids=new Set();
 for(const story of index.stories){
  if(!/^(?:T[1-6]-\d+|G-\d+)$/.test(story.storyId??'')||ids.has(story.storyId))
   throw Error('故事索引ID重複或錯誤');
  ids.add(story.storyId);
  if(story.detail!=='stories/'+story.storyId+'.json')throw Error('故事資料路徑與ID不符');
  safeDetailPath(story.detail);
 }
 return index.stories;
}
export function validateReaderDetail(detail,summary){
 if(!detail||detail.storyId!==summary.storyId||!Array.isArray(detail.options)||detail.options.length!==4||
 !Array.isArray(detail.results)||detail.results.length!==8||!detail.matrix)
  throw Error('故事資料不完整或ID不符');
 return detail;
}
