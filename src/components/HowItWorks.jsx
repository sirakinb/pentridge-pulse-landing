import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const steps = [
  { title: 'Book a discovery call', completed: true },
  { title: 'On-boarding', completed: true },
  { title: 'Add Project', completed: true },
  { title: 'Weekly Consultations (optional)', completed: false },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-[#1A0B2E] to-[#09090B] text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-20">How It Works</h2>
        <div className="flex justify-center items-start mb-8">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center w-64">
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center ${step.completed ? 'border-gold' : 'border-gray-400'}`}>
                    <Check className={`w-12 h-12 ${step.completed ? 'text-gold' : 'text-gray-400'}`} />
                  </div>
                  <p className="text-2xl font-bold text-center mt-6">{`Step ${index + 1}`}</p>
                  <p className="text-xl font-semibold text-center mt-2 w-48">{step.title}</p>
                </motion.div>
              </div>
              {index < steps.length - 1 && (
                <div className="w-32 h-0 border-t-4 border-dotted border-gray-400 self-start mt-12"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;