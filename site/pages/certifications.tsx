import { motion } from "framer-motion";
import Head from "next/head";
import Header from "@/components/Header";
import CTAButton from "@/components/CTAButton";
import CTAStrip from "@/components/CTAStrip";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://frezya.nl';

export default function CertificationsPage() {
  // SEO metadata
  const pageTitle =
    "Certifications & Compliance | Virelia – Food Safety Standards";
  const pageDescription =
    "Virelia maintains the highest food safety and quality standards. Our products are certified with BRC, IFS, ISO 22000, HACCP, Halal, Kosher, and more for global export.";
  const pageUrl = `${SITE_URL}/certifications`;

  const certifications = [
    {
      name: "BRC",
      fullName: "British Retail Consortium",
      description:
        "Global food safety certification recognized by retailers worldwide. Ensures highest standards for food safety and quality management.",
    },
    {
      name: "IFS",
      fullName: "International Featured Standards",
      description:
        "European food safety standard ensuring product quality, legality, and compliance with customer specifications.",
    },
    {
      name: "ISO 22000",
      fullName: "Food Safety Management",
      description:
        "International standard for food safety management systems, covering the entire food chain from farm to fork.",
    },
    {
      name: "HACCP",
      fullName: "Hazard Analysis Critical Control Points",
      description:
        "Systematic preventive approach to food safety addressing physical, chemical, and biological hazards.",
    },
    {
      name: "Halal",
      fullName: "Halal Certification",
      description:
        "Products prepared according to Islamic dietary laws, certified by recognized Halal authorities.",
    },
    {
      name: "Kosher",
      fullName: "Kosher Certification",
      description:
        "Products meeting Jewish dietary requirements, certified by authorized rabbinical organizations.",
    },
    {
      name: "EU Organic",
      fullName: "EU Organic Certification",
      description:
        "Organic certification for select products meeting strict European organic farming standards.",
    },
    {
      name: "FDA",
      fullName: "FDA Compliance",
      description:
        "All products comply with US Food and Drug Administration regulations for import into the United States.",
    },
  ];

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
                Certifications & Compliance
              </h1>
              <p className="text-white text-xl lg:text-2xl font-light leading-relaxed">
                Committed to the highest food safety and quality standards
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Food Safety Overview */}
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
                Food Safety & Quality Assurance
              </h2>
              <div className="space-y-6 text-lg text-text leading-relaxed">
                <p>
                  At Virelia, food safety is not just a requirement—it's a
                  fundamental commitment to our customers and consumers. We
                  maintain rigorous quality control systems throughout our
                  entire supply chain, from source selection to final delivery.
                </p>
                <p>
                  Our comprehensive certification portfolio reflects our
                  dedication to meeting and exceeding international food safety
                  standards. Every product we export is backed by proper
                  documentation and full traceability, ensuring complete
                  transparency and accountability.
                </p>
                <p>
                  We work exclusively with certified production facilities that
                  share our commitment to quality and safety. Regular audits,
                  laboratory testing, and continuous improvement programs
                  ensure that our standards remain at the highest level.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg
                      className="w-10 h-10 text-primary"
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
                  <h3 className="text-xl font-semibold text-text-heading mb-2">
                    Certified Partners
                  </h3>
                  <p className="text-text-muted">
                    All suppliers maintain current international certifications
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg
                      className="w-10 h-10 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-text-heading mb-2">
                    Regular Audits
                  </h3>
                  <p className="text-text-muted">
                    Continuous monitoring and third-party verification
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg
                      className="w-10 h-10 text-primary"
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
                  <h3 className="text-xl font-semibold text-text-heading mb-2">
                    Full Traceability
                  </h3>
                  <p className="text-text-muted">
                    Complete documentation from source to delivery
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications List */}
      <section className="section-padding bg-bg-surface">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-h2 font-semibold text-text-heading mb-6 text-center">
              Our Certifications
            </h2>
            <p className="text-xl text-text-muted text-center mb-12 max-w-3xl mx-auto">
              Our products and production partners hold the following
              internationally recognized certifications and compliance standards
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="card p-6 text-center"
                >
                  <div className="w-24 h-24 bg-primary/5 rounded-2xl flex items-center justify-center mb-4 mx-auto border-2 border-primary/10">
                    <div className="text-3xl font-bold text-primary">
                      {cert.name}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-text-heading mb-2">
                    {cert.fullName}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {cert.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Compliance by Market */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-semibold text-text-heading mb-6 text-center">
                Market-Specific Compliance
              </h2>
              <p className="text-lg text-text-muted text-center mb-12">
                We ensure full regulatory compliance for each target market
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="card p-8">
                  <h3 className="text-xl font-semibold text-text-heading mb-4 text-center">
                    European Union
                  </h3>
                  <ul className="space-y-3 text-text-muted">
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-1"
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
                      <span>EU Regulation (EC) No 178/2002</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-1"
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
                      <span>Food hygiene regulations</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-1"
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
                      <span>Labeling requirements (FIC)</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-1"
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
                      <span>Additives and allergen controls</span>
                    </li>
                  </ul>
                </div>

                <div className="card p-8">
                  <h3 className="text-xl font-semibold text-text-heading mb-4 text-center">
                    United Kingdom
                  </h3>
                  <ul className="space-y-3 text-text-muted">
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-1"
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
                      <span>UK food safety regulations</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-1"
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
                      <span>FSA requirements</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-1"
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
                      <span>Post-Brexit import compliance</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-1"
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
                      <span>UK labeling standards</span>
                    </li>
                  </ul>
                </div>

                <div className="card p-8">
                  <h3 className="text-xl font-semibold text-text-heading mb-4 text-center">
                    United States
                  </h3>
                  <ul className="space-y-3 text-text-muted">
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-1"
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
                      <span>FDA regulations</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-1"
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
                      <span>FSMA compliance</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-1"
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
                      <span>Product registration</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-1"
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
                      <span>US labeling requirements</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Documentation Note */}
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
                <svg
                  className="w-10 h-10 text-white"
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
              <h2 className="text-h2 font-semibold mb-6">
                Certification Documents Available
              </h2>
              <p className="text-xl leading-relaxed mb-8 text-white/90">
                We maintain current copies of all certifications and compliance
                documents. Product-specific certificates, test reports, and
                compliance declarations are provided upon request for qualified
                business partners.
              </p>
              <p className="text-lg leading-relaxed text-white/80">
                For full documentation packages including certificates of
                analysis, allergen statements, and nutritional information,
                please contact our quality assurance team.
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
              Questions About Certifications?
            </h3>
            <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
              Our team is ready to provide detailed information about our
              certifications and compliance documentation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CTAButton href="/#contact">Contact Our Team</CTAButton>
              <CTAButton href="/about" variant="secondary">
                About Virelia
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
