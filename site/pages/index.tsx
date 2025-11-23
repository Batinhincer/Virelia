import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";

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
        <meta name="description" content="Discover Virelia's premium selection of olive oil, pomegranate molasses, and more. Mediterranean taste, globally delivered." />
      </Head>

      {/* Header */}
      <header className="bg-green-800 text-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold tracking-tight">Virelia</h1>
          <nav className="space-x-8 text-sm font-medium flex items-center">
            <a href="#about" className="text-white hover:text-green-200 transition-colors duration-200">About Us</a>
            <div className="relative group">
              <button className="text-white hover:text-green-200 transition-colors duration-200">Products</button>
              <div className="absolute left-0 mt-2 w-56 bg-white text-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                <Link href="/product/olive-oil" className="block px-4 py-2 hover:bg-gray-100">Olive Oil</Link>
                <Link href="/product/pomegranate-molasses" className="block px-4 py-2 hover:bg-gray-100">Pomegranate Molasses</Link>
                <Link href="/product/pepper-paste" className="block px-4 py-2 hover:bg-gray-100">Pepper Paste</Link>
                <Link href="/product/coffee-beans" className="block px-4 py-2 hover:bg-gray-100">Whole Coffee Beans</Link>
                <Link href="/product/ground-coffee" className="block px-4 py-2 hover:bg-gray-100">Ground Coffee</Link>
              </div>
            </div>
            <a href="#contact" className="text-white hover:text-green-200 transition-colors duration-200">Contact</a>
          </nav>
        </div>
      </header>

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
              <h2 className="text-4xl text-white font-bold mb-4">{slide.title}</h2>
              {slide.subtitle && <p className="text-white text-lg">{slide.subtitle}</p>}
            </div>
          </motion.div>
        ))}
      </section>

      {/* Back to Products Button */}
      <div className="text-center mt-8">
        <Link href="/#products" className="inline-block bg-green-700 text-white py-2 px-6 rounded-md hover:bg-green-600 transition">
          ← Back to Products
        </Link>
      </div>

      {/* Contact Section */}
      <section id="contact" className="bg-green-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-3xl font-semibold mb-6">Contact Us</h3>
          <p className="mb-4">Virelia Ticaret Limited Şirketi</p>
          <p className="mb-4">Balat Mah. Bedesten Sok. No:6 Nilüfer, Bursa, Turkey</p>
          <p className="mb-4">Phone: +90 507 707 5407</p>
          <p className="mb-4">Email: info@virelia.com</p>

          <form
            action="https://formspree.io/f/xvgranqj"
            method="POST"
            className="mt-8 grid grid-cols-1 gap-6 bg-white text-gray-900 p-6 rounded-xl shadow-md"
          >
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
              <input type="text" name="name" id="name" className="w-full border border-gray-300 rounded-md px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
              <input type="email" name="email" id="email" className="w-full border border-gray-300 rounded-md px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="message">Message</label>
              <textarea name="message" id="message" rows={4} className="w-full border border-gray-300 rounded-md px-3 py-2" required></textarea>
            </div>
            <button type="submit" className="bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-600 transition">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
}
