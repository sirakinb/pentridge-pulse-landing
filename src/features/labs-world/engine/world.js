// Imperative PixiJS scene. Deliberately framework-free — no @pixi/react, which
// requires React 19 and this app is on React 18. React owns the DOM overlay and
// all interaction *semantics*; this file owns pixels only.

import { TILE_W, TILE_H, toScreen, depthOf, stepToward } from './iso';
import {
  ESTABLISHMENTS, SELECTABLE, INSTALLATIONS, PROPS, NPC_SPOTS, HUB, AGENT_HOME,
} from '../data/establishments';

const SCENE_W = 1900;
const SCENE_H = 1150;
const GROUND_R = 8;
const WALK_SPEED = 2.6; // grid units per second

const A = '/labs-world';

export async function createWorld({ host, agent = 'adzo', onHoverChange, onSelect }) {
  const PIXI = await import('pixi.js');
  const { Application, Assets, Container, Sprite, Graphics, Texture, BlurFilter } = PIXI;

  const app = new Application();
  await app.init({
    backgroundAlpha: 0,
    antialias: false,
    resolution: Math.min(window.devicePixelRatio || 1, 2),
    autoDensity: true,
    powerPreference: 'high-performance',
    resizeTo: host,
  });
  if (!host.isConnected) { app.destroy(true); return null; } // unmounted mid-load
  host.appendChild(app.canvas);
  app.canvas.setAttribute('aria-hidden', 'true');

  // ---- assets -------------------------------------------------------------
  const propNames = [...new Set(PROPS.map((p) => p.art))];
  const manifest = [
    ...ESTABLISHMENTS.map((e) => e.art),
    ...ESTABLISHMENTS.filter((e) => e.artDormant).map((e) => e.artDormant),
    ...INSTALLATIONS.map((i) => i.art),
    ...propNames.map((n) => `${A}/${n}.webp`),
    ...NPC_SPOTS.map((_, i) => `${A}/npc-${i}.webp`),
    `${A}/skyline.webp`, `${A}/viaduct.webp`,
    `${A}/${agent}.webp`, `${A}/adzo-meditate.webp`, `${A}/adzo-pullup.webp`,
    HUB.art,
  ];
  const tex = {};
  await Promise.all(manifest.map(async (url) => {
    try { tex[url] = await Assets.load(url); } catch { tex[url] = Texture.EMPTY; }
  }));

  // ---- layers -------------------------------------------------------------
  const root = new Container();
  const skyLayer = new Container();
  const groundLayer = new Container();
  const sortLayer = new Container();   // everything depth-sorted
  const weatherLayer = new Container();
  root.addChild(skyLayer, groundLayer, sortLayer, weatherLayer);
  app.stage.addChild(root);

  // ---- sky + distant city -------------------------------------------------
  const sky = new Graphics();
  for (let i = 0; i < 460; i++) {
    sky.rect(0, i, SCENE_W, 1).fill({ color: 0x1a1638, alpha: 0.36 * (1 - i / 460) });
  }
  for (let i = 0; i < 420; i++) {
    const x = Math.random() * SCENE_W;
    const y = Math.random() * 330;
    sky.circle(x, y, Math.random() < 0.85 ? 1 : 1.6)
       .fill({ color: 0xced2ff, alpha: 0.25 + Math.random() * 0.6 });
  }
  skyLayer.addChild(sky);

  const auroraBox = new Container();
  auroraBox.filters = [new BlurFilter({ strength: 26, quality: 3 })];
  skyLayer.addChild(auroraBox);
  const auroras = [];
  [{ yc: 118, col: 0x7e56ee, a: 0.22 }, { yc: 184, col: 0x40c6d8, a: 0.16 }].forEach((cfg) => {
    const g = new Graphics();
    g.__cfg = cfg;
    auroras.push(g); auroraBox.addChild(g);
  });

  const skylineY = 430;
  const skyTex = tex[`${A}/skyline.webp`];
  if (skyTex && skyTex !== Texture.EMPTY) {
    const scale = 300 / skyTex.height;
    for (let x = 0; x < SCENE_W + skyTex.width * scale; x += skyTex.width * scale - 4) {
      const s = new Sprite(skyTex);
      s.scale.set(scale); s.x = x; s.y = skylineY - 300;
      s.tint = 0x8f8fb4; s.alpha = 0.5;
      skyLayer.addChild(s);
    }
  }
  const viaTex = tex[`${A}/viaduct.webp`];
  if (viaTex && viaTex !== Texture.EMPTY) {
    for (let x = -40; x < SCENE_W + 120; x += viaTex.width - 6) {
      const s = new Sprite(viaTex);
      s.x = x; s.y = skylineY - 46; s.tint = 0x9a9ac0; s.alpha = 0.62;
      skyLayer.addChild(s);
    }
  }

  // ---- ground plate + conduits -------------------------------------------
  const cx = SCENE_W / 2;
  const cy = SCENE_H / 2 + 150;

  const ground = new Graphics();
  for (let gx = -GROUND_R; gx <= GROUND_R; gx++) {
    for (let gy = -GROUND_R; gy <= GROUND_R; gy++) {
      if (Math.abs(gx) + Math.abs(gy) > GROUND_R) continue;
      const { x, y } = toScreen(gx, gy);
      const px = cx + x; const py = cy + y;
      const f = Math.max(0, 1 - (Math.abs(gx) + Math.abs(gy)) / (GROUND_R + 1.5));
      const v = Math.round(14 + 15 * f);
      ground.poly([px, py - TILE_H / 2, px + TILE_W / 2, py, px, py + TILE_H / 2, px - TILE_W / 2, py])
            .fill({ color: (v << 16) | (v << 8) | Math.round(v * 1.6) })
            .stroke({ color: 0x241f3c, width: 1 });
    }
  }
  groundLayer.addChild(ground);

  const conduits = new Graphics();
  groundLayer.addChild(conduits);
  function drawConduits(pulse) {
    conduits.clear();
    SELECTABLE.forEach((e) => {
      const st = state.access[e.id];
      for (let i = 1; i < 10; i++) {
        const t = i / 10;
        const { x, y } = toScreen(e.gx * t, e.gy * t);
        const px = cx + x; const py = cy + y;
        let alpha = st === 'active' ? 0.14 + 0.3 * t : 0.05;
        if (st === 'active') {
          const wave = Math.sin(pulse * 2 - t * 5);
          alpha += Math.max(0, wave) * 0.28;
        }
        conduits.poly([px, py - TILE_H / 2, px + TILE_W / 2, py, px, py + TILE_H / 2, px - TILE_W / 2, py])
                .fill({ color: 0x5b43d6, alpha });
      }
    });
  }

  // ---- depth-sorted entities ---------------------------------------------
  const entities = [];
  function place(texture, gx, gy, opts = {}) {
    if (!texture || texture === Texture.EMPTY) return null;
    const s = new Sprite(texture);
    s.anchor.set(0.5, 1);
    const { x, y } = toScreen(gx, gy);
    s.x = cx + x;
    s.y = cy + y + TILE_H / 2 + (opts.dy || 0);
    if (opts.tint !== undefined) s.tint = opts.tint;
    if (opts.alpha !== undefined) s.alpha = opts.alpha;
    const rec = { sprite: s, gx, gy, depth: depthOf(gx, gy) + (opts.bias || 0), ...opts };
    entities.push(rec);
    sortLayer.addChild(s);
    return rec;
  }

  PROPS.forEach((p) => place(tex[`${A}/${p.art}.webp`], p.gx, p.gy));
  INSTALLATIONS.forEach((i) => place(tex[i.art], i.gx, i.gy));
  NPC_SPOTS.forEach(([gx, gy], i) => place(tex[`${A}/npc-${i}.webp`], gx, gy));

  // hub
  place(tex[HUB.art], HUB.gx, HUB.gy, { scale: 1 })?.sprite.scale.set(0.42);

  // agent glow ring, drawn under her
  const ring = new Graphics();
  groundLayer.addChild(ring);

  // buildings — the only hit-testable things in the scene
  const buildings = new Map();
  ESTABLISHMENTS.forEach((e) => {
    const rec = place(tex[e.art], e.gx, e.gy);
    if (!rec) return;
    rec.est = e;
    rec.baseY = rec.sprite.y;
    buildings.set(e.id, rec);
    if (e.reserved) return; // scenery: no pointer, no focus
    rec.sprite.eventMode = 'static';
    rec.sprite.cursor = 'pointer';
    rec.sprite.on('pointerover', () => setHover(e.id));
    rec.sprite.on('pointerout', () => setHover(null));
    rec.sprite.on('pointertap', () => onSelect?.(e, state.access[e.id]));
  });

  // agent
  const agentRec = place(tex[`${A}/${agent}.webp`], AGENT_HOME.gx, AGENT_HOME.gy, { bias: 0.02 });
  const poses = {
    walk: tex[`${A}/${agent}.webp`],
    idle: tex[`${A}/${agent}.webp`],
    meditate: tex[`${A}/adzo-meditate.webp`],
    pullup: tex[`${A}/adzo-pullup.webp`],
  };

  // ---- state --------------------------------------------------------------
  const state = {
    access: Object.fromEntries(ESTABLISHMENTS.map((e) => [e.id, 'active'])),
    error: false,
    hovered: null,
    focused: null,
    agent: { gx: AGENT_HOME.gx, gy: AGENT_HOME.gy, target: null, pose: 'idle', poseT: 0 },
  };

  function applyAccess() {
    buildings.forEach((rec, id) => {
      const st = state.access[id];
      const e = rec.est;
      if (e.reserved) { rec.sprite.tint = 0x5b5b78; rec.sprite.alpha = 0.72; return; }
      if (st === 'dormant') {
        if (e.artDormant && tex[e.artDormant]) rec.sprite.texture = tex[e.artDormant];
        rec.sprite.tint = 0x4a4a68;   // pull it back so it recedes, never advances
        rec.sprite.alpha = 0.82;
      } else {
        if (tex[e.art]) rec.sprite.texture = tex[e.art];
        rec.sprite.tint = 0xffffff;
        rec.sprite.alpha = 1;
      }
    });
  }

  // "Couldn't load" is weather, not an alert: an overcast layer dims the world.
  const overcast = new Graphics();
  overcast.rect(0, 0, SCENE_W, SCENE_H).fill({ color: 0x0a0a18 });
  overcast.alpha = 0;
  weatherLayer.addChild(overcast);

  function setHover(id) {
    if (state.hovered === id) return;
    state.hovered = id;
    emitHover();
  }
  function emitHover() {
    const id = state.hovered || state.focused;
    const rec = id ? buildings.get(id) : null;
    if (!rec || rec.est.reserved) { onHoverChange?.(null); state.agent.target = null; return; }
    // walk toward whatever is under attention, stopping short of the facade
    const t = 0.72;
    state.agent.target = { gx: rec.est.gx * t, gy: rec.est.gy * t };
    const g = rec.sprite.getGlobalPosition();
    onHoverChange?.({
      est: rec.est,
      access: state.access[rec.est.id],
      x: g.x,
      y: g.y - rec.sprite.height * rec.sprite.scale.y,
    });
  }

  // ---- camera -------------------------------------------------------------
  let parallax = { x: 0, y: 0 };
  function layout() {
    const w = host.clientWidth || 1;
    const h = host.clientHeight || 1;
    const scale = Math.min(w / SCENE_W, h / SCENE_H) * 1.02;
    root.scale.set(scale);
    root.x = (w - SCENE_W * scale) / 2 + parallax.x;
    root.y = (h - SCENE_H * scale) / 2 + parallax.y;
  }
  layout();
  const ro = new ResizeObserver(layout);
  ro.observe(host);

  function onPointerMove(ev) {
    const r = host.getBoundingClientRect();
    parallax = {
      x: ((ev.clientX - r.left) / r.width - 0.5) * -22,
      y: ((ev.clientY - r.top) / r.height - 0.5) * -12,
    };
  }
  host.addEventListener('pointermove', onPointerMove);

  // ---- tick ---------------------------------------------------------------
  let elapsed = 0;
  let idleTimer = 0;
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  app.ticker.add((ticker) => {
    const dt = ticker.deltaMS / 1000;
    elapsed += dt;

    if (!reduced) {
      drawConduits(elapsed);
      auroras.forEach((g, i) => {
        const { yc, col, a } = g.__cfg;
        g.clear();
        const top = []; const bottom = [];
        for (let x = 0; x <= SCENE_W; x += 40) {
          const y = yc + Math.sin(x / 380 + elapsed * 0.06 + i) * 34
                       + Math.sin(x / 140 + elapsed * 0.1) * 9;
          top.push(x, y);
          bottom.unshift(x, y + 84);
        }
        g.poly([...top, ...bottom]).fill({ color: col, alpha: a });
      });
      overcast.alpha += ((state.error ? 0.34 : 0) - overcast.alpha) * Math.min(1, dt * 2);
    }

    // agent movement
    const ag = state.agent;
    if (ag.target) {
      idleTimer = 0;
      if (ag.pose !== 'walk') { ag.pose = 'walk'; agentRec.sprite.texture = poses.walk; }
      const next = stepToward(ag, ag.target, WALK_SPEED * dt);
      ag.gx = next.gx; ag.gy = next.gy;
    } else {
      idleTimer += dt;
      const home = idleTimer > 14 ? pickIdleSpot() : AGENT_HOME;
      const next = stepToward(ag, home, WALK_SPEED * dt);
      ag.gx = next.gx; ag.gy = next.gy;
      if (next.arrived) {
        const inst = INSTALLATIONS.find((i) => i.pose && Math.hypot(i.gx - ag.gx, i.gy - ag.gy) < 0.35);
        const want = inst ? inst.pose : 'idle';
        if (ag.pose !== want) {
          ag.pose = want;
          agentRec.sprite.texture = poses[want] || poses.idle;
          agentRec.sprite.y = toScreen(ag.gx, ag.gy).y + cy + TILE_H / 2 + (inst?.poseDy || 0);
        }
      }
    }
    const p = toScreen(ag.gx, ag.gy);
    agentRec.sprite.x = cx + p.x;
    const bob = ag.pose === 'walk' && !reduced ? Math.abs(Math.sin(elapsed * 7)) * -3 : 0;
    const poseDy = ag.pose === 'meditate' ? -30 : ag.pose === 'pullup' ? -62 : 0;
    agentRec.sprite.y = cy + p.y + TILE_H / 2 + bob + poseDy;
    agentRec.depth = depthOf(ag.gx, ag.gy) + 0.02;

    // hero ring follows her
    ring.clear();
    const rp = toScreen(ag.gx, ag.gy);
    ring.ellipse(cx + rp.x, cy + rp.y + TILE_H / 2, 52, 26)
        .fill({ color: 0xa855f7, alpha: 0.16 })
        .stroke({ color: 0xd6aaff, alpha: 0.55, width: 2 });

    // hovered building lifts and brightens
    buildings.forEach((rec, id) => {
      const on = state.hovered === id || state.focused === id;
      const want = on && !rec.est.reserved ? rec.baseY - 8 : rec.baseY;
      rec.sprite.y += (want - rec.sprite.y) * Math.min(1, dt * 9);
      if (state.access[id] === 'active' && !rec.est.reserved) {
        const target = on ? 0xffffff : 0xe8e4ff;
        rec.sprite.tint = target;
      }
    });

    sortLayer.children.sort((a, b) => {
      const ra = entities.find((e) => e.sprite === a);
      const rb = entities.find((e) => e.sprite === b);
      return (ra?.depth ?? 0) - (rb?.depth ?? 0);
    });
  });

  function pickIdleSpot() {
    const withPose = INSTALLATIONS.filter((i) => i.pose);
    const pick = withPose[Math.floor(elapsed / 14) % withPose.length];
    return { gx: pick.gx, gy: pick.gy };
  }

  applyAccess();
  drawConduits(0);

  // ---- public API ---------------------------------------------------------
  return {
    setAccess(map) { Object.assign(state.access, map); applyAccess(); },
    setError(on) { state.error = !!on; },
    setFocus(id) { state.focused = id; emitHover(); },
    getSelectable: () => SELECTABLE,
    destroy() {
      ro.disconnect();
      host.removeEventListener('pointermove', onPointerMove);
      app.destroy(true, { children: true });
    },
  };
}
