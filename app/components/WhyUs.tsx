function WhyUs() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Why Pentridge</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Expertise</h3>
            <p className="text-gray-600">Years of experience in AI and machine learning.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Customization</h3>
            <p className="text-gray-600">Tailored solutions to fit your unique needs.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Support</h3>
            <p className="text-gray-600">24/7 customer support and assistance.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyUs;