CREATE TABLE IF NOT EXISTS "EmailJob" (
  "id" text PRIMARY KEY,
  "type" text NOT NULL,
  "payload" jsonb NOT NULL,
  "status" text NOT NULL DEFAULT 'PENDING'
    CHECK ("status" IN ('PENDING', 'PROCESSING', 'SENT', 'FAILED')),
  "attempts" integer NOT NULL DEFAULT 0 CHECK ("attempts" >= 0),
  "runAt" timestamptz NOT NULL DEFAULT now(),
  "lockedAt" timestamptz,
  "sentAt" timestamptz,
  "lastError" text,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "EmailJob_status_runAt_idx"
  ON "EmailJob" ("status", "runAt");
CREATE INDEX IF NOT EXISTS "EmailJob_status_lockedAt_idx"
  ON "EmailJob" ("status", "lockedAt");
