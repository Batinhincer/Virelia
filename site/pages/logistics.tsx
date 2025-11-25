import { motion } from "framer-motion";
import Head from "next/head";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Header from "@/components/Header";
import CTAButton from "@/components/CTAButton";
import CTAStrip from "@/components/CTAStrip";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { fetchPageByType, type SanityPage } from "@/lib/sanity";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://frezya.nl';

// Default fallback content
const defaultContent = {
  heroTitle: "Export & Logistics",
  heroSubtitle: "Reliable supply chain solutions for global markets",
  seoTitle: "Export & Logistics | Virelia – Mediterranean Food Exporter",
  seoDescription: "Discover Virelia's comprehensive export and logistics solutions. We support EXW, FOB, CIF delivery with full container and pallet options for EU, UK, and USA markets.",
};

interface LogisticsPageProps {
  page: SanityPage | null;
}

export const getStaticProps: GetStaticProps<LogisticsPageProps> = async () => {
  const page = await fetchPageByType('logistics');
  
  return {
    props: {
      page,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
};

export default function LogisticsPage({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
  // Use Sanity content if available, otherwise fall back to defaults
  const heroTitle = page?.heroTitle || defaultContent.heroTitle;
  const heroSubtitle = page?.heroSubtitle || defaultContent.heroSubtitle;
  const pageTitle = page?.seoTitle || defaultContent.seoTitle;
  const pageDescription = page?.seoDescription || defaultContent.seoDescription;
  const pageUrl = `${SITE_URL}/logistics`;

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
      <PageHero title={heroTitle} subtitle={heroSubtitle} />

      {/* Export-Ready Supply Chain */}
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
                Export-Ready Supply Chain
              </h2>
              <div className="space-y-6 text-lg text-text leading-relaxed">
                <p>
                  Virelia operates a comprehensive export-ready supply chain
                  designed specifically for international B2B food trade. From
                  sourcing to final delivery, every step is optimized for
                  efficiency, compliance, and product integrity.
                </p>
                <p>
                  Our logistics infrastructure includes temperature-controlled
                  warehousing, modern packaging facilities, and partnerships
                  with trusted international freight forwarders. We ensure your
                  products arrive in perfect condition, on time, every time.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div className="card p-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-text-heading mb-4">
                    Documentation Excellence
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    Complete export documentation including commercial
                    invoices, packing lists, certificates of origin, and health
                    certificates prepared by our experienced team.
                  </p>
                </div>

                <div className="card p-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
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
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-text-heading mb-4">
                    Quality Packaging
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    Export-grade packaging designed to protect product
                    integrity during international shipping. Custom labeling
                    available to meet market-specific requirements.
                  </p>
                </div>

                <div className="card p-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-text-heading mb-4">
                    On-Time Delivery
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    Reliable scheduling and shipment tracking. Our average
                    on-time delivery rate exceeds 95% across all export
                    markets.
                  </p>
                </div>

                <div className="card p-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
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
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-text-heading mb-4">
                    Customs Support
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    Expert guidance on customs clearance procedures for your
                    target market. We help ensure smooth passage through
                    international borders.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Incoterms Supported */}
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
                Incoterms Supported
              </h2>
              <div className="space-y-6 text-lg text-text leading-relaxed mb-12">
                <p>
                  We offer flexible delivery terms to match your business needs
                  and logistics preferences. Our team has extensive experience
                  with all major Incoterms for international trade.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="card p-8 text-center">
                  <div className="text-4xl font-bold text-primary mb-4">EXW</div>
                  <h3 className="text-xl font-semibold text-text-heading mb-3">
                    Ex Works
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    Collect products from our warehouse in Turkey. You handle
                    all export formalities and transportation.
                  </p>
                </div>

                <div className="card p-8 text-center">
                  <div className="text-4xl font-bold text-primary mb-4">FOB</div>
                  <h3 className="text-xl font-semibold text-text-heading mb-3">
                    Free on Board
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    We deliver to the port and handle export clearance. You
                    arrange international shipping and import.
                  </p>
                </div>

                <div className="card p-8 text-center">
                  <div className="text-4xl font-bold text-primary mb-4">CIF</div>
                  <h3 className="text-xl font-semibold text-text-heading mb-3">
                    Cost, Insurance & Freight
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    Complete door-to-port service. We handle shipping and
                    insurance to your destination port.
                  </p>
                </div>
              </div>

              <div className="mt-12 p-8 bg-secondary-light rounded-2xl">
                <p className="text-text leading-relaxed">
                  <strong className="text-text-heading">Note:</strong> We also
                  support DDP (Delivered Duty Paid) for select markets.
                  Contact our sales team to discuss the best delivery terms for
                  your specific requirements.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Container & Pallet Options */}
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
                Container & Pallet Options
              </h2>
              <div className="space-y-6 text-lg text-text leading-relaxed mb-12">
                <p>
                  We offer flexible shipping quantities to accommodate
                  businesses of all sizes, from single pallets for smaller
                  orders to full container loads for established distributors.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="card p-8">
                  <h3 className="text-xl font-semibold text-text-heading mb-6">
                    Full Container Load (FCL)
                  </h3>
                  <ul className="space-y-3 text-text-muted">
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-0.5"
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
                      <span>
                        20ft containers (approx. 10-11 pallets, 22,000 kg max)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-0.5"
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
                      <span>
                        40ft containers (approx. 20-22 pallets, 27,000 kg max)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-0.5"
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
                      <span>
                        Best per-unit pricing for high-volume orders
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-0.5"
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
                      <span>Dedicated container for your products only</span>
                    </li>
                  </ul>
                </div>

                <div className="card p-8">
                  <h3 className="text-xl font-semibold text-text-heading mb-6">
                    Less than Container Load (LCL)
                  </h3>
                  <ul className="space-y-3 text-text-muted">
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-0.5"
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
                      <span>Single pallet shipments available</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-0.5"
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
                      <span>Perfect for smaller businesses and trial orders</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-0.5"
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
                      <span>Euro pallets (120 x 80 cm) standard</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-0.5"
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
                      <span>Flexible quantities to match your needs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Delivery Regions */}
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
              <h2 className="text-h2 font-semibold mb-6">
                Global Delivery Regions
              </h2>
              <p className="text-xl leading-relaxed mb-12 text-white/90">
                We deliver to major markets across three continents with
                established logistics partnerships and proven delivery routes.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                  <div className="text-5xl font-bold mb-4">EU</div>
                  <h3 className="text-2xl font-semibold mb-4">
                    European Union
                  </h3>
                  <p className="text-white/80 leading-relaxed mb-4">
                    Regular shipments to all EU member states including
                    Germany, France, Netherlands, Belgium, and more.
                  </p>
                  <div className="text-sm text-secondary-light font-medium">
                    Transit time: 5-12 days
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                  <div className="text-5xl font-bold mb-4">UK</div>
                  <h3 className="text-2xl font-semibold mb-4">
                    United Kingdom
                  </h3>
                  <p className="text-white/80 leading-relaxed mb-4">
                    Post-Brexit compliant shipments to England, Scotland,
                    Wales, and Northern Ireland.
                  </p>
                  <div className="text-sm text-secondary-light font-medium">
                    Transit time: 7-14 days
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                  <div className="text-5xl font-bold mb-4">USA</div>
                  <h3 className="text-2xl font-semibold mb-4">
                    United States
                  </h3>
                  <p className="text-white/80 leading-relaxed mb-4">
                    FDA compliant products shipped to major US ports on both
                    coasts.
                  </p>
                  <div className="text-sm text-secondary-light font-medium">
                    Transit time: 18-25 days
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-white/90 leading-relaxed">
                  <strong className="text-white">Expanding Markets:</strong> We
                  are continuously expanding our delivery network. If your
                  market is not listed above, please contact us to discuss
                  possibilities.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lead Times, MOQ & Private Label */}
      <section className="section-padding bg-bg-surface">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-semibold text-text-heading mb-12">
                Order Information
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="card p-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-text-heading mb-4">
                    Lead Times
                  </h3>
                  <ul className="space-y-2 text-text-muted">
                    <li>Standard orders: 2-3 weeks</li>
                    <li>Custom packaging: 3-4 weeks</li>
                    <li>Private label: 4-6 weeks</li>
                    <li>Rush orders available on request</li>
                  </ul>
                </div>

                <div className="card p-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
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
                        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-text-heading mb-4">
                    Minimum Order Quantity
                  </h3>
                  <ul className="space-y-2 text-text-muted">
                    <li>FCL: 1 container minimum</li>
                    <li>LCL: 1 pallet minimum</li>
                    <li>Mixed pallets available</li>
                    <li>Sample orders negotiable</li>
                  </ul>
                </div>

                <div className="card p-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
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
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-text-heading mb-4">
                    Private Label
                  </h3>
                  <ul className="space-y-2 text-text-muted">
                    <li>Custom labeling available</li>
                    <li>Your brand, our quality</li>
                    <li>Compliant label design support</li>
                    <li>Minimum quantities apply</li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 p-8 bg-secondary-light rounded-2xl">
                <h4 className="text-xl font-semibold text-text-heading mb-4">
                  Flexible Solutions for Your Business
                </h4>
                <p className="text-text leading-relaxed">
                  Every business has unique requirements. Whether you need
                  regular scheduled deliveries, just-in-time ordering, or
                  seasonal volume adjustments, we work with you to create a
                  logistics solution that fits your business model. Contact our
                  team to discuss your specific needs.
                </p>
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
              Let's Discuss Your Next Shipment
            </h3>
            <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
              Our logistics team is ready to provide a custom quote based on
              your specific requirements and delivery destination.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CTAButton href="/#contact">Request a Quote</CTAButton>
              <CTAButton href="/certifications" variant="secondary">
                View Certifications
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Strip */}
      <CTAStrip />

      {/* Footer */}
      <Footer />
    </div>
  );
}
