import { ArrowUpRight, Lock } from 'lucide-react';
import { SELECTABLE } from '../data/establishments';

// The world is strictly additive. This is what renders on mobile, without
// WebGL, under prefers-reduced-motion, or if the engine chunk fails to load —
// so the workspace never depends on the canvas to be usable.
const WorldCardGrid = ({ subscribed, email, onCheckout, reason }) => (
  <div>
    {reason && (
      <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/25 mb-6">
        {reason}
      </p>
    )}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {SELECTABLE.map((e) => {
        const unlocked = subscribed && e.url;
        const Tile = unlocked ? 'a' : 'div';
        return (
          <Tile
            key={e.id}
            {...(unlocked
              ? {
                  href: `${e.url}${e.url.includes('?') ? '&' : '?'}email=${encodeURIComponent(email || '')}`,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                }
              : {})}
            onClick={!subscribed ? () => onCheckout?.() : undefined}
            className={`group relative rounded-2xl border p-6 transition-all duration-300 ${
              unlocked
                ? 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06] cursor-pointer'
                : 'border-white/5 bg-white/[0.02] cursor-pointer'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className={unlocked ? '' : 'opacity-40'}>
                <h3 className="text-lg font-bold text-white">{e.name}</h3>
                <p className="text-xs text-white/40 font-mono">{e.subtitle}</p>
              </div>
              {unlocked ? (
                <span className="inline-flex items-center gap-1.5 text-sm font-mono text-white/40 group-hover:text-white/80 transition-colors">
                  Open <ArrowUpRight className="w-4 h-4" />
                </span>
              ) : e.url ? (
                <Lock className="w-4 h-4 text-white/20" />
              ) : (
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/25">Soon</span>
              )}
            </div>
          </Tile>
        );
      })}
    </div>
  </div>
);

export default WorldCardGrid;
