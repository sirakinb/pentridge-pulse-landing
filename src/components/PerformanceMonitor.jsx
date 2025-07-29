import React, { useEffect, useState } from 'react';

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    LCP: null,
    FID: null,
    CLS: null,
    FCP: null,
    TTFB: null,
  });

  useEffect(() => {
    // Track Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        setMetrics(prev => ({ ...prev, LCP: lastEntry.startTime }));
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          setMetrics(prev => ({ ...prev, FID: entry.processingStart - entry.startTime }));
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        setMetrics(prev => ({ ...prev, CLS: clsValue }));
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // First Contentful Paint (FCP)
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const firstEntry = entries[0];
        setMetrics(prev => ({ ...prev, FCP: firstEntry.startTime }));
      });
      fcpObserver.observe({ entryTypes: ['first-contentful-paint'] });

      // Time to First Byte (TTFB)
      const navigationEntry = performance.getEntriesByType('navigation')[0];
      if (navigationEntry) {
        setMetrics(prev => ({ ...prev, TTFB: navigationEntry.responseStart - navigationEntry.requestStart }));
      }

      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
        fcpObserver.disconnect();
      };
    }
  }, []);

  const getPerformanceGrade = (metric, value) => {
    if (!value) return 'N/A';
    
    const thresholds = {
      LCP: { good: 2500, needsImprovement: 4000 },
      FID: { good: 100, needsImprovement: 300 },
      CLS: { good: 0.1, needsImprovement: 0.25 },
      FCP: { good: 1800, needsImprovement: 3000 },
      TTFB: { good: 800, needsImprovement: 1800 },
    };

    const threshold = thresholds[metric];
    if (!threshold) return 'N/A';

    if (value <= threshold.good) return 'Good';
    if (value <= threshold.needsImprovement) return 'Needs Improvement';
    return 'Poor';
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'Good': return 'text-green-500';
      case 'Needs Improvement': return 'text-yellow-500';
      case 'Poor': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-90 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
      <h3 className="text-sm font-bold mb-2">Core Web Vitals</h3>
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span>LCP:</span>
          <span className={getGradeColor(getPerformanceGrade('LCP', metrics.LCP))}>
            {metrics.LCP ? `${Math.round(metrics.LCP)}ms` : 'N/A'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>FID:</span>
          <span className={getGradeColor(getPerformanceGrade('FID', metrics.FID))}>
            {metrics.FID ? `${Math.round(metrics.FID)}ms` : 'N/A'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>CLS:</span>
          <span className={getGradeColor(getPerformanceGrade('CLS', metrics.CLS))}>
            {metrics.CLS ? metrics.CLS.toFixed(3) : 'N/A'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>FCP:</span>
          <span className={getGradeColor(getPerformanceGrade('FCP', metrics.FCP))}>
            {metrics.FCP ? `${Math.round(metrics.FCP)}ms` : 'N/A'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>TTFB:</span>
          <span className={getGradeColor(getPerformanceGrade('TTFB', metrics.TTFB))}>
            {metrics.TTFB ? `${Math.round(metrics.TTFB)}ms` : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor; 