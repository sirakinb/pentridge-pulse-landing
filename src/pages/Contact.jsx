import React from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FuturisticBackLink from '../components/FuturisticBackLink';

const Contact = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="bg-gradient-to-br from-[#1A0B2E] to-[#4B2C70] text-white min-h-screen"
    >
      <div className="container mx-auto px-4 py-6">
        <FuturisticBackLink />

        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl font-bold text-center mb-8"
        >
          Contact the Team
        </motion.h1>
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-3xl font-bold text-center mb-4"
        >
          Ask us a question
        </motion.h2>

        <motion.form 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-md mx-auto space-y-6"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">Name *</label>
            <Input id="name" placeholder="Your name" className="bg-white bg-opacity-10 border-purple-500 text-white placeholder-gray-400" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
            <Input id="email" type="email" placeholder="Your email" className="bg-white bg-opacity-10 border-purple-500 text-white placeholder-gray-400" />
          </div>
          <div>
            <label htmlFor="question" className="block text-sm font-medium mb-2">Question *</label>
            <Textarea id="question" placeholder="Enter your question" className="bg-white bg-opacity-10 border-purple-500 text-white placeholder-gray-400" rows={4} />
          </div>
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            Submit
          </Button>
        </motion.form>
      </div>
    </motion.div>
  );
}

export default Contact;