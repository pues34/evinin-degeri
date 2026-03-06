import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await prisma.$executeRawUnsafe(`ALTER TABLE "ValuationRequest" ADD COLUMN IF NOT EXISTS "priceFeedback" TEXT;`);
        return NextResponse.json({ success: true, message: "Added priceFeedback column" });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message });
    }
}
