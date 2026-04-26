import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Plus, Minus, ArrowRight, Check, X as XIcon } from 'lucide-react';

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
            Pentridge / AI Workflow Automation
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-[43px] leading-[1.2] mb-6 text-[#fafafa] capitalize">
            Automate the workflows slowing your business down.
          </h1>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed mb-10 max-w-xl">
            We build AI automation systems that handle repetitive work, connect your tools, and keep your team focused on revenue.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href="https://cal.com/akinyemi-bajulaiye-2jua88/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block"
            >
              Book an Automation Audit
            </a>
            <a
              href="/resources/ai-process-automation-examples"
              className="btn-outline inline-block"
            >
              See Automation Examples
            </a>
          </div>
          <div className="flex gap-10 font-mono text-sm">
            <StatCounter end={50} label="Projects Delivered" />
            <StatCounter end={12} label="Active Partners" />
            <StatCounter end={500} label="Hours Automated" />
          </div>
        </motion.div>

        {/* Right: 3D Planetary System */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex justify-center lg:justify-end"
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
            <div className="absolute inset-0 bg-purple-600/25 rounded-full blur-[120px] scale-[1.8]" />

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
        </motion.div>
      </div>
    </div>
  </section>
);

// ─── Section 01: Automation Offer ─────────────────────────────
const TwoWaysSection = () => (
  <section className="bg-black py-24 md:py-32 relative">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div {...fadeUp} className="mb-16">
        <p className="section-label mb-4">01 / Automation Partner</p>
        <h2 className="font-display text-3xl md:text-[43px] leading-[1.2] text-[#fafafa] max-w-2xl capitalize">
          One automation partner for the workflows that run your business.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          {...stagger}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card-purple rounded-2xl p-10 md:p-12 group hover:border-purple-500/40 transition-all duration-500"
        >
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-purple-400 mb-4">Primary Offer</p>
          <h3 className="font-display text-2xl md:text-3xl leading-[1.2] text-[#fafafa] mb-4 capitalize">
            AI Workflow Automation
          </h3>
          <p className="text-white/60 leading-relaxed mb-8">
            We audit the manual work costing you time, map the highest-ROI workflows, then build and maintain automations across your calls, CRM, calendar, inbox, documents, and internal tools.
          </p>
          <ul className="space-y-3 mb-8">
            {['Workflow audit and roadmap', 'Lead capture and follow-up', 'CRM, calendar, email, and SMS integrations', 'Ongoing monitoring and optimization'].map((item) => (
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
            Book an Automation Audit <ArrowRight size={14} />
          </a>
        </motion.div>

        <motion.div
          {...stagger}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card-purple rounded-2xl p-10 md:p-12 group hover:border-purple-500/40 transition-all duration-500"
        >
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-pink-400 mb-4">Supporting Capability</p>
          <h3 className="font-display text-2xl md:text-3xl leading-[1.2] text-[#fafafa] mb-4 capitalize">
            Need custom software too?
          </h3>
          <p className="text-white/60 leading-relaxed mb-8">
            When automation needs a dashboard, client portal, internal tool, or AI-native app, we can build it. Custom software supports the workflow instead of distracting from the business outcome.
          </p>
          <ul className="space-y-3 mb-8">
            {['Custom dashboards and portals', 'MVPs and internal tools', 'AI-native interfaces', 'Product design and full-stack delivery'].map((item) => (
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
            Discuss Custom Software <ArrowRight size={14} />
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
  ];

  return (
    <section className="bg-[#2d1f4e] py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="section-label">02 / Trusted By</p>
        </motion.div>
        <div className="overflow-hidden">
          <div className="flex items-center justify-center gap-12 md:gap-16 flex-wrap">
            {partners.map((partner, i) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex-shrink-0"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-28 md:h-36 w-auto object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProblemSection = () => {
  const problems = [
    'Missed calls and slow lead follow-up',
    'Duplicate data entry between disconnected tools',
    'Manual CRM updates after every form, call, or meeting',
    'Admin reporting that eats into revenue-focused work',
  ];

  return (
    <section className="bg-black py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...fadeUp} className="mb-16">
          <p className="section-label mb-4">03 / The Problem</p>
          <h2 className="font-display text-3xl md:text-[43px] leading-[1.2] text-[#fafafa] max-w-3xl capitalize">
            Manual workflows quietly drain your team every week.
          </h2>
          <p className="text-white/50 text-lg mt-6 max-w-2xl leading-relaxed">
            Most service businesses do not need another disconnected tool. They need the calls, forms, CRM, calendar, inbox, documents, and reports to work together automatically.
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
              <p className="font-mono text-xs tracking-[0.15em] uppercase text-red-400/70 mb-3">Manual drag</p>
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
          <p className="section-label mb-4">09 / What They Say</p>
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
      before: 'Following up with every lead by hand',
      after: 'Instant qualification, SMS/email follow-up, booking, and CRM updates',
    },
    {
      before: 'Trying to "figure out AI" without a workflow map',
      after: 'A clear automation roadmap tied to hours saved and revenue protected',
    },
    {
      before: 'Cobbling together no-code tools that break',
      after: 'Reliable automations built, integrated, monitored, and improved over time',
    },
  ];

  return (
    <section className="bg-black py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...fadeUp} className="mb-16">
          <p className="section-label mb-4">04 / Why Work With Us</p>
          <h2 className="font-display text-3xl md:text-[43px] leading-[1.2] text-[#fafafa] max-w-3xl capitalize">
            Replace scattered manual work with systems that run.
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
    { label: 'Workflow audit before building', agency: false, pentridge: true },
    { label: 'CRM, calendar, inbox, SMS, and document integrations', agency: false, pentridge: true },
    { label: 'Automation plus custom software when needed', agency: false, pentridge: true },
    { label: 'Launch, monitor, and optimize after go-live', agency: false, pentridge: true },
    { label: 'Business outcome and ROI focus', agency: false, pentridge: true },
    { label: 'Long-term automation partner', agency: false, pentridge: true },
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
          <p className="section-label mb-4">05 / Why Partner?</p>
          <h2 className="font-display text-3xl md:text-[43px] leading-[1.2] text-[#fafafa] capitalize">
            Not all automation partners are equal.
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

// ─── Section 06: Automation Modules ───────────────────────────
const AutomationModulesSection = () => {
  const modules = [
    'AI voice agents and call handling',
    'Lead capture, qualification, follow-up, and booking',
    'CRM, calendar, email, SMS, and tool integrations',
    'Document, proposal, and reporting automation',
    'Internal operations and admin workflows',
    'Custom dashboards, portals, and internal tools',
  ];

  return (
    <section className="bg-black py-24 md:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...fadeUp} className="mb-16 text-center">
          <p className="section-label mb-4">06 / Automation Modules</p>
          <h2 className="font-display text-3xl md:text-[43px] leading-[1.2] text-[#fafafa] capitalize max-w-3xl mx-auto">
            Automations that connect the work behind your business.
          </h2>
          <p className="text-white/50 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Voice agents, CRM updates, follow-up, reporting, documents, and internal tools become modules inside one operating-system-style workflow.
          </p>
        </motion.div>

        <motion.div {...fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((module, i) => (
            <div key={module} className="glass-card rounded-xl p-7">
              <p className="font-mono text-xs tracking-[0.15em] uppercase text-purple-400/70 mb-3">{String(i + 1).padStart(2, '0')}</p>
              <p className="text-white/75 text-sm leading-relaxed">{module}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ─── Section 07: Process ──────────────────────────────────────
const ProcessSection = () => {
  const steps = [
    { title: 'Map workflow', copy: 'Identify where leads, data, tasks, and approvals slow down.' },
    { title: 'Build automation', copy: 'Create the AI agents, triggers, prompts, rules, and human handoffs.' },
    { title: 'Integrate tools', copy: 'Connect CRM, calendar, inbox, forms, SMS, documents, and dashboards.' },
    { title: 'Launch', copy: 'Ship a working system with clear owners, alerts, and fallback paths.' },
    { title: 'Optimize', copy: 'Monitor outcomes and improve the workflow as your business changes.' },
  ];

  return (
    <section className="bg-black py-24 md:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...fadeUp} className="mb-16">
          <p className="section-label mb-4">07 / Process</p>
          <h2 className="font-display text-3xl md:text-[43px] leading-[1.2] text-[#fafafa] max-w-3xl capitalize">
            Audit, build, integrate, launch, and keep improving.
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              {...stagger}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass-card-purple rounded-xl p-6"
            >
              <p className="font-mono text-xs tracking-[0.15em] uppercase text-white/40 mb-4">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="text-white font-semibold mb-3">{step.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{step.copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Section 06: FAQ ──────────────────────────────────────────
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'What kind of projects do you take on?',
      a: 'Our primary work is AI workflow automation for service businesses: lead capture, follow-up, voice agents, CRM updates, documents, reporting, and internal operations. We also build custom dashboards, portals, and apps when the workflow requires it.',
    },
    {
      q: 'What does pricing look like?',
      a: 'Every automation scope is different. We usually begin with a workflow audit, then price the implementation and any ongoing monitoring based on complexity, integrations, and expected ROI.',
    },
    {
      q: 'How long does a typical project take?',
      a: 'Many focused automations launch within 2-4 weeks. Larger multi-tool workflows or custom internal tools can take 6-8 weeks depending on access, integrations, and review cycles.',
    },
    {
      q: 'What happens during an automation audit?',
      a: 'We identify where manual work slows your team down, review the tools you already use, estimate the highest-ROI opportunities, and map the first workflows worth automating.',
    },
    {
      q: 'What happens after the project is delivered?',
      a: 'Many clients keep us involved for monitoring, optimization, and new workflow builds. We do not treat automation as set-it-and-forget-it software.',
    },
  ];

  return (
    <section className="bg-black py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div {...fadeUp} className="mb-16">
          <p className="section-label mb-4">08 / FAQ</p>
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
    if (email) {
      try {
        await fetch('https://hook.us1.make.com/95h6co6hol3lnf0dsyxmy7agn9vdyrm5', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        setSubmittedEmail(email);
        setSubmitted(true);
        setEmail('');
      } catch (err) {
        console.error('Webhook error:', err);
      }
    }
  };

  return (
    <section className="bg-black py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          {...fadeUp}
          className="glass-card-purple rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
        >
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-600/15 rounded-full blur-[60px] pointer-events-none" />

          <div className="relative z-10">
            <p className="section-label mb-6">10 / Let's Go</p>
            <h2 className="font-display text-3xl md:text-[43px] leading-[1.2] text-[#fafafa] mb-6 capitalize">
              Book your AI workflow automation audit.
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-lg mx-auto">
              Pick the workflows slowing your team down. We will help identify the first automation worth building and the ROI it could create.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a
                href="https://cal.com/akinyemi-bajulaiye-2jua88/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block"
              >
                Book an Automation Audit
              </a>
              <a
                href="/resources/ai-process-automation-examples"
                className="btn-outline inline-block"
              >
                See Automation Examples
              </a>
            </div>

            {/* Newsletter */}
            <div className="max-w-md mx-auto">
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
      <ProblemSection />
      <WhyWorkSection />
      <ComparisonSection />
      <AutomationModulesSection />
      <ProcessSection />
      <FAQSection />
      <TestimonialsSection />
      <CTASection />
    </motion.div>
  );
};

export default Index;
