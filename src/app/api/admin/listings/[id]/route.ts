import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (session?.user?.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { status } = body;

        if (!["APPROVED", "REJECTED", "PENDING"].includes(status)) {
            return NextResponse.json({ error: "Invalid status" }, { status: 400 });
        }

        const listing = await prisma.listing.update({
            where: { id: params.id },
            data: { status }
        });

        // Trigger notifications if approved (Mocking notification system)
        if (status === "APPROVED") {
            console.log(`[ACTION] Listing ${listing.id} is APPROVED. Triggering notification to Premium users.`);
            // In a real scenario, we would trigger an email queue here for all User (isPremium=true) and Realtor (isPro=true)
        }

        return NextResponse.json({ success: true, listing });

    } catch (error: any) {
        console.error("Update Listing Error:", error);
        return NextResponse.json({ error: "Failed to update listing" }, { status: 500 });
    }
}
