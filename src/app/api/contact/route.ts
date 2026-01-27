import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

/* ---------------------------------------------
   Basic Rate Limit (Memory Based)
--------------------------------------------- */

const RATE_LIMIT = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();

  const windowMs = 10 * 60 * 1000; // 10 min
  const maxRequests = 5;

  const timestamps = RATE_LIMIT.get(ip) || [];

  const recent = timestamps.filter((t) => now - t < windowMs);

  recent.push(now);

  RATE_LIMIT.set(ip, recent);

  return recent.length > maxRequests;
}

/* ---------------------------------------------
   API Handler
--------------------------------------------- */

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      message,
      propertyType,
      captchaToken,
      consent,
    } = body;

    /* ---------------- Meta ---------------- */

    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const userAgent = request.headers.get("user-agent") || "unknown";

    console.log("🔹 Lead:", { name, phone, ip });

    /* ---------------- Rate Limit ---------------- */

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Try later." },
        { status: 429 }
      );
    }

    /* ---------------- Consent Check ---------------- */

    if (!consent) {
      return NextResponse.json(
        { success: false, message: "Consent required" },
        { status: 400 }
      );
    }

    /* ---------------- CAPTCHA ---------------- */

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
      console.error("❌ Missing RECAPTCHA_SECRET_KEY");
      return NextResponse.json(
        { success: false, message: "Server misconfiguration" },
        { status: 500 }
      );
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;

    const captchaRes = await fetch(verifyUrl, { method: "POST" });

    const captchaData = await captchaRes.json();

    if (!captchaData.success) {
      console.warn("⚠️ Captcha Failed:", captchaData);
      return NextResponse.json(
        { success: false, message: "Security verification failed" },
        { status: 400 }
      );
    }

    /* ---------------- Validation ---------------- */

    if (!name || name.trim().length < 3) {
      return NextResponse.json(
        { success: false, message: "Invalid name" },
        { status: 400 }
      );
    }

    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { success: false, message: "Invalid phone number" },
        { status: 400 }
      );
    }

    /* ---------------- Sanitize ---------------- */

    const safeName = name.trim();
    const safeEmail = email?.trim() || "";
    const safeMessage = message?.trim() || "";
    const safeProperty = propertyType || "General";

    /* ---------------- Database ---------------- */

    const newLead = await prisma.lead.create({
      data: {
        name: safeName,
        email: safeEmail,
        phone,
        message: safeMessage,
        propertyType: safeProperty,

        consent: true,
        ipAddress: ip,
        userAgent,
      },
    });

    console.log("✅ Saved Lead:", newLead.id);

    /* ---------------- Email ---------------- */

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Elitairs Website" <${process.env.EMAIL_USER}>`,
      to: "goharchaitanya04@gmail.com",

      subject: `🔥 New Lead: ${safeName} (${safeProperty})`,

      html: `
        <div style="font-family:Arial;padding:20px">

          <h2>New Website Enquiry</h2>

          <p><b>Name:</b> ${safeName}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Email:</b> ${safeEmail || "N/A"}</p>
          <p><b>Interest:</b> ${safeProperty}</p>
          <p><b>Message:</b> ${safeMessage || "N/A"}</p>

          <hr />

          <p><b>Consent:</b> Yes</p>
          <p><b>IP:</b> ${ip}</p>
          <p><b>User Agent:</b> ${userAgent}</p>

          <p style="font-size:12px;color:#777">
            Lead verified with Google reCAPTCHA
          </p>

        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ Email Sent");

    /* ---------------- Success ---------------- */

    return NextResponse.json({
      success: true,
      message: "Lead captured successfully",
    });

  } catch (error: any) {
    console.error("❌ API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
