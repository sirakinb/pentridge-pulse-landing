import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { scrollToTop } from '../utils/scrollToTop';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/logonew.png" alt="Pentridge Media" className="h-24" /> {/* Increased height further */}
          </div>

          {/* See us in person */}
          <div>
            <h3 className="text-lg font-semibold mb-2">See us in person</h3>
            <p>Philadelphia, PA,</p>
            <p>United States of</p>
            <p>America</p>
          </div>

          {/* Contact us */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact us</h3>
            <a href="mailto:info@pentridgemedia.com" className="hover:text-gold transition-colors">
              info@pentridgemedia.com
            </a>
          </div>

          {/* Links and Social */}
          <div className="flex flex-col justify-between">
            <div>
              <Link 
                to="/terms" 
                className="block hover:text-gold transition-colors mb-2"
                onClick={scrollToTop}
              >
                Terms & Conditions
              </Link>
              <Link 
                to="/privacy" 
                className="block hover:text-gold transition-colors"
                onClick={scrollToTop}
              >
                Privacy Policy
              </Link>
            </div>
            <div className="mt-4">
              <a href="https://www.instagram.com/pentridgemedia" target="_blank" rel="noopener noreferrer" className="inline-block hover:text-gold transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright notice */}
        <div className="border-t border-gray-800 pt-4 mt-4">
          <p className="text-sm text-gray-500">© 2025 Pentridge Media. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;