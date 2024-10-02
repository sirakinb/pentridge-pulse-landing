import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const FuturisticBackLink = () => {
  return (
    <motion.div 
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <Link 
        to="/" 
        className="group flex items-center text-gold hover:text-white transition-all duration-300 inline-block text-xl"
        onClick={() => window.scrollTo(0, 0)}
      >
        <motion.div
          className="relative mr-3"
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div
            className="absolute inset-0 bg-gold opacity-50 rounded-full blur-md"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <ArrowLeft size={24} className="relative z-10 text-white" />
        </motion.div>
        <motion.div
          className="relative overflow-hidden"
          whileHover="hover"
        >
          <motion.span
            className="inline-block"
            variants={{
              hover: {
                y: -30,
                transition: { duration: 0.3, ease: "easeInOut" }
              }
            }}
          >
            Back to Home
          </motion.span>
          <motion.span
            className="absolute left-0 top-full"
            variants={{
              hover: {
                y: -30,
                transition: { duration: 0.3, ease: "easeInOut" }
              }
            }}
          >
            Return to Base
          </motion.span>
        </motion.div>
        <motion.div
          className="ml-2 h-px bg-gold"
          initial={{ width: 0 }}
          whileHover={{ width: 50 }}
          transition={{ duration: 0.3 }}
        />
      </Link>
    </motion.div>
  );
};

export default FuturisticBackLink;