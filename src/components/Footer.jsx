import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube } from 'lucide-react';
import { scrollToTop } from '../utils/scrollToTop';

const Footer = () => {

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
            <Link to="/content-house" className="hover:text-white transition-colors" onClick={scrollToTop}>Pentridge Manor</Link>
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
