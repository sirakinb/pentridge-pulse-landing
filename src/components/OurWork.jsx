import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    tags: ['AI-Driven Content Automation', 'Custom AI Solutions'],
    title: 'Content Automation System',
    description: 'We developed an AI-powered system that automates content creation, curation, and distribution for businesses, significantly improving their digital marketing efficiency.',
    image: '/social-media-app.png'
  },
  {
    tags: ['Business Process Automation', 'Custom AI Solutions'],
    title: 'Automated Lead Magnet Generator',
    description: 'Our team created an intelligent system that automatically generates personalized lead magnets, enhancing lead capture and conversion rates for our client.',
    image: '/mortgage-company.png'
  },
  {
    tags: ['Automated Workflow Solutions', 'Business Process Automation'],
    title: 'Proposal Automation Workflow',
    description: 'We designed and implemented a streamlined workflow that automates the creation, customization, and delivery of business proposals, saving time and improving consistency.',
    image: '/data-scraping.png'
  },
  {
    tags: ['Web & App Development', 'CRM & Business Management Systems'],
    title: 'Productivity Tool',
    description: 'Our team developed a comprehensive productivity tool that integrates task management, time tracking, and project collaboration features, boosting team efficiency and organization.',
    image: '/productivity-tool.png'
  },
  {
    tags: ['Custom AI Solutions', 'API & System Integrations'],
    title: 'AI Image Model',
    description: 'We built a custom AI image model that analyzes and processes visual data, enabling our client to automate image recognition and classification tasks with high accuracy.',
    image: '/ai-image-model.png'
  },
  {
    tags: ['Custom Chrome Extensions', 'Business Process Automation'],
    title: 'Custom Chrome Extension',
    description: 'Our team created a bespoke Chrome extension that automates repetitive browser-based tasks, integrates with existing workflows, and enhances productivity for our client\'s team.',
    image: '/chrome-extension.png'
  }
];

const OurWork = () => {
  return (
    <section className="py-20 relative bg-fixed bg-cover bg-center" style={{ backgroundImage: 'url(/background2.png)' }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-5xl font-bold text-center mb-16 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Check Out Some of <span className="text-gold">Our Work</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              className="relative group h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 relative z-10 card-glow h-full flex flex-col">
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 glow-effect"></div>
                <div className="relative z-20 flex flex-col h-full">
                  <div className="relative overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 text-xs rounded-full bg-purple-700 text-white">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{project.title}</h3>
                    <p className="text-gray-300 mb-4 flex-grow">{project.description}</p>
                    <a href="#" className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-300 mt-auto">
                      Read more <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurWork;