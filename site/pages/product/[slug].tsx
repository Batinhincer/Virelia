import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import CTAButton from "@/components/CTAButton";
import CTAStrip from "@/components/CTAStrip";
import ProductCard from "@/components/ProductCard";
import InquiryForm from "@/components/InquiryForm";
import { ProductSchema, BreadcrumbSchema } from "@/components/SEO";
import { getProductBySlug, getCategorySlug, getRelatedProducts } from "@/data/products";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://frezya.nl';

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
  const relatedProducts = getRelatedProducts(product.slug, product.category, 4);
  const pageUrl = `${SITE_URL}/product/${product.slug}`;
  
  // Compute OG image URL with null safety
  const getOgImage = (): string => {
    if (!product.image) {
      return `${SITE_URL}/hero1.jpg`;
    }
    return product.image.startsWith('http') 
      ? product.image 
      : `${SITE_URL}${product.image}`;
  };
  const ogImage = getOgImage();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: product.category, href: `/products/${categorySlug}` },
    { label: product.title },
  ];

  const scrollToInquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    const inquirySection = document.getElementById("inquiry");
    if (inquirySection) {
      inquirySection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text">
      <Head>
        <title>{product.title} | Virelia</title>
        <meta name="description" content={product.shortDesc} />
        <link rel="canonical" href={pageUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content="product" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={`${product.title} | Virelia`} />
        <meta property="og:description" content={product.shortDesc} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Virelia" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={`${product.title} | Virelia`} />
        <meta name="twitter:description" content={product.shortDesc} />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      {/* JSON-LD Structured Data */}
      <ProductSchema
        name={product.title}
        description={product.longDesc}
        image={product.image}
        category={product.category}
        sku={product.slug}
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Header />

      <div className="container-custom py-12 mt-[80px]">
        <Breadcrumb
          items={breadcrumbItems}
        />

        {/* Premium B2B Product Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mt-10">
          {/* Left: Large Product Image */}
          <div className="relative">
            <div className="sticky top-24">
              <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-soft-lg">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right: Product Information */}
          <div>
            {/* Category Badge */}
            <div className="mb-6">
              <Link href={`/products/${categorySlug}`}>
                <span className="inline-block bg-secondary-light text-primary text-sm font-semibold px-4 py-2 rounded-full hover:bg-secondary transition-colors cursor-pointer">
                  {product.category}
                </span>
              </Link>
            </div>

            {/* Product Title */}
            <h1 className="text-h1 font-bold text-text-heading mb-6">
              {product.title}
            </h1>

            {/* Short B2B Description */}
            <p className="text-xl text-text-muted mb-8 leading-relaxed">
              {product.shortDesc}
            </p>

            {/* Key Specifications Block */}
            {(product.packaging || product.shelfLife || product.moq || product.origin || product.certifications || product.hsCode) && (
              <div className="bg-bg-surface rounded-2xl p-6 lg:p-8 mb-8 shadow-soft">
                <h3 className="text-xl font-semibold text-text-heading mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Product Specifications
                </h3>
                <div className="space-y-4">
                  {product.packaging && (
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-primary uppercase tracking-wide mb-1">Packaging</span>
                      <span className="text-text leading-relaxed">{product.packaging}</span>
                    </div>
                  )}
                  {product.shelfLife && (
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-primary uppercase tracking-wide mb-1">Shelf Life</span>
                      <span className="text-text">{product.shelfLife}</span>
                    </div>
                  )}
                  {product.moq && (
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-primary uppercase tracking-wide mb-1">Minimum Order Quantity</span>
                      <span className="text-text">{product.moq}</span>
                    </div>
                  )}
                  {product.origin && (
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-primary uppercase tracking-wide mb-1">Origin</span>
                      <span className="text-text">{product.origin}</span>
                    </div>
                  )}
                  {product.certifications && product.certifications.length > 0 && (
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-primary uppercase tracking-wide mb-1">Certifications</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {product.certifications.map((cert) => (
                          <span key={cert} className="inline-block bg-white px-3 py-1 rounded-full text-sm font-medium text-primary border border-primary-light">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {product.hsCode && (
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-primary uppercase tracking-wide mb-1">HS Code</span>
                      <span className="text-text font-mono">{product.hsCode}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Primary CTA: Request a Quote */}
            <div className="mb-8">
              <button
                onClick={scrollToInquiry}
                className="w-full btn-primary text-lg py-4 shadow-soft-lg hover:shadow-soft"
              >
                Request a Quote
              </button>
            </div>

            {/* Product Description */}
            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-semibold text-text-heading mb-4">About This Product</h3>
              <p className="text-text leading-relaxed">{product.longDesc}</p>
            </div>

            {/* Additional Info Box */}
            <div className="mt-8 bg-white p-6 rounded-2xl border-2 border-bg-surface">
              <h4 className="font-semibold text-text-heading mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                B2B Services Available
              </h4>
              <ul className="list-disc list-inside space-y-2 text-text-muted">
                <li>Custom packaging and private labeling</li>
                <li>Flexible delivery schedules</li>
                <li>Product samples available</li>
                <li>Technical documentation and COA provided</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Inquiry Form Section */}
        <div className="mt-20">
          <InquiryForm productName={product.title} productSlug={product.slug} />
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-h2 font-bold text-text-heading mb-4">Related Products</h2>
              <p className="text-lg text-text-muted">
                Explore more products from our {product.category} collection
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.slug} product={relatedProduct} />
              ))}
            </div>
            <div className="text-center mt-10">
              <CTAButton href={`/products/${categorySlug}`}>
                View All {product.category}
              </CTAButton>
            </div>
          </section>
        )}
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
