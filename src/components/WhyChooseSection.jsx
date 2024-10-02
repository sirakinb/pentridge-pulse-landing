import React from 'react';

const ComparisonColumn = ({ title, items, labels, isPentridgeMedia = false }) => (
  <div className={`flex flex-col ${isPentridgeMedia ? 'bg-purple-600 bg-opacity-20 glow-purple' : 'bg-gray-700 bg-opacity-20'} rounded-lg p-4`}>
    <h3 className="text-xl font-extrabold mb-6 text-center">{title}</h3>
    {items.map((item, index) => (
      <React.Fragment key={index}>
        <div className="grid grid-cols-2 gap-2 py-2 text-sm">
          <div className="text-right font-semibold">{labels[index]}:</div>
          <div className="text-left">
            {isPentridgeMedia ? <span className="text-purple-400 font-bold">{item}</span> : item}
          </div>
        </div>
        {index < items.length - 1 && <div className="border-b border-gray-600 my-2"></div>}
      </React.Fragment>
    ))}
  </div>
);

export function WhyChooseSection() {
  const comparisonData = {
    labels: ['Billing', 'Termination', 'First delivery', 'Time to hire', 'Unlimited Revisions'],
    pentridgeMedia: ['Fixed Monthly Price', 'Cancel Anytime', '2-3 Days', 'Same Day', '✓'],
    freelancer: ['Hourly', 'Project End', 'Several Weeks', 'Days/Weeks', '✗'],
    agencies: ['Project Based', 'No Escape', 'Several Weeks', 'Weeks/Months', '✗'],
    inHouse: ['Salary + Benefits', 'Severance + Frustration', 'Several Weeks', 'Weeks/Months', 'N/A'],
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#1A0B2E] to-[#4B2C70] text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Pentridge Media</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ComparisonColumn 
            title="Pentridge Media" 
            items={comparisonData.pentridgeMedia} 
            labels={comparisonData.labels}
            isPentridgeMedia={true} 
          />
          <ComparisonColumn 
            title="Freelancer" 
            items={comparisonData.freelancer} 
            labels={comparisonData.labels}
          />
          <ComparisonColumn 
            title="Other Agencies" 
            items={comparisonData.agencies} 
            labels={comparisonData.labels}
          />
          <ComparisonColumn 
            title="In-House" 
            items={comparisonData.inHouse} 
            labels={comparisonData.labels}
          />
        </div>
      </div>
    </section>
  );
}