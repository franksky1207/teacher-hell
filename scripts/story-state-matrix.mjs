#!/usr/bin/env node
/** Numeric-first V3 draft aid. Generates ONE legal 8x4 teacher-state matrix.
 * Only the four state columns, not NPC values or 4x8 choice weights.
 * Uses real randomness; no candidate-pool optimization or narrative scoring.
 */
import {randomInt} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {STATE_GROUPS} from './story-draft-validator.js';

export const STATE_NAMES=Object.freeze(['精神','熱忱','情緒','掌控']);
const shuffle=(values,rng)=>{const a=[...values];for(let i=a.length-1;i>0;i--){const j=rng(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;};
export function validateStateMatrix({groups,rows}){
 const errors=[];
 if(!Array.isArray(groups)||groups.length!==4||new Set(groups).size!==4||groups.some(g=>!STATE_GROUPS[g]))
  errors.push('必須從A～E選取四組且不重複');
 if(!Array.isArray(rows)||rows.length!==8||rows.some(r=>!Array.isArray(r)||r.length!==4||
   r.some(v=>!Number.isSafeInteger(v))))errors.push('必須是8x4整數矩陣');
 if(errors.length)return {pass:false,errors};
 for(let c=0;c<4;c++){
  const given=rows.map(row=>row[c]).sort((a,b)=>b-a).join(',');
  if(given!==[...STATE_GROUPS[groups[c]]].sort((a,b)=>b-a).join(','))
   errors.push(STATE_NAMES[c]+'不符合'+groups[c]+'組');
 }
 for(let r=0;r<8;r++)if(rows[r].filter(v=>v===0).length>2)
  errors.push('R'+(r+1)+'零值超過兩個');
 for(let c=0;c<4;c++)if(rows.reduce((n,row)=>n+row[c],0)!==-4)
  errors.push(STATE_NAMES[c]+'總和不是-4');
 return {pass:errors.length===0,errors};
}
export function generateStateMatrix(rng=randomInt){
 // A legal matrix is sampled, not scored: this avoids multiple narrative rewrites.
 for(let trial=0;trial<256;trial++){
  const groups=shuffle(Object.keys(STATE_GROUPS),rng).slice(0,4);
  const columns=groups.map(g=>shuffle(STATE_GROUPS[g],rng));
  const rows=Array.from({length:8},(_,r)=>columns.map(col=>col[r]));
  const check=validateStateMatrix({groups,rows});
  if(check.pass)return {
   stateNames:[...STATE_NAMES],groups,groupByState:Object.fromEntries(STATE_NAMES.map((s,i)=>[s,groups[i]])),
   rows:rows.map((values,i)=>({result:'R'+(i+1),values})),
   totals:STATE_NAMES.map(()=>-4),means:STATE_NAMES.map(()=>-0.5),
   zeroByResult:rows.map(v=>v.filter(x=>x===0).length),attempts:trial+1
  };
 }
 throw Error('256次候選均無合法矩陣：停止而非無限重抽');
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 if(process.argv.length!==2){console.error('用法：node scripts/story-state-matrix.mjs');process.exitCode=2;}
 else console.log(JSON.stringify(generateStateMatrix(),null,2));
}
