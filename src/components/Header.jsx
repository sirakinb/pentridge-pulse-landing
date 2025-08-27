import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link as ScrollLink } from 'react-scroll';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
    setIsProductsOpen(false);
  };

  const toggleProducts = () => {
    setIsProductsOpen(!isProductsOpen);
    setIsServicesOpen(false);
  };

  const closeAllDropdowns = () => {
    setIsServicesOpen(false);
    setIsProductsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        closeAllDropdowns();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white min-h-screen flex flex-col relative overflow-hidden">
      {/* Glassmorphic background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 flex flex-col flex-grow relative z-10 pt-6">
        <nav className="flex justify-end items-center py-6">
          <div className="hidden md:flex items-center">
            <div className="relative dropdown-container">
              <button 
                className="text-white/90 hover:text-white transition-all duration-300 flex items-center gap-1 backdrop-blur-sm bg-white/5 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10"
                onClick={toggleNavbar}
              >
                <Menu className="h-5 w-5" />
              </button>
              {isNavOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 z-50">
                  <div className="py-3">
                    <Link 
                      to="/blog"
                      className="w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/20 transition-all duration-300 border-b border-white/10 cursor-pointer rounded-lg block"
                      onClick={() => setIsNavOpen(false)}
                    >
                      <div className="font-medium">Blog</div>
                    </Link>
                    <Link 
                      to="/resources"
                      className="w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/20 transition-all duration-300 border-b border-white/10 cursor-pointer rounded-lg block"
                      onClick={() => setIsNavOpen(false)}
                    >
                      <div className="font-medium">Resources</div>
                    </Link>
                    <Link 
                      to="/contact"
                      className="w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/20 transition-all duration-300 border-b border-white/10 cursor-pointer rounded-lg block"
                      onClick={() => setIsNavOpen(false)}
                    >
                      <div className="font-medium">Contact</div>
                    </Link>
                    <Link 
                      to="/about"
                      className="w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/20 transition-all duration-300 border-b border-white/10 cursor-pointer rounded-lg block"
                      onClick={() => setIsNavOpen(false)}
                    >
                      <div className="font-medium">About Us</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleNavbar} className="text-white/90 hover:text-white focus:outline-none transition-all duration-300">
              {isNavOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </nav>
        {isNavOpen && (
          <div className="md:hidden pb-3 mt-3 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-2xl">
            <div className="px-4 py-3 space-y-2 pt-6">
              <div className="text-white/90 font-medium py-2">Services</div>
              <Link to="/services/ai-voice-agents" className="text-white/80 block pl-4 py-2 text-sm hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">AI Voice Agents</Link>
              <Link to="/content-house" className="text-white/80 block pl-4 py-2 text-sm hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">Content House</Link>
              <a href="https://build.pentridgemedia.com" target="_blank" rel="noopener noreferrer" className="text-white/80 block pl-4 py-2 text-sm hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">Custom Apps</a>
              <Link to="/roi-calculator" className="text-white/80 block pl-4 py-2 text-sm hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">AI ROI Calculator</Link>
              <div className="text-white/90 font-medium py-2">Products</div>
              <a href="https://www.dropcard.app/" target="_blank" rel="noopener noreferrer" className="text-white/80 block pl-4 py-2 text-sm hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">DropCard</a>
              <div className="text-white/90 font-medium py-2">Community</div>
              <a href="https://discover.circle.so/product/pentridge-club-ai-automation-emerging-tech-community" target="_blank" rel="noopener noreferrer" className="text-white/80 block pl-4 py-2 text-sm hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">Pentridge Club</a>
              <Link to="/blog" className="text-white/80 block py-2 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">Blog</Link>
              <button className="text-white/80 block w-full text-left py-2 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300" onClick={() => alert('Coming soon')}>Resources</button>
              <Link to="/contact" className="text-white/80 block py-2 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">Contact</Link>
              <Link to="/about" className="text-white/80 block py-2 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">About Us</Link>
            </div>
          </div>
        )}
        <div className="flex-grow flex flex-col justify-start items-start w-full pt-0 pb-12 z-10 -mt-4"> {/* Removed all top padding and added negative margin */}
          <div className="w-full max-w-4xl mx-auto text-center backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 shadow-2xl p-12">
            {/* Services Section Above Header - Hidden on mobile, visible on desktop */}
            <div className="hidden md:grid md:grid-cols-3 gap-8 mb-12">
              {/* Services Card */}
              <div className="relative">
                <div className="relative dropdown-container">
                  <button 
                    className="w-full text-center backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-6 hover:bg-white/15 transition-all duration-300 group"
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                  >
                    <h3 className="text-xl font-bold text-white">Services</h3>
                  </button>
                  {isServicesOpen && (
                    <div className="absolute top-full left-0 mt-4 w-full backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 z-50">
                      <div className="py-4">
                        <button 
                          className="w-full text-left px-6 py-4 text-white/90 hover:text-white hover:bg-white/20 transition-all duration-300 border-b border-white/10 last:border-b-0 cursor-pointer rounded-lg"
                          onClick={() => {
                            navigate('/services/ai-voice-agents');
                            setIsServicesOpen(false);
                          }}
                        >
                          <div className="font-medium text-lg">AI Voice Agents</div>
                        </button>
                        <button 
                          className="w-full text-left px-6 py-4 text-white/90 hover:text-white hover:bg-white/20 transition-all duration-300 border-b border-white/10 last:border-b-0 cursor-pointer rounded-lg"
                          onClick={() => {
                            navigate('/content-house');
                            setIsServicesOpen(false);
                          }}
                        >
                          <div className="font-medium text-lg">Content House</div>
                        </button>
                        <button 
                          className="w-full text-left px-6 py-4 text-white/90 hover:text-white hover:bg-white/20 transition-all duration-300 cursor-pointer rounded-lg"
                          onClick={() => {
                            window.open('https://build.pentridgemedia.com', '_blank');
                            setIsServicesOpen(false);
                          }}
                        >
                          <div className="font-medium text-lg">Custom Apps + Automations</div>
                        </button>
                        <button 
                          className="w-full text-left px-6 py-4 text-white/90 hover:text-white hover:bg-white/20 transition-all duration-300 cursor-pointer rounded-lg"
                          onClick={() => {
                            navigate('/roi-calculator');
                            setIsServicesOpen(false);
                          }}
                        >
                          <div className="font-medium text-lg">AI ROI Calculator</div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Products Card */}
              <div className="relative">
                <div className="relative dropdown-container">
                  <button 
                    className="w-full text-center backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-6 hover:bg-white/15 transition-all duration-300 group"
                    onClick={() => setIsProductsOpen(!isProductsOpen)}
                  >
                    <h3 className="text-xl font-bold text-white">Products</h3>
                  </button>
                  {isProductsOpen && (
                    <div className="absolute top-full left-0 mt-4 w-full backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 z-50">
                      <div className="py-4">
                        <button 
                          className="w-full text-left px-6 py-4 text-white/90 hover:text-white hover:bg-white/20 transition-all duration-300 cursor-pointer rounded-lg"
                          onClick={() => {
                            window.open('https://www.dropcard.app/', '_blank');
                            setIsProductsOpen(false);
                          }}
                        >
                          <div className="font-medium text-lg">DropCard</div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Community Card */}
              <div className="relative">
                <a 
                  href="https://discover.circle.so/product/pentridge-club-ai-automation-emerging-tech-community"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-6 hover:bg-white/15 transition-all duration-300 group"
                >
                  <h3 className="text-xl font-bold text-white">Community</h3>
                </a>
              </div>
            </div>

            <motion.div
              initial={{ y: -100, opacity: 0, rotateY: 180 }}
              animate={{ y: 0, opacity: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative mx-auto mb-4 h-56 w-56"
            >
              <motion.img
                src="/logonew.png"
                alt="Pentridge Media"
                className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] filter brightness-110"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 mt-0 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-blue-200">
              Build With AI
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium leading-relaxed mb-12 text-white/90">
              Systems, Software and Community for<br />
              Main Street Businesses
            </h2>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;