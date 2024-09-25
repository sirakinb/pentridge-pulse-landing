import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    title: "Custom AI Solutions",
    description: "Customize AI models to suit your specific business needs. Develop and deploy AI chatbots to improve customer engagement."
  },
  {
    title: "Web & App Development",
    description: "Quickly build and deploy functional solutions. Compose applications using AI-driven natural language programming. Design and build unique, visually appealing landing pages."
  },
  {
    title: "API & System Integrations",
    description: "Seamlessly connect your software with third-party applications. Integrate your business applications to streamline operations."
  },
  {
    title: "Business Process Automation",
    description: "Automate and optimize business workflows. Implement automated systems for nurturing leads and running activation campaigns."
  },
  {
    title: "CRM & Business Management Systems",
    description: "Develop and customize CRM systems. Build internal business management applications."
  },
  {
    title: "Custom Chrome Extensions",
    description: "Create custom Chrome extensions to address specific business needs, offering enhanced functionality and integrations."
  },
  {
    title: "AI-Driven Content Automation",
    description: "Develop systems for automated content creation, distribution, and management, enhancing your digital presence and efficiency."
  },
  {
    title: "Automated Workflow Solutions",
    description: "Streamline the generation of proposals and documents. Simplify and automate administrative processes."
  }
];

const PartnerInAI = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#1A0B2E] to-[#4B2C70] text-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Your Partner in AI-Powered Productivity
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

export default PartnerInAI;