"use server";

import nodemailer from "nodemailer";
import {
   contactFormSchema,
   type ContactFormValues,
} from "@/lib/schemas/contact.schema";

export interface SubmitContactResult {
   success: boolean;
   message: string;
   error?: string;
}

/**
 * Server action to handle contact form submissions.
 * Validates the data on the server and sends an email via Nodemailer.
 * Automatically supports custom SMTP credentials, fallback to Resend SMTP if 
 * a Resend API key is present, and console logging in local development.
 */
export async function submitContactForm(
   data: ContactFormValues
): Promise<SubmitContactResult> {
   try {
      // 1. Server-side validation
      const validationResult = contactFormSchema.safeParse(data);
      if (!validationResult.success) {
         const errorMap = validationResult.error.flatten().fieldErrors;
         const firstError = Object.values(errorMap)[0]?.[0] || "Invalid form data";
         return {
            success: false,
            message: `Validation failed: ${firstError}`,
            error: "VALIDATION_ERROR",
         };
      }

      const { name, shopName, email, message } = validationResult.data;

      // 2. Resolve SMTP / Email credentials
      const smtpHost = process.env.SMTP_HOST || (process.env.RESEND_API_KEY ? "smtp.resend.com" : "");
      const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
      const smtpUser = process.env.SMTP_USER || (process.env.RESEND_API_KEY ? "resend" : "");
      const smtpPassword = process.env.SMTP_PASSWORD || process.env.RESEND_API_KEY || "";
      const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
      console.log("SMTP HOST", smtpHost)
      // 3. Fallback to terminal console log if no credentials are configured
      if (!smtpHost || !smtpUser || !smtpPassword) {
         console.log("\n==========================================");
         console.log("📧 SIMULATED CONTACT FORM SUBMISSION (NODEMAILER MOCK)");
         console.log(`From: ${name} <${email}>`);
         console.log(`Shop: ${shopName}`);
         console.log(`Message: ${message}`);
         console.log("==========================================");
         console.log("ℹ️ Configure SMTP_HOST, SMTP_USER, and SMTP_PASSWORD to send real emails.");
         console.log("==========================================\n");

         // Simulate a small network latency for a realistic UI experience
         await new Promise((resolve) => setTimeout(resolve, 800));

         return {
            success: true,
            message: "Message received! (Development mode simulation)",
         };
      }

      // 4. Send email using Nodemailer
      const toEmail = process.env.CONTACT_EMAIL_TO || "sales@loro.ph";
      const fromEmail = process.env.CONTACT_EMAIL_FROM || `L.O.R.O Contact Form <${smtpUser}>`;

      const transporter = nodemailer.createTransport({
         host: smtpHost,
         port: smtpPort,
         secure: smtpSecure,
         auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
         },
      });

      const info = await transporter.sendMail({
         from: fromEmail,
         to: toEmail,
         replyTo: `"${name}" <${email}>`,
         subject: `New Contact Submission from ${name} (${shopName})`,
         html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
          <div style="margin-bottom: 24px; text-align: center;">
            <span style="font-family: monospace; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #0066FF; background-color: rgba(0, 102, 255, 0.08); padding: 6px 12px; border-radius: 9999px;">
              New Contact Inquiry
            </span>
          </div>
          
          <h2 style="color: #0f172a; font-size: 24px; font-weight: 700; margin: 0 0 8px 0; text-align: center; font-family: inherit;">
            Get in Touch Submission
          </h2>
          <p style="color: #64748b; font-size: 15px; margin: 0 0 32px 0; text-align: center; line-height: 1.5;">
            A new message has been sent from the L.O.R.O. website contact form.
          </p>
          
          <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid #f1f5f9; margin-bottom: 24px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-size: 13px; font-weight: 600; color: #64748b; width: 30%; text-transform: uppercase; letter-spacing: 0.05em; font-family: monospace;">
                  Sender Name
                </td>
                <td style="padding: 8px 0; font-size: 15px; font-weight: 600; color: #0f172a; width: 70%;">
                  ${name}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; font-family: monospace;">
                  Shop Name
                </td>
                <td style="padding: 8px 0; font-size: 15px; font-weight: 600; color: #0f172a;">
                  ${shopName}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; font-family: monospace;">
                  Email Address
                </td>
                <td style="padding: 8px 0; font-size: 15px; font-weight: 500; color: #0066FF;">
                  <a href="mailto:${email}" style="color: #0066FF; text-decoration: none; border-bottom: 1px dotted #0066FF;">
                    ${email}
                  </a>
                </td>
              </tr>
            </table>
          </div>
          
          <div style="margin-bottom: 32px;">
            <h3 style="font-size: 13px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 12px 4px; font-family: monospace;">
              Message Content
            </h3>
            <div style="background-color: #ffffff; padding: 20px; border-radius: 12px; color: #334155; font-size: 15px; line-height: 1.6; white-space: pre-wrap; border: 1px solid #e2e8f0; min-height: 100px; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
              ${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
            </div>
          </div>
          
          <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 0 0 20px 0;" />
          
          <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 0; line-height: 1.5;">
            This email was generated automatically by the L.O.R.O Website backend server using Nodemailer.<br />
            Please reply to this email to contact the sender directly.
          </p>
        </div>
      `,
      });

      console.log("Email sent successfully. Message ID:", info.messageId);

      return {
         success: true,
         message: "Your message has been sent successfully!",
      };
   } catch (error) {
      console.error("Nodemailer Email Error:", error);
      return {
         success: false,
         message: "Failed to send email. Please try again later.",
         error: "EMAIL_SEND_ERROR",
      };
   }
}
