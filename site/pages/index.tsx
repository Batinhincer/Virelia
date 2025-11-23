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
    <div className="min-h-screen bg-white text-gray-800">
      <Head>
        <title>Virelia – Premium Mediterranean Food Exporter</title>
        <meta
          name="description"
          content="Discover Virelia's premium selection of olive oil, pomegranate molasses, and more. Mediterranean taste, globally delivered."
        />
      </Head>

      <Header />

      {/* Hero Section with Slide */}
      <section className="relative h-[500px] mt-[72px] overflow-hidden">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === current ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url('${slide.image}')` }}
          >
            <div className="bg-black bg-opacity-40 p-10 rounded-xl text-center">
              <h2 className="text-4xl text-white font-bold mb-4">
                {slide.title}
              </h2>
              {slide.subtitle && (
                <p className="text-white text-lg">{slide.subtitle}</p>
              )}
            </div>
          </motion.div>
        ))}
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            title="About Virelia"
            subtitle="Your trusted partner for premium Mediterranean food products"
            centered
          />
          <div className="max-w-3xl mx-auto text-gray-700 leading-relaxed space-y-4">
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
          <div className="text-center mt-8 space-x-4">
            <CTAButton href="#contact">Request a Quote</CTAButton>
            <CTAButton href="mailto:batinhincer@gmail.com" variant="secondary">
              Contact Sales
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            title="Our Product Range"
            subtitle="Explore our comprehensive selection of Mediterranean specialties"
            centered
          />

          {categories.map((category) => {
            const categoryProducts = getProductsByCategory(category);
            return (
              <div key={category} className="mb-16">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b-2 border-green-700">
                  {category}
                </h3>
                <ProductGrid products={categoryProducts} />
              </div>
            );
          })}

          <div className="text-center mt-12">
            <CTAButton href="#contact">Get in Touch</CTAButton>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-green-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-3xl font-semibold mb-6">Contact Us</h3>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-medium mb-4">Get in Touch</h4>
              <p className="mb-3">Virelia Ticaret Limited Şirketi</p>
              <p className="mb-3">
                Balat Mah. Bedesten Sok. No:6
                <br />
                Nilüfer, Bursa, Turkey
              </p>
              <p className="mb-3">
                <a
                  href="tel:+905077075407"
                  className="hover:text-green-200 transition-colors"
                >
                  Phone: +90 507 707 5407
                </a>
              </p>
              <p className="mb-3">
                <a
                  href="mailto:batinhincer@gmail.com"
                  className="hover:text-green-200 transition-colors"
                >
                  Email: batinhincer@gmail.com
                </a>
              </p>
            </div>
            <div>
              <h4 className="text-xl font-medium mb-4">Business Hours</h4>
              <p className="mb-2">Monday - Friday: 9:00 AM - 6:00 PM (EEST)</p>
              <p className="mb-4">Saturday - Sunday: Closed</p>
              <p className="text-sm text-green-200">
                For urgent inquiries, please call or email us directly.
              </p>
            </div>
          </div>

          <form
            action="https://formspree.io/f/xvgranqj"
            method="POST"
            className="mt-8 grid grid-cols-1 gap-6 bg-white text-gray-900 p-6 rounded-xl shadow-md"
          >
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email *
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="company"
              >
                Company
              </label>
              <input
                type="text"
                name="company"
                id="company"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="message"
              >
                Message *
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-green-700 text-white py-3 px-6 rounded-md hover:bg-green-600 transition font-medium"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="mb-2">
            &copy; {new Date().getFullYear()} Virelia Ticaret Limited Şirketi.
            All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Premium Mediterranean Food Products | B2B Export Solutions
          </p>
        </div>
      </footer>
    </div>
  );
}
