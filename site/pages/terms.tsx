import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import { getCanonicalUrl } from '@/lib/constants';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <SEO
        title="Terms & Conditions"
        description="Read the Terms & Conditions for using Virelia's B2B gourmet food products website. Understand your rights and obligations when using our services."
        canonical={getCanonicalUrl('/terms')}
      />

      <Header />

      <PageHero
        title="Terms & Conditions"
        subtitle="Terms of use for our website and services"
      />

      <main className="section-padding bg-white">
        <div className="container-custom">
          <article className="max-w-4xl mx-auto prose prose-lg">
            <p className="text-text-muted text-sm mb-8">
              Last updated: November 27, 2025
            </p>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">1. Acceptance of Terms</h2>
              <p className="text-text leading-relaxed mb-4">
                [PLACEHOLDER: Explain that by accessing and using this website, users agree to be bound 
                by these Terms & Conditions. Include information about the legal agreement between the 
                user and Virelia.]
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">2. About Our Services</h2>
              <p className="text-text leading-relaxed mb-4">
                [PLACEHOLDER: Describe the nature of services provided:]
              </p>
              <ul className="list-disc pl-6 space-y-2 text-text">
                <li>This is a B2B informational website for Mediterranean food products</li>
                <li>Product inquiries and quote requests are handled via email</li>
                <li>All commercial transactions are subject to separate agreements</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">3. Use of Website</h2>
              <p className="text-text leading-relaxed mb-4">
                [PLACEHOLDER: Define acceptable use of the website:]
              </p>
              <ul className="list-disc pl-6 space-y-2 text-text">
                <li>Use the website only for lawful purposes</li>
                <li>Do not attempt to gain unauthorized access to our systems</li>
                <li>Do not use the website to distribute malware or harmful content</li>
                <li>Do not scrape or collect data without permission</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">4. Intellectual Property</h2>
              <p className="text-text leading-relaxed mb-4">
                [PLACEHOLDER: Explain intellectual property rights:]
              </p>
              <ul className="list-disc pl-6 space-y-2 text-text">
                <li>All content on this website is owned by or licensed to Virelia</li>
                <li>The Virelia name, logo, and branding are trademarks</li>
                <li>Product images and descriptions are protected by copyright</li>
                <li>Users may not reproduce content without written permission</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">5. Product Information</h2>
              <p className="text-text leading-relaxed mb-4">
                [PLACEHOLDER: Disclaimer about product information:]
              </p>
              <ul className="list-disc pl-6 space-y-2 text-text">
                <li>Product descriptions are for informational purposes only</li>
                <li>Specifications may change without notice</li>
                <li>Images are representative and may not reflect exact product appearance</li>
                <li>Final product details will be confirmed during the quotation process</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">6. Inquiry Submissions</h2>
              <p className="text-text leading-relaxed mb-4">
                [PLACEHOLDER: Terms regarding inquiry form submissions:]
              </p>
              <ul className="list-disc pl-6 space-y-2 text-text">
                <li>Inquiries are not binding offers or orders</li>
                <li>Response times are not guaranteed</li>
                <li>Submitted information is handled per our Privacy Policy</li>
                <li>We reserve the right to decline any inquiry</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">7. Limitation of Liability</h2>
              <p className="text-text leading-relaxed mb-4">
                [PLACEHOLDER: Standard limitation of liability clause:]
              </p>
              <ul className="list-disc pl-6 space-y-2 text-text">
                <li>The website is provided "as is" without warranties</li>
                <li>We are not liable for indirect or consequential damages</li>
                <li>We do not guarantee uninterrupted access to the website</li>
                <li>Maximum liability is limited as permitted by law</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">8. External Links</h2>
              <p className="text-text leading-relaxed mb-4">
                [PLACEHOLDER: Disclaimer about external links:]
              </p>
              <p className="text-text leading-relaxed">
                This website may contain links to third-party websites. We are not responsible for 
                the content or privacy practices of these external sites.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">9. Privacy</h2>
              <p className="text-text leading-relaxed mb-4">
                [PLACEHOLDER: Reference to Privacy Policy:]
              </p>
              <p className="text-text leading-relaxed">
                Your use of this website is also governed by our Privacy Policy and Cookie Policy. 
                Please review these documents to understand how we handle your personal information.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">10. Governing Law</h2>
              <p className="text-text leading-relaxed mb-4">
                [PLACEHOLDER: Specify applicable law and jurisdiction:]
              </p>
              <p className="text-text leading-relaxed">
                These Terms & Conditions are governed by the laws of Türkiye. Any disputes shall be 
                subject to the exclusive jurisdiction of the courts of Bursa, Türkiye.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">11. Changes to Terms</h2>
              <p className="text-text leading-relaxed mb-4">
                [PLACEHOLDER: Explain how terms may be updated:]
              </p>
              <p className="text-text leading-relaxed">
                We reserve the right to modify these Terms & Conditions at any time. Changes will be 
                effective when posted on this page. Continued use of the website after changes 
                constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">12. Contact Us</h2>
              <p className="text-text leading-relaxed mb-4">
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              <div className="bg-bg-surface p-6 rounded-lg">
                <p className="text-text mb-2"><strong>Virelia</strong></p>
                <p className="text-text-muted mb-2">
                  Akpınar, Şht. Mümin Mutlu Sk. No:7 Kat:2, Ofis:36,<br />
                  16160 Osmangazi/Bursa, Türkiye
                </p>
                <p className="text-text-muted">
                  Email: <a href="mailto:info@virelias.com" className="text-primary hover:underline">info@virelias.com</a>
                </p>
              </div>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
