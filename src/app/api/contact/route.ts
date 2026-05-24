import { NextResponse } from "next/server";
import { sendNotification } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, projectType, budget, message, referral } =
      body;

    if (!name || !email || !projectType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await sendNotification(
      `New Contact: ${projectType} from ${name}`,
      `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Company</td><td style="padding:8px">${company || "N/A"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Project Type</td><td style="padding:8px">${projectType}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Budget</td><td style="padding:8px">${budget || "N/A"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Message</td><td style="padding:8px">${message || "N/A"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Source</td><td style="padding:8px">${referral || "N/A"}</td></tr>
        </table>
      `
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
