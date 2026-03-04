import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { companyName, email, password, phone } = body;

        if (!companyName || !email || !password) {
            return NextResponse.json({ success: false, error: "Gerekli alanları doldurunuz." }, { status: 400 });
        }

        const existing = await prisma.realtor.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ success: false, error: "Bu e-posta adresi zaten kullanımda." }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newRealtor = await prisma.realtor.create({
            data: {
                companyName,
                email,
                phone,
                password: hashedPassword,
                isPro: false // Varsayılan olarak PRO değiller, PayTR'den paketi alınca PRO olacaklar
            }
        });

        return NextResponse.json({ success: true, data: { id: newRealtor.id, email: newRealtor.email } });
    } catch (error: any) {
        console.error("B2B Register Error:", error);
        return NextResponse.json({ success: false, error: "Kayıt işlemi başarısız. Lütfen tekrar deneyin." }, { status: 500 });
    }
}
