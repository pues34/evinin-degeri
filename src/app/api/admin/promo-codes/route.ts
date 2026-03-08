import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET: Admin - tüm promo kodlarını listele
export async function GET() {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const codes = await prisma.promoCode.findMany({
        orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(codes);
}

// POST: Admin - yeni promo kod oluştur
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { code, discountType, discountValue, maxUses, expiresAt } = body;

    if (!code || !discountType || !discountValue || !expiresAt) {
        return NextResponse.json({ error: "Eksik alan" }, { status: 400 });
    }

    try {
        const promo = await prisma.promoCode.create({
            data: {
                code: code.toUpperCase(),
                discountType,
                discountValue: parseFloat(discountValue),
                maxUses: parseInt(maxUses) || 100,
                expiresAt: new Date(expiresAt),
            },
        });
        return NextResponse.json({ success: true, promo });
    } catch (err: any) {
        if (err.code === "P2002") {
            return NextResponse.json({ error: "Bu kod zaten mevcut" }, { status: 409 });
        }
        return NextResponse.json({ error: "Oluşturma hatası" }, { status: 500 });
    }
}

// DELETE: Admin - promo kodu sil
export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();
    await prisma.promoCode.delete({ where: { id } });
    return NextResponse.json({ success: true });
}
