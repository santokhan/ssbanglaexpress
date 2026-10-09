import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";

export default async function SignupLayout({ children }: { children: ReactNode }) {
  if (await getSessionUser()) redirect("/profile");
  return children;
}
