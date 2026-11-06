/** Display-only projections; never alter or round persisted world values. */
import {calendarDay,semester,yearData} from '../src/calendar/calendar.js';
import {addDays,dayNumber,weekMonday} from '../src/calendar/civil.js';
export const displayPanelValue=value=>String(Math.round(value));
export function periodLabel(date,day){
 if(day.term?.camp==='summer')return `暑輔第 ${Math.floor((dayNumber(date)-dayNumber(yearData(Number(date.slice(0,4))).summerCamp))/7)+1} 週`;
 if(day.term?.camp==='winter')return '寒輔第 1 週';
 if(day.week!==null)return `${day.term.id.endsWith('autumn')?'上學期':'下學期'}・第 ${day.week} 週`;
 return day.kind==='spring-festival'?'春節':day.kind==='long-vacation'?'長假':day.holiday.length?day.holiday.map(h=>h.name).join('、'):'假期';
}
/** Actual week plus nearest opposite-parity full week in the same formal semester. */
export function comparableWeeks(date,grade,version){
 const day=calendarDay(date,grade,version),actual=weekMonday(date),result={actual,odd:null,even:null};
 if(day.week===null||day.term?.camp)return result;
 const key=day.week%2?'odd':'even',other=day.week%2?'even':'odd';result[key]=actual;
 const term=semester(day.term.id);
 for(const delta of [7,-7]){const candidate=addDays(actual,delta),last=addDays(candidate,4);if(candidate<term.start||last>term.end)continue;const d=calendarDay(candidate,grade,version);if(d.week!==null&&d.week%2!==day.week%2&&d.courseSemesterId===term.id){result[other]=candidate;break;}}
 return result;
}
export function classLabel(table,registry,classId){const c=registry.classes[classId];if(!c)throw new RangeError('Unknown class');const grade=table.academicYear-c.cohortStart+1;if(grade<1||grade>3)throw new RangeError('Invalid class or academic year');return `高${'一二三'[grade-1]}${c.name}`;}
