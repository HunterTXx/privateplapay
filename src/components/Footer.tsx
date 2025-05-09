import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Recycle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white pt-12 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center mb-3">
              <Recycle className="h-8 w-8 text-investment-green mr-2" />
              <span className="text-2xl font-bold text-investment-green">PlasticPay</span>
            </div>
            <p className="text-slate-300 mb-4">
              Sustainable investments with environmental impact. Transform plastic waste into reliable monthly returns while cleaning our planet.
            </p>
            <div className="flex space-x-4 mb-2">
              <a href="#" className="text-slate-400 hover:text-white" aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white" aria-label="Twitter"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/calculator" className="hover:underline">Calculator</Link></li>
              <li><Link to="/auth" className="hover:underline">Sign In</Link></li>
              <li><Link to="/auth?tab=signup" className="hover:underline">Register</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-3">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/how-it-works" className="hover:underline">How It Works</Link></li>
              <li><Link to="/faqs" className="hover:underline">FAQs</Link></li>
              <li><Link to="/terms-conditions" className="hover:underline">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/environmental-impact" className="hover:underline">Environmental Impact</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-3">Get in Touch</h3>
            <div className="mb-6">
              <p className="text-slate-300 mb-3">
                Have questions or need assistance? We're here to help!
              </p>
              <Link 
                to="/contact" 
                className="inline-block bg-investment-green text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>
         
          </div>
        </div>
        <hr className="border-slate-700 mb-4" />
        <div className="flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
          <div className="mb-2 md:mb-0">
            © {new Date().getFullYear()} PlasticPay. All rights reserved. PlasticPay is a registered trademark.
          </div>
          <div className="text-xs text-center md:text-right">
            Disclaimer: Investments involve risk. Past performance is not indicative of future results. Please read our terms and conditions before investing.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
