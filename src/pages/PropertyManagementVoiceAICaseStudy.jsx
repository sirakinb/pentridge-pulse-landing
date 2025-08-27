import React from 'react';
import MetaTags from '../components/MetaTags';
import { CheckCircle, BarChart3, Clock, PhoneCall, TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Metric = ({ icon: Icon, label, value, sub }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4 shadow-sm">
    <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
      <Icon className="w-5 h-5 text-violet-700" />
    </div>
    <div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-gray-700 font-medium">{label}</div>
      {sub ? <div className="text-sm text-gray-500 mt-1">{sub}</div> : null}
    </div>
  </div>
);

const PropertyManagementVoiceAICaseStudy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <MetaTags
        title="AI Voice Agent Case Study"
        description="How an AI voice agent captured 641 after-hours calls, generated ~72 qualified leasing leads per week, and unlocked $230K-$692K in annual revenue for a property management company."
        keywords="property management voice AI case study, AI voice agent for property management, automated tenant communication, AI phone agent, after-hours leasing leads"
        canonical="/case-studies/property-management-voice-ai"
        ogImage="/background.png"
        twitterImage="/background.png"
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-violet-100 text-violet-800 text-sm font-medium mb-4">Case Study • Property Management</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Voice AI Case Study
          </h1>
          <p className="mt-4 text-lg text-gray-700 max-w-3xl">
            An AI voice agent for property management answered and triaged thousands of inbound calls, captured after-hours leasing opportunities, and created a measurable revenue lift — while delivering faster, more consistent communication to prospective tenants.
          </p>
        </header>

        {/* Key Metrics */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <Metric icon={PhoneCall} label="Calls handled (~6 weeks)" value="2,296" sub="Jul 2 – Aug 12, 2025" />
          <Metric icon={Clock} label="After-hours share" value="27.9%" sub="641 calls captured after-hours" />
          <Metric icon={BarChart3} label="Qualified after-hours leads" value="~72/wk" sub="422 leasing intents after-hours" />
          <Metric icon={TrendingUp} label="Revenue potential" value="$230k–$692k/yr" sub="At 5–15% lead→lease conversion" />
        </section>

        {/* Narrative */}
        <section className="space-y-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Problem</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-gray-800">
              <ul className="list-disc pl-5 space-y-2">
                <li>High inbound call volume with common questions about availability, open houses, and how to apply.</li>
                <li>Nearly a third of calls arrived after business hours, creating missed opportunities and slower response times.</li>
                <li>Team members spent time triaging repetitive questions instead of focusing on showings, applications, and move-ins.</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Solution</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-gray-800">
              <ul className="list-disc pl-5 space-y-2">
                <li>Deployed an <strong>AI voice agent for property management</strong> to answer calls 24/7, route inquiries, and collect contact details for follow‑up when needed.</li>
                <li>Automated answers for top intents: <em>availability/listings</em>, <em>open houses/tours</em>, <em>application status</em>, and <em>programs/vouchers</em>.</li>
                <li>Consistent information delivery and lead capture during nights and weekends, with logs synced to the team for next‑day action.</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Results</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What callers asked</h3>
                <ul className="space-y-2 text-gray-800">
                  <li><CheckCircle className="inline w-4 h-4 text-violet-600 mr-2"/>Availability / Listings: <strong>41%</strong></li>
                  <li><CheckCircle className="inline w-4 h-4 text-violet-600 mr-2"/>Open Houses / Tours: <strong>30%</strong></li>
                  <li><CheckCircle className="inline w-4 h-4 text-violet-600 mr-2"/>Apply / Application Status: <strong>6%</strong></li>
                  <li><CheckCircle className="inline w-4 h-4 text-violet-600 mr-2"/>Programs / Vouchers: <strong>1.2%</strong></li>
                </ul>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">24/7 coverage unlocked</h3>
                <ul className="space-y-2 text-gray-800">
                  <li><CheckCircle className="inline w-4 h-4 text-violet-600 mr-2"/>After‑hours calls: <strong>27.9%</strong> of all volume (641 calls)</li>
                  <li><CheckCircle className="inline w-4 h-4 text-violet-600 mr-2"/>Qualified after‑hours leasing leads: <strong>~72 per week</strong></li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-violet-50 to-blue-50 border border-violet-200 rounded-xl p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Revenue impact (modeled)</h3>
              <p className="text-gray-800 mb-3">Assumptions: average rent $1,028.02/mo, 10% management fee, 12‑month term → <strong>$1,233.62 net per signed lease per year</strong>. Using qualified <em>after‑hours</em> leads only:</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-800">
                <li>5% conversion → <strong>+3.60</strong> leases/week, <strong>+187</strong>/year ≈ <strong>$230,787</strong>/year</li>
                <li>10% conversion → <strong>+7.20</strong> leases/week, <strong>+375</strong>/year ≈ <strong>$461,573</strong>/year</li>
                <li>15% conversion → <strong>+10.81</strong> leases/week, <strong>+562</strong>/year ≈ <strong>$692,360</strong>/year</li>
              </ul>
              <p className="text-sm text-gray-600 mt-3">Note: If we model uplift on <em>all</em> qualified leads (not just after‑hours), even a conservative 5% conversion implies ~15+ leases/week and &gt;$900K/year in management revenue.</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Why this works</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-gray-800">
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Instant response</strong> for prospects — no voicemail tag, fewer lost leads.</li>
                <li><strong>Consistent answers</strong> across listings, open houses, and how‑to‑apply steps.</li>
                <li><strong>Lead capture</strong> with contact details logged for next‑day human follow‑up.</li>
                <li><strong>24/7 coverage</strong> that converts nights/weekends into active leasing hours.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Strategic Interlinking Section */}
        <section className="mt-12 mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Services CTA */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Learn More About Our Services</h3>
              <p className="text-gray-700 mb-4">
                Discover how our AI voice agent services can transform your business operations 
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
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Calculate Your Potential ROI</h3>
              <p className="text-gray-700 mb-4">
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
        </section>

        {/* CTA */}
        <section className="mt-12">
          <div className="bg-violet-600 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-semibold">Ready to implement an AI voice agent in your business?</h2>
              <p className="text-violet-100 mt-1">We design, deploy, and optimize voice agents for property management and service businesses.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white text-violet-700 hover:bg-violet-50"
                onClick={() => window.open('https://tally.so/r/3NBGBl', '_blank')}
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
        </section>
      </div>
    </div>
  );
};

export default PropertyManagementVoiceAICaseStudy;


