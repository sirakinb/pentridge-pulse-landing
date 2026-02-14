import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Description = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-black via-[#1A0B2E] to-[#4B2C70] text-white overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-xl"></div>
        </motion.div>
        
        <motion.div
          initial={{ y: -100, opacity: 0, rotateY: 180 }}
          animate={{ y: 0, opacity: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative mx-auto mb-16 h-60 w-60"
        >
          <motion.img
            src="/logonew.png"
            alt="Pentridge"
            className="w-full h-full object-contain"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
        
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          We didn't reinvent the wheel. <br />
          <span className="text-gold">Just business automation.</span>
        </motion.h2>
        
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p className="text-xl md:text-2xl mb-12 text-center leading-relaxed">
            <span className="font-semibold">Pentridge</span> leverages AI, Automation, and Digital Strategies to{' '}
            <motion.span 
              className="inline-block"
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              save you time
            </motion.span> and{' '}
            <motion.span 
              className="inline-block"
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              propel your business forward
            </motion.span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Description;
