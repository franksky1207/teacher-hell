# 18-B B 批｜T02 資源同步及隔離接線交付

> 2026-11-16。基準 T02 作者 PR #69（`6648eb3`）與 A 批全域隔離清單 PR #70（`f43eae3`）。本批工作在 `feat/18b-t02-b-isolated-assets`，以作者工作分支為底，不合併、不部署、不擅自開啟正式事件。

## 完成的工程範圍

- **來源權威不變**：T02 的 `work/18b-t02-01-authoring.json` 至 `08` 共208筆均保留，沒有重新撰稿、改數值或改資格。
- **JS序列化**：`scripts/sync-t02-drafts.mjs` 逐份機械轉換為 `src/runtime/content/t02-01.js` 至 `08.js`，再由 `t02.js` 匯集；`--check` 只檢查，不寫檔。
- **索引承接**：將 A 批 `work/18b-global-event-isolation.json`、`docs/18B-全域事件隔離追蹤與回收.md` 納入此分支，供後續工程追蹤；同步產出 `src/runtime/content/t02-isolation.js`，17件（9 blocked＋8 held）與全域索引精確對齊。
- **解析接線**：`src/runtime/story-content.js` 新增 `T02_DRAFT_STORIES`，208則作為明確 `engineering-test` 資源，支援原有 `resolveStory()` 與 `validateStoryReference()`。
- **工程目錄**：新增 `t02DraftCatalogue()`，只提供**191筆**未列為 blocked／held 的工程草稿；`catalogueId` 為 `engineering:18b-t02-reviewed-source-v1`、`engineering:true`。此191筆**不代表正式審核簽核或可正式上架**，僅代表未出現在17件隔離清單。
- **隔離安全線**：17件仍保留可解析資源，但不會出現在本批工程事件候選目錄；全部208件仍為工程稿，正常 `engineering:false` 候選池不得出現。
- **精準測試**：`test/18b-t02-b-isolated-assets.test.js` 檢查數量、隔離索引、來源同步、資源解析、正式池封閉。建議與來源既有 `test/18b-t02-last24.test.js` 及 `test/18b-t02-batch-structure.test.js` 分別依風險局部執行，不跑全三年／30年／大量seed。

## 尚未完成與放行界線

1. 這次是**工程隔離接線**，不是正式發布；208則正式上架0，T01仍在另外的PR #68，T02作者稿在PR #69。
2. 191筆非隔離事件依然需要最新版本的有效獨立審核／制度／候選可達性放行證據；未能用`engineering:true`或「有JS」取代。
3. 全域追蹤清單目前是版本管理資料，不是玩家存檔 DB，也沒有自動解封流程。往後更改學業、校曆、升學等，需主動按依賴比對並局部複驗。
4. 本批的工程目錄預設**不註冊到正式新生涯**，不新增UI或自動註冊流程；未修改已部署的正式目錄。進入C批前須注意新工程JS資源的下載／快取成本，正式上線不應無條件把未放行稿打包給所有玩家。
5. GitHub來源檢查與新增測試原始碼已提交；**本批尚無對最新SHA的Node或CI實跑成功證據，不得宣稱測試通過**。C批應先做同步`--check`與一組精準Node回歸，未通過即只修受影響範圍。

## 發布規則

仍是 Draft；不合併PR #68／#69／#70／本批，不部署，不提升ready，不在使用者未授權下發布。17件只有符合紀錄的再驗條件並取得使用者明確授權後才能解除隔離。
