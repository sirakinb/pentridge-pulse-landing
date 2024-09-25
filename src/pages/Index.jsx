import React from 'react';
import Header from '../components/Header';
import Description from '../components/Description';
import HowItWorks from '../components/HowItWorks';
import WhatWeDoBest from '../components/WhatWeDoBest';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Description />
      <HowItWorks />
      <WhatWeDoBest />
    </div>
  );
};

export default Index;
