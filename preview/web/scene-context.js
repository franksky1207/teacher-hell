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
 {id:'unknown',label:'未確認場所・中性降級',context:{slotId:'p4',sceneTag:'unknown:location'}},
]);
export function sceneEntry(scene,variant='day'){
 const candidate=catalog.get(scene+'/'+variant);
 return candidate??catalog.get(scene+'/shared')??catalog.get(scene+'/day')??null;
}
const nightSlot=slot=>slot==='private'||slot==='evening'||slot==='dinner'||/^p(?:9|10|11)$/.test(slot??'');
const light=slot=>nightSlot(slot)?'night':/^p[78]$/.test(slot??'')?'dusk':'day';
/** null means there is no justified physical location: neutral gradient only. */
export function selectScene({opening=false,completed=false,failed=false,aftercare=false,
 sceneTag=null,presentation=null,slotId=null,hasLesson=false}={}){
 if(opening)return sceneEntry('school-gate','day');
 if(completed||failed)return null;
 // A call or a message takes place where the teacher currently IS.
 // Never place the teacher at the remote caller's location.
 const remote=['phone','chat','notice','email','news'].includes(presentation);
 if(!remote&&sceneTag!==null&&sceneTag!==undefined){
  const location=storyPlaces[sceneTag];
  return location?sceneEntry(location,light(slotId)):null;
 }
 if(aftercare)return sceneEntry('school-teachers-office','day');
 if(['early','lunch','noon','dinner'].includes(slotId))return sceneEntry('school-classroom',light(slotId));
 if(slotId==='private')return sceneEntry('home-living-room','night');
 if(/^p(?:9|10|11)$/.test(slotId??''))return sceneEntry('school-classroom','night');
 if(hasLesson)return sceneEntry('school-classroom',light(slotId));
 if(/^p[1-8]$/.test(slotId??''))return sceneEntry('school-teachers-office',light(slotId));
 // Weekends, vacations, travel and unknown slots have no guaranteed location.
 return null;
}
export function sceneImageUrls(entry,baseUrl){
 if(!entry)return null;
 return {desktop:backgroundUrl(entry,'desktop',baseUrl),mobile:backgroundUrl(entry,'mobile',baseUrl)};
}
