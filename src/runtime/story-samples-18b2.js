/** 18-B2: three opt-in, isolated T10-03 causal story pilots. NOT in a live event catalogue.
 * Editorial basis: PR #60 T10-03 items 03, 13 and 20; original twenty remain unchanged.
 */
const scene='school:counselling-corner';
const page=(order,text,speaker=null,expression='calm')=>({
 order,text,speaker,scene,cast:speaker==='participant'?[{role:'participant',position:'center',expression}]:[],
 presentation:speaker?'dialogue':'narration'
});
const next=(stage=null,afterDays=0)=>({stage,afterDays});
const world=(witnesses=['teacher','participant'],transmissions=[])=>({
 subjects:['teacher','participant'],witnesses,affected:['participant'],
 contacts:witnesses.includes('teacher')&&witnesses.includes('participant')?[['teacher','participant']]:[],
 transmissions
});
const result=(fact,{stage=null,afterDays=0,witnesses,transmissions=[],issues=[],relations=[],changes=[]}={})=>({
 fact,claims:[],changes,historyCodes:[],next:next(stage,afterDays),
 world:world(witnesses,transmissions),
 ...(issues.length?{issueOperations:issues}:{}),
 ...(relations.length?{relationshipChanges:relations}:{})
});
const choice=(id,text,outcome,emotional=false,kind='action')=>({id,text,emotional,kind,outcome});
const story=(num,stages)=>({
 resourceId:`engineering:18b2-t10-03-${num}`,definitionId:`engineering:18b2-t10-03-${num}`,
 version:'1',compilerContract:2,choiceContract:'four-v2',topicId:'T10-03',
 status:'engineering-test',entry:'opening',stages
});
const interactionTrust=(delta)=>[{fromRole:'participant',toRole:'teacher',code:'5-1',delta,basis:'interaction'}];
const informedTrust=(delta)=>[{fromRole:'participant',toRole:'teacher',code:'5-1',delta,basis:'information'}];

// 03. A request to the canteen opens a concrete unresolved issue. Asking is NOT delivery.
const meal=story('03',[
 {id:'opening',pages:[
  page(1,'午餐時，一位已登記素食餐的學生發現自己的餐盒尚未送達。'),
  page(2,'我有登記，可是現在還沒有餐點。我今天該怎麼辦？','participant','sad'),
  page(3,'學生尚未吃到午餐；供餐窗口是否漏送仍待查證。')
 ],choices:[
  choice('check','核對學生今天的訂餐登記',result('教師與學生核對訂餐紀錄，尚未判定缺餐原因。')),
  choice('contact','正式聯絡供餐窗口，請對方確認可行補餐安排',result('教師把學生尚未取得素食餐的狀況送交餐務窗口查詢；實際回覆與供餐結果尚未取得。',{
   stage:'canteen-followup',afterDays:1,
   issues:[{type:'open',localKey:'meal-arrangement',kind:'meal-delivery-followup',roles:['participant'],details:'登記素食餐未送達；餐務窗口回覆及補餐安排待核對'}]
  })),
  choice('care','先確認學生目前是否急需用餐或有身體不適',result('教師詢問學生當下需求，必要時尋求校內協助；餐點問題尚未確認解決。')),
  choice('support','你先不要空腹硬撐，我陪你確認眼前能取得什麼餐點',result('教師尊重學生的飲食需求並協助詢問，不承諾一定補餐成功。'),true,'support')
 ],next:null},
 {id:'canteen-followup',pages:[
  page(1,'隔天午餐，學生回來詢問昨天交由餐務窗口查詢的素食餐安排。'),
  page(2,'昨天有請窗口查，但我不知道今天的供餐安排確認了沒。','participant','sad')
 ],choices:[
  {...choice('verified','向餐務窗口核對送達紀錄，再確認學生是否實際領到餐點',result('教師開始查證是否送達；尚無足夠證據宣告這次補餐已完成。',{
   issues:[{type:'progress',source:{eventId:'self',stage:'opening',optionId:'contact',localKey:'meal-arrangement'},assessment:'uncertain',details:'已請餐務窗口核對送達，但尚未確認學生實際取得餐點'}]
  })),variants:[
   {id:'delivered',weight:2,outcome:result('窗口提供可核對的送達紀錄；教師再向學生確認已取得符合需求的餐點，因此本次問題可以結案。',{
    issues:[{type:'close',source:{eventId:'self',stage:'opening',optionId:'contact',localKey:'meal-arrangement'},reason:'fulfilled'}]
   })},
   {id:'not-confirmed',weight:3,outcome:result('窗口尚無可核對的完成紀錄，學生也未確認拿到餐點；教師保留此問題供後續追蹤。',{
    issues:[{type:'progress',source:{eventId:'self',stage:'opening',optionId:'contact',localKey:'meal-arrangement'},assessment:'uncertain',details:'尚未獲得實際供餐完成證據'}]
   })}
  ]},
  choice('pending','核對窗口尚未完成的回覆與可行補餐時間',result('餐務窗口仍未確認可執行安排；教師留下新的核對紀錄，問題仍未解決。',{
   issues:[{type:'progress',source:{eventId:'self',stage:'opening',optionId:'contact',localKey:'meal-arrangement'},assessment:'uncertain',details:'已再次查詢餐務回覆，仍待確認實際供餐'}]
  })),
  choice('urgent','先處理學生今天的實際用餐需求，再保留待追蹤紀錄',result('教師優先協助處理當日用餐需求；昨日未解的正式供餐問題仍保持開啟。')),
  choice('gentle','我知道一直等回覆很煩，我會把還沒確認的部分清楚留下來',result('教師向學生說明目前確認與未確認事項，沒有把持續等待說成問題已解決。'),true,'support')
 ],next:null}
]);

// 13. Empathy changes a real offered strategy; only actual interaction changes student -> teacher trust.
const birthday=story('13',[
 {id:'opening',pages:[
  page(1,'午休前，學生拿著大家簽名的生日卡片，擔心公開送卡會打擾同學。'),
  page(2,'我們想祝福他，但不知道他喜不喜歡大家都看著。','participant','embarrassed')
 ],choices:[
  choice('time','協調不打擾午休的送卡時段',result('教師與學生討論安靜的送卡時間，是否公開仍待當事人決定。',{relations:interactionTrust(0.5)})),
  {...choice('private','先讓學生討論低調轉交是否可行',result('學生提出低調轉交的想法，尚未取得收卡者同意。',{relations:interactionTrust(0.4)}),false,'support'),
   replacement:{id:'empathetic',text:'請學生主動提出尊重收卡者意願的私下祝福方式',
    emotional:false,kind:'support',requires:[{type:'numeric',role:'participant',holder:'person',code:'1-3',min:60,max:100}],
    outcome:result('學生主動提出先詢問收卡者意願、再低調送卡的方案；目前尚未取得本人同意。',{relations:interactionTrust(0.7)})}},
  choice('consent','先確認收卡學生是否願意被公開祝福',result('教師提醒學生須由收卡者自己決定，不把同學起鬨當成同意。',{relations:interactionTrust(0.6)})),
  choice('feelings','你們有想到他的感受，這份心意已經很值得珍惜',result('教師肯定學生尊重他人界線的想法，沒有代替收卡者作決定。',{relations:interactionTrust(0.3)}),true,'support')
 ],next:null}
]);

// 20. Teacher has the verified advice in this interaction; the recipient learns only
// through an explicit transmission. Uninvolved classmates receive no disclosure.
const advice=(description)=>({
 fromRole:'teacher',toRole:'participant',description
});
const privacy=(fact,delta)=>result(fact,{
 witnesses:['teacher'],
 transmissions:[advice('教師當次向值日生說明公開便條可能暴露個人資料，以及應如何限制交接範圍。')],
 relations:informedTrust(delta)
});
const note=story('20',[
 {id:'opening',pages:[
  page(1,'值日生拿著一張尚未公開的午餐交接草稿，裡面可能讓其他同學猜出特定學生的飲食安排。'),
  page(2,'老師，這樣寫會不會讓大家猜到是在說誰？','participant','embarrassed'),
  page(3,'這張草稿尚未張貼，其他學生不因此自動知道其中內容。')
 ],choices:[
  choice('separate','區分公開值日事項與只能私下處理的個人資訊',privacy('教師向值日生說明分流原則，兩人保留未公開草稿並移除不必要的可辨識資訊。',0.6)),
  choice('authorized','確認哪些資訊須交由有權知悉的餐務人員處理',privacy('教師向值日生說明有權知悉與適當管道的界線，未假定其他人已收到資料。',0.5)),
  choice('hold','先暫停張貼有疑慮的內容，查清後再決定',privacy('教師提醒值日生停止公開未確認的個人資訊，草稿沒有向班級散布。',0.4)),
  choice('affirm','你有想到別人的隱私很重要，我們一起把交接寫得更安全',privacy('教師肯定值日生的顧慮，當次說明最低必要資訊原則，未公開其他學生身分。',0.6),true,'support')
 ],next:null}
]);
export const PILOT_18B2_CAUSAL_STORIES=[meal,birthday,note];
