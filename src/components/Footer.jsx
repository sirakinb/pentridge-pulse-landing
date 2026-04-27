import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, ChevronDown } from 'lucide-react';
import { scrollToTop } from '../utils/scrollToTop';

const Footer = () => {
  const [productsOpen, setProductsOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const productsRef = useRef(null);
  const communityRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (productsRef.current && !productsRef.current.contains(e.target)) {
        setProductsOpen(false);
      }
      if (communityRef.current && !communityRef.current.contains(e.target)) {
        setCommunityOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xl tracking-wider">[P]</span>
            <span className="font-mono text-sm text-white/50 tracking-wider uppercase">Pentridge</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 text-sm text-white/50 items-center">
            {/* Products dropdown */}
            <div className="relative" ref={productsRef}>
              <button
                onClick={() => setProductsOpen(!productsOpen)}
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                Products <ChevronDown size={12} className={`transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
              </button>
              {productsOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-40 bg-black/95 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden">
                  <a
                    href="https://dropcard.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-xs text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                    onClick={() => setProductsOpen(false)}
                  >
                    DropCard
                  </a>
                  <a
                    href="https://blurapp.us"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-xs text-white/60 hover:text-white hover:bg-white/5 transition-colors border-t border-white/5"
                    onClick={() => setProductsOpen(false)}
                  >
                    Blur App
                  </a>
                  <a
                    href="https://stillmeditation.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-xs text-white/60 hover:text-white hover:bg-white/5 transition-colors border-t border-white/5"
                    onClick={() => setProductsOpen(false)}
                  >
                    Still Meditation
                  </a>
                </div>
              )}
            </div>
            {/* Community dropdown */}
            <div className="relative" ref={communityRef}>
              <button
                onClick={() => setCommunityOpen(!communityOpen)}
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                Community <ChevronDown size={12} className={`transition-transform ${communityOpen ? 'rotate-180' : ''}`} />
              </button>
              {communityOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-48 bg-black/95 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden">
                  <Link
                    to="/content-house"
                    className="block px-4 py-3 text-xs text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                    onClick={() => { setCommunityOpen(false); scrollToTop(); }}
                  >
                    Content House
                  </Link>
                </div>
              )}
            </div>
            <Link to="/blog" className="hover:text-white transition-colors" onClick={scrollToTop}>Blog</Link>
            <Link to="/resources" className="hover:text-white transition-colors" onClick={scrollToTop}>Resources</Link>
            <Link to="/about" className="hover:text-white transition-colors" onClick={scrollToTop}>About</Link>
            <Link to="/contact" className="hover:text-white transition-colors" onClick={scrollToTop}>Contact</Link>
            <Link to="/terms" className="hover:text-white transition-colors" onClick={scrollToTop}>Terms</Link>
            <Link to="/privacy" className="hover:text-white transition-colors" onClick={scrollToTop}>Privacy</Link>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/pentridgemedia" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
              <Instagram size={18} />
            </a>
            <a href="https://www.youtube.com/@sirakinb" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
              <Youtube size={18} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6">
          <p className="text-xs text-white/30 font-mono">&copy; 2026 Pentridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
