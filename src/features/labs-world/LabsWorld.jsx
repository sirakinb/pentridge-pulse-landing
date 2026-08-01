import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { SELECTABLE, ESTABLISHMENTS } from './data/establishments';
import WorldCardGrid from './fallback/WorldCardGrid';

// Presentation layer only. Every entitlement decision arrives as a prop from
// LabsWorkspace — this component never fetches subscription state, never talks
// to auth, and never routes. If it were deleted the workspace still works.

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch { return false; }
}

const LabsWorld = ({ user, sub, subError, onCheckout }) => {
  const hostRef = useRef(null);
  const worldRef = useRef(null);
  const [engineState, setEngineState] = useState('idle'); // idle|loading|ready|failed
  const [hover, setHover] = useState(null);
  const [focusId, setFocusId] = useState(null);
  const [locked, setLocked] = useState(null);
  const [narrow, setNarrow] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false,
  );

  const subscribed = sub?.has_subscription === true;
  const email = user?.email;

  const accessMap = useMemo(() => {
    const m = {};
    ESTABLISHMENTS.forEach((e) => {
      if (e.reserved) m[e.id] = 'reserved';
      // Access gates everything, including apps that haven't shipped. Leaving an
      // unshipped building lit while the rest of the district is dark reads as
      // "that one's open" — the neutral-active baseline is about missing
      // *activity data*, not about entitlement.
      else m[e.id] = subscribed ? 'active' : 'dormant';
    });
    return m;
  }, [subscribed]);

  useEffect(() => {
    const onResize = () => setNarrow(window.innerWidth < 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const reduced = typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const canRender = !narrow && !reduced && hasWebGL();

  const handleSelect = useCallback((est, access) => {
    if (access === 'dormant') { setLocked(est); return; }
    if (!est.url) { setLocked({ ...est, soon: true }); return; }
    const sep = est.url.includes('?') ? '&' : '?';
    window.open(`${est.url}${sep}email=${encodeURIComponent(email || '')}`, '_blank', 'noopener');
  }, [email]);

  // Boot the engine. Chunk is only fetched here, so the marketing site and
  // every other route keep their current bundle exactly.
  useEffect(() => {
    if (!canRender || !hostRef.current || worldRef.current) return;
    let cancelled = false;
    setEngineState('loading');
    (async () => {
      try {
        const { createWorld } = await import('./engine/world');
        if (cancelled || !hostRef.current) return;
        const w = await createWorld({
          host: hostRef.current,
          agent: 'adzo',
          onHoverChange: setHover,
          onSelect: handleSelect,
        });
        if (cancelled) { w?.destroy(); return; }
        worldRef.current = w;
        setEngineState(w ? 'ready' : 'failed');
      } catch (err) {
        console.error('Labs world failed to start:', err);
        if (!cancelled) setEngineState('failed');
      }
    })();
    return () => {
      cancelled = true;
      worldRef.current?.destroy();
      worldRef.current = null;
    };
  }, [canRender, handleSelect]);

  useEffect(() => { worldRef.current?.setAccess(accessMap); }, [accessMap, engineState]);
  useEffect(() => { worldRef.current?.setError(!!subError); }, [subError, engineState]);
  useEffect(() => { worldRef.current?.setFocus(focusId); }, [focusId, engineState]);

  const onKeyDown = (e) => {
    const ids = SELECTABLE.map((s) => s.id);
    const i = ids.indexOf(focusId);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault(); setFocusId(ids[(i + 1 + ids.length) % ids.length]);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault(); setFocusId(ids[(i - 1 + ids.length) % ids.length]);
    } else if ((e.key === 'Enter' || e.key === ' ') && focusId) {
      e.preventDefault();
      const est = SELECTABLE.find((s) => s.id === focusId);
      if (est) handleSelect(est, accessMap[est.id]);
    } else if (e.key === 'Escape') {
      setFocusId(null);
    }
  };

  if (!canRender || engineState === 'failed') {
    return (
      <WorldCardGrid
        subscribed={subscribed}
        email={email}
        onCheckout={onCheckout}
        reason={
          narrow ? 'Compact view — the world needs a wider screen'
          : reduced ? 'Reduced-motion view'
          : engineState === 'failed' ? 'Simplified view'
          : 'Simplified view'
        }
      />
    );
  }

  const agentLine = subError
    ? 'One moment — I can’t reach the hub.'
    : !subscribed
      ? 'Most of the district is dark. Unlock it to move in.'
      : hover
        ? `${hover.est.name} — ${hover.est.subtitle}`
        : `Welcome back${user?.profile?.name ? `, ${user.profile.name.split(' ')[0]}` : ''}.`;

  return (
    <div className="relative">
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

        {/* floating building card — DOM, not canvas, so it stays crisp.
            Clamped inside the frame: a tall building near the top edge would
            otherwise push the card out through the container's overflow. */}
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
                {hover.access === 'dormant'
                  ? <span className="text-purple-300">Unlock with Pentridge Labs</span>
                  : hover.est.url
                    ? <span className="text-white/35">Enter ↗</span>
                    : <span className="text-white/35">Coming soon</span>}
              </p>
            </div>
          </div>
        )}

        {/* the agent's line */}
        {engineState === 'ready' && (
          <div className="absolute left-6 bottom-6 z-20 max-w-sm">
            <div className="rounded-xl border border-purple-500/25 bg-black/70 backdrop-blur px-4 py-2.5">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-purple-300/70 mb-0.5">Adzo</p>
              <p className="text-sm text-white/80">{agentLine}</p>
            </div>
          </div>
        )}

        {/* Real focusable controls. The canvas is aria-hidden; these are what
            keyboard and screen-reader users actually operate. */}
        <div
          className="absolute inset-0 z-10 outline-none"
          tabIndex={0}
          role="application"
          aria-label="Pentridge Labs world. Use arrow keys to move between apps, Enter to open."
          onKeyDown={onKeyDown}
          onBlur={() => setFocusId(null)}
        >
          <ul className="sr-only">
            {SELECTABLE.map((e) => (
              <li key={e.id}>
                <button
                  type="button"
                  onFocus={() => setFocusId(e.id)}
                  onClick={() => handleSelect(e, accessMap[e.id])}
                >
                  {e.name} — {e.subtitle} —{' '}
                  {accessMap[e.id] === 'dormant' ? 'locked, unlock with Pentridge Labs' : 'open'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* locked → the existing checkout, unchanged */}
      {locked && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/80 backdrop-blur-sm px-6"
          onClick={() => setLocked(null)}
        >
          <div
            className="max-w-md w-full rounded-2xl border border-purple-500/30 bg-[#0b0b12] p-8"
            onClick={(ev) => ev.stopPropagation()}
          >
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-white/40 mb-3">
              {locked.soon ? 'In development' : 'Locked'}
            </p>
            <h3 className="font-display text-2xl text-white mb-2">{locked.name}</h3>
            <p className="text-white/50 text-sm mb-7">
              {locked.soon
                ? `${locked.name} isn’t open yet. It’s reserved on the map and will light up when it ships.`
                : 'One Pentridge Labs subscription lights up every building in the district. No per-tool fees.'}
            </p>
            {!locked.soon && (
              <button
                onClick={() => { setLocked(null); onCheckout?.(); }}
                className="w-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-6 py-3 text-white font-medium transition-all"
              >
                <Sparkles className="w-4 h-4 inline mr-2" />
                Unlock Pentridge Labs
              </button>
            )}
            <button
              onClick={() => setLocked(null)}
              className="w-full mt-3 px-6 py-2.5 text-white/40 hover:text-white/70 text-sm transition-colors"
            >
              Back to the world
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabsWorld;
