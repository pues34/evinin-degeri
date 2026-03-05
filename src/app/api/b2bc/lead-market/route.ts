import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const { valuationId } = await req.json();

        if (!valuationId) {
            return NextResponse.json({ success: false, error: "Eksik parametre." }, { status: 400 });
        }

        // Clean ID string to ensure it relates to the database.
        const cleanId = valuationId.split("-").pop() || valuationId;

        await prisma.valuationRequest.update({
            where: { id: cleanId },
            data: { wantsToSell: true }
        });

        return NextResponse.json({ success: true, message: "Satış talebi başarıyla alındı. B2B havuzuna eklendi." });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: "Satış havuzu (Lead Market) kaydı başarısız oldu." }, { status: 500 });
    }
}
