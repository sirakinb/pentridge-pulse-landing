import React, { useState, useEffect } from 'react';

const MobileResponsivenessTest = () => {
  const [viewportSize, setViewportSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [deviceType, setDeviceType] = useState('desktop');
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      const newSize = {
        width: window.innerWidth,
        height: window.innerHeight
      };
      setViewportSize(newSize);
      
      // Determine device type
      if (newSize.width < 768) {
        setDeviceType('mobile');
      } else if (newSize.width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const runMobileTest = () => {
    const newIssues = [];
    
    // Check viewport meta tag
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta || !viewportMeta.content.includes('width=device-width')) {
      newIssues.push('Missing or incorrect viewport meta tag');
    }

    // Check for horizontal scroll
    const bodyWidth = document.body.scrollWidth;
    const viewportWidth = window.innerWidth;
    if (bodyWidth > viewportWidth) {
      newIssues.push(`Horizontal scroll detected: content width (${bodyWidth}px) exceeds viewport (${viewportWidth}px)`);
    }

    // Check for touch targets (simplified)
    const buttons = document.querySelectorAll('button, a, input[type="button"], input[type="submit"]');
    buttons.forEach((button, index) => {
      const rect = button.getBoundingClientRect();
      if (rect.width < 44 || rect.height < 44) {
        newIssues.push(`Touch target too small: ${button.tagName} at index ${index} (${rect.width}x${rect.height}px)`);
      }
    });

    // Check for images without alt text
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      if (!img.alt) {
        newIssues.push(`Image missing alt text: image at index ${index}`);
      }
    });

    // Check for proper heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let previousLevel = 0;
    headings.forEach((heading, index) => {
      const currentLevel = parseInt(heading.tagName.charAt(1));
      if (currentLevel - previousLevel > 1) {
        newIssues.push(`Heading hierarchy issue: ${heading.tagName} at index ${index} skips levels`);
      }
      previousLevel = currentLevel;
    });

    setIssues(newIssues);
  };

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'mobile': return '📱';
      case 'tablet': return '📱';
      case 'desktop': return '💻';
      default: return '💻';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Mobile Responsiveness Test</h3>
      
      {/* Current Viewport Info */}
      <div className="bg-white/5 rounded-lg p-4 mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-2xl">{getDeviceIcon(deviceType)}</span>
          <span className="font-medium">Current Device: {deviceType}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-300">Width:</span>
            <span className="ml-2 font-mono">{viewportSize.width}px</span>
          </div>
          <div>
            <span className="text-gray-300">Height:</span>
            <span className="ml-2 font-mono">{viewportSize.height}px</span>
          </div>
        </div>
      </div>

      {/* Test Button */}
      <button
        onClick={runMobileTest}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out mb-4"
      >
        Run Mobile Test
      </button>

      {/* Test Results */}
      {issues.length > 0 && (
        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="font-medium text-gray-300 mb-2">Issues Found ({issues.length}):</h4>
          <ul className="space-y-2">
            {issues.map((issue, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm">
                <span className="text-red-400 mt-1">⚠</span>
                <span>{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {issues.length === 0 && issues.length !== undefined && (
        <div className="bg-green-500/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <span className="text-green-400">✓</span>
            <span>No mobile responsiveness issues detected!</span>
          </div>
        </div>
      )}

      {/* Mobile Testing Tips */}
      <div className="mt-6">
        <h4 className="font-medium text-purple-300 mb-2">Mobile Testing Tips:</h4>
        <ul className="text-sm space-y-1 text-gray-300">
          <li>• Test on actual mobile devices when possible</li>
          <li>• Use browser dev tools to simulate different screen sizes</li>
          <li>• Check touch target sizes (minimum 44x44px)</li>
          <li>• Ensure proper viewport meta tag</li>
          <li>• Test with different orientations (portrait/landscape)</li>
          <li>• Verify images have proper alt text</li>
          <li>• Check heading hierarchy</li>
        </ul>
      </div>
    </div>
  );
};

export default MobileResponsivenessTest; 