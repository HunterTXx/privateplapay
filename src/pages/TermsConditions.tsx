import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from 'lucide-react';

const TermsConditions = () => {
  const lastUpdated = "May 1, 2025";

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Terms and Conditions | PlasticPay Investment Platform</title>
        <meta name="description" content="Official terms and conditions for the PlasticPay investment platform. Learn about our legal agreements, user responsibilities, and how our plastic recycling investment opportunities work." />
        <meta name="keywords" content="plasticpay terms, investment terms and conditions, sustainable investing rules, recycling investment legal, environmental investment terms" />
        <meta property="og:title" content="Terms and Conditions | PlasticPay Investment Platform" />
        <meta property="og:description" content="Official terms and conditions for the PlasticPay investment platform. Learn about our legal agreements, user responsibilities, and how our plastic recycling investment opportunities work." />
        <link rel="canonical" href="https://plasticpay.com/terms-conditions" />
      </Helmet>

      {/* Header */}
      <header className="bg-gradient-to-r from-green-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Terms and Conditions</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-2">
              Please read these terms carefully before using the PlasticPay platform
            </p>
            <p className="text-slate-600">Last updated: {lastUpdated}</p>
          </div>
        </div>
      </header>

      {/* Terms Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-slate prose-headings:font-bold prose-headings:text-slate-800 prose-p:text-slate-600 prose-strong:text-slate-800">
            <div className="bg-slate-50 p-6 rounded-lg mb-8">
              <p className="font-medium">
                This document constitutes a legally binding agreement between you ("User", "Investor", "you" or "your") and PlasticPay Ltd. ("PlasticPay", "Company", "we", "us" or "our"), governing your access to and use of the PlasticPay investment platform available at plasticpay.com and related mobile applications (collectively, the "Platform").
              </p>
              <p>
                By accessing or using the Platform, you agree to be bound by these Terms and Conditions. If you do not agree to all terms contained herein, you may not access or use the Platform.
              </p>
            </div>

            <h2 id="definitions" className="scroll-mt-16">1. Definitions</h2>
            <p>
              Throughout these Terms, the following definitions apply:
            </p>
            <ul>
              <li><strong>Platform:</strong> The PlasticPay website, mobile applications, and related services.</li>
              <li><strong>Investment:</strong> Any financial contribution made through the Platform toward plastic recycling projects.</li>
              <li><strong>Returns:</strong> Financial payments made to investors based on the performance of recycling operations.</li>
              <li><strong>Cycle:</strong> A specific investment period with defined start and end dates.</li>
              <li><strong>Account:</strong> The registered user profile and associated services on the Platform.</li>
              <li><strong>KYC:</strong> Know Your Customer verification procedures.</li>
              <li><strong>AML:</strong> Anti-Money Laundering compliance protocols.</li>
            </ul>

            <Separator className="my-8" />

            <h2 id="eligibility" className="scroll-mt-16">2. Eligibility</h2>
            <p>
              To use the Platform and make investments, you must:
            </p>
            <ul>
              <li>Be at least 18 years of age or the age of legal majority in your jurisdiction, whichever is higher.</li>
              <li>Have the legal capacity to enter into binding contracts.</li>
              <li>Complete our KYC verification process successfully.</li>
              <li>Not be a resident of or located in any country subject to applicable sanctions or where our services are prohibited.</li>
              <li>Not be using the Platform for any illegal or unauthorized purpose.</li>
            </ul>
            <p>
              We reserve the right to refuse service to anyone for any reason at any time, including if we believe you are violating any applicable laws or these Terms.
            </p>

            <Separator className="my-8" />

            <h2 id="account-registration" className="scroll-mt-16">3. Account Registration and Security</h2>
            <p>
              To access the Platform's investment services, you must create an account. When registering, you agree to:
            </p>
            <ul>
              <li>Provide accurate, current, and complete information.</li>
              <li>Maintain and promptly update your account information.</li>
              <li>Safeguard your account credentials and not share them with any third party.</li>
              <li>Accept responsibility for all activities that occur under your account.</li>
              <li>Notify us immediately of any unauthorized access or security breaches.</li>
            </ul>
            <p>
              We implement reasonable security measures but cannot guarantee absolute security. You are responsible for choosing a strong password and maintaining the confidentiality of your account.
            </p>

            <Separator className="my-8" />

            <h2 id="investment-terms" className="scroll-mt-16">4. Investment Terms</h2>
            <p>
              By making an investment through the Platform, you agree to the following:
            </p>
            <h3>4.1 Investment Process</h3>
            <p>
              Investments are made by depositing funds into your PlasticPay account and allocating those funds to specific investment packages. The minimum investment amount is $50 or equivalent in other supported currencies.
            </p>

            <h3>4.2 Returns and Payments</h3>
            <p>
              Returns are calculated based on the performance of recycling operations and are paid after each 2-cycle period (1 month). Standard investments target 8-12% returns per 2 cycles, while premium packages may offer higher rates. Returns are not guaranteed and depend on operational performance.
            </p>

            <h3>4.3 Investment Periods</h3>
            <p>
              Standard investments may be withdrawn with a 30-day notice period. Premium investments require a minimum commitment of 12 months, after which withdrawals require a 60-day notice period.
            </p>

            <h3>4.4 Fees</h3>
            <p>
              PlasticPay charges a 3% fee on new investments and a 1% fee on withdrawals. There are no account maintenance fees. Additional fees may apply for certain payment methods or special services, and these will be clearly disclosed before processing.
            </p>

            <Separator className="my-8" />

            <h2 id="risks" className="scroll-mt-16">5. Investment Risks</h2>
            <p>
              All investments through the Platform involve risk, and you acknowledge and accept the following:
            </p>
            <ul>
              <li>Past performance is not indicative of future results.</li>
              <li>Investment returns are not guaranteed.</li>
              <li>You may lose part or all of your investment.</li>
              <li>Market conditions, operational challenges, and regulatory changes may affect investment performance.</li>
              <li>Recycled material prices may fluctuate based on market demand.</li>
              <li>Political and economic factors may impact operations in countries where recycling facilities are located.</li>
            </ul>
            <p>
              You should not invest more than you can afford to lose. We recommend consulting with a financial advisor before making significant investment decisions.
            </p>

            <Separator className="my-8" />

            <h2 id="kyc-aml" className="scroll-mt-16">6. KYC and AML Compliance</h2>
            <p>
              PlasticPay is committed to preventing money laundering and other financial crimes. You agree to:
            </p>
            <ul>
              <li>Provide accurate identification documents and information for KYC verification.</li>
              <li>Submit to periodic re-verification when requested.</li>
              <li>Confirm that your funds originate from legitimate sources.</li>
              <li>Not use the Platform for money laundering or financing illegal activities.</li>
            </ul>
            <p>
              We may freeze accounts, delay transactions, or take other actions as required by applicable AML regulations or if we detect suspicious activity.
            </p>

            <Separator className="my-8" />

            <h2 id="intellectual-property" className="scroll-mt-16">7. Intellectual Property</h2>
            <p>
              All content on the Platform, including text, graphics, logos, icons, images, audio, video, software, and data compilations, is the exclusive property of PlasticPay or our licensors and is protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works from, publicly display, publicly perform, republish, download, store, transmit, or otherwise exploit any material on our Platform without our express written consent.
            </p>

            <Separator className="my-8" />

            <h2 id="privacy" className="scroll-mt-16">8. Privacy and Data Protection</h2>
            <p>
              Your privacy is important to us. Our collection and use of personal information is governed by our <Link to="/privacy-policy" className="text-investment-green hover:underline">Privacy Policy</Link>, which is incorporated into these Terms by reference. By using the Platform, you consent to the collection, processing, and sharing of your information as described in our Privacy Policy.
            </p>

            <Separator className="my-8" />

            <h2 id="termination" className="scroll-mt-16">9. Termination</h2>
            <p>
              We may suspend or terminate your access to the Platform at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason at our discretion.
            </p>
            <p>
              You may terminate your account at any time by following the instructions on the Platform, subject to any ongoing investment commitments and applicable notice periods for withdrawals.
            </p>

            <Separator className="my-8" />

            <h2 id="liability" className="scroll-mt-16">10. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, PlasticPay and its officers, directors, employees, agents, and partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, resulting from your access to or use of the Platform.
            </p>
            <p>
              Our total liability for all claims related to these Terms shall not exceed the greater of $100 or the amount you have invested through the Platform in the 12 months preceding the claim.
            </p>

            <Separator className="my-8" />

            <h2 id="indemnification" className="scroll-mt-16">11. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless PlasticPay and its officers, directors, employees, agents, and partners from and against any claims, liabilities, damages, losses, and expenses, including reasonable legal and accounting fees, arising out of or in any way connected with your access to or use of the Platform, your violation of these Terms, or your violation of any third-party rights.
            </p>

            <Separator className="my-8" />

            <h2 id="modifications" className="scroll-mt-16">12. Modifications to Terms</h2>
            <p>
              We may modify these Terms at any time by posting the revised terms on the Platform. Your continued use of the Platform after such changes constitutes your acceptance of the modified Terms. If you do not agree to the modified Terms, you must stop using the Platform.
            </p>
            <p>
              For material changes, we will make reasonable efforts to provide notice through the Platform or via email to the address associated with your account.
            </p>

            <Separator className="my-8" />

            <h2 id="governing-law" className="scroll-mt-16">13. Governing Law and Dispute Resolution</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Netherlands, without regard to its conflict of law principles. Any dispute arising from or relating to these Terms or your use of the Platform shall be resolved exclusively through binding arbitration in Amsterdam, the Netherlands, in accordance with the Rules of Arbitration of the International Chamber of Commerce.
            </p>

            <Separator className="my-8" />

            <h2 id="severability" className="scroll-mt-16">14. Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will continue in full force and effect.
            </p>

            <Separator className="my-8" />

            <h2 id="entire-agreement" className="scroll-mt-16">15. Entire Agreement</h2>
            <p>
              These Terms, together with our Privacy Policy and any other legal notices or additional terms and conditions provided by PlasticPay, constitute the entire agreement between you and PlasticPay regarding the Platform and supersede all prior agreements and understandings.
            </p>

            <Separator className="my-8" />

            <h2 id="contact" className="scroll-mt-16">16. Contact Information</h2>
            <p>
              If you have any questions or concerns about these Terms or the Platform, please contact us at:
            </p>
            <p>
              <strong>PlasticPay Ltd.</strong><br />
              Herengracht 595<br />
              1017 CE Amsterdam<br />
              The Netherlands<br />
              Email: legal@plasticpay.com<br />
              Phone: +31 (0)20 123 4567
            </p>

            <div className="bg-slate-50 p-6 rounded-lg mt-8">
              <p className="font-medium">
                By using the PlasticPay platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Ready to Make an Impact?</h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Start your sustainable investment journey with PlasticPay today.
          </p>
          <Link to="/auth?tab=signup">
            <Button size="lg">Create Your Account</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TermsConditions; 