import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions) as any;

        if (!session || !session.user || session.user.role !== "realtor") {
            return NextResponse.json({ success: false, error: "Lütfen önce giriş yapın." }, { status: 401 });
        }

        const merchant_id = process.env.PAYTR_MERCHANT_ID || "";
        const merchant_key = process.env.PAYTR_MERCHANT_KEY || "";
        const merchant_salt = process.env.PAYTR_MERCHANT_SALT || "";

        if (!merchant_id || !merchant_key || !merchant_salt) {
            return NextResponse.json({ success: false, error: "Ödeme altyapısı henüz ayarlanmadı." }, { status: 500 });
        }

        const body = await req.json().catch(() => ({}));
        const selectedTier = body.tier || "PRO";

        // Fetch Current B2B Pricing from DB Settings
        const settingsRaw = await prisma.algorithmSettings.findMany();
        const settingsMap: Record<string, string> = {};
        settingsRaw.forEach(s => settingsMap[s.key] = s.value);

        let b2bPrice = Number(settingsMap["b2bMonthlyPrice"] || 500);
        let b2bDiscount = Number(settingsMap["b2bDiscountPercentage"] || 0);

        // Tier Logical Calculation
        let finalPrice = b2bPrice;
        let basketDescription = "PRO Paket (Aylık Limitsiz Değerleme)";

        if (selectedTier === "PRO") {
            finalPrice = b2bDiscount > 0 ? b2bPrice * (1 - b2bDiscount / 100) : b2bPrice;
        } else if (selectedTier === "PRO_PLUS") {
            finalPrice = Number(settingsMap["b2bProPlusPrice"] || 750);
            basketDescription = "PRO PLUS Paket (White-Label & Lead Market)";
        } else if (selectedTier === "UPGRADE") {
            finalPrice = 250;
            basketDescription = "PRO'dan PRO PLUS Pakete Yükseltme Bedeli";
        }

        const payment_amount = Math.round(finalPrice * 100).toString(); // Kuruş cinsinden

        const merchant_oid = `B2B_${selectedTier}_${session.user.id}_${Date.now()}`;
        const user_name = session.user.name || "Kurumsal Kullanıcı";
        const user_address = "Evin Değeri B2B Kullanıcısı, İstanbul"; // Genel B2B Adresi
        const user_phone = "05555555555";
        const user_basket = JSON.stringify([[basketDescription, finalPrice.toString(), 1]]);
        const user_ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
        const email = session.user.email;
        const cur_val = "TL";
        const default_installment = "0";

        const domain = process.env.NEXTAUTH_URL || "https://evindegeri.com";
        const success_url = `${domain}/b2b/pricing?status=success`;
        const fail_url = `${domain}/b2b/pricing?status=error`;

        // Hash Calculation
        const hashStr = merchant_id + user_ip + merchant_oid + email + payment_amount + user_basket + "0" + "0" + cur_val + "0";
        const paytr_token = crypto.createHmac('sha256', merchant_key).update(hashStr + merchant_salt).digest('base64');

        const params = new URLSearchParams({
            merchant_id: merchant_id,
            user_ip: user_ip,
            merchant_oid: merchant_oid,
            email: email,
            payment_amount: payment_amount,
            paytr_token: paytr_token,
            user_basket: user_basket,
            debug_on: "1", // Canlıda 0 yapılmalı
            no_installment: "0",
            max_installment: "12",
            user_name: user_name,
            user_address: user_address,
            user_phone: user_phone,
            merchant_ok_url: success_url,
            merchant_fail_url: fail_url,
            currency: cur_val,
            test_mode: "1" // Başvuru onaylanana kadar test modu
        });

        // Veritabanına "PENDING" olarak Payment (satın alma) logunu düşelim
        await prisma.payment.create({
            data: {
                amount: finalPrice,
                status: "PENDING",
                transactionId: merchant_oid,
                tierPurchased: selectedTier === "UPGRADE" ? "PRO_PLUS" : selectedTier,
                realtorId: session.user.id
            }
        });

        const res = await fetch('https://www.paytr.com/odeme/api/get-token', {
            method: 'POST',
            body: params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const resData = await res.json();

        if (resData.status === "success") {
            return NextResponse.json({ success: true, token: resData.token });
        } else {
            console.error("PayTR Error:", resData);
            return NextResponse.json({ success: false, error: resData.reason || "PayTR token alınamadı." }, { status: 500 });
        }

    } catch (error: any) {
        console.error("Checkout Error:", error);
        return NextResponse.json({ success: false, error: "Ödeme işlemi sırasında bir sunucu hatası oluştu." }, { status: 500 });
    }
}
