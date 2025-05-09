import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Recycle, Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from "@/lib/utils";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation items array
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Calculator", href: "/calculator" },
    { name: "FAQs", href: "/faqs" },
    { name: "Contact", href: "/contact" },
  ];

  const handleLogout = async () => {
    await signOut();
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Recycle className="h-6 w-6 text-investment-green" />
            <span className="text-xl font-bold text-investment-green ml-2">PlasticPay</span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className={cn(
            "items-center space-x-4",
            isMobile ? "hidden" : "flex"
          )}>
            <nav className="flex items-center space-x-4 mr-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    location.pathname === item.href
                      ? "text-investment-green bg-investment-green/10"
                      : "text-gray-600 hover:text-investment-green hover:bg-gray-50"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Authentication Buttons - Desktop */}
            <div className="flex items-center space-x-4">
              {!user ? (
                <>
                  <Link to="/auth">
                    <Button 
                      variant="outline" 
                      className="hover:bg-investment-green/10 hover:text-investment-green hover:border-investment-green"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth?tab=signup">
                    <Button className="bg-investment-green hover:bg-investment-green/90">
                      Join Now
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard">
                    <Button 
                      variant="outline" 
                      className="hover:bg-investment-green/10 hover:text-investment-green hover:border-investment-green"
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    onClick={handleLogout}
                    className="bg-investment-green hover:bg-investment-green/90"
                  >
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobile && (
        <>
          <div
            className={cn(
              "fixed inset-0 bg-black/50 transition-opacity duration-300 z-40",
              mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu Panel */}
          <div
            className={cn(
              "fixed inset-y-0 right-0 w-[90%] max-w-[400px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto z-50",
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            )}
          >
            <div className="p-6">
              <div className="flex flex-col space-y-4">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between mb-6">
                  <Link to="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                    <Recycle className="h-6 w-6 text-investment-green" />
                    <span className="text-xl font-bold text-investment-green ml-2">PlasticPay</span>
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-md hover:bg-gray-100"
                  >
                    <X className="h-6 w-6 text-gray-600" />
                  </button>
                </div>

                {/* Mobile Navigation Items */}
                <nav className="flex flex-col space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "px-4 py-3 text-base font-medium rounded-md transition-colors",
                        location.pathname === item.href
                          ? "text-investment-green bg-investment-green/10"
                          : "text-gray-600 hover:text-investment-green hover:bg-gray-50"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* Authentication Buttons - Mobile */}
                <div className="pt-6 mt-6 border-t border-gray-200">
                  {!user ? (
                    <div className="space-y-3">
                      <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                        <Button 
                          variant="outline" 
                          className="w-full hover:bg-investment-green/10 hover:text-investment-green hover:border-investment-green"
                        >
                          Sign In
                        </Button>
                      </Link>
                      <Link to="/auth?tab=signup" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full bg-investment-green hover:bg-investment-green/90">
                          Join Now
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                        <Button 
                          variant="outline" 
                          className="w-full hover:bg-investment-green/10 hover:text-investment-green hover:border-investment-green"
                        >
                          Dashboard
                        </Button>
                      </Link>
                      <Button 
                        onClick={handleLogout}
                        className="w-full bg-investment-green hover:bg-investment-green/90"
                      >
                        Logout
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
