import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

// Rough manual mapping of coordinates for Istanbul districts to draw heat circles
const districtCoords: Record<string, [number, number]> = {
    "KADIKÖY": [40.9819, 29.0278],
    "BEŞİKTAŞ": [41.0428, 29.0069],
    "ŞİŞLİ": [41.0608, 28.9877],
    "BAKIRKÖY": [40.9801, 28.8720],
    "ÜSKÜDAR": [41.0189, 29.0272],
    "SARIYER": [41.1687, 29.0560],
    "BEYKOZ": [41.1166, 29.0913],
    "BEYOĞLU": [41.0336, 28.9765],
    "FATİH": [41.0185, 28.9392],
    "PENDİK": [40.8767, 29.2312],
    "BEYLİKDÜZÜ": [40.9841, 28.6323],
    "KARTAL": [40.8876, 29.1837],
    "MALTEPE": [40.9255, 29.1227],
    "BAŞAKŞEHİR": [41.0963, 28.7909],
    "ATAŞEHİR": [40.9839, 29.1082],
    "ÜMRANİYE": [41.0264, 29.0988],
    "AVCILAR": [40.9818, 28.7185],
    "BAHÇELİEVLER": [41.0007, 28.8459],
    "KAĞITHANE": [41.0827, 28.9768],
    "KÜÇÜKÇEKMECE": [41.0006, 28.7845],
    "EYÜPSULTAN": [41.0435, 28.9338],
    "GAZİOSMANPAŞA": [41.0577, 28.9059],
    "ESENYURT": [41.0345, 28.6811],
    "ZEYTİNBURNU": [40.9880, 28.9048],
    "TUZLA": [40.8166, 29.3087],
    "ÇEKMEKÖY": [41.0357, 29.1764],
    "SİLİVRİ": [41.0716, 28.2464],
    "ŞİLE": [41.1738, 29.6105],
    "ÇATALCA": [41.1441, 28.4616],
};

export async function GET(req: Request) {
    try {
        // İstanbul verilerini çekiyoruz
        const valuations = await prisma.valuationRequest.findMany({
            where: {
                city: {
                    contains: "stanbul",
                    mode: "insensitive"
                }
            },
            select: {
                district: true,
                estimatedValue: true,
                netSqm: true,
            }
        });

        // İlçe bazlı metrekare ortalamalarını hesaplama
        const heatMapData: Record<string, { totalSqmPrice: number, count: number }> = {};

        valuations.forEach(val => {
            const district = val.district.toUpperCase().trim();
            const sqmPrice = val.estimatedValue / (val.netSqm || 1);

            if (heatMapData[district]) {
                heatMapData[district].totalSqmPrice += sqmPrice;
                heatMapData[district].count += 1;
            } else {
                heatMapData[district] = { totalSqmPrice: sqmPrice, count: 1 };
            }
        });

        const result = Object.keys(heatMapData).map(district => {
            const avgPrice = heatMapData[district].totalSqmPrice / heatMapData[district].count;
            const coords = districtCoords[district] || [41.0082, 28.9784]; // Default to Istanbul center if unknown

            // Renk paleti belirleme (Kırmızı: Çok Pahalı, Sarı: Orta, Yeşil: Ucuz)
            // Ortalama: 100K üstü Kırmızı, 50K üstü Sarı, Altı Yeşil
            let color = "red";
            if (avgPrice < 40000) color = "green";
            else if (avgPrice < 70000) color = "orange";

            return {
                district,
                avgSqmPrice: avgPrice,
                count: heatMapData[district].count,
                coords,
                color
            };
        });

        return NextResponse.json({ success: true, data: result });
    } catch (error: any) {
        console.error("Heatmap API Error:", error);
        return NextResponse.json({ success: false, error: "Veriler alınırken hata oluştu" }, { status: 500 });
    }
}
