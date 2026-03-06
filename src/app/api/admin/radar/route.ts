import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user?.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const opportunities = await prisma.radarOpportunity.findMany({
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(opportunities);
    } catch (error) {
        console.error("Admin Radar GET error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user?.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const body = await req.json();
        const { title, city, district, neighborhood, askingPrice, estimatedValue, imageUrl } = body;

        if (!title || !city || !district || !neighborhood || !askingPrice || !estimatedValue) {
            return NextResponse.json({ error: "Gerekli alanlar eksik" }, { status: 400 });
        }

        const discount = ((Number(estimatedValue) - Number(askingPrice)) / Number(estimatedValue)) * 100;

        const newOpportunity = await prisma.radarOpportunity.create({
            data: {
                title,
                city,
                district,
                neighborhood,
                askingPrice: Number(askingPrice),
                estimatedValue: Number(estimatedValue),
                discount,
                imageUrl
            }
        });

        return NextResponse.json(newOpportunity);
    } catch (error) {
        console.error("Admin Radar POST error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user?.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        await prisma.radarOpportunity.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Admin Radar DELETE error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
