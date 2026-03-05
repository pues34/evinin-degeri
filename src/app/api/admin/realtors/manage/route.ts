import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { realtorId, isPro, action } = body;

        if (!realtorId || !action) {
            return NextResponse.json({ success: false, error: "realtorId ve action gerekli" }, { status: 400 });
        }

        if (action === "togglePro") {
            const subscriptionEnd = isPro ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : new Date();

            await prisma.realtor.update({
                where: { id: realtorId },
                data: {
                    isPro,
                    subscriptionEnd,
                }
            });

            return NextResponse.json({ success: true, message: isPro ? "PRO aktif edildi" : "PRO iptal edildi" });
        }

        return NextResponse.json({ success: false, error: "Bilinmeyen action" }, { status: 400 });
    } catch (error: any) {
        console.error("B2B manage error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
