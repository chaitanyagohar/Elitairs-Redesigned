import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, captchaToken } = body;

    // 1. VERIFY CAPTCHA WITH GOOGLE (The Missing Link)
    const secretKey = process.env.RECAPTCHA_SECRET_KEY; // From Google Console
    
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;
    const captchaRes = await fetch(verifyUrl, { method: "POST" });
    const captchaData = await captchaRes.json();

    if (!captchaData.success) {
      return NextResponse.json({ success: false, message: "Bot Detected!" }, { status: 400 });
    }

    // 2. SERVER-SIDE VALIDATION (Never trust the client)
    if (!name || name.length < 3) {
      return NextResponse.json({ success: false, message: "Invalid Name" }, { status: 400 });
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ success: false, message: "Invalid Phone" }, { status: 400 });
    }

    // 3. SAVE TO DB (Only if step 1 & 2 pass)
    // await prisma.lead.create({ ... })

    return NextResponse.json({ success: true, message: "Lead Saved" });

  } catch (error) {
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}