import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ServicesSection = () => {
  const navigate = useNavigate();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
    setIsProductsOpen(false);
  };

  const toggleProducts = () => {
    setIsProductsOpen(!isProductsOpen);
    setIsServicesOpen(false);
  };

  return (
            <section className="py-16 md:py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {/* Services Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative dropdown-container">
              <button 
                className="w-full text-center backdrop-blur-xl mobile-button p-6 md:p-8 transition-all duration-300 group touch-manipulation"
                onClick={toggleServices}
              >
                <h3 className="text-xl md:text-2xl font-bold text-white mobile-text tracking-wide">Services</h3>
              </button>
              {isServicesOpen && (
                <div className="absolute bottom-full left-0 mb-4 w-full backdrop-blur-xl bg-white/25 rounded-2xl shadow-2xl border-2 border-white/30 z-50">
                  <div className="py-4">
                    <button 
                      className="w-full text-left px-6 py-4 text-white hover:text-purple-200 hover:bg-white/20 transition-all duration-300 border-b border-white/20 last:border-b-0 cursor-pointer rounded-lg font-semibold"
                      onClick={() => {
                        navigate('/services/ai-voice-agents');
                        setIsServicesOpen(false);
                      }}
                    >
                      <div className="font-bold text-lg text-white">AI Voice Agents</div>
                      <div className="text-sm text-purple-200 font-medium">24/7 AI phone answering service</div>
                    </button>
                    <button 
                      className="w-full text-left px-6 py-4 text-white hover:text-purple-200 hover:bg-white/20 transition-all duration-300 border-b border-white/20 last:border-b-0 cursor-pointer rounded-lg font-semibold"
                      onClick={() => {
                        navigate('/content-house');
                        setIsServicesOpen(false);
                      }}
                    >
                      <div className="font-bold text-lg text-white">Content House</div>
                      <div className="text-sm text-purple-200 font-medium">AI-powered content creation</div>
                    </button>
                    <button 
                      className="w-full text-left px-6 py-4 text-white hover:text-purple-200 hover:bg-white/20 transition-all duration-300 cursor-pointer rounded-lg font-semibold"
                      onClick={() => {
                        window.open('https://build.pentridgemedia.com', '_blank');
                        setIsServicesOpen(false);
                      }}
                    >
                      <div className="font-bold text-lg text-white">Custom Apps</div>
                      <div className="text-sm text-purple-200 font-medium">Build and validate in 3 weeks</div>
                    </button>
                    <button 
                      className="w-full text-left px-6 py-4 text-white hover:text-purple-200 hover:bg-white/20 transition-all duration-300 cursor-pointer rounded-lg font-semibold"
                      onClick={() => {
                        navigate('/ai-business-automation-guide');
                        setIsServicesOpen(false);
                      }}
                    >
                      <div className="font-bold text-lg text-white">AI Business Automation</div>
                      <div className="text-sm text-purple-200 font-medium">Transform operations with intelligent automation</div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Products Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="relative dropdown-container">
              <button 
                className="w-full text-center backdrop-blur-xl mobile-button p-6 md:p-8 transition-all duration-300 group touch-manipulation"
                onClick={toggleProducts}
              >
                <h3 className="text-xl md:text-2xl font-bold text-white mobile-text tracking-wide">Products</h3>
              </button>
              {isProductsOpen && (
                <div className="absolute bottom-full left-0 mb-4 w-full backdrop-blur-xl bg-white/25 rounded-2xl shadow-2xl border-2 border-white/30 z-50">
                  <div className="py-4">
                    <button 
                      className="w-full text-left px-6 py-4 text-white hover:text-purple-200 hover:bg-white/20 transition-all duration-300 cursor-pointer rounded-lg font-semibold"
                      onClick={() => {
                        window.open('https://www.dropcard.app/', '_blank');
                        setIsProductsOpen(false);
                      }}
                    >
                      <div className="font-bold text-lg text-white">DropCard</div>
                      <div className="text-sm text-purple-200 font-medium">Your networking, upgraded</div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Community Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative"
          >
            <a 
              href="https://discover.circle.so/product/pentridge-club-ai-automation-emerging-tech-community"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center backdrop-blur-xl mobile-button p-6 md:p-8 transition-all duration-300 group touch-manipulation"
            >
              <h3 className="text-xl md:text-2xl font-bold text-white mobile-text tracking-wide">Community</h3>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
