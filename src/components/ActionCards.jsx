import React from 'react';
import { motion } from 'framer-motion';

const ActionCards = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 py-16 relative overflow-hidden">
      {/* Glassmorphic background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Let's discuss how AI can help automate your operations
          </p>
          <a
            href="https://tally.so/r/3NBGBl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block backdrop-blur-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 border border-white/20 rounded-full px-10 py-4 text-white font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 hover:scale-105"
          >
            Book a Call
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default ActionCards;
