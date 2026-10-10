import { NextResponse } from "next/server";
import { contactSchema } from "@/forms/ContactForm";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = contactSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form input", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { fullName, email, phone, subject, message, honeypot } = result.data;

    // Reject honeypot spam silently
    if (honeypot && honeypot.trim() !== "") {
      console.warn("[Contact API] Honeypot hit detected and ignored.");
      return NextResponse.json({ ok: true });
    }

    // Log payload for development / inspection
    console.log("[Contact API] Enquiry received:", {
      fullName,
      email,
      phone,
      subject,
      messageLength: message.length,
      timestamp: new Date().toISOString(),
    });

    /*
    // Example: Sending email via Resend when configured
    // const recipientEmail = process.env.CONTACT_EMAIL_TO || "admissions@example.com";
    // const resendApiKey = process.env.RESEND_API_KEY;
    // if (resendApiKey) {
    //   await fetch("https://api.resend.com/emails", {
    //     method: "POST",
    //     headers: {
    //       "Authorization": `Bearer ${resendApiKey}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       from: "Admissions Portal <no-reply@gaposa.edu.ng>",
    //       to: [recipientEmail],
    //       reply_to: email,
    //       subject: `[Enquiry: ${subject}] from ${fullName}`,
    //       text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nSubject: ${subject}\n\nMessage:\n${message}`,
    //     }),
    //   });
    // }
    */

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Contact API] Error processing contact submission:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
