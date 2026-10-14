export type ChatMessageView = {
  id: string;
  content: string;
  createdAt: string;
  senderId: string | null;
  role: "CUSTOMER" | "SUPPORT";
  senderName: string;
  isOwn?: boolean;
};

export type ChatView = {
  id: string;
  subject: string | null;
  updatedAt: string;
  closedAt: string | null;
  unreadCount: number;
  isGuest: boolean;
  contextType: string | null;
  contextReference: string | null;
  user: { id: string; name: string; email: string; phone?: string | null };
  lastMessage: ChatMessageView | null;
  messages: ChatMessageView[];
};
