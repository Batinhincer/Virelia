import { motion } from "framer-motion";
import Head from "next/head";
import Header from "@/components/Header";
import CTAButton from "@/components/CTAButton";
import CTAStrip from "@/components/CTAStrip";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/constants";

const seoTitle = "Why Source From Turkey? | Virelias";
const seoDescription =
  "Turkey produces 70% of the world's hazelnuts, is the world's largest table olive producer, and holds dominant global positions in dried apricots, dried figs, sultanas, bay leaves, and more. Learn why Turkey is one of the most important food sourcing origins for international buyers.";
const pageUrl = `${SITE_URL}/why-turkey`;

const stats = [
  { figure: "~70%", label: "of world hazelnut supply" },
  { figure: "#1", label: "table olive producer globally" },
  { figure: "#2", label: "olive oil producer globally" },
  { figure: "#1", label: "bay leaf exporter globally" },
  { figure: "#1", label: "bulgur producer & exporter" },
  { figure: "Top 3", label: "dried apricot exporter" },
  { figure: "Top 5", label: "dried fig producer" },
  { figure: "Top 5", label: "sultana producer" },
];

const regions = [
  {
    region: "Black Sea Coast",
    provinces: "Giresun · Ordu · Trabzon",
    products: "Hazelnuts",
    detail:
      "The Black Sea coastal strip produces roughly 70% of the world's hazelnut supply. Giresun-origin hazelnuts are the global benchmark for confectionery and chocolate manufacturing.",
  },
  {
    region: "Aegean Region",
    provinces: "İzmir · Aydın · Muğla · Manisa",
    products: "Olive oil · Dried figs · Sultanas · Capers · Bay leaves · Oregano",
    detail:
      "Turkey's most agriculturally diverse region. The Aegean coast produces world-leading dried figs (Aydın), sultanas (Manisa/İzmir), olive oil, capers, and the majority of the world's exported bay leaves.",
  },
  {
    region: "Southeastern Anatolia",
    provinces: "Gaziantep · Şanlıurfa · Hatay",
    products: "Pistachios · Pul biber · Sumac · Pepper paste",
    detail:
      "Gaziantep is the world centre of pistachio processing and the home of baklava. The broader region produces iconic Turkish spices including pul biber (Urfa isot) and sumac.",
  },
  {
    region: "Eastern Anatolia",
    provinces: "Malatya · Elazığ",
    products: "Dried apricots",
    detail:
      "Malatya province is the world's most recognised origin for dried apricots, accounting for the majority of global exports. The continental climate — hot dry summers, cold winters — produces exceptional natural sugar content.",
  },
  {
    region: "Central Anatolia",
    provinces: "Konya · Ankara · Kayseri",
    products: "Chickpeas · Lentils · Bulgur · Wheat",
    detail:
      "Turkey's agricultural heartland. The Central Anatolian plateau is the primary production zone for chickpeas, lentils, and bulgur — all of which Turkey exports at world-significant scale.",
  },
  {
    region: "Mediterranean & Marmara",
    provinces: "Bursa · Balıkesir · Mersin · Antalya",
    products: "Tomato products · Pomegranates · Table olives · Peppers",
    detail:
      "Major processing tomato cultivation (tomato paste, sun-dried tomatoes), table olive production centred in Bursa and Balıkesir, and pomegranate cultivation in the southern coastal belt.",
  },
];

const advantages = [
  {
    title: "Logistics advantage over Asia",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
      />
    ),
    body: "Turkey to Rotterdam takes approximately 7–10 days by sea. Indonesia or Malaysia to Rotterdam takes 25–30 days. For buyers importing sambal, sesame, or spices from Asian origins, a Turkish supplier means faster restocking, shorter cash cycles, lower freight insurance costs, and fewer supply chain disruptions.",
  },
  {
    title: "Price advantage over Western Europe",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    body: "Turkish production costs for olive oil, dried fruits, nuts, and preserved vegetables are consistently below Spanish, Italian, and Greek alternatives without sacrificing quality. Turkey's agricultural scale and lower labour costs create a structural pricing advantage that has made it a preferred source for European private label buyers.",
  },
  {
    title: "Compliance advantage for EU buyers",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    ),
    body: "Turkish food producers operate under EU-aligned food safety frameworks, with BRC, IFS, ISO 22000, HACCP, and Halal certifications widely available across the sector. Turkey's established EU trade relationship and regulatory alignment simplifies import documentation compared to sourcing from non-EU, non-candidate countries.",
  },
  {
    title: "Halal compliance for GCC & global markets",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    body: "Turkey has one of the most developed Halal food certification ecosystems in the world — a result of domestic demand and decades of exporting to GCC and Muslim-majority markets globally. For buyers supplying the UAE, Saudi Arabia, Malaysia, or other Halal-sensitive markets, Turkish-origin products with Turkish Halal certification carry strong market recognition.",
  },
];

const markets = [
  {
    flag: "🇪🇺",
    market: "European Union",
    note: "Germany, Netherlands, Belgium, France, and Scandinavia are Turkey's largest food export destinations. Turkish food products have decades of established distribution across European ethnic retail, specialist food channels, and mainstream grocery.",
  },
  {
    flag: "🇬🇧",
    market: "United Kingdom",
    note: "The UK imports significant volumes of Turkish food products — particularly olive oil, dried fruits, nuts, and condiments. Turkish origin is well-established in UK specialty food retail and the catering trade.",
  },
  {
    flag: "🇦🇪",
    market: "Gulf & Middle East",
    note: "The GCC is one of Turkey's most important food export markets. Turkish food products — from dried fruits to tomato products, condiments, and grains — have strong recognition and distribution across Saudi Arabia, UAE, Kuwait, and Qatar.",
  },
  {
    flag: "🌍",
    market: "Africa & Global",
    note: "Turkey is a significant food supplier to North Africa and Sub-Saharan Africa, particularly for pulses, grains, and processed foods. Turkish products also reach Central Asia, the Americas, and the Far East across dozens of categories.",
  },
];

export default function WhyTurkeyPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={`${SITE_URL}/hero1.jpg`} />
        <meta property="og:site_name" content="Virelias" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/hero1.jpg`} />
      </Head>

      <Header />

      <PageHero
        title="Why Source From Turkey?"
        subtitle="Turkey is one of the world's most important food producing nations — and one of the most underappreciated sourcing origins for international buyers."
      />

      {/* Opening statement */}
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
                The world's food supply runs through Turkey
              </h2>
              <div className="space-y-6 text-lg text-text leading-relaxed">
                <p>
                  Turkey produces approximately 70% of the world's hazelnuts,
                  is the world's largest table olive producer, and holds
                  dominant global positions in dried apricots, dried figs,
                  sultanas, bay leaves, capers, bulgur, and tomato products.
                  These are not marginal positions — they represent the kinds
                  of market shares that make Turkey structurally irreplaceable
                  in global food supply chains.
                </p>
                <p>
                  Yet Turkey remains underappreciated as a sourcing origin by
                  many European buyers who default to Spanish, Italian, or
                  Greek suppliers for Mediterranean products, or Asian origins
                  for ingredients available closer to home. The reality is that
                  for a wide range of food categories, Turkey offers superior
                  quality, lower cost, shorter lead times, and stronger
                  compliance credentials than the alternatives.
                </p>
                <p>
                  Virelias exists to make Turkish food production accessible
                  to international buyers — connecting established Turkish
                  producers across nine product categories to distributors,
                  manufacturers, and food service operators worldwide.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-h2 font-semibold mb-4">Turkey by the numbers</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Global production and export positions across key food categories
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
              >
                <div className="text-3xl font-bold mb-2">{stat.figure}</div>
                <p className="text-white/80 text-sm leading-snug">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional strengths */}
      <section className="section-padding bg-bg-surface">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-h2 font-semibold text-text-heading mb-4">
              Where Turkey's strength comes from
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Turkey spans three climate zones across 780,000 km². Different
              regions hold world-class positions in specific categories.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((r, i) => (
              <motion.div
                key={r.region}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card p-8"
              >
                <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
                  {r.provinces}
                </div>
                <h3 className="text-xl font-semibold text-text-heading mb-2">
                  {r.region}
                </h3>
                <div className="text-sm font-medium text-secondary-dark mb-4">
                  {r.products}
                </div>
                <p className="text-text-muted leading-relaxed text-sm">{r.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Turkey vs alternatives */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-h2 font-semibold text-text-heading mb-4">
              Turkey vs the alternatives
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Four structural advantages that make Turkey a compelling sourcing
              origin for international buyers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {advantages.map((adv, i) => (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card p-8"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                  <svg
                    className="w-7 h-7 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {adv.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-text-heading mb-3">
                  {adv.title}
                </h3>
                <p className="text-text-muted leading-relaxed">{adv.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Export markets */}
      <section className="section-padding bg-bg-surface">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-h2 font-semibold text-text-heading mb-4">
              Markets we serve
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Turkish food products have established distribution across four
              major international market blocs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {markets.map((m, i) => (
              <motion.div
                key={m.market}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card p-8 text-center"
              >
                <div className="text-4xl mb-4">{m.flag}</div>
                <h3 className="text-lg font-semibold text-text-heading mb-3">
                  {m.market}
                </h3>
                <p className="text-text-muted leading-relaxed text-sm">{m.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
              Contact Virelias to discuss your sourcing requirements. We
              connect buyers across Europe, the GCC, and global markets to
              established Turkish producers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CTAButton href="/#contact">Request a Quote</CTAButton>
              <CTAButton href="/products/dried-fruits-nuts" variant="secondary">
                Browse Products
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
