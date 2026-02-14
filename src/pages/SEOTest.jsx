import React from 'react';
import { motion } from 'framer-motion';
import FuturisticBackLink from '../components/FuturisticBackLink';
import SEOValidator from '../components/SEOValidator';
import PageSchemaMarkup from '../components/PageSchemaMarkup';
import MetaTags from '../components/MetaTags';
import { getMetaConfig } from '../lib/meta-config';

const SEOTest = () => {
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

  const metaConfig = getMetaConfig('seo-test');

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="bg-gradient-to-br from-[#1A0B2E] to-[#4B2C70] text-white min-h-screen"
    >
      <MetaTags {...metaConfig} />
      <PageSchemaMarkup pageType="seo-test" />
      <div className="container mx-auto px-4 py-6">
        <FuturisticBackLink />
        
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">SEO Implementation Test</h1>
            <p className="text-xl text-gray-300">
              Validate and test the schema markup implementation for Pentridge
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Schema Markup Overview</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Implemented Schemas</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✅ Organization Schema</li>
                  <li>✅ Service Schema</li>
                  <li>✅ FAQ Schema</li>
                  <li>✅ WebSite Schema</li>
                  <li>✅ LocalBusiness Schema</li>
                  <li>✅ BreadcrumbList Schema</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Technical SEO</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✅ Sitemap.xml</li>
                  <li>✅ Robots.txt</li>
                  <li>✅ Meta Tags</li>
                  <li>✅ Open Graph Tags</li>
                  <li>✅ Twitter Cards</li>
                  <li>✅ Canonical URLs</li>
                </ul>
              </div>
            </div>
          </div>

          <SEOValidator />
        </div>
      </div>
    </motion.div>
  );
};

export default SEOTest; 