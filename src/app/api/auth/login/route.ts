// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { verifyAdminCredentials, signAdminToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("[login] body:", body);

    const { email, password } = body || {};
    if (!email || !password) {
      console.warn("[login] missing credentials");
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
    }

    // Verify admin credentials (may throw if DB fails)
    let admin;
    try {
      admin = await verifyAdminCredentials(email, password);
    } catch (err) {
      console.error("[login] verifyAdminCredentials threw:", err);
      return NextResponse.json({ error: "Auth error" }, { status: 500 });
    }
    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Ensure JWT secret exists
    if (!process.env.JWT_SECRET) {
      console.error("[login] JWT_SECRET is not set in environment!");
      return NextResponse.json({ error: "Server misconfiguration (missing JWT_SECRET)" }, { status: 500 });
    }

    // Sign token (guarded)
    let token;
    try {
      token = signAdminToken(admin.id, admin.email);
      if (typeof token !== "string" || token.length === 0) {
        throw new Error("token is not a non-empty string");
      }
    } catch (err) {
      console.error("[login] signAdminToken failed:", err);
      return NextResponse.json({ error: "Server error generating token" }, { status: 500 });
    }

    // Build response and set cookie
    const res = NextResponse.json({ ok: true, email: admin.email });
    try {
      res.cookies.set({
        name: "elitairs_token",
        value: token,
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === "production",
      });
    } catch (err) {
      console.error("[login] res.cookies.set failed:", err);
      return NextResponse.json({ error: "Server error setting cookie" }, { status: 500 });
    }

    console.log("[login] success, cookie set");
    return res;
  } catch (err) {
    console.error("[login] Unexpected error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
