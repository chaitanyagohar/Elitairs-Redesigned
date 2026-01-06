import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, propertyType, captchaToken } = body;

    console.log("🔹 1. Received Lead Submission:", { name, phone, propertyType });

    // --- 1. SECURITY: VERIFY CAPTCHA ---
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      console.error("❌ Server Error: Missing RECAPTCHA_SECRET_KEY in .env");
      return NextResponse.json({ success: false, message: "Server Misconfiguration" }, { status: 500 });
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;
    const captchaRes = await fetch(verifyUrl, { method: "POST" });
    const captchaData = await captchaRes.json();

    if (!captchaData.success) {
      console.warn("⚠️ Bot Detected. Captcha Failed.");
      return NextResponse.json({ success: false, message: "Security Check Failed" }, { status: 400 });
    }

    // --- 2. VALIDATION: SERVER SIDE ---
    if (!name || name.length < 3) {
      return NextResponse.json({ success: false, message: "Invalid Name provided" }, { status: 400 });
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ success: false, message: "Invalid Indian Mobile Number" }, { status: 400 });
    }

    // --- 3. DATABASE: SAVE LEAD ---
    console.log("🔹 2. Attempting to save to Database...");
    
    // ⚠️ IMPORTANT: If this fails, the error will be caught in the catch block below
    const newLead = await prisma.lead.create({
      data: {
        name,
        email: email || "",
        phone,
        message: message || "",
        propertyType: propertyType || "General",
      }
    });

    console.log("✅ 3. DB Save Successful! New Lead ID:", newLead.id);

    // --- 4. NOTIFICATION: SEND EMAIL ---
    console.log("🔹 4. Attempting to send Email...");
    
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
      subject: `🔥 New Lead: ${name} (${propertyType || "General"})`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #000;">New Website Enquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
          <p><strong>Email:</strong> ${email || "Not Provided"}</p>
          <p><strong>Interest:</strong> ${propertyType || "Not Specified"}</p>
          <p><strong>Message:</strong> ${message || "No message"}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #888;">This lead passed Google reCAPTCHA v2 security check.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ 5. Email Sent Successfully.");

    return NextResponse.json({ success: true, message: "Lead captured successfully" });

  } catch (error: any) {
    // 🔴 THIS LOG IS CRITICAL FOR DEBUGGING
    console.error("❌ CRITICAL API ERROR:", error);
    
    // Return the actual error message so you can see it in the Network Tab if needed
    return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
  }
}