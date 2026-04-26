import React, { useState } from 'react';
import { Calculator, DollarSign, Clock, Users, TrendingUp, Download, Mail } from 'lucide-react';

const AIROICalculator = () => {
  const [formData, setFormData] = useState({
    workflowType: '',
    companySize: '',
    currentHours: '',
    hourlyRate: '',
    automationPotential: 70,
    implementationCost: '',
    email: ''
  });

  const [showResults, setShowResults] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  const workflowPresets = {
    missedCalls: { label: 'Missed calls', currentHours: '15', hourlyRate: '35', automationPotential: 75, implementationCost: '' },
    leadFollowUp: { label: 'Lead follow-up', currentHours: '20', hourlyRate: '40', automationPotential: 80, implementationCost: '' },
    adminReporting: { label: 'Admin reporting', currentHours: '12', hourlyRate: '45', automationPotential: 70, implementationCost: '' },
    crmCleanup: { label: 'CRM cleanup', currentHours: '10', hourlyRate: '35', automationPotential: 65, implementationCost: '' },
    proposalGeneration: { label: 'Proposal generation', currentHours: '18', hourlyRate: '55', automationPotential: 70, implementationCost: '' },
    customerSupport: { label: 'Customer support', currentHours: '25', hourlyRate: '30', automationPotential: 60, implementationCost: '' },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Reset results when inputs change
    if (showResults && name !== 'email') {
      setShowResults(false);
    }
  };

  const calculateROI = () => {
    try {
      const {
        companySize,
        currentHours,
        hourlyRate,
        automationPotential,
        implementationCost
      } = formData;

      if (!currentHours || !hourlyRate || currentHours <= 0 || hourlyRate <= 0) {
        return null;
      }

      // Company size multipliers for more accurate calculations
      const getCompanySizeMultiplier = (size) => {
        switch (size) {
          case '1-10': return { efficiency: 1.2, cost: 0.8, complexity: 0.8 };
          case '11-50': return { efficiency: 1.0, cost: 1.0, complexity: 1.0 };
          case '51-200': return { efficiency: 0.9, cost: 1.3, complexity: 1.2 };
          case '200+': return { efficiency: 0.8, cost: 1.6, complexity: 1.5 };
          default: return { efficiency: 1.0, cost: 1.0, complexity: 1.0 };
        }
      };

      const sizeMultiplier = getCompanySizeMultiplier(companySize);
      
      // Base calculations
      const currentCost = parseFloat(currentHours) * parseFloat(hourlyRate) * 52; // Weekly to annual
      const baseHoursSaved = (parseFloat(currentHours) * parseFloat(automationPotential)) / 100;
      
      // Apply company size efficiency multiplier
      const adjustedHoursSaved = baseHoursSaved * sizeMultiplier.efficiency;
      const annualSavings = adjustedHoursSaved * parseFloat(hourlyRate) * 52;
      
      // Apply company size cost multiplier to implementation cost if not provided
      const adjustedImplementationCost = implementationCost 
        ? parseFloat(implementationCost) 
        : currentCost * 0.15 * sizeMultiplier.cost; // 15% of current cost as baseline, adjusted by size
      
      const netSavings = annualSavings - adjustedImplementationCost;
      const roi = adjustedImplementationCost > 0 ? ((netSavings / adjustedImplementationCost) * 100) : 0;
      const paybackPeriod = adjustedImplementationCost > 0 && annualSavings > 0 ? (adjustedImplementationCost / annualSavings) * 12 : 0;

      return {
        currentCost: currentCost.toFixed(2),
        annualSavings: annualSavings.toFixed(2),
        netSavings: netSavings.toFixed(2),
        roi: roi.toFixed(1),
        paybackPeriod: paybackPeriod.toFixed(1),
        hoursSaved: adjustedHoursSaved.toFixed(1),
        estimatedImplementationCost: adjustedImplementationCost.toFixed(2),
        companySizeMultiplier: sizeMultiplier
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

  const applyPreset = (presetKey) => {
    const preset = workflowPresets[presetKey];

    setFormData(prev => ({
      ...prev,
      workflowType: preset.label,
      currentHours: preset.currentHours,
      hourlyRate: preset.hourlyRate,
      automationPotential: preset.automationPotential,
      implementationCost: preset.implementationCost,
    }));
    setShowResults(false);
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
          workflowType: formData.workflowType,
          companySize: formData.companySize,
          currentHours: formData.currentHours,
          hourlyRate: formData.hourlyRate,
          automationPotential: formData.automationPotential,
          implementationCost: formData.implementationCost,
          calculatedResults: results,
          companySizeMultiplier: results?.companySizeMultiplier,
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
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-4">
          <Calculator className="w-8 h-8 text-purple-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">
          AI ROI Calculator
        </h1>
        <p className="text-lg text-white/60">
          Calculate potential time and cost savings from AI automation for your business
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white/[0.07] rounded-lg p-6 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-purple-400" />
            Your Workflow Metrics
          </h2>
          
          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Workflow Type
              </label>
              <select
                name="workflowType"
                value={formData.workflowType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-white/10 bg-white/5 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
              >
                <option value="">Select workflow</option>
                {Object.values(workflowPresets).map((preset) => (
                  <option key={preset.label} value={preset.label}>{preset.label}</option>
                ))}
              </select>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {Object.entries(workflowPresets).map(([key, preset]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => applyPreset(key)}
                    className="text-xs text-left px-3 py-2 rounded-md bg-white/[0.07] border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Company Size (employees)
              </label>
              <select
                name="companySize"
                value={formData.companySize}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-white/10 bg-white/5 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
              >
                <option value="">Select size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="200+">200+ employees</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Current Weekly Hours Spent on Manual Tasks
              </label>
              <input
                type="number"
                name="currentHours"
                value={formData.currentHours}
                onChange={handleInputChange}
                placeholder="e.g., 40"
                className="w-full px-3 py-2 border border-white/10 bg-white/5 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Average Hourly Rate ($)
              </label>
              <input
                type="number"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleInputChange}
                placeholder="e.g., 25"
                className="w-full px-3 py-2 border border-white/10 bg-white/5 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
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
                <span className="text-sm font-medium text-white/60 w-12">
                  {formData.automationPotential}%
                </span>
              </div>
              <p className="text-xs text-white/40 mt-1">
                How much of this work could be automated?
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Implementation Cost ($) - Optional
              </label>
              <input
                type="number"
                name="implementationCost"
                value={formData.implementationCost}
                onChange={handleInputChange}
                placeholder="e.g., 5000"
                className="w-full px-3 py-2 border border-white/10 bg-white/5 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
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
        <div className="bg-white/[0.07] rounded-lg p-6 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
            Your Results
          </h2>

          {!showResults ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-white/[0.07] rounded-full mx-auto mb-4 flex items-center justify-center">
                <Calculator className="w-8 h-8 text-white/40" />
              </div>
              <p className="text-white/40">
                Enter your workflow metrics and click Calculate ROI to see your potential savings
              </p>
            </div>
          ) : results ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-500/10 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Clock className="w-5 h-5 text-blue-400 mr-2" />
                    <span className="text-sm font-medium text-blue-300">Hours Saved/Week</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-300">{results.hoursSaved}</p>
                </div>

                <div className="bg-green-500/10 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <DollarSign className="w-5 h-5 text-green-400 mr-2" />
                    <span className="text-sm font-medium text-green-300">Annual Savings</span>
                  </div>
                  <p className="text-2xl font-bold text-green-300">${results.annualSavings}</p>
                </div>
              </div>

              <div className="bg-purple-500/20 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-5 h-5 text-purple-400 mr-2" />
                  <span className="text-sm font-medium text-purple-300">Current Annual Cost</span>
                </div>
                <p className="text-2xl font-bold text-purple-300">${results.currentCost}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-500/10 p-4 rounded-lg">
                  <span className="text-sm font-medium text-orange-300">ROI</span>
                  <p className="text-2xl font-bold text-orange-300">{results.roi}%</p>
                </div>

                <div className="bg-indigo-500/10 p-4 rounded-lg">
                  <span className="text-sm font-medium text-indigo-300">Payback (months)</span>
                  <p className="text-2xl font-bold text-indigo-300">{results.paybackPeriod}</p>
                </div>
              </div>

              <div className="bg-green-500/10 p-4 rounded-lg">
                <span className="text-sm font-medium text-green-300">Net Annual Savings</span>
                <p className="text-2xl font-bold text-green-300">${results.netSavings}</p>
              </div>

              {!formData.implementationCost && (
                <div className="bg-blue-500/10 p-4 rounded-lg">
                  <span className="text-sm font-medium text-blue-300">Estimated Implementation Cost</span>
                  <p className="text-2xl font-bold text-blue-300">${results.estimatedImplementationCost}</p>
                  <p className="text-xs text-blue-400 mt-1">Based on company size and current costs</p>
                </div>
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
              <div className="w-16 h-16 bg-red-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Calculator className="w-8 h-8 text-red-400" />
              </div>
              <p className="text-red-400 font-medium">Error calculating results</p>
              <p className="text-white/40 text-sm mt-2">Please check your inputs and try again</p>
            </div>
          )}
        </div>
      </div>

      {/* Email Collection Modal */}
      {showEmailForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111] border border-white/10 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-white mb-4">
              Get Your Detailed ROI Report
            </h3>
            <p className="text-white/60 mb-4">
              Enter your email to receive a workflow-specific analysis with actionable insights and implementation recommendations. We will prepare your personalized report and send it shortly.
            </p>
            
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 border border-white/10 bg-white/5 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                  required
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEmailForm(false)}
                  className="flex-1 bg-white/10 text-white/60 py-2 px-4 rounded-md hover:bg-white/20 transition-colors"
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
