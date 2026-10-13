"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

function stringValue(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function requestBotReply(chatId: string, content: string) {
  const BOT_API =
    process.env.BOT_CHAT_API_URL || "https://bot.ssbanglaexpress.com";
  const token = process.env.BOT_CHAT_API_TOKEN;
  if (!token) {
    console.error("[chat-bot] API token is not configured.");
    return;
  }

  try {
    const endpoint = new URL(BOT_API);
    if (!endpoint.pathname.replace(/\/$/, "").endsWith("/api/chat")) {
      endpoint.pathname = `${endpoint.pathname.replace(/\/$/, "")}/api/chat`;
    }
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
      select: { botState: true },
    });
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: content,
        state: isRecord(chat?.botState) ? chat.botState : {},
      }),
      signal: AbortSignal.timeout(25_000),
      cache: "no-store",
    });
    const responseText = await response.text();
    let result: unknown;
    try {
      result = JSON.parse(responseText);
    } catch {
      console.error("[chat-bot] API returned a non-JSON response.", {
        status: response.status,
        statusText: response.statusText,
        body: responseText.slice(0, 8000),
      });
      return;
    }
    const logDetails = {
      status: response.status,
      statusText: response.statusText,
      body: result,
    };
    if (!response.ok) {
      console.error("[chat-bot] API request failed.", logDetails);
      return;
    }
    console.info("[chat-bot] API response received.", logDetails);

    if (!isRecord(result)) {
      console.error("[chat-bot] API response must be a JSON object.", {
        status: response.status,
      });
      return;
    }
    const reply =
      stringValue(result.content, 4000) || stringValue(result.message, 4000);
    const messageData =
      result.data === undefined || result.data === null
        ? undefined
        : (result.data as Prisma.InputJsonValue);
    const botState = isRecord(result.state)
      ? (result.state as unknown as Prisma.InputJsonValue)
      : undefined;

    if (result.paused === true || !reply) {
      if (botState === undefined) return;
      await prisma.chat.update({ where: { id: chatId }, data: { botState } });
      return;
    }

    const adminEmails = [
      ...(process.env.ADMIN_EMAILS ?? ""),
      ...(process.env.SUPERADMIN_EMAILS ?? ""),
    ]
      .join(",")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean);
    const admin = await prisma.user.findFirst({
      where: {
        OR: [
          { role: { in: ["ADMIN", "SUPERADMIN"] } },
          ...(adminEmails.length ? [{ email: { in: adminEmails } }] : []),
        ],
      },
      select: { id: true },
    });
    if (!admin) {
      if (botState === undefined) return;
      await prisma.chat.update({ where: { id: chatId }, data: { botState } });
      return;
    }

    await prisma.$transaction(async (tx) => {
      const message = await tx.message.create({
        data: {
          id: randomUUID(),
          chatId,
          senderId: admin.id,
          content: reply,
          data: {
            __chat: { source: "bot" },
            payload: messageData ?? null,
          },
        },
      });
      await tx.chat.update({
        where: { id: chatId },
        data: {
          ...(botState === undefined ? {} : { botState }),
          lastMessageId: message.id,
          updatedAt: new Date(),
          closedAt: null,
        },
      });
    });
    revalidatePath("/admin/chats");
    revalidatePath("/messages");
  } catch (error) {
    console.error("[chat-bot] API request or response handling failed.", {
      chatId,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
