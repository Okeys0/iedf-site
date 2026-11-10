import { NextRequest, NextResponse } from "next/server";
import { adminNotConfigured, adminSessionToken, isAdminRequest, unauthorized } from "@/lib/admin/auth";
import { ensureAdminSchema } from "@/lib/admin/schema";
import { query } from "@/lib/db/client";

export async function GET(request: NextRequest) {
  if (!adminSessionToken()) return adminNotConfigured();
  if (!isAdminRequest(request)) return unauthorized();

  const type = request.nextUrl.searchParams.get("type");

  try {
    await ensureAdminSchema();

    if (type === "donations") {
      try {
        const gifts = await query(
          `SELECT id, reference, email, amount, currency, status, paid_at, created_at
           FROM donations
           ORDER BY created_at DESC
           LIMIT 200`
        );
        return NextResponse.json({ records: gifts.rows });
      } catch {
        return NextResponse.json({
          records: [],
          notice: "The donations table is not in the database yet. Run lib/db/migrations/donations-table.sql.",
        });
      }
    }

    if (type !== "member_signup" && type !== "newsletter") {
      return NextResponse.json({ error: "Unknown record type." }, { status: 400 });
    }

    const result = await query(
      `SELECT id, email, payload, status, created_at
       FROM submissions
       WHERE form_type = $1
       ORDER BY created_at DESC
       LIMIT 200`,
      [type]
    );
    return NextResponse.json({ records: result.rows });
  } catch (err) {
    console.error("[admin records]", err);
    return NextResponse.json({ error: "Could not load these records." }, { status: 500 });
  }
}
