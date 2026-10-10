export type AppRole = "SUPERADMIN" | "ADMIN" | "USER";

function configuredEmails(name: "ADMIN_EMAILS" | "SUPERADMIN_EMAILS") {
  return (process.env[name] ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

export function effectiveRole(user: { email: string; role: string }): AppRole {
  const email = user.email.toLowerCase();
  if (user.role === "SUPERADMIN" || configuredEmails("SUPERADMIN_EMAILS").includes(email)) {
    return "SUPERADMIN";
  }
  if (user.role === "ADMIN" || configuredEmails("ADMIN_EMAILS").includes(email)) {
    return "ADMIN";
  }
  return "USER";
}

export function isShipmentAdmin(user: { email: string; role: string }) {
  return effectiveRole(user) !== "USER";
}

export function isSuperAdmin(user: { email: string; role: string }) {
  return effectiveRole(user) === "SUPERADMIN";
}
