import Link from "next/link";
import { products } from "@/data/products";

export default function Header() {
  return (
    <header className="bg-green-800 text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/">
          <h1 className="text-2xl font-bold tracking-tight cursor-pointer hover:text-green-200 transition-colors">
            Virelia
          </h1>
        </Link>
        <nav className="space-x-8 text-sm font-medium flex items-center">
          <a
            href="/#about"
            className="text-white hover:text-green-200 transition-colors duration-200"
          >
            About Us
          </a>
          <div className="relative group">
            <button className="text-white hover:text-green-200 transition-colors duration-200">
              Products
            </button>
            <div className="absolute left-0 mt-2 w-56 bg-white text-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              {products.map((product) => (
                <Link
                  key={product.slug}
                  href={`/product/${product.slug}`}
                  className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  {product.title}
                </Link>
              ))}
            </div>
          </div>
          <a
            href="/#contact"
            className="text-white hover:text-green-200 transition-colors duration-200"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
