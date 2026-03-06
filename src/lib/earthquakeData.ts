// src/lib/earthquakeData.ts

export type RiskLevel = "YÜKSEK" | "ORTA" | "DÜŞÜK" | "BİLİNMİYOR";

export interface EarthquakeRiskData {
    district: string;
    riskLevel: RiskLevel;
    multiplier: number; // For instance, low risk adds value (>1), high risk lowers it (<1)
    details: string;
}

// Simulated data based on AFAD / Kandilli typical risk maps for major cities (Istanbul focus primarily for this MVP)
const earthquakeRisks: Record<string, EarthquakeRiskData> = {
    // Istanbul High Risk (Coastal, soft soil)
    "Avcılar": { district: "Avcılar", riskLevel: "YÜKSEK", multiplier: 0.92, details: "Sıvılaşma riski yüksek zemin." },
    "Bakırköy": { district: "Bakırköy", riskLevel: "YÜKSEK", multiplier: 0.95, details: "Eski yapı stoğu ve kıyı şeridi." },
    "Zeytinburnu": { district: "Zeytinburnu", riskLevel: "YÜKSEK", multiplier: 0.94, details: "Fay hattına yakınlık ve eski yapılar." },
    "Küçükçekmece": { district: "Küçükçekmece", riskLevel: "YÜKSEK", multiplier: 0.95, details: "Göl havzası ve alüvyon zemin." },
    "Büyükçekmece": { district: "Büyükçekmece", riskLevel: "ORTA", multiplier: 0.97, details: "Sahil kesimleri riskli, yüksek kesimler daha güvenli." },
    "Tuzla": { district: "Tuzla", riskLevel: "ORTA", multiplier: 0.97, details: "Fay hattına yakınlık." },
    "Fatih": { district: "Fatih", riskLevel: "YÜKSEK", multiplier: 0.95, details: "Çok eski ve bitişik nizam yapı stoğu." },

    // Istanbul Medium Risk
    "Kadıköy": { district: "Kadıköy", riskLevel: "ORTA", multiplier: 0.98, details: "Kıyı kesimi hariç zemin nispeten sağlam, ancak yapı yaşı önemli." },
    "Üsküdar": { district: "Üsküdar", riskLevel: "ORTA", multiplier: 0.99, details: "Zemin genel olarak sağlam." },
    "Maltepe": { district: "Maltepe", riskLevel: "ORTA", multiplier: 0.98, details: "Sahil bandı sıvılaşma riski taşıyor." },
    "Kartal": { district: "Kartal", riskLevel: "ORTA", multiplier: 0.98, details: "Sahil bandı riskli, E-5 üstü daha sağlam kayalık." },

    // Istanbul Low Risk (Solid rock, further north)
    "Başakşehir": { district: "Başakşehir", riskLevel: "DÜŞÜK", multiplier: 1.05, details: "Yeni yapı stoğu ve sağlam zemin." },
    "Arnavutköy": { district: "Arnavutköy", riskLevel: "DÜŞÜK", multiplier: 1.05, details: "Sağlam kayalık zemin ve fay hattına uzaklık." },
    "Sarıyer": { district: "Sarıyer", riskLevel: "DÜŞÜK", multiplier: 1.06, details: "İstanbul'un en sağlam zeminlerinden biri." },
    "Beykoz": { district: "Beykoz", riskLevel: "DÜŞÜK", multiplier: 1.05, details: "Sağlam kayalık tepeler." },
    "Çekmeköy": { district: "Çekmeköy", riskLevel: "DÜŞÜK", multiplier: 1.04, details: "Orman içi, kayalık zemin." },
    "Ataşehir": { district: "Ataşehir", riskLevel: "DÜŞÜK", multiplier: 1.03, details: "Nispeten yeni yapılaşma ve sağlam zemin." },
    "Şişli": { district: "Şişli", riskLevel: "DÜŞÜK", multiplier: 1.02, details: "Zemin formasyonu (Kilyos-Maden) oldukça sağlam." },
    "Beşiktaş": { district: "Beşiktaş", riskLevel: "ORTA", multiplier: 1.00, details: "Merkez ve vadi içi kısımlar hariç zemin sağlam." },
    "Pendik": { district: "Pendik", riskLevel: "ORTA", multiplier: 0.99, details: "E-5 üstü sağlam, sahil kesimi alüvyon." },

    // Ankara (Generally lower risk, but some variations exist)
    "Çankaya": { district: "Çankaya", riskLevel: "DÜŞÜK", multiplier: 1.02, details: "Ankara geneli düşük deprem riskine sahiptir." },
    "Yenimahalle": { district: "Yenimahalle", riskLevel: "DÜŞÜK", multiplier: 1.02, details: "Ankara geneli düşük deprem riskine sahiptir." },
    "Keçiören": { district: "Keçiören", riskLevel: "DÜŞÜK", multiplier: 1.02, details: "Ankara geneli düşük deprem riskine sahiptir." },

    // Izmir (Higher overall risk due to active faults and soft soil in plain areas)
    "Bayraklı": { district: "Bayraklı", riskLevel: "YÜKSEK", multiplier: 0.93, details: "Alüvyon zemin ve sıvılaşma riski çok yüksek." },
    "Bornova": { district: "Bornova", riskLevel: "YÜKSEK", multiplier: 0.94, details: "Ova kesiminde sıvılaşma riski yüksek." },
    "Karşıyaka": { district: "Karşıyaka", riskLevel: "YÜKSEK", multiplier: 0.95, details: "Sahil bandı sıvılaşma riski taşıyor." },
    "Buca": { district: "Buca", riskLevel: "ORTA", multiplier: 0.98, details: "Kayalık zeminli tepelik alanlar daha güvenli." },
    "Balçova": { district: "Balçova", riskLevel: "ORTA", multiplier: 0.98, details: "Güney tepelik kısımlar sağlam." },

    // Bursa
    "Osmangazi": { district: "Osmangazi", riskLevel: "YÜKSEK", multiplier: 0.95, details: "Aktif fay zonlarına yakınlık ve ova kesimi." },
    "Nilüfer": { district: "Nilüfer", riskLevel: "ORTA", multiplier: 0.99, details: "Yeni bina stoğu avantajlı ancak zemin sıvılaşma potansiyeline sahip bölgeler barındırıyor." },

    // Antalya
    "Muratpaşa": { district: "Muratpaşa", riskLevel: "ORTA", multiplier: 1.00, details: "Falez üstü zemin sağlam, ancak kıyı kısımlarında dikkatli olunmalı." },
    "Konyaaltı": { district: "Konyaaltı", riskLevel: "ORTA", multiplier: 0.98, details: "Alüvyon zemin ve sıvılaşma potansiyeli." }
};

export function getEarthquakeRiskForDistrict(city: string, district: string): EarthquakeRiskData {
    // Try to find the specific district
    // For robustness, some basic normalization (trimming, maybe lowercase mapping in the future)
    const key = district.trim();
    const riskData = earthquakeRisks[key];

    if (riskData) {
        return riskData;
    }

    // Fallback defaults based on City if District is unknown
    if (city === "İstanbul" || city === "Istanbul") {
        return { district: "Bilinmiyor", riskLevel: "ORTA", multiplier: 1.0, details: "Bölge özelinde net veri bulunamadı. Genel varsayım uygulandı." };
    } else if (city === "Ankara") {
        return { district: "Bilinmiyor", riskLevel: "DÜŞÜK", multiplier: 1.02, details: "Ankara geneli düşük deprem riskli fay hatlarına uzaktır." };
    } else if (city === "İzmir" || city === "Izmir") {
        return { district: "Bilinmiyor", riskLevel: "YÜKSEK", multiplier: 0.96, details: "İzmir geneli fay hatları ve zemin özellikleri sebebiyle yüksek risk grubundadır." };
    }

    // Absolute generic fallback
    return {
        district: district,
        riskLevel: "BİLİNMİYOR",
        multiplier: 1.0,
        details: "Bu ilçe için yeterli jeolojik zemin formasyon verisi bulunmamaktadır."
    };
}
