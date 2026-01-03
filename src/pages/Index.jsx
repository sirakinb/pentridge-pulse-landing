import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import PartnerStrip from '../components/PartnerStrip';
import PageSchemaMarkup from '../components/PageSchemaMarkup';
import MetaTags from '../components/MetaTags';
import { getMetaConfig } from '../lib/meta-config';

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

  const metaConfig = getMetaConfig('home');

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-[#1A0B2E]"
    >
      <MetaTags {...metaConfig} />
      <PageSchemaMarkup pageType="home" />
      <Header />
      <PartnerStrip />
    </motion.div>
  );
};

export default Index;
