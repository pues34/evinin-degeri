"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Search, MapPin, Tag, TrendingDown, Target, Zap, AlertCircle, Hexagon, Loader2, UserPlus, LogIn, ArrowRight, Database, BarChart3, Building2 } from "lucide-react";
import Link from "next/link";

export default function FirsatRadariPage() {
    const { data: session } = useSession();
    const [listings, setListings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const isPremium = session?.user?.isPremium;

    useEffect(() => {
        if (isPremium) {
            fetch("/api/radar/public")
                .then(res => res.json())
                .then(data => {
                    setListings(Array.isArray(data) ? data : []);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Failed to load radar data", err);
                    setLoading(false);
                });
        } else {
            setLoading(false); // If not premium, no need to show loading, they just see the blocker
        }
    }, [isPremium]);

    return (
        <div className="min-h-screen flex flex-col pt-24 bg-gray-50">

            <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl relative">

                {/* Premium / Guest Blocker Overlay (Landing Page) */}
                {!isPremium && (
                    <div className="absolute inset-0 z-20 bg-white/70 backdrop-blur-xl flex flex-col items-center justify-center p-4 rounded-3xl overflow-y-auto">
                        <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-2xl max-w-4xl w-full text-center border border-gray-100 my-auto relative overflow-hidden">
                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-x-1/2 -translate-y-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-x-1/2 translate-y-1/2"></div>

                            <div className="relative z-10">
                                <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-red-100 text-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner border border-white">
                                    <Target size={48} />
                                </div>
                                <h2 className="text-4xl md:text-5xl font-extrabold text-appleDark mb-6 tracking-tight">Emlak Piyasasının<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Gizli Fırsatları Artık Elinizde</span></h2>
                                <p className="text-gray-500 mb-10 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                                    Fırsat Radarı, piyasa değerinin <strong>en az %10 altında</strong> satılan gayrimenkulleri sizin için saniyeler içinde tespit eder ve listeler. Kelepir ilanları başkalarından önce yakalayın.
                                </p>

                                {/* How it works section */}
                                <div className="bg-gray-50 rounded-2xl p-8 mb-10 border border-gray-100 text-left">
                                    <h3 className="font-bold text-appleDark text-xl mb-6 text-center">Bu İlanlar Nereden Geliyor?</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center shrink-0">
                                                <Database className="text-indigo-500" size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-appleDark mb-1">Yapay Zeka Taraması</h4>
                                                <p className="text-gray-500 text-sm">Algoritmamız her gün milyonlarca ilanı tarar. Kendi hesapladığı gerçek değerin (Evinin Değeri) altına düşen ilanları otomatik yakalar.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center shrink-0">
                                                <Building2 className="text-orange-500" size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-appleDark mb-1">Kurumsal B2B Ağı</h4>
                                                <p className="text-gray-500 text-sm">Sistemimizi kullanan yüzlerce emlak ofisi ve değerleme uzmanının girdiği &quot;Acil Satılık&quot; veya &quot;Kelepir&quot; özel portföyler anında radara düşer.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-6 rounded-2xl mb-10 flex items-center justify-center shadow-md max-w-2xl mx-auto">
                                    <Zap className="mr-4 shrink-0" size={32} />
                                    <p className="text-sm md:text-base font-medium text-left">Her 100 ilandan sadece 2 tanesi piyasa değerinin altında oluyor. Fırsatları kaçırmamak için hemen üye olun.</p>
                                </div>

                                {!session ? (
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Link href="/kayit" className="bg-appleDark text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-appleBlue hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2">
                                            <UserPlus size={20} /> Kayıt Ol
                                        </Link>
                                        <Link href="/giris" className="bg-white text-appleDark border border-gray-200 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition shadow-sm flex items-center justify-center gap-2">
                                            <LogIn size={20} /> Giriş Yap
                                        </Link>
                                    </div>
                                ) : (
                                    <Link href="/fiyatlandirma" className="inline-flex items-center justify-center gap-2 w-full md:w-auto bg-appleDark text-white px-12 py-4 rounded-xl font-bold text-lg hover:bg-appleBlue hover:scale-105 transition-all shadow-lg hover:shadow-xl">
                                        Premium Paketleri İncele <ArrowRight size={20} />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="text-center mb-12 relative z-10">
                    <h1 className="text-4xl font-extrabold text-appleDark mb-4 flex items-center justify-center gap-3">
                        <Target className="text-indigo-600" size={36} /> Yapay Zeka Yatırım Radarı
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Piyasada gerçek değerinin <strong>altında (iskontolu)</strong> satılan fırsat gayrimenkulleri keşfedin.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-8 relative z-10">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="İstanbul, Kadıköy, Satılık Daire..."
                            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-appleDark outline-none font-medium text-lg"
                        />
                    </div>
                </div>

                {/* Radar Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-24 relative z-10 w-full">
                        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
                    </div>
                ) : listings.length === 0 && isPremium ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm relative z-10">
                        <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900">Şu An Fırsat Bulunamadı</h3>
                        <p className="text-gray-500 mt-2">Yapay zekamız sürekli piyasayı tarıyor. Daha sonra tekrar kontrol edin.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                        {listings.map((listing) => (
                            <div key={listing.id} className="bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition group flex flex-col">
                                <div className="h-48 bg-gray-200 relative overflow-hidden">
                                    <img src={listing.imageUrl || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"} alt="Emlak Görseli" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded-lg font-bold text-sm flex items-center shadow-md">
                                        <TrendingDown size={16} className="mr-1" /> %{Number(listing.discount).toFixed(1)} İskontolu
                                    </div>
                                </div>
                                <div className="p-6 flex-grow flex flex-col">
                                    <h3 className="font-bold text-appleDark text-lg mb-2 line-clamp-2">{listing.title}</h3>
                                    <p className="text-sm text-gray-500 flex items-center mb-4">
                                        <MapPin size={16} className="mr-1" /> {listing.district}, {listing.city}
                                    </p>

                                    <div className="mt-auto space-y-4">
                                        <div className="bg-gray-50 p-4 rounded-xl flex justify-between items-center border border-gray-100">
                                            <div className="text-gray-500 text-sm">İstenen Fiyat:</div>
                                            <div className="font-bold text-appleDark text-lg">
                                                {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(listing.askingPrice)}
                                            </div>
                                        </div>
                                        <div className="bg-green-50 p-4 rounded-xl flex justify-between items-center border border-green-100 shadow-inner">
                                            <div className="text-green-800 text-sm font-bold flex items-center">
                                                <Hexagon size={16} className="mr-1 fill-current" /> Bizim Değerleme:
                                            </div>
                                            <div className="font-extrabold text-green-700 text-xl">
                                                {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(listing.estimatedValue)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
