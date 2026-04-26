import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { scrollToTop } from '../utils/scrollToTop';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const servicesLinks = [
    { label: 'AI Workflow Automation', to: '/services' },
    { label: 'AI Voice Agents', to: '/services/ai-voice-agents' },
    { label: 'CRM & Operations Automation', to: '/services' },
    { label: 'Custom Software', href: 'https://build.pentridgemedia.com' },
  ];

  const navLinks = [
    { label: 'Use Cases', to: '/resources/ai-process-automation-examples' },
    { label: 'ROI Calculator', to: '/roi-calculator' },
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
          <div className="relative" ref={servicesRef}>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="font-mono text-xs tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors flex items-center gap-1"
            >
              Services <ChevronDown size={12} className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-0 mt-3 w-72 bg-black/95 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden">
                {servicesLinks.map((link) => (
                  link.href ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-3 font-mono text-xs tracking-[0.1em] uppercase text-white/60 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0"
                      onClick={() => setServicesOpen(false)}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.to}
                      className="block px-4 py-3 font-mono text-xs tracking-[0.1em] uppercase text-white/60 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0"
                      onClick={() => { setServicesOpen(false); scrollToTop(); }}
                    >
                      {link.label}
                    </Link>
                  )
                ))}
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
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30 pt-2">Services</p>
            {servicesLinks.map((link) => (
              link.href ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-mono text-sm tracking-[0.1em] uppercase text-white/60 hover:text-white transition-colors py-1 pl-3"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  className="block font-mono text-sm tracking-[0.1em] uppercase text-white/60 hover:text-white transition-colors py-1 pl-3"
                  onClick={() => { setIsOpen(false); scrollToTop(); }}
                >
                  {link.label}
                </Link>
              )
            ))}
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
