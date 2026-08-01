import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;
    const resume = formData.get("resume") as File | null;

    // Configure Nodemailer with your Gmail account details
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mindbridgexsolutions@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD, // Add this to your .env.local file
      },
    });

    const attachments = [];
    if (resume && resume.size > 0) {
      const buffer = Buffer.from(await resume.arrayBuffer());
      attachments.push({
        filename: resume.name,
        content: buffer,
      });
    }

    // Send email to your inbox
    await transporter.sendMail({
      from: `"MindBridgeX Website" <mindbridgexsolutions@gmail.com>`,
      to: "mindbridgexsolutions@gmail.com",
      replyTo: email,
      subject: `[Website Inquiry] ${subject} - from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      attachments: attachments,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Check server configuration." },
      { status: 500 }
    );
  }
}