# T5 三年操作與存檔契約驗收（2026-11-05）

基準為整合分支 `89481a2`，本次以現行 D00／D04、A1、T4、S2 為準；本報告不取代較新的學業規則。未執行完整三年、30年、S2 大型容量或不相關年度測試。

## 已有契約與證據

- 正式 `startThreeYearSchoolCareer` 以臺灣日期選定三年校曆、暑輔首日及難度年資；同屆開局 40 人，第三次年度成功同一交易封存、評分及結局。30 年舊核心仍保留，不是此入口的選項。現有 T1/T2 測試核對日期邊界、三難度和名冊；T4 真實連續來源核對三年度與同屆結局，見 [T4 結果](three-year-t4-20261105.json)。
- 新局學業政策預設 v2；既有 v1 學業歷史及重試政策保持 v1，匯入沿用 `restoreSave` 完整驗證。A1 的政策、來源及限制見 [A1 驗收](academic-a1-20261105.md)。
- `createStoredSession` 串行化操作、使用 token CAS、確認覆蓋與刪除；匯入先驗證，再檢查目標及確認。IDB 保留三槽，S2 採壓縮頁並能讀舊頁，匯出仍為 v1 JSON；原子寫入與失敗保護詳見 [S2 驗收](storage-s2-20261105.md)。
- 完成交易只建立一份結局，runtime 對新操作拒絕 `CAREER_COMPLETE`，已提交的相同請求可去重；還原驗證封存來源、結局及其後無歷史。完成世界保留原槽；讀取與匯出不修改世界，三年模式不寫 memorial。完成槽可經確認匯入覆蓋、重開或刪除。T4/S2 既有真實完成來源的故障、CAS、去重、唯讀及完整 restore 證據見 S2 報告第 106–107 行及 `scripts/three-year-checks.js`。

## 本批檢查與結果

未發現需修改核心的小型整合缺口；沒有改寫狀態管理、schema、學業或壓縮機制。新增小型正式開局測試，確認三難度初始學業 v2，以及三槽中刪除、匯出／匯入不影響其他兩槽。CI 另針對 `T5:` 提交限制為下列範圍，避免 PR 推送自動執行無關年度測試。

Node v24.19.0：`npm run check` 通過（152 JS、63 runtime 模組）；`node --test --test-name-pattern='T5:|calendar T1:|calendar-integration T2: real seeded|storage T1:|storage: version rejection|storage: failed write|storage: serialize queued|storage: import confirmation|storage physical v2:|A1 compatibility:|T4 B: genuine' test/calendar.test.js test/calendar-integration.test.js test/storage.test.js test/academics.test.js test/three-year.test.js`：13 通過、0 失敗。涵蓋三難度、起始日、舊學業存檔、槽隔離、讀寫、損毀及不相容匯入、CAS、quota 和壓縮頁。

## 尚未重新驗證

T4/S2 的真實完成來源使用 A1 前的 v1 學業政策；本批未生成或重跑完整 v2 三年完成檔，也未重新載入大型 checkpoint。故本批對 v2 完成後整條實際讀取、匯出、確認覆蓋／刪除路徑的判斷是既有終局證據、A1 相容測試與程式接點的組合，並非新實測的 v2 完成局；尤其完成槽管理未以合法 v2 完成檔端到端重測。需在獲准使用合法完成來源時補驗，不能用修改內部欄位的假完成狀態替代。實際瀏覽器和裝置容量沿用 S2 當時證據，沒有新的裝置相容性或效能結論。
