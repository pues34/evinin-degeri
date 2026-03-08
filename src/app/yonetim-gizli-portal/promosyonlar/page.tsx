"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import AdminMobileHeader from "@/components/AdminMobileHeader";
import { Loader2, Tag, Plus, Trash2, RefreshCw, Calendar, Hash, Percent, DollarSign } from "lucide-react";

export default function AdminPromoPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [codes, setCodes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [form, setForm] = useState({
        code: "",
        discountType: "percentage",
        discountValue: "",
        maxUses: "100",
        expiresAt: "",
    });

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/yonetim-gizli-portal/login");
        } else if (status === "authenticated" && session?.user?.role !== "admin") {
            router.push("/");
        } else if (status === "authenticated" && session?.user?.role === "admin") {
            fetchCodes();
        }
    }, [status, session, router]);

    const fetchCodes = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/promo-codes");
            const data = await res.json();
            setCodes(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!form.code || !form.discountValue || !form.expiresAt) {
            return alert("Tüm alanları doldurun.");
        }
        setFormLoading(true);
        try {
            const res = await fetch("/api/admin/promo-codes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (data.success) {
                setShowForm(false);
                setForm({ code: "", discountType: "percentage", discountValue: "", maxUses: "100", expiresAt: "" });
                fetchCodes();
            } else {
                alert(data.error);
            }
        } catch {
            alert("Bağlantı hatası");
        } finally {
            setFormLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu promosyon kodunu silmek istediğinize emin misiniz?")) return;
        try {
            await fetch("/api/admin/promo-codes", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            fetchCodes();
        } catch {
            alert("Silme hatası");
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
                    <div className="max-w-4xl mx-auto space-y-6">

                        <div className="flex justify-between items-end">
                            <div>
                                <h1 className="text-3xl font-bold text-appleDark">Promosyon Kodları</h1>
                                <p className="text-gray-500">İndirim kodlarını oluşturun ve yönetin.</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-appleBlue text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition">
                                    <Plus size={16} /> Yeni Kod
                                </button>
                                <button onClick={fetchCodes} className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50">
                                    <RefreshCw size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Create Form */}
                        {showForm && (
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                                <h3 className="font-bold text-appleDark flex items-center gap-2"><Tag size={18} /> Yeni Promosyon Kodu</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 block mb-1">Kod</label>
                                        <input
                                            value={form.code}
                                            onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })}
                                            placeholder="LANSMAN20"
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-appleBlue"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 block mb-1">İndirim Tipi</label>
                                        <select
                                            value={form.discountType}
                                            onChange={e => setForm({ ...form, discountType: e.target.value })}
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-appleBlue"
                                        >
                                            <option value="percentage">Yüzde (%)</option>
                                            <option value="fixed">Sabit Tutar (₺)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 block mb-1">
                                            İndirim Değeri ({form.discountType === "percentage" ? "%" : "₺"})
                                        </label>
                                        <input
                                            type="number"
                                            value={form.discountValue}
                                            onChange={e => setForm({ ...form, discountValue: e.target.value })}
                                            placeholder={form.discountType === "percentage" ? "20" : "100"}
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-appleBlue"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 block mb-1">Maks. Kullanım</label>
                                        <input
                                            type="number"
                                            value={form.maxUses}
                                            onChange={e => setForm({ ...form, maxUses: e.target.value })}
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-appleBlue"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 block mb-1">Geçerlilik Bitiş</label>
                                        <input
                                            type="datetime-local"
                                            value={form.expiresAt}
                                            onChange={e => setForm({ ...form, expiresAt: e.target.value })}
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-appleBlue"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={handleCreate}
                                    disabled={formLoading}
                                    className="px-6 py-2.5 bg-appleBlue text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition disabled:opacity-50 flex items-center gap-2"
                                >
                                    {formLoading ? <Loader2 size={16} className="animate-spin" /> : "Oluştur"}
                                </button>
                            </div>
                        )}

                        {/* Codes Table */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Kod</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">İndirim</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Kullanım</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Bitiş</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Durum</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">İşlem</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {codes.length === 0 ? (
                                        <tr><td colSpan={6} className="p-8 text-center text-gray-400">Henüz promosyon kodu oluşturulmamış.</td></tr>
                                    ) : codes.map(c => (
                                        <tr key={c.id} className="hover:bg-gray-50/30 transition">
                                            <td className="px-6 py-4 font-mono font-bold text-appleDark text-sm">{c.code}</td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className="inline-flex items-center gap-1">
                                                    {c.discountType === "percentage" ? <Percent size={14} className="text-appleBlue" /> : <DollarSign size={14} className="text-green-600" />}
                                                    {c.discountValue}{c.discountType === "percentage" ? "%" : "₺"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{c.currentUses} / {c.maxUses}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{new Date(c.expiresAt).toLocaleDateString('tr-TR')}</td>
                                            <td className="px-6 py-4">
                                                {c.isActive && new Date(c.expiresAt) > new Date() ? (
                                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">Aktif</span>
                                                ) : (
                                                    <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-full">Pasif</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => handleDelete(c.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
