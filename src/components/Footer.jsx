import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <img src="/logonew.png" alt="Pentridge Media" className="h-48 w-auto mb-6" />
          <p className="text-xl text-center max-w-2xl">
            Where Creativity
            <br />
            Meets Technology
          </p>
        </div>
        <div className="flex justify-between items-end mt-auto">
          <div>
            <p className="text-sm">© Pentridge Media Copyright 2024</p>
          </div>
          <div>
            <a href="#" className="text-sm hover:underline">Terms and Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;