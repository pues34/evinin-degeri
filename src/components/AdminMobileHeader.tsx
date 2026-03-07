import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

export default function AdminMobileHeader() {
    return (
        <div className="md:hidden flex items-center justify-between p-4 bg-appleDark text-white z-40 relative">
            <div className="flex items-center gap-2">
                <LayoutDashboard size={20} />
                <span className="font-bold">Evinin Değeri Admin</span>
            </div>
            <Link href="/yonetim-gizli-portal" className="text-xs bg-white text-appleDark px-3 py-1.5 rounded-lg font-bold">
                Masaüstü
            </Link>
        </div>
    );
}
