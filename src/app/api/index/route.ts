import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Fetch all successful valuations below 500M TRY to avoid test outliers
        const valuations = await prisma.valuationRequest.findMany({
            where: {
                estimatedValue: { gt: 0, lt: 500000000 },
                netSqm: { gt: 0 }
            },
            select: {
                createdAt: true,
                estimatedValue: true,
                netSqm: true,
                city: true,
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        if (!valuations || valuations.length === 0) {
            // Fallback mock data if the DB is completely empty so the charts don't appear broken
            const mockTrend = [
                { rawMonth: "2025-10", displayMonth: "Kasım 2025", avgSqmPrice: 85200, volume: 1420 },
                { rawMonth: "2025-11", displayMonth: "Aralık 2025", avgSqmPrice: 86500, volume: 1650 },
                { rawMonth: "2025-12", displayMonth: "Ocak 2026", avgSqmPrice: 87100, volume: 1580 },
                { rawMonth: "2026-01", displayMonth: "Şubat 2026", avgSqmPrice: 88500, volume: 1890 },
                { rawMonth: "2026-02", displayMonth: "Mart 2026", avgSqmPrice: 89444, volume: 2150 }
            ];
            return NextResponse.json({ success: true, data: mockTrend });
        }

        // Group by month
        const monthlyData = new Map();

        valuations.forEach(val => {
            const dateStr = val.createdAt.toISOString().substring(0, 7); // YYYY-MM
            if (!monthlyData.has(dateStr)) {
                monthlyData.set(dateStr, { sumValue: 0, sumSqm: 0, count: 0 });
            }
            const current = monthlyData.get(dateStr);
            current.sumValue += val.estimatedValue;
            current.sumSqm += val.netSqm;
            current.count += 1;
        });

        // Calculate average Sqm price per month
        const indexTrend = Array.from(monthlyData.entries()).map(([month, data]) => {
            // Formatter for display
            const [year, m] = month.split("-");
            const dateObj = new Date(parseInt(year), parseInt(m) - 1);
            const displayMonth = dateObj.toLocaleDateString("tr-TR", { month: "long", year: "numeric" });

            return {
                rawMonth: month,
                displayMonth,
                avgSqmPrice: Math.round(data.sumValue / data.sumSqm),
                volume: data.count
            };
        });

        // Sort chronologically just in case
        indexTrend.sort((a, b) => a.rawMonth.localeCompare(b.rawMonth));

        return NextResponse.json({ success: true, data: indexTrend });

    } catch (error) {
        console.error("Index fetch error:", error);
        return NextResponse.json({ success: false, error: "Veritabanı bağlantı hatası" }, { status: 500 });
    }
}
