import { NextResponse } from "next/server";
import { SubmitContactUseCase } from "@/application/contact/SubmitContactUseCase";
import { NodemailerEmailService } from "@/infrastructure/email/NodemailerEmailService";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Dependency Injection
    const emailService = new NodemailerEmailService();
    const submitContactUseCase = new SubmitContactUseCase(emailService);

    const result = await submitContactUseCase.execute(data);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message, errors: result.errors },
        { status: 400 } // Bad Request for validation errors
      );
    }

    return NextResponse.json(
      { message: result.message },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Route Error:", error);
    // Generic error to avoid exposing server internals
    return NextResponse.json(
      { message: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
