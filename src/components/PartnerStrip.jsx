import React from 'react';
import { motion } from 'framer-motion';

const PartnerStrip = () => {
  const partners = [
    { name: 'Jackson Rental Homes', logo: '/p9.png' },
    { name: 'FunTimes', logo: '/p10.png' },
    { name: 'Blue Proma Digital', logo: '/p11.png' },
    { name: 'Utopos', logo: '/p12.png' },
    { name: 'Pearls Girl Productions', logo: '/p13.png' }
  ];

  return (
    <div className="bg-gray-600 py-16 pb-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h3 className="text-white/70 text-sm font-medium tracking-wider uppercase mb-2">
            Trusted by Industry Leaders
          </h3>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center items-center gap-12 md:gap-16 lg:gap-20"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="flex-shrink-0 hover:scale-110 transition-transform duration-300"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-32 md:h-40 lg:h-48 w-auto object-contain mx-auto hover:opacity-80 transition-all"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PartnerStrip;
