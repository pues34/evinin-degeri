import GecmisClient from "./GecmisClient";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Geçmiş Değerlemelerim | Evinin Değeri",
    description: "Geçmişte yaptığınız ev değerlemelerine, detaylı ekspertiz raporlarına ve fiyat değişim takibine tek ekrandan ulaşın.",
    keywords: ["geçmiş değerlemeler", "emlak raporlarım", "ev fiyatı geçmişi", "ekspertiz sorgulama", "gayrimenkul değerleme"]
};

export default function GecmisPage() {
    return <GecmisClient />;
}
