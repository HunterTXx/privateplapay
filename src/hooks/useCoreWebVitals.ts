import { useEffect } from 'react';
import { onCLS, onFID, onLCP } from 'web-vitals';

interface WebVitals {
  LCP: number;
  FID: number;
  CLS: number;
}

declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params: {
        event_category: string;
        event_label: string;
        value: number;
        non_interaction: boolean;
      }
    ) => void;
  }
}

const useCoreWebVitals = () => {
  useEffect(() => {
    // Report Web Vitals to analytics
    const reportWebVitals = (metric: { name: string; value: number }) => {
      const { name, value } = metric;
      
      // Send to your analytics service
      console.log(`Web Vital: ${name} = ${value}`);
      
      // Dispatch custom event for dashboard
      window.dispatchEvent(new CustomEvent('web-vitals', {
        detail: { name, value }
      }));
      
      // You can also send to Google Analytics
      if (window.gtag) {
        window.gtag('event', name, {
          event_category: 'Web Vitals',
          event_label: name,
          value: Math.round(value),
          non_interaction: true,
        });
      }
    };

    // Initialize web-vitals
    onCLS(reportWebVitals);
    onFID(reportWebVitals);
    onLCP(reportWebVitals);
  }, []);
};

export default useCoreWebVitals; 