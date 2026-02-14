import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import PageSchemaMarkup from '../components/PageSchemaMarkup';
import MetaTags from '../components/MetaTags';
import { getMetaConfig } from '../lib/meta-config';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const ContentHouse = () => {
  const images = Array.from({ length: 12 }, (_, i) => `/${i + 1}.png`);
  const creativeImages = ['a.png', 'b.png', 'c.png', 'd.png', 'e.png', 'f.png', 'g.png', 'h.png', 'i.png', 'j.png', 'k.png', 'l.png'];

  const testimonials = [
    {
      image: '/mighty.png',
      text: "This location was incredible\u2014the best location I've ever used to film an interview.",
      author: "Mighty B",
      role: "Journalist",
      date: "July 2024"
    },
    {
      image: '/tika.png',
      text: "The space was exactly like the pictures, beautiful. My friend and I rented the space to film content for our social media pages. The space is very eclectic and offers a lot of range for any project.",
      author: "Tika P",
      role: "Food Blogger",
      date: "January 2024"
    },
    {
      image: '/jessica.png',
      text: "House was perfect for our photo shoot. We were able to capture great shots in many different places for about 10 outfits! Nice and clean and the host was very accommodating.",
      author: "Jessica S",
      role: "Fashion Designer",
      date: "March 2024"
    },
    {
      image: '/courtney.png',
      text: "So cute absolutely loved the space",
      author: "Courtney W",
      role: "Content Creator",
      date: "February 2024"
    }
  ];

  const handleBooking = () => {
    window.open("https://www.peerspace.com/pages/listings/6357e450d6990c00222cfd89?utm_source=copy_link&utm_campaign=listing_sharing", "_blank", "noopener,noreferrer");
  };

  const metaConfig = getMetaConfig('content-house');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black text-white min-h-screen"
    >
      <MetaTags {...metaConfig} />
      <PageSchemaMarkup pageType="content-house" />
      <Navbar />

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-16">
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
            Pentridge Manor
          </p>
          <h1 className="font-display text-4xl md:text-[43px] leading-[1.2] text-[#fafafa] capitalize mb-6">
            Your Canvas for Content Creation
          </h1>
          <div className="w-16 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6" />
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            A unique and instagram-worthy location for photographers, videographers, artists and creatives.
          </p>
        </motion.div>

        {/* Photo Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="aspect-[4/3] overflow-hidden rounded-xl border border-white/5"
            >
              <img src={image} alt={`Content House ${index + 1}`} className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Booking CTA */}
        <motion.div {...fadeUp} className="text-center mb-20">
          <button onClick={handleBooking} className="btn-primary inline-flex items-center gap-2">
            Book Your Next Photo/Video Shoot <ArrowRight size={14} />
          </button>
        </motion.div>
      </div>

      {/* Creatives Section */}
      <div className="bg-[#0a0a0a] py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-purple-400 mb-4">Our Guests</p>
            <h2 className="font-display text-3xl md:text-[36px] leading-[1.2] text-[#fafafa] capitalize">
              We Host Brilliant Creatives and Entrepreneurs
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {creativeImages.map((image, index) => (
              <motion.div
                key={`creative-${index}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="aspect-square overflow-hidden rounded-xl border border-white/5"
              >
                <img src={`/${image}`} alt={`Creative ${index + 1}`} className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-pink-400 mb-4">Reviews</p>
            <h2 className="font-display text-3xl md:text-[36px] leading-[1.2] text-[#fafafa] capitalize">
              Testimonials
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={`testimonial-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-8"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/60 leading-relaxed mb-6 text-sm">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-purple-400 text-sm font-medium">{testimonial.author}</p>
                    <p className="text-white/30 text-xs font-mono">{testimonial.role} &middot; {testimonial.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div {...fadeUp} className="text-center">
            <div className="glass-card-purple rounded-2xl p-10 md:p-14 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/20 rounded-full blur-[80px] pointer-events-none" />
              <div className="relative z-10">
                <h3 className="font-display text-2xl md:text-3xl leading-[1.2] text-[#fafafa] capitalize mb-4">
                  Ready to create?
                </h3>
                <p className="text-white/50 mb-8 max-w-lg mx-auto">
                  Book Pentridge Manor for your next photo shoot, video production, or creative session.
                </p>
                <button onClick={handleBooking} className="btn-primary inline-flex items-center gap-2">
                  Book Your Next Photo/Video Shoot <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContentHouse;
