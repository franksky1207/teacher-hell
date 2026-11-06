/** Existing saved-session operations and read projections off the rendering thread. */
import {createIndexedDBStorage} from '../src/storage/indexeddb.js';
import {createStoredSession} from '../src/storage/session.js';
import {sameToken} from '../src/storage/format.js';
import {teacherTenure} from '../src/runtime/schedule.js';
import {careerResult} from '../src/runtime/career.js';
import {gradeAt} from '../src/calendar/calendar.js';
import {projectNotebookAcademics} from './notebook-academics.js';
import {projectNotebookPeople} from './notebook-people.js';
import {projectNotebookEvents} from './notebook-events.js';
import {projectNotebookReviews,projectNotebookCareer} from './notebook-reviews.js';
self.onmessage=async({data})=>{
 let storage;
 try{
  storage=createIndexedDBStorage({factory:indexedDB,namespace:'development'});
  const session=await createStoredSession(storage,data.slot);if(data.request)await session.execute(data.request);
  const snap=session.snapshot(),w=snap.payload?.world;
  if(data.view){
   if(!sameToken(data.token,snap.token))throw Object.assign(Error('存檔已在其他頁面更新，請重新讀取'),{code:'STALE'});
   const projections={academics:()=>projectNotebookAcademics(w,data.studentId??null,data.termId??null),people:()=>projectNotebookPeople(w),events:()=>projectNotebookEvents(w),reviews:()=>projectNotebookReviews(w),career:()=>projectNotebookCareer(w)};
   if(!Object.hasOwn(projections,data.view))throw Error('Unknown notebook projection');
   self.postMessage({ok:true,projection:projections[data.view]()});
  }else if(data.summary){
   const plan=w?.extensions['teacher-hell/world'].plan;
   self.postMessage({ok:true,summary:w?{completed:!!careerResult(w),subject:plan.subject,date:w.position.date,grade:gradeAt(w.position.date,plan.startYear),serviceYear:w.position.serviceYear,tenure:teacherTenure(w)}:null});
  }else self.postMessage({ok:true,record:{payload:w?{world:w}:null,token:snap.token}});
 }catch(error){self.postMessage({ok:false,message:error.message,code:error.code});}
 finally{await storage?.close();}
};
