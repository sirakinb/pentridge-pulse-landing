import React from 'react';
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-gradient-to-br from-[#1A0B2E] to-[#4B2C70] text-white min-h-screen flex flex-col">
      <div className="container mx-auto px-4 flex flex-col flex-grow">
        <nav className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <img 
              src="/logonew.png" 
              alt="Pentridge Media" 
              className="h-10 w-auto"
            />
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-white hover:text-gray-200">Home</a>
            <a href="#" className="text-white hover:text-gray-200">Pentridge Manor</a>
            <a href="#" className="text-white hover:text-gray-200">Newsletter</a>
            <a href="#" className="text-white hover:text-gray-200">About Us</a>
            <a href="#" className="text-white hover:text-gray-200">Contact</a>
            <a href="#" className="text-white hover:text-gray-200">Blog</a>
          </div>
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-purple-900 bg-transparent">
            Member Portal
          </Button>
        </nav>
        <div className="flex-grow flex flex-col justify-center items-start w-full">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-12 w-full max-w-[90%] mx-auto">
            We Build AI-Powered Growth Systems For Founders
          </h1>
          <div className="w-full max-w-[90%] mx-auto flex justify-start pl-20">
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-purple-900 bg-transparent text-lg px-8 py-3">
              Explore our services
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
