import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Resend } from "resend";

import prisma from "@/lib/prisma";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export const dynamic = 'force-dynamic';

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

        // Send email to admin
        if (resend) {
            try {
                await resend.emails.send({
                    from: "Evinin Değeri Sistem <bilgi@evindegeri.com>",
                    to: "evindestek@gmail.com", // Admin E-mail
                    subject: "Yeni B2B Emlakçı Kaydı!",
                    html: `
                      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #2563eb;">Yeni Kurumsal Kullanıcı Katıldı</h2>
                        <p>Sisteme yeni bir kurumsal (B2B) emlakçı kayıt oldu.</p>
                        <ul style="background: #f8fafc; padding: 15px; border-radius: 8px;">
                          <li><strong>Şirket Adı:</strong> ${companyName}</li>
                          <li><strong>E-posta:</strong> ${email}</li>
                          <li><strong>Telefon:</strong> ${phone || "-"}</li>
                        </ul>
                        <p>Yönetim panelinden detayları inceleyebilirsiniz.</p>
                      </div>
                    `
                });
            } catch (err) {
                console.error("Admin bildirimi gönderilemedi:", err);
            }
        }

        return NextResponse.json({ success: true, data: { id: newRealtor.id, email: newRealtor.email } });
    } catch (error: any) {
        console.error("B2B Register Error:", error);
        return NextResponse.json({ success: false, error: "Kayıt işlemi başarısız. Lütfen tekrar deneyin." }, { status: 500 });
    }
}
