import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password, phone, otpCode } = body;

        if (!name || !email || !password || !phone) {
            return NextResponse.json({ success: false, error: "Ad, e-posta, telefon ve şifre zorunludur." }, { status: 400 });
        }

        if (!otpCode) {
            return NextResponse.json({ success: false, error: "Doğrulama kodu gereklidir." }, { status: 400 });
        }

        // Check validation code
        const validCodeRecord = await prisma.validationCode.findFirst({
            where: {
                identifier: email,
                code: otpCode,
            }
        });

        if (!validCodeRecord) {
            return NextResponse.json({ success: false, error: "Doğrulama kodu hatalı." }, { status: 400 });
        }

        if (validCodeRecord.expiresAt < new Date()) {
            return NextResponse.json({ success: false, error: "Doğrulama kodunun süresi dolmuş. Lütfen tekrar gönderin." }, { status: 400 });
        }

        // Check existing
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({ success: false, error: "Bu e-posta adresi zaten kayıtlı." }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        await prisma.user.create({
            data: {
                name,
                email,
                phone: phone,
                password: hashedPassword,
                isPremium: false
            }
        });

        // Clean up code
        await prisma.validationCode.delete({ where: { id: validCodeRecord.id } });

        return NextResponse.json({ success: true, message: "Hesap başarıyla oluşturuldu." });

    } catch (error: any) {
        console.error("User Registration Error:", error);
        return NextResponse.json({ success: false, error: "Sunucu hatası oluştu." }, { status: 500 });
    }
}
