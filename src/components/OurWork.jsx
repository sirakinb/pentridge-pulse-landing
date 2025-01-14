import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    tags: ['AI-Driven Content Automation', 'Custom AI Solutions'],
    title: 'Content Automation System',
    description: 'Simplify your content creation and distribution with our AI-powered system. Using tools like Make.com and Airtable, we automate everything from content generation to scheduling across multiple platforms.',
    image: '/content automation.png',
    link: 'https://www.youtube.com/watch?v=BnFGCPIO_V4&t=3813s'
  },
  {
    tags: ['Business Process Automation', 'API & System Integrations'],
    title: 'Social Media Funnel',
    description: 'Automate your lead capture using tools like ManyChat, Go High Level, Google Sheets, and Zapier. Build an efficient funnel to capture and manage leads seamlessly.',
    image: '/Social.png',
    link: 'https://www.youtube.com/watch?v=5kX73FzKzXQ&t=277s'
  },
  {
    tags: ['Automated Workflow Solutions', 'Business Process Automation'],
    title: 'Proposal Automation Workflow',
    description: 'Save time on creating proposals with our AI-driven system. Using Zoom, ChatGPT, and Make.com, we automate the process of creating tailored proposals from prospect calls.',
    image: '/proposal.png',
    link: 'https://www.youtube.com/watch?v=uj_k8dxqP00&t=1s'
  },
  {
    tags: ['Web & App Composition'],
    title: 'Productivity Tool',
    description: 'Build web apps with natural language prompts using tools like Cursor, Replit, and Firebase. Leverage AI models like ChatGPT and Claude to develop both front-end and back-end, and streamline the coding process from start to finish.',
    image: '/productivity.png',
    link: 'https://www.youtube.com/watch?v=nM33ZrEmFRQ&t=778s'
  },
  {
    tags: ['Business Process Automation'],
    title: 'A2P 10DLC Registration',
    description: 'For U.S. based businesses, successfully register for A2P 10DLC, a system requiring businesses to register local phone numbers for SMS marketing. Ensure your submission gets approved and streamline your communications.',
    image: '/A2P.png',
    link: 'https://www.youtube.com/watch?v=j1dP2l-jC5A&t=2s'
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
          {projects.slice(0, 3).map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <div className="w-full md:w-2/3 flex flex-col md:flex-row justify-center -mx-4">
            {projects.slice(3).map((project, index) => (
              <div key={index} className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
                <ProjectCard project={project} index={index + 3} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const ProjectCard = ({ project, index }) => (
  <motion.div 
    className="relative group h-full"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 relative z-10 card-glow h-full flex flex-col">
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 glow-effect"></div>
      <div className="relative z-20 flex flex-col h-full">
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="relative overflow-hidden"
        >
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-55 object-cover transition-transform duration-300 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
        </a>
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
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-300 mt-auto"
          >
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  </motion.div>
);

export default OurWork;