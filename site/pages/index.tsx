import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Header from "@/components/Header";
import SectionHeader from "@/components/SectionHeader";
import ProductGrid from "@/components/ProductGrid";
import CTAButton from "@/components/CTAButton";
import { products, categories, getProductsByCategory } from "@/data/products";

const slides = [
  {
    title: "Inspired by Nature. Crafted with Passion.",
    subtitle: "Mediterranean food products for global markets.",
    image: "/hero1.jpg",
  },
  {
    title: "Premium Quality from the Mediterranean",
    subtitle: "We deliver excellence in every product.",
    image: "/hero2.jpg",
  },
  {
    title: "Trusted Worldwide",
    subtitle: "Sustainable, long-term partnerships across Europe and beyond.",
    image: "/hero3.jpg",
  },
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text">
      <Head>
        <title>Virelia – Premium Mediterranean Food Exporter</title>
        <meta
          name="description"
          content="Discover Virelia's premium selection of olive oil, pomegranate molasses, and more. Mediterranean taste, globally delivered."
        />
      </Head>

      <Header />

      {/* Hero Section with Slide */}
      <section className="relative h-[600px] mt-[80px] overflow-hidden">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === current ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url('${slide.image}')` }}
          >
            <div className="bg-gradient-to-br from-primary/90 to-primary-dark/85 backdrop-blur-sm p-12 lg:p-16 rounded-3xl text-center max-w-4xl mx-6 shadow-soft-lg">
              <h2 className="text-4xl lg:text-5xl text-white font-bold mb-6 font-heading">
                {slide.title}
              </h2>
              {slide.subtitle && (
                <p className="text-white text-xl lg:text-2xl font-light leading-relaxed">
                  {slide.subtitle}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-bg-surface">
        <div className="container-custom">
          <SectionHeader
            title="About Virelia"
            subtitle="Your trusted partner for premium Mediterranean food products"
            centered
          />
          <div className="max-w-4xl mx-auto text-text leading-relaxed space-y-6 text-lg">
            <p>
              Virelia is a leading exporter of authentic Mediterranean food
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
              packaging options. Whether you're a distributor, restaurant chain,
              or specialty food retailer, Virelia is your gateway to authentic
              Mediterranean flavor.
            </p>
          </div>
          <div className="text-center mt-12 space-x-4">
            <CTAButton href="#contact">Request a Quote</CTAButton>
            <CTAButton href="mailto:batinhincer@gmail.com" variant="secondary">
              Contact Sales
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title="Our Product Range"
            subtitle="Explore our comprehensive selection of Mediterranean specialties"
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
            <CTAButton href="#contact">Get in Touch</CTAButton>
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
              <p className="mb-3 text-lg">Virelia Ticaret Limited Şirketi</p>
              <p className="mb-3 text-lg leading-relaxed">
                Balat Mah. Bedesten Sok. No:6
                <br />
                Nilüfer, Bursa, Turkey
              </p>
              <p className="mb-3">
                <a
                  href="tel:+905077075407"
                  className="hover:text-secondary-light transition-colors text-lg inline-flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +90 507 707 5407
                </a>
              </p>
              <p className="mb-3">
                <a
                  href="mailto:batinhincer@gmail.com"
                  className="hover:text-secondary-light transition-colors text-lg inline-flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  batinhincer@gmail.com
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
            <div>
              <label
                className="block text-sm font-semibold mb-2 text-text-heading"
                htmlFor="company"
              >
                Company
              </label>
              <input
                type="text"
                name="company"
                id="company"
                className="w-full border-2 border-bg-surface rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
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
