import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, FileText, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
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
      description: 'Everything you need to know about implementing AI automation in your business.',
      tags: ['AI Automation', 'Implementation', 'Strategy'],
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
      description: 'Calculate potential time and cost savings from AI automation.',
      tags: ['ROI', 'Calculator', 'Planning'],
      link: '/roi-calculator',
      cta: 'Calculate ROI',
      icon: <FileText size={16} />,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
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

        {/* Community CTA */}
        <motion.div {...fadeUp} className="mb-20">
          <div className="glass-card-purple rounded-2xl p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-full mb-6">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl leading-[1.2] text-[#fafafa] capitalize mb-4">
                Join Vibe Code Pioneers
              </h3>
              <p className="text-white/50 mb-8 max-w-xl mx-auto">
                Get access to exclusive templates, tools, scripts, and hands-on resources.
                Connect with other business owners implementing AI automation.
              </p>
              <a
                href="https://www.skool.com/vibecodepioneers/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-2"
              >
                <Users size={14} /> Join Community <ArrowRight size={14} />
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
