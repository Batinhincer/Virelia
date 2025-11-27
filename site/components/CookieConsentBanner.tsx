import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

export type ConsentState = 'accepted' | 'declined' | null;

const CONSENT_STORAGE_KEY = 'frezya-cookie-consent';

/**
 * Safely get consent from localStorage (SSR-safe)
 */
export function getStoredConsent(): ConsentState {
  if (typeof window === 'undefined') {
    return null;
  }
  const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
  if (stored === 'accepted' || stored === 'declined') {
    return stored;
  }
  return null;
}

/**
 * Store consent in localStorage
 */
export function setStoredConsent(consent: 'accepted' | 'declined'): void {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem(CONSENT_STORAGE_KEY, consent);
}

/**
 * Clear consent from localStorage (for resetting preferences)
 */
export function clearStoredConsent(): void {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.removeItem(CONSENT_STORAGE_KEY);
}

interface CookieConsentBannerProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function CookieConsentBanner({ isOpen: externalOpen, onClose }: CookieConsentBannerProps) {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const acceptButtonRef = useRef<HTMLButtonElement>(null);

  // Check for existing consent on mount
  useEffect(() => {
    const stored = getStoredConsent();
    setConsent(stored);
    
    // Show banner if no consent is stored and not externally controlled
    if (externalOpen === undefined) {
      setIsVisible(stored === null);
    }
  }, [externalOpen]);

  // Handle external open state
  useEffect(() => {
    if (externalOpen !== undefined) {
      setIsVisible(externalOpen);
    }
  }, [externalOpen]);

  // Focus management - focus first button when banner opens
  useEffect(() => {
    if (isVisible && acceptButtonRef.current) {
      acceptButtonRef.current.focus();
    }
  }, [isVisible]);

  // Handle keyboard events (ESC to close is handled after choice is made)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible && consent !== null) {
        setIsVisible(false);
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, consent, onClose]);

  const handleAccept = useCallback(() => {
    setStoredConsent('accepted');
    setConsent('accepted');
    setIsVisible(false);
    onClose?.();
    
    // Dispatch custom event for analytics to listen to
    window.dispatchEvent(new CustomEvent('cookieConsentChanged', { detail: { consent: 'accepted' } }));
  }, [onClose]);

  const handleDecline = useCallback(() => {
    setStoredConsent('declined');
    setConsent('declined');
    setIsVisible(false);
    onClose?.();
    
    // Dispatch custom event for analytics to listen to
    window.dispatchEvent(new CustomEvent('cookieConsentChanged', { detail: { consent: 'declined' } }));
  }, [onClose]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={bannerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Cookie consent"
      data-testid="cookie-consent-banner"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-white border-t border-gray-200 shadow-lg"
    >
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1 max-w-3xl">
            <h2 className="text-lg font-semibold text-text-heading mb-2">
              We value your privacy
            </h2>
            <p className="text-sm text-text-muted">
              We use analytics cookies to understand how you use our site and improve your experience. 
              You can accept all cookies or choose to decline analytics tracking. 
              For more information, please read our{' '}
              <Link 
                href="/privacy-policy" 
                className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link 
                href="/cookie-policy" 
                className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Cookie Policy
              </Link>.
            </p>
          </div>
          
          <div className="flex flex-row gap-3 w-full md:w-auto">
            <button
              ref={acceptButtonRef}
              onClick={handleAccept}
              data-testid="cookie-accept-button"
              className="flex-1 md:flex-none px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Accept all
            </button>
            <button
              onClick={handleDecline}
              data-testid="cookie-decline-button"
              className="flex-1 md:flex-none px-6 py-2.5 bg-gray-100 text-text-heading font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
