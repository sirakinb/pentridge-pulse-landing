import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Send } from 'lucide-react';
import Navbar from '../components/Navbar';
import PageSchemaMarkup from '../components/PageSchemaMarkup';
import MetaTags from '../components/MetaTags';
import { getMetaConfig } from '../lib/meta-config';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const Contact = () => {
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const metaConfig = getMetaConfig('contact');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formsubmit.co/ajax/aki.b@pentridgemedia.com', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData,
      });

      const result = await response.json();

      if (result.success === 'true') {
        setShowThankYou(true);
        form.reset();
      } else {
        throw new Error(result.message || 'Form submission failed');
      }
    } catch (error) {
      setErrorMessage(`An error occurred: ${error.message}. Please try again or contact support.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black text-white min-h-screen"
    >
      <MetaTags {...metaConfig} />
      <PageSchemaMarkup pageType="contact" />
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
            Get In Touch
          </p>
          <h1 className="font-display text-4xl md:text-[43px] leading-[1.2] text-[#fafafa] capitalize mb-6">
            Contact Pentridge
          </h1>
          <div className="w-16 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6" />
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Have a project in mind or want to learn more about how we can help? Drop us a message.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div {...fadeUp}>
            <div className="glass-card rounded-2xl p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-mono text-xs tracking-[0.15em] uppercase text-white/40 mb-2">
                    Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-mono text-xs tracking-[0.15em] uppercase text-white/40 mb-2">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block font-mono text-xs tracking-[0.15em] uppercase text-white/40 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project"
                    required
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                  />
                </div>
                <input type="hidden" name="_captcha" value="false" />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={14} />
                </button>
              </form>

              {errorMessage && (
                <p className="mt-4 text-red-400 text-sm text-center">{errorMessage}</p>
              )}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div {...fadeUp} className="space-y-8">
            <div className="glass-card-purple rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 rounded-full blur-[60px] pointer-events-none" />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-full mb-4">
                  <Mail className="h-5 w-5 text-purple-400" />
                </div>
                <h3 className="font-display text-xl text-[#fafafa] capitalize mb-2">Email Us</h3>
                <p className="text-white/50 mb-4 text-sm">
                  For general inquiries or project discussions.
                </p>
                <a
                  href="mailto:aki.b@pentridgemedia.com"
                  className="text-purple-400 hover:text-purple-300 transition-colors text-sm font-mono"
                >
                  aki.b@pentridgemedia.com
                </a>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8">
              <p className="font-mono text-xs tracking-[0.15em] uppercase text-purple-400 mb-3">Prefer a call?</p>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Book a time that works for you and let's talk about your project.
              </p>
              <a
                href="https://cal.com/akinyemi-bajulaiye-2jua88/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-2 text-sm"
              >
                Build AI Systems <ArrowRight size={14} />
              </a>
            </div>

            <div className="glass-card rounded-2xl p-8">
              <p className="font-mono text-xs tracking-[0.15em] uppercase text-pink-400 mb-3">Social</p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/pentridgemedia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors text-sm"
                >
                  Instagram
                </a>
                <a
                  href="https://www.youtube.com/@sirakinb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors text-sm"
                >
                  YouTube
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Thank You Modal */}
      {showThankYou && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card-purple rounded-2xl p-8 max-w-sm mx-4 text-center"
          >
            <p className="font-display text-xl text-[#fafafa] capitalize mb-3">Thank you!</p>
            <p className="text-white/50 text-sm mb-6">We'll be in touch shortly.</p>
            <button
              onClick={() => setShowThankYou(false)}
              className="btn-primary inline-flex items-center gap-2"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Contact;
