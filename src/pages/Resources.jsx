import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Calculator, FileText, PlayCircle, Workflow, Phone, Scale } from 'lucide-react';
import Navbar from '../components/Navbar';
import MetaTags from '../components/MetaTags';
import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const Resources = () => {
  const resources = [
    {
      badge: 'Complete Guide',
      badgeColor: 'text-purple-400 border-purple-400/30',
      meta: '20 min read',
      title: 'Complete Guide to AI Business Automation',
      description: 'Start here to understand what AI workflow automation can replace inside your business.',
      tags: ['Workflow Automation', 'Implementation', 'Strategy'],
      link: '/ai-business-automation-guide',
      cta: 'Read Guide',
      icon: <BookOpen size={16} />,
    },
    {
      badge: 'Resource Hub',
      badgeColor: 'text-green-400 border-green-400/30',
      meta: '50+ Examples',
      title: 'AI Process Automation Examples',
      description: 'Browse use cases by function and industry to spark automation ideas.',
      tags: ['Use Cases', 'Examples', 'Inspiration'],
      link: '/resources/ai-process-automation-examples',
      cta: 'Explore Examples',
      icon: <FileText size={16} />,
    },
    {
      badge: 'Interactive Tool',
      badgeColor: 'text-orange-400 border-orange-400/30',
      meta: 'Free',
      title: 'AI ROI Calculator',
      description: 'Calculate potential time and cost savings from the workflow you want to automate.',
      tags: ['ROI', 'Calculator', 'Planning'],
      link: '/roi-calculator',
      cta: 'Calculate ROI',
      icon: <Calculator size={16} />,
    },
    {
      badge: 'What We Do',
      badgeColor: 'text-pink-400 border-pink-400/30',
      meta: 'Overview',
      title: 'AI Workflow Automation Services',
      description: 'See how we automate manual workflows — voice agents, CRM automation, follow-up, documents, and custom internal tools.',
      tags: ['Services', 'Automation', 'Integrations'],
      link: '/services',
      cta: 'Explore Services',
      icon: <Workflow size={16} />,
    },
    {
      badge: 'Service',
      badgeColor: 'text-blue-400 border-blue-400/30',
      meta: 'Deep Dive',
      title: 'AI Voice Agents',
      description: 'Voice agents that answer calls, qualify leads, book appointments, and update your CRM around the clock.',
      tags: ['Voice AI', 'Phone Answering', 'CRM'],
      link: '/services/ai-voice-agents',
      cta: 'Learn More',
      icon: <Phone size={16} />,
    },
    {
      badge: 'Industry',
      badgeColor: 'text-yellow-400 border-yellow-400/30',
      meta: 'Law Firms',
      title: 'AI Automation for Law Firms',
      description: 'Automate intake, CRM updates, scheduling, documents, and lead follow-up for independent law firms.',
      tags: ['Legal', 'Intake', 'Automation'],
      link: '/law-firm-automation/',
      cta: 'See Law Firm Automation',
      icon: <Scale size={16} />,
    },
  ];

  const videoResources = [
    {
      eyebrow: 'Property Management',
      title: 'Property Management Automation Walkthrough',
      description:
        'A practical walkthrough of how AI workflow automation can support property management operations, handoffs, and follow-up.',
      videoId: 'zyaW6qqGqXU',
      start: 478,
      youtubeUrl: 'https://www.youtube.com/watch?v=zyaW6qqGqXU&t=478s',
    },
    {
      eyebrow: 'Agent Skills',
      title: 'Building Agent Skills for AI-Native Operations',
      description:
        'A deeper look at how reusable agent skills can support repeatable workflows, implementation speed, and service-business operations.',
      videoId: 'FETkcI0gL5Y',
      start: 1119,
      youtubeUrl: 'https://www.youtube.com/watch?v=FETkcI0gL5Y&t=1119s',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <MetaTags
        title="AI Automation Resources, Guides & Calculators | Pentridge"
        description="Explore Pentridge resources for AI workflow automation, including guides, use cases, ROI calculators, and implementation ideas for service businesses."
        keywords="AI automation resources, AI workflow automation guide, AI process automation examples, automation ROI calculator"
        canonicalUrl="https://www.pentridgemedia.com/resources"
      />
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        {/* Hero */}
        <motion.div {...fadeUp} className="text-center mb-20">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/40 mb-4">Free Resources</p>
          <h1 className="font-display text-4xl md:text-[43px] leading-[1.2] text-[#fafafa] capitalize mb-6">
            AI Resources & Guides
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Access our library of AI guides, case studies, and educational content
            to accelerate your business automation journey.
          </p>
        </motion.div>

        <motion.div {...fadeUp} className="mb-12 bg-white/[0.07] border border-white/10 rounded-2xl p-8">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-white/40 mb-4">Start Here</p>
          <div className="grid md:grid-cols-4 gap-3">
            {['Guide', 'Examples', 'ROI Calculator', 'Automation Audit'].map((step, index) => (
              <div key={step} className="rounded-lg bg-black/30 border border-white/10 p-4">
                <p className="font-mono text-xs text-purple-400 mb-2">{String(index + 1).padStart(2, '0')}</p>
                <p className="text-white/70">{step}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {resources.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/[0.07] border border-white/10 rounded-xl p-8 hover:border-purple-500/30 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`font-mono text-[10px] tracking-[0.15em] uppercase px-3 py-1 border rounded-full ${r.badgeColor}`}>
                  {r.badge}
                </span>
                <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-white/30">{r.meta}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{r.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6 flex-1">{r.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {r.tags.map((tag) => (
                  <span key={tag} className="font-mono text-[10px] tracking-[0.1em] uppercase text-white/30 bg-white/5 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                to={r.link}
                className="btn-primary text-center flex items-center justify-center gap-2 text-xs"
              >
                {r.icon} {r.cta} <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Audit CTA */}
        <motion.div {...fadeUp} className="mb-20">
          <div className="glass-card-purple rounded-2xl p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <h3 className="font-display text-2xl md:text-3xl leading-[1.2] text-[#fafafa] capitalize mb-4">
                Turn these resources into an automation plan.
              </h3>
              <p className="text-white/50 mb-8 max-w-xl mx-auto">
                Read the guide, browse examples, estimate savings, then book an audit so we can identify your first three automations.
              </p>
              <a
                href="https://cal.com/akinyemi-bajulaiye-2jua88/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-2"
              >
                Book an Automation Audit <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Video Resources */}
        <motion.section {...fadeUp} aria-labelledby="video-resources-heading">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/40 mb-3">Video Resources</p>
              <h2 id="video-resources-heading" className="font-display text-2xl md:text-3xl leading-[1.2] text-[#fafafa] capitalize">
                Practical automation walkthroughs
              </h2>
            </div>
            <p className="text-white/45 text-sm leading-relaxed max-w-xl">
              Watch how Pentridge thinks through workflows, implementation patterns, and AI-native operations for service businesses.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {videoResources.map((video) => (
              <article
                key={video.videoId}
                className="bg-white/[0.04] border border-white/10 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="aspect-video bg-black">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${video.videoId}?start=${video.start}&rel=0&modestbranding=1`}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-purple-300 border border-purple-400/20 bg-purple-400/10 px-3 py-1 rounded-full">
                      {video.eyebrow}
                    </span>
                    <PlayCircle size={17} className="text-white/35 shrink-0" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{video.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-5">{video.description}</p>
                  <a
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs tracking-[0.14em] uppercase text-white/55 hover:text-white inline-flex items-center gap-2 transition-colors"
                  >
                    Open on YouTube <ArrowRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Resources;
