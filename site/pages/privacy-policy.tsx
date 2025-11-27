import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import { getCanonicalUrl } from '@/lib/constants';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <SEO
        title="Privacy Policy"
        description="Read Frezya's Privacy Policy to understand how we collect, use, and protect your personal information when you use our B2B Mediterranean food products website."
        canonical={getCanonicalUrl('/privacy-policy')}
      />

      <Header />

      <PageHero
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your personal information"
      />

      <main className="section-padding bg-white">
        <div className="container-custom">
          <article className="max-w-4xl mx-auto prose prose-lg">
            <p className="text-text-muted text-sm mb-8">
              Last updated: November 27, 2025
            </p>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">1. Introduction</h2>
              <p className="text-text leading-relaxed mb-4">
                [PLACEHOLDER: Insert company introduction and privacy commitment statement here. 
                This section should explain who Frezya is and our commitment to protecting user privacy.]
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">2. Information We Collect</h2>
              <p className="text-text leading-relaxed mb-4">
                [PLACEHOLDER: Describe the types of information collected, including:]
              </p>
              <ul className="list-disc pl-6 space-y-2 text-text">
                <li>Personal information provided through inquiry forms (name, email, company, etc.)</li>
                <li>Technical data collected automatically (IP address, browser type, etc.)</li>
                <li>Cookie and analytics data (when consent is given)</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">3. How We Use Your Information</h2>
              <p className="text-text leading-relaxed mb-4">
                [PLACEHOLDER: Explain the purposes for which collected information is used, such as:]
              </p>
              <ul className="list-disc pl-6 space-y-2 text-text">
                <li>Responding to product inquiries and quote requests</li>
                <li>Improving our website and services</li>
                <li>Analytics and site performance monitoring</li>
                <li>Legal compliance and business operations</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">4. Data Sharing and Disclosure</h2>
              <p className="text-text leading-relaxed mb-4">
                [PLACEHOLDER: Explain when and with whom data may be shared, including:]
              </p>
              <ul className="list-disc pl-6 space-y-2 text-text">
                <li>Third-party service providers (analytics, email services)</li>
                <li>Legal requirements and law enforcement</li>
                <li>Business partners (with consent)</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">5. Cookies and Tracking Technologies</h2>
              <p className="text-text leading-relaxed mb-4">
                [PLACEHOLDER: Reference the Cookie Policy and explain:]
              </p>
              <ul className="list-disc pl-6 space-y-2 text-text">
                <li>What cookies are used on this site</li>
                <li>How users can manage cookie preferences</li>
                <li>Link to the full Cookie Policy</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">6. Your Rights</h2>
              <p className="text-text leading-relaxed mb-4">
                [PLACEHOLDER: Describe user rights under applicable laws (GDPR, etc.), including:]
              </p>
              <ul className="list-disc pl-6 space-y-2 text-text">
                <li>Right to access your personal data</li>
                <li>Right to rectification and erasure</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">7. Data Security</h2>
              <p className="text-text leading-relaxed mb-4">
                [PLACEHOLDER: Describe security measures in place to protect user data, such as:]
              </p>
              <ul className="list-disc pl-6 space-y-2 text-text">
                <li>Encryption and secure data transmission</li>
                <li>Access controls and authentication</li>
                <li>Regular security assessments</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">8. Data Retention</h2>
              <p className="text-text leading-relaxed mb-4">
                [PLACEHOLDER: Explain how long data is retained and the criteria used to determine retention periods.]
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">9. International Data Transfers</h2>
              <p className="text-text leading-relaxed mb-4">
                [PLACEHOLDER: Explain how data may be transferred internationally and safeguards in place.]
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">10. Changes to This Policy</h2>
              <p className="text-text leading-relaxed mb-4">
                [PLACEHOLDER: Explain how and when this policy may be updated and how users will be notified.]
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">11. Contact Us</h2>
              <p className="text-text leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-bg-surface p-6 rounded-lg">
                <p className="text-text mb-2"><strong>Frezya Dış Ticaret Ltd. Şti.</strong></p>
                <p className="text-text-muted mb-2">
                  Akpınar, Şht. Mümin Mutlu Sk. No:7 Kat:2, Ofis:36,<br />
                  16160 Osmangazi/Bursa, Türkiye
                </p>
                <p className="text-text-muted">
                  Email: <a href="mailto:batinhincer@frezya.nl" className="text-primary hover:underline">batinhincer@frezya.nl</a>
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
