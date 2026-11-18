"""Cut individual transparent sprites out of the master sheet.
Usage: python extract.py <sheet.png> <outdir>
"""
import sys, os, json
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi

src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
im = Image.open(src).convert('RGBA')
a = np.array(im)
H, W = a.shape[:2]

# --- 1. erase purple label pills and thin divider rules ---------------------
alpha = a[..., 3]
solid = alpha > 60
# a label pill is a big, dense, purple-ish rectangle; find purple pixels
r, g, b = a[..., 0].astype(int), a[..., 1].astype(int), a[..., 2].astype(int)
purple = solid & (abs(r - 112) < 28) & (abs(g - 72) < 28) & (abs(b - 150) < 30)
# the pill: dilate purple a bit, keep only components wider than 80px and shorter than 40px
pl, n = ndi.label(ndi.binary_dilation(purple, iterations=10))
for i, s in enumerate(ndi.find_objects(pl)):
    h = s[0].stop - s[0].start
    w = s[1].stop - s[1].start
    if w > 100 and h < 60 and (h > 22):
        pad = 4
        a[max(0, s[0].start - pad):s[0].stop + pad, max(0, s[1].start - pad):s[1].stop + pad, 3] = 0

# divider rules: long thin runs of semi-opaque purple-grey pixels
rule = (a[..., 3] > 0) & (a[..., 3] < 200)
rows_cnt = rule.sum(axis=1)
for y in np.where(rows_cnt > 700)[0]:
    # remove only the thin-line pixels in that row, not sprite pixels (sprite pixels are opaque)
    a[y, rule[y], 3] = 0
cols_cnt = rule.sum(axis=0)
for x in np.where(cols_cnt > 120)[0]:
    a[rule[:, x], x, 3] = 0

Image.fromarray(a).save(os.path.join(out, '_cleaned_sheet.png'))

# --- 2. split each band into frames by column gaps -------------------------
# (name, y0, y1, x0, x1, expected_frames)
BANDS = [
    ('idle',   38, 312,   10,  718, 6),
    ('walk',   48, 312,  728, 1250, 4),
    ('run',   358, 575,    8,  545, 4),
    ('work',  358, 575,  552, 1245, 4),
    ('jump',  592, 825,    8,  636, 5),
    ('celebrate', 600, 825, 646, 1245, 4),
    ('face',  872, 1018,    4, 1250, 11),
]

def split(y0, y1, x0, x1, n):
    sub = a[y0:y1, x0:x1, 3] > 40
    col = sub.sum(axis=0) > 0
    # find runs of occupied columns, bridging tiny gaps
    runs, start = [], None
    for i, v in enumerate(col):
        if v and start is None:
            start = i
        if not v and start is not None:
            runs.append([start, i]); start = None
    if start is not None:
        runs.append([start, len(col)])
    merged = []
    for r_ in runs:
        if merged and r_[0] - merged[-1][1] < 4:
            merged[-1][1] = r_[1]
        else:
            merged.append(r_)
    # drop specks
    merged = [m for m in merged if m[1] - m[0] > 12]
    return merged

report = {}
for name, y0, y1, x0, x1, n in BANDS:
    if name == 'face':
        cell = (x1 - x0) / n
        runs = [[int(round(i * cell)), int(round((i + 1) * cell))] for i in range(n)]
    else:
        runs = split(y0, y1, x0, x1, n)
    runs = [[int(p), int(q)] for p, q in runs]
    report[name] = {'expected': n, 'found': len(runs), 'runs': runs}
    print(name, 'expected', n, 'found', len(runs), [(x0 + r_[0], x0 + r_[1]) for r_ in runs])
    # if the count differs, keep going so we can inspect
    for i, (c0, c1) in enumerate(runs):
        sub = a[y0:y1, x0 + c0:x0 + c1].copy()
        ys = np.where(sub[..., 3] > 40)[0]
        if len(ys) == 0:
            continue
        ty0, ty1 = ys.min(), ys.max() + 1
        sub = sub[max(0, ty0 - 2):ty1 + 2]
        Image.fromarray(sub).save(os.path.join(out, f'{name}-{i+1}.png'))
        report[name].setdefault('boxes', []).append([int(x0 + c0), int(y0 + max(0, ty0 - 2)), int(x0 + c1), int(y0 + ty1 + 2)])
json.dump(report, open(os.path.join(out, '_report.json'), 'w'))
