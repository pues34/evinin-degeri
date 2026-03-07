"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CheckCircle2, ShieldCheck, Zap, Crown, UserPlus, FileText, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Script from "next/script";

export const dynamic = 'force-dynamic';

export default function PricingPage() {
    const { data: session, status } = useSession() as any;
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [pricing, setPricing] = useState({ b2bMonthlyPrice: 500, b2bDiscountPercentage: 0 });
    const [paytrToken, setPaytrToken] = useState<string | null>(null);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [selectedTier, setSelectedTier] = useState<"PRO" | "PRO_PLUS" | "UPGRADE" | null>(null);

    // V19 Logic: Check current subscription tier
    const isPro = session?.user?.isPro || session?.user?.subscriptionTier === "PRO";
    const isProPlus = session?.user?.subscriptionTier === "PRO_PLUS";

    useEffect(() => {
        fetch("/api/admin/settings")
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    setPricing({
                        b2bMonthlyPrice: Number(data.data.b2bMonthlyPrice) || 500,
                        b2bDiscountPercentage: Number(data.data.b2bDiscountPercentage) || 0
                    });
                }
            })
            .catch(err => console.error(err));
    }, []);

    const handleSubscribe = async (tier: "PRO" | "PRO_PLUS" | "UPGRADE") => {
        if (status === "unauthenticated") {
            router.push("/b2b/login");
            return;
        }

        if (!acceptedTerms) {
            alert("Lütfen işleme devam etmeden önce Mesafeli Satış Sözleşmesi ve Ön Bilgilendirme Koşullarını onaylayınız.");
            return;
        }

        setLoading(true);
        setSelectedTier(tier);
        try {
            // Pass the selected tier to the checkout endpoint for dynamic pricing calculations
            const res = await fetch("/api/b2b/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tier })
            });
            const data = await res.json();

            if (data.success && data.token) {
                setPaytrToken(data.token);
            } else {
                alert("Ödeme başlatılamadı: " + (data.error || "Bilinmeyen hata"));
            }
        } catch (e) {
            alert("Ödeme bağlantısında bir teknik sorun oluştu.");
        } finally {
            setLoading(false);
        }
    };

    // Dynamic Pricing Calculation
    const activePrice = Math.round(pricing.b2bMonthlyPrice * (1 - pricing.b2bDiscountPercentage / 100));
    const proPlusPrice = 750; // Hardcoded or fetchable
    const upgradePrice = 250;

    if (paytrToken) {
        let productName = "";
        let productPrice = 0;

        if (selectedTier === "PRO") {
            productName = "PRO B2B Paketi (Aylık)";
            productPrice = activePrice;
        } else if (selectedTier === "PRO_PLUS") {
            productName = "PRO PLUS (Lead Market) Paketi (Aylık)";
            productPrice = proPlusPrice;
        } else if (selectedTier === "UPGRADE") {
            productName = "PRO PLUS Paket Yükseltme";
            productPrice = upgradePrice;
        }

        return (
            <div className="min-h-screen bg-appleGray flex-col justify-center items-center py-20 px-4">
                <div className="max-w-4xl mx-auto bg-white p-4 md:p-8 rounded-xl shadow-2xl flex flex-col items-center min-h-[600px]">
                    <ShieldCheck className="text-green-500 w-12 h-12 mb-4" />
                    <h2 className="text-xl font-bold text-appleDark mb-6">256-Bit SSL Korumalı Güvenli Ödeme Arayüzü</h2>

                    {/* V15: Sipariş Özeti (PayTR İstenen Özellik) */}
                    <div className="w-full bg-blue-50/50 border border-blue-100 rounded-xl p-6 mb-8 text-left">
                        <h3 className="text-lg font-bold text-appleDark border-b border-blue-200 pb-3 mb-4">Ödeme Öncesi Sipariş Özeti</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">Seçilen Hizmet:</span>
                                <span className="font-bold text-appleDark">{productName}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">Hizmet Türü:</span>
                                <span>Dijital Abonelik (Bulut Tabanlı Yazılım)</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">Teslimat Süresi:</span>
                                <span className="text-green-600 font-bold bg-green-100 px-2 py-1 rounded">Anında Dijital Teslimat</span>
                            </div>
                            <div className="flex justify-between items-center border-t border-blue-100 pt-3 mt-3">
                                <span className="text-gray-800 font-bold text-base">Ödenecek Toplam Tutar:</span>
                                <span className="font-extrabold text-blue-700 text-lg">₺{productPrice} /ay</span>
                            </div>
                        </div>
                        <p className="mt-4 text-[11px] text-gray-500 bg-white p-3 rounded-lg border border-gray-100">
                            <strong>Önemli Bilgilendirme:</strong> Bu ürün tamamen dijital bir hizmet olup, ödeme onayı alındığı anda kullanımınıza açılacaktır (Anında İfa). Mesafeli Sözleşmeler Yönetmeliği gereği elektronik ortamda anında ifa edilen hizmetlerde <strong className="text-appleDark">iptal ve iade hakkı (cayma hakkı) bulunmamaktadır.</strong>
                        </p>
                    </div>

                    <div className="w-full relative min-h-[500px] border border-gray-100 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                        {/* We use standard HTML script integration for PayTR IFrame Resizer */}
                        <iframe
                            src={`https://www.paytr.com/odeme/guvenli/${paytrToken}`}
                            id="paytriframe"
                            frameBorder="0"
                            scrolling="no"
                            style={{ width: '100%', minHeight: '600px' }}
                        ></iframe>
                        <script dangerouslySetInnerHTML={{ __html: `iFrameResize({},'#paytriframe');` }}></script>
                    </div>

                    <button onClick={() => setPaytrToken(null)} className="mt-6 text-sm text-red-500 hover:text-red-700 font-medium">
                        İptal ve Geri Dön
                    </button>

                    <Script src="https://www.paytr.com/js/iframeResizer.min.js" strategy="lazyOnload"></Script>
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-[#F5F5F7] pt-28 pb-24 px-4 overflow-hidden relative">
            {/* Ambient Background Glares */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-semibold text-sm mb-6 border border-blue-100 shadow-sm">
                        <Crown size={16} /> Kurumsal Panel V19 Yayında
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-[#1D1D1F] tracking-tight mb-6 leading-tight">
                        Portföyünüzü Katlayın.<br className="hidden md:block" /> Satışlarınızı Otomatize Edin.
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Sıradan bir değerleme aracından, bölgenizdeki satıcı müşterileri avladığınız tam teşekküllü bir Lead Market (Müşteri Pazarı) ağına geçiş yapın.
                    </p>
                </motion.div>

                <div className="mb-4 bg-red-50/80 backdrop-blur-md p-4 rounded-2xl border border-red-100 max-w-3xl mx-auto shadow-sm">
                    <p className="text-sm text-red-600 font-medium text-center">
                        <strong>Yasal Uyarı / SPK Bilgilendirmesi:</strong> Sunulan tüm hizmetler ve üretilen raporlar algoritmik yapay zeka analizine dayalı tahminlerden ibaret olup, asla &quot;Yatırım Tavsiyesi&quot; veya lisanslı bir &quot;Gayrimenkul Ekspertiz Raporu&quot; niteliği taşımaz.
                    </p>
                </div>

                <div className="mb-8 bg-white/60 backdrop-blur-md p-5 flex items-start sm:items-center gap-3 rounded-2xl border border-gray-200 max-w-3xl mx-auto shadow-sm">
                    <input
                        type="checkbox"
                        id="terms"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="w-5 h-5 mt-0.5 sm:mt-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600 font-medium cursor-pointer leading-relaxed">
                        Satın alma işlemine devam ederek <Link href="/mesafeli-satis-sozlesmesi" target="_blank" className="text-blue-600 hover:text-blue-800 underline">Mesafeli Satış Sözleşmesi</Link>&apos;ni, <Link href="/kullanim-kosullari" target="_blank" className="text-blue-600 hover:text-blue-800 underline">Kullanım Koşulları</Link>&apos;nı ve <Link href="/iptal-iade" target="_blank" className="text-blue-600 hover:text-blue-800 underline">İptal/İade Politikası</Link>&apos;nı okuduğumu ve kabul ettiğimi beyan ederim.
                    </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative items-end">

                    {/* PRO TIER */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-[2rem] border border-gray-200 p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full"
                    >
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-appleDark mb-2 flex items-center gap-2">
                                <Zap className="text-blue-500" size={28} /> PRO B2B
                            </h2>
                            <p className="text-gray-500 text-sm">Ofis içi operasyonları hızlandırmak ve limitsiz sorgu yapmak isteyen emlakçılar için.</p>
                        </div>

                        <div className="mb-8 flex items-end gap-2">
                            <span className="text-5xl font-extrabold text-appleDark">₺{activePrice}</span>
                            <span className="text-gray-500 font-medium mb-1">/ay</span>
                        </div>

                        <div className="flex-grow">
                            <ul className="space-y-4 mb-8">
                                {[
                                    "✨ 1 Saatlik 3 Sorgu Anti-Spam Limiti Kaldırılır",
                                    "🚀 Sınırsız Yapay Zeka Ev Değerlemesi",
                                    "📊 Bölgesel M² Verilerine Sınırsız Erişim",
                                    "🗂️ Panelde Sınırsız Rapor Geçmişi (CSV Desteği)",
                                    "📩 Standart Şablonlu Profesyonel PDF İndirme"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-700 font-medium text-sm">
                                        <CheckCircle2 className="text-blue-500 w-5 h-5 shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {status !== "authenticated" ? (
                            <Link href="/b2b/login" className="w-full text-center py-4 bg-gray-900 text-white font-bold rounded-xl shadow-md hover:bg-black transition-all">
                                Hemen Katılın
                            </Link>
                        ) : isProPlus || isPro ? (
                            <button disabled className="w-full py-4 bg-gray-100 text-gray-500 font-bold rounded-xl flex justify-center items-center">
                                <CheckCircle2 size={20} className="mr-2" /> Sahip Olduğunuz Paket
                            </button>
                        ) : (
                            <button
                                onClick={() => handleSubscribe("PRO")}
                                disabled={loading}
                                className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl shadow-md hover:bg-black transition-all flex justify-center items-center"
                            >
                                {loading ? "Yükleniyor..." : "PRO ile Başla"}
                            </button>
                        )}
                    </motion.div>

                    {/* PRO PLUS TIER (Lead Market) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-appleDark rounded-[2.5rem] p-1 shadow-2xl relative transform md:-translate-y-4"
                    >
                        {/* Shimmer Border Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-amber-600 to-purple-600 rounded-[2.5rem] opacity-50 blur-sm"></div>

                        <div className="bg-[#111111] rounded-[2.4rem] p-8 md:p-10 relative z-10 flex flex-col h-full border border-gray-800">
                            <div className="absolute top-0 right-8 -translate-y-1/2">
                                <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg">
                                    Satış Canavarı
                                </span>
                            </div>

                            <div className="mb-8">
                                <h2 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-2">
                                    <Crown className="text-amber-400 fill-amber-400" size={32} /> PRO PLUS
                                </h2>
                                <p className="text-gray-400 text-sm">Brokerlar ve Ciro Rekoru Kırmak İsteyen Profesyoneller.</p>
                            </div>

                            <div className="mb-8 flex flex-col gap-1">
                                <div className="flex items-end gap-2">
                                    <span className="text-6xl font-extrabold text-white">₺{proPlusPrice}</span>
                                    <span className="text-gray-400 font-medium mb-2">/ay</span>
                                </div>
                                {isPro && !isProPlus && (
                                    <span className="text-amber-400 text-sm font-semibold flex items-center">
                                        (PRO Paketten sadece +250 TL Fark ile)
                                    </span>
                                )}
                            </div>

                            <div className="flex-grow">
                                <ul className="space-y-5 mb-8">
                                    <li className="flex items-start gap-4 text-white font-medium">
                                        <div className="p-1 bg-amber-500/20 rounded-md shrink-0 mt-0.5"><CheckCircle2 className="text-amber-400 w-5 h-5" /></div>
                                        <span>PRO Paketteki tüm özellikler. Limitsiz Sorgu.</span>
                                    </li>
                                    <li className="flex items-start gap-4 text-white font-medium">
                                        <div className="p-1 bg-amber-500/20 rounded-md shrink-0 mt-0.5"><FileText className="text-amber-400 w-5 h-5" /></div>
                                        <span><strong className="text-amber-400">White-Label PDF:</strong> Tüm raporlara Emlak Ofisinizin logosunu (Markanızı) basın. &quot;Evinin Değeri&quot; ibareleri gizlensin.</span>
                                    </li>
                                    <li className="flex items-start gap-4 text-white font-bold border-l-2 border-amber-500 pl-4 py-1">
                                        <div className="p-1 bg-amber-500 rounded-md shrink-0"><UserPlus className="text-[#111] w-5 h-5" /></div>
                                        <span>Premium Lead Yönlendirme: Sitede ev değerlemesi yapıp &quot;Satmak İstiyorum&quot; diyen onaylı ev sahiplerine doğrudan teklif getiren ilk profesyonel ofis olun. (Exclusive Lead Yönlendirme Ağı)</span>
                                    </li>
                                </ul>
                            </div>

                            {status !== "authenticated" ? (
                                <Link href="/b2b/login" className="w-full text-center py-4 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white font-bold rounded-xl shadow-xl transition-all">
                                    Giriş Yap ve Satın Al
                                </Link>
                            ) : isProPlus ? (
                                <button disabled className="w-full py-4 bg-gray-800 border border-gray-700 text-amber-500 font-bold rounded-xl flex justify-center items-center">
                                    <Crown size={20} className="mr-2 fill-amber-500" /> Sınırların Ötesindesiniz
                                </button>
                            ) : isPro ? (
                                <button
                                    onClick={() => handleSubscribe("UPGRADE")}
                                    disabled={loading}
                                    className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white font-bold rounded-xl shadow-xl transition-all transform hover:-translate-y-1"
                                >
                                    {loading ? "Yükleniyor..." : "Sadece 250 TL Farkla Yükselt (PRO PLUS)"}
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleSubscribe("PRO_PLUS")}
                                    disabled={loading}
                                    className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white font-bold rounded-xl shadow-xl transition-all transform hover:-translate-y-1"
                                >
                                    {loading ? "Yükleniyor..." : "PRO PLUS ile Satışları Patlat"}
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>

                <div className="mt-16 text-center text-sm text-gray-500">
                    <p className="flex justify-center items-center gap-2">
                        <ShieldCheck size={18} /> Tüm ödemeler PayTR 256-Bit SSL güvencesi altındadır. Otomatik yenilenmez, taahhüt yok.
                    </p>
                </div>
            </div>
        </div>
    );
}
