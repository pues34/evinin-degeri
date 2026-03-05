import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { realtorId, isPro, action, tier } = body;

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
                    subscriptionTier: isPro ? "PRO" : "FREE",
                }
            });

            return NextResponse.json({ success: true, message: isPro ? "PRO aktif edildi" : "PRO iptal edildi" });
        }

        if (action === "changeTier") {
            const validTiers = ["FREE", "PRO", "PRO_PLUS"];
            if (!tier || !validTiers.includes(tier)) {
                return NextResponse.json({ success: false, error: "Gecersiz tier" }, { status: 400 });
            }

            const isTierActive = tier !== "FREE";
            const subscriptionEnd = isTierActive ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : new Date();

            await prisma.realtor.update({
                where: { id: realtorId },
                data: {
                    isPro: isTierActive,
                    subscriptionTier: tier,
                    subscriptionEnd,
                }
            });

            return NextResponse.json({ success: true, message: `Tier ${tier} olarak guncellendi` });
        }

        return NextResponse.json({ success: false, error: "Bilinmeyen action" }, { status: 400 });
    } catch (error: any) {
        console.error("B2B manage error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
