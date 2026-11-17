/** Focused three-year completion guard. Historical thirty-year transport tests were retired. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { careerYears,careerRange,planMode,THREE_YEAR } from '../src/calendar/calendar.js';
import { annualOpening } from './support/annual-scenario.js';
import { prepareWorldOperation } from '../src/runtime/transactions.js';
import { request } from './support/runtime.js';

test('three-year only: legal career span and opening dates are fixed',()=>{
 assert.equal(careerYears(THREE_YEAR),3);
 assert.deepEqual(careerRange(2026,THREE_YEAR),{start:'2026-07-20',end:'2029-06-29',startYear:2026});
 assert.throws(()=>careerRange(2027,THREE_YEAR));
 assert.throws(()=>careerYears('career-30'));
 assert.throws(()=>planMode({validation:'fixed-calendar-v1'}));
});

test('three-year only: obsolete 30-year settlement is rejected without changing the world',()=>{
 const w=annualOpening({difficulty:'hard'}),before=JSON.stringify(w);
 assert.throws(()=>prepareWorldOperation(w,{...request(w,'retired-career-settlement',[{type:'settle-career'}]),calendarContext:{kind:'routine'}}),/CAREER/);
 assert.equal(JSON.stringify(w),before);
});
