import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Meta from '@/components/Meta';
import { getCurrentUTCTimestamp } from '@/utils/dateUtils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  HomeIcon,
  Recycle,
  BarChart3,
  Calculator,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Leaf,
  PiggyBank,
  ShieldCheck,
  Rocket,
  Handshake
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();
  const currentTimestamp = getCurrentUTCTimestamp();
  
  return (
    <main className="min-h-screen bg-white">
      <Meta 
        title="PlasticPay - Sustainable Plastic Recycling Investment Platform"
        description="Transform plastic waste into profitable investments with PlasticPay. Join our sustainable investment platform that delivers real returns while cleaning our oceans and reducing plastic pollution."
        keywords="plastic recycling investment, sustainable investing, plastic waste management, environmental investment, recycling returns, plastic pollution solution, green investment platform, circular economy investment"
        canonicalUrl="https://plasticpay.netlify.app"
        ogTitle="PlasticPay - Sustainable Plastic Recycling Investment Platform"
        ogDescription="Transform plastic waste into profitable investments with PlasticPay. Join our sustainable investment platform that delivers real returns while cleaning our oceans and reducing plastic pollution."
        ogImage="https://plasticpay.netlify.app/og-image.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "PlasticPay",
          "url": "https://plasticpay.netlify.app",
          "description": "Turn plastic waste into cash rewards with PlasticPay. Join our sustainable fintech platform to earn money while saving the planet.",
          "dateModified": currentTimestamp,
          "publisher": {
            "@type": "Organization",
            "name": "PlasticPay",
            "logo": {
              "@type": "ImageObject",
              "url": "https://plasticpay.netlify.app/logo.png"
            }
          },
          "offers": {
            "@type": "AggregateOffer",
            "description": "Sustainable investment opportunities in plastic recycling",
            "priceCurrency": "USD",
            "lowPrice": "50",
            "highPrice": "10000",
            "offerCount": "3"
          }
        }}
      />
      <section className="container mx-auto px-4 py-16 md:py-24" aria-labelledby="hero-heading">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 id="hero-heading" className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Transform Plastic Waste Into <span className="text-investment-green">Profitable Investment</span>
            </h1>
            <p className="text-lg text-slate-600 mb-6">
              Join PlasticPay's revolutionary platform where recycling plastic waste becomes a sustainable investment opportunity with real returns. Our innovative approach connects environmentally conscious investors with high-impact recycling projects.
            </p>
            <p className="text-lg text-slate-600 mb-8">
              With as little as $50, you can start earning monthly dividends while contributing to ocean cleanup, waste reduction, and circular economy solutions. PlasticPay makes sustainable investing accessible and profitable.
            </p>
            <nav className="flex flex-col sm:flex-row gap-4">
             <Link to={user ? "/dashboard" : "/auth?tab=signup"}>
               <Button size="lg" className="w-full sm:w-auto">
                 {user ? "Go to Dashboard" : "Start Investing Today"} <ArrowRight className="ml-2 h-5 w-5" />
               </Button>
             </Link>
              <Link to="/calculator">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Calculate Returns <Calculator className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </nav>
          </div>
          <figure className="rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Plastic recycling process showing waste transformation into valuable resources" 
              className="w-full h-auto"
              loading="eager"
            />
          </figure>
        </div>
      </section>
      <section className="py-16 bg-slate-50" aria-labelledby="why-invest-heading">
        <div className="container mx-auto px-4">
          <header className="text-center mb-12">
            <h2 id="why-invest-heading" className="text-3xl font-bold text-slate-800 mb-4">Why Invest in Sustainable Plastic Recycling?</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Plastic waste is a global crisis - and a tremendous investment opportunity. PlasticPay transforms this environmental challenge into a sustainable revenue stream with tangible benefits.
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <article className="border border-slate-200 hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-green-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <PiggyBank className="h-6 w-6 text-investment-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Stable Returns</h3>
                <p className="text-slate-600">
                  Our recycling operations deliver consistent 8-12% returns per 2 cycles (1 month), outperforming traditional savings accounts and many stock investments.
                </p>
              </CardContent>
            </article>
            <article className="border border-slate-200 hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-green-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-investment-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Low Risk Profile</h3>
                <p className="text-slate-600">
                  Backed by physical recycling facilities and equipment with established market demand for recycled plastic materials.
                </p>
              </CardContent>
            </article>
            <article className="border border-slate-200 hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-green-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Rocket className="h-6 w-6 text-investment-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Growth Market</h3>
                <p className="text-slate-600">
                  The global plastic recycling market is projected to grow at 8% annually through 2030, with increasing regulatory support worldwide.
                </p>
              </CardContent>
            </article>
            <article className="border border-slate-200 hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-green-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Handshake className="h-6 w-6 text-investment-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Social Impact</h3>
                <p className="text-slate-600">
                  Your investment creates jobs in collection and processing, supports local communities, and addresses a critical environmental challenge.
                </p>
              </CardContent>
            </article>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white" aria-labelledby="how-it-works-heading">
        <div className="container mx-auto px-4">
          <header className="text-center mb-12">
            <h2 id="how-it-works-heading" className="text-3xl font-bold text-slate-800 mb-4">How PlasticPay Transforms Waste into Wealth</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our innovative platform connects investors with plastic recycling projects through a simple, transparent process designed to generate sustainable profits and environmental impact.
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="border border-slate-200 hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-green-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-investment-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Invest</h3>
                <p className="text-slate-600">
                  Start with as little as $50 and contribute to funding plastic waste collection and recycling initiatives. Choose from multiple investment packages tailored to your goals.
                </p>
                <ul className="mt-4 space-y-2 text-slate-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-investment-green mr-2 shrink-0 mt-0.5" />
                    <span>Flexible investment options starting from $50</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-investment-green mr-2 shrink-0 mt-0.5" />
                    <span>Secure payment processing and account management</span>
                  </li>
                </ul>
              </CardContent>
            </article>
            <article className="border border-slate-200 hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-green-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Recycle className="h-6 w-6 text-investment-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Impact</h3>
                <p className="text-slate-600">
                  Your investment directly supports plastic waste collection, processing facilities, and recycling technology. We focus on high-impact areas where plastic pollution is most severe.
                </p>
                <ul className="mt-4 space-y-2 text-slate-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-investment-green mr-2 shrink-0 mt-0.5" />
                    <span>Transparent tracking of environmental metrics</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-investment-green mr-2 shrink-0 mt-0.5" />
                    <span>Regular updates on project developments</span>
                  </li>
                </ul>
              </CardContent>
            </article>
            <article className="border border-slate-200 hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-green-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-investment-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Returns</h3>
                <p className="text-slate-600">
                  Earn monthly dividends based on recycling profits and see your investment grow with the expanding market. Our investor dashboard provides real-time tracking of your earnings and impact.
                </p>
                <ul className="mt-4 space-y-2 text-slate-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-investment-green mr-2 shrink-0 mt-0.5" />
                    <span>8-12% returns per 2 cycles (1 month)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-investment-green mr-2 shrink-0 mt-0.5" />
                    <span>Option to reinvest for compound growth</span>
                  </li>
                </ul>
              </CardContent>
            </article>
          </div>
        </div>
      </section>
      <section className="py-16 bg-slate-50" aria-labelledby="value-chain-heading">
        <div className="container mx-auto px-4">
          <header className="text-center mb-12">
            <h2 id="value-chain-heading" className="text-3xl font-bold text-slate-800 mb-4">Sustainable Plastic Recycling: Our Value Chain</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              PlasticPay transforms waste plastic into valuable resources through a comprehensive recycling process that creates revenue at multiple stages.
            </p>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-investment-green -z-10 transform -translate-y-1/2"></div>
            <article className="text-center p-6">
              <div className="mx-auto bg-investment-green text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Collection</h3>
              <p className="text-sm">Sourcing plastic waste from beaches, rivers, and urban centers</p>
            </article>
            <article className="text-center p-6">
              <div className="mx-auto bg-investment-green text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Sorting</h3>
              <p className="text-sm">Separating different types of plastics for optimal processing</p>
            </article>
            <article className="text-center p-6">
              <div className="mx-auto bg-investment-green text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Processing</h3>
              <p className="text-sm">Cleaning, shredding and preparing materials for recycling</p>
            </article>
            <article className="text-center p-6">
              <div className="mx-auto bg-investment-green text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="font-bold">4</span>
              </div>
              <h3 className="font-semibold mb-2">Manufacturing</h3>
              <p className="text-sm">Converting processed plastic into new products or raw materials</p>
            </article>
            <article className="text-center p-6">
              <div className="mx-auto bg-investment-green text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="font-bold">5</span>
              </div>
              <h3 className="font-semibold mb-2">Distribution</h3>
              <p className="text-sm">Selling recycled materials to companies for sustainable products</p>
            </article>
          </div>
          <div className="mt-12 text-center">
            <p className="text-lg font-medium text-investment-green mb-6">
              Your investment powers this entire process, generating returns from each stage
            </p>
            <Link to="/calculator">
              <Button variant="outline" className="border-investment-green text-investment-green hover:bg-green-50">
                See How Returns Are Generated <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white" aria-labelledby="benefits-heading">
        <div className="container mx-auto px-4">
          <header className="text-center mb-12">
            <h2 id="benefits-heading" className="text-3xl font-bold text-slate-800 mb-4"> Benefits of Sustainable Plastic Investment</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Sustainable investing that generates both environmental impact and financial returns, with a streamlined investor experience designed for transparency and growth.
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <article className="flex items-start">
              <div className="mr-4 mt-1">
                <CheckCircle className="h-6 w-6 text-investment-green" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Monthly Dividends</h3>
                <p className="text-slate-600">
                  Receive monthly returns based on the performance of recycling operations across our network. Standard packages offer 8-12% returns per 2 cycles (1 month), while premium packages can yield even higher returns.
                </p>
              </div>
            </article>
            <article className="flex items-start">
              <div className="mr-4 mt-1">
                <CheckCircle className="h-6 w-6 text-investment-green" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Portfolio Tracking</h3>
                <p className="text-slate-600">
                  Monitor your investments and environmental impact through our intuitive dashboard. Track plastic waste removed, carbon emissions avoided, and see how your investments grow over time.
                </p>
              </div>
            </article>
            <article className="flex items-start">
              <div className="mr-4 mt-1">
                <CheckCircle className="h-6 w-6 text-investment-green" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Referral Program</h3>
                <p className="text-slate-600">
                  Earn additional income by referring new investors to the platform through our multi-tier commission structure. Our referral program offers up to 5% commission on investments made by your referrals.
                </p>
              </div>
            </article>
            <article className="flex items-start">
              <div className="mr-4 mt-1">
                <CheckCircle className="h-6 w-6 text-investment-green" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Facility Ownership</h3>
                <p className="text-slate-600">
                  Unlock opportunities to own shares in recycling facilities with higher investment tiers. Premium investors receive ownership stakes in physical facilities, providing both dividend and appreciation potential.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="py-16 bg-slate-50" aria-labelledby="calculator-heading">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 id="calculator-heading" className="text-3xl font-bold text-slate-800 mb-4">Calculate Your Investment Returns</h2>
              <p className="text-lg text-slate-600 mb-6">
                Use our investment calculator to see how your funds can grow through our sustainable recycling projects. Input your initial investment, monthly contribution, and timeline to visualize your potential returns.
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start">
                  <Leaf className="h-5 w-5 text-investment-green mr-3 mt-1" />
                  <span>$100 investment removes approximately 10kg of plastic waste from the environment</span>
                </li>
                <li className="flex items-start">
                  <Leaf className="h-5 w-5 text-investment-green mr-3 mt-1" />
                  <span>Standard returns: 8-12% per 2 cycles (1 month) depending on facility performance</span>
                </li>
                <li className="flex items-start">
                  <Leaf className="h-5 w-5 text-investment-green mr-3 mt-1" />
                  <span>Premium tier: Up to 12% returns per 2 cycles with facility shares and revenue participation</span>
                </li>
                <li className="flex items-start">
                  <Leaf className="h-5 w-5 text-investment-green mr-3 mt-1" />
                  <span>Compound your returns for exponential growth by reinvesting dividends automatically</span>
                </li>
              </ul>
              <nav>
                <Link to="/calculator">
                  <Button>Try the Calculator <ArrowRight className="ml-2 h-5 w-5" /></Button>
                </Link>
              </nav>
            </div>
            <figure className="rounded-lg overflow-hidden border border-slate-200 shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1695533811168-7653f4921161?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Investment calculator showing potential returns on plastic recycling investments" 
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          </div>
        </div>
      </section>
      <section className="py-16 bg-slate-50" aria-labelledby="testimonials-heading">
        <div className="container mx-auto px-4">
          <header className="text-center mb-12">
            <h2 id="testimonials-heading" className="text-3xl font-bold text-slate-800 mb-4">What Our Investors Say</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Join thousands of satisfied investors who are earning returns while making a difference
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4" aria-label="5 out of 5 stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-slate-600 italic mb-4">
                "I've been investing with PlasticPay for 18 months now and have received consistent 10% returns per 2 cycles. The environmental impact reports make me feel connected to the positive change."
              </blockquote>
              <footer>
                <p className="font-semibold">Sophia K.</p>
                <p className="text-sm text-slate-500">Premium Investor</p>
              </footer>
            </article>
            <article className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4" aria-label="5 out of 5 stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-slate-600 italic mb-4">
                "Starting with just $100, I've grown my investment to over $3,000 in two years through monthly reinvestment. The referral program has added another income stream that pays for my monthly contributions."
              </blockquote>
              <footer>
                <p className="font-semibold">Marcus T.</p>
                <p className="text-sm text-slate-500">Standard Investor</p>
              </footer>
            </article>
            <article className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4" aria-label="5 out of 5 stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-slate-600 italic mb-4">
                "As an institutional investor, we appreciate PlasticPay's transparency and professional operations. Our facility ownership stake has delivered above-projected returns while aligning with our ESG mandate."
              </blockquote>
              <footer>
                <p className="font-semibold">Green Future Fund</p>
                <p className="text-sm text-slate-500">Institutional Partner</p>
              </footer>
            </article>
          </div>
        </div>
      </section>
      <section className="bg-investment-green py-16" aria-labelledby="cta-heading">
        <div className="container mx-auto px-4 text-center">
          <h2 id="cta-heading" className="text-3xl font-bold text-white mb-4">Start Your Sustainable Investment Journey Today</h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of investors already making a difference while earning consistent returns. Create your free account in less than 2 minutes.
          </p>
          <nav className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to={user ? "/dashboard" : "/auth?tab=signup"}>
              <Button size="lg" variant="outline" className="bg-white text-investment-green hover:bg-slate-100 w-full sm:w-auto">
                {user ? "Go to Dashboard" : "Create Your Account"} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/calculator">
              <Button size="lg" className="bg-transparent border border-white text-white hover:bg-white/10 w-full sm:w-auto">
                Try Investment Calculator
              </Button>
            </Link>
          </nav>
        </div>
      </section>
    </main>
  );
};

export default Home;
