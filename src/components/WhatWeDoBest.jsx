import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    title: "Custom AI Solutions",
    description: "Customize AI models to suit your specific business needs. Develop and deploy AI chatbots and voice agents to improve customer engagement."
  },
  {
    title: "Web & App Composition",
    description: "Quickly build and deploy functional solutions. Compose applications using AI-driven natural language programming. Design and build unique, visually appealing landing pages."
  },
  {
    title: "API & System Integrations",
    description: "Seamlessly connect your software with third-party applications. Integrate your business applications to streamline operations."
  },
  {
    title: "Automated Workflow Solutions",
    description: "Automate and optimize workflows, streamline proposal and document generation, implement systems to nurture leads, run activation campaigns, and simplify admin processes."
  },
  {
    title: "CRM & Business Management Systems",
    description: "Develop and customize CRM systems. Build internal business management applications."
  },
  {
    title: "AI-Driven Content Automation",
    description: "Develop systems for automated content creation, distribution, and management, enhancing your digital presence and efficiency."
  }
];

const WhatWeDoBest = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-[#1A0B2E] to-[#09090B] text-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          What We Do Best
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, -2).map((service, index) => (
            <motion.div
              key={index}
              className="bg-white bg-opacity-5 rounded-lg p-6 hover:bg-opacity-10 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <div className="w-2/3 flex justify-center -mx-4">
            {services.slice(-2).map((service, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-5 rounded-lg p-6 hover:bg-opacity-10 transition-all duration-300 w-1/2 mx-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (services.length - 2 + index) * 0.1 }}
              >
                <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoBest;
