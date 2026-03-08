import AmortismanHesaplamaClient from "./AmortismanHesaplamaClient";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Amortisman Süresi Hesaplama | Evin Değeri",
    description: "Gayrimenkul yatırımınızın kira geliriyle kendini kaç yılda telafi edeceğini (amortisman/geri dönüş süresi) hesaplayın. Türkiye ortalamasıyla karşılaştırın.",
    keywords: ["amortisman hesaplama", "emlak geri dönüş süresi", "konut yatırım getirisi", "gayrimenkul roi", "ev yatırımı"]
};

export default function AmortismanHesaplama() {
    return <AmortismanHesaplamaClient />;
}
