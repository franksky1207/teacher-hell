/** Isolated engineering assets; never registered by a production catalogue. */
export const PACKAGE4_SAMPLES=['E01-01','E01-02'].map((topicId,index)=>({
 resourceId:`engineering:package4:${index}`,definitionId:`engineering:package4:${index}`,version:'1',compilerContract:2,bindingContract:1,
 roleBindings:{learner:{candidateRole:'participant'}},topicId,status:'engineering-test',entry:'opening',
 stages:['opening','followup'].map((id,stage)=>({id,pages:[{order:1,text:'核對已綁定安排的客觀進展。',speaker:null,scene:'school:counselling-corner',cast:[],presentation:'narration'}],
 choices:['act','b','c','d'].map((key,i)=>({id:key,text:'核對安排 '+i,emotional:i===3,kind:'action',outcome:{fact:stage?'當事人確認本次安排已落實。':'當事人確認新的安排，隔日檢查。',claims:[],changes:[],historyCodes:[],next:{stage:stage?null:'followup',afterDays:stage?0:1},world:{subjects:['teacher','learner'],witnesses:['teacher','participant'],affected:['learner'],contacts:[['teacher','participant']],transmissions:[]},issueOperations:[stage?{type:'close',source:{binding:'transport'},reason:'fulfilled'}:{type:'progress',source:{binding:'transport'},assessment:'improved',details:'已核對新安排'}]}})),next:null}))
}));

// A weighted branch also exercises bound named-role numeric reads on replay.
for(const c of PACKAGE4_SAMPLES){c.choiceContract='four-v2';const o=c.stages[0].choices[0];o.variants=['arranged','tentative'].map((id,i)=>({id,weight:i+1,modifiers:[{role:'learner',holder:'person',code:'1-3',influence:i?-.5:.5}],outcome:{...structuredClone(o.outcome),fact:i?'雙方確認暫行安排，隔日核對。':'雙方確認新的安排，隔日核對。'}}));}
