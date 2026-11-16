import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Database, Layers, KeyRound, Bot } from 'lucide-react';

const BOOKING_URL = 'https://cal.com/akinyemi-bajulaiye-2jua88/30min';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

// ─── Hero: data sources ⇄ context layer ⇄ agents ──────────────
const heroSources = ['HubSpot', 'Gmail', 'Stripe', 'Sheets', 'Slack'];
const heroAgents = ['Marketing', 'Intake', 'Operations', 'Finance'];

const heroFeed = [
  { agent: 'Marketing', verb: 'read', text: 'pulled 1,240 contacts from HubSpot segmented by last touch' },
  { agent: 'Marketing', verb: 'write', text: 'drafted and scheduled the weekly email campaign' },
  { agent: 'Intake', verb: 'read', text: 'matched a new lead to available properties this week' },
  { agent: 'Intake', verb: 'write', text: 'booked the showing and logged it to the CRM' },
  { agent: 'Operations', verb: 'write', text: 'billed every tenant for this month’s water bill in Stripe' },
  { agent: 'Finance', verb: 'read', text: 'reconciled 312 payments against the ledger in Sheets' },
  { agent: 'Operations', verb: 'write', text: 'posted the monthly intake analytics recap to Slack' },
];

const VIEW_W = 640;
const VIEW_H = 420;
const SRC_X = 92;
const CORE_X = 320;
const AGENT_X = 548;
const CORE_Y = VIEW_H / 2;

const rowY = (i, count) => 60 + (i * (VIEW_H - 120)) / (count - 1);
const curve = (x1, y1, x2, y2) => {
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
};

const FlowDot = ({ path, color, dur, begin, reverse }) => (
  <circle r="3" fill={color} style={{ filter: `drop-shadow(0 0 6px ${color})` }}>
    <animateMotion
      dur={`${dur}s`}
      begin={`${begin}s`}
      repeatCount="indefinite"
      path={path}
      keyPoints={reverse ? '1;0' : '0;1'}
      keyTimes="0;1"
      calcMode="linear"
    />
  </circle>
);

const HeroGraph = () => (
  <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="w-full h-auto" role="img" aria-label="Business data sources flowing through the Pentridge context layer to AI agents, and agents writing back to the sources">
    <defs>
      <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="core-fill" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1a0b2e" />
        <stop offset="100%" stopColor="#07040d" />
      </linearGradient>
    </defs>

    {heroSources.map((name, i) => {
      const y = rowY(i, heroSources.length);
      const path = curve(SRC_X + 58, y, CORE_X - 62, CORE_Y);
      return (
        <g key={name}>
          <path d={path} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <FlowDot path={path} color="#c084fc" dur={2.6 + i * 0.3} begin={i * 0.45} />
          <FlowDot path={path} color="#f472b6" dur={3.4 + i * 0.2} begin={1.2 + i * 0.5} reverse />
          <rect x={SRC_X - 58} y={y - 17} width="116" height="34" rx="9" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
          <text x={SRC_X} y={y + 4.5} textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="13" fontFamily="Geist Mono, monospace">{name}</text>
        </g>
      );
    })}

    {heroAgents.map((name, i) => {
      const y = rowY(i, heroAgents.length);
      const path = curve(CORE_X + 62, CORE_Y, AGENT_X - 64, y);
      return (
        <g key={name}>
          <path d={path} fill="none" stroke="rgba(168,85,247,0.18)" strokeWidth="1" />
          <FlowDot path={path} color="#c084fc" dur={2.2 + i * 0.25} begin={0.6 + i * 0.5} />
          <FlowDot path={path} color="#f472b6" dur={2.9 + i * 0.3} begin={1.6 + i * 0.4} reverse />
          <rect x={AGENT_X - 64} y={y - 17} width="128" height="34" rx="17" fill="rgba(168,85,247,0.12)" stroke="rgba(168,85,247,0.45)" />
          <circle cx={AGENT_X - 46} cy={y} r="3.5" fill="#4ade80">
            <animate attributeName="opacity" values="1;0.35;1" dur="1.8s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </circle>
          <text x={AGENT_X + 6} y={y + 4.5} textAnchor="middle" fill="#f5f3ff" fontSize="13" fontFamily="Geist, sans-serif">{name}</text>
        </g>
      );
    })}

    <circle cx={CORE_X} cy={CORE_Y} r="120" fill="url(#core-glow)">
      <animate attributeName="r" values="110;128;110" dur="5s" repeatCount="indefinite" />
    </circle>
    <rect x={CORE_X - 62} y={CORE_Y - 62} width="124" height="124" rx="22" fill="url(#core-fill)" stroke="rgba(192,132,252,0.6)" />
    <rect x={CORE_X - 62} y={CORE_Y - 62} width="124" height="124" rx="22" fill="none" stroke="#f472b6" strokeOpacity="0.8" strokeDasharray="60 436">
      <animate attributeName="stroke-dashoffset" values="0;-496" dur="6s" repeatCount="indefinite" />
    </rect>
    <text x={CORE_X} y={CORE_Y - 6} textAnchor="middle" fill="#fafafa" fontSize="15" fontFamily="Geist Pixel Grid, sans-serif">Context</text>
    <text x={CORE_X} y={CORE_Y + 14} textAnchor="middle" fill="#fafafa" fontSize="15" fontFamily="Geist Pixel Grid, sans-serif">Layer</text>
    <text x={CORE_X} y={CORE_Y + 36} textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9.5" letterSpacing="2" fontFamily="Geist Mono, monospace">READ · WRITE</text>
  </svg>
);

const HeroFeed = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % heroFeed.length), 2600);
    return () => clearInterval(id);
  }, []);
  const visible = [0, 1, 2].map((offset) => heroFeed[(index + offset) % heroFeed.length]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5 font-mono text-[12px] md:text-[13px]">
      <div className="flex items-center justify-between mb-3 text-white/35 uppercase tracking-[0.2em] text-[10px]">
        <span>Agent activity</span>
        <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />Live</span>
      </div>
      <div className="space-y-2 h-[104px] md:h-[84px] overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((item) => (
            <motion.div
              key={`${item.agent}-${item.text}`}
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45 }}
              className="flex items-start gap-3"
            >
              <span className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wider ${item.verb === 'write' ? 'bg-pink-500/15 text-pink-300' : 'bg-purple-500/15 text-purple-300'}`}>
                {item.verb}
              </span>
              <span className="text-white/70"><span className="text-white">{item.agent}</span> {item.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const AINativeHero = () => (
  <section className="min-h-screen bg-black relative overflow-hidden flex items-center pt-24">
    <div className="absolute inset-0 ai-native-grid pointer-events-none" />
    <div className="absolute top-1/4 right-1/4 w-[520px] h-[520px] bg-purple-600/20 rounded-full blur-[130px] pointer-events-none" />
    <div className="absolute bottom-0 left-1/4 w-[320px] h-[320px] bg-pink-600/10 rounded-full blur-[110px] pointer-events-none" />

    <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-14 lg:gap-10 items-center">
        <motion.div {...fadeUp}>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
            Pentridge / AI-native infrastructure
          </p>
          <h1 className="font-display text-[40px] md:text-6xl leading-[1.05] mb-6 text-[#fafafa]">
            Make your company{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">AI-native.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed mb-10 max-w-xl">
            We connect your business data to agents and give them secure access to query and write to the systems you run on, so your marketing and operations run on agents.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center justify-center gap-3">
              Book a call <ArrowRight size={15} />
            </a>
            <a href="#blueprint" className="btn-outline inline-flex items-center justify-center gap-3">
              See the blueprint
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-5"
        >
          <HeroGraph />
          <HeroFeed />
        </motion.div>
      </div>
    </div>
  </section>
);

// ─── Blueprint: the four layers ───────────────────────────────
const blueprintSteps = [
  {
    icon: Database,
    title: 'Connect your sources',
    copy: 'We wire up the systems your business already runs on: CRM, email, calendars, payments, docs, spreadsheets and databases. No rip and replace.',
    points: ['CRM, email, files, payments, databases', 'Managed sync, hosted by us'],
  },
  {
    icon: Layers,
    title: 'Build the context layer',
    copy: 'Your data is cleaned, linked and described so an agent understands your business: who your customers are, what a deal is, how work moves.',
    points: ['One model of your business', 'Definitions agents can reason over'],
  },
  {
    icon: KeyRound,
    title: 'Give agents read and write access',
    copy: 'Through our MCP and API layer, agents can query any source and write back to it: create tasks, update records, draft emails, send invoices. Every action is permissioned and logged.',
    points: ['Scoped permissions per agent', 'Full audit log of every read and write'],
  },
  {
    icon: Bot,
    title: 'Deploy agents into workflows',
    copy: 'We ship the marketing and operations workflows that move the needle first, then keep expanding. Any agent can run them: ours, or the ones your team already uses.',
    points: ['Marketing and operations playbooks', 'Works with Claude, ChatGPT, Codex, Cursor'],
  },
];

export const BlueprintSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="blueprint" className="bg-black py-24 md:py-32 border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...fadeUp} className="mb-16 md:mb-20 max-w-3xl">
          <p className="section-label mb-4">01 / The Blueprint</p>
          <h2 className="font-display text-3xl md:text-[46px] leading-[1.12] text-[#fafafa]">
            The infrastructure that makes a company AI-native.
          </h2>
          <p className="text-white/50 text-lg mt-6 leading-relaxed">
            Agents are only as useful as what they can see and do. We build the layer between your business and your agents, then put it to work.
          </p>
        </motion.div>

        <div ref={ref} className="relative">
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-purple-400 via-pink-400 to-purple-500 md:-translate-x-1/2"
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
                  <div className="absolute left-0 md:left-1/2 top-1 md:-translate-x-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-purple-400/50 bg-black text-purple-300 shadow-[0_0_24px_rgba(168,85,247,0.35)]">
                    <Icon size={17} />
                  </div>
                  <div className={`pl-16 md:pl-0 ${right ? 'md:col-start-2 md:pl-12' : 'md:pr-12 md:text-right'}`}>
                    <p className="font-mono text-xs tracking-[0.2em] uppercase text-purple-400 mb-3">Layer {String(i + 1).padStart(2, '0')}</p>
                    <h3 className="font-display text-2xl md:text-3xl leading-[1.2] text-[#fafafa] mb-4">{step.title}</h3>
                    <p className="text-white/60 leading-relaxed mb-5">{step.copy}</p>
                    <ul className={`space-y-2 ${right ? '' : 'md:flex md:flex-col md:items-end'}`}>
                      {step.points.map((point) => (
                        <li key={point} className="flex items-center gap-3 text-white/45 text-sm">
                          <span className="w-1 h-1 bg-pink-400 rounded-full" />
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

// ─── Read and write: a live agent session ─────────────────────
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
  write: { tag: 'write', tagClass: 'bg-pink-500/15 text-pink-300', textClass: 'text-white/75' },
  result: { tag: '→', tagClass: 'text-white/30', textClass: 'text-white/45' },
  done: { tag: '✓', tagClass: 'bg-green-500/15 text-green-300', textClass: 'text-green-200/90' },
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
    <div ref={ref} className="rounded-2xl border border-white/10 bg-[#07050b] shadow-[0_30px_100px_rgba(88,28,135,0.25)] overflow-hidden">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 font-mono text-[11px] tracking-[0.18em] uppercase text-white/35">sales-agent · connected to 3 sources</span>
      </div>
      <div className="p-5 md:p-6 font-mono text-[12px] md:text-[13px] space-y-2.5 min-h-[330px]">
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
    </div>
  );
};

export const ReadWriteSection = () => (
  <section className="bg-black py-24 md:py-32 border-t border-white/5 relative overflow-hidden">
    <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-pink-600/10 blur-[130px] pointer-events-none" />
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center relative">
      <motion.div {...fadeUp}>
        <p className="section-label mb-4">02 / Read and Write</p>
        <h2 className="font-display text-3xl md:text-[46px] leading-[1.12] text-[#fafafa]">
          Agents that don&rsquo;t just answer. They do the work.
        </h2>
        <p className="text-white/55 text-lg mt-6 leading-relaxed">
          A chatbot can tell you which deals went quiet. An AI-native company has an agent that finds them, reads the history, drafts the follow-ups, creates the tasks and tells the team, inside the tools you already use.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-4 max-w-md">
          <div className="rounded-xl border border-purple-500/25 bg-purple-500/[0.06] p-5">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-purple-300 mb-2">Query</p>
            <p className="text-white/60 text-sm leading-relaxed">Ask anything across every source, in plain language.</p>
          </div>
          <div className="rounded-xl border border-pink-500/25 bg-pink-500/[0.06] p-5">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-pink-300 mb-2">Write</p>
            <p className="text-white/60 text-sm leading-relaxed">Act on it: records, tasks, emails, invoices, posts.</p>
          </div>
        </div>
      </motion.div>
      <motion.div {...fadeUp}>
        <AgentSession />
      </motion.div>
    </div>
  </section>
);

// ─── Workflows: marketing and operations ──────────────────────
const workflowTabs = {
  Marketing: [
    { title: 'Campaign engine', reads: 'CRM segments, past campaign results', writes: 'Email drafts, send schedule, CRM activity' },
    { title: 'Content distribution', reads: 'Briefs, brand guidelines, calendar', writes: 'Posts on every social channel' },
    { title: 'Lead follow-up', reads: 'New leads, email threads, deal stage', writes: 'Personalised follow-ups and CRM tasks' },
    { title: 'Weekly performance recap', reads: 'Ads, analytics, CRM pipeline', writes: 'Summary report to Slack or email' },
  ],
  Operations: [
    { title: 'Intake and qualification', reads: 'Calls, forms, availability', writes: 'Booked appointments and CRM records' },
    { title: 'Billing and collections', reads: 'Contracts, usage, payment history', writes: 'Invoices and reminders in Stripe or QuickBooks' },
    { title: 'Reporting and analytics', reads: 'Operational data across every tool', writes: 'Monthly recaps and dashboards' },
    { title: 'Internal requests', reads: 'Docs, SOPs, project boards', writes: 'Tasks, updates and answers for the team' },
  ],
};

export const WorkflowsSection = () => {
  const [tab, setTab] = useState('Marketing');

  return (
    <section className="bg-black py-24 md:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...fadeUp} className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-3xl">
            <p className="section-label mb-4">03 / Workflows</p>
            <h2 className="font-display text-3xl md:text-[46px] leading-[1.12] text-[#fafafa]">
              Frameworks we&rsquo;ve already shipped.
            </h2>
            <p className="text-white/50 text-lg mt-6 leading-relaxed">
              You don&rsquo;t start from a blank page. Every engagement starts from marketing and operations workflows we&rsquo;ve built and run for real businesses.
            </p>
          </div>
          <div className="inline-flex self-start md:self-auto rounded-full border border-white/10 bg-white/[0.03] p-1">
            {Object.keys(workflowTabs).map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setTab(name)}
                className={`relative rounded-full px-5 py-2 font-mono text-xs tracking-[0.15em] uppercase transition-colors ${tab === name ? 'text-white' : 'text-white/45 hover:text-white/70'}`}
              >
                {tab === name && (
                  <motion.span layoutId="workflow-tab" className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/60 to-pink-600/50" transition={{ duration: 0.35 }} />
                )}
                <span className="relative">{name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {workflowTabs[tab].map((wf, i) => (
              <div key={wf.title} className="glass-card rounded-2xl p-7 md:p-8 group hover:border-purple-500/40 transition-colors duration-500">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-xl md:text-2xl text-[#fafafa]">{wf.title}</h3>
                  <span className="font-mono text-xs text-white/25">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 min-w-[48px] text-center rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider bg-purple-500/15 text-purple-300">reads</span>
                    <span className="text-white/60">{wf.reads}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 min-w-[48px] text-center rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider bg-pink-500/15 text-pink-300">writes</span>
                    <span className="text-white/60">{wf.writes}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

// ─── Any agent ────────────────────────────────────────────────
const agentPlatforms = [
  { name: 'Claude Code', logo: '/logos/claudecode.svg' },
  { name: 'Codex', logo: '/logos/codex-blue.png' },
  { name: 'Cursor', logo: '/logos/cursor.svg' },
  { name: 'Grok Bot', logo: '/logos/grokbot.svg' },
  { name: 'Hermes', logo: '/logos/hermes.png', rounded: true },
  { name: 'OpenClaw', logo: '/logos/openclaw.svg' },
];

export const AnyAgentSection = () => (
  <section className="bg-black py-24 md:py-32 border-t border-white/5">
    <div className="max-w-5xl mx-auto px-6 text-center">
      <motion.div {...fadeUp}>
        <p className="section-label mb-4">04 / Bring Any Agent</p>
        <h2 className="font-display text-3xl md:text-[46px] leading-[1.12] text-[#fafafa]">
          Your business, available wherever your agents live.
        </h2>
        <p className="text-white/50 text-lg mt-6 max-w-3xl mx-auto leading-relaxed">
          The context layer speaks MCP, so the agents your team already uses get the same access to your data and workflows as the ones we deploy.
        </p>
      </motion.div>
      <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
        {agentPlatforms.map((platform, i) => (
          <motion.div
            key={platform.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="flex flex-col items-center"
          >
            <div className="h-16 w-16 mb-4 flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
              <img src={platform.logo} alt={`${platform.name} logo`} loading="lazy" className={`h-9 w-9 object-contain ${platform.rounded ? 'rounded-lg' : ''}`} />
            </div>
            <p className="text-white/80 text-sm font-medium">{platform.name}</p>
          </motion.div>
        ))}
      </div>
      <p className="font-mono text-xs tracking-[0.2em] uppercase text-white/30 mt-12">
        + any MCP-compatible agent
      </p>
    </div>
  </section>
);
