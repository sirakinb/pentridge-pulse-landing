import React from 'react';
import { motion } from 'framer-motion';

const PartnerStrip = () => {
  const partners = [
    { name: 'Partner 1', logo: '/9.png' },
    { name: 'Partner 2', logo: '/10.png' },
    { name: 'Partner 3', logo: '/11.png' },
    { name: 'Partner 4', logo: '/12.png' },
    { name: 'Partner 5', logo: '/p13.png' }
  ];

  return (
    <div className="bg-black/90 py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h3 className="text-white/60 text-sm font-medium tracking-wider uppercase mb-2">
            Trusted by Industry Leaders
          </h3>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="flex-shrink-0 bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-12 md:h-16 w-auto object-contain filter brightness-150 contrast-125 hover:filter-none transition-all duration-300 opacity-80 hover:opacity-100"
                onError={(e) => {
                  console.log(`Failed to load: ${partner.logo}`);
                  e.target.style.display = 'none';
                  // Show partner name as fallback
                  e.target.parentElement.innerHTML = `<div class="text-white text-sm">${partner.name}</div>`;
                }}
                onLoad={(e) => {
                  console.log(`Successfully loaded: ${partner.logo}`);
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PartnerStrip;
