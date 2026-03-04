export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, subject, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ success: false, error: "İsim, e-posta ve mesaj alanları zorunludur." }, { status: 400 });
        }

        const newMsg = await prisma.contactMessage.create({
            data: {
                name,
                email,
                phone: phone || null,
                subject: subject || null,
                message
            }
        });

        return NextResponse.json({ success: true, data: newMsg });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json({ success: false, error: "Mesajınız iletilemedi, sunucu hatası." }, { status: 500 });
    }
}
