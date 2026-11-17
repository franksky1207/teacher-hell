/** Three-year 2026 cohort calendar overlay. Legacy 40-year fixed data remains unchanged. */
export function applyThreeYearCalendar(base){
 const data=JSON.parse(JSON.stringify(base));
 const term=id=>data.years.flatMap(y=>y.terms).find(t=>t.id===id);
 const year=y=>data.years.find(x=>x.year===y);
 const setExam=(id,grade,round,dates)=>{
  const t=term(id);if(!t)throw Error('Missing cohort term '+id);
  (t.gradeExamOverrides??={})[grade]??={};
  t.gradeExamOverrides[grade][round]=dates;
 };
 // Both grades follow the Wed/Thu exam then Fri excursion pattern.
 for(const [id,grades,dates] of [
  ['2026:autumn',[1,2],['2026-12-02','2026-12-03']],
  ['2027:spring',[1],['2027-05-05','2027-05-06']],
  ['2027:autumn',[1,2],['2027-12-01','2027-12-02']],
  ['2028:spring',[1],['2028-05-10','2028-05-11']],
  ['2028:autumn',[1,2],['2028-11-29','2028-11-30']],
  ['2029:spring',[1,3],['2029-05-09','2029-05-10']]
 ])for(const grade of grades)setExam(id,grade,2,dates);
 setExam('2028:autumn',3,3,['2028-12-26','2028-12-27']);
 const findActivity=(kind,date)=>data.years.flatMap(y=>y.activities).find(a=>a.kind===kind&&a.date===date);
 const removeTermActivity=(termId,kind)=>{for(const y of data.years)y.activities=y.activities.filter(a=>!(a.kind===kind&&a.id.startsWith(termId+':')));};
 const add=(yearNum,termId,kind,grades,date,slots,rule='three-year-cohort-2026-v1')=>{
  year(yearNum).activities.push({id:termId+':'+kind+':'+grades.join(''),kind,grades,date,slots,rule,originalDate:date});
 };
 // Remove obsolete spring sports BEFORE adding autumn sports with the same kind.
 for(const y of [2027,2028,2029])removeTermActivity(y+':spring','sports');
 // Autumn annual sports meet, Saturday anniversary and Monday makeup day.
 for(const [y,sport,anniversary,makeup] of [
  [2026,'2026-12-11','2026-12-12','2026-12-14'],
  [2027,'2027-12-10','2027-12-11','2027-12-13'],
  [2028,'2028-12-08','2028-12-09','2028-12-11']
 ]){
  add(y,y+':autumn','sports',[1,2,3],sport,['all']);
  const anniversaryNode=findActivity('anniversary',anniversary);
  if(!anniversaryNode)throw Error('Missing school anniversary '+y);
  anniversaryNode.grades=[1,2,3];
  const holiday=data.holidays.find(([d])=>d===makeup);
  if(!holiday)throw Error('Missing school makeup holiday '+makeup);
  for(const h of holiday[1])if(h.name==='校慶補假')h.grades=[1,2,3];
 }
 // First-years sing their class-song in spring, not autumn.
 for(const y of [2026,2027,2028])removeTermActivity(y+':autumn','class-song');
 for(const [y,d] of [[2027,'2027-04-09'],[2028,'2028-04-07'],[2029,'2029-04-13']])
  add(y,y+':spring','class-song',[1],d,['p6','p7']);
 // Japanese visit is in autumn, not spring. 2026 is the explicitly fixed date.
 for(const y of [2027,2028,2029])removeTermActivity(y+':spring','japan-visit');
 add(2026,'2026:autumn','japan-visit',[1],'2026-11-11',['all']);
 add(2027,'2027:autumn','japan-visit',[1],'2027-11-11',['all']);
 add(2028,'2028:autumn','japan-visit',[1],'2028-11-10',['all']);
 // Exactly three ordinary field trips for the player; other cohorts retain the same grade rules.
 for(const [y,oldDate,newDate] of [
  [2026,'2026-12-11','2026-12-04'],
  [2027,'2027-05-21','2027-05-07'],
  [2027,'2027-12-10','2027-12-03'],
  [2028,'2028-05-26','2028-05-12'],
  [2028,'2028-12-08','2028-12-01'],
  [2029,'2029-05-25','2029-05-11']
 ]){
  for(const a of data.years.flatMap(y=>y.activities).filter(a=>a.kind==='field-trip'&&a.date===oldDate)){
   a.date=newDate;a.rule='second-exam-wed-thu-field-trip-friday';
  }
 }
 // Third-years stay in normal academic classes rather than performing or watching club shows.
 for(const y of [2026,2027,2028,2029])
  for(const a of year(y).activities.filter(a=>a.kind==='clubs'))a.grades=[1,2];
 data.holidays.push(['2029-01-19',[{name:'高三學測考前放假',basis:'school-cohort-2026-v1',observedFor:null,grades:[3]}]]);
 data.holidays.sort(([a],[b])=>a.localeCompare(b));
 return data;
}
