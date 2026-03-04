import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions) as any;

        if (!session || !session.user || session.user.role !== "realtor") {
            return NextResponse.json({ success: false, error: "Lütfen önce giriş yapın." }, { status: 401 });
        }

        // Mock PayTR Integration: Assume payment is successful immediately.
        // We will add 30 days to their subscription
        const now = new Date();
        const nextMonth = new Date(now.setMonth(now.getMonth() + 1));

        await prisma.realtor.update({
            where: { email: session.user.email },
            data: {
                isPro: true,
                subscriptionEnd: nextMonth
            }
        });

        return NextResponse.json({
            success: true,
            message: "Aboneliğiniz başlatıldı!",
            subscriptionEnd: nextMonth.toISOString()
        });
    } catch (error: any) {
        console.error("Checkout Error:", error);
        return NextResponse.json({ success: false, error: "Ödeme işlemi sırasında bir hata oluştu." }, { status: 500 });
    }
}
