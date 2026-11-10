import { NextRequest, NextResponse } from "next/server";
import { adminNotConfigured, adminSessionToken, isAdminRequest, unauthorized } from "@/lib/admin/auth";
import { ensureAdminSchema } from "@/lib/admin/schema";
import { query } from "@/lib/db/client";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Ctx) {
  if (!adminSessionToken()) return adminNotConfigured();
  if (!isAdminRequest(request)) return unauthorized();

  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) {
    return NextResponse.json({ error: "Invalid message." }, { status: 400 });
  }

  try {
    await ensureAdminSchema();
    const message = await query(
      `UPDATE submissions
       SET status = CASE WHEN status = 'new' THEN 'read' ELSE status END
       WHERE id = $1 AND form_type = 'contact'
       RETURNING id, email, payload, status, created_at`,
      [numericId]
    );
    if (!message.rows[0]) {
      return NextResponse.json({ error: "Message not found." }, { status: 404 });
    }

    const replies = await query(
      `SELECT id, to_email, subject, body, resend_id, sent_at
       FROM email_replies
       WHERE submission_id = $1
       ORDER BY sent_at ASC`,
      [numericId]
    );

    return NextResponse.json({ message: message.rows[0], replies: replies.rows });
  } catch (err) {
    console.error("[admin message]", err);
    return NextResponse.json({ error: "Could not open this message." }, { status: 500 });
  }
}
