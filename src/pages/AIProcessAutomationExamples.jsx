import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MetaTags from '../components/MetaTags';
import Navbar from '../components/Navbar';

const AIProcessAutomationExamples = () => {
  const sections = [
    {
      title: 'Marketing & Content Automation',
      anchor: 'marketing-content',
      items: [
        'Content creation at scale (blogs, social, email, ads) with consistent brand voice',
        'Social media scheduling, auto-replies, and trend/topic suggestions',
        'SEO research, content briefs, and on-page optimization with AI',
        'Content repurposing (blog → email → thread → short video captions)',
        'Personalized email marketing by segment, behavior, and lifecycle stage',
        'Ad copy variants and creative suggestions for faster A/B testing',
        'Audience/Persona research and market analysis summaries',
        'Competitor monitoring: scrape, summarize offers, pricing, and positioning',
        'Social listening: track mentions/topics and auto-generate daily PR briefs',
        'AI-generated campaign calendars and channel recommendations'
      ]
    },
    {
      title: 'Sales & Lead Generation Automation',
      anchor: 'sales-lead-gen',
      items: [
        'Lead list building via web scraping (maps, directories, LinkedIn) + enrichment',
        'AI lead qualification and scoring based on forms, usage, and intent signals',
        'Personalized cold outreach drafts from prospect profiles and company news',
        'Auto-generated proposals, quotes, and pitch deck content',
        'Follow-up/nurture sequences personalized per prospect behavior',
        'CRM data entry automation from forms, calls, and meeting notes',
        'AI sales chatbots to capture/qualify website and social traffic 24/7',
        'AI voice agents to answer inbound calls and book meetings automatically',
        'Offer and pricing optimization informed by performance trends',
        'Sales forecasting and pipeline insights from historical data'
      ]
    },
    {
      title: 'Customer Service & Client Experience',
      anchor: 'customer-service',
      items: [
        '24/7 chatbots for FAQs, onboarding, and basic troubleshooting',
        'Multilingual support and instant translation in chat/email',
        'AI-maintained knowledge bases and dynamic FAQ creation',
        'Sentiment analysis of reviews, tickets, and survey responses',
        'Assisted replies: context-aware, empathetic response drafting',
        'Natural-language scheduling/rescheduling via chat or voice',
        'Automated client onboarding sequences and education flows',
        'Post-service surveys, review requests, and escalation workflows',
        'Automated responses to public reviews with on-brand messaging',
        'Proactive outreach based on usage signals and churn risk'
      ]
    },
    {
      title: 'Business Operations & Productivity',
      anchor: 'operations-productivity',
      items: [
        'Email triage, summarization, and draft replies',
        'Calendar optimization and automatic focus-time blocking',
        'Auto-generating tasks/agendas from meeting transcripts',
        'SOP/document generation from outlines or narrated steps',
        'Automated analytics reports with AI-written commentary',
        'Bookkeeping support: receipt capture, categorization, reconciliation',
        'Inventory/ordering suggestions and low-stock automations',
        'Make/Zapier workflows to connect apps and move data',
        'Low-code/AI-assisted scripts for custom integrations and bots',
        'Quality control: data cleanup and anomaly detection'
      ]
    },
    {
      title: 'Solopreneur Workflow & Personal Productivity',
      anchor: 'solopreneur-productivity',
      items: [
        'Idea generation and brainstorming partner on demand',
        'Project breakdown and priority planning from goals',
        'Personal admin: travel, research, price comparisons, reorders',
        'On-demand tutoring and document explainers (contracts, specs)',
        'Curated industry briefings and research summaries',
        'Self-analytics: monthly "CEO report" of your business metrics',
        'Network CRM nudges and drafted check‑ins',
        'AI design/video helpers for graphics and social clips',
        'Daily accountability check-ins and habit nudges',
        'Composable custom agents that chain tools end‑to‑end'
      ]
    },
    {
      title: 'Real Estate & Property Management',
      anchor: 'real-estate-property',
      items: [
        'Automated tenant screening and application review summaries',
        'Resident chatbot for rent, policies, and maintenance intake',
        'Predictive maintenance suggestions and smart work orders',
        'Lease data extraction (amounts, expirations, clauses) and reminders',
        'Listing copy generation and photo enhancement/virtual staging',
        'Smart rent reminders and accounting automations',
        'Resident experience: virtual concierge and community updates'
      ]
    },
    {
      title: 'Service Business Automation (General)',
      anchor: 'service-business',
      items: [
        'Appointment reminders and no‑show prevention (email/SMS/voice)',
        'Dispatch routing and dynamic scheduling optimization',
        'Instant quotes and proposal PDFs from structured inputs',
        'Service reports from dictated notes after each job',
        'Compliance and record-keeping checks against templates',
        'Upsell/cross‑sell timing based on lifecycle signals',
        'Internal Q&A bots for team policies and how‑tos',
        'Localized marketing automations for neighborhoods and groups'
      ]
    }
  ];

  const pageTitle = 'AI Process Automation Examples (50+ Use Cases) | Pentridge';
  const pageDescription = 'Explore 50+ AI process automation use cases for solopreneurs and small businesses across marketing, sales, support, operations, and property management. See how to apply AI voice agents, automation workflows, and ROI modeling.';
  const pageKeywords = 'AI process automation, AI automation use cases, AI business automation, AI phone answering system, AI call answering service, AI appointment scheduling, AI customer service automation, AI voice agent for business, automate customer service calls, AI ROI calculator, voice AI consulting';

  const itemList = sections.flatMap((s) => s.items.map((label, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: `${s.title} – ${label}`
  })));

  const mostRequested = [
    'AI voice agents that book appointments and update the CRM',
    'Lead follow-up sequences across SMS, email, and calendar booking',
    'CRM cleanup from calls, forms, inboxes, and spreadsheets',
    'Proposal and quote generation from structured intake',
    'Automated weekly reports with AI-written summaries',
    'Customer support routing, task creation, and escalation alerts',
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <MetaTags
        title={pageTitle}
        description={pageDescription}
        keywords={pageKeywords}
        pageType="website"
        canonicalUrl="/resources/ai-process-automation-examples"
        ogImage="/og-image.svg"
        twitterImage="/og-image.svg"
      />

      {/* ItemList schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'AI Process Automation Examples (50+ Use Cases)',
            itemListElement: itemList
          })
        }}
      />

      <Navbar />

      <main className="container mx-auto px-4 py-12 pt-28">
        {/* Hero */}
        <motion.header
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold font-display text-[#fafafa] mb-4">
            AI Process Automation Examples (50+ Use Cases)
          </h1>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            A practical hub of AI automation ideas you can deploy today. Explore use cases by
            function and industry, then jump to our guide, calculator, and voice agents to
            implement.
          </p>
        </motion.header>

        <motion.section
          className="mb-12 bg-purple-500/10 border border-purple-500/30 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold font-display text-[#fafafa] mb-4">Most Requested Automations</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {mostRequested.map((item) => (
              <div key={item} className="rounded-lg bg-white/[0.07] border border-white/10 p-4 text-white/70 text-sm">
                {item}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Quick links */}
        <motion.div
          className="grid md:grid-cols-3 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Link to="/ai-business-automation-guide" className="block p-5 rounded-lg border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 transition">
            <div className="text-sm uppercase tracking-wide text-purple-400 font-semibold">Guide</div>
            <div className="text-[#fafafa] font-bold">Complete Guide to AI Business Automation</div>
            <div className="text-sm text-white/60 mt-1">Deep dive + best practices</div>
          </Link>
          <Link to="/roi-calculator" className="block p-5 rounded-lg border border-green-500/30 bg-green-500/10 hover:bg-green-500/20 transition">
            <div className="text-sm uppercase tracking-wide text-green-400 font-semibold">Tool</div>
            <div className="text-[#fafafa] font-bold">AI ROI Calculator</div>
            <div className="text-sm text-white/60 mt-1">Estimate savings & payback</div>
          </Link>
          <Link to="/services/ai-voice-agents" className="block p-5 rounded-lg border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 transition">
            <div className="text-sm uppercase tracking-wide text-blue-400 font-semibold">Service</div>
            <div className="text-[#fafafa] font-bold">AI Phone Answering & Voice Agents</div>
            <div className="text-sm text-white/60 mt-1">24/7 calls, booking, qualification</div>
          </Link>
        </motion.div>

        {/* Anchor nav */}
        <nav className="mb-10">
          <ul className="flex flex-wrap gap-2">
            {sections.map((s) => (
              <li key={s.anchor}>
                <a href={`#${s.anchor}`} className="px-3 py-2 text-sm rounded-md bg-white/[0.07] border border-white/10 hover:bg-white/[0.03] text-white/60 hover:text-[#fafafa] transition">{s.title}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section, sectionIdx) => (
            <motion.section
              key={section.anchor}
              id={section.anchor}
              className="bg-white/[0.07] rounded-xl border border-white/10 p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: sectionIdx * 0.05 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold font-display text-[#fafafa] mb-4">{section.title}</h2>
              <ul className="list-disc pl-6 space-y-2 text-white/60">
                {section.items.map((it, idx) => (
                  <li key={idx}>{it}</li>
                ))}
              </ul>

              {/* Contextual internal links */}
              {section.anchor === 'sales-lead-gen' && (
                <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <p className="text-sm text-white/60">
                    Related: See how <Link className="text-blue-400 font-medium underline" to="/services/ai-voice-agents">AI voice agents</Link> qualify leads and book calls automatically.
                  </p>
                </div>
              )}
              {section.anchor === 'operations-productivity' && (
                <div className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-sm text-white/60">
                    Calculate your potential savings with our <Link className="text-green-400 font-medium underline" to="/roi-calculator">AI ROI Calculator</Link>.
                  </p>
                </div>
              )}
              {section.anchor === 'marketing-content' && (
                <div className="mt-6 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <p className="text-sm text-white/60">
                    New to automation? Start with the <Link className="text-purple-400 font-medium underline" to="/ai-business-automation-guide">AI Business Automation Guide</Link>.
                  </p>
                </div>
              )}
            </motion.section>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.section
          className="text-center py-12 mt-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold font-display mb-3">Ready to implement AI automation?</h2>
          <p className="text-lg opacity-90 mb-6">Not sure where to start? Book a 30-minute workflow audit and we'll identify the first 3 automations worth building.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://cal.com/akinyemi-bajulaiye-2jua88/30min" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white text-purple-700 rounded-md font-semibold hover:bg-gray-100">Book an Automation Audit</a>
            <Link to="/roi-calculator" className="px-6 py-3 bg-white/10 border border-white/30 rounded-md font-semibold hover:bg-white/20">Estimate ROI</Link>
            <Link to="/services/ai-voice-agents" className="px-6 py-3 bg-white/10 border border-white/30 rounded-md font-semibold hover:bg-white/20">Deploy Voice Agents</Link>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default AIProcessAutomationExamples;
