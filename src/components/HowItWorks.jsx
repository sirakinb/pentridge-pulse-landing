import React from 'react';
import { ArrowRight } from 'lucide-react';

const Step = ({ text }) => (
  <div className="flex flex-col items-center">
    <div className="bg-blue-500 text-white rounded-full p-4 mb-2">
      <span className="text-sm font-semibold">{text}</span>
    </div>
  </div>
);

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto">
          <Step text="Book a discovery call" />
          <ArrowRight className="hidden md:block text-blue-500 my-4 md:my-0" />
          <Step text="On-boarding" />
          <ArrowRight className="hidden md:block text-blue-500 my-4 md:my-0" />
          <Step text="Add Project" />
          <ArrowRight className="hidden md:block text-blue-500 my-4 md:my-0" />
          <Step text="Weekly Consultations (Optional)" />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;