
import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "DO Olivas",
    company: "LogoSeed",
    text: "Absolutely amazing and solution-driven! Working together was a seamless experience from start to finish. They not only delivered outstanding results but also went above and beyond to address challenges with creative, effective solutions. Their professionalism, attention to detail, and commitment to excellence made a lasting impact. I will definitely collaborate with them again and highly recommend their services to anyone seeking top-tier expertise and results.",
    rating: 5
  },
  {
    name: "Pedro Rodriguez",
    company: "Blue Proma Digital",
    text: "I've had the pleasure of working with Aki, and I can confidently say he's exceptional in his field. His communication skills are top-notch, and he truly understands his craft. Aki is not your average Automation Expert. He goes above and beyond by offering valuable insights and suggestions. He meticulously reviewed our chatbot creation process, making several adjustments to ensure it met my criteria. Working with Aki has been a pleasure, and I look forward to collaborating with him again in the future.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#150729] to-[#3D1C54] text-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          What They Are Saying About Pentridge
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg p-6 flex flex-col"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 mb-4 flex-grow">{testimonial.text}</p>
              <div>
                <p className="text-purple-400 font-semibold">{testimonial.name}</p>
                <p className="text-gray-400">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
