import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { SELECTABLE, ESTABLISHMENTS } from './data/establishments';

// The marketing-page version of the world.
//
// Same engine, same art, none of the workspace's plumbing: no auth, no
// subscription lookup, no live signals, no checkout modal, no background music.
// Every building sits at the subscribed "active" state because that is what the
// section is showing you — the workspace as it looks once you're in. Nothing
// here invents numbers: the status pins the workspace fills from real app data
// stay empty rather than displaying made-up activity.
//
// Cost control matters more here than in the workspace. This lives halfway down
// a long page, so the engine chunk (Pixi + ~44 sprites) is only fetched once the
// section is close to the viewport, and the ticker stops whenever it scrolls
// away again.

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch { return false; }
}

const LINES = [
  'This is the district. Every building is one of the tools.',
  'Hover a building to see what lives inside it.',
  'One subscription lights up the whole map.',
];

const WorldPreview = () => {
  const sectionRef = useRef(null);
  const hostRef = useRef(null);
  const worldRef = useRef(null);
  const [engineState, setEngineState] = useState('idle'); // idle|loading|ready|failed
  const [armed, setArmed] = useState(false);   // near the viewport → start loading
  const [onScreen, setOnScreen] = useState(false);
  const [hover, setHover] = useState(null);
  const [narrow, setNarrow] = useState(true);
  const [supported, setSupported] = useState(false);

  // /labs is prerendered, so the first client render has to match the server's
  // — which is nothing. Capability is therefore measured after mount rather
  // than during render, and the section fades in a beat later.
  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    setSupported(!reduced && hasWebGL());
    const onResize = () => setNarrow(window.innerWidth < 1024);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const canRender = supported && !narrow;

  // Two observers, because the two questions have different answers. The armed
  // one fires early — a wide margin, so the scene is up by the time it is
  // scrolled to. The other is plain intersection, which is what the ticker
  // follows; sharing one observer would have "on screen" mean "within 500px"
  // and the scene would keep animating well out of view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !canRender || typeof IntersectionObserver === 'undefined') return undefined;
    const arm = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setArmed(true); arm.disconnect(); }
    }, { rootMargin: '500px 0px' });
    const visible = new IntersectionObserver((entries) => {
      entries.forEach((e) => setOnScreen(e.isIntersecting));
    });
    arm.observe(el);
    visible.observe(el);
    return () => { arm.disconnect(); visible.disconnect(); };
  }, [canRender]);

  const accessMap = useMemo(() => Object.fromEntries(
    ESTABLISHMENTS.map((e) => [e.id, e.reserved ? 'reserved' : 'active']),
  ), []);

  // No entitlement to check, so a click is just the product's front door — the
  // same destination the cards above this section point at.
  const handleSelect = useCallback((est) => {
    if (!est.url) return;
    window.open(est.url, '_blank', 'noopener');
  }, []);

  useEffect(() => {
    if (!armed || !canRender || !hostRef.current || worldRef.current) return undefined;
    let cancelled = false;
    setEngineState('loading');
    (async () => {
      try {
        const { createWorld } = await import('./engine/world');
        if (cancelled || !hostRef.current) return;
        const boot = setTimeout(() => { if (!cancelled) setEngineState('failed'); }, 15000);
        const w = await createWorld({
          host: hostRef.current,
          agent: 'adzo',
          onHoverChange: setHover,
          onSelect: handleSelect,
        });
        clearTimeout(boot);
        if (cancelled) { w?.destroy(); return; }
        worldRef.current = w;
        w?.setAccess(accessMap);
        setEngineState(w ? 'ready' : 'failed');
      } catch (err) {
        console.error('Labs world preview failed to start:', err);
        if (!cancelled) setEngineState('failed');
      }
    })();
    return () => {
      cancelled = true;
      worldRef.current?.destroy();
      worldRef.current = null;
    };
  }, [armed, canRender, handleSelect, accessMap]);

  useEffect(() => { worldRef.current?.setPaused(!onScreen); }, [onScreen, engineState]);

  const [lineIdx, setLineIdx] = useState(0);
  useEffect(() => {
    if (engineState !== 'ready' || !onScreen) return undefined;
    const t = setInterval(() => setLineIdx((i) => (i + 1) % LINES.length), 6000);
    return () => clearInterval(t);
  }, [engineState, onScreen]);

  // Nothing renders on phones, at reduced motion, or without WebGL. A frozen
  // still of an interactive scene would be selling something the visitor can't
  // touch, and the product cards directly above already carry the same content.
  if (!canRender || engineState === 'failed') return null;

  const agentLine = hover
    ? `${hover.est.name} — ${hover.est.subtitle}`
    : LINES[lineIdx];

  return (
    <section ref={sectionRef} className="py-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
            The Workspace
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-[#fafafa] mb-4">
            Your suite,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              as a place
            </span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Sign in and you land inside a command center. Every product is a building —
            hover one to look inside, click to walk in.
          </p>
        </div>

      <div
        className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#050509]"
        style={{ aspectRatio: '19 / 11' }}
      >
        <div ref={hostRef} className="absolute inset-0" />

        {engineState !== 'ready' && (
          <div className="absolute inset-0 grid place-items-center">
            <Loader2 className="w-6 h-6 animate-spin text-purple-400/70" />
          </div>
        )}

        {/* floating building card — DOM, not canvas, so it stays crisp, and
            clamped inside the frame so a tall building near an edge can't push
            it out through the container's overflow */}
        {hover && engineState === 'ready' && (
          <div
            className="pointer-events-none absolute z-20 -translate-x-1/2 transition-opacity duration-150"
            style={{
              left: `clamp(90px, ${hover.x}px, calc(100% - 90px))`,
              top: Math.max(12, hover.y - 92),
            }}
          >
            <div className="rounded-xl border border-white/15 bg-black/80 backdrop-blur px-4 py-2.5 shadow-2xl">
              <p className="text-sm font-bold text-white leading-tight">{hover.est.name}</p>
              <p className="text-[11px] font-mono text-white/45">{hover.est.subtitle}</p>
              <p className="text-[10px] font-mono uppercase tracking-wider mt-1.5">
                {hover.est.url
                  ? <span className="text-white/35">Visit {hover.est.url.replace(/^https?:\/\//, '')} ↗</span>
                  : <span className="text-white/35">Coming soon</span>}
              </p>
            </div>
          </div>
        )}

        {/* honest framing: this is the product, not a live account */}
        {engineState === 'ready' && (
          <div className="absolute left-5 top-5 z-20">
            <span className="rounded-full border border-white/15 bg-black/60 backdrop-blur px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
              Preview
            </span>
          </div>
        )}

        {engineState === 'ready' && (
          <div className="absolute left-6 bottom-6 z-20 max-w-sm">
            <div className="rounded-xl border border-purple-500/25 bg-black/70 backdrop-blur px-4 py-2.5">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-purple-300/70 mb-0.5">Adzo</p>
              <p className="text-sm text-white/80">{agentLine}</p>
            </div>
          </div>
        )}

        {/* The canvas is aria-hidden, so these are the real controls. Keyboard
            users get the same list of destinations a mouse user can click. */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <ul className="sr-only">
            {SELECTABLE.map((e) => (
              <li key={e.id}>
                <button type="button" onClick={() => handleSelect(e)}>
                  {e.name} — {e.subtitle} — {e.url ? `visit ${e.url}` : 'coming soon'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

        <p className="text-center text-sm text-white/35 mt-6">
          A preview of the signed-in workspace. One subscription lights up every building.{' '}
          <a href="#pricing" className="text-purple-300/80 hover:text-purple-200 transition-colors">
            See pricing ↓
          </a>
        </p>
      </div>
    </section>
  );
};

export default WorldPreview;
