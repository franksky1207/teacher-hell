/** Reproducible 11-E contract acceptance; NEVER a natural 30-year world. */
import {mkdir,writeFile} from 'node:fs/promises';
import {completionContract} from '../test/support/completion-contract.js';
import {compileCareerCompletion,careerEvidence} from '../src/runtime/career.js';
import {memorialFromWorld} from '../src/storage/memorial.js';
import {rateCareer} from '../src/assessment/career.js';
const root='work/completion';await mkdir(root,{recursive:true});const examples=[];
for(const [label,settings] of [['ordinary',{}],['low',{quality:0,before:100,after:0}],['max',{quality:100,before:0,after:100}]]){
 const w=completionContract(settings);globalThis.gc?.();const before=process.memoryUsage(),at=performance.now(),d=compileCareerCompletion(w),ms=performance.now()-at,after=process.memoryUsage();
 w.extensions['teacher-hell/world'].history.push({id:'contract-completion',type:'career-completion',data:d});const m=memorialFromWorld(w);
 if(label==='ordinary')await writeFile(`${root}/memorial.json`,JSON.stringify(m));
 examples.push({label,source:'explicit N7 fixture + contract journal double, NOT a production world or player save',score:d.rating.score,grade:d.rating.grade,parts:d.rating.parts,reportBytes:Buffer.byteLength(JSON.stringify(d)),memorialBytes:Buffer.byteLength(JSON.stringify(m)),elapsedMs:ms,heapDelta:after.heapUsed-before.heapUsed,rssDelta:after.rss-before.rss,ending:d.ending.text});
}
const original=completionContract(),e=careerEvidence(original),retained=[];for(let i=0;i<10;i++)rateCareer({yearRefs:e.yearRefs,cohortRefs:e.cohortRefs},e.source);globalThis.gc?.();const baseline=process.memoryUsage().heapUsed;
for(let batch=0;batch<4;batch++){for(let i=0;i<25;i++)compileCareerCompletion(original);globalThis.gc?.();retained.push(process.memoryUsage().heapUsed-baseline);}
const endingExamples=[];
const situations=[
 ['student-colleague-support',['學生多年後仍寄來信。','同事記得那次協助。'],80],
 ['teaching-school-conflict',['學生的學習紀錄有進步。','校方仍維持對教師的批評。'],80],
 ['administration-exhaustion',['行政交接依紀錄完成。','教師最後身心耗竭。'],20],
 ['unfair-survival',['紀錄保留多次有爭議的校方安排。','異議沒有使當時的安排撤回。'],60],
 ['student-investment-cost',['教師持續提供學生支持。','私人生活的衝突仍未解決。'],25],
 ['polarized',['部分學生公開肯定教師。','另一名當事人仍反對教師的處理。'],80],
 ['ordinary-human-support',['學業表現沒有顯著突破。','有人仍記得教師曾經提供的協助。'],80],
 ['growth-without-recognition',['教師的專業成長留在紀錄中。','校方並未給予相應肯定。'],80],
];
for(const [name,descriptions,state] of situations){
 const w=completionContract(),r=w.extensions['teacher-hell/world'];if(state<80)for(const key of ['體力','精神'])r.history.at(-1).data.end.states[key]=state;
 if(name==='growth-without-recognition')r.history.at(-1).data.end.states.聲望=20;
 const facts=descriptions.map((description,i)=>({id:`contract-known:${name}:${i}`,eventId:`contract-event:${name}:${i}`,description,subjectIds:['teacher'],witnessIds:['teacher'],occurredAt:{date:'2056-06-30',slotId:'private'}}));r.facts.push(...facts);r.history.push({type:'semester-review',data:{events:facts.map(f=>({eventId:f.eventId,score:5,factIds:[f.id]}))}});
 const d=compileCareerCompletion(w);endingExamples.push({name,source:'explicit representative contract facts, not a natural world',grade:d.rating.grade,score:d.rating.score,ending:d.ending.text,factRefs:d.events.map(e=>e.id)});
}
const report={version:1,endingExamples,scope:'11-E contract boundary only; no natural 30-year run; no 11-F',examples,retainedHeapSamples:retained};await writeFile(`${root}/report.json`,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
