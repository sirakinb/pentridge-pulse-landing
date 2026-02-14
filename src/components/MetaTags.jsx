import React, { useEffect } from 'react';

const MetaTags = ({ 
  title, 
  description, 
  keywords, 
  pageType = 'website',
  canonicalUrl,
  ogImage = 'https://pentridgemedia.com/og-header.png',
  twitterImage = 'https://pentridgemedia.com/og-header.png'
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;
    
    // Update keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = keywords;
    
    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;
    
    // Force update Open Graph tags by removing and recreating them
    const ogTags = {
      'og:title': title,
      'og:description': description,
      'og:url': canonicalUrl,
      'og:image': ogImage,
      'og:type': pageType
    };
    
    Object.entries(ogTags).forEach(([property, content]) => {
      // Remove existing tag first
      let existingTag = document.querySelector(`meta[property="${property}"]`);
      if (existingTag) {
        existingTag.remove();
      }
      
      // Create new tag
      let ogTag = document.createElement('meta');
      ogTag.setAttribute('property', property);
      ogTag.content = content;
      document.head.appendChild(ogTag);
    });
    
    // Force update Twitter Card tags by removing and recreating them
    const twitterTags = {
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': twitterImage
    };
    
    Object.entries(twitterTags).forEach(([name, content]) => {
      // Remove existing tag first
      let existingTag = document.querySelector(`meta[name="${name}"]`);
      if (existingTag) {
        existingTag.remove();
      }
      
      // Create new tag
      let twitterTag = document.createElement('meta');
      twitterTag.name = name;
      twitterTag.content = content;
      document.head.appendChild(twitterTag);
    });
    
  }, [title, description, keywords, pageType, canonicalUrl, ogImage, twitterImage]);

  return null; // This component doesn't render anything
};

export default MetaTags; 