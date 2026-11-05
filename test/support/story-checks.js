/** Chromium-only acceptance of the real story transaction and three-slot storage path. */
import { createIndexedDBStorage } from '../../src/storage/indexeddb.js';
import { createStoredSession } from '../../src/storage/session.js';
import { createSave } from '../../src/storage/format.js';
import { eventWorld } from './event-fixtures.js';
import { beginDemo,apply,storyAction,storyRequest,advanceDemo } from './story-scenario.js';
import { readStory } from '../../src/runtime/story.js';
import { runtimeOf } from '../../src/runtime/model.js';
const check=(x,m)=>{if(!x)throw Error(m);};
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
export async function storySetup(testId,initialize){
 const options={factory:globalThis.indexedDB,namespace:'test',testId:testId+'-story'},db=createIndexedDBStorage(options),s=await createStoredSession(db,1);
 if(initialize){
  const opening=eventWorld(1);let {world,eventId}=beginDemo();while(readStory(world,eventId).canNext)world=apply(world,[storyAction(eventId,'next')]);world=apply(world,[storyAction(eventId,'select','listen')]);
  await s.import(JSON.stringify(createSave(world,opening)),{expectedToken:null});
 }
 return {options,db,s};
}
export async function storySignature(testId){const t=await storySetup(testId,false),signature=JSON.stringify(await t.db.read(1));await t.db.close();return signature;}
export async function storyContinue(t){
 const original=await t.db.read(1),eventId=original.payload.world.events[0].id;
 check(readStory(original.payload.world,eventId).confirmation.optionId==='listen','pending confirmation lost on navigation');
 const confirm=storyRequest(original.payload.world,[storyAction(eventId,'confirm')]);
 const bad=createIndexedDBStorage({...t.options,faults:{beforeCommit({transaction}){transaction.abort();}}}),failed=await createStoredSession(bad,1);
 let rejected=false;try{await failed.execute(confirm);}catch{rejected=true;}
 check(rejected&&same(await t.db.read(1),original)&&same(failed.snapshot(),original),'N6/choice disk failure not atomic');await bad.close();
 await t.s.execute(confirm);check((await t.s.execute(confirm)).duplicate,'confirm retry duplicated');
 const w=()=>t.s.snapshot().payload.world;
 await t.s.execute(storyRequest(w(),[storyAction(eventId,'finish')]));
 const text=await t.s.export(),two=await createStoredSession(t.db,2);await two.import(text,{expectedToken:null});
 check(same(two.snapshot().payload,t.s.snapshot().payload),'waiting roundtrip changed');
 async function end(session,id){const world=()=>session.snapshot().payload.world;let steps=0;
  while(!readStory(world(),id).canResume){const next=advanceDemo(world());await session.execute(JSON.parse(runtimeOf(next).commits.at(-1).request));check(++steps<30,'followup stalled');}
  await session.execute(storyRequest(world(),[storyAction(id,'resume')]));
  while(readStory(world(),id).canNext)await session.execute(storyRequest(world(),[storyAction(id,'next')]));
  for(const action of [storyAction(id,'select','plan'),storyAction(id,'confirm'),storyAction(id,'finish')])await session.execute(storyRequest(world(),[action]));
  check(readStory(world(),id).ended,'route not ended');return readStory(world(),id).teacherDelta;
 }
 const listen=await end(two,eventId);check(readStory(w(),eventId).waiting,'slot 2 modified slot 1');
 const three=await createStoredSession(t.db,3),opening=eventWorld(1);let alternate=beginDemo();while(readStory(alternate.world,alternate.eventId).canNext)alternate.world=apply(alternate.world,[storyAction(alternate.eventId,'next')]);
 alternate.world=apply(alternate.world,[storyAction(alternate.eventId,'select','angry')]);alternate.world=apply(alternate.world,[storyAction(alternate.eventId,'confirm')]);alternate.world=apply(alternate.world,[storyAction(alternate.eventId,'finish')]);
 await three.import(JSON.stringify(createSave(alternate.world,opening)),{expectedToken:null});const angry=await end(three,alternate.eventId);check(!same(listen,angry),'branches identical');
 check(readStory((await t.db.read(1)).payload.world,eventId).waiting,'slot isolation');
 const signature=JSON.stringify(await t.db.read(1));await t.db.close();return {signature,report:{pendingReload:true,confirmRollback:true,duplicate:true,waitingImport:true,threeSlots:true,listen,angry,endedRoutes:2}};
}
