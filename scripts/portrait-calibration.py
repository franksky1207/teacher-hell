"""Build-time alpha-bounds and final portrait scales, shared by preview and story.
Requires Pillow + numpy; only executed on publishing or explicit art maintenance.
Never alters the approved PNG files or game-save data.
"""
from pathlib import Path
from hashlib import sha256
from json import dumps
from PIL import Image
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / 'web/assets/characters/students'
OUT = ROOT / 'web/portrait-calibration.json'
OUTFITS = ('uniform-summer', 'uniform-winter', 'sports-summer', 'sports-winter', 'casual')
RATIOS = (
 .91,.99,.85,.96,.93,.90,.89,.93,.90,.87,
 .97,.83,.98,.90,1,.94,.91,.86,.93,.94,
 .87,.94,.79,.90,.84,.88,.93,.91,.90,.87,
 .82,.94,.86,.90,.84,.95,.86,.89,.80,.89,
 .95,.93,.91,.85
)
STAGE = {'width': 1152, 'height': 1152, 'bodyHeight': 1000, 'maxBodyWidth': 1000, 'bottom': 18}
assert len(RATIOS) == 44 and RATIOS[14] == 1
sheets = {}
for n in range(1, 45):
    student = f'student-{n:03d}'
    for outfit in OUTFITS:
        path = BASE / student / f'{student}-full-sheet-{outfit}.png'
        if not path.exists():
            if outfit == 'uniform-summer' and n <= 40:
                raise SystemExit(f'Missing approved summer uniform: {path}')
            continue
        with Image.open(path) as source:
            image = source.convert('RGBA')
        if image.size != (1536, 2304):
            raise SystemExit(f'Unexpected 3x2 source size {path}: {image.size}')
        a = np.asarray(image)[:, :, 3]
        bounds = []
        for k in range(6):
            x = (k % 3) * 512
            y = (k // 3) * 1152
            # Exactly mirror JavaScript analyzePortraitSheet: 2px scan and alpha >= 96.
            ys, xs = np.where(a[y:y + 1152:2, x:x + 512:2] >= 96)
            if len(xs) == 0:
                raise SystemExit(f'No visible character: {path}, cell {k+1}')
            left, top = int(xs.min())*2, int(ys.min())*2
            width = int(xs.max()-xs.min()+1)*2
            height = int(ys.max()-ys.min()+1)*2
            bounds.append([left, top, width, height])
        target = 1000 * RATIOS[n-1]
        # Do not hide a bad source by secretly changing an individual's target height.
        for k, (_, _, width, height) in enumerate(bounds):
            if width * (target / height) > STAGE['maxBodyWidth'] + 1e-8:
                raise SystemExit(f'Portrait would need width clipping: {student}/{outfit} cell {k+1}')
        data = path.read_bytes()
        scales = [round(target / b[3], 12) for b in bounds]
        sheets[f'{student}/{outfit}'] = {'bounds': bounds, 'scales': scales,
                                      'width': image.width, 'height': image.height,
                                      'sha256': sha256(data).hexdigest()[:16]}
output = {'version': 1, 'stage': STAGE, 'sheets': sheets}
OUT.write_text(dumps(output, ensure_ascii=False, separators=(',', ':')) + '\n', encoding='utf-8')
print(f'PASS portrait calibration: {len(sheets)} image sheets, {len(sheets)*6} measured cells; common 100% = 1000px')
