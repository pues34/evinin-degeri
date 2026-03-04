"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { Users, Settings, LogOut, LayoutDashboard, Search, Map, BarChart2, MessageSquare, Building2, Crown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

export const dynamic = 'force-dynamic';

const COLORS = ['#0071E3', '#34C759', '#FF9500', '#FF3B30', '#5856D6'];

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const [activeTab, setActiveTab] = useState("overview"); // Default tab is now overview
    const [dbLeads, setDbLeads] = useState<any[]>([]);
    const [contacts, setContacts] = useState<any[]>([]);
    const [realtors, setRealtors] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);

    // Location states
    const [locationsMap, setLocationsMap] = useState<any[]>([]);
    const [selectedCityId, setSelectedCityId] = useState<string>("");
    const [selectedDistrictId, setSelectedDistrictId] = useState<string>("");
    const [newItemName, setNewItemName] = useState("");
    const [newMultiplier, setNewMultiplier] = useState(1.0);

    // CMS States
    const [pages, setPages] = useState<any[]>([]);
    const [pageTitle, setPageTitle] = useState("");
    const [pageContent, setPageContent] = useState("");

    // Blog States
    const [blogs, setBlogs] = useState<any[]>([]);
    const [blogTopic, setBlogTopic] = useState("");
    const [aiGenerating, setAiGenerating] = useState(false);

    // Settings States
    const [settings, setSettings] = useState({
        baseSqmPrice: "",
        inflationRate: "",
        elevatorMultiplier: "",
        parkingMultiplier: "",
        securityMultiplier: "",
        multBodrum: "",
        multKot1: "",
        multZemin: "",
        multUst: "",
        multCati: "",
        multMustakil: "",
        multAra: "",
        multMutfakKapali: "",
        multBalkonVar: "",
        multCiftBanyo: "",
        buildingAgeDepreciation: "",
        adsenseHeader: "",
        adsenseSidebar: "",
        sponsorHeaderUrl: "",
        sponsorHeaderLink: "",
        sponsorSidebarUrl: "",
        sponsorSidebarLink: "",
        mFacadeGuney: "",
        mFacadeKuzey: "",
        mSiteIci: "",
        mYenilenmis: "",
        mMasrafli: ""
    });
    const [savingSettings, setSavingSettings] = useState(false);

    const loadLocations = () => {
        fetch("/api/locations")
            .then(res => res.json())
            .then(data => { if (data.success) setLocationsMap(data.data); })
            .catch(err => console.error(err));
    };

    const handleAddLocation = async (type: string, parentId?: string) => {
        if (!newItemName) return;
        const res = await fetch("/api/admin/locations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type, name: newItemName, parentId, multiplier: newMultiplier })
        });
        const data = await res.json();
        if (data.success) {
            setNewItemName("");
            setNewMultiplier(1.0);
            loadLocations();
        } else alert("Ekleme başarısız: " + data.error);
    };

    const handleDeleteLocation = async (type: string, id: string) => {
        if (!confirm("Emin misiniz? Altındaki tüm veriler de silinecektir.")) return;
        const res = await fetch(`/api/admin/locations?type=${type}&id=${id}`, { method: "DELETE" });
        const data = await res.json();
        if (data.success) {
            if (type === 'city' && selectedCityId === id) setSelectedCityId("");
            if (type === 'district' && selectedDistrictId === id) setSelectedDistrictId("");
            loadLocations();
        } else alert("Silme başarısız: " + data.error);
    };

    const loadPages = () => {
        fetch("/api/admin/pages")
            .then(res => res.json())
            .then(data => { if (data.success) setPages(data.data); })
            .catch(err => console.error(err));
    };

    const handleAddPage = async () => {
        if (!pageTitle || !pageContent) return alert("Başlık ve içerik zorunludur");
        const res = await fetch("/api/admin/pages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: pageTitle, content: pageContent })
        });
        const data = await res.json();
        if (data.success) {
            setPageTitle("");
            setPageContent("");
            loadPages();
        } else alert("Ekleme başarısız: " + data.error);
    };

    const handleDeletePage = async (id: string) => {
        if (!confirm("Bu sayfayı silmek istediğinize emin misiniz?")) return;
        const res = await fetch(`/api/admin/pages?id=${id}`, { method: "DELETE" });
        const data = await res.json();
        if (data.success) loadPages();
        else alert("Silme başarısız: " + data.error);
    }

    const loadBlogs = () => {
        fetch("/api/admin/blog")
            .then(res => res.json())
            .then(data => { if (data.success) setBlogs(data.data); })
            .catch(err => console.error(err));
    };

    const handleAIBlogGenerate = async () => {
        if (!blogTopic) return alert("Hangi konuda yazmak istediğinizi belirtin.");
        setAiGenerating(true);
        try {
            const res = await fetch("/api/admin/blog/ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic: blogTopic })
            });
            const data = await res.json();
            if (data.success) {
                setBlogTopic("");
                alert("AI başarıyla makaleyi yazıp yayınladı!");
                loadBlogs();
            } else alert("Oluşturma hatası: " + data.error);
        } catch (e) {
            alert("Bağlantı hatası");
        }
        setAiGenerating(false);
    };

    const handleDeleteBlog = async (id: string) => {
        if (!confirm("Bu makaleyi silmek istiyor musunuz?")) return;
        const res = await fetch(`/api/admin/blog?id=${id}`, { method: "DELETE" });
        const data = await res.json();
        if (data.success) loadBlogs();
        else alert("Silme başarısız: " + data.error);
    };

    const handleSaveSettings = async () => {
        setSavingSettings(true);
        try {
            const res = await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings)
            });
            const data = await res.json();
            if (data.success) alert("Ayarlar başarıyla kaydedildi!");
            else alert("Hata: " + data.error);
        } catch (err) {
            alert("Bağlantı hatası");
        }
        setSavingSettings(false);
    };

    const handleDownloadCSV = () => {
        if (dbLeads.length === 0) return alert("İndirilecek veri yok.");
        const headers = ["ID,Tarih,Ad Soyad,Telefon,Email,Sehir,Ilce,Mahalle,Kat,Oda,Net m2,Brut m2,Degerleme"];
        const rows = dbLeads.map(lead => {
            return `"${lead.id}","${lead.date}","${lead.name}","${lead.phone}","${lead.email}","${lead.city || ''}","${lead.district || ''}","${lead.neighborhood || ''}","${lead.floor || ''}","${lead.rooms || ''}","${lead.netSqm || ''}","${lead.grossSqm || ''}","${lead.rawOverridenValue || lead.rawEstimatedValue}"`;
        });
        const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + headers.concat(rows).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `talepler_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const loadContacts = () => {
        fetch("/api/admin/contact")
            .then(res => res.json())
            .then(data => { if (data.success) setContacts(data.data); })
            .catch(err => console.error(err));
    };

    const handleReadContact = async (id: string, isRead: boolean) => {
        await fetch("/api/admin/contact", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, isRead: !isRead })
        });
        loadContacts();
    };

    const loadRealtors = () => {
        fetch("/api/admin/realtors")
            .then(res => res.json())
            .then(data => { if (data.success) setRealtors(data.data); })
            .catch(err => console.error(err));
    };

    const handleDeleteContact = async (id: string) => {
        if (!confirm("Bu mesajı silmek istiyor musunuz?")) return;
        await fetch(`/api/admin/contact?id=${id}`, { method: "DELETE" });
        loadContacts();
    };

    useEffect(() => {
        if (session && activeTab === "leads") {
            fetch("/api/admin/leads")
                .then(res => res.json())
                .then(data => {
                    if (data.success) setDbLeads(data.data);
                })
                .catch(err => console.error("Leads fail:", err));
        } else if (session && activeTab === "locations") {
            loadLocations();
        } else if (session && activeTab === "pages") {
            loadPages();
        } else if (session && (activeTab === "algorithm-settings" || activeTab === "site-settings")) {
            fetch("/api/admin/settings")
                .then(res => res.json())
                .then(data => { if (data.success) setSettings(data.data); })
                .catch(err => console.error(err));
        } else if (session && activeTab === "blog") {
            loadBlogs();
        } else if (session && activeTab === "contacts") {
            loadContacts();
        } else if (session && activeTab === "b2b-users") {
            loadRealtors();
        } else if (session && activeTab === "overview") {
            fetch("/api/admin/stats")
                .then(res => res.json())
                .then(data => {
                    if (data.success) setStats(data.data);
                })
                .catch(err => console.error("Stats fail:", err));
        }
    }, [session, activeTab]);

    if (status === "loading") {
        return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;
    }

    if (status === "unauthenticated") {
        // We can redirect or show a login message. Wait, middleware is better, but this works for now.
        // Given we didn't setup Next.js middleware, we just show a link to sign in.
        return (
            <div className="min-h-screen flex items-center justify-center bg-appleGray">
                <div className="glass-card p-10 text-center max-w-md w-full">
                    <h2 className="text-2xl font-bold text-appleDark mb-6">Yönetim Paneli</h2>
                    <p className="text-appleLightGray mb-8">Lütfen giriş yapın.</p>
                    <button onClick={() => window.location.href = '/yonetim-gizli-portal/login'} className="w-full py-3 bg-appleBlue text-white rounded-xl shadow-apple font-medium hover:bg-blue-600 transition-all">
                        Giriş Yap
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-appleGray flex">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-100 flex flex-col hidden md:flex">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-appleDark flex items-center">
                        <LayoutDashboard className="mr-2 text-appleBlue" size={20} /> Eval.Admin
                    </h2>
                </div>
                <div className="px-4 py-6 flex-1 space-y-2">
                    <button
                        onClick={() => setActiveTab("overview")}
                        className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-appleBlue text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <BarChart2 size={18} className="mr-3" /> Özet (Analytics)
                    </button>
                    <button
                        onClick={() => setActiveTab("leads")}
                        className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'leads' ? 'bg-appleBlue text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Users size={18} className="mr-3" /> Talepler (Leads)
                    </button>
                    <button
                        onClick={() => setActiveTab("algorithm-settings")}
                        className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'algorithm-settings' ? 'bg-appleBlue text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Settings size={18} className="mr-3" /> Algoritma Ayarları
                    </button>
                    <button
                        onClick={() => setActiveTab("locations")}
                        className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'locations' ? 'bg-appleBlue text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Map size={18} className="mr-3" /> Konum Yönetimi
                    </button>
                    <button
                        onClick={() => setActiveTab("pages")}
                        className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'pages' ? 'bg-appleBlue text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <LayoutDashboard size={18} className="mr-3" /> Sayfalar (CMS)
                    </button>
                    <button
                        onClick={() => setActiveTab("b2b-users")}
                        className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'b2b-users' ? 'bg-appleBlue text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Building2 size={18} className="mr-3" /> B2B Emlakçılar
                    </button>
                    <button
                        onClick={() => setActiveTab("contacts")}
                        className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'contacts' ? 'bg-appleBlue text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <MessageSquare size={18} className="mr-3" /> Gelen Kutusu
                    </button>
                    <button
                        onClick={() => setActiveTab("blog")}
                        className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'blog' ? 'bg-appleBlue text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <LayoutDashboard size={18} className="mr-3" /> SEO Blog (AI)
                    </button>
                    <button
                        onClick={() => setActiveTab("site-settings")}
                        className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'site-settings' ? 'bg-appleBlue text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Settings size={18} className="mr-3" /> Reklam & Site Ayarları
                    </button>
                </div>
                <div className="p-4 border-t border-gray-100">
                    <button onClick={() => signOut()} className="w-full flex items-center px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl text-sm font-medium transition-colors">
                        <LogOut size={18} className="mr-3" /> Çıkış Yap
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                <div className="max-w-5xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-appleDark">Hoş Geldin, {session?.user?.name}</h1>
                            <p className="text-appleLightGray">Bugünkü verileri inceleyebilirsiniz.</p>
                        </div>
                    </div>

                    <div className="glass-card shadow-sm border-0">
                        {activeTab === "overview" && stats && (
                            <div className="p-8 space-y-8">
                                <h3 className="font-semibold text-lg text-appleDark mb-6">Genel Sistem Özeti</h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-center items-center">
                                        <p className="text-gray-500 text-sm mb-2">Toplam Sorgu Sayısı</p>
                                        <h4 className="text-4xl font-bold text-appleDark">{stats.totalRequests}</h4>
                                    </div>
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 flex flex-col justify-center items-center">
                                        <p className="text-blue-600/80 text-sm mb-2">Ortalama Değerleme(AI)</p>
                                        <h4 className="text-3xl font-bold text-appleBlue">
                                            {new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(stats.avgValue)}
                                        </h4>
                                    </div>
                                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-center items-center">
                                        <p className="text-gray-500 text-sm mb-2">Popüler Bölge</p>
                                        <h4 className="text-2xl font-bold text-appleDark text-center line-clamp-2">
                                            {stats.topDistricts[0]?.name || "-"}
                                        </h4>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-80">
                                        <h4 className="text-sm font-medium text-gray-500 mb-6 text-center">Son 7 Günlük Sorgu Trendi</h4>
                                        <div style={{ width: '100%', height: 250 }}>
                                            <ResponsiveContainer>
                                                <BarChart data={stats.trend}>
                                                    <XAxis dataKey="date" stroke="#8884d8" fontSize={12} tickLine={false} axisLine={false} />
                                                    <YAxis stroke="#8884d8" fontSize={12} tickLine={false} axisLine={false} />
                                                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                                    <Bar dataKey="count" fill="#0071E3" radius={[4, 4, 0, 0]} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-80">
                                        <h4 className="text-sm font-medium text-gray-500 mb-6 text-center">En Çok Sorgulanan 5 İlçe</h4>
                                        <div style={{ width: '100%', height: 250 }}>
                                            <ResponsiveContainer>
                                                <PieChart>
                                                    <Pie
                                                        data={stats.topDistricts}
                                                        cx="50%"
                                                        cy="50%"
                                                        innerRadius={60}
                                                        outerRadius={80}
                                                        paddingAngle={5}
                                                        dataKey="count"
                                                    >
                                                        {stats.topDistricts.map((entry: any, index: number) => (
                                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "leads" && (
                            <div className="p-0">
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center flex-wrap gap-4">
                                    <h3 className="font-semibold text-lg text-appleDark">Son Talepler</h3>
                                    <div className="flex gap-4 items-center">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <input type="text" placeholder="İsim veya telefon ara..." className="pl-9 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-appleBlue outline-none" />
                                        </div>
                                        <button onClick={handleDownloadCSV} className="px-4 py-2 bg-appleBlue text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center shadow-sm">
                                            📥 CSV İndir
                                        </button>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-gray-50/50 text-gray-500">
                                            <tr>
                                                <th className="px-6 py-4 font-medium">Tarih</th>
                                                <th className="px-6 py-4 font-medium">Ad Soyad</th>
                                                <th className="px-6 py-4 font-medium">İletişim</th>
                                                <th className="px-6 py-4 font-medium">Değerleme Sonucu</th>
                                                <th className="px-6 py-4 font-medium">İşlem</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {dbLeads.length === 0 && (
                                                <tr>
                                                    <td colSpan={5} className="text-center py-8 text-gray-400">Henüz talep bulunmuyor.</td>
                                                </tr>
                                            )}
                                            {dbLeads.map((lead: any) => (
                                                <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-6 py-4 text-gray-500">{lead.date}</td>
                                                    <td className="px-6 py-4 font-medium text-appleDark">{lead.name}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-appleDark">{lead.phone}</div>
                                                        <div className="text-gray-400 text-xs">{lead.email}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex flex-col gap-1">
                                                            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                AI: {lead.value}
                                                            </span>
                                                            {lead.overridenValue && (
                                                                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                    Manuel: {lead.overridenValue}
                                                                </span>
                                                            )}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button
                                                            onClick={async () => {
                                                                const note = prompt("Müşteri Notu:", lead.adminNote || "");
                                                                if (note === null) return;

                                                                const overridePrompt = prompt(`Güncel AI Değeri: ${lead.rawEstimatedValue}\nManuel Değer Girmek İster Misiniz? (Boş bırakırsanız mevcut değer kalır)`, lead.rawOverridenValue || "");
                                                                if (overridePrompt === null) return;

                                                                const notifyUser = confirm("Kullanıcıya fiyatın uzman tarafından güncellendiğini bildiren bir e-posta gönderilsin mi?");

                                                                const res = await fetch("/api/admin/leads/update", {
                                                                    method: "POST",
                                                                    headers: { "Content-Type": "application/json" },
                                                                    body: JSON.stringify({
                                                                        id: lead.id,
                                                                        adminNote: note,
                                                                        overridenValue: overridePrompt === "" ? null : overridePrompt,
                                                                        notifyUser
                                                                    })
                                                                });

                                                                if (res.ok) {
                                                                    fetch("/api/admin/leads")
                                                                        .then(r => r.json())
                                                                        .then(data => { if (data.success) setDbLeads(data.data); });
                                                                }
                                                            }}
                                                            className="text-xs font-medium text-appleBlue hover:text-blue-700 hover:underline">
                                                            Düzenle / Not Ekle
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === "b2b-users" && (
                            <div className="p-0">
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center flex-wrap gap-4">
                                    <h3 className="font-semibold text-lg text-appleDark">Kurumsal (B2B) Kullanıcılar</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-gray-50/50 text-gray-500">
                                            <tr>
                                                <th className="px-6 py-4 font-medium">Kayıt Tarihi</th>
                                                <th className="px-6 py-4 font-medium">Şirket Adı</th>
                                                <th className="px-6 py-4 font-medium">İletişim</th>
                                                <th className="px-6 py-4 font-medium text-center">Durum</th>
                                                <th className="px-6 py-4 font-medium text-center">Toplam Sorgu</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {realtors.length === 0 && (
                                                <tr>
                                                    <td colSpan={5} className="text-center py-8 text-gray-400">Kayıtlı kurumsal kullanıcı bulunmuyor.</td>
                                                </tr>
                                            )}
                                            {realtors.map((r: any) => {
                                                const isActive = r.isPro && new Date(r.subscriptionEnd) > new Date();
                                                return (
                                                    <tr key={r.id} className="hover:bg-gray-50/50 transition-colors">
                                                        <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{new Date(r.createdAt).toLocaleDateString("tr-TR")}</td>
                                                        <td className="px-6 py-4 font-medium text-appleDark">{r.companyName}</td>
                                                        <td className="px-6 py-4">
                                                            <div className="text-appleDark">{r.phone || "-"}</div>
                                                            <div className="text-gray-400 text-xs">{r.email}</div>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            {isActive ? (
                                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                    <Crown size={12} /> PRO
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                                                    Ücretsiz
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 text-center font-bold text-appleBlue">
                                                            {r._count.valuations}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === "algorithm-settings" && (
                            <div className="p-8">
                                <h3 className="font-semibold text-lg text-appleDark mb-6 flex items-center">
                                    <Settings className="mr-2 text-appleBlue" size={20} /> Algoritma Çarpanları Ayarları
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100 h-fit">
                                        <h4 className="text-sm font-semibold text-appleDark uppercase tracking-wider mb-4 border-b pb-2">Ana Ekonomik Veriler</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Taban Metrekare Fiyatı</label>
                                                <input type="number" value={settings.baseSqmPrice} onChange={e => setSettings({ ...settings, baseSqmPrice: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Aylık Enflasyon(%)</label>
                                                <input type="number" step="0.001" value={settings.inflationRate} onChange={e => setSettings({ ...settings, inflationRate: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white text-sm" />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-sm text-gray-600 mb-1">Bina Yaşı Düşüşü (Yıl Başı)</label>
                                                <input type="number" step="0.01" value={settings.buildingAgeDepreciation} onChange={e => setSettings({ ...settings, buildingAgeDepreciation: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white text-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                        <h4 className="text-sm font-semibold text-appleDark uppercase tracking-wider mb-4 border-b pb-2">Donanım Çarpanları</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Asansör</label>
                                                <input type="number" step="0.01" value={settings.elevatorMultiplier} onChange={e => setSettings({ ...settings, elevatorMultiplier: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Otopark</label>
                                                <input type="number" step="0.01" value={settings.parkingMultiplier} onChange={e => setSettings({ ...settings, parkingMultiplier: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Güvenlik/Site</label>
                                                <input type="number" step="0.01" value={settings.securityMultiplier} onChange={e => setSettings({ ...settings, securityMultiplier: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Kapalı Mutfak</label>
                                                <input type="number" step="0.01" value={settings.multMutfakKapali} onChange={e => setSettings({ ...settings, multMutfakKapali: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Balkon Var</label>
                                                <input type="number" step="0.01" value={settings.multBalkonVar} onChange={e => setSettings({ ...settings, multBalkonVar: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Çift Banyo / Ebeveyn</label>
                                                <input type="number" step="0.01" value={settings.multCiftBanyo} onChange={e => setSettings({ ...settings, multCiftBanyo: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Güney Cephe</label>
                                                <input type="number" step="0.01" value={settings.mFacadeGuney || "1.05"} onChange={e => setSettings({ ...settings, mFacadeGuney: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Kuzey Cephe</label>
                                                <input type="number" step="0.01" value={settings.mFacadeKuzey || "0.95"} onChange={e => setSettings({ ...settings, mFacadeKuzey: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Site İçi / Güvenlikli</label>
                                                <input type="number" step="0.01" value={settings.mSiteIci || "1.15"} onChange={e => setSettings({ ...settings, mSiteIci: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Yenilenmiş / Lüks Daire</label>
                                                <input type="number" step="0.01" value={settings.mYenilenmis || "1.15"} onChange={e => setSettings({ ...settings, mYenilenmis: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Masraflı Daire</label>
                                                <input type="number" step="0.01" value={settings.mMasrafli || "0.85"} onChange={e => setSettings({ ...settings, mMasrafli: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white text-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100 md:col-span-2">
                                        <h4 className="text-sm font-semibold text-appleDark uppercase tracking-wider mb-4 border-b pb-2">Kat Çarpanları</h4>
                                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Bodrum</label>
                                                <input type="number" step="0.01" value={settings.multBodrum} onChange={e => setSettings({ ...settings, multBodrum: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Kot 1</label>
                                                <input type="number" step="0.01" value={settings.multKot1} onChange={e => setSettings({ ...settings, multKot1: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Zemin/Giriş</label>
                                                <input type="number" step="0.01" value={settings.multZemin} onChange={e => setSettings({ ...settings, multZemin: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Ara Kat</label>
                                                <input type="number" step="0.01" value={settings.multAra} onChange={e => setSettings({ ...settings, multAra: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">En Üst Kat</label>
                                                <input type="number" step="0.01" value={settings.multUst} onChange={e => setSettings({ ...settings, multUst: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Dubleks</label>
                                                <input type="number" step="0.01" value={settings.multCati} onChange={e => setSettings({ ...settings, multCati: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Müstakil</label>
                                                <input type="number" step="0.01" value={settings.multMustakil} onChange={e => setSettings({ ...settings, multMustakil: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white text-sm" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <button disabled={savingSettings} onClick={handleSaveSettings} className="px-8 py-3 bg-appleDark text-white rounded-xl shadow-apple hover:bg-black transition-all font-medium disabled:opacity-50">
                                        {savingSettings ? "Kaydediliyor..." : "Algoritmayı Kaydet"}
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === "site-settings" && (
                            <div className="p-8">
                                <h3 className="font-semibold text-lg text-appleDark mb-6 flex items-center">
                                    <Settings className="mr-2 text-appleBlue" size={20} /> Reklam & Sponsorluk Yönetimi
                                </h3>
                                <div className="grid grid-cols-1 gap-8">
                                    <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                        <h4 className="text-sm font-semibold text-appleDark uppercase tracking-wider mb-4 border-b pb-2">Google AdSense Yerleşimleri</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Site Geneli Header AdSense ID</label>
                                                <input type="text" value={settings.adsenseHeader} onChange={e => setSettings({ ...settings, adsenseHeader: e.target.value })} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white" placeholder="ca-pub-XXXXXXXXXXXXXXXX" />
                                                <p className="text-xs text-gray-400 mt-1">Menünün altındaki şerit kısımdaki alan.</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Blog Kenarı (Sidebar) AdSense ID</label>
                                                <input type="text" value={settings.adsenseSidebar} onChange={e => setSettings({ ...settings, adsenseSidebar: e.target.value })} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white" placeholder="ca-pub-XXXXXXXXXXXXXXXX" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                                        <h4 className="text-sm font-semibold text-appleDark uppercase tracking-wider mb-4 border-b border-blue-200 pb-2">Özel Sponsorluk Alanları (Görsel ve Link)</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <h5 className="font-medium text-appleBlue text-sm">Sponsor #1 (Sonuç Ekranı Alanı)</h5>
                                                <div>
                                                    <label className="block text-xs text-gray-600 mb-1">Görsel (Banner) URL</label>
                                                    <input type="text" value={settings.sponsorHeaderUrl} onChange={e => setSettings({ ...settings, sponsorHeaderUrl: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white font-mono text-sm" placeholder="https://..." />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-gray-600 mb-1">Yönlendirme Linki</label>
                                                    <input type="text" value={settings.sponsorHeaderLink} onChange={e => setSettings({ ...settings, sponsorHeaderLink: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white font-mono text-sm" placeholder="https://..." />
                                                </div>
                                            </div>
                                            <div className="space-y-4 pl-0 md:pl-8 md:border-l border-blue-200/50">
                                                <h5 className="font-medium text-appleBlue text-sm">Sponsor #2 (Blog Sidebar Alanı)</h5>
                                                <div>
                                                    <label className="block text-xs text-gray-600 mb-1">Görsel (Kare / Dikey) URL</label>
                                                    <input type="text" value={settings.sponsorSidebarUrl} onChange={e => setSettings({ ...settings, sponsorSidebarUrl: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white font-mono text-sm" placeholder="https://..." />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-gray-600 mb-1">Yönlendirme Linki</label>
                                                    <input type="text" value={settings.sponsorSidebarLink} onChange={e => setSettings({ ...settings, sponsorSidebarLink: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white font-mono text-sm" placeholder="https://..." />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="mt-8 flex justify-end">
                                    <button disabled={savingSettings} onClick={handleSaveSettings} className="px-8 py-3 bg-appleBlue text-white rounded-xl shadow-apple hover:bg-blue-600 transition-all font-medium disabled:opacity-50">
                                        {savingSettings ? "Kaydediliyor..." : "Site Ayarlarını Kaydet"}
                                    </button>
                                </div>
                            </div>
                        )}
                        {activeTab === "locations" && (
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-semibold text-lg text-appleDark">Bölge & Çarpan Yönetimi</h3>
                                    <p className="text-sm text-gray-500">Değerleme algoritmasında kullanılacak konumları ve fiyat çarpanlarını buradan yönetebilirsiniz.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Cities Column */}
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 h-[500px] flex flex-col">
                                        <h4 className="font-medium text-appleDark mb-4">İller</h4>
                                        <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-2">
                                            {locationsMap.map(city => (
                                                <div key={city.id}
                                                    onClick={() => { setSelectedCityId(city.id); setSelectedDistrictId(""); }}
                                                    className={`p-3 rounded-lg cursor-pointer flex justify-between items-center transition-all ${selectedCityId === city.id ? 'bg-appleBlue text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
                                                    <span className="font-medium">{city.name}</span>
                                                    <button onClick={(e) => { e.stopPropagation(); handleDeleteLocation('city', city.id); }} className={`text-xs px-2 py-1 rounded ${selectedCityId === city.id ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-red-50 hover:bg-red-100 text-red-500'}`}>Sil</button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <input type="text" placeholder="Yeni İl Adı" className="w-full text-sm p-2 rounded-lg border border-gray-200 outline-none" onKeyDown={(e) => { if (e.key === 'Enter') { setNewItemName(e.currentTarget.value); handleAddLocation('city'); e.currentTarget.value = ""; } }} onChange={(e) => setNewItemName(e.target.value)} />
                                            <button onClick={() => handleAddLocation('city')} className="px-3 py-2 bg-appleDark text-white rounded-lg text-sm">+</button>
                                        </div>
                                    </div>

                                    {/* Districts Column */}
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 h-[500px] flex flex-col">
                                        <h4 className="font-medium text-appleDark mb-4">İlçeler {selectedCityId && `(${locationsMap.find(c => c.id === selectedCityId)?.name})`}</h4>
                                        {selectedCityId ? (
                                            <>
                                                <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-2">
                                                    {locationsMap.find(c => c.id === selectedCityId)?.districts?.map((district: any) => (
                                                        <div key={district.id}
                                                            onClick={() => setSelectedDistrictId(district.id)}
                                                            className={`p-3 rounded-lg cursor-pointer flex justify-between items-center transition-all ${selectedDistrictId === district.id ? 'bg-appleBlue text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
                                                            <span className="font-medium">{district.name}</span>
                                                            <button onClick={(e) => { e.stopPropagation(); handleDeleteLocation('district', district.id); }} className={`text-xs px-2 py-1 rounded ${selectedDistrictId === district.id ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-red-50 hover:bg-red-100 text-red-500'}`}>Sil</button>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex gap-2">
                                                    <input type="text" placeholder="Yeni İlçe Adı" className="w-full text-sm p-2 rounded-lg border border-gray-200 outline-none" onKeyDown={(e) => { if (e.key === 'Enter') { setNewItemName(e.currentTarget.value); handleAddLocation('district', selectedCityId); e.currentTarget.value = ""; } }} onChange={(e) => setNewItemName(e.target.value)} />
                                                    <button onClick={() => handleAddLocation('district', selectedCityId)} className="px-3 py-2 bg-appleDark text-white rounded-lg text-sm">+</button>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex-1 flex items-center justify-center text-sm text-gray-400">Önce bir il seçin</div>
                                        )}
                                    </div>

                                    {/* Neighborhoods Column */}
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 h-[500px] flex flex-col">
                                        <h4 className="font-medium text-appleDark mb-4">Mahalleler & Çarpanlar</h4>
                                        {selectedDistrictId ? (
                                            <>
                                                <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-2">
                                                    {locationsMap.find(c => c.id === selectedCityId)?.districts?.find((d: any) => d.id === selectedDistrictId)?.neighborhoods?.map((neigh: any) => (
                                                        <div key={neigh.id} className="p-3 rounded-lg bg-white border border-gray-100 flex flex-col gap-2">
                                                            <div className="flex justify-between items-center">
                                                                <span className="font-medium text-sm text-appleDark">{neigh.name}</span>
                                                                <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">{neigh.multiplier}x</span>
                                                            </div>
                                                            <div className="flex justify-end">
                                                                <button onClick={() => handleDeleteLocation('neighborhood', neigh.id)} className="text-xs px-2 py-1 bg-red-50 hover:bg-red-100 text-red-500 rounded">Sil</button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex flex-col gap-2 bg-white p-3 rounded-xl border border-gray-200">
                                                    <input type="text" placeholder="Yeni Mahalle Adı" className="w-full text-sm border-b border-gray-100 pb-2 outline-none" onChange={(e) => setNewItemName(e.target.value)} />
                                                    <div className="flex items-center gap-2">
                                                        <input type="number" step="0.01" placeholder="Çarpan (Örn: 1.25)" className="flex-1 text-sm p-2 bg-gray-50 rounded text-center outline-none" onChange={(e) => setNewMultiplier(parseFloat(e.target.value))} />
                                                        <button onClick={() => handleAddLocation('neighborhood', selectedDistrictId)} className="px-3 py-2 bg-appleBlue text-white rounded text-sm whitespace-nowrap">Ekle</button>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex-1 flex items-center justify-center text-sm text-gray-400">Önce bir ilçe seçin</div>
                                        )}
                                    </div>

                                </div>
                            </div>
                        )}

                        {activeTab === "contacts" && (
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-semibold text-lg text-appleDark">Gelen Kutusu (İletişim & Destek)</h3>
                                </div>

                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-gray-50/50 text-gray-500 border-b border-gray-100">
                                            <tr>
                                                <th className="px-6 py-4 font-medium">Tarih</th>
                                                <th className="px-6 py-4 font-medium">Gönderen</th>
                                                <th className="px-6 py-4 font-medium">Konu</th>
                                                <th className="px-6 py-4 font-medium">Mesaj</th>
                                                <th className="px-6 py-4 font-medium text-center">İşlem</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {contacts.length === 0 ? (
                                                <tr>
                                                    <td colSpan={5} className="text-center py-8 text-gray-400">Gelen kutusu boş.</td>
                                                </tr>
                                            ) : (
                                                contacts.map((contact: any) => (
                                                    <tr key={contact.id} className={`transition-colors ${contact.isRead ? 'bg-white opacity-60' : 'bg-blue-50/30'}`}>
                                                        <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                                            {new Date(contact.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="font-medium text-appleDark">{contact.name}</div>
                                                            <div className="text-gray-400 text-xs">{contact.email}</div>
                                                            {contact.phone && <div className="text-gray-400 text-xs">{contact.phone}</div>}
                                                        </td>
                                                        <td className="px-6 py-4 font-medium text-appleDark hidden md:table-cell">
                                                            {contact.subject || 'Konu Yok'}
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                                                            {contact.message}
                                                        </td>
                                                        <td className="px-6 py-4 text-center space-x-2">
                                                            <button
                                                                onClick={() => {
                                                                    alert(`Gönderen: ${contact.name}\nE-posta: ${contact.email}\n${contact.phone ? 'Telefon: ' + contact.phone + '\n' : ''}Konu: ${contact.subject || 'Belirtilmedi'}\n\nMesaj:\n${contact.message}`);
                                                                    if (!contact.isRead) handleReadContact(contact.id, Boolean(contact.isRead));
                                                                }}
                                                                className="text-appleBlue hover:text-blue-700 text-xs font-medium px-3 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                                                                Oku
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteContact(contact.id)}
                                                                className="text-red-500 hover:text-red-700 text-xs font-medium px-3 py-1.5 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                                                                Sil
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === "pages" && (
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-semibold text-lg text-appleDark">Sayfa Yönetimi (CMS)</h3>
                                    <p className="text-sm text-gray-500">Footer ve üst menüdeki kurumsal sayfaları düzenleyin.</p>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="glass-card p-6 shadow-sm border border-gray-100 flex flex-col h-[500px]">
                                        <h4 className="font-medium text-appleDark mb-6">Mevcut Sayfalar</h4>
                                        <div className="flex-1 overflow-y-auto space-y-3">
                                            {pages.length === 0 && <p className="text-sm text-gray-400 text-center mt-10">Hiç sayfa bulunamadı. Yandan ekleyin.</p>}
                                            {pages.map((p: any) => (
                                                <div key={p.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center">
                                                    <div>
                                                        <h5 className="font-medium text-appleDark">{p.title}</h5>
                                                        <p className="text-xs text-appleLightGray mt-1">/p/{p.slug}</p>
                                                    </div>
                                                    <button onClick={() => handleDeletePage(p.id)} className="px-3 py-1.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg text-xs font-medium transition-colors">Sil</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="glass-card p-6 shadow-sm border border-gray-100 h-[500px] flex flex-col">
                                        <h4 className="font-medium text-appleDark mb-6">Yeni Sayfa Ekle</h4>
                                        <div className="space-y-4 flex flex-col flex-1">
                                            <div>
                                                <label className="block text-sm font-medium text-appleDark mb-1">Sayfa Başlığı</label>
                                                <input value={pageTitle} onChange={e => setPageTitle(e.target.value)} type="text" className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-appleBlue" placeholder="Örn: Gizlilik Politikası" />
                                            </div>
                                            <div className="flex-1 flex flex-col">
                                                <label className="block text-sm font-medium text-appleDark mb-1">Sayfa İçeriği (HTML/Metin)</label>
                                                <textarea value={pageContent} onChange={e => setPageContent(e.target.value)} className="w-full flex-1 p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-appleBlue resize-none" placeholder="<p>Politika metnimiz...</p>"></textarea>
                                            </div>
                                            <button onClick={handleAddPage} className="w-full py-3 bg-appleDark text-white rounded-xl shadow-apple font-medium hover:bg-black transition-colors">
                                                Yayınla
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "blog" && (
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-semibold text-lg text-appleDark">Otomatik Yapay Zeka Blog Yönetimi</h3>
                                    <p className="text-sm text-gray-500">Google SEO için sektör haberlerini yapay zekaya yazdırın.</p>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="glass-card p-6 shadow-sm border border-gray-100 flex flex-col h-[500px]">
                                        <h4 className="font-medium text-appleDark mb-6">Yayınlanmış İçerikler</h4>
                                        <div className="flex-1 overflow-y-auto space-y-3">
                                            {blogs.length === 0 && <p className="text-sm text-gray-400 text-center mt-10">Hiç blog bulunmuyor.</p>}
                                            {blogs.map((b: any) => (
                                                <div key={b.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center">
                                                    <div>
                                                        <a href={`/blog/${b.slug}`} target="_blank" rel="noreferrer" className="font-medium text-appleBlue hover:underline">{b.title}</a>
                                                        <p className="text-xs text-appleLightGray mt-1 line-clamp-1">{b.summary}</p>
                                                    </div>
                                                    <button onClick={() => handleDeleteBlog(b.id)} className="px-3 py-1.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg text-xs font-medium transition-colors ml-2 shrink-0">Sil</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="glass-card p-6 shadow-sm border border-gray-200 bg-gradient-to-br from-blue-50 to-white h-[500px] flex flex-col">
                                        <div className="flex items-center gap-2 mb-6">
                                            <span className="text-2xl">🤖</span>
                                            <h4 className="font-bold text-appleDark">AI Makale Motoru</h4>
                                        </div>
                                        <div className="space-y-4 flex flex-col flex-1">
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                Aşağıya bir konu yazın (Örn: &quot;2026 Kadıköy kira getirileri&quot;).
                                                Yapay zeka tam bir SEO uyumlu yazar gibi makaleyi tasarlar, görsel bulur ve anında yayına alır.
                                            </p>
                                            <div className="mt-4">
                                                <label className="block text-sm font-medium text-appleDark mb-1">Makale Konusu</label>
                                                <input disabled={aiGenerating} value={blogTopic} onChange={e => setBlogTopic(e.target.value)} type="text" className="w-full p-4 rounded-xl border border-blue-200 outline-none focus:ring-2 focus:ring-appleBlue bg-white shadow-sm" placeholder="Örn: Konut kredisi faizleri düştü mü?" />
                                            </div>
                                            <div className="flex-1 flex items-end">
                                                <button disabled={aiGenerating || !blogTopic.trim()} onClick={handleAIBlogGenerate} className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                                                    {aiGenerating ? "Yapay Zeka Makaleyi Yazıyor... ⏳" : "Ateşle ve Yayınla 🚀"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


