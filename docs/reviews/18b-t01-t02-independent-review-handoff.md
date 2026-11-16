# 選用的外部AI審查參考清單（非必要流程）

> 本文件**只有在使用者主動要求請另一個 AI 審稿時**才使用。360件不代表360件有問題，也不代表欠外部審查就不能發布。主控ChatGPT可依作者稿、四項核心、已有審查與工程測試自行判定內容是否通過。此文件不參與正式放行門檻。


> **用途：**交給真正與本次作者分離的 Gemini／人工獨立審閱者；本檔不表示ChatGPT已完成獨立簽核。主分支`main`不可直接作審稿來源。唯一現行作者整合分支：`feat/18b-c-t01-t02-integration`，PR #72。不得修改程式與原稿、不得合併或部署。

## 先讀取權威材料

1. `docs/18B-正式事件量產與品質驗收SOP.md`：四項核心、審稿與放行界線。
2. `work/18b-t01-t02-independent-review-handoff.json`：**精確360件待補裁決**，按`source`與來源Git blob核對。
3. T01既有`review/18b-t01-argon-deep-audit/docs/reviews/18b-t01-argon-deep-audit.json`及`review/18b-t01-flash-recheck/docs/reviews/18b-t01-flash-recheck.json`；T02既有`review/18b-t02-hydrogen-audit/work/18b-t02-hydrogen-review-findings.json`和整合分支`work/18b-t02-hydrogen-corrections.json`。
4. `work/18b-global-event-isolation.json`與`work/18b-t01-t02-release-gates.json`：原17件隔離、T02-05-23待補真實順位更正紀錄。

## 審查方式

- **不重新寫故事**，只核對現行版與上次審查的**實際差異**、是否真正修好舊問題、世界因果與數值、教師權責、時序及文字生命力。T01原8件、T02原23件（內容雜湊一致且有審稿證據）不要重審；T02原17件隔離不解封。
- 必須對交接清單的每個ID輸出一筆獨立裁決，允許 `approved`／`block`／`improve-nonblocking`；不可用「整批很好」或「JSON結構合法」取代逐件判斷。
- **只有有證據的阻斷才退修**。不以偏好的幽默、加權數值、跨日數量、固定情緒比例等要求全批重寫。若故事原文把正式公告／資格當已發生，應驗真實的資格來源；一般新事件起因、當事人主觀說法，不必預先要求存在舊歷史。
- 審稿者身份及實際讀取來源要寫清楚，不得使用撰稿者自評假裝獨立。需要引用正式校務法規時核對遊戲**當年度**而非硬套舊年度日期。
- 只修改**審稿結果文件**，不要更動作者 JSON／JS／遊戲引擎；每個阻斷紀錄事件ID、精準原因及最小修改建議。

## 交付檔案契約

將結果寫入**獨立審查分支**，並附 `docs/reviews/18b-t01-t02-independent-final-review.json`（建議），格式為：
```json
{
  "sourceBranch": "feat/18b-c-t01-t02-integration",
  "sourceCommit": "實際審稿時檢出的完整SHA",
  "reviewer": "實際獨立審閱者識別",
  "reviewMethod": "existing-findings-plus-current-version-diff",
  "records": [
    {
      "id": "content:18b-t01-01-02",
      "sourcePath": "work/18b-t01-01-authoring.json",
      "sourceBlobSha": "實際核對的來源檔blob SHA",
      "verdict": "approved",
      "reason": "針對這一則的具體審核理由",
      "blockingFinding": null
    }
  ]
}
```
上述為**格式示範，不是實際核准**。正式收件需確認360件ID全覆蓋、沒有重複與額外IDs、source Blob和審閱時現行稿一致，且`block`都含可定位的原因。審閱中途若清單對不上，先標記缺漏而非虛構結論。

## 審閱完成後的Chat整合工作

- 只處理有真正 `block` 的事件及受影響引用，保留歷史審查來源與結論。
- T02-05-23待有真實校方更正證據或必要小幅改稿及複核才能解封。
- 最後做受影響ID的同步／精準測試；不重跑全部17項、三年生涯或多seed模擬。
- 依當前SOP，逐事件分別達到`reviewed → resolverReady → catalogueReady`才可提議發布；即使外部審稿通過，也**不自動合併、升ready或部署**。
