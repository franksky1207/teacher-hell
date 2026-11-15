# 第18批工程包3：正式故事結果接線

基準：PR #62 `fc50875cddf16c86d9c41197e0f113cd38cb1b01`。讀取 PR #59 HEAD `f7e1c58591b1f57d9af99e7446f34ae2c01211f0` 的18-B SOP；沿用包1 compiler v2 的 beforeOrder／數值見證，包2 causality v1 與問題投影。未修改正式故事庫、PR #60、抽選、額度、權重或數值公式。

## 作者契約

新增欄位均可選；普通舊故事不必修改。使用新結果需 `compilerContract: 2` 並填 `outcome.world`。目前新契約故事不可帶舊式 `premise`，避免起始時沿用舊版全員見證語意；開場文字仍使用 pages，客觀事實待確認後建立。改動已發布內容需新 immutable resource/version，不能修改原版。

```js
// 故事根層：僅在需要額外、已有穩定身分的人物時使用
roleBindings: { office: { personId: 'staff:school:office:10:2' } }
// 選項 outcome；variants 的每個 outcome 也支援相同契約
world: {
  subjects: ['teacher', 'participant', 'office'],
  witnesses: ['teacher', 'participant'],
  affected: ['participant', 'office'],
  contacts: [['participant', 'teacher']],
  transmissions: [
    {fromRole:'teacher', toRole:'office', description:'本次實際傳達安排。'},
    // 可選 claimIndex 指向本 outcome.claims；接收信念為 uncertain
    {fromRole:'participant', toRole:'teacher', description:'學生表達看法。', claimIndex:0}
  ]
},
relationshipChanges: [
  {fromRole:'participant',toRole:'teacher',code:'5-1',delta:2,basis:'interaction'}
],
issueOperations: [
  {type:'open',localKey:'transport',kind:'transport-arrangement',
   roles:['participant'],details:'接送安排待協調'}
]
```

保留 teacher／participant／companion。命名角色用已存在 personId，不動態推導家庭或抽選人物；不擴充畫面角色，畫面至多兩名 NPC。固定人物是否適合故事仍由作者負責；未知身分在交易驗證拒絕。

subjects 是客觀當事人；affected 必須是 subjects 子集，存於 fact.data.participation.affectedIds；witnesses 是作者對本次實際目擊的明示。僅被提及或在 affected 中不產生知情，也不初始化關係。每個 contact 是兩個不同的實際見證者，不能傳入全體當事人。集合可包含不同角色，但接觸雙方解析後不可同人。

見證者以 observation 取得本次客觀事實。transmissions 按作者順序執行：發送者必須先持有本次事實，接收者可不在現場；具體 description、雙方、本次 factId 會編成獨立 contact 及傳達證據。客觀事實傳達不等同相信主張。claims 仍需明確 statement／belief；新契約只允許來源角色實際見證、visible:false，傳達主張使用 claimIndex，不使用舊版隱含 visible 接觸。傳達只記 uncertain，不把客觀結果直接轉成相信。

新生成接觸帶 storySourceVersion:1。validateSource 對此版本的 communication 檢查本次 cursor／日期、來源事實、發送／接收者，及主張身分版本。純 contact 沒有 transmission 不能當成資訊傳達；舊版接觸沿用舊驗證，不回補舊知情。

既有文件來源亦可選：

```js
world.documents = [{role:'teacher',factId:'已有的事實ID',accessFactId:'已有的access事實ID'}]
```

只讀取 beforeOrder 之前已有 fact 與 access，必須有該角色與 factIds 的明確授權，經既有 document／機密來源驗證後 reveal。此語法不建立文件授權，不創造接觸；重複取得拒絕。本批不新增任意文件發行器。

## 問題來源

open 的 actors 從 roles 綁定，evidenceFactIds 使用本次已確認的結果事實。編譯器建立 fact.data.causality，包2投影仍為唯一問題狀態來源。

後續操作用來源定位，而不填新生成的 fact／operation ID：

```js
{type:'progress',
 source:{eventId:'self',stage:'opening',optionId:'listen',localKey:'transport'},
 assessment:'improved',details:'安排已有部分改善'}
{type:'close',source:{eventId:'既有已確認事件ID',stage:'opening',optionId:'listen',localKey:'transport'},reason:'安排已實際落實'}
{type:'invalidate',source:{eventId:'self',stage:'opening',optionId:'listen',localKey:'transport'},reason:'權責正式轉移'}
```

self 是本事件；跨事件必須指定已知事件 ID，不以同人、同分類或同主題找問題。來源必須是歷史切面內已確認的該 stage／option，其 action fact 的 localKey 必須真的開過問題。編譯器從投影取得最新操作，補入 issueId／expectedPreviousOperation、root／previous causeIds 與本次 evidence。包2拒絕 terminal、重複 localKey、非法收束。沒有新增 eligibility.issue 或動態候選問題綁定。

## 交易與歷史

確認真實選項／variant 後才編譯；順序為 confirm-choice → 客觀事實（含因果操作）→ 明確雙人接觸／見證及客觀資訊取得 → claims／主張取得與傳達 → exposure → 同一 direct 結算 result。接觸先使用既有 relationships RNG 初始化缺少的雙向持有者，再結算所宣告方向的增量；建立 A→B/B→A 不等同雙向增量。不另建數值公式、亂數流或數值見證。

有互動依據的關係效果需本次 contacts；資訊依據需本次傳達且評價者是接收者、被評價者是發送者。無依據拒絕；缺少持有者由既有 direct target 驗證拒絕。所有效果仍在 prepareWorldOperation 的隔離草稿內，最後完整世界驗證，任何錯誤整筆退回。既有 command ID／revision、confirmed-choice、fact／effect ID 保證一次性。

所有來源查詢走包1 beforeOrder 歷史切面；關係增量不讀未來關係數值；首次接觸照原交易 RNG 初始化。包1原數值收據與 panel 見證不變。新歷史重播重新編譯並比對 operations、facts、claims、disclosures、direct receipt；舊版內容沒有新欄位時保留舊參與者／見證者／來源語意，不補算。

## 精準驗證紀錄與範圍

命令：`node --test test/story-consequences.test.js`，三組通過。

1. 未確認不開問題、已確認 open／另一 stage close、未選分支不開問題、歷史還原。
2. A→教師 direct +2、反向不自動增量、原本不存在的承辦人→教師持有者經實際傳達接觸後初始化並 direct +1、明確見證、缺少互動來源拒絕、未在場學生不知情、主張傳達保持 uncertain、歷史還原。
3. 交易後續失敗整筆回退、相同 command 重送 duplicate、舊版故事還原、不同 attempt 隔離。

首次執行第一組發現 exposure 對無實質參與者仍寫入；修正後僅重跑第一組通過。隨後擴充三組內的首次接觸／主張傳達／attempt 案例，三組重新執行全通過。沒有另加第四組或執行全專案驗證。

未直接情境覆蓋：document 授權、progress／invalidate、跨事件來源、加權 variant 的新欄位、多日傳達拒絕與所有機密程序組合。這些接線經資料契約檢查，不能宣稱已取得端到端驗證。

底層包1／2既有能力：歷史切面、數值見證、原子交易、因果投影與問題生命週期。本批新增正式編譯器可用語法及接線；僅增加 engineering fixture，不代表正式事件已採用。包4／5的候選綁定、跨主題根源抽選、完整三年鏈及效能最佳化尚未完成。未執行全專案測試、三年模擬、N1～N8、20則隔離事件、瀏覽器或壓測。
