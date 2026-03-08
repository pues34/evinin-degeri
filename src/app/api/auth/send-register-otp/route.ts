import { NextResponse } from "next/server";
import { Resend } from "resend";
import prisma from "@/lib/prisma";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export const dynamic = 'force-dynamic';

function generateRandomCode(length: number = 6): string {
    const chars = "0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({ success: false, error: "E-posta adresi gereklidir." }, { status: 400 });
        }

        // Check user existence
        const existing = await prisma.user.findUnique({ where: { email } });

        if (existing) {
            return NextResponse.json({ success: false, error: "Bu e-posta adresi sistemde zaten kayıtlı." }, { status: 400 });
        }

        const otpCode = generateRandomCode(6);
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Delete any existing unused codes for this email
        await prisma.validationCode.deleteMany({
            where: { identifier: email },
        });

        // Insert new code
        await prisma.validationCode.create({
            data: {
                identifier: email,
                code: otpCode,
                expiresAt,
            }
        });

        if (resend) {
            await resend.emails.send({
                from: "Evin Değeri Güvenlik <bilgi@evindegeri.com>",
                to: email,
                subject: "Yatırımcı Hesabınızı Doğrulayın",
                html: `
                  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h2 style="color: #2563eb; margin: 0;">Evin Değeri Bireysel Ağ</h2>
                    </div>
                    <div style="background: #f8fafc; padding: 25px; border-radius: 12px; border: 1px solid #e2e8f0; text-align: center;">
                        <h3 style="color: #1e293b; margin-top: 0;">Tek Kullanımlık Onay Kodunuz</h3>
                        <p style="color: #64748b; font-size: 14px; margin-bottom: 25px;">
                            Bireysel yatırımcı hesabınızı oluşturmak için aşağıdaki doğrulama kodunu kullanın:
                        </p>
                        <div style="letter-spacing: 8px; font-size: 32px; font-weight: bold; color: #2563eb; background: #fff; padding: 15px; border-radius: 8px; border: 2px dashed #cbd5e1; display: inline-block;">
                            ${otpCode}
                        </div>
                        <p style="color: #94a3b8; font-size: 12px; margin-top: 25px;">
                            Güvenliğiniz için bu kod <strong>10 dakika</strong> içinde geçersiz olacaktır.<br/>
                            Bu talebi siz yapmadıysanız lütfen bu e-postayı dikkate almayın.
                        </p>
                    </div>
                  </div>
                `
            });
        } else {
            // For local development without Resend key
            console.log(`[DEV ONLY] Registration OTP for ${email}: ${otpCode}`);
        }

        return NextResponse.json({ success: true, message: "Kayıt doğrulama kodu e-posta adresinize gönderildi." });
    } catch (error: any) {
        console.error("Registration OTP Error:", error);
        return NextResponse.json({ success: false, error: "Kod gönderilirken beklenmeyen bir sunucu hatası oluştu." }, { status: 500 });
    }
}
