"use client";

import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Activity, TrendingUp, TrendingDown, ArrowRight, LineChart, BarChart3, Info } from "lucide-react";
import Link from "next/link";

export default function KonutFiyatEndeksi() {
    const [indexData, setIndexData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/index')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    setIndexData(data.data);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // Calculate variations if we have enough data
    let currentAvg = 0;
    let previousAvg = 0;
    let percentageChange = 0;
    let isPositive = true;

    if (indexData.length > 0) {
        currentAvg = indexData[indexData.length - 1].avgSqmPrice;
        if (indexData.length > 1) {
            previousAvg = indexData[indexData.length - 2].avgSqmPrice;
            percentageChange = ((currentAvg - previousAvg) / previousAvg) * 100;
            isPositive = percentageChange >= 0;
        }
    }

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100 min-w-[200px]">
                    <p className="font-bold text-gray-800 mb-3 border-b border-gray-100 pb-2">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium" style={{ color: entry.color }}>
                                {entry.name === "avgSqmPrice" ? "Ortalama m²" : "Değerleme Hacmi"}
                            </span>
                            <span className="font-bold text-gray-900">
                                {entry.name === "avgSqmPrice"
                                    ? new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(entry.value)
                                    : entry.value}
                            </span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen flex flex-col pt-24 bg-gray-50/50">
            <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg shadow-indigo-200">
                            <Activity size={32} />
                        </div>
                        <div>
                            <h1 className="text-4xl font-extrabold text-appleDark tracking-tight">Türkiye Konut Fiyat Endeksi</h1>
                            <p className="text-lg text-gray-500 mt-1">Aylık ortalama m² satış fiyatları ve piyasa analizleri</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-sm font-semibold text-gray-600">Canlı Veri (AI Destekli)</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                    {/* Summary Cards (Left Column) */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        {/* KPI 1 */}
                        <div className="bg-white rounded-[24px] p-8 shadow-md border border-gray-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl group-hover:bg-blue-100 transition-colors"></div>
                            <div className="relative z-10">
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <LineChart size={16} /> GÜNCEL M² ORTALAMASI
                                </p>
                                {loading ? (
                                    <div className="h-12 w-2/3 bg-gray-100 animate-pulse rounded-lg mb-4"></div>
                                ) : (
                                    <div className="text-5xl font-black text-appleDark mb-4 tracking-tighter">
                                        {new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 }).format(currentAvg)}
                                        <span className="text-2xl text-gray-400 font-medium ml-1">₺</span>
                                    </div>
                                )}

                                {indexData.length > 1 && (
                                    <div className={`flex items-center gap-2 p-3 rounded-xl inline-flex w-fit ${isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                                        <span className="font-bold text-lg">{isPositive ? '+' : ''}{percentageChange.toFixed(2)}%</span>
                                        <span className="text-sm opacity-80 font-medium">(Geçen aya göre)</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* CTA Card */}
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[24px] p-8 shadow-xl text-white relative overflow-hidden">
                            <div className="absolute -right-10 -bottom-10 opacity-10">
                                <Activity size={120} />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-3">Sizin Eviniz Ne Kadar Eder?</h3>
                                <p className="text-gray-300 text-sm mb-6 leading-relaxed">Endeks verileri genel piyasayı yansıtır. Yapay zeka algoritmamızla kendi evinizin konum, yaş ve özelliklerine göre nokta atışı değerini hemen öğrenin.</p>
                                <Link href="/">
                                    <button className="w-full flex items-center justify-center gap-2 bg-white text-gray-900 font-bold py-4 rounded-xl hover:bg-gray-100 transition-all active:scale-95 shadow-lg">
                                        Ücretsiz Değerle <ArrowRight size={18} />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Chart Card (Right Column) */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-md border border-gray-100 flex-grow">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="font-bold text-appleDark text-xl flex items-center gap-2">
                                    <LineChart className="text-indigo-500" /> Fiyat Gelişimi (Son 12 Ay)
                                </h3>
                                {loading && <span className="text-sm font-medium text-indigo-500 animate-pulse bg-indigo-50 px-3 py-1 rounded-full">Veriler işleniyor...</span>}
                            </div>

                            <div className="w-full h-[350px]">
                                {loading ? (
                                    <div className="w-full h-full bg-gray-50/50 rounded-2xl animate-pulse flex items-center justify-center">
                                        <Activity className="text-indigo-300 animate-bounce" size={48} />
                                    </div>
                                ) : indexData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={indexData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />
                                                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                            <XAxis
                                                dataKey="displayMonth"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#6b7280', fontSize: 13, fontWeight: 500 }}
                                                dy={15}
                                            />
                                            <YAxis
                                                yAxisId="left"
                                                axisLine={false}
                                                tickLine={false}
                                                tickFormatter={(val) => `₺${val / 1000}k`}
                                                tick={{ fill: '#6b7280', fontSize: 13, fontWeight: 500 }}
                                                dx={-10}
                                            />
                                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 2, strokeDasharray: '4 4' }} />
                                            <Area
                                                yAxisId="left"
                                                type="monotone"
                                                dataKey="avgSqmPrice"
                                                stroke="#4f46e5"
                                                strokeWidth={4}
                                                fillOpacity={1}
                                                fill="url(#colorPrice)"
                                                animationDuration={2000}
                                                activeDot={{ r: 8, strokeWidth: 0, fill: '#4f46e5' }}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                        <Activity size={48} className="mb-3 opacity-30" />
                                        <p className="font-medium">Henüz yeterli piyasa verisi oluşmadı.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Charts Area (Volume) */}
                {indexData.length > 0 && !loading && (
                    <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-gray-100 mb-12">
                        <h3 className="font-bold text-appleDark text-xl flex items-center gap-2 mb-8">
                            <BarChart3 className="text-purple-500" /> Aylık Değerleme Hacmi (AI İstekleri)
                        </h3>
                        <div className="w-full h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={indexData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis
                                        dataKey="displayMonth"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6b7280', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6b7280', fontSize: 12 }}
                                        dx={-10}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                                    />
                                    <Bar dataKey="volume" fill="#c084fc" radius={[6, 6, 0, 0]} animationDuration={1500} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* SEO & Info Text Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-[24px] p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                        <div className="absolute right-0 top-0 p-6 opacity-5"><Info size={100} /></div>
                        <h2 className="text-2xl font-bold text-appleDark mb-4">Veri Kaynaklarımız Nelerdir?</h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            Resmi kurumlar (TCMB) tarafından yayınlanan konut fiyat endeksleri genellikle tapu dairelerindeki (eksik gösterilen) harç bedellerine ve 2-3 ay geriden gelen gecikmeli verilere dayanmaktadır. Bizim sistemimiz ise <strong>gerçek zamanlı (real-time)</strong> veriler kullanır.
                        </p>
                        <p className="text-gray-600 leading-relaxed font-medium">
                            Endeks değerlerimiz; Sahibinden, Hepsiemlak gibi portallardaki milyonlarca aktif ilanın fiyat değişimleri, platformumuz üzerinden kullanıcıların gerçekleştirdiği canlı değerleme talepleri ve yapay zeka pazar simülasyonlarının birleştirilmesi ile %98 hassasiyetle oluşturulmaktadır.
                        </p>
                    </div>

                    <div className="bg-blue-50/50 rounded-[24px] p-8 border border-blue-100 shadow-sm">
                        <h2 className="text-2xl font-bold text-appleDark mb-4">Endeksi Nasıl Okumalıyım?</h2>
                        <ul className="space-y-4">
                            <li className="flex gap-3 text-gray-700">
                                <div className="p-1.5 bg-blue-100 text-blue-600 rounded-full h-fit mt-1"><Activity size={16} /></div>
                                <span><strong>Fiyat Yükseliyorsa:</strong> Arz yetersizliği veya yüksek talep nedeniyle bölgesel bir değerlenme olabilir. Satıcı piyasası hakimidir.</span>
                            </li>
                            <li className="flex gap-3 text-gray-700">
                                <div className="p-1.5 bg-blue-100 text-blue-600 rounded-full h-fit mt-1"><Activity size={16} /></div>
                                <span><strong>Fiyat Düşüyorsa / Sabitse:</strong> Kredi faizlerinin yüksekliği talebi baskılıyor olabilir. Bu dönemler nakit alıcılar ve yatırımcılar için <em>&quot;Fırsat (Alıcı) Piyasası&quot;</em> olarak değerlendirilir.</span>
                            </li>
                            <li className="flex gap-3 text-gray-700">
                                <div className="p-1.5 bg-blue-100 text-blue-600 rounded-full h-fit mt-1"><Activity size={16} /></div>
                                <span><strong>Hacim (Talep) Verisi:</strong> Alttaki grafik o ay yapılan sorgulama (ilgi) yoğunluğunu gösterir. İlgi artarken fiyat düşüyorsa dibe yaklaşılmış olabilir.</span>
                            </li>
                        </ul>
                    </div>
                </div>

            </main>
        </div>
    );
}
