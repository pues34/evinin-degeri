const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const newSettings = {
    // Existing (ensure they have values)
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
    // V22 NEW MULTIPLIERS
    mHeatingDogalgaz: "1.03",
    mHeatingYerden: "1.05",
    mHeatingSoba: "0.93",
    mViewDeniz: "1.12",
    mViewDoga: "1.06",
    mViewSehir: "1.03",
    mPropertyDubleks: "1.08",
    // Dampening factor — controls how much bonus multipliers are reduced
    dampeningFactor: "0.65"
};

async function main() {
    for (const [key, value] of Object.entries(newSettings)) {
        await prisma.algorithmSettings.upsert({
            where: { key },
            update: {}, // Don't overwrite existing user-set values
            create: { key, value }
        });
    }
    console.log("V22: All algorithm settings seeded successfully.");

    // Verify
    const all = await prisma.algorithmSettings.findMany();
    console.log(`Total settings in DB: ${all.length}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
