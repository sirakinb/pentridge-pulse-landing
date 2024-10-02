import React from 'react';
import { motion } from 'framer-motion';
import FuturisticBackLink from '../components/FuturisticBackLink';

const AboutUs = () => {
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
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center mb-12"
        >
          About Pentridge Media
        </motion.h1>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg space-y-6"
        >
          <p>
            Pentridge Media is a cutting-edge digital agency specializing in AI-powered growth systems for founders and entrepreneurs. Our mission is to leverage the latest advancements in artificial intelligence to create innovative solutions that drive business growth and efficiency.
          </p>
          <p>
            Founded by a team of tech enthusiasts and business strategists, we combine our expertise in AI, machine learning, and digital marketing to deliver tailored strategies that help our clients stay ahead in the rapidly evolving digital landscape.
          </p>
          <p>
            At Pentridge Media, we believe in the power of technology to transform businesses. Our approach is rooted in data-driven decision making, continuous innovation, and a deep understanding of our clients' unique challenges and goals.
          </p>
          <p>
            Whether you're a startup founder looking to scale your operations or an established business aiming to optimize your processes, our team is here to guide you through the exciting possibilities that AI-powered solutions can offer.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AboutUs;