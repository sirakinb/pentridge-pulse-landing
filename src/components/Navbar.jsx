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
      
      {/* Enhanced Mobile Menu Dropdown */}
      <div className={`md:hidden transition-all duration-500 ease-in-out ${
        isNavOpen 
          ? 'max-h-screen opacity-100 translate-y-0' 
          : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div 
          className="relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(196, 181, 253, 0.25) 100%)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(196, 181, 253, 0.3)',
            borderBottom: '1px solid rgba(196, 181, 253, 0.2)'
          }}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-purple-400/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-16 h-16 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-pink-400/20 rounded-full blur-lg animate-pulse delay-500"></div>
          </div>
          
          <div className="relative px-6 py-6 space-y-4">
            {/* Account Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/90 font-semibold text-lg">
                <Users className="h-5 w-5 text-purple-300" />
                <span>Account</span>
              </div>
              <div className="ml-8 space-y-2">
                <button className="flex items-center gap-3 w-full p-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 group">
                  <Calendar className="h-4 w-4 text-purple-300 group-hover:text-purple-200 transition-colors" />
                  <span className="text-sm">Newsletter</span>
                </button>
                <button className="flex items-center gap-3 w-full p-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 group">
                  <Users2 className="h-4 w-4 text-purple-300 group-hover:text-purple-200 transition-colors" />
                  <span className="text-sm">Community Access</span>
                </button>
              </div>
            </div>

            {/* Services Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/90 font-semibold text-lg">
                <Briefcase className="h-5 w-5 text-purple-300" />
                <span>Services</span>
              </div>
              <div className="ml-8 space-y-2">
                <Link to="/services/ai-voice-agents" className="flex items-center gap-3 w-full p-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 group">
                  <Sparkles className="h-4 w-4 text-purple-300 group-hover:text-purple-200 transition-colors" />
                  <span className="text-sm">AI Voice Agents</span>
                </Link>
                <Link to="/content-house" className="flex items-center gap-3 w-full p-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 group">
                  <Building2 className="h-4 w-4 text-purple-300 group-hover:text-purple-200 transition-colors" />
                  <span className="text-sm">Content House</span>
                </Link>
                <a href="https://build.pentridgemedia.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 group">
                  <Zap className="h-4 w-4 text-purple-300 group-hover:text-purple-200 transition-colors" />
                  <span className="text-sm">Custom Apps + Automations</span>
                </a>
              </div>
            </div>

            {/* Products Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/90 font-semibold text-lg">
                <Package className="h-5 w-5 text-purple-300" />
                <span>Products</span>
              </div>
              <div className="ml-8 space-y-2">
                <a href="https://www.dropcard.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 group">
                  <Palette className="h-4 w-4 text-purple-300 group-hover:text-purple-200 transition-colors" />
                  <span className="text-sm">DropCard</span>
                </a>
              </div>
            </div>

            {/* Community Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/90 font-semibold text-lg">
                <Globe className="h-5 w-5 text-purple-300" />
                <span>Community</span>
              </div>
              <div className="ml-8 space-y-2">
                <a href="https://discover.circle.so/product/pentridge-club-ai-automation-emerging-tech-community" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 group">
                  <Users2 className="h-4 w-4 text-purple-300 group-hover:text-purple-200 transition-colors" />
                  <span className="text-sm">Pentridge Club</span>
                </a>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/90 font-semibold text-lg">
                <FileText className="h-5 w-5 text-purple-300" />
                <span>Content</span>
              </div>
              <div className="ml-8 space-y-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="flex items-center gap-3 w-full p-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 group">
                      <BookOpen className="h-4 w-4 text-purple-300 group-hover:text-purple-200 transition-colors" />
                      <span className="text-sm">Blog</span>
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
                    <button className="flex items-center gap-3 w-full p-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 group">
                      <BookOpen className="h-4 w-4 text-purple-300 group-hover:text-purple-200 transition-colors" />
                      <span className="text-sm">Resources</span>
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

            {/* Company Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/90 font-semibold text-lg">
                <Building2 className="h-5 w-5 text-purple-300" />
                <span>Company</span>
              </div>
              <div className="ml-8 space-y-2">
                <Link to="/about" className="flex items-center gap-3 w-full p-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 group">
                  <User className="h-4 w-4 text-purple-300 group-hover:text-purple-200 transition-colors" />
                  <span className="text-sm">About Us</span>
                </Link>
                <Link to="/contact" className="flex items-center gap-3 w-full p-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 group">
                  <MessageCircle className="h-4 w-4 text-purple-300 group-hover:text-purple-200 transition-colors" />
                  <span className="text-sm">Contact</span>
                </Link>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button 
                variant="outline"
                className="w-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-400/50 text-white hover:from-purple-600/30 hover:to-blue-600/30 hover:border-purple-300/70 transition-all duration-300 backdrop-blur-sm"
                onClick={() => window.open('https://tally.so/r/3NBGBl', '_blank')}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book Discovery Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
