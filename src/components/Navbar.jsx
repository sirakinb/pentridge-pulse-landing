import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from 'react-router-dom';
import { Menu, X, Users, Briefcase, Package, Globe, FileText, BookOpen, User, MessageCircle, Calendar, Sparkles, Zap, Building2, Palette, Users2 } from 'lucide-react';

const Navbar = ({ variant = "light" }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const isDark = variant === "dark";

  const toggleNavbar = () => setIsNavOpen((prev) => !prev);

  return (
    <nav className={`w-full sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-opacity-80 ${
      isDark
        ? 'bg-purple-900/90 border-b border-purple-700/50'
        : 'bg-purple-800/90 border-b border-purple-600/30'
    }`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/">
            <img
              src="/logonew.png"
              alt="Pentridge Media"
              className="h-10 w-auto"
            />
          </Link>
        </div>
        <div className={`hidden md:flex items-center gap-6 ${isDark ? 'text-purple-100' : 'text-white'}`}>
          <div className="relative group">
            <button className={`${isDark ? 'text-purple-100 hover:text-purple-200' : 'text-white hover:text-purple-200'} flex items-center gap-1`}>
              Services
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`absolute top-full left-0 mt-2 w-64 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'
            }`}>
              <div className="py-2">
                <Link to="/services/ai-voice-agents" className={`block px-4 py-3 ${isDark ? 'text-slate-100 hover:bg-slate-800 border-slate-800' : 'text-gray-800 hover:bg-purple-50 border-gray-100'} border-b`}>
                  <div className="font-medium">AI Voice Agents</div>
                </Link>
                <Link to="/content-house" className={`block px-4 py-3 ${isDark ? 'text-slate-100 hover:bg-slate-800 border-slate-800' : 'text-gray-800 hover:bg-purple-50 border-gray-100'} border-b`}>
                  <div className="font-medium">Content House</div>
                </Link>
                <a href="https://build.pentridgemedia.com" target="_blank" rel="noopener noreferrer" className={`block px-4 py-3 ${isDark ? 'text-slate-100 hover:bg-slate-800' : 'text-gray-800 hover:bg-purple-50'}`}>
                  <div className="font-medium">Custom Apps + Automations</div>
                </a>
              </div>
            </div>
          </div>
          <div className="relative group">
            <button className={`${isDark ? 'text-purple-100 hover:text-purple-200' : 'text-white hover:text-purple-200'} flex items-center gap-1`}>
              Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`absolute top-full left-0 mt-2 w-64 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'
            }`}>
              <div className="py-2">
                <a href="https://www.dropcard.app/" target="_blank" rel="noopener noreferrer" className={`block px-4 py-3 ${isDark ? 'text-slate-100 hover:bg-slate-800 border-slate-800' : 'text-gray-800 hover:bg-purple-50 border-gray-100'} border-b`}>
                  <div className="font-medium">DropCard</div>
                </a>
                <a href="https://blurapp.us" target="_blank" rel="noopener noreferrer" className={`block px-4 py-3 ${isDark ? 'text-slate-100 hover:bg-slate-800' : 'text-gray-800 hover:bg-purple-50'}`}>
                  <div className="font-medium">Blur App</div>
                </a>
              </div>
            </div>
          </div>
          <a 
            href="https://discover.circle.so/product/pentridge-club-ai-automation-emerging-tech-community" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`${isDark ? 'hover:text-purple-200' : 'hover:text-purple-200'}`}
          >
            Community
          </a>
          <Link to="/blog" className={`${isDark ? 'hover:text-purple-200' : 'hover:text-purple-200'}`}>Blog</Link>
          <Dialog>
            <DialogTrigger asChild>
              <button className={`${isDark ? 'hover:text-purple-200' : 'hover:text-purple-200'}`}>Resources</button>
            </DialogTrigger>
            <DialogContent className={isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : ''}>
              <DialogHeader>
                <DialogTitle>Coming soon</DialogTitle>
              </DialogHeader>
              <p className="text-sm opacity-80">We're polishing our resources hub. Check back soon.</p>
            </DialogContent>
          </Dialog>
          <Link to="/about" className={`${isDark ? 'hover:text-purple-200' : 'hover:text-purple-200'}`}>About Us</Link>
          <Link to="/contact" className={`${isDark ? 'hover:text-purple-200' : 'hover:text-purple-200'}`}>Contact</Link>
          <Button 
            variant="outline"
            className={`${isDark ? 'bg-transparent border-purple-200 text-purple-100 hover:bg-purple-200/20' : 'bg-white border-purple-200 text-purple-800 hover:bg-purple-100'}`}
            onClick={() => window.open('https://tally.so/r/3NBGBl', '_blank')}
          >
            Book Call
          </Button>
        </div>
        <div className="md:hidden">
          <button onClick={toggleNavbar} className={`${isDark ? 'text-purple-100' : 'text-white'} focus:outline-none transition-all duration-200 hover:scale-110`}>
            {isNavOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>
      
      {/* MODERN PURPLE MOBILE MENU */}
      {isNavOpen && (
        <div className="md:hidden fixed inset-x-0 top-[88px] bg-gradient-to-b from-purple-800/98 to-purple-900/98 backdrop-blur-3xl border-t border-purple-400/30 shadow-2xl">
          <div className="px-6 py-6 space-y-6 max-h-[calc(100vh-88px)] overflow-y-auto">
            
            {/* SERVICES SECTION */}
            <div className="group">
              <div className="flex items-center gap-3 text-white font-semibold text-lg mb-4 group-hover:text-purple-200 transition-colors duration-300">
                <div className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 shadow-lg">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <span className="tracking-wide">SERVICES</span>
              </div>
              <div className="ml-2 space-y-2">
                <Link 
                  to="/services/ai-voice-agents" 
                  className="flex items-center gap-3 w-full p-3 rounded-xl bg-purple-700/40 border border-purple-500/30 text-white hover:bg-purple-600/60 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                  onClick={() => setIsNavOpen(false)}
                >
                  <div className="p-2 rounded-lg bg-purple-500/40">
                    <Sparkles className="h-4 w-4 text-purple-200" />
                  </div>
                  <div>
                    <span className="font-medium">AI Voice Agents</span>
                    <p className="text-xs text-purple-200/80 mt-0.5">24/7 intelligent phone automation</p>
                  </div>
                </Link>
                <Link 
                  to="/content-house" 
                  className="flex items-center gap-3 w-full p-3 rounded-xl bg-purple-700/40 border border-purple-500/30 text-white hover:bg-purple-600/60 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                  onClick={() => setIsNavOpen(false)}
                >
                  <div className="p-2 rounded-lg bg-purple-500/40">
                    <Building2 className="h-4 w-4 text-purple-200" />
                  </div>
                  <div>
                    <span className="font-medium">Content House</span>
                    <p className="text-xs text-purple-200/80 mt-0.5">Premium content creation</p>
                  </div>
                </Link>
                <a 
                  href="https://build.pentridgemedia.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 w-full p-3 rounded-xl bg-purple-700/40 border border-purple-500/30 text-white hover:bg-purple-600/60 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-purple-500/40">
                    <Zap className="h-4 w-4 text-purple-200" />
                  </div>
                  <div>
                    <span className="font-medium">Custom Apps + Automations</span>
                    <p className="text-xs text-purple-200/80 mt-0.5">Bespoke solutions & workflows</p>
                  </div>
                </a>
              </div>
            </div>

                                    {/* PRODUCTS SECTION */}
            <div className="group">
              <div className="flex items-center gap-3 text-white font-semibold text-lg mb-4 group-hover:text-purple-200 transition-colors duration-300">
                <div className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 shadow-lg">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <span className="tracking-wide">PRODUCTS</span>
              </div>
              <div className="ml-2 space-y-2">
                <a 
                  href="https://www.dropcard.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 w-full p-3 rounded-xl bg-purple-700/40 border border-purple-500/30 text-white hover:bg-purple-600/60 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-purple-500/40">
                    <Palette className="h-4 w-4 text-purple-200" />
                  </div>
                  <div>
                    <span className="font-medium">DropCard</span>
                    <p className="text-xs text-purple-200/80 mt-0.5">Digital business cards reimagined</p>
                  </div>
                </a>
                <a 
                  href="https://blurapp.us" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 w-full p-3 rounded-xl bg-purple-700/40 border border-purple-500/30 text-white hover:bg-purple-600/60 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-purple-500/40">
                    <Palette className="h-4 w-4 text-purple-200" />
                  </div>
                  <div>
                    <span className="font-medium">Blur App</span>
                  </div>
                </a>
              </div>
            </div>

            {/* COMMUNITY SECTION */}
            <div className="group">
              <div className="flex items-center gap-3 text-white font-semibold text-lg mb-4 group-hover:text-purple-200 transition-colors duration-300">
                <div className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 shadow-lg">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <span className="tracking-wide">COMMUNITY</span>
              </div>
              <div className="ml-2 space-y-2">
                <a 
                  href="https://discover.circle.so/product/pentridge-club-ai-automation-emerging-tech-community" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 w-full p-3 rounded-xl bg-purple-700/40 border border-purple-500/30 text-white hover:bg-purple-600/60 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-purple-500/40">
                    <Users2 className="h-4 w-4 text-purple-200" />
                  </div>
                  <div>
                    <span className="font-medium">Pentridge Club</span>
                    <p className="text-xs text-purple-200/80 mt-0.5">AI & automation community</p>
                  </div>
                </a>
              </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="group">
              <div className="flex items-center gap-3 text-white font-semibold text-lg mb-4 group-hover:text-purple-200 transition-colors duration-300">
                <div className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 shadow-lg">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <span className="tracking-wide">CONTENT</span>
              </div>
              <div className="ml-2 space-y-2">
            <Link
              to="/blog"
              className="flex items-center gap-3 w-full p-3 rounded-xl bg-purple-700/40 border border-purple-500/30 text-white hover:bg-purple-600/60 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              onClick={() => setIsNavOpen(false)}
            >
              <div className="p-2 rounded-lg bg-purple-500/40">
                <BookOpen className="h-4 w-4 text-purple-200" />
              </div>
              <div className="text-left">
                <span className="font-medium">Blog</span>
                <p className="text-xs text-purple-200/80 mt-0.5">Insights & industry updates</p>
              </div>
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                    <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-purple-700/40 border border-purple-500/30 text-white hover:bg-purple-600/60 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                      <div className="p-2 rounded-lg bg-purple-500/40">
                        <BookOpen className="h-4 w-4 text-purple-200" />
                      </div>
                      <div className="text-left">
                        <span className="font-medium">Resources</span>
                        <p className="text-xs text-purple-200/80 mt-0.5">Guides, tools & templates</p>
                      </div>
                    </button>
              </DialogTrigger>
                  <DialogContent className="bg-slate-900/95 border-slate-700 text-slate-100 backdrop-blur-xl">
                <DialogHeader>
                      <DialogTitle className="text-purple-300">Coming Soon</DialogTitle>
                </DialogHeader>
                    <p className="text-sm text-slate-300">We're polishing our resources hub. Check back soon.</p>
              </DialogContent>
            </Dialog>
              </div>
            </div>

            {/* COMPANY SECTION */}
            <div className="group">
              <div className="flex items-center gap-3 text-white font-semibold text-lg mb-4 group-hover:text-purple-200 transition-colors duration-300">
                <div className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 shadow-lg">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <span className="tracking-wide">COMPANY</span>
              </div>
              <div className="ml-2 space-y-2">
                <Link 
                  to="/about" 
                  className="flex items-center gap-3 w-full p-3 rounded-xl bg-purple-700/40 border border-purple-500/30 text-white hover:bg-purple-600/60 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                  onClick={() => setIsNavOpen(false)}
                >
                  <div className="p-2 rounded-lg bg-purple-500/40">
                    <User className="h-4 w-4 text-purple-200" />
                  </div>
                  <div>
                    <span className="font-medium">About Us</span>
                    <p className="text-xs text-purple-200/80 mt-0.5">Our story & mission</p>
                  </div>
                </Link>
                <Link 
                  to="/contact" 
                  className="flex items-center gap-3 w-full p-3 rounded-xl bg-purple-700/40 border border-purple-500/30 text-white hover:bg-purple-600/60 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                  onClick={() => setIsNavOpen(false)}
                >
                  <div className="p-2 rounded-lg bg-purple-500/40">
                    <MessageCircle className="h-4 w-4 text-purple-200" />
                  </div>
                  <div>
                    <span className="font-medium">Contact</span>
                    <p className="text-xs text-purple-200/80 mt-0.5">Get in touch with us</p>
                  </div>
                </Link>
              </div>
            </div>

                                    {/* PURPLE CTA BUTTON */}
            <div className="pt-4 border-t border-purple-500/20">
            <Button 
              variant="outline"
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-purple-500 border border-purple-400/50 text-white font-medium text-base hover:from-purple-500 hover:to-purple-400 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                onClick={() => {
                  window.open('https://tally.so/r/3NBGBl', '_blank');
                  setIsNavOpen(false);
                }}
              >
                <Calendar className="h-5 w-5 mr-2" />
                <span>Book Discovery Call</span>
            </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
