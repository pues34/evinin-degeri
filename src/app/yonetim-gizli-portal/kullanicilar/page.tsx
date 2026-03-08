"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Users, Crown, Search, Plus, Minus, Shield } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminMobileHeader from "@/components/AdminMobileHeader";

export const dynamic = "force-dynamic";

interface UserItem {
    id: string;
    name: string | null;
    email: string;
    phone: string | null;
    isPremium: boolean;
    premiumEnd: string | null;
    accountType: string;
    createdAt: string;
}

export default function AdminUsersPage() {
    const { data: session, status } = useSession();
    const [users, setUsers] = useState<UserItem[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const loadUsers = async () => {
        try {
            const res = await fetch("/api/admin/users");
            const data = await res.json();
            if (Array.isArray(data)) setUsers(data);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    useEffect(() => { loadUsers(); }, []);

    const handlePremium = async (userId: string, action: "extend" | "revoke", days = 30) => {
        setActionLoading(userId);
        try {
            const res = await fetch("/api/admin/users/premium", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, action, days }),
            });
            const data = await res.json();
            if (data.success) {
                alert(data.message);
                loadUsers();
            } else {
                alert(data.error || "Hata oluştu");
            }
        } catch (e) {
            alert("Sunucu hatası");
        }
        setActionLoading(null);
    };

    if (status === "loading") return null;
    if (!session || (session.user as any)?.role !== "admin") return <div className="p-8 text-center text-gray-500">Yetkisiz erişim</div>;

    const filtered = users.filter(
        (u) => u.name?.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />
            <main className="flex-1 md:ml-64 p-6">
                <AdminMobileHeader />
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold text-appleDark flex items-center gap-2">
                            <Users size={24} /> Kullanıcılar
                        </h1>
                        <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 px-4 py-2">
                            <Search size={16} className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="İsim veya email ara..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="outline-none text-sm w-48"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-16 text-gray-400">Yükleniyor...</div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-16 text-gray-400">Kullanıcı bulunamadı</div>
                    ) : (
                        <div className="space-y-3">
                            {filtered.map((user) => (
                                <div key={user.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 flex-1 min-w-0">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold ${user.isPremium ? 'bg-gradient-to-br from-amber-400 to-orange-500' : 'bg-gray-300'}`}>
                                            {user.name?.charAt(0)?.toUpperCase() || "?"}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-sm font-bold text-appleDark truncate">{user.name || "İsimsiz"}</h3>
                                                {user.isPremium && (
                                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center gap-1">
                                                        <Crown size={10} /> Premium
                                                    </span>
                                                )}
                                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                                                    {user.accountType === "sirket" ? "Şirket" : "Bireysel"}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-400 mt-0.5">{user.email} {user.phone ? `• ${user.phone}` : ""}</p>
                                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                                                <span>Kayıt: {new Date(user.createdAt).toLocaleDateString("tr-TR")}</span>
                                                {user.premiumEnd && (
                                                    <span className={`font-medium ${new Date(user.premiumEnd) < new Date() ? 'text-red-500' : 'text-green-600'}`}>
                                                        Premium Bitiş: {new Date(user.premiumEnd).toLocaleDateString("tr-TR")}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            onClick={() => handlePremium(user.id, "extend", 30)}
                                            disabled={actionLoading === user.id}
                                            className="flex items-center gap-1 px-3 py-2 bg-green-50 text-green-700 rounded-xl text-xs font-medium hover:bg-green-100 transition-colors disabled:opacity-50"
                                        >
                                            <Plus size={14} /> +30 Gün
                                        </button>
                                        <button
                                            onClick={() => handlePremium(user.id, "extend", 365)}
                                            disabled={actionLoading === user.id}
                                            className="flex items-center gap-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-xl text-xs font-medium hover:bg-blue-100 transition-colors disabled:opacity-50"
                                        >
                                            <Plus size={14} /> +1 Yıl
                                        </button>
                                        {user.isPremium && (
                                            <button
                                                onClick={() => {
                                                    if (confirm(`${user.name || user.email} kullanıcısının premium'unu iptal etmek istediğinize emin misiniz?`)) {
                                                        handlePremium(user.id, "revoke");
                                                    }
                                                }}
                                                disabled={actionLoading === user.id}
                                                className="flex items-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-medium hover:bg-red-100 transition-colors disabled:opacity-50"
                                            >
                                                <Minus size={14} /> İptal
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
