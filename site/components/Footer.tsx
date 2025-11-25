import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-text-heading text-white py-12 lg:py-16" role="contentinfo">
      <div className="container-custom">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10 lg:mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" aria-label="Frezya - Home">
              <span className="text-2xl font-bold font-heading text-white hover:text-secondary-light transition-colors duration-200">
                Frezya
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-md">
              Your trusted B2B partner for premium Mediterranean food products. Quality, certification, and reliable export to EU, UK, and USA markets.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <p className="text-white font-medium">Frezya Dış Ticaret Ltd. Şti.</p>
              <p className="text-gray-400">
                Akpınar, Şht. Mümin Mutlu Sk. No:7 Kat:2, Ofis:36,<br />
                16160 Osmangazi/Bursa, Türkiye
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Quick Links
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/" 
                    className="text-gray-400 hover:text-secondary-light transition-colors duration-200 text-sm"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/#products" 
                    className="text-gray-400 hover:text-secondary-light transition-colors duration-200 text-sm"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/about" 
                    className="text-gray-400 hover:text-secondary-light transition-colors duration-200 text-sm"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/logistics" 
                    className="text-gray-400 hover:text-secondary-light transition-colors duration-200 text-sm"
                  >
                    Logistics
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/certifications" 
                    className="text-gray-400 hover:text-secondary-light transition-colors duration-200 text-sm"
                  >
                    Certifications
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:batinhincer@frezya.nl"
                  className="text-gray-400 hover:text-secondary-light transition-colors duration-200 text-sm inline-flex items-center"
                >
                  <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  batinhincer@frezya.nl
                </a>
              </li>
              <li>
                <a
                  href="tel:+905077075407"
                  className="text-gray-400 hover:text-secondary-light transition-colors duration-200 text-sm inline-flex items-center"
                >
                  <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +90 507 707 54 07
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center text-secondary-light hover:text-secondary transition-colors duration-200 text-sm font-medium mt-2"
                >
                  Request a Quote
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} Frezya. All rights reserved.
            </p>
            <p className="text-xs text-gray-500">
              Premium Mediterranean Food Products | B2B Export Solutions
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
