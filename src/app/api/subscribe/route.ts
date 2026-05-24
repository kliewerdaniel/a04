import { NextResponse } from "next/server";
import { sendNotification } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, source, resource } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    await sendNotification(
      `New Newsletter Subscriber: ${email}`,
      `
        <h2>New Newsletter Subscription</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${name || "N/A"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Source</td><td style="padding:8px">${source || "N/A"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Resource</td><td style="padding:8px">${resource || "N/A"}</td></tr>
        </table>
      `
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
