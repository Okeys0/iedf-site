import { NextRequest, NextResponse } from "next/server";
import { adminNotConfigured, adminSessionToken, isAdminRequest, unauthorized } from "@/lib/admin/auth";
import { ensureAdminSchema } from "@/lib/admin/schema";
import { query } from "@/lib/db/client";

export async function GET(request: NextRequest) {
  if (!adminSessionToken()) return adminNotConfigured();
  if (!isAdminRequest(request)) return unauthorized();

  try {
    await ensureAdminSchema();
    const result = await query(
      `SELECT id, email, payload, status, created_at
       FROM submissions
       WHERE form_type = 'contact'
       ORDER BY created_at DESC
       LIMIT 200`
    );
    return NextResponse.json({ messages: result.rows });
  } catch (err) {
    console.error("[admin inbox]", err);
    return NextResponse.json({ error: "Could not load the inbox." }, { status: 500 });
  }
}
