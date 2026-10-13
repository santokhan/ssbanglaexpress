import { getSessionUser } from "@/lib/auth";
import ChatInbox from "@/components/chat/ChatInbox";

export default async function MessagesPage() {
  const user = await getSessionUser();
  return <ChatInbox user={user ? { id: user.id, name: user.name } : null} />;
}
