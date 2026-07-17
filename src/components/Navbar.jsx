import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { scrollToTop } from '../utils/scrollToTop';

const navLinks = [
  { label: 'Content House', to: '/content-house' },
  { label: 'Labs', to: '/labs' },
  { label: 'Resources', to: '/resources' },
  { label: 'About', to: '/about' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleServices = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      document.getElementById('what-we-do')?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-mono text-white text-lg tracking-wider" onClick={scrollToTop}>
          [P]
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/#what-we-do"
            className="font-mono text-xs tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors"
            onClick={handleServices}
          >
            Services
          </Link>
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
            <Link
              to="/#what-we-do"
              className="block font-mono text-sm tracking-[0.1em] uppercase text-white/60 hover:text-white transition-colors py-2"
              onClick={handleServices}
            >
              Services
            </Link>
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
      )}
    </nav>
  );
};

export default Navbar;
