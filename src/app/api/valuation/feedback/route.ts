import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { id, feedback } = body;

        if (!id || !feedback) {
            return NextResponse.json({ success: false, error: "ID and feedback are required" }, { status: 400 });
        }

        if (!["YUKSEK", "NORMAL", "DUSUK"].includes(feedback)) {
            return NextResponse.json({ success: false, error: "Invalid feedback value" }, { status: 400 });
        }

        const updated = await prisma.valuationRequest.update({
            where: { id },
            data: { priceFeedback: feedback }
        });

        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        console.error("Feedback error:", error);
        return NextResponse.json({ success: false, error: "Could not save feedback" }, { status: 500 });
    }
}
