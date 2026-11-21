/** Teacher timetable CSP: explicit class offerings from the school lifecycle boundary.
 * Generates one immutable semester decision using the existing N1 PRNG only. */
import { restoreRandom } from '../numeric/random.js';
import { requireCalendar as need } from './civil.js';
export const SUBJECT_LOAD=Object.freeze({國文:[3,6],英文:[3,6],數學:[3,6],地理:[6,3],歷史:[6,3],物理:[6,3],化學:[6,3],公民:[9,2],生物:[9,2]});
const shuffle=(list,rng)=>{const copy=[...list];for(let i=copy.length-1;i>0;i--){const j=rng.integer(0,i);[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;};
const combinations=(list,n)=>n===0?[[]]:list.flatMap((v,i)=>combinations(list.slice(i+1),n-1).map(rest=>[v,...rest]));
export function validateClasses(classes,academicYear){
 need(Array.isArray(classes)&&classes.length>0,'TIMETABLE','Explicit class catalogue required');
 const ids=new Set();for(const c of classes){need(c&&typeof c.id==='string'&&c.id.length>0&&!ids.has(c.id),'TIMETABLE','Duplicate/invalid class');ids.add(c.id);need(Number.isInteger(c.cohortStart)&&[1,2,3].includes(academicYear-c.cohortStart+1),'TIMETABLE','Class outside its three-year enrollment');need(Array.isArray(c.subjects)&&new Set(c.subjects).size===c.subjects.length&&c.subjects.every(s=>s in SUBJECT_LOAD),'TIMETABLE','Explicit supported subject offerings required');}
}
export function validateTimetable(table){
 const load=SUBJECT_LOAD[table?.subject];need(load&&table.version===1&&typeof table.semesterId==='string'&&Number.isInteger(table.academicYear),'TIMETABLE','Unknown timetable version/subject');
 validateClasses(table.classes,table.academicYear);const [count,hours]=load;
 need(table.classes.length===count&&table.classes.some(c=>c.id===table.homeClassId),'TIMETABLE','Wrong assignment count or missing homeroom');
 need(table.classes.every(c=>c.subjects.includes(table.subject)),'TIMETABLE','Subject not offered by an assigned class');
 need(Array.isArray(table.lessons)&&table.lessons.length===18,'TIMETABLE','Exactly 18 nominal weekly lessons required');
 const seen=new Set(),byClass=new Map(table.classes.map(c=>[c.id,[]]));
 for(const l of table.lessons){need(Number.isInteger(l.weekday)&&l.weekday>=1&&l.weekday<=5&&Number.isInteger(l.period)&&l.period>=1&&l.period<=8&&!(l.weekday===5&&[6,7].includes(l.period)),'TIMETABLE','Invalid or fixed-reserved period');const key=`${l.weekday}:${l.period}`;need(!seen.has(key)&&byClass.has(l.classId),'TIMETABLE','Teacher double booking or unknown class');seen.add(key);byClass.get(l.classId).push(l);}
 for(const rows of byClass.values()){
  need(rows.length===hours,'TIMETABLE','Incorrect per-class weekly load');const counts=Array.from({length:5},(_,i)=>rows.filter(l=>l.weekday===i+1));
  if(hours===6){need(counts.map(a=>a.length).sort().join(',')==='1,1,1,1,2','TIMETABLE','Six lessons must span 1/1/1/1/2');const two=counts.find(a=>a.length===2);need(Math.abs(two[0].period-two[1].period)>1,'TIMETABLE','Same-class double lesson cannot be adjacent');}
  else need(counts.every(a=>a.length<=1),'TIMETABLE','Same class must use distinct days');
 }
 return table;
}
export function generateTimetable({subject,semesterId,academicYear,classes,homeClassId,previous=null,random}){
 const rng=restoreRandom(random),load=SUBJECT_LOAD[subject];need(load,'TIMETABLE','Unsupported teaching subject');validateClasses(classes,academicYear);
 const [count,hours]=load,eligible=classes.filter(c=>c.subjects.includes(subject)),home=eligible.find(c=>c.id===homeClassId);
 need(home&&eligible.length>=count,'TIMETABLE','Cannot satisfy 18 lessons / eligible homeroom with supplied school');
 let retained=[];
 if(previous){validateTimetable(previous);need(previous.subject===subject,'TIMETABLE','Career subject cannot silently change');
  for(const c of previous.classes){
   if(academicYear-c.cohortStart+1<=3){const next=eligible.find(n=>n.id===c.id);need(next&&next.cohortStart===c.cohortStart,'TIMETABLE','Continuing class missing or offering incompatible; lifecycle reconciliation required');retained.push(next);}
  }
  if(previous.academicYear===academicYear)need(retained.length===count&&previous.homeClassId===homeClassId,'TIMETABLE','Second semester cannot redraw class assignments');
 }
 const assigned=[...retained];if(!assigned.some(c=>c.id===home.id))assigned.push(home);
 need(assigned.length<=count,'TIMETABLE','Homeroom and continuing assignments exceed subject load');
 for(const c of shuffle(eligible,rng))if(assigned.length<count&&!assigned.some(a=>a.id===c.id))assigned.push(c);
 const capacity=shuffle([4,4,4,3,3],rng),days=new Map();
 if(hours===6){const doubleDays=shuffle([1,2,3,4,5],rng).filter(d=>capacity[d-1]===4);assigned.forEach((c,i)=>days.set(c.id,[1,2,3,4,5,doubleDays[i]]));}
 else {
  const combos=combinations([1,2,3,4,5],hours),order=shuffle(assigned,rng);
  function place(i){if(i===order.length)return capacity.every(n=>n===0);for(const combo of shuffle(combos,rng)){if(combo.some(d=>capacity[d-1]===0))continue;combo.forEach(d=>capacity[d-1]--);days.set(order[i].id,combo);if(place(i+1))return true;combo.forEach(d=>capacity[d-1]++);}return false;}
  need(place(0),'TIMETABLE','No feasible daily load distribution');
 }
 const lessons=[];
 for(let day=1;day<=5;day++){
  const labels=assigned.flatMap(c=>(days.get(c.id)??[]).filter(d=>d===day).map(()=>c.id));let best=null,bestCost=Infinity;
  for(let trial=0;trial<160;trial++){
   const periods=shuffle(day===5?[1,2,3,4,5,8]:[1,2,3,4,5,6,7,8],rng).slice(0,labels.length),who=shuffle(labels,rng);
   let invalid=false,cost=0;
   for(const c of assigned){const at=periods.filter((_,i)=>who[i]===c.id);if(at.length===2){if(Math.abs(at[0]-at[1])===1){invalid=true;break;}if((at[0]<=4)===(at[1]<=4))cost+=10;}}
   if(invalid)continue;
   for(let p=1;p<=6;p++)if([p,p+1,p+2].every(n=>periods.includes(n)))cost+=3;
   if(cost<bestCost){bestCost=cost;best=periods.map((period,i)=>({weekday:day,period,classId:who[i]}));if(cost===0)break;}
  }
  if(!best){const who=labels,available=day===5?[1,2,3,4,5,8]:[1,2,3,4,5,6,7,8];for(const periods of combinations(available,labels.length)){if(assigned.every(c=>{const at=periods.filter((_,i)=>who[i]===c.id);return at.length<2||Math.abs(at[0]-at[1])>1;})){best=periods.map((period,i)=>({weekday:day,period,classId:who[i]}));break;}}}
  need(best,'TIMETABLE','No feasible non-adjacent double arrangement');lessons.push(...best);
 }
 const table=validateTimetable({version:1,subject,semesterId,academicYear,homeClassId,classes:structuredClone(assigned),lessons:lessons.sort((a,b)=>a.weekday-b.weekday||a.period-b.period)});
 return {table,random:rng.snapshot()};
}
