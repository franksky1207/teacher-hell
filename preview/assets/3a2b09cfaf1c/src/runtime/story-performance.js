import {STORY_SCENE_IDS} from './story-scenes.js';

export const STORY_EXPRESSIONS=Object.freeze(['calm','happy','angry','sad','surprised','embarrassed']);
export const STORY_ADULT_POSES=Object.freeze(['neutral','side','hand-on-hip','arms-open','gesture','weight-shift']);
const directives=['enter','exit','expression','pose'];
const record=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);
const need=(valid,message)=>{if(!valid)throw new RangeError('AVG 演出：'+message);};

export function createStoryPerformance(){
 return {scene:null,cast:[],looks:new Map()};
}

/** Apply one visible page. Room and acting state belong to display only. */
export function advanceStoryPerformance(state,page,roles){
 if(!Object.hasOwn(page,'performance')){
  state.scene=page.scene??null;
  state.cast=page.cast.map(a=>({...a}));
  // Legacy snapshots only update a previously known look when its actor speaks.
  for(const actor of state.cast){
   if(!state.looks.has(actor.role)||page.speaker===actor.role){
    state.looks.set(actor.role,{expression:STORY_EXPRESSIONS.includes(actor.expression)?actor.expression:'calm',pose:actor.pose});
   }
  }
  return page;
 }

 const cue=page.performance;
 need(record(cue)&&Object.keys(cue).every(key=>directives.includes(key)),'未知演出欄位');
 need(!Object.hasOwn(page,'cast'),'同一頁只能使用 cast 或 performance');
 if(Object.hasOwn(page,'scene')){
  need(STORY_SCENE_IDS.includes(page.scene),'未知場景 '+page.scene);
  state.scene=page.scene;
 }
 const validRole=role=>typeof role==='string'&&role!=='teacher'&&roles.has(role);
 for(const key of ['exit','enter']){
  if(!Object.hasOwn(cue,key))continue;
  const names=cue[key];
  need(Array.isArray(names)&&new Set(names).size===names.length,'無效進退場槽位 '+key);
  for(const role of names){
   need(validRole(role),'未知或不可登場的槽位 '+String(role));
   const index=state.cast.findIndex(actor=>actor.role===role);
   if(key==='exit'){
    need(index>=0,'未登場的角色不能退場 '+role);
    state.cast.splice(index,1);
   }else{
    need(index<0&&state.cast.length<2,'不可重複登場或同框超過兩位 NPC');
    const left=state.cast[0]?.position==='right';
    const actor={role,position:left?'left':state.cast.length?'right':'left'};
    state.cast[left?'unshift':'push'](actor);
   }
  }
 }
 for(const [key,values] of [['expression',STORY_EXPRESSIONS],['pose',STORY_ADULT_POSES]]){
  if(!Object.hasOwn(cue,key))continue;
  const updates=cue[key];
  need(record(updates),'無效的 '+key+' 對照表');
  for(const [role,value] of Object.entries(updates)){
   need(validRole(role)&&state.cast.some(actor=>actor.role===role),'無法更新未登場角色 '+role);
   need(values.includes(value),'未知 '+key+' '+value);
   state.looks.set(role,{...state.looks.get(role),[key]:value});
  }
 }
 const speaker=page.speaker??null;
 need(speaker===null||speaker==='teacher'||state.cast.some(actor=>actor.role===speaker),'說話者未登場 '+speaker);
 // A legacy centered actor may be joined by a second actor on an annotated page.
 if(state.cast.length===2){
  if(state.cast[0].position==='right'||state.cast[1].position==='left')state.cast.reverse();
  state.cast.forEach((actor,index)=>{actor.position=index?'right':'left';});
 }
 const cast=state.cast.map(actor=>({
  role:actor.role,position:state.cast.length===1?'center':actor.position,expression:'calm',...state.looks.get(actor.role)
 }));
 return {...page,scene:state.scene,speaker,cast};
}

export function replayStoryPerformance(pages,index,roles){
 if(!Array.isArray(pages)||!Number.isInteger(index)||index<0||index>=pages.length)throw new RangeError('Invalid story page cursor');
 const state=createStoryPerformance(),chatPages=[];
 let page;
 for(let i=0;i<=index;i++){
  page=advanceStoryPerformance(state,pages[i],roles);
  if(page.presentation==='chat')chatPages.push(page);
  else chatPages.length=0;
 }
 return {page,chatPages,looks:state.looks};
}
