import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import CTAButton from "@/components/CTAButton";
import CTAStrip from "@/components/CTAStrip";
import { getProductBySlug, getCategorySlug } from "@/data/products";

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug || typeof slug !== "string") return null;

  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-bg">
        <Header />
        <div className="max-w-4xl mx-auto py-32 px-6 text-center mt-[80px]">
          <h1 className="text-h2 font-bold text-text-heading mb-6">
            Product not found
          </h1>
          <p className="text-text-muted mb-10 text-lg">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <CTAButton href="/#products">Browse All Products</CTAButton>
        </div>
      </div>
    );
  }

  const categorySlug = getCategorySlug(product.category);

  return (
    <div className="min-h-screen bg-bg text-text">
      <Head>
        <title>{product.title} | Virelia</title>
        <meta name="description" content={product.shortDesc} />
      </Head>

      <Header />

      <div className="container-custom py-12 mt-[80px]">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: product.category, href: `/products/${categorySlug}` },
            { label: product.title },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mt-10">
          <div>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto rounded-3xl shadow-soft-lg object-cover"
            />
          </div>

          <div>
            <div className="mb-6">
              <span className="inline-block bg-secondary-light text-primary text-sm font-semibold px-4 py-2 rounded-full">
                {product.category}
              </span>
            </div>
            <h1 className="text-h1 font-bold text-text-heading mb-6">
              {product.title}
            </h1>
            <p className="text-2xl text-text-muted mb-8 leading-relaxed">{product.shortDesc}</p>

            <div className="prose prose-lg max-w-none">
              <p className="text-text text-lg leading-relaxed">{product.longDesc}</p>
            </div>

            <div className="mt-10 pt-10 border-t-2 border-bg-surface">
              <h3 className="text-2xl font-semibold text-text-heading mb-6">
                Interested in this product?
              </h3>
              <div className="space-y-4">
                <CTAButton href="#contact">Request a Quote</CTAButton>
                <div className="text-base text-text-muted mt-6 bg-bg-surface p-6 rounded-2xl">
                  <p className="font-semibold text-text-heading mb-3">Contact us for:</p>
                  <ul className="list-disc list-inside space-y-2">
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
          className="bg-primary text-white py-16 px-8 lg:px-12 rounded-3xl shadow-soft-lg mt-20"
        >
          <div className="max-w-5xl mx-auto">
            <h3 className="text-h2 font-semibold mb-10 text-center">Get in Touch</h3>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-5">
                <h4 className="text-2xl font-medium mb-6 text-secondary-light">Contact Information</h4>
                <p className="mb-3 text-lg">Virelia Ticaret Limited Şirketi</p>
                <p className="mb-3 text-lg leading-relaxed">
                  Balat Mah. Bedesten Sok. No:6
                  <br />
                  Nilüfer, Bursa, Turkey
                </p>
                <p className="mb-3">
                  <a
                    href="tel:+905077075407"
                    className="hover:text-secondary-light transition-colors inline-flex items-center text-lg"
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
                    className="hover:text-secondary-light transition-colors inline-flex items-center text-lg"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    batinhincer@gmail.com
                  </a>
                </p>
              </div>
              <div className="space-y-5">
                <h4 className="text-2xl font-medium mb-6 text-secondary-light">Quick Actions</h4>
                <div className="space-y-4">
                  <a
                    href="mailto:batinhincer@gmail.com"
                    className="block bg-white text-primary py-3 px-6 rounded-2xl hover:bg-secondary-light transition-all text-center font-semibold shadow-soft hover:shadow-soft-lg"
                  >
                    Email Us
                  </a>
                  <a
                    href="tel:+905077075407"
                    className="block bg-white text-primary py-3 px-6 rounded-2xl hover:bg-secondary-light transition-all text-center font-semibold shadow-soft hover:shadow-soft-lg"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Strip */}
      <CTAStrip />

      {/* Footer */}
      <footer className="bg-text-heading text-bg py-12 mt-20">
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
