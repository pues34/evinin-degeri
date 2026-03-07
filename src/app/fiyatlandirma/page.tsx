import FiyatlandirmaClient from "./FiyatlandirmaClient";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Ücretlendirme ve Paketler | Evinin Değeri",
    description: "Bireysel, Premium ve B2B Kurumsal abonelik paketlerimizi inceleyin. Evinizin değerini hesaplamak ücretsizdir, gelişmiş emlak özelliklerini keşfedin.",
    keywords: ["emlak fiyatlandırma", "premium gayrimenkul analizi", "emlakçı paketi", "b2b emlak", "ücretsiz ev değerleme"]
};

export default function FiyatlandirmaPage() {
    return <FiyatlandirmaClient />;
}
