import { motion } from "framer-motion";
import Head from "next/head";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Header from "@/components/Header";
import CTAButton from "@/components/CTAButton";
import CTAStrip from "@/components/CTAStrip";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { fetchPageByType, type SanityPage } from "@/lib/sanity";
import { SITE_URL } from "@/lib/constants";

// Default fallback content
const defaultContent = {
  heroTitle: "Certifications & Compliance",
  heroSubtitle: "Documentation available per order — confirmed through our Turkish producer network",
  seoTitle: "Certifications & Compliance | Virelias – Turkish Food Export",
  seoDescription: "Virelias works with Turkish food producers holding BRC, IFS, ISO 22000, HACCP, and Halal certifications. Compliance documentation confirmed per order for EU, UK, GCC, and global markets.",
};

interface CertificationsPageProps {
  page: SanityPage | null;
}

export const getStaticProps: GetStaticProps<CertificationsPageProps> = async () => {
  const page = await fetchPageByType('certifications');
  return {
    props: { page },
    revalidate: 60,
  };
};

export default function CertificationsPage({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
  const heroTitle = page?.heroTitle || defaultContent.heroTitle;
  const heroSubtitle = page?.heroSubtitle || defaultContent.heroSubtitle;
  const pageTitle = page?.seoTitle || defaultContent.seoTitle;
  const pageDescription = page?.seoDescription || defaultContent.seoDescription;
  const pageUrl = `${SITE_URL}/certifications`;

  const certifications = [
    {
      name: "BRC",
      fullName: "British Retail Consortium",
      description:
        "Global food safety standard recognised by UK and international retailers. Available from selected producers in our network for EU and UK market supply.",
    },
    {
      name: "IFS",
      fullName: "International Featured Standards",
      description:
        "European food safety standard widely required by German, French, and Benelux retailers and food manufacturers. Available from our IFS-certified Turkish supplier partners.",
    },
    {
      name: "ISO 22000",
      fullName: "Food Safety Management",
      description:
        "International standard for food safety management systems covering the full supply chain. Available from producers in our network for buyers requiring ISO-level documentation.",
    },
    {
      name: "HACCP",
      fullName: "Hazard Analysis Critical Control Points",
      description:
        "Systematic approach to food safety hazard management. The baseline standard for all producers in our network — required as a minimum for any order we facilitate.",
    },
    {
      name: "Halal",
      fullName: "Halal Certification",
      description:
        "Products prepared in accordance with Islamic dietary law, certified by recognised Turkish Halal authorities. Available for GCC, UK, and European halal market supply.",
    },
    {
      name: "Kosher",
      fullName: "Kosher Certification",
      description:
        "Available for selected Mediterranean products — including olive oil, dried fruits, nuts, and pulses — through Turkish producers with recognised Kosher certification. Relevant for North American, European, and Israeli Jewish markets.",
    },
    {
      name: "EU Organic",
      fullName: "EU Organic Certification",
      description:
        "Available for selected product categories — particularly dried fruits, nuts, pulses, and spices — through certified organic producers in our Turkish supplier network.",
    },
    {
      name: "FDA",
      fullName: "FDA Compliance",
      description:
        "For US market supply, Turkish producers must hold FDA facility registration under FSMA. We work with registered Turkish facilities and can provide Foreign Supplier Verification Program (FSVP) documentation for US importers.",
    },
  ];

  const checkIcon = (
    <svg className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-bg text-text">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={`${SITE_URL}/hero1.jpg`} />
        <meta property="og:site_name" content="Virelias" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/hero1.jpg`} />
      </Head>

      <Header />
      <PageHero title={heroTitle} subtitle={heroSubtitle} />

      {/* How Certifications Work for a Trading Company */}
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
                How certification works through Virelias
              </h2>
              <div className="space-y-6 text-lg text-text leading-relaxed">
                <p>
                  Virelias is a trading company, not a manufacturer. This means
                  certifications are held by the Turkish producers we source from
                  — not by Virelias itself. What we provide is access to a
                  network of Turkish producers with the right certifications for
                  your market, plus the coordination to ensure the correct
                  documentation reaches you with every order.
                </p>
                <p>
                  When you place an order, we confirm which producer will
                  fulfil your goods and provide the relevant certification
                  documentation for that specific supplier — certificates of
                  origin, compliance declarations, HACCP records, and any
                  applicable third-party certifications (BRC, IFS, ISO 22000,
                  Halal) depending on which producer is supplying your order.
                </p>
                <p>
                  If you have a specific certification requirement — for example,
                  IFS for a German retailer, or Halal for GCC distribution —
                  tell us at the inquiry stage and we will source from a producer
                  in our network that holds that specific certification.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-text-heading mb-2">Certified producers</h3>
                  <p className="text-text-muted">We source exclusively from producers with valid international food safety certifications</p>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-text-heading mb-2">Per-order documentation</h3>
                  <p className="text-text-muted">Certification documents confirmed and provided for each specific order and supplier</p>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-text-heading mb-2">Full traceability</h3>
                  <p className="text-text-muted">Complete documentation from Turkish producer to your destination port or warehouse</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Available Certifications */}
      <section className="section-padding bg-bg-surface">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-h2 font-semibold text-text-heading mb-4 text-center">
              Certifications available through our network
            </h2>
            <p className="text-xl text-text-muted text-center mb-12 max-w-3xl mx-auto">
              The following certifications are held by producers in our Turkish
              supplier network. Availability per product and per order is
              confirmed at the inquiry stage.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  className="card p-6"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-primary/5 rounded-xl flex items-center justify-center border border-primary/10 flex-shrink-0">
                      <div className="text-xl font-bold text-primary">{cert.name}</div>
                    </div>
                    <h3 className="text-base font-semibold text-text-heading leading-snug">{cert.fullName}</h3>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed">{cert.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Market-Specific Compliance */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-semibold text-text-heading mb-4 text-center">
                Compliance by market
              </h2>
              <p className="text-lg text-text-muted text-center mb-12 max-w-3xl mx-auto">
                Documentation and compliance requirements vary by destination.
                We coordinate the correct paperwork for each market — including
                certificates of origin, health certificates, phytosanitary
                documents, and any market-specific regulatory requirements.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <div className="card p-8">
                  <h3 className="text-lg font-semibold text-text-heading mb-4">🇪🇺 European Union</h3>
                  <ul className="space-y-2 text-text-muted text-sm">
                    <li className="flex items-start">{checkIcon}<span>EU General Food Law (EC) 178/2002</span></li>
                    <li className="flex items-start">{checkIcon}<span>Food hygiene regulations (EC) 852/2004</span></li>
                    <li className="flex items-start">{checkIcon}<span>FIC labeling requirements</span></li>
                    <li className="flex items-start">{checkIcon}<span>Allergen and additive controls</span></li>
                    <li className="flex items-start">{checkIcon}<span>ATR / EUR.1 certificate of origin</span></li>
                  </ul>
                </div>

                <div className="card p-8">
                  <h3 className="text-lg font-semibold text-text-heading mb-4">🇬🇧 United Kingdom</h3>
                  <ul className="space-y-2 text-text-muted text-sm">
                    <li className="flex items-start">{checkIcon}<span>UK food safety regulations</span></li>
                    <li className="flex items-start">{checkIcon}<span>FSA requirements</span></li>
                    <li className="flex items-start">{checkIcon}<span>UK labeling standards</span></li>
                    <li className="flex items-start">{checkIcon}<span>Post-Brexit import compliance</span></li>
                    <li className="flex items-start">{checkIcon}<span>BRC certification available</span></li>
                  </ul>
                </div>

                <div className="card p-8">
                  <h3 className="text-lg font-semibold text-text-heading mb-4">🇦🇪 Gulf & Middle East</h3>
                  <ul className="space-y-2 text-text-muted text-sm">
                    <li className="flex items-start">{checkIcon}<span>Halal certification (recognised authorities)</span></li>
                    <li className="flex items-start">{checkIcon}<span>GSO compliance documentation</span></li>
                    <li className="flex items-start">{checkIcon}<span>Legalised certificate of origin for GCC</span></li>
                    <li className="flex items-start">{checkIcon}<span>Health certificate from Turkish authorities</span></li>
                    <li className="flex items-start">{checkIcon}<span>Arabic labeling support available</span></li>
                  </ul>
                </div>

                <div className="card p-8">
                  <h3 className="text-lg font-semibold text-text-heading mb-4">🇺🇸 USA & Canada</h3>
                  <ul className="space-y-2 text-text-muted text-sm">
                    <li className="flex items-start">{checkIcon}<span>FDA facility registration (FSMA)</span></li>
                    <li className="flex items-start">{checkIcon}<span>FSVP documentation for US importers</span></li>
                    <li className="flex items-start">{checkIcon}<span>CFIA requirements for Canada</span></li>
                    <li className="flex items-start">{checkIcon}<span>Certificate of origin (Form A / GSP)</span></li>
                    <li className="flex items-start">{checkIcon}<span>Kosher certification available for relevant products</span></li>
                  </ul>
                </div>

                <div className="card p-8">
                  <h3 className="text-lg font-semibold text-text-heading mb-4">🇷🇺 Russia & CIS</h3>
                  <ul className="space-y-2 text-text-muted text-sm">
                    <li className="flex items-start">{checkIcon}<span>EAC / EAEU conformity documentation</span></li>
                    <li className="flex items-start">{checkIcon}<span>Veterinary and phytosanitary certificates</span></li>
                    <li className="flex items-start">{checkIcon}<span>Russian-language documentation support</span></li>
                    <li className="flex items-start">{checkIcon}<span>Certificate of origin (Form A)</span></li>
                    <li className="flex items-start">{checkIcon}<span>Established Turkey–Russia trade routes</span></li>
                  </ul>
                </div>

                <div className="card p-8">
                  <h3 className="text-lg font-semibold text-text-heading mb-4">🌍 Africa, LatAm & Australia</h3>
                  <ul className="space-y-2 text-text-muted text-sm">
                    <li className="flex items-start">{checkIcon}<span>FSANZ compliance for Australia</span></li>
                    <li className="flex items-start">{checkIcon}<span>Phytosanitary certificates where required</span></li>
                    <li className="flex items-start">{checkIcon}<span>Certificate of origin (Form A / GSP)</span></li>
                    <li className="flex items-start">{checkIcon}<span>Health certificates from Turkish export authorities</span></li>
                    <li className="flex items-start">{checkIcon}<span>Halal documentation for relevant African markets</span></li>
                  </ul>
                </div>
              </div>

              <div className="bg-bg-surface rounded-2xl p-6 text-center">
                <p className="text-text-muted leading-relaxed">
                  Don't see your market listed? Contact us — we export to
                  over 50 countries and can confirm the documentation
                  requirements for any destination at the inquiry stage.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional services */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-h2 font-semibold mb-6">
                Additional documentation services
              </h2>
              <div className="space-y-4 text-lg text-white/90 leading-relaxed mb-8">
                <p>
                  Beyond standard compliance documentation, we can coordinate
                  the following on request:
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-left mb-8">
                {[
                  "Certificates of analysis (COA)",
                  "Accredited laboratory testing",
                  "Allergen declarations",
                  "Nutritional information",
                  "Phytosanitary certificates",
                  "Private label compliance review",
                  "Organic certification documentation",
                  "Halal certificate legalisation for GCC",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                    <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/90 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-white/70 text-base">
                All documentation requests should be raised at the inquiry stage
                so we can confirm availability and include timelines in your
                proforma invoice.
              </p>
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
              Have a specific certification requirement?
            </h3>
            <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
              Tell us what your market requires at the inquiry stage and we will
              source from the right producer in our Turkish network.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CTAButton href="/#contact">Discuss Your Requirements</CTAButton>
              <CTAButton href="/about" variant="secondary">
                About Virelias
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </section>

      <CTAStrip />
      <Footer />
    </div>
  );
}
