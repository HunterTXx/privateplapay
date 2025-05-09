import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Header */}
      <header className="bg-gradient-to-r from-green-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Terms & Conditions</h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto prose prose-slate">
          <section className="mb-12">
            <h2>1. Introduction</h2>
            <p>
              Welcome to PlasticPay. These Terms and Conditions govern your use of our website and services. By accessing or using our platform, you agree to be bound by these terms.
            </p>
          </section>

          <section className="mb-12">
            <h2>2. Definitions</h2>
            <ul>
              <li>"Platform" refers to the PlasticPay website and services</li>
              <li>"User" refers to any individual or entity using our platform</li>
              <li>"Investment" refers to funds committed to plastic recycling projects</li>
              <li>"Project" refers to plastic recycling initiatives listed on our platform</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>3. Account Registration</h2>
            <p>
              To use our services, you must:
            </p>
            <ul>
              <li>Be at least 18 years old</li>
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Notify us immediately of any unauthorized access</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>4. Investment Terms</h2>
            <h3>4.1 Investment Process</h3>
            <ul>
              <li>Minimum investment amount: $50</li>
              <li>Investment terms vary by tier</li>
              <li>Returns are not guaranteed</li>
              <li>Withdrawal notice periods apply</li>
            </ul>

            <h3>4.2 Risk Disclosure</h3>
            <p>
              Investing in plastic recycling projects involves risks, including but not limited to:
            </p>
            <ul>
              <li>Market volatility</li>
              <li>Project performance</li>
              <li>Economic conditions</li>
              <li>Regulatory changes</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>5. Fees and Charges</h2>
            <ul>
              <li>Platform fee: 2% of investment amount</li>
              <li>Withdrawal fee: $5 per transaction</li>
              <li>Currency conversion fees may apply</li>
              <li>Additional fees may be charged for premium services</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>6. Intellectual Property</h2>
            <p>
              All content on our platform, including but not limited to:
            </p>
            <ul>
              <li>Text, graphics, logos</li>
              <li>Software, code, algorithms</li>
              <li>Trademarks, service marks</li>
              <li>Design elements and layout</li>
            </ul>
            <p>
              is the property of PlasticPay and is protected by intellectual property laws.
            </p>
          </section>

          <section className="mb-12">
            <h2>7. Privacy and Data Protection</h2>
            <p>
              We collect and process personal data in accordance with our Privacy Policy and applicable data protection laws. By using our platform, you consent to such processing.
            </p>
          </section>

          <section className="mb-12">
            <h2>8. Limitation of Liability</h2>
            <p>
              PlasticPay shall not be liable for:
            </p>
            <ul>
              <li>Indirect or consequential losses</li>
              <li>Loss of profits or revenue</li>
              <li>Data loss or corruption</li>
              <li>Service interruptions</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>9. Termination</h2>
            <p>
              We reserve the right to:
            </p>
            <ul>
              <li>Suspend or terminate accounts</li>
              <li>Modify or discontinue services</li>
              <li>Block access to the platform</li>
              <li>Take legal action if necessary</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>10. Changes to Terms</h2>
            <p>
              We may modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="mb-12">
            <h2>11. Governing Law</h2>
            <p>
              These terms are governed by the laws of [Jurisdiction]. Any disputes shall be resolved in the courts of [Jurisdiction].
            </p>
          </section>

          <section className="mb-12">
            <h2>12. Contact Information</h2>
            <p>
              For questions about these terms, please contact us at:
            </p>
            <ul>
              <li>Email: legal@plasticpay.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: [Company Address]</li>
            </ul>
          </section>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Need More Information?</h2>
          <p className="text-slate-600 mb-8">
            Our legal team is here to help you understand our terms and conditions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="w-full sm:w-auto">
                Contact Legal Team <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/privacy-policy">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                View Privacy Policy
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms; 