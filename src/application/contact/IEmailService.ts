import { ContactMessage } from "@/domain/contact/ContactMessage";

export interface IEmailService {
  sendContactEmail(message: ContactMessage): Promise<void>;
}
