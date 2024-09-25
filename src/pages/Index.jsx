import React from 'react';
import Header from '../components/Header';
import Description from '../components/Description';
import HowItWorks from '../components/HowItWorks';
import WhatWeDoBest from '../components/WhatWeDoBest';
import OurWork from '../components/OurWork';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#09090B]">
      <Header />
      <Description />
      <HowItWorks />
      <WhatWeDoBest />
      <OurWork />
    </div>
  );
};

export default Index;
