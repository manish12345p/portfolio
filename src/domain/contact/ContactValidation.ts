import { ContactMessage } from "./ContactMessage";

export class ContactValidation {
  static validate(data: Partial<ContactMessage>): { valid: boolean; errors: Partial<Record<keyof ContactMessage, string>> } {
    const errors: Partial<Record<keyof ContactMessage, string>> = {};

    if (!data.name || data.name.trim() === "") {
      errors.name = "Name is required.";
    }

    if (!data.email || data.email.trim() === "") {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Invalid email format.";
    }

    if (!data.subject || data.subject.trim() === "") {
      errors.subject = "Subject is required.";
    }

    if (!data.message || data.message.trim() === "") {
      errors.message = "Message is required.";
    } else if (data.message.length < 10) {
      errors.message = "Message must be at least 10 characters.";
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  }
}
