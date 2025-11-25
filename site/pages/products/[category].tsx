import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import CTAButton from "@/components/CTAButton";
import CTAStrip from "@/components/CTAStrip";
import { BreadcrumbSchema } from "@/components/SEO";
import {
  getCategoryBySlug,
  getProductsByCategory,
  categoryInfo,
  Product,
} from "@/data/products";
import {
  fetchCategoryBySlug,
  fetchProductsByCategory,
} from "@/lib/sanity";
import { PLACEHOLDER_IMAGE, SITE_URL } from "@/lib/constants";

// Unified product type for the page (works with both Sanity and local data)
interface CategoryProduct {
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  image: string;
  packaging: string | null;
  moq: string | null;
  origin: string | null;
}

interface CategoryData {
  name: string;
  slug: string;
  description: string;
}

interface CategoryPageProps {
  categoryData: CategoryData | null;
  products: CategoryProduct[];
}

/** Builds a short key specs summary line for product cards */
function buildSpecsSummary(product: CategoryProduct): string {
  const parts: string[] = [];
  if (product.packaging) {
    // Take just the first packaging option if there are multiple
    const firstPackaging = product.packaging.split(',')[0].trim();
    parts.push(firstPackaging);
  }
  if (product.origin) {
    parts.push(product.origin);
  }
  if (product.moq) {
    parts.push(`MOQ: ${product.moq}`);
  }
  return parts.join(' • ');
}

export default function CategoryPage({ categoryData, products }: CategoryPageProps) {
  if (!categoryData) {
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
            Category Not Found
          </h1>
          <p className="text-text-muted mb-10 text-lg max-w-md mx-auto">
            We couldn't find the category you're looking for. It may have been moved or removed.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <CTAButton href="/">Back to Home</CTAButton>
            <CTAButton href="/#products" variant="secondary">Browse All Products</CTAButton>
          </div>
        </div>
      </div>
    );
  }

  // SEO metadata
  const pageTitle = `${categoryData.name} | Virelia`;
  const pageDescription = categoryData.description;
  const pageUrl = `${SITE_URL}/products/${categoryData.slug}`;
  
  // Compute OG image URL with proper fallback
  const getOgImage = (): string => {
    const firstProductImage = products[0]?.image;
    if (!firstProductImage) {
      return `${SITE_URL}/hero1.jpg`;
    }
    return firstProductImage.startsWith('http') 
      ? firstProductImage 
      : `${SITE_URL}${firstProductImage}`;
  };
  const ogImage = getOgImage();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: categoryData.name },
  ];

  return (
    <div className="min-h-screen bg-bg text-text">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        
        {/* OpenGraph tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Virelia" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      {/* JSON-LD Breadcrumb Schema */}
      <BreadcrumbSchema items={breadcrumbItems} />

      <Header />

      <div className="container-custom py-12 mt-[80px]">
        <Breadcrumb items={breadcrumbItems} />

        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 border-b border-bg-surface pb-10"
        >
          <h1 className="text-h1 font-bold text-text-heading mb-4">
            {categoryData.name}
          </h1>
          <p className="text-xl text-text-muted leading-relaxed max-w-3xl">
            {categoryData.description}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <span className="inline-flex items-center px-4 py-2 bg-secondary-light text-primary rounded-full text-sm font-medium">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              {products.length} product{products.length !== 1 ? "s" : ""} available
            </span>
          </div>
        </motion.div>

        {/* Products Grid - B2B Catalog Layout */}
        {products.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto text-text-muted opacity-50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="text-xl font-semibold text-text-heading mb-2">No products yet</h3>
            <p className="text-text-muted">Products in this category will appear here soon.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product, index) => {
              const specsSummary = buildSpecsSummary(product);
              return (
                <motion.div
                  key={product.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link href={`/product/${product.slug}`}>
                    <div className="card card-hover cursor-pointer h-full flex flex-col group overflow-hidden">
                      {/* Product Image */}
                      <div className="h-48 lg:h-56 overflow-hidden rounded-t-2xl relative bg-bg-surface">
                        <img
                          src={product.image || PLACEHOLDER_IMAGE}
                          alt={product.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className="p-5 lg:p-6 flex-1 flex flex-col">
                        <h3 className="text-lg lg:text-xl font-semibold text-text-heading mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {product.title}
                        </h3>
                        
                        {product.shortDescription && (
                          <p className="text-sm text-text-muted leading-relaxed mb-3 line-clamp-2 flex-1">
                            {product.shortDescription}
                          </p>
                        )}
                        
                        {/* Key Specs Summary */}
                        {specsSummary && (
                          <div className="mb-4">
                            <p className="text-xs text-text-light line-clamp-1">
                              {specsSummary}
                            </p>
                          </div>
                        )}
                        
                        {/* View Details Button */}
                        <div className="mt-auto pt-4 border-t border-bg-surface">
                          <span className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold transition-all duration-300 group-hover:bg-primary-dark group-hover:shadow-soft">
                            View Details
                            <svg
                              className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-primary text-white py-16 px-8 lg:px-12 rounded-3xl shadow-soft-lg"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-h2 font-semibold mb-6">
              Interested in {categoryData.name}?
            </h2>
            <p className="text-xl leading-relaxed mb-10 text-white/90">
              Contact our sales team for pricing, minimum order quantities, and
              custom packaging options. We're here to help you source the perfect
              products for your market.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="/#contact"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-semibold text-lg text-primary bg-white transition-all duration-200 hover:bg-secondary-light hover:shadow-soft-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                >
                  Request a Quote
                </a>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="mailto:batinhincer@gmail.com"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-semibold text-lg text-white bg-transparent border-2 border-white transition-all duration-200 hover:bg-white hover:text-primary hover:shadow-soft focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                >
                  Contact Sales
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
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

// This function tells Next.js which category slugs to pre-render at build time
export async function getStaticPaths() {
  const paths = categoryInfo.map((cat) => ({
    params: { category: cat.slug },
  }));

  return {
    paths,
    fallback: false, // Show 404 for non-existent categories
  };
}

// Transform Sanity product to unified format
function transformSanityProduct(sanityProduct: {
  slug: string;
  title: string;
  shortDescription?: string;
  category?: string;
  image?: string;
  packaging?: string;
  moq?: string;
  origin?: string;
}): CategoryProduct {
  return {
    slug: sanityProduct.slug,
    title: sanityProduct.title,
    shortDescription: sanityProduct.shortDescription || '',
    category: sanityProduct.category || '',
    image: sanityProduct.image || PLACEHOLDER_IMAGE,
    packaging: sanityProduct.packaging ?? null,
    moq: sanityProduct.moq ?? null,
    origin: sanityProduct.origin ?? null,
  };
}

// Transform local product to unified format
function transformLocalProduct(localProduct: Product): CategoryProduct {
  return {
    slug: localProduct.slug,
    title: localProduct.title,
    shortDescription: localProduct.shortDesc,
    category: localProduct.category,
    image: localProduct.image,
    packaging: localProduct.packaging ?? null,
    moq: localProduct.moq ?? null,
    origin: localProduct.origin ?? null,
  };
}

// This function generates the props for each category page
export async function getStaticProps({ params }: { params: { category: string } }) {
  const categorySlug = params.category;
  
  // Try to fetch from Sanity first
  const [sanityCategory, sanityProducts] = await Promise.all([
    fetchCategoryBySlug(categorySlug),
    fetchProductsByCategory(categorySlug),
  ]);
  
  // If Sanity data is available, use it
  if (sanityCategory && sanityProducts) {
    const categoryData: CategoryData = {
      name: sanityCategory.title,
      slug: sanityCategory.slug,
      description: sanityCategory.description || '',
    };
    
    const products: CategoryProduct[] = sanityProducts.map(transformSanityProduct);
    
    return {
      props: {
        categoryData,
        products,
      },
    };
  }
  
  // Fallback to local data
  const localCategory = getCategoryBySlug(categorySlug);
  
  if (!localCategory) {
    return {
      props: {
        categoryData: null,
        products: [],
      },
    };
  }
  
  const localProducts = getProductsByCategory(localCategory.name);
  const products: CategoryProduct[] = localProducts.map(transformLocalProduct);
  
  return {
    props: {
      categoryData: {
        name: localCategory.name,
        slug: localCategory.slug,
        description: localCategory.description,
      },
      products,
    },
  };
}
