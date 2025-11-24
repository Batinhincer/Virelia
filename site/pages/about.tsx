import { motion } from "framer-motion";
import Head from "next/head";
import Header from "@/components/Header";
import CTAButton from "@/components/CTAButton";
import CTAStrip from "@/components/CTAStrip";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://frezya.nl';

export default function AboutPage() {
  // SEO metadata
  const pageTitle = "About Us | Virelia – Premium Mediterranean Food Exporter";
  const pageDescription =
    "Learn about Virelia, your trusted B2B partner for authentic Mediterranean food products. Quality, certification, and reliable export to EU, UK, and USA markets.";
  const pageUrl = `${SITE_URL}/about`;

  return (
    <div className="min-h-screen bg-bg text-text">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={`${SITE_URL}/hero1.jpg`} />
        <meta property="og:site_name" content="Virelia" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/hero1.jpg`} />
      </Head>

      <Header />

      {/* Hero Section */}
      <section className="relative h-[500px] mt-[80px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(58, 90, 64, 0.85) 0%, rgba(45, 70, 50, 0.75) 100%), url('/hero1.jpg')`,
          }}
        />
        <div className="relative h-full flex items-center">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h1 className="text-5xl lg:text-6xl text-white font-bold mb-6 font-heading leading-tight">
                About Virelia
              </h1>
              <p className="text-white text-xl lg:text-2xl font-light leading-relaxed">
                Your trusted partner for premium Mediterranean food products
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-semibold text-text-heading mb-6">
                Who We Are
              </h2>
              <div className="space-y-6 text-lg text-text leading-relaxed">
                <p>
                  Virelia is a leading B2B exporter of authentic Mediterranean
                  food products, bringing the finest flavors from Turkey and
                  the Mediterranean region to markets across Europe, the United
                  Kingdom, and the United States.
                </p>
                <p>
                  Founded with a passion for quality and authenticity, we serve
                  as a bridge between traditional Mediterranean producers and
                  modern international markets. Our team combines deep
                  knowledge of Mediterranean food culture with expertise in
                  international trade and logistics.
                </p>
                <p>
                  We work exclusively in the B2B sector, partnering with
                  distributors, importers, restaurant chains, specialty food
                  retailers, and food service providers who value quality,
                  consistency, and reliability.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="section-padding bg-bg-surface">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-semibold text-text-heading mb-6">
                What We Do
              </h2>
              <div className="space-y-6 text-lg text-text leading-relaxed mb-12">
                <p>
                  We specialize in sourcing, exporting, and delivering premium
                  Mediterranean and Turkish food products to international
                  markets. Our comprehensive portfolio includes:
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="card p-8">
                  <h3 className="text-xl font-semibold text-text-heading mb-4">
                    Oils & Condiments
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    Premium extra virgin olive oils, pomegranate molasses, and
                    other authentic Mediterranean condiments.
                  </p>
                </div>

                <div className="card p-8">
                  <h3 className="text-xl font-semibold text-text-heading mb-4">
                    Pepper & Chili Products
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    Traditional pepper pastes, harissa, and chili-based
                    products crafted using time-honored recipes.
                  </p>
                </div>

                <div className="card p-8">
                  <h3 className="text-xl font-semibold text-text-heading mb-4">
                    Coffee Products
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    Authentic Turkish coffee and specialty coffee blends roasted
                    to perfection.
                  </p>
                </div>

                <div className="card p-8">
                  <h3 className="text-xl font-semibold text-text-heading mb-4">
                    Sauces & Specialties
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    Ready-to-use sauces, Asian specialties, and preserved
                    vegetables for diverse culinary applications.
                  </p>
                </div>
              </div>

              <div className="space-y-6 text-lg text-text leading-relaxed">
                <p>
                  Each product in our portfolio is carefully selected and
                  sourced from trusted producers who share our commitment to
                  quality, authenticity, and food safety standards.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Export Markets Focus */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-semibold text-text-heading mb-6">
                Export Markets Focus
              </h2>
              <div className="space-y-6 text-lg text-text leading-relaxed mb-12">
                <p>
                  With extensive experience in international trade, we have
                  established ourselves as a reliable partner for markets
                  across three major regions:
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="card p-8 text-center"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-text-heading mb-3">
                    European Union
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    Full EU compliance with all necessary certifications for
                    seamless import across member states.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="card p-8 text-center"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-text-heading mb-3">
                    United Kingdom
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    Post-Brexit compliant with UK import standards and
                    documentation requirements.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="card p-8 text-center"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-text-heading mb-3">
                    United States
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    FDA compliant products meeting all US import regulations
                    and food safety standards.
                  </p>
                </motion.div>
              </div>

              <div className="space-y-6 text-lg text-text leading-relaxed">
                <p>
                  Our expertise in customs procedures, documentation, and
                  logistics ensures smooth delivery to your location, whether
                  you're ordering a single container or establishing a
                  long-term supply partnership.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-h2 font-semibold mb-6">Our Quality Promise</h2>
              <div className="space-y-6 text-lg leading-relaxed mb-12">
                <p>
                  At Virelia, quality is not negotiable. Every product we
                  export undergoes rigorous quality control and meets
                  international food safety standards.
                </p>
                <p>
                  We maintain full traceability from source to delivery,
                  ensuring complete transparency and accountability at every
                  step of the supply chain. Our commitment to quality extends
                  beyond the product itself to encompass packaging, labeling,
                  storage, and transportation.
                </p>
                <p>
                  We hold all necessary certifications for international export
                  and work exclusively with certified producers and facilities.
                  This commitment to excellence has earned us the trust of
                  partners across three continents.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-6 mt-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-3xl font-bold mb-2">100%</div>
                  <p className="text-white/90">Quality Guaranteed</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-3xl font-bold mb-2">Full</div>
                  <p className="text-white/90">Traceability</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-3xl font-bold mb-2">ISO</div>
                  <p className="text-white/90">Certified Partners</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-3xl font-bold mb-2">24h</div>
                  <p className="text-white/90">Response Time</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h3 className="text-3xl lg:text-4xl font-bold text-text-heading mb-6">
              Ready to Partner with Us?
            </h3>
            <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
              Let's discuss how Virelia can become your trusted supplier of
              premium Mediterranean products.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CTAButton href="/#contact">Request a Quote</CTAButton>
              <CTAButton href="/logistics" variant="secondary">
                Export & Logistics
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Strip */}
      <CTAStrip />

      {/* Footer */}
      <footer className="bg-text-heading text-bg py-12">
        <div className="container-custom text-center">
          <p className="mb-3 text-lg">
            &copy; {new Date().getFullYear()} Virelia Ticaret Limited Şirketi.
            All rights reserved.
          </p>
          <p className="text-sm text-text-muted">
            Premium Mediterranean Food Products | B2B Export Solutions
          </p>
        </div>
      </footer>
    </div>
  );
}
