/** UTC civil arithmetic; no local timezone, implicit clock or unbounded supported years. */
export class CalendarError extends Error { constructor(code,message){super(`${code}: ${message}`);this.name='CalendarError';this.code=code;} }
export function requireCalendar(ok,code,message){if(!ok)throw new CalendarError(code,message);}
export function dayNumber(date){
 requireCalendar(typeof date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(date),'DATE','Expected YYYY-MM-DD');
 const ms=Date.parse(date+'T00:00:00Z');requireCalendar(Number.isFinite(ms)&&new Date(ms).toISOString().slice(0,10)===date,'DATE',`Invalid date ${date}`);return ms/86400000;
}
export const addDays=(date,n)=>new Date((dayNumber(date)+n)*86400000).toISOString().slice(0,10);
export const weekday=date=>(dayNumber(date)+3)%7+1; // Monday=1, Sunday=7 (supported positive years)
export const weekMonday=date=>addDays(date,1-weekday(date));
export const onOrAfter=(date,day)=>addDays(date,(day-weekday(date)+7)%7);
export const onOrBefore=(date,day)=>addDays(date,-((weekday(date)-day+7)%7));
export function datesBetween(start,end){const out=[];for(let d=start;d<=end;d=addDays(d,1))out.push(d);return out;}
export function freezeData(value){if(value&&typeof value==='object'){Object.values(value).forEach(freezeData);Object.freeze(value);}return value;}
