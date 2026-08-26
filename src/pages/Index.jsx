import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Plus, Minus, ArrowRight, Check, X as XIcon, Kanban, Users, Mic, CreditCard } from 'lucide-react';

const useCountUp = (end, duration = 2000) => { const [count, setCount] = useState(0); const ref = useRef(null); const inView = useInView(ref, { once: true }); useEffect(() => { if (!inView) return; const startTime = Date.now(); const tick = () => { const progress = Math.min((Date.now() - startTime) / duration, 1); setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * end)); if (progress < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); }, [inView, end, duration]); return { count, ref }; };
import Navbar from '../components/Navbar';
import OurWork from '../components/OurWork';
import NewsletterSignup from '../components/NewsletterSignup';
import MetaTags from '../components/MetaTags';
import PageSchemaMarkup from '../components/PageSchemaMarkup';
import { getMetaConfig } from '../lib/meta-config';
const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };
const stagger = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };
const StatCounter = ({ end, suffix = '+', label }) => { const { count, ref } = useCountUp(end, 1800); return <div ref={ref}><span className="text-2xl font-bold text-white">{count}{suffix}</span><p className="text-white/40 mt-1">{label}</p></div>; };
const HeroSection = () => <section className="min-h-screen bg-black relative overflow-hidden flex items-center pt-20"><div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"/><div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none"/><div className="max-w-7xl mx-auto px-6 py-20 md:py-32 w-full"><div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"><motion.div {...fadeUp}><p className="font-mono text-xs tracking-[0.3em] uppercase text-white/40 mb-6">Pentridge / AI Agent Deployment</p><h1 className="font-display text-4xl md:text-5xl lg:text-[43px] leading-[1.2] mb-6 text-[#fafafa]">Deploy AI agents into your business operations.</h1><p className="text-lg md:text-xl text-white/60 leading-relaxed mb-10 max-w-xl">We get your company AI-ready and streamline your marketing, intake, and internal operations.</p><img src="/agent-workspace-activity.jpg" alt="Agent Workspace activity feed" className="w-full max-w-xl rounded-2xl"/></motion.div><motion.div initial={{opacity:0,scale:.8}} animate={{opacity:1,scale:1}} transition={{duration:1,delay:.3}} className="flex flex-col items-center gap-14"><div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"><div className="absolute inset-0 bg-purple-600/25 rounded-full blur-[120px] scale-[1.8] pointer-events-none"/><div className="absolute inset-0 rounded-full overflow-hidden" style={{boxShadow:'0 0 80px rgba(168,85,247,0.5)'}}><img src="/Pentridge.png" alt="Pentridge" className="w-full h-full object-cover mix-blend-lighten"/></div><div className="absolute inset-[-45px] rounded-full border border-purple-500/15 animate-spin"/><div className="absolute inset-[-28px] rounded-full border border-pink-500/10 animate-spin"/></div><a href="https://cal.com/akinyemi-bajulaiye-2jua88/30min" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex min-h-[76px] w-full sm:w-auto sm:px-16 items-center justify-center text-center">Book A Call</a></motion.div></div><motion.div {...fadeUp} className="mt-20 pt-10 border-t border-white/10 flex flex-wrap justify-center gap-12 md:gap-24 font-mono text-sm text-center"><StatCounter end={50} label="Projects Delivered"/><StatCounter end={12} label="Active Partners"/><StatCounter end={500} label="Hours Automated"/></motion.div></div></section>;
const TwoWaysSection = () => <section id="what-we-do" className="bg-black py-24 md:py-32 relative scroll-mt-20"><div className="max-w-7xl mx-auto px-6"><motion.div {...fadeUp} className="mb-16"><p className="section-label mb-4">01 / What We Do</p><h2 className="font-display text-3xl md:text-[43px] leading-[1.2] text-[#fafafa] max-w-2xl">We make your company AI-ready. Then we deploy agents.</h2></motion.div><div className="grid grid-cols-1 md:grid-cols-2 gap-8"><motion.div {...stagger} className="glass-card-purple rounded-2xl p-10 md:p-12"><p className="font-mono text-xs tracking-[0.2em] uppercase text-purple-400 mb-4">Step One</p><h3 className="font-display text-2xl md:text-3xl text-[#fafafa] mb-4">Get AI-Ready</h3><p className="text-white/60 leading-relaxed mb-8">We audit how your business runs, streamline intake and internal operations, and bring your CRM, project management, and marketing data into one Agent Workspace.</p><ul className="space-y-3 mb-8">{['Operations audit and roadmap','Intake and follow-up automation','Internal operations streamlining','Data pipeline into your Agent Workspace'].map(item=><li key={item} className="flex items-center gap-3 text-white/50 text-sm"><span className="w-1 h-1 bg-purple-500 rounded-full"/>{item}</li>)}</ul><a href="https://cal.com/akinyemi-bajulaiye-2jua88/30min" target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center gap-2">Book A Call <ArrowRight size={14}/></a></motion.div><motion.div {...stagger} className="glass-card-purple rounded-2xl p-10 md:p-12"><p className="font-mono text-xs tracking-[0.2em] uppercase text-pink-400 mb-4">Step Two</p><h3 className="font-display text-2xl md:text-3xl text-[#fafafa] mb-4">Deploy AI Agents</h3><p className="text-white/60 leading-relaxed mb-8">With your context centralized, we deploy agents into your marketing and operations through Pentridge MCP, with status updates flowing back into your workspace.</p><ul className="space-y-3 mb-8">{['Marketing and operations agents','Company context and agent skills','Pentridge MCP workflow access','Live status updates'].map(item=><li key={item} className="flex items-center gap-3 text-white/50 text-sm"><span className="w-1 h-1 bg-pink-500 rounded-full"/>{item}</li>)}</ul><a href="https://cal.com/akinyemi-bajulaiye-2jua88/30min" target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center gap-2">Discuss Agent Deployment <ArrowRight size={14}/></a></motion.div></div></div></section>;
const TrustedBySection = () => { const partners=[{name:'Jackson Rental Homes',logo:'/p9.png'},{name:'FunTimes',logo:'/p10.png'},{name:'Blue Proma Digital',logo:'/p11.png'},{name:'Utopos',logo:'/p12.png'},{name:'Pearls Girl Productions',logo:'/p13.png'},{name:'White Law PLLC',logo:'/whitelaw-logo.svg',small:true},{name:'TJ Properties',text:true},{name:'Brave',logo:'/brave-logo.png',small:true}]; const doubled=[...partners,...partners]; return <section className="bg-[#2d1f4e] py-28 md:py-36"><div className="max-w-7xl mx-auto px-6"><motion.div {...fadeUp} className="text-center mb-16"><p className="section-label">02 / Trusted By</p></motion.div><div className="overflow-hidden"><div className="flex items-center gap-16 md:gap-20 animate-scroll-partners">{doubled.map((partner,i)=><div key={`${partner.name}-${i}`} className="flex-shrink-0 flex items-center justify-center h-28 md:h-36">{partner.text?<span className="text-2xl md:text-3xl font-bold text-white/90 tracking-wide whitespace-nowrap">{partner.name}</span>:<img src={partner.logo} alt={partner.name} className={`${partner.small?'h-16 md:h-20':'h-28 md:h-36'} w-auto object-contain`}/>}</div>)}</div></div></div></section>; };
const InfrastructureSection = () => <section className="bg-black py-24 md:py-32 border-t border-white/5"><div className="max-w-7xl mx-auto px-6"><motion.div {...fadeUp} className="mb-16"><p className="section-label mb-4">03 / The Infrastructure</p><h2 className="font-display text-3xl md:text-[43px] text-[#fafafa] max-w-3xl">All of your business data. One Agent Workspace.</h2><p className="text-white/50 text-lg mt-6 max-w-2xl leading-relaxed">We build and host the infrastructure that gives agents access to company context and gives you visibility into what they are doing.</p></motion.div><motion.div {...fadeUp} className="mb-14"><img src="/agent-infrastructure-diagram.jpg" alt="Pentridge AI infrastructure diagram" loading="lazy" className="w-full rounded-2xl border border-white/5"/></motion.div><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{['Data Pipeline','Agent Workspace','Pentridge MCP'].map((label,i)=><motion.div key={label} {...stagger} className="glass-card-purple rounded-2xl p-8 md:p-10"><p className="font-mono text-xs tracking-[0.2em] uppercase text-purple-400 mb-5">{String(i+1).padStart(2,'0')} / {label}</p><p className="text-white/60 text-sm leading-relaxed">{['Your CRM, project management, marketing, and operations tools feed into one place.','One place for business data, documents, skills, and activity.','The connection between company context and agent platforms.'][i]}</p></motion.div>)}</div></div></section>;

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

const ManorSection = () => (
  <section className="bg-black py-24 md:py-32 border-t border-white/5 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div {...fadeUp} className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-[#09080c]">
        <div className="absolute -top-40 -left-28 h-80 w-80 rounded-full bg-purple-600/20 blur-[110px] pointer-events-none" />
        <div className="absolute -bottom-48 right-0 h-96 w-96 rounded-full bg-violet-600/10 blur-[130px] pointer-events-none" />
        <div className="relative z-10 p-7 sm:p-10 lg:p-12">
          <div className="w-full mb-10 md:mb-14">
            <p className="section-label mb-6">05 / Our Product</p>
            <img src="/logo-website.png" alt="Manor logo" loading="lazy" className="h-20 w-28 object-cover object-center mb-8" />
            <h2 className="font-display text-3xl md:text-[43px] leading-[1.2] text-[#fafafa] max-w-5xl">Meet Manor. Your Agentic Platform for knowledge work.</h2>
            <p className="text-white/55 text-lg mt-6 max-w-5xl leading-relaxed">Manor gives service businesses a place to collaborate with a team of specialized AI agents across disciplines.</p>
          </div>
          <a href="https://manor.pentridgemedia.com" target="_blank" rel="noopener noreferrer" className="group block" aria-label="Open Manor">
            <div className="w-full rounded-2xl border border-white/10 bg-black/40 p-1.5 sm:p-2 shadow-[0_30px_100px_rgba(88,28,135,0.24)] transition-all duration-500 group-hover:border-purple-400/35 group-hover:-translate-y-1">
              <img src="/Manor.png" alt="Manor AI agent workspace showing agent conversations, tools, and live task activity" loading="lazy" className="w-full rounded-xl object-cover" />
            </div>
          </a>
          <div className="mt-9 flex justify-center">
            <a href="https://manor.pentridgemedia.com" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-3" aria-label="Visit the Manor website">Learn More <ArrowRight size={15} /></a>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
const ProblemSection = () => { const problems=['CRM, project management, and marketing data locked in separate tools','Manual intake, follow-up, and data entry between disconnected systems','AI experiments without access to real company context','No visibility into what AI is doing for the business']; return <section className="bg-black py-24 md:py-32"><div className="max-w-7xl mx-auto px-6"><motion.div {...fadeUp} className="mb-16"><p className="section-label mb-4">05 / The Problem</p><h2 className="font-display text-3xl md:text-[43px] text-[#fafafa] max-w-3xl">Your business data is scattered. That makes automation harder to use.</h2></motion.div><div className="grid grid-cols-1 md:grid-cols-2 gap-6">{problems.map(problem=><motion.div key={problem} {...stagger} className="glass-card rounded-xl p-8"><p className="font-mono text-xs tracking-[0.15em] uppercase text-red-400/70 mb-3">The blocker</p><p className="text-white/75 text-sm leading-relaxed">{problem}</p></motion.div>)}</div></div></section>; };
const WhyWorkSection = () => <section className="bg-black py-24 md:py-32"><div className="max-w-7xl mx-auto px-6"><motion.div {...fadeUp} className="mb-16"><p className="section-label mb-4">06 / Why Work With Us</p><h2 className="font-display text-3xl md:text-[43px] text-[#fafafa] max-w-3xl">Replace scattered manual work with systems your team can see and use.</h2></motion.div><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{[['Before','Copy-pasting context into ChatGPT one task at a time'],['With Pentridge','Workflows connected to company context'],['With Pentridge','Intake and follow-up organized from first contact to booked work']].map(([label,text],i)=><motion.div key={`${label}-${i}`} {...stagger} className="glass-card rounded-xl p-8"><p className={`font-mono text-xs tracking-[0.15em] uppercase mb-3 ${label==='Before'?'text-red-400/70':'text-purple-400'}`}>{label}</p><p className="text-white/70 text-sm leading-relaxed">{text}</p></motion.div>)}</div></div></section>;
const ComparisonSection = () => <section className="bg-black py-24 md:py-32"><div className="max-w-3xl mx-auto px-6"><motion.div {...fadeUp} className="mb-16 text-center"><p className="section-label mb-4">07 / Why Partner?</p><h2 className="font-display text-3xl md:text-[43px] text-[#fafafa]">Not all AI partners are equal.</h2></motion.div><motion.div {...fadeUp} className="overflow-x-auto"><table className="w-full"><thead><tr className="border-b border-white/10"><th className="text-left py-4 pr-4 font-mono text-xs uppercase text-white/40"></th><th className="py-4 px-8 font-mono text-xs uppercase text-white/40">Agencies</th><th className="py-4 px-8 font-mono text-xs uppercase text-purple-400">Pentridge</th></tr></thead><tbody>{['Operations audit before deploying anything','Data pipeline and Agent Workspace','Live visibility into what agents are doing','Business outcome and ROI focus','Long-term operating partner'].map(row=><tr key={row} className="border-b border-white/5"><td className="py-4 pr-4 text-sm text-white/60">{row}</td><td className="py-4 px-8 text-center"><XIcon size={16} className="text-white/20 mx-auto"/></td><td className="py-4 px-8 text-center"><Check size={16} className="text-purple-400 mx-auto"/></td></tr>)}</tbody></table></motion.div></div></section>;
const mcpPlatforms = [
  { name: 'Grok Bot', logo: '/logos/grokbot.svg' },
  { name: 'Claude Code', logo: '/logos/claudecode.svg' },
  { name: 'Codex', logo: '/logos/codex-blue.png' },
  { name: 'Cursor', logo: '/logos/cursor.svg' },
  { name: 'Hermes', logo: '/logos/hermes.png', rounded: true },
  { name: 'OpenClaw', logo: '/logos/openclaw.svg' },
  { name: 'Manor', logo: '/logo-website.png', manor: true },
];

const PentridgeMCPSection = () => (
  <section className="bg-black py-24 md:py-32 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div {...fadeUp} className="mb-16 text-center">
        <p className="section-label mb-4">04 / Pentridge MCP</p>
        <h2 className="font-display text-3xl md:text-[43px] text-[#fafafa] max-w-3xl mx-auto">One MCP layer. Any agentic platform.</h2>
        <p className="text-white/50 text-lg mt-6 max-w-2xl mx-auto">Connect company context to the platforms your agents use, with updates flowing back into the workspace.</p>
      </motion.div>
      <motion.div {...fadeUp} className="flex justify-center">
        <img src="/pentridge-mcp-hub.jpg" alt="Pentridge MCP hub diagram" loading="lazy" className="w-full max-w-4xl rounded-2xl" />
      </motion.div>
      <motion.div {...fadeUp} className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-x-6 gap-y-10 mt-16 max-w-7xl mx-auto">
        {mcpPlatforms.map((platform) => (
          <div key={platform.name} className="group flex flex-col items-center justify-center px-4 py-5 text-center transition-transform duration-300 hover:-translate-y-1">
            <div className="h-14 flex items-center justify-center mb-4">
              <img
                src={platform.logo}
                alt={`${platform.name} logo`}
                className={`${platform.manor ? 'h-14 w-20 object-cover' : 'h-11 w-11 object-contain'} ${platform.rounded ? 'rounded-xl' : ''}`}
              />
            </div>
            <h3 className="text-white/80 font-medium text-sm group-hover:text-white transition-colors">{platform.name}</h3>
          </div>
        ))}
      </motion.div>
      <motion.p {...fadeUp} className="text-center font-mono text-xs tracking-[0.18em] uppercase text-white/30 mt-12">
        + any MCP-compatible agentic platform or personal agent
      </motion.p>
    </div>
  </section>
);
const ProcessSection = () => <section className="bg-black py-24 md:py-32 border-t border-white/5"><div className="max-w-7xl mx-auto px-6"><motion.div {...fadeUp} className="mb-16"><p className="section-label mb-4">06 / Process</p><h2 className="font-display text-3xl md:text-[43px] text-[#fafafa] max-w-3xl">Audit, centralize, deploy, and keep improving.</h2></motion.div><motion.div {...fadeUp} className="overflow-hidden bg-black"><iframe src="/assembly-line.bundle-2.html?v=contained-fit-2" width="100%" style={{border:0,aspectRatio:'16 / 8.5'}} loading="lazy" title="Our process" className="block w-full bg-black"/></motion.div></div></section>;
const FAQSection = () => { const [openIndex,setOpenIndex]=useState(null); const faqs=[['What does Pentridge actually do?','We get your company AI-ready, then deploy agents into marketing and operations.'],['What is the Agent Workspace?','It is a shared place for company data, documents, workflows, and activity.'],['What is Pentridge MCP?','It connects company context to the agent platforms your team uses.'],['What does pricing look like?','We scope pricing after understanding the business, systems, and first workflows.'],['How long does a typical deployment take?','Focused automations can launch within weeks. Larger builds depend on access and integrations.'],['What happens after agents are deployed?','We can stay involved to monitor, improve, and expand the work.']]; return <section className="bg-black py-24 md:py-32"><div className="max-w-3xl mx-auto px-6"><motion.div {...fadeUp} className="mb-16"><p className="section-label mb-4">07 / FAQ</p><h2 className="font-display text-3xl md:text-[43px] text-[#fafafa]">Questions? We have answers.</h2></motion.div>{faqs.map(([q,a],i)=><div key={q} className="faq-item"><button onClick={()=>setOpenIndex(openIndex===i?null:i)} className="w-full flex items-center justify-between py-6 text-left"><span className="text-white/80">{q}</span>{openIndex===i?<Minus size={18} className="text-purple-400"/>:<Plus size={18} className="text-white/30"/>}</button>{openIndex===i&&<p className="text-white/50 text-sm leading-relaxed pb-6">{a}</p>}</div>)}</div></section>; };
const ParallaxGlow = ({ className = '' }) => { const ref = useRef(null); const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] }); const y = useTransform(scrollYProgress, [0, 1], [-90, 90]); return <div ref={ref} className={`absolute pointer-events-none ${className}`}><motion.div style={{ y }} className="w-72 h-72 rounded-full bg-purple-600/20 blur-[110px]" /></div>; };
const SiteParallax = () => { const { scrollYProgress } = useScroll(); const yLeft = useTransform(scrollYProgress, [0, 1], [-160, 280]); const yRight = useTransform(scrollYProgress, [0, 1], [220, -180]); return <div className="fixed inset-0 overflow-hidden pointer-events-none z-0"><motion.div style={{ y: yLeft }} className="absolute top-[12vh] left-[4vw] w-96 h-96 rounded-full bg-purple-600/10 blur-[130px]"/><motion.div style={{ y: yRight }} className="absolute top-[48vh] right-[2vw] w-[28rem] h-[28rem] rounded-full bg-pink-600/10 blur-[140px]"/></div>; };
const TestimonialsSection = () => { const testimonials=[['Blake McWilliams','Keller Williams','A true expert in the field. Aki understands AI and brings actionable insight.'],['Pedro Rodriguez','Blue Proma Digital','Aki is exceptional in his field. His communication and workflow expertise made the work better.'],['White Law PLLC','','Aki was an excellent asset in the development of our tech stack and we would highly recommend him in the future.'],['LogoSeed','','Amazing and solution-driven. Will definitely work with again.']]; return <section className="bg-black py-24 md:py-32 relative overflow-hidden"><ParallaxGlow className="-top-20 -right-24"/><ParallaxGlow className="bottom-0 -left-24"/><div className="max-w-7xl mx-auto px-6 relative z-10"><motion.div {...fadeUp} className="mb-16"><p className="section-label mb-4">08 / What They Say</p><h2 className="font-display text-3xl md:text-[43px] text-[#fafafa]">Don't take our word for it.</h2></motion.div><div className="grid grid-cols-1 md:grid-cols-2 gap-8">{testimonials.map(([name,company,quote],i)=><motion.div key={name} {...stagger} transition={{duration:.5,delay:i*.08}} className="glass-card rounded-2xl p-10 relative overflow-hidden"><div className="absolute -top-12 -right-8 text-purple-500/10 font-display text-[160px] leading-none pointer-events-none">“</div><span className="text-purple-400 text-4xl leading-none relative">“</span><p className="text-white/70 leading-relaxed mt-2 relative">{quote}</p><div className="mt-8 pt-6 border-t border-white/10 relative"><p className="text-white/90 text-sm">{name}</p>{company&&<p className="font-mono text-xs text-purple-400/70 mt-1">{company}</p>}</div></motion.div>)}</div></div></section>; };
const CTASection = () => <section className="bg-black py-24 md:py-32"><div className="max-w-4xl mx-auto px-6 text-center"><motion.div {...fadeUp}><p className="section-label mb-6">09 / Let's Go</p><h2 className="font-display text-3xl md:text-5xl text-[#fafafa]">AI agents in your operations, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">live in weeks.</span></h2><p className="text-white/50 text-lg mt-6 max-w-2xl mx-auto">We embed with your team, connect your business data, and deploy agents across marketing, intake, and internal operations.</p><a href="https://cal.com/akinyemi-bajulaiye-2jua88/30min" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex mt-8 min-h-[64px] px-12 items-center justify-center">Book A Call</a><NewsletterSignup /></motion.div></div></section>;
const Index = () => { const metaConfig=getMetaConfig('home'); useEffect(()=>{if(window.location.hash==='#what-we-do') setTimeout(()=>document.getElementById('what-we-do')?.scrollIntoView({behavior:'smooth'}),100);},[]); return <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.5}} className="bg-black min-h-screen relative isolate"><SiteParallax/><MetaTags {...metaConfig}/><PageSchemaMarkup pageType="home"/><Navbar/><HeroSection/><TwoWaysSection/><TrustedBySection/><OurWork/><InfrastructureSection/><PentridgeMCPSection/><ManorSection/><IntegrationSources/><ProcessSection/><FAQSection/><TestimonialsSection/><CTASection/></motion.div>; };
export default Index;
