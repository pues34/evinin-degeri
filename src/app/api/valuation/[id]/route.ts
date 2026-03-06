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
        let record = null;

        // Handle UUID and CUID formats safely
        const isIdValid = params.id && params.id.length > 10;

        if (isIdValid) {
            record = await prisma.valuationRequest.findUnique({
                where: { id: params.id },
                include: { realtor: { select: { customLogoUrl: true, subscriptionTier: true } } }
            });
        }

        if (!record && !isNaN(Number(params.id))) {
            record = await prisma.valuationRequest.findFirst({
                where: { requestNumber: Number(params.id) },
                include: { realtor: { select: { customLogoUrl: true, subscriptionTier: true } } }
            });
        }

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

        // 1. Dynamic Index For Base Price (Simulating TCMB / Endeksa)
        let baseAnchorPrice = 26500;
        let monthlyInflationRate = 0.035;

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
        // Filtre: 500 milyondan buyuk (test/hatali) outlier verileri haric tut
        const districtValuations = await prisma.valuationRequest.findMany({
            where: { district: record.district, city: record.city, estimatedValue: { lt: 500000000 } },
            select: { estimatedValue: true, netSqm: true }
        });

        let districtAvgSqm = 0;
        if (districtValuations && districtValuations.length > 0) {
            const validVids = districtValuations.filter(v => v.estimatedValue > 0 && v.netSqm > 0);
            if (validVids.length > 0) {
                const sum = validVids.reduce((acc, v) => acc + (v.estimatedValue / v.netSqm), 0);
                districtAvgSqm = Math.round(sum / validVids.length);
            }
        }

        // Fetch last 3 months trend for the neighborhood
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 6); // Fetch 6 months to be safe, display latest

        const historicalData = await prisma.valuationRequest.findMany({
            where: {
                neighborhood: record.neighborhood,
                district: record.district,
                city: record.city,
                estimatedValue: { lt: 500000000 },
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
