import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Import hamburger icons

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="bg-gradient-to-br from-[#1A0B2E] to-[#4B2C70] text-white min-h-screen flex flex-col">
      <div className="container mx-auto px-4 flex flex-col flex-grow">
        <nav className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <img 
              src="/logonew.png" 
              alt="Pentridge Media"
              className="h-16 w-auto"
            />
          </div>
          <div className="hidden md:flex flex-1 justify-center space-x-6">
            {/* Remove or comment out the "Home" link */}
            {/* <Link to="/" className="text-white hover:text-gray-200">Home</Link> */}
            <Link to="/content-house" className="text-white hover:text-gray-200">Content House</Link>
            <ScrollLink 
              to="how-it-works" 
              smooth={true} 
              duration={500} 
              className="text-white hover:text-gray-200 cursor-pointer"
            >
              How It Works
            </ScrollLink>
            <Link to="/contact" className="text-white hover:text-gray-200">Contact</Link>
            <Link to="/about" className="text-white hover:text-gray-200">About Us</Link>
          </div>
          <div className="hidden md:block">
            <Button 
                variant="outline" 
                className="text-white border-white hover:bg-white hover:text-purple-900 bg-transparent"
                onClick={() => window.open('https://tally.so/r/3NBGBl', '_blank')}
              >
                Book Call
            </Button>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleNavbar} className="text-white focus:outline-none">
              {isNavOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </nav>
        {isNavOpen && (
          <div className="md:hidden pb-3">
            <div className="space-y-2 text-center">
              {/* Remove or comment out the "Home" link for mobile version */}
              {/* <Link to="/" className="text-white block">Home</Link> */}
              <Link to="/content-house" className="text-white block">Content House</Link>
              <ScrollLink 
                to="how-it-works" 
                smooth={true} 
                duration={500} 
                className="text-white cursor-pointer block"
              >
                How It Works
              </ScrollLink>
              <Link to="/contact" className="text-white block">Contact</Link>
              <Link to="/about" className="text-white block">About Us</Link>
            </div>
          </div>
        )}
        <div className="flex-grow flex flex-col justify-start items-start w-full pt-8 md:pt-48">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-12 mt-0 w-full max-w-[90%] mx-auto">
            We Build AI-Powered Growth Systems For Founders
          </h1>
          <div className="w-full max-w-[90%] mx-auto flex justify-start pl-20">
            <Button 
              variant="outline" 
                className="text-white border-white hover:bg-white hover:text-purple-900 bg-transparent text-lg px-8 py-3"
                onClick={() => window.open('https://tally.so/r/3NBGBl', '_blank')}
              >
                Book Discovery Call
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;