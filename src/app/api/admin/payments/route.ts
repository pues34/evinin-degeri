import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions) as any;

        if (!session || !session.user || session.user.role !== "admin") {
            return NextResponse.json({ success: false, error: "Yetkisiz erişim." }, { status: 401 });
        }

        const payments = await prisma.payment.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                realtor: {
                    select: {
                        companyName: true,
                        phone: true,
                    }
                }
            }
        });

        return NextResponse.json({ success: true, data: payments });
    } catch (error: any) {
        console.error("Admin Payments Fetch Error:", error);
        return NextResponse.json({ success: false, error: "Sunucu hatası oluştu." }, { status: 500 });
    }
}
