import KonutFiyatEndeksiClient from "./KonutFiyatEndeksiClient";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Konut Fiyat Endeksi | Evin Değeri",
    description: "İstanbul ve Türkiye geneli konut metrekare satış fiyatlarının aylık bazda değişimini, enflasyon ve emlak piyasası trendlerini canlı grafiklerle analiz edin.",
    keywords: ["konut fiyat endeksi", "emlak piyasası trendleri", "istanbul ev fiyatları", "metrekare fiyatları 2026", "gayrimenkul raporu"]
};

export default function KonutFiyatEndeksi() {
    return <KonutFiyatEndeksiClient />;
}
