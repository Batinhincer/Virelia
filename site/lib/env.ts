/**
 * Environment variable verification and validation.
 * This module provides utilities to validate required environment variables
 * and graceful fallbacks when they are missing.
 */

/**
 * Environment variable requirements grouped by feature
 */
export const envRequirements = {
  sanity: {
    // At least one of these project ID vars should be set for Sanity
    projectId: ['SANITY_PROJECT_ID', 'NEXT_PUBLIC_SANITY_PROJECT_ID'],
    dataset: ['SANITY_DATASET', 'NEXT_PUBLIC_SANITY_DATASET'],
    readToken: ['SANITY_READ_TOKEN', 'SANITY_API_READ_TOKEN'],
    writeToken: ['SANITY_WRITE_TOKEN'],
  },
  smtp: {
    host: ['SMTP_HOST'],
    port: ['SMTP_PORT'],
    user: ['SMTP_USER'],
    pass: ['SMTP_PASS'],
    from: ['SMTP_FROM'],
  },
  site: {
    url: ['NEXT_PUBLIC_SITE_URL', 'SITE_URL'],
    baseUrl: ['NEXT_PUBLIC_BASE_URL'],
  },
} as const;

/**
 * Gets the first available value from a list of environment variable names
 */
export function getEnvValue(varNames: readonly string[], defaultValue?: string): string | undefined {
  for (const name of varNames) {
    const value = process.env[name];
    if (value) {
      return value;
    }
  }
  return defaultValue;
}

/**
 * Checks if at least one of the environment variables in the list is set
 */
export function hasEnvValue(varNames: readonly string[]): boolean {
  return varNames.some((name) => Boolean(process.env[name]));
}

/**
 * Environment configuration status
 
 */
export interface EnvStatus {
  sanityConfigured: boolean;
  sanityWriteConfigured: boolean;
  smtpConfigured: boolean;
  siteUrlConfigured: boolean;
}

/**
 * Gets the current environment configuration status
 * 
 * Note: Sanity write configuration only requires projectId + writeToken because:
 * - dataset defaults to 'production' if not set
 * - readToken is only required for private datasets
 */
export function getEnvStatus(): EnvStatus {
  return {
    sanityConfigured: hasEnvValue(envRequirements.sanity.projectId),
    // Write requires projectId + writeToken (dataset has default, readToken is optional)
    sanityWriteConfigured: 
      hasEnvValue(envRequirements.sanity.projectId) && 
      hasEnvValue(envRequirements.sanity.writeToken),
    smtpConfigured: 
      hasEnvValue(envRequirements.smtp.host) &&
      hasEnvValue(envRequirements.smtp.port) &&
      hasEnvValue(envRequirements.smtp.user) &&
      hasEnvValue(envRequirements.smtp.pass),
    siteUrlConfigured: hasEnvValue(envRequirements.site.url),
  };
}

/**
 * Validates and logs missing environment variables during build/startup.
 * Returns an array of warning messages for missing optional configurations.
 * Does not throw errors - this is for graceful fallback reporting.

 */
export function validateEnv(): string[] {
  const warnings: string[] = [];
  const status = getEnvStatus();

  // Sanity CMS - optional but recommended
  if (!status.sanityConfigured) {
    warnings.push(
      'Sanity CMS not configured (SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID not set). ' +
      'The site will use local data as a fallback.'
    );
  } else if (!status.sanityWriteConfigured) {
    warnings.push(
      'Sanity write token not configured (SANITY_WRITE_TOKEN not set). ' +
      'Inquiries will not be saved to Sanity CMS.'
    );
  }

  // SMTP - optional but recommended for production
  if (!status.smtpConfigured) {
    warnings.push(
      'SMTP not fully configured. ' +
      'Email notifications for inquiries will be disabled. ' +
      'In development mode, inquiries will be logged to console.'
    );
  }

  // Site URL - should always be set for production
  if (!status.siteUrlConfigured) {
    warnings.push(
      'NEXT_PUBLIC_SITE_URL not set. ' +
      'Using default site URL (https:// for canonical URLs and SEO.'
    );
  }

  return warnings;
}

/**
 * Log environment validation warnings in development mode
 */
export function logEnvWarnings(): void {
  // Only log in development or during build
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    return;
  }

  const warnings = validateEnv();
  if (warnings.length > 0) {
    console.log('\n[ENV] Environment Configuration Warnings:');
    warnings.forEach((warning, index) => {
      console.log(`  ${index + 1}. ${warning}`);
    });
    console.log('');
  }
}
