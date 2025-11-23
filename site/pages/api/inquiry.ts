import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

interface InquiryData {
  fullName: string;
  companyName: string;
  email: string;
  country: string;
  phone?: string;
  message: string;
  productName: string;
  productSlug: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
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
  }: InquiryData = req.body;

  // Validate required fields
  if (!fullName || !companyName || !email || !country || !message || !productName) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Check if SMTP environment variables are configured
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || smtpUser;
  const inquiryEmail = process.env.INQUIRY_EMAIL || "batinhincer@frezya.nl";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://virelia.com";

  // In development, if SMTP is not configured, log the inquiry and return success
  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    if (process.env.NODE_ENV === "development") {
      console.log("=== INQUIRY SUBMISSION (SMTP NOT CONFIGURED) ===");
      console.log("Product:", productName);
      console.log("From:", fullName, `(${email})`);
      console.log("Company:", companyName);
      console.log("Country:", country);
      console.log("Phone:", phone || "Not provided");
      console.log("Message:", message);
      console.log("===============================================");
      
      return res.status(200).json({
        message: "Inquiry received (development mode - email not sent)",
      });
    } else {
      return res.status(500).json({
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
              <div class="value"><span class="product-badge">${productName}</span></div>
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
            <p>Product Page: ${baseUrl}/product/${productSlug}</p>
          </div>
        </body>
      </html>
    `;

    const textContent = `
New Quote Request - ${productName}

Submitted: ${timestamp}

Product: ${productName}
Contact Person: ${fullName}
Company: ${companyName}
Email: ${email}
Country: ${country}
${phone ? `Phone: ${phone}` : ''}

Message / Requirements:
${message}

---
This inquiry was submitted through the Virelia website product inquiry form.
Product Page: ${baseUrl}/product/${productSlug}
    `.trim();

    // Send email
    await transporter.sendMail({
      from: `"Virelia Inquiry System" <${smtpFrom}>`,
      to: inquiryEmail,
      replyTo: email,
      subject: `New Quote Request - ${productName}`,
      text: textContent,
      html: htmlContent,
    });

    return res.status(200).json({
      message: "Inquiry submitted successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      message: "Failed to send inquiry. Please try again later.",
    });
  }
}
