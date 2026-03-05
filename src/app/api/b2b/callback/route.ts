import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from 'crypto-js';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const merchant_oid = formData.get('merchant_oid') as string;
        const status = formData.get('status') as string;
        const total_amount = formData.get('total_amount') as string;
        const hash = formData.get('hash') as string;

        const merchant_key = process.env.PAYTR_MERCHANT_KEY || "";
        const merchant_salt = process.env.PAYTR_MERCHANT_SALT || "";

        if (!merchant_oid || !status || !hash) {
            return new Response("BAD REQUEST", { status: 400 });
        }

        // Verify Hash
        const hash_str = merchant_oid + merchant_salt + status + total_amount;
        const generated_hash = crypto.HmacSHA256(hash_str, merchant_key).toString(crypto.enc.Base64);

        if (hash !== generated_hash) {
            console.error("PayTR Callback Hash Mismatch!");
            return new Response("PAYTR NOTIFICATION FAILED: BAD HASH", { status: 400 });
        }

        if (status === "success") {
            // V19 Extract Tier and User ID from the new OID format: B2B_{TIER}_{USERID}_{TIMESTAMP}
            // Examples: B2B_PRO_PLUS_cuid123_17823, B2B_PRO_cuid123_17823, B2B_UPGRADE_cuid123_17823
            const parts = merchant_oid.split('_');

            let tier = "PRO";
            let userId = "";

            if (parts.length >= 4) {
                if (parts[1] === "PRO" && parts[2] === "PLUS") {
                    tier = "PRO_PLUS";
                    userId = parts[3];
                } else {
                    tier = parts[1]; // PRO or UPGRADE
                    userId = parts[2];
                }
            }

            if (userId) {
                // Grant 30 days of subscription
                const now = new Date();
                const nextMonth = new Date(now.setMonth(now.getMonth() + 1));

                let mappedTier: any = "PRO";
                if (tier === "PRO_PLUS" || tier === "UPGRADE") mappedTier = "PRO_PLUS";

                await prisma.realtor.update({
                    where: { id: userId },
                    data: {
                        isPro: true,
                        subscriptionTier: mappedTier,
                        subscriptionEnd: nextMonth
                    }
                });
                console.log(`PayTR Success: ${mappedTier} granted to Realtor ID ${userId}`);
            }
        } else {
            console.error(`PayTR Payment Failed for OID ${merchant_oid}`);
        }

        // Must explicitly return this string, otherwise PayTR will keep retrying
        return new Response("OK", { status: 200 });
    } catch (error) {
        console.error("PayTR Callback Error:", error);
        return new Response("INTERNAL SERVER ERROR", { status: 500 });
    }
}
