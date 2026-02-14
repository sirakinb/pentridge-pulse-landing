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

const AboutUs = () => {
  const metaConfig = getMetaConfig('about');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black text-white min-h-screen"
    >
      <MetaTags {...metaConfig} />
      <PageSchemaMarkup pageType="about" />
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <motion.div {...fadeUp} className="mb-16">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
            Our Story
          </p>
          <h1 className="font-display text-4xl md:text-[43px] leading-[1.2] text-[#fafafa] capitalize mb-6">
            About Pentridge
          </h1>
          <div className="w-16 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500" />
        </motion.div>

        {/* Story sections */}
        <div className="space-y-16">
          <motion.div {...fadeUp} className="glass-card rounded-2xl p-8 md:p-12">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-purple-400 mb-4">01 / The Beginning</p>
            <p className="text-white/60 leading-relaxed text-base">
              The Pentridge Brand has come a long way since the inception of Pentridge Manor in 2021, a content creation house for capturing stunning photos and videos. The Pentridge Manor has become a popular destination for photographers, videographers, artists and other creatives looking for a unique and instagram-youtube worthy location to shoot their content. From fashion and music videos to product launches, film productions, and social media campaigns, "the manor" has played host to different functions.
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="glass-card rounded-2xl p-8 md:p-12">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-pink-400 mb-4">02 / The Evolution</p>
            <p className="text-white/60 leading-relaxed text-base">
              With the evolution of technology and market demands, we recognized a way to provide more value to content creators who occupied our space. As a result, Pentridge was born. Pentridge emerged as an extension of our creative ecosystem, blending the physical space of content creation with digital media services for editing and content management. However, it didn't stop there. With the rise of ChatGPT and Generative AI, we recognized their potential in transforming the digital landscape. Therefore, we evolved further.
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="glass-card-purple rounded-2xl p-8 md:p-12">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-purple-400 mb-4">03 / Today</p>
            <p className="text-white/70 leading-relaxed text-base">
              Today, Pentridge offers a range of solutions tailored to the needs of modern businesses and creators. From cutting-edge AI systems and automation services to full-stack development and product design, we are committed to helping you achieve your goals. We don't just build — we partner. We become your tech arm, with skin in the game, building alongside you for the long term.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div {...fadeUp} className="mt-20 mb-16">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/40 mb-4">What Drives Us</p>
          <h2 className="font-display text-3xl md:text-[36px] leading-[1.2] text-[#fafafa] capitalize">
            Where creativity meets technology.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            { label: 'Partnership', desc: 'We treat your business like our own. Skin in the game, always.' },
            { label: 'Innovation', desc: 'AI-first thinking applied to real business problems.' },
            { label: 'Execution', desc: 'We ship fast, iterate faster, and stay to keep building.' },
          ].map((v, i) => (
            <motion.div
              key={v.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-xl p-6"
            >
              <p className="font-mono text-xs tracking-[0.15em] uppercase text-purple-400 mb-3">{v.label}</p>
              <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div {...fadeUp} className="text-center">
          <div className="glass-card-purple rounded-2xl p-10 md:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <h3 className="font-display text-2xl md:text-3xl leading-[1.2] text-[#fafafa] capitalize mb-4">
                Let's build together.
              </h3>
              <p className="text-white/50 mb-8 max-w-lg mx-auto">
                Whether you need AI systems or AI-powered applications built — we're ready.
              </p>
              <a
                href="https://cal.com/akinyemi-bajulaiye-2jua88/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Get in Touch <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutUs;
