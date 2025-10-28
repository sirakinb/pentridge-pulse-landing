import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ActionCards = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 py-24 relative overflow-hidden">
      {/* Glassmorphic background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            How A Property Management Company Is Saving 500+ Hours With AI Voice Agents
          </h2>
          <p className="text-white/70 text-lg mb-10">
            See the exact system we implemented to automate tenant calls and application inquiries
          </p>
          <div className="flex flex-col gap-4 justify-center items-center w-full max-w-md">
            <button
              onClick={() => navigate('/case-studies/property-management-voice-ai')}
              className="w-full backdrop-blur-xl bg-white/10 hover:bg-white/20 border-2 border-white/30 rounded-full px-8 py-4 text-white font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 hover:scale-105"
            >
              Read the Case Study
            </button>
            <a
              href="https://tally.so/r/3NBGBl"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center backdrop-blur-xl bg-white/10 hover:bg-white/20 border-2 border-white/30 rounded-full px-8 py-4 text-white font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 hover:scale-105 block"
            >
              Book A Call
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ActionCards;
