"use client";

import { useSession } from "next-auth/react";
import nextDynamic from 'next/dynamic';
import { Map, Home, TrendingUp, AlertTriangle, ArrowRight, UserPlus, LogIn, Lock, Sparkles, MapPin } from 'lucide-react';
import Link from 'next/link';

const HeatmapDisplay = nextDynamic(() => import('@/components/HeatmapDisplay'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 min-h-[500px] rounded-3xl border border-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-appleBlue mb-4"></div>
            <p className="text-gray-500 font-medium tracking-wide">Yatırım Haritası Hazırlanıyor...</p>
        </div>
    )
});

export default function HeatmapClient() {
    const { data: session } = useSession();
    const isPremium = session?.user?.isPremium === true || session?.user?.isPro === true;

    return (
        <div className="min-h-screen bg-appleGray pt-24 pb-12 px-4">
            <div className="max-w-6xl mx-auto space-y-8 relative">

                <div className="flex justify-start mb-8">
                    <Link href="/">
                        <button className="flex items-center px-5 py-2.5 bg-appleBlue text-white rounded-xl hover:bg-blue-600 transition-colors shadow-sm font-medium text-sm">
                            <Home size={18} className="mr-2" />
                            Evim Ne Kadar Eder?
                        </button>
                    </Link>
                </div>

                <div className="mb-8 pt-4">
                    <h1 className="text-3xl font-bold text-appleDark mb-3 flex items-center">
                        <Map size={32} className="mr-3 text-appleBlue" />
                        İstanbul Konut Isı Haritası
                    </h1>
                    <p className="text-appleLightGray max-w-3xl text-lg">
                        Evinin Değeri yapay zekası ile hesaplanan on binlerce gayrimenkul değerleme verisine dayanarak oluşturulmuş, anlık piyasa dinamiklerini yansıtan bölgesel değer yoğunluk haritası. <span className="text-appleBlue font-medium">Kırmızı</span> alanlar yüksek ortalama birim fiyatlarını (m²), <span className="text-green-600 font-medium">Yeşil</span> alanlar ise nispeten uygun fiyatlı bölgeleri temsil eder.
                    </p>
                </div>

                {/* Premium Blocker Overlay */}
                {!isPremium && (
                    <div className="absolute inset-0 z-20 mt-[230px] rounded-3xl overflow-hidden">
                        <div className="absolute inset-0 bg-white/70 backdrop-blur-xl flex flex-col items-center justify-center p-4">
                            <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-2xl max-w-4xl w-full text-center border border-gray-100 relative overflow-hidden">
                                {/* Decorative Background Elements */}
                                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-x-1/2 -translate-y-1/2"></div>
                                <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-x-1/2 translate-y-1/2"></div>

                                <div className="relative z-10">
                                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-green-100 text-appleBlue rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner border border-white">
                                        <MapPin size={48} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-extrabold text-appleDark mb-6 tracking-tight">Mikro-Bölge<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-appleBlue to-green-600">Yatırım Haritası</span></h2>
                                    <p className="text-gray-500 mb-10 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                                        Mahalle mahalle, sokak sokak emlak piyasasının kalp atışını izleyin. İstanbul&apos;da değerlenen ve değer kaybeden lokasyonları anında keşfedin.
                                    </p>

                                    {/* How it works section */}
                                    <div className="bg-gray-50 rounded-2xl p-8 mb-10 border border-gray-100 text-left">
                                        <h3 className="font-bold text-appleDark text-xl mb-6 text-center">Isı Haritası Size Ne Kazandırır?</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="flex gap-4">
                                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center shrink-0">
                                                    <TrendingUp className="text-blue-500" size={24} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-appleDark mb-1">Gelişen Bölgeleri Keşfedin</h4>
                                                    <p className="text-gray-500 text-sm">Fiyatların henüz artmadığı ancak hızlı bir yükseliş trendine giren yeşil bölgeleri (sıcak lokasyonları) haritada net olarak görün.</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center shrink-0">
                                                    <AlertTriangle className="text-amber-500" size={24} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-appleDark mb-1">Şişirilmiş Fiyatlardan Kaçının</h4>
                                                    <p className="text-gray-500 text-sm">Kırmızıya dönmüş ve piyasa doyumuna ulaşmış aşırı pahalı mikro bölgeleri görerek yanlış yatırımlardan zamanında kaçının.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {!session ? (
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                            <Link href="/kayit" className="bg-appleDark text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-appleBlue hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2">
                                                <UserPlus size={20} /> Ücretsiz Kayıt Ol
                                            </Link>
                                            <Link href="/giris" className="bg-white text-appleDark border border-gray-200 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition shadow-sm flex items-center justify-center gap-2">
                                                <LogIn size={20} /> Giriş Yap
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center mt-4">
                                            <Link href="/fiyatlandirma" className="inline-flex items-center justify-center gap-2 w-full md:w-auto bg-gradient-to-r from-amber-500 to-amber-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:from-amber-600 hover:to-amber-700 hover:scale-105 transition-all shadow-lg hover:shadow-xl shadow-amber-500/20">
                                                <Sparkles size={20} className="text-amber-100" /> Premium Isı Haritasını Aç (299₺)
                                            </Link>
                                            <p className="text-gray-400 text-sm mt-4 font-medium max-w-lg text-center gap-1 flex items-center justify-center">
                                                <Lock size={14} /> Sadece Premium yatırımcılar bu ekrana erişebilir.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                <div className={`transition-all duration-500 ${!isPremium ? 'opacity-20 pointer-events-none filter blur-sm' : ''}`}>
                    {/* Info Bar */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 relative z-10">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                            <TrendingUp className="text-appleBlue shrink-0" size={24} />
                            <div>
                                <h3 className="font-bold text-appleDark mb-1">Dinamik Veri Akışı</h3>
                                <p className="text-sm text-gray-500">Her saniye yapılan değerlemeler algoritmayı eğitir. Haritadaki dairenin büyüklüğü o bölgedeki pazar canlılığını, rengi ise pahalılığı belirtir.</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                            <AlertTriangle className="text-amber-500 shrink-0" size={24} />
                            <div>
                                <h3 className="font-bold text-appleDark mb-1">Bilgilendirme</h3>
                                <p className="text-sm text-gray-500">Bu haritadaki fiyatlar bir öneri niteliği taşımaz. Yapay zeka ile son kullanıcı sorgularının sadece bölgesel yansımasıdır.</p>
                            </div>
                        </div>
                    </div>

                    {/* Map Wrapper */}
                    <div className="relative z-0 shadow-apple overflow-hidden rounded-3xl border border-gray-100 bg-white">
                        <HeatmapDisplay />
                    </div>
                </div>

            </div>
        </div>
    );
}
