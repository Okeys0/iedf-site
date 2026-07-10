import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations/forms";

/**
 * Per Technical Architecture Section 5, newsletter signup is intentionally
 * NOT stored in our own Postgres — it posts to the ESP (Buttondown/Mailchimp,
 * provider TBD per Section 11) directly for proper double opt-in and
 * unsubscribe handling. This handler is a thin validation + forwarding layer.
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

  // TODO: forward to Buttondown/Mailchimp API once ESP is selected
  console.log("[newsletter signup]", parsed.data);

  return NextResponse.json({ success: true });
}
