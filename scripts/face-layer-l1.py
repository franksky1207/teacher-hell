#!/usr/bin/env python3
"""15-B-L1: lossless fixed-body + replaceable facial rectangle from existing art.

All pixels come from the original approved six PNGs. This is a cutout proof,
NOT free-form eye/hair/wardrobe generation. Requires only Pillow.
"""
import json
from pathlib import Path
from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "artwork/prototypes/l1-face-layers"
INPUT = ROOT / "artwork/prototypes"
BASE = ROOT / "artwork/masters/students/student-001-base.png"
EXPRESSIONS = ("calm", "happy", "surprised", "angry", "sad", "embarrassed")
PADDING = 14

def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    with Image.open(BASE) as original:
        base = original.convert("RGBA")
    width, height = base.size
    loaded = {"calm": base}
    items = {}
    bounds = []
    for key in EXPRESSIONS[1:]:
        file = INPUT / f"student-001-expression-{key}.png"
        with Image.open(file) as original:
            target = original.convert("RGBA")
        item = {"source": str(file.relative_to(ROOT)), "size": list(target.size)}
        if target.size != base.size:
            item.update(status="REJECT",reason="canvas dimensions differ")
        else:
            alpha_equal = ImageChops.difference(base.getchannel("A"),target.getchannel("A")).getbbox() is None
            changed = ImageChops.difference(base.convert("RGB"),target.convert("RGB")).getbbox()
            item.update(alpha_equal=alpha_equal,difference_bbox=list(changed) if changed else None)
            if not alpha_equal or not changed:
                item.update(status="REJECT",reason="alpha differs or no RGB differences")
            else:
                bounds.append(changed)
                loaded[key] = target
        items[key] = item

    report = {"method": "shared transparent facial window + 6 aligned RGBA patches (lossless reconstruction)",
              "size": [width,height], "expressions": items,
              "padding":PADDING, "accepted_count":0,
              "note":"The underlying body image has a transparent rectangle; every expression including calm provides the same region. Not free-form eyes, hair or clothing layers."}
    if len(bounds) == 5:
        x0 = max(0,min(b[0] for b in bounds)-PADDING)
        y0 = max(0,min(b[1] for b in bounds)-PADDING)
        x1 = min(width,max(b[2] for b in bounds)+PADDING)
        y1 = min(height,max(b[3] for b in bounds)+PADDING)
        roi = (x0,y0,x1,y1)
        report["common_roi"] = list(roi)
        facial = y0 < int(height*.4) and y1 < int(height*.57) and (x1-x0)<int(width*.72)
        report["facial_region"] = facial
        if facial:
            body = base.copy()
            body.paste((0,0,0,0),roi)
            file = OUTPUT/"student-001-body-face-window.png"
            body.save(file,optimize=True)
            report["body_file"] = str(file.relative_to(ROOT))
            report["body_bytes"] = file.stat().st_size
            for key in EXPRESSIONS:
                patch = loaded[key].crop(roi)
                rebuilt = body.copy()
                rebuilt.alpha_composite(patch,(x0,y0))
                exact = (ImageChops.difference(rebuilt.convert("RGB"),loaded[key].convert("RGB")).getbbox() is None\n                         and ImageChops.difference(rebuilt.getchannel("A"),loaded[key].getchannel("A")).getbbox() is None)
                path = OUTPUT/f"student-001-face-{key}.png"
                if exact:
                    patch.save(path,optimize=True)
                    report["accepted_count"]+=1
                item = items.setdefault(key,{"source":str(BASE.relative_to(ROOT)),"size":[width,height]})
                item.update(status="PASS" if exact else "REJECT",
                            reconstruction_exact=exact,
                            patch_size=[x1-x0,y1-y0],
                            patch_file=str(path.relative_to(ROOT)) if exact else None,
                            patch_bytes=path.stat().st_size if exact else None)
                if not exact:
                    item["reason"]="alpha composite reconstructed pixels differ from source"
        else:
            report["error"]="common changed region extends beyond bounded facial area"
    else:
        report["error"]="one or more expression images incompatible"
    (OUTPUT/"analysis.json").write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    lines=["# 15-B-L1｜student-001 精準局部覆蓋驗證","",
           "**這是利用現有六張完整 PNG 自動裁切的局部替換，非新生圖，也不等於任意髮型／服裝的真分層。**",
           "方法：固定身體 PNG 在臉部區域透明挖空，再用同一共用座標疊回 calm＋五表情局部 PNG；透明髮絲也保留原像素。",
           f"畫布：{width}×{height}；共用局部：{report.get('common_roi','不適用')}；精準重建 **{report['accepted_count']}/6**。","",
           "| 表情 | 原圖 RGB 差異範圍 | 逐像素重建 | 圖片輸出 |",
           "|---|---|---|---|"]
    for key in EXPRESSIONS:
        item=items.get(key,{})
        lines.append(f"| {key} | {item.get('difference_bbox','calm 底圖')} | {item.get('status','未取得')} | {item.get('patch_file','—')} |")
    lines += ["","精準還原是檔案檢驗，不代表交叉淡化必然比已核准的完整 PNG 更自然；此點留待 L2 目視測試。","L1 不修改正式預覽畫面、人物映射、事件或存檔。",""]
    (OUTPUT/"REPORT.md").write_text("\n".join(lines),encoding="utf8")
    print(json.dumps({"accepted_count":report["accepted_count"],"common_roi":report.get("common_roi"),"error":report.get("error")},ensure_ascii=False))
    if report["accepted_count"] != 6:
        raise SystemExit("L1: not all six images reconstructed losslessly")

if __name__=="__main__":
    main()
