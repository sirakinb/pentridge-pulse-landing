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
                className="w-full text-center backdrop-blur-xl purple-frosted-glass rounded-2xl shadow-2xl p-6 md:p-8 transition-all duration-300 group"
                style={{backgroundColor: 'rgba(168, 85, 247, 0.4)', borderColor: 'rgba(196, 181, 253, 0.6)'}}
                onClick={toggleServices}
              >
                <h3 className="text-xl md:text-2xl font-bold text-white">Services</h3>
              </button>
              {isServicesOpen && (
                <div className="absolute bottom-full left-0 mb-4 w-full backdrop-blur-xl bg-purple-400/30 rounded-2xl shadow-2xl border border-purple-300/50 z-50">
                  <div className="py-4">
                    <button 
                      className="w-full text-left px-6 py-4 text-white/90 hover:text-white hover:bg-white/20 transition-all duration-300 border-b border-white/10 last:border-b-0 cursor-pointer rounded-lg"
                      onClick={() => {
                        navigate('/services/ai-voice-agents');
                        setIsServicesOpen(false);
                      }}
                    >
                      <div className="font-medium text-lg">AI Voice Agents</div>
                      <div className="text-sm text-gray-600">Automate customer calls & lead qualification</div>
                    </button>
                    <button 
                      className="w-full text-left px-6 py-4 text-white/90 hover:text-white hover:bg-white/20 transition-all duration-300 border-b border-white/10 last:border-b-0 cursor-pointer rounded-lg"
                      onClick={() => {
                        navigate('/content-house');
                        setIsServicesOpen(false);
                      }}
                    >
                      <div className="font-medium text-lg">Content House</div>
                      <div className="text-sm text-gray-600">AI-powered content creation & strategy</div>
                    </button>
                    <button 
                      className="w-full text-left px-6 py-4 text-white/90 hover:text-white hover:bg-white/20 transition-all duration-300 cursor-pointer rounded-lg"
                      onClick={() => {
                        window.open('https://build.pentridgemedia.com', '_blank');
                        setIsServicesOpen(false);
                      }}
                    >
                      <div className="font-medium text-lg">Custom Apps</div>
                      <div className="text-sm text-white/70">Build and validate in 3 weeks</div>
                    </button>
                    <button 
                      className="w-full text-left px-6 py-4 text-white/90 hover:text-white hover:bg-white/20 transition-all duration-300 cursor-pointer rounded-lg"
                      onClick={() => {
                        navigate('/ai-business-automation-guide');
                        setIsServicesOpen(false);
                      }}
                    >
                      <div className="font-medium text-lg">AI Business Automation</div>
                      <div className="text-sm text-white/70">Transform operations with intelligent automation</div>
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
                className="w-full text-center backdrop-blur-xl purple-frosted-glass rounded-2xl shadow-2xl p-6 md:p-8 transition-all duration-300 group"
                style={{backgroundColor: 'rgba(168, 85, 247, 0.4)', borderColor: 'rgba(196, 181, 253, 0.6)'}}
                onClick={toggleProducts}
              >
                <h3 className="text-xl md:text-2xl font-bold text-white">Products</h3>
              </button>
              {isProductsOpen && (
                <div className="absolute bottom-full left-0 mb-4 w-full backdrop-blur-xl bg-purple-400/30 rounded-2xl shadow-2xl border border-purple-300/50 z-50">
                  <div className="py-4">
                    <button 
                      className="w-full text-left px-6 py-4 text-white/90 hover:text-white hover:bg-white/20 transition-all duration-300 border-b border-white/10 last:border-b-0 cursor-pointer rounded-lg"
                      onClick={() => {
                        window.open('https://www.dropcard.app/', '_blank');
                        setIsProductsOpen(false);
                      }}
                    >
                      <div className="font-medium text-lg">DropCard</div>
                      <div className="text-sm text-white/70">Your networking, upgraded</div>
                    </button>
                    <button 
                      className="w-full text-left px-6 py-4 text-white/90 hover:text-white hover:bg-white/20 transition-all duration-300 cursor-pointer rounded-lg"
                      onClick={() => {
                        window.open('https://blurapp.us', '_blank');
                        setIsProductsOpen(false);
                      }}
                    >
                      <div className="font-medium text-lg">Blur App</div>
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
              className="block w-full text-center backdrop-blur-xl purple-frosted-glass rounded-2xl shadow-2xl p-6 md:p-8 transition-all duration-300 group"
              style={{backgroundColor: 'rgba(168, 85, 247, 0.4)', borderColor: 'rgba(196, 181, 253, 0.6)'}}
            >
              <h3 className="text-xl md:text-2xl font-bold text-white">Community</h3>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
