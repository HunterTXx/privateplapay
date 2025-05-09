import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WebVitalsDashboard = () => {
  const [vitals, setVitals] = useState({ LCP: 0, FID: 0, CLS: 0 });

  useEffect(() => {
    const handleWebVitals = (event: CustomEvent) => {
      const { name, value } = event.detail;
      setVitals(prev => ({
        ...prev,
        [name]: value
      }));
    };

    window.addEventListener('web-vitals', handleWebVitals as EventListener);
    return () => window.removeEventListener('web-vitals', handleWebVitals as EventListener);
  }, []);

  const getStatusColor = (metric: string, value: number) => {
    switch (metric) {
      case 'LCP':
        return value < 2.5 ? 'text-green-500' : value < 4 ? 'text-yellow-500' : 'text-red-500';
      case 'FID':
        return value < 100 ? 'text-green-500' : value < 300 ? 'text-yellow-500' : 'text-red-500';
      case 'CLS':
        return value < 0.1 ? 'text-green-500' : value < 0.25 ? 'text-yellow-500' : 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const latestVitals = vitals;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Largest Contentful Paint (LCP)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`text-2xl font-bold ${getStatusColor('LCP', latestVitals.LCP / 1000)}`}>
            {(latestVitals.LCP / 1000).toFixed(2)}s
          </p>
          <p className="text-sm text-gray-500">Target: &lt; 2.5s</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>First Input Delay (FID)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`text-2xl font-bold ${getStatusColor('FID', latestVitals.FID)}`}>
            {latestVitals.FID.toFixed(0)}ms
          </p>
          <p className="text-sm text-gray-500">Target: &lt; 100ms</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cumulative Layout Shift (CLS)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`text-2xl font-bold ${getStatusColor('CLS', latestVitals.CLS)}`}>
            {latestVitals.CLS.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">Target: &lt; 0.1</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebVitalsDashboard; 