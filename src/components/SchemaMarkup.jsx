import React from 'react';

const SchemaMarkup = () => {
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pentridge",
    "url": "https://pentridgemedia.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://pentridgemedia.com/logonew.png",
      "width": 200,
      "height": 200
    },
    "description": "We Build AI-Powered Growth Systems For Entrepreneurs and Service Businesses",
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
      "https://pentridgemedia.com"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI-Powered Growth Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom AI Solutions",
            "description": "Customize AI models to suit your specific business needs. Develop and deploy AI chatbots and voice agents to improve customer engagement."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web & App Composition",
            "description": "Quickly build and deploy functional solutions. Compose applications using AI-driven natural language programming. Design and build unique, visually appealing landing pages."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "API & System Integrations",
            "description": "Seamlessly connect your software with third-party applications. Integrate your business applications to streamline operations."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Automated Workflow Solutions",
            "description": "Automate and optimize workflows, streamline proposal and document generation, implement systems to nurture leads, run activation campaigns, and simplify admin processes."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "CRM & Business Management Systems",
            "description": "Develop and customize CRM systems. Build internal business management applications."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI-Driven Content Automation",
            "description": "Develop systems for automated content creation, distribution, and management, enhancing your digital presence and efficiency."
          }
        }
      ]
    }
  };

  // Service Schema for AI Automation Services
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI-Powered Growth Systems",
    "description": "We Build AI-Powered Growth Systems For Entrepreneurs and Service Businesses. Leverage AI, Automation, and Digital Strategies to save you time and propel your business forward.",
    "provider": {
      "@type": "Organization",
      "name": "Pentridge",
      "url": "https://pentridgemedia.com"
    },
    "serviceType": [
      "AI Automation",
      "Business Process Automation",
      "Digital Marketing",
      "Content Creation",
      "System Integration",
      "CRM Development"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI-Powered Growth Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom AI Solutions",
            "description": "Customize AI models to suit your specific business needs. Develop and deploy AI chatbots and voice agents to improve customer engagement.",
            "category": "AI Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web & App Composition",
            "description": "Quickly build and deploy functional solutions. Compose applications using AI-driven natural language programming. Design and build unique, visually appealing landing pages.",
            "category": "Web Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "API & System Integrations",
            "description": "Seamlessly connect your software with third-party applications. Integrate your business applications to streamline operations.",
            "category": "System Integration"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Automated Workflow Solutions",
            "description": "Automate and optimize workflows, streamline proposal and document generation, implement systems to nurture leads, run activation campaigns, and simplify admin processes.",
            "category": "Business Automation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "CRM & Business Management Systems",
            "description": "Develop and customize CRM systems. Build internal business management applications.",
            "category": "CRM Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI-Driven Content Automation",
            "description": "Develop systems for automated content creation, distribution, and management, enhancing your digital presence and efficiency.",
            "category": "Content Marketing"
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
    "url": "https://pentridgemedia.com",
    "description": "We Build AI-Powered Growth Systems For Entrepreneurs and Service Businesses",
    "publisher": {
      "@type": "Organization",
      "name": "Pentridge",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pentridgemedia.com/logonew.png"
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://pentridgemedia.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // LocalBusiness Schema (for better local SEO)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Pentridge",
    "description": "AI-Powered Growth Systems For Entrepreneurs and Service Businesses",
    "url": "https://pentridgemedia.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://pentridgemedia.com/logonew.png"
    },
    "image": {
      "@type": "ImageObject",
      "url": "https://pentridgemedia.com/logop.png"
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
      "name": "AI-Powered Growth Services"
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
        "item": "https://pentridgemedia.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Content House",
        "item": "https://pentridgemedia.com/content-house"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Contact",
        "item": "https://pentridgemedia.com/contact"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "About Us",
        "item": "https://pentridgemedia.com/about"
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