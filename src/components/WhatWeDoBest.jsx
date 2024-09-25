import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const services = [
  {
    title: "Custom AI Solutions",
    description: "Fine-Tuned AI Models: Customize AI models to suit your specific business needs. AI Chatbot Implementation: Develop and deploy AI chatbots to improve customer engagement."
  },
  {
    title: "Web & App Development",
    description: "Low/No-Code Apps: Quickly build and deploy functional solutions. Natural Language Programming: Compose applications using AI-driven natural language programming. Landing Page Design & Development: Design and build unique, visually appealing landing pages."
  },
  {
    title: "API & System Integrations",
    description: "API Integrations: Seamlessly connect your software with third-party applications. App Connectivity: Integrate your business applications to streamline operations."
  },
  {
    title: "Business Process Automation",
    description: "Workflow Automation: Automate and optimize business workflows. Lead Nurturing & Activation Campaigns: Implement automated systems for nurturing leads and running activation campaigns."
  },
  {
    title: "CRM & Business Management Systems",
    description: "CRM Buildouts: Develop and customize CRM systems. Custom Business Management Apps: Build internal business management applications."
  },
  {
    title: "Custom Chrome Extensions",
    description: "Chrome Extension Development: Create custom Chrome extensions to address specific business needs, offering enhanced functionality and integrations."
  },
  {
    title: "AI-Driven Content Automation",
    description: "Content Generation Systems: Develop systems for automated content creation, distribution, and management, enhancing your digital presence and efficiency."
  },
  {
    title: "Automated Workflow Solutions",
    description: "Automated Proposal & Document Creation: Streamline the generation of proposals and documents. Onboarding & Admin Automation: Simplify and automate administrative processes."
  }
];

const WhatWeDoBest = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What We Do Best</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoBest;
