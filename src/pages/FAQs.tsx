import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Meta from '@/components/Meta';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCurrentUTCTimestamp } from '@/utils/dateUtils';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSection {
  id: string;
  title: string;
  description: string;
  faqs: FAQ[];
}

const FAQs = () => {
  const [activeSection, setActiveSection] = useState<string | null>('investment');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());
  const currentTimestamp = getCurrentUTCTimestamp();

  const faqSections: FAQSection[] = [
    {
      id: 'investment',
      title: 'Investment Process',
      description: 'Learn about how our investment platform works and what to expect',
      faqs: [
        {
          question: 'What is the minimum investment amount?',
          answer: 'You can start investing with PlasticPay from as little as $50. This low entry point makes sustainable investing accessible to everyone while still contributing meaningfully to plastic recycling efforts.'
        },
        {
          question: 'How are returns generated and distributed?',
          answer: 'Returns are generated through our plastic recycling operations and are distributed every 2 cycles (1 month). Standard investments earn 8-12% per period, while premium packages can yield higher returns. Earnings are automatically credited to your PlasticPay account.'
        },
        {
          question: 'Can I withdraw my investment at any time?',
          answer: 'Standard investments can be withdrawn with a 30-day notice period. Premium investments require a minimum 12-month commitment, after which withdrawals need 60-day notice. Emergency withdrawals may be possible subject to terms and conditions.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept various payment methods including bank transfers, credit/debit cards, and select cryptocurrency payments. All transactions are processed securely through our regulated payment partners.'
        }
      ]
    },
    {
      id: 'safety',
      title: 'Safety & Security',
      description: 'Understanding how your investment is protected',
      faqs: [
        {
          question: 'How safe is my investment?',
          answer: 'Your investment is backed by physical recycling facilities and equipment. We implement strict risk management practices, maintain regulatory compliance, and have insurance coverage for operational risks.'
        },
        {
          question: 'Is PlasticPay regulated?',
          answer: 'Yes, PlasticPay operates under relevant financial and environmental regulations. We maintain all necessary licenses and comply with international standards for investment platforms and recycling operations.'
        },
        {
          question: 'What happens if a recycling facility fails?',
          answer: 'Your investment is distributed across multiple facilities to minimize risk. Additionally, our facilities are insured, and we maintain reserve funds to protect investor interests in unexpected situations.'
        },
        {
          question: 'How do you protect my personal data?',
          answer: 'We employ bank-grade security measures to protect your data, including encryption and secure servers. We comply with GDPR and other relevant data protection regulations.'
        }
      ]
    },
    {
      id: 'environmental',
      title: 'Environmental Impact',
      description: 'Discover how your investment helps the environment',
      faqs: [
        {
          question: 'How much plastic waste does my investment remove?',
          answer: 'On average, every $100 invested helps remove approximately 10kg of plastic waste from the environment. The exact amount varies based on the types of plastic and processing methods used.'
        },
        {
          question: 'How do you verify environmental impact?',
          answer: 'We use blockchain technology and third-party auditors to track and verify our environmental impact. Regular reports are provided to investors, and our metrics are independently verified.'
        },
        {
          question: 'What types of plastic do you recycle?',
          answer: 'Our facilities process various plastic types including PET, HDPE, LDPE, and PP. We focus on both post-consumer and post-industrial plastic waste, with special emphasis on ocean-bound plastics.'
        },
        {
          question: 'Where are your recycling facilities located?',
          answer: 'We operate facilities in strategic locations across Southeast Asia and Africa, focusing on areas with high plastic pollution levels and good infrastructure for recycling operations.'
        }
      ]
    }
  ];

  const toggleQuestion = (question: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(question)) {
      newExpanded.delete(question);
    } else {
      newExpanded.add(question);
    }
    setExpandedQuestions(newExpanded);
  };

  const isQuestionExpanded = (question: string) => expandedQuestions.has(question);

  return (
    <>
      <Meta 
        title="FAQs | PlasticPay - Common Questions About Plastic Recycling Investment"
        description="Find answers to common questions about investing with PlasticPay, including how returns are generated, investment safety, withdrawal terms, and environmental impact."
        keywords="plastic recycling investment faq, sustainable investment questions, impact investing questions, recycling dividends, environmental investing faq"
        canonicalUrl="https://plasticpay.netlify.app/faqs"
        ogTitle="PlasticPay FAQs - Your Questions Answered"
        ogDescription="Get detailed answers about plastic recycling investment with PlasticPay. Learn about returns, safety measures, and environmental impact."
        ogImage="https://plasticpay.netlify.app/og-faq.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqSections.flatMap(section => 
            section.faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          ),
          "dateModified": "2025-05-07 19:01:05"
        }}
      />

      <header className="bg-gradient-to-r from-green-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-slate-600">
              Find answers to common questions about investing in plastic recycling with PlasticPay
            </p>
          </div>
        </div>
      </header>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="flex flex-wrap gap-4 justify-center mb-12">
              {faqSections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "outline"}
                  onClick={() => setActiveSection(section.id)}
                  className={activeSection === section.id ? "bg-investment-green hover:bg-investment-green/90" : ""}
                >
                  {section.title}
                </Button>
              ))}
            </nav>

            <AnimatePresence mode="wait">
              {faqSections.map((section) => (
                section.id === activeSection && (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center mb-12">
                      <h2 className="text-3xl font-bold text-slate-800 mb-4">{section.title}</h2>
                      <p className="text-lg text-slate-600 max-w-3xl mx-auto">{section.description}</p>
                      {section.id === 'investment' && (
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                          Use our <Link to="/calculator" className="text-investment-green hover:underline">investment calculator</Link> to estimate your potential returns.
                        </p>
                      )}
                      {section.id === 'safety' && (
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                          Read about our <Link to="/about" className="text-investment-green hover:underline">security measures</Link> and risk management practices.
                        </p>
                      )}
                      {section.id === 'environmental' && (
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                          Discover our <Link to="/environmental-impact" className="text-investment-green hover:underline">detailed impact metrics</Link> and <Link to="/about" className="text-investment-green hover:underline">sustainability initiatives</Link>.
                        </p>
                      )}
                    </div>

                    <div className="space-y-4">
                      {section.faqs.map((faq, index) => (
                        <div
                          key={index}
                          className="border border-slate-200 rounded-lg overflow-hidden"
                        >
                          <button
                            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50"
                            onClick={() => toggleQuestion(faq.question)}
                          >
                            <span className="font-semibold text-slate-800">{faq.question}</span>
                            <ChevronDown 
                              className={`h-5 w-5 text-slate-400 transition-transform ${
                                isQuestionExpanded(faq.question) ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          <AnimatePresence>
                            {isQuestionExpanded(faq.question) && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-6 py-4 bg-slate-50">
                                  <p className="text-slate-600">{faq.answer}</p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="py-16 bg-investment-green">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Contact our support team for personalized assistance with your investment journey.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="bg-white text-investment-green hover:bg-slate-100">
              Contact Support <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default FAQs;
