import { NextRequest, NextResponse } from "next/server";
import { adminNotConfigured, adminSessionToken, isAdminRequest, unauthorized } from "@/lib/admin/auth";
import { ensureAdminSchema } from "@/lib/admin/schema";
import { query } from "@/lib/db/client";

export async function GET(request: NextRequest) {
  if (!adminSessionToken()) return adminNotConfigured();
  if (!isAdminRequest(request)) return unauthorized();

  try {
    await ensureAdminSchema();
    const counts = await query<{ form_type: string; status: string; n: string }>(
      `SELECT form_type, COALESCE(status, 'new') AS status, COUNT(*)::text AS n
       FROM submissions
       GROUP BY form_type, status`
    );

    let donations = 0;
    try {
      const gift = await query<{ n: string }>(`SELECT COUNT(*)::text AS n FROM donations`);
      donations = Number(gift.rows[0]?.n || 0);
    } catch {
      donations = 0;
    }

    const tally = (type: string, status?: string) =>
      counts.rows
        .filter((row) => row.form_type === type && (status ? row.status === status : true))
        .reduce((sum, row) => sum + Number(row.n), 0);

    return NextResponse.json({
      mail: { total: tally("contact"), unread: tally("contact", "new") },
      members: tally("member_signup"),
      newsletter: tally("newsletter"),
      donations,
      resendConfigured: Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL),
      fromEmail: process.env.RESEND_FROM_EMAIL || null,
    });
  } catch (err) {
    console.error("[admin overview]", err);
    return NextResponse.json(
      { error: "Database query failed. Is DATABASE_URL set?" },
      { status: 500 }
    );
  }
}
