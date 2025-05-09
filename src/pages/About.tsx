import React from 'react';
import { Link } from 'react-router-dom';
import Meta from '@/components/Meta';
import { motion } from 'framer-motion';
import { getCurrentUTCTimestamp } from '@/utils/dateUtils';
import { Users, Target, Award, Heart, ArrowRight, Globe, Recycle, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const currentTimestamp = getCurrentUTCTimestamp();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <>
      <Meta 
        title="About Us | PlasticPay - Sustainable Plastic Recycling Investment"
        description="Learn about PlasticPay's mission to revolutionize plastic recycling through sustainable investment. Discover our team, values, and commitment to creating a circular economy."
        keywords="plasticpay team, sustainable investment company, plastic recycling mission, environmental finance team, circular economy leaders, green investment experts"
        canonicalUrl="https://plasticpay.netlify.app/about"
        ogTitle="About PlasticPay - Leading Sustainable Plastic Recycling Investment"
        ogDescription="Discover how PlasticPay is revolutionizing plastic recycling through innovative sustainable investment solutions. Meet our team and learn about our mission."
        ogImage="https://plasticpay.netlify.app/about-banner.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About PlasticPay",
          "description": "Learn about our mission, team, and commitment to sustainable plastic recycling investment",
          "dateModified": currentTimestamp,
          "mainEntity": {
            "@type": "Organization",
            "name": "PlasticPay",
            "description": "A sustainable investment platform focused on plastic recycling and environmental impact.",
            "url": "https://plasticpay.netlify.app",
            "logo": "https://plasticpay.netlify.app/logo.png",
            "foundingDate": "2024",
            "founder": {
              "@type": "Person",
              "name": "Nathan Moris"
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Herengracht 595",
              "addressLocality": "Amsterdam",
              "addressRegion": "NH",
              "postalCode": "1017 CE",
              "addressCountry": "NL"
            },
            "sameAs": [
              "https://twitter.com/plasticpay",
              "https://linkedin.com/company/plasticpay",
              "https://instagram.com/plasticpay"
            ]
          }
        }}
      />

      <header className="bg-gradient-to-r from-green-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-slate-800 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Transforming Plastic Waste Into <span className="text-investment-green">Sustainable Value</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-slate-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              We're on a mission to revolutionize plastic recycling through sustainable investment and community-driven environmental action.
            </motion.p>
            <nav className="flex flex-wrap justify-center gap-4">
              <Link to="/how-it-works">
                <Button variant="outline" className="flex items-center">
                  <Recycle className="mr-2 h-5 w-5" />
                  How It Works
                </Button>
              </Link>
              <Link to="/environmental-impact">
                <Button variant="outline" className="flex items-center">
                  <Globe className="mr-2 h-5 w-5" />
                  Our Impact
                </Button>
              </Link>
              <Link to="/calculator">
                <Button variant="outline" className="flex items-center">
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate Impact
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <section className="py-16" aria-labelledby="mission-heading">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 id="mission-heading" className="text-3xl font-bold text-slate-800 mb-6">Our Mission</h2>
              <p className="text-lg text-slate-600 mb-6">
                At PlasticPay, we're committed to creating a sustainable future by transforming plastic waste into valuable resources. 
                Our innovative investment platform connects environmentally conscious investors with recycling initiatives, 
                creating a circular economy that benefits both the planet and our investors.
              </p>
              <p className="text-lg text-slate-600 mb-8">
                We believe that financial growth and environmental responsibility can go hand in hand, 
                and we're dedicated to proving this through our transparent, impact-driven approach.
              </p>
              <Link to="/how-it-works">
                <Button className="flex items-center">
                  Learn More About Our Process <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <figure className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Plastic recycling facility showing automated sorting processes" 
                className="w-full h-auto"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50" aria-labelledby="values-heading">
        <div className="container mx-auto px-4">
          <header className="text-center mb-12">
            <h2 id="values-heading" className="text-3xl font-bold text-slate-800 mb-4">Our Core Values</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              These principles guide every decision we make and shape how we deliver value to our investors and the environment.
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.article 
              className="text-center"
              {...fadeInUp}
            >
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
                <div className="w-16 h-16 rounded-full bg-investment-green/10 mx-auto mb-4 flex items-center justify-center">
                  <Target className="h-8 w-8 text-investment-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Transparency</h3>
                <p className="text-slate-600">
                  We believe in complete openness about our operations, investments, and impact. Every transaction and environmental metric is tracked and shared with our investors.
                </p>
              </div>
            </motion.article>
            <motion.article 
              className="text-center"
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
                <div className="w-16 h-16 rounded-full bg-investment-green/10 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-investment-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                <p className="text-slate-600">
                  Environmental responsibility is at the core of everything we do. We're committed to creating lasting positive impact through our recycling operations.
                </p>
              </div>
            </motion.article>
            <motion.article 
              className="text-center"
              {...fadeInUp}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
                <div className="w-16 h-16 rounded-full bg-investment-green/10 mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-8 w-8 text-investment-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-slate-600">
                  We constantly seek new ways to improve recycling efficiency and maximize returns for our investors through technological advancement.
                </p>
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" aria-labelledby="team-heading">
        <div className="container mx-auto px-4">
          <header className="text-center mb-12">
            <h2 id="team-heading" className="text-3xl font-bold text-slate-800 mb-4">Our Team</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Meet the experts behind PlasticPay who are dedicated to revolutionizing plastic recycling investment
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="w-24 h-24 rounded-full bg-investment-green/10 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-12 w-12 text-investment-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Leadership Team</h3>
              <p className="text-slate-600">Experienced professionals with a shared vision for sustainable investment. Learn about our <Link to="/how-it-works" className="text-investment-green hover:underline">investment process</Link>.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="w-24 h-24 rounded-full bg-investment-green/10 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-12 w-12 text-investment-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Environmental Experts</h3>
              <p className="text-slate-600">Specialists in recycling technology and environmental impact assessment. See our <Link to="/environmental-impact" className="text-investment-green hover:underline">impact metrics</Link>.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="w-24 h-24 rounded-full bg-investment-green/10 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-12 w-12 text-investment-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Investment Team</h3>
              <p className="text-slate-600">Financial experts focused on sustainable and profitable investment opportunities. Check our <Link to="/calculator" className="text-investment-green hover:underline">return calculator</Link>.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-investment-green" aria-labelledby="join-heading">
        <div className="container mx-auto px-4 text-center">
          <h2 id="join-heading" className="text-3xl font-bold text-white mb-4">Join Us in Creating a Sustainable Future</h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Be part of the solution to plastic pollution while growing your wealth sustainably.
          </p>
          <Link to="/auth?tab=signup">
            <Button size="lg" variant="outline" className="bg-white text-investment-green hover:bg-slate-100">
              Start Investing Today <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default About;
