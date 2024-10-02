import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const ContentHouse = () => {
  // Array of image URLs for all 12 images
  const images = Array.from({ length: 12 }, (_, i) => `/${i + 1}.png`);

  return (
    <div className="bg-gradient-to-br from-[#1A0B2E] to-[#4B2C70] text-white min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center mb-12"
        >
          Pentridge Manor: Your Canvas For Content Creation
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {images.map((image, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg"
            >
              <img src={image} alt={`Content House Image ${index + 1}`} className="object-cover w-full h-full" />
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            className="text-white border-white hover:bg-white hover:text-purple-900 bg-transparent text-lg px-8 py-3"
            onClick={() => {/* Add booking functionality */}}
          >
            Book Your Next Photo/Video Shoot
          </Button>
        </div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link to="/" className="text-gold hover:text-white transition-colors inline-block text-xl">
            <motion.span
              whileHover={{ x: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              ← Back to Home
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default ContentHouse;