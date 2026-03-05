import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

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

        // V24: Today's requests
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayRequests = allRequests.filter((r: any) => new Date(r.createdAt) >= todayStart).length;

        // V24: This week's requests
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - 7);
        weekStart.setHours(0, 0, 0, 0);
        const weekRequests = allRequests.filter((r: any) => new Date(r.createdAt) >= weekStart).length;

        // V24: Unread contacts
        let unreadContacts = 0;
        try {
            unreadContacts = await prisma.contactMessage.count({ where: { isRead: false } });
        } catch (e) { /* contacts table may not exist */ }

        // V24: PRO realtors count & revenue
        let totalProRealtors = 0;
        let estimatedRevenue = 0;
        try {
            totalProRealtors = await prisma.realtor.count({ where: { isPro: true } });
            // Simple estimate: each PRO pays monthly
            const settings = await prisma.algorithmSettings.findFirst({ where: { key: "b2bMonthlyPrice" } });
            const monthlyPrice = settings ? parseFloat(settings.value) : 499;
            estimatedRevenue = totalProRealtors * monthlyPrice;
        } catch (e) { /* realtors table may not exist */ }

        return NextResponse.json({
            success: true,
            data: {
                totalRequests,
                avgValue,
                topDistricts,
                trend: trendParams,
                todayRequests,
                weekRequests,
                unreadContacts,
                totalProRealtors,
                estimatedRevenue,
            }
        });

    } catch (error) {
        console.error("Stats fetch error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
