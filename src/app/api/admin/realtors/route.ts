import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions) as any;
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const realtors = await prisma.realtor.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                companyName: true,
                email: true,
                phone: true,
                isPro: true,
                subscriptionEnd: true,
                createdAt: true,
                _count: {
                    select: { valuations: true }
                }
            }
        });

        return NextResponse.json({ success: true, data: realtors });
    } catch (error) {
        console.error("Admin Realtors GET error:", error);
        return NextResponse.json({ success: false, error: "Sunucu hatası" }, { status: 500 });
    }
}
