import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { scrollToTop } from '../utils/scrollToTop';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const navLinks = [
    { label: 'Blog', to: '/blog' },
    { label: 'Resources', to: '/resources' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-mono text-white text-lg tracking-wider" onClick={scrollToTop}>
          [P]
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {/* Products dropdown */}
          <div className="relative" ref={productsRef}>
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className="font-mono text-xs tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors flex items-center gap-1"
            >
              Products <ChevronDown size={12} className={`transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
            </button>
            {productsOpen && (
              <div className="absolute top-full right-0 mt-3 w-48 bg-black/95 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden">
                <a
                  href="https://dropcard.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 font-mono text-xs tracking-[0.1em] uppercase text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                  onClick={() => setProductsOpen(false)}
                >
                  DropCard
                </a>
                <a
                  href="https://blurapp.us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 font-mono text-xs tracking-[0.1em] uppercase text-white/60 hover:text-white hover:bg-white/5 transition-colors border-t border-white/5"
                  onClick={() => setProductsOpen(false)}
                >
                  Blur App
                </a>
                <a
                  href="https://stillmeditation.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 font-mono text-xs tracking-[0.1em] uppercase text-white/60 hover:text-white hover:bg-white/5 transition-colors border-t border-white/5"
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
              className="font-mono text-xs tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors flex items-center gap-1"
            >
              Community <ChevronDown size={12} className={`transition-transform ${communityOpen ? 'rotate-180' : ''}`} />
            </button>
            {communityOpen && (
              <div className="absolute top-full right-0 mt-3 w-52 bg-black/95 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden">
                <a
                  href="https://www.skool.com/vibecodepioneers/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 font-mono text-xs tracking-[0.1em] uppercase text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                  onClick={() => setCommunityOpen(false)}
                >
                  Vibe Code Pioneers
                </a>
                <Link
                  to="/content-house"
                  className="block px-4 py-3 font-mono text-xs tracking-[0.1em] uppercase text-white/60 hover:text-white hover:bg-white/5 transition-colors border-t border-white/5"
                  onClick={() => { setCommunityOpen(false); scrollToTop(); }}
                >
                  Content House
                </Link>
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="font-mono text-xs tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors"
              onClick={scrollToTop}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white/70 hover:text-white transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
            {/* Products section */}
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30 pt-2">Products</p>
            <a
              href="https://dropcard.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-mono text-sm tracking-[0.1em] uppercase text-white/60 hover:text-white transition-colors py-1 pl-3"
              onClick={() => setIsOpen(false)}
            >
              DropCard
            </a>
            <a
              href="https://blurapp.us"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-mono text-sm tracking-[0.1em] uppercase text-white/60 hover:text-white transition-colors py-1 pl-3"
              onClick={() => setIsOpen(false)}
            >
              Blur App
            </a>
            <a
              href="https://stillmeditation.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-mono text-sm tracking-[0.1em] uppercase text-white/60 hover:text-white transition-colors py-1 pl-3"
              onClick={() => setIsOpen(false)}
            >
              Still Meditation
            </a>

            <div className="border-t border-white/5 pt-4">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30 mb-2">Community</p>
              <a
                href="https://www.skool.com/vibecodepioneers/"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-mono text-sm tracking-[0.1em] uppercase text-white/60 hover:text-white transition-colors py-1 pl-3"
                onClick={() => setIsOpen(false)}
              >
                Vibe Code Pioneers
              </a>
              <Link
                to="/content-house"
                className="block font-mono text-sm tracking-[0.1em] uppercase text-white/60 hover:text-white transition-colors py-1 pl-3"
                onClick={() => { setIsOpen(false); scrollToTop(); }}
              >
                Content House
              </Link>
            </div>

            <div className="border-t border-white/5 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="block font-mono text-sm tracking-[0.1em] uppercase text-white/60 hover:text-white transition-colors py-2"
                  onClick={() => { setIsOpen(false); scrollToTop(); }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
