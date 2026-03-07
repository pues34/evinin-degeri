import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== "user") {
            return NextResponse.json({ success: false, error: "Yetkisiz erişim" }, { status: 401 });
        }

        const userId = (session.user as any).id;
        const body = await req.json();
        const { name, phone, currentPassword, newPassword } = body;

        // Fetch current user from DB
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return NextResponse.json({ success: false, error: "Kullanıcı bulunamadı" }, { status: 404 });
        }

        const updateData: any = {};
        if (name !== undefined) updateData.name = name;
        if (phone !== undefined) updateData.phone = phone;

        // Handle password change if specified
        if (currentPassword && newPassword) {
            const isValid = await bcrypt.compare(currentPassword, user.password);
            if (!isValid) {
                return NextResponse.json({ success: false, error: "Mevcut şifre hatalı" }, { status: 400 });
            }
            if (newPassword.length < 6) {
                return NextResponse.json({ success: false, error: "Yeni şifre en az 6 karakter olmalıdır" }, { status: 400 });
            }
            updateData.password = await bcrypt.hash(newPassword, 10);
        } else if (newPassword) {
            return NextResponse.json({ success: false, error: "Şifre değiştirmek için mevcut şifrenizi girmelisiniz" }, { status: 400 });
        }

        await prisma.user.update({
            where: { id: userId },
            data: updateData
        });

        return NextResponse.json({ success: true, message: "Profil başarıyla güncellendi" });

    } catch (error) {
        console.error("User profile update error:", error);
        return NextResponse.json({ success: false, error: "Sunucu hatası oluştu" }, { status: 500 });
    }
}
