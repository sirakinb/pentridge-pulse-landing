function HowItWorks() {
  const steps = [
    { title: "Step 1: Connect", description: "Connect your data sources and tools." },
    { title: "Step 2: Customize", description: "Customize your AI assistant to your needs." },
    { title: "Step 3: Collaborate", description: "Start collaborating with your AI-powered assistant." },
    { title: "Step 4: Optimize", description: "Continuously improve and optimize your workflow." },
  ];

  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;