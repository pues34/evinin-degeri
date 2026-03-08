import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET: Fetch Listings (Public for APPROVED, Own for others, All for Admin)
export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const { searchParams } = new URL(req.url);

        const mode = searchParams.get("mode") || "public"; // "public", "my-listings", "admin"

        if (mode === "public") {
            const listings = await prisma.listing.findMany({
                where: { status: "APPROVED" },
                orderBy: { createdAt: "desc" },
                include: {
                    user: { select: { name: true, phone: true } },
                    realtor: { select: { companyName: true, phone: true, customLogoUrl: true } }
                }
            });
            return NextResponse.json(listings);
        }

        if (mode === "my-listings") {
            if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            const userId = session.user.role === "user" ? session.user.id : null;
            const realtorId = session.user.role === "realtor" ? session.user.id : null;

            if (!userId && !realtorId) return NextResponse.json({ error: "No user id" }, { status: 400 });

            const listings = await prisma.listing.findMany({
                where: userId ? { userId } : { realtorId },
                orderBy: { createdAt: "desc" }
            });
            return NextResponse.json(listings);
        }

        if (mode === "admin") {
            if (session?.user?.role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            const listings = await prisma.listing.findMany({
                orderBy: { createdAt: "desc" },
                include: {
                    user: { select: { name: true, phone: true, email: true } },
                    realtor: { select: { companyName: true, phone: true, email: true } }
                }
            });
            return NextResponse.json(listings);
        }

        return NextResponse.json({ error: "Invalid mode" }, { status: 400 });

    } catch (error: any) {
        console.error("GET Listings Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// POST: Create a new Listing (Requires User/Realtor. Limit: 3 per year)
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const userId = session.user.role === "user" ? session.user.id : null;
        const realtorId = session.user.role === "realtor" ? session.user.id : null;
        const ownerType = session.user.role === "user" ? "USER" : "REALTOR";

        if (!userId && !realtorId) return NextResponse.json({ error: "No user id" }, { status: 400 });

        // Premium kontrol: ücretsiz kullanıcılar aylık 1, premium sınırsız
        if (userId) {
            const user = await prisma.user.findUnique({ where: { id: userId }, select: { isPremium: true } });
            if (!user?.isPremium) {
                const startOfMonth = new Date();
                startOfMonth.setDate(1);
                startOfMonth.setHours(0, 0, 0, 0);
                const monthlyCount = await prisma.listing.count({
                    where: { userId, createdAt: { gte: startOfMonth } }
                });
                if (monthlyCount >= 1) {
                    return NextResponse.json({ error: "Ücretsiz üyelik ile aylık 1 ilan verebilirsiniz. Premium'a geçerek sınırsız ilan verebilirsiniz." }, { status: 403 });
                }
            }
        }

        const body = await req.json();
        const {
            title, description, askingPrice, estimatedValue, phone,
            city, district, neighborhood, netSqm, grossSqm, rooms, buildingAge, floor,
            heatingType, propertyType, images
        } = body;

        // Calculate discount rate
        let discountRate = 0;
        if (estimatedValue && askingPrice && estimatedValue > askingPrice) {
            discountRate = ((estimatedValue - askingPrice) / estimatedValue) * 100;
        }

        // Generate unique listing number: ED-YYYY-NNNNN
        const year = new Date().getFullYear();
        const totalListings = await prisma.listing.count();
        const seq = String(totalListings + 1).padStart(5, '0');
        const listingNumber = `ED-${year}-${seq}`;

        // İlan yayın süresi: 30 gün
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);

        const newListing = await prisma.listing.create({
            data: {
                title, description, askingPrice,
                estimatedValue: estimatedValue || askingPrice,
                phone,
                city, district, neighborhood,
                netSqm, grossSqm, rooms, buildingAge, floor,
                heatingType: heatingType || null,
                propertyType: propertyType || null,
                images: images || [],
                discountRate,
                ownerType,
                userId,
                realtorId,
                listingNumber,
                status: "PENDING",
                expiresAt,
            }
        });

        return NextResponse.json({ success: true, listing: newListing, listingNumber });

    } catch (error: any) {
        console.error("POST Listing Error:", error);
        return NextResponse.json({ error: "Failed to create listing" }, { status: 500 });
    }
}
