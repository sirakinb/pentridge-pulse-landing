import React from 'react';

const Description = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          We didn't reinvent the wheel. <br />
          <span className="text-yellow-300">Just business automation.</span>
        </h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl mb-6 text-center">
            <span className="font-semibold">Pentridge Media</span> leverages AI, Automation, and Digital Strategies to{' '}
            <span className="underline">save you time</span> and{' '}
            <span className="underline">propel your business forward</span>.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Custom AI Solutions</h3>
              <p>Tailored AI models and integrations to enhance your business operations.</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Low/No Code Development</h3>
              <p>Rapidly build and deploy functional solutions without extensive coding.</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Business Process Automation</h3>
              <p>Streamline workflows and optimize operations with smart automation.</p>
            </div>
          </div>
          <p className="text-center mt-12 text-lg">
            Our range of services is designed to streamline your workflows and accelerate your business growth.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Description;
