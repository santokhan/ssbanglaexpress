import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";

export default async function SigninLayout({ children }: { children: ReactNode }) {
  if (await getSessionUser()) redirect("/profile");
  return children;
}
