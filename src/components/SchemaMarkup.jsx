import React from 'react';

const SchemaMarkup = () => {
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pentridge",
    "alternateName": "Pentridge Media",
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
      "addressLocality": "Philadelphia",
      "addressRegion": "PA",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://www.instagram.com/pentridgemedia",
      "https://www.youtube.com/@sirakinb",
      "https://clutch.co/profile/pentridge-media"
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
    "email": "aki.b@pentridgemedia.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Philadelphia",
      "addressRegion": "PA",
      "addressCountry": "US"
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
          __html: JSON.stringify(websiteSchema, null, 2)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema, null, 2)
        }}
      />
    </>
  );
};

export default SchemaMarkup; 