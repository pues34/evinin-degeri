import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== "realtor") {
            return NextResponse.json({ success: false, error: "Yetkisiz erişim" }, { status: 401 });
        }

        const realtorId = (session.user as any).id;
        const body = await req.json();
        const { companyName, phone, taxOffice, taxNumber, address, customLogoUrl, currentPassword, newPassword } = body;

        // Fetch current realtor from DB
        const realtor = await prisma.realtor.findUnique({
            where: { id: realtorId }
        });

        if (!realtor) {
            return NextResponse.json({ success: false, error: "Kurumsal hesap bulunamadı" }, { status: 404 });
        }

        const updateData: any = {};
        if (companyName !== undefined) updateData.companyName = companyName;
        if (phone !== undefined) updateData.phone = phone;
        if (taxOffice !== undefined) updateData.taxOffice = taxOffice;
        if (taxNumber !== undefined) updateData.taxNumber = taxNumber;
        if (address !== undefined) updateData.address = address;
        if (customLogoUrl !== undefined) updateData.customLogoUrl = customLogoUrl;

        // Handle password change if specified
        if (currentPassword && newPassword) {
            const isValid = await bcrypt.compare(currentPassword, realtor.password);
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

        await prisma.realtor.update({
            where: { id: realtorId },
            data: updateData
        });

        return NextResponse.json({ success: true, message: "Firma bilgileri başarıyla güncellendi" });

    } catch (error) {
        console.error("Realtor profile update error:", error);
        return NextResponse.json({ success: false, error: "Sunucu hatası oluştu" }, { status: 500 });
    }
}
