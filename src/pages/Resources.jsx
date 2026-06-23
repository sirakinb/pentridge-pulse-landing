import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Calculator, FileText } from 'lucide-react';
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

        {/* Coming Soon */}
        <motion.div {...fadeUp} className="text-center">
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-10">
            <h3 className="font-display text-xl text-[#fafafa] capitalize mb-3">
              More Resources Coming Soon
            </h3>
            <p className="text-white/40 mb-6 text-sm">
              We're working on additional guides, case studies, and educational content.
            </p>
            <div className="flex flex-wrap justify-center gap-4 font-mono text-xs text-white/30">
              <span>Implementation Case Studies</span>
              <span>Video Tutorials</span>
              <span>Best Practice Guides</span>
              <span>Industry-Specific Content</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Resources;
