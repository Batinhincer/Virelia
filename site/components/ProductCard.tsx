import Link from "next/link";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";

// Minimal interface for what ProductCard actually needs
interface ProductCardProduct {
  slug: string;
  title: string;
  shortDesc: string;
  category: string;
  image: string;
}

interface ProductCardProps {
  product: ProductCardProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="card card-hover cursor-pointer h-full flex flex-col group overflow-hidden">
        <div className="h-64 overflow-hidden rounded-t-2xl relative bg-bg-surface">
          <img
            src={product.image || PLACEHOLDER_IMAGE}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-6 lg:p-8 flex-1 flex flex-col">
          <div className="mb-3">
            <span className="inline-block px-3 py-1 text-caption font-medium text-primary bg-secondary-light rounded-full">
              {product.category}
            </span>
          </div>
          <h3 className="text-2xl font-semibold text-text-heading mb-3 group-hover:text-primary transition-colors duration-300">
            {product.title}
          </h3>
          <p className="text-body text-text-muted leading-relaxed flex-1 mb-4">
            {product.shortDesc}
          </p>
          <div className="mt-auto pt-4 border-t border-bg-surface">
            <span className="text-primary font-semibold hover:text-primary-dark inline-flex items-center group-hover:translate-x-1 transition-transform duration-300">
              Learn More
              <svg
                className="w-5 h-5 ml-2"
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
  );
}
