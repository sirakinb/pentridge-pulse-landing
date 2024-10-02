import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What types of businesses do you work with?",
    answer: "We work with a wide range of businesses, from startups to established companies, across various industries. Our focus is on helping businesses leverage AI and automation to improve their operations and growth."
  },
  {
    question: "Do you work with businesses in specific industries?",
    answer: "We work with clients across various industries, including coaches, consultants, service providers, and businesses looking to leverage technology and automation. Our services can be customized to fit your specific niche and target audience."
  },
  {
    question: "Can you help set up automated systems for lead capture and follow-up?",
    answer: "Absolutely. We can implement tools like ManyChat to create automated responses to inquiries, set up discovery call bookings, and nurture leads through personalized follow-up sequences."
  },
  {
    question: "How do you maintain authenticity when using AI for content creation?",
    answer: "We focus on repurposing your existing content, conversations, and ideas. This ensures the content remains authentic to your voice and message, while AI helps scale the production and distribution."
  },
  {
    question: "Do you offer training on AI tools and automation for my team?",
    answer: "Yes, we can provide training and support to help your team leverage AI tools and automation effectively in their workflows."
  }
];

const FAQ = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#1A0B2E] to-[#4B2C70] text-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-xl font-semibold text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;