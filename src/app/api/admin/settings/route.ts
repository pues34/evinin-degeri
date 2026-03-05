import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        let sysSettings = await prisma.systemSettings.findFirst();

        if (!sysSettings) {
            sysSettings = await prisma.systemSettings.create({
                data: { showSocialMedia: true, valuationCounter: 0 }
            });
        }

        const algoSettingsArray = await prisma.algorithmSettings.findMany();
        const algoObj: Record<string, string> = {};
        algoSettingsArray.forEach((s: any) => {
            algoObj[s.key] = s.value;
        });

        // Only pick relevant fields from SystemSettings (exclude id, createdAt, updatedAt)
        const { instagramUrl, twitterUrl, linkedinUrl, showSocialMedia, valuationCounter } = sysSettings;
        const sysObj = { instagramUrl: instagramUrl || "", twitterUrl: twitterUrl || "", linkedinUrl: linkedinUrl || "", showSocialMedia, valuationCounter };

        const mergedSettings = { ...algoObj, ...sysObj };

        return NextResponse.json({ success: true, data: mergedSettings });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // System Settings
        let sysSettings = await prisma.systemSettings.findFirst();
        if (!sysSettings) {
            sysSettings = await prisma.systemSettings.create({ data: { showSocialMedia: true, valuationCounter: 0 } });
        }
        await prisma.systemSettings.update({
            where: { id: sysSettings.id },
            data: {
                instagramUrl: body.instagramUrl || "",
                twitterUrl: body.twitterUrl || "",
                linkedinUrl: body.linkedinUrl || "",
                showSocialMedia: body.showSocialMedia !== undefined ? body.showSocialMedia : true,
                valuationCounter: body.valuationCounter ? parseInt(body.valuationCounter) : 0
            }
        });

        // Algorithm Settings
        const algoKeys = [
            "baseSqmPrice", "inflationRate", "elevatorMultiplier", "parkingMultiplier", "securityMultiplier",
            "multBodrum", "multKot1", "multZemin", "multUst", "multCati", "multMustakil", "multAra",
            "multMutfakKapali", "multBalkonVar", "multCiftBanyo", "buildingAgeDepreciation",
            "adsenseHeader", "adsenseSidebar", "sponsorHeaderUrl", "sponsorHeaderLink",
            "sponsorSidebarUrl", "sponsorSidebarLink", "mFacadeGuney", "mFacadeKuzey", "mSiteIci",
            "mYenilenmis", "mMasrafli", "b2bMonthlyPrice", "b2bDiscountPercentage",
            "mHeatingDogalgaz", "mHeatingYerden", "mHeatingSoba",
            "mViewDeniz", "mViewDoga", "mViewSehir", "mPropertyDubleks", "dampeningFactor"
        ];

        for (const key of algoKeys) {
            if (body[key] !== undefined && body[key] !== null) {
                const val = String(body[key]);
                await prisma.algorithmSettings.upsert({
                    where: { key },
                    update: { value: val },
                    create: { key, value: val }
                });
            }
        }

        return NextResponse.json({ success: true, message: "Ayarlar başarıyla güncellendi." });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: "Ayarlar güncellenirken bir hata oluştu." }, { status: 500 });
    }
}
