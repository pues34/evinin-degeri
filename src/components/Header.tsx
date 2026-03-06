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
        <header className="sticky top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 gap-4 lg:gap-8">
                    <Link href="/" className="flex items-center gap-2 group shrink-0">
                        <span className="p-1.5 bg-appleDark text-white rounded-lg group-hover:bg-appleBlue transition-colors">
                            <Hexagon size={20} className="fill-current" />
                        </span>
                        <span className="font-bold text-lg text-appleDark tracking-tight">Evinin Değeri</span>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-4 xl:gap-8 flex-1 justify-center">
                        <Link href="/" className={`text-sm font-medium transition-colors ${pathname === '/' ? 'text-appleBlue' : 'text-gray-500 hover:text-appleDark'}`}>
                            Ev Değerleme
                        </Link>
                        <Link href="/kira-hesaplama" className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${pathname === '/kira-hesaplama' || pathname === '/amortisman-hesaplama' ? 'text-appleBlue' : 'text-gray-500 hover:text-appleDark'}`}>
                            <Calculator size={16} /> Hesaplamalar
                        </Link>
                        <Link href="/konut-fiyat-endeksi" className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${pathname === '/konut-fiyat-endeksi' ? 'text-appleBlue' : 'text-gray-500 hover:text-appleDark'}`}>
                            <LineChart size={16} /> Fiyat Endeksi
                        </Link>
                        <Link href="/radari" className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${pathname === '/radari' ? 'text-appleBlue' : 'text-gray-500 hover:text-appleDark'}`}>
                            <Target size={16} className="text-indigo-500" /> Fırsat Radarı
                        </Link>
                        <Link href="/fiyatlandirma" className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${pathname === '/fiyatlandirma' ? 'text-appleBlue' : 'text-gray-500 hover:text-orange-500'}`}>
                            <CreditCard size={16} /> Paketler
                        </Link>
                        <Link href="/yatirim-haritasi" className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${pathname === '/yatirim-haritasi' ? 'text-appleBlue' : 'text-gray-500 hover:text-appleDark'}`}>
                            <Map size={16} /> Isı Haritası
                        </Link>
                        <Link href="/blog" className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${pathname.startsWith('/blog') ? 'text-appleBlue' : 'text-gray-500 hover:text-appleDark'}`}>
                            <BookOpen size={16} /> Emlak Blog
                        </Link>
                        {session ? (
                            <div className="flex items-center gap-2 shrink-0">
                                {session.user?.role === "realtor" || session.user?.role === "admin" ? (
                                    <Link href="/b2b/dashboard" className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 whitespace-nowrap">
                                        <Building2 size={16} /> B2B Panel
                                    </Link>
                                ) : (
                                    <>
                                        <Link href="/portfoy" className="px-4 py-2 bg-appleDark text-white rounded-full text-sm font-medium shadow-sm hover:bg-appleBlue transition-all flex items-center gap-1.5 whitespace-nowrap">
                                            <User size={16} /> Portföyüm
                                        </Link>
                                        <Link href="/ai-danisman" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 whitespace-nowrap">
                                            <Bot size={16} /> AI Danışman
                                        </Link>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 shrink-0">
                                <Link href="/giris" className="text-sm font-medium text-gray-600 hover:text-appleDark transition-colors px-2">
                                    Giriş Yap
                                </Link>
                                <Link href="/kayit" className="px-4 py-2 border border-gray-200 text-gray-700 bg-white rounded-full text-sm font-medium shadow-sm hover:bg-gray-50 transition-all flex items-center gap-1.5 whitespace-nowrap">
                                    Kayıt Ol
                                </Link>
                                <Link href="/b2b" className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 whitespace-nowrap">
                                    Kurumsal
                                </Link>
                            </div>
                        )}
                    </nav>

                    {/* Mobile Menu Button - Temporarily just showing auth directly or panel */}
                    <div className="lg:hidden flex items-center gap-3 shrink-0">
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
