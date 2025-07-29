import React, { useState } from 'react';

const SEOValidator = () => {
  const [validationResults, setValidationResults] = useState(null);
  const [isValidating, setIsValidating] = useState(false);

  const validateSchemaMarkup = async () => {
    setIsValidating(true);
    
    try {
      // Get all schema markup scripts from the page
      const schemaScripts = document.querySelectorAll('script[type="application/ld+json"]');
      const results = [];

      schemaScripts.forEach((script, index) => {
        try {
          const schemaData = JSON.parse(script.textContent);
          results.push({
            index,
            type: schemaData['@type'],
            valid: true,
            error: null
          });
        } catch (error) {
          results.push({
            index,
            type: 'Unknown',
            valid: false,
            error: error.message
          });
        }
      });

      setValidationResults(results);
    } catch (error) {
      setValidationResults([{
        index: 0,
        type: 'Error',
        valid: false,
        error: error.message
      }]);
    } finally {
      setIsValidating(false);
    }
  };

  const getSEORecommendations = () => {
    return [
      {
        category: 'Schema Markup',
        recommendations: [
          '✅ Organization schema implemented',
          '✅ Service schema implemented',
          '✅ FAQ schema implemented',
          '✅ WebSite schema implemented',
          '✅ LocalBusiness schema implemented',
          '✅ BreadcrumbList schema implemented'
        ]
      },
      {
        category: 'Meta Tags',
        recommendations: [
          '✅ Title tag optimized',
          '✅ Meta description implemented',
          '✅ Open Graph tags implemented',
          '✅ Twitter Card tags implemented',
          '✅ Canonical URL set',
          '✅ Robots meta tag configured'
        ]
      },
      {
        category: 'Technical SEO',
        recommendations: [
          '✅ Sitemap.xml created',
          '✅ Robots.txt configured',
          '✅ Structured data validation ready',
          '🔧 Consider implementing JSON-LD for reviews',
          '🔧 Consider adding more specific service schemas',
          '🔧 Monitor Core Web Vitals'
        ]
      },
      {
        category: 'Content SEO',
        recommendations: [
          '🔧 Add more FAQ items for better FAQ schema',
          '🔧 Implement review schema for testimonials',
          '🔧 Add article schema for blog content',
          '🔧 Consider implementing product schema for services',
          '🔧 Add more specific keywords to meta tags'
        ]
      }
    ];
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">SEO Schema Markup Validator</h2>
      
      <div className="mb-6">
        <button
          onClick={validateSchemaMarkup}
          disabled={isValidating}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isValidating ? 'Validating...' : 'Validate Schema Markup'}
        </button>
      </div>

      {validationResults && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Validation Results</h3>
          <div className="space-y-2">
            {validationResults.map((result, index) => (
              <div
                key={index}
                className={`p-3 rounded ${
                  result.valid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                <div className="font-medium">
                  Schema {result.index + 1}: {result.type}
                </div>
                <div className="text-sm">
                  {result.valid ? '✅ Valid JSON' : `❌ Error: ${result.error}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">SEO Implementation Status</h3>
        {getSEORecommendations().map((category, index) => (
          <div key={index} className="mb-4">
            <h4 className="font-medium text-gray-600 mb-2">{category.category}</h4>
            <ul className="space-y-1">
              {category.recommendations.map((rec, recIndex) => (
                <li key={recIndex} className="text-sm text-gray-700">
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-blue-800">Next Steps</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Test schema markup with Google's Rich Results Test</li>
          <li>• Submit sitemap to Google Search Console</li>
          <li>• Monitor search performance in Google Analytics</li>
          <li>• Consider implementing additional schema types based on content</li>
          <li>• Regular schema validation and updates</li>
        </ul>
      </div>
    </div>
  );
};

export default SEOValidator; 