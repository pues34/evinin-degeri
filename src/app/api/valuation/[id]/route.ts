import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

async function fetchGeo(query: string) {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`, {
        headers: { 'User-Agent': 'EvininDegeriApp/1.0' }
    });
    return await res.json();
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const record = await prisma.valuationRequest.findUnique({
            where: { id: params.id },
            include: { realtor: { select: { customLogoUrl: true, subscriptionTier: true } } }
        });

        if (!record) {
            return NextResponse.json({ success: false, error: "Record not found" }, { status: 404 });
        }

        // We can extract mock factors for UI, although in a strict production we'd save factors too.
        const factors = [];
        const floorNum = parseInt(record.floor as string);
        if (!isNaN(floorNum) && floorNum > 1 && floorNum < record.totalFloors) factors.push({ name: "Ara Kat Avantajı", effect: "+15%" });
        if (record.floor === "0" || record.floor === "1" || record.floor.toLowerCase().includes("zemin")) factors.push({ name: "Zemin/Giriş Kat", effect: "-15%" });
        if (record.kitchenType === "Kapalı") factors.push({ name: "Kapalı Mutfak", effect: "+5%" });
        if (record.hasBalcony) factors.push({ name: "Balkon", effect: "+10%" });
        if (record.parking === "Kapalı") factors.push({ name: "Kapalı Otopark", effect: "+15%" });
        if (record.parking === "Yok") factors.push({ name: "Otopark Yok", effect: "%0" });
        if (record.bathrooms > 1) factors.push({ name: "Çift Banyo / Ebeveyn", effect: "+7%" });

        // Geocoding with Nominatim (OpenStreetMap)
        // Kadikoy center fallback
        let location = { lat: 40.985, lng: 29.025 };
        try {
            // First attempt: full address
            let geoData = await fetchGeo(`${record.neighborhood}, ${record.district}, ${record.city}, Turkey`);

            // Fallback attempt 1: just district and city
            if (!geoData || geoData.length === 0) {
                geoData = await fetchGeo(`${record.district}, ${record.city}, Turkey`);
            }
            // Fallback attempt 2: just city
            if (!geoData || geoData.length === 0) {
                geoData = await fetchGeo(`${record.city}, Turkey`);
            }

            if (geoData && geoData.length > 0) {
                location = {
                    lat: parseFloat(geoData[0].lat),
                    lng: parseFloat(geoData[0].lon)
                };
            }
        } catch (geoError) {
            console.error("Geocoding Error:", geoError);
        }

        // V27: m2 fiyat bolge karsilastirmasi ve Gecmis degerleme trendi
        // Calculate real average m2 price for this neighborhood/district
        const aggregations = await prisma.valuationRequest.aggregate({
            _avg: {
                estimatedValue: true,
                netSqm: true
            },
            where: {
                district: record.district,
                city: record.city,
            }
        });

        let districtAvgSqm = 0;
        if (aggregations._avg.estimatedValue && aggregations._avg.netSqm) {
            districtAvgSqm = aggregations._avg.estimatedValue / aggregations._avg.netSqm;
        }

        // Fetch last 3 months trend for the neighborhood
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 6); // Fetch 6 months to be safe, display latest

        const historicalData = await prisma.valuationRequest.findMany({
            where: {
                neighborhood: record.neighborhood,
                district: record.district,
                city: record.city,
                createdAt: {
                    gte: threeMonthsAgo
                }
            },
            select: {
                createdAt: true,
                estimatedValue: true,
                netSqm: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        // Group by month
        const trendMap = new Map();
        historicalData.forEach(item => {
            if (!item.netSqm || !item.estimatedValue) return;
            const monthYear = item.createdAt.toLocaleDateString("tr-TR", { month: "short", year: "numeric" });
            if (!trendMap.has(monthYear)) {
                trendMap.set(monthYear, { totalValue: 0, totalSqm: 0, count: 0 });
            }
            const current = trendMap.get(monthYear);
            current.totalValue += item.estimatedValue;
            current.totalSqm += item.netSqm;
            current.count += 1;
        });

        const neighborhoodTrend = Array.from(trendMap.entries()).map(([month, data]) => ({
            month,
            avgSqmPrice: Math.round(data.totalValue / data.totalSqm)
        }));

        return NextResponse.json({
            success: true,
            data: {
                ...record,
                factors: factors.length > 0 ? factors : [{ name: "Standart Plan", effect: "-" }],
                location,
                districtAvgSqm,
                neighborhoodTrend
            }
        });
    } catch (error: any) {
        console.error("GET Valuation Error:", error);
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}
