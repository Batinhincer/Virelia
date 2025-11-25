import { useState, FormEvent } from "react";
import { useRouter } from "next/router";

interface InquiryFormProps {
  /** Product name (optional - for product inquiry pages) */
  productName?: string;
  /** Product slug (optional - for product inquiry pages) */
  productSlug?: string;
  /** Product category (optional - for product inquiry pages) */
  productCategory?: string;
  /** Custom title for the form section */
  title?: string;
  /** Custom subtitle for the form section */
  subtitle?: string;
  /** Whether this is a general contact form (no product context) */
  isGeneralContact?: boolean;
}

const MIN_MESSAGE_LENGTH = 10;

export default function InquiryForm({
  productName,
  productSlug,
  productCategory,
  title,
  subtitle,
  isGeneralContact = false,
}: InquiryFormProps) {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    country: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  // Determine if we have product context
  const hasProductContext = !isGeneralContact && productName;

  // Generate title and subtitle
  const formTitle = title || "Request a Quote";
  const formSubtitle = subtitle || (hasProductContext
    ? `Interested in ${productName}? Fill out the form below and our team will get back to you with pricing and availability.`
    : "Fill out the form below and our team will get back to you within 24 hours.");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < MIN_MESSAGE_LENGTH) {
      newErrors.message = `Message must be at least ${MIN_MESSAGE_LENGTH} characters`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setStatusMessage("");

    try {
      // Build the request body with all metadata
      const requestBody = {
        fullName: formData.fullName,
        companyName: formData.companyName,
        email: formData.email,
        country: formData.country,
        phone: formData.phone || undefined,
        message: formData.message,
        productName: productName || undefined,
        productSlug: productSlug || undefined,
        productCategory: productCategory || undefined,
        urlPath: router.asPath,
      };

      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setStatusMessage(
          hasProductContext
            ? `Thank you for your inquiry about ${productName}! Your inquiry has been logged in our system. Our export team will contact you shortly.`
            : "Thank you for contacting us! Your inquiry has been logged in our system. Our export team will contact you shortly."
        );
        setFormData({
          fullName: "",
          companyName: "",
          email: "",
          country: "",
          phone: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
        setStatusMessage(data.message || "Failed to submit inquiry. Please try again later.");
      }
    } catch {
      setSubmitStatus("error");
      setStatusMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Count errors for summary
  const errorCount = Object.keys(errors).filter((key) => errors[key]).length;

  return (
    <section
      id="inquiry"
      className="bg-bg-surface py-16 px-8 lg:px-12 rounded-3xl shadow-soft-lg"
      data-testid="inquiry-form-section"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-h2 font-semibold mb-4 text-text-heading text-center">{formTitle}</h2>
        <p className="text-lg text-text-muted text-center mb-6">{formSubtitle}</p>

        {/* Product Context Box */}
        {hasProductContext && (
          <div
            className="mb-8 p-4 bg-primary/10 border border-primary/20 rounded-xl"
            data-testid="product-context-box"
          >
            <p className="text-sm text-text-heading font-medium flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              You are inquiring about: <strong className="ml-1">{productName}</strong>
              {productCategory && <span className="ml-1 text-text-muted">– {productCategory}</span>}
            </p>
          </div>
        )}

        {/* Success Message */}
        {submitStatus === "success" && (
          <div
            className="mb-8 p-6 bg-primary-light text-white rounded-2xl shadow-soft"
            role="alert"
            aria-live="polite"
            data-testid="success-message"
          >
            <div className="flex items-start">
              <svg className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-base">{statusMessage}</p>
            </div>
          </div>
        )}

        {/* Error Summary */}
        {submitStatus === "error" && (
          <div
            className="mb-8 p-6 bg-accent-light text-white rounded-2xl shadow-soft"
            role="alert"
            aria-live="polite"
            data-testid="error-message"
          >
            <div className="flex items-start">
              <svg className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-base">{statusMessage}</p>
            </div>
          </div>
        )}

        {/* Validation Error Summary (appears after failed submit attempt) */}
        {errorCount > 0 && (
          <div
            className="mb-6 p-4 bg-accent/10 border border-accent/30 rounded-xl"
            role="alert"
            aria-live="polite"
            data-testid="validation-summary"
          >
            <p className="text-sm text-accent font-medium">
              Please fix {errorCount} error{errorCount > 1 ? "s" : ""} below to submit the form.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" noValidate data-testid="inquiry-form">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-text-heading mb-2">
                Full Name <span className="text-accent" aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                  errors.fullName ? "border-accent" : "border-bg-surface focus:border-primary"
                } bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary/30`}
                placeholder="John Doe"
                data-testid="fullName-input"
              />
              {errors.fullName && (
                <p id="fullName-error" className="mt-1 text-sm text-accent" role="alert" data-testid="fullName-error">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="companyName" className="block text-sm font-semibold text-text-heading mb-2">
                Company Name <span className="text-accent" aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!errors.companyName}
                aria-describedby={errors.companyName ? "companyName-error" : undefined}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                  errors.companyName ? "border-accent" : "border-bg-surface focus:border-primary"
                } bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary/30`}
                placeholder="Your Company Ltd."
                data-testid="companyName-input"
              />
              {errors.companyName && (
                <p id="companyName-error" className="mt-1 text-sm text-accent" role="alert" data-testid="companyName-error">
                  {errors.companyName}
                </p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-text-heading mb-2">
                Email Address <span className="text-accent" aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                  errors.email ? "border-accent" : "border-bg-surface focus:border-primary"
                } bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary/30`}
                placeholder="john@company.com"
                data-testid="email-input"
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-accent" role="alert" data-testid="email-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-semibold text-text-heading mb-2">
                Country <span className="text-accent" aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!errors.country}
                aria-describedby={errors.country ? "country-error" : undefined}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                  errors.country ? "border-accent" : "border-bg-surface focus:border-primary"
                } bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary/30`}
                placeholder="Netherlands"
                data-testid="country-input"
              />
              {errors.country && (
                <p id="country-error" className="mt-1 text-sm text-accent" role="alert" data-testid="country-error">
                  {errors.country}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-text-heading mb-2">
              Phone Number <span className="text-text-muted text-xs">(Optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border-2 border-bg-surface focus:border-primary bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
              placeholder="+31 20 123 4567"
              data-testid="phone-input"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-text-heading mb-2">
              Message / Requirements <span className="text-accent" aria-hidden="true">*</span>
              <span className="sr-only">(required)</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-hint message-error" : "message-hint"}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                errors.message ? "border-accent" : "border-bg-surface focus:border-primary"
              } bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none`}
              placeholder="Please provide details about your requirements, including quantity, delivery location, and any specific questions..."
              data-testid="message-input"
            />
            <p id="message-hint" className="mt-1 text-xs text-text-muted">
              Minimum {MIN_MESSAGE_LENGTH} characters
            </p>
            {errors.message && (
              <p id="message-error" className="mt-1 text-sm text-accent" role="alert" data-testid="message-error">
                {errors.message}
              </p>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="submit-button"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Submit Inquiry"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
