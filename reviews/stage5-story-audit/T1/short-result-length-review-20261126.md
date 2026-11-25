# T1-001～072：111 個短結局的字數與語意複核

- 審查日期：2026-11-26
- 工作分支：`work/t1-t6-natural-dialogue-pass-20261125`
- 原稿施工基準：`a37a505cc4d6fd3c1522487538fba8da1c6712ae`
- 正式依據：`docs/story-production-v1/05-故事品質與驗收契約.md`（字數審閱級距）
- 唯一計數器：`scripts/story-visible-length.js`

## 判定

原測試將 576 個 R 的 `under90` 要求為 0，這是舊批次驗收曾採用的加嚴基準，不符合目前正式契約的「低於 90 字須複核而非自動退件」原則。本輪原稿有 111 個結果未達 90 字，逐筆檢視事件動作、人物反應及後續收束，均合理保留，不採無根據的補字或重複旁白。

## 個別複核證據

四份 JSON 中每項均有 `storyId`、`resultId`、`title`、`sourceText`、`visibleLength`、`verdict`、`reviewReason`、`reviewScope`，可從原稿與審查結論逆向查核。

- `short-result-review-025-036.json`：12 項
- `short-result-review-037-048.json`：44 項
- `short-result-review-049-060.json`：36 項
- `short-result-review-061-072.json`：19 項
- T1-001～024：沒有低於 90 字的結果
- 共 **111／111 項有逐結果紀錄**。

## 驗證安排

測試現在要求短結果清單與證據完全一致，核對故事 ID、R、標題、全文與字數，且每筆須有處理結論與理由；一旦故事改稿便會要求同步更新紀錄。原來的 AVG 分頁、原稿／演出一致性、人物在場、正文非空及結果數檢查均維持。

**本次沒有改動 72 篇故事，也沒有重做 648 篇的品質驗收。** GitHub Actions 未執行，Node 測試尚無新一輪實跑成績。
