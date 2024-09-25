import React from 'react';

export default function HomePage() {
  return (
    <>
      {/* What We Do Best Section */}
      <section className="py-16 bg-gray-100">
        {/* ... existing content ... */}
      </section>

      {/* Check Out Our Work Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Check Out Our Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Content Automation System</h3>
              <p className="text-gray-600">Description of the content automation system project.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Automated Proposal Workflow</h3>
              <p className="text-gray-600">Description of the automated proposal workflow project.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Custom Chrome Extension</h3>
              <p className="text-gray-600">Description of the custom Chrome extension project.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Web App</h3>
              <p className="text-gray-600">Description of the web app project.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Custom AI Image Model</h3>
              <p className="text-gray-600">Description of the custom AI image model project.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}