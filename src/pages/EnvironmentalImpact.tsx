import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Leaf, 
  Droplets, 
  Users, 
  Recycle, 
  Factory, 
  BadgeDollarSign, 
  Globe, 
  FileCheck, 
  BarChart3,
  ArrowRight,
  Calculator,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';

const EnvironmentalImpact = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Environmental Impact | PlasticPay Recycling Investments</title>
        <meta name="description" content="Discover the environmental impact of PlasticPay's plastic recycling investments. Learn how your investment removes ocean plastic, reduces carbon emissions, and supports sustainable development goals. Track real-time impact metrics and see your contribution to a cleaner planet." />
        <meta name="keywords" content="plastic recycling impact, environmental investment impact, ocean plastic removal, sustainable development goals, carbon reduction investment, plastic waste management, circular economy impact, green investment metrics" />
        <meta property="og:title" content="Environmental Impact | PlasticPay Recycling Investments" />
        <meta property="og:description" content="Discover the environmental impact of PlasticPay's plastic recycling investments. Learn how your investment removes ocean plastic, reduces carbon emissions, and supports sustainable development goals." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://plasticpay.com/environmental-impact" />
        <link rel="canonical" href="https://plasticpay.com/environmental-impact" />
        
        {/* Structured Data for Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "PlasticPay",
            "description": "A sustainable investment platform focused on plastic recycling and environmental impact.",
            "url": "https://plasticpay.com",
            "sameAs": [
              "https://twitter.com/plasticpay",
              "https://linkedin.com/company/plasticpay"
            ],
            "areaServed": ["Southeast Asia", "Latin America", "East Africa"],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Environmental Impact",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Plastic Waste Collection",
                    "description": "Collection and processing of plastic waste"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Ocean Plastic Interception",
                    "description": "Preventing plastic from reaching oceans"
                  }
                }
              ]
            }
          })}
        </script>
      </Helmet>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-100 z-50">
        <div 
          className="h-full bg-green-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header Section */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-green-50 to-blue-50 py-16"
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Environmental Impact</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Measuring the positive change your investments create for our planet and communities through transparent impact metrics and sustainable development.
            </p>
            <nav className="flex flex-wrap justify-center gap-4">
              <Link to="/calculator">
                <Button variant="outline" className="flex items-center">
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate Your Impact
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" className="flex items-center">
                  <HelpCircle className="mr-2 h-5 w-5" />
                  How It Works
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Impact Overview */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-16 bg-white"
        aria-labelledby="impact-overview-heading"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 id="impact-overview-heading" className="text-3xl font-bold text-slate-800 mb-4">Our Impact at a Glance</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Since our founding, PlasticPay investors have contributed to significant environmental and social improvements across our global operations. Learn more about our <Link to="/about" className="text-investment-green hover:underline">sustainability initiatives</Link> and <Link to="/how-it-works" className="text-investment-green hover:underline">recycling process</Link>.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          >
            {[
              {
                icon: <Recycle className="h-8 w-8 text-green-600" />,
                value: "2,541 Tons",
                label: "Plastic waste collected and processed"
              },
              {
                icon: <Droplets className="h-8 w-8 text-green-600" />,
                value: "783 Tons",
                label: "Ocean-bound plastic intercepted"
              },
              {
                icon: <Leaf className="h-8 w-8 text-green-600" />,
                value: "5,640 Tons",
                label: "CO₂ emissions prevented"
              },
              {
                icon: <Users className="h-8 w-8 text-green-600" />,
                value: "1,240+",
                label: "Jobs created in local communities"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <div className="mx-auto bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{stat.value}</h3>
                <p className="text-slate-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            className="text-center"
          >
            <p className="text-lg font-medium text-slate-800 mb-8">
              For every $100 invested, approximately 10kg of plastic waste is removed from the environment. Use our <Link to="/calculator" className="text-investment-green hover:underline">impact calculator</Link> to see your potential contribution.
            </p>
            <Link to="/calculator">
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                Calculate Your Impact <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* impact Map */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-16 bg-slate-50"
        aria-labelledby="global-impact-heading"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 id="global-impact-heading" className="text-3xl font-bold text-slate-800 mb-4">Our Global Impact</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              PlasticPay operates recycling facilities in strategic locations worldwide, focusing on regions with the greatest need for plastic waste management infrastructure. Explore our <Link to="/about" className="text-investment-green hover:underline">global operations</Link>.
            </p>
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            {/* This would be replaced by an actual interactive map component */}
            <div className="aspect-[16/9] bg-slate-200 rounded-lg flex items-center justify-center">
              <p className="text-slate-500 font-medium">Interactive impact map would be displayed here</p>
            </div>
            
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
            >
              {[
                {
                  region: "Southeast Asia",
                  stats: [
                    "4 recycling facilities operating at capacity",
                    "1,340 tons of plastic processed monthly",
                    "680+ local jobs created"
                  ]
                },
                {
                  region: "Latin America",
                  stats: [
                    "2 recycling facilities with expansion planned",
                    "620 tons of plastic processed monthly",
                    "340+ local jobs created"
                  ]
                },
                {
                  region: "East Africa",
                  stats: [
                    "1 facility operational, 1 under construction",
                    "280 tons of plastic processed monthly",
                    "220+ local jobs created"
                  ]
                }
              ].map((region, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="p-4"
                >
                  <h3 className="text-lg font-semibold mb-3">{region.region}</h3>
                  <ul className="space-y-2">
                    {region.stats.map((stat, i) => (
                      <motion.li
                        key={i}
                        variants={fadeInUp}
                        className="flex items-start"
                      >
                        <Recycle className="h-5 w-5 text-green-600 mr-2 shrink-0 mt-0.5" />
                        <span>{stat}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Recycling Process & Environmental Benefits */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Recycling Process</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              PlasticPay's comprehensive approach to plastic waste management creates environmental benefits at every stage of the process.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 relative mb-16"
          >
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-green-600 transform -translate-y-1/2"></div>
            
            {[
              {
                step: 1,
                title: "Collection",
                description: "Community collection programs employ local waste pickers with fair wages and proper equipment."
              },
              {
                step: 2,
                title: "Sorting",
                description: "Advanced sorting technology with AI vision systems maximizes material recovery rates."
              },
              {
                step: 3,
                title: "Processing",
                description: "Energy-efficient washing, shredding, and processing using renewable energy sources."
              },
              {
                step: 4,
                title: "Manufacturing",
                description: "Conversion into high-quality recycled materials for industrial partners and sustainable products."
              },
              {
                step: 5,
                title: "Distribution",
                description: "Closed-loop partnerships with brands committed to using recycled content in new products."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg shadow-md text-center z-10"
              >
                <div className="mx-auto bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold">{step.step}</span>
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Leaf className="h-6 w-6 text-green-600" />,
                title: "Environmental Benefits",
                benefits: [
                  {
                    icon: <Droplets className="h-5 w-5 text-green-600" />,
                    title: "Ocean Protection",
                    description: "Prevents plastic from entering waterways and degrading marine ecosystems"
                  },
                  {
                    icon: <Factory className="h-5 w-5 text-green-600" />,
                    title: "Emissions Reduction",
                    description: "60% lower carbon emissions compared to virgin plastic production"
                  },
                  {
                    icon: <Recycle className="h-5 w-5 text-green-600" />,
                    title: "Resource Conservation",
                    description: "Reduces demand for petroleum-based materials and conserves natural resources"
                  }
                ]
              },
              {
                icon: <Users className="h-6 w-6 text-green-600" />,
                title: "Social Benefits",
                benefits: [
                  {
                    icon: <BadgeDollarSign className="h-5 w-5 text-green-600" />,
                    title: "Economic Opportunity",
                    description: "Fair wage employment for marginalized communities previously dependent on informal waste picking"
                  },
                  {
                    icon: <Globe className="h-5 w-5 text-green-600" />,
                    title: "Health Improvements",
                    description: "Reduces plastic burning and improper disposal that cause respiratory issues and contaminate water sources"
                  },
                  {
                    icon: <Users className="h-5 w-5 text-green-600" />,
                    title: "Community Development",
                    description: "Local skills training, education programs, and infrastructure investments in collection communities"
                  }
                ]
              },
              {
                icon: <BarChart3 className="h-6 w-6 text-green-600" />,
                title: "Economic Benefits",
                benefits: [
                  {
                    icon: <Factory className="h-5 w-5 text-green-600" />,
                    title: "Circular Economy",
                    description: "Creates value from waste materials that would otherwise be an economic and environmental liability"
                  },
                  {
                    icon: <Recycle className="h-5 w-5 text-green-600" />,
                    title: "Supply Chain Resilience",
                    description: "Reduces dependence on virgin plastic and petroleum, creating more stable material supply chains"
                  },
                  {
                    icon: <BadgeDollarSign className="h-5 w-5 text-green-600" />,
                    title: "Market Development",
                    description: "Drives innovation and creates new markets for recycled materials and sustainable products"
                  }
                ]
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 rounded-full p-2 mr-4">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>
                <ul className="space-y-4">
                  {category.benefits.map((benefit, i) => (
                    <motion.li
                      key={i}
                      variants={fadeInUp}
                      className="flex items-start"
                    >
                      <div className="mr-3 shrink-0 mt-0.5">
                        {benefit.icon}
                      </div>
                      <div>
                        <strong className="block text-slate-800">{benefit.title}</strong>
                        <p className="text-slate-600">{benefit.description}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* SDG Alignment */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-16 bg-slate-50"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Supporting Sustainable Development Goals</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              PlasticPay's operations directly contribute to multiple UN Sustainable Development Goals through our integrated approach to plastic waste management.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              {
                number: "SDG 1",
                color: "#E5243B",
                title: "No Poverty",
                description: "Creating stable employment opportunities with fair wages for vulnerable communities."
              },
              {
                number: "SDG 8",
                color: "#56C02B",
                title: "Decent Work",
                description: "Providing secure working conditions and formal employment in the recycling sector."
              },
              {
                number: "SDG 9",
                color: "#FF9E1B",
                title: "Industry & Innovation",
                description: "Developing recycling infrastructure and advancing circular economy technologies."
              },
              {
                number: "SDG 11",
                color: "#FD9D24",
                title: "Sustainable Cities",
                description: "Improving urban waste management systems and reducing pollution in cities."
              },
              {
                number: "SDG 12",
                color: "#C5192D",
                title: "Responsible Consumption",
                description: "Promoting sustainable production patterns and resource efficiency through recycling."
              },
              {
                number: "SDG 13",
                color: "#1F97D4",
                title: "Climate Action",
                description: "Reducing carbon emissions through recycling compared to virgin plastic production."
              },
              {
                number: "SDG 14",
                color: "#0A97D9",
                title: "Life Below Water",
                description: "Preventing plastic pollution from entering oceans, rivers, and marine ecosystems."
              },
              {
                number: "SDG 17",
                color: "#56C02B",
                title: "Partnerships",
                description: "Building multi-stakeholder collaborations between investors, communities, and businesses."
              }
            ].map((sdg, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div 
                  className="w-16 h-16 text-white rounded-md flex items-center justify-center text-xl font-bold mx-auto mb-4"
                  style={{ backgroundColor: sdg.color }}
                >
                  {sdg.number}
                </div>
                <h3 className="text-lg font-semibold mb-2">{sdg.title}</h3>
                <p className="text-slate-600 text-sm">{sdg.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Impact Verification */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Verified Impact</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We are committed to transparency and third-party verification of our environmental and social impact claims.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <FileCheck className="h-6 w-6 text-green-600" />,
                title: "Certifications",
                items: [
                  "Ocean Bound Plastic Certification",
                  "Global Recycled Standard",
                  "ISO 14001 Environmental Management",
                  "B Corp Certification"
                ],
                note: "All facilities undergo annual certification audits by accredited third-party verification bodies."
              },
              {
                icon: <BarChart3 className="h-6 w-6 text-green-600" />,
                title: "Impact Reporting",
                items: [
                  "Quarterly impact reports for investors",
                  "Annual sustainability report",
                  "GRI Standards compliance",
                  "Carbon footprint verification"
                ],
                note: "Our reporting follows international standards for transparency and accuracy in impact measurement."
              },
              {
                icon: <Globe className="h-6 w-6 text-green-600" />,
                title: "Monitoring Systems",
                items: [
                  "Blockchain material tracking",
                  "IoT-enabled collection monitoring",
                  "Social impact assessment framework",
                  "Independent scientific advisors"
                ],
                note: "Advanced technology ensures accurate measurement and verification of all environmental metrics."
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  {category.icon}
                  <h3 className="text-xl font-semibold ml-3">{category.title}</h3>
                </div>
                <ul className="space-y-3">
                  {category.items.map((item, i) => (
                    <motion.li
                      key={i}
                      variants={fadeInUp}
                      className="flex items-center"
                    >
                      <div className="w-3 h-3 bg-green-600 rounded-full mr-3"></div>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <Separator className="my-4" />
                <p className="text-slate-600 text-sm">{category.note}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 2025 Impact Goals */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-16 bg-slate-50"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Our 2025 Impact Goals</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We're setting ambitious targets to scale our environmental and social impact over the next three years.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Environmental Goals",
                goals: [
                  {
                    name: "Plastic Processed",
                    target: "10,000 tons goal",
                    progress: 25,
                    current: "2,500 tons processed to date"
                  },
                  {
                    name: "CO₂ Emissions Avoided",
                    target: "25,000 tons goal",
                    progress: 20,
                    current: "5,000 tons CO₂ avoided to date"
                  },
                  {
                    name: "Ocean Plastic Intercepted",
                    target: "5,000 tons goal",
                    progress: 15,
                    current: "750 tons intercepted to date"
                  }
                ]
              },
              {
                title: "Social Goals",
                goals: [
                  {
                    name: "Jobs Created",
                    target: "5,000 jobs goal",
                    progress: 24,
                    current: "1,200 jobs created to date"
                  },
                  {
                    name: "Community Members Trained",
                    target: "10,000 people goal",
                    progress: 32,
                    current: "3,200 people trained to date"
                  },
                  {
                    name: "Collection Centers",
                    target: "200 centers goal",
                    progress: 18,
                    current: "36 centers established to date"
                  }
                ]
              },
              {
                title: "Operational Goals",
                goals: [
                  {
                    name: "Recycling Facilities",
                    target: "15 facilities goal",
                    progress: 40,
                    current: "6 facilities operational to date"
                  },
                  {
                    name: "Renewable Energy Use",
                    target: "100% goal",
                    progress: 45,
                    current: "45% of operations powered by renewable energy"
                  },
                  {
                    name: "Product Innovation",
                    target: "50 new products goal",
                    progress: 22,
                    current: "11 recycled material products launched"
                  }
                ]
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                
                <div className="space-y-6">
                  {category.goals.map((goal, i) => (
                    <motion.div
                      key={i}
                      variants={fadeInUp}
                    >
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{goal.name}</span>
                        <span>{goal.target}</span>
                      </div>
                      <div className="flex items-center">
                        <Progress value={goal.progress} className="h-2 flex-grow" />
                        <span className="ml-2 text-sm">{goal.progress}%</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{goal.current}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Individual Investor Impact */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-16 bg-green-600 text-white"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Your Personal Environmental Impact</h2>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Every investment with PlasticPay creates measurable environmental benefits that you can track through our investor dashboard.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                amount: "$100 Investment",
                impacts: [
                  { icon: <Recycle className="h-5 w-5" />, text: "10kg plastic waste removed" },
                  { icon: <Leaf className="h-5 w-5" />, text: "22kg CO₂ emissions avoided" },
                  { icon: <Droplets className="h-5 w-5" />, text: "3kg ocean plastic prevented" }
                ]
              },
              {
                amount: "$500 Investment",
                impacts: [
                  { icon: <Recycle className="h-5 w-5" />, text: "50kg plastic waste removed" },
                  { icon: <Leaf className="h-5 w-5" />, text: "110kg CO₂ emissions avoided" },
                  { icon: <Droplets className="h-5 w-5" />, text: "15kg ocean plastic prevented" }
                ]
              },
              {
                amount: "$1,000 Investment",
                impacts: [
                  { icon: <Recycle className="h-5 w-5" />, text: "100kg plastic waste removed" },
                  { icon: <Leaf className="h-5 w-5" />, text: "220kg CO₂ emissions avoided" },
                  { icon: <Droplets className="h-5 w-5" />, text: "30kg ocean plastic prevented" }
                ]
              },
              {
                amount: "$5,000+ Investment",
                impacts: [
                  { icon: <Recycle className="h-5 w-5" />, text: "500kg+ plastic waste removed" },
                  { icon: <Leaf className="h-5 w-5" />, text: "1,100kg+ CO₂ emissions avoided" },
                  { icon: <Droplets className="h-5 w-5" />, text: "150kg+ ocean plastic prevented" }
                ]
              }
            ].map((tier, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 p-6 rounded-lg backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold mb-2">{tier.amount}</h3>
                <ul className="space-y-2">
                  {tier.impacts.map((impact, i) => (
                    <motion.li
                      key={i}
                      variants={fadeInUp}
                      className="flex items-center"
                    >
                      <div className="mr-2">
                        {impact.icon}
                      </div>
                      <span>{impact.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            className="mt-12 text-center"
          >
            <Link to="/auth?tab=signup">
              <Button className="bg-white text-investment-green hover:bg-white/90 border border-green-100">
                Invest Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-16 bg-slate-50"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Ready to Make an Impact?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
              Join our community of impact investors and help create a cleaner, more sustainable future. Start your investment journey today.
            </p>
            <nav className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/auth?tab=signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Investing <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn More <HelpCircle className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </nav>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default EnvironmentalImpact; 
