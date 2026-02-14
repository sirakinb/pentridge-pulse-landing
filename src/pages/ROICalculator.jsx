import React from 'react';
import { Link } from 'react-router-dom';
import AIROICalculator from '../components/AIROICalculator';
import MetaTags from '../components/MetaTags';
import Navbar from '../components/Navbar';


const ROICalculator = () => {
  return (
    <>
      <MetaTags
        title="AI ROI Calculator - Calculate Your Business Automation Savings"
        description="Use our free AI ROI Calculator to estimate potential time and cost savings from AI automation. Input your business metrics and get projected annual savings, ROI, and payback period."
        keywords="AI ROI calculator, business automation savings, AI implementation cost, automation ROI, business efficiency calculator"
        ogTitle="AI ROI Calculator - Calculate Your Business Automation Savings"
        ogDescription="Use our free AI ROI Calculator to estimate potential time and cost savings from AI automation. Input your business metrics and get projected annual savings, ROI, and payback period."
        ogImage="/background.png"
        ogUrl="https://www.pentridgemedia.com/roi-calculator"
      />

      <Navbar />

      <main className="bg-black text-white min-h-screen">
        {/* Hero Section */}
        <div className="pt-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                Calculate Your
                <span className="text-purple-600"> AI ROI</span>
              </h1>
              <p className="mt-6 text-xl text-white/50 max-w-3xl mx-auto">
                Discover how much time and money your business could save with AI automation.
                Our interactive calculator provides instant insights into potential savings, ROI, and payback periods.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://pentridgemedia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
                >
                  Explore Our Services
                </a>
                <a
                  href="https://cal.com/akinyemi-bajulaiye-2jua88/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-purple-600 text-base font-medium rounded-md text-purple-400 bg-white/[0.07] hover:border-purple-500/30 transition-colors"
                >
                  Schedule a Free Consultation
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Calculator Section */}
        <div className="py-12">
          <AIROICalculator />
        </div>

        {/* Benefits Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white">
                Why Calculate Your AI ROI?
              </h2>
              <p className="mt-4 text-lg text-white/50">
                Understanding the potential return on investment helps you make informed decisions about AI implementation
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600/20 rounded-lg mb-4">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Data-Driven Decisions</h3>
                <p className="text-white/50">
                  Make informed choices about AI implementation based on concrete numbers and projections
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600/20 rounded-lg mb-4">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Budget Planning</h3>
                <p className="text-white/50">
                  Plan your AI investment with clear understanding of costs, savings, and payback periods
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600/20 rounded-lg mb-4">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Stakeholder Buy-in</h3>
                <p className="text-white/50">
                  Present compelling ROI data to stakeholders and decision-makers in your organization
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Interlinking Section */}
        <div className="bg-white/[0.03] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white">
                Ready to Take the Next Step?
              </h2>
              <p className="mt-4 text-lg text-white/50">
                Now that you've calculated your potential ROI, explore our services and see real results
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Services CTA */}
              <div className="bg-white/[0.07] p-8 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-colors">
                <h3 className="text-2xl font-bold text-white mb-4">Learn More About Our Services</h3>
                <p className="text-white/50 mb-6">
                  Discover how our AI voice agent services can help you achieve the savings you just calculated.
                  We specialize in automating customer interactions and lead qualification.
                </p>
                <Link
                  to="/services/ai-voice-agents"
                  className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Explore AI Voice Agents →
                </Link>
              </div>

              {/* Case Study CTA */}
              <div className="bg-white/[0.07] p-8 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-colors">
                <h3 className="text-2xl font-bold text-white mb-4">See Real Results</h3>
                <p className="text-white/50 mb-6">
                  Learn how we implemented a voice AI agent for a property management company,
                  saving them 40+ hours per week and generating $300K+ in additional annual revenue.
                </p>
                <Link
                  to="/case-studies/property-management-voice-ai"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  Read the Case Study →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-purple-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Business with AI?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Our team of AI experts can help you implement the right automation solutions
              to achieve the savings you just calculated.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://cal.com/akinyemi-bajulaiye-2jua88/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-purple-600 bg-white hover:bg-gray-50 transition-colors"
              >
                Schedule a Free Consultation
              </a>
              <a
                href="https://pentridgemedia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 border border-white text-lg font-medium rounded-md text-white hover:bg-purple-700 transition-colors"
              >
                Explore Our AI Services
              </a>
            </div>
          </div>
        </div>
      </main>

    </>
  );
};

export default ROICalculator;
