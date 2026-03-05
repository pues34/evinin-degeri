import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { Resend } from "resend";
import { render } from "@react-email/render";
import ReportEmail from "@/emails/ReportEmail";

import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';
const resend = new Resend(process.env.RESEND_API_KEY || "dummy_key_for_build");

export async function POST(req: Request) {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { id, adminNote, overridenValue, notifyUser } = body;

        if (!id) {
            return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
        }

        // Update the ValuationRequest
        const updated = await prisma.valuationRequest.update({
            where: { id },
            data: {
                adminNote: adminNote !== undefined ? adminNote : undefined,
                overridenValue: overridenValue !== undefined ? (overridenValue ? parseFloat(overridenValue) : null) : undefined,
            } as any,
            include: {
                contactInfo: true
            }
        });

        if (notifyUser && updated.contactInfo?.email && updated.overridenValue) {
            try {
                // Email Gönder
                const formattedOverriddenValue = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(updated.overridenValue);

                const emailHtml = await render(ReportEmail({
                    fullName: updated.contactInfo.fullName,
                    estimatedValue: formattedOverriddenValue,
                    neighborhood: updated.neighborhood,
                    district: updated.district,
                    city: updated.city,
                    aiComment: updated.aiComment || "Uzmanlarımız tarafından fiyat analizin güncellendi."
                }));

                await resend.emails.send({
                    from: "Evinin Değeri Uzmanları <bilgi@evindegeri.com>",
                    to: updated.contactInfo.email,
                    subject: "Değerleme Raporunuz Uzmanlarımız Tarafından Güncellendi 🏠",
                    html: emailHtml,
                });
            } catch (emailError) {
                console.error("Failed to send update email:", emailError);
            }
        }

        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        console.error("Admin leads update error:", error);
        return NextResponse.json({ success: false, error: "Sunucu hatası" }, { status: 500 });
    }
}
