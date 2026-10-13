"use server";

import { createHash, randomBytes, randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/lib/auth";
import { isShipmentAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import type { ChatMessageView, ChatView } from "@/types/chat";
import { requestBotReply } from "./bot";
type Result<T = undefined> =
  | { ok: true; data: T }
  | { ok: false; error: string };
type GuestMessageInput = {
  content?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  contextType?: unknown;
  contextReference?: unknown;
};

const GUEST_COOKIE = "ssbangla_guest_chat";
const GUEST_COOKIE_AGE = 60 * 60 * 24 * 180;
const messageInclude = {
  sender: { select: { id: true, name: true } },
} as const;

function stringValue(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
function tokenHash(token: string) {
  return createHash("sha256").update(token).digest("hex");
}
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function messageView(
  message: {
    id: string;
    content: string | null;
    createdAt: Date;
    senderId: string | null;
    sender: { id: string; name: string } | null;
    data: unknown;
  },
  ownerId: string | null,
  guestName?: string | null,
): ChatMessageView {
  const hasChatMetadata =
    isRecord(message.data) && isRecord(message.data.__chat);
  const chatMetadata = hasChatMetadata ? message.data.__chat : null;
  const isSupportReply =
    isRecord(chatMetadata) &&
    (chatMetadata.source === "admin" || chatMetadata.source === "bot");
  const isLegacyBotReply = message.data !== null && !hasChatMetadata;
  return {
    id: message.id,
    content: message.content ?? "",
    createdAt: message.createdAt.toISOString(),
    senderId: message.senderId,
    senderName: message.sender?.name ?? guestName ?? "Support",
    isOwn:
      !isSupportReply && !isLegacyBotReply && message.senderId === ownerId,
  };
}
function chatView(
  chat: {
    id: string;
    subject: string | null;
    createdById: string | null;
    guestName: string | null;
    guestEmail: string | null;
    guestPhone: string | null;
    contextType: string | null;
    contextReference: string | null;
    updatedAt: Date;
    closedAt: Date | null;
    lastMessage: Parameters<typeof messageView>[0] | null;
    messages: Parameters<typeof messageView>[0][];
  },
  unreadCount = 0,
): ChatView {
  const guest = chat.createdById === null;
  const ownerId = guest ? null : chat.createdById;
  return {
    id: chat.id,
    subject: chat.subject,
    updatedAt: chat.updatedAt.toISOString(),
    closedAt: chat.closedAt?.toISOString() ?? null,
    unreadCount,
    isGuest: guest,
    contextType: chat.contextType,
    contextReference: chat.contextReference,
    user: {
      id: ownerId ?? `guest:${chat.id}`,
      name: chat.guestName ?? "Customer",
      email: chat.guestEmail ?? "",
      phone: chat.guestPhone,
    },
    lastMessage: chat.lastMessage
      ? messageView(chat.lastMessage, ownerId, chat.guestName)
      : null,
    messages: chat.messages.map((message) =>
      messageView(message, ownerId, chat.guestName),
    ),
  };
}

const chatWithMessages = {
  lastMessage: { include: messageInclude },
  messages: {
    where: { deletedAt: null },
    orderBy: { createdAt: "asc" as const },
    take: 200,
    include: messageInclude,
  },
};

export async function getMyChatAction(): Promise<Result<ChatView | null>> {
  const user = await getSessionUser();
  if (user) {
    let chat = await prisma.chat.findFirst({
      where: { createdById: user.id },
      orderBy: { updatedAt: "desc" },
      include: {
        ...chatWithMessages,
        participants: { where: { userId: user.id } },
      },
    });
    if (!chat)
      chat = await prisma.chat.create({
        data: {
          createdById: user.id,
          participants: { create: { userId: user.id } },
        },
        include: {
          ...chatWithMessages,
          participants: { where: { userId: user.id } },
        },
      });
    await prisma.chatParticipant.upsert({
      where: { chatId_userId: { chatId: chat.id, userId: user.id } },
      create: { chatId: chat.id, userId: user.id, lastReadAt: new Date() },
      update: { lastReadAt: new Date() },
    });
    return { ok: true, data: chatView(chat) };
  }

  const token = (await cookies()).get(GUEST_COOKIE)?.value;
  if (!token) return { ok: true, data: null };
  const chat = await prisma.chat.findUnique({
    where: { guestTokenHash: tokenHash(token) },
    include: chatWithMessages,
  });
  return { ok: true, data: chat ? chatView(chat) : null };
}

export async function sendChatMessageAction(
  input: unknown,
): Promise<Result<ChatMessageView>> {
  const user = await getSessionUser();
  const values: GuestMessageInput =
    typeof input === "string"
      ? { content: input }
      : input && typeof input === "object"
        ? (input as GuestMessageInput)
        : {};
  const content = stringValue(values.content, 4000);
  if (!content)
    return { ok: false, error: "Write a message up to 4,000 characters." };

  if (user) {
    let chat = await prisma.chat.findFirst({
      where: { createdById: user.id },
      orderBy: { updatedAt: "desc" },
    });
    if (!chat)
      chat = await prisma.chat.create({
        data: {
          createdById: user.id,
          participants: { create: { userId: user.id } },
        },
      });
    const message = await prisma.$transaction(async (tx) => {
      const created = await tx.message.create({
        data: {
          id: randomUUID(),
          chatId: chat!.id,
          senderId: user.id,
          content,
        },
      });
      await tx.chat.update({
        where: { id: chat!.id },
        data: {
          lastMessageId: created.id,
          updatedAt: new Date(),
          closedAt: null,
        },
      });
      await tx.chatParticipant.upsert({
        where: { chatId_userId: { chatId: chat!.id, userId: user.id } },
        create: { chatId: chat!.id, userId: user.id, lastReadAt: new Date() },
        update: { lastReadAt: new Date(), archivedAt: null },
      });
      return tx.message.findUniqueOrThrow({
        where: { id: created.id },
        include: messageInclude,
      });
    });
    revalidatePath("/admin/chats");
    revalidatePath("/messages");
    await requestBotReply(chat.id, content);
    return { ok: true, data: messageView(message, user.id) };
  }

  const cookieStore = await cookies();
  const existingToken = cookieStore.get(GUEST_COOKIE)?.value;
  let chat = existingToken
    ? await prisma.chat.findUnique({
        where: { guestTokenHash: tokenHash(existingToken) },
      })
    : null;
  if (!chat) {
    const name = stringValue(values.name, 100);
    const email = stringValue(values.email, 254).toLowerCase();
    const phone = stringValue(values.phone, 30);
    const contextType = stringValue(values.contextType, 20).toLowerCase();
    const contextReference = stringValue(values.contextReference, 100);
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return {
        ok: false,
        error: "Enter your name and a valid email address to start this chat.",
      };
    if (
      contextType &&
      !["quote", "shipment", "tracking", "support"].includes(contextType)
    )
      return {
        ok: false,
        error: "Choose a valid reason for contacting support.",
      };
    const guestToken = randomBytes(32).toString("base64url");
    chat = await prisma.chat.create({
      data: {
        guestName: name,
        guestEmail: email,
        guestPhone: phone || null,
        guestTokenHash: tokenHash(guestToken),
        contextType: contextType || null,
        contextReference: contextReference || null,
        messages: { create: { id: randomUUID(), content } },
      },
    });
    const lastMessage = await prisma.message.findFirstOrThrow({
      where: { chatId: chat.id, senderId: null },
      include: messageInclude,
    });
    await prisma.chat.update({
      where: { id: chat.id },
      data: { lastMessageId: lastMessage.id },
    });
    cookieStore.set(GUEST_COOKIE, guestToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: GUEST_COOKIE_AGE,
    });
    revalidatePath("/admin/chats");
    await requestBotReply(chat.id, content);
    return { ok: true, data: messageView(lastMessage, null, chat.guestName) };
  }

  const message = await prisma.$transaction(async (tx) => {
    const created = await tx.message.create({
      data: { id: randomUUID(), chatId: chat!.id, content },
    });
    await tx.chat.update({
      where: { id: chat!.id },
      data: {
        lastMessageId: created.id,
        updatedAt: new Date(),
        closedAt: null,
      },
    });
    return tx.message.findUniqueOrThrow({
      where: { id: created.id },
      include: messageInclude,
    });
  });
  revalidatePath("/admin/chats");
  revalidatePath("/messages");
  await requestBotReply(chat.id, content);
  return { ok: true, data: messageView(message, null, chat.guestName) };
}

export async function listAdminChatsAction(): Promise<Result<ChatView[]>> {
  const admin = await getSessionUser();
  if (!admin || !isShipmentAdmin(admin))
    return {
      ok: false,
      error: "You are not authorized to view support chats.",
    };
  const chats = await prisma.chat.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      ...chatWithMessages,
      createdBy: { select: { id: true } },
      participants: true,
    },
  });
  return {
    ok: true,
    data: chats.map((chat) => {
      const participant = chat.participants.find(
        (item) => item.userId === admin.id,
      );
      const inboundSince =
        participant?.lastReadAt ?? participant?.joinedAt ?? new Date(0);
      const unreadCount = chat.messages.filter(
        (item) =>
          item.senderId === (chat.createdById ?? null) &&
          item.createdAt > inboundSince,
      ).length;
      return chatView(chat, unreadCount);
    }),
  };
}

export async function sendAdminChatMessageAction(
  chatIdInput: unknown,
  contentInput: unknown,
): Promise<Result<ChatMessageView>> {
  const admin = await getSessionUser();
  if (!admin || !isShipmentAdmin(admin))
    return {
      ok: false,
      error: "You are not authorized to reply to support chats.",
    };
  const chatId = typeof chatIdInput === "string" ? chatIdInput : "";
  const content = stringValue(contentInput, 4000);
  if (!chatId || !content)
    return { ok: false, error: "Write a message up to 4,000 characters." };
  const chat = await prisma.chat.findUnique({
    where: { id: chatId },
    select: { id: true, createdById: true, guestName: true },
  });
  if (!chat)
    return {
      ok: false,
      error: "This support conversation could not be found.",
    };
  const message = await prisma.$transaction(async (tx) => {
    const created = await tx.message.create({
      data: {
        id: randomUUID(),
        chatId,
        senderId: admin.id,
        content,
        data: { __chat: { source: "admin" } },
      },
    });
    await tx.chat.update({
      where: { id: chatId },
      data: {
        lastMessageId: created.id,
        updatedAt: new Date(),
        closedAt: null,
      },
    });
    await tx.chatParticipant.upsert({
      where: { chatId_userId: { chatId, userId: admin.id } },
      create: { chatId, userId: admin.id, lastReadAt: new Date() },
      update: { lastReadAt: new Date(), archivedAt: null },
    });
    return tx.message.findUniqueOrThrow({
      where: { id: created.id },
      include: messageInclude,
    });
  });
  revalidatePath("/admin/chats");
  revalidatePath("/messages");
  return {
    ok: true,
    data: messageView(message, chat.createdById, chat.guestName),
  };
}

export async function markAdminChatReadAction(
  chatIdInput: unknown,
): Promise<Result> {
  const admin = await getSessionUser();
  if (!admin || !isShipmentAdmin(admin))
    return {
      ok: false,
      error: "You are not authorized to view support chats.",
    };
  if (typeof chatIdInput !== "string")
    return { ok: false, error: "Conversation not found." };
  const chat = await prisma.chat.findUnique({
    where: { id: chatIdInput },
    select: { id: true },
  });
  if (!chat) return { ok: false, error: "Conversation not found." };
  await prisma.chatParticipant.upsert({
    where: { chatId_userId: { chatId: chatIdInput, userId: admin.id } },
    create: { chatId: chatIdInput, userId: admin.id, lastReadAt: new Date() },
    update: { lastReadAt: new Date() },
  });
  return { ok: true, data: undefined };
}
