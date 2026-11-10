import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { adminNotConfigured, adminSessionToken, isAdminRequest, unauthorized } from "@/lib/admin/auth";
import { ensureAdminSchema } from "@/lib/admin/schema";
import { query } from "@/lib/db/client";
import { escapeHtml, sendReplyEmail } from "@/lib/email/client";

const replySchema = z.object({
  subject: z.string().trim().min(2).max(180),
  body: z.string().trim().min(2).max(8000),
});

type Ctx = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, { params }: Ctx) {
  if (!adminSessionToken()) return adminNotConfigured();
  if (!isAdminRequest(request)) return unauthorized();

  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) {
    return NextResponse.json({ error: "Invalid message." }, { status: 400 });
  }

  const parsed = replySchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: "Write a subject and a message before sending." }, { status: 400 });
  }

  try {
    await ensureAdminSchema();
    const found = await query<{
      email: string;
      payload: { name?: string; message?: string; inquiryType?: string };
      created_at: string;
    }>(
      `SELECT email, payload, created_at FROM submissions WHERE id = $1 AND form_type = 'contact'`,
      [numericId]
    );
    const original = found.rows[0];
    if (!original) {
      return NextResponse.json({ error: "Message not found." }, { status: 404 });
    }

    const { subject, body } = parsed.data;
    const originalText = original.payload?.message || "";
    const when = new Date(original.created_at).toLocaleString("en-GB", { timeZone: "Africa/Lagos" });
    const html = `
      <div style="font-family:Georgia,serif;color:#143024;line-height:1.6">
        <p>${escapeHtml(body).replace(/\n/g, "<br>")}</p>
        <hr style="border:none;border-top:1px solid #e6d7a8;margin:24px 0">
        <p style="color:#6d7d74;font-size:13px">On ${escapeHtml(when)}, ${escapeHtml(original.payload?.name || original.email)} wrote:</p>
        <blockquote style="margin:0;padding-left:12px;border-left:3px solid #d4a734;color:#3d4a42">
          ${escapeHtml(originalText).replace(/\n/g, "<br>")}
        </blockquote>
        <p style="color:#8a6a1f;font-size:12px;margin-top:28px">Ikeduru Economic Development Forum</p>
      </div>
    `;
    const text = `${body}\n\n---\nOn ${when}, ${original.payload?.name || original.email} wrote:\n${originalText}`;

    const sent = await sendReplyEmail({
      to: original.email,
      subject,
      text,
      html,
    });

    const saved = await query(
      `INSERT INTO email_replies (submission_id, to_email, subject, body, resend_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, to_email, subject, body, resend_id, sent_at`,
      [numericId, original.email, subject, body, sent?.id || null]
    );
    await query(`UPDATE submissions SET status = 'replied' WHERE id = $1`, [numericId]);

    return NextResponse.json({ reply: saved.rows[0] });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not send the reply.";
    console.error("[admin reply]", err);
    const status = message.includes("RESEND_") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
