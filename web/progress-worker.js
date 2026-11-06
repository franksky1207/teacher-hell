/** Existing saved-session operations and read projections off the rendering thread. */
import {teacherDisplayName} from '../src/runtime/teacher-profile.js';
import {createIndexedDBStorage} from '../src/storage/indexeddb.js';
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
  if(['request','initialize','restart','replaceOpening','import','delete'].filter(k=>Object.hasOwn(data,k)).length>1)throw Error('One stored operation per worker request');
  if(data.request)await session.execute(data.request,{expectedToken:data.expectedToken});
  if(data.initialize)await session.initialize(data.initialize);
  if(data.restart)await session.restart(data.restart,{expectedToken:data.expectedToken,confirmed:data.confirmed});
  if(data.replaceOpening)await session.import(encodeSave(createSave(data.replaceOpening,data.replaceOpening)),{expectedToken:data.expectedToken,confirmed:data.confirmed});
  if(Object.hasOwn(data,'import')){await session.import(await inputText(data.import),{expectedToken:data.expectedToken,confirmed:data.confirmed});self.postMessage({ok:true});return;}
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
  }else self.postMessage({ok:true,record:{payload:w?{world:w}:null,token:snap.token}});
 }catch(error){self.postMessage({ok:false,message:error.message,code:error.code});}
 finally{await storage?.close();}
};
