import { NextRequest, NextResponse } from "next/server";
import { adminNotConfigured, adminSessionToken, isAdminRequest, unauthorized } from "@/lib/admin/auth";
import { ensureAdminSchema } from "@/lib/admin/schema";
import { query } from "@/lib/db/client";

/**
 * Internal submissions feed for the admin console.
 * Auth: signed admin cookie, or Authorization: Bearer <ADMIN_SECRET>.
 */
export async function GET(request: NextRequest) {
  if (!adminSessionToken()) return adminNotConfigured();
  if (!isAdminRequest(request)) return unauthorized();
  await ensureAdminSchema();

  try {
    const result = await query<{
      id: number;
      form_type: string;
      payload: unknown;
      email: string;
      created_at: string;
    }>(
      `SELECT id, form_type, payload, email, created_at
       FROM submissions
       ORDER BY created_at DESC
       LIMIT 200`
    );
    return NextResponse.json({ submissions: result.rows });
  } catch (err) {
    console.error("[admin submissions] query failed:", err);
    return NextResponse.json(
      { error: "Database query failed. Is DATABASE_URL set and the schema applied?" },
      { status: 500 }
    );
  }
}
