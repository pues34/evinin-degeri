"use client";

import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
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
                <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                    <p className="font-semibold text-appleDark mb-2">{label}</p>
                    <p className="text-appleBlue font-bold text-lg">
                        {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(payload[0].value)} /m²
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Hacim: {payload[0].payload.volume} Değerleme</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen flex flex-col pt-24 bg-gray-50">
            <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
                <div className="mb-10 flex items-center gap-3">
                    <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl"><Activity size={24} /></div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-appleDark">Türkiye Konut Fiyat Endeksi</h1>
                        <p className="text-gray-500">Aylık ortalama m² fiyat satış piyasası görünümü</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Summary Card */}
                    <div className="lg:col-span-1 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-center">
                        <p className="text-sm font-medium text-gray-500 mb-2">Güncel Türkiye m² Ortalaması</p>
                        {loading ? (
                            <div className="h-10 w-2/3 bg-gray-200 animate-pulse rounded-lg mb-4"></div>
                        ) : (
                            <div className="text-4xl font-extrabold text-appleDark mb-4">
                                {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(currentAvg)}<span className="text-xl text-gray-500 font-medium">/m²</span>
                            </div>
                        )}

                        {indexData.length > 1 && (
                            <div className={`flex items-center gap-2 p-3 rounded-xl inline-flex w-fit ${isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                                <span className="font-bold text-lg">{isPositive ? '+' : ''}{percentageChange.toFixed(2)}%</span>
                                <span className="text-sm opacity-80">(Geçen aya göre)</span>
                            </div>
                        )}

                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <p className="text-sm text-gray-500 mb-4">Eviniz piyasanın uzerinde mi degerli yoksa gerisinde mi kaldi? Hemen ucretsiz yapay zeka testi yapin.</p>
                            <Link href="/">
                                <button className="w-full flex items-center justify-center gap-2 bg-appleBlue hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-xl transition-colors">
                                    Evimi Değerle <ArrowRight size={18} />
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Chart Card */}
                    <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-appleDark mb-6 flex justify-between items-center">
                            <span>Son 12 Aylık Trend</span>
                            {loading && <span className="text-xs text-blue-500 animate-pulse">Veriler yükleniyor...</span>}
                        </h3>
                        <div className="w-full h-[300px]">
                            {loading ? (
                                <div className="w-full h-full bg-gray-50 rounded-xl animate-pulse flex items-center justify-center">
                                    <Activity className="text-gray-300 animate-bounce" size={48} />
                                </div>
                            ) : indexData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={indexData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                        <XAxis
                                            dataKey="displayMonth"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                                            dy={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tickFormatter={(val) => `₺${val / 1000}k`}
                                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area
                                            type="monotone"
                                            dataKey="avgSqmPrice"
                                            stroke="#3b82f6"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorPrice)"
                                            animationDuration={1500}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                    <Activity size={48} className="mb-2 opacity-20" />
                                    <p>Henüz yeterli piyasa verisi oluşmadı.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Info Text */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-gray-600 prose prose-lg max-w-none">
                    <h2 className="text-xl font-bold text-appleDark">Konut Fiyat Endeksi Nedir?</h2>
                    <p>
                        Evinin Değeri platformu üzerinden gerçekleştirilen yüz binlerce yapay zeka analizli gayrimenkul değerlemesinin ay bazlı konsolide edilerek medyan metrekare satış fiyatlarının ortaya çıkartıldığı gerçek piyasa göstergesidir.
                    </p>
                    <p>
                        <strong>Neden Önemli?</strong> Resmi kurumların açıkladığı endeksler genellikle tapu dairesinde gösterilen (genelde düşük gösterilen) resmi harç bedelleri üzerinden hesaplanırken; algoritmalarımız piyasadaki gerçek alıcı ve satıcı potansiyel verilerini baz alarak gerçeğe en yakın likit satılabilir mülk değerini listeler.
                    </p>
                </div>
            </main>        </div>
    );
}
