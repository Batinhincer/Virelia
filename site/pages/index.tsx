import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Header from "@/components/Header";
import SectionHeader from "@/components/SectionHeader";
import ProductCard from "@/components/ProductCard";
import ProductGrid from "@/components/ProductGrid";
import CTAButton from "@/components/CTAButton";
import CTAStrip from "@/components/CTAStrip";
import Footer from "@/components/Footer";
import { products, categories, categoryInfo, getProductsByCategory } from "@/data/products";
import { fetchPageByType, fetchCategories, fetchFeaturedProducts, type SanityPage } from "@/lib/sanity";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://frezya.nl';

// Default fallback content for homepage
const defaultContent = {
  heroTitle: "Premium Mediterranean Foods for Global Markets",
  heroSubtitle: "Your trusted B2B partner for authentic Mediterranean products. Quality, certification, and reliable export to EU, UK, and USA markets.",
  seoTitle: "Frezya – Premium Mediterranean Food Exporter | B2B Food Export",
  seoDescription: "Frezya is your trusted B2B partner for premium Mediterranean food products. Olive oil, pepper paste, coffee, and specialty foods. Export to EU, UK, and USA.",
};

interface HomePageProps {
  page: SanityPage | null;
  sanityCategories: Array<{ _id: string; title: string; slug: string; description: string }> | null;
  sanityFeaturedProducts: Array<{ _id: string; title: string; slug: string; shortDescription: string; category: string; categorySlug: string; image: string }> | null;
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const [page, sanityCategories, sanityFeaturedProducts] = await Promise.all([
    fetchPageByType('home'),
    fetchCategories(),
    fetchFeaturedProducts(),
  ]);
  
  return {
    props: {
      page,
      sanityCategories,
      sanityFeaturedProducts,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
};

export default function HomePage({ page, sanityCategories, sanityFeaturedProducts }: InferGetStaticPropsType<typeof getStaticProps>) {
  // Use Sanity content if available, otherwise fall back to defaults
  const heroTitle = page?.heroTitle || defaultContent.heroTitle;
  const heroSubtitle = page?.heroSubtitle || defaultContent.heroSubtitle;
  const pageTitle = page?.seoTitle || defaultContent.seoTitle;
  const pageDescription = page?.seoDescription || defaultContent.seoDescription;

  // Use featured products from Sanity if available, otherwise use first 6 local products
  const featuredProducts = sanityFeaturedProducts && sanityFeaturedProducts.length > 0
    ? sanityFeaturedProducts.slice(0, 6).map(p => ({
        slug: p.slug,
        title: p.title,
        shortDesc: p.shortDescription,
        longDesc: '',
        category: p.category,
        image: p.image || '/placeholder.jpg',
      }))
    : products.slice(0, 6);

  // Use categories from Sanity if available, otherwise use local categories
  const displayCategories = sanityCategories && sanityCategories.length > 0
    ? sanityCategories.map(c => ({
        name: c.title,
        slug: c.slug,
        description: c.description,
      }))
    : categoryInfo;

  return (
    <div className="min-h-screen bg-bg text-text">
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={pageDescription}
        />
        <link rel="canonical" href={SITE_URL} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={`${SITE_URL}/hero1.jpg`} />
        <meta property="og:site_name" content="Frezya" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={SITE_URL} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/hero1.jpg`} />
      </Head>

      <Header />

      {/* Modern EU-Style Premium B2B Hero Section */}
      <section className="relative h-[700px] mt-[80px] overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `linear-gradient(135deg, rgba(58, 90, 64, 0.85) 0%, rgba(45, 70, 50, 0.75) 100%), url('/hero1.jpg')`
          }}
        />
        
        {/* Hero Content */}
        <div className="relative h-full flex items-center">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <h1 className="text-5xl lg:text-6xl text-white font-bold mb-6 font-heading leading-tight">
                {heroTitle}
              </h1>
              <p className="text-white text-xl lg:text-2xl font-light leading-relaxed mb-10 max-w-2xl">
                {heroSubtitle}
              </p>
              
              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a 
                    href="#contact"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-semibold text-lg text-primary bg-white transition-all duration-200 hover:bg-secondary-light hover:shadow-soft-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                  >
                    Request a Quote
                  </a>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a 
                    href="#contact"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-semibold text-lg text-white bg-transparent border-2 border-white transition-all duration-200 hover:bg-white hover:text-primary hover:shadow-soft focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                  >
                    Contact Sales
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Frezya? Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title="Why Choose Frezya?"
            subtitle="Your trusted partner for premium Mediterranean food products"
            centered
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card card-hover p-8"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-heading mb-3">Premium Quality</h3>
              <p className="text-text-muted leading-relaxed">
                Handpicked Mediterranean products meeting the highest international standards for taste and quality.
              </p>
            </motion.div>

            {/* Feature Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card card-hover p-8"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-heading mb-3">Full Certifications</h3>
              <p className="text-text-muted leading-relaxed">
                EU-compliant with all necessary certifications for safe and legal import to European markets.
              </p>
            </motion.div>

            {/* Feature Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card card-hover p-8"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-heading mb-3">Export Experience</h3>
              <p className="text-text-muted leading-relaxed">
                Proven track record delivering to EU, UK, and USA with reliable logistics and customs expertise.
              </p>
            </motion.div>

            {/* Feature Card 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card card-hover p-8"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-heading mb-3">Custom Packaging</h3>
              <p className="text-text-muted leading-relaxed">
                Flexible packaging solutions tailored to your market needs, from bulk to retail-ready formats.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Categories Showcase */}
      <section className="section-padding bg-bg-surface">
        <div className="container-custom">
          <SectionHeader
            title="Product Categories"
            subtitle="Explore our comprehensive range of Mediterranean specialties"
            centered
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayCategories.map((cat, index) => {
              const categoryProducts = getProductsByCategory(cat.name);
              const firstProduct = categoryProducts[0];
              
              return (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card card-hover overflow-hidden"
                >
                  <Link
                    href={`/products/${cat.slug}`}
                    className="group block"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                        style={{ 
                          backgroundImage: firstProduct ? `url('${firstProduct.image}')` : 'linear-gradient(135deg, #3a5a40 0%, #588157 100%)'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-primary/30 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-semibold text-white">
                          {cat.name}
                        </h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-2">
                        {cat.description}
                      </p>
                      <span className="inline-flex items-center text-primary font-medium text-sm group-hover:text-primary-dark transition-colors">
                        View Category
                        <svg className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title="Featured Products"
            subtitle="Our most popular Mediterranean specialties"
            centered
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <CTAButton href="#products">View All Products</CTAButton>
          </div>
        </div>
      </section>

      {/* Export & Logistics Trust Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-semibold mb-6">Export Ready for Global Markets</h2>
              <p className="text-xl leading-relaxed mb-12 text-white/90">
                With extensive experience in international trade, we ensure seamless delivery to your market. 
                Our products are certified and compliant for export to European Union, United Kingdom, and United States markets.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
              >
                <div className="text-4xl font-bold mb-2">EU</div>
                <p className="text-white/80">European Union certified and ready</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
              >
                <div className="text-4xl font-bold mb-2">UK</div>
                <p className="text-white/80">Compliant with UK import standards</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
              >
                <div className="text-4xl font-bold mb-2">USA</div>
                <p className="text-white/80">FDA compliant for US markets</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12"
            >
              <Link 
                href="/logistics" 
                className="inline-flex items-center text-white font-medium hover:text-secondary-light transition-colors"
              >
                Learn about our logistics solutions
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications Teaser */}
      <section className="section-padding bg-bg-surface">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-h2 font-semibold text-text-heading mb-6">Quality & Certifications</h2>
                <p className="text-lg text-text leading-relaxed mb-6">
                  Our commitment to quality is backed by internationally recognized certifications. 
                  We work exclusively with certified producers and maintain full traceability across our supply chain.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {['BRC', 'IFS', 'ISO 22000', 'HACCP', 'Halal'].map((cert) => (
                    <span key={cert} className="px-4 py-2 bg-primary/10 text-primary font-medium rounded-xl text-sm">
                      {cert}
                    </span>
                  ))}
                </div>
                <CTAButton href="/certifications" variant="secondary">View All Certifications</CTAButton>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-2 gap-6"
              >
                <div className="card p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">100%</div>
                  <p className="text-text-muted text-sm">Quality Guaranteed</p>
                </div>
                <div className="card p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">Full</div>
                  <p className="text-text-muted text-sm">Traceability</p>
                </div>
                <div className="card p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">ISO</div>
                  <p className="text-text-muted text-sm">Certified Partners</p>
                </div>
                <div className="card p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">24h</div>
                  <p className="text-text-muted text-sm">Response Time</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mid-page CTA Strip */}
      <section className="bg-secondary py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold text-text-heading mb-2">
                Ready to Start Your Order?
              </h3>
              <p className="text-lg text-text-muted">
                Get in touch with our team for pricing and availability
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-semibold text-lg text-white bg-primary transition-all duration-200 hover:bg-primary-dark hover:shadow-soft-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 whitespace-nowrap"
              >
                Request a Quote
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title="About Frezya"
            subtitle="Your trusted partner for premium Mediterranean food products"
            centered
          />
          <div className="max-w-4xl mx-auto text-text leading-relaxed space-y-6 text-lg">
            <p>
              Frezya is a leading exporter of authentic Mediterranean food
              products, bringing the finest flavors from Turkey and the
              Mediterranean region to markets across Europe and beyond.
            </p>
            <p>
              With a commitment to quality, sustainability, and authentic taste,
              we partner with carefully selected producers to deliver products
              that meet the highest international standards. Our portfolio spans
              traditional condiments, premium oils, specialty sauces, and
              preserved vegetables.
            </p>
            <p>
              We understand the needs of B2B partners – from consistent quality
              and reliable supply chains to competitive pricing and flexible
              packaging options. Whether you&apos;re a distributor, restaurant chain,
              or specialty food retailer, Frezya is your gateway to authentic
              Mediterranean flavor.
            </p>
          </div>
          <div className="text-center mt-12 flex flex-wrap justify-center gap-4">
            <CTAButton href="#contact">Request a Quote</CTAButton>
            <CTAButton href="/about" variant="secondary">
              Learn More About Us
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title="Complete Product Range"
            subtitle="Browse our full catalog of Mediterranean specialties organized by category"
            centered
          />

          {categories.map((category) => {
            const categoryProducts = getProductsByCategory(category);
            return (
              <div key={category} className="mb-20 last:mb-0">
                <h3 className="text-h3 font-semibold text-text-heading mb-8 pb-3 border-b-2 border-primary/20">
                  {category}
                </h3>
                <ProductGrid products={categoryProducts} />
              </div>
            );
          })}

          <div className="text-center mt-16">
            <CTAButton href="#contact">Request Product Information</CTAButton>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-primary text-white section-padding">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h3 className="text-h2 font-semibold mb-10 text-center">Contact Us</h3>
          <div className="grid md:grid-cols-2 gap-10 mb-12">
            <div className="space-y-6">
              <h4 className="text-2xl font-medium mb-6 text-secondary-light">Get in Touch</h4>
              <p className="mb-3 text-lg">Frezya Dış Ticaret Ltd. Şti.</p>
              <p className="mb-3 text-lg leading-relaxed">
                Akpınar, Şht. Mümin Mutlu Sk. No:7 Kat:2, Ofis:36,
                <br />
                16160 Osmangazi/Bursa, Türkiye
              </p>
              <p className="mb-3">
                <a
                  href="tel:+905077075407"
                  className="hover:text-secondary-light transition-colors text-lg inline-flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +90 507 707 54 07
                </a>
              </p>
              <p className="mb-3">
                <a
                  href="mailto:batinhincer@frezya.nl"
                  className="hover:text-secondary-light transition-colors text-lg inline-flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  batinhincer@frezya.nl
                </a>
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="text-2xl font-medium mb-6 text-secondary-light">Business Hours</h4>
              <p className="mb-2 text-lg">Monday - Friday: 9:00 AM - 6:00 PM (EEST)</p>
              <p className="mb-6 text-lg">Saturday - Sunday: Closed</p>
              <p className="text-sm text-secondary-light leading-relaxed bg-primary-dark/30 p-4 rounded-xl">
                For urgent inquiries, please call or email us directly. We respond to all business inquiries within 24 hours.
              </p>
            </div>
          </div>

          <form
            action="https://formspree.io/f/xvgranqj"
            method="POST"
            className="mt-12 grid grid-cols-1 gap-6 bg-white text-text p-8 lg:p-10 rounded-3xl shadow-soft-lg"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-text-heading" htmlFor="name">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="w-full border-2 border-bg-surface rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-text-heading" htmlFor="email">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full border-2 border-bg-surface rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-sm font-semibold mb-2 text-text-heading"
                  htmlFor="company"
                >
                  Company *
                </label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  className="w-full border-2 border-bg-surface rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-semibold mb-2 text-text-heading"
                  htmlFor="country"
                >
                  Country *
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  className="w-full border-2 border-bg-surface rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  required
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-semibold mb-2 text-text-heading"
                htmlFor="subject"
              >
                Subject *
              </label>
              <select
                name="subject"
                id="subject"
                className="w-full border-2 border-bg-surface rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white"
                required
              >
                <option value="">Please select...</option>
                <option value="Quote Request">Quote Request</option>
                <option value="Private Label Inquiry">Private Label Inquiry</option>
                <option value="Distribution Partnership">Distribution Partnership</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>
            </div>
            <div>
              <label
                className="block text-sm font-semibold mb-2 text-text-heading"
                htmlFor="message"
              >
                Message *
              </label>
              <textarea
                name="message"
                id="message"
                rows={5}
                className="w-full border-2 border-bg-surface rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn-primary w-full md:w-auto"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* CTA Strip */}
      <CTAStrip />

      {/* Footer */}
      <Footer />
    </div>
  );
}
