import {MUSIC_KEYS} from '../src/runtime/story-music.js';
import {runtimeCalendarDay} from '../src/runtime/aftercare-calendar.js';
import {selectScene} from './scene-context.js';

const playful=new Set(['anniversary','fair','sports','clubs','field-trip',
 'graduation-trip-1','graduation-trip-2','graduation-trip-3']);

export function slotActivityKinds(day,slotId){
 const ids=new Set(day?.slots.find(slot=>slot.id===slotId)?.activityIds??[]);
 return day?.activities.filter(activity=>ids.has(activity.id)).map(activity=>activity.kind)??[];
}

export function contextMusic(context={}){
 if(context.opening||context.completed||context.failed)return 'school';
 const {activityKinds=[]}=context;
 if(activityKinds.includes('graduation'))return 'touching';
 if(activityKinds.some(kind=>playful.has(kind)))return 'playful';
 const scene=selectScene(context)?.scene;
 if(scene==='home-living-room'||scene==='home-bedroom')return 'home';
 return 'school';
}

export function eventMusic(music,fallback='school'){
 return MUSIC_KEYS.has(music)?music:fallback;
}

export function gameMusic(world,story,context){
 if(!story)return contextMusic(context);
 if(story.music!==undefined)return eventMusic(story.music);
 const start=story.musicOrigin;
 if(!start?.at?.date||!start.at.slotId)return 'school';
 const {date,slotId}=start.at;
 const day=runtimeCalendarDay(world,date,start.cursor,start.order);
 return contextMusic({slotId,dayKind:day.kind,activityKinds:slotActivityKinds(day,slotId)});
}
