/* Pure helpers: no DOM, storage, network or game dependencies. */
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
export function selectOptions(stories,key,field,parentFilter){
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
