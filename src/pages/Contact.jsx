import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FuturisticBackLink from '../components/FuturisticBackLink';

const Contact = () => {
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const form = e.target;
    const formData = new FormData(form);

    try {
      console.log('Submitting form...');
      const response = await fetch('https://formsubmit.co/ajax/aki.b@pentridgemedia.com', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData,
      });

      console.log('Response received:', response);
      const result = await response.json();
      console.log('Response JSON:', result);

      if (result.success === 'true') {
        console.log('Form submitted successfully');
        setShowThankYou(true);
        form.reset();
      } else {
        throw new Error(result.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(`An error occurred: ${error.message}. Please try again or contact support.`);
    } finally {
      setIsSubmitting(false);
    }
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
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl font-bold text-center mb-8"
        >
          Contact Pentridge Media
        </motion.h1>
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-3xl font-bold text-center mb-4"
        >
          Get in touch with our team
        </motion.h2>

        <motion.form 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-md mx-auto space-y-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">Name *</label>
            <Input id="name" name="name" placeholder="Your name" required className="bg-white bg-opacity-10 border-purple-500 text-white placeholder-gray-400" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
            <Input id="email" name="email" type="email" placeholder="Your email" required className="bg-white bg-opacity-10 border-purple-500 text-white placeholder-gray-400" />
          </div>
          <div>
            <label htmlFor="question" className="block text-sm font-medium mb-2">Question *</label>
            <Textarea id="question" name="message" placeholder="Enter your question" required className="bg-white bg-opacity-10 border-purple-500 text-white placeholder-gray-400" rows={4} />
          </div>
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>

          {/* Disable captcha */}
          <input type="hidden" name="_captcha" value="false" />
        </motion.form>

        {errorMessage && (
          <p className="mt-4 text-red-500 text-center">{errorMessage}</p>
        )}

        {showThankYou && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg text-black">
              <p className="text-lg font-semibold mb-4">Thank you for your message, we'll be in touch shortly.</p>
              <Button onClick={() => setShowThankYou(false)} className="bg-purple-600 hover:bg-purple-700 text-white">Close</Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Contact;