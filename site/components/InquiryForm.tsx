import { useState, FormEvent } from "react";

interface InquiryFormProps {
  productName: string;
  productSlug: string;
}

export default function InquiryForm({ productName, productSlug }: InquiryFormProps) {
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
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          productName,
          productSlug,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setStatusMessage("Thank you! Your inquiry has been submitted successfully. We'll get back to you soon.");
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
        setStatusMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmitStatus("error");
      setStatusMessage("Network error. Please check your connection and try again.");
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

  return (
    <section id="inquiry" className="bg-bg-surface py-16 px-8 lg:px-12 rounded-3xl shadow-soft-lg">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-h2 font-semibold mb-4 text-text-heading text-center">Request a Quote</h3>
        <p className="text-lg text-text-muted text-center mb-10">
          Interested in <strong>{productName}</strong>? Fill out the form below and our team will get back to you with pricing and availability.
        </p>

        {submitStatus === "success" && (
          <div className="mb-8 p-6 bg-primary-light text-white rounded-2xl shadow-soft">
            <div className="flex items-start">
              <svg className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-base">{statusMessage}</p>
            </div>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mb-8 p-6 bg-accent-light text-white rounded-2xl shadow-soft">
            <div className="flex items-start">
              <svg className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-base">{statusMessage}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-text-heading mb-2">
                Full Name <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                  errors.fullName ? "border-accent" : "border-bg-surface focus:border-primary"
                } bg-white text-text focus:outline-none`}
                placeholder="John Doe"
              />
              {errors.fullName && <p className="mt-1 text-sm text-accent">{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="companyName" className="block text-sm font-semibold text-text-heading mb-2">
                Company Name <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                  errors.companyName ? "border-accent" : "border-bg-surface focus:border-primary"
                } bg-white text-text focus:outline-none`}
                placeholder="Your Company Ltd."
              />
              {errors.companyName && <p className="mt-1 text-sm text-accent">{errors.companyName}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-text-heading mb-2">
                Email Address <span className="text-accent">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                  errors.email ? "border-accent" : "border-bg-surface focus:border-primary"
                } bg-white text-text focus:outline-none`}
                placeholder="john@company.com"
              />
              {errors.email && <p className="mt-1 text-sm text-accent">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-semibold text-text-heading mb-2">
                Country <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                  errors.country ? "border-accent" : "border-bg-surface focus:border-primary"
                } bg-white text-text focus:outline-none`}
                placeholder="Netherlands"
              />
              {errors.country && <p className="mt-1 text-sm text-accent">{errors.country}</p>}
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
              className="w-full px-4 py-3 rounded-xl border-2 border-bg-surface focus:border-primary bg-white text-text focus:outline-none transition-colors"
              placeholder="+31 20 123 4567"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-text-heading mb-2">
              Message / Requirements <span className="text-accent">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                errors.message ? "border-accent" : "border-bg-surface focus:border-primary"
              } bg-white text-text focus:outline-none resize-none`}
              placeholder="Please provide details about your requirements, including quantity, delivery location, and any specific questions..."
            />
            {errors.message && <p className="mt-1 text-sm text-accent">{errors.message}</p>}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
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
