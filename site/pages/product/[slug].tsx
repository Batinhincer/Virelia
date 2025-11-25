import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import CTAButton from "@/components/CTAButton";
import CTAStrip from "@/components/CTAStrip";
import ProductCard from "@/components/ProductCard";
import InquiryForm from "@/components/InquiryForm";
import { ProductSchema, BreadcrumbSchema } from "@/components/SEO";
import { products, getProductBySlug, getCategorySlug, getRelatedProducts, Product } from "@/data/products";
import { fetchProductBySlug, fetchProductsByCategory } from "@/lib/sanity";
import { PLACEHOLDER_IMAGE, SITE_URL } from "@/lib/constants";

// Unified product type for this page
interface ProductData {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  categorySlug: string;
  image: string;
  packaging: string | null;
  shelfLife: string | null;
  moq: string | null;
  origin: string | null;
  certifications: string[];
  hsCode: string | null;
}

// Related product type (simpler)
interface RelatedProduct {
  slug: string;
  title: string;
  shortDesc: string;
  category: string;
  image: string;
}

interface ProductPageProps {
  product: ProductData | null;
  relatedProducts: RelatedProduct[];
}

/** Spec row component for the specs table */
function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start py-3 border-b border-bg-surface last:border-b-0">
      <dt className="text-sm font-semibold text-primary uppercase tracking-wide sm:w-40 flex-shrink-0 mb-1 sm:mb-0">
        {label}
      </dt>
      <dd className="text-text leading-relaxed flex-1">{value}</dd>
    </div>
  );
}

/** Certification badge component */
function CertificationBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary-light text-white border border-primary shadow-sm">
      <svg className="w-3.5 h-3.5 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
      {name}
    </span>
  );
}

export default function ProductPage({ product, relatedProducts }: ProductPageProps) {
  if (!product) {
    return (
      <div className="min-h-screen bg-bg">
        <Header />
        <div className="max-w-4xl mx-auto py-32 px-6 text-center mt-[80px]">
          <div className="mb-8">
            <svg className="w-24 h-24 mx-auto text-text-muted opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-h2 font-bold text-text-heading mb-6">
            Product Not Found
          </h1>
          <p className="text-text-muted mb-10 text-lg max-w-md mx-auto">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <CTAButton href="/#products">Browse All Products</CTAButton>
            <CTAButton href="/" variant="secondary">Back to Home</CTAButton>
          </div>
        </div>
      </div>
    );
  }

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
    { label: "Products", href: "/#products" },
    { label: product.category, href: `/products/${product.categorySlug}` },
    { label: product.title },
  ];

  const scrollToInquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    const inquirySection = document.getElementById("inquiry");
    if (inquirySection) {
      inquirySection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Check if we have any specs to show
  const hasSpecs = product.packaging || product.shelfLife || product.moq || product.origin || product.hsCode || (product.certifications && product.certifications.length > 0);

  return (
    <div className="min-h-screen bg-bg text-text">
      <Head>
        <title>{product.title} | Frezya</title>
        <meta name="description" content={product.shortDescription} />
        <link rel="canonical" href={pageUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content="product" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={`${product.title} | Frezya`} />
        <meta property="og:description" content={product.shortDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Frezya" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={`${product.title} | Frezya`} />
        <meta name="twitter:description" content={product.shortDescription} />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      {/* JSON-LD Structured Data */}
      <ProductSchema
        name={product.title}
        description={product.longDescription}
        image={product.image}
        category={product.category}
        sku={product.slug}
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Header />

      <div className="container-custom py-12 mt-[80px]">
        <Breadcrumb items={breadcrumbItems} />

        {/* Hero Section */}
        <section className="mt-10 mb-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Large Product Image */}
            <div className="relative">
              <div className="sticky top-24">
                <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-soft-lg bg-bg-surface">
                  <Image
                    src={product.image || PLACEHOLDER_IMAGE}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Right: Product Hero Info */}
            <div>
              {/* Category Badge */}
              <div className="mb-4">
                <Link href={`/products/${product.categorySlug}`} data-testid="category-badge">
                  <span className="inline-flex items-center bg-secondary-light text-primary text-sm font-semibold px-4 py-2 rounded-full hover:bg-secondary transition-colors cursor-pointer">
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {product.category}
                  </span>
                </Link>
              </div>

              {/* Product Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-h1 font-bold text-text-heading mb-6 leading-tight">
                {product.title}
              </h1>

              {/* Short Description */}
              <p className="text-lg lg:text-xl text-text-muted mb-8 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Primary CTA: Request Product Information */}
              <div className="mb-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={scrollToInquiry}
                  className="w-full sm:w-auto btn-primary text-lg px-8 py-4 shadow-soft-lg hover:shadow-soft inline-flex items-center justify-center"
                  data-testid="request-info-cta"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Request Product Information
                </button>
                <Link
                  href={`/products/${product.categorySlug}`}
                  className="w-full sm:w-auto btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center"
                  data-testid="view-category-cta"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  View All {product.category}
                </Link>
              </div>

              {/* Quick Stats Bar */}
              {(product.moq || product.origin) && (
                <div className="flex flex-wrap gap-4 mb-8">
                  {product.moq && (
                    <div className="bg-bg-surface px-4 py-3 rounded-xl">
                      <span className="text-xs text-text-muted uppercase tracking-wide block mb-0.5">MOQ</span>
                      <span className="text-sm font-semibold text-text-heading">{product.moq}</span>
                    </div>
                  )}
                  {product.origin && (
                    <div className="bg-bg-surface px-4 py-3 rounded-xl">
                      <span className="text-xs text-text-muted uppercase tracking-wide block mb-0.5">Origin</span>
                      <span className="text-sm font-semibold text-text-heading">{product.origin}</span>
                    </div>
                  )}
                  {product.shelfLife && (
                    <div className="bg-bg-surface px-4 py-3 rounded-xl">
                      <span className="text-xs text-text-muted uppercase tracking-wide block mb-0.5">Shelf Life</span>
                      <span className="text-sm font-semibold text-text-heading">{product.shelfLife}</span>
                    </div>
                  )}
                </div>
              )}

              {/* B2B Services Info */}
              <div className="bg-white p-5 rounded-2xl border-2 border-bg-surface">
                <h4 className="font-semibold text-text-heading mb-3 flex items-center text-sm">
                  <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  B2B Services Available
                </h4>
                <ul className="grid sm:grid-cols-2 gap-2 text-sm text-text-muted">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Custom packaging
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Private labeling
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Flexible delivery
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    COA & documentation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Specifications Section */}
        {hasSpecs && (
          <section className="mb-16">
            <div className="bg-bg-surface rounded-3xl p-6 lg:p-10 shadow-soft">
              <h2 className="text-2xl font-bold text-text-heading mb-8 flex items-center">
                <svg className="w-7 h-7 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Product Specifications
              </h2>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left column: Key specs */}
                <div>
                  <dl className="divide-y divide-white">
                    {product.packaging && <SpecRow label="Packaging" value={product.packaging} />}
                    {product.shelfLife && <SpecRow label="Shelf Life" value={product.shelfLife} />}
                    {product.moq && <SpecRow label="MOQ" value={product.moq} />}
                    {product.origin && <SpecRow label="Origin" value={product.origin} />}
                    {product.hsCode && <SpecRow label="HS Code" value={product.hsCode} />}
                  </dl>
                </div>
                
                {/* Right column: Certifications */}
                {product.certifications && product.certifications.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-primary uppercase tracking-wide mb-4">
                      Certifications
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.certifications.map((cert) => (
                        <CertificationBadge key={cert} name={cert} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Long Description Section */}
        <section className="mb-16">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-text-heading mb-6">About This Product</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-text leading-relaxed whitespace-pre-line">
                {product.longDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Inquiry Form Section */}
        <section className="mb-16">
          <InquiryForm
            productName={product.title}
            productSlug={product.slug}
            productCategory={product.category}
          />
        </section>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-20" data-testid="related-products-section">
            <div className="text-center mb-12">
              <h2 className="text-h2 font-bold text-text-heading mb-4">Related Products</h2>
              <p className="text-lg text-text-muted">
                Explore more products from our {product.category} collection
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" data-testid="related-products-grid">
              {relatedProducts.slice(0, 3).map((relatedProduct) => (
                <ProductCard key={relatedProduct.slug} product={relatedProduct} />
              ))}
            </div>
            <div className="text-center mt-10">
              <CTAButton href={`/products/${product.categorySlug}`}>
                View All {product.category}
              </CTAButton>
            </div>
          </section>
        )}
      </div>

      {/* CTA Strip */}
      <CTAStrip />

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Transform Sanity product to unified format
function transformSanityProduct(sanityProduct: {
  slug: string;
  title: string;
  shortDescription?: string;
  longDescription?: string;
  category?: string;
  categorySlug?: string;
  image?: string;
  packaging?: string;
  shelfLife?: string;
  moq?: string;
  origin?: string;
  certifications?: string[];
  hsCode?: string;
}): ProductData {
  return {
    slug: sanityProduct.slug,
    title: sanityProduct.title,
    shortDescription: sanityProduct.shortDescription || '',
    longDescription: sanityProduct.longDescription || '',
    category: sanityProduct.category || '',
    categorySlug: sanityProduct.categorySlug || '',
    image: sanityProduct.image || PLACEHOLDER_IMAGE,
    packaging: sanityProduct.packaging ?? null,
    shelfLife: sanityProduct.shelfLife ?? null,
    moq: sanityProduct.moq ?? null,
    origin: sanityProduct.origin ?? null,
    certifications: sanityProduct.certifications || [],
    hsCode: sanityProduct.hsCode ?? null,
  };
}

// Transform local product to unified format
function transformLocalProduct(localProduct: Product, categorySlug: string): ProductData {
  return {
    slug: localProduct.slug,
    title: localProduct.title,
    shortDescription: localProduct.shortDesc,
    longDescription: localProduct.longDesc,
    category: localProduct.category,
    categorySlug: categorySlug,
    image: localProduct.image,
    packaging: localProduct.packaging ?? null,
    shelfLife: localProduct.shelfLife ?? null,
    moq: localProduct.moq ?? null,
    origin: localProduct.origin ?? null,
    certifications: localProduct.certifications || [],
    hsCode: localProduct.hsCode ?? null,
  };
}

// Transform to related product format
function transformToRelatedProduct(p: Product): RelatedProduct {
  return {
    slug: p.slug,
    title: p.title,
    shortDesc: p.shortDesc,
    category: p.category,
    image: p.image,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Generate paths from local data (always available)
  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ProductPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  
  // Try to fetch from Sanity first
  const sanityProduct = await fetchProductBySlug(slug);
  
  if (sanityProduct) {
    // Get related products from Sanity if available
    const sanityRelatedProducts = await fetchProductsByCategory(sanityProduct.categorySlug || '');
    
    const relatedProducts: RelatedProduct[] = (sanityRelatedProducts || [])
      .filter((p: { slug: string }) => p.slug !== slug)
      .slice(0, 3)
      .map((p: { slug: string; title: string; shortDescription?: string; category?: string; image?: string }) => ({
        slug: p.slug,
        title: p.title,
        shortDesc: p.shortDescription || '',
        category: p.category || '',
        image: p.image || PLACEHOLDER_IMAGE,
      }));
    
    return {
      props: {
        product: transformSanityProduct(sanityProduct),
        relatedProducts,
      },
    };
  }
  
  // Fallback to local data
  const localProduct = getProductBySlug(slug);
  
  if (!localProduct) {
    return {
      props: {
        product: null,
        relatedProducts: [],
      },
    };
  }
  
  const categorySlug = getCategorySlug(localProduct.category);
  const localRelatedProducts = getRelatedProducts(localProduct.slug, localProduct.category, 3);
  
  return {
    props: {
      product: transformLocalProduct(localProduct, categorySlug),
      relatedProducts: localRelatedProducts.map(transformToRelatedProduct),
    },
  };
};
