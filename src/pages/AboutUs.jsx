import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AboutUs = () => {
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
          className="text-6xl font-bold mb-12"
        >
          About Pentridge Media
        </motion.h1>
        <div className="space-y-8 text-xl">
          {[
            "The Pentridge Brand has come a long way since the inception of Pentridge Manor in 2021, a content creation house for capturing stunning photos and videos. Pentridge Manor has become a popular destination for photographers, videographers, artists and other creatives looking for a unique and instagram-youtube worthy location to shoot their content. From fashion and music videos to product launches, film productions, and social media campaigns, \"the manor\" has played host to different functions.",
            "With the evolution of technology and market demands, we recognized a way to provide more value to content creators who occupied our space. As a result, Pentridge Media was born. Pentridge Media emerged as an extension of our creative ecosystem, blending the physical space of content creation with digital media services for editing and content management. However, it didn't stop there. With the rise of ChatGPT and Generative AI, we recognized their potential in transforming the digital landscape. Therefore, we evolved further.",
            "Today, Pentridge Media offers a range of solutions tailored to the needs of modern businesses and creators. From cutting-edge AI and automation services to digital strategy, or simply renting out our space, we are committed to helping you achieve your goals. Join us on this exhilarating journey of content evolution and AI-driven automation, and let us help you bring your vision to life. Pentridge Media, where creativity meets technology."
          ].map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.2 }}
              className="leading-relaxed"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-16"
        >
          <Link to="/" className="text-gold hover:text-white transition-colors inline-block text-xl">
            <motion.span
              whileHover={{ x: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              ← Back to Home
            </motion.span>
          </Link>
        </motion.div>
      </div>
      <footer className="mt-auto py-4 px-4">
        <div className="container mx-auto flex justify-end items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.7 }}
            className="text-sm text-gray-400"
          >
            © 2024 Pentridge Media. All rights reserved.
          </motion.div>
        </div>
      </footer>
    </motion.div>
  );
};

export default AboutUs;