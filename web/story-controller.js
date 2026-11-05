/** Phase 13-B: legal readStory projections and persisted story operations. No event generation. */
import {readStory,storyState,storyContent} from '../src/runtime/story.js';
import {createId} from '../src/contracts/foundation.js';
const actions=new Set(['previous','next','select','cancel','confirm','finish','resume']);
export function currentStory(world){
 const history=world.extensions['teacher-hell/world'].history;
 const selected=history.filter(h=>h.type==='event-selection').flatMap(h=>h.data.selected);
 const candidates=[];
 for(const item of selected){
  const event=world.events.find(e=>e.id===item.eventId);
  if(!event||!storyContent(world,event.id))continue;
  const state=storyState(world,event.id);
  if(!state||state.mode==='ended')continue;
  const view=readStory(world,event.id);
  if(view.waiting&&!view.canResume)continue;
  candidates.push(view);
 }
 return candidates[0]??null;
}
export function makeStoryRequest(world,eventId,action,optionId=null){
 if(!actions.has(action))throw new RangeError('Unknown story action');
 const view=currentStory(world);
 if(!view||view.eventId!==eventId)throw new RangeError('No active legal story');
 const allowed={
  previous:view.canPrevious,
  next:view.canNext,
  select:view.choices.some(choice=>choice.id===optionId),
  cancel:!!view.confirmation,
  confirm:!!view.confirmation,
  finish:view.canFinish,
  resume:view.canResume
 };
 if(!allowed[action]||(action==='select'?typeof optionId!=='string':optionId!==null))throw new RangeError('Story action is unavailable');
 const revision=world.extensions['teacher-hell/world'].revision;
 return {id:createId('operation',[world.identity.attemptId,'web-story',String(revision),eventId,action]),
  attemptId:world.identity.attemptId,expectedRevision:revision,actorId:world.identity.playerId,
  preconditions:[],operations:[{type:'story',eventId,action,optionId}]};
}
