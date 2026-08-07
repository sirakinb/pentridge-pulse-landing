// Imperative PixiJS scene. Deliberately framework-free — no @pixi/react, which
// requires React 19 and this app is on React 18. React owns the DOM overlay and
// all interaction *semantics*; this file owns pixels only.

import { TILE_W, TILE_H, toScreen, depthOf, stepToward } from './iso';
import { paletteAt } from './daylight';
import {
  ESTABLISHMENTS, SELECTABLE, INSTALLATIONS, PROPS, NPC_SPOTS, HUB, AGENT_HOME,
} from '../data/establishments';

const SCENE_W = 1900;
const SCENE_H = 1150;
const GROUND_R = 8;
const WALK_SPEED = 2.6; // grid units per second

const A = '/labs-world';
const SKY_GRAD_H = 1150;   // full scene height — a short gradient leaves a seam

function mixHex(a, b, t) {
  const ar = (a >> 16) & 255; const ag = (a >> 8) & 255; const ab = a & 255;
  const br = (b >> 16) & 255; const bg = (b >> 8) & 255; const bb = b & 255;
  return (Math.round(ar + (br - ar) * t) << 16)
       | (Math.round(ag + (bg - ag) * t) << 8)
       | Math.round(ab + (bb - ab) * t);
}

export async function createWorld({ host, agent = 'adzo', onHoverChange, onSelect, pinPose = null }) {
  const PIXI = await import('pixi.js');
  const { Application, Container, Sprite, Graphics, Texture, BlurFilter, Text } = PIXI;

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
  // Load textures with plain Image elements instead of Pixi's Assets pipeline.
  //
  // Assets.load hangs under this Vite production build — not rejects, hangs —
  // so nothing ever settles and no catch fires. It works in dev, which makes it
  // the worst failure shape: invisible until deployed. Disabling the worker
  // decoder (preferWorkers: false) did not help.
  //
  // For 44 static sprites the Assets resolver, cache and worker buy us nothing.
  // An <img> always terminates: onload, onerror, or our timeout. No silent hang
  // is possible.
  function loadTexture(url) {
    return new Promise((resolve) => {
      let settled = false;
      const finish = (t) => { if (!settled) { settled = true; resolve(t); } };
      const img = new Image();
      img.onload = () => {
        try { finish(Texture.from(img)); } catch { finish(Texture.EMPTY); }
      };
      img.onerror = () => finish(Texture.EMPTY);
      setTimeout(() => finish(Texture.EMPTY), 9000);
      img.src = url;
    });
  }

  const tex = {};
  await Promise.all(manifest.map(async (url) => { tex[url] = await loadTexture(url); }));

  // ---- layers -------------------------------------------------------------
  const root = new Container();
  const skyLayer = new Container();
  const groundLayer = new Container();
  const sortLayer = new Container();   // everything depth-sorted
  const weatherLayer = new Container();
  const markerLayer = new Container();   // always above the world
  root.addChild(skyLayer, groundLayer, sortLayer, markerLayer, weatherLayer);
  app.stage.addChild(root);

  // ---- sky + distant city -------------------------------------------------
  const sky = new Graphics();
  skyLayer.addChild(sky);
  const starField = Array.from({ length: 420 }, () => ({
    x: Math.random() * SCENE_W,
    y: Math.random() * 330,
    r: Math.random() < 0.85 ? 1 : 1.6,
    a: 0.25 + Math.random() * 0.6,
  }));
  const stars = new Graphics();
  skyLayer.addChild(stars);
  function drawSky(pal) {
    sky.clear();
    // banded rather than per-pixel: 1150 draw calls per redraw is wasteful and
    // the banding is invisible at this contrast
    const BANDS = 128;
    const bh = SKY_GRAD_H / BANDS;
    for (let i = 0; i < BANDS; i++) {
      const c = mixHex(pal.skyTop, pal.skyBottom, i / BANDS);
      sky.rect(0, i * bh, SCENE_W, bh + 1).fill({ color: c, alpha: 1 });
    }
    stars.clear();
    if (pal.starAlpha > 0.01) {
      starField.forEach((st) => {
        stars.circle(st.x, st.y, st.r).fill({ color: 0xced2ff, alpha: st.a * pal.starAlpha });
      });
    }
  }

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
      s.tint = 0x8f8fb4; s.alpha = 0.5; s.__skyline = true;
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
          const act = state.activity[e.id] || 0;
          const wave = Math.sin(pulse * (1.4 + act * 1.8) - t * 5);
          alpha += Math.max(0, wave) * (0.16 + act * 0.22);
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
  INSTALLATIONS.forEach((i) => {
    const rec = place(tex[i.art], i.gx, i.gy);
    if (rec && i.scale) rec.sprite.scale.set(i.scale);
  });
  NPC_SPOTS.forEach(([gx, gy], i) => place(tex[`${A}/npc-${i}.webp`], gx, gy));

  // hub
  place(tex[HUB.art], HUB.gx, HUB.gy, { scale: 1 })?.sprite.scale.set(0.42);

  // Contact shadows. Without these every sprite floats on the plate and the
  // scene reads as stickers on a background rather than objects on a surface.
  const shadows = new Graphics();
  // Blurred and light. A hard black ellipse reads as a hole in the ground
  // rather than a shadow — the softness is what sells contact.
  const shadowBox = new Container();
  shadowBox.filters = [new BlurFilter({ strength: 7, quality: 2 })];
  shadowBox.alpha = 0.5;
  shadowBox.addChild(shadows);
  groundLayer.addChild(shadowBox);
  function drawShadows() {
    shadows.clear();
    entities.forEach((rec) => {
      if (rec.noShadow) return;
      const p = toScreen(rec.gx, rec.gy);
      // footprint, not sprite height — a tall tower still sits on a small base
      const w = Math.min((rec.sprite.width || 40) * 0.34, 96);
      shadows.ellipse(cx + p.x, cy + p.y + TILE_H / 2 - 1, w, w * 0.40)
             .fill({ color: 0x05040a, alpha: 0.5 });
    });
  }

  // agent glow ring, drawn under her
  const ring = new Graphics();
  groundLayer.addChild(ring);

  // buildings — the only hit-testable things in the scene
  const buildings = new Map();
  ESTABLISHMENTS.forEach((e) => {
    const rec = place(tex[e.art], e.gx, e.gy + (e.gyNudge || 0));
    if (!rec) return;
    if (e.scale) rec.sprite.scale.set(e.scale);
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
  agentRec.sprite.anchor.set(0.5, 1); // pivot at the feet: squash and lean hinge there
  // Rest scale is captured once. Deriving it from sprite.scale each frame makes
  // the squash multiplier compound and the agent grows off-screen within seconds.
  const AGENT_SCALE = { x: agentRec.sprite.scale.x, y: agentRec.sprite.scale.y };
  const poses = {
    walk: tex[`${A}/${agent}.webp`],
    idle: tex[`${A}/${agent}.webp`],
    meditate: tex[`${A}/adzo-meditate.webp`],
    pullup: tex[`${A}/adzo-pullup.webp`],
  };


  // ---- in-world markers ---------------------------------------------------
  // Rally's world reads as alive largely because information lives IN the
  // scene — status pins above each site, names under each character — instead
  // of being pushed out into UI chrome. These are the same idea.

  const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

  function makePin(label, sub, accent) {
    const c = new Container();
    const t1 = new Text({ text: label, style: { fontFamily: MONO, fontSize: 15, fontWeight: '700', fill: 0xffffff } });
    const t2 = new Text({ text: sub, style: { fontFamily: MONO, fontSize: 13, fill: accent } });
    t1.x = 12; t1.y = 7;
    t2.x = 12; t2.y = 25;
    const w = Math.max(t1.width, t2.width) + 24;
    const h = sub ? 46 : 28;
    const bg = new Graphics();
    bg.roundRect(0, 0, w, h, 8).fill({ color: 0x0b0a14, alpha: 0.9 })
      .stroke({ color: accent, alpha: 0.5, width: 1 });
    bg.moveTo(w / 2 - 6, h).lineTo(w / 2 + 6, h).lineTo(w / 2, h + 8).fill({ color: 0x0b0a14, alpha: 0.9 });
    c.addChild(bg, t1, t2);
    c.pivot.set(w / 2, h + 8);
    return c;
  }

  const pins = new Map();
  function refreshPins() {
    pins.forEach((p) => markerLayer.removeChild(p));
    pins.clear();
    ESTABLISHMENTS.forEach((e) => {
      const rec = buildings.get(e.id);
      if (!rec) return;
      const st = state.access[e.id];
      let sub = '';
      let accent = 0x8b7bf0;
      if (e.reserved) { sub = 'reserved'; accent = 0x5a5a72; }
      else if (st === 'dormant') { sub = 'locked'; accent = 0x6c5aa8; }
      else {
        const a = state.signals[e.id];
        sub = a || 'open';
        accent = a ? 0x22d3ee : 0x8b7bf0;
      }
      const pin = makePin(e.name, sub, accent);
      const p = toScreen(e.gx, e.gy + (e.gyNudge || 0));
      pin.x = cx + p.x;
      pin.y = Math.max(cy + p.y + TILE_H / 2 - rec.sprite.height - 16, view.top + 46);
      pin.alpha = 0.94;
      markerLayer.addChild(pin);
      pins.set(e.id, pin);
    });
  }

  // name plate under the agent, the way Rally labels "Riley / AI Employee"
  const namePlate = makePin('Adzo', 'AI agent', 0xd6aaff);
  namePlate.scale.set(0.82);
  markerLayer.addChild(namePlate);

  // ---- state --------------------------------------------------------------
  const state = {
    access: Object.fromEntries(ESTABLISHMENTS.map((e) => [e.id, 'active'])),
    // 0 = neutral baseline (quiet, still lit), 1 = busy. Never darkens a
    // building — dark is reserved for dormant, so quiet can't read as locked.
    activity: Object.fromEntries(ESTABLISHMENTS.map((e) => [e.id, 0])),
    signals: {},   // short human strings shown on each pin
    error: false,
    hourOverride: null,
    hovered: null,
    focused: null,
    agent: { gx: AGENT_HOME.gx, gy: AGENT_HOME.gy, target: null, pose: 'idle', poseT: 0 },
  };

  function applyAccess() {
    buildings.forEach((rec, id) => {
      const st = state.access[id];
      const e = rec.est;
      if (e.reserved) { rec.sprite.tint = 0x8f88b8; rec.sprite.alpha = 0.9; return; }
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
  // Daylight wash. Deliberately a LIFT, not a grey flatten — the "couldn't
  // load" state is the only thing allowed to drain the world of colour, and
  // the two must never be confusable.
  const daylight = new Graphics();
  daylight.rect(0, 0, SCENE_W, SCENE_H).fill({ color: 0xffffff });
  daylight.alpha = 0;
  weatherLayer.addChild(daylight);

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
  // Camera sits IN the plaza rather than above the whole diorama. Framing the
  // entire scene made every building small and unreadable; overscanning past
  // the frame edge is what makes it feel like a place you're standing in.
  const ZOOM = 1.20;
  const FOCUS_Y = 0.50; // centred: sky above and park below must both survive the crop
  // Markers must stay inside the frame. The camera overscans, so anything
  // pinned to a sprite near an edge — a status pin on the far building, the
  // name plate when the agent walks to the foreground — runs off screen.
  const view = { top: 0, bottom: SCENE_H };
  function layout() {
    const w = host.clientWidth || 1;
    const h = host.clientHeight || 1;
    const scale = Math.min(w / SCENE_W, h / SCENE_H) * ZOOM;
    root.scale.set(scale);
    root.x = (w - SCENE_W * scale) / 2 + parallax.x;
    root.y = (h - SCENE_H * scale) * FOCUS_Y + parallax.y;
    view.top = -root.y / scale;
    view.bottom = (h - root.y) / scale;
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
  let lastClock = -99;
  let pal = null;
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  app.ticker.add((ticker) => {
    const dt = ticker.deltaMS / 1000;
    elapsed += dt;

    // time of day — recomputed lazily, it only moves once a minute
    if (elapsed - lastClock > 2 || pal === null) {
      lastClock = elapsed;
      // null override => stay at night. See the note in LabsWorld.jsx.
      const h = state.hourOverride ?? 22;
      pal = paletteAt(h);
      drawSky(pal);
      auroraBox.alpha = pal.auroraAlpha;
      skyLayer.children.forEach((c) => {
        if (c.__skyline) c.alpha = 0.5 * (0.45 + 0.55 * (1 - pal.starAlpha) * 0 + pal.starAlpha * 0.55 + 0.45);
      });
      daylight.tint = pal.ambient;
      daylight.alpha = pal.ambientAlpha;
      groundLayer.alpha = 0.55 + 0.45 * pal.glow;
    }

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
      ag.idleTarget = null; ag.dwell = 0; ag.poseDy = 0;
      if (ag.pose !== 'walk') { ag.pose = 'walk'; agentRec.sprite.texture = poses.walk; }
      const next = stepToward(ag, ag.target, WALK_SPEED * dt);
      ag.gx = next.gx; ag.gy = next.gy;
    } else if (pinPose) {
      // debug: hold the agent at one installation so its pose offset can be
      // eyeballed without waiting out the idle cycle
      const inst = INSTALLATIONS.find((i) => i.pose === pinPose);
      if (inst) {
        ag.gx = inst.gx; ag.gy = inst.gy;
        if (ag.pose !== inst.pose) {
          ag.pose = inst.pose;
          ag.poseDy = inst.poseDy || 0;
          agentRec.sprite.texture = poses[inst.pose] || poses.idle;
        }
      }
    } else {
      idleTimer += dt;
      // Pick an idle spot ONCE and stay there. Recomputing the destination
      // every frame from elapsed time made it flip mid-walk, so she never
      // arrived long enough to hold a pose and just drifted between props.
      if (idleTimer > 12 && !ag.idleTarget) {
        const spots = INSTALLATIONS.filter((i) => i.pose);
        ag.idleTarget = spots[Math.floor(Math.random() * spots.length)];
        ag.dwell = 0;
      }
      const dest = ag.idleTarget || AGENT_HOME;
      const next = stepToward(ag, dest, WALK_SPEED * dt);
      ag.gx = next.gx; ag.gy = next.gy;

      if (next.arrived) {
        const want = ag.idleTarget?.pose || 'idle';
        if (ag.pose !== want) {
          ag.pose = want;
          ag.poseDy = ag.idleTarget?.poseDy || 0;
          agentRec.sprite.texture = poses[want] || poses.idle;
        }
        if (ag.idleTarget) {
          ag.dwell += dt;
          if (ag.dwell > 16) {          // finish the activity, then head home
            ag.idleTarget = null;
            ag.dwell = 0;
            idleTimer = 0;
            ag.pose = 'idle';
            ag.poseDy = 0;
            agentRec.sprite.texture = poses.idle;
          }
        }
      } else if (ag.pose !== 'walk') {
        ag.pose = 'walk';
        ag.poseDy = 0;
        agentRec.sprite.texture = poses.walk;
      }
    }

    const p = toScreen(ag.gx, ag.gy);
    agentRec.sprite.x = cx + p.x;

    const moving = ag.pose === 'walk' && !reduced;
    const stride = elapsed * 7.4;

    // footfall: two bounces per cycle, with a matching squash on landing
    const bob = moving ? Math.abs(Math.sin(stride)) * -4 : 0;
    const land = moving ? Math.max(0, -Math.cos(stride * 2)) : 0;

    // flip to face travel, and lean slightly into it
    if (moving) {
      const dx = (ag.target?.gx ?? ag.gx) - ag.gx;
      const dy = (ag.target?.gy ?? ag.gy) - ag.gy;
      const screenDir = dx - dy;
      if (Math.abs(screenDir) > 0.05) ag.flip = screenDir < 0 ? -1 : 1;
      ag.lean = Math.max(-0.07, Math.min(0.07, screenDir * 0.02));
    } else {
      ag.lean = (ag.lean || 0) * 0.9;
    }
    agentRec.sprite.scale.x = AGENT_SCALE.x * (ag.flip || 1) * (1 + land * 0.05);
    agentRec.sprite.scale.y = AGENT_SCALE.y * (1 - land * 0.06);
    agentRec.sprite.rotation = ag.pose === 'walk' ? (ag.lean || 0) : (ag.lean || 0) * 0.4;

    const poseDy = ag.pose === 'idle' || ag.pose === 'walk' ? 0 : (ag.poseDy || 0);
    agentRec.sprite.y = cy + p.y + TILE_H / 2 + bob + poseDy;
    agentRec.depth = depthOf(ag.gx, ag.gy) + 0.02;

    // hero ring follows her
    ring.clear();
    const rp = toScreen(ag.gx, ag.gy);
    const pulse = ag.pose === 'walk' && !reduced ? Math.max(0, -Math.cos(elapsed * 14.8)) : 0;
    ring.ellipse(cx + rp.x, cy + rp.y + TILE_H / 2, 52 + pulse * 7, 26 + pulse * 3.5)
        .fill({ color: 0xa855f7, alpha: 0.16 + pulse * 0.1 })
        .stroke({ color: 0xd6aaff, alpha: 0.55, width: 2 });

    drawShadows();

    // name plate tracks the agent, just under her feet
    namePlate.x = cx + p.x;
    const feet = cy + p.y + TILE_H / 2;
    const below = feet + 58;
    namePlate.y = below > view.bottom - 26
      ? feet - agentRec.sprite.height - 10   // flip above her head near the edge
      : below;

    // pins ride their building's hover lift
    pins.forEach((pin, id) => {
      const rec = buildings.get(id);
      if (!rec) return;
      const on = state.hovered === id || state.focused === id;
      pin.scale.set(on ? 1.06 : 1);
      pin.alpha = on ? 1 : 0.9;
      const want = cy + toScreen(rec.gx, rec.gy + (rec.est.gyNudge || 0)).y + TILE_H / 2
                 - rec.sprite.height - 16 - (on ? 10 : 0);
      pin.y += (Math.max(want, view.top + 46) - pin.y) * Math.min(1, dt * 9);
    });

    // hovered building lifts and brightens
    buildings.forEach((rec, id) => {
      const on = state.hovered === id || state.focused === id;
      const want = on && !rec.est.reserved ? rec.baseY - 8 : rec.baseY;
      rec.sprite.y += (want - rec.sprite.y) * Math.min(1, dt * 9);
      if (state.access[id] === 'active' && !rec.est.reserved) {
        const base = rec.est.baseTint ?? 0xe8e4ff;
        const act = state.activity[id] || 0;
        // busier buildings sit brighter, and breathe very slightly
        const breathe = act > 0 && !reduced ? Math.sin(elapsed * 1.4 + rec.depth) * 0.02 * act : 0;
        let tint = base;
        for (let k = 0; k < Math.round(act * 3); k++) tint = lighten(tint, 10);
        rec.sprite.tint = on ? lighten(tint) : tint;
        rec.sprite.alpha = 1 + breathe;
      }
    });

    sortLayer.children.sort((a, b) => {
      const ra = entities.find((e) => e.sprite === a);
      const rb = entities.find((e) => e.sprite === b);
      return (ra?.depth ?? 0) - (rb?.depth ?? 0);
    });
  });

  // nudge a tint toward white without blowing it out
  function lighten(c, amt = 34) {
    const r = Math.min(255, ((c >> 16) & 255) + amt);
    const g = Math.min(255, ((c >> 8) & 255) + amt);
    const b = Math.min(255, (c & 255) + amt);
    return (r << 16) | (g << 8) | b;
  }

  applyAccess();
  refreshPins();
  drawConduits(0);

  // ---- public API ---------------------------------------------------------
  return {
    setAccess(map) { Object.assign(state.access, map); applyAccess(); refreshPins(); },
    setActivity(map) { Object.assign(state.activity, map); },
    setSignals(map) { Object.assign(state.signals, map); refreshPins(); },
    setError(on) { state.error = !!on; },
    setHour(h) { state.hourOverride = h; lastClock = -99; },
    setFocus(id) { state.focused = id; emitHover(); },
    // Marketing pages mount the world inside a long scroll. Stopping the ticker
    // while it is off-screen keeps a landing page from animating a scene nobody
    // is looking at; the workspace never calls this.
    setPaused(on) { if (on) app.ticker.stop(); else app.ticker.start(); },
    getSelectable: () => SELECTABLE,
    destroy() {
      ro.disconnect();
      host.removeEventListener('pointermove', onPointerMove);
      app.destroy(true, { children: true });
    },
  };
}
