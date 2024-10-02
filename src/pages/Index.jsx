import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Description from '../components/Description';
import HowItWorks from '../components/HowItWorks';
import PartnerInAI from '../components/PartnerInAI';
import { WhyChooseSection } from '../components/WhyChooseSection';
import OurWork from '../components/OurWork';
import FAQ from '../components/FAQ';
import DiscoveryCallCTA from '../components/DiscoveryCallCTA';
// Remove the Footer import

const Index = () => {
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    in: {
      opacity: 1,
      y: 0
    },
    out: {
      opacity: 0,
      y: -20
    }
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
      className="min-h-screen bg-[#1A0B2E]"
    >
      <Header />
      <Description />
      <HowItWorks />
      <PartnerInAI />
      <WhyChooseSection />
      <OurWork />
      <FAQ />
      <DiscoveryCallCTA />
      {/* Remove the Footer component from here */}
    </motion.div>
  );
};

export default Index;
