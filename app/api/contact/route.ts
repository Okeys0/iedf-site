import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema, inquiryRoutingMap } from "@/lib/validations/forms";

/**
 * TODO (Milestone 4, per Development Roadmap):
 *   1. Write validated submission to Postgres (Neon/Supabase — see
 *      Technical Architecture Section 11 for provider decision)
 *   2. Send routed notification via Resend to inquiryRoutingMap[inquiryType]
 *   3. Add Cloudflare Turnstile verification before processing
 *
 * This handler currently validates and logs only, so the front-end forms
 * are fully wired and ready for that backend work to slot in without
 * touching any page/component code.
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

  // TODO: replace with Postgres insert + Resend send
  console.log("[contact submission]", { ...parsed.data, routedTo: recipient });

  return NextResponse.json({ success: true });
}
