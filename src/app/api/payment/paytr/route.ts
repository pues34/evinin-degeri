import { NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const formData = await req.formData().catch(() => null);

        if (!formData) {
            return new NextResponse("Invalid Request", { status: 400 });
        }

        const merchant_oid = formData.get('merchant_oid') as string;
        const status = formData.get('status') as string;
        const total_amount = formData.get('total_amount') as string;
        const hash = formData.get('hash') as string;
        const failed_reason_msg = formData.get('failed_reason_msg') as string;

        const merchant_key = process.env.PAYTR_MERCHANT_KEY || "";
        const merchant_salt = process.env.PAYTR_MERCHANT_SALT || "";

        // Bize gelen hash ile bizim olusturdugumuz hash'i eslestiriyoruz
        const hashStr = merchant_oid + merchant_salt + status + total_amount;
        const generatedHash = crypto.createHmac('sha256', merchant_key).update(hashStr).digest('base64');

        if (hash !== generatedHash) {
            console.error("PayTR Hash Mismatch!");
            return new NextResponse("PAYTR notification failed: bad hash", { status: 400 });
        }

        if (status === 'success') {
            const payment = await prisma.payment.findUnique({
                where: { transactionId: merchant_oid },
                include: { realtor: true }
            });

            if (payment && payment.status === "PENDING") {
                await prisma.payment.update({
                    where: { id: payment.id },
                    data: { status: "SUCCESS" }
                });

                // Update Realtor Subscription
                if (payment.realtorId && payment.realtor) {
                    const newEnd = new Date();
                    newEnd.setMonth(newEnd.getMonth() + 1); // 1 aylık uzatma

                    await prisma.realtor.update({
                        where: { id: payment.realtorId },
                        data: {
                            isPro: true,
                            subscriptionTier: payment.tierPurchased as any,
                            subscriptionEnd: newEnd
                        }
                    });

                    // Başarılı ödeme maili
                    if (resend) {
                        await resend.emails.send({
                            from: "Evin Değeri B2B <bilgi@evindegeri.com>",
                            to: payment.realtor.email,
                            subject: "Evin Değeri PRO Abonelik Faturası",
                            html: `
                              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                                <div style="text-align: center; margin-bottom: 30px;">
                                    <h2 style="color: #2563eb; margin: 0;">Evin Değeri Kurumsal</h2>
                                </div>
                                <div style="background: #f8fafc; padding: 25px; border-radius: 12px; border: 1px solid #e2e8f0; text-align: center;">
                                    <h3 style="color: #16a34a; margin-top: 0;">Ödemeniz Başarıyla Alındı 🚀</h3>
                                    <p style="color: #64748b; font-size: 15px; margin-bottom: 25px;">
                                        Sayın ${payment.realtor.companyName},<br/><br/>
                                        <strong>${payment.tierPurchased}</strong> paketiniz başarıyla aktifleştirildi. 1 Ay boyunca PRO algoritmadan ve limitsiz lead kilit açma haklarından faydalanabilirsiniz.
                                    </p>
                                    <p style="color: #94a3b8; font-size: 13px; margin-top: 25px;">
                                        Fatura Tutarı: ${payment.amount} TL<br/>
                                        İşlem No: ${merchant_oid}
                                    </p>
                                </div>
                              </div>
                            `
                        });
                    }
                }
            }
            return new NextResponse("OK", { status: 200 }); // PayTR "OK" bekler.

        } else {
            // Basarisiz islem
            const payment = await prisma.payment.findUnique({
                where: { transactionId: merchant_oid },
                include: { realtor: true }
            });

            if (payment && payment.status === "PENDING") {
                await prisma.payment.update({
                    where: { id: payment.id },
                    data: {
                        status: "FAILED",
                        errorMessage: failed_reason_msg || "Banka reddi veya bakiye yetersizliği."
                    }
                });

                // Başarısız ödeme maili
                if (resend && payment.realtor) {
                    await resend.emails.send({
                        from: "Evin Değeri B2B <bilgi@evindegeri.com>",
                        to: payment.realtor.email,
                        subject: "PRO Abonelik Ödemesi Başarısız",
                        html: `
                          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h2 style="color: #2563eb; margin: 0;">Evin Değeri Kurumsal</h2>
                            </div>
                            <div style="background: #f8fafc; padding: 25px; border-radius: 12px; border: 1px solid #e2e8f0; text-align: center;">
                                <h3 style="color: #dc2626; margin-top: 0;">Ödeme Başarısız Oldu ❌</h3>
                                <p style="color: #64748b; font-size: 15px; margin-bottom: 25px;">
                                    Sayın ${payment.realtor.companyName},<br/><br/>
                                    <strong>${payment.tierPurchased}</strong> paketi için yaptığınız ödeme reddedilmiştir.<br/>
                                    Hata Sebebi: <em>${failed_reason_msg || "Banka reddi veya bakiye yetersizliği."}</em>
                                </p>
                                <p style="color: #94a3b8; font-size: 13px; margin-top: 25px;">
                                    Lütfen kart bilgilerinizi veya bakiyenizi kontrol ederek işleminizi tekrar deneyiniz.
                                </p>
                            </div>
                          </div>
                        `
                    });
                }
            }
            return new NextResponse("OK", { status: 200 }); // PayTR "OK" bekler ki bir daha göndermesin
        }

    } catch (e) {
        console.error("PayTR Webhook error: ", e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
