import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db/client";

/**
 * Internal submissions feed for the admin console.
 * Auth: Authorization: Bearer <ADMIN_SECRET> (or x-admin-secret header).
 */
export async function GET(request: NextRequest) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "ADMIN_SECRET is not configured on the server." },
      { status: 503 }
    );
  }

  const header =
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ||
    request.headers.get("x-admin-secret");

  if (!header || header !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
