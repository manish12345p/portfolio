import { ContactMessage } from "@/domain/contact/ContactMessage";
import { ContactValidation } from "@/domain/contact/ContactValidation";
import { IEmailService } from "./IEmailService";

export class SubmitContactUseCase {
  constructor(private readonly emailService: IEmailService) {}

  async execute(data: unknown): Promise<{ success: boolean; message: string; errors?: Record<string, string> }> {
    // 1. Validate domain rules
    const validation = ContactValidation.validate(data as Partial<ContactMessage>);
    if (!validation.valid) {
      return {
        success: false,
        message: "Validation failed",
        errors: validation.errors as Record<string, string>,
      };
    }

    // 2. Execute business logic (send email)
    try {
      await this.emailService.sendContactEmail(data as ContactMessage);
      return {
        success: true,
        message: "Message sent successfully.",
      };
    } catch (error: unknown) {
      console.error("SubmitContactUseCase Error:", error);
      return {
        success: false,
        message: "Failed to send the message. Please try again later.",
      };
    }
  }
}
