import Head from "next/head";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTAStrip from "@/components/CTAStrip";
import Breadcrumb from "@/components/Breadcrumb";
import InquiryForm from "@/components/InquiryForm";
import { SITE_URL } from "@/lib/constants";

export default function ContactPage() {
  const router = useRouter();
  const { product, category, source } = router.query;

  // Parse query params (they might be strings or string arrays)
  const productName = Array.isArray(product) ? product[0] : product;
  const productCategory = Array.isArray(category) ? category[0] : category;
  const sourceParam = Array.isArray(source) ? source[0] : source;

  // Determine if we have product context from query params
  const hasProductContext = productName && productName.trim() !== "";

  const pageUrl = `${SITE_URL}/contact`;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-bg text-text">
      <Head>
        <title>Contact Us | Frezya – Premium Mediterranean Food Exporter</title>
        <meta
          name="description"
          content="Get in touch with Frezya for B2B inquiries about premium Mediterranean food products. Request quotes, ask about private labeling, or discuss distribution partnerships."
        />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content="Contact Us | Frezya – Premium Mediterranean Food Exporter" />
        <meta
          property="og:description"
          content="Get in touch with Frezya for B2B inquiries about premium Mediterranean food products."
        />
        <meta property="og:image" content={`${SITE_URL}/hero1.jpg`} />
        <meta property="og:site_name" content="Frezya" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content="Contact Us | Frezya" />
        <meta
          name="twitter:description"
          content="Get in touch with Frezya for B2B inquiries about premium Mediterranean food products."
        />
        <meta name="twitter:image" content={`${SITE_URL}/hero1.jpg`} />
      </Head>

      <Header />

      {/* Page Hero */}
      <section className="bg-primary text-white pt-32 pb-16">
        <div className="container-custom">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="text-4xl lg:text-h1 font-bold mb-4 mt-6">Contact Us</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Have questions about our products or interested in becoming a distribution partner?
            We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-custom py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-text-heading mb-4">Get in Touch</h2>
              <p className="text-text-muted mb-6">
                Our team is ready to assist you with any inquiries about our premium Mediterranean products.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-text-heading">Email</h3>
                  <a
                    href="mailto:batinhincer@frezya.nl"
                    className="text-primary hover:text-primary-dark transition-colors"
                  >
                    batinhincer@frezya.nl
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-text-heading">Phone</h3>
                  <a
                    href="tel:+905077075407"
                    className="text-primary hover:text-primary-dark transition-colors"
                  >
                    +90 507 707 54 07
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-text-heading">Address</h3>
                  <p className="text-text-muted">
                    Frezya Dış Ticaret Ltd. Şti.
                    <br />
                    Akpınar, Şht. Mümin Mutlu Sk. No:7 Kat:2, Ofis:36
                    <br />
                    16160 Osmangazi/Bursa, Türkiye
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-bg-surface p-6 rounded-2xl">
              <h3 className="font-medium text-text-heading mb-2">Business Hours</h3>
              <p className="text-text-muted text-sm">
                Monday - Friday: 9:00 AM - 6:00 PM (Turkey Time)
                <br />
                Saturday - Sunday: Closed
              </p>
              <p className="text-xs text-text-light mt-3">
                We respond to all inquiries within 24 business hours.
              </p>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-2">
            {/* Product Context from Query Params */}
            {hasProductContext && (
              <div
                className="mb-6 p-4 bg-secondary-light border border-secondary rounded-xl"
                data-testid="contact-product-context"
              >
                <p className="text-sm text-text-heading font-medium flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  You&apos;re contacting us about:{" "}
                  <strong className="ml-1" data-testid="contact-product-name">
                    {productName}
                  </strong>
                  {productCategory && (
                    <span className="ml-1 text-text-muted" data-testid="contact-product-category">
                      – {productCategory}
                    </span>
                  )}
                </p>
              </div>
            )}

            <InquiryForm
              productName={hasProductContext ? productName : undefined}
              productCategory={hasProductContext ? productCategory : undefined}
              title="Send Us a Message"
              subtitle={
                hasProductContext
                  ? `Fill out the form below to inquire about ${productName}. Our team will get back to you with pricing and availability.`
                  : "Fill out the form below and our team will get back to you within 24 hours."
              }
              isGeneralContact={true}
            />
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <CTAStrip />

      {/* Footer */}
      <Footer />
    </div>
  );
}
