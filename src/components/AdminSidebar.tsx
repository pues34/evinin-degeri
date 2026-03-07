import Link from "next/link";
import { LogOut, Home, LayoutDashboard, Settings } from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminSidebar() {
    return (
        <aside className="hidden md:flex flex-col w-64 bg-appleDark text-white h-screen fixed top-0 left-0 p-6 z-50">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <Home size={24} /> Evinin Değeri
            </h2>
            <nav className="flex-1 space-y-2">
                <Link href="/yonetim-gizli-portal" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition">
                    <LayoutDashboard size={20} /> Dashboard
                </Link>
                <Link href="/yonetim-gizli-portal/ilanlar" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition">
                    <Home size={20} /> İlan Yönetimi
                </Link>
                <Link href="/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition mt-auto">
                    <Home size={20} /> Siteye Dön
                </Link>
            </nav>
            <button onClick={() => signOut({ callbackUrl: '/b2b/login' })} className="flex items-center gap-3 p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition mt-auto">
                <LogOut size={20} /> Çıkış Yap
            </button>
        </aside>
    );
}
