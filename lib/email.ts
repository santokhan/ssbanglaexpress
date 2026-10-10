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

function escapeHtml(value: string) {
  return value.replace(/[&<>\"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '\"': "&quot;",
    "'": "&#39;",
  })[character]!);
}

export async function sendShipmentBookingEmail(booking: {
  to: string;
  customerName: string;
  trackingNumber: string;
  serviceType: string;
  origin: string;
  destination: string;
  packageDescription: string;
  weight: number;
  cartons: number;
}) {
  const name = escapeHtml(booking.customerName);
  const tracking = escapeHtml(booking.trackingNumber);
  const service = escapeHtml(booking.serviceType);
  const origin = escapeHtml(booking.origin);
  const destination = escapeHtml(booking.destination);
  const contents = escapeHtml(booking.packageDescription);
  const parcel = `${booking.weight} kg | ${booking.cartons} carton${booking.cartons === 1 ? "" : "s"}`;
  const domain = (process.env.DOMAIN || "ssbanglaexpress.com").replace(/^https?:\/\//, "").replace(/\/$/, "");
  const trackingUrl = `https://${domain}/track?tracking=${encodeURIComponent(booking.trackingNumber)}`;

  await getTransporter().sendMail({
    from: `SS Bangla Express <${sender}>`,
    to: booking.to,
    subject: `Booking received | ${booking.trackingNumber}`,
    text: `Hello ${booking.customerName},\n\nYour shipment booking is in. Our team will review the details and contact you to confirm the next steps.\n\nTRACKING NUMBER\n${booking.trackingNumber}\n\nSERVICE: ${booking.serviceType}\nROUTE: ${booking.origin} to ${booking.destination}\nCONTENTS: ${booking.packageDescription}\nPARCEL: ${parcel}\n\nTrack your shipment: ${trackingUrl}\n\nThank you for choosing SS Bangla Express.\n\nSS Bangla Express | Ship with confidence`,
    html: `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="color-scheme" content="light"><title>Booking received</title></head>
  <body style="margin:0;padding:0;background:#f3f5f8;font-family:Arial,Helvetica,sans-serif;color:#172033;-webkit-font-smoothing:antialiased;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">Your shipment booking is in. Keep your tracking number handy.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f3f5f8;padding:32px 12px;">
      <tr><td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;border-collapse:separate;">
          <tr><td style="padding:0 28px 18px;text-align:left;">
            <span style="display:inline-block;width:34px;height:34px;line-height:34px;text-align:center;border-radius:10px;background:#b81e46;color:#fff;font-size:16px;font-weight:800;vertical-align:middle;">S</span>
            <span style="margin-left:9px;color:#172033;font-size:15px;font-weight:800;letter-spacing:.2px;vertical-align:middle;">SS BANGLA <span style="color:#b81e46;">EXPRESS</span></span>
          </td></tr>
          <tr><td style="overflow:hidden;border:1px solid #e6e9ef;border-radius:18px;background:#fff;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr><td style="padding:34px 36px 30px;background:#a61940;background-image:linear-gradient(120deg,#8f1738,#bd244e);color:#fff;">
                <div style="display:inline-block;padding:7px 11px;border:1px solid rgba(255,255,255,.35);border-radius:20px;color:#ffe5eb;font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;">Booking received</div>
                <h1 style="margin:18px 0 9px;font-size:28px;line-height:1.2;letter-spacing:-.5px;color:#fff;">Your shipment is in.</h1>
                <p style="margin:0;color:#f9dfe6;font-size:15px;line-height:1.65;">Hello ${name}, our team will review your details and contact you to confirm the next steps.</p>
              </td></tr>
              <tr><td style="padding:28px 36px 8px;">
                <p style="margin:0 0 10px;color:#697386;font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;">Your tracking number</p>
                <div style="padding:17px 18px;border:1px solid #f0d4dc;border-radius:12px;background:#fff8fa;font-family:Consolas,'Courier New',monospace;font-size:23px;font-weight:800;letter-spacing:2px;color:#a61940;">${tracking}</div>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:20px;"><tr><td align="center" style="border-radius:8px;background:#b81e46;"><a href="${trackingUrl}" style="display:inline-block;padding:13px 21px;border:1px solid #b81e46;border-radius:8px;color:#fff;font-size:14px;font-weight:700;text-decoration:none;">Track your shipment&nbsp; &rsaquo;</a></td></tr></table>
              </td></tr>
              <tr><td style="padding:25px 36px 30px;">
                <h2 style="margin:0 0 14px;color:#172033;font-size:16px;">Booking summary</h2>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #e9ecf1;border-radius:10px;border-collapse:separate;">
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e9ecf1;color:#788294;font-size:12px;width:34%;">Service</td><td style="padding:12px 14px;border-bottom:1px solid #e9ecf1;color:#263247;font-size:13px;font-weight:700;">${service}</td></tr>
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e9ecf1;color:#788294;font-size:12px;">Route</td><td style="padding:12px 14px;border-bottom:1px solid #e9ecf1;color:#263247;font-size:13px;font-weight:700;">${origin} <span style="color:#b81e46;">&rarr;</span> ${destination}</td></tr>
                  <tr><td style="padding:12px 14px;border-bottom:1px solid #e9ecf1;color:#788294;font-size:12px;">Contents</td><td style="padding:12px 14px;border-bottom:1px solid #e9ecf1;color:#263247;font-size:13px;">${contents}</td></tr>
                  <tr><td style="padding:12px 14px;color:#788294;font-size:12px;">Parcel</td><td style="padding:12px 14px;color:#263247;font-size:13px;">${escapeHtml(parcel)}</td></tr>
                </table>
              </td></tr>
              <tr><td style="padding:18px 36px;border-top:1px solid #eef0f4;background:#fafbfc;color:#697386;font-size:12px;line-height:1.7;">Need help? Reply to this email or contact our team at <a href="mailto:info@ssbanglaexpress.com" style="color:#a61940;text-decoration:underline;">info@ssbanglaexpress.com</a>.</td></tr>
            </table>
          </td></tr>
          <tr><td style="padding:18px 24px;text-align:center;color:#929aaa;font-size:11px;line-height:1.7;">Thank you for choosing SS Bangla Express.<br>Ship with confidence.</td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`,
  });
}
