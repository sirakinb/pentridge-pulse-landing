import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FuturisticBackLink from '../components/FuturisticBackLink';
import PageSchemaMarkup from '../components/PageSchemaMarkup';
import MetaTags from '../components/MetaTags';
import { getMetaConfig } from '../lib/meta-config';
import MobileResponsivenessTest from '../components/MobileResponsivenessTest';

const PerformanceTest = () => {
  const [performanceData, setPerformanceData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const metaConfig = getMetaConfig('performance-test');

  const runPerformanceTest = async () => {
    setIsLoading(true);
    
    try {
      // Simulate performance test
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Get real performance metrics
      const navigation = performance.getEntriesByType('navigation')[0];
      const paint = performance.getEntriesByType('paint');
      
      const testResults = {
        timestamp: new Date().toISOString(),
        pageLoadTime: navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0,
        domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart : 0,
        firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        timeToFirstByte: navigation ? navigation.responseStart - navigation.requestStart : 0,
        resourceCount: performance.getEntriesByType('resource').length,
        totalTransferSize: performance.getEntriesByType('resource').reduce((total, resource) => total + (resource.transferSize || 0), 0),
        recommendations: []
      };

      // Generate recommendations
      if (testResults.pageLoadTime > 3000) {
        testResults.recommendations.push('Page load time is above 3 seconds. Consider optimizing images and reducing bundle size.');
      }
      
      if (testResults.totalTransferSize > 2000000) {
        testResults.recommendations.push('Total transfer size is large. Consider implementing better compression and lazy loading.');
      }

      if (testResults.resourceCount > 50) {
        testResults.recommendations.push('High number of resources. Consider bundling and reducing HTTP requests.');
      }

      setPerformanceData(testResults);
    } catch (error) {
      console.error('Performance test failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPerformanceGrade = (value, thresholds) => {
    if (value <= thresholds.good) return { grade: 'A', color: 'text-green-500', bg: 'bg-green-100' };
    if (value <= thresholds.needsImprovement) return { grade: 'B', color: 'text-yellow-500', bg: 'bg-yellow-100' };
    return { grade: 'C', color: 'text-red-500', bg: 'bg-red-100' };
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
      <MetaTags {...metaConfig} />
      <PageSchemaMarkup pageType="performance-test" />
      
      <div className="container mx-auto px-4 py-6">
        <FuturisticBackLink />
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Performance Testing & Optimization</h1>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Performance Test</h2>
            <button
              onClick={runPerformanceTest}
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out disabled:opacity-50"
            >
              {isLoading ? 'Running Test...' : 'Run Performance Test'}
            </button>
          </div>

          {performanceData && (
            <div className="space-y-6">
              {/* Performance Metrics */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-medium text-gray-300">Page Load Time</h4>
                    <p className="text-2xl font-bold">
                      {Math.round(performanceData.pageLoadTime)}ms
                    </p>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-medium text-gray-300">DOM Content Loaded</h4>
                    <p className="text-2xl font-bold">
                      {Math.round(performanceData.domContentLoaded)}ms
                    </p>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-medium text-gray-300">First Paint</h4>
                    <p className="text-2xl font-bold">
                      {Math.round(performanceData.firstPaint)}ms
                    </p>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-medium text-gray-300">First Contentful Paint</h4>
                    <p className="text-2xl font-bold">
                      {Math.round(performanceData.firstContentfulPaint)}ms
                    </p>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-medium text-gray-300">Time to First Byte</h4>
                    <p className="text-2xl font-bold">
                      {Math.round(performanceData.timeToFirstByte)}ms
                    </p>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-medium text-gray-300">Resource Count</h4>
                    <p className="text-2xl font-bold">
                      {performanceData.resourceCount}
                    </p>
                  </div>
                </div>
              </div>

              {/* Transfer Size */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Transfer Size</h3>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-medium text-gray-300">Total Transfer Size</h4>
                  <p className="text-2xl font-bold">
                    {(performanceData.totalTransferSize / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              {/* Recommendations */}
              {performanceData.recommendations.length > 0 && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Optimization Recommendations</h3>
                  <ul className="space-y-2">
                    {performanceData.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-yellow-400 mt-1">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Mobile Responsiveness Test */}
          <div className="mt-8">
            <MobileResponsivenessTest />
          </div>

          {/* Performance Tips */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-8">
            <h3 className="text-xl font-semibold mb-4">Performance Optimization Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-purple-300 mb-2">Image Optimization</h4>
                <ul className="text-sm space-y-1 text-gray-300">
                  <li>• Use WebP format with fallbacks</li>
                  <li>• Implement lazy loading</li>
                  <li>• Compress images appropriately</li>
                  <li>• Use responsive images</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-purple-300 mb-2">Code Optimization</h4>
                <ul className="text-sm space-y-1 text-gray-300">
                  <li>• Minimize bundle size</li>
                  <li>• Enable code splitting</li>
                  <li>• Use tree shaking</li>
                  <li>• Optimize critical rendering path</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-purple-300 mb-2">Caching Strategy</h4>
                <ul className="text-sm space-y-1 text-gray-300">
                  <li>• Implement service worker caching</li>
                  <li>• Use browser caching headers</li>
                  <li>• Cache static assets</li>
                  <li>• Implement CDN</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-purple-300 mb-2">Server Optimization</h4>
                <ul className="text-sm space-y-1 text-gray-300">
                  <li>• Enable Gzip compression</li>
                  <li>• Use HTTP/2</li>
                  <li>• Optimize TTFB</li>
                  <li>• Use edge caching</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceTest; 