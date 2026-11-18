"""Build final sprite assets from the cleaned master sheet.
python build_sprites.py <cleaned_sheet.png> <report.json> <outdir>
Outputs  <outdir>/frames/<anim>-<n>.png  (individual transparent frames, shared canvas per animation)
         <outdir>/strips/<anim>.png      (horizontal strips for CSS steps() animation)
         <outdir>/faces/face-<n>.png, <outdir>/props/<name>.png
         <outdir>/manifest.json
"""
import sys, os, json
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

sheet, report_path, out = sys.argv[1], sys.argv[2], sys.argv[3]
a = np.array(Image.open(sheet).convert('RGBA'))
report = json.load(open(report_path))
for d in ('frames', 'strips', 'faces', 'props'):
    os.makedirs(os.path.join(out, d), exist_ok=True)

BANDS = {
    'idle': (38, 312, 10), 'walk': (48, 312, 728), 'run': (358, 575, 8),
    'work': (358, 575, 552), 'jump': (592, 825, 8), 'celebrate': (600, 825, 646),
}

def keep_main(img, drop_loose=False):
    """Remove stray specks. With drop_loose, keep only the biggest connected body."""
    m = img[..., 3] > 40
    lab, n = ndi.label(ndi.binary_dilation(m, iterations=4))
    if n <= 1:
        return img
    sizes = ndi.sum(m, lab, range(1, n + 1))
    big = int(np.argmax(sizes)) + 1
    out_ = img.copy()
    for i in range(1, n + 1):
        if i == big:
            continue
        if drop_loose or sizes[i - 1] < 40:
            out_[(lab == i) & True, 3] = 0
    return out_

manifest = {}
for name, (y0, y1, x0) in BANDS.items():
    boxes = report[name]['boxes']
    frames = []
    for (bx0, by0, bx1, by1) in boxes:
        f = a[y0:y1, bx0:bx1].copy()
        f = keep_main(f, drop_loose=(name == 'jump'))
        frames.append((f, bx0, by0, bx1))
    # tight bbox of each frame (after cleaning), in band coordinates
    tight = []
    for f, bx0, by0, bx1 in frames:
        ys, xs = np.where(f[..., 3] > 40)
        tight.append((xs.min(), xs.max() + 1, ys.min(), ys.max() + 1))
    if name == 'jump':
        # keep true vertical position in the band so jump height is preserved
        top = min(t[2] for t in tight) - 2
        bot = max(t[3] for t in tight) + 2
    else:
        top = min(t[2] for t in tight) - 2
        bot = max(t[3] for t in tight) + 2
    w = max(t[1] - t[0] for t in tight) + 8
    h = bot - top
    canvas_frames = []
    for (f, bx0, by0, bx1), t in zip(frames, tight):
        c = Image.new('RGBA', (w, h), (0, 0, 0, 0))
        crop = Image.fromarray(f[t[2]:t[3], t[0]:t[1]])
        cx = (w - crop.width) // 2
        if name == 'jump':
            cy = t[2] - top
        else:
            cy = h - 2 - crop.height  # feet on a shared baseline
        c.alpha_composite(crop, (cx, cy))
        canvas_frames.append(c)
    for i, c in enumerate(canvas_frames, 1):
        c.save(os.path.join(out, 'frames', f'{name}-{i}.png'))
    strip = Image.new('RGBA', (w * len(canvas_frames), h), (0, 0, 0, 0))
    for i, c in enumerate(canvas_frames):
        strip.alpha_composite(c, (i * w, 0))
    strip.save(os.path.join(out, 'strips', f'{name}.png'))
    manifest[name] = {'frames': len(canvas_frames), 'w': int(w), 'h': int(h)}

# ---- faces: cut at the emptiest column near each nominal boundary ----------
fy0, fy1, fx0, fx1, n = 872, 1018, 4, 1250, 11
mass = (a[fy0:fy1, :, 3] > 40).sum(axis=0)
nominal = [fx0 + i * (fx1 - fx0) / n for i in range(n + 1)]
cuts = [fx0]
for b in nominal[1:-1]:
    lo, hi = int(b) - 22, int(b) + 22
    cuts.append(lo + int(np.argmin(mass[lo:hi])))
cuts.append(fx1)
faces = []
for i in range(n):
    f = a[fy0:fy1, cuts[i]:cuts[i + 1]].copy()
    m = f[..., 3] > 40
    lab, k = ndi.label(ndi.binary_dilation(m, iterations=3))
    sizes = ndi.sum(m, lab, range(1, k + 1))
    for j in range(1, k + 1):
        ys, xs = np.where(lab == j)
        touches = xs.min() <= 1 or xs.max() >= f.shape[1] - 2
        if sizes[j - 1] < 40 or (touches and sizes[j - 1] < 900):
            f[lab == j, 3] = 0
    ys, xs = np.where(f[..., 3] > 40)
    faces.append(f[ys.min():ys.max() + 1, xs.min():xs.max() + 1])
fw = max(x.shape[1] for x in faces) + 4
fh = max(x.shape[0] for x in faces) + 4
face_imgs = []
for i, f in enumerate(faces, 1):
    c = Image.new('RGBA', (fw, fh), (0, 0, 0, 0))
    im_ = Image.fromarray(f)
    c.alpha_composite(im_, ((fw - im_.width) // 2, fh - 2 - im_.height))
    c.save(os.path.join(out, 'faces', f'face-{i}.png'))
    face_imgs.append(c)
strip = Image.new('RGBA', (fw * n, fh), (0, 0, 0, 0))
for i, c in enumerate(face_imgs):
    strip.alpha_composite(c, (i * fw, 0))
strip.save(os.path.join(out, 'strips', 'faces.png'))
manifest['faces'] = {'frames': n, 'w': int(fw), 'h': int(fh)}

# ---- props ------------------------------------------------------------------
PROPS = {
    'character-back': (30, 108, 1077, 1247), 'character-side': (121, 224, 1079, 1238),
    'backpack': (238, 346, 1097, 1214), 'laptop': (354, 462, 1107, 1195),
    'coffee-books': (449, 537, 1101, 1228), 'headphones': (544, 623, 1101, 1169),
    'plant': (556, 610, 1170, 1232), 'cat': (617, 691, 1146, 1232),
    'sparkle': (650, 690, 1103, 1141), 'heart': (698, 741, 1104, 1144),
    'exclamation': (704, 734, 1149, 1204),
}
for name, (x0, x1, y0, y1) in PROPS.items():
    f = a[y0:y1, x0:x1].copy()
    ys, xs = np.where(f[..., 3] > 40)
    Image.fromarray(f[ys.min():ys.max() + 1, xs.min():xs.max() + 1]).save(os.path.join(out, 'props', name + '.png'))
manifest['props'] = list(PROPS)
json.dump(manifest, open(os.path.join(out, 'manifest.json'), 'w'), indent=2)
print(json.dumps(manifest))
