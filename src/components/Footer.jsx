import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube } from 'lucide-react';
import { scrollToTop } from '../utils/scrollToTop';

const columns = [
  {
    heading: 'Resources',
    links: [
      { label: 'Use Cases', to: '/resources/ai-process-automation-examples' },
      { label: 'ROI Calculator', to: '/roi-calculator' },
      { label: 'AI Guide', to: '/ai-business-automation-guide' },
      { label: 'Blog', to: '/blog' },
      { label: 'All Resources', to: '/resources' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Content House', to: '/content-house' },
      { label: 'Contact', to: '/contact' },
      { label: 'Terms', to: '/terms' },
      { label: 'Privacy', to: '/privacy' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_repeat(2,1fr)] gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xl tracking-wider">[P]</span>
              <span className="font-mono text-sm text-white/50 tracking-wider uppercase">Pentridge</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed mb-6 max-w-xs">
              We get your company AI-ready and deploy AI agents into your business operations.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/pentridgemedia" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://www.youtube.com/@sirakinb" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((column) => (
            <div key={column.heading}>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-white/30 mb-4">
                {column.heading}
              </p>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="text-sm text-white/50 hover:text-white transition-colors"
                        onClick={scrollToTop}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/50 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
