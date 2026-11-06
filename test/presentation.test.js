import test from 'node:test';
import assert from 'node:assert/strict';
import {displayPanelValue,periodLabel,comparableWeeks,classLabel} from '../web/presentation.js';
import {calendarDay} from '../src/calendar/calendar.js';

test('panel display rounds only text without altering the source',()=>{
 const source=[83.9953857421875,47.5110107421875,78.87083333333334,60.83333333333333];
 assert.deepEqual(source.map(displayPanelValue),['84','48','79','61']);assert.equal(source[0],83.9953857421875);
});
test('camp, semester and vacation labels use actual calendar boundaries',()=>{
 for(const [date,expected] of [['2026-07-20','暑輔第 1 週'],['2026-08-10','暑輔第 4 週'],['2026-09-04','上學期・第 2 週'],['2027-01-25','寒輔第 1 週'],['2027-02-01','長假']])assert.equal(periodLabel(date,calendarDay(date,1)),expected,date);
});
test('comparison keeps actual date and selects opposite real semester week',()=>{
 assert.deepEqual(comparableWeeks('2026-07-20',1),{actual:'2026-07-20',odd:null,even:null});
 assert.deepEqual(comparableWeeks('2026-09-04',1),{actual:'2026-08-31',odd:'2026-09-07',even:'2026-08-31'});
 assert.equal(calendarDay('2026-09-04',1).slots.find(s=>s.id==='p6').kind,'assembly');
 assert.equal(calendarDay('2026-09-11',1).slots.find(s=>s.id==='p6').kind,'period');
 assert.equal(calendarDay('2026-10-01',1).slots.find(s=>s.id==='p6').kind,'activity');
 assert.equal(calendarDay('2026-10-05',1).exam,true);
});
test('class labels use the selected authoritative table academic year',()=>{
 const registry={classes:{a:{name:'忠',cohortStart:2026},b:{name:'仁',cohortStart:2025},c:{name:'平',cohortStart:2024}}},table={academicYear:2026};
 assert.deepEqual(['a','b','c'].map(id=>classLabel(table,registry,id)),['高一忠','高二仁','高三平']);
 assert.throws(()=>classLabel(table,registry,'missing'));
});
