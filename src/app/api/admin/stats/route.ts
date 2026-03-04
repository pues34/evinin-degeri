export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const totalRequests = await prisma.valuationRequest.count();

        const allRequests = await prisma.valuationRequest.findMany({
            select: {
                district: true,
                estimatedValue: true,
                createdAt: true
            }
        });

        const totalValue = allRequests.reduce((acc: number, curr: any) => acc + (curr.estimatedValue || 0), 0);
        const avgValue = totalRequests > 0 ? totalValue / totalRequests : 0;

        // Group by District
        const districtCount: Record<string, number> = {};
        allRequests.forEach((req: any) => {
            if (req.district) {
                districtCount[req.district] = (districtCount[req.district] || 0) + 1;
            }
        });

        // Top 5 Districts
        const topDistricts = Object.entries(districtCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([name, count]) => ({ name, count }));

        // Last 7 days trend
        const dailyTrend: Record<string, number> = {};
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            dailyTrend[d.toISOString().split('T')[0]] = 0;
        }

        allRequests.forEach((req: any) => {
            const dateStr = req.createdAt.toISOString().split('T')[0];
            if (dailyTrend[dateStr] !== undefined) {
                dailyTrend[dateStr]++;
            }
        });

        const trendParams = Object.entries(dailyTrend).map(([date, count]) => ({
            date: date.split('-').slice(1).join('/'), // MM/DD format
            count
        }));

        return NextResponse.json({
            success: true,
            data: {
                totalRequests,
                avgValue,
                topDistricts,
                trend: trendParams
            }
        });

    } catch (error) {
        console.error("Stats fetch error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
