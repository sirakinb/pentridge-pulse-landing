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
            The Pentridge Brand has come a long way since the inception of Pentridge Manor in 2021, a content creation house for capturing stunning photos and videos. The Pentridge Manor has become a popular destination for photographers, videographers, artists and other creatives looking for a unique and instagram-youtube worthy location to shoot their content. From fashion and music videos to product launches, film productions, and social media campaigns, "the manor" has played host to different functions.
          </p>
          <p>
            With the evolution of technology and market demands, we recognized a way to provide more value to content creators who occupied our space. As a result, Pentridge Media was born. Pentridge Media emerged as an extension of our creative ecosystem, blending the physical space of content creation with digital media services for editing and content management. However, it didn't stop there. With the rise of ChatGPT and Generative AI, we recognized their potential in transforming the digital landscape. Therefore, we evolved further.
          </p>
          <p>
            Today, Pentridge Media offers a range of solutions tailored to the needs of modern businesses and creators. From cutting-edge AI and automation services to digital strategy, or simply renting out our space, we are committed to helping you achieve your goals. Join us on this exhilarating journey of content evolution and AI-driven automation, and let us help you bring your vision to life. Pentridge Media, where creativity meets technology.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AboutUs;