import React from 'react';
import { Link } from 'react-router-dom';
import AIROICalculator from '../components/AIROICalculator';
import MetaTags from '../components/MetaTags';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
      
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <Link to="/" className="text-gray-500 hover:text-gray-700">
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-4 text-sm font-medium text-gray-500">ROI Calculator</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                Calculate Your
                <span className="text-purple-600"> AI ROI</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
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
                  href="https://tally.so/r/3NBGBl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-purple-600 text-base font-medium rounded-md text-purple-600 bg-white hover:bg-purple-50 transition-colors"
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
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Why Calculate Your AI ROI?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Understanding the potential return on investment helps you make informed decisions about AI implementation
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Data-Driven Decisions</h3>
                <p className="text-gray-600">
                  Make informed choices about AI implementation based on concrete numbers and projections
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Budget Planning</h3>
                <p className="text-gray-600">
                  Plan your AI investment with clear understanding of costs, savings, and payback periods
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Stakeholder Buy-in</h3>
                <p className="text-gray-600">
                  Present compelling ROI data to stakeholders and decision-makers in your organization
                </p>
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
                href="https://tally.so/r/3NBGBl"
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
