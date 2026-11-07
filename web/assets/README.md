# 《教師荒謬地獄》網頁素材管理

目前採 **40 位學生獨立資料夾 × 每人 8 套服裝**，每套服裝的目標交付為 **1 張完整平靜 PNG＋1 張 3×2 局部六表情 Sprite Sheet PNG＋1 份定位 JSON**。

- `web/assets/characters/students/student-001/` ～ `student-040/`：每位學生一個資料夾。原始夏、冬平靜圖已進入 `student-001/`，其餘尚未完成者以 `.gitkeep` 預留目錄。
- `artwork/masters/students/student-001/` ～ `student-040/`：對應的美術原始母圖存放區。**正式網頁只讀取 `web/assets/`。**
- 八種服裝識別：`uniform-summer`、`uniform-winter`、`sports-summer`、`sports-winter`、`casual-summer-01`、`casual-summer-02`、`casual-winter-01`、`casual-winter-02`。
- 命名範例：`student-001-base-uniform-winter.png`、`student-001-face-sheet-uniform-winter.png`、`student-001-face-sheet-uniform-winter.json`。
- 表情順序固定：第一列 calm、happy、angry；第二列 sad、surprised、embarrassed。**每套獨立製作並定位**，不跨服裝共用貼片。
- 夏季制服的舊五張完整表情圖、L1～L3／L4 紙娃娃及 A/B 實驗資產已依使用者指示移除。原本網站上的「立繪預覽」入口**暫時停用**，等素材完成才接線，不宣稱表情已可在正式站切換。
- `web/assets/characters/adults/`、`graduates/`、`backgrounds/`、`audio/`、`manifests/` 保留，各自按原規格處理。

**素材製作與驗收唯一最新依據**：[正式美術原型規範第十一節](../../docs/15-B-正式美術原型規範.md) 與 [美術素材進度簿](../../docs/15-B-美術素材命名與製作進度簿.md)。同一學生可以換站姿、配件與髮飾，但人物辨識和身形須自然一致。不要在未核准前修改主遊戲人物顯示或存檔結構。

此資料夾會由建置程序複製到部署產物；圖片上傳 GitHub **不等於**已接入遊戲。正式接線另案辦理。
