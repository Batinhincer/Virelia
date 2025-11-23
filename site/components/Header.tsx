import Link from "next/link";
import { categoryInfo } from "@/data/products";

export default function Header() {
  return (
    <header className="bg-primary text-white shadow-soft-lg fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container-custom flex justify-between items-center py-5">
        <Link href="/">
          <h1 className="text-3xl font-bold tracking-tight cursor-pointer hover:text-secondary-light transition-colors duration-300 font-heading">
            Virelia
          </h1>
        </Link>
        <nav className="space-x-10 text-sm font-medium flex items-center">
          <a
            href="/#about"
            className="text-white hover:text-secondary-light transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary-light after:transition-all after:duration-300 hover:after:w-full pb-1"
          >
            About Us
          </a>
          <div className="relative group">
            <button className="text-white hover:text-secondary-light transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary-light after:transition-all after:duration-300 group-hover:after:w-full pb-1">
              Products
            </button>
            <div className="absolute left-0 mt-4 w-72 bg-white text-text rounded-2xl shadow-soft-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
              {categoryInfo.map((category) => (
                <Link
                  key={category.slug}
                  href={`/products/${category.slug}`}
                  className="block px-5 py-3 hover:bg-bg-surface transition-colors duration-200 border-b border-bg-surface last:border-b-0"
                >
                  <div className="font-medium text-text-heading">{category.name}</div>
                  <div className="text-xs text-text-muted mt-0.5 line-clamp-1">
                    {category.description.split('.')[0]}
                  </div>
                </Link>
              ))}
              <Link
                href="/#products"
                className="block px-5 py-3 hover:bg-primary hover:text-white transition-colors duration-200 font-semibold text-center text-primary"
              >
                View All Products →
              </Link>
            </div>
          </div>
          <a
            href="/#contact"
            className="text-white hover:text-secondary-light transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary-light after:transition-all after:duration-300 hover:after:w-full pb-1"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
