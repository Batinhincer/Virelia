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
  heroTitle: "About Virelias",
  heroSubtitle: "Turkey-based export company connecting Turkish producers to international buyers",
  seoTitle: "About Us | Virelias – Turkish Food Products for Global Markets",
  seoDescription: "Virelias is a Turkey-based B2B food export company. We connect international buyers across Europe, the GCC, and global markets to established Turkish food producers across 9 product categories.",
};

interface AboutPageProps {
  page: SanityPage | null;
}

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  const page = await fetchPageByType('about');
  
  return {
    props: {
      page,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
};

export default function AboutPage({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
  // Use Sanity content if available, otherwise fall back to defaults
  const heroTitle = page?.heroTitle || defaultContent.heroTitle;
  const heroSubtitle = page?.heroSubtitle || defaultContent.heroSubtitle;
  const pageTitle = page?.seoTitle || defaultContent.seoTitle;
  const pageDescription = page?.seoDescription || defaultContent.seoDescription;
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
      <PageHero title={heroTitle} subtitle={heroSubtitle} />

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
                  Virelias is a Turkey-based food export company connecting
                  Turkish agricultural and manufacturing capacity to
                  international buyers across Europe, the Gulf, and beyond.
                  We are a trading intermediary — not a manufacturer — which
                  means our value lies in the supplier relationships, sourcing
                  knowledge, and logistics expertise we bring to every order.
                </p>
                <p>
                  We work exclusively in the B2B sector, partnering with
                  distributors, food manufacturers, importers, restaurant
                  chains, and food service operators who need a reliable,
                  knowledgeable partner on the ground in Turkey. Our role is
                  to make Turkish food production accessible to international
                  buyers efficiently and reliably.
                </p>
                <p>
                  Turkey is one of the world's most important food producing
                  nations — the world's largest table olive producer, the
                  source of approximately 70% of global hazelnut supply, and
                  a dominant exporter across dried fruits, spices, pulses,
                  and processed foods. Virelias exists to connect that
                  capacity to the buyers who need it.
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
                What We Source
              </h2>
              <div className="space-y-6 text-lg text-text leading-relaxed mb-12">
                <p>
                  Our catalogue spans nine product categories, all sourced
                  from established Turkish producers with EU food safety
                  compliance and consistent supply capacity.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-text-heading mb-2">
                    Oils & Condiments
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Extra virgin olive oil, table olives, olive paste, and
                    pomegranate molasses from Turkey's Aegean and Marmara
                    growing regions.
                  </p>
                </div>
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-text-heading mb-2">
                    Pepper & Chili Products
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Red and hot pepper paste, harissa, ajvar, shatta,
                    lutenitsa, and sambal — produced in Turkey for
                    European and global markets.
                  </p>
                </div>
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-text-heading mb-2">
                    Preserved Vegetables
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Roasted peppers, roasted aubergine, mixed pickles,
                    gherkins, brined vine leaves, and capers.
                  </p>
                </div>
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-text-heading mb-2">
                    Dried Fruits & Nuts
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Dried apricots from Malatya, dried figs from Aydın,
                    Aegean sultanas, Black Sea hazelnuts, and Gaziantep
                    pistachio paste.
                  </p>
                </div>
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-text-heading mb-2">
                    Tahini & Nut Spreads
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Cold-pressed tahini, grape molasses, and tahini halva
                    for food manufacturers, food service, and specialty
                    retail.
                  </p>
                </div>
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-text-heading mb-2">
                    Tomato Products
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Tomato paste (double and triple concentrate) and
                    sun-dried tomatoes from Turkey's processing tomato
                    growing regions.
                  </p>
                </div>
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-text-heading mb-2">
                    Grains & Pulses
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Bulgur, chickpeas, and lentils — staple ingredients
                    for food manufacturers and dry goods distributors
                    serving global markets.
                  </p>
                </div>
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-text-heading mb-2">
                    Herbs & Spices
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Sumac, pul biber, oregano, and bay leaves — categories
                    where Turkey holds dominant global market positions.
                  </p>
                </div>
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-text-heading mb-2">
                    Ready-to-Use Sauces
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Pizza sauces, pasta sauces, and doner sauces produced
                    in Turkey from locally grown processing tomatoes.
                  </p>
                </div>
              </div>

              <div className="space-y-6 text-lg text-text leading-relaxed">
                <p>
                  Every product in our catalogue is sourced from Turkish
                  producers operating under EU food safety standards.
                  Compliance documentation, certificates of origin, and
                  accredited laboratory analysis are available on request
                  and confirmed per order.
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
                Markets We Serve
              </h2>
              <div className="space-y-6 text-lg text-text leading-relaxed mb-12">
                <p>
                  Turkish food products have established distribution across
                  multiple international market blocs. We supply buyers in
                  all of the following regions and coordinate the
                  documentation and logistics required for each.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="card p-8"
                >
                  <div className="text-3xl mb-4">🇪🇺</div>
                  <h3 className="text-xl font-bold text-text-heading mb-3">
                    European Union
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    Germany, Netherlands, Belgium, France, and Scandinavia
                    are Turkey's largest food export destinations. Full EU
                    food safety compliance and import documentation provided.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="card p-8"
                >
                  <div className="text-3xl mb-4">🇬🇧</div>
                  <h3 className="text-xl font-bold text-text-heading mb-3">
                    United Kingdom
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    Post-Brexit compliant with UK import standards. Turkish
                    food products have strong existing distribution across
                    UK specialty food retail and the catering trade.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="card p-8"
                >
                  <div className="text-3xl mb-4">🇦🇪</div>
                  <h3 className="text-xl font-bold text-text-heading mb-3">
                    Gulf & Middle East
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    The GCC is one of Turkey's most important food export
                    markets. Halal-certified supply available. We serve
                    buyers in Saudi Arabia, UAE, Kuwait, and Qatar.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="card p-8"
                >
                  <div className="text-3xl mb-4">🌍</div>
                  <h3 className="text-xl font-bold text-text-heading mb-3">
                    Africa & Global
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    Turkey is a significant food supplier to North Africa
                    and Sub-Saharan Africa. We also supply buyers in the
                    Americas, Central Asia, and the Far East.
                  </p>
                </motion.div>
              </div>

              <div className="space-y-6 text-lg text-text leading-relaxed">
                <p>
                  Our expertise in Turkish export procedures, customs
                  documentation, phytosanitary certificates, and freight
                  logistics ensures smooth delivery to your location —
                  whether you're placing a single container order or
                  establishing a long-term supply partnership.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* How We Work */}
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
              <h2 className="text-h2 font-semibold mb-6">How We Work</h2>
              <div className="space-y-6 text-lg leading-relaxed mb-12">
                <p>
                  As a trading intermediary, our role is coordination and
                  reliability. We source from established Turkish producers,
                  manage quality checks and documentation, and handle
                  logistics to your port or warehouse.
                </p>
                <p>
                  Custom packaging, private label, specific certifications,
                  and accredited laboratory analysis are all available —
                  we coordinate with our supplier network to meet your
                  requirements. Certification documentation is confirmed
                  per order based on which producer is fulfilling your
                  specific goods.
                </p>
                <p>
                  We respond to all inquiries within 24 hours and provide
                  proforma invoices, compliance documentation, and shipping
                  coordination as standard.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-6 mt-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-3xl font-bold mb-2">24h</div>
                  <p className="text-white/90">Response time</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-3xl font-bold mb-2">9</div>
                  <p className="text-white/90">Product categories</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-3xl font-bold mb-2">37+</div>
                  <p className="text-white/90">Products catalogued</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-3xl font-bold mb-2">Full</div>
                  <p className="text-white/90">Traceability</p>
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
              Ready to source from Turkey?
            </h3>
            <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
              Contact Virelias to discuss your requirements. We connect
              buyers across Europe, the GCC, and global markets to
              established Turkish food producers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CTAButton href="/#contact">Request a Quote</CTAButton>
              <CTAButton href="/why-turkey" variant="secondary">
                Why Source From Turkey?
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
