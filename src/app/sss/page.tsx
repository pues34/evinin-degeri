"use client";

import { HelpCircle, ChevronDown, Home, TrendingUp, Shield, Users, CheckCircle, Zap, MapPin, BarChart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        category: "Genel Kullanım",
        icon: <Home size={24} />,
        questions: [
            {
                q: "Evinin Değeri nedir ve nasıl çalışır?",
                a: (
                    <div className="space-y-3">
                        <p><strong>Evinin Değeri</strong>, Türkiye&apos;nin önde gelen yapay zeka destekli, yeni nesil gayrimenkul değerleme ve pazar analizi platformudur. Geleneksel ve yavaş ekspertiz süreçlerini saniyelere indirmeyi hedefler.</p>
                        <ul className="list-none space-y-2 mt-2">
                            <li className="flex items-start gap-2"><CheckCircle size={18} className="text-appleBlue mt-0.5 shrink-0" /> Akıllı algoritmalar ile piyasadaki milyonlarca aktif ve pasif ilanı tarar.</li>
                            <li className="flex items-start gap-2"><CheckCircle size={18} className="text-appleBlue mt-0.5 shrink-0" /> Evinizin özelliklerini çapraz sorgularla bölgesel endekslerle karşılaştırır.</li>
                            <li className="flex items-start gap-2"><CheckCircle size={18} className="text-appleBlue mt-0.5 shrink-0" /> Saniyeler içerisinde şeffaf, tarafsız ve bilimsel verilere dayanan tahmini rayiç bedeli sunar.</li>
                        </ul>
                    </div>
                )
            },
            {
                q: "Çıkan değerleme sonuçları ne kadar güvenilir?",
                a: (
                    <div className="space-y-3">
                        <p>Sistemimiz gücünü tesadüfi verilerden değil, kanıtlanmış ekonomik göstergelerden ve gelişmiş makine öğrenimi modellerinden alır. Fiyatlama motorumuzun temel bileşenleri şunlardır:</p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                            <li className="bg-gray-50 border border-gray-100 p-3 rounded-xl flex items-center gap-3">
                                <div className="bg-white p-2 rounded-lg shadow-sm text-amber-500"><BarChart size={18} /></div>
                                <span className="text-sm font-medium text-gray-700">TCMB Bölgesel Endeksleri</span>
                            </li>
                            <li className="bg-gray-50 border border-gray-100 p-3 rounded-xl flex items-center gap-3">
                                <div className="bg-white p-2 rounded-lg shadow-sm text-blue-500"><MapPin size={18} /></div>
                                <span className="text-sm font-medium text-gray-700">Lokal Şerefiye Analizi</span>
                            </li>
                        </ul>
                        <p className="text-xs text-gray-500 mt-2 italic">* Uyarı: Üretilen rakamlar bilgilendirme amaçlı tahmini bir piyasa değeridir, SPK onaylı resmi eksper raporu yerine geçmez.</p>
                    </div>
                )
            },
            {
                q: "Hangi şehirlerde ve bölgelerde hizmet veriyorsunuz?",
                a: (
                    <div className="space-y-2">
                        <p>Platformumuzun algoritması, büyük verinin ve ticaret hacminin en yüksek olduğu metropollerde profesyonel doğruluk oranlarına ulaşmıştır. Mevcut durumda başta <strong>İstanbul, Ankara ve İzmir</strong> olmak üzere Türkiye&apos;nin önde gelen büyükşehirlerindeki tüm ilçeleri desteklemektedir.</p>
                        <p>Hizmet ağımız ve veritabanımız, veri bilimcilerimiz tarafından düzenli olarak genişletilmektedir.</p>
                    </div>
                )
            },
        ]
    },
    {
        category: "Algoritma ve Yapay Zeka",
        icon: <TrendingUp size={24} />,
        questions: [
            {
                q: "Ev fiyatları hesaplanırken hangi kriterler dikkate alınıyor?",
                a: (
                    <div className="space-y-3">
                        <p>Değerleme algoritmamız sıradan bir metrekare ortalama hesaplayıcısı değildir. Özel olarak eğitilmiş yapay zekamız <strong>20&apos;den fazla değişkeni</strong> aynı anda işler:</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {["Bina Yaşı", "Brüt/Net Alan", "Kat Tipi ve Konum", "Isıtma Türü", "Balkon & Otopark", "Asansör Varlığı"].map(k => (
                                <span key={k} className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-blue-700 rounded-full text-xs font-semibold">{k}</span>
                            ))}
                        </div>
                        <p className="text-sm">Bu özelliklerin her biri, bulunduğu bölgenin emlak aritmetiğine göre farklı ağırlıklarda (katsayılarla) hesaplamaya dahil edilir.</p>
                    </div>
                )
            },
            {
                q: "Bölgesel şerefiye puanları ve demografik yapı analizi nasıl yapılıyor?",
                a: (
                    <p>Fiziksel özelliklerin yanı sıra, bir gayrimenkulün değerini belirleyen en önemli unsur lokasyonudur. Sistemimiz arka planda global ölçekte başarısı kanıtlanmış <strong>LLM (Büyük Dil Modelleri)</strong> ile entegre çalışır. Söz konusu mahallenin sosyo-ekonomik durumu, metro veya ulaşım ağlarına yakınlığı, ticari potansiyeli ve sosyal çevre endeksi de fiyata yansıtılarak size o bölgenin karakterist yapısı hakkında zengin metin özetleri sunulur.</p>
                )
            },
        ]
    },
    {
        category: "B2B Kurumsal İş Ortaklığı",
        icon: <Users size={24} />,
        questions: [
            {
                q: "PRO ve PRO PLUS abonelikleri kimler için uygundur?",
                a: (
                    <div className="space-y-3">
                        <p>Kurumsal paketlerimiz profesyonel <strong>Emlak Ofisleri, Brokerlar, Bankalar ve Değerleme Uzmanları</strong> için özel olarak inşa edilmiş B2B çözümleridir.</p>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                            <li>Müşterilerinize evlerini alırken/satarken bilimsel ve etkileyici PDF raporlar sunmanızı sağlar.</li>
                            <li>Zaman alan &quot;fiyat araştırması&quot; süreçlerini ortadan kaldırarak operasyonel verimliliği %80 oranında artırır.</li>
                        </ul>
                    </div>
                )
            },
            {
                q: "Müşteri (Lead) yönlendirmesi gerçekten nasıl çalışıyor?",
                a: (
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-4 rounded-xl space-y-3">
                        <div className="flex items-center gap-2 font-bold text-amber-600">
                            <Zap size={20} className="fill-current" /> Exclusive Lead Market
                        </div>
                        <p className="text-sm text-gray-700">Platformumuzu ücretsiz kullanan ve evini değerlendirdikten sonra &quot;Satmak İstiyorum&quot; formunu dolduran portföy sahipleri, sistemin <strong>PRO PLUS</strong> üyelerine düşer. Bu sayede soğuk aramalarla uğraşmak yerine, doğrudan evini uzman bir ofis aracılığıyla satmaya karar vermiş &quot;Sıcak Müşteriler (Warm Leads)&quot; masanıza gelir. Aboneliğiniz süresince portföyünüze düzenli olarak yeni gayrimenkuller eklersiniz.</p>
                    </div>
                )
            },
            {
                q: "Raporları kendi marka logomuzla (White-Label) indirebilir miyiz?",
                a: (
                    <p><strong>Evet, bu PRO PLUS paketimizin en çok tercih edilen özelliğidir.</strong> Çıktı aldığınız tüm detaylı değerleme ve analiz raporlarındaki &quot;Evinin Değeri&quot; ibareleri tamamen kalkar. Sistemden PDF&apos;i kendi kurumsal logonuz, emlak ofisi unvanınız, kendi adınız ve iletişim numaranızla indirirsiniz. Böylece müşterinize tamamen kendi yazılımınızdan çıkmış prestijli bir evrak sunarsınız.</p>
                )
            }
        ]
    },
    {
        category: "Güvenlik, Ödeme ve İptal",
        icon: <Shield size={24} />,
        questions: [
            {
                q: "Ödemeler ve kredi kartı bilgilerim güvende mi?",
                a: (
                    <div className="space-y-3">
                        <p>Platformumuz Kurumsal B2B finansal standartlara uygun çalışmaktadır.</p>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm"><CheckCircle size={16} className="text-green-500" /> Bütün veri akışı endüstri standardı <strong>256-Bit SSL</strong> ile korunmaktadır.</li>
                            <li className="flex items-center gap-2 text-sm"><CheckCircle size={16} className="text-green-500" /> Tahsilatlar Türkiye&apos;nin onaylı ödeme kuruluşu <strong>PayTR güvencesi ile</strong> ve 3D Secure onaylı yapılır.</li>
                            <li className="flex items-center gap-2 text-sm"><CheckCircle size={16} className="text-green-500" /> Kredi kartı verileriniz sunucularımızda kesinlikle tutulmaz veya saklanmaz.</li>
                        </ul>
                    </div>
                )
            },
            {
                q: "Satın aldığım B2B paketimi nasıl iptal edebilirim?",
                a: (
                    <p>Hizmetlerimiz taahhütsüzdür. Sürpriz yenileme veya fesih bedeli ile karşılaşmazsınız. Aboneliğinizin devam etmesini istemediğiniz takdirde sonraki fatura döneminden önce iptal işlemini gerçekleştirebilir, o aya ait yasal haklarınızı dönem sonuna kadar kesintisiz kullanmaya devam edebilirsiniz. İade koşullarıyla ilgili detaylı bilgiye, &quot;Ön Bilgilendirme ve İptal Formu&quot; sayfamızdan ulaşabilirsiniz.</p>
                )
            },
        ]
    },
];

export default function SSSPage() {
    const [openCategories, setOpenCategories] = useState<number[]>([0]); // First category open by default
    const [openQuestions, setOpenQuestions] = useState<string[]>([]);

    const toggleCategory = (index: number) => {
        setOpenCategories(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    const toggleQuestion = (qId: string) => {
        setOpenQuestions(prev =>
            prev.includes(qId) ? prev.filter(q => q !== qId) : [...prev, qId]
        );
    };

    return (
        <div className="min-h-screen bg-[#F5F5F7] selection:bg-appleBlue selection:text-white">

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 px-4 overflow-hidden border-b border-gray-200/60 bg-white">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center justify-center p-4 bg-white border border-gray-100 shadow-xl shadow-blue-900/5 rounded-3xl mb-8"
                    >
                        <HelpCircle className="w-10 h-10 text-appleBlue" />
                    </motion.div>

                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-6xl font-extrabold text-appleDark tracking-tight mb-6"
                    >
                        Sıkça Sorulan <span className="text-transparent bg-clip-text bg-gradient-to-r from-appleBlue to-indigo-500">Sorular</span>
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
                    >
                        Evinin Değeri platformunun algoritması, B2B iş ortaklıkları ve güvenli ödeme sistemleri hakkında merak ettiğiniz tüm detayları sizin için şeffaflıkla derledik.
                    </motion.p>
                </div>
            </div>

            {/* Accordions */}
            <div className="max-w-4xl mx-auto px-4 py-20 relative">
                {/* 3D background decorations */}
                <div className="absolute left-[-10%] top-[20%] w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[80px]" />
                <div className="absolute right-[-10%] bottom-[20%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />

                <div className="space-y-8 relative z-10">
                    {faqs.map((section, si) => {
                        const isCatOpen = openCategories.includes(si);
                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: si * 0.1 }}
                                key={si}
                                className="bg-white rounded-[2rem] border border-gray-100 shadow-lg shadow-gray-200/40 p-2 overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleCategory(si)}
                                    className="w-full flex items-center justify-between p-6 px-8 hover:bg-gray-50/50 rounded-3xl transition-colors group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-appleBlue group-hover:bg-blue-100 transition-colors">
                                            {section.icon}
                                        </div>
                                        <h2 className="text-2xl font-bold text-appleDark">{section.category}</h2>
                                    </div>
                                    <ChevronDown
                                        className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${isCatOpen ? "rotate-180 text-appleBlue" : ""}`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {isCatOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="px-4 pb-4 overflow-hidden"
                                        >
                                            <div className="space-y-3 pt-2">
                                                {section.questions.map((faq, fi) => {
                                                    const qId = `${si}-${fi}`;
                                                    const isQOpen = openQuestions.includes(qId);
                                                    return (
                                                        <div
                                                            key={fi}
                                                            className={`rounded-2xl border transition-all duration-300 ${isQOpen ? 'border-blue-100 bg-[#F9FAFB] shadow-inner' : 'border-gray-50 bg-white hover:border-gray-200'}`}
                                                        >
                                                            <button
                                                                onClick={() => toggleQuestion(qId)}
                                                                className="w-full flex items-center justify-between p-5 text-left"
                                                            >
                                                                <span className={`font-semibold text-lg transition-colors ${isQOpen ? 'text-appleBlue' : 'text-gray-800'}`}>
                                                                    {faq.q}
                                                                </span>
                                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isQOpen ? 'bg-blue-100 text-appleBlue' : 'bg-gray-50 text-gray-400'}`}>
                                                                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isQOpen ? 'rotate-180' : ''}`} />
                                                                </div>
                                                            </button>
                                                            <AnimatePresence>
                                                                {isQOpen && (
                                                                    <motion.div
                                                                        initial={{ height: 0, opacity: 0 }}
                                                                        animate={{ height: "auto", opacity: 1 }}
                                                                        exit={{ height: 0, opacity: 0 }}
                                                                        className="overflow-hidden"
                                                                    >
                                                                        <div className="px-5 pb-6 text-gray-600 leading-relaxed">
                                                                            {faq.a}
                                                                        </div>
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Call To Action */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 relative rounded-[2.5rem] overflow-hidden bg-appleDark shadow-2xl"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 mix-blend-overlay"></div>
                    <div className="relative p-12 md:p-16 text-center z-10 flex flex-col items-center">
                        <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 mb-6">
                            <HelpCircle className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Müşteri Temsilcisiyle Görüşün</h3>
                        <p className="text-blue-100 text-lg mb-8 max-w-xl">
                            Eğer yukarıda aradığınız yanıtı bulamadıysanız, işbirlikleri ve sistem entegrasyonu teknik detayları için bizimle iletişime geçmekten çekinmeyin.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link href="/iletisim" className="px-8 py-4 bg-white text-appleDark font-bold rounded-xl hover:bg-gray-50 hover:scale-105 transition-all w-full sm:w-auto text-center shadow-xl shadow-white/10">
                                Bize Ulaşın
                            </Link>
                            <Link href="/" className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold rounded-xl hover:bg-white/20 transition-all w-full sm:w-auto text-center">
                                Ücretsiz Hesapla
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
