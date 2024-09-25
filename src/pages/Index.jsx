import React from 'react';
import Header from '../components/Header';
import Description from '../components/Description';
import HowItWorks from '../components/HowItWorks';
import PartnerInAI from '../components/PartnerInAI';
import OurWork from '../components/OurWork';
import FAQ from '../components/FAQ';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#1A0B2E]">
      <Header />
      <Description />
      <HowItWorks />
      <PartnerInAI />
      <OurWork />
      <FAQ />
    </div>
  );
};

export default Index;
