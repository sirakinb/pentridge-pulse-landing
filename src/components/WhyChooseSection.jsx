import React from 'react';

const ComparisonItem = ({ label, pentridgeMedia, freelancer, agencies, inHouse }) => (
  <div className="grid grid-cols-5 gap-4 mb-4">
    <div className="font-semibold">{label}</div>
    <div className="text-center bg-purple-600 bg-opacity-20 rounded-lg py-2 glow-purple">{pentridgeMedia}</div>
    <div className="text-center bg-gray-700 bg-opacity-20 rounded-lg py-2">{freelancer}</div>
    <div className="text-center bg-gray-700 bg-opacity-20 rounded-lg py-2">{agencies}</div>
    <div className="text-center bg-gray-700 bg-opacity-20 rounded-lg py-2">{inHouse}</div>
  </div>
);

export function WhyChooseSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#1A0B2E] to-[#4B2C70] text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-16">Why Choose Pentridge Media</h2>
        <div className="grid grid-cols-5 gap-4 mb-8">
          <div></div>
          <div className="text-center font-bold bg-purple-600 bg-opacity-20 rounded-lg py-2 glow-purple">Pentridge Media</div>
          <div className="text-center font-bold bg-gray-700 bg-opacity-20 rounded-lg py-2">Freelancer</div>
          <div className="text-center font-bold bg-gray-700 bg-opacity-20 rounded-lg py-2">Other Agencies</div>
          <div className="text-center font-bold bg-gray-700 bg-opacity-20 rounded-lg py-2">In-House</div>
        </div>
        <ComparisonItem 
          label="Billing"
          pentridgeMedia={<span className="text-purple-400 font-bold">Fixed Monthly Price</span>}
          freelancer="Hourly"
          agencies="Project Based"
          inHouse="Salary + Benefits"
        />
        <ComparisonItem 
          label="Termination"
          pentridgeMedia={<span className="text-purple-400 font-bold">Cancel Anytime</span>}
          freelancer="Project End"
          agencies="No Escape"
          inHouse="Severance + Frustration"
        />
        <ComparisonItem 
          label="First delivery"
          pentridgeMedia={<span className="text-purple-400 font-bold">2-3 Days</span>}
          freelancer="Several Weeks"
          agencies="Several Weeks"
          inHouse="Several Weeks"
        />
        <ComparisonItem 
          label="Time to hire"
          pentridgeMedia={<span className="text-purple-400 font-bold">Same Day</span>}
          freelancer="Days/Weeks"
          agencies="Weeks/Months"
          inHouse="Weeks/Months"
        />
        <ComparisonItem 
          label="Unlimited Revisions"
          pentridgeMedia={<span className="text-purple-400 font-bold">✓</span>}
          freelancer="✗"
          agencies="✗"
          inHouse="N/A"
        />
      </div>
    </section>
  );
}