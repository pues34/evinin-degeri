"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, MapPin, Tag, TrendingDown, Target, Zap, AlertCircle, Hexagon, Loader2 } from "lucide-react";

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
            <Header />

            <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl relative">

                {/* Premium Blocker Overlay for non-logged or free users */}
                {!isPremium && (
                    <div className="absolute inset-0 z-20 bg-white/70 backdrop-blur-md flex flex-col items-center justify-center p-4">
                        <div className="bg-white p-10 rounded-[32px] shadow-2xl max-w-xl text-center border border-indigo-100">
                            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Target size={40} />
                            </div>
                            <h2 className="text-3xl font-extrabold text-appleDark mb-4">Bu Bölüm Sadece Premium Yatırımcılara Özeldir!</h2>
                            <p className="text-gray-500 mb-8 text-lg">Yapay Zeka algoritmamız her gün sahibinden.com vb. portallardaki binlerce ilanı tarar ve <strong>değerinin %10 altında satılan</strong> fırsat evlerini bulup bu radara taşır.</p>

                            <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-6 rounded-2xl mb-8 flex items-center shadow-md">
                                <Zap className="mr-4 shrink-0" size={32} />
                                <p className="text-sm font-bold text-left">Her 100 ilandan sadece 2 tanesi piyasa değerinin altında oluyor. Fırsatları başkalarından önce yakalamak için Premium&apos;a geçin.</p>
                            </div>

                            <button className="w-full bg-appleDark text-white py-4 rounded-xl font-bold text-lg hover:bg-appleBlue transition shadow-sm">
                                Premium Üyeliğe Yükselt (Aylık 299 TL)
                            </button>
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

            <Footer />
        </div>
    );
}
