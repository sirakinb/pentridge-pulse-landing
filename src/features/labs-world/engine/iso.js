// 2:1 isometric projection — the same geometry as the [P] brand mark (26.57°).
// Grid coordinates are plot units; screen coordinates are logical pixels within
// the scene container, which the camera then centres and scales.

export const TILE_W = 172;
export const TILE_H = 86;

export function toScreen(gx, gy) {
  return { x: ((gx - gy) * TILE_W) / 2, y: ((gx + gy) * TILE_H) / 2 };
}

// Painter's algorithm: anything with a larger (x+y) is nearer the camera and
// must be drawn later. Used as the sort key for every entity in the world.
export function depthOf(gx, gy) {
  return gx + gy;
}

// Walk one step from a toward b, at most `dist` grid units. Returns the new
// position and whether we've arrived.
export function stepToward(from, to, dist) {
  const dx = to.gx - from.gx;
  const dy = to.gy - from.gy;
  const len = Math.hypot(dx, dy);
  if (len <= dist || len === 0) return { gx: to.gx, gy: to.gy, arrived: true };
  return {
    gx: from.gx + (dx / len) * dist,
    gy: from.gy + (dy / len) * dist,
    arrived: false,
  };
}

// Which of the 8 isometric facings does this heading correspond to? The agent
// art only covers a front three-quarter view for now, so this is used to flip
// horizontally and to pick a future directional frame.
export function facingOf(dx, dy) {
  if (dx === 0 && dy === 0) return 'se';
  const screenX = dx - dy;
  const screenY = dx + dy;
  if (Math.abs(screenX) > Math.abs(screenY) * 2) return screenX > 0 ? 'e' : 'w';
  if (Math.abs(screenY) > Math.abs(screenX) * 2) return screenY > 0 ? 's' : 'n';
  if (screenX > 0) return screenY > 0 ? 'se' : 'ne';
  return screenY > 0 ? 'sw' : 'nw';
}
