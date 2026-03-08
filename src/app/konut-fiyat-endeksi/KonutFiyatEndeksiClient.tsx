"use client";

import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Activity, TrendingUp, TrendingDown, ArrowRight, LineChart, BarChart3, Info } from "lucide-react";
import Link from "next/link";

export default function KonutFiyatEndeksiClient() {
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
        <div className="min-h-screen bg-appleGray pb-20">

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-appleDark via-appleDark to-gray-900 pt-32 pb-24 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 blur-[1px]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z' fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")` }}></div>
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500 rounded-full blur-[120px] opacity-20 pointer-events-none" />

                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <div className="flex flex-col md:flex-row gap-12 items-end justify-between">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm border border-white/5">
                                <Activity size={32} className="text-blue-400" />
                            </div>
                            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Konut Fiyat Endeksi</h1>
                            <p className="text-xl text-gray-400 font-light leading-relaxed">
                                Türkiye geneli ortalama metrekare satış fiyatlarının aylık değişimini canlı ve güvenilir verilerle takip edin.
                            </p>
                        </div>

                        {/* Top Highlights Box */}
                        {!loading && indexData.length > 0 && (
                            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-[32px] p-8 min-w-[300px] shadow-2xl">
                                <p className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-widest">{indexData[indexData.length - 1].month}</p>
                                <div className="text-4xl font-extrabold text-white mb-4">
                                    {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(currentAvg)} <span className="text-xl text-gray-400 font-normal">/m²</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className={`flex items-center gap-1 font-bold px-3 py-1 rounded-full text-sm ${isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                        {Math.abs(percentageChange).toFixed(2)}%
                                    </div>
                                    <span className="text-sm text-gray-400">geçen aya göre</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="container mx-auto px-4 max-w-6xl -mt-12 relative z-20">

                {/* Primary Chart: Price Trend */}
                <div className="bg-white rounded-[32px] p-8 shadow-xl border border-gray-100 mb-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-blue-50 text-appleBlue rounded-xl">
                                <LineChart size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-appleDark">Değer Trendi</h2>
                        </div>
                    </div>

                    <div className="h-[400px] w-full min-h-[400px] min-w-[300px]">
                        {loading ? (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                <Activity size={40} className="animate-spin mb-4" />
                                <p>Veriler Yükleniyor...</p>
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={indexData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#0066CC" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#0066CC" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis
                                        dataKey="month"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }}
                                        tickFormatter={(val) => `₺${(val / 1000).toFixed(0)}k`}
                                        dx={-10}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area
                                        type="monotone"
                                        dataKey="avgSqmPrice"
                                        stroke="#0066CC"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#colorPrice)"
                                        activeDot={{ r: 8, strokeWidth: 0, fill: '#0066CC' }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {/* Activity Chart */}
                    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 col-span-2">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                                <BarChart3 size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-appleDark">Değerleme Hacmi</h2>
                        </div>

                        <div className="h-[250px] w-full min-h-[250px] min-w-[200px]">
                            {!loading && (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={indexData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F3F4F6' }} />
                                        <Bar dataKey="valuationCount" fill="#A855F7" radius={[6, 6, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>

                    {/* Upsell / Call to action */}
                    <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-[32px] p-8 text-white flex flex-col justify-center shadow-xl relative overflow-hidden">
                        <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-white rounded-full blur-[50px] opacity-20" />
                        <h3 className="text-2xl font-bold mb-4 relative z-10">Piyasayı Kaçırmayın</h3>
                        <p className="text-blue-100 mb-8 leading-relaxed relative z-10 text-sm">
                            Bu veriler genel ortalamayı temsil eder. Sizin eviniz bu ortalamanın neresinde? Anında öğrenmek için değerleme formunu doldurun.
                        </p>
                        <Link href="/" className="bg-white text-blue-600 font-bold py-3 px-6 rounded-xl text-center hover:bg-gray-50 transition-colors shadow-lg relative z-10 flex items-center justify-center gap-2">
                            Değerleme Yap <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>

                {/* Info Text */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 flex gap-4 items-start">
                    <Info size={24} className="text-gray-400 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-1">Veri Metodolojisi</h4>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Burada sunulan endeks, Evin Değeri sisteminde yapılan binlerce tahmini değerleme ve piyasadaki onaylı satış verilerinin birleşiminden oluşan ağırlıklı bir ortalamadır. Ay sonlarında geçmişe dönük optimizasyonlar yapılarak veri eğrisi milimetrik olarak düzeltilebilir.
                        </p>
                    </div>
                </div>

            </main>
        </div>
    );
}
