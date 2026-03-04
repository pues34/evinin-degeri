"use client";

import Link from "next/link";
import { Hexagon, Map, BookOpen, Building2, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Header() {
    const pathname = usePathname();
    const { data: session } = useSession();

    // Yalnızca public sayfalarda header gösterelim, admin veya login sayfaları hariç
    if (pathname.startsWith("/yonetim-gizli-portal") || pathname.includes("login")) return null;

    return (
        <header className="sticky top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="p-1.5 bg-appleDark text-white rounded-lg group-hover:bg-appleBlue transition-colors">
                            <Hexagon size={20} className="fill-current" />
                        </span>
                        <span className="font-bold text-lg text-appleDark tracking-tight">Evinin Değeri</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/" className={`text-sm font-medium transition-colors ${pathname === '/' ? 'text-appleBlue' : 'text-gray-500 hover:text-appleDark'}`}>
                            Ev Değerleme
                        </Link>
                        <Link href="/yatirim-haritasi" className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${pathname === '/yatirim-haritasi' ? 'text-appleBlue' : 'text-gray-500 hover:text-appleDark'}`}>
                            <Map size={16} /> Isı Haritası
                        </Link>
                        <Link href="/blog" className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${pathname.startsWith('/blog') ? 'text-appleBlue' : 'text-gray-500 hover:text-appleDark'}`}>
                            <BookOpen size={16} /> Emlak Blog
                        </Link>
                        {session ? (
                            <Link href="/b2b/dashboard" className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all flex items-center gap-1.5">
                                <User size={16} /> B2B Panel
                            </Link>
                        ) : (
                            <Link href="/b2b/login" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all flex items-center gap-1.5">
                                <Building2 size={16} /> B2B Giriş
                            </Link>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-3">
                        {session ? (
                            <Link href="/b2b/dashboard" className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold border border-emerald-100">Panel</Link>
                        ) : (
                            <Link href="/b2b/login" className="px-3 py-1.5 bg-blue-50 text-appleBlue rounded-lg text-xs font-bold border border-blue-100">B2B</Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
