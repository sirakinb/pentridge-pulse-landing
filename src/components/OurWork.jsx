import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const whiteLaw = {
  tags: ['Legal operations', 'Intake and follow-up'],
  title: 'White Law',
  description: 'Structured intake, qualification, booking, follow-up, and the handoff from lead to client.',
  image: 'https://lh3.googleusercontent.com/d/1RTy3oLLuvejanvD0XTEQBVqgwNRPMU8c=w1800',
  link: 'https://pentridge-white-law-case-study.vercel.app',
};

const OurWork = () => {
  return (
    <section className="bg-black py-24 md:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label mb-4">04 / Some of our work</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display text-3xl md:text-[43px] leading-[1.2] text-[#fafafa] max-w-2xl">
              Real systems built for real businesses.
            </h2>
            <p className="text-white/50 max-w-md leading-relaxed">
              A look at the workflows, systems, and operating improvements we have built with clients.
            </p>
          </div>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-[1.25fr_.75fr] bg-[#101014] border border-white/10 overflow-hidden rounded-2xl"
        >
          <a
            href={whiteLaw.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative min-h-[300px] lg:min-h-[420px] overflow-hidden bg-[#17101f] group"
          >
            <img
              src={whiteLaw.image}
              alt="White Law intake and booking workflow"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-bottom transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </a>

          <div className="p-8 md:p-12 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap gap-2 mb-8">
                {whiteLaw.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 text-xs rounded-full border border-purple-400/30 text-purple-300 bg-purple-500/10">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-display text-3xl md:text-4xl text-[#fafafa] mb-5">
                {whiteLaw.title}
              </h3>
              <p className="text-white/60 text-base leading-relaxed max-w-lg">
                {whiteLaw.description}
              </p>
            </div>
            <a
              href={whiteLaw.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-purple-300 hover:text-white transition-colors mt-10 w-fit"
            >
              View case study <ArrowRight size={16} />
            </a>
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default OurWork;
