import B2BLandingClient from "./B2BLandingClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kurumsal B2B Emlak Değerleme Yazılımı | Evin Değeri",
    description: "Sınırsız değerleme, white-label PDF raporlama ve premium satıcı leadleri ile emlak ofisinizi teknolojiyle büyütün.",
};

export default function B2BLandingPage() {
    return <B2BLandingClient />;
}
