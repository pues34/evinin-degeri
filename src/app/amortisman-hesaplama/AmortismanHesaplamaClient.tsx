"use client";

import { useState } from "react";
import { Clock, RefreshCcw, Info } from "lucide-react";
import Link from "next/link";

export default function AmortismanHesaplamaClient() {
    const [propertyValue, setPropertyValue] = useState<string>("5000000");
    const [monthlyRent, setMonthlyRent] = useState<string>("25000");

    // Değerler "Hesapla" butonuna basılana kadar pasif kalır
    const [calculatedValue, setCalculatedValue] = useState<number>(5000000);
    const [calculatedRent, setCalculatedRent] = useState<number>(25000);

    const handleCalculate = () => {
        setCalculatedValue(Number(propertyValue) || 0);
        setCalculatedRent(Number(monthlyRent) || 0);
    };

    const amortMonths = calculatedRent > 0 ? (calculatedValue / calculatedRent).toFixed(0) : "0";
    const amortYears = calculatedRent > 0 ? (calculatedValue / calculatedRent / 12).toFixed(1) : "0.0";
    const turkeyAverage = 214; // yaklasik 18 yil ortalama
    const isGood = Number(amortMonths) > 0 && Number(amortMonths) < turkeyAverage;

    return (
        <div className="min-h-screen flex flex-col pt-24 bg-gray-50">

            <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-appleDark mb-4">Emlak Amortisman Süresi Hesaplama</h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Ev veya dükkan satın alırken yatırdığınız paranın sadece kira geliriyle kaç yılda size geri döneceğini (amorti edeceğini) hesaplayın.
                    </p>
                </div>

                <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl mb-12 border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px]" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                        {/* Inputs */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Satış Fiyatı (TL)</label>
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
                                <RefreshCcw size={20} /> Amortismanı Hesapla
                            </button>
                        </div>

                        {/* Results */}
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 flex flex-col justify-center relative overflow-hidden">

                            <h3 className="text-gray-500 font-semibold mb-6 uppercase tracking-wider text-sm flex items-center gap-2">
                                <Clock size={16} /> Geri Dönüş Süresi
                            </h3>

                            <div className="space-y-6 relative z-10">
                                <div>
                                    <div className="flex items-end gap-2 mb-2">
                                        <span className={`text-6xl font-extrabold ${isGood ? 'text-green-600' : 'text-orange-500'}`}>{amortYears}</span>
                                        <span className="text-2xl font-bold text-gray-600 mb-1">Yıl</span>
                                    </div>
                                    <p className="text-xl text-gray-500 font-medium">veya {amortMonths} Ay</p>
                                </div>

                                <div className="h-px bg-gray-200 w-full"></div>

                                <div className={`p-4 rounded-xl border ${isGood ? 'bg-green-50 border-green-100' : 'bg-orange-50 border-orange-100'}`}>
                                    <p className={`text-sm font-semibold ${isGood ? 'text-green-800' : 'text-orange-800'}`}>
                                        {isGood ? "Başarılı Yatırım!" : "Ortalamanın Altında"}
                                    </p>
                                    <p className={`text-xs mt-1 leading-relaxed ${isGood ? 'text-green-700' : 'text-orange-700'}`}>
                                        Bu gayrimenkulün kendini amorti etme süresi Türkiye ortalaması olan ~18 yıldan (214 ay) <strong>daha {isGood ? 'kısadır. Yatırım için ideal bir senaryodur.' : 'uzundur. Kira getirisi açısından zayıf bir yatırım olabilir.'}</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upsell to actual valuation */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between text-white shadow-xl">
                    <div className="mb-6 md:mb-0 md:mr-8 max-w-xl">
                        <h4 className="text-2xl font-bold mb-2">Evinizin Gerçek Değerini Biliyor Musunuz?</h4>
                        <p className="text-indigo-100 leading-relaxed">Tahmini verilerle yetinmeyin. Türkiye&apos;nin en gelişmiş yapay zeka algoritması ile evinizin güncel piyasa satış ve kira değerini saniyeler içinde ücretsiz hesaplayın.</p>
                    </div>
                    <Link href="/" className="shrink-0 bg-white text-indigo-700 px-8 py-4 rounded-xl font-bold border border-white hover:bg-transparent hover:text-white transition-all shadow-lg flex items-center gap-2">
                        Değerleme Yap <Clock size={18} />
                    </Link>
                </div>
            </main>
        </div>
    );
}
