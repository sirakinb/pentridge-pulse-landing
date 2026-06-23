import React, { useEffect } from 'react';

const MetaTags = ({ 
  title, 
  description, 
  keywords, 
  pageType = 'website',
  canonicalUrl,
  canonical,
  robots = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  ogImage = 'https://www.pentridgemedia.com/og-header.png',
  twitterImage = 'https://www.pentridgemedia.com/og-header.png'
}) => {
  useEffect(() => {
    const siteUrl = 'https://www.pentridgemedia.com';
    const normalizeUrl = (value) => {
      if (!value) return siteUrl;
      if (value.startsWith('http')) return value.replace('https://pentridgemedia.com', siteUrl);
      return `${siteUrl}${value.startsWith('/') ? value : `/${value}`}`;
    };
    const resolvedCanonicalUrl = normalizeUrl(canonicalUrl || canonical);
    const resolvedOgImage = normalizeUrl(ogImage);
    const resolvedTwitterImage = normalizeUrl(twitterImage);

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

    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = robots;
    
    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = resolvedCanonicalUrl;
    
    // Force update Open Graph tags by removing and recreating them
    const ogTags = {
      'og:title': title,
      'og:description': description,
      'og:url': resolvedCanonicalUrl,
      'og:image': resolvedOgImage,
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
      'twitter:image': resolvedTwitterImage
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
    
  }, [title, description, keywords, pageType, canonicalUrl, canonical, robots, ogImage, twitterImage]);

  return null; // This component doesn't render anything
};

export default MetaTags;
