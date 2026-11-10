import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const ADMIN_COOKIE = "iedf_admin";

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

/** Stable session token derived from ADMIN_SECRET. The raw secret is never stored in the cookie. */
export function adminSessionToken() {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return null;
  return createHmac("sha256", secret).update("iedf-admin-v1").digest("hex");
}

export function isValidAdminToken(value: string | undefined | null) {
  const token = adminSessionToken();
  if (!token || !value) return false;
  return safeEqual(value, token);
}

export function isAdminRequest(request: NextRequest) {
  const cookie = request.cookies.get(ADMIN_COOKIE)?.value;
  if (isValidAdminToken(cookie)) return true;

  const bearer = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const secret = process.env.ADMIN_SECRET;
  if (bearer && secret && safeEqual(bearer, secret)) return true;
  return isValidAdminToken(bearer);
}

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export function adminNotConfigured() {
  return NextResponse.json(
    { error: "ADMIN_SECRET is not configured on the server." },
    { status: 503 }
  );
}

export async function adminAuthed() {
  const jar = await cookies();
  return isValidAdminToken(jar.get(ADMIN_COOKIE)?.value);
}

export function setAdminCookie(response: NextResponse) {
  const token = adminSessionToken();
  if (!token) return response;
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}

export function clearAdminCookie(response: NextResponse) {
  response.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}
