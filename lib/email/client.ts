import { Resend } from "resend";

/**
 * Sends an internal notification email to IEDF whenever a form is
 * submitted (see README "Connecting Resend" for setup).
 *
 * Deliberately non-fatal: if this fails (missing API key, Resend outage,
 * unverified domain, etc.), the caller should log it and continue —
 * the form submission is already safely stored in Postgres by the time
 * this runs, so a failed notification should never turn into a failed
 * request for the person submitting the form.
 */
export async function sendNotificationEmail({
  subject,
  html,
}: {
  subject: string;
  html: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  // Resend's shared sandbox sender — works without verifying a domain,
  // but can only deliver to the email address you signed up to Resend
  // with, until IEDF verifies iedf.org.ng (or another domain) in the
  // Resend dashboard. See README for details.
  const fromEmail = process.env.RESEND_FROM_EMAIL || "IEDF Website <onboarding@resend.dev>";

  if (!apiKey || !toEmail) {
    console.warn(
      "[email] Skipped — RESEND_API_KEY and/or ADMIN_NOTIFICATION_EMAIL not set. " +
        "See README 'Connecting Resend' for setup."
    );
    return { skipped: true };
  }

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    subject,
    html,
  });

  if (error) {
    // Thrown as a real Error so callers' try/catch logs it consistently
    // alongside DB errors, without crashing the request.
    throw new Error(`Resend send failed: ${JSON.stringify(error)}`);
  }

  return data;
}
