import {calendarDay,gradeAt,SENIOR_CALENDAR_VERSION} from '../src/calendar/calendar.js';

const trim=x=>String(x??'').trim();
const cells=line=>/^\|.*\|\s*$/.test(line.trim())?line.trim().slice(1,-1).split('|').map(x=>trim(x).replaceAll(String.fromCharCode(96),'')):null;
export function readTopicWindows(source){
 const map=new Map(),dayTopics=new Map(),pools=new Map(),topicPools=new Map();
 const date=s=>{const m=s.trim().match(/^(?:(\d{4})\/)?(?:(\d{1,2})\/)?(\d{1,2})$/);return m?m.slice(1).map(v=>v?+v:null):null};
 const stamp=(y,m,d)=>{
  if(!y||!m||!d)return null;
  const dt=new Date(Date.UTC(y,m-1,d));
  return dt.getUTCFullYear()===y&&dt.getUTCMonth()+1===m&&dt.getUTCDate()===d?dt.toISOString().slice(0,10):null;
 };
 for(const line of source.split(/\r?\n/)){
  const row=cells(line),m=row?.[0].match(/^\*\*(T[1-6]-\d+)\*\*$/);if(!m)continue;
  if(map.has(m[1]))throw Error('重複T主題：'+m[1]);
  const spec=row[2],set=new Set();let y=null,mon=null;
  for(const chunk of spec.split('、')){
   const [begin,end]=chunk.split('～').map(x=>date(x));
   if(!begin)throw Error('無法解析T日期：'+chunk);
   y=begin[0]??y;mon=begin[1]??mon;
   const from=stamp(y,mon,begin[2]);if(!from)throw Error('無效T日期：'+chunk);
   let to=from;
   if(end){const ey=end[0]??y,em=end[1]??mon;to=stamp(ey,em,end[2]);if(!to||to<from)throw Error('無效T日期範圍：'+chunk);y=ey;mon=em}
   for(let t=Date.parse(from+'T00:00:00Z');t<=Date.parse(to+'T00:00:00Z');t+=86400000){
    const day=new Date(t).toISOString().slice(0,10);set.add(day);
    const group=dayTopics.get(day)||new Set();group.add(m[1]);dayTopics.set(day,group);
   }
  }
  const [poolSpec,...flags]=(row[5]||'').split(';'),allowedFlags=['phase-unconfirmed','published-and-known'];
  if(flags.some(f=>!allowedFlags.includes(f)))throw Error('未知T窗口註記：'+m[1]);
  const dates=[...set],ids=[];let offset=0;
  for(const entry of poolSpec.split(',')){
   const part=entry.match(/^(before|after|single):([1-9]\d*)$/);
   if(!part)throw Error('缺少或無效T故事池註記：'+m[1]);
   const phase=part[1],count=Number(part[2]),id=m[1]+':'+phase;
   if(pools.has(id)||offset+count>dates.length)throw Error('T池別重複或超出日期：'+id);
   const pool={topicId:m[1],poolId:id,phase,dates:new Set(dates.slice(offset,offset+count)),
    phaseConfirmed:!flags.includes('phase-unconfirmed'),
    prerequisites:flags.includes('published-and-known')?['results-published','participant-informed']:[],sourceNotes:row[4]};
   pools.set(id,pool);ids.push(id);offset+=count;
  }
  if(offset!==dates.length||dates.length!==Number(row[3])||(ids.length>1&&ids.some(id=>id.endsWith(':single'))))throw Error('T故事池日期未完整分配：'+m[1]);
  topicPools.set(m[1],ids);
  map.set(m[1],set);
 }
 return {topics:map,days:dayTopics,pools,topicPools};
}
/** Resolve a pool from the sole Markdown source; never infer it from a quota day. */
export function resolveTopicPool(windows,topicId,poolId){
 const pool=windows.pools?.get(poolId);
 if(!pool||pool.topicId!==topicId)throw Error('T主題與故事池不符：'+topicId+' / '+poolId);
 return pool;
}
/** Read-only contract. Returned dates are pool dates, not a new capacity counter. */
export function storyPlaybackWindow(story,windows){
 if(story.type!=='T')throw Error('只有T故事有T播放窗口');
 const pool=resolveTopicPool(windows,story.topicId,story.poolId);
 if(!pool.dates.has(story.date))throw Error('T配額歸屬日不屬於故事池：'+story.date);
 return {...pool,dates:[...pool.dates],prerequisites:[...pool.prerequisites],quotaDate:story.date};
}
/** Window/calendar qualification only. It never approves knowledge, roles or repeat use. */
export function queryTWindowEligibility(story,{date,topicId,phase,grade},windows){
 const pool=storyPlaybackWindow(story,windows),reasons=[];
 if(topicId!==pool.topicId)reasons.push('topic-mismatch');
 if(phase!==pool.phase)reasons.push('phase-mismatch');
 if(!pool.dates.includes(date))reasons.push('outside-pool');
 const expectedGrade=Math.ceil(Number(pool.topicId[1])/2);
 if(grade!==expectedGrade)reasons.push('grade-mismatch');
 try{
  const day=calendarDay(date,grade,SENIOR_CALENDAR_VERSION);
  if(gradeAt(date,2026)!==expectedGrade||!['school','summer-camp','winter-camp'].includes(day.kind)||day.exam||day.activities.length||day.holiday.length)reasons.push('calendar-forbidden');
 }catch{reasons.push('calendar-forbidden')}
 return {windowEligible:reasons.length===0,reasons,topicId:pool.topicId,poolId:pool.poolId,phase:pool.phase,
  quotaDate:pool.quotaDate,playableDates:pool.dates,
  requiredChecks:[...pool.prerequisites,...(!pool.phaseConfirmed?['phase-boundary-review']:[]),'roles-present-and-authorized','story-not-yet-triggered','story-specific-conditions'],
  scope:'window-and-calendar-only'};
}
