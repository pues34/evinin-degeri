export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import prisma from "@/lib/prisma";

// POST: Add new City, District, or Neighborhood
export async function POST(req: Request) {
    try {
        const session = await getServerSession();
        if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const { type, name, parentId, multiplier } = body;

        if (type === "city") {
            const result = await prisma.city.create({ data: { name } });
            return NextResponse.json({ success: true, data: result });
        } else if (type === "district") {
            const result = await prisma.district.create({ data: { name, cityId: parentId } });
            return NextResponse.json({ success: true, data: result });
        } else if (type === "neighborhood") {
            const result = await prisma.neighborhood.create({ data: { name, districtId: parentId, multiplier: Number(multiplier) || 1.0 } });
            return NextResponse.json({ success: true, data: result });
        }

        return NextResponse.json({ success: false, error: "Invalid type" }, { status: 400 });
    } catch (error: any) {
        console.error("Location Mutation Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// DELETE: Remove a Location entity
export async function DELETE(req: Request) {
    try {
        const session = await getServerSession();
        if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const type = searchParams.get('type');
        const id = searchParams.get('id');

        if (!type || !id) return NextResponse.json({ success: false, error: "Missing parameters" }, { status: 400 });

        if (type === 'city') await prisma.city.delete({ where: { id } });
        else if (type === 'district') await prisma.district.delete({ where: { id } });
        else if (type === 'neighborhood') await prisma.neighborhood.delete({ where: { id } });
        else return NextResponse.json({ success: false, error: "Invalid type" }, { status: 400 });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
