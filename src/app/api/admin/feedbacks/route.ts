import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const session = await getServerSession();
        if (!session || !session.user) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const feedbacks = await prisma.valuationRequest.findMany({
            where: {
                priceFeedback: { not: null }
            },
            orderBy: { createdAt: "desc" },
            take: 100,
            select: {
                id: true,
                requestNumber: true,
                createdAt: true,
                city: true,
                district: true,
                neighborhood: true,
                estimatedValue: true,
                overridenValue: true,
                priceFeedback: true
            }
        });

        return NextResponse.json({ success: true, data: feedbacks });
    } catch (error) {
        console.error("Fetch feedbacks error:", error);
        return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
    }
}
