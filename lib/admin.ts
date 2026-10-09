export function isShipmentAdmin(user: { email: string; role: string }) {
  const admins = (process.env.ADMIN_EMAILS ?? "").split(",").map((value) => value.trim().toLowerCase()).filter(Boolean);
  return user.role === "ADMIN" || admins.includes(user.email.toLowerCase());
}
