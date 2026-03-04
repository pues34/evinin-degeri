import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const settings = await prisma.algorithmSettings.findMany();
        const settingsMap: Record<string, string> = {};

        settings.forEach((s: any) => {
            settingsMap[s.key] = s.value;
        });

        // Default fallbacks if not in DB yet
        const defaults = {
            baseSqmPrice: "25000",
            inflationRate: "0.035",
            elevatorMultiplier: "1.05",
            parkingMultiplier: "1.08",
            securityMultiplier: "1.06",
            multBodrum: "0.80",
            multKot1: "0.90",
            multZemin: "0.95",
            multUst: "0.95",
            multCati: "1.25",
            multMustakil: "1.50",
            multAra: "1.15",
            multMutfakKapali: "1.05",
            multBalkonVar: "1.10",
            multCiftBanyo: "1.07",
            buildingAgeDepreciation: "0.01",
            adsenseHeader: "",
            adsenseSidebar: "",
            sponsorHeaderUrl: "",
            sponsorHeaderLink: "",
            sponsorSidebarUrl: "",
            sponsorSidebarLink: "",
            mFacadeGuney: "1.05",
            mFacadeKuzey: "0.95",
            mSiteIci: "1.15",
            mYenilenmis: "1.15",
            mMasrafli: "0.85"
        };

        for (const ObjectEntry of Object.entries(defaults)) {
            const k = ObjectEntry[0];
            const v = ObjectEntry[1];
            if (!settingsMap[k]) settingsMap[k] = v;
        }

        return NextResponse.json({ success: true, data: settingsMap });
    } catch (error) {
        console.error("Settings GET error:", error);
        return NextResponse.json({ success: false, error: "Sunucu hatası" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Expect an object of key: value pairs
        for (const [key, value] of Object.entries(body)) {
            await prisma.algorithmSettings.upsert({
                where: { key },
                // @ts-ignore
                update: { value: String(value) },
                // @ts-ignore
                create: { key, value: String(value), description: `Otomatik eklendi: ${key}` }
            });
        }

        return NextResponse.json({ success: true, message: "Ayarlar başarıyla kaydedildi." });
    } catch (error) {
        console.error("Settings POST error:", error);
        return NextResponse.json({ success: false, error: "Sunucu hatası" }, { status: 500 });
    }
}
