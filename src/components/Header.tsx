"use client";

import Link from "next/link";
import { Hexagon, Map, BookOpen, Building2, User, Calculator, LineChart, Target, Bot, CreditCard, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Header() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    if (pathname.startsWith("/yonetim-gizli-portal") || pathname.includes("login")) return null;

    const navLinks = [
        { href: "/", label: "Değerleme", active: pathname === "/" },
        { href: "/kira-hesaplama", label: "Hesaplamalar", icon: <Calculator size={14} />, active: pathname === "/kira-hesaplama" || pathname === "/amortisman-hesaplama" },
        { href: "/konut-fiyat-endeksi", label: "Endeks", icon: <LineChart size={14} />, active: pathname === "/konut-fiyat-endeksi" },
        { href: "/radari", label: "Radar", icon: <Target size={14} className="text-indigo-500" />, active: pathname === "/radari" },
        { href: "/fiyatlandirma", label: "Fiyatlandırma", icon: <CreditCard size={14} />, active: pathname === "/fiyatlandirma" },
        { href: "/yatirim-haritasi", label: "Harita", icon: <Map size={14} />, active: pathname === "/yatirim-haritasi" },
        { href: "/ilanlar", label: "İlanlar", icon: <Building2 size={14} />, active: pathname === "/ilanlar", highlight: true },
        { href: "/blog", label: "Güncesi", icon: <BookOpen size={14} />, active: pathname.startsWith("/blog") },
    ];

    return (
        <>
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
                            {navLinks.map((link) => (
                                <Link key={link.href} href={link.href} className={`text-xs xl:text-sm font-medium flex items-center gap-1 transition-colors ${link.highlight ? `px-2 py-1.5 bg-blue-50 rounded-lg font-bold ${link.active ? 'text-appleBlue' : 'text-appleDark hover:text-appleBlue'}` : link.active ? 'text-appleBlue' : 'text-gray-500 hover:text-appleDark'}`}>
                                    {link.icon} {link.label}
                                </Link>
                            ))}
                            {session ? (
                                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                    <Link href="/profil" className="px-3 py-1.5 bg-appleDark text-white rounded-full text-xs font-medium shadow-sm hover:bg-appleBlue transition-all flex items-center gap-1 whitespace-nowrap">
                                        <User size={14} /> Profilim
                                    </Link>
                                    <Link href="/ai-danisman" className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full text-xs font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-1 whitespace-nowrap">
                                        <Bot size={14} /> Danışman
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                    <Link href="/giris" className="text-xs font-medium text-gray-600 hover:text-appleDark transition-colors px-2">
                                        Giriş Yap
                                    </Link>
                                    <Link href="/kayit" className="px-3 py-1.5 bg-appleBlue text-white rounded-full text-xs font-medium shadow-sm hover:bg-blue-600 transition-all flex items-center gap-1 whitespace-nowrap">
                                        Kayıt Ol
                                    </Link>
                                </div>
                            )}
                        </nav>

                        {/* Mobile Menu Button */}
                        <div className="xl:hidden flex items-center gap-2 shrink-0">
                            {session ? (
                                <Link href="/profil" className="px-3 py-1.5 bg-gray-50 text-appleDark rounded-lg text-xs font-bold border border-gray-200">Profilim</Link>
                            ) : (
                                <Link href="/giris" className="px-3 py-1.5 bg-transparent text-gray-600 rounded-lg text-xs font-bold">Giriş</Link>
                            )}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-xl bg-gray-50 border border-gray-200 text-appleDark hover:bg-gray-100 transition-colors"
                                aria-label="Menü"
                            >
                                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer Menu */}
            {mobileMenuOpen && (
                <div className="xl:hidden fixed inset-0 z-[99] bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
                    <div
                        className="absolute right-0 top-16 w-72 max-h-[calc(100vh-4rem)] bg-white border-l border-gray-100 shadow-2xl overflow-y-auto animate-slide-in-right"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${link.active ? 'bg-appleBlue/10 text-appleBlue' : 'text-gray-700 hover:bg-gray-50'}`}
                                >
                                    {link.icon || <Hexagon size={14} />}
                                    {link.label}
                                </Link>
                            ))}

                            <div className="border-t border-gray-100 my-3 pt-3 space-y-1">
                                {session ? (
                                    <>
                                        <Link href="/profil" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
                                            <User size={14} /> Profilim
                                        </Link>
                                        <Link href="/ai-danisman" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
                                            <Bot size={14} /> AI Danışman
                                        </Link>
                                        <Link href="/ilan-ver" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-appleBlue text-white mt-2">
                                            <Building2 size={14} /> Ücretsiz İlan Ver
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/giris" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
                                            <User size={14} /> Giriş Yap
                                        </Link>
                                        <Link href="/kayit" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold bg-appleBlue text-white">
                                            Kayıt Ol
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
