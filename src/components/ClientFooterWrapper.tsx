"use client";
import { usePathname } from "next/navigation";

export default function ClientFooterWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Yalnızca public sayfalarda footer gösterelim, admin veya dashboard sayfaları hariç
    if (pathname.startsWith("/yonetim-gizli-portal") || pathname.includes("login")) {
        return null;
    }

    return <>{children}</>;
}
