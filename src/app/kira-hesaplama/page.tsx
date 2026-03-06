"use client";

import { useState } from "react";
import { Calculator, TrendingUp, Info } from "lucide-react";
import Link from "next/link";

export default function KiraHesaplama() {
    const [propertyValue, setPropertyValue] = useState<string>("5000000");
    const [monthlyRent, setMonthlyRent] = useState<string>("25000");

    const [calculatedValue, setCalculatedValue] = useState<number>(5000000);
    const [calculatedRent, setCalculatedRent] = useState<number>(25000);

    const handleCalculate = () => {
        setCalculatedValue(Number(propertyValue) || 0);
        setCalculatedRent(Number(monthlyRent) || 0);
    };

    const yearlyRent = calculatedRent * 12;
    const yieldPercent = calculatedValue > 0 ? ((yearlyRent / calculatedValue) * 100).toFixed(2) : "0.00";
    const amortMonths = calculatedRent > 0 ? (calculatedValue / calculatedRent).toFixed(0) : "0";
    const amortYears = calculatedRent > 0 ? (calculatedValue / calculatedRent / 12).toFixed(1) : "0.0";

    return (
        <div className="min-h-screen flex flex-col pt-24 bg-gray-50">

            <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-appleDark mb-4">Kira Getirisi Hesaplama Aracı</h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Evinizin veya satın almayı planladığınız gayrimenkulün piyasa değerini ve aylık kira bedelini girerek yatırımınızın yıllık getiri oranını (ROI) ve amortisman süresini kolayca hesaplayın.
                    </p>
                </div>

                <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl mb-12 border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-appleBlue/5 rounded-full blur-[80px]" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                        {/* Inputs */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Evin Tahmini Değeri (TL)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={propertyValue}
                                        onChange={(e) => setPropertyValue(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-appleDark font-medium focus:ring-2 focus:ring-appleBlue focus:border-appleBlue transition outline-none"
                                        placeholder="Örn: 5000000"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">₺</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">
                                    Evinizin değerini tam bilmiyorsanız, <Link href="/" className="text-appleBlue hover:underline">yapay zeka ile ücretsiz öğrenebilirsiniz.</Link>
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Aylık Kira Bedeli (TL)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={monthlyRent}
                                        onChange={(e) => setMonthlyRent(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-appleDark font-medium focus:ring-2 focus:ring-appleBlue focus:border-appleBlue transition outline-none"
                                        placeholder="Örn: 25000"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">₺</span>
                                </div>
                            </div>

                            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start">
                                <Info className="text-appleBlue mr-3 shrink-0 mt-0.5" size={18} />
                                <p className="text-sm text-blue-800">Türkiye ortalamasında konut kira getirisi genelde %4 ila %6 arasındadır. Ticari gayrimenkullerde bu oran %8&apos;e çıkabilir.</p>
                            </div>

                            <button
                                onClick={handleCalculate}
                                className="w-full bg-appleDark text-white font-bold py-4 rounded-2xl hover:bg-appleBlue transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                            >
                                <Calculator size={20} /> Hemen Hesapla
                            </button>
                        </div>

                        {/* Results */}
                        <div className="bg-gray-50 rounded-[24px] p-8 border border-gray-100 flex flex-col justify-center">
                            <h3 className="font-bold text-appleDark text-xl mb-6 flex items-center">
                                <Calculator className="mr-2 text-indigo-500" /> Hesaplama Sonucu
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <p className="text-sm text-gray-500 font-medium mb-1">Yıllık Kira Getirisi</p>
                                    <p className="text-2xl font-bold text-appleDark">
                                        {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(yearlyRent)}
                                    </p>
                                </div>

                                <div className="w-full h-px bg-gray-200"></div>

                                <div>
                                    <p className="text-sm text-gray-500 font-medium mb-1">Yıllık Brüt Getiri Oranı (ROI)</p>
                                    <div className="flex items-center">
                                        <p className="text-3xl font-extrabold text-green-600">% {yieldPercent}</p>
                                        <TrendingUp className="ml-3 text-green-500" size={24} />
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">Bu oran, yatırımınızın her yıl değerinin yüzde kaçını size kira olarak geri ödediğini gösterir.</p>
                                </div>

                                <div className="w-full h-px bg-gray-200"></div>

                                <div>
                                    <p className="text-sm text-gray-500 font-medium mb-1">Amortisman (Geri Dönüş) Süresi</p>
                                    <p className="text-2xl font-bold text-blue-600">{amortYears} Yıl <span className="text-lg font-medium text-gray-500">({amortMonths} Ay)</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SEO Text Section */}
                <div className="prose prose-lg max-w-none text-gray-600 bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-appleDark mb-4">Kira Getirisi Nasıl Hesaplanır?</h2>
                    <p>
                        Kira getirisi (Rental Yield), bir gayrimenkulün belirlediğiniz bir dönem (genellikle 1 yıl) içerisinde sağladığı kira gelirinin, o gayrimenkulün piyasa değerine bölünmesiyle elde edilen yüzdelik orandır. Formülü oldukça basittir:
                    </p>
                    <div className="bg-gray-50 p-4 rounded-xl text-center font-mono my-4 border border-gray-200">
                        Yıllık Brüt Getiri Oranı = (Aylık Kira x 12) / Evin Piyasa Değeri
                    </div>
                    <p>
                        Türkiye&apos;de özellikle büyükşehirlerde konutların makul getiri oranı %4.5 ile %6.5 arasına konumlanmaktadır. Eğer satın alacağınız mülkün bedeli çok yüksek ancak o çevrede talep edilen kira miktarı düşük kalıyorsa oranınız düşecek ve parasının çıkması (amorti edilmesi) çok daha uzun yıllar sürecektir.
                    </p>

                    <h3 className="text-xl font-bold text-appleDark mt-8 mb-3">Kira Çarpanı ve Ev Fiyatı Nasıl Belirlenir?</h3>
                    <p>
                        Emlak yatırımı yapmadan önce bölgedeki diğer emsalleri iyi analiz etmek çok önemlidir. Çoğu yatırımcı <strong>Evinin Değeri</strong> platformunu kullanarak mülkün gerçek piyasa ve yapay zeka analizli değerini bulduktan sonra, kira getirilerini bağımsızca bu sayfa üzerinden hesaplayarak kendi yatırım skorlarını teyit ederler.
                    </p>
                </div>
            </main>
        </div>
    );
}
