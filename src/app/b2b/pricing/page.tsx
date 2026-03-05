"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function PricingPage() {
    const { data: session, status, update } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [pricing, setPricing] = useState({ b2bMonthlyPrice: 500, b2bDiscountPercentage: 0 });
    const [paytrToken, setPaytrToken] = useState<string | null>(null);

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

    const handleSubscribe = async () => {
        if (status === "unauthenticated") {
            router.push("/b2b/login");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/b2b/checkout", { method: "POST" });
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

    if (paytrToken) {
        return (
            <div className="min-h-screen bg-appleGray pt-24 pb-12 px-4 flex justify-center items-center">
                <div className="bg-white p-4 rounded-xl shadow-2xl w-full max-w-2xl min-h-[600px]">
                    <h2 className="text-xl font-bold text-center text-appleDark mb-4">Güvenli Ödeme Ekranı</h2>
                    <p className="text-center text-sm text-gray-500 mb-4">Kredi kartı bilgileriniz PayTR güvencesiyle işlenmektedir.</p>
                    <iframe
                        src={`https://www.paytr.com/odeme/guvenli/${paytrToken}`}
                        id="paytriframe"
                        frameBorder="0"
                        scrolling="yes"
                        style={{ width: "100%", height: "600px" }}
                    />
                    <button onClick={() => setPaytrToken(null)} className="mt-4 w-full py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                        İptal ve Geri Dön
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-appleGray pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-appleDark tracking-tight mb-4">Gerçek Potansiyeli Açığa Çıkarın</h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">Emlak ofisiniz için tasarlanmış kurumsal paketle, hiçbir kota ve limite takılmadan müşterilerinize değerleme raporları oluşturun.</p>
                </div>

                <div className="bg-white rounded-[2rem] border-2 border-amber-400 p-8 md:p-12 shadow-2xl relative overflow-hidden transform hover:-translate-y-1 transition-transform">
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-amber-500 opacity-10 blur-3xl"></div>

                    <div className="absolute top-0 right-0 py-2 px-6 bg-amber-500 text-white font-bold text-sm tracking-widest uppercase rounded-bl-[2rem]">
                        En Çok Tercih Edilen
                    </div>

                    <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                        <div className="flex-1 space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-appleDark mb-2 flex items-center gap-3">
                                    <Zap className="text-amber-500" size={32} />
                                    PRO Paket
                                </h2>
                                <p className="text-gray-500">Maksimum performans bekleyen emlakçılar için.</p>
                            </div>

                            <ul className="space-y-4">
                                {[
                                    "✨ 1 Saatlik 5 Sorgu Limiti Tamamen Kaldırılır",
                                    "🚀 Sınırsız Yapay Zeka Ev Değerlemesi",
                                    "📊 Bölgesel M² Verilerine Sınırsız Erişim",
                                    "📞 7/24 Öncelikli Kurumsal Destek",
                                    "🔜 Raporlara Kendi Şirket Logosunu Ekleme (V11)"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-appleDark font-medium">
                                        <CheckCircle2 className="text-green-500 w-6 h-6 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="w-full md:w-1/3 bg-gray-50 rounded-3xl p-8 text-center border border-gray-100 flex flex-col justify-center">
                            <h3 className="text-gray-500 font-medium mb-2 uppercase tracking-widest text-sm">Aylık Ödeme</h3>
                            <div className="flex justify-center items-start gap-1 mb-6">
                                {pricing.b2bDiscountPercentage > 0 ? (
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xl text-gray-400 line-through">₺{pricing.b2bMonthlyPrice}</span>
                                            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">%{pricing.b2bDiscountPercentage} İndirim</span>
                                        </div>
                                        <div className="flex items-start">
                                            <span className="text-4xl font-extrabold text-appleDark">₺{Math.round(pricing.b2bMonthlyPrice * (1 - pricing.b2bDiscountPercentage / 100))}</span>
                                            <span className="text-gray-500 font-medium mt-1">/ay</span>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <span className="text-4xl font-extrabold text-appleDark">₺{pricing.b2bMonthlyPrice}</span>
                                        <span className="text-gray-500 font-medium mt-1">/ay</span>
                                    </>
                                )}
                            </div>

                            <button
                                onClick={handleSubscribe}
                                disabled={loading}
                                className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                            >
                                <ShieldCheck size={20} />
                                {loading ? "Ödeme Bekleniyor..." : "Şimdi Satın Al (PayTR)"}
                            </button>
                            <p className="text-xs text-gray-400 mt-4 text-center">
                                * İstenildiği zaman iptal edilebilir. Kredi kartı tahsilatları test modundadır.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


