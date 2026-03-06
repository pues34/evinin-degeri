import { NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';

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
            const payment = await prisma.payment.findUnique({ where: { transactionId: merchant_oid } });

            if (payment && payment.status === "PENDING") {
                await prisma.payment.update({
                    where: { id: payment.id },
                    data: { status: "SUCCESS" }
                });

                // Update Realtor Subscription
                if (payment.realtorId) {
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
                }
            }
            return new NextResponse("OK", { status: 200 }); // PayTR "OK" bekler.

        } else {
            // Basarisiz islem
            const payment = await prisma.payment.findUnique({ where: { transactionId: merchant_oid } });

            if (payment && payment.status === "PENDING") {
                await prisma.payment.update({
                    where: { id: payment.id },
                    data: {
                        status: "FAILED",
                        errorMessage: failed_reason_msg || "Banka reddi veya bakiye yetersizliği."
                    }
                });
            }
            return new NextResponse("OK", { status: 200 }); // PayTR "OK" bekler ki bir daha göndermesin
        }

    } catch (e) {
        console.error("PayTR Webhook error: ", e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
