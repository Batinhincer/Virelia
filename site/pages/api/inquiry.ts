import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { createInquiry, isSanityWriteConfigured, SanityInquiryDocument } from "@/lib/sanityServer";

interface InquiryData {
  fullName: string;
  companyName: string;
  email: string;
  country: string;
  phone?: string;
  message: string;
  productName?: string;
  productSlug?: string;
  productCategory?: string;
  urlPath?: string;
}

// Consistent API response shape
interface ApiResponse {
  success: boolean;
  message: string;
}

/**
 * Determines the inquiry source based on the provided data
 */
function determineSource(urlPath: string | undefined, productSlug: string | undefined, productName: string | undefined): 'product-page' | 'contact-page' | 'other' {
  // If there's a product slug or product name and the URL looks like a product page
  if ((productSlug || productName) && urlPath?.includes('/product/')) {
    return 'product-page';
  }
  
  // If the URL path indicates the contact page
  if (urlPath?.includes('/contact')) {
    return 'contact-page';
  }
  
  return 'other';
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const {
    fullName,
    companyName,
    email,
    country,
    phone,
    message,
    productName,
    productSlug,
    productCategory,
    urlPath: bodyUrlPath,
  }: InquiryData = req.body || {};

  // Determine URL path from body or referer header
  // Note: referer can be spoofed, but we only use it for analytics/tracking, not security decisions
  const rawUrlPath = bodyUrlPath || req.headers.referer || '';
  // Sanitize the URL path to only include the path portion
  const urlPath = (() => {
    try {
      // If it looks like a full URL, extract just the path
      if (rawUrlPath.startsWith('http://') || rawUrlPath.startsWith('https://')) {
        const url = new URL(rawUrlPath);
        return url.pathname + url.search;
      }
      return rawUrlPath;
    } catch {
      return rawUrlPath;
    }
  })();

  // Validate required fields - productName is no longer strictly required for general contact forms
  if (!fullName || !companyName || !email || !country || !message) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email format" });
  }

  // Check if SMTP environment variables are configured
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || smtpUser;
  const inquiryEmail = process.env.INQUIRY_EMAIL || "info@virelias.com";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.virelias.com";

  // Prepare Sanity inquiry document
  const source = determineSource(urlPath, productSlug, productName);
  const sanityInquiry: SanityInquiryDocument = {
    _type: 'inquiry',
    name: fullName,
    email,
    company: companyName,
    country,
    phone: phone || undefined,
    message,
    productName: productName || undefined,
    productSlug: productSlug || undefined,
    productCategory: productCategory || undefined,
    source,
    urlPath,
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  // In development, if SMTP is not configured, log the inquiry and return success
  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    if (process.env.NODE_ENV === "development") {
      console.log("=== INQUIRY SUBMISSION (SMTP NOT CONFIGURED) ===");
      console.log("Product:", productName || "N/A");
      console.log("From:", fullName, `(${email})`);
      console.log("Company:", companyName);
      console.log("Country:", country);
      console.log("Phone:", phone || "Not provided");
      console.log("Message:", message);
      console.log("Source:", source);
      console.log("URL Path:", urlPath);
      console.log("Sanity Write Configured:", isSanityWriteConfigured);
      console.log("===============================================");
      
      // Still attempt to save to Sanity in development (graceful fallback)
      if (isSanityWriteConfigured) {
        try {
          const inquiryId = await createInquiry(sanityInquiry);
          if (inquiryId) {
            console.log("Saved to Sanity with ID:", inquiryId);
          }
        } catch (sanityError) {
          // Log but don't fail - Sanity is optional
          console.warn("Failed to save to Sanity in dev mode:", sanityError instanceof Error ? sanityError.message : "Unknown error");
        }
      }
      
      return res.status(200).json({
        success: true,
        message: "Inquiry received (development mode - email not sent)",
      });
    } else {
      // In production without SMTP, still try to save to Sanity
      if (isSanityWriteConfigured) {
        try {
          await createInquiry(sanityInquiry);
          console.log("Inquiry saved to Sanity (SMTP not configured)");
        } catch (sanityError) {
          console.warn("Failed to save inquiry to Sanity:", sanityError instanceof Error ? sanityError.message : "Unknown error");
        }
      }
      return res.status(500).json({
        success: false,
        message: "Email service is not configured. Please contact us directly.",
      });
    }
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: parseInt(smtpPort) === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Prepare email content
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "Europe/Amsterdam",
      dateStyle: "full",
      timeStyle: "long",
    });

    // Use a display name for emails when productName is not available
    const displayProductName = productName || "General Inquiry";
    const productPageUrl = productSlug ? `${baseUrl}/product/${productSlug}` : `${baseUrl}/contact`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #3a5a40 0%, #588157 100%);
              color: white;
              padding: 30px;
              border-radius: 10px 10px 0 0;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .header p {
              margin: 10px 0 0 0;
              opacity: 0.9;
              font-size: 16px;
            }
            .content {
              background: #ffffff;
              border: 1px solid #e5e5e5;
              border-top: none;
              padding: 30px;
            }
            .field {
              margin-bottom: 20px;
              padding-bottom: 20px;
              border-bottom: 1px solid #f0f0f0;
            }
            .field:last-child {
              border-bottom: none;
            }
            .label {
              font-weight: 600;
              color: #3a5a40;
              margin-bottom: 5px;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .value {
              color: #333;
              font-size: 16px;
            }
            .message-box {
              background: #f8f4e8;
              padding: 15px;
              border-radius: 8px;
              border-left: 4px solid #3a5a40;
              white-space: pre-wrap;
            }
            .footer {
              text-align: center;
              padding: 20px;
              color: #666;
              font-size: 12px;
            }
            .product-badge {
              display: inline-block;
              background: #dda15e;
              color: white;
              padding: 5px 15px;
              border-radius: 20px;
              font-size: 14px;
              font-weight: 600;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎯 New Quote Request</h1>
            <p>Received on ${timestamp}</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Product</div>
              <div class="value"><span class="product-badge">${displayProductName}</span></div>
            </div>
            
            <div class="field">
              <div class="label">Contact Person</div>
              <div class="value">${fullName}</div>
            </div>
            
            <div class="field">
              <div class="label">Company</div>
              <div class="value">${companyName}</div>
            </div>
            
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${email}">${email}</a></div>
            </div>
            
            <div class="field">
              <div class="label">Country</div>
              <div class="value">${country}</div>
            </div>
            
            ${phone ? `
            <div class="field">
              <div class="label">Phone</div>
              <div class="value">${phone}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">Message / Requirements</div>
              <div class="message-box">${message}</div>
            </div>
          </div>
          <div class="footer">
            <p>This inquiry was submitted through the Virelia website product inquiry form.</p>
            <p>Source: ${productPageUrl}</p>
          </div>
        </body>
      </html>
    `;

    const textContent = `
New Quote Request - ${displayProductName}

Submitted: ${timestamp}

Product: ${displayProductName}
Contact Person: ${fullName}
Company: ${companyName}
Email: ${email}
Country: ${country}
${phone ? `Phone: ${phone}` : ''}

Message / Requirements:
${message}

---
This inquiry was submitted through the Virelia website product inquiry form.
Source: ${productPageUrl}
    `.trim();

    // Send email
    await transporter.sendMail({
      from: `"Virelia Inquiry System" <${smtpFrom}>`,
      to: inquiryEmail,
      replyTo: email,
      subject: `New Quote Request - ${displayProductName}`,
      text: textContent,
      html: htmlContent,
    });

    // After successful email send, attempt to save to Sanity
    // This runs in the background and won't block the response
    if (isSanityWriteConfigured) {
      // Fire and forget - don't await to avoid slowing down response
      createInquiry(sanityInquiry).catch((err) => {
        // Error is already logged in createInquiry, but add context
        console.warn('Sanity write failed after email success, inquiry may not be tracked:', err instanceof Error ? err.message : 'Unknown error');
      });
    }

    return res.status(200).json({
      success: true,
      message: "Inquiry submitted successfully",
    });
  } catch (error) {
    // Log error without exposing sensitive details
    console.error("Error sending email:", error instanceof Error ? error.message : "Unknown error");
    
    // Still try to save to Sanity even if email fails
    if (isSanityWriteConfigured) {
      try {
        await createInquiry(sanityInquiry);
        console.log("Inquiry saved to Sanity despite email failure");
      } catch (sanityError) {
        console.warn("Failed to save inquiry to Sanity after email failure:", sanityError instanceof Error ? sanityError.message : "Unknown error");
      }
    }
    
    return res.status(500).json({
      success: false,
      message: "Failed to send inquiry. Please try again later.",
    });
  }
}
