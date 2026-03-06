import Footer from "@/components/Footer";
import { HelpCircle, ChevronDown, ChevronUp, Home, TrendingUp, Shield, Users } from "lucide-react";
import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Sikca Sorulan Sorular (SSS) | Evinin Degeri",
    description: "Evinin Degeri hakkinda en cok sorulan sorular ve cevaplari. Yapay zeka degerleme, B2B uyelik, algoritma ve daha fazlasi.",
};

const faqs = [
    {
        category: "Genel",
        icon: <Home size={20} />,
        questions: [
            {
                q: "Evinin Degeri nedir?",
                a: "Evinin Degeri, yapay zeka ve buyuk veri analiziyle gayrimenkul degerleme yapan Turkiye lider ucretsiz platformudur. 20 den fazla veri noktasini analiz ederek evinizin guncel piyasa degerini saniyeler icinde hesaplar."
            },
            {
                q: "Degerleme ucretsiz mi?",
                a: "Evet, bireysel kullanicilar icin gunluk 3 e kadar ucretsiz degerleme hakkiniz bulunmaktadir. Daha fazla degerleme icin B2B kurumsal uyelik paketlerimize goz atabilirsiniz."
            },
            {
                q: "Sonuclar ne kadar guvenilir?",
                a: "Algoritmamiz TCMB verileri, bolgesel enflasyon oranlari, lokasyon carpanlari ve 20+ veri noktasini kullanir. Ancak sonuclarimiz kesin bir ekspertiz raporu degildir, yatirim tavsiyesi niteliginde degildir ve referans amacli kullanilmalidir."
            },
            {
                q: "Hangi sehirlerde calisiyor?",
                a: "Su anda veritabanimizda Istanbul, Ankara, Izmir bastos olmak uzere Turkiye'nin buyuk sehirlerinde aktif olarak calisiyoruz. Yeni bolgeler surekli eklenmektedir."
            },
        ]
    },
    {
        category: "Algoritma",
        icon: <TrendingUp size={20} />,
        questions: [
            {
                q: "Degerleme nasil hesaplaniyor?",
                a: "Taban metrekare fiyati x brut alan uzerinden baslayarak; bina yasi, kat durumu, isitma tipi, manzara, otopark, asansor, cephe yonu, site icinde olma durumu gibi 20+ carpan uygulanir. Carpanlar sonumleme formuluyle dengelenir, boylece fiyatlar gercekcil kalir."
            },
            {
                q: "Sonumleme formulü nedir?",
                a: "Birden fazla bonus carpanin (asansor 1.05x, otopark 1.08x, manzara 1.12x...) dogrudan carpilmasi fiyati sisirir. Bu carpanlarin etki miktarlarini topluyoruz ve 0.65 sonumleme katsayisiyla carpiyoruz. Boylece gercekci fiyatlar elde edilir."
            },
            {
                q: "Yapay zeka ne icin kullaniliyor?",
                a: "OpenAI GPT-4 ile mahallenin demografik yapisini, sosyo-ekonomik duzeyini ve yapay zeka yorumunu olusturuyoruz. Ayrica mahalle altyapi skoru, kira analizi ve blog icerikleri de yapay zeka desteklidir."
            },
            {
                q: "Bolge carpanlari nasil belirleniyor?",
                a: "Her mahalle icin admin panelinden bolge carpani ayarlanabilir. Bu carpan, mahallenin piyasa degerini yansitir (ornegin Besiktas 2.5x, Esenyurt 0.8x). Carpanlar duzenli olarak guncellenir."
            },
        ]
    },
    {
        category: "B2B Kurumsal",
        icon: <Users size={20} />,
        questions: [
            {
                q: "PRO paket ne sunuyor?",
                a: "PRO paket ile aylik limitsiz degerleme yapabilirsiniz. Aylik ucreti admin panelinden belirlenir (varsayilan 500 TL). Emlak ofisleri ve bankalar icin idealdir."
            },
            {
                q: "PRO PLUS paket nedir?",
                a: "PRO PLUS paket, PRO nun tum ozelliklerini icermenin yani sira white-label markalama (kendi logonuzla raporlar) ve Lead Market erisimi sunar. Ev satmak isteyen musterilere dogrudan ulasabilirsiniz."
            },
            {
                q: "Odeme nasil yapilir?",
                a: "PayTR altyapisi ile guvenli kredi karti odemesi yapabilirsiniz. Aylik abonelik modeli ile calisilir. Iptal istediginiz zaman aboneliginizi sonlandirabilirsiniz."
            },
        ]
    },
    {
        category: "Guvenlik ve Gizlilik",
        icon: <Shield size={20} />,
        questions: [
            {
                q: "Bilgilerim guende mi?",
                a: "Tum verileriniz SSL sertifikasi ile sifrelidir. KVKK kapsaminda kisisel verileriniz korunmaktadir. Verilerinizi ucuncu taraflarla paylasmiyoruz."
            },
            {
                q: "Rate limit nedir?",
                a: "Guvenlik amaciyla her IP adresinden ve telefon numarasindan gunluk maksimum 3 ucretsiz degerleme yapilabilir. Bu limit kotu niyetli kullanimi onlemek icindir."
            },
            {
                q: "Verilerimi sildirebilir miyim?",
                a: "Evet, KVKK kapsamindaki haklariniz cercevesinde iletisim sayfamiz uzerinden veri silme talebinde bulunabilirsiniz."
            },
        ]
    },
];

export default function SSSPage() {
    return (
        <div className="min-h-screen bg-appleGray">
            {/* Hero */}
            <div className="bg-gradient-to-br from-appleDark via-gray-900 to-appleDark text-white py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-6">
                        <HelpCircle size={32} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Sikca Sorulan Sorular</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">Evinin Degeri platformu hakkinda merak ettiginiz her sey burada.</p>
                </div>
            </div>

            {/* FAQ Content */}
            <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
                {faqs.map((section, si) => (
                    <div key={si}>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-appleBlue">{section.icon}</span>
                            <h2 className="text-2xl font-bold text-appleDark">{section.category}</h2>
                        </div>
                        <div className="space-y-4">
                            {section.questions.map((faq, fi) => (
                                <details key={fi} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                                        <span className="font-semibold text-appleDark pr-4">{faq.q}</span>
                                        <ChevronDown size={20} className="text-gray-400 shrink-0 group-open:rotate-180 transition-transform" />
                                    </summary>
                                    <div className="px-6 pb-6 pt-0">
                                        <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                ))}

                {/* CTA */}
                <div className="bg-gradient-to-r from-appleBlue to-blue-600 rounded-3xl p-8 md:p-10 text-white text-center shadow-xl">
                    <h3 className="text-2xl font-bold mb-3">Baska Sorunuz Mu Var?</h3>
                    <p className="text-blue-100 mb-6">Iletisim sayfamizdan bize ulasabilir veya yapay zeka asistanimizla sohbet edebilirsiniz.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/iletisim" className="px-6 py-3 bg-white text-appleBlue font-bold rounded-xl hover:scale-105 transition-transform">
                            Iletisim
                        </Link>
                        <Link href="/" className="px-6 py-3 bg-white/20 text-white font-bold rounded-xl border border-white/30 hover:bg-white/30 transition-colors">
                            Ucretsiz Degerleme Yap
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
