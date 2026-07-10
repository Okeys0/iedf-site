import { NextRequest, NextResponse } from "next/server";
import { memberSignupSchema } from "@/lib/validations/forms";

/**
 * Handles both "Become a Member/Volunteer" and "Support IEDF" (giving-intent)
 * submissions from the Join Us page — same shape, different `interest` value.
 * See TODO note in app/api/contact/route.ts for the Postgres/Resend wiring
 * that applies here too.
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

  // TODO: replace with Postgres insert + confirmation email via Resend
  console.log("[member signup]", parsed.data);

  return NextResponse.json({ success: true });
}
