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
            data: { status },
            include: {
                user: { select: { email: true, name: true } },
                realtor: { select: { email: true, companyName: true } }
            }
        });

        // Send email notification when listing is approved
        if (status === "APPROVED") {
            const ownerEmail = listing.ownerType === "USER"
                ? listing.user?.email
                : listing.realtor?.email;

            const ownerName = listing.ownerType === "USER"
                ? listing.user?.name || "Kullanıcı"
                : listing.realtor?.companyName || "Kurumsal";

            if (ownerEmail) {
                try {
                    await fetch(`${process.env.NEXTAUTH_URL || 'https://evindegeri.com'}/api/send-listing-notification`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: ownerEmail,
                            name: ownerName,
                            listingTitle: listing.title,
                            listingNumber: (listing as any).listingNumber || listing.id,
                        })
                    });
                } catch (emailErr) {
                    console.error("Email notification error:", emailErr);
                    // Don't fail the approval if email fails
                }
            }

            console.log(`[ACTION] Listing ${(listing as any).listingNumber || listing.id} APPROVED. Email sent to ${ownerEmail}.`);
        }

        return NextResponse.json({ success: true, listing });

    } catch (error: any) {
        console.error("Update Listing Error:", error);
        return NextResponse.json({ error: "Failed to update listing" }, { status: 500 });
    }
}
