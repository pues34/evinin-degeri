"use client";

import { useState, useEffect } from "react";
import { User, Lock, Mail, Phone, Crown, CheckCircle } from "lucide-react";

export default function ProfileClient({ user }: { user: any }) {
    const [settings, setSettings] = useState({
        name: user?.name || "",
        phone: user?.phone || "",
        currentPassword: "",
        newPassword: ""
    });
    const [saving, setSaving] = useState(false);

    // Phase 18: Listings
    const [listings, setListings] = useState<any[]>([]);
    const [loadingListings, setLoadingListings] = useState(true);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const res = await fetch("/api/listings?mode=my-listings");
                if (res.ok) {
                    const data = await res.json();
                    setListings(data);
                }
            } catch (error) {
                console.error("Listings load error", error);
            } finally {
                setLoadingListings(false);
            }
        };
        fetchListings();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/user/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings)
            });
            const data = await res.json();
            if (data.success) {
                alert("Profil başarıyla güncellendi!");
                setSettings({ ...settings, currentPassword: "", newPassword: "" });
            } else {
                alert("Hata: " + data.error);
            }
        } catch (e) {
            alert("Bağlantı hatası.");
        }
        setSaving(false);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-appleDark tracking-tight">Profil Ayarları</h1>
                <p className="text-gray-500 mt-2">Kişisel bilgilerinizi ve hesap güvenliğinizi yönetin.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sol Taraf: Özeti Görüntüle */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-blue-50 text-appleBlue flex items-center justify-center shrink-0">
                            <span className="text-2xl font-bold">{settings.name.charAt(0).toUpperCase() || "Ü"}</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-appleDark text-lg">{settings.name || "Kullanıcı"}</h3>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Abonelik Durumu</h4>
                        {user.isPremium ? (
                            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-3">
                                <Crown className="text-emerald-500 shrink-0" size={24} />
                                <div>
                                    <p className="font-bold text-emerald-700 text-sm">Premium Üye</p>
                                    <p className="text-xs text-emerald-600/80">Raporlara sınırsız erişiminiz var.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                                <p className="text-gray-500 text-sm mb-3">Tüm detaylı analiz ve raporlara ulaşmak için Premium&apos;a geçin.</p>
                                <button className="w-full py-2 bg-appleDark text-white text-sm font-bold rounded-xl hover:bg-black transition-colors">
                                    Premium&apos;a Yükselt
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Phase 18: İlanlarım */}
                    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">İlanlarım</h4>
                            <a href="/ilan-ver" className="text-xs font-bold text-appleBlue hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                                + Yeni İlan
                            </a>
                        </div>

                        {loadingListings ? (
                            <div className="text-center py-4 text-gray-400 text-sm">Yükleniyor...</div>
                        ) : listings.length === 0 ? (
                            <div className="text-center py-6 bg-gray-50 rounded-xl border border-gray-100">
                                <p className="text-gray-500 text-sm">Henüz bir ilanınız bulunmuyor.</p>
                                <p className="text-xs text-gray-400 mt-1">Yılda 3 adet ücretsiz ilan verebilirsiniz.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {listings.map(listing => (
                                    <div key={listing.id} className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex justify-between items-center">
                                        <div className="overflow-hidden">
                                            <p className="text-sm font-bold text-appleDark truncate w-40">{listing.title}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(listing.askingPrice)}</p>
                                        </div>
                                        <div className="shrink-0">
                                            {listing.status === 'PENDING' && <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-1 rounded-md">ONAY BEKLİYOR</span>}
                                            {listing.status === 'APPROVED' && <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded-md">YAYINDA</span>}
                                            {listing.status === 'REJECTED' && <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-1 rounded-md">REDDEDİLDİ</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sağ Taraf: Ayarlar Formu */}
                <div className="md:col-span-2 bg-white rounded-[24px] p-8 shadow-sm border border-gray-100">
                    <form onSubmit={handleSave} className="space-y-6">
                        <h2 className="text-xl font-bold text-appleDark border-b border-gray-100 pb-4 mb-6">Kişisel Bilgiler</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><User size={16} className="text-gray-400" /> Ad Soyad</label>
                                <input type="text" value={settings.name} onChange={e => setSettings({ ...settings, name: e.target.value })} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-appleBlue outline-none bg-gray-50" placeholder="Adınız Soyadınız" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Mail size={16} className="text-gray-400" /> E-Posta Adresi</label>
                                <input type="email" value={user.email} disabled className="w-full p-3 border border-gray-100 rounded-xl outline-none bg-gray-100 text-gray-500 cursor-not-allowed" />
                            </div>
                            <div className="space-y-2 sm:col-span-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Phone size={16} className="text-gray-400" /> Telefon Numarası</label>
                                <input type="tel" value={settings.phone} onChange={e => setSettings({ ...settings, phone: e.target.value })} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-appleBlue outline-none bg-gray-50" placeholder="05XX XXX XX XX" />
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-appleDark border-b border-gray-100 pb-4 mt-10 mb-6 flex items-center gap-2"><Lock size={20} /> Şifre İşlemleri</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Mevcut Şifreniz</label>
                                <input type="password" value={settings.currentPassword} onChange={e => setSettings({ ...settings, currentPassword: e.target.value })} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-appleBlue outline-none bg-gray-50" placeholder="Değiştirmek için giriniz" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Yeni Şifreniz</label>
                                <input type="password" value={settings.newPassword} onChange={e => setSettings({ ...settings, newPassword: e.target.value })} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-appleBlue outline-none bg-gray-50" placeholder="En az 6 karakter" />
                            </div>
                        </div>

                        <div className="pt-6 flex justify-end">
                            <button disabled={saving} type="submit" className="px-8 py-3 bg-appleBlue text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50 flex items-center gap-2">
                                {saving ? "Kaydediliyor..." : <><CheckCircle size={18} /> Değişiklikleri Kaydet</>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
