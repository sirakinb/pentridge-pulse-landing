import { useCallback, useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

// Background music for the world.
//
// Off by default, and that is deliberate rather than cautious: browsers block
// autoplay with sound, so an unmuted default would either be silently refused
// or — worse, where it is allowed — play audio at someone who did not ask for
// it. The choice is remembered, so it is a one-time click per person.
//
// Drop any track you hold the rights to at public/labs-world/ambient.mp3.

const SRC = '/labs-world/ambient.mp3';
const KEY = 'pentridge-labs-world-audio';
const VOLUME = 0.32;

const AmbientAudio = () => {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  const [available, setAvailable] = useState(true);

  // only show the control if a track is actually present
  useEffect(() => {
    let cancelled = false;
    fetch(SRC, { method: 'HEAD' })
      .then((r) => { if (!cancelled) setAvailable(r.ok); })
      .catch(() => { if (!cancelled) setAvailable(false); });
    return () => { cancelled = true; };
  }, []);

  // restore the previous choice, but never start audio without a gesture
  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === 'on') setOn(true);
    } catch { /* private mode */ }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    el.volume = 0;
    if (on) {
      const p = el.play();
      if (p?.catch) p.catch(() => setOn(false)); // autoplay refused
    } else {
      el.pause();
    }
    // fade rather than cut, so toggling is not jarring
    let raf;
    const target = on ? VOLUME : 0;
    const step = () => {
      if (!ref.current) return;
      const d = target - ref.current.volume;
      if (Math.abs(d) < 0.01) { ref.current.volume = target; return; }
      ref.current.volume = Math.max(0, Math.min(1, ref.current.volume + d * 0.08));
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [on]);

  // do not play to an empty room
  useEffect(() => {
    const onVis = () => {
      const el = ref.current;
      if (!el) return;
      if (document.hidden) el.pause();
      else if (on) el.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [on]);

  const toggle = useCallback(() => {
    setOn((v) => {
      const next = !v;
      try { localStorage.setItem(KEY, next ? 'on' : 'off'); } catch { /* ignore */ }
      return next;
    });
  }, []);

  if (!available) return null;

  return (
    <>
      <audio ref={ref} src={SRC} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-label={on ? 'Mute background music' : 'Play background music'}
        aria-pressed={on}
        className="absolute right-5 bottom-5 z-30 grid h-10 w-10 place-items-center rounded-full
                   border border-white/15 bg-black/60 backdrop-blur text-white/50
                   hover:text-white hover:border-white/30 transition-colors"
      >
        {on ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </button>
    </>
  );
};

export default AmbientAudio;
