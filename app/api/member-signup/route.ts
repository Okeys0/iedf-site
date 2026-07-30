import { NextRequest, NextResponse } from "next/server";
import { memberSignupSchema } from "@/lib/validations/forms";
import { query } from "@/lib/db/client";
import { sendNotificationEmail } from "@/lib/email/client";

const interestLabels: Record<string, string> = {
  member: "Become a member",
  volunteer: "Volunteer",
  both: "Member + Volunteer",
  "giving-intent": "Giving interest (Support IEDF)",
};

/**
 * Handles both "Become a Member/Volunteer" and "Support IEDF" (giving-intent)
 * submissions from the Join Us page — same shape, different `interest` value.
 *
 * Note: this sends an internal notification to IEDF, not a confirmation
 * email back to the submitter — that's a separate, not-yet-built feature
 * (an autoresponder) worth adding later if desired.
 */
export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const parsed = memberSignupSchema.safeParse({
    name: formData.get("name") || undefined,
    email: formData.get("email"),
    interest: formData.get("interest"),
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
      ["member_signup", JSON.stringify(parsed.data), parsed.data.email]
    );
  } catch (err) {
    console.error("[member signup] DB write failed:", err);
    return NextResponse.json(
      { success: false, errors: { _form: ["Something went wrong. Please try again."] } },
      { status: 500 }
    );
  }

  console.log("[member signup] saved:", parsed.data);

  try {
    await sendNotificationEmail({
      subject: `New Join Us submission: ${interestLabels[parsed.data.interest] ?? parsed.data.interest}`,
      html: `
        <h2>New Join Us Submission</h2>
        <p><strong>Interest:</strong> ${interestLabels[parsed.data.interest] ?? parsed.data.interest}</p>
        ${parsed.data.name ? `<p><strong>Name:</strong> ${parsed.data.name}</p>` : ""}
        <p><strong>Email:</strong> ${parsed.data.email}</p>
      `,
    });
  } catch (err) {
    console.error("[member signup] notification email failed:", err);
  }

  return NextResponse.json({ success: true });
}
