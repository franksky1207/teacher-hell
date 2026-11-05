/** A1 academic-only study. Never starts a world, NPC, calendar driver or career.
 * --extract <retained-directory> reads T4 files; default uses fixed small cohorts.
 * All scores/credits use the existing academics modules, not a second engine. */
import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {gzipSync} from 'node:zlib';
import {semester} from '../src/calendar/calendar.js';
import {createRandom,restoreRandom} from '../src/numeric/random.js';
import {emptyAcademics,createLearner} from '../src/academics/learning.js';
import {rulesFor,graduation,academicSubjects,subjectFamily} from '../src/academics/rules.js';
import {applyAcademic,academicSupport,academicSupportDue} from '../src/runtime/academics.js';
const sha=x=>createHash('sha256').update(x).digest('hex');
const records=(s,id)=>[...Object.values(s.terms).flatMap(t=>(t.results?.find(r=>r.id===id)?.courses??[]).map(c=>({...c,year:t.year,level:t.grade,half:t.termId.endsWith('spring')?'spring':'autumn'}))),...(s.recognized??[]).filter(r=>r.personId===id),...(s.supplements??[]).filter(r=>r.personId===id)];
function distribution(values){const x=values.toSorted((a,b)=>a-b),q=p=>x.length?x[Math.floor((x.length-1)*p)]:null;return {count:x.length,min:x[0]??null,p10:q(.1),median:q(.5),p90:q(.9),max:x.at(-1)??null,mean:x.reduce((n,v)=>n+v,0)/(x.length||1)};}
function summarize(s,version){
 const students=Object.keys(s.students).map(id=>({id,initialAbility:distribution(Object.values(s.students[id].subjects).map(x=>x.baseline)).mean,...graduation(records(s,id),rulesFor(2026,version))}));
 const terms=Object.values(s.terms).map(t=>{const courses=(t.results??[]).flatMap(r=>r.courses??[]);const subjects={};for(const c of courses){const group=subjects[c.subject]??={count:0,failed:0,makeupPassed:0,retakePassed:0};group.count++;group.failed+=(c.originalMark??c.mark)<c.thresholds.pass?1:0;group.makeupPassed+=c.makeup&&c.makeup.mark>=c.thresholds.pass?1:0;group.retakePassed+=c.retake&&c.retake.mark>=c.thresholds.pass?1:0;}return {termId:t.termId,semesterMarks:distribution(courses.map(c=>c.originalMark??c.mark)),registeredMarks:distribution(courses.map(c=>c.mark)),subjects};});
 const reasons={};for(const student of students)for(const reason of student.reasons??(!student.eligible?['legacy-ineligible']:[]))reasons[reason]=(reasons[reason]??0)+1;
 return {students,terms,credits:distribution(students.map(r=>r.earned)),graduates:students.filter(r=>r.eligible).length,completionCertificates:students.filter(r=>r.certificateEligible).length,incomplete:students.filter(r=>!r.eligible&&!r.certificateEligible).length,reasons};
}
const notice=(name,data)=>{const encoded=gzipSync(JSON.stringify(data)).toString('base64');for(let i=0;i<encoded.length;i+=3000)console.log(`::notice title=${name} ${i/3000}::${encoded.slice(i,i+3000)}`);};
if(process.argv[2]==='--extract'){
 const directory=process.argv[3],manifest=JSON.parse(await readFile(`${directory}/manifest.json`,'utf8')),reference=JSON.parse(await readFile(new URL('./results/three-year-t4-20261105.json',import.meta.url),'utf8')).sources[manifest.difficulty];
 assert.deepEqual(manifest.files,reference.manifest.files);let bytes=await readFile(`${directory}/completed.json`);assert.equal(sha(bytes),manifest.files['completed.json'].sha256);
 let payload=JSON.parse(bytes.toString());bytes=null;const history=payload.world.extensions['teacher-hell/world'].history,journal=history.filter(h=>h.type==='academic'),archive=history.find(h=>h.type==='cohort-completion');
 const state=emptyAcademics(1);for(const h of journal){assert.equal(h.data.version,1);const rng=restoreRandom(h.data.randomBefore),out=applyAcademic(state,structuredClone(h.data.input),rng,1);assert.deepEqual(out,h.data.result);assert.deepEqual(rng.snapshot(),h.data.randomAfter);}
 const source={difficulty:manifest.difficulty,sourceCommit:manifest.sourceCommit,file:manifest.files['completed.json'],academicRows:journal.length,actions:Object.fromEntries([...new Set(journal.map(h=>h.data.input.action))].map(action=>[action,journal.filter(h=>h.data.input.action===action).length]))},students=[];
 for(const outcome of archive.data.outcomes){const rs=records(state,outcome.personId),old=graduation(rs,rulesFor(2026,1));const latest=Math.max(0,...rs.map(r=>r.year??0)),current=rs.filter(r=>r.year===latest);old.repeatEligible=new Set(current.map(r=>r.half)).size===2&&graduation(current,rulesFor(2026,1)).repeatEligible;assert.deepEqual(old,outcome.qualification,'Archived old qualification must remain unchanged');
  const thresholdOnly={...old,eligible:old.complete&&old.earned>=150&&old.requiredEarned>=102&&old.electiveEarned>=40};
  const deficits={total:Math.max(0,150-old.earned),required:Math.max(0,102-old.requiredEarned),elective:Math.max(0,40-old.electiveEarned)};
  students.push({id:outcome.personId,old,thresholdOnly,deficits,newCurriculumAudit:(()=>{const q=graduation(rs,rulesFor(2026,2));return {eligible:q.eligible,status:q.status,reasons:q.reasons,missingRequiredCourses:q.missingRequired.length};})()});
 }
 payload=null;const report={kind:'A1-existing-T4-academic-offline-recalculation',source,legacy: summarize(state,1),students,oldGraduates:students.filter(r=>r.old.eligible).length,thresholdOnlyGraduates:students.filter(r=>r.thresholdOnly.eligible).length,note:'Only existing scores/credits replayed. Threshold-only is diagnostic, not migration, not new grades and not a new three-year game. New curriculum coverage requires real school review; frozen history is unchanged.'};
 await writeFile(`${directory}/a1-academic.json`,JSON.stringify(report,null,2));notice('A1 source',report);
}else{
 const output=process.argv[2]??'simulation/results/academic-a1-20261105.json',cases=[];
 const terms=[['2026:autumn',2026,1,'2027-01-22','2027-02-11'],['2027:spring',2026,1,'2027-06-25','2027-08-29'],['2027:autumn',2027,2,'2028-01-21','2028-02-13'],['2028:spring',2027,2,'2028-06-30','2028-08-27'],['2028:autumn',2028,3,'2029-01-19','2029-02-11'],['2029:spring',2028,3,'2029-06-29','2029-06-29']];
 for(const seed of [1,7,41,74,202609]){
  const initialRng=createRandom(seed),initial=Object.fromEntries(Array.from({length:12},(_,n)=>['fixed:'+n,createLearner(initialRng,1)]));
  for(const [version,population] of [[1,'paired-original-abilities'],[2,'paired-original-abilities'],[2,'new-generation']]){
   const s=emptyAcademics(version),rng=createRandom(seed+1000);s.students=population==='new-generation'?Object.fromEntries(Object.keys(initial).map(id=>[id,createLearner(rng,2)])):structuredClone(initial);
   if(version===2&&population!=='new-generation')for(const learner of Object.values(s.students)){
    for(const name of academicSubjects()){const base=learner.subjects[name]??learner.subjects[subjectFamily(name)]??learner.subjects.國文;learner.subjects[name]={...base,mastery:base.baseline};}
   }
   const roster=Object.keys(s.students).map((id,n)=>({id:'enrollment:'+n,personId:id,classId:'fixed-home'}));
   for(const [index,[termId,year,grade,date]] of terms.entries()){
    const meta=semester(termId),endSupport=index===5?date:new Date(Date.parse(semester(terms[index+1][0]).start+'T00:00:00Z')-86400000).toISOString().slice(0,10);
    applyAcademic(s,{action:'open',termId,year,grade,date:meta.start,roster,classes:[{id:'fixed-home',size:12}],offered:null,teaching:null},rng);
    // Academic date labels drive only pending study hours. No game position,
    // routine, natural state, teacher, NPC or event engine is ever instantiated.
    for(let at=Date.parse(meta.start+'T00:00:00Z');at<=Date.parse(endSupport+'T00:00:00Z');at+=86400000){const day=new Date(at).toISOString().slice(0,10),exams=grade===2&&meta.grade2SecondExam?[meta.exams[0],meta.grade2SecondExam,meta.exams[2]]:meta.exams;
     for(const round of [1,2,3,0])if(day===exams[round===0?2:round-1].at(-1))applyAcademic(s,{action:'assess',termId,round,date:day,activeIds:roster.map(r=>r.personId)},rng);
     if(day===date)applyAcademic(s,{action:'close',termId,activeIds:roster.map(r=>r.personId),date},rng);
     if(version===2&&academicSupportDue(s,day))academicSupport(s,{date:day,termId},rng);
    }
   }
   cases.push({seed,version,population,...summarize(s,version)});
  }
 }
 const report={kind:'A1-fixed-small-six-semester-academics-only',studentsPerSeed:12,seeds:[1,7,41,74,202609],noGameCalendarOrWorldSimulation:true,comparison:'Same initial learners. v1 original normal flow; v2 academic-only assessments and recorded support dates. No new T4 graduation-rate claim.',cases};
 await mkdir(new URL('./results/',import.meta.url),{recursive:true});await writeFile(output,JSON.stringify(report,null,2)+'\n');for(const c of cases)console.log(JSON.stringify({seed:c.seed,version:c.version,population:c.population,graduates:c.graduates,certificates:c.completionCertificates,credits:c.credits,reasons:c.reasons}));
}
