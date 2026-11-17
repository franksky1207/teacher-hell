/** 15-D display-only wardrobe and adult art assignment. No save-schema changes. */
import {calendarDay,gradeAt} from '../src/calendar/calendar.js';
import {FULL_SHEET_CASUAL_SCENES} from './full-sheet-preview.js';
import {NPC_SILHOUETTE_IDS} from './npc-silhouette-preview.js';
const casual=new Set(FULL_SHEET_CASUAL_SCENES.map(([id])=>id));
const winterMonths=new Set([11,12,1,2,3]);
const activeActivities=(day,slotId)=>{
 const slot=day.slots.find(s=>s.id===slotId);
 const ids=new Set(slot?.activityIds??[]);
 return day.activities.filter(a=>ids.has(a.id)).map(a=>a.kind);
};
function casualActivity(kind,grade,termId){
 if(kind==='field-trip'){
  if(grade===1)return termId?.endsWith(':spring')?'grade1-spring-trip':'grade1-autumn-trip';
  if(grade===2&&termId?.endsWith(':autumn'))return 'grade2-autumn-trip';
 }
 return casual.has(kind)?kind:null;
}
export function storyCostume(world){
 const plan=world?.extensions?.['teacher-hell/world']?.plan;
 const position=world?.position;
 if(!plan||!position)return {wear:'uniform-summer',cell:null,reason:'legacy'};
 const grade=gradeAt(position.date,plan.startYear);
 const day=calendarDay(position.date,grade,plan.calendarVersion);
 const kind=activeActivities(day,position.slotId);
 const termId=day.term?.id??day.courseSemesterId;
 const trip=kind.map(k=>casualActivity(k,grade,termId)).find(Boolean);
 // Casual sheet cells are six APPROVED ACTIVITY OUTFITS, not expressions.
 if(trip)return {wear:'casual',cell:trip,reason:'calendar-activity'};
 const month=Number(position.date.slice(5,7));
 const season=winterMonths.has(month)?'winter':'summer';
 if(kind.some(k=>['sports','fair'].includes(k)))return {wear:'sports-'+season,cell:null,reason:'school-activity'};
 return {wear:'uniform-'+season,cell:null,reason:'school-calendar'};
}
function stableNumber(id,variant){
 let n=2166136261;
 for(const char of String(id)){n^=char.codePointAt(0);n=Math.imul(n,16777619);}
 return (n^(Number.isInteger(variant)?variant:0))>>>0;
}
export function stableAdultArt(id,profile={},ageStage='adult'){
 if(!id)return null;
 const n=stableNumber(id,profile?.appearance?.variant);
 // Family role is explicit. Unspecified adult cast selection uses a stable
 // visual variant only; it does not assert a character's gender or age.
 let type;
 if(profile.gender==='female'||profile.familyRole==='mother')type='female';
 else if(profile.gender==='male'||profile.familyRole==='father')type='male';
 else if(profile.familyRole==='guardian')type=n%2?'female':'male';
 else type=n%2?'female':'male';
 const index=(Math.floor(n/2)%3)+1;
 const name='adult-'+(ageStage==='young'?'young-':'')+type+'-0'+index;
 return NPC_SILHOUETTE_IDS.some(entry=>entry.id===name)?name:null;
}
export const ADULT_POSES=Object.freeze(['neutral','side','hand-on-hip','arms-open','gesture','weight-shift']);
export function adultPoseForExpression(expression){
 return ({calm:'neutral',happy:'arms-open',angry:'hand-on-hip',sad:'side',surprised:'gesture',embarrassed:'weight-shift'})[expression]??'neutral';
}

/** Only after a recorded graduation and a multi-year interval may a student's
 * visual age advance. Never infer a reunion from hidden story themes. */
export function isMatureAlumnus(world,id){
 const registry=world?.numeric?.evolution?.world?.registry;
 const date=world?.position?.date;
 if(!registry||typeof date!=='string')return false;
 return (registry.enrollments??[]).some(e=>e.personId===id&&
  ['graduated','course-completed'].includes(e.status)&&typeof e.until==='string'&&
  Number(date.slice(0,4))-Number(e.until.slice(0,4))>=3);
}
