import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST: Kullanıcı promo kodunu doğrula
export async function POST(req: NextRequest) {
    try {
        const { code } = await req.json();

        if (!code) {
            return NextResponse.json({ error: "Kod girilmedi" }, { status: 400 });
        }

        const promo = await prisma.promoCode.findUnique({
            where: { code: code.toUpperCase() },
        });

        if (!promo) {
            return NextResponse.json({ error: "Geçersiz promosyon kodu" }, { status: 404 });
        }

        if (!promo.isActive) {
            return NextResponse.json({ error: "Bu kod artık aktif değil" }, { status: 400 });
        }

        if (new Date(promo.expiresAt) < new Date()) {
            return NextResponse.json({ error: "Bu kodun süresi dolmuş" }, { status: 400 });
        }

        if (promo.currentUses >= promo.maxUses) {
            return NextResponse.json({ error: "Bu kod kullanım limitine ulaşmış" }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            discountType: promo.discountType,
            discountValue: promo.discountValue,
            code: promo.code,
        });
    } catch (error) {
        return NextResponse.json({ error: "Doğrulama hatası" }, { status: 500 });
    }
}
