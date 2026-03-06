import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await prisma.$executeRawUnsafe(`
            CREATE TABLE IF NOT EXISTS "Payment" (
                "id" TEXT NOT NULL,
                "amount" DOUBLE PRECISION NOT NULL,
                "currency" TEXT NOT NULL DEFAULT 'TRY',
                "status" TEXT NOT NULL DEFAULT 'PENDING',
                "transactionId" TEXT,
                "errorMessage" TEXT,
                "tierPurchased" "SubscriptionTier" NOT NULL,
                "realtorId" TEXT NOT NULL,
                "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP(3) NOT NULL,

                CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
            );
        `);

        await prisma.$executeRawUnsafe(`
            CREATE UNIQUE INDEX IF NOT EXISTS "Payment_transactionId_key" ON "Payment"("transactionId");
        `);

        // Add foreign key constraint safely
        await prisma.$executeRawUnsafe(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM information_schema.table_constraints 
                    WHERE constraint_name = 'Payment_realtorId_fkey'
                ) THEN
                    ALTER TABLE "Payment" ADD CONSTRAINT "Payment_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "Realtor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
                END IF;
            END $$;
        `);

        return NextResponse.json({ success: true, message: "Added Payment table" });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message });
    }
}
