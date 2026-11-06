/** Durable natural identities and dated school affiliations. No clock, storage or event engine. */
import { assertShape, identifier } from '../player/panel.js';
import { restoreRandom } from '../numeric/random.js';
import { createPerson, sampleRecord, withFamilyContext, FAMILY_CODES, GROUP_CODES } from './people.js';
import { validateRoles } from './roles.js';

export const SCHOOL_SUBJECTS=Object.freeze(['國文','英文','數學','地理','歷史','物理','化學','公民','生物']);
export const CLASS_NAMES=Object.freeze([... '忠孝仁愛信義和平勤樸']);
const need=(ok,message)=>{if(!ok)throw new RangeError(message);};
const own=(o,k)=>Object.hasOwn(o,k);
const list=(rows)=>{need(Array.isArray(rows)&&Object.keys(rows).length===rows.length,'Dense registry list required');return rows;};
const unique=rows=>need(new Set(rows).size===rows.length,'Duplicate registry identity');
const year=y=>need(Number.isInteger(y)&&y>=2026&&y<=2065,'Academic year outside fixed calendar');
const date=d=>{need(typeof d==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(d)&&new Date(`${d}T00:00:00Z`).toISOString().slice(0,10)===d,'Invalid registry date');};
const ref=(w,id)=>need(id===w.player.current.playerId||own(w.people,id),'Unknown registry person');
export const schoolClassId=(school,start,index)=>`school-class:${encodeURIComponent(school)}:${start}:${index}`;
export const schoolCohortId=(school,start)=>`school-cohort:${encodeURIComponent(school)}:${start}`;
function classesAt(w,academicYear){
 const r=w.registry;
 for(let start=academicYear-2;start<=academicYear;start++)for(let index=1;index<=10;index++){
  const id=start===r.startYear&&index===(r.classes[r.initialClassId]?.index??r.homeIndex)?r.initialClassId:schoolClassId(w.school.id,start,index);
  if(!own(r.classes,id))r.classes[id]={id,cohortId:schoolCohortId(w.school.id,start),cohortStart:start,index,name:CLASS_NAMES[index-1],placement:null,values:null};
 }
}
// Complete two-character given names are curated as plausible Taiwanese names.
// Neutral names may occur in both groups; student sex never comes from the spelling.
const MALE_GIVEN=Object.freeze(['宇軒','承宇','文哲','家宏','宇安','承恩','家瑋','思哲','宏宇','哲宇','文軒','宇哲','承哲','家恩','安哲','宇涵','宏哲','承軒','思宇','家宇','文宏','宇瑋','宏恩','承安']);
const FEMALE_GIVEN=Object.freeze(['雅涵','怡安','欣怡','思涵','雅庭','欣雅','思雅','文雅','雅欣','怡涵','安雅','家怡','思庭','庭安','雅安','怡庭','欣涵','安涵','思怡','雅恩','欣庭','文涵','家涵','宇涵']);
const NEUTRAL_GIVEN=Object.freeze(['文安','思恩','家宇','承恩','雅安','宇庭','怡安','宇涵','文涵','安哲','承宇','欣宇']);
function profile(w,id,rng,initialGender=null){
 if(!own(w.registry.profiles,id)){
  const surnames=[...'陳林黃張李王吳劉蔡楊'];
  // Four draws, same count as before. Names are selected as whole given names.
  const surname=surnames[rng.integer(0,surnames.length-1)];
  const first=rng.integer(0,65535),second=rng.integer(0,65535),variant=rng.integer(0,65535);
  const student=w.people[id]?.kind==='student';
  const gender=student?(initialGender??(variant%2===0?'male':'female')):null;
  const pool=gender==='male'?MALE_GIVEN:gender==='female'?FEMALE_GIVEN:NEUTRAL_GIVEN;
  const name=surname+pool[(first+second)%pool.length];
  w.registry.profiles[id]={displayName:name,appearance:{variant},...(student?{gender}:{})};
 }
}
function register(w,personId,classId,at,reason){
 const r=w.registry,c=r.classes[classId];need(c,'Unknown class');
 need(!r.enrollments.some(e=>e.personId===personId&&e.until===null),'Person already enrolled');
 const e={id:`school-enrollment:${r.nextEnrollment++}`,personId,cohortId:c.cohortId,classId,from:at,until:null,reason,status:'enrolled'};
 r.enrollments.push(e);return e;
}
export function initializeRegistry(w,{academicYear,date:at}){
 need(!w.registry,'School registry already initialized');year(academicYear);date(at);
 const r=w.registry={version:1,startYear:academicYear,academicYear,initialClassId:w.classroom.id,homeClassId:w.classroom.id,cohortStart:academicYear,homeIndex:1,nextPerson:1,nextEnrollment:1,classes:{},cohorts:[],enrollments:[],assignments:[],transfers:[],profiles:{}};
 const choice=restoreRandom(w.random.structure);r.homeIndex=choice.integer(1,10);w.random.structure=choice.snapshot();
 classesAt(w,academicYear);r.cohorts.push({id:schoolCohortId(w.school.id,academicYear),startYear:academicYear,classId:w.classroom.id,initialStudentIds:[...w.classroom.studentIds]});
 const rng=restoreRandom(w.random.structure);
 const openingGender=new Map(w.classroom.studentIds.map((id,index)=>[id,index<20?'male':'female']));
 for(const id of Object.keys(w.people))profile(w,id,rng,openingGender.get(id)??null);
 for(const id of w.classroom.studentIds)register(w,id,w.classroom.id,at,'initial');
 r.assignments.push({id:'school-assignment:initial',personId:w.player.current.playerId,roleId:9,classId:w.classroom.id,from:at,until:null});
 w.random.structure=rng.snapshot();
 // Lightweight identities/appointments: no simulated daily timetable for every employee.
 const people=restoreRandom(w.random.people),structure=restoreRandom(w.random.structure);
 const subjects=SCHOOL_SUBJECTS;
 const slots=[...subjects.flatMap(subject=>Array.from({length:10},(_,i)=>({key:`teacher:${subject}:${i}`,roleId:8}))),
  ...[1,2,3,4,5,6,7,10].flatMap(roleId=>Array.from({length:roleId===1?2:3},(_,i)=>({key:`office:${roleId}:${i}`,roleId})))];
 for(const slot of slots){const id=`staff:${encodeURIComponent(w.school.id)}:${slot.key}`;need(!own(w.people,id),'Initial staff identity collision');w.people[id]=createPerson(id,'other',[slot.roleId],people);profile(w,id,structure);r.assignments.push({id:`appointment:${slot.key}`,personId:id,roleId:slot.roleId,classId:null,from:at,until:null});}
 w.random.people=people.snapshot();w.random.structure=structure.snapshot();return w;
}
function newStudent(w,classId,at,source){
 const r=w.registry,root=`person:${encodeURIComponent(w.school.id)}:${r.nextPerson++}`,people=restoreRandom(w.random.people),environment=restoreRandom(w.random.environment),structure=restoreRandom(w.random.structure);
 const family={id:`${root}:family`,values:sampleRecord(FAMILY_CODES,environment)};
 const student=withFamilyContext(createPerson(root,'student',source==='initial'?[11]:[11,17],people),family),care=withFamilyContext(createPerson(`${root}:guardian`,'caregiver',[19],people),family);
 need(!own(w.people,root)&&!own(w.people,care.id)&&!own(w.families,family.id),'Natural person identity collision');
 w.families[family.id]=family;w.people[root]=student;w.people[care.id]=care;w.careLinks.push({studentId:root,caregiverId:care.id});
 const initialIndex=source==='initial'?r.enrollments.filter(e=>e.classId===classId&&e.reason==='initial').length:null;
 profile(w,root,structure,initialIndex===null?null:initialIndex<20?'male':'female');profile(w,care.id,structure);
 w.random.people=people.snapshot();w.random.environment=environment.snapshot();w.random.structure=structure.snapshot();register(w,root,classId,at,source);return root;
}
export function enrollmentEligibility(w,{personId=null,classId,action}){
 need(w.registry,'School registry required');const r=w.registry,c=r.classes[classId];
 if(!c||r.academicYear-c.cohortStart<0||r.academicYear-c.cohortStart>2)return {eligible:false,reason:'inactive-class'};
 if(classId===r.homeClassId&&!w.classroom.studentIds.length&&r.enrollments.some(e=>e.classId===classId))return {eligible:false,reason:'completed-cohort'};
 const active=r.enrollments.find(e=>e.personId===personId&&e.until===null);
 const count=r.enrollments.filter(e=>e.classId===classId&&e.until===null).length;
 if(['transfer-in','change-class','repeat','return'].includes(action)&&classId===r.homeClassId&&count>=42)return {eligible:false,reason:'capacity'};
 if(action==='return'&&(!personId||active||!r.enrollments.some(e=>e.personId===personId)))return {eligible:false,reason:'not-returning'};
 if(action==='change-class'&&active&&r.classes[active.classId].cohortId!==c.cohortId)return {eligible:false,reason:'different-cohort'};
 if(action==='repeat'&&active&&c.cohortStart!==r.classes[active.classId].cohortStart+1)return {eligible:false,reason:'not-repeating-one-grade'};
 if(action==='transfer-in'&&active)return {eligible:false,reason:'already-enrolled'};
 if(['change-class','repeat'].includes(action)&&(!active||active.classId===classId))return {eligible:false,reason:'missing-distinct-assignment'};
 if(personId!==null&&w.people[personId]?.kind!=='student')return {eligible:false,reason:'not-student'};
 return {eligible:true,reason:null};
}
function syncHome(w){
 const r=w.registry;w.classroom.studentIds=r.enrollments.filter(e=>e.classId===r.homeClassId&&e.until===null).map(e=>e.personId);
 const active=new Map(r.enrollments.filter(e=>e.until===null).map(e=>[e.personId,e]));
 for(const p of Object.values(w.people))if(p.kind==='student'){
  const e=active.get(p.id),c=e?r.classes[e.classId]:null;
  const role=!c?18:e.classId===r.homeClassId?11:c.cohortStart===r.cohortStart?12:13;
  p.roleIds=[...p.roleIds.filter(id=>![11,12,13,18].includes(id)),role].sort((a,b)=>a-b);
 }
}
/** Mutates only a transaction-owned detached numerical draft. */
export function applySchoolOperation(w,op,at){
 date(at);identifier(op.type);
 if(op.type==='school-initialize'){assertShape(op,['type','academicYear']);return initializeRegistry(w,{academicYear:op.academicYear,date:at});}
 const r=w.registry;need(r,'Initialize school registry first');
 if(op.type==='school-year'){
  assertShape(op,['type','academicYear']);year(op.academicYear);need(op.academicYear===r.academicYear+1,'School years must advance once in order');
  need(r.enrollments.filter(e=>e.until===null).every(e=>op.academicYear-r.classes[e.classId].cohortStart<=2),'Resolve graduation, repeat or delayed enrollment before promotion beyond grade three');
  r.academicYear=op.academicYear;classesAt(w,r.academicYear);
 }else if(op.type==='school-cohort'){
  assertShape(op,['type']);need(r.academicYear===r.cohortStart+3,'Next homeroom requires three academic years');
  need(!r.enrollments.some(e=>e.classId===r.homeClassId&&e.until===null),'Resolve graduating or delayed students before changing homeroom');
  for(const a of r.assignments)if(a.personId===w.player.current.playerId&&a.classId===r.homeClassId&&a.until===null)a.until=at;
  const choice=restoreRandom(w.random.structure);r.homeIndex=choice.integer(1,10);w.random.structure=choice.snapshot();
  r.cohortStart=r.academicYear;r.homeClassId=schoolClassId(w.school.id,r.academicYear,r.homeIndex);
  r.classes[w.classroom.id].values={...w.classroom.values};
  const rng=restoreRandom(w.random.environment);w.classroom={...w.classroom,id:r.homeClassId,studentIds:[],values:sampleRecord(GROUP_CODES,rng)};w.random.environment=rng.snapshot();
  const ids=Array.from({length:40},()=>newStudent(w,r.homeClassId,at,'initial'));
  r.cohorts.push({id:schoolCohortId(w.school.id,r.academicYear),startYear:r.academicYear,classId:r.homeClassId,initialStudentIds:ids});
  r.assignments.push({id:`school-assignment:cohort:${r.academicYear}`,personId:w.player.current.playerId,roleId:9,classId:r.homeClassId,from:at,until:null});
 }else if(op.type==='school-enroll'){
  assertShape(op,['type','personId','classId','action','source']);identifier(op.source);
  need(['transfer-in','change-class','repeat','return'].includes(op.action),'Unknown enrollment action');
  need(enrollmentEligibility(w,op).eligible,'Ineligible enrollment');
  if(op.personId===null){need(op.action==='transfer-in','Only a sourced transfer creates a new person');newStudent(w,op.classId,at,op.source);}
  else{
   const old=r.enrollments.find(e=>e.personId===op.personId&&e.until===null);
   if(old){old.until=at;old.status=op.action;}
   register(w,op.personId,op.classId,at,op.source);
  }
 }else if(op.type==='school-graduate'){
  assertShape(op,['type','personIds','reason']);list(op.personIds);unique(op.personIds);need(op.personIds.length>0,'Graduate list required');
  for(const personId of op.personIds)applySchoolOperation(w,{type:'school-leave',personId,status:'graduated',reason:op.reason},at);
 }else if(op.type==='school-leave'){
  assertShape(op,['type','personId','status','reason']);identifier(op.reason);need(['transferred-out','suspended','delayed','graduated','course-completed','incomplete'].includes(op.status),'Unknown leaving status');
  const e=r.enrollments.find(e=>e.personId===op.personId&&e.until===null);need(e,'No active enrollment');
  if(op.status==='graduated')need(r.academicYear-r.classes[e.classId].cohortStart>=2&&Number(at.slice(0,4))>=r.classes[e.classId].cohortStart+3,'Cannot graduate before grade three');
  e.until=at;e.status=op.status;
 }else if(op.type==='school-end-homeroom'){
  assertShape(op,['type','classId','reason']);identifier(op.reason);
  need(op.classId===r.homeClassId&&!r.enrollments.some(e=>e.classId===op.classId&&e.until===null),'Complete the original roster before ending its duty');
  const assignment=r.assignments.find(a=>a.personId===w.player.current.playerId&&a.roleId===9&&a.classId===op.classId&&a.until===null);
  need(assignment,'No active original homeroom duty');assignment.until=at;
 }else if(op.type==='school-transfer-plan'){
  assertShape(op,['type','id','classId','personId','dueDate','source']);identifier(op.id);identifier(op.source);date(op.dueDate);
  need(!r.transfers.some(t=>t.id===op.id)&&op.dueDate>at,'Transfer must be a distinct future arrangement');
  need(enrollmentEligibility(w,{...op,action:'transfer-in'}).eligible,'Ineligible transfer plan');
  r.transfers.push({...op,status:'scheduled',createdAt:at,completedAt:null});
 }else if(op.type==='school-transfer-complete'){
  assertShape(op,['type','id']);const t=r.transfers.find(t=>t.id===op.id);need(t?.status==='scheduled'&&at>=t.dueDate,'Transfer is absent, completed or not due');
  const before=new Set(Object.keys(w.people));applySchoolOperation(w,{type:'school-enroll',personId:t.personId,classId:t.classId,action:'transfer-in',source:t.source},at);
  t.personId=t.personId??Object.keys(w.people).find(id=>!before.has(id)&&w.people[id].kind==='student');t.status='completed';t.completedAt=at;
 }else if(op.type==='school-staff'){
  assertShape(op,['type','personId','roleIds']);identifier(op.personId);validateRoles(op.roleIds);
  need(op.roleIds.every(id=>id<11||id>24),'Student/caregiver tags need household enrollment');
  const rng=restoreRandom(w.random.people),structure=restoreRandom(w.random.structure);
  if(own(w.people,op.personId)){need(w.people[op.personId].kind==='other','Existing identity kind mismatch');w.people[op.personId].roleIds=[...op.roleIds];}
  else {need(!own(w.families,op.personId)&&op.personId!==w.school.id&&op.personId!==w.classroom.id&&op.personId!==w.player.current.playerId,'Staff identity collision');w.people[op.personId]=createPerson(op.personId,'other',op.roleIds,rng);profile(w,op.personId,structure);}
  w.random.people=rng.snapshot();w.random.structure=structure.snapshot();
 }else if(op.type==='school-assignment'){
  assertShape(op,['type','id','personId','roleId','classId','endsId']);identifier(op.id);ref(w,op.personId);validateRoles([op.roleId]);
  need(op.personId===w.player.current.playerId?op.roleId===9:w.people[op.personId].roleIds.includes(op.roleId),'Appointment lacks a matching functional role');
  need(!r.assignments.some(a=>a.id===op.id),'Assignment ID already exists');need(op.classId===null||own(r.classes,op.classId),'Unknown assignment class');
  if(op.endsId!==null){const old=r.assignments.find(a=>a.id===op.endsId);need(old&&old.until===null,'No active assignment to end');old.until=at;}
  r.assignments.push({id:op.id,personId:op.personId,roleId:op.roleId,classId:op.classId,from:at,until:null});
 }else throw new RangeError('Unknown school operation');
 syncHome(w);
 need(w.classroom.studentIds.length<=42,'Homeroom exceeds 42');
 // Extreme sub-38 cases require a future explicit decision; never silently delete or refill.
 // Transaction boundary checks the final roster, allowing atomic graduate/change-cohort batches.
 return w;
}
export function readSchoolCandidates(w){
 const r=w.registry;need(r,'School registry required');const count=w.classroom.studentIds.length,active=new Set(w.classroom.studentIds),homeClasses=new Set(r.cohorts.map(c=>c.classId)),former=new Set(r.enrollments.filter(e=>homeClasses.has(e.classId)&&!active.has(e.personId)).map(e=>e.personId));
 return {academicYear:r.academicYear,cohortId:r.classes[r.homeClassId].cohortId,classId:r.homeClassId,studentIds:[...w.classroom.studentIds],reunionIds:[...former],transfer:{eligible:count>0&&count<42,needsRecentArrival:count===38,pending:r.transfers.filter(t=>t.classId===r.homeClassId&&t.status==='scheduled').map(t=>t.id)}};
}
export function schoolCatalogue(w,subjects){need(w.registry,'School registry required');return Object.values(w.registry.classes).filter(c=>[0,1,2].includes(w.registry.academicYear-c.cohortStart)).map(c=>({id:c.id,cohortStart:c.cohortStart,subjects:[...subjects]}));}

/** Strict validation of affiliation provenance; historical classes cannot authorize new contact. */
export function historicalSchoolBasis(w,relation){
 const r=w.registry,c=r?.classes[relation.basis.referenceId];if(!c)return false;
 const enrolled=id=>r.enrollments.filter(e=>e.personId===id&&e.classId===c.id);
 const teachers=id=>r.assignments.filter(a=>a.personId===id&&a.classId===c.id&&[8,9].includes(a.roleId));
 const overlap=(a,b)=>a.from<=(b.until??'9999-12-31')&&b.from<=(a.until??'9999-12-31');
 const pair=(a,b)=>a.some(x=>b.some(y=>overlap(x,y)));
 const {fromId:a,toId:b}=relation;
 if(relation.basis.kind==='same-class')return a!==b&&pair(enrolled(a),enrolled(b));
 if(relation.basis.kind==='teacher-assignment')return pair(teachers(a),enrolled(b))||pair(teachers(b),enrolled(a));
 if(relation.basis.kind==='care-assignment')return w.careLinks.some(l=>(l.caregiverId===a&&pair(teachers(b),enrolled(l.studentId)))||(l.caregiverId===b&&pair(teachers(a),enrolled(l.studentId))));
 return false;
}
export function validateRegistry(w){
 const r=w.registry;assertShape(r,['version','startYear','academicYear','initialClassId','homeClassId','cohortStart','homeIndex','nextPerson','nextEnrollment','classes','cohorts','enrollments','assignments','transfers','profiles',...(own(r,'responsibilities')?['responsibilities']:[])]);
 need(r.version===1&&Number.isInteger(r.homeIndex)&&r.homeIndex>=1&&r.homeIndex<=10,'Unsupported school registry version/index');year(r.startYear);year(r.academicYear);year(r.cohortStart);need(r.startYear<=r.cohortStart&&r.cohortStart<=r.academicYear,'Invalid cohort order');
 for(const k of ['nextPerson','nextEnrollment'])need(Number.isSafeInteger(r[k])&&r[k]>0,'Invalid registry counter');
 need(r.homeClassId===w.classroom.id&&own(r.classes,r.initialClassId)&&own(r.classes,r.homeClassId),'Homeroom registry mismatch');
 for(const [id,c] of Object.entries(r.classes)){assertShape(c,['id','cohortId','cohortStart','index','name','placement','values']);identifier(id);identifier(c.cohortId);need(!own(w.people,id)&&!own(w.families,id)&&id!==w.school.id&&id!==w.player.current.playerId,'Class/person identity collision');need(c.id===id&&Number.isInteger(c.index)&&c.index>=1&&c.index<=10&&Number.isInteger(c.cohortStart),'Invalid school class');need(c.name===CLASS_NAMES[c.index-1]&&c.placement===null,'Invalid formal class name or invented special placement');if(c.values!==null){need(id!==r.homeClassId,'Current class values have one holder');assertShape(c.values,GROUP_CODES);for(const v of Object.values(c.values))need(Number.isFinite(v)&&v>=0&&v<=100,'Invalid archived class value');}need(c.cohortId===schoolCohortId(w.school.id,c.cohortStart),'Class cohort mismatch');}
 unique(Object.values(r.classes).map(c=>`${c.cohortStart}:${c.index}`));
 const classCounts=new Map();for(const c of Object.values(r.classes)){
  need(c.cohortStart>=r.startYear-2&&c.cohortStart<=r.academicYear,'Class outside generated school years');
  classCounts.set(c.cohortStart,(classCounts.get(c.cohortStart)??0)+1);
 }
 for(let y=r.startYear-2;y<=r.academicYear;y++)need(classCounts.get(y)===10,'Each generated grade requires the formal ten classes');
 const personPrefix=`person:${encodeURIComponent(w.school.id)}:`;
 for(const id of Object.keys(w.people))if(id.startsWith(personPrefix)){
  const serial=id.slice(personPrefix.length).split(':')[0];if(/^[0-9]+$/.test(serial))need(Number(serial)<r.nextPerson,'Person counter does not follow durable identities');
 }

 const active=new Set();unique(list(r.enrollments).map(e=>e.id));need(r.enrollments.every(e=>/^school-enrollment:[1-9][0-9]*$/.test(e.id)&&Number(e.id.split(':')[1])<r.nextEnrollment),'Enrollment counter does not follow stored IDs');
 const byPerson=new Map();
 for(const e of r.enrollments){assertShape(e,['id','personId','cohortId','classId','from','until','reason','status']);identifier(e.id);identifier(e.reason);need(w.people[e.personId]?.kind==='student'&&r.classes[e.classId]?.cohortId===e.cohortId,'Invalid enrollment identity');date(e.from);if(e.until!==null){date(e.until);need(e.until>=e.from&&e.status!=='enrolled','Enrollment interval reversed or not closed');}else{need(!active.has(e.personId)&&e.status==='enrolled','Multiple current enrollments');active.add(e.personId);}
  need(['enrolled','transfer-in','change-class','repeat','return','transferred-out','suspended','delayed','graduated','course-completed','incomplete'].includes(e.status),'Invalid enrollment status');
  const rows=byPerson.get(e.personId)??[];rows.push(e);byPerson.set(e.personId,rows);
 }
 for(const rows of byPerson.values()){rows.sort((a,b)=>a.from.localeCompare(b.from));for(let i=1;i<rows.length;i++)need(rows[i-1].until!==null&&rows[i-1].until<=rows[i].from,'Overlapping person enrollment');}
 const currentEnrollment=new Map(r.enrollments.filter(e=>e.until===null).map(e=>[e.personId,e]));
 for(const p of Object.values(w.people))if(p.kind==='student'){
  const e=currentEnrollment.get(p.id),c=e?r.classes[e.classId]:null;
  const expected=!c?18:e.classId===r.homeClassId?11:c.cohortStart===r.cohortStart?12:13;
  need(p.roleIds.includes(expected)&&p.roleIds.filter(id=>[11,12,13,18].includes(id)).length===1,'Student role differs from current affiliation');
 }
 const home=r.enrollments.filter(e=>e.classId===r.homeClassId&&e.until===null).map(e=>e.personId);need(JSON.stringify(home)===JSON.stringify(w.classroom.studentIds)&&home.length<=42,'Current homeroom differs from affiliations');
 const originalStudents=new Set();unique(list(r.cohorts).map(c=>c.id));need(r.cohorts.length>=1&&r.cohorts.length<=10,'Career supports ten generated homeroom cohorts');for(const [index,c] of r.cohorts.entries()){assertShape(c,['id','startYear','classId','initialStudentIds']);need(c.startYear===r.startYear+index*3&&r.classes[c.classId]?.cohortStart===c.startYear&&r.classes[c.classId]?.cohortId===c.id&&c.initialStudentIds.length===40,'Invalid initial cohort');unique(c.initialStudentIds);for(const id of c.initialStudentIds){need(!originalStudents.has(id),'Initial natural person recycled into another generated cohort');originalStudents.add(id);need(r.enrollments.some(e=>e.personId===id&&e.classId===c.classId&&e.reason==='initial'),'Missing original cohort enrollment');}}
 // A newly generated class has a fixed balanced opening. Legacy imported
  // classes lack explicit genders and must remain valid without migration.
  for(const c of r.cohorts){
   const profiles=c.initialStudentIds.map(id=>r.profiles[id]);
   if(profiles.every(p=>p&&Object.hasOwn(p,'gender'))){
    need(profiles.filter(p=>p.gender==='male').length===20&&profiles.filter(p=>p.gender==='female').length===20,
      'Generated cohort must open with 20 male and 20 female students');
   }
  }
  need(r.cohorts.at(-1).startYear===r.cohortStart,'Current cohort differs from generated history');
 unique(list(r.assignments).map(a=>a.id));for(const a of r.assignments){assertShape(a,['id','personId','roleId','classId','from','until']);identifier(a.id);ref(w,a.personId);validateRoles([a.roleId]);need(a.classId===null||own(r.classes,a.classId),'Unknown historical teaching class');date(a.from);if(a.until!==null){date(a.until);need(a.until>=a.from,'Assignment reversed');}}
 if(own(r,'responsibilities')){
  unique(list(r.responsibilities).map(a=>a.id));need(r.responsibilities.length<=1&&w.background,'Bounded background responsibility required');
  for(const a of r.responsibilities){assertShape(a,['id','personId','appointedBy','title','scope','subject','sourceId','from','until','authority','responsibilities']);ref(w,a.personId);ref(w,a.appointedBy);date(a.from);need(r.assignments.some(issuer=>issuer.personId===a.appointedBy&&issuer.roleId===1&&issuer.from<=a.from&&(issuer.until===null||issuer.until>=a.from)),'Initial responsibility requires a school-level appointing authority');need(a.personId===w.player.current.playerId&&a.scope===w.school.id&&a.from===r.assignments[0].from&&a.until===null&&a.authority==='coordination-only','Invalid initial school responsibility');}
 }
 unique(list(r.transfers).map(t=>t.id));for(const t of r.transfers){assertShape(t,['type','id','classId','personId','dueDate','source','status','createdAt','completedAt']);need(t.type==='school-transfer-plan'&&own(r.classes,t.classId),'Invalid transfer plan');identifier(t.id);identifier(t.source);date(t.createdAt);date(t.dueDate);need(t.dueDate>t.createdAt,'Transfer must be arranged in advance');need(['scheduled','completed'].includes(t.status),'Invalid transfer status');if(t.personId!==null)need(w.people[t.personId]?.kind==='student','Unknown transfer student');if(t.status==='completed'){date(t.completedAt);need(t.completedAt>=t.dueDate&&r.enrollments.some(e=>e.personId===t.personId&&e.classId===t.classId&&e.from===t.completedAt),'Transfer result missing');}else need(t.completedAt===null,'Pending transfer already completed');}
 for(const [id,p] of Object.entries(r.profiles)){ref(w,id);assertShape(p,['displayName','appearance',...(Object.hasOwn(p,'gender')?['gender']:[])]);identifier(p.displayName);
   if(Object.hasOwn(p,'gender'))need(w.people[id]?.kind==='student'&&['male','female'].includes(p.gender),'Invalid durable student gender');assertShape(p.appearance,['variant']);need(Number.isInteger(p.appearance.variant)&&p.appearance.variant>=0&&p.appearance.variant<=65535,'Invalid durable appearance');}
 need(r.classes[r.homeClassId].index===r.homeIndex,'Random homeroom selection mismatch');
 need(Object.keys(r.profiles).length===Object.keys(w.people).length,'Missing persistent profile');
 return r;
}

/** Archived pupils/households keep values unchanged until a later explicit event. */
export function dailySchoolPeople(w){
 if(!w.registry)return null;
 const active=new Set(w.registry.enrollments.filter(e=>e.until===null).map(e=>e.personId));
 for(const l of w.careLinks)if(active.has(l.studentId))active.add(l.caregiverId);
 for(const p of Object.values(w.people))if(p.kind==='other')active.add(p.id);
 return active;
}

/** Limited coordination duties; these confer no investigation/discipline powers or lesson relief. */
export const schoolResponsibilities=w=>structuredClone(w.registry?.responsibilities??[]);
