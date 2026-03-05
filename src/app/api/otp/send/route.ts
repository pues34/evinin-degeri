import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ success: false, error: "E-posta adresi eksik." }, { status: 400 });
        }

        const cleanEmail = email.toLowerCase().trim();

        const recentCode = await prisma.validationCode.findFirst({
            where: {
                identifier: cleanEmail,
                createdAt: {
                    gte: new Date(Date.now() - 2 * 60 * 1000) // 2 minutes ago
                }
            }
        });

        if (recentCode) {
            return NextResponse.json({ success: false, error: "Lütfen yeni bir kod istemeden önce 2 dakika bekleyin." }, { status: 429 });
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

        await prisma.validationCode.create({
            data: {
                identifier: cleanEmail,
                code,
                expiresAt
            }
        });

        const message = `Evinin Değeri raporunuzu görüntülemek için doğrulama kodunuz: ${code}\n\nBu kod 10 dakika boyunca geçerlidir.`;

        try {
            if (process.env.RESEND_API_KEY) {
                await resend.emails.send({
                    from: 'Evinin Değeri <bilgi@evindegeri.com>',
                    to: [cleanEmail],
                    subject: 'Değerleme Raporu Doğrulama Kodu',
                    text: message,
                });
            } else {
                console.log("\n\n======== MAIL DEV MODE ========");
                console.log(`To: ${cleanEmail}`);
                console.log(`Code: ${code}`);
                console.log("==============================\n\n");
            }
        } catch (e) {
            console.error("Resend error:", e);
        }

        return NextResponse.json({
            success: true,
            message: "Doğrulama kodu e-posta adresinize gönderildi."
        });

    } catch (error) {
        console.error("OTP Send Error:", error);
        return NextResponse.json({ success: false, error: "Kod gönderilirken bir hata oluştu." }, { status: 500 });
    }
}
