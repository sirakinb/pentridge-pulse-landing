"""
Voxel agent generator for the Pentridge Labs world.

Why code and not MagicaVoxel: the whole point of the voxel route was that every
frame and every facing come off ONE model, so the character cannot drift the way
it did across three image generations. Defining the model in code keeps that
guarantee and makes the rig reproducible — no GUI step, no binary to hand-edit.

Everything renders in the same 2:1 isometric projection as the [P] mark, using
the palette sampled from the locked Adzo sprite.
"""

from PIL import Image, ImageDraw
import math, os, json

# ---- projection ------------------------------------------------------------
HALF_W, HALF_H, RISE = 4, 2, 5          # one voxel: 8 wide, 4 tall on top, 5 rise

def project(x, y, z):
    return ((x - y) * HALF_W, (x + y) * HALF_H - z * RISE)

def shade(c, f):
    return tuple(max(0, min(255, int(v * f))) for v in c)

# ---- palette (sampled from the locked sprite) ------------------------------
P = {
    'hoodie':      (0x55, 0x3b, 0xb1),
    'hoodie_dark': (0x45, 0x2e, 0x90),
    'draw':        (0xe6, 0xe2, 0xf5),
    'skin':        (0x6b, 0x45, 0x33),
    'skin_dark':   (0x54, 0x35, 0x27),
    'hair':        (0x2a, 0x1c, 0x18),
    'hair_hi':     (0x3d, 0x28, 0x20),
    'trouser':     (0x2c, 0x2a, 0x36),
    'shoe':        (0x1a, 0x19, 0x22),
    'sole':        (0xb9, 0xb6, 0xc8),
    'gold':        (0xd8, 0xa8, 0x4a),
}

def box(x0, x1, y0, y1, z0, z1, col):
    return [((x, y, z), col)
            for x in range(x0, x1 + 1)
            for y in range(y0, y1 + 1)
            for z in range(z0, z1 + 1)]

# ---- the model, built facing +Y --------------------------------------------
HIP_Z, SHOULDER_Z = 7, 13

def build_parts():
    """Static torso/head, plus limbs kept separate so they can be posed.

    Proportions are deliberately chunky — a tall thin voxel figure reads as a
    slab at sprite scale. Wider shoulders and a shorter leg run give a
    silhouette that still reads as a person at ~90px.
    """
    static = []
    static += box(-3, 3, -1, 1, HIP_Z, 12, P['hoodie'])          # torso, broad
    static += box(-3, 3, -1, -1, HIP_Z, 12, P['hoodie_dark'])    # back in shade
    static += box(-2, 2, 1, 1, 9, 9, P['hoodie_dark'])           # pocket
    static += box(-1, -1, 1, 1, 10, 12, P['draw'])               # drawstrings
    static += box(1, 1, 1, 1, 10, 12, P['draw'])
    static += box(-2, 2, -1, 1, 13, 13, P['hoodie'])             # hood collar

    static += box(-1, 1, -1, 1, 14, 16, P['skin'])               # head
    static += box(-1, 1, -1, -1, 14, 16, P['skin_dark'])
    static += box(-1, -1, 1, 1, 16, 16, (0x14, 0x0e, 0x0c))      # eyes
    static += box(1, 1, 1, 1, 16, 16, (0x14, 0x0e, 0x0c))

    # curly bob — volume around and above the head, not a flat cap
    static += box(-2, 2, -2, 2, 17, 18, P['hair'])
    static += box(-2, -2, -1, 1, 14, 17, P['hair'])
    static += box(2, 2, -1, 1, 14, 17, P['hair'])
    static += box(-1, 1, -2, -2, 15, 17, P['hair'])
    static += box(-2, 2, -2, 2, 19, 19, P['hair_hi'])
    static += box(-1, 1, 2, 2, 17, 18, P['hair_hi'])
    static += box(-3, -3, 0, 0, 14, 14, P['gold'])               # earrings
    static += box(3, 3, 0, 0, 14, 14, P['gold'])

    limbs = {
        'arm_l': (box(-4, -4, -1, 1, HIP_Z, 12, P['hoodie_dark'])
                  + box(-4, -4, -1, 1, HIP_Z - 1, HIP_Z - 1, P['skin']),
                  (-4, 0, 12)),
        'arm_r': (box(4, 4, -1, 1, HIP_Z, 12, P['hoodie'])
                  + box(4, 4, -1, 1, HIP_Z - 1, HIP_Z - 1, P['skin']),
                  (4, 0, 12)),
        'leg_l': (box(-2, -1, -1, 1, 1, HIP_Z - 1, P['trouser'])
                  + box(-2, -1, -1, 2, 0, 0, P['shoe']),
                  (-1, 0, HIP_Z - 1)),
        'leg_r': (box(1, 2, -1, 1, 1, HIP_Z - 1, P['trouser'])
                  + box(1, 2, -1, 2, 0, 0, P['shoe']),
                  (1, 0, HIP_Z - 1)),
    }
    return static, limbs

# Transforms stay in FLOAT and are only resolved at draw time. Rounding a
# rotated voxel back onto the integer grid is what shattered the limbs and
# fragmented every 45-degree facing.

def rot_x(vox, pivot, ang):
    """Swing a limb forward/back — the model faces +Y, so that's about X."""
    _px, py, pz = pivot
    c, s = math.cos(ang), math.sin(ang)
    out = []
    for (x, y, z), col in vox:
        dy, dz = y - py, z - pz
        out.append(((x, py + (dy * c - dz * s), pz + (dy * s + dz * c)), col))
    return out

def rot_z_pt(x, y, c, s):
    return (x * c - y * s, x * s + y * c)

# Faces as (normal, four corner offsets) on a unit cube centred on the voxel.
FACES = [
    ((0, 0, 1),  [(-.5, -.5, .5), (.5, -.5, .5), (.5, .5, .5), (-.5, .5, .5)]),
    ((0, 0, -1), [(-.5, -.5, -.5), (.5, -.5, -.5), (.5, .5, -.5), (-.5, .5, -.5)]),
    ((1, 0, 0),  [(.5, -.5, -.5), (.5, .5, -.5), (.5, .5, .5), (.5, -.5, .5)]),
    ((-1, 0, 0), [(-.5, -.5, -.5), (-.5, .5, -.5), (-.5, .5, .5), (-.5, -.5, .5)]),
    ((0, 1, 0),  [(-.5, .5, -.5), (.5, .5, -.5), (.5, .5, .5), (-.5, .5, .5)]),
    ((0, -1, 0), [(-.5, -.5, -.5), (.5, -.5, -.5), (.5, -.5, .5), (-.5, -.5, .5)]),
]

def render(vox, ang, pad=8):
    """Project each voxel's ACTUAL rotated cube.

    Drawing an axis-aligned iso cube at a rotated position only tessellates at
    90-degree multiples; at 45 the cubes stop meeting and the figure reads as
    stripes. Rotating the cube corners themselves works at any angle, and it
    also keeps the light fixed in world space instead of turning with the model.
    """
    c, s = math.cos(ang), math.sin(ang)

    quads = []
    for (x, y, z), col in vox:
        rx, ry = rot_z_pt(x, y, c, s)
        for (nx, ny, nz), corners in FACES:
            wnx, wny = rot_z_pt(nx, ny, c, s)
            if wnx + wny + nz <= 0.001:      # back-face cull for this iso view
                continue
            pts = []
            for (ox, oy, oz) in corners:
                cx_, cy_ = rot_z_pt(x + ox, y + oy, c, s)
                pts.append(project(cx_, cy_, z + oz))
            if nz > 0:
                f = 1.18
            elif nz < 0:
                f = 0.45
            else:
                f = 0.60 if (wnx - wny) < 0 else 0.86   # light fixed in world space
            quads.append((rx + ry + z, pts, shade(col, f)))

    xs = [p[0] for _d, pts, _c in quads for p in pts]
    ys = [p[1] for _d, pts, _c in quads for p in pts]
    minx, maxx = min(xs) - pad, max(xs) + pad
    miny, maxy = min(ys) - pad, max(ys) + pad
    img = Image.new('RGBA', (int(maxx - minx), int(maxy - miny)), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    for _depth, pts, col in sorted(quads, key=lambda q: q[0]):
        d.polygon([(px - minx, py - miny) for px, py in pts], fill=col)
    return img

def pose(frame_t, walking):
    """One posed, un-rotated figure. frame_t is 0..1 through the cycle."""
    static, limbs = build_parts()
    vox = list(static)
    if walking:
        swing = math.sin(frame_t * math.tau) * 0.62
        arm = math.sin(frame_t * math.tau) * 0.42
        bob = 1 if (frame_t % 0.5) < 0.25 else 0
        angles = {'leg_l': swing, 'leg_r': -swing, 'arm_l': -arm, 'arm_r': arm}
    else:
        breathe = math.sin(frame_t * math.tau) * 0.05
        bob = 0
        angles = {'leg_l': 0, 'leg_r': 0, 'arm_l': breathe, 'arm_r': -breathe}
    for name, (part, pivot) in limbs.items():
        vox += rot_x(part, pivot, angles[name])
    if bob:
        vox = [((x, y, z + bob), c) for (x, y, z), c in vox]
    return vox

# ---- output ----------------------------------------------------------------
DIRS = ['s', 'sw', 'w', 'nw', 'n', 'ne', 'e', 'se']   # screen-space facings
WALK_FRAMES, IDLE_FRAMES = 8, 4

def main():
    out = '/Users/sirakinb/pentridge-pulse-landing-1/public/labs-world'
    os.makedirs(out, exist_ok=True)
    cells, meta = [], {'dirs': DIRS, 'walk': WALK_FRAMES, 'idle': IDLE_FRAMES}

    for di, _d in enumerate(DIRS):
        ang = di * math.tau / 8
        for f in range(WALK_FRAMES):
            cells.append(render(pose(f / WALK_FRAMES, True), ang))
        for f in range(IDLE_FRAMES):
            cells.append(render(pose(f / IDLE_FRAMES, False), ang))

    cw = max(c.width for c in cells)
    ch = max(c.height for c in cells)
    per_dir = WALK_FRAMES + IDLE_FRAMES
    sheet = Image.new('RGBA', (cw * per_dir, ch * len(DIRS)), (0, 0, 0, 0))
    for i, c in enumerate(cells):
        col, row = i % per_dir, i // per_dir
        sheet.paste(c, (col * cw + (cw - c.width) // 2, row * ch + (ch - c.height)), c)

    meta |= {'frameW': cw, 'frameH': ch, 'perDir': per_dir}
    sheet.save(f'{out}/agent-sheet.png')
    sheet.save(f'{out}/agent-sheet.webp', 'WEBP', quality=92, method=6, alpha_quality=100)
    with open(f'{out}/agent-sheet.json', 'w') as fh:
        json.dump(meta, fh, indent=2)
    print(f'sheet {sheet.width}x{sheet.height}  frame {cw}x{ch}  '
          f'{len(cells)} frames ({len(DIRS)} dirs x {per_dir})')
    print(f'webp {os.path.getsize(out + "/agent-sheet.webp")/1024:.0f} KB')

if __name__ == '__main__':
    main()
