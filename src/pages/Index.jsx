import React from 'react';
import Header from '../components/Header';
import Description from '../components/Description';
import HowItWorks from '../components/HowItWorks';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Description />
      <HowItWorks />
    </div>
  );
};

export default Index;
