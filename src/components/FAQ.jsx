import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What AI technologies do you specialize in?",
    answer: "We specialize in a range of AI technologies including natural language processing, machine learning, computer vision, and predictive analytics. We work with cutting-edge tools like GPT-3, TensorFlow, and custom AI models tailored to specific business needs."
  },
  {
    question: "How can AI improve my business productivity?",
    answer: "AI can automate repetitive tasks, provide data-driven insights, enhance decision-making processes, and optimize workflows. This leads to increased efficiency, reduced errors, and allows your team to focus on high-value strategic activities."
  },
  {
    question: "What industries do you typically work with?",
    answer: "We work with a diverse range of industries including finance, healthcare, e-commerce, manufacturing, and more. Our AI solutions are adaptable and can be customized to meet the specific needs of various sectors."
  },
  {
    question: "How long does it typically take to implement an AI solution?",
    answer: "The timeline can vary depending on the complexity of the project. Simple automations might take a few weeks, while more complex AI integrations could take several months. We work closely with our clients to establish realistic timelines and milestones."
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