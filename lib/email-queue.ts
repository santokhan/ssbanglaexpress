import { randomUUID } from "node:crypto";
import { Prisma } from "@/generated/prisma/client";

export type EmailJobType = "PASSWORD_RESET" | "CHAT_MESSAGE" | "SHIPMENT_BOOKING";

export async function enqueueEmail(
  tx: Prisma.TransactionClient,
  type: EmailJobType,
  payload: Prisma.InputJsonValue,
) {
  await tx.$executeRaw`
    INSERT INTO "EmailJob" ("id", "type", "payload", "status", "attempts", "runAt", "createdAt", "updatedAt")
    VALUES (${randomUUID()}, ${type}, ${JSON.stringify(payload)}::jsonb, 'PENDING', 0, NOW(), NOW(), NOW())
  `;
}
