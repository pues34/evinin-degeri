import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        // @ts-ignore
        if (!session?.user?.id || session.user.role !== "B2B") {
            return NextResponse.json({ success: false, error: "Yetkisiz erişim" }, { status: 401 });
        }

        const body = await req.json();
        const { customLogoUrl } = body;

        // @ts-ignore
        const updatedRealtor = await prisma.realtor.update({
            // @ts-ignore
            where: { id: session.user.id },
            data: { customLogoUrl: customLogoUrl || null }
        });

        // @ts-ignore
        return NextResponse.json({ success: true, customLogoUrl: updatedRealtor.customLogoUrl });
    } catch (error) {
        console.error("B2B Settings Save Error:", error);
        return NextResponse.json({ success: false, error: "Sunucu hatası oluştu." }, { status: 500 });
    }
}
