import React from 'react';

const PageSchemaMarkup = ({ pageType, pageData = {} }) => {
  const getPageSchema = () => {
    switch (pageType) {
      case 'home':
        return {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Pentridge - AI-Powered Growth Systems",
          "description": "We Build AI-Powered Growth Systems For Entrepreneurs and Service Businesses. Leverage AI, Automation, and Digital Strategies to save you time and propel your business forward.",
          "url": "https://pentridgemedia.com",
          "mainEntity": {
            "@type": "Organization",
            "name": "Pentridge",
            "description": "AI-Powered Growth Systems For Entrepreneurs and Service Businesses"
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://pentridgemedia.com"
              }
            ]
          }
        };

      case 'contact':
        return {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Pentridge",
          "description": "Get in touch with our team for AI-powered growth solutions",
          "url": "https://pentridgemedia.com/contact",
          "mainEntity": {
            "@type": "Organization",
            "name": "Pentridge",
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "email": "aki.b@pentridgemedia.com",
              "availableLanguage": "English"
            }
          },
          "breadcrumb": {
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
                "name": "Contact",
                "item": "https://pentridgemedia.com/contact"
              }
            ]
          }
        };

      case 'content-house':
        return {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Content House - Pentridge",
          "description": "AI-driven content automation and management solutions for businesses",
          "url": "https://pentridgemedia.com/content-house",
          "mainEntity": {
            "@type": "Service",
            "name": "AI-Driven Content Automation",
            "description": "Develop systems for automated content creation, distribution, and management, enhancing your digital presence and efficiency.",
            "provider": {
              "@type": "Organization",
              "name": "Pentridge"
            }
          },
          "breadcrumb": {
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
              }
            ]
          }
        };

      case 'about':
        return {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Us - Pentridge",
          "description": "Learn about Pentridge and our mission to build AI-powered growth systems",
          "url": "https://pentridgemedia.com/about",
          "mainEntity": {
            "@type": "Organization",
            "name": "Pentridge",
            "description": "We Build AI-Powered Growth Systems For Entrepreneurs and Service Businesses",
            "foundingDate": "2024",
            "mission": "To help businesses leverage AI and automation to improve their operations and growth"
          },
          "breadcrumb": {
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
                "name": "About Us",
                "item": "https://pentridgemedia.com/about"
              }
            ]
          }
        };

      default:
        return null;
    }
  };

  const schema = getPageSchema();

  if (!schema) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2)
      }}
    />
  );
};

export default PageSchemaMarkup; 