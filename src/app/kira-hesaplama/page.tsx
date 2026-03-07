import KiraHesaplamaClient from "./KiraHesaplamaClient";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Kira Getirisi Hesaplama Aracı | Evinin Değeri",
    description: "Evinizin veya gayrimenkulünüzün gerçek piyasa değeri üzerinden yıllık kira getiri oranını (ROI) ve amortisman süresini en güncel algoritmalarla hesaplayın.",
    keywords: ["kira getirisi", "kira hesaplama", "amortisman süresi", "gayrimenkul roi", "emlak yatırım getirisi"]
};

export default function KiraHesaplama() {
    return <KiraHesaplamaClient />;
}
