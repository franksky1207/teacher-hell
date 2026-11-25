# 《教師荒謬地獄》第五階段・第一步：T1～T6 全故事獨立總檢

本目錄存放第五階段第一步（僅檢查、判斷、紀錄，不修改任何故事原稿或遊戲資料）的正式審查紀錄。

- **審查基準 Commit SHA**：`0d80d456e2905b35db096e9179069d783a66a249`
- **工作分支**：`work/t1-t6-natural-dialogue-pass-20261125`
- **正式基準分支**：`content/events-production-v1`（本階段不合併、不改動）

## 目錄結構

- `PROGRESS.md`：總檢進度與接續狀態
- `review-index.json`：程式可讀索引與統計
- `story-manifest.json`：648 篇故事清冊與結構預檢
- `all-story-coverage.csv`：648 篇逐篇覆蓋總表
- `all-findings.json`：全體 A 級／B 級問題紀錄
- `correction-list.md`：第二步施工修正清單
- `T1/`～`T6/`：各學期 `coverage.json`、`findings.json`、`report.md`
- `batches/`：各批次獨立審查原始紀錄（供多 Agent 隔離寫入與彙整）
- `tools/`：唯讀擷取與彙整驗證腳本
