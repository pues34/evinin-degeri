"use client";

import { Crown, Activity, ExternalLink, History, TrendingUp, Download, CheckCircle, BarChart3, Users, Clock } from "lucide-react";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import FastSupportForm from "@/components/FastSupportForm";
import { useState } from "react";

export default function B2BClientInterface({ user, valuations, isActivePro }: { user: any, valuations: any[], isActivePro: boolean }) {
    const [downloading, setDownloading] = useState(false);

    // Calculate Portfoio Stats
    const totalValuations = valuations.length;
    const totalVolume = valuations.reduce((acc, curr) => acc + (curr.estimatedValue || 0), 0);
    const averageValue = totalValuations > 0 ? totalVolume / totalValuations : 0;

    // Prepare chart data (Reversing the recent top 10 to chronological order for chart)
    const chartData = [...valuations].reverse().map(v => ({
        date: new Date(v.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' }),
        "Tahmini Değer": v.estimatedValue,
        "Lokasyon": `${v.district}`
    }));

    const downloadCSV = () => {
        setDownloading(true);
        const headers = ["Tarih,Il,Ilce,Mahalle,m2,Oda,Tahmini_Deger"];
        const rows = valuations.map(v =>
            `${new Date(v.createdAt).toLocaleDateString("tr-TR")},${v.city},${v.district},${v.neighborhood},${v.netSqm},${v.rooms},${v.estimatedValue}`
        );
        const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + headers.concat(rows).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `B2B_Portfoy_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => setDownloading(false), 1000);
    };

    return (
        <div className="space-y-8">
            {/* Ultra Modern Header */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-appleDark text-white p-10 border border-gray-800 shadow-2xl">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-appleBlue rounded-full blur-[120px] opacity-30 pointer-events-none -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600 rounded-full blur-[100px] opacity-20 pointer-events-none translate-y-1/2 -translate-x-1/4" />

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="p-2.5 bg-white/10 text-blue-300 rounded-2xl backdrop-blur-md border border-white/5"><Crown size={28} /></span>
                            <span className="text-sm font-semibold tracking-wider uppercase text-blue-200">Kurumsal Partner Paneli</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">Hoş Geldiniz, <span className="text-white">{user.name.split(' ')[0]}</span>.</h1>
                        <p className="text-blue-100/80 max-w-xl text-lg mt-4 leading-relaxed">Gayrimenkul portföyünüzün tüm analizlerini yönetin, B2B limitsiz değerleme motoruyla sahada her zaman rakiplerinizin bir adım önünde olun.</p>
                    </div>

                    <div className="w-full md:w-auto">
                        {isActivePro ? (
                            <div className="flex flex-col items-center sm:items-end gap-3 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
                                <span className="flex items-center text-sm font-bold text-green-400 uppercase tracking-widest"><CheckCircle size={16} className="mr-2" /> PRO Aktif</span>
                                <span className="text-white/60 text-xs">Abonelik Bitiş: {new Date(user.subscriptionEnd).toLocaleDateString('tr-TR')}</span>
                                <Link href="/" className="mt-2 w-full sm:w-auto px-6 py-3 bg-white text-appleDark hover:bg-gray-100 font-bold rounded-xl transition-all shadow-lg flex justify-center items-center">
                                    <Activity size={18} className="mr-2" /> Anında Değerleme Yap
                                </Link>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4 p-6 bg-amber-500/10 backdrop-blur-xl border border-amber-500/20 rounded-3xl items-center sm:items-end w-full md:w-[320px]">
                                <div className="text-left w-full">
                                    <h3 className="text-amber-400 font-bold mb-1">PRO Abonelik Gerekli</h3>
                                    <p className="text-white/70 text-sm">Limitsiz değerleme ve filigransız kurumsal raporlar için hemen yükseltin.</p>
                                </div>
                                <Link href="/b2b/pricing" className="w-full text-center px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white font-bold rounded-xl transition-all shadow-xl shadow-amber-500/20">
                                    Limitsiz Ol (PRO)
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 border border-gray-100 flex items-center gap-5">
                    <div className="p-4 bg-blue-50 text-appleBlue rounded-2xl"><Activity size={28} /></div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Analiz Edilen Mülk</p>
                        <h3 className="text-3xl font-extrabold text-appleDark mt-1">{totalValuations} <span className="text-base font-normal text-gray-400">Adet</span></h3>
                    </div>
                </div>
                <div className="glass-card p-6 border border-gray-100 flex items-center gap-5">
                    <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl"><BarChart3 size={28} /></div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Ortalama Mülk Değeri</p>
                        <h3 className="text-2xl font-extrabold text-appleDark mt-1">
                            {new Intl.NumberFormat('tr-TR', { notation: "compact", maximumFractionDigits: 1 }).format(averageValue)} ₺
                        </h3>
                    </div>
                </div>
                <div className="glass-card p-6 border border-gray-100 flex items-center gap-5">
                    <div className="p-4 bg-green-50 text-green-600 rounded-2xl"><TrendingUp size={28} /></div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Toplam Portföy Hacmi</p>
                        <h3 className="text-2xl font-extrabold text-appleDark mt-1">
                            {new Intl.NumberFormat('tr-TR', { notation: "compact", maximumFractionDigits: 1 }).format(totalVolume)} ₺
                        </h3>
                    </div>
                </div>
            </div>

            {/* Interactive Graph & Support Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recharts Area */}
                <div className="lg:col-span-2 glass-card p-8 border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-appleDark flex items-center"><TrendingUp className="mr-2 text-appleBlue" size={24} /> Portföy Analiz Eğilimi</h2>
                            <p className="text-sm text-gray-500 mt-1">Son ekspertizlerinizin değer grafiği</p>
                        </div>
                    </div>
                    {chartData.length > 1 ? (
                        <div className="h-[300px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#0055FF" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#0055FF" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                        tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M ₺`}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                        formatter={(value: any) => [new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(value), "Değer"]}
                                    />
                                    <Area type="monotone" dataKey="Tahmini Değer" stroke="#0055FF" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="h-[300px] w-full flex items-center justify-center bg-gray-50 rounded-2xl border border-gray-100 border-dashed mt-4">
                            <p className="text-gray-400 font-medium">Grafik oluşturmak için en az 2 değerleme yapmalısınız.</p>
                        </div>
                    )}
                </div>

                {/* Support Form */}
                <div className="lg:col-span-1">
                    <FastSupportForm user={{ name: user.name, email: user.email }} />
                </div>
            </div>

            {/* Premium Table */}
            <div className="glass-card border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-appleDark flex items-center gap-2">
                            <History className="text-appleBlue" size={24} /> Geçmiş Değerlemelerim
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">Yaptığınız son kurumsal sorgulamaların dökümü.</p>
                    </div>
                    <button onClick={downloadCSV} disabled={valuations.length === 0 || downloading} className="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-appleDark rounded-xl font-medium transition-all shadow-sm disabled:opacity-50">
                        <Download size={18} className="mr-2" /> {downloading ? "İndiriliyor..." : "CSV İndir"}
                    </button>
                </div>

                {valuations.length === 0 ? (
                    <div className="p-12 text-center text-gray-500 bg-gray-50">
                        Henüz rapor oluşturmadınız. B2B paneline özel limitsiz değerleme motoruna <Link href="/" className="text-appleBlue font-bold hover:underline">buradan</Link> erişebilirsiniz.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="py-5 px-8 font-semibold text-gray-500 text-sm">Tarih</th>
                                    <th className="py-5 px-8 font-semibold text-gray-500 text-sm">Gayrimenkul Konumu</th>
                                    <th className="py-5 px-8 font-semibold text-gray-500 text-sm">Özellikler</th>
                                    <th className="py-5 px-8 font-semibold text-gray-500 text-sm">Tahmini Özsermaye</th>
                                    <th className="py-5 px-8 font-semibold text-gray-500 text-sm text-right">İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {valuations.map((val: any) => (
                                    <tr key={val.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors group">
                                        <td className="py-5 px-8 text-sm text-gray-500 whitespace-nowrap">
                                            {new Date(val.createdAt).toLocaleDateString("tr-TR", { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className="py-5 px-8">
                                            <p className="text-sm font-bold text-appleDark">{val.district}</p>
                                            <p className="text-xs text-gray-500">{val.city} / {val.neighborhood}</p>
                                        </td>
                                        <td className="py-5 px-8">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800 mr-2">
                                                {val.netSqm} m²
                                            </span>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                                                {val.rooms}
                                            </span>
                                        </td>
                                        <td className="py-5 px-8 text-base font-bold text-green-600">
                                            {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(val.estimatedValue)}
                                        </td>
                                        <td className="py-5 px-8 text-right">
                                            <Link href={`/result/${val.id}`} className="inline-flex items-center text-sm font-medium text-appleBlue hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity">
                                                Görüntüle <ExternalLink size={14} className="ml-1" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
