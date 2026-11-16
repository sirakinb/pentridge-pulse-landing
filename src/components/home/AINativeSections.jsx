import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Database, Layers, KeyRound, Bot, Mail, UserCheck, CalendarCheck, Receipt } from 'lucide-react';

const BOOKING_URL = 'https://cal.com/akinyemi-bajulaiye-2jua88/30min';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7 },
};

// A framed "device" panel: a 1px outer bezel around the panel itself.
const Panel = ({ title, aside, children, className = '' }) => (
  <div className={`rounded-[20px] border border-white/10 bg-white/[0.02] p-2 ${className}`}>
    <div className="rounded-[14px] border border-white/10 bg-[#0a0a0a] overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3.5">
        <span className="text-sm text-white/85">{title}</span>
        {aside}
      </div>
      {children}
    </div>
  </div>
);

const LiveTag = ({ children = 'Live' }) => (
  <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
    <span className="h-1.5 w-1.5 rounded-full bg-[#3dbb72] animate-pulse" />
    {children}
  </span>
);

const TextLink = ({ href, children, external }) => (
  <a
    href={href}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-white border-b border-white/30 pb-1 hover:border-purple-400 transition-colors"
  >
    {children}
    <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
  </a>
);

// ─── Hero ─────────────────────────────────────────────────────
const partners = [
  { name: 'Jackson Rental Homes', logo: '/logos/clients/jackson-rental-homes.png', h: 'h-7 md:h-8' },
  { name: 'Blue Proma Digital', logo: '/logos/clients/blue-proma-digital.png', h: 'h-8 md:h-10' },
  { name: 'Utopos', logo: '/logos/clients/utopos.png', h: 'h-7 md:h-8' },
  { name: 'White Law PLLC', logo: '/whitelaw-logo.svg', h: 'h-8 md:h-9' },
  { name: 'Pearls Girl Productions', logo: '/logos/clients/pearls-girl-productions.png', h: 'h-10 md:h-12' },
  { name: 'TJ Properties', text: true },
  { name: 'Brave', logo: '/logos/clients/brave.png', h: 'h-10 md:h-12' },
  { name: 'FunTimes', logo: '/logos/clients/funtimes.png', h: 'h-7 md:h-8' },
];

const GrainWave = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div className="grain-wave grain-wave-a" />
    <div className="grain-wave grain-wave-b" />
    <div className="grain-wave grain-wave-c" />
    <div className="grain-noise" />
    <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black to-transparent" />
    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
  </div>
);

export const AINativeHero = () => {
  const row = [...partners, ...partners];
  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex flex-col pt-28 md:pt-32">
      <GrainWave />
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="font-display text-[48px] sm:text-7xl lg:text-[104px] leading-[0.95] tracking-[-0.04em] text-[#fafafa] max-w-5xl"
        >
          Make your company <span className="whitespace-nowrap">AI-native.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-8 text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl"
        >
          We connect your business data to agents and give them secure access to query and write to the systems you run on.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-3"
        >
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-[#fafafa] text-black font-mono text-sm uppercase tracking-[0.15em] px-8 py-3 border border-[#fafafa] hover:bg-white transition-colors">
            Book a call <ArrowRight size={15} />
          </a>
          <a href="#blueprint" className="inline-flex items-center justify-center gap-3 bg-black/40 backdrop-blur text-white font-mono text-sm uppercase tracking-[0.15em] px-8 py-3 border border-white/30 hover:border-white/60 transition-colors">
            See the blueprint
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.45 }}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-10 md:pb-14 mt-16"
      >
        <div className="rounded-[20px] border border-white/10 bg-black/30 backdrop-blur-md p-2">
          <div className="rounded-[14px] border border-white/10 bg-black/40 overflow-hidden py-5">
            <div className="flex w-max items-center gap-14 md:gap-16 animate-scroll-partners">
              {row.map((p, i) => (
                <div key={`${p.name}-${i}`} className="flex h-12 items-center shrink-0">
                  {p.text ? (
                    <span className="text-lg md:text-xl font-bold text-white/90 whitespace-nowrap">{p.name}</span>
                  ) : (
                    <img src={p.logo} alt={p.name} className={`${p.h} w-auto object-contain`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// ─── Big statement ────────────────────────────────────────────
export const Statement = ({ children, sub }) => (
  <section id="what-we-do" className="bg-black pt-28 md:pt-40 pb-8 md:pb-12 scroll-mt-20">
    <motion.div {...fadeUp} className="max-w-4xl mx-auto px-6 text-center">
      <h2 className="font-display text-4xl md:text-6xl leading-[1.05] tracking-[-0.03em] text-[#fafafa]">{children}</h2>
      {sub && <p className="mt-6 text-lg text-white/60 leading-relaxed">{sub}</p>}
    </motion.div>
  </section>
);

const FeatureRow = ({ eyebrow, title, copy, link, panel, reverse }) => (
  <section className="bg-black py-16 md:py-24">
    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <motion.div {...fadeUp} className={reverse ? 'lg:order-2' : ''}>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-5">{eyebrow}</p>
        <h3 className="font-display text-3xl md:text-[44px] leading-[1.08] tracking-[-0.03em] text-[#fafafa]">{title}</h3>
        <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-lg">{copy}</p>
        {link && <div className="mt-8">{link}</div>}
      </motion.div>
      <motion.div {...fadeUp} className={reverse ? 'lg:order-1' : ''}>
        {panel}
      </motion.div>
    </div>
  </section>
);

// ─── Panel A: live context stream ─────────────────────────────
const streamSources = ['HubSpot', 'Gmail', 'Stripe', 'Sheets', 'Slack', 'Notion'];

const ContextStream = () => {
  const W = 520;
  const H = 300;
  const nodeX = 250;
  const nodeY = H / 2;
  const pulse = 'M 270 150 L 300 150 L 312 150 L 318 112 L 326 186 L 334 150 L 372 150 L 380 128 L 388 168 L 396 150 L 432 150 L 440 96 L 450 196 L 458 150 L 500 150';

  return (
    <Panel title="Live context stream" aside={<LiveTag>In sync</LiveTag>}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img" aria-label="Six business sources streaming into one context layer, shown as a steady pulse">
        <defs>
          <pattern id="stream-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(168,85,247,0.10)" strokeWidth="1" />
          </pattern>
          <radialGradient id="node-glow">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="270" y="30" width="240" height="240" fill="url(#stream-grid)" />
        {streamSources.map((name, i) => {
          const y = 40 + i * 44;
          const d = `M 98 ${y} C 170 ${y}, 190 ${nodeY}, ${nodeX - 8} ${nodeY}`;
          return (
            <g key={name}>
              <text x="18" y={y + 4} fill="rgba(255,255,255,0.7)" fontSize="12" fontFamily="Geist, sans-serif">{name}</text>
              <path d={d} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
              <circle r="2.2" fill="#fafafa">
                <animateMotion dur={`${1.8 + i * 0.25}s`} begin={`${i * 0.3}s`} repeatCount="indefinite" path={d} />
              </circle>
            </g>
          );
        })}
        <circle cx={nodeX} cy={nodeY} r="26" fill="url(#node-glow)">
          <animate attributeName="r" values="20;30;20" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle cx={nodeX} cy={nodeY} r="5" fill="#fafafa" />
        <text x={nodeX} y={nodeY + 44} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="Geist, sans-serif">Context layer</text>
        <path d={pulse} fill="none" stroke="#a855f7" strokeWidth="1.6" strokeDasharray="520" strokeDashoffset="520">
          <animate attributeName="stroke-dashoffset" values="520;0;0" keyTimes="0;0.7;1" dur="3s" repeatCount="indefinite" />
        </path>
        <text x="500" y="288" textAnchor="end" fill="rgba(255,255,255,0.35)" fontSize="11" fontFamily="Geist, sans-serif">Every source, one layer</text>
      </svg>
    </Panel>
  );
};

// ─── Panel B: an agent reading and writing ────────────────────
const sessionLines = [
  { kind: 'prompt', text: 'Follow up on every proposal that has gone quiet for two weeks.' },
  { kind: 'read', text: 'query hubspot.deals  stage = "proposal"  idle > 14d' },
  { kind: 'result', text: '7 deals · $184,200 in open pipeline' },
  { kind: 'read', text: 'query gmail.threads  last message per contact' },
  { kind: 'result', text: 'context loaded for 7 contacts' },
  { kind: 'write', text: 'gmail.drafts.create  7 personalised follow-ups' },
  { kind: 'write', text: 'hubspot.tasks.create  7 tasks · due tomorrow' },
  { kind: 'write', text: 'slack.post  #sales  "7 follow-ups ready for review"' },
  { kind: 'done', text: 'Done in 41s. Drafts are waiting for your approval.' },
];

const lineStyles = {
  prompt: { tag: 'you', tagClass: 'bg-white/10 text-white/80', textClass: 'text-white' },
  read: { tag: 'read', tagClass: 'bg-purple-500/15 text-purple-300', textClass: 'text-white/75' },
  write: { tag: 'write', tagClass: 'bg-white/10 text-white', textClass: 'text-white/75' },
  result: { tag: '→', tagClass: 'text-white/30', textClass: 'text-white/45' },
  done: { tag: '✓', tagClass: 'bg-purple-500/25 text-white', textClass: 'text-white' },
};

const AgentSession = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-120px' });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const delay = shown >= sessionLines.length ? 3200 : shown === 0 ? 500 : 750;
    const id = setTimeout(() => setShown((n) => (n >= sessionLines.length ? 0 : n + 1)), delay);
    return () => clearTimeout(id);
  }, [inView, shown]);

  return (
    <div ref={ref}>
      <Panel title="Sales agent" aside={<LiveTag>3 sources</LiveTag>}>
        <div className="p-5 md:p-6 font-mono text-[12px] md:text-[13px] space-y-2.5 h-[360px] md:h-[330px] overflow-hidden">
          {sessionLines.slice(0, shown).map((line, i) => {
            const s = lineStyles[line.kind];
            return (
              <motion.div
                key={`${i}-${line.text}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-3"
              >
                <span className={`shrink-0 min-w-[44px] text-center rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wider ${s.tagClass}`}>{s.tag}</span>
                <span className={s.textClass}>{line.text}</span>
              </motion.div>
            );
          })}
          {shown < sessionLines.length && <span className="inline-block h-4 w-2 bg-purple-400/80 animate-pulse align-middle" />}
        </div>
      </Panel>
    </div>
  );
};

// ─── Panel C: one secure door for any agent ───────────────────
const routerAgents = ['Claude', 'ChatGPT', 'Codex', 'Cursor'];
const routerSystems = ['CRM', 'Email', 'Payments', 'Docs'];
const routerPairs = [[0, 0], [1, 2], [2, 3], [3, 1], [0, 2], [1, 0], [2, 1], [3, 3]];

const AgentRouter = () => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % routerPairs.length), 2200);
    return () => clearInterval(id);
  }, []);
  const [activeAgent, activeSystem] = routerPairs[step];
  const W = 520;
  const H = 300;
  const cx = W / 2;
  const cy = H / 2;
  const rowY = (i) => 66 + i * 56;
  const lane = (i) => cy + (i - 1.5) * 10;
  const leftPath = (i) => `M 108 ${rowY(i)} L 150 ${rowY(i)} L 150 ${lane(i)} L ${cx - 38} ${lane(i)}`;
  const rightPath = (i) => `M ${cx + 38} ${lane(i)} L 370 ${lane(i)} L 370 ${rowY(i)} L 412 ${rowY(i)}`;
  const fullPath = `${leftPath(activeAgent)} L ${cx + 38} ${lane(activeSystem)} L 370 ${lane(activeSystem)} L 370 ${rowY(activeSystem)} L 412 ${rowY(activeSystem)}`;
  const verbs = ['reads', 'writes'];

  return (
    <Panel title="Pentridge MCP" aside={<span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">Scoped · logged</span>}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img" aria-label="Any agent connects through one Pentridge access layer to your CRM, email, payments and docs">
        {routerAgents.map((name, i) => {
          const on = i === activeAgent;
          return (
            <g key={name}>
              <path d={leftPath(i)} fill="none" stroke={on ? '#a855f7' : 'rgba(255,255,255,0.14)'} strokeWidth="1" />
              <rect x="20" y={rowY(i) - 13} width="88" height="26" fill={on ? 'rgba(168,85,247,0.14)' : 'transparent'} stroke={on ? '#a855f7' : 'rgba(255,255,255,0.2)'} />
              <text x="64" y={rowY(i) + 4} textAnchor="middle" fill={on ? '#fafafa' : 'rgba(255,255,255,0.6)'} fontSize="11" fontFamily="Geist, sans-serif">{name}</text>
            </g>
          );
        })}
        {routerSystems.map((name, i) => {
          const on = i === activeSystem;
          return (
            <g key={name}>
              <path d={rightPath(i)} fill="none" stroke={on ? '#a855f7' : 'rgba(255,255,255,0.14)'} strokeWidth="1" />
              <rect x="412" y={rowY(i) - 13} width="88" height="26" fill={on ? 'rgba(168,85,247,0.14)' : 'transparent'} stroke={on ? '#a855f7' : 'rgba(255,255,255,0.2)'} />
              <text x="456" y={rowY(i) + 4} textAnchor="middle" fill={on ? '#fafafa' : 'rgba(255,255,255,0.6)'} fontSize="11" fontFamily="Geist, sans-serif">{name}</text>
            </g>
          );
        })}
        <rect x={cx - 38} y={cy - 38} width="76" height="76" fill="#000" stroke="rgba(255,255,255,0.35)" />
        <image href="/logos/pentridge-mark.png" x={cx - 15} y={cy - 22} width="30" height="45" aria-label="Pentridge" />
        <circle key={step} r="3.2" fill="#fafafa">
          <animateMotion dur="1.8s" repeatCount="1" fill="freeze" path={fullPath} />
        </circle>
      </svg>
      <div className="border-t border-white/10 px-5 py-3 font-mono text-[11px] text-white/55">
        <span className="text-white">{routerAgents[activeAgent]}</span> {verbs[step % 2]} <span className="text-purple-300">{routerSystems[activeSystem]}</span> · permission checked · logged
      </div>
    </Panel>
  );
};

export const FeatureRows = () => (
  <>
    <FeatureRow
      eyebrow="Context layer"
      title="Every source in one live context layer."
      copy="CRM, email, payments, docs and spreadsheets stay in sync in one layer, so your agents work from today's numbers, not last month's export."
      link={<TextLink href="#blueprint">See the blueprint</TextLink>}
      panel={<ContextStream />}
    />
    <FeatureRow
      reverse
      eyebrow="Read and write"
      title="Agents that do the work, not just answer."
      copy="Your agents query every source, then act on it: update records, create tasks, draft emails, send invoices. Your team approves and steers instead of doing it by hand."
      link={<TextLink href={BOOKING_URL} external>Book a call</TextLink>}
      panel={<AgentSession />}
    />
    <FeatureRow
      eyebrow="Any agent"
      title="One secure door for every agent."
      copy="Pentridge MCP gives Claude, ChatGPT, Codex, Cursor and the agents we deploy the same scoped access to your business. One set of permissions. One audit log."
      link={<TextLink href={BOOKING_URL} external>Talk to us</TextLink>}
      panel={<AgentRouter />}
    />
  </>
);

// ─── This is what we build ────────────────────────────────────
const builds = [
  {
    id: 'campaigns',
    label: 'Campaign engine',
    icon: Mail,
    panelTitle: 'Marketing agent',
    trigger: 'Every Monday, 8:00 AM',
    steps: [
      { verb: 'read', text: 'HubSpot segments by last touch and lifecycle stage' },
      { verb: 'read', text: 'Last four campaigns: opens, clicks, replies' },
      { verb: 'write', text: 'Three email drafts in your brand voice' },
      { verb: 'write', text: 'Send schedule and CRM activity for every contact' },
    ],
    outcome: 'Campaign ready for approval',
    caption: 'One brief. A whole week of campaigns.',
    sub: 'Your agent plans, drafts and schedules from what actually worked last time.',
  },
  {
    id: 'follow-up',
    label: 'Lead follow-up',
    icon: UserCheck,
    panelTitle: 'Sales agent',
    trigger: 'A new lead comes in',
    steps: [
      { verb: 'read', text: 'Lead source, form answers and company details' },
      { verb: 'read', text: 'Matching deals and past conversations' },
      { verb: 'write', text: 'Personalised first reply within five minutes' },
      { verb: 'write', text: 'Deal, owner and next task in the CRM' },
    ],
    outcome: 'No lead waits overnight',
    caption: 'Every lead answered while it is still warm.',
    sub: 'Qualified, replied to and logged before anyone on your team opens their inbox.',
  },
  {
    id: 'intake',
    label: 'Intake and booking',
    icon: CalendarCheck,
    panelTitle: 'Intake agent',
    trigger: 'A call or form request',
    steps: [
      { verb: 'read', text: 'Availability, listings and service area' },
      { verb: 'read', text: 'Caller history and open requests' },
      { verb: 'write', text: 'Booked appointment on the right calendar' },
      { verb: 'write', text: 'Confirmation text and CRM record' },
    ],
    outcome: 'Booked work, not voicemail',
    caption: 'From first contact to booked work.',
    sub: 'Intake runs day and night, and your team picks up qualified appointments.',
  },
  {
    id: 'billing',
    label: 'Billing and reporting',
    icon: Receipt,
    panelTitle: 'Operations agent',
    trigger: '1st of every month',
    steps: [
      { verb: 'read', text: 'Contracts, usage and payment history' },
      { verb: 'write', text: 'Invoices in Stripe or QuickBooks' },
      { verb: 'write', text: 'Reminders for anything overdue' },
      { verb: 'write', text: 'Monthly recap posted to Slack' },
    ],
    outcome: 'Books closed, team informed',
    caption: 'Month-end on autopilot.',
    sub: 'Billing, collections and the recap your leadership reads, handled by one agent.',
  },
];

const BuildRun = ({ build }) => {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    setShown(0);
  }, [build.id]);
  useEffect(() => {
    if (shown > build.steps.length) return undefined;
    const id = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 400 : 650);
    return () => clearTimeout(id);
  }, [shown, build.steps.length]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] min-h-[300px]">
      <div className="p-6 md:p-7 border-b md:border-b-0 md:border-r border-white/10">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">Trigger</p>
        <p className="text-white text-lg">{build.trigger}</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mt-8 mb-2">Result</p>
        <AnimatePresence>
          {shown > build.steps.length && (
            <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-purple-300 text-lg">
              {build.outcome}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <div className="p-6 md:p-7 space-y-3">
        {build.steps.map((st, i) => (
          <motion.div
            key={`${build.id}-${i}`}
            initial={false}
            animate={{ opacity: i < shown ? 1 : 0.15 }}
            transition={{ duration: 0.4 }}
            className="flex items-start gap-3 border border-white/10 px-3.5 py-3"
          >
            <span className={`shrink-0 min-w-[48px] text-center rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${st.verb === 'read' ? 'bg-purple-500/15 text-purple-300' : 'bg-white/10 text-white'}`}>
              {st.verb}
            </span>
            <span className="text-sm text-white/75">{st.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const BuildSection = () => {
  const [active, setActive] = useState(builds[0].id);
  const build = builds.find((b) => b.id === active);

  return (
    <section className="bg-black py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] tracking-[-0.03em] text-[#fafafa]">This is what we build.</h2>
          <p className="mt-6 text-lg text-white/60">Marketing and operations workflows, running on your data, with your agents.</p>
        </motion.div>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {builds.map((b) => {
            const Icon = b.icon;
            const on = b.id === active;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setActive(b.id)}
                className={`relative inline-flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${on ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
              >
                {on && <motion.span layoutId="build-tab" className="absolute inset-0 border border-white/15 bg-white/[0.05]" transition={{ duration: 0.3 }} />}
                <Icon size={15} className={`relative ${on ? 'text-purple-400' : ''}`} />
                <span className="relative">{b.label}</span>
              </button>
            );
          })}
        </div>

        <motion.div {...fadeUp} className="mt-8 relative">
          <div className="absolute -inset-x-10 -bottom-10 top-1/3 bg-purple-700/15 blur-[90px] pointer-events-none" />
          <div className="relative">
            <Panel title={build.panelTitle} aside={<span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Example run</span>}>
              <BuildRun build={build} />
            </Panel>
          </div>
        </motion.div>

        <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xl text-white">{build.caption}</p>
            <p className="mt-2 text-white/55">{build.sub}</p>
          </div>
          <TextLink href={BOOKING_URL} external>Build this with us</TextLink>
        </div>
      </div>
    </section>
  );
};

// ─── Blueprint: the four layers ───────────────────────────────
const blueprintSteps = [
  {
    icon: Database,
    title: 'Connect Your Sources',
    copy: 'We wire up the systems your business already runs on: CRM, email, calendars, payments, docs, spreadsheets and databases. No rip and replace.',
    points: ['CRM, email, files, payments, databases', 'Managed sync, hosted by us'],
  },
  {
    icon: Layers,
    title: 'Build the Context Layer',
    copy: 'Your data is cleaned, linked and described so an agent understands your business: who your customers are, what a deal is, how work moves.',
    points: ['One model of your business', 'Definitions agents can reason over'],
  },
  {
    icon: KeyRound,
    title: 'Give Agents Read and Write Access',
    copy: 'Through our MCP and API layer, agents can query any source and write back to it: create tasks, update records, draft emails, send invoices. Every action is permissioned and logged.',
    points: ['Scoped permissions per agent', 'Full audit log of every read and write'],
  },
  {
    icon: Bot,
    title: 'Deploy Agents Into Workflows',
    copy: 'We build the marketing and operations workflows that move the needle first, then keep expanding. Any agent can run them: ours, or the ones your team already uses.',
    points: ['Marketing and operations playbooks', 'Works with Claude, ChatGPT, Codex, Cursor'],
  },
];

export const BlueprintSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="blueprint" className="bg-black py-24 md:py-32 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeUp} className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] tracking-[-0.03em] text-[#fafafa]">The blueprint.</h2>
          <p className="text-white/60 text-lg mt-6 leading-relaxed">
            Four layers between your business and your agents. This is the framework we use to make a company AI-native.
          </p>
        </motion.div>

        <div ref={ref} className="relative">
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px origin-top bg-purple-500 md:-translate-x-1/2"
          />

          <div className="space-y-14 md:space-y-24">
            {blueprintSteps.map((step, i) => {
              const Icon = step.icon;
              const right = i % 2 === 1;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6 }}
                  className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-20"
                >
                  <div className="absolute left-0 md:left-1/2 top-1 md:-translate-x-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-purple-400/50 bg-black text-purple-300">
                    <Icon size={17} />
                  </div>
                  <div className={`pl-16 md:pl-0 ${right ? 'md:col-start-2 md:pl-12' : 'md:pr-12 md:text-right'}`}>
                    <p className="font-mono text-xs tracking-[0.2em] uppercase text-purple-400 mb-3">Layer {String(i + 1).padStart(2, '0')}</p>
                    <h3 className="font-display text-2xl md:text-3xl leading-[1.2] text-[#fafafa] mb-4">{step.title}</h3>
                    <p className="text-white/60 leading-relaxed mb-5">{step.copy}</p>
                    <ul className={`space-y-2 ${right ? '' : 'md:flex md:flex-col md:items-end'}`}>
                      {step.points.map((point) => (
                        <li key={point} className="flex items-center gap-3 text-white/45 text-sm">
                          <span className="w-1 h-1 bg-purple-400 rounded-full" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Before you start (FAQ) ───────────────────────────────────
const faqs = [
  {
    q: 'What does Pentridge actually do?',
    a: 'We make companies AI-native. We connect your business data to agents, give them secure access to query and write to the systems you run on, and deploy the marketing and operations workflows that put that access to work.',
  },
  {
    q: 'Do we need engineers on our side?',
    a: 'No. We embed with your team, set up the connections and the access layer, and build the workflows. Your team approves what agents do and tells us what to build next.',
  },
  {
    q: 'How do agents get access to our data?',
    a: 'Through Pentridge MCP, the access layer we set up on top of your connected sources. Each agent gets scoped permissions for what it can read and write, and every action is logged.',
  },
  {
    q: 'Can we use the agents we already have?',
    a: 'Yes. Claude, ChatGPT, Codex, Cursor and other MCP-compatible agents can use the same data and workflows as the agents we deploy.',
  },
  {
    q: 'How long does it take?',
    a: 'First connected sources and workflows often go live within 2-4 weeks. Company-wide builds with many sources and agents take 6-8 weeks depending on access and integrations.',
  },
  {
    q: 'What does it cost?',
    a: 'Every company is different. We start with a discovery call, then scope the connections, workflows and ongoing support based on complexity and expected return.',
  },
];

export const BeforeYouStart = () => (
  <section className="bg-black py-24 md:py-32">
    <div className="max-w-3xl mx-auto px-6">
      <motion.h2 {...fadeUp} className="font-display text-4xl md:text-6xl leading-[1.05] tracking-[-0.03em] text-[#fafafa] text-center mb-14">
        Before you start.
      </motion.h2>
      <motion.div {...fadeUp} className="rounded-[20px] border border-white/10 bg-white/[0.02] p-2">
        <div className="rounded-[14px] border border-white/10 bg-[#0a0a0a] px-6 md:px-8">
          {faqs.map((f, i) => (
            <div key={f.q} className={`py-6 ${i < faqs.length - 1 ? 'border-b border-white/10' : ''}`}>
              <h3 className="text-white text-lg">{f.q}</h3>
              <p className="mt-2 text-white/55 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);
