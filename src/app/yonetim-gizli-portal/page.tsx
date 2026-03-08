"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Users, Search, RefreshCw, BarChart2, Star, Calculator, Map, Mail, Bell, MessageSquare, LayoutDashboard, Settings, Activity, Clock, FileText, CheckCircle, Smartphone, Globe, Shield, CreditCard, Crown, Eye, X, ChevronRight, Share2, TrendingUp, Building2, Trash2, Edit2, Download, LogOut, Target } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

export const dynamic = 'force-dynamic';

const COLORS = ['#0071E3', '#34C759', '#FF9500', '#FF3B30', '#5856D6'];

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const [activeTab, setActiveTab] = useState("overview"); // Default tab is now overview
    const [dbLeads, setDbLeads] = useState<any[]>([]);
    const [contacts, setContacts] = useState<any[]>([]);
    const [realtors, setRealtors] = useState<any[]>([]);
    const [feedbacks, setFeedbacks] = useState<any[]>([]);
    const [payments, setPayments] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [trendRange, setTrendRange] = useState("7");

    // Phase 3 States
    const [b2cUsers, setB2cUsers] = useState<any[]>([]);
    const [radarDeals, setRadarDeals] = useState<any[]>([]);

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

    // V24: Lead filtering & bulk
    const [leadSearch, setLeadSearch] = useState("");
    const [leadDateFilter, setLeadDateFilter] = useState("");
    const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

    // V24: Blog editing
    const [editingBlog, setEditingBlog] = useState<any>(null);
    const [editBlogTitle, setEditBlogTitle] = useState("");
    const [editBlogContent, setEditBlogContent] = useState("");

    // V24: Contact info settings
    const [contactEmail, setContactEmail] = useState("destek@evindegeri.com");
    const [contactPhone, setContactPhone] = useState("");
    const [contactAddress, setContactAddress] = useState("Istanbul, Turkiye");
    const [workingHours, setWorkingHours] = useState("Hafta ici: 09:00 - 18:00, Hafta sonu: 10:00 - 15:00");
    const [emailTemplate, setEmailTemplate] = useState("Sayin {name},\n\nEvinizin tahmini degeri: {value}\n\nDetayli raporunuz icin asagidaki linke tiklayabilirsiniz.\n\nSaygilarimizla,\nevindegeri.com Ekibi");

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
        mMasrafli: "",
        b2bMonthlyPrice: "",
        b2bDiscountPercentage: "",
        b2bProPlusPrice: "",
        dailyRateLimit: "3",
        dailyBlogCount: "5",
        blogCategories: "",
        blogAutoPublish: "true",

        // V22: New Multipliers
        mHeatingDogalgaz: "",
        mHeatingYerden: "",
        mHeatingSoba: "",
        mViewDeniz: "",
        mViewDoga: "",
        mViewSehir: "",
        mPropertyDubleks: "",
        dampeningFactor: "",

        // V20: Socials & UI Controls
        instagramUrl: "",
        twitterUrl: "",
        linkedinUrl: "",

        // V3: AI & Data Enrichments
        enableEarthquake: "true",
        enableMarketIndex: "true",
        enableVision: "true",
        enableRLHF: "true",
        showSocialMedia: true,
        valuationCounter: 0,
    });
    const [savingSettings, setSavingSettings] = useState(false);

    // V27: Test Algorithm Mode States
    const [testArea, setTestArea] = useState("100");
    const [testAge, setTestAge] = useState("5");
    const [testFloor, setTestFloor] = useState("Ara Kat");
    const [testElevator, setTestElevator] = useState(true);
    const [testParking, setTestParking] = useState(true);
    const [testBalcony, setTestBalcony] = useState(true);
    const [testHeating, setTestHeating] = useState("Dogalgaz");
    const [testView, setTestView] = useState("Sehir");
    const [testResult, setTestResult] = useState<number | null>(null);

    const handleCalculateTest = () => {
        const area = parseFloat(testArea || "0");
        const age = parseFloat(testAge || "0");
        const basePrice = parseFloat(settings.baseSqmPrice || "25000");
        const ageDep = parseFloat(settings.buildingAgeDepreciation || "1.2");

        let val = basePrice * area;

        // Age desc
        val -= val * (age * (ageDep / 100));

        // Floor
        if (testFloor === "Ara Kat") val *= parseFloat(settings.multAra || "1.05");
        else if (testFloor === "Zemin/Giris") val *= parseFloat(settings.multZemin || "0.95");
        else if (testFloor === "En Ust Kat") val *= parseFloat(settings.multUst || "0.98");
        else if (testFloor === "Dubleks") val *= parseFloat(settings.multCati || "1.1");
        else if (testFloor === "Mustakil") val *= parseFloat(settings.multMustakil || "1.3");
        else if (testFloor === "Kot") val *= parseFloat(settings.multKot1 || "0.85");
        else if (testFloor === "Bodrum") val *= parseFloat(settings.multBodrum || "0.75");

        if (testElevator) val *= parseFloat(settings.elevatorMultiplier || "1.05");
        if (testParking) val *= parseFloat(settings.parkingMultiplier || "1.10");
        if (testBalcony) val *= parseFloat(settings.multBalkonVar || "1.03");

        if (testHeating === "Dogalgaz") val *= parseFloat(settings.mHeatingDogalgaz || "1.02");
        else if (testHeating === "Yerden") val *= parseFloat(settings.mHeatingYerden || "1.08");
        else if (testHeating === "Soba") val *= parseFloat(settings.mHeatingSoba || "0.85");

        if (testView === "Deniz") val *= parseFloat(settings.mViewDeniz || "1.25");
        else if (testView === "Doga") val *= parseFloat(settings.mViewDoga || "1.05");
        else if (testView === "Sehir") val *= parseFloat(settings.mViewSehir || "1.0");

        setTestResult(val);
    };

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
            const res = await fetch("/api/admin/generate-blog", {
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

    // V27: Testimonials
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [testimonialForm, setTestimonialForm] = useState({ name: "", role: "", comment: "", rating: 5, isActive: true });

    const loadTestimonials = () => {
        fetch("/api/admin/testimonials")
            .then(res => res.json())
            .then(data => { if (data.success) setTestimonials(data.data); })
            .catch(err => console.error(err));
    };

    const handleAddTestimonial = async () => {
        if (!testimonialForm.name || !testimonialForm.comment) return alert("İsim ve Yorum zorunludur");
        const res = await fetch("/api/admin/testimonials", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(testimonialForm)
        });
        const data = await res.json();
        if (data.success) {
            setTestimonialForm({ name: "", role: "", comment: "", rating: 5, isActive: true });
            loadTestimonials();
        } else alert("Ekleme başarısız: " + data.error);
    };

    const handleDeleteTestimonial = async (id: string) => {
        if (!confirm("Bu yorumu silmek istiyor musunuz?")) return;
        const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
        const data = await res.json();
        if (data.success) loadTestimonials();
        else alert("Silme başarısız: " + data.error);
    };

    const handleToggleTestimonial = async (id: string, currentStatus: boolean) => {
        const res = await fetch("/api/admin/testimonials", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, isActive: !currentStatus })
        });
        if ((await res.json()).success) loadTestimonials();
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

    const loadFeedbacks = () => {
        fetch("/api/admin/feedbacks")
            .then(res => res.json())
            .then(data => { if (data.success) setFeedbacks(data.data); })
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
        if (!confirm("Bu mesaji silmek istiyor musunuz?")) return;
        await fetch(`/api/admin/contact?id=${id}`, { method: "DELETE" });
        loadContacts();
    };

    // V24: B2B Subscription Management
    const handleToggleB2bPro = async (realtorId: string, currentStatus: boolean) => {
        const action = currentStatus ? "iptal" : "aktif";
        if (!confirm(`Bu kullanicinin PRO aboneligini ${action} etmek istiyor musunuz?`)) return;
        try {
            const res = await fetch("/api/admin/realtors/manage", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ realtorId, isPro: !currentStatus, action: "togglePro" })
            });
            if (res.ok) loadRealtors();
        } catch (e) { console.error(e); }
    };

    // V24: Blog Edit
    const handleEditBlog = (blog: any) => {
        setEditingBlog(blog);
        setEditBlogTitle(blog.title);
        setEditBlogContent(blog.content || "");
    };

    const handleSaveEditBlog = async () => {
        if (!editingBlog) return;
        try {
            const res = await fetch(`/api/admin/blog`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: editingBlog.id, title: editBlogTitle, content: editBlogContent })
            });
            if (res.ok) {
                setEditingBlog(null);
                loadBlogs();
            }
        } catch (e) { console.error(e); }
    };

    // V24: Bulk Lead Operations
    const handleBulkDeleteLeads = async () => {
        if (selectedLeads.length === 0) return;
        if (!confirm(`${selectedLeads.length} talebi silmek istiyor musunuz?`)) return;
        try {
            for (const id of selectedLeads) {
                await fetch(`/api/admin/leads?id=${id}`, { method: "DELETE" });
            }
            setSelectedLeads([]);
            fetch("/api/admin/leads").then(r => r.json()).then(data => { if (data.success) setDbLeads(data.data); });
        } catch (e) { console.error(e); }
    };

    const toggleLeadSelection = (id: string) => {
        setSelectedLeads(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const toggleAllLeads = () => {
        if (selectedLeads.length === filteredLeads.length) {
            setSelectedLeads([]);
        } else {
            setSelectedLeads(filteredLeads.map((l: any) => l.id));
        }
    };

    // V24: Filtered leads
    const filteredLeads = dbLeads.filter((lead: any) => {
        const searchMatch = !leadSearch ||
            (lead.name || "").toLowerCase().includes(leadSearch.toLowerCase()) ||
            (lead.phone || "").includes(leadSearch) ||
            (lead.email || "").toLowerCase().includes(leadSearch.toLowerCase());
        const dateMatch = !leadDateFilter || (lead.date || "").includes(leadDateFilter);
        return searchMatch && dateMatch;
    });

    // V24: Request notification permission
    useEffect(() => {
        if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "default") {
            Notification.requestPermission();
        }
    }, []);

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
                .then(data => { if (data.success) setSettings(prev => ({ ...prev, ...data.data })); })
                .catch(err => console.error(err));
        } else if (session && activeTab === "blog") {
            loadBlogs();
        } else if (session && activeTab === "contacts") {
            loadContacts();
        } else if (session && activeTab === "b2b-users") {
            loadRealtors();
        } else if (session && activeTab === "b2c-users") {
            fetch("/api/admin/users")
                .then(res => res.json())
                .then(data => { if (!data.error) setB2cUsers(data); })
                .catch(err => console.error(err));
        } else if (session && activeTab === "radar-deals") {
            fetch("/api/admin/radar")
                .then(res => res.json())
                .then(data => { if (!data.error) setRadarDeals(data); })
                .catch(err => console.error(err));
        } else if (session && activeTab === "feedbacks") {
            loadFeedbacks();
        } else if (session && activeTab === "testimonials") {
            loadTestimonials();
        } else if (session && activeTab === "payments") {
            fetch("/api/admin/payments")
                .then(res => res.json())
                .then(data => { if (data.success) setPayments(data.data); })
                .catch(err => console.error("Payments fail:", err));
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
                        onClick={() => setActiveTab("b2c-users")}
                        className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'b2c-users' ? 'bg-appleBlue text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Users size={18} className="mr-3" /> Bireysel Kullanıcılar
                    </button>
                    <button
                        onClick={() => setActiveTab("radar-deals")}
                        className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'radar-deals' ? 'bg-appleBlue text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Target size={18} className="mr-3" /> Yatırım Radarı
                    </button>
                    <button
                        onClick={() => setActiveTab("contacts")}
                        className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'contacts' ? 'bg-appleBlue text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <MessageSquare size={18} className="mr-3" /> Gelen Kutusu
                    </button>
                    <button
                        onClick={() => setActiveTab("feedbacks")}
                        className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'feedbacks' ? 'bg-appleBlue text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Shield size={18} className="mr-3" /> Fiyat Şikayetleri
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
                    <button
                        onClick={() => setActiveTab("payments")}
                        className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'payments' ? 'bg-appleBlue text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <CreditCard size={18} className="mr-3" /> Ödemeler & Gelirler
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

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-center items-center">
                                        <p className="text-gray-500 text-sm mb-2 text-center w-full truncate">Toplam Sorgu Sayısı</p>
                                        <h4 className="text-3xl font-bold text-appleDark">{stats.totalRequests}</h4>
                                    </div>
                                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-center items-center">
                                        <p className="text-gray-500 text-sm mb-2 text-center w-full truncate">Aktif PRO Emlakçı</p>
                                        <h4 className="text-3xl font-bold text-blue-500">{stats.totalProRealtors || 0}</h4>
                                    </div>
                                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200 flex flex-col justify-center items-center">
                                        <p className="text-green-700/80 text-sm mb-2 text-center w-full truncate">Aylık Tahmini B2B Ciro</p>
                                        <h4 className="text-3xl font-bold text-green-600">
                                            {new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(stats.estimatedRevenue || 0)}
                                        </h4>
                                    </div>
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 flex flex-col justify-center items-center">
                                        <p className="text-blue-600/80 text-sm mb-2 text-center w-full truncate">Ortalama Değerleme(AI)</p>
                                        <h4 className="text-2xl font-bold text-appleBlue">
                                            {new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(stats.avgValue)}
                                        </h4>
                                    </div>
                                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-center items-center">
                                        <p className="text-gray-500 text-sm mb-2 text-center w-full truncate">Popüler Bölge</p>
                                        <h4 className="text-2xl font-bold text-appleDark text-center line-clamp-2">
                                            {stats.topDistricts[0]?.name || "-"}
                                        </h4>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-[380px] flex flex-col">
                                        <div className="flex justify-between items-center mb-6">
                                            <h4 className="text-sm font-medium text-gray-500">Sorgu Trendi (Değerlemeler)</h4>
                                            <div className="flex bg-gray-100 rounded-lg p-1">
                                                <button onClick={() => setTrendRange?.("7")} className={`px-3 py-1 text-xs font-bold rounded-md ${(!trendRange || trendRange === '7') ? 'bg-white shadow-sm text-appleDark' : 'text-gray-500'}`}>7 Gün</button>
                                                <button onClick={() => setTrendRange?.("30")} className={`px-3 py-1 text-xs font-bold rounded-md ${trendRange === '30' ? 'bg-white shadow-sm text-appleDark' : 'text-gray-500'}`}>30 Gün</button>
                                            </div>
                                        </div>
                                        <div className="flex-1 w-full relative">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={trendRange === '30' ? stats.trend30 : stats.trend}>
                                                    <XAxis dataKey="date" stroke="#8884d8" fontSize={11} tickLine={false} axisLine={false} tickMargin={8} minTickGap={15} />
                                                    <YAxis stroke="#8884d8" fontSize={12} tickLine={false} axisLine={false} />
                                                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                                    <Bar dataKey="count" fill="#0071E3" radius={[4, 4, 0, 0]} maxBarSize={40} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-[380px] flex flex-col">
                                        <h4 className="text-sm font-medium text-gray-500 mb-6 text-center">Fiyat Dağılımı (Değerleme Aralıkları)</h4>
                                        <div className="flex-1 w-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={stats.priceDistribution || []}
                                                        cx="50%"
                                                        cy="50%"
                                                        innerRadius={60}
                                                        outerRadius={100}
                                                        paddingAngle={4}
                                                        dataKey="count"
                                                    >
                                                        {(stats.priceDistribution || []).map((entry: any, index: number) => (
                                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-[380px] flex flex-col lg:col-span-2">
                                        <h4 className="text-sm font-medium text-gray-500 mb-6 text-center">En Çok Sorgulanan 5 İlçe (Tüm Zamanlar)</h4>
                                        <div className="flex-1 w-full flex justify-center items-center">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={stats.topDistricts}
                                                        cx="50%"
                                                        cy="50%"
                                                        innerRadius={70}
                                                        outerRadius={110}
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
                                    <div className="flex gap-3 items-center flex-wrap">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <input type="text" placeholder="Isim, telefon veya e-posta..." value={leadSearch} onChange={e => setLeadSearch(e.target.value)} className="pl-9 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-appleBlue outline-none w-56" />
                                        </div>
                                        <input type="date" value={leadDateFilter} onChange={e => setLeadDateFilter(e.target.value)} className="px-3 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-appleBlue outline-none" />
                                        {selectedLeads.length > 0 && (
                                            <button onClick={handleBulkDeleteLeads} className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors flex items-center gap-1">
                                                <Trash2 size={14} /> {selectedLeads.length} Secili Sil
                                            </button>
                                        )}
                                        <button onClick={handleDownloadCSV} className="px-4 py-2 bg-appleBlue text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center shadow-sm">
                                            CSV Indir
                                        </button>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-gray-50/50 text-gray-500">
                                            <tr>
                                                <th className="px-6 py-4 font-medium">
                                                    <input type="checkbox" checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0} onChange={toggleAllLeads} className="rounded" />
                                                </th>
                                                <th className="px-6 py-4 font-medium">Talep No</th>
                                                <th className="px-6 py-4 font-medium">Tarih</th>
                                                <th className="px-6 py-4 font-medium">Ad Soyad</th>
                                                <th className="px-6 py-4 font-medium">Iletisim</th>
                                                <th className="px-6 py-4 font-medium">Degerleme Sonucu</th>
                                                <th className="px-6 py-4 font-medium">Kullanici Geri Bildirimi</th>
                                                <th className="px-6 py-4 font-medium">Islem</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {filteredLeads.length === 0 && (
                                                <tr>
                                                    <td colSpan={8} className="text-center py-8 text-gray-400">Henuz talep bulunmuyor.</td>
                                                </tr>
                                            )}
                                            {filteredLeads.map((lead: any) => (
                                                <tr key={lead.id} className={`hover:bg-gray-50/50 transition-colors ${selectedLeads.includes(lead.id) ? 'bg-blue-50/50' : ''}`}>
                                                    <td className="px-6 py-4">
                                                        <input type="checkbox" checked={selectedLeads.includes(lead.id)} onChange={() => toggleLeadSelection(lead.id)} className="rounded" />
                                                    </td>
                                                    <td className="px-6 py-4 font-medium text-appleDark">#{lead.requestNumber || lead.id.substring(0, 6)}</td>
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
                                                        {lead.priceFeedback ? (
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${lead.priceFeedback === 'YUKSEK' ? 'bg-orange-100 text-orange-800' :
                                                                lead.priceFeedback === 'DUSUK' ? 'bg-red-100 text-red-800' :
                                                                    'bg-emerald-100 text-emerald-800'
                                                                }`}>
                                                                {lead.priceFeedback}
                                                            </span>
                                                        ) : (
                                                            <span className="text-gray-300 text-xs">-</span>
                                                        )}
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
                                                <th className="px-6 py-4 font-medium text-center">Islem</th>
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
                                                            {r.subscriptionTier === 'PRO_PLUS' && isActive ? (
                                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                                    <Crown size={12} /> PRO PLUS
                                                                </span>
                                                            ) : isActive ? (
                                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                    <Crown size={12} /> PRO
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                                                    Ucretsiz
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 text-center font-bold text-appleBlue">
                                                            {r._count.valuations}
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <select
                                                                value={r.subscriptionTier === 'PRO_PLUS' && isActive ? 'PRO_PLUS' : isActive ? 'PRO' : 'FREE'}
                                                                onChange={async (e) => {
                                                                    const tier = e.target.value;
                                                                    if (tier === 'FREE') {
                                                                        await handleToggleB2bPro(r.id, true);
                                                                    } else {
                                                                        const res = await fetch('/api/admin/realtors/manage', {
                                                                            method: 'POST',
                                                                            headers: { 'Content-Type': 'application/json' },
                                                                            body: JSON.stringify({ realtorId: r.id, isPro: true, action: 'changeTier', tier })
                                                                        });
                                                                        if (res.ok) loadRealtors();
                                                                    }
                                                                }}
                                                                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 bg-white focus:ring-2 focus:ring-appleBlue outline-none"
                                                            >
                                                                <option value="FREE">Ucretsiz</option>
                                                                <option value="PRO">PRO</option>
                                                                <option value="PRO_PLUS">PRO PLUS</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === "payments" && (
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-semibold text-lg text-appleDark">B2B Ödemeler & Gelirler (ParamPos)</h3>
                                    <p className="text-sm text-gray-500">Abonelik satın alımları ve iptalleri buradan takip edebilirsiniz.</p>
                                </div>
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-gray-50/50 text-gray-500 border-b border-gray-100">
                                            <tr>
                                                <th className="px-6 py-4 font-medium">İşlem Tarihi</th>
                                                <th className="px-6 py-4 font-medium">Sipariş / İşlem No</th>
                                                <th className="px-6 py-4 font-medium">Firma & İletişim</th>
                                                <th className="px-6 py-4 font-medium">Paket</th>
                                                <th className="px-6 py-4 font-medium">Tutar</th>
                                                <th className="px-6 py-4 font-medium text-center">Durum</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {payments.length === 0 ? (
                                                <tr><td colSpan={6} className="text-center py-8 text-gray-400">Herhangi bir ödeme kaydı bulunamadı.</td></tr>
                                            ) : (
                                                payments.map((p: any) => (
                                                    <tr key={p.id} className="transition-colors hover:bg-gray-50 bg-white">
                                                        <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                                            {new Date(p.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-500 font-mono text-xs">
                                                            {p.transactionId}
                                                            {p.errorMessage && <div className="text-[10px] text-red-500 block mt-1 line-clamp-2 max-w-[200px]" title={p.errorMessage}>{p.errorMessage}</div>}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="font-medium text-appleDark">{p.realtor?.companyName || "Anonim"}</div>
                                                            <div className="text-gray-400 text-xs">{p.realtor?.phone || "-"}</div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {p.tierPurchased === "PRO_PLUS" ? (
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200 shadow-sm"><Crown size={12} className="mr-1" /> PRO PLUS</span>
                                                            ) : p.tierPurchased === "PRO" ? (
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">PRO</span>
                                                            ) : (
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">{p.tierPurchased || "-"}</span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 font-bold text-green-600">
                                                            {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(p.amount)}
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            {p.status === "SUCCESS" ? (
                                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle size={14} className="mr-1" /> Başarılı</span>
                                                            ) : p.status === "PENDING" ? (
                                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Clock size={14} className="mr-1" /> Bekliyor</span>
                                                            ) : (
                                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"><X size={14} className="mr-1" /> Başarısız</span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
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
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1 flex justify-between">
                                                    <span>B2B PRO Aylık Fiyatı (₺)</span>
                                                    <span className="text-xs text-blue-500 font-medium bg-blue-50 px-2 py-0.5 rounded">Yeni</span>
                                                </label>
                                                <input type="number" value={settings.b2bMonthlyPrice || ""} onChange={e => setSettings({ ...settings, b2bMonthlyPrice: e.target.value })} className="w-full p-2 rounded-xl border border-blue-200 focus:ring-2 focus:ring-appleBlue outline-none bg-blue-50/30 text-sm font-medium" />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1 flex justify-between">
                                                    <span>B2B İndirim Oranı (%)</span>
                                                    <span className="text-xs text-green-500 font-medium bg-green-50 px-2 py-0.5 rounded">Opsiyonel</span>
                                                </label>
                                                <input type="number" placeholder="Orn: 20 (Bos birakilirsa indirimsiz)" value={settings.b2bDiscountPercentage || ""} onChange={e => setSettings({ ...settings, b2bDiscountPercentage: e.target.value })} className="w-full p-2 rounded-xl border border-green-200 focus:ring-2 focus:ring-green-500 outline-none bg-green-50/30 text-sm font-medium" />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-sm text-gray-600 mb-1 flex justify-between">
                                                    <span>B2B PRO PLUS Aylik Fiyati (TL)</span>
                                                    <span className="text-xs text-purple-500 font-medium bg-purple-50 px-2 py-0.5 rounded">Yeni</span>
                                                </label>
                                                <input type="number" value={settings.b2bProPlusPrice || ""} onChange={e => setSettings({ ...settings, b2bProPlusPrice: e.target.value })} className="w-full p-2 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-500 outline-none bg-purple-50/30 text-sm font-medium" placeholder="750" />
                                                <p className="text-xs text-gray-400 mt-1">PRO PLUS paketi icin aylik ucret. Bos birakilirsa 750 TL kullanilir.</p>
                                            </div>
                                            <div className="col-span-2 border-t border-gray-100 pt-4 mt-2">
                                                <h5 className="text-xs font-semibold text-gray-500 uppercase mb-3">AI & Veri Entegrasyonlari (V3)</h5>
                                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                                    <label className="flex items-center gap-2 text-sm text-gray-700 bg-white p-3 rounded-xl border border-gray-100 cursor-pointer shadow-sm hover:border-appleBlue transition-colors">
                                                        <input type="checkbox" checked={settings.enableEarthquake === "true"} onChange={e => setSettings({ ...settings, enableEarthquake: e.target.checked ? "true" : "false" })} className="rounded text-appleBlue focus:ring-appleBlue w-4 h-4 cursor-pointer" />
                                                        <span className="font-medium whitespace-nowrap">Deprem & Zemin</span>
                                                    </label>
                                                    <label className="flex items-center gap-2 text-sm text-gray-700 bg-white p-3 rounded-xl border border-gray-100 cursor-pointer shadow-sm hover:border-appleBlue transition-colors">
                                                        <input type="checkbox" checked={settings.enableMarketIndex === "true"} onChange={e => setSettings({ ...settings, enableMarketIndex: e.target.checked ? "true" : "false" })} className="rounded text-appleBlue focus:ring-appleBlue w-4 h-4 cursor-pointer" />
                                                        <span className="font-medium whitespace-nowrap">Canli Turkiye Endeksi</span>
                                                    </label>
                                                    <label className="flex items-center gap-2 text-sm text-gray-700 bg-white p-3 rounded-xl border border-gray-100 cursor-pointer shadow-sm hover:border-appleBlue transition-colors">
                                                        <input type="checkbox" checked={settings.enableVision === "true"} onChange={e => setSettings({ ...settings, enableVision: e.target.checked ? "true" : "false" })} className="rounded text-appleBlue focus:ring-appleBlue w-4 h-4 cursor-pointer" />
                                                        <span className="font-medium whitespace-nowrap">Resim Analizi (Vision AI)</span>
                                                    </label>
                                                    <label className="flex items-center gap-2 text-sm text-gray-700 bg-white p-3 rounded-xl border border-gray-100 cursor-pointer shadow-sm hover:border-appleBlue transition-colors">
                                                        <input type="checkbox" checked={settings.enableRLHF === "true"} onChange={e => setSettings({ ...settings, enableRLHF: e.target.checked ? "true" : "false" })} className="rounded text-appleBlue focus:ring-appleBlue w-4 h-4 cursor-pointer" />
                                                        <span className="font-medium whitespace-nowrap">Makine Ogrenmesi (M.O.)</span>
                                                    </label>
                                                </div>

                                                <h5 className="text-xs font-semibold text-gray-500 uppercase mb-3">Guvenlik ve Blog Otomasyonu</h5>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm text-gray-600 mb-1 flex justify-between">
                                                            <span>Gunluk Degerleme Limiti</span>
                                                            <span className="text-xs text-orange-500 font-medium bg-orange-50 px-2 py-0.5 rounded">Guvenlik</span>
                                                        </label>
                                                        <input type="number" value={settings.dailyRateLimit || "3"} onChange={e => setSettings({ ...settings, dailyRateLimit: e.target.value })} className="w-full p-2 rounded-xl border border-orange-200 focus:ring-2 focus:ring-orange-500 outline-none bg-orange-50/30 text-sm font-medium" />
                                                        <p className="text-xs text-gray-400 mt-1">Her IP/telefon icin gunluk maks degerleme sayisi</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm text-gray-600 mb-1 flex justify-between">
                                                            <span>Gunluk Otomatik Blog Sayisi</span>
                                                            <span className="text-xs text-indigo-500 font-medium bg-indigo-50 px-2 py-0.5 rounded">CRON</span>
                                                        </label>
                                                        <input type="number" value={settings.dailyBlogCount || "5"} onChange={e => setSettings({ ...settings, dailyBlogCount: e.target.value })} className="w-full p-2 rounded-xl border border-indigo-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-indigo-50/30 text-sm font-medium" />
                                                        <p className="text-xs text-gray-400 mt-1">Her gun otomatik uretilecek blog sayisi (1-10)</p>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 mt-4">
                                                    <div className="col-span-2">
                                                        <label className="block text-sm text-gray-600 mb-2 font-medium">Blog Kategorileri (Secilen konularda icerik uretilir)</label>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {['Emlak Trendleri', 'Yatirim Rehberi', 'Sehir Analizi', 'Mevzuat', 'Kira Piyasasi', 'Yapay Zeka', 'Renovasyon'].map(cat => {
                                                                const isChecked = (settings.blogCategories || "").includes(cat);
                                                                return (
                                                                    <label key={cat} className="flex items-center gap-2 text-sm text-gray-700 bg-white p-2 rounded-lg border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
                                                                        <input type="checkbox" checked={isChecked} onChange={(e) => {
                                                                            let cats = (settings.blogCategories || "").split(',').filter(Boolean);
                                                                            if (e.target.checked && !cats.includes(cat)) cats.push(cat);
                                                                            else if (!e.target.checked) cats = cats.filter(c => c !== cat);
                                                                            setSettings({ ...settings, blogCategories: cats.join(',') });
                                                                        }} className="rounded text-indigo-500 focus:ring-indigo-500 cursor-pointer w-4 h-4" />
                                                                        {cat}
                                                                    </label>
                                                                )
                                                            })}
                                                        </div>
                                                        <p className="text-xs text-gray-400 mt-2">Secim yapilmazsa sistem tum konulardan karisik secmeye baslar.</p>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <label className="block text-sm text-gray-600 mb-1 font-medium">Otomatik Yayinlama</label>
                                                        <select value={settings.blogAutoPublish || "true"} onChange={e => setSettings({ ...settings, blogAutoPublish: e.target.value })} className="w-full p-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-sm">
                                                            <option value="true">Evet, uretildiginde hemen yayinla</option>
                                                            <option value="false">Hayir, taslak olarak kaydet (Inceleme icin)</option>
                                                        </select>
                                                        <p className="text-xs text-gray-400 mt-1">Taslak yazilar sadece admin panelde gorunur, blog sayfasinda gizlenir.</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={async () => {
                                                        const res = await fetch('/api/cron/auto-blog');
                                                        const data = await res.json();
                                                        alert(data.message || 'Blog uretimi tamamlandi');
                                                    }}
                                                    className="mt-4 w-full px-4 py-3 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600 transition-colors text-sm"
                                                >
                                                    Simdi Otomatik Blog Uret (Manuel Tetikle)
                                                </button>
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
                                    <div className="space-y-4 bg-blue-50 p-6 rounded-2xl border border-blue-100">
                                        <h4 className="text-sm font-semibold text-appleBlue uppercase tracking-wider mb-4 border-b border-blue-200 pb-2">V22 Çarpanları (Isıtma / Manzara / Konut Tipi)</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Doğalgaz/Kombi</label>
                                                <input type="number" step="0.01" value={settings.mHeatingDogalgaz} onChange={e => setSettings({ ...settings, mHeatingDogalgaz: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Yerden Isıtma</label>
                                                <input type="number" step="0.01" value={settings.mHeatingYerden} onChange={e => setSettings({ ...settings, mHeatingYerden: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Soba</label>
                                                <input type="number" step="0.01" value={settings.mHeatingSoba} onChange={e => setSettings({ ...settings, mHeatingSoba: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Deniz Manzarası</label>
                                                <input type="number" step="0.01" value={settings.mViewDeniz} onChange={e => setSettings({ ...settings, mViewDeniz: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Doğa Manzarası</label>
                                                <input type="number" step="0.01" value={settings.mViewDoga} onChange={e => setSettings({ ...settings, mViewDoga: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Şehir Manzarası</label>
                                                <input type="number" step="0.01" value={settings.mViewSehir} onChange={e => setSettings({ ...settings, mViewSehir: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Dubleks Bonus</label>
                                                <input type="number" step="0.01" value={settings.mPropertyDubleks} onChange={e => setSettings({ ...settings, mPropertyDubleks: e.target.value })} className="w-full p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Sönümleme Faktörü</label>
                                                <input type="number" step="0.01" value={settings.dampeningFactor} onChange={e => setSettings({ ...settings, dampeningFactor: e.target.value })} className="w-full p-2 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-500 outline-none bg-blue-50/30 text-sm font-medium" />
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

                                    {/* V20 Sosyal Medya & İstatistik Yönetimi */}
                                    <div className="space-y-4 bg-amber-50/50 p-6 rounded-2xl border border-amber-100">
                                        <h4 className="text-sm font-semibold text-amber-800 uppercase tracking-wider mb-4 border-b border-amber-200 pb-2 flex justify-between items-center">
                                            Sosyal Ağlar & Veri Yönetimi
                                            <label className="flex items-center cursor-pointer">
                                                <div className="relative">
                                                    <input type="checkbox" className="sr-only" checked={settings.showSocialMedia || false} onChange={e => setSettings({ ...settings, showSocialMedia: e.target.checked })} />
                                                    <div className={`block w-10 h-6 rounded-full transition-colors ${settings.showSocialMedia ? 'bg-amber-500' : 'bg-gray-300'}`}></div>
                                                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${settings.showSocialMedia ? 'transform translate-x-4' : ''}`}></div>
                                                </div>
                                                <span className="ml-3 text-xs font-medium text-amber-900">Footer&apos;da Göster</span>
                                            </label>
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Instagram URL</label>
                                                <input type="text" value={settings.instagramUrl || ""} onChange={e => setSettings({ ...settings, instagramUrl: e.target.value })} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 outline-none bg-white font-mono text-sm" placeholder="https://instagram.com/..." />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">X (Twitter) URL</label>
                                                <input type="text" value={settings.twitterUrl || ""} onChange={e => setSettings({ ...settings, twitterUrl: e.target.value })} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 outline-none bg-white font-mono text-sm" placeholder="https://twitter.com/..." />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">LinkedIn URL</label>
                                                <input type="text" value={settings.linkedinUrl || ""} onChange={e => setSettings({ ...settings, linkedinUrl: e.target.value })} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 outline-none bg-white font-mono text-sm" placeholder="https://linkedin.com/in/..." />
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-amber-200/50">
                                            <label className="block text-sm font-semibold text-amber-800 mb-1">Anasayfa &quot;Tamamlanan Değerleme&quot; Sayacı</label>
                                            <input type="number" value={settings.valuationCounter || 0} onChange={e => setSettings({ ...settings, valuationCounter: parseInt(e.target.value) || 0 })} className="w-full md:w-1/3 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 outline-none bg-white font-bold text-lg text-appleDark" />
                                            <p className="text-xs text-amber-700 mt-1">Bu rakam, B2C Anasayfasında sosyal kanıt olarak gösterilecektir.</p>
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

                        {activeTab === "feedbacks" && (
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-semibold text-lg text-appleDark">Kullanıcı Fiyat Geri Bildirimleri</h3>
                                    <p className="text-sm text-gray-500">Müşterilerin sonuç sayfasında verdiği fiyat hassasiyeti bildirimleri.</p>
                                </div>

                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-gray-50/50 text-gray-500 border-b border-gray-100">
                                            <tr>
                                                <th className="px-6 py-4 font-medium">Tarih</th>
                                                <th className="px-6 py-4 font-medium">Bölge (İl/İlçe/Mahalle)</th>
                                                <th className="px-6 py-4 font-medium">Tahmini Fiyat</th>
                                                <th className="px-6 py-4 font-medium">Uzman Fiyatı</th>
                                                <th className="px-6 py-4 font-medium">Geri Bildirim</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {feedbacks.length === 0 ? (
                                                <tr>
                                                    <td colSpan={5} className="text-center py-8 text-gray-400">Henüz bildirim yok.</td>
                                                </tr>
                                            ) : (
                                                feedbacks.map((f: any) => (
                                                    <tr key={f.id} className="transition-colors bg-white hover:bg-gray-50">
                                                        <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                                            {new Date(f.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="font-medium text-appleDark">{f.neighborhood}</div>
                                                            <div className="text-gray-400 text-xs">{f.district}, {f.city}</div>
                                                        </td>
                                                        <td className="px-6 py-4 font-medium text-appleDark hidden md:table-cell">
                                                            {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(f.estimatedValue)}
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-600">
                                                            {f.overridenValue ? new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(f.overridenValue) : '-'}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {f.priceFeedback === 'YUKSEK' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">Çok Yüksek</span>}
                                                            {f.priceFeedback === 'NORMAL' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">Normal</span>}
                                                            {f.priceFeedback === 'DUSUK' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">Çok Düşük</span>}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
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
                                    <p className="text-sm text-gray-500">Bu ayarlar, kullanıcıların evinin değerini hesaplayan algoritmanın temelini oluşturur. Lütfen dikkatli değiştirin.</p>
                                </div>
                                <div className="mb-6 p-6 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white shadow-sm relative overflow-hidden text-sm">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <Calculator size={100} />
                                    </div>
                                    <h4 className="font-bold text-appleBlue mb-4 flex items-center gap-2 relative z-10"><Calculator size={18} /> Algoritma Test Modu</h4>
                                    <p className="text-gray-600 mb-4 relative z-10 max-w-2xl">Ayarları <strong>kaydetmeden önce</strong> mevcut değerlerin nasıl bir sonuç vereceğini test edin. (Temel çarpanlarla yaklaşık bir sonuç verir, il/ilçe çarpanları hesaba katılmaz)</p>

                                    <div className="grid grid-cols-2 lg:grid-cols-8 gap-3 relative z-10 items-end">
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">M2 (Brüt)</label>
                                            <input type="number" value={testArea} onChange={e => setTestArea(e.target.value)} className="w-full p-2 rounded-xl border border-gray-200 outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Bina Yaşı</label>
                                            <input type="number" value={testAge} onChange={e => setTestAge(e.target.value)} className="w-full p-2 rounded-xl border border-gray-200 outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Kat</label>
                                            <select value={testFloor} onChange={e => setTestFloor(e.target.value)} className="w-full p-2 rounded-xl border border-gray-200 outline-none bg-white">
                                                <option value="Ara Kat">Ara Kat</option>
                                                <option value="Zemin/Giris">Zemin</option>
                                                <option value="En Ust Kat">En Üst</option>
                                                <option value="Dubleks">Dubleks</option>
                                                <option value="Mustakil">Müstakil</option>
                                                <option value="Kot">Kot 1</option>
                                                <option value="Bodrum">Bodrum</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Isıtma</label>
                                            <select value={testHeating} onChange={e => setTestHeating(e.target.value)} className="w-full p-2 rounded-xl border border-gray-200 outline-none bg-white text-xs">
                                                <option value="Dogalgaz">D.Gaz</option>
                                                <option value="Yerden">Yerden</option>
                                                <option value="Soba">Soba</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Manzara</label>
                                            <select value={testView} onChange={e => setTestView(e.target.value)} className="w-full p-2 rounded-xl border border-gray-200 outline-none bg-white text-xs">
                                                <option value="Sehir">Şehir</option>
                                                <option value="Doga">Doğa</option>
                                                <option value="Deniz">Deniz</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col justify-center gap-1.5 p-2 bg-white rounded-xl border border-gray-200">
                                            <label className="flex items-center gap-1.5 text-[11px] font-medium cursor-pointer">
                                                <input type="checkbox" checked={testElevator} onChange={e => setTestElevator(e.target.checked)} className="rounded" /> Asansör
                                            </label>
                                            <label className="flex items-center gap-1.5 text-[11px] font-medium cursor-pointer">
                                                <input type="checkbox" checked={testParking} onChange={e => setTestParking(e.target.checked)} className="rounded" /> Otopark
                                            </label>
                                        </div>
                                        <div className="flex flex-col justify-center gap-1.5 p-2 bg-white rounded-xl border border-gray-200">
                                            <label className="flex items-center gap-1.5 text-[11px] font-medium cursor-pointer">
                                                <input type="checkbox" checked={testBalcony} onChange={e => setTestBalcony(e.target.checked)} className="rounded" /> Balkon
                                            </label>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            {testResult === null ? (
                                                <button onClick={handleCalculateTest} className="w-full p-2 bg-appleBlue text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors">Test Et</button>
                                            ) : (
                                                <button onClick={() => setTestResult(null)} className="w-full p-2 bg-green-500 text-white rounded-xl text-xs font-bold transition-colors shadow-sm">{new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 }).format(testResult)} TL <span className="text-[10px] font-normal block opacity-80">(Sıfırla)</span></button>
                                            )}
                                        </div>
                                    </div>
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
                                                    <button onClick={() => handleEditBlog(b)} className="px-3 py-1.5 bg-blue-50 text-appleBlue hover:bg-blue-100 rounded-lg text-xs font-medium transition-colors ml-1 shrink-0">Duzenle</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* V24: Blog Edit Panel */}
                                    {editingBlog && (
                                        <div className="glass-card p-6 shadow-sm border border-blue-200 bg-blue-50/30 lg:col-span-2">
                                            <h4 className="font-bold text-appleDark mb-4">Blog Duzenle: {editingBlog.title}</h4>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-appleDark mb-1">Baslik</label>
                                                    <input value={editBlogTitle} onChange={e => setEditBlogTitle(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-appleBlue" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-appleDark mb-1">Icerik (HTML)</label>
                                                    <textarea value={editBlogContent} onChange={e => setEditBlogContent(e.target.value)} rows={8} className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-appleBlue resize-none font-mono text-sm" />
                                                </div>
                                                <div className="flex gap-3">
                                                    <button onClick={handleSaveEditBlog} className="px-6 py-2 bg-appleBlue text-white rounded-xl font-medium hover:bg-blue-600 transition-colors">Kaydet</button>
                                                    <button onClick={() => setEditingBlog(null)} className="px-6 py-2 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors">Iptal</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
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

                        {activeTab === "b2c-users" && (
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-semibold text-lg text-appleDark">Bireysel Kullanıcılar (B2C)</h3>
                                    <p className="text-sm text-gray-500">Kayıtlı son kullanıcıları, favorilerini ve portföylerini inceleyin.</p>
                                </div>
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-gray-50/50 text-gray-500 border-b border-gray-100">
                                            <tr>
                                                <th className="px-6 py-4 font-medium">Kayıt Tarihi</th>
                                                <th className="px-6 py-4 font-medium">Kullanıcı (Email/İsim)</th>
                                                <th className="px-6 py-4 font-medium">İstatistik (Portföy/Favori)</th>
                                                <th className="px-6 py-4 font-medium">Premium Durumu</th>
                                                <th className="px-6 py-4 font-medium text-center">İşlemler</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {b2cUsers.length === 0 ? (
                                                <tr><td colSpan={5} className="text-center py-8 text-gray-400">Hiç kullanıcı bulunamadı.</td></tr>
                                            ) : (
                                                b2cUsers.map((u: any) => (
                                                    <tr key={u.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{new Date(u.createdAt).toLocaleDateString("tr-TR")}</td>
                                                        <td className="px-6 py-4">
                                                            <div className="font-semibold text-appleDark">{u.name || "İsim Yok"}</div>
                                                            <div className="text-xs text-gray-500">{u.email}</div>
                                                            {u.phone && <div className="text-xs text-gray-400">{u.phone}</div>}
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-500">
                                                            <span className="bg-gray-100 text-gray-600 px-2 py-1 object-center rounded-lg text-xs font-bold mr-2">{u._count?.portfolio || 0} Ev</span>
                                                            <span className="bg-orange-50 text-orange-600 px-2 py-1 rounded-lg text-xs font-bold">{u._count?.savedListings || 0} Radar</span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {u.isPremium ? (
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><Crown size={12} className="mr-1" /> Premium</span>
                                                            ) : (
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Ücretsiz</span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 text-center space-x-2">
                                                            <button
                                                                onClick={async () => {
                                                                    const res = await fetch("/api/admin/users", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: u.id, isPremium: !u.isPremium }) });
                                                                    if (res.ok) {
                                                                        const up = await res.json();
                                                                        setB2cUsers(prev => prev.map(o => o.id === u.id ? { ...o, isPremium: up.isPremium } : o));
                                                                    }
                                                                }}
                                                                className={`text-xs px-3 py-1.5 rounded-lg border font-medium ${u.isPremium ? 'text-gray-600 border-gray-200 hover:bg-gray-50' : 'text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100'}`}
                                                            >
                                                                {u.isPremium ? "Premium'u İptal Et" : "Premium Yap"}
                                                            </button>
                                                            <button onClick={async () => {
                                                                if (confirm("Silmek istediğinize emin misiniz?")) {
                                                                    await fetch(`/api/admin/users?id=${u.id}`, { method: "DELETE" });
                                                                    setB2cUsers(prev => prev.filter(o => o.id !== u.id));
                                                                }
                                                            }} className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 font-medium">Sil</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === "radar-deals" && (
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-semibold text-lg text-appleDark">Yapay Zeka Yatırım Radarı</h3>
                                    <p className="text-sm text-gray-500">Premium B2C kullanıcılarına sunulan iskontolu fırsat ilanlarını buradan ekleyin/silin.</p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    <div className="lg:col-span-1 glass-card p-6 shadow-sm border border-gray-100 flex flex-col h-fit">
                                        <h4 className="font-medium text-appleDark mb-6 flex items-center">
                                            <Target className="mr-2 text-indigo-500" size={18} /> Yeni Fırsat Radara Ekle
                                        </h4>
                                        <form className="space-y-4" onSubmit={async (e) => {
                                            e.preventDefault();
                                            const fd = new FormData(e.currentTarget);
                                            const body = Object.fromEntries(fd.entries());
                                            const r = await fetch("/api/admin/radar", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
                                            if (r.ok) {
                                                const nd = await r.json();
                                                setRadarDeals([nd, ...radarDeals]);
                                                (e.target as HTMLFormElement).reset();
                                            } else {
                                                alert("Hata oluştu.");
                                            }
                                        }}>
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">İlan Başlığı</label>
                                                <input name="title" required className="w-full p-2.5 rounded-xl border outline-none text-sm" placeholder="Örn: Acil Satılık 2+1..." />
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <label className="block text-xs text-gray-500 mb-1">İl</label>
                                                    <input name="city" required className="w-full p-2.5 rounded-xl border outline-none text-sm" placeholder="İstanbul" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-gray-500 mb-1">İlçe</label>
                                                    <input name="district" required className="w-full p-2.5 rounded-xl border outline-none text-sm" placeholder="Kadıköy" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Mahalle</label>
                                                <input name="neighborhood" required className="w-full p-2.5 rounded-xl border outline-none text-sm" placeholder="Suadiye" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <label className="block text-xs text-gray-500 mb-1">İstenen Fiyat (TL)</label>
                                                    <input type="number" name="askingPrice" required className="w-full p-2.5 rounded-xl border outline-none text-sm" placeholder="2500000" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-gray-500 mb-1">Evin Değeri AI (TL)</label>
                                                    <input type="number" name="estimatedValue" required className="w-full p-2.5 rounded-xl border outline-none text-sm" placeholder="3200000" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Görsel URL (Opsiyonel)</label>
                                                <input name="imageUrl" className="w-full p-2.5 rounded-xl border outline-none text-sm" placeholder="https://..." />
                                            </div>
                                            <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl shadow-md font-bold text-sm hover:bg-indigo-700">Kaydet ve Radara Koy</button>
                                        </form>
                                    </div>

                                    <div className="lg:col-span-2 space-y-4">
                                        {radarDeals.length === 0 && <div className="text-center py-12 text-gray-400 bg-white rounded-xl border border-dashed">Radar henüz boş.</div>}
                                        {radarDeals.map((r: any) => (
                                            <div key={r.id} className="bg-white p-4 rounded-2xl border flex gap-4 items-center">
                                                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                                                    <Image src={r.imageUrl || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=150&q=80"} alt={r.title || "Radar Görseli"} layout="fill" objectFit="cover" className="object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between">
                                                        <h5 className="font-bold text-appleDark text-sm">{r.title}</h5>
                                                        <span className="bg-red-50 text-red-600 px-2 py-1 rounded text-xs font-bold whitespace-nowrap">%{Number(r.discount).toFixed(1)} İndirim</span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-1">{r.district}, {r.city} - {r.neighborhood}</p>
                                                    <div className="flex justify-between items-end mt-2">
                                                        <div>
                                                            <div className="text-[10px] text-gray-400">İstenen: <span className="font-bold text-gray-600">{Intl.NumberFormat('tr-TR').format(r.askingPrice)} ₺</span></div>
                                                            <div className="text-[10px] text-green-700 font-bold">Gerçek: {Intl.NumberFormat('tr-TR').format(r.estimatedValue)} ₺</div>
                                                        </div>
                                                        <button onClick={async () => {
                                                            if (confirm("Silmek istediğinize emin misiniz?")) {
                                                                await fetch(`/api/admin/radar?id=${r.id}`, { method: "DELETE" });
                                                                setRadarDeals(prev => prev.filter(o => o.id !== r.id));
                                                            }
                                                        }} className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 font-medium">Sil</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "testimonials" && (
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-semibold text-lg text-appleDark">Referans ve Yorum Yönetimi</h3>
                                    <p className="text-sm text-gray-500">Anasayfada gösterilecek müşteri yorumlarını buradan ekleyip silebilirsiniz.</p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    <div className="lg:col-span-1 glass-card p-6 shadow-sm border border-gray-100 flex flex-col h-fit">
                                        <h4 className="font-medium text-appleDark mb-6 flex items-center">
                                            <Star className="mr-2 text-yellow-500" size={18} /> Yeni Yorum Ekle
                                        </h4>
                                        <div className="space-y-4 flex-1">
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Müşteri Adı Özsoyad</label>
                                                <input type="text" value={testimonialForm.name} onChange={e => setTestimonialForm({ ...testimonialForm, name: e.target.value })} className="w-full p-2.5 rounded-xl border border-gray-200 outline-none text-sm" placeholder="Örn: Ayşe Yılmaz" />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Ünvan / Rol (Opsiyonel)</label>
                                                <input type="text" value={testimonialForm.role} onChange={e => setTestimonialForm({ ...testimonialForm, role: e.target.value })} className="w-full p-2.5 rounded-xl border border-gray-200 outline-none text-sm" placeholder="Örn: Ev Sahibi" />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Puan (1-5)</label>
                                                <select value={testimonialForm.rating} onChange={e => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) })} className="w-full p-2.5 rounded-xl border border-gray-200 outline-none text-sm bg-white">
                                                    <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                                                    <option value="4">⭐⭐⭐⭐ (4)</option>
                                                    <option value="3">⭐⭐⭐ (3)</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Yorum İçeriği</label>
                                                <textarea value={testimonialForm.comment} onChange={e => setTestimonialForm({ ...testimonialForm, comment: e.target.value })} className="w-full p-2.5 rounded-xl border border-gray-200 outline-none h-32 text-sm" placeholder="Yorum metni..." />
                                            </div>
                                        </div>
                                        <button onClick={handleAddTestimonial} className="w-full py-3 bg-appleDark text-white rounded-xl shadow-apple font-medium mt-6 hover:bg-black transition-all">
                                            Yorumu Kaydet
                                        </button>
                                    </div>
                                    <div className="lg:col-span-2 space-y-4">
                                        {testimonials.length === 0 && (
                                            <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-100 border-dashed">
                                                Henüz eklenmiş bir yorum yok.
                                            </div>
                                        )}
                                        {testimonials.map((t: any) => (
                                            <div key={t.id} className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${t.isActive ? 'bg-white border-gray-100 shadow-sm' : 'bg-gray-50 border-gray-200 opacity-70'}`}>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <h5 className="font-bold text-appleDark text-sm">{t.name} <span className="text-xs text-gray-400 font-normal ml-2">{t.role}</span></h5>
                                                            <div className="text-yellow-400 text-xs mt-0.5">{"⭐".repeat(t.rating)}</div>
                                                        </div>
                                                        <span className="text-xs text-gray-400">{new Date(t.createdAt).toLocaleDateString('tr-TR')}</span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 italic">&quot;{t.comment}&quot;</p>
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <button onClick={() => handleToggleTestimonial(t.id, t.isActive)} className={`text-xs px-3 py-1.5 rounded-lg border font-medium ${t.isActive ? 'text-amber-600 border-amber-200 bg-amber-50 hover:bg-amber-100' : 'text-green-600 border-green-200 bg-green-50 hover:bg-green-100'}`}>
                                                        {t.isActive ? 'Gizle' : 'Göster'}
                                                    </button>
                                                    <button onClick={() => handleDeleteTestimonial(t.id)} className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 font-medium whitespace-nowrap">
                                                        Sil
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div >
    );
}
