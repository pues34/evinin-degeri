"use client";

import { Check, X, ShieldCheck, Zap, ArrowRight, Building, User, Target } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function FiyatlandirmaPage() {
    const { data: session } = useSession();

    return (
        <div className="min-h-screen pt-24 pb-20 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-appleDark mb-6 tracking-tight">
                        İhtiyacınıza Uygun <span className="text-appleBlue">PropTech Çözümü</span>
                    </h1>
                    <p className="text-lg text-gray-500">
                        Bireysel yatırımcıların portföylerini yönetmesinden, gayrimenkul ofislerinin satış kapatmasına kadar herkes için bir Evinin Değeri paketi var.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Free Tier */}
                    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col relative">
                        <div className="mb-6">
                            <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-2xl flex items-center justify-center mb-4">
                                <User size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-appleDark">Standart Giriş</h3>
                            <p className="text-gray-500 mt-2 text-sm">Temel özellikleri keşfetmek ve başlangıç portföyünü oluşturmak isteyenler için.</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-4xl font-extrabold text-appleDark">Ücretsiz</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-start gap-3"><Check size={20} className="text-green-500 shrink-0 mt-0.5" /> <span className="text-sm text-gray-700">Yapay Zeka ile Ev Değerleme (Ayda 3 test)</span></li>
                            <li className="flex items-start gap-3"><Check size={20} className="text-green-500 shrink-0 mt-0.5" /> <span className="text-sm text-gray-700">Kira ve Amortisman Hesaplama Aracı</span></li>
                            <li className="flex items-start gap-3"><Check size={20} className="text-green-500 shrink-0 mt-0.5" /> <span className="text-sm text-gray-700">Temel Portföy Takibi (En fazla 3 Ev)</span></li>
                            <li className="flex items-start gap-3 opacity-50"><X size={20} className="text-red-400 shrink-0 mt-0.5" /> <span className="text-sm text-gray-500">Fırsat Radarına (Kelepir Evler) Erişim</span></li>
                            <li className="flex items-start gap-3 opacity-50"><X size={20} className="text-red-400 shrink-0 mt-0.5" /> <span className="text-sm text-gray-500">Bölgesel Yatırım Isı Haritası</span></li>
                        </ul>
                        <Link href="/kayit" className="w-full">
                            <button className="w-full py-4 rounded-xl border-2 border-gray-200 text-appleDark font-bold hover:border-gray-300 hover:bg-gray-50 transition-colors">
                                Ücretsiz Kayıt Ol
                            </button>
                        </Link>
                    </div>

                    {/* Premium Tier */}
                    <div className="bg-gradient-to-b from-blue-900 to-indigo-900 rounded-[32px] p-8 shadow-2xl flex flex-col relative transform md:-translate-y-4 border border-blue-800">
                        <div className="absolute top-0 right-10 transform -translate-y-1/2">
                            <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold uppercase py-1 px-3 rounded-full shadow-lg">En Çok Tercih Edilen</span>
                        </div>
                        <div className="mb-6">
                            <div className="w-12 h-12 bg-blue-800/50 text-blue-300 rounded-2xl flex items-center justify-center mb-4 border border-blue-700">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Premium Yatırımcı</h3>
                            <p className="text-blue-200 mt-2 text-sm">Piyasanın önünde olmak ve kelepir fırsatları anında yakalamak isteyen alıcılar için.</p>
                        </div>
                        <div className="mb-8">
                            <div className="flex items-end gap-1">
                                <span className="text-4xl font-extrabold text-white">₺299</span>
                                <span className="text-blue-300 mb-1">/ ay</span>
                            </div>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-start gap-3"><Check size={20} className="text-blue-400 shrink-0 mt-0.5" /> <span className="text-sm text-white">Sınırsız Yapay Zeka Ev Değerlemesi</span></li>
                            <li className="flex items-start gap-3"><Check size={20} className="text-blue-400 shrink-0 mt-0.5" /> <span className="text-sm text-white">Sınırsız Portföy Ekleme ve Takip</span></li>
                            <li className="flex items-start gap-3"><Check size={20} className="text-white shrink-0 mt-0.5 bg-blue-500 rounded-full p-0.5" /> <span className="text-sm text-white font-medium">Yapay Zeka Fırsat Radarı (Canlı Erişim)</span></li>
                            <li className="flex items-start gap-3"><Check size={20} className="text-blue-400 shrink-0 mt-0.5" /> <span className="text-sm text-white">Bölgesel Değer Isı Haritaları</span></li>
                            <li className="flex items-start gap-3"><Check size={20} className="text-blue-400 shrink-0 mt-0.5" /> <span className="text-sm text-white">Yapay Zeka Danışman (Emlak Botu) Sınırsız Sorular</span></li>
                        </ul>
                        <Link href={session ? "/radari" : "/kayit"} className="w-full">
                            <button className="w-full py-4 rounded-xl bg-white text-blue-900 font-bold hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-2">
                                Premium&apos;a Geç <ArrowRight size={18} />
                            </button>
                        </Link>
                    </div>

                    {/* B2B Tier */}
                    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col relative">
                        <div className="mb-6">
                            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                                <Building size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-appleDark">Kurumsal (B2B)</h3>
                            <p className="text-gray-500 mt-2 text-sm">Emlak profesyonelleri, değerleme uzmanları ve inşaat firmaları için API destekli çözüm.</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-3xl font-extrabold text-appleDark">Özel Fiyatlandırma</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-start gap-3"><Check size={20} className="text-emerald-500 shrink-0 mt-0.5" /> <span className="text-sm text-gray-700"><strong>White-Label Değerleme Aracı (Kendi Web Sitenize Ekleyin)</strong></span></li>
                            <li className="flex items-start gap-3"><Check size={20} className="text-emerald-500 shrink-0 mt-0.5" /> <span className="text-sm text-gray-700">Müşteri Adayı (Lead) Toplama Formları</span></li>
                            <li className="flex items-start gap-3"><Check size={20} className="text-emerald-500 shrink-0 mt-0.5" /> <span className="text-sm text-gray-700">Otomatik Instagram/Sosyal Medya Gönderisi Üretici</span></li>
                            <li className="flex items-start gap-3"><Check size={20} className="text-emerald-500 shrink-0 mt-0.5" /> <span className="text-sm text-gray-700">10 Sayfalık PDF Ekspertiz Raporu Baskısı</span></li>
                            <li className="flex items-start gap-3"><Check size={20} className="text-emerald-500 shrink-0 mt-0.5" /> <span className="text-sm text-gray-700">Özel Müşteri Portföy Paneli (CRM)</span></li>
                        </ul>
                        <Link href="/b2b" className="w-full">
                            <button className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors">
                                İşletmeler İçin İncele
                            </button>
                        </Link>
                    </div>

                </div>

                {/* FAQ or Trust badges */}
                <div className="mt-20 border-t border-gray-100 pt-16 flex flex-col items-center">
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-widest mb-8">Güvenli Ödeme Altyapısı</p>
                    <div className="flex gap-8 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
                        <div className="flex items-center gap-2 font-bold text-lg"><ShieldCheck className="text-green-500" /> SSL Güvencesi</div>
                        <div className="font-bold text-xl italic text-blue-800 tracking-tighter">Iyzico</div>
                        <div className="font-bold text-xl text-blue-600">Mastercard</div>
                        <div className="font-bold text-xl text-orange-500 italic">Visa</div>
                    </div>
                </div>

            </div>
        </div>
    );
}
