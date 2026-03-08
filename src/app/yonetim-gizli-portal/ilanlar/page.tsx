"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import AdminMobileHeader from "@/components/AdminMobileHeader";
import { Loader2, CheckCircle, XCircle, Eye, AlertCircle, RefreshCw, X, ChevronLeft, ChevronRight, Edit3, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export default function AdminIlanlarPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [listings, setListings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [selectedListing, setSelectedListing] = useState<any>(null);
    const [imageIndex, setImageIndex] = useState(0);
    const [rejectReason, setRejectReason] = useState("");
    const [filterStatus, setFilterStatus] = useState("ALL");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/yonetim-gizli-portal/login");
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

    const handleAction = async (id: string, newStatus: string, reason?: string) => {
        setActionLoading(id);
        try {
            const res = await fetch(`/api/admin/listings/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus, rejectReason: reason })
            });

            if (res.ok) {
                setListings(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
                setSelectedListing(null);
                setRejectReason("");
            } else {
                alert("İşlem başarısız.");
            }
        } catch (err) {
            alert("Bağlantı hatası.");
        } finally {
            setActionLoading(null);
        }
    };

    const filtered = filterStatus === "ALL" ? listings : listings.filter(l => l.status === filterStatus);

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

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-appleDark">İlan Yönetimi</h1>
                                <p className="text-gray-500">Kullanıcıların verdiği ilanları inceleyin, onaylayın veya reddedin.</p>
                            </div>
                            <div className="flex items-center gap-2">
                                {["ALL", "PENDING", "APPROVED", "REJECTED"].map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setFilterStatus(s)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filterStatus === s ? 'bg-appleBlue text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        {s === "ALL" ? "Tümü" : s === "PENDING" ? "Bekliyor" : s === "APPROVED" ? "Onaylı" : "Reddedildi"}
                                    </button>
                                ))}
                                <button onClick={fetchListings} className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-50">
                                    <RefreshCw size={14} /> Yenile
                                </button>
                            </div>
                        </div>

                        {/* Listings Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filtered.length === 0 ? (
                                <div className="col-span-full text-center py-12 text-gray-400">Kayıtlı ilan bulunamadı.</div>
                            ) : filtered.map((l) => (
                                <div key={l.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition group">
                                    {/* Image Preview */}
                                    <div className="relative h-48 bg-gray-100">
                                        {l.images && l.images.length > 0 ? (
                                            <Image
                                                src={l.images[0]}
                                                alt={l.title}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                <ImageIcon size={40} />
                                            </div>
                                        )}
                                        <div className="absolute top-2 right-2">
                                            {l.status === 'PENDING' && <span className="px-2 py-1 bg-amber-500 text-white text-[10px] font-bold rounded-full">Bekliyor</span>}
                                            {l.status === 'APPROVED' && <span className="px-2 py-1 bg-green-500 text-white text-[10px] font-bold rounded-full">Onaylı</span>}
                                            {l.status === 'REJECTED' && <span className="px-2 py-1 bg-red-500 text-white text-[10px] font-bold rounded-full">Reddedildi</span>}
                                        </div>
                                        {l.images && l.images.length > 1 && (
                                            <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/50 text-white text-[10px] rounded-full">
                                                📷 {l.images.length} fotoğraf
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="p-4">
                                        <h3 className="font-bold text-appleDark text-sm truncate">{l.title}</h3>
                                        <p className="text-xs text-gray-500 mt-1">{l.city} / {l.district} · {l.rooms} · {l.grossSqm} m²</p>
                                        <div className="flex justify-between items-center mt-3">
                                            <div>
                                                <p className="text-sm font-bold text-appleDark">{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(l.askingPrice)}</p>
                                                <p className="text-[10px] text-gray-400">AI: {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(l.estimatedValue)}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] text-gray-400">{l.user?.name || "Bilinmeyen"}</p>
                                                <p className="text-[10px] text-gray-400">{new Date(l.createdAt).toLocaleDateString('tr-TR')}</p>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2 mt-4">
                                            <button
                                                onClick={() => { setSelectedListing(l); setImageIndex(0); }}
                                                className="flex-1 py-2 text-xs font-medium bg-gray-100 rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-1"
                                            >
                                                <Eye size={14} /> İncele
                                            </button>
                                            {l.status !== 'APPROVED' && (
                                                <button
                                                    onClick={() => handleAction(l.id, 'APPROVED')}
                                                    disabled={actionLoading === l.id}
                                                    className="py-2 px-3 text-xs font-medium bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition"
                                                >
                                                    {actionLoading === l.id ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
                                                </button>
                                            )}
                                            {l.status !== 'REJECTED' && (
                                                <button
                                                    onClick={() => { setSelectedListing(l); setImageIndex(0); }}
                                                    className="py-2 px-3 text-xs font-medium bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition"
                                                >
                                                    <XCircle size={14} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>

            {/* Detail Modal */}
            {selectedListing && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedListing(null)}>
                    <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
                        {/* Image Gallery */}
                        {selectedListing.images && selectedListing.images.length > 0 && (
                            <div className="relative h-80 bg-gray-100">
                                <Image
                                    src={selectedListing.images[imageIndex]}
                                    alt={`Fotoğraf ${imageIndex + 1}`}
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                                {selectedListing.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => setImageIndex(i => i > 0 ? i - 1 : selectedListing.images.length - 1)}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white transition"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>
                                        <button
                                            onClick={() => setImageIndex(i => i < selectedListing.images.length - 1 ? i + 1 : 0)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white transition"
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
                                            {imageIndex + 1} / {selectedListing.images.length}
                                        </div>
                                    </>
                                )}
                                <button onClick={() => setSelectedListing(null)} className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow">
                                    <X size={16} />
                                </button>
                            </div>
                        )}

                        {/* Thumbnails */}
                        {selectedListing.images && selectedListing.images.length > 1 && (
                            <div className="flex gap-2 p-4 overflow-x-auto">
                                {selectedListing.images.map((img: string, i: number) => (
                                    <button
                                        key={i}
                                        onClick={() => setImageIndex(i)}
                                        className={`relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition ${i === imageIndex ? 'border-appleBlue' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                    >
                                        <Image src={img} alt="" fill className="object-cover" unoptimized />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Details */}
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-bold text-appleDark">{selectedListing.title}</h2>
                                    <p className="text-sm text-gray-500">{selectedListing.listingNumber}</p>
                                </div>
                                <div>
                                    {selectedListing.status === 'PENDING' && <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">Bekliyor</span>}
                                    {selectedListing.status === 'APPROVED' && <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">Onaylı</span>}
                                    {selectedListing.status === 'REJECTED' && <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full">Reddedildi</span>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                                <div className="bg-gray-50 rounded-xl p-3"><p className="text-gray-400 text-xs">Konum</p><p className="font-medium text-appleDark">{selectedListing.city} / {selectedListing.district}</p></div>
                                <div className="bg-gray-50 rounded-xl p-3"><p className="text-gray-400 text-xs">Mahalle</p><p className="font-medium text-appleDark">{selectedListing.neighborhood}</p></div>
                                <div className="bg-gray-50 rounded-xl p-3"><p className="text-gray-400 text-xs">Oda</p><p className="font-medium text-appleDark">{selectedListing.rooms}</p></div>
                                <div className="bg-gray-50 rounded-xl p-3"><p className="text-gray-400 text-xs">Net m²</p><p className="font-medium text-appleDark">{selectedListing.netSqm}</p></div>
                                <div className="bg-gray-50 rounded-xl p-3"><p className="text-gray-400 text-xs">Brüt m²</p><p className="font-medium text-appleDark">{selectedListing.grossSqm}</p></div>
                                <div className="bg-gray-50 rounded-xl p-3"><p className="text-gray-400 text-xs">Bina Yaşı</p><p className="font-medium text-appleDark">{selectedListing.buildingAge} yıl</p></div>
                                <div className="bg-gray-50 rounded-xl p-3"><p className="text-gray-400 text-xs">Kat</p><p className="font-medium text-appleDark">{selectedListing.floor}</p></div>
                                <div className="bg-gray-50 rounded-xl p-3"><p className="text-gray-400 text-xs">Isıtma</p><p className="font-medium text-appleDark">{selectedListing.heatingType || "-"}</p></div>
                                <div className="bg-gray-50 rounded-xl p-3"><p className="text-gray-400 text-xs">Tip</p><p className="font-medium text-appleDark">{selectedListing.propertyType || "-"}</p></div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-blue-50 rounded-xl p-4">
                                    <p className="text-xs text-gray-500">İstenen Fiyat</p>
                                    <p className="text-xl font-extrabold text-appleDark">{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(selectedListing.askingPrice)}</p>
                                </div>
                                <div className="bg-green-50 rounded-xl p-4">
                                    <p className="text-xs text-gray-500">AI Değerleme</p>
                                    <p className="text-xl font-extrabold text-green-700">{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(selectedListing.estimatedValue)}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-xs text-gray-500 mb-1">Açıklama</p>
                                <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedListing.description}</p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-xs text-gray-500 mb-1">İlan Sahibi</p>
                                <p className="text-sm font-medium text-appleDark">{selectedListing.user?.name || "Bilinmeyen"}</p>
                                <p className="text-xs text-gray-400">{selectedListing.user?.email} · {selectedListing.phone || selectedListing.user?.phone || "-"}</p>
                            </div>

                            {/* Reject with reason */}
                            {selectedListing.status !== 'REJECTED' && (
                                <div className="border-t border-gray-100 pt-4 space-y-3">
                                    <textarea
                                        value={rejectReason}
                                        onChange={e => setRejectReason(e.target.value)}
                                        placeholder="Red sebebi (opsiyonel)..."
                                        className="w-full p-3 border border-gray-200 rounded-xl text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-red-200"
                                    />
                                    <div className="flex gap-3">
                                        {selectedListing.status !== 'APPROVED' && (
                                            <button
                                                onClick={() => handleAction(selectedListing.id, 'APPROVED')}
                                                disabled={actionLoading === selectedListing.id}
                                                className="flex-1 py-3 bg-green-500 text-white rounded-xl font-bold text-sm hover:bg-green-600 transition flex items-center justify-center gap-2 disabled:opacity-50"
                                            >
                                                {actionLoading === selectedListing.id ? <Loader2 size={16} className="animate-spin" /> : <><CheckCircle size={16} /> Onayla ve Yayınla</>}
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleAction(selectedListing.id, 'REJECTED', rejectReason)}
                                            disabled={actionLoading === selectedListing.id}
                                            className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold text-sm hover:bg-red-600 transition flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {actionLoading === selectedListing.id ? <Loader2 size={16} className="animate-spin" /> : <><XCircle size={16} /> Reddet</>}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
