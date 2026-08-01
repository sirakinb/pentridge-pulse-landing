// Time-of-day palette for the world.
//
// The brief said explicitly: no daytime sunny environment, the world should
// stay dark, intelligent and premium. So "day" here is NOT blue sky and
// sunshine — it's a cool overcast morning that still belongs to the brand.
// The clock changes the *light*, never the identity.
//
// One constraint drives the whole ramp: the environment already carries
// meaning. Dark = dormant, overcast = couldn't load. Time of day must not
// borrow either of those signals, so daylight never goes grey-and-flat and the
// ground glow under active buildings survives at every hour.

const KEYS = [
  // hour, skyTop,   skyBottom, ambient,   ambientA, star, aurora, glow
  [0,  0x05050b, 0x0d0a1e, 0x0a0a1a, 0.00, 1.00, 1.00, 1.00],
  [5,  0x0a0a18, 0x1a1230, 0x140f26, 0.06, 0.85, 0.70, 1.00],
  [6,  0x241a3d, 0x4a2c4e, 0x3a2140, 0.16, 0.35, 0.25, 0.92],
  [7,  0x3d3560, 0x6b5570, 0x584a68, 0.22, 0.05, 0.00, 0.78],
  [9,  0x565578, 0x7d7898, 0x6e6a88, 0.26, 0.00, 0.00, 0.55],
  [12, 0x5f5f80, 0x8a86a4, 0x787591, 0.28, 0.00, 0.00, 0.45],
  [16, 0x585274, 0x827c9c, 0x716c8c, 0.26, 0.00, 0.00, 0.52],
  [18, 0x4a3560, 0x8a5560, 0x6a4258, 0.22, 0.05, 0.10, 0.72],
  [19, 0x2a1c40, 0x54304a, 0x40243e, 0.15, 0.35, 0.35, 0.88],
  [21, 0x0a0a18, 0x181230, 0x120e24, 0.05, 0.85, 0.80, 1.00],
  [24, 0x05050b, 0x0d0a1e, 0x0a0a1a, 0.00, 1.00, 1.00, 1.00],
];

function mixHex(a, b, t) {
  const ar = (a >> 16) & 255, ag = (a >> 8) & 255, ab = a & 255;
  const br = (b >> 16) & 255, bg = (b >> 8) & 255, bb = b & 255;
  return (Math.round(ar + (br - ar) * t) << 16)
       | (Math.round(ag + (bg - ag) * t) << 8)
       | Math.round(ab + (bb - ab) * t);
}

export function paletteAt(hour) {
  const h = ((hour % 24) + 24) % 24;
  let i = 0;
  while (i < KEYS.length - 2 && KEYS[i + 1][0] <= h) i += 1;
  const a = KEYS[i], b = KEYS[i + 1];
  const t = (h - a[0]) / (b[0] - a[0] || 1);
  return {
    skyTop: mixHex(a[1], b[1], t),
    skyBottom: mixHex(a[2], b[2], t),
    ambient: mixHex(a[3], b[3], t),
    ambientAlpha: a[4] + (b[4] - a[4]) * t,
    starAlpha: a[5] + (b[5] - a[5]) * t,
    auroraAlpha: a[6] + (b[6] - a[6]) * t,
    glow: a[7] + (b[7] - a[7]) * t,
  };
}

export function localHour() {
  const d = new Date();
  return d.getHours() + d.getMinutes() / 60;
}
