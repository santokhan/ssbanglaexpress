CREATE TABLE "PublicRate" (
    "id" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "minWeightKg" DECIMAL(10,2) NOT NULL,
    "maxWeightKg" DECIMAL(10,2),
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "notes" TEXT NOT NULL DEFAULT '',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicRate_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "PublicRate_active_origin_destination_service_minWeightKg_idx"
ON "PublicRate"("active", "origin", "destination", "service", "minWeightKg");
