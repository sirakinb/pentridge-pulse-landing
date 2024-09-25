import React from 'react';

const TechItem = ({ logo, name, description }) => (
  <div className="flex flex-col items-center text-center">
    <img src={logo} alt={name} className="h-16 w-16 mb-4 mx-auto object-cover" />
    <h3 className="text-lg font-semibold mb-2">{name}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const ExpertiseTech = () => {
  const techItems = [
    {
      logo: "/chatgpt-logo.png",
      name: "ChatGPT",
      description: "ChatGPT is an artificial intelligence chatbot developed by OpenAI."
    },
    {
      logo: "/openai-logo.png",
      name: "OpenAI",
      description: "Open AI is the company that invented ChatGPT and other popular AI models. We're constantly testing it's newest innovations."
    },
    {
      logo: "/gemini-logo.png",
      name: "Gemini",
      description: "Gemini is Google's official AI project and competitor to Chat GPT."
    },
    {
      logo: "/zapier-logo.png",
      name: "Zapier",
      description: "Zapier is a platform that connects your tools into automated workflows."
    },
    {
      logo: "/make-logo.png",
      name: "Make",
      description: "Make.com is a Zapier competitor with a more visual interface and allows larger, more complex automations."
    },
    {
      logo: "/python-logo.png",
      name: "Python",
      description: "We also use python and javascript to write custom scripting so we can automate more complex processes."
    }
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">
          <span className="text-blue-600">AI</span> and <span className="text-blue-600">Automation</span> technologies we are experts in
        </h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
          We've built complete processes using every one of these tools. There are countless more tools in the market which we have experience with or are capable of integrating.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {techItems.map((item, index) => (
            <TechItem key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseTech;