"use client";

import { Crown, Activity, ExternalLink, History, TrendingUp, Download, CheckCircle, BarChart3, Users, Clock, UserPlus, LogOut, Share2, X, Map, Settings, Home } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import FastSupportForm from "@/components/FastSupportForm";
import SocialMediaGenerator from "@/components/SocialMediaGenerator";
import { useState, useEffect } from "react";

export default function B2BClientInterface({ user, valuations, leads, isActivePro, initialListings }: { user: any, valuations: any[], leads: any[], isActivePro: boolean, initialListings?: any[] }) {
    const [downloading, setDownloading] = useState(false);
    const [activeTab, setActiveTab] = useState<'PORTFOLIO' | 'LEAD_MARKET' | 'HEATMAP' | 'MY_BRAND' | 'MY_LISTINGS' | 'SETTINGS'>('PORTFOLIO');
    const [logoUrl, setLogoUrl] = useState(user?.customLogoUrl || "");
    const [savingLogo, setSavingLogo] = useState(false);

    // Phase 18
    const [listings, setListings] = useState<any[]>(initialListings || []);
    const [loadingListings, setLoadingListings] = useState(false);

    // Settings State
    const [settings, setSettings] = useState({
        companyName: user?.companyName || "",
        phone: user?.phone || "",
        taxOffice: user?.taxOffice || "",
        taxNumber: user?.taxNumber || "",
        address: user?.address || "",
        currentPassword: "",
        newPassword: ""
    });
    const [savingSettings, setSavingSettings] = useState(false);

    const [socialPostData, setSocialPostData] = useState<any>(null);

    const handleSaveLogo = async () => {
        setSavingLogo(true);
        try {
            const res = await fetch("/api/realtor/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ customLogoUrl: logoUrl })
            });
            const data = await res.json();
            if (data.success) {
                alert("Logo başarıyla kaydedildi! Üreteceğiniz PDF'lerde Evinin Değeri logosu yerine kendi markanız görünecektir.");
            } else {
                alert("Hata: " + data.error);
            }
        } catch (e) {
            alert("Bağlantı hatası.");
        }
        setSavingLogo(false);
    };

    const handleSaveSettings = async (e: React.FormEvent) => {
        e.preventDefault();
        setSavingSettings(true);
        try {
            const res = await fetch("/api/realtor/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings)
            });
            const data = await res.json();
            if (data.success) {
                alert("Profil ayarları başarıyla kaydedildi!");
                setSettings({ ...settings, currentPassword: "", newPassword: "" });
            } else {
                alert("Hata: " + data.error);
            }
        } catch (e) {
            alert("Bağlantı hatası.");
        }
        setSavingSettings(false);
    };

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

    // Calculate Heatmap data
    const districtCounts: Record<string, number> = {};
    valuations.forEach(v => {
        if (v.district) {
            districtCounts[v.district] = (districtCounts[v.district] || 0) + 1;
        }
    });

    const heatmapData = Object.entries(districtCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10); // Top 10 hottest regions

    return (
        <div className="space-y-8 relative">
            {socialPostData && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl w-full max-w-4xl relative shadow-2xl overflow-y-auto max-h-[90vh]">
                        <button onClick={() => setSocialPostData(null)} className="absolute top-4 right-4 z-50 p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-800">
                            <X size={20} />
                        </button>
                        <SocialMediaGenerator valuationData={socialPostData} realtorLogo={logoUrl} />
                    </div>
                </div>
            )}

            {/* Ultra Modern Header */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-appleDark text-white p-10 border border-gray-800 shadow-2xl">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-appleBlue rounded-full blur-[120px] opacity-30 pointer-events-none -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600 rounded-full blur-[100px] opacity-20 pointer-events-none translate-y-1/2 -translate-x-1/4" />

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="p-2.5 bg-white/10 text-blue-300 rounded-2xl backdrop-blur-md border border-white/5"><Crown size={28} /></span>
                            <span className="text-sm font-semibold tracking-wider uppercase text-blue-200 mr-4">Kurumsal Partner Paneli</span>
                            <button onClick={() => signOut({ callbackUrl: '/' })} className="text-red-300 hover:text-white transition-colors px-3 py-1.5 flex items-center gap-2 text-xs font-bold bg-white/5 hover:bg-red-500/20 rounded-xl border border-white/10 backdrop-blur-md">
                                <LogOut size={14} /> Çıkış Yap
                            </button>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">Hoş Geldiniz, <span className="text-white">{user.companyName?.split(' ')[0] || "Kurumsal Üye"}</span>.</h1>
                        <p className="text-blue-100/80 max-w-xl text-lg mt-4 leading-relaxed">Gayrimenkul portföyünüzün tüm analizlerini yönetin, B2B limitsiz değerleme motoruyla sahada her zaman rakiplerinizin bir adım önünde olun.</p>
                    </div>

                    <div className="w-full md:w-auto">
                        {isActivePro ? (
                            <div className="flex flex-col items-center sm:items-end gap-3 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
                                <span className="flex items-center text-sm font-bold text-green-400 uppercase tracking-widest">
                                    <CheckCircle size={16} className="mr-2" /> {user.subscriptionTier === "PRO_PLUS" ? "PRO PLUS Aktif" : "PRO Aktif"}
                                </span>
                                <span className="text-white/60 text-xs">Abonelik Bitiş: {new Date(user.subscriptionEnd).toLocaleDateString('tr-TR')}</span>
                                <div className="flex flex-col sm:flex-row gap-2 mt-2 w-full justify-end">
                                    <Link href="/" className="w-full sm:w-auto px-6 py-3 bg-white text-appleDark hover:bg-gray-100 font-bold rounded-xl transition-all shadow-lg flex justify-center items-center">
                                        <Activity size={18} className="mr-2" /> Anında Değerleme
                                    </Link>
                                    {user.subscriptionTier === "PRO" && (
                                        <Link href="/b2b/pricing" className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-white hover:from-amber-500 hover:to-amber-700 font-bold rounded-xl transition-all shadow-lg flex justify-center items-center text-sm">
                                            <Crown size={16} className="mr-2 fill-white" /> PRO PLUS&apos;a Yükselt
                                        </Link>
                                    )}
                                </div>
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

            {/* Premium Table & Lead Market Tabs */}
            <div className="glass-card border border-gray-100 overflow-hidden">
                <div className="border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50/50">
                    <div className="flex w-full overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('PORTFOLIO')}
                            className={`flex-1 sm:flex-none px-8 py-5 font-bold text-sm flex items-center justify-center gap-2 border-b-2 transition-colors ${activeTab === 'PORTFOLIO' ? 'border-appleBlue text-appleBlue bg-white' : 'border-transparent text-gray-500 hover:text-appleDark'}`}
                        >
                            <History size={18} /> Geçmiş Değerlemelerim
                        </button>
                        <button
                            onClick={() => setActiveTab('LEAD_MARKET')}
                            className={`flex-1 sm:flex-none px-6 py-5 font-bold text-sm flex items-center justify-center gap-2 border-b-2 transition-colors ${activeTab === 'LEAD_MARKET' ? 'border-amber-500 text-amber-600 bg-white' : 'border-transparent text-gray-500 hover:text-amber-600'}`}
                        >
                            <UserPlus size={18} /> Leads
                        </button>
                        <button
                            onClick={() => setActiveTab('HEATMAP')}
                            className={`flex-1 sm:flex-none px-6 py-5 font-bold text-sm flex items-center justify-center gap-2 border-b-2 transition-colors ${activeTab === 'HEATMAP' ? 'border-rose-500 text-rose-600 bg-white' : 'border-transparent text-gray-500 hover:text-rose-600'}`}
                        >
                            <Map size={18} /> Isı Haritası
                        </button>
                        <button
                            onClick={() => setActiveTab('MY_BRAND')}
                            className={`flex-1 sm:flex-none px-6 py-5 font-bold text-sm flex items-center justify-center gap-2 border-b-2 transition-colors ${activeTab === 'MY_BRAND' ? 'border-purple-500 text-purple-600 bg-white' : 'border-transparent text-gray-500 hover:text-purple-600'}`}
                        >
                            <Crown size={18} /> Markam
                        </button>
                        <button
                            onClick={() => setActiveTab('MY_LISTINGS')}
                            className={`flex-1 sm:flex-none px-6 py-5 font-bold text-sm flex items-center justify-center gap-2 border-b-2 transition-colors ${activeTab === 'MY_LISTINGS' ? 'border-indigo-500 text-indigo-600 bg-white' : 'border-transparent text-gray-500 hover:text-indigo-600'}`}
                        >
                            <Home size={18} /> İlanlarım
                        </button>
                        <button
                            onClick={() => setActiveTab('SETTINGS')}
                            className={`flex-1 sm:flex-none px-6 py-5 font-bold text-sm flex items-center justify-center gap-2 border-b-2 transition-colors ${activeTab === 'SETTINGS' ? 'border-gray-800 text-gray-900 bg-white' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
                        >
                            <Settings size={18} /> Profil Ayarları
                        </button>
                    </div>
                    <div className="p-4 sm:p-0 sm:pr-8 w-full sm:w-auto">
                        {activeTab === 'PORTFOLIO' && (
                            <button onClick={downloadCSV} disabled={valuations.length === 0 || downloading} className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-appleDark rounded-xl font-medium transition-all shadow-sm disabled:opacity-50">
                                <Download size={18} className="mr-2" /> {downloading ? "İndiriliyor..." : "CSV İndir"}
                            </button>
                        )}
                    </div>
                </div>

                {/* TAB CONTENT: PORTFOLIO */}
                {activeTab === 'PORTFOLIO' && (
                    <div>
                        {valuations.length === 0 ? (
                            <div className="p-12 text-center text-gray-500 bg-gray-50">
                                Henüz rapor oluşturmadınız. B2B paneline özel limitsiz değerleme motoruna <Link href="/" className="text-appleBlue font-bold hover:underline">buradan</Link> erişebilirsiniz.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-white">
                                            <th className="py-5 px-8 font-semibold text-gray-500 text-sm">Tarih</th>
                                            <th className="py-5 px-8 font-semibold text-gray-500 text-sm">Gayrimenkul Konumu</th>
                                            <th className="py-5 px-8 font-semibold text-gray-500 text-sm">Özellikler</th>
                                            <th className="py-5 px-8 font-semibold text-gray-500 text-sm">Tahmini Özsermaye</th>
                                            <th className="py-5 px-8 font-semibold text-gray-500 text-sm text-right">İşlem</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {valuations.map((val: any) => (
                                            <tr key={val.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors group">
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
                                                <td className="py-5 px-8 text-right space-x-3 whitespace-nowrap">
                                                    <button onClick={() => setSocialPostData(val)} className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800 bg-purple-50 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Share2 size={14} className="mr-1" /> Paylaş
                                                    </button>
                                                    <Link href={`/result/${val.id}`} className="inline-flex items-center text-sm font-medium text-appleBlue hover:text-blue-700 bg-blue-50 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                                        Aç <ExternalLink size={14} className="ml-1" />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* TAB CONTENT: LEAD MARKET */}
                {activeTab === 'LEAD_MARKET' && (
                    <div className="bg-white min-h-[400px]">
                        {user.subscriptionTier !== "PRO_PLUS" ? (
                            <div className="flex flex-col items-center justify-center p-16 text-center">
                                <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-6">
                                    <Crown size={40} className="text-amber-500 fill-amber-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-appleDark mb-3">Bu Alan Sadece PRO PLUS Üyelere Özeldir</h3>
                                <p className="text-gray-500 max-w-lg mb-8">
                                    Evini satmak veya kiralamak isteyen gerçek ev sahiplerinin iletişim bilgilerine ve değerleme raporlarına &quot;Sıcak Müşteri Havuzu&quot;ndan (Lead Market) anında erişin.
                                </p>
                                <Link href="/b2b/pricing" className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 transform hover:-translate-y-1">
                                    <Crown size={20} className="fill-white" /> Paketinizi Yükseltin
                                </Link>
                            </div>
                        ) : (
                            <div className="p-8">
                                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-8 flex items-start gap-4">
                                    <Activity className="text-amber-600 shrink-0 mt-1" size={24} />
                                    <div>
                                        <h4 className="text-lg font-bold text-amber-800 mb-1">Müşteri Pazarına Hoş Geldiniz</h4>
                                        <p className="text-amber-700/80 text-sm">
                                            Burada &quot;Evimi Satmak İstiyorum&quot; butonuna tıklayan gerçek ev sahiplerini görmektesiniz. Raporlarına tıklayarak özellikleri inceleyin ve doğrudan iletişim kurarak portföyünüze katın.
                                        </p>
                                    </div>
                                </div>

                                {leads.length === 0 ? (
                                    <div className="text-center p-12 text-gray-500 bg-gray-50 rounded-2xl border border-gray-100 dashed">
                                        Şu an havuzda bekleyen yeni bir potansiyel müşteri bulunmuyor. Yeni kayıtlar düştüğünde burada listelenecektir.
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {leads.map((lead: any) => (
                                            <div key={lead.id} className="bg-white border-2 border-gray-100 hover:border-amber-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                                                <div className="flex justify-between items-start mb-4">
                                                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full flex items-center">
                                                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                                                        Sıcak Müşteri
                                                    </span>
                                                    <span className="text-xs text-gray-400 font-medium">#{lead.requestNumber}</span>
                                                </div>

                                                <h4 className="font-bold text-lg text-appleDark mb-1">{lead.district}, {lead.neighborhood}</h4>
                                                <p className="text-sm text-gray-500 mb-4">{lead.rooms} | {lead.netSqm} m² | {lead.buildingAge} Yaşında</p>

                                                <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100 text-center">
                                                    <span className="block text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Ev Sahibinin Tahmini Değeri</span>
                                                    <span className="text-xl font-extrabold text-appleDark">
                                                        {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(lead.estimatedValue)}
                                                    </span>
                                                </div>

                                                {lead.contactInfo ? (
                                                    <div className="space-y-3">
                                                        <a href={`tel:${lead.contactInfo.phone}`} className="w-full block text-center py-3 bg-appleDark hover:bg-black text-white font-medium rounded-xl transition-colors text-sm">
                                                            📞 {lead.contactInfo.phone}
                                                        </a>
                                                        <Link href={`/result/${lead.id}`} className="w-full flex justify-center items-center py-3 bg-gray-100 hover:bg-gray-200 text-appleDark font-medium rounded-xl transition-colors text-sm">
                                                            Raporu Görüntüle <ExternalLink size={16} className="ml-2" />
                                                        </Link>
                                                    </div>
                                                ) : (
                                                    <div className="w-full block text-center py-3 bg-gray-100 text-gray-400 font-medium rounded-xl text-sm border border-gray-200 border-dashed">
                                                        İletişim Bilgisi Bekleniyor
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* TAB CONTENT: MY_LISTINGS */}
                {activeTab === 'MY_LISTINGS' && (
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-appleDark">Bireysel İlalarınız</h2>
                                <p className="text-sm text-gray-500 mt-1">Sisteme yüklediğiniz ilanlar ve onay durumları.</p>
                            </div>
                            <Link href="/ilan-ver">
                                <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition">
                                    + Yeni İlan
                                </button>
                            </Link>
                        </div>
                        {loadingListings ? (
                            <div className="text-center py-10 text-gray-400">İlanlar yükleniyor...</div>
                        ) : listings.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
                                <p className="text-gray-500 font-medium">Bireysel vitrinimizde yayınlanmış bir ilanınız yok.</p>
                                <p className="text-sm text-gray-400 mt-2">Dilediğiniz zaman portföyünüzden ücretsiz ilan yayınlayarak geniş kitlelere ulaşabilirsiniz.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {listings.map(listing => (
                                    <div key={listing.id} className="bg-white border text-left border-gray-100 rounded-2xl p-5 shadow-sm">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-bold text-appleDark line-clamp-2">{listing.title}</h3>
                                            <div className="shrink-0 ml-3">
                                                {listing.status === 'PENDING' && <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap">BEKLİYOR</span>}
                                                {listing.status === 'APPROVED' && <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap">YAYINDA</span>}
                                                {listing.status === 'REJECTED' && <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap">RET</span>}
                                            </div>
                                        </div>
                                        <p className="text-2xl font-black text-appleBlue mb-3">
                                            {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(listing.askingPrice)}
                                        </p>
                                        <div className="text-sm text-gray-500 flex flex-col gap-1">
                                            <span className="flex items-center gap-1"><Map size={14} className="text-gray-400" /> {listing.district}, {listing.city}</span>
                                            <span>{listing.netSqm} m2 | {listing.rooms}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* TAB CONTENT: HEATMAP */}
                {activeTab === 'HEATMAP' && (
                    <div className="bg-white min-h-[400px] p-8">
                        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 mb-8 flex items-start gap-4">
                            <Map className="text-rose-600 shrink-0 mt-1" size={24} />
                            <div>
                                <h4 className="text-lg font-bold text-rose-800 mb-1">Bölgesel Isı Haritası (Trendler)</h4>
                                <p className="text-rose-700/80 text-sm">
                                    Portföyünüzde ve sistem genelinde en çok değerleme yapılan, dolayısıyla konut pazarının en hareketli olduğu ilk 10 bölgeyi görüntüleyin.
                                </p>
                            </div>
                        </div>

                        {heatmapData.length > 0 ? (
                            <div className="h-[400px] w-full mt-4 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={heatmapData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f3f4f6" />
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#4b5563', fontSize: 13, fontWeight: 500 }} width={120} />
                                        <Tooltip
                                            cursor={{ fill: '#fff1f2' }}
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                                            labelStyle={{ fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}
                                            formatter={(value: any) => [value + " Değerleme", "Hareketlilik"]}
                                        />
                                        <Bar dataKey="count" fill="#f43f5e" radius={[0, 6, 6, 0]} barSize={24}>
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="h-[300px] w-full flex items-center justify-center bg-gray-50 rounded-2xl border border-gray-100 border-dashed mt-4">
                                <p className="text-gray-400 font-medium">Bölgesel eğilim analizi için henüz yeterli veri yok.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* TAB CONTENT: MY BRAND (WHITE LABEL) */}
                {activeTab === 'MY_BRAND' && (
                    <div className="bg-white min-h-[400px]">
                        {user.subscriptionTier !== "PRO_PLUS" ? (
                            <div className="flex flex-col items-center justify-center p-16 text-center">
                                <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-6">
                                    <Crown size={40} className="text-purple-500 fill-purple-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-appleDark mb-3">White-Label Özelliği PRO PLUS Üyelere Özeldir</h3>
                                <p className="text-gray-500 max-w-lg mb-8">
                                    Evinin Değeri logolarını PDF raporlarınızdan kaldırın ve tamamen kendi emlak ofisi logonuz ile markanızın gücünü gösterin.
                                </p>
                                <Link href="/b2b/pricing" className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 transform hover:-translate-y-1">
                                    <Crown size={20} className="fill-white" /> Paketinizi Yükseltin
                                </Link>
                            </div>
                        ) : (
                            <div className="p-8 max-w-2xl mx-auto">
                                <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6 mb-8 flex items-start gap-4">
                                    <Crown className="text-purple-600 shrink-0 mt-1" size={24} />
                                    <div>
                                        <h4 className="text-lg font-bold text-purple-800 mb-1">Marka Yönetimi (White-Label)</h4>
                                        <p className="text-purple-700/80 text-sm">
                                            Aşağıdaki alana kendi ofisinizin veya markanızın logo URL&apos;sini (bağlantısını) yapıştırın. Bundan sonra üreteceğiniz tüm değerleme raporlarında bu logo görünecektir.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white border text-left border-gray-100 rounded-2xl p-8 shadow-sm border-t-4 border-t-purple-500">
                                    <label className="block text-sm font-bold text-appleDark mb-2">Logo URL (PNG/JPG)</label>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <input type="text" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="https://siteniz.com/logo.png" className="w-full flex-1 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all text-sm font-mono bg-gray-50" />
                                        <button disabled={savingLogo} onClick={handleSaveLogo} className="px-8 py-3 bg-appleDark text-white font-semibold rounded-xl hover:bg-black transition-colors whitespace-nowrap shadow-md hover:shadow-lg disabled:opacity-50">
                                            {savingLogo ? "Kaydediliyor..." : "Görseli Kaydet"}
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-4 leading-relaxed">
                                        <strong>İpucu:</strong> Logo linkini elde etmek için web sitenizdeki profil resminize veya ofis logonuza sağ tıklayıp &quot;Resim Adresini Kopyala&quot; (Copy Image Address) diyebilirsiniz.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {/* TAB CONTENT: SETTINGS */}
                {activeTab === 'SETTINGS' && (
                    <div className="bg-white min-h-[400px] p-8">
                        <div className="max-w-3xl mx-auto">
                            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8 flex items-start gap-4">
                                <Settings className="text-gray-700 shrink-0 mt-1" size={24} />
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-1">Kurumsal Profil & Fatura Bilgileri</h4>
                                    <p className="text-gray-600 text-sm">
                                        Şirketinizin iletişim bilgilerini, vergi kimliğini ve hesap şifrenizi bu alandan güncelleyebilirsiniz.
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleSaveSettings} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Firma Adı</label>
                                        <input type="text" value={settings.companyName} onChange={e => setSettings({ ...settings, companyName: e.target.value })} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-appleBlue outline-none" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Telefon Numarası</label>
                                        <input type="tel" value={settings.phone} onChange={e => setSettings({ ...settings, phone: e.target.value })} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-appleBlue outline-none" placeholder="05XX XXX XX XX" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Vergi Dairesi</label>
                                        <input type="text" value={settings.taxOffice} onChange={e => setSettings({ ...settings, taxOffice: e.target.value })} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-appleBlue outline-none" placeholder="Eskisehir VD" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Vergi Numarası / TC</label>
                                        <input type="text" value={settings.taxNumber} onChange={e => setSettings({ ...settings, taxNumber: e.target.value })} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-appleBlue outline-none" placeholder="1234567890" />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Firma / Fatura Adresi</label>
                                        <textarea value={settings.address} onChange={e => setSettings({ ...settings, address: e.target.value })} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-appleBlue outline-none min-h-[100px]" placeholder="Açık adresiniz..." />
                                    </div>
                                </div>

                                <hr className="border-gray-100 my-8" />

                                <h4 className="text-lg font-bold text-gray-900 mb-4">Şifre Değiştir</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Mevcut Şifre</label>
                                        <input type="password" value={settings.currentPassword} onChange={e => setSettings({ ...settings, currentPassword: e.target.value })} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-appleBlue outline-none" placeholder="Boş bırakırsanız şifre değişmez" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Yeni Şifre</label>
                                        <input type="password" value={settings.newPassword} onChange={e => setSettings({ ...settings, newPassword: e.target.value })} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-appleBlue outline-none" placeholder="En az 6 karakter" />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button disabled={savingSettings} type="submit" className="px-8 py-3 bg-appleDark text-white font-bold rounded-xl hover:bg-black transition-colors shadow-md disabled:opacity-50">
                                        {savingSettings ? "Kaydediliyor..." : "Ayarları Kaydet"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
