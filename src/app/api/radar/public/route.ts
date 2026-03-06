import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const opportunities = await prisma.radarOpportunity.findMany({
            orderBy: { discount: 'desc' }, // En yüksek indirim oranı en üstte
            take: 20 // Sadece en iyi 20 fırsatı gösterelim
        });

        return NextResponse.json(opportunities);
    } catch (error) {
        console.error("Public Radar GET error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
