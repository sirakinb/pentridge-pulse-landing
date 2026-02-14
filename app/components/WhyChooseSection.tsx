import React from 'react';

interface ComparisonColumnProps {
  title: string;
  color?: string;
  items: string[];
}

function ComparisonColumn({ title, color = "bg-white", items }: ComparisonColumnProps) {
  return (
    <div className={`${color} text-white rounded-lg p-4`}>
      <h3 className="font-bold mb-2">{title}</h3>
      {items.map((item, index) => (
        <p key={index} className="py-1">{item}</p>
      ))}
    </div>
  );
}

export function WhyChooseSection() {
  return (
    <section className="my-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Why Choose Pentridge</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="font-semibold space-y-4 self-end">
          <p>Billing</p>
          <p>Termination</p>
          <p>First delivery</p>
          <p>Time to hire</p>
          <p>Unlimited Revisions</p>
        </div>
        <ComparisonColumn 
          title="Pentridge" 
          color="bg-purple-600"
          items={[
            "Fixed Monthly Price",
            "Cancel Anytime",
            "2-3 Days",
            "Same Day",
            "✓"
          ]}
        />
        <ComparisonColumn 
          title="Freelancer" 
          color="bg-gray-600"
          items={[
            "Hourly",
            "Project End",
            "1-2 Weeks",
            "1-2 Weeks",
            "✗"
          ]}
        />
        <ComparisonColumn 
          title="Other Agencies" 
          color="bg-gray-600"
          items={[
            "Project Based",
            "Project End",
            "2-4 Weeks",
            "2-4 Weeks",
            "✗"
          ]}
        />
        <ComparisonColumn 
          title="In-House" 
          color="bg-gray-600"
          items={[
            "Salary + Benefits",
            "Complex Process",
            "1-3 Months",
            "1-3 Months",
            "N/A"
          ]}
        />
      </div>
    </section>
  );
}