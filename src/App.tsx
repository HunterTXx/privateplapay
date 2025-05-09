import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import useCoreWebVitals from "@/hooks/useCoreWebVitals";
import { HelmetProvider } from "react-helmet-async";
import Meta from "@/components/Meta";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/ProtectedRoute";
import Investments from "@/pages/Investments";
import Cycles from "@/pages/Cycles";
import Calculator from "@/pages/Calculator";
import Profile from "@/pages/Profile";
import Admin from "@/pages/Admin";
import ManageFunds from '@/pages/ManageFunds';
import Home from '@/pages/Home';
import HowItWorks from '@/pages/HowItWorks';
import FAQs from '@/pages/FAQs';
import TermsConditions from '@/pages/TermsConditions';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import EnvironmentalImpact from '@/pages/EnvironmentalImpact';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import ScrollToTop from '@/components/ScrollToTop';
import Layout from '@/components/Layout';
import CalculatorDashboard from '@/pages/CalculatorDashboard';
import CookieConsent from "@/components/CookieConsent";

const queryClient = new QueryClient();

const App = () => {
  // Monitor Core Web Vitals
  useCoreWebVitals();

  // const currentDate = '2025-05-07 18:15:23';

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <HelmetProvider>
          <BrowserRouter>
            <ScrollToTop />
            <AuthProvider>
              <Meta 
                title="PlasticPay | Recycle Plastic Waste for Financial Rewards | Sustainable Fintech"
                description="Turn plastic waste into cash rewards with PlasticPay. Join our sustainable fintech platform to earn money while saving the planet. Start recycling today!"
                keywords="plastic recycling, sustainable finance, fintech, recycling rewards, environmental investment, plastic waste management, sustainable technology, green finance"
                canonicalUrl="https://plasticpay.netlify.app"
                // structuredData={{
                //   "@context": "https://schema.org",
                //   "@type": "Organization",
                //   "name": "PlasticPay",
                //   "url": "https://plasticpay.netlify.app",
                //   "logo": "https://plasticpay.netlify.app/logo.png",
                //   "description": "Turn plastic waste into cash rewards with PlasticPay. Join our sustainable fintech platform to earn money while saving the planet.",
                //   "sameAs": [
                //     "https://twitter.com/plasticpay",
                //     "https://linkedin.com/company/plasticpay",
                //     "https://facebook.com/plasticpay"
                //   ],
                //   "contactPoint": {
                //     "@type": "ContactPoint",
                //     "contactType": "customer service",
                //     "availableLanguage": ["English"],
                //     "contactOption": "TollFree",
                //     "url": "https://t.me/PlasticPay_Support",
                //     "description": "Contact us on Telegram @PlasticPay_Support"
                //   },
                //   "dateModified": currentDate
                // }}
              />
              <Toaster />
              <Sonner />
              <CookieConsent />
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Navigate to="/" replace />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/faqs" element={<FAQs />} />
                  <Route path="/terms-conditions" element={<TermsConditions />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/environmental-impact" element={<EnvironmentalImpact />} />
                  <Route path="/calculator" element={<Calculator />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Index />} />
                  <Route path="/investments" element={<Investments />} />
                  <Route path="/cycles" element={<Cycles />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/manage-funds" element={<ManageFunds />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/user-calculator" element={<CalculatorDashboard />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </HelmetProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
