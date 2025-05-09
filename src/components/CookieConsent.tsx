import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      accepted: true,
      timestamp: '2025-05-07 12:57:04'
    }));
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      accepted: false,
      timestamp: '2025-05-07 12:57:04'
    }));
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-600 flex-1">
            <p className="mb-1">
              We use essential cookies to enable basic functionality like authentication and security.
              We only collect your name, email, and encrypted password for account purposes.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={handleDecline}>
              Decline
            </Button>
            <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                Learn More
              </Button>
            </Link>
            <Button size="sm" onClick={handleAccept}>
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
