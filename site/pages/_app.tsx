import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { OrganizationSchema, WebSiteSchema } from '@/components/SEO';
import { ANALYTICS_ID, isAnalyticsEnabled, getGA4ScriptUrl, getGA4InitScript } from '@/lib/analytics';

export default function App({ Component, pageProps }: AppProps) {
  const analyticsEnabled = isAnalyticsEnabled();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Google Analytics (GA4) - only loaded in production with NEXT_PUBLIC_ANALYTICS_ID set */}
      {analyticsEnabled && (
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
    </>
  );
}
