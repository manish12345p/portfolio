import { IEmailService } from "@/application/contact/IEmailService";
import { ContactMessage } from "@/domain/contact/ContactMessage";
import nodemailer from "nodemailer";

export class NodemailerEmailService implements IEmailService {
  private transporter: nodemailer.Transporter;
  private contactEmail: string;

  constructor() {
    this.contactEmail = process.env.CONTACT_EMAIL || "";
    
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendContactEmail(message: ContactMessage): Promise<void> {
    if (!this.contactEmail) {
      throw new Error("Server configuration error: CONTACT_EMAIL is not defined.");
    }
    
    // Verify connection configuration (optional but good for debugging)
    // await this.transporter.verify();

    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
      to: this.contactEmail,
      subject: `New Portfolio Contact: ${message.subject}`,
      text: `
New Portfolio Contact

Name: ${message.name}
Email: ${message.email}
Subject: ${message.subject}

Message:
${message.message}

Received At: ${new Date().toISOString()}
      `,
      html: `
        <h2>New Portfolio Contact</h2>
        <p><strong>Name:</strong> ${message.name}</p>
        <p><strong>Email:</strong> ${message.email}</p>
        <p><strong>Subject:</strong> ${message.subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message.message}</p>
        <hr />
        <p><small>Received At: ${new Date().toISOString()}</small></p>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
