import React from 'react';
import Header from '../components/Header';
import Description from '../components/Description';
import HowItWorks from '../components/HowItWorks';
import WhatWeDoBest from '../components/WhatWeDoBest';
import PartnershipBanner from '../components/PartnershipBanner';
import ExpertiseTech from '../components/ExpertiseTech';
import TechStackConnectivity from '../components/TechStackConnectivity';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Description />
      <HowItWorks />
      <WhatWeDoBest />
      <PartnershipBanner />
      <ExpertiseTech />
      <TechStackConnectivity />
    </div>
  );
};

export default Index;
