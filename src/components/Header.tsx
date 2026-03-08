"use client";

import Link from "next/link";
import { Hexagon, Map, BookOpen, Building2, User, Calculator, LineChart, Target, Bot, CreditCard } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Header() {
    const pathname = usePathname();
    const { data: session } = useSession();

    // Yalnızca public sayfalarda header gösterelim, admin veya login sayfaları hariç
    if (pathname.startsWith("/yonetim-gizli-portal") || pathname.includes("login")) return null;

    return (
        <header className="sticky top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-[100]">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 gap-4 lg:gap-8">
                    <Link href="/" className="flex items-center gap-2.5 group shrink-0 py-1 transition-all">
                        <div className="relative">
                            <div className="absolute inset-0 bg-appleBlue blur-[8px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                            <span className="relative flex items-center justify-center p-2 bg-gradient-to-br from-appleDark to-indigo-900 text-white rounded-[14px] shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300 border border-white/20">
                                <Hexagon size={22} className="fill-current" />
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-extrabold text-[1.35rem] leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-appleDark to-indigo-800">
                                Evin Değeri
                            </span>
                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mt-0.5 ml-0.5">Yapay Zeka</span>
                        </div>
                    </Link>

                    <nav className="hidden xl:flex items-center gap-2 2xl:gap-6 flex-1 justify-center overflow-x-auto no-scrollbar whitespace-nowrap">
                        <Link href="/" className={`text-xs xl:text-sm font-medium transition-colors ${pathname === '/' ? 'text-appleBlue' : 'text-gray-500 hover:text-appleDark'}`}>
                            Değerleme
                        </Link>
                        <Link href="/kira-hesaplama" className={`text-xs xl:text-sm font-medium flex items-center gap-1 transition-colors ${pathname === '/kira-hesaplama' || pathname === '/amortisman-hesaplama' ? 'text-appleBlue' : 'text-gray-500 hover:text-appleDark'}`}>
                            <Calculator size={14} /> Hesaplamalar
                        </Link>
                        <Link href="/konut-fiyat-endeksi" className={`text-xs xl:text-sm font-medium flex items-center gap-1 transition-colors ${pathname === '/konut-fiyat-endeksi' ? 'text-appleBlue' : 'text-gray-500 hover:text-appleDark'}`}>
                            <LineChart size={14} /> Endeks
                        </Link>
                        <Link href="/radari" className={`text-xs xl:text-sm font-medium flex items-center gap-1 transition-colors ${pathname === '/radari' ? 'text-appleBlue' : 'text-gray-500 hover:text-appleDark'}`}>
                            <Target size={14} className="text-indigo-500" /> Radar
                        </Link>
                        <Link href="/fiyatlandirma" className={`text-xs xl:text-sm font-medium flex items-center gap-1 transition-colors ${pathname === '/fiyatlandirma' ? 'text-appleBlue' : 'text-gray-500 hover:text-orange-500'}`}>
                            <CreditCard size={14} /> Paketler
                        </Link>
                        <Link href="/yatirim-haritasi" className={`text-xs xl:text-sm font-medium flex items-center gap-1 transition-colors ${pathname === '/yatirim-haritasi' ? 'text-appleBlue' : 'text-gray-500 hover:text-appleDark'}`}>
                            <Map size={14} /> Harita
                        </Link>
                        <Link href="/ilanlar" className={`text-xs xl:text-sm font-bold flex items-center px-2 py-1.5 bg-blue-50 rounded-lg gap-1 transition-colors ${pathname === '/ilanlar' ? 'text-appleBlue' : 'text-appleDark hover:text-appleBlue'}`}>
                            <Building2 size={14} /> İlanlar
                        </Link>
                        <Link href="/blog" className={`text-xs xl:text-sm font-medium flex items-center gap-1 transition-colors ${pathname.startsWith('/blog') ? 'text-appleBlue' : 'text-gray-500 hover:text-appleDark'}`}>
                            <BookOpen size={14} /> Güncesi
                        </Link>
                        {session ? (
                            <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                {session.user?.role === "realtor" || session.user?.role === "admin" ? (
                                    <Link href="/b2b/dashboard" className="px-3 xl:px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-xs font-medium shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 whitespace-nowrap">
                                        <Building2 size={14} /> B2B Panel
                                    </Link>
                                ) : (
                                    <>
                                        <Link href="/portfoy" className="px-3 py-1.5 bg-appleDark text-white rounded-full text-xs font-medium shadow-sm hover:bg-appleBlue transition-all flex items-center gap-1 whitespace-nowrap">
                                            <User size={14} /> Portföyüm
                                        </Link>
                                        <Link href="/bireysel/profil" className="px-3 py-1.5 bg-white text-appleDark border border-gray-200 rounded-full text-xs font-medium shadow-sm hover:bg-gray-50 transition-all flex items-center gap-1 whitespace-nowrap">
                                            Profilim
                                        </Link>
                                        <Link href="/ai-danisman" className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full text-xs font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-1 whitespace-nowrap">
                                            <Bot size={14} /> Danışman
                                        </Link>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                <Link href="/giris" className="text-xs font-medium text-gray-600 hover:text-appleDark transition-colors px-2">
                                    Giriş Yap
                                </Link>
                                <Link href="/kayit" className="px-3 py-1.5 border border-gray-200 text-gray-700 bg-white rounded-full text-xs font-medium shadow-sm hover:bg-gray-50 transition-all flex items-center gap-1 whitespace-nowrap">
                                    Kayıt Ol
                                </Link>
                                <Link href="/b2b" className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-xs font-medium shadow-sm hover:shadow-md transition-all flex items-center gap-1 whitespace-nowrap">
                                    Kurumsal
                                </Link>
                            </div>
                        )}
                    </nav>

                    {/* Mobile/Tablet Menu Button - Shows when width < xl */}
                    <div className="xl:hidden flex items-center gap-2 shrink-0">
                        {session ? (
                            <Link href={session.user?.role === 'user' ? '/portfoy' : '/b2b/dashboard'} className="px-3 py-1.5 bg-gray-50 text-appleDark rounded-lg text-xs font-bold border border-gray-200">Panel</Link>
                        ) : (
                            <div className="flex gap-2">
                                <Link href="/giris" className="px-3 py-1.5 bg-transparent text-gray-600 rounded-lg text-xs font-bold">Giriş</Link>
                                <Link href="/kayit" className="px-3 py-1.5 bg-blue-50 text-appleBlue rounded-lg text-xs font-bold border border-blue-100">Kayıt Ol</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
