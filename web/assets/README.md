# 《教師荒謬地獄》美術與音樂素材目錄（15-B）

本目錄於第15批開發分支先建立資料夾，不代表已完成素材或接線。製圖前必讀 [單張製圖驗收與交付 SOP](../../docs/15-B-單張製圖驗收與交付標準流程.md)、[15-B 美術素材命名與製作進度簿](../../docs/15-B-美術素材命名與製作進度簿.md) 與 [15-B 正式美術原型規範](../../docs/15-B-正式美術原型規範.md)：**不得自行換編號／猜測已完成張數／跳過驗收**，每張完成後更新進度簿。正式素材一次一張，不用拼版。

## 使用方式

- `artwork/`（儲存庫根目錄）：**不會**被現有網頁 build 複製；放原始母圖、分層來源與未通過的原型。
- `web/assets/`：**會**被目前 `scripts/project.js` 複製至 `dist/web/assets/`；僅放核准後的正式輸出。現有 Pages 部署會將 `dist/web` 放在帶版本的 `preview/assets/<commit>/web/`，所以正式程式應以相對於自身模組的安全 URL 連結，不得寫死根目錄 `/assets/`。
- `web/assets/characters/students/`：`base/` 身形／臉部原型、`hair/` 髮型、`expressions/` 六表情、`clothing/` 制服／運動服／便服、`accessories/` 眼鏡配件。
- `web/assets/characters/adults/`：非學生共用深色剪影；`graduates/`：成年畢業生剪影。
- `web/assets/backgrounds/desktop/`、`mobile/`：**同場景分別製作**的橫式／直式背景，名稱使用相同 `scene-id`，禁止從橫圖裁切成手機圖。
- `web/assets/audio/bgm/`：後續第15-E批七類授權確認的背景音樂。
- `web/assets/manifests/`：未來建立資產登錄、版本、SHA、原始尺寸、授權及對應表；目前未提供虛假 manifest。

## 命名與核准

- **唯一命名規則以進度簿為準**：學生使用 `student-001`、`student-002` 等三位序號；表情例 `student-001-expression-happy.png`；背景例 `scene-001-desktop.png` 和 `scene-001-mobile.png`。不拿姓名當永久 ID，不使用日期、`final2` 或其他臨時名稱。
- 在 `artwork/masters/backgrounds/desktop/` 與 `mobile/` 放相同場景識別的**獨立母圖**；正式輸出依裝置分放 `web/assets/backgrounds/`。
- 第一張人物母圖、男女制服、成人剪影及首組雙背景須由使用者核准；未核准、未通過分層驗收的圖片只留 `artwork/prototypes/`，不能直接搬到 `web/assets/`。
- 將來可依素材增加子資料夾，但優先保持此根架構，勿把每一張新增圖都另建一層資料夾。

## 不用 Codex 時如何上傳

1. ChatGPT 生成**單張**圖片後，使用對話中的圖片儲存／下載功能把原檔儲存到電腦（如需要透明背景，先確認確實含 alpha）。
2. 開啟 GitHub 的 `feat/phase15-art-music-20261107` 分支，在對應資料夾按 **Add file → Upload files**（手機瀏覽器亦可使用網頁上傳）。
3. 選取該圖片、檢查檔案名稱及上傳目標路徑，提交至**開發分支**，不要選到 `main`。
4. 如需提供圖片檔讓 ChatGPT 幫忙檢查或處理，可再上傳至此對話；等正式核准後才放到 `web/assets/`。

注意：GitHub 裡的圖片不會因為存進資料夾就自動出現在遊戲中，後續仍需將正式顯示層接到 manifest 與圖片路徑。未經使用者授權不部署、合併或更改遊戲核心。

## 2026-11-07：student-001 最小顯示接入（更新）

已將 `student-001-base-uniform-summer.png` 與五張完整人物表情 PNG 放入 `web/assets/characters/students/`，提供正式網頁模組載入。遊戲首頁與遊戲畫面增加「立繪預覽」入口，透過 `web/student-art-preview.js` 展示約 180 毫秒原地交叉淡化，不依賴劇情、事件或存檔。

**注意：這是已獲使用者接受的美術候選圖進入遊戲預覽的展示接線；不是正式分層素材、也沒有將 student-001 指派給現有任何 NPC。** `page.cast` 自動表情映射、角色身分與衣服的正式組合及正式事件切換尚待後續整合，不能從首頁按鈕推定已完成。

本文件先前「`web/assets` 尚無素材／未接線」的敘述適用於**本次接入前**，以本節的實際狀態為準；完整製作／驗收狀態仍以進度簿為準。
