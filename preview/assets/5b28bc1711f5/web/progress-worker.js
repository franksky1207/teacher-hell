/** Existing saved-session operations and read projections off the rendering thread. */
import {teacherDisplayName} from '../src/runtime/teacher-profile.js';
import {createIndexedDBStorage} from '../src/storage/indexeddb.js';
import {rememberNames,readNameMemory} from '../src/storage/name-memory.js';
import {preferUnusedOpeningNames} from '../src/runtime/opening-name-memory.js';
import {createStoredSession} from '../src/storage/session.js';
import {sameToken,createSave,encodeSave} from '../src/storage/format.js';
import {teacherTenure} from '../src/runtime/schedule.js';
import {careerResult} from '../src/runtime/career.js';
import {gradeAt,careerYears,planMode} from '../src/calendar/calendar.js';
import {projectNotebookAcademics} from './notebook-academics.js';
import {projectNotebookPeople} from './notebook-people.js';
import {projectNotebookTasks} from './notebook-tasks.js';
import {projectNotebookEvents} from './notebook-events.js';
import {projectNotebookReviews,projectNotebookCareer} from './notebook-reviews.js';
async function inputText(input){if(typeof input==='string')return input;if(input instanceof Blob)return input.text();throw new TypeError('Expected a JSON string or immutable file');}
self.onmessage=async({data})=>{
 let storage;
 try{
  storage=createIndexedDBStorage({factory:indexedDB,namespace:'development'});
  const session=await createStoredSession(storage,data.slot);
  const before=data.request?new Set(session.savedGivenNames()):null;
  let nameMemoryWarning=false;
  async function rememberCommitted(names){try{await rememberNames({factory:indexedDB,namespace:'development',names});}catch(error){nameMemoryWarning=true;console.warn('Name history could not be updated',error);}}
  async function saveNewCareer(opening,persist){
   // Serialize competing new-career operations across tabs when Web Locks
   // exists; do not require Web Locks on browsers without the API.
   const work=async()=>{
    try{
     const names=await readNameMemory({factory:indexedDB,namespace:'development'});
     preferUnusedOpeningNames(opening,names);
    }catch(error){nameMemoryWarning=true;console.warn('Name history unavailable during opening',error);}
    await persist();
    await rememberCommitted(session.savedGivenNames()); // Only AFTER a committed save
   };
   return self.navigator?.locks?.request?self.navigator.locks.request('teacher-hell:development:career-names',work):work();
  }
  if(['request','initialize','restart','replaceOpening','import','delete','retry'].filter(k=>Object.hasOwn(data,k)).length>1)throw Error('One stored operation per worker request');
  if(data.request){await session.execute(data.request,{expectedToken:data.expectedToken});
   const after=session.savedGivenNames();const fresh=after.filter(name=>!before.has(name));
   if(fresh.length)await rememberCommitted(fresh);
  }
  if(data.retry){
   // Fence the exact slot revision the player saw before authorizing a retry.
   const checked=session.snapshot();
   if(!sameToken(data.expectedToken,checked.token))throw Object.assign(Error('存檔已更新，請重新讀取失敗結果再重試'),{code:'STALE'});
   await session.retry(data.retry);
   // Retry restores saved people; no new names enter the cross-slot ledger.
  }
  if(data.initialize)await saveNewCareer(data.initialize,()=>session.initialize(data.initialize));
  if(data.restart)await saveNewCareer(data.restart,()=>session.restart(data.restart,{expectedToken:data.expectedToken,confirmed:data.confirmed}));
  if(data.replaceOpening)await saveNewCareer(data.replaceOpening,()=>session.import(encodeSave(createSave(data.replaceOpening,data.replaceOpening)),{expectedToken:data.expectedToken,confirmed:data.confirmed}));
  if(Object.hasOwn(data,'import')){await session.import(await inputText(data.import),{expectedToken:data.expectedToken,confirmed:data.confirmed});await rememberCommitted(session.savedGivenNames());self.postMessage({ok:true,nameMemoryWarning});return;}
  if(data.delete){await session.delete({expectedToken:data.expectedToken,confirmed:data.confirmed});self.postMessage({ok:true});return;}
  if(data.export){self.postMessage({ok:true,blob:new Blob([await session.export()],{type:'application/json'})});return;}
  if(Object.hasOwn(data,'reviewImport')){self.postMessage({ok:true,review:await session.reviewImport(await inputText(data.reviewImport))});return;}

  const snap=session.snapshot(),w=snap.payload?.world;
  if(data.view){
   if(!sameToken(data.token,snap.token))throw Object.assign(Error('存檔已在其他頁面更新，請重新讀取'),{code:'STALE'});
   const projections={academics:()=>projectNotebookAcademics(w,data.studentId??null,data.termId??null),people:()=>projectNotebookPeople(w),events:()=>projectNotebookEvents(w),tasks:()=>projectNotebookTasks(w),reviews:()=>projectNotebookReviews(w),career:()=>projectNotebookCareer(w)};
   if(!Object.hasOwn(projections,data.view))throw Error('Unknown notebook projection');
   self.postMessage({ok:true,projection:projections[data.view]()});
  }else if(data.summary){
   const plan=w?.extensions['teacher-hell/world'].plan;
   self.postMessage({ok:true,token:snap.token,summary:w?{completed:!!careerResult(w),maxYears:careerYears(planMode(plan)),subject:plan.subject,date:w.position.date,grade:gradeAt(w.position.date,plan.startYear),serviceYear:w.position.serviceYear,tenure:teacherTenure(w),teacherName:teacherDisplayName(w)}:null});
  }else self.postMessage({ok:true,record:{payload:w?{world:w}:null,token:snap.token},nameMemoryWarning});
 }catch(error){self.postMessage({ok:false,message:error.message,code:error.code});}
 finally{await storage?.close();}
};
