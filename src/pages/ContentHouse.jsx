import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import FuturisticBackLink from '../components/FuturisticBackLink';
import { Link } from 'react-router-dom';

const ContentHouse = () => {
  // Original images
  const images = Array.from({ length: 12 }, (_, i) => `/${i + 1}.png`);
  
  // New images for the second section
  const creativeImages = ['a.png', 'b.png', 'c.png', 'd.png', 'e.png', 'f.png', 'g.png', 'h.png', 'i.png', 'j.png', 'k.png', 'l.png'];

  // Updated testimonial data without logos for Mighty B and Tika
  const testimonials = [
    {
      image: '/mighty.png',
      text: "This location was incredible—the best location I've ever used to film an interview.",
      author: "Mighty B, Journalist",
      date: "July 2024"
    },
    {
      image: '/tika.png',
      text: "The space was exactly like the pictures, beautiful. My friend and I rented the space to film content for our social media pages. The space is very eclectic and offers a lot of range for any project.",
      author: "Tika P, Food Blogger",
      date: "January 2024"
    },
    {
      image: '/jessica.png',
      text: "House was perfect for our photo shoot. We were able to capture great shots in many different places for about 10 outfits! Nice and clean and the host was very accommodating.",
      author: "Jessica S, Fashion Designer",
      date: "March 2024"
    },
    {
      image: '/courtney.png',
      text: "So cute absolutely loved the space",
      author: "Courtney W, Content Creator",
      date: "February 2024"
    }
  ];

  const handleBooking = () => {
    window.open("https://www.peerspace.com/pages/listings/6357e450d6990c00222cfd89?utm_source=copy_link&utm_campaign=listing_sharing", "_blank", "noopener,noreferrer");
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    in: {
      opacity: 1,
      y: 0
    },
    out: {
      opacity: 0,
      y: -20
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen"
    >
      {/* First Section: Black background */}
      <div className="bg-black text-white">
        <div className="container mx-auto px-4 py-6">
          <FuturisticBackLink />
        </div>
      </div>

      {/* Photo Gallery Section: Black background */}
      <div className="bg-black text-white py-10">
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold text-center mb-8"
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

          {/* Single booking button */}
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              className="text-white border-white hover:bg-white hover:text-black bg-transparent text-lg px-8 py-3"
              onClick={handleBooking}
            >
              Book Your Next Photo/Video Shoot
            </Button>
          </div>
        </div>
      </div>

      {/* Second Section: Deep purple gradient */}
      <div className="bg-gradient-to-br from-[#2D1B4E] to-[#6B3FA0] text-white py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-12"
          >
            We Host Brilliant Creatives and Entrepreneurs
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {creativeImages.map((image, index) => (
              <motion.div 
                key={`creative-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg"
              >
                <img src={`/${image}`} alt={`Creative ${index + 1}`} className="object-cover w-full h-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Third Section: Darker purple gradient */}
      <div className="bg-gradient-to-br from-[#150729] to-[#3D1C54] text-white py-20">
        <div className="container mx-auto px-4">
          {/* Testimonials Section */}
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-12"
          >
            Testimonials
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={`testimonial-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800 rounded-lg p-6 flex flex-col"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 mb-4 flex-grow">{testimonial.text}</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="text-purple-400 font-semibold">{testimonial.author}</p>
                    <p className="text-gray-400">{testimonial.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add another booking button after testimonials */}
          <div className="text-center mt-20">
            <Button 
              variant="outline" 
              className="text-white border-white hover:bg-white hover:text-purple-900 bg-transparent text-lg px-8 py-3"
              onClick={handleBooking}
            >
              Book Your Next Photo/Video Shoot
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ContentHouse;