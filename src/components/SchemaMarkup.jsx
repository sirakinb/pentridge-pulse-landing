import React from 'react';

const SchemaMarkup = () => {
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pentridge",
    "url": "https://www.pentridgemedia.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.pentridgemedia.com/logonew.png",
      "width": 200,
      "height": 200
    },
    "description": "Pentridge builds AI workflow automation systems for service businesses.",
    "foundingDate": "2024",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "aki.b@pentridgemedia.com",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://www.pentridgemedia.com"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Workflow Automation Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Workflow Automation Audit",
            "description": "Map manual workflows, estimate automation opportunities, and create an implementation roadmap."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Voice Agents",
            "description": "Answer calls, qualify leads, book appointments, and trigger CRM and follow-up workflows."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Lead Capture & Follow-Up Automation",
            "description": "Automate lead qualification, SMS and email follow-up, booking, and CRM updates."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "CRM & Operations Automation",
            "description": "Connect CRM, calendar, inbox, forms, SMS, reporting, and internal task workflows."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Document, Proposal & Reporting Automation",
            "description": "Automate document creation, proposal generation, recurring reports, and admin processes."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Internal Tools",
            "description": "Build custom dashboards, portals, MVPs, and internal tools that support AI workflows."
          }
        }
      ]
    }
  };

  // Service Schema for AI Automation Services
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Workflow Automation Services",
    "description": "Pentridge builds AI workflow automation systems for service businesses. Automate lead follow-up, voice calls, CRM updates, documents, reporting, and internal operations.",
    "provider": {
      "@type": "Organization",
      "name": "Pentridge",
      "url": "https://www.pentridgemedia.com"
    },
    "serviceType": [
      "AI Workflow Automation",
      "Business Process Automation",
      "Lead Follow-Up Automation",
      "AI Voice Agents",
      "System Integration",
      "CRM Automation",
      "Document Automation"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Workflow Automation Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Workflow Automation Audit",
            "description": "Map manual workflows, estimate automation opportunities, and create an implementation roadmap.",
            "category": "AI Workflow Automation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Voice Agents",
            "description": "Answer calls, qualify leads, book appointments, and trigger CRM and follow-up workflows.",
            "category": "AI Workflow Automation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Lead Capture & Follow-Up Automation",
            "description": "Automate lead qualification, SMS and email follow-up, booking, and CRM updates.",
            "category": "AI Workflow Automation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "CRM & Operations Automation",
            "description": "Connect CRM, calendar, inbox, forms, SMS, reporting, and internal task workflows.",
            "category": "Business Automation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Document, Proposal & Reporting Automation",
            "description": "Automate document creation, proposal generation, recurring reports, and admin processes.",
            "category": "Document Automation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Internal Tools",
            "description": "Build custom dashboards, portals, MVPs, and internal tools that support AI workflows.",
            "category": "Custom Software"
          }
        }
      ]
    }
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What types of businesses do you work with?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We work with a wide range of businesses, from startups to established companies, across various industries. Our focus is on helping businesses leverage AI and automation to improve their operations and growth."
        }
      },
      {
        "@type": "Question",
        "name": "Do you work with businesses in specific industries?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We work with clients across various industries, including coaches, consultants, service providers, and businesses looking to leverage technology and automation. Our services can be customized to fit your specific niche and target audience."
        }
      },
      {
        "@type": "Question",
        "name": "Can you help set up automated systems for lead capture and follow-up?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. We can implement tools like ManyChat to create automated responses to inquiries, set up discovery call bookings, and nurture leads through personalized follow-up sequences."
        }
      },
      {
        "@type": "Question",
        "name": "How do you maintain authenticity when using AI for content creation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We focus on repurposing your existing content, conversations, and ideas. This ensures the content remains authentic to your voice and message, while AI helps scale the production and distribution."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer training on AI tools and automation for my team?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we can provide training and support to help your team leverage AI tools and automation effectively in their workflows."
        }
      }
    ]
  };

  // WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Pentridge",
    "url": "https://www.pentridgemedia.com",
    "description": "Pentridge builds AI workflow automation systems for service businesses.",
    "publisher": {
      "@type": "Organization",
      "name": "Pentridge",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.pentridgemedia.com/logonew.png"
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.pentridgemedia.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // LocalBusiness Schema (for better local SEO)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Pentridge",
    "description": "AI workflow automation systems for service businesses.",
    "url": "https://www.pentridgemedia.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.pentridgemedia.com/logonew.png"
    },
    "image": {
      "@type": "ImageObject",
      "url": "https://www.pentridgemedia.com/logop.png"
    },
    "telephone": "+1-XXX-XXX-XXXX",
    "email": "aki.b@pentridgemedia.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "40.7128",
      "longitude": "-74.0060"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "17:00"
    },
    "priceRange": "$$",
    "currenciesAccepted": "USD",
    "paymentAccepted": "Credit Card, Bank Transfer",
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Workflow Automation Services"
    }
  };

  // BreadcrumbList Schema for navigation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.pentridgemedia.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Content House",
        "item": "https://www.pentridgemedia.com/content-house"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Contact",
        "item": "https://www.pentridgemedia.com/contact"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "About Us",
        "item": "https://www.pentridgemedia.com/about"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema, null, 2)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema, null, 2)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema, null, 2)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema, null, 2)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema, null, 2)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema, null, 2)
        }}
      />
    </>
  );
};

export default SchemaMarkup; 