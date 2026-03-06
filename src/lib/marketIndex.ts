// src/lib/marketIndex.ts

export type MarketCondition = "SOĞUK" | "DENGELİ" | "SICAK";

export interface MarketIndexData {
    city: string;
    district: string;
    condition: MarketCondition;
    indexValue: number; // 0 to 100. >60 is hot (seller's market), <40 is cold (buyer's market)
    suggestedMultiplier: number;
}

// In a real application, this data would come from Sahibinden, Endeksa, or Hepsiemlak APIs
// by dividing the (number of active listings) / (population or total housing stock).
// For the MVP, we use simulated logic based on known high-velocity vs low-velocity districts.

const simulatedHotMarkets = ["Kadıköy", "Beşiktaş", "Şişli", "Çankaya", "Karşıyaka", "Nilüfer"];
const simulatedColdMarkets = ["Arnavutköy", "Silivri", "Çatalca", "Şile", "Polatlı", "Kınık"];

export function getLiveMarketIndex(city: string, district: string): MarketIndexData {
    // Normalize
    const dName = district.trim();

    // Simulated logic
    if (simulatedHotMarkets.includes(dName)) {
        // High demand, low supply relative to demand -> Seller's Market
        return {
            city,
            district: dName,
            condition: "SICAK",
            indexValue: Math.floor(Math.random() * (85 - 65 + 1)) + 65, // 65 - 85
            suggestedMultiplier: 1.04 // 4% premium due to high demand
        };
    } else if (simulatedColdMarkets.includes(dName)) {
        // Low demand, high supply -> Buyer's Market
        return {
            city,
            district: dName,
            condition: "SOĞUK",
            indexValue: Math.floor(Math.random() * (35 - 15 + 1)) + 15, // 15 - 35
            suggestedMultiplier: 0.95 // 5% discount due to low demand
        };
    }

    // Balanced Market (Default for most)
    return {
        city,
        district: dName,
        condition: "DENGELİ",
        indexValue: Math.floor(Math.random() * (60 - 40 + 1)) + 40, // 40 - 60
        suggestedMultiplier: 1.0 // No premium or discount
    };
}
