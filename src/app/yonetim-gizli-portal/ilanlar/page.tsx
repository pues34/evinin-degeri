"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import AdminMobileHeader from "@/components/AdminMobileHeader";
import { Loader2, CheckCircle, XCircle, Eye, AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function AdminIlanlarPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [listings, setListings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/b2b/login?callbackUrl=/yonetim-gizli-portal");
        } else if (status === "authenticated" && session?.user?.role !== "admin") {
            router.push("/");
        } else if (status === "authenticated" && session?.user?.role === "admin") {
            fetchListings();
        }
    }, [status, session, router]);

    const fetchListings = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/listings?mode=admin");
            const data = await res.json();
            if (res.ok) {
                setListings(Array.isArray(data) ? data : []);
            }
        } catch (error) {
            console.error("Listing load error", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (id: string, newStatus: string) => {
        if (!confirm(`Bu ilanı ${newStatus === 'APPROVED' ? 'onaylamak' : 'reddetmek'} istediğinize emin misiniz?`)) return;

        setActionLoading(id);
        try {
            const res = await fetch(`/api/admin/listings/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                setListings(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
            } else {
                alert("İşlem başarısız.");
            }
        } catch (err) {
            alert("Bağlantı hatası.");
        } finally {
            setActionLoading(null);
        }
    };

    if (status === "loading" || loading) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-appleBlue" /></div>;
    }

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <AdminSidebar />

            <div className="flex-1 flex flex-col md:ml-64">
                <AdminMobileHeader />

                <main className="flex-1 p-4 md:p-8">
                    <div className="max-w-6xl mx-auto space-y-6">

                        <div className="flex justify-between items-end">
                            <div>
                                <h1 className="text-3xl font-bold text-appleDark">İlan Yönetimi</h1>
                                <p className="text-gray-500">Kullanıcıların ve Kurumsalların verdikleri ilanları onaylayın veya reddedin.</p>
                            </div>
                            <button onClick={fetchListings} className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 shadow-sm">
                                <RefreshCw size={16} /> Yenile
                            </button>
                        </div>

                        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50/50 border-b border-gray-100">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">İlan & Sahibi</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fiyat / Değerleme</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Durum</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tarih</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">İşlem</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {listings.length === 0 ? (
                                            <tr><td colSpan={5} className="p-8 text-center text-gray-500">Kayıtlı ilan bulunamadı.</td></tr>
                                        ) : listings.map((l) => (
                                            <tr key={l.id} className="hover:bg-gray-50/30 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-appleDark flex items-center gap-2">
                                                        {l.title.substring(0, 40)}{l.title.length > 40 && "..."}
                                                    </div>
                                                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                                                        {l.ownerType === "USER" ? l.user?.name : l.realtor?.companyName}
                                                        <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] uppercase">{l.ownerType}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-appleDark">{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(l.askingPrice)}</div>
                                                    <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                                                        AI: {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(l.estimatedValue)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {l.status === 'PENDING' && <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800"><AlertCircle size={12} className="mr-1" /> Bekliyor</span>}
                                                    {l.status === 'APPROVED' && <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle size={12} className="mr-1" /> Onaylı (Yayında)</span>}
                                                    {l.status === 'REJECTED' && <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle size={12} className="mr-1" /> Reddedildi</span>}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {new Date(l.createdAt).toLocaleDateString('tr-TR')}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Link href={`/ilanlar/${l.id}`} target="_blank" className="p-2 text-gray-400 hover:text-appleBlue hover:bg-blue-50 rounded-lg transition" title="Görüntüle">
                                                            <Eye size={18} />
                                                        </Link>

                                                        {l.status !== 'APPROVED' && (
                                                            <button
                                                                onClick={() => handleAction(l.id, 'APPROVED')}
                                                                disabled={actionLoading === l.id}
                                                                className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition disabled:opacity-50"
                                                                title="Onayla ve Yayınla"
                                                            >
                                                                {actionLoading === l.id ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18} />}
                                                            </button>
                                                        )}

                                                        {l.status !== 'REJECTED' && (
                                                            <button
                                                                onClick={() => handleAction(l.id, 'REJECTED')}
                                                                disabled={actionLoading === l.id}
                                                                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                                                                title="Reddet"
                                                            >
                                                                {actionLoading === l.id ? <Loader2 size={18} className="animate-spin" /> : <XCircle size={18} />}
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
