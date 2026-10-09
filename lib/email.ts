import nodemailer from "nodemailer";

const sender = process.env.SMTP_USER || "help.bekubazar@gmail.com";

function getTransporter() {
  const password = process.env.SMTP_APP_PASSWORD;
  if (!password) throw new Error("SMTP_APP_PASSWORD is not configured.");

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: sender, pass: password.replace(/\s/g, "") },
  });
}

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  await getTransporter().sendMail({
    from: `SS Bangla Express <${sender}>`,
    to,
    subject: "Reset your SS Bangla Express password",
    text: `We received a request to reset your password. Use this link within 30 minutes:\n\n${resetUrl}\n\nIf you did not request this, you can ignore this email.`,
    html: `<p>We received a request to reset your SS Bangla Express password.</p><p><a href="${resetUrl}">Reset your password</a></p><p>This link expires in 30 minutes. If you did not request this, you can ignore this email.</p>`,
  });
}
