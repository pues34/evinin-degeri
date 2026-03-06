import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type"); // "phone" or "email"
        const value = searchParams.get("value");

        if (!type || !value) {
            return NextResponse.json({ success: false, error: "type ve value gerekli" }, { status: 400 });
        }

        let whereClause: any = {};
        if (type === "phone") {
            whereClause = { contactInfo: { phone: value } };
        } else if (type === "email") {
            whereClause = { contactInfo: { email: value } };
        } else {
            return NextResponse.json({ success: false, error: "Gecersiz type" }, { status: 400 });
        }

        const results = await prisma.valuationRequest.findMany({
            where: whereClause,
            orderBy: { createdAt: "desc" },
            take: 20,
            select: {
                id: true,
                requestNumber: true,
                createdAt: true,
                city: true,
                district: true,
                neighborhood: true,
                rooms: true,
                netSqm: true,
                floor: true,
                estimatedValue: true,
                overridenValue: true,
            }
        });

        return NextResponse.json({ success: true, data: results });
    } catch (error: any) {
        console.error("History API Error:", error);
        return NextResponse.json({ success: false, error: "Arama sirasinda hata olustu" }, { status: 500 });
    }
}
