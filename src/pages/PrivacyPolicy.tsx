import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from 'lucide-react';

const PrivacyPolicy = () => {
  const lastUpdated = "May 1, 2025";

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Privacy Policy | PlasticPay Investment Platform</title>
        <meta name="description" content="PlasticPay's privacy policy explains how we collect, use, and protect your personal information while using our sustainable investment platform." />
        <meta name="keywords" content="plasticpay privacy, investment data protection, GDPR compliance, financial data security, sustainable investing privacy" />
        <meta property="og:title" content="Privacy Policy | PlasticPay Investment Platform" />
        <meta property="og:description" content="PlasticPay's privacy policy explains how we collect, use, and protect your personal information while using our sustainable investment platform." />
        <link rel="canonical" href="https://plasticpay.com/privacy-policy" />
      </Helmet>

      {/* Header */}
      <header className="bg-gradient-to-r from-green-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Privacy Policy</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-2">
              How we collect, use, and protect your information
            </p>
            <p className="text-slate-600">Last updated: {lastUpdated}</p>
          </div>
        </div>
      </header>

      {/* Privacy Policy Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-slate prose-headings:font-bold prose-headings:text-slate-800 prose-p:text-slate-600 prose-strong:text-slate-800">
            <div className="bg-slate-50 p-6 rounded-lg mb-8">
              <p className="font-medium">
                At PlasticPay, we are committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our mobile application, or interact with our investment platform (collectively, the "Services").
              </p>
              <p>
                Please read this Privacy Policy carefully. By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with our policies and practices, please do not use our Services.
              </p>
            </div>

            <h2 id="information-collect" className="scroll-mt-16">1. Information We Collect</h2>
            
            <h3>1.1 Personal Information</h3>
            <p>
              We may collect the following types of personal information:
            </p>
            <ul>
              <li><strong>Identity Information:</strong> Full name, date of birth, nationality, identification documents (passport, ID card, etc.), signature, and photographs.</li>
              <li><strong>Contact Information:</strong> Email address, telephone number, physical address, and country of residence.</li>
              <li><strong>Financial Information:</strong> Bank account details, payment card information, transaction history, investment preferences, tax identification numbers, and source of funds.</li>
              <li><strong>Account Information:</strong> Username, password, account settings, and preferences.</li>
              <li><strong>KYC/AML Information:</strong> Information required to comply with Know Your Customer (KYC) and Anti-Money Laundering (AML) regulations.</li>
            </ul>

            <h3>1.2 Usage and Technical Information</h3>
            <p>
              When you use our Services, we may automatically collect:
            </p>
            <ul>
              <li><strong>Device Information:</strong> IP address, device type, operating system, browser type, mobile network information, and device identifiers.</li>
              <li><strong>Usage Data:</strong> Pages visited, features used, time spent on the platform, click patterns, referring URLs, and other actions taken within our Services.</li>
              <li><strong>Location Data:</strong> Approximate location derived from IP address.</li>
              <li><strong>Cookies and Similar Technologies:</strong> Information collected through cookies, web beacons, and similar tracking technologies.</li>
            </ul>

            <Separator className="my-8" />

            <h2 id="information-sources" className="scroll-mt-16">2. How We Collect Information</h2>
            <p>
              We collect information through:
            </p>
            <ul>
              <li><strong>Direct Interactions:</strong> Information you provide when creating an account, making investments, contacting customer support, completing surveys, or using platform features.</li>
              <li><strong>Automated Technologies:</strong> Cookies, server logs, and similar technologies that automatically collect technical information when you visit our website or use our app.</li>
              <li><strong>Third-Party Sources:</strong> Public databases, identity verification services, credit reference agencies, financial institutions, and other partners who help us verify your identity, assess risks, and prevent fraud.</li>
            </ul>

            <Separator className="my-8" />

            <h2 id="information-use" className="scroll-mt-16">3. How We Use Your Information</h2>
            <p>
              We use your personal information for the following purposes:
            </p>
            
            <h3>3.1 Providing and Improving Our Services</h3>
            <ul>
              <li>Process investments and manage your account</li>
              <li>Facilitate transactions and payments</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Personalize your experience and improve our platform</li>
              <li>Develop new products, services, and features</li>
            </ul>

            <h3>3.2 Security and Compliance</h3>
            <ul>
              <li>Verify your identity and prevent fraud</li>
              <li>Comply with KYC, AML, and other regulatory requirements</li>
              <li>Enforce our terms, conditions, and policies</li>
              <li>Protect the security and integrity of our platform</li>
              <li>Detect and prevent potentially prohibited or illegal activities</li>
            </ul>

            <h3>3.3 Communication and Marketing</h3>
            <ul>
              <li>Send administrative notifications about your account</li>
              <li>Provide updates about our services, features, or policies</li>
              <li>Deliver marketing communications (with your consent where required)</li>
              <li>Process referrals and manage our referral program</li>
            </ul>

            <h3>3.4 Analytics and Research</h3>
            <ul>
              <li>Analyze usage patterns and trends</li>
              <li>Evaluate the effectiveness of our services</li>
              <li>Conduct research to improve our platform</li>
              <li>Generate anonymized and aggregated data for business intelligence</li>
            </ul>

            <Separator className="my-8" />

            <h2 id="information-sharing" className="scroll-mt-16">4. How We Share Your Information</h2>
            <p>
              We may share your personal information with:
            </p>
            <ul>
              <li><strong>Service Providers:</strong> Third-party vendors who perform services on our behalf, such as payment processing, identity verification, customer support, hosting, analytics, and marketing.</li>
              <li><strong>Business Partners:</strong> Companies we partner with to offer integrated services, co-branded promotions, or investment opportunities.</li>
              <li><strong>Legal and Regulatory Authorities:</strong> Government agencies, regulators, law enforcement, and others as required by law or to comply with legal processes.</li>
              <li><strong>Professional Advisors:</strong> Auditors, lawyers, accountants, and other professional advisors in connection with our business operations.</li>
              <li><strong>Corporate Transactions:</strong> In connection with a merger, acquisition, reorganization, sale of assets, or bankruptcy.</li>
            </ul>
            <p>
              We do not sell your personal information to third parties. When we share information with service providers, we enter into agreements that require them to use your information only for the purposes we specify and to protect it in accordance with this Privacy Policy.
            </p>

            <Separator className="my-8" />

            <h2 id="data-security" className="scroll-mt-16">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information, including:
            </p>
            <ul>
              <li>Encryption of sensitive data both in transit and at rest</li>
              <li>Regular security assessments and penetration testing</li>
              <li>Access controls and authentication requirements</li>
              <li>Secure data storage with regular backups</li>
              <li>Employee training on data protection and security practices</li>
            </ul>
            <p>
              While we strive to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security but are committed to implementing reasonable safeguards to protect your data.
            </p>

            <Separator className="my-8" />

            <h2 id="data-retention" className="scroll-mt-16">6. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Factors we consider when determining retention periods include:
            </p>
            <ul>
              <li>The duration of our relationship with you</li>
              <li>Legal obligations to retain data for certain periods</li>
              <li>Relevant statutes of limitations</li>
              <li>Potential disputes or legal claims</li>
              <li>Guidelines from regulatory authorities</li>
            </ul>
            <p>
              When personal information is no longer needed, we will securely delete or anonymize it.
            </p>

            <Separator className="my-8" />

            <h2 id="your-rights" className="scroll-mt-16">7. Your Rights and Choices</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul>
              <li><strong>Access:</strong> Request access to your personal information.</li>
              <li><strong>Correction:</strong> Request that we rectify inaccurate or incomplete information.</li>
              <li><strong>Deletion:</strong> Request the deletion of your personal information in certain circumstances.</li>
              <li><strong>Restriction:</strong> Request that we restrict the processing of your information.</li>
              <li><strong>Data Portability:</strong> Request a copy of your information in a structured, commonly used, and machine-readable format.</li>
              <li><strong>Objection:</strong> Object to our processing of your information in certain circumstances.</li>
              <li><strong>Withdrawal of Consent:</strong> Withdraw consent where processing is based on consent.</li>
              <li><strong>Complaint:</strong> Lodge a complaint with a supervisory authority.</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the details provided in the "Contact Us" section. We may need to verify your identity before responding to your request.
            </p>

            <Separator className="my-8" />

            <h2 id="cookies" className="scroll-mt-16">8. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to collect and use information about you and your devices. These technologies help us:
            </p>
            <ul>
              <li>Authenticate users and maintain sessions</li>
              <li>Remember your preferences and settings</li>
              <li>Understand how you use our Services</li>
              <li>Improve and optimize our platform</li>
              <li>Deliver relevant content and advertising</li>
            </ul>
            <p>
              You can manage your cookie preferences through your browser settings. Most browsers allow you to block or delete cookies. However, if you block certain cookies, you may not be able to use all features of our Services.
            </p>

            <Separator className="my-8" />

            <h2 id="international-transfers" className="scroll-mt-16">9. International Data Transfers</h2>
            <p>
              PlasticPay operates globally, which means your personal information may be transferred to, stored in, and processed in countries outside your country of residence. These countries may have data protection laws different from those in your country.
            </p>
            <p>
              When we transfer personal information internationally, we implement appropriate safeguards in accordance with applicable law, such as:
            </p>
            <ul>
              <li>Standard contractual clauses approved by relevant authorities</li>
              <li>Binding corporate rules for transfers within our group</li>
              <li>Contractual commitments from recipients to protect your information</li>
            </ul>
            <p>
              By using our Services, you consent to these international transfers as necessary to provide our Services.
            </p>

            <Separator className="my-8" />

            <h2 id="children" className="scroll-mt-16">10. Children's Privacy</h2>
            <p>
              Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information without parental consent, please contact us, and we will take steps to remove such information and terminate the child's account.
            </p>

            <Separator className="my-8" />

            <h2 id="updates" className="scroll-mt-16">11. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will post the updated Privacy Policy on our website and update the "Last Updated" date at the top of this page.
            </p>
            <p>
              For material changes, we will provide notice through our Services or by other means, such as email. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
            </p>

            <Separator className="my-8" />

            <h2 id="contact" className="scroll-mt-16">12. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact our Data Protection Officer at:
            </p>
            <p>
              <strong>Data Protection Officer</strong><br />
              PlasticPay Ltd.<br />
              Herengracht 595<br />
              1017 CE Amsterdam<br />
              The Netherlands<br />
              Email: privacy@plasticpay.com<br />
              Phone: +31 (0)20 123 4567
            </p>
            <p>
              For users in the European Economic Area, you have the right to lodge a complaint with your local data protection authority if you are not satisfied with our response.
            </p>

            <div className="bg-slate-50 p-6 rounded-lg mt-8">
              <p className="font-medium">
                By using the PlasticPay platform, you acknowledge that you have read and understood this Privacy Policy and our practices regarding the collection, use, and sharing of your information.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy; 