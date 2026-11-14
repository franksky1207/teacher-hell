/** 15-D: Select a visual background from the present, disclosed location only.
 * No event topic, future stage, hidden state or arbitrary file-name interpolation.
 */
import {BACKGROUND_ENTRIES,backgroundUrl} from './background-scenes.js';
const catalog=new Map(BACKGROUND_ENTRIES.map(e=>[e.scene+'/'+e.variant,e]));
const storyPlaces=Object.freeze({'school:counselling-corner':'school-courtyard'});
export const SCENE_CASES=Object.freeze([
 {id:'opening',label:'暑輔開場・校門口',context:{opening:true,slotId:'early'}},
 {id:'early',label:'早自習・教室',context:{slotId:'early'}},
 {id:'lesson',label:'正式授課・教室',context:{slotId:'p2',hasLesson:true}},
 {id:'office',label:'空堂・教師辦公室',context:{slotId:'p4'}},
 {id:'lunch',label:'午餐・教室',context:{slotId:'lunch'}},
 {id:'evening',label:'晚自習・夜間教室',context:{slotId:'p9',hasLesson:true}},
 {id:'phone-office',label:'家長來電・教師辦公室',context:{slotId:'p4',presentation:'phone'}},
 {id:'phone-class',label:'家長來電・教室',context:{slotId:'early',presentation:'phone'}},
 {id:'phone-home',label:'家長來電・家中',context:{slotId:'private',presentation:'phone'}},
 {id:'private',label:'私人時間・家中',context:{slotId:'private'}},
 {id:'story',label:'已知校園談話角落',context:{slotId:'p3',sceneTag:'school:counselling-corner'}},
 {id:'aftercare',label:'六月善後・教師辦公室',context:{slotId:'p4',aftercare:true}},
 {id:'unknown',label:'沒有明確地點・依當前校務時段推定',context:{slotId:'p4',dayKind:'school',sceneTag:'unknown:location'}},
 {id:'missing',label:'素材載入失敗・中性降級',context:{slotId:'p2',hasLesson:true,simulateMissing:true}},
]);
export function sceneEntry(scene,variant='day'){
 const candidate=catalog.get(scene+'/'+variant);
 return candidate??catalog.get(scene+'/shared')??catalog.get(scene+'/day')??null;
}
const nightSlot=slot=>slot==='private'||slot==='evening'||slot==='dinner'||/^p(?:9|10|11)$/.test(slot??'');
const light=slot=>nightSlot(slot)?'night':/^p[78]$/.test(slot??'')?'dusk':'day';
/** Never discard the physical scene during normal gameplay. A missing art file
 * alone uses the technical neutral gradient handled by scene-background.js.
 * Unknown story scene keys fall back to the teacher's current calendar context. */
const activityScene=Object.freeze({
 'sports':'school-field','fair':'school-courtyard','graduation':'school-auditorium',
 'parents':'school-classroom','clubs':'school-classroom',
 'christmas':'school-auditorium','halloween':'school-courtyard',
 'university-fair':'school-auditorium','teachers-day':'school-auditorium',
 'graduation-trip-1':'graduation-creative-park',
 'graduation-trip-2':'graduation-amusement-park',
 'graduation-trip-3':'graduation-old-street'
});
const sharedOnly=scene=>sceneEntry(scene,'shared');
export function selectScene({opening=false,completed=false,failed=false,aftercare=false,
 sceneTag=null,presentation=null,slotId=null,hasLesson=false,
 dayKind=null,activityKinds=[],grade=null,termId=null}={}){
 if(opening)return sceneEntry('school-gate','day');
 if(completed||failed)return sceneEntry('home-living-room','day');
 const variant=light(slotId);
 // Explicit supported location takes precedence even when a phone is ringing.
 if(sceneTag!=null&&storyPlaces[sceneTag])return sceneEntry(storyPlaces[sceneTag],variant);
 const knownActivities=Array.isArray(activityKinds)?activityKinds:[];
 const activity=knownActivities.find(kind=>activityScene[kind]);
 if(activity){
  const name=activityScene[activity];
  if(name==='school-auditorium'&&activity==='christmas')return sceneEntry(name,'christmas');
  return sceneEntry(name,variant);
 }
 if(knownActivities.includes('field-trip')){
  const scene=grade===1?(termId?.endsWith(':spring')?'fieldtrip-grade1-spring':'fieldtrip-grade1-fall')
   :grade===2?'fieldtrip-grade2-fall':null;
  if(scene)return sceneEntry(scene,'day');
 }
 if(aftercare)return sceneEntry('school-teachers-office','day');
 if(['early','lunch','noon'].includes(slotId))return sceneEntry('school-classroom',variant);
 if(slotId==='private'||slotId==='evening'||slotId==='vacation-day'||slotId==='festival-day')
  return sceneEntry('home-living-room',slotId==='private'||slotId==='evening'?'night':'day');
 if(slotId==='travel-day')return sceneEntry('outside-neutral','shared');
 if(slotId==='dinner'||slotId==='study1'||slotId==='study2'||slotId==='study3')
  return sceneEntry('school-classroom','night');
 if(hasLesson)return sceneEntry('school-classroom',variant);
 if(/^p[1-8]$/.test(slotId??''))return sceneEntry('school-teachers-office',variant);
 // On weekends and holidays, the default is the teacher's home unless the
 // authoritative calendar explicitly places them at school.
 if(['weekend','holiday','spring-festival','long-vacation'].includes(dayKind))
  return sceneEntry('home-living-room',slotId==='evening'?'night':'day');
 if(dayKind==='grade3-saturday'||['school','summer-camp','winter-camp'].includes(dayKind))
  return sceneEntry('school-teachers-office',variant);
 if(slotId==='morning'||slotId==='afternoon')return sceneEntry('home-living-room','day');
 return sharedOnly('outside-neutral')??sceneEntry('home-living-room','day');
}
export function sceneImageUrls(entry,baseUrl){
 if(!entry)return null;
 return {desktop:backgroundUrl(entry,'desktop',baseUrl),mobile:backgroundUrl(entry,'mobile',baseUrl)};
}
