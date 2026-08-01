import { useEffect, useState } from 'react';
import { labsInsforge } from '../../../lib/labsInsforge';

// Activity signals hydrate AFTER first paint and never gate it. The world draws
// immediately from entitlement alone; these only change how busy it looks.
//
// A failure here is deliberately silent: the world falls back to the neutral
// active baseline, which reads as "quiet", never as "broken". The overcast
// error weather is reserved for losing the subscription check itself.

export function useWorldSignals({ enabled }) {
  const [signals, setSignals] = useState(null);

  useEffect(() => {
    if (!enabled) return undefined;
    let cancelled = false;

    // let the canvas settle before spending network on ambience
    const t = setTimeout(async () => {
      try {
        const { data, error } = await labsInsforge.functions.invoke('world-signals', {
          method: 'GET',
        });
        if (!cancelled && !error && data) setSignals(data);
      } catch {
        /* stay at the neutral baseline */
      }
    }, 600);

    return () => { cancelled = true; clearTimeout(t); };
  }, [enabled]);

  return signals;
}

// Turn raw counts into something the agent can say. Only speaks about apps that
// actually reported — it never invents activity for an app with no data.
export function signalLines(signals) {
  if (!signals) return [];
  const out = [];
  const c = signals.crm;
  if (c) {
    if (c.open_deals > 0) {
      out.push(`You have ${c.open_deals} open deal${c.open_deals === 1 ? '' : 's'} in the CRM.`);
    }
    if (c.tasks_due > 0) {
      out.push(`${c.tasks_due} follow-up${c.tasks_due === 1 ? '' : 's'} waiting on you.`);
    }
    if (!c.open_deals && !c.tasks_due) out.push('Pipeline is clear. Nothing needs you right now.');
  }
  if (signals.dropcard?.connections > 0) {
    out.push(`${signals.dropcard.connections} new Drop Card connection${signals.dropcard.connections === 1 ? '' : 's'}.`);
  }
  if (signals.pm?.active_projects > 0) {
    out.push(`${signals.pm.active_projects} project${signals.pm.active_projects === 1 ? '' : 's'} running in PM.`);
  }
  return out;
}

// How busy each building looks. 0 = neutral baseline (never dark — that's what
// dormant means), 1 = fully lit and bustling.
export function activityOf(signals, id) {
  if (!signals) return 0;
  if (id === 'crm' && signals.crm) {
    return Math.min(1, (signals.crm.open_deals + signals.crm.tasks_due) / 12);
  }
  if (id === 'pm' && signals.pm) {
    return Math.min(1, (signals.pm.active_projects || 0) / 8);
  }
  if (id === 'dropcard' && signals.dropcard) {
    return Math.min(1, (signals.dropcard.connections || 0) / 10);
  }
  if (id === 'voiyce' && signals.voiyce) return signals.voiyce.online ? 1 : 0;
  return 0;
}
