const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const defaultSettings = {
    baseSqmPrice: "45000",
    inflationRate: "0.65",
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
    mFacadeGuney: "1.05",
    mFacadeKuzey: "0.95",
    mSiteIci: "1.15",
    mYenilenmis: "1.15",
    mMasrafli: "0.85",
    b2bMonthlyPrice: "500",
    b2bDiscountPercentage: "0",
    adsenseHeader: "",
    adsenseSidebar: "",
    sponsorHeaderUrl: "",
    sponsorHeaderLink: "",
    sponsorSidebarUrl: "",
    sponsorSidebarLink: ""
};

async function main() {
    for (const [key, value] of Object.entries(defaultSettings)) {
        await prisma.algorithmSettings.upsert({
            where: { key },
            update: {}, // Only create if it doesn't exist, don't overwrite user's values if they managed to save any
            create: { key, value }
        });
    }
    console.log("Database seeded with default algorithm values.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
