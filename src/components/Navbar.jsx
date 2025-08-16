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
        ? 'bg-slate-950/80 border-b border-slate-800'
        : 'bg-white/90 border-b border-gray-100'
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
        <div className={`hidden md:flex items-center gap-6 ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>
          <div className="relative group">
            <button className={`${isDark ? 'text-slate-200 hover:text-violet-300' : 'text-gray-800 hover:text-purple-700'} flex items-center gap-1`}>
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
            <button className={`${isDark ? 'text-slate-200 hover:text-violet-300' : 'text-gray-800 hover:text-purple-700'} flex items-center gap-1`}>
              Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`absolute top-full left-0 mt-2 w-64 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'
            }`}>
              <div className="py-2">
                <a href="https://www.dropcard.app/" target="_blank" rel="noopener noreferrer" className={`block px-4 py-3 ${isDark ? 'text-slate-100 hover:bg-slate-800' : 'text-gray-800 hover:bg-purple-50'}`}>
                  <div className="font-medium">DropCard</div>
                </a>
              </div>
            </div>
          </div>
          <a 
            href="https://discover.circle.so/product/pentridge-club-ai-automation-emerging-tech-community" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`${isDark ? 'hover:text-violet-300' : 'hover:text-purple-700'}`}
          >
            Community
          </a>
          <Dialog>
            <DialogTrigger asChild>
              <button className={`${isDark ? 'hover:text-violet-300' : 'hover:text-purple-700'}`}>Blog</button>
            </DialogTrigger>
            <DialogContent className={isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : ''}>
              <DialogHeader>
                <DialogTitle>Coming soon</DialogTitle>
              </DialogHeader>
              <p className="text-sm opacity-80">Our blog launches shortly. Subscribe on the resources page to get notified.</p>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <button className={`${isDark ? 'hover:text-violet-300' : 'hover:text-purple-700'}`}>Resources</button>
            </DialogTrigger>
            <DialogContent className={isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : ''}>
              <DialogHeader>
                <DialogTitle>Coming soon</DialogTitle>
              </DialogHeader>
              <p className="text-sm opacity-80">We're polishing our resources hub. Check back soon.</p>
            </DialogContent>
          </Dialog>
          <Link to="/about" className={`${isDark ? 'hover:text-violet-300' : 'hover:text-purple-700'}`}>About Us</Link>
          <Link to="/contact" className={`${isDark ? 'hover:text-violet-300' : 'hover:text-purple-700'}`}>Contact</Link>
          <Button 
            variant="outline"
            className={`${isDark ? 'bg-transparent border-white text-white hover:bg-white/10' : 'border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white'}`}
            onClick={() => window.open('https://tally.so/r/3NBGBl', '_blank')}
          >
            Book Call
          </Button>
        </div>
        <div className="md:hidden">
          <button onClick={toggleNavbar} className={`${isDark ? 'text-slate-200' : 'text-gray-800'} focus:outline-none transition-all duration-200 hover:scale-110`}>
            {isNavOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>
      
      {/* NEW SEXY MOBILE MENU - SIMPLIFIED VERSION */}
      {isNavOpen && (
        <div className="md:hidden bg-gradient-to-b from-purple-900/90 to-purple-800/90 backdrop-blur-xl border-t border-purple-400/30">
          <div className="px-6 py-6 space-y-6">
            
            {/* ACCOUNT SECTION */}
            <div>
              <div className="flex items-center gap-3 text-white font-bold text-lg mb-3">
                <Users className="h-6 w-6 text-purple-300" />
                <span>ACCOUNT</span>
              </div>
              <div className="ml-8 space-y-2">
                <button className="flex items-center gap-3 w-full p-3 rounded-lg bg-purple-700/30 text-white hover:bg-purple-600/50 transition-all duration-200">
                  <Calendar className="h-5 w-5 text-purple-300" />
                  <span>Newsletter</span>
                </button>
                <button className="flex items-center gap-3 w-full p-3 rounded-lg bg-purple-700/30 text-white hover:bg-purple-600/50 transition-all duration-200">
                  <Users2 className="h-5 w-5 text-purple-300" />
                  <span>Community Access</span>
                </button>
              </div>
            </div>

            {/* SERVICES SECTION */}
            <div>
              <div className="flex items-center gap-3 text-white font-bold text-lg mb-3">
                <Briefcase className="h-6 w-6 text-purple-300" />
                <span>SERVICES</span>
              </div>
              <div className="ml-8 space-y-2">
                <Link to="/services/ai-voice-agents" className="flex items-center gap-3 w-full p-3 rounded-lg bg-purple-700/30 text-white hover:bg-purple-600/50 transition-all duration-200">
                  <Sparkles className="h-5 w-5 text-purple-300" />
                  <span>AI Voice Agents</span>
                </Link>
                <Link to="/content-house" className="flex items-center gap-3 w-full p-3 rounded-lg bg-purple-700/30 text-white hover:bg-purple-600/50 transition-all duration-200">
                  <Building2 className="h-5 w-5 text-purple-300" />
                  <span>Content House</span>
                </Link>
                <a href="https://build.pentridgemedia.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-3 rounded-lg bg-purple-700/30 text-white hover:bg-purple-600/50 transition-all duration-200">
                  <Zap className="h-5 w-5 text-purple-300" />
                  <span>Custom Apps + Automations</span>
                </a>
              </div>
            </div>

            {/* PRODUCTS SECTION */}
            <div>
              <div className="flex items-center gap-3 text-white font-bold text-lg mb-3">
                <Package className="h-6 w-6 text-purple-300" />
                <span>PRODUCTS</span>
              </div>
              <div className="ml-8 space-y-2">
                <a href="https://www.dropcard.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-3 rounded-lg bg-purple-700/30 text-white hover:bg-purple-600/50 transition-all duration-200">
                  <Palette className="h-5 w-5 text-purple-300" />
                  <span>DropCard</span>
                </a>
              </div>
            </div>

            {/* COMMUNITY SECTION */}
            <div>
              <div className="flex items-center gap-3 text-white font-bold text-lg mb-3">
                <Globe className="h-6 w-6 text-purple-300" />
                <span>COMMUNITY</span>
              </div>
              <div className="ml-8 space-y-2">
                <a href="https://discover.circle.so/product/pentridge-club-ai-automation-emerging-tech-community" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-3 rounded-lg bg-purple-700/30 text-white hover:bg-purple-600/50 transition-all duration-200">
                  <Users2 className="h-5 w-5 text-purple-300" />
                  <span>Pentridge Club</span>
                </a>
              </div>
            </div>

            {/* CONTENT SECTION */}
            <div>
              <div className="flex items-center gap-3 text-white font-bold text-lg mb-3">
                <FileText className="h-6 w-6 text-purple-300" />
                <span>CONTENT</span>
              </div>
              <div className="ml-8 space-y-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="flex items-center gap-3 w-full p-3 rounded-lg bg-purple-700/30 text-white hover:bg-purple-600/50 transition-all duration-200">
                      <BookOpen className="h-5 w-5 text-purple-300" />
                      <span>Blog</span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-900/95 border-slate-800 text-slate-100 backdrop-blur-xl">
                    <DialogHeader>
                      <DialogTitle>Coming soon</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm opacity-80">Our blog launches shortly. Subscribe on the resources page to get notified.</p>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="flex items-center gap-3 w-full p-3 rounded-lg bg-purple-700/30 text-white hover:bg-purple-600/50 transition-all duration-200">
                      <BookOpen className="h-5 w-5 text-purple-300" />
                      <span>Resources</span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-900/95 border-slate-800 text-slate-100 backdrop-blur-xl">
                    <DialogHeader>
                      <DialogTitle>Coming soon</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm opacity-80">We're polishing our resources hub. Check back soon.</p>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* COMPANY SECTION */}
            <div>
              <div className="flex items-center gap-3 text-white font-bold text-lg mb-3">
                <Building2 className="h-6 w-6 text-purple-300" />
                <span>COMPANY</span>
              </div>
              <div className="ml-8 space-y-2">
                <Link to="/about" className="flex items-center gap-3 w-full p-3 rounded-lg bg-purple-700/30 text-white hover:bg-purple-600/50 transition-all duration-200">
                  <User className="h-5 w-5 text-purple-300" />
                  <span>About Us</span>
                </Link>
                <Link to="/contact" className="flex items-center gap-3 w-full p-3 rounded-lg bg-purple-700/30 text-white hover:bg-purple-600/50 transition-all duration-200">
                  <MessageCircle className="h-5 w-5 text-purple-300" />
                  <span>Contact</span>
                </Link>
              </div>
            </div>

            {/* CTA BUTTON */}
            <div className="pt-4">
              <Button 
                variant="outline"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 border-purple-400 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                onClick={() => window.open('https://tally.so/r/3NBGBl', '_blank')}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book Discovery Call
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
