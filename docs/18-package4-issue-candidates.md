# 第18批工程包4：跨主題候選、問題根綁定與合法接納

開發基準：PR #63 HEAD `7d5e7ec6972ddba404d7079c244cdc5b812facb6`，不是 main。開工及交付前均核對遠端 HEAD。讀取 PR #59 HEAD `0f37901278e0e005b19e973d9049c2c6fcd009ec` 最新18-B SOP，以及包1～3的實際編譯、交易、來源、投影、候選與抽選程式。分支 `feat/18-package4-issue-candidates`，PR base `feat/18-package3-story-relations`。

## 修改檔案與範圍

| 檔案 | 功能 |
| --- | --- |
| `src/runtime/issue-candidates.js` | 問題資格白名單、有限條件、動態人物、根／證據／知情／接觸綁定及原根驗證 |
| `src/runtime/event-candidates.js` | 接入既有資格；一次查詢共用問題投影；群組及版本化同根／主題／人物互斥；接納與恢復重新檢查 |
| `src/runtime/event-selection.js` | 群組抽選後選根、根亂數收據與歷史核對；原根接納、拒絕紀錄、continuation 適用性 |
| `src/runtime/story-content.js` | opt-in 內容版本契約、動態命名角色、來源名稱與定義接線驗證 |
| `src/runtime/story-consequences.js` | `source.binding` 編譯為包2操作及根／前序事實；保留包3來源語法 |
| `src/runtime/story.js`、`story-variation.js` | 開場／選擇／確認／恢復使用原綁定；動態角色數值讀取與 variants；歷史切面重播 |
| `src/runtime/transactions.js`、`model.js` | 正式拒絕紀錄、版本化選根收據驗證，沿既有原子提交 |
| `src/runtime/schedule.js`、`progression.js`、`campus.js` | 已拒絕預約不再要求重複接納；失去適用性的等待故事不強制恢復或阻擋日程 |
| `src/runtime/story-samples-package4.js` | 兩個隔離 engineering 資源，不加入任何正式 catalogue |
| `test/issue-candidates.test.js` | 本批唯一新增測試檔，只有下列三組情境 |
| 本文件 | 正式契約、測試證據與界線 |

不改48數值、N1～N8、六項權重公式、K、每日額度、正式介面、美術、音樂、人物資產或 PR #60 內容。不建立第二套世界、問題狀態或結算器。

## 正式資格格式

舊事件不填 `issue`；普通日常不必建立問題。需要問題的定義加入：

```js
eligibility: {
  // 原有 people、日曆、facts、history、numeric、enrollment 等皆保留
  issue: {
    version: 1,
    binding: 'transport',
    kind: 'transport-arrangement',
    states: ['open'],
    actors: [
      {role: 'participant', scope: 'student'}
      // 可加 {role:'companion',scope:'caregiver'} 或命名角色
    ],
    knowledge: [{role:'teacher', source:'root'}],
    // 可省略 condition；以下示範同一根的有限 OR，不展開成多個故事
    condition: {
      any: [{latestType:'open'}, {assessment:'improved'}]
    }
  }
},
repetition: {
  cooldownDays: 2,
  exclusionGroups: [],
  sameFact: true,
  reason: '問題處理間隔',
  issueScope: {version:1, scope:'issue'}
}
```

`states` 非空、不得重複，只接受 `open/closed/invalidated`。`kind` 沿用包2的非空種類識別，不從 description、姓名、H碼或相似文字推導。

`actors` 最多6個不同角色，必含 `participant`，不能覆蓋 `teacher`。所有角色必須對應該根的正式 `actors` 中不同的真實人物。scope 只接受 `student/caregiver/staff/reunion/contact`，使用現有學籍、人物池及聯絡資格，不建立新人物。`participant` 也必須同時符合原有 `eligibility.people` 與其他原有資格。

原班學生／現任職員的主要角色沿用現有校內人物池。主要角色若為 caregiver／reunion／contact，以及所有額外動態角色，另外需要當天已確認、教師為實際參與者與見證者的 contact。家庭關係本身不算接觸。新問題事件的 reunion 不要求作者填寫執行期 contact ID，而由受檢接觸查詢綁定。舊 reunion 資格保持原樣。

`knowledge` 是陣列，可為空。每項的 role 只能是 teacher 或此處聲明的問題角色；`source:'root'` 要求已取得根事實，`source:'latest'` 要求已取得最新操作承載事實。均須有正式 disclosure，當事人／家庭關係／同事件名單不代替知情。原 `eligibility.knowledge` 的 claim/version/belief 資格仍可同時使用；這個新欄位不把主張當客觀事實。

`condition` 可選，最多24節點、深度3，每組最多8項。每個節點只有一個鍵：`all/any`，或 `latestType/assessment/evidenceFactId/createdFrom/createdUntil` 葉節點。操作與 assessment 限包2既有列舉，日期限定日期格式；歷史日期比較使用根事實的 occurredAt。所有葉節點都針對同一個具體問題，不以不同根各滿足一項拼成資格，不執行任意作者程式。

direct 仍不得填累積 history 門檻；cumulative 仍必須有門檻。問題資格與原本資格是 AND，不取代原本資格。

## 動態角色與作者來源

問題事件內容另加 `bindingContract:1`，且必須 `compilerContract:2`、不帶舊 premise，每個選項／variant outcome 都明確提供包3 `world`。額外命名角色：

```js
roleBindings: {
  learner: {candidateRole:'participant'},
  guardian: {candidateRole:'companion'} // 定義必須聲明此問題角色
}
// 已選結果：不填任何執行期 ID
issueOperations: [{
  type:'progress',
  source:{binding:'transport'},
  assessment:'improved',
  details:'已確認新的接送安排，仍需後續核對'
}]
```

`teacher/participant/companion` 繼續可用。動態 companion 固定在事件 participantIds 的第二位；既有固定 companions 與動態 companion 同時存在時，必須一致。其他命名角色由所選 binding 的真實 ID 解析，用於包3世界參與、資訊來源、關係及數值；加權 variant 和數值資格也讀相同人物。畫面仍只允許原本 participant／companion 及最多兩名 NPC，沒有改 UI。

包3 `roleBindings:{office:{personId:...}}` 與 `source:{eventId,stage,optionId,localKey}` 保留，不更改舊內容 digest 或歷史。`source.binding` 的名稱必須與定義一致，編譯器從 beforeOrder 視圖解析所選 issueId、根事實及最新前序操作，產生同一套 `fact.data.causality.version=1`，沒有新因果狀態。

單一結果不要對同一綁定重複提交互相依賴的更新；仍受包2 expectedPreviousOperation 與正式世界驗證限制。

## 候選→抽選→故事的一致性與公平性

1. 純資格查詢先形成原本 `definitionId＋主要人物／固定 companions＋固定事實` 的群組。所有合法根／角色 tuple 在群組的 `issueOptions`，不複製群組。
2. 群組只計一次原有六數值、K、曝光及既有風險倍率。三根與一根的群組 effectiveWeight 相同。
3. 群組抽中後，才消耗 events RNG 選根。每個 tuple 的內部權重為 `1／同根合法 tuple 數`；每根總權重都是1，先對根公平，再在該根合法角色 tuple 間公平。根數及角色排列數都不增加群組抽中權重。
4. 收據保存 `event-root`、`bindingContract:1`、穩定排序去重的 root/role options、weights、index 與選中 binding。原 event-pick 收據仍核對候選及群組權重；選根 RNG 鏈一起重播。純查詢不消耗 RNG。
5. 選中預約移除 issueOptions，只保留 `issueBindings:[binding]`、groupParticipantIds、真正 participantIds 與版本化 scope；未選根不會日後替換。

每個 binding 保存 `version/name/issueId/rootFactId/latestOperationId/latestFactId/evidenceFactIds/roleBindings/informationSources/contactFactIds`。資訊來源明記 actorId、factId、disclosureOrder。根 ID 使用包2完整 issueId，因此同一 fact 的不同 localKey 也不混淆。

開場、確認與恢復都檢查原 binding。重新驗資格時僅查原 issueId 及原角色 tuple；不能選另一根補位。綁定後只接受本故事自身已確認事實產生的後續操作；外部事件先更新了同根即拒絕，不把原先看到的前序換成別人的新進度。最新操作／證據由同一權威投影讀取。

同一群組當天最多抽中一次。有限 all/any 不展開候選、不因命中多個分支加權；相同資源不能改 definitionId 偽裝另一故事，原有不可變資源／定義對照及 ID 去重仍驗證。引擎不從文字判斷不同資源是否語意同義；內容作者仍須遵守 SOP 骨架去重，不得以不同 ID 包裝同義故事。這不是新增一個語意去重器。

## 互斥與冷卻

新問題事件必填 `repetition.issueScope.version=1`：

- `issue`：同根當日不重處理；預約／active／waiting 同根不並行；已結束後按雙方 cooldownDays 較大者冷卻，跨主題亦相同。不同根不因同主題或同人物而自動阻擋，但同一群組當日仍只一次。
- `topic`：再對同主題、同主要人物施加 active／冷卻，不因換 companion 繞過。
- `person`：再對實際角色集合有交集者施加 active／冷卻，教師共同角色不使全世界互斥。

新事件彼此比較時採雙方較嚴的 scope。explicit exclusionGroups 繼續生效。新舊混合時保留既有互斥行為；完全舊事件走原 same-day／active-topic-participants／topic-cooldown／sameFact／explicit-exclusion 路徑。新 root scope 用正式 issueId 定義問題排除，不用 kind 或同 fact 推測同問題。closed／invalidated 不符合 states:['open']。

## 接納、拒絕與跨日

接納重檢根、最新操作、狀態、條件、知情、人物池、學籍、接觸、原日曆／數值條件及鎖定時段，排除預約自身的衝突紀錄，不排除別的預約。

對 opt-in 預約，資格失效會由 `admit-event` 在原世界交易內保存 `event-admission-rejection`，含 bindingContract、eventId、issueIds、可讀原因。沒有 open-event／故事、選根、補抽、數值結果或亂數結算；預約仍留在 selection 歷史，當日額度不回補，也不能重新抽選。既有 progression／campus／slot guards 不再要求接納這個已拒絕預約。相同 command 重送仍用既有冪等流程。舊事件接納錯誤仍沿舊拒絕方式。

已開啟故事的 start/select/confirm/resume 會核對原根；失效操作拒絕並原子回退，不產生效果。已合法確認的結果仍可 finish，不回算／撤銷舊結果。等待故事失去合法人物池／接觸／時段時保留 waiting；canResume 為 false，continuation 提供 applicable:false 及 rejectionReason，校務日程不因這個不適用的等待故事被強制阻擋。未增加自動轉交或自動解決生活困境的劇情。

離班／畢業只改互動適用性，不關閉 issue、不改人物歷史；若後續內容需聯絡 former/reunion 人物，必須有相應人物池及當天實際接觸。不能因為問題還在就強迫返校，也不在恢復時重選根。

## 版本、歷史與信任界線

- eligibility.issue.version=1、內容／候選／預約 bindingContract=1、binding.version=1、repetition.issueScope.version=1 明確 opt-in；舊資料缺欄位不遷移、不猜測。
- 原 save v2、runtime v1、compilerContract 1/2、numericWitness 1/2、causality v1 外殼與權威來源不變。固定 source 語法、舊角色綁定及交易 once-only 契約保留。
- selection 與 admission 歷史用當時 beforeOrder 核對根、前序、證據、知情及接觸，不看後來的收束。故事歷史以各操作 beforeOrder 編譯，數值使用包1見證；命名角色不從最終人物／數值世界重新挑選。
- 當前人物池／學籍／數值及接觸資格在實際交易重新驗證。歷史重播不拿最終 registry 偽裝過去；完整歷史 registry 獨立重建仍受包1既有 captured-input 信任界線限制。拒絕原因是當次原子交易的紀錄，不宣稱未簽章本機資料可抵抗整份權威資料協同改寫。
- 查詢投影只存在當次函式呼叫；無跨 revision／attempt／讀檔快取，無另一份可修改問題狀態。沒有重算舊數值、補造舊問題或改寫舊歷史。

## 精準測試：只有三組

唯一檔案 `test/issue-candidates.test.js`：

1. 一位學生三根；群組一次權重與單根比較；純查詢不消耗 RNG；有限條件／非法語法；選根收據／restore；舊候選不變；家長真實問題當事人＋當日接觸才能動態 companion，家長不因此取得根資訊。
2. 兩個主題引用同根；同日、active、冷卻與 scope；不同根與同主題不同根；原根先收束後接納留下拒絕、不換其餘兩根、不改數值或 RNG、不重複要求接納且可離開時段；正式 procedure 轉學後接納拒絕；第二主題實際編譯進展；同次選取不重複根。
3. 抽中根的 progress→跨日 resume→close；其他兩根不動；歷史 prefix 不看後續進展；加權 variant 使用動態命名人物數值；失敗整筆回退與重送 duplicate；正式轉學後仍保留 open issue、拒絕恢復且不阻擋校務；舊故事及包3明確來源 open→close 與歷史 restore。

實際執行順序（始終是同三組，沒有增加第四情境）：

| 次序 | 指令 | 結果／原因 |
| --- | --- | --- |
| 1 | `node --test test/issue-candidates.test.js` | 0 pass / 3 fail：根收據白名單未接、fixture 寫死另一日期 |
| 2 | 同上 | 0 / 3：同群組仍可重複選取，修正 same-day group 排除 |
| 3 | 同上 | 1 / 2：fixture 未走到預約實際時段 |
| 4 | `node --test --test-name-pattern='2 cross-topic\|3 story' test/issue-candidates.test.js` | 1 / 1：刻意刪 roster 的非法世界在正式驗證階段先被拒，改用正式轉學交易 |
| 5 | `node --test --test-name-pattern='3 story' test/issue-candidates.test.js` | 0 / 1：fixture 同交易塞多個 story action，改逐筆操作 |
| 6 | `node --test test/issue-candidates.test.js` | 1 / 2：新增正式轉學 fixture 的 event 未標 procedure，補正原因事件身分；此輪亦加入動態家長、選根收據與 variant 接線 |
| 7 | `node --test --test-name-pattern='2 cross-topic\|3 story' test/issue-candidates.test.js` | 2 / 0：合法轉學、拒絕紀錄及故事延續通過 |
| 8 | `node --test --test-name-pattern='1 dynamic' test/issue-candidates.test.js` | 1 / 0：補強角色接觸、歷史證據與共用契約後的受影響情境 |
| 9 | `node --test test/issue-candidates.test.js` | 3 / 0：原根限定查詢、scope、正式來源／群組核對等共用修改後，全三組通過 |
| 10 | `node --test --test-name-pattern='2 cross-topic\|3 story' test/issue-candidates.test.js` | 2 / 0：來源檢查發現 progression／campus 仍可能要求已拒預約；只補必要 pending 接線及原兩組斷言後重驗通過 |

另有 `git diff --check` 通過。表中的 `\|` 只為 Markdown 表格保留管線符號，實際 shell pattern 是單引號內的 `2 cross-topic|3 story`。

最後每一組均有通過紀錄；第10次沒有重跑未受 pending 接線修改影響的第一組。提交使用 `[skip ci]`，沒有手動觸發 GitHub Actions，也不宣稱 Actions 通過。

## 未驗證與後續界線

沒有全專案、三年／30年模擬、N1～N8全套、種子矩陣、Playwright／E2E、PR #60二十則全測、壓測、全量存檔、IndexedDB／Gzip或效能驗收。沒有真正跨學年的整段玩法驗收；以正式轉學、跨日及歷史前綴證明本批身分與來源接線，不冒稱三學年因果系統完成。

未直接端到端覆蓋：每種 actor scope／離校聯絡組合、closed／invalidated 狀態專用故事、所有 condition 葉節點、全部 document／機密來源組合、cumulative＋issue 的內容組合、既有完整 numericWitness v1 與所有 retained attempt／opening／學期重玩組合。

工程包5或後續內容工程再處理：完整存讀與學期重玩整合、長期容量及索引效能量測、依實際內容需要的暫停／轉交／結束分支、語意去重與來源充分性審稿。本批不新增完整三年劇情、不量產、不合併、不部署，完成 Draft PR 後停止。
