import React, { useEffect } from 'react';
import Header from '../components/Header';
import Description from '../components/Description';
import HowItWorks from '../components/HowItWorks';
import PartnerInAI from '../components/PartnerInAI';
import OurWork from '../components/OurWork';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // This ensures smooth scrolling behavior for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#1A0B2E]">
      <Header />
      <Description />
      <HowItWorks />
      <PartnerInAI />
      <OurWork />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
