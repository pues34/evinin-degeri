import { Metadata } from "next";
import Link from "next/link";
import { Building2, BarChart2, Settings, Shield, MapPin, Zap, TrendingUp, Calculator } from "lucide-react";

export const metadata: Metadata = {
    title: "Nasıl Hesaplıyoruz? | Evinin Değeri",
    description: "Evinin Değeri'nin yapay zeka destekli gayrimenkul değerleme algoritmasının nasıl çalıştığını öğrenin. 20+ veri noktası, sönümlemeli formül ve bölgesel analiz.",
};

const steps = [
    {
        icon: MapPin,
        title: "1. Bölgesel Veri Analizi",
        desc: "İl, ilçe ve mahalle bazında veritabanımızdaki konum çarpanlarını uyguluyoruz. Her mahallenin kendine özgü bir fiyat katsayısı var.",
        color: "text-blue-500",
        bg: "bg-blue-50",
    },
    {
        icon: Building2,
        title: "2. Yapısal Çarpanlar",
        desc: "Bina yaşı, kat tipi (bodrum, ara kat, dubleks, müstakil), yapı durumu (yenilenmiş/standart/masraflı) doğrudan fiyata etki eder.",
        color: "text-emerald-500",
        bg: "bg-emerald-50",
    },
    {
        icon: Settings,
        title: "3. Donanım & Özellikler",
        desc: "Asansör, otopark, balkon, mutfak tipi, banyo sayısı, ısıtma sistemi, cephe yönü ve manzara gibi 15+ özellik değerlendirilir.",
        color: "text-orange-500",
        bg: "bg-orange-50",
    },
    {
        icon: Shield,
        title: "4. Sönümlemeli Formül",
        desc: "Tüm bonus çarpanları tek tek çarpmak yerine, toplam bonusu %65 oranında sönümleyerek gerçekçi fiyatlar elde ediyoruz. Bu, her özelliğin etkisini koruyor ama enflasyonu önlüyor.",
        color: "text-purple-500",
        bg: "bg-purple-50",
    },
    {
        icon: TrendingUp,
        title: "5. Enflasyon Endeksi",
        desc: "Taban metrekare fiyatı, aylık enflasyon oranına göre dinamik güncellenir. Mart 2026 ile Aralık 2026'da aynı ev farklı değerlenir — tıpkı gerçek piyasa gibi.",
        color: "text-red-500",
        bg: "bg-red-50",
    },
    {
        icon: Zap,
        title: "6. Yapay Zeka Yorumu",
        desc: "OpenAI GPT-4 modeli bölgesel demografik veriyi, sosyo-ekonomik durumu ve yatırım potansiyelini analiz ederek profesyonel bir yorum üretir.",
        color: "text-indigo-500",
        bg: "bg-indigo-50",
    },
];

const dataPoints = [
    "İl / İlçe / Mahalle", "Bina Yaşı", "Kat Tipi", "Brüt & Net m²",
    "Oda Sayısı", "Banyo Sayısı", "Mutfak Tipi", "Balkon",
    "Asansör", "Otopark", "Cephe Yönü", "Manzara",
    "Isıtma Sistemi", "Site İçi / Güvenlik", "Yapı Durumu", "Konut Tipi",
    "Bölge Çarpanı", "Enflasyon Endeksi", "Yapay Zeka Analizi", "Sönümleme Faktörü"
];

export default function NasilHesapliyoruzPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Hero */}
            <section className="max-w-5xl mx-auto px-4 pt-20 pb-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-appleBlue/10 text-appleBlue rounded-full text-sm font-medium mb-6">
                    <Calculator size={16} />
                    Algoritma Şeffaflığı
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-appleDark mb-6 leading-tight">
                    Değeri Nasıl <span className="text-appleBlue">Hesaplıyoruz?</span>
                </h1>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                    Evinin Değeri algoritması, <strong>20+ veri noktasını</strong> analiz eder ve
                    sönümlemeli formül sayesinde fiyatların gerçek piyasadan sapmasını önler.
                </p>
            </section>

            {/* Steps */}
            <section className="max-w-5xl mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {steps.map((step, i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className={`w-12 h-12 ${step.bg} rounded-xl flex items-center justify-center mb-4`}>
                                <step.icon size={24} className={step.color} />
                            </div>
                            <h3 className="font-semibold text-appleDark text-lg mb-2">{step.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Dampening Explanation Box */}
            <section className="max-w-5xl mx-auto px-4 pb-16">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100">
                    <h2 className="text-2xl font-bold text-appleDark mb-4">🧮 Sönümleme Formülü Nedir?</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        Birçok değerleme sitesi, her özelliğin çarpanını (asansör ×1.05, otopark ×1.08, site ×1.15...)
                        birbirine çarpar. Bu durumda 5-6 özellik yan yana geldiğinde fiyat <strong>%50-60 şişer</strong>.
                    </p>
                    <div className="bg-white rounded-xl p-6 font-mono text-sm mb-4">
                        <p className="text-red-500 mb-2">❌ <strong>Eski yöntem:</strong> 1.05 × 1.08 × 1.15 × 1.05 × 1.12 = <strong>1.53x</strong> (gerçek dışı)</p>
                        <p className="text-green-600">✅ <strong>Sönümlemeli:</strong> 1 + (0.45 × 0.65) = <strong>1.29x</strong> (gerçekçi)</p>
                    </div>
                    <p className="text-gray-500 text-sm">
                        Sönümleme faktörü admin panelinden ayarlanabilir. Varsayılan oran: <strong>%65</strong>.
                    </p>
                </div>
            </section>

            {/* Data Points Badge Grid */}
            <section className="max-w-5xl mx-auto px-4 pb-16">
                <h2 className="text-2xl font-bold text-appleDark text-center mb-8">
                    Analiz Edilen <span className="text-appleBlue">20 Veri Noktası</span>
                </h2>
                <div className="flex flex-wrap justify-center gap-3">
                    {dataPoints.map((point, i) => (
                        <span key={i} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 shadow-sm hover:border-appleBlue hover:text-appleBlue transition-colors cursor-default">
                            {point}
                        </span>
                    ))}
                </div>
            </section>

            {/* FAQ */}
            <section className="max-w-3xl mx-auto px-4 pb-20">
                <h2 className="text-2xl font-bold text-appleDark text-center mb-8">Sıkça Sorulan Sorular</h2>
                <div className="space-y-4">
                    {[
                        { q: "Bu değerleme resmi bir ekspertiz raporu mu?", a: "Hayır. Bu araç piyasa tahmini sunar; kesin alım-satım kararları için SPK lisanslı gayrimenkul değerleme uzmanları ile çalışmanızı öneririz." },
                        { q: "Verilerim güvende mi?", a: "Evet. İletişim bilgileriniz yalnızca raporunuz için kullanılır. KVKK uyumlu olarak saklanır ve üçüncü taraflarla paylaşılmaz." },
                        { q: "Sonuçlar ne kadar doğru?", a: "Algoritmamız mahalle çarpanları ve 20+ özellik sayesinde güncel piyasaya en yakın tahminleri üretir. Sönümleme formülümüz fiyat şişmesini önler." },
                        { q: "İstanbul dışındaki şehirler destekleniyor mu?", a: "Şu anda İstanbul'a odaklanıyoruz. Ankara, İzmir ve Bursa yakında eklenecek." },
                    ].map((faq, i) => (
                        <details key={i} className="bg-white border border-gray-100 rounded-xl overflow-hidden group">
                            <summary className="p-5 cursor-pointer font-medium text-appleDark hover:text-appleBlue transition-colors flex items-center justify-between">
                                {faq.q}
                                <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
                            </summary>
                            <div className="px-5 pb-5 text-gray-500 text-sm leading-relaxed">{faq.a}</div>
                        </details>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-appleDark py-16 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Evinizin Değerini Hemen Öğrenin</h2>
                <p className="text-gray-400 mb-8">Ücretsiz, hızlı ve yapay zeka destekli.</p>
                <Link href="/" className="inline-flex items-center px-8 py-4 bg-appleBlue text-white font-semibold rounded-2xl hover:bg-blue-600 transition-colors shadow-lg">
                    <Calculator size={20} className="mr-2" />
                    Değerlemeye Başla
                </Link>
            </section>
        </div>
    );
}
