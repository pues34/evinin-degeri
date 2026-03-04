export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

async function fetchGeo(query: string) {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`, {
        headers: { 'User-Agent': 'EvininDegeriApp/1.0' }
    });
    return await res.json();
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const record = await prisma.valuationRequest.findUnique({
            where: { id: params.id }
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

        return NextResponse.json({
            success: true,
            data: {
                ...record,
                factors: factors.length > 0 ? factors : [{ name: "Standart Plan", effect: "-" }],
                location
            }
        });
    } catch (error: any) {
        console.error("GET Valuation Error:", error);
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}
