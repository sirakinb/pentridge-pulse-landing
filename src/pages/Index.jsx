import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Plus, Minus, ArrowRight, Check, X as XIcon, Kanban, Users, Mic, CreditCard } from 'lucide-react';

// ─── Animated Counter Hook ────────────────────────────────────
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, end, duration]);

  return { count, ref };
};
import Navbar from '../components/Navbar';
import MetaTags from '../components/MetaTags';
import PageSchemaMarkup from '../components/PageSchemaMarkup';
import { getMetaConfig } from '../lib/meta-config';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

// ─── Stat Counter Component ───────────────────────────────────
const StatCounter = ({ end, suffix = '+', label }) => {
  const { count, ref } = useCountUp(end, 1800);
  return (
    <div ref={ref}>
      <span className="text-2xl font-bold text-white">{count}{suffix}</span>
      <p className="text-white/40 mt-1">{label}</p>
    </div>
  );
};

// ─── Hero Section ─────────────────────────────────────────────
const HeroSection = () => (
  <section className="min-h-screen bg-black relative overflow-hidden flex items-center pt-20">
    {/* Ambient glow */}
    <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
    <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />

    <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Copy */}
        <motion.div {...fadeUp}>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
            Pentridge / AI Agent Deployment
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-[43px] leading-[1.2] mb-6 text-[#fafafa]">
            Deploy AI agents into your business operations.
          </h1>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed mb-10 max-w-xl">
            We get your company AI-ready and streamline your marketing, intake, and internal operations.
          </p>
          <img
            src="/agent-workspace-activity.jpg"
            alt="Agent Workspace activity feed showing live status updates: intake agent updating the voice agent on available properties for the week, marketing agent drafted and sent an email campaign, workspace agent scheduled to send the monthly intake analytics recap, ops agent billed all tenants for their water bill"
            className="w-full max-w-xl rounded-2xl"
          />
        </motion.div>

        {/* Right: 3D Planetary System */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex flex-col items-center gap-14"
        >
          {/* CSS Keyframes for 3D orbits */}
          <style>{`
            @keyframes orbit-1 {
              from { transform: rotateX(70deg) rotateZ(0deg); }
              to { transform: rotateX(70deg) rotateZ(360deg); }
            }
            @keyframes orbit-2 {
              from { transform: rotateX(80deg) rotateZ(60deg); }
              to { transform: rotateX(80deg) rotateZ(420deg); }
            }
            @keyframes orbit-3 {
              from { transform: rotateX(60deg) rotateZ(160deg); }
              to { transform: rotateX(60deg) rotateZ(520deg); }
            }
            @keyframes holographic-shimmer {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes atmosphere-pulse {
              0%, 100% { opacity: 0.4; transform: scale(1); }
              50% { opacity: 0.7; transform: scale(1.03); }
            }
          `}</style>

          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96" style={{ perspective: '1000px' }}>
            {/* Deep ambient glow */}
            <div className="absolute inset-0 bg-purple-600/25 rounded-full blur-[120px] scale-[1.8] pointer-events-none" />

            {/* 3D Stage */}
            <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>

              {/* Atmospheric rim glow */}
              <div
                className="absolute inset-[-15px] rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, transparent 40%, rgba(168,85,247,0.15) 55%, rgba(168,85,247,0.05) 70%, transparent 80%)',
                  animation: 'atmosphere-pulse 4s ease-in-out infinite',
                }}
              />

              {/* Sphere body */}
              <div
                className="absolute inset-0 rounded-full overflow-hidden"
                style={{
                  boxShadow: '0 0 80px rgba(168,85,247,0.5), inset -20px -20px 60px rgba(0,0,0,0.7), inset 15px 15px 40px rgba(168,85,247,0.1), 0 0 160px rgba(168,85,247,0.15)',
                }}
              >
                {/* 3D sphere lighting - top-left highlight, bottom-right shadow */}
                <div
                  className="absolute inset-0 rounded-full z-10 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.25) 0%, transparent 45%), radial-gradient(ellipse at 75% 80%, rgba(0,0,0,0.6) 0%, transparent 50%), radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.1) 0%, transparent 30%)',
                  }}
                />
                {/* Holographic shimmer overlay */}
                <div
                  className="absolute inset-0 rounded-full z-10 pointer-events-none opacity-30"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent, rgba(168,85,247,0.2), transparent, rgba(139,92,246,0.15), transparent, rgba(236,72,153,0.15), transparent)',
                    animation: 'holographic-shimmer 20s linear infinite',
                    mixBlendMode: 'screen',
                  }}
                />
                {/* Logo */}
                <img
                  src="/Pentridge.png"
                  alt="Pentridge"
                  className="w-full h-full object-cover mix-blend-lighten"
                />
              </div>

              {/* Orbital System 1 - Main orbit (large, slow) */}
              <div
                className="absolute inset-[-45px]"
                style={{
                  animation: 'orbit-1 16s linear infinite',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="absolute inset-0 rounded-full border border-purple-500/15" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div
                    className="w-5 h-5 rounded-full"
                    style={{
                      background: 'radial-gradient(circle at 35% 30%, rgba(216,180,254,1) 0%, rgba(168,85,247,0.9) 40%, rgba(107,33,168,0.8) 100%)',
                      boxShadow: '0 0 18px rgba(168,85,247,0.9), 0 0 40px rgba(168,85,247,0.4)',
                    }}
                  />
                </div>
              </div>

              {/* Orbital System 2 - Inner orbit (medium, faster) */}
              <div
                className="absolute inset-[-28px]"
                style={{
                  animation: 'orbit-2 10s linear infinite',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="absolute inset-0 rounded-full border border-pink-500/10" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div
                    className="w-3.5 h-3.5 rounded-full"
                    style={{
                      background: 'radial-gradient(circle at 35% 30%, rgba(251,207,232,1) 0%, rgba(236,72,153,0.9) 40%, rgba(190,24,93,0.8) 100%)',
                      boxShadow: '0 0 14px rgba(236,72,153,0.9), 0 0 30px rgba(236,72,153,0.3)',
                    }}
                  />
                </div>
              </div>

              {/* Orbital System 3 - Outer orbit (wide, slowest) */}
              <div
                className="absolute inset-[-68px]"
                style={{
                  animation: 'orbit-3 24s linear infinite',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="absolute inset-0 rounded-full border border-violet-400/5" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      background: 'radial-gradient(circle at 35% 30%, rgba(221,214,254,1) 0%, rgba(139,92,246,0.9) 40%, rgba(91,33,182,0.8) 100%)',
                      boxShadow: '0 0 12px rgba(139,92,246,0.9), 0 0 25px rgba(139,92,246,0.3)',
                    }}
                  />
                </div>
              </div>

              {/* Pulsing border glow */}
              <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.01, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-[-2px] rounded-full pointer-events-none"
                style={{
                  border: '1.5px solid rgba(168,85,247,0.3)',
                  boxShadow: '0 0 30px rgba(168,85,247,0.15), 0 0 60px rgba(168,85,247,0.08)',
                }}
              />

            </div>
          </div>

          <a
            href="https://cal.com/akinyemi-bajulaiye-2jua88/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex min-h-[76px] w-full sm:w-auto sm:px-16 items-center justify-center text-center"
          >
            Book A Call
          </a>
        </motion.div>
      </div>

      {/* Stats stripe */}
      <motion.div
        {...fadeUp}
        className="mt-20 pt-10 border-t border-white/10 flex flex-wrap justify-center gap-12 md:gap-24 font-mono text-sm text-center"
      >
        <StatCounter end={50} label="Projects Delivered" />
        <StatCounter end={12} label="Active Partners" />
        <StatCounter end={500} label="Hours Automated" />
      </motion.div>
    </div>
  </section>
);

// ─── Section 01: Automation Offer ─────────────────────────────
const TwoWaysSection = () => (
  <section id="what-we-do" className="bg-black py-24 md:py-32 relative scroll-mt-20">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div {...fadeUp} className="mb-16">
        <p className="section-label mb-4">01 / What We Do</p>
        <h2 className="font-display text-3xl md:text-[43px] leading-[1.2] text-[#fafafa] max-w-2xl">
          We make your company AI-ready. Then we deploy agents.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          {...stagger}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card-purple rounded-2xl p-10 md:p-12 group hover:border-purple-500/40 transition-all duration-500"
        >
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-purple-400 mb-4">Step One</p>
          <h3 className="font-display text-2xl md:text-3xl leading-[1.2] text-[#fafafa] mb-4 capitalize">
            Get AI-Ready
          </h3>
          <p className="text-white/60 leading-relaxed mb-8">
            We audit how your business runs, streamline your intake and internal operations, and pipe your CRM, project management, and marketing data into one Agent Workspace — the single source of context your agents will work from.
          </p>
          <ul className="space-y-3 mb-8">
            {['Operations audit and roadmap', 'Intake and follow-up automation', 'Internal operations streamlining', 'Data pipeline into your Agent Workspace'].map((item) => (
              <li key={item} className="flex items-center gap-3 text-white/50 text-sm">
                <span className="w-1 h-1 bg-purple-500 rounded-full" />
                {item}
              </li>
            ))}
          </ul>
          <a
            href="https://cal.com/akinyemi-bajulaiye-2jua88/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2 group-hover:border-purple-400/60"
          >
            Book A Call <ArrowRight size={14} />
          </a>
        </motion.div>

        <motion.div
          {...stagger}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card-purple rounded-2xl p-10 md:p-12 group hover:border-purple-500/40 transition-all duration-500"
        >
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-pink-400 mb-4">Step Two</p>
          <h3 className="font-display text-2xl md:text-3xl leading-[1.2] text-[#fafafa] mb-4 capitalize">
            Deploy AI Agents
          </h3>
          <p className="text-white/60 leading-relaxed mb-8">
            With your context centralized, we deploy agents into your marketing and operations. Through Pentridge MCP, any agent can run your workflows — and status updates flow back into your workspace, so you have a live understanding of what your agents are doing.
          </p>
          <ul className="space-y-3 mb-8">
            {['Marketing and operations agents', 'Company context and agent skills in one workspace', 'Pentridge MCP: any agent can run your workflows', 'Live status updates on agent activity'].map((item) => (
              <li key={item} className="flex items-center gap-3 text-white/50 text-sm">
                <span className="w-1 h-1 bg-pink-500 rounded-full" />
                {item}
              </li>
            ))}
          </ul>
          <a
            href="https://cal.com/akinyemi-bajulaiye-2jua88/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2 group-hover:border-pink-400/60"
          >
            Discuss Agent Deployment <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </div>
  </section>
);

// ─── Section 02: Trusted By ───────────────────────────────────
const TrustedBySection = () => {
  const partners = [
    { name: 'Jackson Rental Homes', logo: '/p9.png' },
    { name: 'FunTimes', logo: '/p10.png' },
    { name: 'Blue Proma Digital', logo: '/p11.png' },
    { name: 'Utopos', logo: '/p12.png' },
    { name: 'Pearls Girl Productions', logo: '/p13.png' },
    { name: 'White Law PLLC', logo: '/whitelaw-logo.svg', small: true },
    { name: 'TJ Properties', text: true },
    { name: 'Brave', logo: '/brave-logo.png', small: true },
  ];

  const doubled = [...partners, ...partners];

  return (
    <section className="bg-[#2d1f4e] py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="section-label">02 / Trusted By</p>
        </motion.div>
        <div className="overflow-hidden">
          <div className="flex items-center gap-16 md:gap-20 animate-scroll-partners">
            {doubled.map((partner, i) => (
              <div key={`${partner.name}-${i}`} className="flex-shrink-0 flex items-center justify-center h-28 md:h-36">
                {partner.text ? (
                  <span className="text-2xl md:text-3xl font-bold text-white/90 tracking-wide whitespace-nowrap">{partner.name}</span>
                ) : (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className={`${partner.small ? 'h-16 md:h-20' : 'h-28 md:h-36'} w-auto object-contain`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Section 03: The Infrastructure ───────────────────────────
const InfrastructureSection = () => {
  const layers = [
    {
      label: 'Data Pipeline',
      accent: 'text-purple-400',
      dot: 'bg-purple-500',
      description:
        'Your CRM, project management, marketing, and operations tools feed into one place through a managed data pipeline. No exports, no stale spreadsheets — live business data, centralized.',
    },
    {
      label: 'Agent Workspace',
      accent: 'text-pink-400',
      dot: 'bg-pink-500',
      description:
        'The single source of context for your company. Your workspace holds your business data, documents, and agent skills — and gives you status updates and a live understanding of what your agents are doing.',
    },
    {
      label: 'Pentridge MCP',
      accent: 'text-violet-400',
      dot: 'bg-violet-500',
      description:
        'The MCP/API layer built into your workspace. It connects your company context to agentic platforms like Claude Code, Codex, and Cursor — so any agent can run your workflows, with updates flowing back to the workspace.',
    },
  ];

  return (
    <section className="bg-black py-24 md:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...fadeUp} className="mb-16">
          <p className="section-label mb-4">03 / The Infrastructure</p>
          <h2 className="font-display text-3xl md:text-[43px] leading-[1.2] text-[#fafafa] max-w-3xl">
            All of your business data. One Agent Workspace.
          </h2>
          <p className="text-white/50 text-lg mt-6 max-w-2xl leading-relaxed">
            Agents are only as good as the context they can reach. We build and host the AI infrastructure that gives them your company's context — and gives you live visibility into what they're doing. Data pipeline and workspace included.
          </p>
        </motion.div>

        <motion.div {...fadeUp} className="mb-14">
          <img
            src="/agent-infrastructure-diagram.jpg"
            alt="Pentridge AI infrastructure diagram: CRM, project management, marketing, and intake data flow through a data pipeline into the Agent Workspace, connected via Pentridge MCP to Claude Code, Codex, and Cursor with status updates flowing back"
            loading="lazy"
            className="w-full rounded-2xl border border-white/5"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.label}
              {...stagger}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card-purple rounded-2xl p-8 md:p-10 hover:border-purple-500/40 transition-all duration-500"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-xs text-white/30">{String(i + 1).padStart(2, '0')}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${layer.dot}`} />
                <p className={`font-mono text-xs tracking-[0.2em] uppercase ${layer.accent}`}>{layer.label}</p>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">{layer.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProblemSection = () => {
  const problems = [
    'CRM, project management, and marketing data locked in separate tools',
    'Manual intake, follow-up, and data entry between disconnected systems',
    'AI experiments that stall because they have no access to real company context',
    'No visibility into what AI is actually doing for the business',
  ];

  return (
    <section className="bg-black py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...fadeUp} className="mb-16">
          <p className="section-label mb-4">04 / The Problem</p>
          <h2 className="font-display text-3xl md:text-[43px] leading-[1.2] text-[#fafafa] max-w-3xl">
            Your business data is scattered. That's why AI hasn't worked yet.
          </h2>
          <p className="text-white/50 text-lg mt-6 max-w-2xl leading-relaxed">
            Most companies don't need another disconnected tool. They need their CRM, project management, marketing, and operations in one place an agent can actually work from.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={problem}
              {...stagger}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card rounded-xl p-8"
            >
              <p className="font-mono text-xs tracking-[0.15em] uppercase text-red-400/70 mb-3">The blocker</p>
              <p className="text-white/75 text-sm leading-relaxed">{problem}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Section 03: What They Say ───────────────────────────────
const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "A true expert in the field. Aki not only understands AI — he is staying up to date on all new trends within the space. During his engagement with us he not only provided us with actionable insights but was able to incorporate a discussion about tech that launched the same day as his presentation. If you need a speaker for your event or an AI consultant, look no further. Thanks again Aki.",
      name: 'Blake McWilliams',
      company: 'Keller Williams',
    },
    {
      quote:
        "I've had the pleasure of working with Aki, and I can confidently say he's exceptional in his field. His communication skills are top-notch, and he truly understands his craft. Aki isn't just your average automation expert — he goes above and beyond by offering valuable insights and suggestions. He meticulously reviewed the workflow creation process, making several adjustments to ensure it met my criteria. Working with Aki has been a pleasure, and I look forward to collaborating with him again in the future.",
      name: 'Pedro Rodriguez',
      company: 'Blue Proma Digital',
    },
  ];

  return (
    <section className="bg-black py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...fadeUp} className="mb-16">
          <p className="section-label mb-4">10 / What They Say</p>
          <h2 className="font-display text-3xl md:text-[43px] leading-[1.2] text-[#fafafa] max-w-3xl capitalize">
            Don't take our word for it.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              {...stagger}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-card rounded-2xl p-10 md:p-12 flex flex-col justify-between"
            >
              <div>
                <span className="text-purple-400 text-4xl leading-none font-display">"</span>
                <p className="text-white/70 text-sm md:text-base leading-relaxed mt-2">
                  {t.quote}
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-white/90 font-medium text-sm">{t.name}</p>
                {t.company && (
                  <p className="font-mono text-xs tracking-[0.1em] text-purple-400/70 mt-1">
                    {t.company}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Section 04: Why Work With Us ─ ─────────────────────────────
const WhyWorkSection = () => {
  const comparisons = [
    {
      before: 'Copy-pasting context into ChatGPT one task at a time',
      after: 'Any agent can run your workflows with your full company context, through Pentridge MCP',
    },
    {
      before: 'Manual intake, follow-up, and data entry between tools',
      after: 'Streamlined intake and internal operations, from first contact to booked work',
    },
    {
      before: 'AI pilots that stall after the demo',
      after: 'Agents deployed into daily operations — with live status updates in your workspace',
    },
  ];

  return (
    <section className="bg-black py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...fadeUp} className="mb-16">
          <p className="section-label mb-4">05 / Why Work With Us</p>
          <h2 className="font-display text-3xl md:text-[43px] leading-[1.2] text-[#fafafa] max-w-3xl">
            Replace scattered manual work with AI you can actually see working.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {comparisons.slice(0, 2).map((item, i) => (
            <motion.div
              key={i}
              {...stagger}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-xl p-8"
            >
              <div className="mb-4">
                <p className="font-mono text-xs tracking-[0.15em] uppercase text-red-400/70 mb-2">Before</p>
                <p className="text-white/40 text-sm leading-relaxed line-through decoration-white/20">{item.before}</p>
              </div>
              <div className="border-t border-white/10 pt-4">
                <p className="font-mono text-xs tracking-[0.15em] uppercase text-purple-400 mb-2">With Pentridge</p>
                <p className="text-white/80 text-sm leading-relaxed">{item.after}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <motion.div
            {...stagger}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-xl p-8 w-full md:w-1/2"
          >
            <div className="mb-4">
              <p className="font-mono text-xs tracking-[0.15em] uppercase text-red-400/70 mb-2">Before</p>
              <p className="text-white/40 text-sm leading-relaxed line-through decoration-white/20">{comparisons[2].before}</p>
            </div>
            <div className="border-t border-white/10 pt-4">
              <p className="font-mono text-xs tracking-[0.15em] uppercase text-purple-400 mb-2">With Pentridge</p>
              <p className="text-white/80 text-sm leading-relaxed">{comparisons[2].after}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── Section 04: Why Partner? (Comparison Table) ──────────────
const ComparisonSection = () => {
  const rows = [
    { label: 'Operations audit before deploying anything', agency: false, pentridge: true },
    { label: 'Data pipeline and Agent Workspace — included and hosted by us', agency: false, pentridge: true },
    { label: 'MCP layer connecting to Claude Code, Codex, and Cursor', agency: false, pentridge: true },
    { label: 'Live visibility into what your agents are doing', agency: false, pentridge: true },
    { label: 'Business outcome and ROI focus', agency: false, pentridge: true },
    { label: 'Long-term AI operations partner', agency: false, pentridge: true },
  ];

  const CellIcon = ({ value }) =>
    value ? (
      <Check size={16} className="text-purple-400 mx-auto" />
    ) : (
      <XIcon size={16} className="text-white/20 mx-auto" />
    );

  return (
    <section className="bg-black py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div {...fadeUp} className="mb-16 text-center">
          <p className="section-label mb-4">06 / Why Partner?</p>
          <h2 className="font-display text-3xl md:text-[43px] leading-[1.2] text-[#fafafa] capitalize">
            Not all AI partners are equal.
          </h2>
        </motion.div>

        <motion.div {...fadeUp} className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 pr-4 font-mono text-xs tracking-[0.15em] uppercase text-white/40"></th>
                <th className="py-4 px-8 font-mono text-xs tracking-[0.15em] uppercase text-white/40 text-center">Agencies</th>
                <th className="py-4 px-8 font-mono text-xs tracking-[0.15em] uppercase text-purple-400 text-center">Pentridge</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-4 pr-4 text-sm text-white/60">{row.label}</td>
                  <td className="py-4 px-8 text-center"><CellIcon value={row.agency} /></td>
                  <td className="py-4 px-8 text-center"><CellIcon value={row.pentridge} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};

// ─── Section 07: Pentridge MCP ────────────────────────────────
const PentridgeMCPSection = () => {
  const platforms = [
    { name: 'Claude Code', logo: '/logos/claudecode.svg' },
    { name: 'Codex', logo: '/logos/codex-blue.png' },
    { name: 'Cursor', logo: '/logos/cursor.svg' },
    { name: 'Hermes', logo: '/logos/hermes.png', rounded: true },
    { name: 'OpenClaw', logo: '/logos/openclaw.svg' },
  ];

  return (
    <section className="bg-black py-24 md:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...fadeUp} className="mb-16 text-center">
          <p className="section-label mb-4">07 / Pentridge MCP</p>
          <h2 className="font-display text-3xl md:text-[43px] leading-[1.2] text-[#fafafa] max-w-3xl mx-auto">
            One MCP layer. Any agentic platform.
          </h2>
          <p className="text-white/50 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Pentridge MCP connects your Agent Workspace to any agentic platform or personal agent — so your workflows and company context are available wherever your agents live, with updates flowing back to the workspace.
          </p>
        </motion.div>

        <motion.div {...fadeUp} className="mb-16 flex justify-center">
          <img
            src="/pentridge-mcp-hub.jpg"
            alt="Pentridge MCP hub diagram: a central Pentridge MCP node connects the Agent Workspace to Claude Code, Codex, Cursor, Hermes, and OpenClaw"
            loading="lazy"
            className="w-full max-w-4xl rounded-2xl"
          />
        </motion.div>

        <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-12 md:gap-x-12 max-w-4xl mx-auto">
          {platforms.map((platform) => (
            <div key={platform.name} className="flex flex-col items-center justify-center text-center">
              <div className="h-16 flex items-center justify-center mb-4">
                <img
                  src={platform.logo}
                  alt={`${platform.name} logo`}
                  className={`h-12 w-12 object-contain ${platform.rounded ? 'rounded-xl' : ''}`}
                />
              </div>
              <h3 className="text-white font-semibold">{platform.name}</h3>
            </div>
          ))}
        </motion.div>

        <motion.p {...fadeUp} className="text-center font-mono text-xs tracking-[0.2em] uppercase text-white/30 mt-14">
          + any MCP-compatible platform or personal agent
        </motion.p>
      </div>
    </section>
  );
};

// ─── Section 07: Process ──────────────────────────────────────
const ProcessSection = () => {
  return (
    <section className="bg-black py-24 md:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...fadeUp} className="mb-16">
          <p className="section-label mb-4">08 / Process</p>
          <h2 className="font-display text-3xl md:text-[43px] leading-[1.2] text-[#fafafa] max-w-3xl capitalize">
            Audit, centralize, deploy, and keep improving.
          </h2>
        </motion.div>
        <motion.div {...fadeUp} className="mx-auto w-full max-w-7xl overflow-hidden bg-black">
          <iframe
            src="/assembly-line.bundle-2.html?v=contained-fit-2"
            width="100%"
            style={{ border: 0, aspectRatio: '16 / 8.5', fontFamily: 'inherit' }}
            loading="lazy"
            title="Our process"
            className="block w-full bg-black"
          />
        </motion.div>
      </div>
    </section>
  );
};

// ─── Section 06: FAQ ──────────────────────────────────────────
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'What does Pentridge actually do?',
      a: 'We get your company AI-ready, then deploy AI agents into your marketing and operations. In practice that means streamlining your intake and internal operations, centralizing your business data into an Agent Workspace, and connecting agents to your workflows — with live visibility into what they are doing.',
    },
    {
      q: 'What is the Agent Workspace?',
      a: 'It is the single source of context for your company. A managed data pipeline brings your CRM, project management, marketing, and operations data into one workspace, alongside your documents and agent skills. It also gives you status updates and a live understanding of what your agents are doing. Both the pipeline and the workspace are included and hosted by us.',
    },
    {
      q: 'What is Pentridge MCP?',
      a: 'Pentridge MCP is the MCP/API layer built into your workspace. It connects your company context to agentic platforms like Claude Code, Codex, and Cursor — so any agent can run your workflows, with updates flowing back into the workspace.',
    },
    {
      q: 'What does pricing look like?',
      a: 'Every deployment is different. We usually begin with a discovery call, then scope the infrastructure, agents, and any ongoing monitoring based on complexity, integrations, and expected ROI.',
    },
    {
      q: 'How long does a typical deployment take?',
      a: 'Focused automations and first agents often launch within 2-4 weeks. Full workspace builds with multiple data sources and agents can take 6-8 weeks depending on access, integrations, and review cycles.',
    },
    {
      q: 'What happens after agents are deployed?',
      a: 'Most clients keep us involved to monitor agents, improve their skills, and expand into new parts of the business. We do not treat AI as set-it-and-forget-it software.',
    },
  ];

  return (
    <section className="bg-black py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div {...fadeUp} className="mb-16">
          <p className="section-label mb-4">09 / FAQ</p>
          <h2 className="font-display text-3xl md:text-[43px] leading-[1.2] text-[#fafafa] capitalize">
            Questions? We have answers.
          </h2>
        </motion.div>

        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              {...stagger}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="faq-item"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left group"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-white/30">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-white/80 group-hover:text-white transition-colors text-sm md:text-base">
                    {faq.q}
                  </span>
                </div>
                {openIndex === i ? (
                  <Minus size={18} className="text-purple-400 flex-shrink-0 ml-4" />
                ) : (
                  <Plus size={18} className="text-white/30 flex-shrink-0 ml-4" />
                )}
              </button>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pb-6 pl-10"
                >
                  <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Section 10: CTA / Apply ──────────────────────────────────
const CTASection = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.error('Newsletter error:', data);
        return;
      }
      setSubmittedEmail(email);
      setSubmitted(true);
      setEmail('');
    } catch (err) {
      console.error('Newsletter error:', err);
    }
  };

  const commitments = [
    'First workflows live within weeks',
    'Data pipeline and Agent Workspace included — hosted by us',
    'Hands-on setup for your data sources, agents, and workflows',
    'Pricing scoped after we understand your setup',
  ];

  return (
    <section className="bg-black py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div {...fadeUp} className="text-center mb-14">
          <p className="section-label mb-6">11 / Let's Go</p>
          <h2 className="font-display text-3xl md:text-5xl leading-[1.15] text-[#fafafa]">
            AI agents in your operations,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">live in weeks.</span>
          </h2>
          <p className="text-white/50 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            We embed with your team, wire your business data into one Agent Workspace, and deploy agents across your marketing, intake, and internal operations — scoped to your business, not a generic playbook.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp}
          className="glass-card-purple rounded-3xl p-10 md:p-14 relative overflow-hidden"
        >
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-600/15 rounded-full blur-[60px] pointer-events-none" />

          <div className="relative z-10">
            <h3 className="font-display text-2xl md:text-3xl text-[#fafafa] mb-4">
              Book a discovery call
            </h3>
            <p className="text-white/60 leading-relaxed mb-8 max-w-2xl">
              A 30-minute conversation with our team. We'll learn how your business runs and map the first workflows worth building.
            </p>

            <ul className="space-y-4 mb-10">
              {commitments.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/70 text-sm md:text-base">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border border-purple-500/40 flex items-center justify-center">
                    <Check size={12} className="text-purple-400" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="https://cal.com/akinyemi-bajulaiye-2jua88/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex min-h-[64px] w-full items-center justify-center text-center mb-5"
            >
              Book A Call
            </a>
            <p className="text-center text-white/40 text-sm mb-12">
              No commitment required. We'll follow up with a tailored proposal if there's a fit.
            </p>

            {/* Newsletter */}
            <div className="max-w-md mx-auto text-center border-t border-white/10 pt-10">
              <p className="font-mono text-xs tracking-[0.15em] uppercase text-white/30 mb-4">Stay in the loop</p>
              {submitted ? (
                <p className="text-white/70 text-sm font-mono">Subscribed as <span className="text-purple-400">{submittedEmail}</span></p>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-white/5 border border-white/10 rounded-none px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 font-mono"
                    required
                  />
                  <button
                    type="submit"
                    className="btn-primary px-6 py-3 text-xs whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── Main Index Page ──────────────────────────────────────────
const Index = () => {
  const metaConfig = getMetaConfig('home');

  useEffect(() => {
    if (window.location.hash === '#what-we-do') {
      setTimeout(() => {
        document.getElementById('what-we-do')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black min-h-screen"
    >
      <MetaTags {...metaConfig} />
      <PageSchemaMarkup pageType="home" />
      <Navbar />
      <HeroSection />
      <TwoWaysSection />
      <TrustedBySection />
      <InfrastructureSection />
      <ProblemSection />
      <WhyWorkSection />
      <ComparisonSection />
      <PentridgeMCPSection />
      <ProcessSection />
      <FAQSection />
      <TestimonialsSection />
      <CTASection />
    </motion.div>
  );
};

export default Index;
