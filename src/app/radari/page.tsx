"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, MapPin, Tag, TrendingDown, Target, Zap, AlertCircle, Hexagon } from "lucide-react";

export default function FirsatRadariPage() {
    const { data: session } = useSession();

    // Mock Data for the MVP. In Phase 3.5 these will come from a scraper or actual API
    const mockListings = [
        {
            id: "1",
            title: "Sahibinden Satılık 3+1 Masrafsız Daire",
            city: "İstanbul",
            district: "Kadıköy",
            neighborhood: "Suadiye",
            askingPrice: 15500000,
            ourValuation: 17200000,
            discount: 10.98,
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "2",
            title: "Metrobüse 5 dk, Fırsat 2+1",
            city: "İstanbul",
            district: "Şişli",
            neighborhood: "Mecidiyeköy",
            askingPrice: 7800000,
            ourValuation: 8650000,
            discount: 10.89,
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "3",
            title: "Acil Satılık Deniz Manzaralı Lüks Rezidans",
            city: "İstanbul",
            district: "Beşiktaş",
            neighborhood: "Levent",
            askingPrice: 22000000,
            ourValuation: 24500000,
            discount: 11.36,
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
        }
    ];

    const isPremium = session?.user?.isPremium;

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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                    {mockListings.map((listing) => (
                        <div key={listing.id} className="bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition group flex flex-col">
                            <div className="h-48 bg-gray-200 relative overflow-hidden">
                                <img src={listing.image} alt="Emlak Görseli" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded-lg font-bold text-sm flex items-center shadow-md">
                                    <TrendingDown size={16} className="mr-1" /> %{listing.discount} İskontolu
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
                                            {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(listing.ourValuation)}
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full mt-6 bg-appleDark text-white py-3 rounded-xl font-bold hover:bg-appleBlue transition">
                                    İlan Detayına Git
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </main>

            <Footer />
        </div>
    );
}
