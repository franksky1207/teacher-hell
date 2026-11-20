# 故事全文閱讀器｜第1批：只讀資料出口

本批僅供未來 `/stories/` 閱讀器使用，**不建立 UI、不發布網址、不合併 main、不接遊戲預覽／引擎**。

## 原始資料與信任界線

- 唯一故事狀態來源：`data/story-production-ledger.json`。
- 僅匯出狀態為 `locked` 的故事；`revoked`、`proposed`、`reserved` 等一律不列入。
- 稿件從帳本所記 `manuscriptPath` 讀取，檢查實體路徑在專案內、屬 `content/events-v1/正式成品/`，且原始位元組的 SHA256 與帳本 `manuscriptDigest` 完全一致；不採用未鎖草稿，也不變更鎖定稿。
- 來源 Markdown 原文完整存入各篇 `sourceMarkdown`。額外拆出標題、四欄摘要、開場、A～D 四個行動、R1～R8 原文與客觀後果、4×8 權重；這些欄位只是供閱讀呈現，**不能回寫為正式故事或視為新的遊戲故事格式**。
- `{{student_a.name}}` 等角色占位符維持原文，不猜測／產生人物姓名。
- 資料須以文字方式安全顯示；未來 UI 不能將 Markdown 或故事文本直接當作未淨化 HTML 執行。

## 執行

在專案根目錄：

```bash
node scripts/export-story-reader.mjs
node --test test/story-reader-export.test.js
```

預設只產生 Git 忽略的 `work/story-reader-data/`：

- `index.json`：輕量索引（標題、故事 ID、T/G、主題、池 ID、標籤、四欄摘要、detail 路徑及帳本 revision）。
- `stories/T1-002.json` 等：完整單篇資料、原始 Markdown、四選項、八結果與因果矩陣。
- 未來閱讀器先載入索引，再按需載入單篇；不一次載入全部 2,400 篇。
- 產生流程先完整讀取／驗證所有有效鎖定稿，再寫入暫存目錄並置換既有匯出內容；若稿件驗證失敗不更新既有資料。
- 不需要帳號、資料庫或第二套進度帳本。

## 下一批界線

第2批才處理手機／桌面閱讀介面（分類、搜尋、長文排版、上一／下一篇等）；第3批再決定從量產分支安全發布到 `/stories/` 的獨立流程。**第一批不得改動現有 `/preview/` 或正式遊戲。**

