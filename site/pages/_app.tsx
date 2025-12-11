import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { useState, useEffect, useCallback } from 'react';
import { OrganizationSchema, WebSiteSchema } from '@/components/SEO';
import CookieConsentBanner, { getStoredConsent } from '@/components/CookieConsentBanner';
import { ANALYTICS_ID, isAnalyticsEnabled, getGA4ScriptUrl, getGA4InitScript, hasAnalyticsConsent } from '@/lib/analytics';

export default function App({ Component, pageProps }: AppProps) {
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);
  const [cookieBannerOpen, setCookieBannerOpen] = useState(false);

  // Check analytics consent on mount and when consent changes
  useEffect(() => {
    const checkConsent = () => {
      const enabled = isAnalyticsEnabled() && hasAnalyticsConsent();
      setAnalyticsAllowed(enabled);
    };

    checkConsent();

    // Listen for consent changes
    const handleConsentChange = () => {
      checkConsent();
    };

    window.addEventListener('cookieConsentChanged', handleConsentChange);
    return () => {
      window.removeEventListener('cookieConsentChanged', handleConsentChange);
    };
  }, []);

  // Expose function to open cookie settings (for footer link)
  const openCookieSettings = useCallback(() => {
    setCookieBannerOpen(true);
  }, []);

  // Close cookie banner handler
  const closeCookieBanner = useCallback(() => {
    setCookieBannerOpen(false);
  }, []);

  // Make openCookieSettings available globally for footer link
  useEffect(() => {
    (window as unknown as { openCookieSettings?: () => void }).openCookieSettings = openCookieSettings;
    return () => {
      delete (window as unknown as { openCookieSettings?: () => void }).openCookieSettings;
    };
  }, [openCookieSettings]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      {/* Google Analytics (GA4) - only loaded in production with NEXT_PUBLIC_ANALYTICS_ID set AND consent given */}
      {analyticsAllowed && (
        <>
          <Script
            id="ga4-script"
            src={getGA4ScriptUrl()}
            strategy="afterInteractive"
            data-analytics-id={ANALYTICS_ID}
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: getGA4InitScript() }}
          />
        </>
      )}

      <OrganizationSchema />
      <WebSiteSchema />
      <Component {...pageProps} />
      
      {/* Cookie Consent Banner */}
      <CookieConsentBanner 
        isOpen={cookieBannerOpen || undefined} 
        onClose={closeCookieBanner} 
      />
    </>
  );
}
