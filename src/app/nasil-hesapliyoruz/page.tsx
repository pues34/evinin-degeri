import { Metadata } from "next";
import Link from "next/link";
import { Building2, BarChart2, Shield, MapPin, Zap, TrendingUp, Calculator, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Nasil Hesapliyoruz? | Evinin Degeri",
    description: "Evinin Degeri yapay zeka destekli gayrimenkul degerleme algoritmasinin nasil calistigini ogrenin. Gercek piyasa verileri, bolgesel analiz ve 20+ veri noktasi.",
};

const steps = [
    {
        icon: MapPin,
        title: "Bolgesel Veri Analizi",
        desc: "Il, ilce ve mahalle bazinda gercek piyasa verilerini kullaniyoruz. Her bolgede farkli fiyat dinamikleri devreye girer.",
        color: "text-blue-500",
        bg: "bg-blue-50",
    },
    {
        icon: Building2,
        title: "Bina ve Konut Ozellikleri",
        desc: "Bina yasi, kat durumu, konut tipi, metrekare, oda sayisi gibi fiziksel ozellikler fiyatin temel taslarini olusturur.",
        color: "text-emerald-500",
        bg: "bg-emerald-50",
    },
    {
        icon: Shield,
        title: "Donanim ve Konfor",
        desc: "Asansor, otopark, balkon, isitma sistemi, manzara ve guvenlikli site gibi 15+ ozellik degerlendirmeye eklenir.",
        color: "text-orange-500",
        bg: "bg-orange-50",
    },
    {
        icon: BarChart2,
        title: "Dengeli Fiyat Hesaplama",
        desc: "Tum ozelliklerin etkisi dengeli bir formule gore hesaplanir. Boylece sonuclar gercek piyasayla uyumlu kalir.",
        color: "text-purple-500",
        bg: "bg-purple-50",
    },
    {
        icon: TrendingUp,
        title: "Guncel Piyasa Endeksi",
        desc: "Taban metrekare fiyati guncel enflasyon ve piyasa verilerine gore otomatik guncellenir. Sonuclar her zaman guncel kalir.",
        color: "text-red-500",
        bg: "bg-red-50",
    },
    {
        icon: Zap,
        title: "Yapay Zeka Destekli Analiz",
        desc: "Gelismis yapay zeka modeli, bolgenin sosyo-ekonomik yapisini ve yatirim potansiyelini analiz ederek profesyonel bir degerlendirme sunar.",
        color: "text-indigo-500",
        bg: "bg-indigo-50",
    },
];

const dataPoints = [
    "Il / Ilce / Mahalle", "Bina Yasi", "Kat Tipi", "Brut & Net m2",
    "Oda Sayisi", "Banyo Sayisi", "Mutfak Tipi", "Balkon",
    "Asansor", "Otopark", "Cephe Yonu", "Manzara",
    "Isitma Sistemi", "Site Ici / Guvenlik", "Yapi Durumu", "Konut Tipi",
    "Bolge Carpani", "Enflasyon Endeksi", "Yapay Zeka Analizi", "Kullanim Durumu"
];

export default function NasilHesapliyoruzPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Hero */}
            <section className="max-w-5xl mx-auto px-4 pt-20 pb-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-appleBlue/10 text-appleBlue rounded-full text-sm font-medium mb-6">
                    <Calculator size={16} />
                    Seffaf Degerleme
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-appleDark mb-6 leading-tight">
                    Evinizin Degerini Nasil <span className="text-appleBlue">Hesapliyoruz?</span>
                </h1>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                    Algoritmamiz <strong>20+ veri noktasini</strong> analiz eder, gercek piyasa verilerini kullanir
                    ve yapay zeka destekli profesyonel bir degerlendirme sunar.
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

            {/* Data Points Badge Grid */}
            <section className="max-w-5xl mx-auto px-4 pb-16">
                <h2 className="text-2xl font-bold text-appleDark text-center mb-8">
                    Analiz Edilen <span className="text-appleBlue">20 Veri Noktasi</span>
                </h2>
                <div className="flex flex-wrap justify-center gap-3">
                    {dataPoints.map((point, i) => (
                        <span key={i} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 shadow-sm hover:border-appleBlue hover:text-appleBlue transition-colors cursor-default">
                            {point}
                        </span>
                    ))}
                </div>
            </section>

            {/* Important Disclaimers */}
            <section className="max-w-4xl mx-auto px-4 pb-16">
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8">
                    <h2 className="text-xl font-bold text-appleDark mb-4 flex items-center gap-2">
                        <Shield size={20} className="text-amber-500" />
                        Onemli Bilgilendirme
                    </h2>
                    <ul className="space-y-3 text-gray-600 text-sm leading-relaxed">
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-amber-500 mt-0.5 shrink-0" />
                            <span>Bu degerleme, yapay zeka algoritmasi ve guncel piyasa verileri kullanilarak uretilen <strong>tahmini bir degerdir</strong>. Resmi bir ekspertiz raporu yerine gecmez.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-amber-500 mt-0.5 shrink-0" />
                            <span>Sonuclar <strong>yatirim tavsiyesi niteliginde degildir</strong> ve yatirim kararlari icin bagimsiz mali danismanlik alinmasi tavsiye edilir.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-amber-500 mt-0.5 shrink-0" />
                            <span>Kesin alim-satim kararlari icin SPK lisansli gayrimenkul degerleme uzmanlariyla calisilmasi onerilir.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-amber-500 mt-0.5 shrink-0" />
                            <span>Degerlemeler enflasyon oranlari, bolgesel veriler ve yapay zeka analizi temelinde yapilmaktadir. Gercek piyasa fiyatlari farklilik gosterebilir.</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* FAQ */}
            <section className="max-w-3xl mx-auto px-4 pb-20">
                <h2 className="text-2xl font-bold text-appleDark text-center mb-8">Sikca Sorulan Sorular</h2>
                <div className="space-y-4">
                    {[
                        { q: "Bu degerleme resmi bir ekspertiz raporu mudur?", a: "Hayir. Bu arac yapay zeka ve piyasa verilerine dayali tahmini bir deger sunar. Kesin alim-satim kararlari icin SPK lisansli gayrimenkul degerleme uzmanlari ile calisilmasi onerilir." },
                        { q: "Verilerim guvende mi?", a: "Evet. Iletisim bilgileriniz yalnizca raporunuz icin kullanilir. KVKK uyumlu olarak saklanir ve ucuncu taraflarla paylasilmaz." },
                        { q: "Sonuclar ne kadar dogru?", a: "Algoritmamiz mahalle bazli carpanlar ve 20+ ozellik sayesinde guncel piyasaya en yakin tahminleri uretir. Ancak gercek piyasa kosullari farklilik gosterebilir." },
                        { q: "Istanbul disindaki sehirler destekleniyor mu?", a: "Su anda Istanbul'a odaklaniyoruz. Ankara, Izmir ve Bursa yakin zamanda eklenecek." },
                        { q: "Bu hizmet ucretli mi?", a: "Temel degerleme hizmetimiz tamamen ucretsizdir. Kurumsal kullanicilara ozel limitsiz degerleme ve ek ozellikler icin PRO paketlerimize goz atabilirsiniz." },
                    ].map((faq, i) => (
                        <details key={i} className="bg-white border border-gray-100 rounded-xl overflow-hidden group">
                            <summary className="p-5 cursor-pointer font-medium text-appleDark hover:text-appleBlue transition-colors flex items-center justify-between">
                                {faq.q}
                                <span className="text-gray-400 group-open:rotate-180 transition-transform ml-2 shrink-0">&#9662;</span>
                            </summary>
                            <div className="px-5 pb-5 text-gray-500 text-sm leading-relaxed">{faq.a}</div>
                        </details>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-appleDark py-16 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Evinizin Degerini Hemen Ogrenin</h2>
                <p className="text-gray-400 mb-8">Ucretsiz, hizli ve yapay zeka destekli.</p>
                <Link href="/" className="inline-flex items-center px-8 py-4 bg-appleBlue text-white font-semibold rounded-2xl hover:bg-blue-600 transition-colors shadow-lg">
                    <Calculator size={20} className="mr-2" />
                    Degerlemeye Basla
                </Link>
            </section>
        </div>
    );
}
