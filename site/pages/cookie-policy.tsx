import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import { getCanonicalUrl } from '@/lib/constants';

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <SEO
        title="Cookie Policy"
        description="Learn about how Virelia uses cookies and similar technologies on our B2B gourmet food products website, and how you can manage your cookie preferences."
        canonical={getCanonicalUrl('/cookie-policy')}
      />

      <Header />

      <PageHero
        title="Cookie Policy"
        subtitle="How we use cookies and similar technologies"
      />

      <main className="section-padding bg-white">
        <div className="container-custom">
          <article className="max-w-4xl mx-auto prose prose-lg">
            <p className="text-text-muted text-sm mb-8">
              Last updated: November 27, 2025
            </p>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">1. What Are Cookies?</h2>
              <p className="text-text leading-relaxed mb-4">
                [PLACEHOLDER: Explain what cookies are in simple terms. Cookies are small text files that are 
                placed on your device when you visit a website. They are widely used to make websites work 
                more efficiently and to provide information to website owners.]
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">2. How We Use Cookies</h2>
              <p className="text-text leading-relaxed mb-4">
                [PLACEHOLDER: Explain the purposes for which cookies are used on this site:]
              </p>
              <ul className="list-disc pl-6 space-y-2 text-text">
                <li><strong>Essential cookies:</strong> Required for the website to function properly</li>
                <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site (requires consent)</li>
                <li><strong>Preference cookies:</strong> Remember your settings and choices</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">3. Types of Cookies We Use</h2>
              
              <div className="bg-bg-surface p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-text-heading mb-3">Essential Cookies</h3>
                <p className="text-text-muted mb-2">
                  These cookies are necessary for the website to function and cannot be switched off.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-text-muted text-sm">
                  <li><code>virelia-cookie-consent</code> - Stores your cookie consent preference</li>
                </ul>
              </div>

              <div className="bg-bg-surface p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-text-heading mb-3">Analytics Cookies (Optional)</h3>
                <p className="text-text-muted mb-2">
                  These cookies help us understand how visitors interact with our website. They are only 
                  set when you accept analytics cookies.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-text-muted text-sm">
                  <li><code>_ga</code>, <code>_ga_*</code> - Google Analytics cookies for tracking site usage</li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">4. Managing Your Cookie Preferences</h2>
              <p className="text-text leading-relaxed mb-4">
                You can manage your cookie preferences at any time:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-text">
                <li>
                  <strong>On this website:</strong> Use the "Cookie settings" link in the footer to change 
                  your consent preferences.
                </li>
                <li>
                  <strong>In your browser:</strong> Most web browsers allow you to control cookies through 
                  their settings. You can set your browser to block or alert you about cookies.
                </li>
              </ul>
              <p className="text-text leading-relaxed mt-4">
                [PLACEHOLDER: Add specific instructions for managing cookies in popular browsers]
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">5. Third-Party Cookies</h2>
              <p className="text-text leading-relaxed mb-4">
                [PLACEHOLDER: Explain third-party cookies used on the site:]
              </p>
              <div className="bg-bg-surface p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-text-heading mb-3">Google Analytics</h3>
                <p className="text-text-muted">
                  We use Google Analytics to analyze website traffic and user behavior. Google Analytics 
                  cookies are only set when you accept analytics cookies. For more information, see{' '}
                  <a 
                    href="https://policies.google.com/privacy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Google's Privacy Policy
                  </a>.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">6. Cookie Retention</h2>
              <p className="text-text leading-relaxed mb-4">
                [PLACEHOLDER: Explain how long different cookies are stored on user devices:]
              </p>
              <ul className="list-disc pl-6 space-y-2 text-text">
                <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Persistent cookies:</strong> Remain on your device for a set period or until deleted</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">7. Changes to This Cookie Policy</h2>
              <p className="text-text leading-relaxed mb-4">
                [PLACEHOLDER: Explain how and when this policy may be updated. We may update this Cookie 
                Policy from time to time to reflect changes in our practices or for other operational, 
                legal, or regulatory reasons.]
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-h3 font-semibold text-text-heading mb-4">8. Contact Us</h2>
              <p className="text-text leading-relaxed mb-4">
                If you have any questions about our use of cookies, please contact us:
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
