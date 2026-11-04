/** Isolated date-boundary fixture; not a completed semester/career demonstration. */
import { foundationScenario } from './scenarios.js';
import { academicBaseline } from './academic-scenario.js';
import { request } from './runtime.js';
import { startReviewedSchoolCareer } from '../../src/runtime/transactions.js';
import { readSemesterReviewHistory } from '../../src/runtime/views.js';
import { yearData } from '../../src/calendar/calendar.js';
import { createSave } from '../../src/storage/format.js';
import { createIndexedDBStorage } from '../../src/storage/indexeddb.js';
import { createStoredSession } from '../../src/storage/session.js';
const check=(ok,label)=>{if(!ok)throw Error(label);};
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
export async function reviewStorage(testId){
 const name=testId+'-reviews',options={factory:globalThis.indexedDB,namespace:'test',testId:name},db=createIndexedDBStorage(options);
 const f=foundationScenario(74);f.events=[];f.enrollments=[];
 const opening=startReviewedSchoolCareer(f,{startYear:2026,subject:'國文',seed:75}),w=academicBaseline(opening,yearData(2027).winterFinal,'private');
 await db.write(1,createSave(w,opening),null);const a=await createStoredSession(db,1),before=a.snapshot();
 const q={...request(w,'review-browser-finish',[{type:'finish-slot',completedActivityIds:[]}]),calendarContext:{kind:'routine'}};
 const faulty=createIndexedDBStorage({...options,faults:{beforeCommit(){throw new DOMException('injected review quota','QuotaExceededError');}}}),failed=await createStoredSession(faulty,1);
 let rejected=false;try{await failed.execute(q);}catch{rejected=true;}check(rejected&&same(await db.read(1),before),'Report quota failure changed save');await faulty.close();
 await a.execute(q);check((await a.execute(q)).duplicate,'Report resend not deduplicated');
 const saved=a.snapshot(),report=readSemesterReviewHistory(saved.payload.world)[0];check(report.status==='unread','Report not saved unread');
 const encoded=await a.export(),b=await createStoredSession(db,2);await b.import(encoded,{expectedToken:null});check(same(b.snapshot().payload,saved.payload),'Report import lost data');
 const peer=await createStoredSession(db,1),ack={...request(saved.payload.world,'review-browser-read',[{type:'read-semester-review',reviewId:report.id}]),calendarContext:{kind:'routine'}};
 await a.execute(ack);check((await peer.execute(ack)).duplicate,'Stale peer acknowledgment replay not deduplicated');
 const read=a.snapshot();check(readSemesterReviewHistory(read.payload.world)[0].status==='read','Report acknowledgment lost');
 check(same(saved.payload.world.numeric,read.payload.world.numeric)&&same(saved.payload.world.random,read.payload.world.random)&&same(saved.payload.world.position,read.payload.world.position),'Reading changed time/numbers/random');
 check(readSemesterReviewHistory(b.snapshot().payload.world)[0].status==='unread','Slots shared read state');
 const c=await createStoredSession(db,3);await c.initialize(opening);check(readSemesterReviewHistory(c.snapshot().payload.world).length===0,'New career inherited reports');
 await db.close();const reopened=createIndexedDBStorage(options),restored=await reopened.read(1);check(same(restored,read),'Report reopen changed saved world');await reopened.close();
 return {report:{provenance:'explicit final-date boundary, not a completed semester',bytes:new TextEncoder().encode(encoded).length,reports:1,readStatus:'read',threeSlots:true},signature:JSON.stringify(read)};
}
export async function reviewSignature(testId){const db=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId:testId+'-reviews'});const value=await db.read(1);await db.close();return JSON.stringify(value);}
