# 18-B｜T01、T02 正式發布結案與 T03 交接

日期：2026-11-16。此文件記載**正式發布後**狀態，優先於當時仍寫「未放行」的歷史 preflight／Draft PR 進度敘述；原審查與隔離證據照原樣保存，不回填竄改。

## 正式結果

- T01：200則主控內容審查通過、正式上架200。
- T02：208則原稿，190則主控審查通過並正式上架，18則保留工程隔離；其中 `content:18b-t02-05-23` 為額外新增的第18件。
- **合計408則原稿／390則正式可遊玩／18則隔離**。18則原始版仍可由resolver辨識，以供歷史與回收，但不進入正式候選；沒有冒充已刪除或已解封。
- 正式故事資源採**新version `2`、status `ready`**，保留原來工程版 `1`、`engineering-test` 不變。玩家正式目錄 `content:18b-t01-t02-reviewed-v2` 共有391個定義（390則新故事與既有升學輔導1則）。
- `src/runtime/progression.js` 已在一般遊戲日常註冊／抽選新目錄；跨學年轉換優先於目錄註冊。六月善後仍沿用原 aftercare 目錄。保留現有存檔歷史的immutable資源解析，不擅自遷移已提交事件。
- 外部AI審稿是選擇性品質工具，非強制放行；不得把主控內容通過誤寫為獨立外部AI簽核。

## 已實際完成的工程及發布驗證

1. C批舊版精準整合 Node CI：17 pass／0 fail，見 <https://github.com/franksky1207/teacher-hell/actions/runs/43788668671>；另有現行證據雜湊驗收。
2. 新正式目錄＋18隔離＋工程版保存＋候選解析＋跨學年相關回歸驗收，於發布分支 `6dc67afa324237ee6050e5acd334ba113ddfc2be` GitHub Actions 成功：<https://github.com/franksky1207/teacher-hell/actions/runs/43794171835>。
3. 發布整合 PR #73 已squash合併至 `main`：`f30894db50fc55b4e897d1115a4a98d13fb4b7b4`，<https://github.com/franksky1207/teacher-hell/pull/73>；前置PR #68～#72 為歷史來源，已關閉且不重複合併。
4. 正式預覽部署觸發提交 `cb8df786ebd52581088254c542fa3cfa8baf35b0`；GitHub Actions <https://github.com/franksky1207/teacher-hell/actions/runs/43794503323> **success**。校準、精準畫面測試、`gh-pages` 發布與發布樹檢查全部通過。直接核對 `gh-pages/preview/assets/cb8df786ebd5/src/runtime/story-content.js` 及 `progression.js`，可查新目錄。
5. 此次**未跑三年／30年全程模擬**。在全面H5舊版測試中另有歷史存檔格式和學業筆記本測試失敗，與本次接線無關；已以本次受影響的正式目錄和跨學年精準測試成功為發布門檻，不冒稱全套測試零失敗。

## 下一批：T03

依現行唯一 `docs/18B-正式事件量產與品質驗收SOP.md`，下一個主題是 **T03**，沿用四核心：世界可信、因果成立、數值有據、文字有生命。每小主題至少20件實質不同故事，數量不限20；製作時自檢、主控內容審查、集中局部修正，外部AI由使用者選擇。不得為了新增主題重跑T01/T02或重新開外部簽核。

T03開工前只要讀現有T碼字典、已發布事件起因與最新引擎契約，對照重複故事及制度時段；延用工程草稿隔離、明確內容放行、immutable版號及精準測試，不自動對未審新稿提升 `ready`。

## 維護原則

- `work/18b-global-event-isolation.json` 為18件未解封追蹤來源；不得因主題發布而移除。
- 舊 `work/18b-t01-t02-release-gates.json` 為**發布前的版本證據**，其中 `formalReady:0`／`noMergeNoDeploy:true` 是當時的歷史快照，不代表本結案後的正式狀態。
- 如要回收18件，必須另立具體世界前提／制度證據、限定範圍修訂及精準驗收；不影響已放行390件。
