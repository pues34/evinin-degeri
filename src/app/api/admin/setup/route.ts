import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const adminCount = await prisma.admin.count();
        if (adminCount > 0) {
            return NextResponse.json({ success: false, error: "Setup zaten daha önce tamamlanmış veya admin mevcut." }, { status: 403 });
        }

        const hashedPassword = await bcrypt.hash("123456", 10);

        const admin = await prisma.admin.create({
            data: {
                name: "Sistem Admin",
                email: "admin@evinin-degeri.com",
                password: hashedPassword
            }
        });

        return NextResponse.json({
            success: true,
            message: "İlk Yönetici hesabı başarıyla oluşturuldu.",
            credentials: {
                email: "admin@evinin-degeri.com",
                password: "123456"
            }
        });
    } catch (error: any) {
        console.error("Setup Error:", error);
        return NextResponse.json({ success: false, error: "Sunucu hatası" }, { status: 500 });
    }
}
