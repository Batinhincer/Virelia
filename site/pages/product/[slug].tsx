import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Header from "@/components/Header";
import CTAButton from "@/components/CTAButton";
import { getProductBySlug } from "@/data/products";

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug || typeof slug !== "string") return null;

  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto py-32 px-6 text-center mt-[72px]">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Product not found
          </h1>
          <p className="text-gray-600 mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <CTAButton href="/#products">Browse All Products</CTAButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Head>
        <title>{product.title} | Virelia</title>
        <meta name="description" content={product.shortDesc} />
      </Head>

      <Header />

      <div className="max-w-6xl mx-auto py-16 px-6 mt-[72px]">
        <Link
          href="/#products"
          className="text-green-700 hover:text-green-600 mb-6 inline-flex items-center font-medium"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-12 mt-8">
          <div>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto rounded-xl shadow-lg object-cover"
            />
          </div>

          <div>
            <div className="mb-4">
              <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">{product.shortDesc}</p>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">{product.longDesc}</p>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Interested in this product?
              </h3>
              <div className="space-y-3">
                <CTAButton href="#contact">Request a Quote</CTAButton>
                <div className="text-sm text-gray-600 mt-4">
                  <p>Contact us for:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Pricing and minimum order quantities</li>
                    <li>Custom packaging options</li>
                    <li>Delivery schedules and logistics</li>
                    <li>Product specifications and certifications</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section on Product Page */}
        <section
          id="contact"
          className="bg-green-800 text-white py-12 px-8 rounded-xl shadow-lg mt-16"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-semibold mb-6">Get in Touch</h3>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-xl font-medium mb-4">Contact Information</h4>
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
                <h4 className="text-xl font-medium mb-4">Quick Actions</h4>
                <div className="space-y-3">
                  <a
                    href="mailto:batinhincer@gmail.com"
                    className="block bg-white text-green-700 py-2 px-4 rounded-md hover:bg-green-50 transition text-center font-medium"
                  >
                    Email Us
                  </a>
                  <a
                    href="tel:+905077075407"
                    className="block bg-white text-green-700 py-2 px-4 rounded-md hover:bg-green-50 transition text-center font-medium"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
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
