import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfUse() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                <Link href="/" className="inline-flex items-center text-appleBlue hover:underline mb-8 font-medium">
                    <ArrowLeft size={16} className="mr-2" /> Ana Sayfaya Dön
                </Link>

                <h1 className="text-4xl font-bold text-appleDark mb-8">Kullanım Koşulları</h1>

                <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
                    <p>Son Güncelleme Tarihi: {new Date().toLocaleDateString('tr-TR')}</p>

                    <h2 className="text-2xl font-semibold text-appleDark mt-8 mb-4">1. Hizmetin Kapsamı</h2>
                    <p>Evinin Değeri platformu (bundan böyle &quot;Platform&quot; olarak anılacaktır), kullanıcının girdiği gayrimenkul özelliklerine dayanarak yapay zeka destekli, istatistiksel bir tahmini değerleme hizmeti sunar. Sunulan fiyatlar ve raporlar kesin birer ekspertiz belgesi niteliği taşımaz, yalnızca piyasa tahmini olarak bilgi amaçlıdır.</p>

                    <h2 className="text-2xl font-semibold text-appleDark mt-8 mb-4">2. Yükümlülük Reddi</h2>
                    <p>Sistem üzerinden oluşturulan veri, fiyat ve yorum grafikleri, finansal veya yasal bağlayıcılığa sahip değildir. Gerçek alım-satım veya resmi kurumsal işlemlerde doğabilecek maddi kayıplardan Platform sorumlu tutulamaz. Resmi işlemler için bir Sermaye Piyasası Kurulu (SPK) lisanslı gayrimenkul değerleme uzmanından (Eksper) bağımsız değerlendirme alınması önerilir.</p>

                    <h2 className="text-2xl font-semibold text-appleDark mt-8 mb-4">3. Kullanıcı Beyanları</h2>
                    <p>Forma girdiğiniz verilerin gerçeği yansıtması kendi sorumluluğunuzdadır. Yanıltıcı veri girişi, hatalı piyasa değerlendirme sonuçlarına sebep olabilir.</p>

                    <h2 className="text-2xl font-semibold text-appleDark mt-8 mb-4">4. Fikri Mülkiyet</h2>
                    <p>Site üzerinde yer alan algoritmalar, tasarım kodları ve marka logoları Evinin Değeri platformunun mülkiyetindedir, izinsiz kopyalanamaz veya ticari amaçlı kullanılamaz.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
