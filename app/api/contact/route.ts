import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema, inquiryRoutingMap } from "@/lib/validations/forms";
import { query } from "@/lib/db/client";
import { sendNotificationEmail } from "@/lib/email/client";

/**
 * TODO (remaining Milestone 4 work per Development Roadmap):
 *   Add Cloudflare Turnstile verification before processing.
 *
 * Note on `recipient`: the inquiryRoutingMap addresses (investors@iedf.org,
 * etc.) are placeholders from the original architecture doc — they may not
 * be real, checked mailboxes yet. Until IEDF confirms real departmental
 * inboxes exist, every notification goes to the single ADMIN_NOTIFICATION_EMAIL
 * address instead, with the "would route to" address included in the email
 * body so whoever receives it knows how to forward it internally.
 */
export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const parsed = contactFormSchema.safeParse({
    inquiryType: formData.get("inquiryType"),
    name: formData.get("name"),
    email: formData.get("email"),
    organization: formData.get("organization") || undefined,
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const recipient = inquiryRoutingMap[parsed.data.inquiryType];

  try {
    await query(
      `INSERT INTO submissions (form_type, payload, email) VALUES ($1, $2, $3)`,
      ["contact", JSON.stringify(parsed.data), parsed.data.email]
    );
  } catch (err) {
    console.error("[contact submission] DB write failed:", err);
    return NextResponse.json(
      { success: false, errors: { _form: ["Something went wrong. Please try again or email us directly."] } },
      { status: 500 }
    );
  }

  console.log("[contact submission] saved, would route to:", recipient);

  try {
    await sendNotificationEmail({
      subject: `New ${parsed.data.inquiryType} inquiry from ${parsed.data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Inquiry type:</strong> ${parsed.data.inquiryType} (would route to: ${recipient})</p>
        <p><strong>Name:</strong> ${parsed.data.name}</p>
        <p><strong>Email:</strong> ${parsed.data.email}</p>
        ${parsed.data.organization ? `<p><strong>Organization:</strong> ${parsed.data.organization}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${parsed.data.message}</p>
      `,
    });
  } catch (err) {
    // Non-fatal: submission is already saved above, so the person
    // submitting the form still gets a success response either way.
    console.error("[contact submission] notification email failed:", err);
  }

  return NextResponse.json({ success: true });
}
