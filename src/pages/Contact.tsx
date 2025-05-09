import React from 'react';
import Meta from '@/components/Meta';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { getCurrentUTCTimestamp } from '@/utils/dateUtils';

const Contact = () => {
  const { toast } = useToast();
  const currentTimestamp = getCurrentUTCTimestamp();
  
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
  
    try {
      const formData = new FormData(form);
      
      if (!formData.has("form-name")) {
        formData.append("form-name", "contact");
      }
      
      formData.append("timestamp", getCurrentUTCTimestamp());
      
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to submit form: ${response.status}`);
      }
      
      form.reset();
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    }
  };

 return (
    <>
      <Meta 
        title="Contact Us | PlasticPay - Get in Touch"
        description="Contact PlasticPay for questions about sustainable plastic recycling investments. Our team is here to help with your investment queries and environmental impact goals."
        keywords="contact plasticpay, sustainable investment support, recycling investment help, environmental investment contact, impact investing support"
        canonicalUrl="https://plasticpay.netlify.app/contact"
        ogTitle="Contact PlasticPay - Get Support for Your Investment Journey"
        ogDescription="Reach out to our team for assistance with your sustainable investment goals. We're here to help you make a difference through plastic recycling investment."
        ogImage="https://plasticpay.netlify.app/og-contact.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "PlasticPay Contact Page",
          "description": "Contact information and support for PlasticPay sustainable investment platform",
          "url": "https://plasticpay.netlify.app/contact",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+31-20-123-4567",
            "contactType": "customer service",
            "areaServed": "Worldwide",
            "availableLanguage": ["English", "Spanish", "French"]
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Herengracht 595",
            "addressLocality": "Amsterdam",
            "addressRegion": "NH",
            "postalCode": "1017 CE",
            "addressCountry": "NL"
          },
          "dateModified": "2025-05-07 19:24:43"
        }}
      />

      <form name="contact" netlify netlify-honeypot="bot-field" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="text" name="subject" />
        <textarea name="message"></textarea>
        <input type="hidden" name="timestamp" />
        <input type="hidden" name="user_login" />
      </form>

      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="min-h-screen"
      >
        <header className="bg-gradient-to-r from-green-50 to-blue-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Contact Us</h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Have questions about sustainable investment? Fill out the form below and our team will get back to you as soon as possible.
              </p>
            </div>
          </div>
        </header>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Send us a message</h2>
                <form 
                  name="contact"
                  method="POST"
                  netlify
                  netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <input type="hidden" name="timestamp" value={currentTimestamp} />
                  <input type="hidden" name="user_login" value="HunterTXx" />
                  <p hidden>
                    <label>
                      Don't fill this out if you're human: <input name="bot-field" />
                    </label>
                  </p>

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="What's this about?"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message..."
                      required
                      className="w-full min-h-[150px]"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </div>

              <div className="mt-8 text-center text-slate-600">
                <p>We typically respond to all inquiries within 24-48 business hours.</p>
                <p className="mt-2">
                  Business Hours: Monday - Friday, 9:00 AM - 5:00 PM EST
                </p>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default Contact;
