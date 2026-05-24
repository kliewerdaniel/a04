import nodemailer from "nodemailer";

const TO_EMAIL = "danielkliewer@gmail.com";

function getTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function sendNotification(subject: string, html: string) {
  const transporter = getTransporter();
  if (!transporter) {
    console.log("SMTP credentials not set — skipping email send");
    return;
  }
  await transporter.sendMail({
    from: TO_EMAIL,
    to: TO_EMAIL,
    subject,
    html,
  });
}
