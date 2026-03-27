import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, challenge } = await req.json();

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "arikmsn@gmail.com",
      subject: "פנייה חדשה מהאתר | פרשמור",
      text: [
        `שם: ${name}`,
        `טלפון: ${phone}`,
        `אימייל: ${email || "לא סופק"}`,
        `אתגר: ${challenge || "לא סופק"}`,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact route error", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
