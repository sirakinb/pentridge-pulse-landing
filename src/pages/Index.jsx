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
import OurWork from '../components/OurWork';
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

const agentPlatforms = [
  { name: 'Grok Bot', logo: '/logos/grokbot.svg' },
  { name: 'Claude Code', logo: '/logos/claudecode.svg' },
  { name: 'Codex', logo: '/logos/codex-blue.png' },
  { name: 'Cursor', logo: '/logos/cursor.svg' },
  { name: 'Hermes', logo: '/logos/hermes.png', rounded: true },
  { name: 'OpenClaw', logo: '/logos/openclaw.svg' },
];

const customWorkspaces = [
  {
    src: '/manor-workspace-vibecode.png',
    alt: 'Vibe Code Philly custom Manor agent workspace with company branding',
  },
  {
    src: '/manor-workspace-jackson.png',
    alt: 'Jackson Rental Homes custom Manor agent workspace with company branding',
  },
  {
    src: '/manor-workspace-meridian.png',
    alt: 'Meridian Properties custom Manor agent workspace with company branding',
  },
];

const WorkspaceScreenshot = ({ src, alt }) => (
  <div className="rounded-2xl border border-white/10 bg-black/40 p-1.5 sm:p-2 overflow-hidden">
    <img src={src} alt={alt} loading="lazy" className="w-full rounded-xl object-cover object-top" />
  </div>
);

const integrationRows = [
  [
    { name: 'HubSpot', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/hubspot.svg', color: '#FF7A59' },
    { name: 'Salesforce', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/salesforce.svg', color: '#00A1E0' },
    { name: 'Slack', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/slack.svg', color: '#E01E5A' },
    { name: 'Google Drive', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/googledrive.svg', color: '#4285F4' },
    { name: 'Notion', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/notion.svg', color: '#FFFFFF' },
    { name: 'Airtable', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/airtable.svg', color: '#18BFFF' },
  ],
  [
    { name: 'Gmail', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/gmail.svg', color: '#EA4335' },
    { name: 'Google Calendar', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/googlecalendar.svg', color: '#4285F4' },
    { name: 'Asana', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/asana.svg', color: '#F06A6A' },
    { name: 'Zapier', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/zapier.svg', color: '#FF4F00' },
    { name: 'Calendly', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/calendly.svg', color: '#006BFF' },
    { name: 'Zoom', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/zoom.svg', color: '#2D8CFF' },
  ],
  [
    { name: 'QuickBooks', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/quickbooks.svg', color: '#2CA01C' },
    { name: 'Stripe', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/stripe.svg', color: '#635BFF' },
    { name: 'Shopify', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/shopify.svg', color: '#7AB55C' },
    { name: 'Google Sheets', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/googlesheets.svg', color: '#34A853' },
    { name: 'Dropbox', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/dropbox.svg', color: '#0061FF' },
    { name: 'Trello', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/trello.svg', color: '#0C66E4' },
  ],
];

const IntegrationSources = () => (
  <section className="integration-sources relative overflow-hidden bg-black py-24 md:py-32 border-t border-white/5">
    <div className="integration-source-grid absolute inset-0 pointer-events-none" />
    <div className="absolute left-1/2 top-1/3 h-80 w-[38rem] -translate-x-1/2 rounded-full bg-purple-600/10 blur-[130px] pointer-events-none" />
    <div className="relative z-10">
      <motion.div {...fadeUp} className="max-w-4xl mx-auto px-6 text-center mb-16">
        <p className="font-mono text-xs tracking-[0.24em] uppercase text-purple-400/80 mb-5">Connected Context</p>
        <h2 className="font-display text-3xl md:text-[50px] leading-[1.08] text-[#fafafa]">
          Agents connect to the tools your business runs on.
        </h2>
        <p className="text-white/50 text-lg mt-6 max-w-3xl mx-auto leading-relaxed">
          CRM, project management, email, files, payments, and reporting feed the same context layer — giving every agent the information it needs to work across your business.
        </p>
      </motion.div>

      <motion.div {...fadeUp} className="integration-source-window space-y-4 md:space-y-5">
        {integrationRows.map((row, rowIndex) => {
          const repeated = [...row, ...row];
          return (
            <div key={rowIndex} className={`integration-source-row integration-source-row-${rowIndex + 1}`}>
              <div className="integration-source-track">
                {repeated.map((source, sourceIndex) => (
                  <div key={`${source.name}-${sourceIndex}`} className="integration-source-card">
                    <span className="integration-source-icon">
                      <span
                        className="integration-source-logo"
                        style={{ '--integration-logo': `url("${source.icon}")`, '--integration-color': source.color }}
                        aria-hidden="true"
                      />
                    </span>
                    <span>{source.name}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </motion.div>

    </div>
  </section>
);

// ─── Section 04: Manor ───────────────────────────────────────────────
const ManorSection = () => (
  <section className="bg-black py-24 md:py-32 border-t border-white/5 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        {...fadeUp}
        className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-[#09080c]"
      >
        <div className="absolute -top-40 -left-28 h-80 w-80 rounded-full bg-purple-600/20 blur-[110px] pointer-events-none" />
        <div className="absolute -bottom-48 right-0 h-96 w-96 rounded-full bg-violet-600/10 blur-[130px] pointer-events-none" />

        <div className="relative z-10 p-7 sm:p-10 lg:p-12">
          <div className="w-full mb-10 md:mb-14">
            <p className="section-label mb-6">04 / Our Product</p>
            <img
              src="/logo-website.png"
              alt="Manor logo"
              loading="lazy"
              className="h-20 w-28 object-cover object-center mb-8"
            />
            <h2 className="font-display text-3xl md:text-[43px] leading-[1.2] text-[#fafafa] max-w-5xl">
              Meet Manor. Your Agentic Platform for knowledge work.
            </h2>
            <p className="text-white/55 text-lg mt-6 max-w-5xl leading-relaxed">
              Manor gives service businesses a place to collaborate with a team of specialized AI agents across disciplines.
            </p>
          </div>

          <a
            href="https://manor.pentridgemedia.com"
            className="group block"
            aria-label="Open Manor"
          >
            <div className="w-full rounded-2xl border border-white/10 bg-black/40 p-1.5 sm:p-2 shadow-[0_30px_100px_rgba(88,28,135,0.24)] transition-all duration-500 group-hover:border-purple-400/35 group-hover:-translate-y-1">
              <img
                src="/Manor.png"
                alt="Manor AI agent workspace showing agent conversations, tools, and live task activity"
                loading="lazy"
                className="w-full rounded-xl object-cover"
              />
            </div>
          </a>

          <div className="mt-12 pt-12 border-t border-white/10">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-white/35 text-center mb-8">
              Custom Agent Workspaces For Your Company
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
              <WorkspaceScreenshot src={customWorkspaces[0].src} alt={customWorkspaces[0].alt} />
              <WorkspaceScreenshot src={customWorkspaces[1].src} alt={customWorkspaces[1].alt} />
              <div className="md:col-span-2 flex justify-center">
                <div className="w-full md:w-[calc(50%-0.75rem)]">
                  <WorkspaceScreenshot src={customWorkspaces[2].src} alt={customWorkspaces[2].alt} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-9 flex justify-center">
            <a
              href="https://manor.pentridgemedia.com"
              className="btn-primary inline-flex items-center gap-3"
              aria-label="Visit the Manor website"
            >
              Learn More <ArrowRight size={15} />
            </a>
          </div>

          <div className="mt-16 pt-14 border-t border-white/10">
            <p className="text-white/50 text-base md:text-lg text-center max-w-3xl mx-auto leading-relaxed mb-12">
              Let us build you your own custom agent workspace, with your company's branding. Make it your AI home, your system of record, or pull in your company's context to any agentic platform you already use. Your workflows and business data are available wherever your agents live.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10 max-w-5xl mx-auto">
              {agentPlatforms.map((platform) => (
                <div key={platform.name} className="flex flex-col items-center justify-center text-center">
                  <div className="h-16 flex items-center justify-center mb-4">
                    <img
                      src={platform.logo}
                      alt={`${platform.name} logo`}
                      className={`h-12 w-12 object-contain ${platform.rounded ? 'rounded-xl' : ''}`}
                    />
                  </div>
                  <h3 className="text-white font-semibold text-sm">{platform.name}</h3>
                </div>
              ))}
            </div>
            <p className="text-center font-mono text-xs tracking-[0.2em] uppercase text-white/30 mt-12">
              + any MCP-compatible agentic platform or personal agent
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

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
          <p className="section-label mb-4">05 / The Problem</p>
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
    {
      quote:
        'Aki was an excellent asset in the development of our tech stack and we would highly recommend him in the future.',
      name: 'Alexis Holstead',
      company: 'White Law PLLC',
    },
    {
      quote:
        'Absolutely amazing and solution-driven! Working together was a seamless experience from start to finish. They not only delivered outstanding results but also went above and beyond to address challenges with creative, effective solutions. Their professionalism, attention to detail, and commitment to excellence made a lasting impact. I will definitely collaborate with them again and highly recommend their services to anyone seeking top-tier expertise and results.',
      name: 'D.O.',
      company: 'LogoSeed',
    },
  ];

  return (
    <section className="bg-black py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...fadeUp} className="mb-16">
          <p className="section-label mb-4">07 / What They Say</p>
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
          <p className="section-label mb-4">06 / Why Work With Us</p>
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
          <p className="section-label mb-4">07 / Why Partner?</p>
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

// ─── Section 07: Process ──────────────────────────────────────
const ProcessSection = () => {
  return (
    <section className="bg-black py-24 md:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...fadeUp} className="mb-16">
          <p className="section-label mb-4">05 / Process</p>
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
          <p className="section-label mb-4">06 / FAQ</p>
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
const isValidEmail = (value) =>
  typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const CTASection = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [smsConsent, setSmsConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (phone.trim() && !smsConsent) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), phone: phone.trim() }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || 'Something went wrong submitting the form. Please try again.');
        return;
      }
      setSubmittedEmail(email.trim());
      setSubmitted(true);
      setEmail('');
      setPhone('');
      setSmsConsent(false);
    } catch {
      setErrorMessage('Something went wrong submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
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
          <p className="section-label mb-6">08 / Let's Go</p>
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
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="min-w-0 flex-1 bg-white/5 border border-white/10 rounded-none px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 font-mono"
                      required
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone (optional)"
                      aria-label="Phone (optional)"
                      className="min-w-0 flex-1 bg-white/5 border border-white/10 rounded-none px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 font-mono"
                    />
                  </div>
                  <label className="flex items-start gap-2 text-left cursor-pointer">
                    <input
                      type="checkbox"
                      checked={smsConsent}
                      onChange={(e) => setSmsConsent(e.target.checked)}
                      required={Boolean(phone.trim())}
                      className="mt-0.5 accent-purple-500 shrink-0"
                    />
                    <span className="font-mono text-[11px] leading-relaxed text-white/40">
                      By checking this box, you agree to receive SMS messages from Pentridge Media at the number provided. Msg &amp; data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. See our <a href="/privacy" className="underline hover:text-white/60">Privacy Policy</a> and <a href="/terms" className="underline hover:text-white/60">Terms</a>.
                    </span>
                  </label>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary px-6 py-3 text-xs whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting…' : 'Subscribe'}
                  </button>
                  {errorMessage && (
                    <p className="text-pink-400 text-sm text-center">{errorMessage}</p>
                  )}
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
      <OurWork />
      <ManorSection />
      <IntegrationSources />
      <ProcessSection />
      <FAQSection />
      <TestimonialsSection />
      <CTASection />
    </motion.div>
  );
};

export default Index;
