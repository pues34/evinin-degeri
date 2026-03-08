import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// POST: Admin tarafından kullanıcının premium süresini uzat/kısalt
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
        }

        const { userId, action, days } = await req.json();

        if (!userId || !action) {
            return NextResponse.json({ error: "userId ve action gerekli" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });
        }

        const daysToAdd = days || 30;

        if (action === "extend") {
            // Premium süresini uzat
            const currentEnd = user.premiumEnd ? new Date(user.premiumEnd) : new Date();
            const newEnd = new Date(currentEnd);
            newEnd.setDate(newEnd.getDate() + daysToAdd);

            await prisma.user.update({
                where: { id: userId },
                data: {
                    isPremium: true,
                    premiumEnd: newEnd,
                },
            });

            return NextResponse.json({
                success: true,
                message: `Premium ${daysToAdd} gün uzatıldı. Yeni bitiş: ${newEnd.toLocaleDateString("tr-TR")}`,
                newPremiumEnd: newEnd,
            });
        } else if (action === "revoke") {
            // Premium'u iptal et
            await prisma.user.update({
                where: { id: userId },
                data: {
                    isPremium: false,
                    premiumEnd: null,
                },
            });

            return NextResponse.json({
                success: true,
                message: "Premium iptal edildi.",
            });
        } else {
            return NextResponse.json({ error: "Geçersiz action. 'extend' veya 'revoke' olmalı." }, { status: 400 });
        }
    } catch (error: any) {
        console.error("Admin Premium API Error:", error);
        return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
    }
}
