/** 17-D first-release samples: authored, versioned, causal content.
 * Three DISTINCT school situations, not three student-name skins.
 * The story-content authority validates and freezes these on load.
 */
const p=(order,text,{speaker=null,scene='school:classroom',expression='calm'}={})=>({
 order,text,speaker,scene,cast:speaker==='participant'?[{role:'participant',position:'center',expression}]:[],
 presentation:speaker?'dialogue':'narration'
});
const next=(stage=null,afterDays=0)=>({stage,afterDays});
const result=(fact,{changes=[],claims=[],nextStage=null,afterDays=0,historyCodes=[]}={})=>({fact,claims,changes,historyCodes,next:next(nextStage,afterDays)});
const option=(id,text,kind,emotional,outcome,variants=null)=>({id,text,kind,emotional,outcome,...(variants?{variants}:{})});
const change=(role,code,delta)=>({role,holder:'person',code,delta});
const claim=(role,statement,visible=false)=>({role,statement,belief:'uncertain',visible});
export const PHASE17D_STORIES=[
 {
  resourceId:'content:17d-study-plan',definitionId:'content:17d-study-plan',version:'1',topicId:'T01-01',status:'ready',choiceContract:'four-v2',
  premise:{description:'早自習結束前，學生主動拿來一張連續幾天未完成的讀書計畫表。',data:{type:'study-plan-provided',completed:false}},
  entry:'opening',stages:[
   {id:'opening',pages:[
    p(1,'早自習快結束了。你看見學生拿著一張被改過很多次的讀書計畫表。',{scene:'school:classroom'}),
    p(2,'我每天都寫要做什麼，可是回家就一直拖到很晚。',{speaker:'participant',scene:'school:classroom',expression:'embarrassed'})
   ],choices:[
    option('micro','先一起選出今晚最小的一件事。','support',false,result('教師和學生挑選一件今晚可嘗試的學習任務，是否執行仍待確認。',{changes:[change('participant','1-3',1)],nextStage:'followup',afterDays:1}),
     [{id:'acted',weight:3,modifiers:[{role:'teacher',holder:'person',code:'3-1',influence:0.6}],outcome:result('教師與學生約定一個十分鐘的起始任務，學生願意試做，完成與否尚未發生。',{changes:[change('participant','1-3',1)],nextStage:'followup',afterDays:1})},
      {id:'uncertain',weight:2,modifiers:[{role:'teacher',holder:'person',code:'3-1',influence:-0.3}],outcome:result('學生暫時選不出任務；教師沒有強行判定他不努力，而是約定隔天再確認。',{nextStage:'followup',afterDays:1})}]),
    option('ask','先了解放學後有哪些固定安排。','action',false,result('教師先詢問學生放學後的時間安排，尚未確認拖延原因。',{claims:[claim('participant','學生表示放學後有其他安排，細節還不想談。')],nextStage:'followup',afterDays:1})),
    option('record','請他保留實際執行情形，明天再談。','defer',false,result('教師請學生保留一天實際作息供隔日討論，不因此推定其人格特質。',{nextStage:'followup',afterDays:1})),
    option('worry','看你這麼晚還在想，我有點擔心。','action',true,result('教師表達擔心，學生知道這份規劃受到關注，但沒有答應一定完成。',{changes:[change('teacher','2-1',-0.2)],nextStage:'followup',afterDays:1}))
   ],next:null},
   {id:'followup',pages:[
    p(1,'隔天，學生再次帶來那張計畫表；有些格子依然空白。',{scene:'school:counselling-corner'}),
    p(2,'我昨天有試一點點，但還沒照表做完。',{speaker:'participant',scene:'school:counselling-corner',expression:'calm'})
   ],choices:[
    option('acknowledge','先肯定已開始的部分，再調整目標。','support',false,result('教師與學生核對已完成的一小段任務，未把尚未做完的部分當成成功。',{changes:[change('participant','1-3',1)]})),
    option('compare','和他比較原計畫與實際時間的差異。','action',false,result('教師和學生對照計畫與實際作息，找出一處明顯落差。')),
    option('later','先保留紀錄，下次有新情況再檢查。','defer',false,result('本次談話暫告段落，教師保留作息資訊，未要求學生保證立刻改變。')),
    option('relief','你有開始，我其實滿替你開心的。','action',true,result('教師表達對學生願意嘗試的欣慰，學生沒有因此被保證後續成績。',{changes:[change('teacher','2-1',0.3)]}))
   ],next:null}
  ]
 },
 {
  resourceId:'content:17d-student-artwork',definitionId:'content:17d-student-artwork',version:'1',topicId:'T10-04',status:'ready',choiceContract:'four-v2',
  premise:{description:'午餐時，一名學生主動向教師展示自己畫的班級活動海報草稿。',data:{type:'student-work-shared',publicPermission:false}},
  entry:'opening',stages:[{id:'opening',pages:[
   p(1,'午餐時間，學生拿著一張還沒上色的班級活動海報草稿走到你旁邊。',{scene:'school:classroom'}),
   p(2,'我想幫忙畫，但不確定大家會不會喜歡。',{speaker:'participant',scene:'school:classroom',expression:'embarrassed'})
  ],choices:[
   option('ask-use','先問他希望這張作品怎麼被使用。','support',false,result('教師詢問學生的意願，尚未取得公開張貼或代表全班的同意。',{claims:[claim('participant','學生願意讓導師先看草稿，但尚未同意公開。')]})),
   option('team','邀請他自己找願意幫忙的同學討論。','action',false,result('教師提議由學生自主邀請同學協作，未擅自指派其他學生。'),
    [{id:'interest',weight:2.5,outcome:result('學生表示有興趣找同學共同修改，教師尚未知道同學是否答應。',{changes:[change('participant','1-3',0.7)]})},
     {id:'personal',weight:1.5,outcome:result('學生表示目前仍想自己完成草稿，教師尊重其意願，沒有把作品交給他人。')}]),
   option('review','先確認文字、活動時間和細節是否正確。','action',false,result('教師與學生核對海報上的時間、文字與活動資訊，未替學生決定是否公開。')),
   option('happy','這張草稿看得出來你花了不少心思。','action',true,result('教師稱讚學生投注的心力，未承諾海報一定被採用。',{changes:[change('participant','1-3',0.5)]}))
  ],next:null}]
 },
 {
  resourceId:'content:17d-admin-deadline',definitionId:'content:17d-admin-deadline',version:'1',topicId:'T14-01',status:'ready',choiceContract:'four-v2',
  premise:{description:'上課期間以外，行政同仁向導師詢問一份新增調查表能否盡快回覆。',data:{type:'school-admin-request',formalOrder:false}},
  entry:'opening',stages:[{id:'opening',pages:[
   p(1,'你回到辦公室後，行政同仁拿著一份臨時增加的調查表走過來。',{scene:'school:teachers-office'}),
   p(2,'這份今天可以先給個答覆嗎？若有困難，我再跟承辦人確認。',{speaker:'participant',scene:'school:teachers-office',expression:'calm'})
  ],choices:[
   option('scope','先確認哪些欄位已知、哪些需要再查。','action',false,result('教師與行政同仁區分立即可提供與尚需確認的欄位，沒有臆測學生資料。')),
   option('handoff','請對方確認期限和正式承辦窗口。','support',false,result('教師要求釐清資料用途與回覆期限，尚未取得校方正式延長期限的承諾。'),
    [{id:'clarify',weight:3,outcome:result('行政同仁同意先向承辦人查詢期限，教師仍須等待正式答覆。')},
     {id:'busy',weight:2,outcome:result('行政同仁表示無法立即確認期限，雙方先保存待辦與聯繫窗口。')}]),
   option('schedule','先處理已能核對的部分，其他列入待辦。','defer',false,result('教師整理已知資料並標示未確認欄位，尚未送出完整正式報表。',{changes:[change('teacher','2-3',-0.2)]})),
   option('tired','今天事情有點多，我怕匆忙填錯。','action',true,result('教師表達目前工作負荷，行政同仁知道教師需要核對資料，不代表已接受延期。'))
  ],next:null}]
 }
];
