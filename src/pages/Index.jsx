import React from 'react';
import Header from '../components/Header';
import Description from '../components/Description';
import HowItWorks from '../components/HowItWorks';
import PartnerInAI from '../components/PartnerInAI';
import { WhyChooseSection } from '../components/WhyChooseSection';
import OurWork from '../components/OurWork';
import FAQ from '../components/FAQ';
import DiscoveryCallCTA from '../components/DiscoveryCallCTA';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#1A0B2E]">
      <Header />
      <Description />
      <HowItWorks />
      <PartnerInAI />
      <WhyChooseSection />
      <OurWork />
      <FAQ />
      <DiscoveryCallCTA />
      <Footer />
    </div>
  );
};

export default Index;
