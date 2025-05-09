import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Meta from '@/components/Meta';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Calculator,
  BarChart3,
  Leaf
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getCurrentUTCTimestamp } from '@/utils/dateUtils';

const HowItWorks = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const currentTimestamp = getCurrentUTCTimestamp();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqs = [
    {
      question: "What is the minimum investment amount?",
      answer: "You can start investing with as little as $50. We believe in making sustainable investing accessible to everyone."
    },
    {
      question: "How often are dividends paid?",
      answer: "Returns are paid after each 2-cycle period (1 month), typically on the 1st of each month. You can track your upcoming payments in your dashboard."
    },
    {
      question: "Is my investment secure?",
      answer: "Yes, we implement bank-level security measures and comply with all financial regulations. Your funds are protected and all transactions are encrypted."
    },
    {
      question: "Can I withdraw my investment?",
      answer: "Yes, you can withdraw your investment after the minimum holding period. Standard withdrawals are processed within 30 days."
    },
    {
      question: "How is the environmental impact measured?",
      answer: "We track multiple metrics including plastic waste removed, carbon emissions reduced, and jobs created. These are visible in your impact dashboard."
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-white">
      <Meta 
        title="How PlasticPay Works | Sustainable Investment in Plastic Recycling"
        description="Learn how PlasticPay transforms plastic waste into profitable investments with our innovative recycling process that delivers consistent returns while cleaning our environment."
        keywords="plastic recycling investment, sustainable investment process, impact investing, recycling dividends, environmental investing, plastic waste management, circular economy investment"
        canonicalUrl="https://plasticpay.netlify.app/how-it-works"
        ogTitle="How PlasticPay Works | Sustainable Investment in Plastic Recycling"
        ogDescription="Learn how PlasticPay transforms plastic waste into profitable investments with our innovative recycling process that delivers consistent returns while cleaning our environment."
        ogImage="https://plasticpay.netlify.app/og-how-it-works.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Invest in Plastic Recycling with PlasticPay",
          "description": "Step-by-step guide to investing in plastic recycling through PlasticPay's sustainable investment platform",
          "step": [
            {
              "@type": "HowToStep",
              "name": "Create Your Account",
              "text": "Sign up in less than 2 minutes with our simple registration process"
            },
            {
              "@type": "HowToStep",
              "name": "Choose Your Investment",
              "text": "Select from multiple investment packages tailored to your financial goals"
            },
            {
              "@type": "HowToStep",
              "name": "Fund Your Account",
              "text": "Deposit funds using our secure payment methods"
            }
          ],
          "dateModified": "2025-05-07 19:15:52"
        }}
      />

      <div className="fixed top-0 left-0 w-full h-1 bg-slate-100 z-50">
        <div 
          className="h-full bg-green-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-green-50 to-blue-50 py-16"
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">How PlasticPay Works</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Our innovative platform connects investors with plastic recycling projects through a simple, transparent process designed to generate sustainable profits and environmental impact.
            </p>
            <nav className="flex flex-wrap justify-center gap-4">
              <Link to="/calculator">
                <Button variant="outline" className="flex items-center">
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate Returns
                </Button>
              </Link>
              <Link to="/environmental-impact">
                <Button variant="outline" className="flex items-center">
                  <Leaf className="mr-2 h-5 w-5" />
                  View Environmental Impact
                </Button>
              </Link>
              <Link to="/faqs">
                <Button variant="outline" className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Frequently Asked Questions
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-16">
        <motion.section 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="py-16 bg-white"
          aria-labelledby="investment-process-heading"
        >
          <div className="container mx-auto px-4">
            <motion.div 
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 id="investment-process-heading" className="text-3xl font-bold text-slate-800 mb-4">The PlasticPay Investment Process</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                From your first investment to receiving monthly dividends, our streamlined process makes sustainable investing accessible to everyone.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  step: 1,
                  title: "Create Your Account",
                  description: "Sign up in less than 2 minutes with our simple registration process. Verify your identity to comply with financial regulations and secure your account.",
                  features: [
                    "Quick verification process",
                    "Bank-level security protections",
                    "User-friendly dashboard access"
                  ]
                },
                {
                  step: 2,
                  title: "Choose Your Investment",
                  description: "Select from multiple investment packages tailored to your financial goals. Our packages range from $50 entry-level investments to premium tiers with facility ownership.",
                  features: [
                    "Flexible investment amounts",
                    "Multiple return rate options",
                    "Clear terms and conditions"
                  ]
                },
                {
                  step: 3,
                  title: "Fund Your Account",
                  description: "Deposit funds using our secure payment methods including bank transfers, credit cards, and cryptocurrency options. All transactions are encrypted and protected.",
                  features: [
                    "Multiple payment options",
                    "Instant confirmation",
                    "Transparent fee structure"
                  ]
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white p-6 rounded-lg shadow-md border border-slate-100 hover:shadow-lg transition-shadow"
                >
                  <div className="bg-green-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-green-600">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-slate-600 mb-4">{item.description}</p>
                  <ul className="space-y-2">
                    {item.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: 4,
                  title: "Track Your Investment",
                  description: "Monitor your investment performance through our intuitive dashboard with real-time updates on financial returns and environmental impact metrics.",
                  features: [
                    "Live investment tracking",
                    "Environmental impact reports",
                    "Upcoming dividend calendar"
                  ]
                },
                {
                  step: 5,
                  title: "Receive Monthly Dividends",
                  description: "Earn consistent returns based on recycling operation performance, with payouts of 8-12% per 2 cycles (1 month) automatically deposited to your account on the 1st of each month.",
                  features: [
                    "8-12% returns per 2 cycles",
                    "Predictable income stream",
                    "Reinvestment opportunities"
                  ]
                },
                {
                  step: 6,
                  title: "Grow Your Portfolio",
                  description: "Reinvest your dividends to compound your returns, refer friends for additional income, and access exclusive premium investment opportunities as your portfolio grows.",
                  features: [
                    "Automated reinvestment options",
                    "Tiered referral program",
                    "Premium investment access"
                  ]
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white p-6 rounded-lg shadow-md border border-slate-100 hover:shadow-lg transition-shadow"
                >
                  <div className="bg-green-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-green-600">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-slate-600 mb-4">{item.description}</p>
                  <ul className="space-y-2">
                    {item.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={fadeInUp}
              className="text-center mt-16"
            >
              <Link to="/auth?tab=signup">
                <Button className="bg-investment-green hover:bg-investment-green/90 text-white">
                  Start Investing Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="py-16 bg-slate-50"
          aria-labelledby="value-chain-heading"
        >
          <div className="container mx-auto px-4">
            <motion.div 
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 id="value-chain-heading" className="text-3xl font-bold text-slate-800 mb-4">Our Recycling Value Chain</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                PlasticPay's end-to-end recycling process creates value at every stage, generating the returns that power your investment while removing plastic waste from the environment.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 relative mb-12">
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-green-600 -z-10 transform -translate-y-1/2"></div>
              
              {[
                {
                  step: 1,
                  title: "Collection",
                  description: "Our network of collection partners gathers plastic waste from beaches, rivers, and urban centers, paying local communities fair wages for their environmental efforts."
                },
                {
                  step: 2,
                  title: "Sorting",
                  description: "Advanced sorting facilities use both manual techniques and AI-powered technology to separate different types of plastics for optimal processing efficiency."
                },
                {
                  step: 3,
                  title: "Processing",
                  description: "Collected plastics are cleaned, shredded, and prepared for recycling using innovative equipment that maximizes material recovery while minimizing environmental impact."
                },
                {
                  step: 4,
                  title: "Manufacturing",
                  description: "Processed plastic is transformed into high-quality pellets, fibers, or finished products that meet industry standards for durability and performance."
                },
                {
                  step: 5,
                  title: "Distribution",
                  description: "Recycled materials are sold to companies committed to sustainable practices, closing the loop in the circular economy and generating revenue that flows back to investors."
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.2 }}
                  className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="mx-auto bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <span className="font-bold text-xl">{item.step}</span>
                  </div>
                  <h3 className="font-semibold mb-2 text-lg">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-8 rounded-lg shadow-md border border-slate-100"
            >
              <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">How Your Investment Drives Impact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Environmental Impact",
                    description: "Each $50 invested removes approximately 10kg of plastic waste from the environment, preventing pollution of oceans, rivers, and landfills. Your investments directly fund cleanup efforts."
                  },
                  {
                    title: "Economic Impact",
                    description: "PlasticPay creates sustainable jobs in collection, processing, and recycling operations. Local communities benefit from fair wages, skills development, and infrastructure improvements."
                  },
                  {
                    title: "Industry Impact",
                    description: "By increasing the supply of high-quality recycled materials, we help brands meet their sustainability commitments and reduce dependence on virgin plastics, driving broader market change."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.2 }}
                  >
                    <h4 className="font-semibold text-lg mb-2 text-green-600">{item.title}</h4>
                    <p className="text-slate-600">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="py-16 bg-slate-50"
        >
          <div className="container mx-auto px-4">
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Recycling Technology</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Our advanced recycling facilities use state-of-the-art technology to process plastic waste efficiently and produce high-quality recycled materials.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                variants={fadeInUp}
                className="bg-white p-6 rounded-lg shadow-md border border-slate-100"
              >
                <h3 className="text-xl font-semibold mb-4">Collection & Sorting</h3>
                <p className="text-slate-600 mb-4">
                  We partner with local communities and waste management organizations to collect plastic waste. Advanced sorting technology separates different types of plastics for optimal processing.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 shrink-0 mt-0.5" />
                    <span>AI-powered sorting systems</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 shrink-0 mt-0.5" />
                    <span>Community collection programs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 shrink-0 mt-0.5" />
                    <span>Quality control protocols</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-white p-6 rounded-lg shadow-md border border-slate-100"
              >
                <h3 className="text-xl font-semibold mb-4">Processing & Production</h3>
                <p className="text-slate-600 mb-4">
                  Our facilities use advanced mechanical and chemical recycling processes to transform waste plastic into high-quality recycled materials ready for manufacturing.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 shrink-0 mt-0.5" />
                    <span>Mechanical recycling for common plastics</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 shrink-0 mt-0.5" />
                    <span>Chemical recycling for complex materials</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 shrink-0 mt-0.5" />
                    <span>Quality testing and certification</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default HowItWorks;
