# 第18批工程包5：存讀整合、索引生命週期與精準量測

## 1. 工程摘要與基準

開工與交付前查核 PR #64 遠端 HEAD：`ee98fc765d870d9c68a80887cc551e6cbe6be83d`，未出現較新提交。獨立分支 `feat/18-package5-save-index-performance`，PR base `feat/18-package4-issue-candidates`，不以 main 為基準。

讀取 PR #59 最新 HEAD `508c4c3b238073ff3feb5b0583837e14701a5801` 的 `docs/18B-正式事件量產與品質驗收SOP.md`，以及繼承的工程包1～4正式契約與實際程式。前四包遠端 HEAD 分別為 `4e9412c`、`fc50875`、`7d5e7ec`、`ee98fc7`，與目前繼承的工程相符。

本批只新增：

- `test/save-index-performance.test.js`：唯一專用檔案、三組情境。
- 本文件：存讀／重玩審查、查詢與索引生命週期、實測及限制。

**沒有發現需修改正式存讀或版本分派的相容缺口；沒有足夠瓶頸證據支持快取或其他效能改造，因此沒有修改 production 程式。** 修正均為新 fixture 的來源 ID、數值代碼、合法時間順序及錯誤斷言。沒有新增事件資源或修改前四包、PR #60、正式內容、介面、美術、音樂、48數值、N1～N8、K、額度或權重。

## 2. Current、Opening、存讀與重玩

審查程式：`src/storage/format.js`、`session.js`、`indexeddb.js` 的呼叫邊界，以及 runtime 的 `model.js`、`transactions.js`、`retry-checkpoint.js`、`schedule.js`、`story.js`、`story-history-view.js`、`issues.js`、`issue-candidates.js`、`event-candidates.js`、`event-selection.js`、`story-consequences.js`。IndexedDB 僅做程式檢視，未開啟或執行資料庫／壓縮測試。

- Save v2 的 `world` 是 current；`opening` 是完整、獨立且受驗的合法重玩基準。`checkedSave` 對兩者執行正式 `validateWorldState`，再核對身分、日曆、基準與 commits/history 前綴。`encodeSave` 同樣驗證，不因輸出 JSON 跳過檢查。
- 完整世界包含 facts 的 causality、問題來源、故事狀態與版本、numericWitness、選根收據及 issueBindings、disclosures/knowledge、定向關係、數值收據、事件亂數及 commits。它們不由另一份可修改的問題狀態替代。
- `restoreSave` 只驗證與複製，不呼叫抽選／重結算；人物索引重新建立亦沒有抽根路徑。專用樣本透過 session export/recover/reviewImport/import 往返，完整 payload、人物、歷史、根、候選、RNG 與 numeric 均相同。儲存介面用最小記憶體 adapter；沒有宣稱測過實際 IndexedDB 持久化。
- 舊故事缺少 causality／binding 仍合法，不從敘述補造問題。情境一實際讀取 compiler v1 舊故事及包3 compiler v2 的既有資源。runtime v1、Save v2、compilerContract v1/v2、numericWitness v1/v2、causality v1、bindingContract v1、issue eligibility/repetition scope v1 的既有分派未變，沒有遷移或格式統一。**舊 numericWitness v1 完整快照這次僅審查既有分派，沒有重跑包1測試或新增端到端案例。**
- `forkWorldAttempt` 先驗證 opening 與 abandoned，再執行 `validateRetryPair`、前綴、身分及未使用 attempt ID 檢查；有 annual/homeroom 的正式生涯繼續要求既有失敗授權。它只保留 checkpoint 已確認歷史、封存其原 numeric ledger、新建 attempt 及亂數流；不把 abandoned 之後發生的事實、結果或交易帶進新世界。舊數值效果已在 checkpoint 的 evolution 中，封存收據不再結算。
- **合法保留的根**：冬季 checkpoint 的三個具體問題連同原 fact/localKey 身分、人物及原 attempt 來源保留。**不得保留的進展**：checkpoint 後的 progress fact 不進 retry；新分支有自己的 progress，舊分支的 progress 不受改寫。保留全部根而非依 current attempt 過濾，才能正確重建合法舊問題。
- 冬季最小情境實際完成最後 slot、取得 semester-review、透過 stored session 執行正式 `read-semester-review`，自動把完整 checkpoint 放入 opening；重送不再執行。未讀 review 及非合法位置的重玩基準均拒絕；不自動修補。從 checkpoint fork 後先合法 advance，再允許新的操作。原數值 receipts 進 archive，新 attempt receipts 為空；根操作本身沒有新增數值收據。

**學期覆蓋限制**：沿用 `test/semester-retry.test.js` 的 skipped-date 最小 fixture 概念，從合法初始化跳到冬季最後一天的基準，再執行實際邊界交易。該基準能通過世界驗證，但不是由完整一學期遊玩抵達。測到的是冬季 review/read、opening 捕捉、fork 與保留／丟棄機制；未驗連續學期、annual 失敗授權的整段玩法、高二／高三夏季至秋季交接。沒有假造 annual-success 或宣稱跨學年驗收通過。

## 3. 索引審查與生命週期

沒有新增索引或快取，故沒有新的失效 API、revision 鍵或序列化欄位。既有行為如下：

| 查詢／驗證 | 實際重複工作與處置 |
| --- | --- |
| `projectIssues` | 每次從指定 beforeOrder 之前的 facts 排序折疊，核對因果操作；不讀永久 status。保留完整驗證。 |
| `storyHistoryView` | facts/claims/history 過濾、knowledge 由 acquisition/belief 還原；`issues()`／`issue(id)` 每次折疊。`validateStoryHistory` 同一故事列還有兩次相同邊界視圖建立。已確認重複，但小樣本不足以把它判為值得改造的瓶頸，保留。 |
| `eventIndex` | 單次呼叫建 lifecycle、分類、exposure 與去重索引；分類同事件用 `some` 去重。抽選先建一次供權重使用，`buildEventCandidates` 另建一次供資格使用。沒有永久保存。 |
| `buildEventCandidates` | 定義內只要有 issue，已於單次候選查詢共用一次問題投影，再傳給各 `issueOptions`；未反覆為每人物折疊全部問題。 |
| `issueOptions` | 仍有 fact/disclosure/contact 的 find/findLast 與角色 pool 查詢。固定三根不足以證明需建立額外 Map 或池快取。 |
| `validateWorldState` | 正式 facts／因果／history／ledger／人物檢查後仍呼叫問題投影、事件與故事驗證；不同歷史列的 beforeOrder 不可混成最終問題狀態。未跳過任何驗證。 |
| `validateStoryHistory` | compiler v2 精簡見證分支已有局部 atWorld／歷史容器，不複製完整 numeric world；舊版快照／舊編譯器仍沿原分派。沒有移除為隔離與完整性必要的複製。 |
| 存檔複製 | encode 既有只讀 checkedSave 避免為 JSON 丟棄一整份 world/opening 複本；restore/create/session publication 的 detached 邊界保留。 |

這些是程式路徑審查，**沒有每函式呼叫次數 profiling 或大型歷史實測**。不能將重複查詢或迴圈本身當作瓶頸證明。若未來有較大且真實合法歷史，再優先考慮單次抽選共用 eventIndex、單一歷史列共用視圖，並提供等價證據；本批不先增加可傳入過期索引的 API。

生命週期：每次交易、同一 draft 的不同操作、revision 改變、讀檔／匯入、attempt fork 與學期重玩，依當次函式輸入重新建立所需投影，不存在跨操作重用。歷史問題查詢明確使用 `fact.order < beforeOrder`；兩個世界即使 revision 相同也沒有共用記憶。不得把已建立的 view 當成跨交易的可變世界訂閱。查詢輸出可修改副本，不改權威。索引遺失即可從 facts／歷史／收據重建，無新增 `issues.status`。

## 4. 查詢等價與確定性

本批無 production 最佳化，故沒有一套新的加速演算法與舊演算法比較。實際驗證的是：

- 每個根的 `storyHistoryView.issue/ issues` 與直接 `projectIssues` 結果相同，含狀態、操作、來源、證據；修改查詢副本後重新讀取不變。
- 各 latestOperation 前的 beforeOrder 視圖與直接受限投影相同。冬季 checkpoint 後 progress 在舊截面不可見，進展之後的截面可見。
- JSON 讀取前後 `buildEventCandidates` 完整結果（資格、拒絕、群組、issueOptions、人物）及 eventIndex 分類／去重結果相同。
- 權重用共用 index 與每次重建 index 得到完整相同結果。沒有為測試另做一套候選資格引擎。
- 相同合法 pre-draw 世界與 JSON restore 世界執行同一次正式抽選，完整輸出世界、event-pick/event-root receipts、根、權重、次序及 RNG 相同。這不是大量種子測試。
- 已接納且確認的 bound 故事在讀檔後通過完整選根／接納／故事歷史重播驗證；重送原 confirm command 回報 duplicate，儲存 token 不變。
- 查詢不消耗 random、不改任何世界資料；非法因果前序及非法 opening 被正式驗證拒絕。

未新增另一套快取／無快取模式；沒有為第三組硬建快取系統。上述證據不代表所有內容、資格葉節點、角色 scope 或所有歷史組合已全面驗證。

## 5. 效能與容量：只量一次

Node `v24.19.0`，使用 `node:perf_hooks` 的 `performance.now()` 與 `Buffer.byteLength`。唯一固定 seed 1 的工程樣本，沿既有 fixture 與隔離包4故事建立；同一世界中有三根問題、一筆鎖根事件及一次 variant 確認。沒有新增正式事件、數千事件、種子矩陣、重複量測、瀏覽器或外部工具。

樣本：history **22**、facts **3**、issues **3**、story rows **3**、commits **7**、查詢 candidate groups **1**、bound events **1**。三根同時存在，只有綁定根增加 progress；來源交易另含明確定向關係數值收據與教師取得根事實的 disclosure。

| 單次操作 | 毫秒 |
| --- | ---: |
| `projectIssues` | 0.127 |
| 建立 view 後查詢三個問題 | 0.264 |
| 兩個固定定義的候選查詢 | 1.085 |
| 完整 `validateWorldState`（含故事歷史重播） | 22.071 |
| `createSave` ＋ `encodeSave`（含既有重複完整驗證） | 85.520 |

| UTF-8 JSON | bytes |
| --- | ---: |
| Save v2 完整外殼、current ＋ opening | 754,656 |
| current 世界 | 407,947 |
| opening 世界 | 346,649 |

測量在第三次專用檔案執行的第三組完成，當次第一組亦通過，第二組尚有 fixture 時間屏障錯誤，隨後只修／重跑第二組。**未為取得漂亮數字重新量測。** 每項只有一個值，無專門暖機或平均；同一程序之前已進行正確性查詢，受 JIT、GC 及執行機噪音影響。create/encode 合計時間不是單純 JSON.stringify 時間。這些數字不能外推成三年延遲、長期容量上限、效能門檻或正式內容大小。

沒有修改前後加速比例；**尚無足夠證據**判斷需要效能最佳化。未執行全量 IndexedDB／Gzip，也沒有資料壓縮率或持久化耗時結論。

## 6. 精準測試紀錄

唯一新增檔案 `test/save-index-performance.test.js`，只有三組，不含子測試或額外大型驗證：

1. 存讀：包含因果、知情、關係效果／收據、鎖根與故事見證的 current/opening；session export/recover/import；讀取前後問題、候選、歷史與 RNG；舊故事；非法歷史／opening；重送不再確認。
2. Attempt／時間截面：上述冬季最小 fixture 的真實 review-read/checkpoint 操作、opening 自動捕捉、合法歷史保留、新身分、丟棄未來 progress、原 ledger archive、新分支進展不重算數值、根／人物／候選索引隔離、非法基準及重用 attempt 拒絕。
3. 等價及量測：直接投影與歷史查詢、完整候選／index、共用／重建 index 權重、JSON 前後完整抽選輸出、查詢無 RNG，以及一次時間和大小紀錄。

| 次序 | 實際命令 | 結果與定位／修正 |
| --- | --- | --- |
| 1 | `node --test test/save-index-performance.test.js` | 0 pass / 3 fail：沿用 result helper 的預設 factId 指向 `one`；改為本 fixture 真實根 factId。 |
| 2 | 同上 | 0 / 3：把 person 的 `1-1` 用於 relationship；改為既有定向關係合法代碼 `5-1`，未改數值公式。 |
| 3 | 同上 | 2 / 1：第一、三組通過並完成唯一量測；第二組 retry 回到已完成 checkpoint 後直接 progress，被 TIME_BARRIER 正確拒絕。改先正式 advance。 |
| 4 | `node --test --test-name-pattern='2 attempt' test/save-index-performance.test.js` | 0 / 1：非法基準已拒絕，但既有 RangeError 的文字沒有 `SNAPSHOT`；修正為核對 `error.code`，不改 runtime 拒絕行為。 |
| 5 | 同上 | 1 / 0：第二組通過；未重跑不受修改影響、已通過的第一及第三組。 |

三組各有實際通過紀錄，沒有宣稱最後一次命令全三組一起執行。另執行 `git diff --check` 通過。本機測試與 GitHub Actions 分開：提交使用 `[skip ci]`，沒有手動觸發 Actions；現有 PR workflows 的 base 條件亦不包含本批指定 base，不宣稱 Actions 通過。

未執行：全專案、前四包所有測試、N1～N8全套、PR #60全20則、三年／30年、完整學期、種子矩陣、Playwright、瀏覽器／手機、壓測、全量存檔轉換、IndexedDB／Gzip。沒有獨立劇情語意審查，本批沒有創作新事件；三組機制測試不可替代正式事件內容審查。

## 7. 尚未完成與停止界線

在本批明定的最小整合及測量範圍內，沒有發現需修正後才能結案的正式程式阻礙；不把未驗範圍說成已通過。以下保留為後續、有合法 fixture 或真實瓶頸證據時才處理：

- 連續學期、annual 失敗後正式重玩、高二／高三合法夏秋交接及所有 retained story/witness 組合。
- 較大真實歷史的索引成本與必要時單次操作共用；本次沒有長期瓶頸結論。
- 包1既有 captured-input／最終 registry 無法全面獨立重建歷史的信任界線，依前四包文件保留，並未藉本批測試宣稱解決。
- 正式事件的語意品質、來源充分性、跨主題去重及後續內容量產，均需另行授權與內容審查。

建立指定 base 的 Draft PR 後停止。不合併、不部署、不修改 PR #59～#64，不開始正式事件量產，也不宣稱全部三年驗收完成。
