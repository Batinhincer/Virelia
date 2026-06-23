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
import {
  fetchProductBySlug,
  fetchProductsByCategory,
  PortableTextBlock,
  isPortableTextArray,
  extractPlainTextFromPortableText,
  getAllProductSlugs,
  getLocalProductBySlug,
  getLocalCategorySlug,
  getLocalRelatedProducts,
  type LocalProduct,
} from "@/lib/sanity";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { PLACEHOLDER_IMAGE, SITE_URL } from "@/lib/constants";

// Unified product type for this page
interface ProductData {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  longDescriptionRich: PortableTextBlock[] | null; // Portable Text from Sanity, null for local products
  category: string;
  categorySlug: string;
  image: string;
  packaging: string | null;
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
  return (
    <div className="min-h-screen bg-bg text-text">
      <Head>
        <title>{product.title} | Virelia</title>
        <meta name="description" content={product.shortDescription} />
        <link rel="canonical" href={pageUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content="product" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={`${product.title} | Virelia`} />
        <meta property="og:description" content={product.shortDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Virelia" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={`${product.title} | Virelia`} />
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
                <a
                  href={`https://wa.me/905077075407?text=${encodeURIComponent(`Hello, I am interested in ${product.title}. Could you please provide pricing and availability information?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-lg px-8 py-4 inline-flex items-center justify-center rounded-xl font-semibold bg-[#25D366] hover:bg-[#1ebe5d] text-white transition-colors shadow-soft"
                  data-testid="whatsapp-cta"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us
                </a>
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
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Accredited lab analysis on request
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Long Description Section */}
        <section className="mb-16" data-testid="product-long-description">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-text-heading mb-6">About This Product</h2>
            {/* Render rich text from Sanity or plain text fallback */}
            {product.longDescriptionRich && product.longDescriptionRich.length > 0 ? (
              <div data-testid="product-rich-description">
                <PortableTextRenderer content={product.longDescriptionRich} />
              </div>
            ) : (
              <div className="prose prose-lg max-w-none">
                <p className="text-text leading-relaxed whitespace-pre-line">
                  {product.longDescription}
                </p>
              </div>
            )}
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
  longDescription?: string | PortableTextBlock[]; // Can be string (plain text) or Portable Text blocks
  category?: string;
  categorySlug?: string;
  image?: string;
  packaging?: string;
  moq?: string;
  origin?: string;
  certifications?: string[];
  hsCode?: string;
}): ProductData {
  // Handle longDescription - it may be Portable Text (array) or plain string
  let longDescription = '';
  let longDescriptionRich: PortableTextBlock[] | null = null;
  
  if (isPortableTextArray(sanityProduct.longDescription)) {
    // It's Portable Text blocks from Sanity
    longDescriptionRich = sanityProduct.longDescription;
    // Create plain text fallback from Portable Text using utility function
    longDescription = extractPlainTextFromPortableText(sanityProduct.longDescription);
  } else if (typeof sanityProduct.longDescription === 'string') {
    longDescription = sanityProduct.longDescription;
    longDescriptionRich = null;
  }
  
  return {
    slug: sanityProduct.slug,
    title: sanityProduct.title,
    shortDescription: sanityProduct.shortDescription || '',
    longDescription,
    longDescriptionRich,
    category: sanityProduct.category || '',
    categorySlug: sanityProduct.categorySlug || '',
    image: sanityProduct.image || PLACEHOLDER_IMAGE,
    packaging: sanityProduct.packaging ?? null,
    moq: sanityProduct.moq ?? null,
    origin: sanityProduct.origin ?? null,
    certifications: sanityProduct.certifications || [],
    hsCode: sanityProduct.hsCode ?? null,
  };
}

// Transform local product to unified format
function transformLocalProduct(localProduct: LocalProduct, categorySlug: string): ProductData {
  return {
    slug: localProduct.slug,
    title: localProduct.title,
    shortDescription: localProduct.shortDesc,
    longDescription: localProduct.longDesc,
    longDescriptionRich: null, // Local products don't have Portable Text
    category: localProduct.category,
    categorySlug: categorySlug,
    image: localProduct.image,
    packaging: localProduct.packaging ?? null,
    moq: localProduct.moq ?? null,
    origin: localProduct.origin ?? null,
    certifications: localProduct.certifications || [],
    hsCode: localProduct.hsCode ?? null,
  };
}

// Transform to related product format
function transformToRelatedProduct(p: LocalProduct): RelatedProduct {
  return {
    slug: p.slug,
    title: p.title,
    shortDesc: p.shortDesc,
    category: p.category,
    image: p.image,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Use centralized helper to get slugs from Sanity (with local fallback)
  const slugs = await getAllProductSlugs();
  const paths = slugs.map((slug) => ({
    params: { slug },
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
    
    const product = transformSanityProduct(sanityProduct);
    
    return {
      props: {
        product: {
          ...product,
          // Normalize: ensure longDescriptionRich is never undefined for JSON serialization
          longDescriptionRich: product.longDescriptionRich ?? null,
        },
        relatedProducts,
      },
    };
  }
  
  // Fallback to local data
  const localProduct = getLocalProductBySlug(slug);
  
  // If no product found in either Sanity or local data, return 404
  if (!localProduct) {
    return {
      notFound: true,
    };
  }
  
  const categorySlug = getLocalCategorySlug(localProduct.category);
  const localRelatedProducts = getLocalRelatedProducts(localProduct.slug, localProduct.category, 3);
  const product = transformLocalProduct(localProduct, categorySlug);
  
  return {
    props: {
      product: {
        ...product,
        // Normalize: ensure longDescriptionRich is never undefined for JSON serialization
        longDescriptionRich: product.longDescriptionRich ?? null,
      },
      relatedProducts: localRelatedProducts.map(transformToRelatedProduct),
    },
  };
};
