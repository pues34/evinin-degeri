"use client";

import { useState } from "react";
import { Clock, RefreshCcw, Info } from "lucide-react";
import Link from "next/link";

export default function AmortismanHesaplama() {
    const [propertyValue, setPropertyValue] = useState<string>("5000000");
    const [monthlyRent, setMonthlyRent] = useState<string>("25000");

    const value = Number(propertyValue) || 0;
    const rent = Number(monthlyRent) || 0;

    const amortMonths = rent > 0 ? (value / rent).toFixed(0) : "0";
    const amortYears = rent > 0 ? (value / rent / 12).toFixed(1) : "0.0";
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
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">₺</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">
                                    Mülkün değerini bilmiyorsanız <Link href="/" className="text-appleBlue hover:underline">yapay zekaya hesaplatın.</Link>
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Aylık Kira Beklentisi (TL)</label>
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

                            <div className="p-4 bg-purple-50 border border-purple-100 rounded-xl flex items-start">
                                <Info className="text-purple-600 mr-3 shrink-0 mt-0.5" size={18} />
                                <p className="text-sm text-purple-800">Türkiye ortalamasında konutların amortisman süresi 16 - 20 Yıl (190 - 240 Ay) bandındadır.</p>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="bg-gray-50 rounded-[24px] p-8 border border-gray-100 flex flex-col justify-center items-center text-center">
                            <h3 className="font-bold text-appleDark text-xl mb-6 flex items-center justify-center">
                                <Clock className="mr-2 text-indigo-500" /> Amortisman Süresi
                            </h3>

                            <div className="mb-4">
                                <p className="text-5xl font-extrabold text-appleDark mb-2">{amortYears} <span className="text-2xl text-gray-500 font-medium">Yıl</span></p>
                                <p className="text-xl font-bold text-indigo-600">{amortMonths} Ay</p>
                            </div>

                            <div className="w-full h-px bg-gray-200 my-6"></div>

                            <div className={`p-4 rounded-xl w-full flex items-center justify-center gap-3 ${isGood ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                <RefreshCcw size={20} />
                                <span className="font-medium text-sm">
                                    {isGood ? "Yatırım geri dönüş hızı Türkiye ortalamasından BAŞARILI!" : Number(amortMonths) === 0 ? "Lütfen geçerli değerler girin." : "Amortisman süresi ülke ortalamasının üzerinde. Risk içeriyor."}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SEO Text Section */}
                <div className="prose prose-lg max-w-none text-gray-600 bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-appleDark mb-4">Amortisman Süresi Nedir? Neden Önemlidir?</h2>
                    <p>
                        Amortisman (ya da geri dönüş süresi), emlak yatırımı yapacak kişi ve kurumların bir mülke verdikleri paranın, o mülkten elde ettikleri aylık kira geliriyle kaç ay veya yıl içinde yeniden kasalarına döneceğini hesaplama yöntemidir.
                    </p>
                    <p>
                        Uluslararası standartlarda ideal amortisman süresi <strong>10 ila 15 yıl</strong> olarak kabul edilse de; gelişmekte olan ülkelerde veya spesifik olarak Türkiye&apos;nin son yıllardaki konut fiyatı balonlaşması sonucu bu süre <strong>18 - 25 Yıllara (216-300 ay)</strong> kadar çıkmıştır.
                    </p>
                    <p>Eğer amortisman süreniz kısalırsa yatırım kârlılığınız artar. Ticari gayrimenkuller (dükkan, ofis) konutlara göre genellikle çok daha kısa amortisman süreleri sunar ancak ticari riskleri (boş kalma süresi vb) daha yüksek olabilir.</p>
                </div>
            </main>
        </div>
    );
}
