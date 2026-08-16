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
import OurWork from '../components/OurWork';
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
        <motion.div {...stagger} transition={{ duration: 0.6, delay: 0.1 }} className="glass-card-purple rounded-2xl p-10 md:p-12 group hover:border-purple-500/40 transition-all duration-500"><p className="font-mono text-xs tracking-[0.2em] uppercase text-purple-400 mb-4">Step One</p><h3 className="font-display text-2xl md:text-3xl leading-[1.2] text-[#fafafa] mb-4 capitalize">Get AI-Ready</h3><p className="text-white/60 leading-relaxed mb-8">We audit how your business runs, streamline your intake and internal operations, and pipe your CRM, project management, and marketing data into one Agent Workspace, the single source of context your agents will work from.</p><ul className="space-y-3 mb-8">{['Operations audit and roadmap','Intake and follow-up automation','Internal operations streamlining','Data pipeline into your Agent Workspace'].map((item)=><li key={item} className="flex items-center gap-3 text-white/50 text-sm"><span className="w-1 h-1 bg-purple-500 rounded-full"/>{item}</li>)}</ul><a href="https://cal.com/akinyemi-bajulaiye-2jua88/30min" target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center gap-2 group-hover:border-purple-400/60">Book A Call <ArrowRight size={14}/></a></motion.div>
        <motion.div {...stagger} transition={{ duration: 0.6, delay: 0.2 }} className="glass-card-purple rounded-2xl p-10 md:p-12 group hover:border-purple-500/40 transition-all duration-500"><p className="font-mono text-xs tracking-[0.2em] uppercase text-pink-400 mb-4">Step Two</p><h3 className="font-display text-2xl md:text-3xl leading-[1.2] text-[#fafafa] mb-4 capitalize">Deploy AI Agents</h3><p className="text-white/60 leading-relaxed mb-8">With your context centralized, we deploy agents into your marketing and operations. Through Pentridge MCP, any agent can run your workflows, and status updates flow back into your workspace, so you have a live understanding of what your agents are doing.</p><ul className="space-y-3 mb-8">{['Marketing and operations agents','Company context and agent skills in one workspace','Pentridge MCP: any agent can run your workflows','Live status updates on agent activity'].map((item)=><li key={item} className="flex items-center gap-3 text-white/50 text-sm"><span className="w-1 h-1 bg-pink-500 rounded-full"/>{item}</li>)}</ul><a href="https://cal.com/akinyemi-bajulaiye-2jua88/30min" target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center gap-2 group-hover:border-pink-400/60">Discuss Agent Deployment <ArrowRight size={14}/></a></motion.div>
      </div>
    </div>
  </section>
);

const TrustedBySection = () => {
  const partners = [
    { name: 'Jackson Rental Homes', logo: '/p9.png' }, { name: 'FunTimes', logo: '/p10.png' }, { name: 'Blue Proma Digital', logo: '/p11.png' }, { name: 'Utopos', logo: '/p12.png' }, { name: 'Pearls Girl Productions', logo: '/p13.png' }, { name: 'White Law PLLC', logo: '/whitelaw-logo.svg', small: true }, { name: 'TJ Properties', text: true }, { name: 'Brave', logo: '/brave-logo.png', small: true },
  ];
  const doubled = [...partners, ...partners];
  return <section className="bg-[#2d1f4e] py-28 md:py-36"><div className="max-w-7xl mx-auto px-6"><motion.div {...fadeUp} className="text-center mb-16"><p className="section-label">02 / Trusted By</p></motion.div><div className="overflow-hidden"><div className="flex items-center gap-16 md:gap-20 animate-scroll-partners">{doubled.map((partner,i)=><div key={`${partner.name}-${i}`} className="flex-shrink-0 flex items-center justify-center h-28 md:h-36">{partner.text?<span className="text-2xl md:text-3xl font-bold text-white/90 tracking-wide whitespace-nowrap">{partner.name}</span>:<img src={partner.logo} alt={partner.name} className={`${partner.small?'h-16 md:h-20':'h-28 md:h-36'} w-auto object-contain`}/>}</div>)}</div></div></div></section>;
};

const InfrastructureSection = () => <section className="bg-black py-24 md:py-32 border-t border-white/5"><div className="max-w-7xl mx-auto px-6"><motion.div {...fadeUp} className="mb-16"><p className="section-label mb-4">03 / The Infrastructure</p><h2 className="font-display text-3xl md:text-[43px] leading-[1.2] text-[#fafafa] max-w-3xl">All of your business data. One Agent Workspace.</h2><p className="text-white/50 text-lg mt-6 max-w-2xl leading-relaxed">Agents are only as good as the context they can reach. We build and host the AI infrastructure that gives them your company's context, and gives you live visibility into what they're doing. Data pipeline and workspace included.</p></motion.div><motion.div {...fadeUp} className="mb-14"><img src="/agent-infrastructure-diagram.jpg" alt="Pentridge AI infrastructure diagram" loading="lazy" className="w-full rounded-2xl border border-white/5"/></motion.div><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{[{label:'Data Pipeline',accent:'text-purple-400',dot:'bg-purple-500',description:'Your CRM, project management, marketing, and operations tools feed into one place through a managed data pipeline. No exports, no stale spreadsheets.'},{label:'Agent Workspace',accent:'text-pink-400',dot:'bg-pink-500',description:'The single source of context for your company. Your workspace holds your business data, documents, and agent skills and gives you status updates.'},{label:'Pentridge MCP',accent:'text-violet-400',dot:'bg-violet-500',description:'The MCP/API layer built into your workspace. It connects your company context to agentic platforms like Claude Code, Codex, and Cursor.'}].map((layer,i)=><motion.div key={layer.label} {...stagger} transition={{duration:.5,delay:i*.1}} className="glass-card-purple rounded-2xl p-8 md:p-10 hover:border-purple-500/40 transition-all duration-500"><div className="flex items-center gap-3 mb-5"><span className="font-mono text-xs text-white/30">{String(i+1).padStart(2,'0')}</span><span className={`w-1.5 h-1.5 rounded-full ${layer.dot}`}/><p className={`font-mono text-xs tracking-[0.2em] uppercase ${layer.accent}`}>{layer.label}</p></div><p className="text-white/60 text-sm leading-relaxed">{layer.description}</p></motion.div>)}</div></div></section>;

const ProblemSection = () => { const problems=['CRM, project management, and marketing data locked in separate tools','Manual intake, follow-up, and data entry between disconnected systems','AI experiments that stall because they have no access to real company context','No visibility into what AI is actually doing for the business']; return <section className="bg-black py-24 md:py-32"><div className="max-w-7xl mx-auto px-6"><motion.div {...fadeUp} className="mb-16"><p className="section-label mb-4">04 / The Problem</p><h2 className="font-display text-3xl md:text-[43px] leading-[1.2] text-[#fafafa] max-w-3xl">Your business data is scattered. That's why AI hasn't worked yet.</h2><p className="text-white/50 text-lg mt-6 max-w-2xl leading-relaxed">Most companies don't need another disconnected tool. They need their CRM, project management, marketing, and operations in one place an agent can actually work from.</p></motion.div><div className="grid grid-cols-1 md:grid-cols-2 gap-6">{problems.map((problem,i)=><motion.div key={problem} {...stagger} transition={{duration:.5,delay:i*.08}} className="glass-card rounded-xl p-8"><p className="font-mono text-xs tracking-[0.15em] uppercase text-red-400/70 mb-3">The blocker</p><p className="text-white/75 text-sm leading-relaxed">{problem}</p></motion.div>)}</div></div></section>; };

const WhyWorkSection = () => <section className="bg-black py-24 md:py-32"><div className="max-w-7xl mx-auto px-6"><motion.div {...fadeUp} className="mb-16"><p className="section-label mb-4">05 / Why Work With Us</p><h2 className="font-display text-3xl md:text-[43px] leading-[1.2] text-[#fafafa] max-w-3xl">Replace scattered manual work with AI you can actually see working.</h2></motion.div></div></section>;
const ComparisonSection = () => <section className="bg-black py-24 md:py-32"><div className="max-w-3xl mx-auto px-6"><motion.div {...fadeUp} className="mb-16 text-center"><p className="section-label mb-4">06 / Why Partner?</p><h2 className="font-display text-3xl md:text-[43px] leading-[1.2] text-[#fafafa]">Not all AI partners are equal.</h2></motion.div></div></section>;
const PentridgeMCPSection = () => <section className="bg-black py-24 md:py-32 border-t border-white/5"><div className="max-w-7xl mx-auto px-6"><motion.div {...fadeUp} className="mb-16 text-center"><p className="section-label mb-4">07 / Pentridge MCP</p><h2 className="font-display text-3xl md:text-[43px] leading-[1.2] text-[#fafafa] max-w-3xl mx-auto">One MCP layer. Any agentic platform.</h2></motion.div><motion.div {...fadeUp} className="mb-16 flex justify-center"><img src="/pentridge-mcp-hub.jpg" alt="Pentridge MCP hub diagram" loading="lazy" className="w-full max-w-4xl rounded-2xl"/></motion.div></div></section>;
const ProcessSection = () => <section className="bg-black py-24 md:py-32 border-t border-white/5"><div className="max-w-7xl mx-auto px-6"><motion.div {...fadeUp} className="mb-16"><p className="section-label mb-4">08 / Process</p><h2 className="font-display text-3xl md:text-[43px] leading-[1.2] text-[#fafafa] max-w-3xl">Audit, centralize, deploy, and keep improving.</h2></motion.div></div></section>;
const FAQSection = () => <section className="bg-black py-24 md:py-32"><div className="max-w-3xl mx-auto px-6"><motion.div {...fadeUp} className="mb-16"><p className="section-label mb-4">09 / FAQ</p><h2 className="font-display text-3xl md:text-[43px] leading-[1.2] text-[#fafafa]">Questions? We have answers.</h2></motion.div></div></section>;
const TestimonialsSection = () => <section className="bg-black py-24 md:py-32"><div className="max-w-7xl mx-auto px-6"><motion.div {...fadeUp} className="mb-16"><p className="section-label mb-4">10 / What They Say</p><h2 className="font-display text-3xl md:text-[43px] leading-[1.2] text-[#fafafa]">Don't take our word for it.</h2></motion.div></div></section>;
const CTASection = () => <section className="bg-black py-24 md:py-32"><div className="max-w-4xl mx-auto px-6"><motion.div {...fadeUp} className="text-center"><p className="section-label mb-6">11 / Let's Go</p><h2 className="font-display text-3xl md:text-5xl leading-[1.15] text-[#fafafa]">AI agents in your operations, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">live in weeks.</span></h2></motion.div></div></section>;

const Index = () => { const metaConfig=getMetaConfig('home'); useEffect(()=>{if(window.location.hash==='#what-we-do'){setTimeout(()=>{document.getElementById('what-we-do')?.scrollIntoView({behavior:'smooth'});},100);}},[]); return <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.5}} className="bg-black min-h-screen"><MetaTags {...metaConfig}/><PageSchemaMarkup pageType="home"/><Navbar/><HeroSection/><TwoWaysSection/><TrustedBySection/><OurWork/><InfrastructureSection/><ProblemSection/><WhyWorkSection/><ComparisonSection/><PentridgeMCPSection/><ProcessSection/><FAQSection/><TestimonialsSection/><CTASection/></motion.div>; };
export default Index;
