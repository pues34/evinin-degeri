import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: "Giriş yapmanız gerekmektedir." }, { status: 401 });
        }

        const body = await req.json();
        const { planId, promoCode } = body;

        // Base price (Lansman fiyatı veya normal fiyat)
        const settings = await prisma.systemSettings.findFirst();
        let basePrice = 499; // Lansman fiyatı

        // Lansman tarihi kontrolü — 09/03/2026'dan 1 ay sonra normal fiyat
        const launchDate = new Date("2026-03-09");
        const launchEnd = new Date(launchDate);
        launchEnd.setMonth(launchEnd.getMonth() + 1);
        if (new Date() > launchEnd) {
            basePrice = 999; // Normal fiyat
        }

        let discountAmount = 0;
        let appliedPromo = null;

        // Promo kodu doğrulama ve indirim hesaplama
        if (promoCode) {
            const promo = await prisma.promoCode.findUnique({
                where: { code: promoCode.toUpperCase() },
            });

            if (promo && promo.isActive && new Date(promo.expiresAt) > new Date() && promo.currentUses < promo.maxUses) {
                if (promo.discountType === "PERCENTAGE") {
                    discountAmount = Math.round((basePrice * promo.discountValue) / 100);
                } else {
                    // FIXED amount
                    discountAmount = promo.discountValue;
                }

                // İndirim fiyattan fazla olamaz
                discountAmount = Math.min(discountAmount, basePrice);
                appliedPromo = promo;

                // Promo kodu kullanımını artır
                await prisma.promoCode.update({
                    where: { id: promo.id },
                    data: { currentUses: { increment: 1 } },
                });
            }
        }

        const finalPrice = basePrice - discountAmount;

        // MVP: Mock payment — direkt upgrade
        // Gerçek ödeme entegrasyonu yapılacaksa burada Iyzico/PayTR URL döndürülür
        const premiumEnd = new Date();
        premiumEnd.setDate(premiumEnd.getDate() + 30);

        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                isPremium: true,
                premiumEnd,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Ödeme başarılı! Premium özelliklere artık erişebilirsiniz.",
            redirectUrl: "/profil?upgrade=success",
            payment: {
                basePrice,
                discountAmount,
                finalPrice,
                promoApplied: appliedPromo ? appliedPromo.code : null,
            }
        });

    } catch (error: any) {
        console.error("Payment API Error:", error);
        return NextResponse.json({ error: "Ödeme işlemi sırasında bir hata oluştu." }, { status: 500 });
    }
}
