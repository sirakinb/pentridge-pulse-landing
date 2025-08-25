import React, { useState } from 'react';
import { Calculator, DollarSign, Clock, Users, TrendingUp, Download, Mail } from 'lucide-react';

const AIROICalculator = () => {
  const [formData, setFormData] = useState({
    companySize: '',
    currentHours: '',
    hourlyRate: '',
    automationPotential: 70,
    implementationCost: '',
    email: ''
  });

  const [showResults, setShowResults] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Reset results when inputs change
    if (showResults) {
      setShowResults(false);
    }
  };

  const calculateROI = () => {
    try {
      const {
        currentHours,
        hourlyRate,
        automationPotential,
        implementationCost
      } = formData;

      if (!currentHours || !hourlyRate || currentHours <= 0 || hourlyRate <= 0) {
        return null;
      }

      const currentCost = parseFloat(currentHours) * parseFloat(hourlyRate) * 52; // Weekly to annual
      const hoursSaved = (parseFloat(currentHours) * parseFloat(automationPotential)) / 100;
      const annualSavings = hoursSaved * parseFloat(hourlyRate) * 52;
      const netSavings = annualSavings - parseFloat(implementationCost || 0);
      const roi = implementationCost && parseFloat(implementationCost) > 0 ? ((netSavings / parseFloat(implementationCost)) * 100) : 0;
      const paybackPeriod = implementationCost && parseFloat(implementationCost) > 0 && annualSavings > 0 ? (parseFloat(implementationCost) / annualSavings) * 12 : 0;

      return {
        currentCost: currentCost.toFixed(2),
        annualSavings: annualSavings.toFixed(2),
        netSavings: netSavings.toFixed(2),
        roi: roi.toFixed(1),
        paybackPeriod: paybackPeriod.toFixed(1),
        hoursSaved: hoursSaved.toFixed(1)
      };
    } catch (error) {
      console.error('Error calculating ROI:', error);
      return null;
    }
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    if (formData.currentHours && formData.hourlyRate) {
      setShowResults(true);
    }
  };

  const handleGetReport = () => {
    setShowEmailForm(true);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send email to Make.com webhook
      const response = await fetch('https://hook.us2.make.com/cr5gcenu27h7vhpceaw9rvtc4khymdm9', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          companySize: formData.companySize,
          currentHours: formData.currentHours,
          hourlyRate: formData.hourlyRate,
          automationPotential: formData.automationPotential,
          implementationCost: formData.implementationCost,
          calculatedResults: results,
          timestamp: new Date().toISOString(),
          source: 'AI ROI Calculator'
        })
      });

      if (response.ok) {
        alert('Thank you! We\'ve received your request. Your detailed ROI report will be prepared and sent to your email shortly.');
        setShowEmailForm(false);
        // Reset email field
        setFormData(prev => ({ ...prev, email: '' }));
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      alert('There was an issue submitting your request. Please try again or contact us directly.');
    }
  };

  const results = showResults ? calculateROI() : null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
          <Calculator className="w-8 h-8 text-purple-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI ROI Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Calculate potential time and cost savings from AI automation for your business
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-purple-600" />
            Your Business Metrics
          </h2>
          
          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Size (employees)
              </label>
              <select
                name="companySize"
                value={formData.companySize}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="200+">200+ employees</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Weekly Hours Spent on Manual Tasks
              </label>
              <input
                type="number"
                name="currentHours"
                value={formData.currentHours}
                onChange={handleInputChange}
                placeholder="e.g., 40"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Average Hourly Rate ($)
              </label>
              <input
                type="number"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleInputChange}
                placeholder="e.g., 25"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Automation Potential (%)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  name="automationPotential"
                  min="10"
                  max="90"
                  value={formData.automationPotential}
                  onChange={handleInputChange}
                  className="flex-1"
                />
                <span className="text-sm font-medium text-gray-600 w-12">
                  {formData.automationPotential}%
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                How much of this work could be automated?
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Implementation Cost ($) - Optional
              </label>
              <input
                type="number"
                name="implementationCost"
                value={formData.implementationCost}
                onChange={handleInputChange}
                placeholder="e.g., 5000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 transition-colors font-medium flex items-center justify-center"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Calculate ROI
            </button>
          </form>
        </div>

        {/* Results Display */}
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
            Your Results
          </h2>

          {!showResults ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Calculator className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">
                Enter your business metrics and click "Calculate ROI" to see your potential savings
              </p>
            </div>
          ) : results ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Clock className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-blue-800">Hours Saved/Week</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">{results.hoursSaved}</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-800">Annual Savings</span>
                  </div>
                  <p className="text-2xl font-bold text-green-900">${results.annualSavings}</p>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="text-sm font-medium text-purple-800">Current Annual Cost</span>
                </div>
                <p className="text-2xl font-bold text-purple-900">${results.currentCost}</p>
              </div>

              {formData.implementationCost && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <span className="text-sm font-medium text-orange-800">ROI</span>
                      <p className="text-2xl font-bold text-orange-900">{results.roi}%</p>
                    </div>

                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <span className="text-sm font-medium text-indigo-800">Payback (months)</span>
                      <p className="text-2xl font-bold text-indigo-900">{results.paybackPeriod}</p>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <span className="text-sm font-medium text-green-800">Net Annual Savings</span>
                    <p className="text-2xl font-bold text-green-900">${results.netSavings}</p>
                  </div>
                </>
              )}

              <button
                onClick={handleGetReport}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors font-medium flex items-center justify-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Get Detailed Report
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Calculator className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-red-600 font-medium">Error calculating results</p>
              <p className="text-gray-500 text-sm mt-2">Please check your inputs and try again</p>
            </div>
          )}
        </div>
      </div>

      {/* Email Collection Modal */}
      {showEmailForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Get Your Detailed ROI Report
            </h3>
            <p className="text-gray-600 mb-4">
              Enter your email to receive a comprehensive analysis with actionable insights and implementation recommendations. We'll prepare your personalized report and send it shortly.
            </p>
            
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEmailForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors font-medium flex items-center justify-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIROICalculator;
