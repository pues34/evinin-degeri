import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const cities = await prisma.city.findMany({
            include: {
                districts: {
                    include: {
                        neighborhoods: true
                    },
                    orderBy: { name: 'asc' }
                }
            },
            orderBy: { name: 'asc' }
        });

        return NextResponse.json({ success: true, data: cities });
    } catch (error) {
        console.error("Location Fetch Error:", error);
        return NextResponse.json({ success: false, error: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}
