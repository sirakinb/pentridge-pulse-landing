import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

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
          <button onClick={toggleNavbar} className={`${isDark ? 'text-slate-200' : 'text-gray-800'} focus:outline-none`}>
            {isNavOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>
      {isNavOpen && (
        <div className={`md:hidden border-t ${isDark ? 'border-slate-800 bg-slate-900' : 'border-gray-100 bg-white'}`}>
          <div className="px-4 py-3 space-y-2">
            <div className={`${isDark ? 'text-slate-100' : 'text-gray-800'} font-medium py-2`}>Create Account</div>
            <button className={`block pl-2 py-1 text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`} onClick={() => alert('Coming soon')}>Newsletter</button>
            <button className={`block pl-2 py-1 text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`} onClick={() => alert('Coming soon')}>Community Access</button>
            <div className={`${isDark ? 'text-slate-100' : 'text-gray-800'} font-medium py-2`}>Services</div>
            <Link to="/services/ai-voice-agents" className={`block pl-2 py-1 text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>AI Voice Agents</Link>
            <Link to="/content-house" className={`block pl-2 py-1 text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Content House</Link>
            <a href="https://build.pentridgemedia.com" target="_blank" rel="noopener noreferrer" className={`block pl-2 py-1 text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Custom Apps + Automations</a>
            <div className={`${isDark ? 'text-slate-100' : 'text-gray-800'} font-medium py-2`}>Products</div>
            <a href="https://www.dropcard.app/" target="_blank" rel="noopener noreferrer" className={`block pl-2 py-1 text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>DropCard</a>
            <a href="https://discover.circle.so/product/pentridge-club-ai-automation-emerging-tech-community" target="_blank" rel="noopener noreferrer" className={`block py-1 ${isDark ? 'text-slate-100' : 'text-gray-800'}`}>Community</a>
            <Dialog>
              <DialogTrigger asChild>
                <button className={`block py-1 text-left w-full ${isDark ? 'text-slate-100' : 'text-gray-800'}`}>Blog</button>
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
                <button className={`block py-1 text-left w-full ${isDark ? 'text-slate-100' : 'text-gray-800'}`}>Resources</button>
              </DialogTrigger>
              <DialogContent className={isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : ''}>
                <DialogHeader>
                  <DialogTitle>Coming soon</DialogTitle>
                </DialogHeader>
                <p className="text-sm opacity-80">We're polishing our resources hub. Check back soon.</p>
              </DialogContent>
            </Dialog>
            <Link to="/about" className={`block py-1 ${isDark ? 'text-slate-100' : 'text-gray-800'}`}>About Us</Link>
            <Link to="/contact" className={`block py-1 ${isDark ? 'text-slate-100' : 'text-gray-800'}`}>Contact</Link>
            <Button 
              variant="outline"
              className={`w-full mt-2 ${isDark ? 'bg-transparent border-white text-white hover:bg-white/10' : 'border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white'}`}
              onClick={() => window.open('https://tally.so/r/3NBGBl', '_blank')}
            >
              Book Call
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
