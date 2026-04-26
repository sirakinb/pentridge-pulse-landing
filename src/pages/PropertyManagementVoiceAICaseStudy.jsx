import React from 'react';
import MetaTags from '../components/MetaTags';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { CheckCircle, BarChart3, Clock, PhoneCall, TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Metric = ({ icon: Icon, label, value, sub }) => (
  <div className="bg-white/[0.07] rounded-xl border border-white/10 p-5 flex items-start gap-4">
    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
      <Icon className="w-5 h-5 text-purple-400" />
    </div>
    <div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-white/60 font-medium">{label}</div>
      {sub ? <div className="text-sm text-white/40 mt-1">{sub}</div> : null}
    </div>
  </div>
);

const PropertyManagementVoiceAICaseStudy = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <MetaTags
        title="AI Voice Agent Case Study"
        description="How an AI voice agent captured 641 after-hours calls, generated ~72 qualified leasing leads per week, and unlocked $230K-$692K in annual revenue for a property management company."
        keywords="property management voice AI case study, AI voice agent for property management, automated tenant communication, AI phone agent, after-hours leasing leads"
        canonical="/case-studies/property-management-voice-ai"
        ogImage="/background.png"
        twitterImage="/background.png"
      />
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12 pt-28">
        <motion.header
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium mb-4">Case Study • Property Management</div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#fafafa] leading-tight">
            Voice AI Case Study
          </h1>
          <p className="mt-4 text-lg text-white/60 max-w-3xl">
            An AI voice agent for property management answered and triaged thousands of inbound calls, captured after-hours leasing opportunities, and created a measurable revenue lift — while delivering faster, more consistent communication to prospective tenants.
          </p>
        </motion.header>

        {/* Key Metrics */}
        <motion.section
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Metric icon={PhoneCall} label="Calls handled (~6 weeks)" value="2,296" sub="Jul 2 – Aug 12, 2025" />
          <Metric icon={Clock} label="After-hours share" value="27.9%" sub="641 calls captured after-hours" />
          <Metric icon={BarChart3} label="Qualified after-hours leads" value="~72/wk" sub="422 leasing intents after-hours" />
          <Metric icon={TrendingUp} label="Revenue potential" value="$230k–$692k/yr" sub="At 5–15% lead→lease conversion" />
        </motion.section>

        {/* Narrative */}
        <section className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#fafafa] mb-3">Problem</h2>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 text-white/60">
              <ul className="list-disc pl-5 space-y-2">
                <li>High inbound call volume with common questions about availability, open houses, and how to apply.</li>
                <li>Nearly a third of calls arrived after business hours, creating missed opportunities and slower response times.</li>
                <li>Team members spent time triaging repetitive questions instead of focusing on showings, applications, and move-ins.</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#fafafa] mb-3">Solution</h2>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 text-white/60">
              <ul className="list-disc pl-5 space-y-2">
                <li>Deployed an <strong className="text-white">AI voice agent for property management</strong> to answer calls 24/7, route inquiries, and collect contact details for follow‑up when needed.</li>
                <li>Automated answers for top intents: <em>availability/listings</em>, <em>open houses/tours</em>, <em>application status</em>, and <em>programs/vouchers</em>.</li>
                <li>Consistent information delivery and lead capture during nights and weekends, with logs synced to the team for next‑day action.</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#fafafa] mb-4">Results</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/[0.07] rounded-xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-[#fafafa] mb-3">What callers asked</h3>
                <ul className="space-y-2 text-white/60">
                  <li><CheckCircle className="inline w-4 h-4 text-violet-600 mr-2"/>Availability / Listings: <strong className="text-white">41%</strong></li>
                  <li><CheckCircle className="inline w-4 h-4 text-violet-600 mr-2"/>Open Houses / Tours: <strong className="text-white">30%</strong></li>
                  <li><CheckCircle className="inline w-4 h-4 text-violet-600 mr-2"/>Apply / Application Status: <strong className="text-white">6%</strong></li>
                  <li><CheckCircle className="inline w-4 h-4 text-violet-600 mr-2"/>Programs / Vouchers: <strong className="text-white">1.2%</strong></li>
                </ul>
              </div>
              <div className="bg-white/[0.07] rounded-xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-[#fafafa] mb-3">24/7 coverage unlocked</h3>
                <ul className="space-y-2 text-white/60">
                  <li><CheckCircle className="inline w-4 h-4 text-violet-600 mr-2"/>After‑hours calls: <strong className="text-white">27.9%</strong> of all volume (641 calls)</li>
                  <li><CheckCircle className="inline w-4 h-4 text-violet-600 mr-2"/>Qualified after‑hours leasing leads: <strong className="text-white">~72 per week</strong></li>
                </ul>
              </div>
            </div>

            <div className="bg-white/[0.07] border border-purple-500/30 rounded-xl p-6 mt-6">
              <h3 className="text-lg font-semibold text-[#fafafa] mb-2">Revenue impact (modeled)</h3>
              <p className="text-white/60 mb-3">Assumptions: average rent $1,028.02/mo, 10% management fee, 12‑month term → <strong className="text-white">$1,233.62 net per signed lease per year</strong>. Using qualified <em>after‑hours</em> leads only:</p>
              <ul className="list-disc pl-5 space-y-1 text-white/60">
                <li>5% conversion → <strong className="text-white">+3.60</strong> leases/week, <strong className="text-white">+187</strong>/year ≈ <strong className="text-white">$230,787</strong>/year</li>
                <li>10% conversion → <strong className="text-white">+7.20</strong> leases/week, <strong className="text-white">+375</strong>/year ≈ <strong className="text-white">$461,573</strong>/year</li>
                <li>15% conversion → <strong className="text-white">+10.81</strong> leases/week, <strong className="text-white">+562</strong>/year ≈ <strong className="text-white">$692,360</strong>/year</li>
              </ul>
              <p className="text-sm text-white/40 mt-3">Note: If we model uplift on <em>all</em> qualified leads (not just after‑hours), even a conservative 5% conversion implies ~15+ leases/week and &gt;$900K/year in management revenue.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#fafafa] mb-3">Why this works</h2>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 text-white/60">
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-white">Instant response</strong> for prospects — no voicemail tag, fewer lost leads.</li>
                <li><strong className="text-white">Consistent answers</strong> across listings, open houses, and how‑to‑apply steps.</li>
                <li><strong className="text-white">Lead capture</strong> with contact details logged for next‑day human follow‑up.</li>
                <li><strong className="text-white">24/7 coverage</strong> that converts nights/weekends into active leasing hours.</li>
              </ul>
            </div>
          </motion.div>
        </section>

        {/* Strategic Interlinking Section */}
        <motion.section
          className="mt-12 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Services CTA */}
            <div className="bg-white/[0.07] p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-semibold text-[#fafafa] mb-3">Learn More About Our Services</h3>
              <p className="text-white/60 mb-4">
                Discover how AI voice agents can connect calls, CRM updates, booking, follow-up, and reporting in one workflow
                and help you achieve similar results.
              </p>
              <Link
                to="/services/ai-voice-agents"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Explore AI Voice Agents →
              </Link>
            </div>

            {/* ROI Calculator CTA */}
            <div className="bg-white/[0.07] p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-semibold text-[#fafafa] mb-3">Calculate Your Potential ROI</h3>
              <p className="text-white/60 mb-4">
                Use our AI ROI Calculator to estimate the time and cost savings
                you could achieve with AI automation in your business.
              </p>
              <Link
                to="/roi-calculator"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                Calculate Your ROI →
              </Link>
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-semibold">Ready to implement an AI voice agent in your business?</h2>
              <p className="text-violet-100 mt-1">We design, deploy, and optimize voice agents for property management and service businesses.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white text-violet-700 hover:bg-violet-50"
                onClick={() => window.open('https://cal.com/akinyemi-bajulaiye-2jua88/30min', '_blank')}
              >
                Book a discovery call
              </Button>
              <Link to="/services/ai-voice-agents" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white/10"
                >
                  Explore the voice agent service
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default PropertyManagementVoiceAICaseStudy;
