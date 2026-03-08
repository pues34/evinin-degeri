"use client";

import { useState } from "react";
import { Check, X, Zap, Crown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function FiyatlandirmaClient() {
    const { data: session } = useSession();
    const [isYearly, setIsYearly] = useState(false);

    const monthlyPrice = 399;
    const originalPrice = 999;
    const yearlyTotal = Math.round(monthlyPrice * 12 * 0.95); // %5 indirim
    const yearlyMonthly = Math.round(yearlyTotal / 12);

    const features = [
        { name: "Değerleme Sorgulama", free: "Günlük 1", premium: "Sınırsız" },
        { name: "Sonucu Ekranda Görme", free: true, premium: true },
        { name: "PDF Rapor İndirme", free: false, premium: true },
        { name: "İlan Yayınlama", free: "Aylık 1", premium: "Sınırsız" },
        { name: "Kira Getirisi Hesaplama", free: true, premium: true },
        { name: "Amortisman Hesaplama", free: true, premium: true },
        { name: "Isı Haritası", free: true, premium: true },
        { name: "Fırsat Radarı", free: false, premium: true },
        { name: "Yatırım Fırsatları", free: false, premium: true },
    ];

    return (
        <div className="min-h-screen bg-appleGray py-24 px-4">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-sm font-bold text-appleBlue mb-6">
                        <Crown size={16} /> Fiyatlandırma
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-appleDark mb-4">Basit ve Şeffaf Fiyatlandırma</h1>
                    <p className="text-lg text-gray-500 max-w-xl mx-auto">İhtiyacınıza göre ücretsiz başlayın ya da Premium ile tüm özelliklerin kilidini açın.</p>
                </div>

                {/* Billing Toggle */}
                <div className="flex items-center justify-center gap-4 mb-12">
                    <span className={`text-sm font-medium ${!isYearly ? 'text-appleDark' : 'text-gray-400'}`}>Aylık</span>
                    <button
                        onClick={() => setIsYearly(!isYearly)}
                        className={`relative w-14 h-7 rounded-full transition-colors ${isYearly ? 'bg-appleBlue' : 'bg-gray-300'}`}
                    >
                        <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${isYearly ? 'translate-x-7' : ''}`} />
                    </button>
                    <span className={`text-sm font-medium ${isYearly ? 'text-appleDark' : 'text-gray-400'}`}>
                        Yıllık <span className="text-green-500 font-bold">%5 indirim</span>
                    </span>
                </div>

                {/* Plans */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* Free Plan */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                        <h3 className="text-xl font-bold text-appleDark mb-2">Ücretsiz</h3>
                        <div className="text-5xl font-extrabold text-appleDark mb-1">0₺</div>
                        <p className="text-gray-400 text-sm mb-8">Sonsuza kadar ücretsiz</p>
                        <ul className="space-y-3 mb-8">
                            {["Günlük 1 sorgulama", "Sonucu ekranda görme", "Aylık 1 ilan", "Kira & amortisman hesaplama", "Isı haritası"].map((f, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-600 text-sm">
                                    <Check size={16} className="text-green-500 shrink-0" /> {f}
                                </li>
                            ))}
                        </ul>
                        <Link href="/kayit" className="block w-full text-center py-3 bg-gray-100 text-appleDark rounded-xl font-medium text-sm hover:bg-gray-200 transition-colors">
                            Ücretsiz Başla
                        </Link>
                    </div>

                    {/* Premium Plan */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border-2 border-appleBlue shadow-lg p-8 relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-appleBlue text-white text-xs font-bold rounded-full shadow-md flex items-center gap-1">
                            <Zap size={12} /> Önerilen
                        </div>
                        <h3 className="text-xl font-bold text-appleDark mb-2">Premium</h3>
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-lg text-gray-400 line-through">{originalPrice}₺</span>
                            <span className="text-5xl font-extrabold text-appleBlue">
                                {isYearly ? yearlyMonthly : monthlyPrice}₺
                            </span>
                            <span className="text-gray-400 text-sm">/ay</span>
                        </div>
                        {isYearly ? (
                            <p className="text-green-600 text-sm font-medium mb-8">
                                Yıllık toplam: {yearlyTotal.toLocaleString('tr-TR')}₺ (%5 indirim)
                            </p>
                        ) : (
                            <p className="text-blue-500 text-sm font-medium mb-8">Lansman fiyatıyla</p>
                        )}
                        <ul className="space-y-3 mb-8">
                            {["Sınırsız sorgulama", "PDF rapor indirme", "Sınırsız ilan", "Kira & amortisman hesaplama", "Isı haritası", "Fırsat Radarı", "Yatırım Fırsatları"].map((f, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-700 text-sm font-medium">
                                    <Check size={16} className="text-appleBlue shrink-0" /> {f}
                                </li>
                            ))}
                        </ul>
                        <Link href={session ? "/profil" : "/kayit"} className="block w-full text-center py-3 bg-appleBlue text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-colors shadow-md flex items-center justify-center gap-2">
                            Premium&apos;a Geç <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>

                {/* Feature Comparison Table */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-appleDark">Plan Karşılaştırması</h3>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {features.map((f, i) => (
                            <div key={i} className="grid grid-cols-3 items-center px-8 py-4 hover:bg-gray-50/50 transition-colors">
                                <span className="text-sm text-gray-700 font-medium">{f.name}</span>
                                <div className="text-center">
                                    {typeof f.free === "boolean" ? (
                                        f.free ? <Check size={18} className="text-green-500 mx-auto" /> : <X size={18} className="text-gray-300 mx-auto" />
                                    ) : (
                                        <span className="text-sm text-gray-500">{f.free}</span>
                                    )}
                                </div>
                                <div className="text-center">
                                    {typeof f.premium === "boolean" ? (
                                        f.premium ? <Check size={18} className="text-appleBlue mx-auto" /> : <X size={18} className="text-gray-300 mx-auto" />
                                    ) : (
                                        <span className="text-sm font-medium text-appleBlue">{f.premium}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
