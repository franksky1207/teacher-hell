/** Versioned, platform-free content assets. Save files contain references, never scripts. */
import { canonicalData } from '../changes/settlement.js';
import { assertShape, identifier } from '../player/panel.js';
import { TOPIC_IDS } from './topics.js';
const need=(ok,code,message)=>{if(!ok)throw new RangeError(`CONTENT_${code}: ${message}`);};
const roles=['teacher','participant','companion'];
const expressions=['calm','happy','angry','sad','surprised','embarrassed'];
const scenes=['school:counselling-corner'];
export function validateStory(c){
 canonicalData(c);assertShape(c,['resourceId','definitionId','version','topicId','status','entry','stages',...(Object.hasOwn(c,'premise')?['premise']:[])]);
 for(const k of ['resourceId','definitionId','version','entry'])identifier(c[k]);
 need(TOPIC_IDS.includes(c.topicId),'REFERENCE','topic');need(['engineering-test','ready'].includes(c.status),'STATUS','status');
 need(c.status!=='ready'||!c.resourceId.startsWith('engineering:'),'PUBLICATION','engineering asset');
 if(c.premise){assertShape(c.premise,['description','data']);identifier(c.premise.description);canonicalData(c.premise.data);}
 need(Array.isArray(c.stages)&&c.stages.length>0,'EMPTY','stages');const ids=c.stages.map(s=>s.id);
 need(new Set(ids).size===ids.length&&ids.includes(c.entry),'GRAPH','stage identities');
 for(const s of c.stages){
  assertShape(s,['id','pages','choices','next']);identifier(s.id);need(s.pages.length>0,'EMPTY','pages');
  for(const [i,p] of s.pages.entries()){
   assertShape(p,['order','text','speaker','scene','cast','presentation']);identifier(p.text);need(scenes.includes(p.scene),'SCENE','unknown scene resource');
   need(p.order===i+1,'PAGE','page order');need(['dialogue','narration','phone','chat'].includes(p.presentation),'PAGE','presentation');
   need(p.cast.length<=2&&new Set(p.cast.map(a=>a.role)).size===p.cast.length&&new Set(p.cast.map(a=>a.position)).size===p.cast.length,'CAST','at most two unique actors');
   for(const a of p.cast){assertShape(a,['role','position','expression']);need(['participant','companion'].includes(a.role)&&['left','right','center'].includes(a.position),'CAST','actor reference');need(expressions.includes(a.expression),'CAST','expression');}
   need(p.speaker===null?p.presentation==='narration':roles.includes(p.speaker)&&(p.speaker==='teacher'||p.cast.some(a=>a.role===p.speaker)),'SPEAKER','speaker/cast');
  }
  need(Array.isArray(s.choices),'CHOICE','choices');
  if(s.choices.length){need(s.next===null&&s.choices.length>=3&&s.choices.length<=8,'CHOICE','3–8 decisions');need(s.choices.filter(o=>!o.requires?.length).length>=3&&s.choices.some(o=>o.emotional&&!o.requires?.length),'QUALIFICATION','three basic options and emotion stay available');const n=s.choices.filter(o=>o.emotional).length;need(n>=1&&n<=2,'EMOTION','1–2 emotional options');}
  else need(s.next!==null,'GRAPH','explicit successor');
  need(new Set(s.choices.map(o=>o.id)).size===s.choices.length,'CHOICE','duplicate option');
  for(const o of s.choices){assertShape(o,['id','text','emotional','kind','outcome',...(Object.hasOwn(o,'requires')?['requires']:[])]);
   for(const condition of o.requires??[]){
    if(condition.type==='fact'){assertShape(condition,['type','id']);identifier(condition.id);}
    else if(condition.type==='numeric'){assertShape(condition,['type','role','holder','code','min','max']);need(roles.includes(condition.role)&&['person','life','work','outlook'].includes(condition.holder)&&/^(?:[1-9]|1[0-2])-[1-4]$/.test(condition.code)&&Number.isFinite(condition.min)&&Number.isFinite(condition.max)&&condition.min>=0&&condition.max<=100&&condition.min<=condition.max,'QUALIFICATION','numeric bounds');}
    else need(false,'QUALIFICATION','unknown condition');
   }identifier(o.id);identifier(o.text);need(typeof o.emotional==='boolean'&&['action','defer','refuse','support'].includes(o.kind),'CHOICE','option kind');
   const r=o.outcome;assertShape(r,['fact','claims','changes','historyCodes','next']);identifier(r.fact);
   for(const q of r.claims){assertShape(q,['role','statement','belief','visible']);need(roles.includes(q.role)&&['believed','uncertain','rejected'].includes(q.belief)&&typeof q.visible==='boolean','KNOWLEDGE','claim');identifier(q.statement);}
   need(new Set(r.changes.map(e=>JSON.stringify([e.role,e.holder,e.code]))).size===r.changes.length,'RESULT','duplicate numeric target');
   for(const e of r.changes){assertShape(e,['role','holder','code','delta']);need(roles.includes(e.role)&&['person','life','work','outlook'].includes(e.holder)&&/^(?:[1-9]|1[0-2])-[1-4]$/.test(e.code)&&Number.isFinite(e.delta),'RESULT','numeric reference');need(e.role==='teacher'||e.holder==='person','RESULT','NPC holder');}
   need(r.historyCodes.every(x=>/^H(?:0[1-9]|10)-[1-6]$/.test(x)),'RESULT','history reference');
  }
  for(const n of s.choices.length?s.choices.map(o=>o.outcome.next):[s.next]){
   assertShape(n,['stage','afterDays']);need(n.stage===null||ids.includes(n.stage),'GRAPH','unknown successor');need(Number.isSafeInteger(n.afterDays)&&n.afterDays>=0&&n.afterDays<=366&&(n.stage!==null||n.afterDays===0),'WAIT','wait condition');
  }
 }
 const seen=new Set(),active=new Set();function visit(id){need(!active.has(id),'CYCLE','cycles need a bounded domain design');if(seen.has(id))return;active.add(id);const s=c.stages.find(s=>s.id===id);for(const n of s.choices.length?s.choices.map(o=>o.outcome.next):[s.next])if(n.stage!==null)visit(n.stage);active.delete(id);seen.add(id);}visit(c.entry);need(seen.size===ids.length,'UNREACHABLE','unreachable stage');return c;
}
const page=(order,text,speaker=null)=>({order,text,speaker,scene:'school:counselling-corner',cast:speaker?[{role:'participant',position:'center',expression:order===1?'embarrassed':'calm'}]:[],presentation:speaker?'dialogue':'narration'});
const next=(stage=null,afterDays=0)=>({stage,afterDays});
const outcome=(fact,delta,stage,afterDays=0)=>({fact,claims:[{role:'participant',statement:delta<0?'老師願意聽我說，但我還不敢全說。':'老師很急，我不知道要怎麼回答。',belief:'believed',visible:false},{role:'teacher',statement:'成績變化的原因尚待查明。',belief:'uncertain',visible:true}],changes:[{role:'teacher',holder:'person',code:'2-1',delta},{role:'participant',holder:'person',code:'1-3',delta:-delta}],historyCodes:fact.includes('約定')||fact.includes('排出')?['H03-1']:fact.includes('協助')?['H02-1']:[],next:next(stage,afterDays)});
const choice=(id,text,emotional,kind,r)=>({id,text,emotional,kind,outcome:r});
export const DEMO_STORY=validateStory({resourceId:'engineering:learning-conversation',definitionId:'engineering:learning-conversation',version:'1',topicId:'E01-01',status:'engineering-test',premise:{description:'教師看到學生提供的小考成績單，三次分數為78、74及52。',data:{type:'engineering-assessment-observation',scores:[78,74,52]}},entry:'opening',stages:[
 {id:'opening',pages:[page(1,'成績單上，這次的小考比前兩次低了不少。'),page(2,'老師，我不是故意不交的。','participant'),page(3,'早自習快結束了。你把成績單翻到背面。','teacher')],choices:[
 choice('listen','先聽他說最近一天是怎麼過的。',false,'action',outcome('教師與學生約定隔日再談生活與作業安排。',-2,'listen',1)),
 choice('angry','我也快撐不住了，今天先把沒交的說清楚。',true,'action',outcome('教師當面表達疲憊，學生交出缺交清單，約定隔日核對。',3,'boundary',1)),
 choice('defer','今天先不追問，明天帶著作業再談。',false,'defer',outcome('教師延後約談一天，沒有判定學生懶惰。',-1,'listen',1)),
 choice('support','請學生先找可信任的同學一起整理缺交項目。',false,'support',outcome('學生同意先自行邀請同儕整理，尚未保證有人協助。',1,'boundary',1))],next:null},
 ...['listen','boundary'].map(id=>({id,pages:[page(1,id==='listen'?'隔天，學生帶來一張寫著作息的紙。':'隔天，學生帶著缺交清單回來。'),page(2,id==='listen'?'我晚上要幫忙顧店，但也有幾題真的不會。':'我列好了。家裡的事我還不想說。','participant')],choices:[
 choice('plan','和他一起排出可做到的一小段補交安排。',false,'action',outcome(id==='listen'?'雙方排出補交安排，學生自行陳述有顧店情形，原因未全查證。':'雙方依缺交清單排出安排，家庭原因仍未確認。',id==='listen'?-3:1,null)),
 choice('sigh','我真的很累，但這張清單我們一起刪一項吧。',true,'action',outcome('教師表達疲憊後協助完成一項，沒有保證其餘進度。',-1,null)),
 choice('refuse','今天不追加要求，保留紀錄，之後再觀察。',false,'refuse',outcome('教師暫不追加要求，保留未解問題與觀察紀錄。',0,null))],next:null}))
]});
function freeze(x){if(x&&typeof x==='object'){Object.values(x).forEach(freeze);Object.freeze(x);}return x;}
export const SHORT_STORY=validateStory({...structuredClone(DEMO_STORY),resourceId:'engineering:short-conversation',definitionId:'engineering:short-conversation',stages:[{...structuredClone(DEMO_STORY.stages[0]),choices:DEMO_STORY.stages[0].choices.map(o=>({...structuredClone(o),outcome:{...structuredClone(o.outcome),next:next()}}))}]});
export const IMMEDIATE_STORY=validateStory({...structuredClone(DEMO_STORY),resourceId:'engineering:immediate-conversation',definitionId:'engineering:immediate-conversation',stages:[{...structuredClone(DEMO_STORY.stages[0]),choices:DEMO_STORY.stages[0].choices.map(o=>({...structuredClone(o),outcome:{...structuredClone(o.outcome),next:next('listen')}}))},structuredClone(DEMO_STORY.stages[1])]});
const assets=freeze([DEMO_STORY,SHORT_STORY,IMMEDIATE_STORY]);
export function resolveStory(ref){const c=assets.find(c=>c.resourceId===ref.resourceId&&c.version===ref.version);need(c,'RESOURCE','missing immutable content version');return c;}
export function validateStoryReference(d){const c=resolveStory(d.content);need(c.definitionId===d.id&&c.topicId===d.topicId&&c.status===d.content.status,'REFERENCE','definition/content identity');return c;}

export function storyDigest(c){let hash=14695981039346656037n;for(const char of canonicalData(c)){hash^=BigInt(char.codePointAt(0));hash=BigInt.asUintN(64,hash*1099511628211n);}return hash.toString(16).padStart(16,'0');}
