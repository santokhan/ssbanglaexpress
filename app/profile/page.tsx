import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  const user = await getSessionUser();
  if (!user) redirect("/auth/signin");
  return <ProfileClient user={user} />;
}
