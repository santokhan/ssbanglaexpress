import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getSessionUser } from "@/lib/auth";
import { isShipmentAdmin } from "@/lib/admin";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await getSessionUser();
  if (!user) redirect("/auth/signin");
  if (!isShipmentAdmin(user.email)) redirect("/");
  return children;
}
