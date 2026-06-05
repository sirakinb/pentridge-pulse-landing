import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import PageSchemaMarkup from '../components/PageSchemaMarkup';
import MetaTags from '../components/MetaTags';
import { getMetaConfig } from '../lib/meta-config';
import WallOfLove from './WallOfLove';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const ContentHouse = () => {
  const images = Array.from({ length: 12 }, (_, i) => `/${i + 1}.png`);
  const creativeImages = ['a.png', 'b.png', 'c.png', 'd.png', 'e.png', 'f.png', 'g.png', 'h.png', 'i.png', 'j.png', 'k.png', 'l.png'];

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

      <WallOfLove showNav={false} showMeta={false} />
    </motion.div>
  );
};

export default ContentHouse;
