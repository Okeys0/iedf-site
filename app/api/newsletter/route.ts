import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations/forms";
import { query } from "@/lib/db/client";
import { sendNotificationEmail } from "@/lib/email/client";

/**
 * Per Technical Architecture Section 5, the long-term plan is to post
 * directly to an ESP (Buttondown/Mailchimp, provider TBD) for proper
 * double opt-in and unsubscribe handling — that hasn't been chosen yet.
 *
 * In the meantime, signups are stored in the same Postgres table as the
 * other forms (form_type = 'newsletter') so nothing is lost. Once an ESP
 * is selected, this should be replaced with (or supplemented by) posting
 * to that ESP's API directly.
 *
 * Note: a per-signup notification email is sent below, same as the other
 * two forms, for consistency. If newsletter signups become frequent
 * enough to be noisy, consider removing this one specifically (or
 * batching into a daily digest) rather than getting an email per signup.
 */
export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const parsed = newsletterSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    await query(
      `INSERT INTO submissions (form_type, payload, email) VALUES ($1, $2, $3)`,
      ["newsletter", JSON.stringify(parsed.data), parsed.data.email]
    );
  } catch (err) {
    console.error("[newsletter signup] DB write failed:", err);
    return NextResponse.json(
      { success: false, errors: { _form: ["Something went wrong. Please try again."] } },
      { status: 500 }
    );
  }

  console.log("[newsletter signup] saved:", parsed.data);

  try {
    await sendNotificationEmail({
      subject: "New newsletter signup",
      html: `<h2>New Newsletter Signup</h2><p><strong>Email:</strong> ${parsed.data.email}</p>`,
    });
  } catch (err) {
    console.error("[newsletter signup] notification email failed:", err);
  }

  return NextResponse.json({ success: true });
}
