import { entranceAbsentFromHistory } from './entrance.js';
/** Versioned, platform-free content assets. Save files contain references, never scripts. */
import { canonicalData } from '../changes/settlement.js';
import { assertShape, identifier } from '../player/panel.js';
import { TOPIC_IDS } from './topics.js';
const need=(ok,code,message)=>{if(!ok)throw new RangeError(`CONTENT_${code}: ${message}`);};
const roles=['teacher','participant','companion'];
const expressions=['calm','happy','angry','sad','surprised','embarrassed'];
const scenes=['school:counselling-corner'];
export function validateStory(c){
 canonicalData(c);assertShape(c,['resourceId','definitionId','version','topicId','status','entry','stages',...(Object.hasOwn(c,'premise')?['premise']:[]),...(Object.hasOwn(c,'choiceContract')?['choiceContract']:[])]);
 for(const k of ['resourceId','definitionId','version','entry'])identifier(c[k]);
 need(!c.choiceContract||c.choiceContract==='four-v2','CONTRACT','unsupported choice contract');need(TOPIC_IDS.includes(c.topicId),'REFERENCE','topic');need(['engineering-test','ready'].includes(c.status),'STATUS','status');
 need(c.status!=='ready'||!c.resourceId.startsWith('engineering:'),'PUBLICATION','engineering asset');
 if(c.premise){assertShape(c.premise,['description','data']);identifier(c.premise.description);canonicalData(c.premise.data);}
 need(Array.isArray(c.stages)&&c.stages.length>0,'EMPTY','stages');const ids=c.stages.map(s=>s.id);
 need(new Set(ids).size===ids.length&&ids.includes(c.entry),'GRAPH','stage identities');
 for(const s of c.stages){
  assertShape(s,['id','pages','choices','next']);identifier(s.id);need(s.pages.length>0,'EMPTY','pages');
  for(const [i,p] of s.pages.entries()){
   assertShape(p,['order','text','speaker','scene','cast','presentation']);identifier(p.text);need(scenes.includes(p.scene),'SCENE','unknown scene resource');
   need(p.order===i+1,'PAGE','page order');need(['dialogue','narration','phone','chat','notice','email','news'].includes(p.presentation),'PAGE','presentation');
   need(p.cast.length<=2&&new Set(p.cast.map(a=>a.role)).size===p.cast.length&&new Set(p.cast.map(a=>a.position)).size===p.cast.length,'CAST','at most two unique actors');
   for(const a of p.cast){assertShape(a,['role','position','expression']);need(['participant','companion'].includes(a.role)&&['left','right','center'].includes(a.position),'CAST','actor reference');need(expressions.includes(a.expression),'CAST','expression');}
   need(p.speaker===null?['narration','notice','email','news'].includes(p.presentation):roles.includes(p.speaker)&&(p.speaker==='teacher'||p.cast.some(a=>a.role===p.speaker)),'SPEAKER','speaker/cast');
  }
  need(Array.isArray(s.choices),'CHOICE','choices');
  if(s.choices.length){need(s.next===null&&(s.choices.length===4),'CHOICE','valid number of choices');need(s.choices.every(o=>!o.requires?.length),'CHOICE','all four base options must be available');need(s.choices.filter(o=>!o.requires?.length).length>=3&&s.choices.some(o=>o.emotional&&!o.requires?.length),'QUALIFICATION','three basic options and emotion stay available');const n=s.choices.filter(o=>o.emotional).length;need(n>=1&&n<=2,'EMOTION','1–2 emotional options');}
  else need(s.next!==null,'GRAPH','explicit successor');
  const allOptions=s.choices.flatMap(o=>[o,...(o.replacement?[o.replacement]:[])]);need(new Set(allOptions.map(o=>o.id)).size===allOptions.length,'CHOICE','duplicate base or replacement ID');
  for(const base of s.choices){if(base.replacement){need(!base.requires?.length,'QUALIFICATION','base always available');need(Array.isArray(base.replacement.requires)&&base.replacement.requires.length>0,'QUALIFICATION','replacement requires at least one condition');need(base.replacement.emotional===base.emotional,'EMOTION','replacement must keep its slot emotional classification');}}
  for(const o of allOptions){assertShape(o,['id','text','emotional','kind','outcome',...(Object.hasOwn(o,'requires')?['requires']:[]),...(Object.hasOwn(o,'variants')?['variants']:[]),...(Object.hasOwn(o,'replacement')?['replacement']:[])]);need(!o.replacement||s.choices.includes(o),'CHOICE','nested replacement not allowed');
   for(const condition of o.requires??[]){
    if(condition.type==='fact'){assertShape(condition,['type','id']);identifier(condition.id);}
    else if(condition.type==='numeric'){assertShape(condition,['type','role','holder','code','min','max']);need(roles.includes(condition.role)&&['person','life','work','outlook'].includes(condition.holder)&&/^(?:[1-9]|1[0-2])-[1-4]$/.test(condition.code)&&Number.isFinite(condition.min)&&Number.isFinite(condition.max)&&condition.min>=0&&condition.max<=100&&condition.min<=condition.max,'QUALIFICATION','numeric bounds');}
    else need(false,'QUALIFICATION','unknown condition');
   }identifier(o.id);identifier(o.text);need(typeof o.emotional==='boolean'&&['action','defer','refuse','support'].includes(o.kind),'CHOICE','option kind');
   if(o.variants){need(c.choiceContract==='four-v2'&&Array.isArray(o.variants)&&o.variants.length>=2,'VARIANTS','only new contract allows multiple outcomes');need(new Set(o.variants.map(v=>v.id)).size===o.variants.length,'VARIANTS','unique variant IDs');for(const v of o.variants){assertShape(v,['id','weight','outcome',...(Object.hasOwn(v,'modifiers')?['modifiers']:[])]);identifier(v.id);need(Number.isFinite(v.weight)&&v.weight>0,'VARIANTS','positive base weights');for(const m of v.modifiers??[]){assertShape(m,['role','holder','code','influence']);need(roles.includes(m.role)&&['person','life','work','outlook'].includes(m.holder)&&/^(?:[1-9]|1[0-2])-[1-4]$/.test(m.code)&&Number.isFinite(m.influence)&&Math.abs(m.influence)<=5&&(m.role==='teacher'||m.holder==='person'),'VARIANTS','valid numeric modifier');}}}
   for(const r of [o.outcome,...(o.variants??[]).map(v=>v.outcome)]){assertShape(r,['fact','claims','changes','historyCodes','next',...['academic','entrance','institution','duty'].filter(k=>Object.hasOwn(r,k))]);
   if(r.duty){assertShape(r.duty,['kind',...(Object.hasOwn(r.duty,'secondary')?['secondary']:[])]);if(r.duty.secondary)need(r.duty.kind==='resigned'&&r.duty.secondary==='unable','DUTY','compatible concurrent consequences');need(['pressure','relief','thought','resignation-pending','temporary','notice','resigned','replaced','unable','restored'].includes(r.duty.kind),'DUTY','supported objective consequence');}
   if(r.institution){assertShape(r.institution,['kind','response']);need(r.institution.kind==='duty-response'&&['accept','refuse','negotiate','protest','delay','seek-help'].includes(r.institution.response),'INSTITUTION','supported institutional consequence');}
   if(r.entrance){assertShape(r.entrance,['role','delta']);need(r.entrance.role==='participant'&&Number.isInteger(r.entrance.delta)&&Math.abs(r.entrance.delta)<=5,'ENTRANCE','bounded preparation guidance');}
   if(r.academic){need(Array.isArray(r.academic)&&new Set(r.academic.map(a=>JSON.stringify([a.role,a.subject]))).size===r.academic.length,'ACADEMIC','unique learning outcomes');for(const a of r.academic){assertShape(a,['role','subject','delta']);need(['participant','companion'].includes(a.role)&&typeof a.subject==='string'&&a.subject.length>0&&Number.isFinite(a.delta)&&Math.abs(a.delta)<=30,'ACADEMIC','bounded student learning effect');}}identifier(r.fact);
   for(const q of r.claims){assertShape(q,['role','statement','belief','visible']);need(roles.includes(q.role)&&['believed','uncertain','rejected'].includes(q.belief)&&typeof q.visible==='boolean','KNOWLEDGE','claim');identifier(q.statement);}
   need(new Set(r.changes.map(e=>JSON.stringify([e.role,e.holder,e.code]))).size===r.changes.length,'RESULT','duplicate numeric target');
   for(const e of r.changes){assertShape(e,['role','holder','code','delta']);need(roles.includes(e.role)&&['person','life','work','outlook'].includes(e.holder)&&/^(?:[1-9]|1[0-2])-[1-4]$/.test(e.code)&&Number.isFinite(e.delta),'RESULT','numeric reference');need(e.role==='teacher'||e.holder==='person','RESULT','NPC holder');}
   need(r.historyCodes.every(x=>/^H(?:0[1-9]|10)-[1-6]$/.test(x)),'RESULT','history reference');
   }
  }
  for(const n of s.choices.length?s.choices.flatMap(o=>[o,...(o.replacement?[o.replacement]:[])].flatMap(v=>[v.outcome.next,...(v.variants??[]).map(x=>x.outcome.next)])):[s.next]){
   assertShape(n,['stage','afterDays']);need(n.stage===null||ids.includes(n.stage),'GRAPH','unknown successor');need(Number.isSafeInteger(n.afterDays)&&n.afterDays>=0&&n.afterDays<=366&&(n.stage!==null||n.afterDays===0),'WAIT','wait condition');
  }
 }
 const seen=new Set(),active=new Set();function visit(id){need(!active.has(id),'CYCLE','cycles need a bounded domain design');if(seen.has(id))return;active.add(id);const s=c.stages.find(s=>s.id===id);for(const n of s.choices.length?s.choices.flatMap(o=>[o,...(o.replacement?[o.replacement]:[])].flatMap(v=>[v.outcome.next,...(v.variants??[]).map(x=>x.outcome.next)])):[s.next])if(n.stage!==null)visit(n.stage);active.delete(id);seen.add(id);}visit(c.entry);need(seen.size===ids.length,'UNREACHABLE','unreachable stage');return c;
}
const page=(order,text,speaker=null)=>({order,text,speaker,scene:'school:counselling-corner',cast:speaker?[{role:'participant',position:'center',expression:order===1?'embarrassed':'calm'}]:[],presentation:speaker?'dialogue':'narration'});
const next=(stage=null,afterDays=0)=>({stage,afterDays});
const outcome=(fact,delta,stage,afterDays=0)=>({fact,claims:[{role:'participant',statement:delta<0?'老師願意聽我說，但我還不敢全說。':'老師很急，我不知道要怎麼回答。',belief:'believed',visible:false},{role:'teacher',statement:'成績變化的原因尚待查明。',belief:'uncertain',visible:true}],changes:[{role:'teacher',holder:'person',code:'2-1',delta},{role:'participant',holder:'person',code:'1-3',delta:-delta}],historyCodes:fact.includes('約定')||fact.includes('排出')?['H03-1']:fact.includes('協助')?['H02-1']:[],next:next(stage,afterDays)});
const choice=(id,text,emotional,kind,r)=>({id,text,emotional,kind,outcome:r});
export const DEMO_STORY=validateStory({resourceId:'engineering:learning-conversation',definitionId:'engineering:learning-conversation',version:'1',topicId:'E01-01',status:'engineering-test',choiceContract:'four-v2',premise:{description:'教師看到學生提供的小考成績單，三次分數為78、74及52。',data:{type:'engineering-assessment-observation',scores:[78,74,52]}},entry:'opening',stages:[
 {id:'opening',pages:[page(1,'成績單上，這次的小考比前兩次低了不少。'),page(2,'老師，我不是故意不交的。','participant'),page(3,'早自習快結束了。你把成績單翻到背面。','teacher')],choices:[
 choice('listen','先聽他說最近一天是怎麼過的。',false,'action',outcome('教師與學生約定隔日再談生活與作業安排。',-2,'listen',1)),
 choice('angry','我也快撐不住了，今天先把沒交的說清楚。',true,'action',outcome('教師當面表達疲憊，學生交出缺交清單，約定隔日核對。',3,'boundary',1)),
 choice('defer','今天先不追問，明天帶著作業再談。',false,'defer',outcome('教師延後約談一天，沒有判定學生懶惰。',-1,'listen',1)),
 {...choice('support','請學生先找可信任的同學一起整理缺交項目。',false,'support',outcome('學生同意先自行邀請同儕整理，尚未保證有人協助。',1,'boundary',1)),
  replacement:{...choice('guided-support','先陪他拆解作業，再讓他選一項能完成的。',false,'support',outcome('教師協助拆解作業，學生選出第一個練習目標；實際進度仍待觀察。',-1,'boundary',1)),
   requires:[{type:'numeric',role:'teacher',holder:'person',code:'3-1',min:65,max:100}]}}],next:null},
 ...['listen','boundary'].map(id=>({id,pages:[page(1,id==='listen'?'隔天，學生帶來一張寫著作息的紙。':'隔天，學生帶著缺交清單回來。'),page(2,id==='listen'?'我晚上要幫忙顧店，但也有幾題真的不會。':'我列好了。家裡的事我還不想說。','participant')],choices:[
 choice('plan','和他一起排出可做到的一小段補交安排。',false,'action',outcome(id==='listen'?'雙方排出補交安排，學生自行陳述有顧店情形，原因未全查證。':'雙方依缺交清單排出安排，家庭原因仍未確認。',id==='listen'?-3:1,null)),
 choice('sigh','我真的很累，但這張清單我們一起刪一項吧。',true,'action',outcome('教師表達疲憊後協助完成一項，沒有保證其餘進度。',-1,null)),
 choice('refuse','今天不追加要求，保留紀錄，之後再觀察。',false,'refuse',outcome('教師暫不追加要求，保留未解問題與觀察紀錄。',0,null)),
 {...choice('agency','請他自己選一件能先完成的事。',false,'support',outcome('學生提出一項自選的可行小目標，是否落實仍待後續觀察。',-2,null)),variants:[
  {id:'progress',weight:3,modifiers:[{role:'teacher',holder:'person',code:'3-1',influence:0.8}],outcome:outcome('學生願意自己選擇一項能完成的目標，後續仍需檢查是否落實。',-2,null)},
  {id:'hesitation',weight:2,modifiers:[{role:'teacher',holder:'person',code:'3-1',influence:-0.5}],outcome:outcome('學生暫時拿不定主意，教師約定下一次再確認，不假定學生故意逃避。',1,null)}
 ]}],next:null}))
]});
function freeze(x){if(x&&typeof x==='object'){Object.values(x).forEach(freeze);Object.freeze(x);}return x;}
export const SHORT_STORY=validateStory({...structuredClone(DEMO_STORY),resourceId:'engineering:short-conversation',definitionId:'engineering:short-conversation',stages:[{...structuredClone(DEMO_STORY.stages[0]),choices:DEMO_STORY.stages[0].choices.map(o=>({...structuredClone(o),outcome:{...structuredClone(o.outcome),next:next()}}))}]});
export const IMMEDIATE_STORY=validateStory({...structuredClone(DEMO_STORY),resourceId:'engineering:immediate-conversation',definitionId:'engineering:immediate-conversation',stages:[{...structuredClone(DEMO_STORY.stages[0]),choices:DEMO_STORY.stages[0].choices.map(o=>({...structuredClone(o),outcome:{...structuredClone(o.outcome),next:next('listen')}}))},structuredClone(DEMO_STORY.stages[1])]});
export const ACADEMIC_STORY=validateStory({...structuredClone(SHORT_STORY),resourceId:'engineering:academic-conversation',definitionId:'engineering:academic-conversation',premise:{description:'學生向導師提出近期上課與學習安排的困難。',data:{type:'academic-conversation'}},stages:[{...structuredClone(SHORT_STORY.stages[0]),pages:[page(1,'學生想談談最近的學習安排。'),page(2,'有些內容跟不上，我也不知道怎麼開口。','participant'),page(3,'你停下手邊的事，決定如何回應。','teacher')],choices:SHORT_STORY.stages[0].choices.map(o=>({...structuredClone(o),outcome:{...structuredClone(o.outcome),academic:[{role:'participant',subject:'國文',delta:({listen:0,angry:-25,defer:-2,support:5})[o.id]}]}}))}]});
export const DUTY_STORY=validateStory({...structuredClone(SHORT_STORY),resourceId:'engineering:duty-conversation',definitionId:'engineering:duty-conversation',topicId:'E06-01',premise:{description:'教師收到已登錄的額外職責邀請，原有導師及授課責任仍在。',data:{type:'duty-conversation'}},stages:[{id:'opening',pages:[page(1,'這份額外工作需要有人承辦。你仍須照原課表授課。')],choices:[
 ['accept','我接受，請把期限與支援寫清楚。',false,'action'],['negotiate','先談分工與期限，再決定怎麼承接。',false,'support'],['refuse','這次我不承接，請校方另作安排。',false,'refuse'],['protest','這些事情都要現在處理嗎？',true,'action']
 ].map(([id,text,emotional,kind])=>choice(id,text,emotional,kind,{fact:'教師表達額外職責的'+({accept:'接受',negotiate:'協商',refuse:'拒絕',protest:'不滿'})[id]+'立場，校方後續仍依權責處理。',claims:[],changes:[],historyCodes:[],next:next(),institution:{kind:'duty-response',response:id}})),next:null}]});
// Small formal representative catalogue; these are playable assets, not test flags.
const dutyOutcome=(kind,text,changes=[],nextStage=null,afterDays=0)=>({fact:text,claims:[],changes:changes.map(([holder,code,delta])=>({role:'teacher',holder,code,delta})),historyCodes:kind==='pressure'?['H06-1']:[],next:next(nextStage,afterDays),duty:{kind}});
const dutyPage=text=>[page(1,text)];
const routineChanges=[['work','11-1',12],['work','11-2',-10],['person','2-3',10],['person','2-2',8],['person','4-1',-6],['life','7-4',-5]];
const restoreChanges=[['work','11-1',-12],['work','11-2',12],['person','2-3',-15],['person','2-2',-12],['person','4-1',8],['life','7-4',8]];
const dutyAsset=(id,topic,text,choices,extra=[])=>validateStory({resourceId:'homeroom:'+id,definitionId:'homeroom:'+id,version:'1',topicId:topic,status:'ready',choiceContract:'four-v2',entry:'opening',premise:{description:text,data:{type:'homeroom-context',route:id}},stages:[{id:'opening',pages:dutyPage(text),choices,next:null},...extra]});
export const PRESSURE_STORY=dutyAsset('ordinary-pressure','E06-03','日常工作又遇到互相衝突的要求，教師必須回應。',[
 choice('coordinate','先協調目前的工作。',false,'action',dutyOutcome('pressure','教師處理一次普通工作衝突，付出實際負荷。',routineChanges)),
 choice('help','請同事協助分工。',false,'support',dutyOutcome('relief','同事本次確實提供協助，教師暫時喘息。',restoreChanges)),
 choice('protest','我今天真的有點跟不上。',true,'action',dutyOutcome('pressure','教師表達疲憊，工作仍持續形成消耗。',routineChanges)),
 choice('think','今天先停下來整理自己的想法。',false,'defer',dutyOutcome('thought','教師出現辭職念頭，沒有提出或完成離職。'))]);
const concurrentDeparture=dutyOutcome('resigned','求援沒有讓任教繼續；教師已無法履行原班職務，並確定離職與實際停止帶班。');concurrentDeparture.duty.secondary='unable';
export const BURNOUT_STORY=dutyAsset('exhaustion-departure','E06-03','又一件普通工作衝突遇上長期耗竭，教師發現自己已無法繼續承擔原班。',[
 choice('help','試著向人說明現在的處境。',false,'support',concurrentDeparture),
 choice('explain','如實說明已無法繼續履行帶班責任。',false,'action',dutyOutcome('unable','重大身心事件使教師確定無法繼續帶原班。')),
 choice('cry','我已經撐不住了。',true,'action',dutyOutcome('resigned','長期耗竭在這一刻形成實際離職結果，不只是辭職念頭。')),
 choice('handover','先把學生交接事項整理清楚。',false,'action',dutyOutcome('unable','教師著手整理必要交接，仍已確定無法繼續履行原班導師職務。'))]);
export const RELIEF_STORY=dutyAsset('crisis-support','E06-03','困境尚未消失，但先前的互動與求援讓支持出現。',[
 choice('accept','接受這次具體的協助。',false,'support',dutyOutcome('relief','教師取得支持並繼續帶班；累積危機並未被抹除。',restoreChanges)),
 choice('leave','先請短假，安排暫時代理。',false,'action',dutyOutcome('temporary','短期代理已安排，原班導師職務保留。',restoreChanges)),
 choice('sigh','讓我先喘口氣，好嗎。',true,'action',dutyOutcome('relief','這次支持讓當前身心狀態改善。',restoreChanges)),
 choice('scope','先確認這次支援可以做到哪一步。',false,'action',dutyOutcome('relief','教師與支援人員釐清協助範圍，保留尚未解決的困境。'))]);
const executed={id:'execution',pages:dutyPage('校方已決定實際執行撤換；你仍保有任課，但不再擔任原班導師。'),choices:[
 choice('appeal','提出異議，要求保留爭議紀錄。',false,'action',dutyOutcome('replaced','撤換已實際執行；教師提出異議，合法性仍有爭議。')),
 choice('handover','保全資料，完成必要交接。',false,'action',dutyOutcome('replaced','原班導師已被實際撤換，教師仍任課。')),
 choice('protest','這樣的決定，我實在難以接受。',true,'action',dutyOutcome('replaced','校方仍執行撤換，教師公開表達不滿。')),
 choice('review','請外部單位介入覆核尚未執行的安排。',false,'support',dutyOutcome('restored','本次覆核使校方在執行前撤回安排；原班導師職務保留。'))],next:null};
export const REPLACEMENT_STORY=dutyAsset('unfair-replacement','E06-02','校長因外部要求決定撤換原班導師，未以教師違規成立為前提。',[
 choice('appeal','要求說明並提出異議。',false,'action',dutyOutcome('notice','教師取得撤換通知並提出異議；此刻尚未執行。',[],'execution',1)),
 choice('help','尋求同事陪同面談。',false,'support',dutyOutcome('notice','教師尋求支持；撤換仍待實際執行。',[],'execution',1)),
 choice('protest','這樣的安排，讓我很難接受。',true,'action',dutyOutcome('notice','教師抗議校方安排；原班職務目前仍在。',[],'execution',1)),
 choice('pending','提出離職申請，等候處理。',false,'defer',dutyOutcome('resignation-pending','教師提出辭職，尚未生效；原班導師仍是本人。',[],'execution',1))],[executed]);
/** Assignment remains the school's fixed, journaled decision. Objection never
 * silently redraws a class or revokes the guaranteed next opening. */
export const PLACEMENT_STORY=dutyAsset('new-cohort-placement','E06-02','學校已分配下一屆導師班。這項安排未必公平；你可以表達立場，但不能自行挑班。',[
 choice('accept','接下任務，先保存安排的依據。',false,'action',{fact:'教師確認校方已確定的導師班安排，既有爭議仍保留。',claims:[],changes:[],historyCodes:[],next:next()}),
 choice('negotiate','提出異議，要求校方協商工作安排。',false,'support',{fact:'教師提出分班異議並要求協商；校方本次未同意更換班級，異議與原任職一起保存。',claims:[],changes:[],historyCodes:[],next:next()}),
 choice('refuse','這種安排我不能接受！',true,'refuse',{fact:'教師拒絕接受分班理由；校方仍維持已確定任職，拒絕不等於生效離職，爭議留待後續。',claims:[],changes:[],historyCodes:[],next:next()}),
 choice('record','請校方提供書面安排與工作界線。',false,'action',{fact:'教師要求校方以書面確認已決定的導師班及工作責任，並未因此重新分班。',claims:[],changes:[],historyCodes:[],next:next()})]);
export function homeroomCatalogue(){
 const definitions=[PRESSURE_STORY,BURNOUT_STORY,RELIEF_STORY,REPLACEMENT_STORY,PLACEMENT_STORY].map(c=>({id:c.definitionId,topicId:c.topicId,type:c===BURNOUT_STORY||c===RELIEF_STORY?'cumulative':'direct',content:{resourceId:c.resourceId,version:c.version,status:c.status},coreCodes:['1-2','1-3','1-4'],additionalCodes:['3-1','3-2','3-3'],weights:Array(6).fill(1/6),directions:[1,1,1,1,1,1],eligibility:{people:[c===REPLACEMENT_STORY||c===PLACEMENT_STORY?'staff':c===PRESSURE_STORY?'student':'player'],dayKinds:[],slotIds:[],from:null,until:null,facts:[],history:c===BURNOUT_STORY||c===RELIEF_STORY?[{code:'H06-1',minimum:3,status:'any'}]:[],numeric:[],enrollment:null,homeroom:c===PLACEMENT_STORY?'placement':c===REPLACEMENT_STORY?'social':c===PRESSURE_STORY?'ordinary':c===BURNOUT_STORY?'crisis':'support'},repetition:{cooldownDays:0,exclusionGroups:['homeroom-interruption'],sameFact:true,reason:'Consequences retain a single source and respect the existing daily budget'}}));
 return {type:'register-event-catalogue',catalogueId:'homeroom:representatives-v1',definitions,bindings:definitions.map(d=>({definitionId:d.id,sources:Array(6).fill(d.id===REPLACEMENT_STORY.definitionId?'participant':'player-person'),valence:d.id===RELIEF_STORY.definitionId?'positive':'negative'})),engineering:false};
}
export const ENTRANCE_STORY=validateStory({resourceId:'entrance:guidance',definitionId:'entrance:guidance',version:'1',topicId:'E01-05',status:'ready',choiceContract:'four-v2',entry:'opening',stages:[{id:'opening',pages:[page(1,'學生帶著目前已知的升學資訊，希望討論接下來能準備的事情。'),page(2,'志願由學生與家長決定；導師能提供提醒與協助，無法保證錄取。')],choices:[
 ['listen','先聽學生的想法，再整理一項可行的準備。',false,'support',3],['check','一起核對已公布結果及下一個期限。',false,'action',2],['defer','今天先保留學生的問題，約定下次再談。',false,'defer',0],['angry','這麼晚才談，我有點擔心來不及。',true,'action',-2]
 ].map(([id,text,emotional,kind,delta])=>choice(id,text,emotional,kind,{fact:'教師與學生完成一次升學準備談話，未代替學生選校或承諾錄取。',claims:[],changes:[],historyCodes:[],next:next(),entrance:{role:'participant',delta}})),next:null}]});
export function entranceCatalogue(){const definition={id:ENTRANCE_STORY.definitionId,topicId:ENTRANCE_STORY.topicId,type:'direct',content:{resourceId:ENTRANCE_STORY.resourceId,version:'1',status:'ready'},coreCodes:['1-2','1-3','1-4'],additionalCodes:['3-1','3-2','3-3'],weights:Array(6).fill(1/6),directions:Array(6).fill(1),eligibility:{people:['student'],dayKinds:['school'],slotIds:[],from:null,until:null,facts:[],history:[],numeric:[],enrollment:null,entrance:[{kind:'active'}]},repetition:{cooldownDays:14,exclusionGroups:['entrance-guidance'],sameFact:true,reason:'Reusable guidance remains inside the normal event quota and crisis gates'}};return {type:'register-event-catalogue',catalogueId:'entrance:guidance-v1',definitions:[definition],bindings:[{definitionId:definition.id,sources:Array(6).fill('participant'),valence:'neutral'}],engineering:false};}
/** Individual remote follow-up after the original class has left campus. */
export const AFTERCARE_STORY=validateStory({resourceId:'aftercare:contact',definitionId:'aftercare:contact',version:'1',topicId:'E01-05',status:'ready',choiceContract:'four-v2',entry:'opening',stages:[{id:'opening',pages:[page(1,'離校後，一名學生透過既有聯絡管道詢問自己的待辦。'),page(2,'你核對已公布的升學資料與五月資格紀錄，保留仍未完成的部分；這不是全班返校上課。')],choices:[
 choice('check','一起核對個別期限與所需文件。',false,'action',{fact:'導師協助核對個別後續文件，沒有改寫畢業資格或錄取結果。',claims:[],changes:[{role:'teacher',holder:'person',code:'2-3',delta:.2}],historyCodes:['H03-1'],next:next()}),
 choice('refer','轉介承辦人，保留後續聯繫方式。',false,'support',{fact:'導師將個別問題轉交承辦人，保留學生與家長後續聯繫管道。',claims:[],changes:[],historyCodes:['H03-1'],next:next()}),
 choice('tired','我也需要休息，先把可處理的部分寫清楚。',true,'defer',{fact:'導師說明目前工作與休息界線，未完成事項仍保留。',claims:[],changes:[{role:'teacher',holder:'person',code:'2-3',delta:-.2}],historyCodes:[],next:next()}),
 choice('schedule','先確認承辦窗口，約定下一次答覆時間。',false,'support',{fact:'導師核對承辦聯繫窗口並告知預定回覆時間，不保證學生後續資格已完成。',claims:[],changes:[],historyCodes:['H03-1'],next:next()})
 ],next:null}]});
export function aftercareCatalogue(){
 const definition={id:AFTERCARE_STORY.definitionId,topicId:AFTERCARE_STORY.topicId,type:'direct',content:{resourceId:AFTERCARE_STORY.resourceId,version:'1',status:'ready'},coreCodes:['1-2','1-3','1-4'],additionalCodes:['3-1','3-2','3-3'],weights:Array(6).fill(1/6),directions:Array(6).fill(1),eligibility:{people:['student'],dayKinds:['aftercare'],slotIds:[],from:null,until:null,facts:[],history:[],numeric:[],enrollment:null},repetition:{cooldownDays:7,exclusionGroups:['aftercare-contact'],sameFact:true,reason:'One individually qualified contact within the shared weekly aftercare budget'}};
 const homeroom=homeroomCatalogue(),definitions=[definition,...homeroom.definitions];
 return {type:'register-event-catalogue',catalogueId:'aftercare:representatives-v1',definitions,bindings:[{definitionId:definition.id,sources:Array(6).fill('participant'),valence:'neutral'},...homeroom.bindings],engineering:false};
}
const assets=freeze([AFTERCARE_STORY,ENTRANCE_STORY,DEMO_STORY,SHORT_STORY,IMMEDIATE_STORY,ACADEMIC_STORY,DUTY_STORY,PRESSURE_STORY,BURNOUT_STORY,RELIEF_STORY,REPLACEMENT_STORY,PLACEMENT_STORY]);
export function resolveStory(ref){const c=assets.find(c=>c.resourceId===ref.resourceId&&c.version===ref.version);need(c,'RESOURCE','missing immutable content version');return c;}
export function validateStoryReference(d){const c=resolveStory(d.content);need(c.definitionId===d.id&&c.topicId===d.topicId&&c.status===d.content.status,'REFERENCE','definition/content identity');if(c.resourceId.startsWith('aftercare:'))need(canonicalData(d)===canonicalData(aftercareCatalogue().definitions.find(x=>x.id===d.id)),'REFERENCE','formal aftercare qualification cannot be relabeled');if(c.resourceId.startsWith('entrance:'))need(canonicalData(d)===canonicalData(entranceCatalogue().definitions.find(x=>x.id===d.id)),'REFERENCE','formal entrance qualification cannot be relabeled');if(c.resourceId.startsWith('homeroom:'))need(canonicalData(d)===canonicalData(homeroomCatalogue().definitions.find(x=>x.id===d.id)),'REFERENCE','formal homeroom qualification/authority cannot be relabeled');return c;}

export function storyDigest(c){let hash=14695981039346656037n;for(const char of canonicalData(c)){hash^=BigInt(char.codePointAt(0));hash=BigInt.asUintN(64,hash*1099511628211n);}return hash.toString(16).padStart(16,'0');}

/** A completed challenge has no new failure window. Keep pending duty stories
 * and their due dates intact; resume only after the next actual opening. */
export function permitsStoryFollowup(w,event){if(event.participantIds.some(id=>entranceAbsentFromHistory(w,id)))return false;return !event.definitionId.startsWith('homeroom:')||event.definitionId===PLACEMENT_STORY.definitionId||!w.extensions['teacher-hell/world'].history.some(h=>h.type==='annual-success'&&h.data.year===w.position.serviceYear);}
