import React from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-[#1A0B2E] to-[#4B2C70] text-white min-h-screen flex flex-col"
    >
      <div className="container mx-auto px-4 py-20 flex-grow">
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
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mb-12 text-gray-300"
        >
          Have a miscellaneous question that's not related to getting started or hiring?
          <br />
          Reach out below & a member of the team will get back to you within two business days.
        </motion.p>
        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-2xl mx-auto space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-2">Full Name *</label>
              <Input id="fullName" placeholder="Enter your full name" className="bg-white bg-opacity-10 border-purple-500 text-white placeholder-gray-400" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email address *</label>
              <Input id="email" type="email" placeholder="Email address" className="bg-white bg-opacity-10 border-purple-500 text-white placeholder-gray-400" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone *</label>
              <Input id="phone" placeholder="Enter your phone number" className="bg-white bg-opacity-10 border-purple-500 text-white placeholder-gray-400" />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject *</label>
              <Input id="subject" placeholder="Type your subject" className="bg-white bg-opacity-10 border-purple-500 text-white placeholder-gray-400" />
            </div>
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
};

export default Contact;