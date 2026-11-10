import { NextRequest, NextResponse } from "next/server";
import {
  adminNotConfigured,
  adminSessionToken,
  clearAdminCookie,
  isAdminRequest,
  setAdminCookie,
} from "@/lib/admin/auth";
import { timingSafeEqual } from "crypto";

function secretsMatch(given: string, expected: string) {
  const left = Buffer.from(given);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export async function GET(request: NextRequest) {
  if (!adminSessionToken()) return adminNotConfigured();
  return NextResponse.json({
    authenticated: isAdminRequest(request),
    resendConfigured: Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL),
    fromEmail: process.env.RESEND_FROM_EMAIL || null,
  });
}

export async function POST(request: NextRequest) {
  const expected = process.env.ADMIN_SECRET;
  if (!expected || !adminSessionToken()) return adminNotConfigured();

  const body = await request.json().catch(() => ({}));
  const secret = typeof body.secret === "string" ? body.secret : "";
  if (!secret || !secretsMatch(secret, expected)) {
    return NextResponse.json({ error: "That secret is not correct." }, { status: 401 });
  }

  return setAdminCookie(NextResponse.json({ ok: true }));
}

export async function DELETE() {
  return clearAdminCookie(NextResponse.json({ ok: true }));
}
