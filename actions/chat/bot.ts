"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma/client";
import { enqueueEmail } from "@/lib/email-queue";
import { prisma } from "@/lib/prisma";

function stringValue(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

const fallbackReply =
  "Thank you for contacting us. Our support team will contact you very soon.";

function configuredAdminEmails() {
  return [
    ...(process.env.ADMIN_EMAILS ?? ""),
    ...(process.env.SUPERADMIN_EMAILS ?? ""),
  ]
    .join(",")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

async function notifyAdminsOfIncomingMessage(
  chatId: string,
  content: string,
  chat: {
    guestName: string | null;
    guestEmail: string | null;
    createdBy: { name: string; email: string } | null;
  } | null,
) {
  try {
    const admins = await prisma.user.findMany({
      where: { role: { in: ["ADMIN", "SUPERADMIN"] } },
      select: { email: true },
    });
    const recipients = [
      ...new Set([
        ...configuredAdminEmails(),
        ...admins.map((admin) => admin.email.trim().toLowerCase()),
      ]),
    ];
    if (recipients.length === 0) {
      console.error("[chat-bot] No admin email recipients are configured.", {
        chatId,
      });
      return;
    }
    await prisma.$transaction((tx) => enqueueEmail(tx, "CHAT_MESSAGE", {
      to: recipients,
      chatId,
      customerName: chat?.createdBy?.name ?? chat?.guestName ?? "Customer",
      customerEmail: chat?.createdBy?.email ?? chat?.guestEmail ?? null,
      message: content,
    }));
  } catch (error) {
    console.error("[chat-bot] Admin notification email failed.", {
      chatId,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

async function storeSupportReply(
  chatId: string,
  content: string,
  source: "bot" | "fallback",
  payload?: Prisma.InputJsonValue,
  botState?: Prisma.InputJsonValue,
) {
  const adminEmails = configuredAdminEmails();
  const admin = await prisma.user.findFirst({
    where: {
      OR: [
        { role: { in: ["ADMIN", "SUPERADMIN"] } },
        ...(adminEmails.length ? [{ email: { in: adminEmails } }] : []),
      ],
    },
    select: { id: true },
  });

  await prisma.$transaction(async (tx) => {
    const message = await tx.message.create({
      data: {
        id: randomUUID(),
        chatId,
        senderId: admin?.id ?? null,
        content,
        data: {
          __chat: { source },
          ...(source === "bot" ? { payload: payload ?? null } : {}),
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
}

export async function requestBotReply(chatId: string, content: string) {
  let chat: {
    botState: unknown;
    guestName: string | null;
    guestEmail: string | null;
    createdBy: { name: string; email: string } | null;
  } | null = null;

  try {
    chat = await prisma.chat.findUnique({
      where: { id: chatId },
      select: {
        botState: true,
        guestName: true,
        guestEmail: true,
        createdBy: { select: { name: true, email: true } },
      },
    });
  } catch (error) {
    console.error("[chat-bot] Could not load chat details.", {
      chatId,
      error: error instanceof Error ? error.message : String(error),
    });
  }

  await notifyAdminsOfIncomingMessage(chatId, content, chat);

  let botState: Prisma.InputJsonValue | undefined;
  const token = process.env.BOT_CHAT_API_TOKEN;
  if (!token) {
    console.error("[chat-bot] API token is not configured.");
  } else {
    try {
      const botApi =
        process.env.BOT_CHAT_API_URL || "https://bot.ssbanglaexpress.com";
      const endpoint = new URL(botApi);
      if (!endpoint.pathname.replace(/\/$/, "").endsWith("/api/chat")) {
        endpoint.pathname = `${endpoint.pathname.replace(/\/$/, "")}/api/chat`;
      }
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
        result = undefined;
        console.error("[chat-bot] API returned a non-JSON response.", {
          status: response.status,
          statusText: response.statusText,
          body: responseText.slice(0, 8000),
        });
      }

      if (result !== undefined) {
        const logDetails = {
          status: response.status,
          statusText: response.statusText,
          body: result,
        };
        if (!response.ok) {
          console.error("[chat-bot] API request failed.", logDetails);
        } else {
          console.info("[chat-bot] API response received.", logDetails);
          if (isRecord(result)) {
            botState = isRecord(result.state)
              ? (result.state as unknown as Prisma.InputJsonValue)
              : undefined;
            const reply =
              stringValue(result.content, 4000) ||
              stringValue(result.message, 4000);
            const payload =
              result.data === undefined || result.data === null
                ? undefined
                : (result.data as Prisma.InputJsonValue);

            if (reply && result.paused !== true) {
              await storeSupportReply(chatId, reply, "bot", payload, botState);
              return;
            }
          } else {
            console.error("[chat-bot] API response must be a JSON object.", {
              status: response.status,
            });
          }
        }
      }
    } catch (error) {
      console.error("[chat-bot] API request or response handling failed.", {
        chatId,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  try {
    await storeSupportReply(chatId, fallbackReply, "fallback", undefined, botState);
  } catch (error) {
    console.error("[chat-bot] Could not store fallback reply.", {
      chatId,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
