#!/usr/bin/env python3
"""15-B-L1: exact facial-region overlay extraction from the six approved PNGs.
Does not invent pixels, modify original art, or assert genuine independent eyes/mouth layers.
Requires Pillow. Work on copies in artwork/prototypes/l1-face-layers only.
"""
import json
from pathlib import Path
from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "artwork/masters/students/student-001-base.png"
PROTOTYPES = ROOT / "artwork/prototypes"
OUTPUT = PROTOTYPES / "l1-face-layers"
EXPRESSIONS = ("happy", "surprised", "angry", "sad", "embarrassed")
PADDING = 14

def inspect():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    with Image.open(BASE) as im:
        base = im.convert("RGBA")
    width, height = base.size
    report = {"method": "exact opaque rectangular ROI overlay (not independently editable eyes/mouth)",
              "base": str(BASE.relative_to(ROOT)), "size": [width, height],
              "padding": PADDING, "expressions": {}, "accepted_count": 0}
    for expression in EXPRESSIONS:
        path = PROTOTYPES / f"student-001-expression-{expression}.png"
        with Image.open(path) as im:
            target = im.convert("RGBA")
        item = {"source": str(path.relative_to(ROOT)), "size": list(target.size)}
        if target.size != base.size:
            item.update(status="REJECT", reason="canvas dimensions differ")
            report["expressions"][expression] = item
            continue
        alpha_equal = ImageChops.difference(base.getchannel("A"), target.getchannel("A")).getbbox() is None
        diff = ImageChops.difference(base, target)
        bbox = diff.getbbox()
        item["alpha_equal"] = alpha_equal
        item["difference_bbox"] = list(bbox) if bbox else None
        if not alpha_equal or not bbox:
            item.update(status="REJECT", reason="alpha mismatch or no changed pixels")
            report["expressions"][expression] = item
            continue
        x0, y0, x1, y1 = bbox
        roi = (max(0, x0 - PADDING), max(0, y0 - PADDING),
               min(width, x1 + PADDING), min(height, y1 + PADDING))
        item["roi"] = list(roi)
        # These art assets are whole-body, so accept a replacement only if
        # it is in the upper facial part and the entire ROI is fully opaque.
        facial = (roi[1] < int(height * .4) and roi[3] < int(height * .57) and
                  (roi[2] - roi[0]) < int(width * .72))
        opaque = target.crop(roi).getchannel("A").getextrema() == (255, 255)
        item["facial_region"] = facial
        item["fully_opaque_roi"] = opaque
        if not facial or not opaque:
            item.update(status="REJECT",reason="changed region not confined to fully opaque face; do not generate misleading overlay")
            report["expressions"][expression] = item
            continue
        patch = target.crop(roi)
        output_file = OUTPUT / f"student-001-face-{expression}.png"
        patch.save(output_file,optimize=True)
        # Recompose as browser overlay: a 100%-opaque patch precisely replaces
        # old eye/mouth colors, without leaving old features visible.
        rebuilt = base.copy()
        rebuilt.alpha_composite(patch, dest=(roi[0], roi[1]))
        exact = ImageChops.difference(rebuilt, target).getbbox() is None
        item.update(status="PASS" if exact else "REJECT",reconstruction_exact=exact,
                    overlay=str(output_file.relative_to(ROOT)),
                    overlay_dimensions=list(patch.size),
                    overlay_bytes=output_file.stat().st_size,
                    source_bytes=path.stat().st_size)
        if exact:
            report["accepted_count"] += 1
        else:
            output_file.unlink()
            item["reason"] = "pixel-perfect recomposition failed"
            item.pop("overlay",None)
        report["expressions"][expression] = item
    (OUTPUT / "analysis.json").write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    lines = ["# 15-B-L1｜student-001 臉部局部覆蓋實驗結果", "",
             "本結果由 `scripts/face-layer-l1.py` 對現有六張 PNG 自動分析產生；不重新製圖。",
             "**注意：此方法是單一臉部區域的不透明替換圖，並非可以自由編輯眉眼嘴、任意換臉／髮型的完整分層。**",
             "只要局部未完全不透明、超出臉部或不等於原圖，就拒絕輸出，不宣稱分層成功。", "",
             f"- 畫布：{width}×{height}；成功精準重建：**{report['accepted_count']}/5**。", "",
             "| 表情 | 判定 | 原變動範圍 | 替換矩形 | 原圖重建 |", "|---|---|---|---|---|"]
    for key,entry in report["expressions"].items():
        lines.append(f"| {key} | {entry['status']} | {entry.get('difference_bbox')} | {entry.get('roi','—')} | {entry.get('reconstruction_exact','—')} |")
    lines += ["", "正式 180ms 全身淡化仍是核准基準；L2 再做原地完整圖 vs 局部替換動畫比較。",
              "本批不做 40 人組合模擬、不替換遊戲正式圖片、不修改存檔或事件。", ""]
    (OUTPUT / "REPORT.md").write_text("\n".join(lines),encoding="utf-8")
    print(json.dumps({"accepted_count":report["accepted_count"],
                      "details":{k:{"status":v["status"],"roi":v.get("roi"),"reason":v.get("reason")} for k,v in report["expressions"].items()}},ensure_ascii=False))
    return report["accepted_count"] == 5

if __name__ == "__main__":
    inspect()
