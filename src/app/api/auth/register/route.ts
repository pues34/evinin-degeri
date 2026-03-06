import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password, phone } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ success: false, error: "Ad, e-posta ve şifre zorunludur." }, { status: 400 });
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
                phone: phone || null,
                password: hashedPassword,
                isPremium: false
            }
        });

        return NextResponse.json({ success: true, message: "Hesap başarıyla oluşturuldu." });

    } catch (error: any) {
        console.error("User Registration Error:", error);
        return NextResponse.json({ success: false, error: "Sunucu hatası oluştu." }, { status: 500 });
    }
}
