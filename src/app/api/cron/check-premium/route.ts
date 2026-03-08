import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Vercel Cron Job: Her gün çalışır
// vercel.json'a ekle: { "crons": [{ "path": "/api/cron/check-premium", "schedule": "0 3 * * *" }] }

export async function GET(req: Request) {
    // Basit API key koruması
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET || "cron-secret-key"}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const now = new Date();

        // 1. Premium süresi dolan kullanıcıları bul ve ücretsiz katmana geçir
        const expiredUsers = await prisma.user.findMany({
            where: {
                isPremium: true,
                premiumEnd: { lt: now },
            },
            select: { id: true },
        });

        if (expiredUsers.length > 0) {
            const expiredUserIds = expiredUsers.map(u => u.id);

            // Premium'u kapat
            await prisma.user.updateMany({
                where: { id: { in: expiredUserIds } },
                data: { isPremium: false },
            });

            // Bu kullanıcıların aktif ilanlarını pasife çek
            await prisma.listing.updateMany({
                where: {
                    userId: { in: expiredUserIds },
                    status: "APPROVED",
                },
                data: { status: "PENDING" },
            });
        }

        // 2. Süresi dolmuş ilanları pasife çek (30 günlük yayın süresi)
        await prisma.listing.updateMany({
            where: {
                status: "APPROVED",
                expiresAt: { lt: now },
            },
            data: { status: "PENDING" },
        });

        return NextResponse.json({
            success: true,
            expiredPremiumUsers: expiredUsers.length,
            timestamp: now.toISOString(),
        });
    } catch (error) {
        console.error("Cron check-premium error:", error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}
