import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { sendNewChatMessageEmail, sendPasswordResetEmail, sendShipmentBookingEmail } from "@/lib/email";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_ATTEMPTS = 8;
const BATCH_SIZE = 5;
const LEASE_MINUTES = 5;

function asObject(value: Prisma.JsonValue): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid email job payload.");
  return value as Record<string, unknown>;
}

function stringField(data: Record<string, unknown>, key: string): string {
  const value = data[key];
  if (typeof value !== "string") throw new Error(`Invalid email job field: ${key}`);
  return value;
}

async function sendJob(type: string, payload: Prisma.JsonValue) {
  const data = asObject(payload);
  if (type === "PASSWORD_RESET") {
    await sendPasswordResetEmail(stringField(data, "to"), stringField(data, "resetUrl"));
    return;
  }
  if (type === "CHAT_MESSAGE") {
    if (!Array.isArray(data.to) || !data.to.every((item) => typeof item === "string")) throw new Error("Invalid chat email recipients.");
    await sendNewChatMessageEmail({
      to: data.to,
      chatId: stringField(data, "chatId"),
      customerName: stringField(data, "customerName"),
      customerEmail: typeof data.customerEmail === "string" ? data.customerEmail : null,
      message: stringField(data, "message"),
    });
    return;
  }
  if (type === "SHIPMENT_BOOKING") {
    await sendShipmentBookingEmail({
      to: stringField(data, "to"),
      customerName: stringField(data, "customerName"),
      trackingNumber: stringField(data, "trackingNumber"),
      serviceType: stringField(data, "serviceType"),
      origin: stringField(data, "origin"),
      destination: stringField(data, "destination"),
      productType: stringField(data, "productType"),
      packageDescription: stringField(data, "packageDescription"),
      weight: Number(data.weight),
      cartons: Number(data.cartons),
    });
    return;
  }
  throw new Error(`Unknown email job type: ${type}`);
}

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const jobs = await prisma.$queryRaw<Array<{ id: string; type: string; payload: Prisma.JsonValue; attempts: number }>>`
    WITH candidates AS (
      SELECT "id"
      FROM "EmailJob"
      WHERE ("status" = 'PENDING' AND "runAt" <= NOW())
         OR ("status" = 'PROCESSING' AND "lockedAt" < NOW() - (${LEASE_MINUTES} * INTERVAL '1 minute'))
      ORDER BY "runAt", "createdAt"
      FOR UPDATE SKIP LOCKED
      LIMIT ${BATCH_SIZE}
    )
    UPDATE "EmailJob" AS job
    SET "status" = 'PROCESSING', "lockedAt" = NOW(), "attempts" = job."attempts" + 1, "updatedAt" = NOW()
    FROM candidates
    WHERE job."id" = candidates."id"
    RETURNING job."id", job."type", job."payload", job."attempts"
  `;

  let sent = 0;
  let failed = 0;
  for (const job of jobs) {
    try {
      await sendJob(job.type, job.payload);
      await prisma.$executeRaw`
        UPDATE "EmailJob" SET "status" = 'SENT', "sentAt" = NOW(), "lockedAt" = NULL,
          "lastError" = NULL, "updatedAt" = NOW() WHERE "id" = ${job.id}
      `;
      sent += 1;
    } catch (error) {
      const attempts = job.attempts;
      const terminal = attempts >= MAX_ATTEMPTS;
      const delayMinutes = Math.min(60, 2 ** Math.min(attempts, 6));
      const errorText = (error instanceof Error ? error.message : String(error)).slice(0, 4000);
      await prisma.$executeRaw`
        UPDATE "EmailJob" SET "status" = ${terminal ? "FAILED" : "PENDING"},
          "runAt" = NOW() + (${delayMinutes} * INTERVAL '1 minute'), "lockedAt" = NULL,
          "lastError" = ${errorText}, "updatedAt" = NOW() WHERE "id" = ${job.id}
      `;
      failed += 1;
    }
  }
  return NextResponse.json({ claimed: jobs.length, sent, failed });
}
