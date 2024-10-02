import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

const ContactForm = () => {
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>

        {/* Disable captcha */}
        <input type="hidden" name="_captcha" value="false" />
      </form>

      {errorMessage && (
        <p className="mt-4 text-red-500">{errorMessage}</p>
      )}

      {showThankYou && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-4">Thank you for your message, we'll be in touch shortly.</p>
            <Button onClick={() => setShowThankYou(false)}>Close</Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ContactForm;