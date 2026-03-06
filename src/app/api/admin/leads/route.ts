import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const session = await getServerSession(authOptions) as any;
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const reqs = await prisma.valuationRequest.findMany({
            include: {
                contactInfo: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        // Format for admin panel display
        const payload = reqs.map((r: any) => ({
            id: r.id,
            requestNumber: r.requestNumber || "Eski",
            name: r.contactInfo?.fullName || "Belirtilmemiş",
            phone: r.contactInfo?.phone || "Belirtilmemiş",
            email: r.contactInfo?.email || "Belirtilmemiş",
            date: new Date(r.createdAt).toLocaleDateString('tr-TR'),
            value: new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(r.estimatedValue),
            rawEstimatedValue: r.estimatedValue,
            overridenValue: r.overridenValue ? new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(r.overridenValue) : null,
            rawOverridenValue: r.overridenValue,
            adminNote: r.adminNote || "",
            propertyDetails: `${r.city}, ${r.district}, ${r.neighborhood} - ${r.rooms} (${r.netSqm} m²)`
        }));

        return NextResponse.json({ success: true, data: payload });
    } catch (error) {
        console.error("Admin leads fetch error:", error);
        return NextResponse.json({ success: false, error: "Sunucu hatası" }, { status: 500 });
    }
}
