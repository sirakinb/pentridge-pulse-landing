import React from 'react';
import { Button } from "@/components/ui/button";

const TechStackConnectivity = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">
          We connect to all your apps
        </h2>
        <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
          Plus thousands more through APIs, custom code and web hooks.
        </p>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-8 mb-12">
          {['gmail', 'mailchimp', 'zoom', 'drive', 'teams', 'excel', 'discord', 
            'shopify', 'trello', 'slack', 'salesforce', 'clickup', 'notion', 'airtable',
            'asana', 'marketo', 'webflow', 'zendesk', 'jira', 'outlook'].map((app, index) => (
            <div key={index} className="flex justify-center items-center">
              <img 
                src={`/${app}-logo.png`} 
                alt={`${app} logo`} 
                className="h-12 w-12 object-contain"
              />
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg">
            Book an Automation Audit
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TechStackConnectivity;