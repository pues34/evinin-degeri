import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { email, code } = await req.json();

        if (!email || !code) {
            return NextResponse.json({ success: false, error: "E-posta adresi ve onay kodu gereklidir." }, { status: 400 });
        }

        const cleanEmail = email.toLowerCase().trim();

        // Find the latest code for this email
        const verification = await prisma.validationCode.findFirst({
            where: {
                identifier: cleanEmail,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        if (!verification) {
            return NextResponse.json({ success: false, error: "Bu e-posta için kayıtlı onay kodu bulunamadı." }, { status: 404 });
        }

        if (verification.isVerified) {
            return NextResponse.json({ success: true, message: "E-posta adresi zaten doğrulanmış." });
        }

        if (new Date() > verification.expiresAt) {
            return NextResponse.json({ success: false, error: "Onay kodunun süresi dolmuş. Lütfen yeni bir kod isteyin." }, { status: 400 });
        }

        if (verification.code !== code.trim()) {
            return NextResponse.json({ success: false, error: "Hatalı bir onay kodu girdiniz." }, { status: 400 });
        }

        // Code matches and is valid, mark as verified
        await prisma.validationCode.update({
            where: { id: verification.id },
            data: { isVerified: true }
        });

        return NextResponse.json({
            success: true,
            message: "E-posta adresi başarıyla doğrulandı."
        });

    } catch (error) {
        console.error("OTP Verify Error:", error);
        return NextResponse.json({ success: false, error: "Doğrulama işlemi sırasında bir hata oluştu." }, { status: 500 });
    }
}
