"use client";

import { useState } from "react";
import { Calculator, TrendingUp, Info } from "lucide-react";
import Link from "next/link";

export default function KiraHesaplamaClient() {
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
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">TL</div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Aylık Beklenen Kira (TL)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={monthlyRent}
                                        onChange={(e) => setMonthlyRent(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-appleDark font-medium focus:ring-2 focus:ring-appleBlue focus:border-appleBlue transition outline-none"
                                        placeholder="Örn: 25000"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">TL</div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1"><Info size={12} /> Kira bedelini aidatsız ve net olarak giriniz.</p>
                            </div>

                            <button
                                onClick={handleCalculate}
                                className="w-full bg-appleDark text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-black hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                            >
                                <Calculator size={20} /> Oranları Hesapla
                            </button>
                        </div>

                        {/* Results */}
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 flex flex-col justify-center">
                            <h3 className="text-gray-500 font-semibold mb-6 uppercase tracking-wider text-sm">Yatırım Özeti</h3>

                            <div className="space-y-8">
                                <div>
                                    <p className="text-gray-500 text-sm mb-1">Brüt Yıllık Getiri Oranı (ROI)</p>
                                    <div className="flex items-end gap-2">
                                        <span className="text-5xl font-extrabold text-appleBlue">%{yieldPercent}</span>
                                        <span className="text-green-500 flex items-center text-sm font-bold mb-1"><TrendingUp size={16} className="mr-1" /> İdeal</span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">Bu oran evin aylık kirasının 1 yıllık toplamının satış değerine oranıdır.</p>
                                </div>

                                <div className="h-px bg-gray-200 w-full"></div>

                                <div>
                                    <p className="text-gray-500 text-sm mb-1">Amortisman (Geri Dönüş) Süresi</p>
                                    <span className="text-3xl font-bold text-appleDark">{amortYears} Yıl <span className="text-lg text-gray-400 font-medium">({amortMonths} Ay)</span></span>
                                    <p className="text-xs text-gray-400 mt-2">Türkiye geneli ortalama amortisman süresi 18 ile 20 yıl arasında değişmektedir.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upsell to actual valuation */}
                <div className="bg-gradient-to-r from-appleBlue to-purple-600 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between text-white shadow-xl">
                    <div className="mb-6 md:mb-0 md:mr-8">
                        <h4 className="text-2xl font-bold mb-2">Evinizin Gerçek Değerini Biliyor Musunuz?</h4>
                        <p className="text-blue-100">Manuel değer girmek yerine, yapay zeka algoritmamızla evinizin güncel piyasa değerini saniyeler içinde ücretsiz öğrenin.</p>
                    </div>
                    <Link href="/" className="shrink-0 bg-white text-appleBlue px-8 py-4 rounded-xl font-bold border border-white hover:bg-transparent hover:text-white transition-all shadow-lg">
                        Değerleme Yap
                    </Link>
                </div>
            </main>
        </div>
    );
}
