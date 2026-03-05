import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import crypto from 'crypto-js';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions) as any;

        if (!session || !session.user || session.user.role !== "realtor") {
            return NextResponse.json({ success: false, error: "Lütfen önce giriş yapın." }, { status: 401 });
        }

        // PayTR Credentials from .env
        const merchant_id = process.env.PAYTR_MERCHANT_ID || "";
        const merchant_key = process.env.PAYTR_MERCHANT_KEY || "";
        const merchant_salt = process.env.PAYTR_MERCHANT_SALT || "";

        if (!merchant_id || !merchant_key || !merchant_salt) {
            return NextResponse.json({ success: false, error: "Ödeme altyapısı (PayTR) henüz ayarlanmadı." }, { status: 500 });
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
            const proPlusPrice = Number(settingsMap["b2bProPlusPrice"] || 750);
            finalPrice = proPlusPrice;
            basketDescription = "PRO PLUS Paket (White-Label & Lead Market)";
        } else if (selectedTier === "UPGRADE") {
            finalPrice = 250;
            basketDescription = "PRO'dan PRO PLUS Pakete Yükseltme Bedeli";
        }

        // PayTR uses kurus (cents) for the payment amount. 500 TL = 50000 kurus.
        const payment_amount = Math.round(finalPrice * 100).toString();

        // Prepare User/Order Information
        const merchant_oid = `B2B_${selectedTier}_${session.user.id}_${Date.now()}`;
        const email = session.user.email;
        const user_name = session.user.name || "Kurumsal Emlakçı";
        const user_address = "Türkiye";
        const user_phone = "05320000000"; // Should be retrieved from Realtor DB if required.
        const user_ip = req.headers.get("x-forwarded-for") || "85.105.101.12"; // PayTR Needs IP.
        const currency = "TL";
        const test_mode = "1"; // SET TO 0 FOR PRODUCTION (LIVE PAYMENTS)

        // Basket Array (Products) [["Product Name", "Price", "Quantity"]]
        const user_basket = [
            [basketDescription, finalPrice.toString(), 1]
        ];
        const user_basket_encoded = Buffer.from(JSON.stringify(user_basket)).toString("base64");

        // Allowed Installments & No-Installment Configs
        const max_installment = "0";
        const no_installment = "1";

        // Redirect paths after payment completes in iframe
        const merchant_ok_url = `${process.env.NEXTAUTH_URL}/b2b/dashboard?payment=success`;
        const merchant_fail_url = `${process.env.NEXTAUTH_URL}/b2b/pricing?payment=failed`;

        // Generate PayTR HMAC-SHA256 Token
        const hash_str = merchant_id + user_ip + merchant_oid + email + payment_amount + user_basket_encoded + no_installment + max_installment + currency + test_mode;
        const paytr_token = crypto.HmacSHA256(hash_str + merchant_salt, merchant_key).toString(crypto.enc.Base64);

        // API Body Prep for PayTR Server
        const formData = new URLSearchParams();
        formData.append('merchant_id', merchant_id);
        formData.append('user_ip', user_ip);
        formData.append('merchant_oid', merchant_oid);
        formData.append('email', email);
        formData.append('payment_amount', payment_amount);
        formData.append('paytr_token', paytr_token);
        formData.append('user_basket', user_basket_encoded);
        formData.append('debug_on', '1');
        formData.append('no_installment', no_installment);
        formData.append('max_installment', max_installment);
        formData.append('user_name', user_name);
        formData.append('user_address', user_address);
        formData.append('user_phone', user_phone);
        formData.append('merchant_ok_url', merchant_ok_url);
        formData.append('merchant_fail_url', merchant_fail_url);
        formData.append('timeout_limit', "30");
        formData.append('currency', currency);
        formData.append('test_mode', test_mode);

        const paytrRes = await fetch('https://www.paytr.com/odeme/api/get-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        const paytrResponseText = await paytrRes.text();
        let paytrResult;
        try {
            paytrResult = JSON.parse(paytrResponseText);
        } catch (e) {
            console.error("PayTR Parsing failed: ", paytrResponseText);
            return NextResponse.json({ success: false, error: "Ödeme altyapısı geçici olarak çalışmıyor." }, { status: 500 });
        }

        if (paytrResult.status === "success") {
            return NextResponse.json({
                success: true,
                token: paytrResult.token,
                message: "PayTR iframe token generated."
            });
        } else {
            console.error("PayTR Generation Failed:", paytrResult.reason);
            return NextResponse.json({ success: false, error: "PayTR Hatası: " + paytrResult.reason }, { status: 500 });
        }
    } catch (error: any) {
        console.error("Checkout Error:", error);
        return NextResponse.json({ success: false, error: "Ödeme işlemi sırasında bir API hatası oluştu." }, { status: 500 });
    }
}
