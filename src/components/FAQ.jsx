import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqItems = [
  {
    question: "How do I get started with a service?",
    answer: "Click on the get started button and someone from our team will reach out to you shortly."
  },
  {
    question: "What do you mean by automated workflows?",
    answer: "Streamlined tasks depending on your business needs, from automating the process of generating proposals, invoicing, or sending welcome packages, making your business operations smoother. We also incorporate conversational AI into these one and two click workflows to tailor and personalize the processes for your leads and clients."
  },
  {
    question: "What is a Custom AI Model?",
    answer: "This is a fine-tuned version of an existing large language model emphasizing a specific use case for your business. For instance, you can create a custom AI model that writes emails in your brand voice, or a model that helps to automate your welcome packages when you onboard new clients."
  },
  {
    question: "Can you help me increase my content output without spending all my time creating content?",
    answer: "Yes, we use AI-powered content automation to repurpose existing content like audio/video clips, long-form content, or conversations into multiple pieces of content for social media. This allows you to scale your content creation efficiently."
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