function Services() {
  const services = [
    { title: "AI-Powered Assistance", description: "Get instant help with tasks, research, and more." },
    { title: "Data Integration", description: "Seamlessly connect your existing tools and data." },
    { title: "Custom Solutions", description: "Tailored AI solutions for your specific needs." },
    { title: "AI-Driven Content Automation", description: "Automate content creation and distribution processes." },
    { title: "Automated Workflow Solutions", description: "Streamline and automate your business workflows." },
  ];

  return (
    <section className="py-8 sm:py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Your Partner in AI-Powered Productivity</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">{service.title}</h3>
              <p className="text-sm sm:text-base">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;