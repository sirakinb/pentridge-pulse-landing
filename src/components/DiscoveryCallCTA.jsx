import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

const DiscoveryCallCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#1A0B2E] to-[#4B2C70] text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-5xl font-bold mb-6">
            Get started with a discovery call
          </h2>
          <p className="text-xl mb-8">
            A no-strings-attached consultation with Aki. Book your call now.
          </p>
          <Button 
            variant="outline" 
              className="text-white border-white hover:bg-white hover:text-purple-900 bg-transparent text-lg px-8 py-3"
              onClick={() => window.open('https://cal.com/akinyemi-bajulaiye-2jua88/30min', '_blank')}
            >
              Book Discovery Call
          </Button>
          <p className="mt-4 text-sm text-gray-300">No credit card required.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default DiscoveryCallCTA;