"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Copy, CheckCircle, BrainCircuit, TrendingUp, MapPin, Users, Hexagon, Shield, GraduationCap, TreePine, ShoppingBag, Train, ThumbsUp, ThumbsDown, Minus } from "lucide-react";
import Link from "next/link";
import PdfButton from "./PdfButton";
import AdBanner from "./AdBanner";
import { motion } from "framer-motion";
import ValuationChart from './ValuationChart';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

import type { POIItem } from "./MapComponent";

const MapComponent = dynamic(() => import("./MapComponent"), {
    ssr: false,
    loading: () => <div className="w-full h-full min-h-[300px] bg-appleGray rounded-2xl animate-pulse" />
});

// Neighborhood score calculator
function calculateNeighborhoodScore(pois: POIItem[]): { total: number; categories: Record<string, { score: number; max: number; count: number; nearest: number }> } {
    const cats: Record<string, POIItem[]> = {};
    pois.forEach(p => {
        if (!cats[p.type]) cats[p.type] = [];
        cats[p.type].push(p);
    });

    const score: Record<string, { score: number; max: number; count: number; nearest: number }> = {
        hospital: { score: 0, max: 20, count: 0, nearest: 99 },
        metro: { score: 0, max: 25, count: 0, nearest: 99 },
        school: { score: 0, max: 20, count: 0, nearest: 99 },
        park: { score: 0, max: 15, count: 0, nearest: 99 },
        shopping: { score: 0, max: 10, count: 0, nearest: 99 },
    };

    // Hospital scoring (max 20)
    const hosp = cats.hospital || [];
    score.hospital.count = hosp.length;
    if (hosp.length > 0) {
        score.hospital.nearest = hosp[0].distance;
        if (hosp[0].distance < 1) score.hospital.score = 20;
        else if (hosp[0].distance < 2) score.hospital.score = 16;
        else if (hosp[0].distance < 3) score.hospital.score = 12;
        else if (hosp[0].distance < 5) score.hospital.score = 8;
        else score.hospital.score = 4;
    }

    // Metro scoring (max 25)
    const met = cats.metro || [];
    score.metro.count = met.length;
    if (met.length > 0) {
        score.metro.nearest = met[0].distance;
        if (met[0].distance < 0.5) score.metro.score = 25;
        else if (met[0].distance < 1) score.metro.score = 22;
        else if (met[0].distance < 2) score.metro.score = 17;
        else if (met[0].distance < 3) score.metro.score = 12;
        else if (met[0].distance < 5) score.metro.score = 7;
        else score.metro.score = 3;
    }

    // School scoring (max 20)
    const sch = cats.school || [];
    score.school.count = sch.length;
    if (sch.length > 0) {
        score.school.nearest = sch[0].distance;
        let s = 0;
        if (sch.length >= 3) s += 10;
        else if (sch.length >= 2) s += 7;
        else s += 4;
        if (sch[0].distance < 1) s += 10;
        else if (sch[0].distance < 2) s += 7;
        else s += 3;
        score.school.score = Math.min(s, 20);
    }

    // Park scoring (max 15)
    const prk = cats.park || [];
    score.park.count = prk.length;
    if (prk.length > 0) {
        score.park.nearest = prk[0].distance;
        if (prk[0].distance < 0.5) score.park.score = 15;
        else if (prk[0].distance < 1) score.park.score = 12;
        else if (prk[0].distance < 2) score.park.score = 9;
        else score.park.score = 5;
    }

    // Shopping scoring (max 10)
    const shp = cats.shopping || [];
    score.shopping.count = shp.length;
    if (shp.length > 0) {
        score.shopping.nearest = shp[0].distance;
        if (shp[0].distance < 1) score.shopping.score = 10;
        else if (shp[0].distance < 2) score.shopping.score = 7;
        else score.shopping.score = 4;
    }

    // General livability bonus (max 10)
    const generalScore = Math.min(10, Math.round(
        (score.hospital.score > 10 ? 2 : 0) +
        (score.metro.score > 15 ? 3 : 0) +
        (score.school.score > 10 ? 2 : 0) +
        (score.park.score > 8 ? 2 : 0) +
        (score.shopping.score > 5 ? 1 : 0)
    ));

    const total = Object.values(score).reduce((a, c) => a + c.score, 0) + generalScore;

    return { total, categories: score };
}

function getScoreLabel(score: number): { text: string; color: string } {
    if (score >= 85) return { text: "Mukemmel", color: "text-green-600" };
    if (score >= 70) return { text: "Cok Iyi", color: "text-blue-600" };
    if (score >= 50) return { text: "Iyi", color: "text-amber-600" };
    if (score >= 30) return { text: "Orta", color: "text-orange-600" };
    return { text: "Gelistirilmeli", color: "text-red-600" };
}

export default function ResultDashboard({ id }: { id: string }) {
    const [copied, setCopied] = useState(false);
    const [data, setData] = useState<any>(null);
    const [sponsorFields, setSponsorFields] = useState<any>(null);
    const [pois, setPois] = useState<POIItem[]>([]);
    const [neighborhoodScore, setNeighborhoodScore] = useState<{ total: number; categories: Record<string, { score: number; max: number; count: number; nearest: number }> } | null>(null);

    // V28: Feedback System State
    const [feedbackStatus, setFeedbackStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);

    const submitFeedback = async (val: string) => {
        if (!id) return;
        setFeedbackStatus("loading");
        setSelectedFeedback(val);
        try {
            const res = await fetch("/api/valuation/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, feedback: val })
            });
            if (res.ok) {
                setFeedbackStatus("success");
            } else {
                setFeedbackStatus("error");
            }
        } catch {
            setFeedbackStatus("error");
        }
    };

    useEffect(() => {
        // Fetch Valuation Data
        fetch(`/api/valuation/${id}`)
            .then(res => res.json())
            .then(resData => {
                if (resData.success) {
                    setData(resData.data);
                } else {
                    console.error("Valuation load failed", resData.error);
                }
            })
            .catch(err => {
                console.error("API error", err);
            });

        // Fetch Sponsor Settings
        fetch(`/api/admin/settings`)
            .then(res => res.json())
            .then(sData => {
                if (sData.success) {
                    setSponsorFields(sData.data);
                }
            });
    }, [id]);

    const handlePOIsLoaded = (loadedPois: POIItem[]) => {
        setPois(loadedPois);
        const score = calculateNeighborhoodScore(loadedPois);
        setNeighborhoodScore(score);
    };

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center py-24 space-y-4">
                <div className="w-16 h-16 border-4 border-appleBlue border-t-transparent rounded-full animate-spin"></div>
                <p className="text-appleLightGray font-medium">Yapay zeka analizini bitiriyor...</p>
            </div>
        );
    }

    const displayValue = data.overridenValue || data.estimatedValue;
    const formattedValue = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(displayValue);
    const sqmPrice = data.netSqm ? Math.round(displayValue / data.netSqm) : 0;

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-semibold text-appleDark mb-2">Degerleme Sonucu</h1>
                    <p className="text-appleLightGray">Talep Numaraniz: <span className="font-mono text-appleDark">#{data.requestNumber || id.split("-")[1] || id}</span></p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button onClick={copyLink} className="flex-1 md:flex-none flex justify-center items-center px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors text-sm font-medium text-appleDark">
                        {copied ? <CheckCircle size={16} className="mr-2 text-green-500" /> : <Copy size={16} className="mr-2 text-gray-500" />}
                        {copied ? "Kopyalandi" : "Paylas"}
                    </button>

                    <Link href="/" className="flex-1 md:flex-none">
                        <button className="w-full flex justify-center items-center px-4 py-2 bg-appleDark text-white rounded-xl hover:bg-black transition-colors text-sm font-medium shadow-apple">
                            Yeni Sorgu
                        </button>
                    </Link>
                </div>
            </div>

            <div id="pdf-content" className="p-4 sm:p-0">
                {/* PDF Header - Visible mostly when printing or captured */}
                <div className="pdf-only-item flex-col items-center justify-center mb-10 text-center bg-appleDark text-white p-10 rounded-3xl w-full shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-appleBlue rounded-full blur-[80px] opacity-20 pointer-events-none" />
                    <div className="relative z-10 flex items-center justify-center gap-3 mb-4">
                        {data.realtor?.subscriptionTier === 'PRO_PLUS' && data.realtor?.customLogoUrl ? (
                            <img src={data.realtor.customLogoUrl} alt="Emlak Ofisi Logosu" className="h-16 object-contain bg-white/10 p-2 rounded-xl backdrop-blur-sm" crossOrigin="anonymous" />
                        ) : (
                            <>
                                <span className="p-2 bg-white/10 text-white rounded-xl backdrop-blur-sm"><Hexagon size={32} className="fill-current" /></span>
                                <h2 className="text-4xl font-extrabold tracking-tight">Evinin Degeri</h2>
                            </>
                        )}
                    </div>
                    <p className="text-lg opacity-90 mt-1 font-medium text-blue-100">Yapay Zeka Destekli Gayrimenkul Degerleme Raporu</p>
                    <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm opacity-80">
                        <span className="bg-white/10 px-4 py-2 rounded-full border border-white/10">Rapor No: #{data.requestNumber || id.split("-")[1] || id}</span>
                        <span className="bg-white/10 px-4 py-2 rounded-full border border-white/10">Tarih: {new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="md:col-span-2 p-8 bg-appleDark text-white border-0 shadow-apple-hover relative overflow-hidden rounded-2xl">
                        {/* Background Decor */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-appleBlue rounded-full blur-[80px] opacity-30 pointer-events-none" />
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500 rounded-full blur-[80px] opacity-20 pointer-events-none" />

                        <div className="relative z-10">
                            <p className="text-blue-200 font-medium mb-2 opacity-100">Tahmini Piyasa Degeri</p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                                <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white opacity-100">
                                    {formattedValue}
                                </h2>
                                {data.overridenValue && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-100 border border-green-500/30">
                                        <CheckCircle size={14} className="mr-1" /> Uzman Dogruladi
                                    </span>
                                )}
                            </div>

                            <div className="flex items-start gap-4 bg-white/10 p-5 rounded-2xl backdrop-blur-md border border-white/20 mt-4">
                                <BrainCircuit className="text-white shrink-0 mt-1" size={24} />
                                <div>
                                    <h4 className="font-medium mb-1 text-white">AI Ozeti</h4>
                                    <p className="text-sm text-blue-50 leading-relaxed opacity-100">{data.aiComment}</p>
                                </div>
                            </div>

                            {/* V28: Feedback System */}
                            <div className="mt-8 border-t border-white/20 pt-6">
                                <p className="text-sm text-blue-200 mb-4 opacity-100 text-center">Bu sonuc lokasyon ve enflasyon endekslerine gore hesaplanmistir. Algoritmayi gelistirmemize yardimci olun:</p>

                                {feedbackStatus === "success" ? (
                                    <div className="bg-green-500/20 text-green-100 border border-green-500/30 p-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium">
                                        <CheckCircle size={18} /> Geri bildiriminiz icin tesekkurler!
                                    </div>
                                ) : (
                                    <div className="flex flex-wrap justify-center gap-3">
                                        <button
                                            onClick={() => submitFeedback("DUSUK")}
                                            disabled={feedbackStatus === "loading"}
                                            className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 border border-white/20 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors"
                                        >
                                            <ThumbsDown size={16} /> Dusuk Buldum
                                        </button>
                                        <button
                                            onClick={() => submitFeedback("NORMAL")}
                                            disabled={feedbackStatus === "loading"}
                                            className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 border border-white/20 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors"
                                        >
                                            <Minus size={16} /> Fiyat Normal
                                        </button>
                                        <button
                                            onClick={() => submitFeedback("YUKSEK")}
                                            disabled={feedbackStatus === "loading"}
                                            className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 border border-white/20 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors"
                                        >
                                            <ThumbsUp size={16} /> Yuksek Buldum
                                        </button>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>

                    <div className="glass-card p-6 flex flex-col justify-center items-center text-center">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                            <TrendingUp size={28} className="text-appleBlue" />
                        </div>
                        <h3 className="font-semibold text-lg text-appleDark mb-2">Detayli Rapor</h3>
                        <p className="text-sm text-appleLightGray mb-6">Tum carpan analizleri ve bolge gecmisi ile hazirlanmis raporunuzu indirin.</p>

                        <PdfButton data={data} formattedValue={formattedValue} />
                    </div>

                    <div className="glass-card p-6">
                        <h3 className="font-semibold text-lg text-appleDark mb-6 flex items-center">
                            <MapPin size={20} className="mr-2 text-appleBlue" />
                            Mulk Detaylari
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                <span className="text-gray-600 font-medium text-sm">Konum</span>
                                <span className="text-appleDark font-semibold text-xs text-right max-w-[150px] truncate" title={`${data.neighborhood}, ${data.district}`}>{data.neighborhood}, {data.district}</span>
                            </li>
                            <li className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                <span className="text-gray-600 font-medium text-sm">Brut / Net m2</span>
                                <span className="text-appleDark font-semibold text-xs">{data.grossSqm} / {data.netSqm} m2</span>
                            </li>
                            <li className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                <span className="text-gray-600 font-medium text-sm">Oda / Yas</span>
                                <span className="text-appleDark font-semibold text-xs">{data.rooms} / {data.buildingAge} Yil</span>
                            </li>
                            <li className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                <span className="text-gray-600 font-medium text-sm">Kat</span>
                                <span className="text-appleDark font-semibold text-xs">{data.floor}. Kat (Toplam {data.totalFloors})</span>
                            </li>
                        </ul>
                    </div>

                    {/* V25: m2 Fiyat Karsilastirma Karti */}
                    <div className="glass-card p-6">
                        <h3 className="font-semibold text-lg text-appleDark mb-6 flex items-center">
                            <TrendingUp size={20} className="mr-2 text-green-500" />
                            m2 Fiyat Analizi
                        </h3>
                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                                <span className="text-xs text-blue-600 font-medium">Bu Mulk (Net m2)</span>
                                <p className="text-2xl font-bold text-appleBlue mt-1">
                                    {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(sqmPrice)} /m2
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <span className="text-xs text-gray-500 font-medium">{data.district} Ortalamasi (Gerceklesmis)</span>
                                <p className="text-xl font-bold text-appleDark mt-1">
                                    {data.districtAvgSqm > 0 ? (
                                        <>
                                            {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(data.districtAvgSqm)} /m2
                                            <span className={`text-sm font-normal ml-2 ${sqmPrice > data.districtAvgSqm ? 'text-green-600' : 'text-red-500'}`}>
                                                (Ortalamaya gore %{Math.abs(Math.round(((sqmPrice - data.districtAvgSqm) / data.districtAvgSqm) * 100))} {sqmPrice > data.districtAvgSqm ? 'yuksek' : 'dusuk'})
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(Math.round(sqmPrice * 0.95))} - {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(Math.round(sqmPrice * 1.08))} /m2
                                            <span className="text-xs font-normal text-gray-400 ml-2">(Tahmini)</span>
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>

                    {sponsorFields && (sponsorFields.sponsorHeaderUrl || sponsorFields.adsenseHeader) && (
                        <div className="md:col-span-3 mb-2">
                            <AdBanner
                                adsenseId={sponsorFields.adsenseHeader}
                                sponsorUrl={sponsorFields.sponsorHeaderUrl}
                                sponsorLink={sponsorFields.sponsorHeaderLink}
                                className="max-h-[160px]"
                            />
                        </div>
                    )}

                    <div className="md:col-span-2 glass-card p-6">
                        <h3 className="font-semibold text-lg text-appleDark mb-4 flex items-center">
                            <TrendingUp size={20} className="mr-2 text-appleBlue" />
                            Gecmis Degerleme Trendi ({data.neighborhood})
                        </h3>
                        {data.neighborhoodTrend && data.neighborhoodTrend.length > 1 ? (
                            <>
                                <p className="text-sm text-gray-500 mb-6">Bu mahallede yapilan gerceklesmis degerlemelerin son 6 aylik ortalama m2 fiyat degisimi.</p>
                                <div style={{ width: '100%', height: 300 }}>
                                    <ResponsiveContainer>
                                        <BarChart data={data.neighborhoodTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                            <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                            <YAxis
                                                stroke="#94a3b8"
                                                fontSize={12}
                                                tickLine={false}
                                                axisLine={false}
                                                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                                            />
                                            <Tooltip
                                                cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                                formatter={(value: any) => [new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(value) + " /m2", "Ort. m2 Fiyati"]}
                                            />
                                            <Bar dataKey="avgSqmPrice" fill="#0071E3" radius={[6, 6, 0, 0]} maxBarSize={50} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="text-sm text-gray-500 mb-6">TCMB verileri ve bolgesel enflasyon oranlarina dayali gecmis performans ve makine ogrenmesi tahmini.</p>
                                <ValuationChart currentValue={displayValue} />
                            </>
                        )}
                    </div>

                    {/* Kira Getirisi ve Amortisman Karti */}
                    <div className="glass-card p-6 flex flex-col justify-center">
                        <h3 className="font-semibold text-lg text-appleDark mb-4 flex items-center">
                            <TrendingUp size={20} className="mr-2 text-green-500" />
                            Kira Amortisman Analizi
                        </h3>
                        {(() => {
                            // Dynamic amortisman: sehir merkezleri 240 ay, dis bolgeler 170 ay, ortalama 200 ay
                            const amortMonths = data.city === 'Istanbul' || data.city === 'Ankara' || data.city === 'Izmir' ? 240 : data.city ? 200 : 170;
                            const monthlyRent = displayValue / amortMonths;
                            const yearlyRent = monthlyRent * 12;
                            const amortYears = (amortMonths / 12).toFixed(1);
                            const yieldPercent = ((yearlyRent / displayValue) * 100).toFixed(1);
                            return (
                                <>
                                    <p className="text-xs text-gray-500 mb-4">Bolgesel piyasa verilerine gore {amortMonths} ay amortisman suresi ile hesaplanmistir.</p>
                                    <div className="space-y-4">
                                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex justify-between items-center">
                                            <span className="text-sm text-gray-500 font-medium">Aylik Tahmini Kira</span>
                                            <span className="text-appleDark font-bold">
                                                {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(monthlyRent)}
                                            </span>
                                        </div>
                                        <div className="bg-green-50 rounded-xl p-4 border border-green-100 flex justify-between items-center">
                                            <span className="text-sm text-green-700 font-medium">Yillik Getiri</span>
                                            <span className="text-green-800 font-bold">
                                                {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(yearlyRent)} <span className="text-xs font-normal">(%{yieldPercent})</span>
                                            </span>
                                        </div>
                                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 flex justify-between items-center">
                                            <span className="text-sm text-blue-700 font-medium">Amortisman Suresi</span>
                                            <span className="text-blue-800 font-bold">
                                                ~{amortYears} Yil ({amortMonths} Ay)
                                            </span>
                                        </div>
                                    </div>
                                </>
                            );
                        })()}
                    </div>

                    {data.demographics && (
                        <div className="md:col-span-3 glass-card p-6">
                            <h3 className="font-semibold text-lg text-appleDark mb-6 flex items-center">
                                <Users size={20} className="mr-2 text-appleBlue" />
                                Bolgesel Demografi ve Analiz (Yapay Zeka Ortalamasi)
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col justify-center items-center text-center">
                                    <span className="text-gray-500 text-sm mb-2">Nufus ve Yapilasma</span>
                                    <span className="text-appleDark font-bold text-lg">{data.demographics.populationDensity}</span>
                                </div>
                                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 flex flex-col justify-center items-center text-center">
                                    <span className="text-blue-600/80 text-sm mb-2">Sosyo-Ekonomik Derece</span>
                                    <span className="text-appleBlue font-bold text-lg">{data.demographics.socioEconomicStatus}</span>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col justify-center items-center text-center">
                                    <span className="text-gray-500 text-sm mb-2">Kusak Dagilimi</span>
                                    <span className="text-appleDark font-bold text-lg">{data.demographics.averageAge}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Map Section */}
                    <div className="md:col-span-3 glass-card p-0 md:p-2 relative min-h-[350px] overflow-hidden">
                        <div className="absolute top-4 left-4 z-[999] bg-white/90 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-xl shadow-sm border border-white flex items-center">
                            <MapPin size={16} className="text-appleBlue mr-1 md:mr-2" />
                            <span className="font-medium text-xs md:text-sm text-appleDark">Konum Analizi</span>
                        </div>
                        <MapComponent lat={data.location.lat} lng={data.location.lng} onPOIsLoaded={handlePOIsLoaded} />
                    </div>

                    {/* V25: Mahalle Altyapi Skoru */}
                    {neighborhoodScore && (
                        <div className="md:col-span-3 glass-card p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                                <div>
                                    <h3 className="font-semibold text-lg text-appleDark flex items-center">
                                        <Shield size={20} className="mr-2 text-appleBlue" />
                                        Mahalle Altyapi Skoru
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">Yakinlardaki tesisler analiz edilerek mahallenin yasanabilirlik skoru hesaplandi.</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="relative w-20 h-20">
                                        <svg viewBox="0 0 36 36" className="w-20 h-20 transform -rotate-90">
                                            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                                            <circle cx="18" cy="18" r="15.9" fill="none" stroke={neighborhoodScore.total >= 70 ? "#22c55e" : neighborhoodScore.total >= 50 ? "#f59e0b" : "#ef4444"} strokeWidth="3" strokeDasharray={`${neighborhoodScore.total} ${100 - neighborhoodScore.total}`} strokeLinecap="round" />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-lg font-bold text-appleDark">{neighborhoodScore.total}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className={`text-xl font-bold ${getScoreLabel(neighborhoodScore.total).color}`}>{getScoreLabel(neighborhoodScore.total).text}</p>
                                        <p className="text-xs text-gray-400">100 uzerinden</p>
                                    </div>
                                </div>
                            </div>

                            {/* Category Bars */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                {[
                                    { key: "hospital", label: "Saglik", icon: <Shield size={16} />, color: "bg-red-500", bgColor: "bg-red-50", textColor: "text-red-600" },
                                    { key: "metro", label: "Ulasim", icon: <Train size={16} />, color: "bg-blue-500", bgColor: "bg-blue-50", textColor: "text-blue-600" },
                                    { key: "school", label: "Egitim", icon: <GraduationCap size={16} />, color: "bg-amber-500", bgColor: "bg-amber-50", textColor: "text-amber-600" },
                                    { key: "park", label: "Yesil Alan", icon: <TreePine size={16} />, color: "bg-green-500", bgColor: "bg-green-50", textColor: "text-green-600" },
                                    { key: "shopping", label: "Alisveris", icon: <ShoppingBag size={16} />, color: "bg-purple-500", bgColor: "bg-purple-50", textColor: "text-purple-600" },
                                ].map(cat => {
                                    const catData = neighborhoodScore.categories[cat.key];
                                    const pct = catData ? Math.round((catData.score / catData.max) * 100) : 0;
                                    return (
                                        <div key={cat.key} className={`${cat.bgColor} rounded-2xl p-4 border border-gray-100`}>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={cat.textColor}>{cat.icon}</span>
                                                <span className="text-sm font-semibold text-appleDark">{cat.label}</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                                <div className={`${cat.color} h-2 rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                                            </div>
                                            <div className="flex justify-between text-xs text-gray-500">
                                                <span>{catData?.count || 0} tesis</span>
                                                <span>{catData?.score || 0}/{catData?.max || 0}</span>
                                            </div>
                                            {catData && catData.nearest < 99 && (
                                                <p className="text-xs text-gray-400 mt-1">En yakin: {catData.nearest.toFixed(1)} km</p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Nearby Facilities Summary */}
                            {pois.length > 0 && (
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <h4 className="text-sm font-semibold text-appleDark mb-3">Yakin Tesisler</h4>
                                    <div className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-3 gap-2">
                                        {pois.slice(0, 9).map((poi, i) => (
                                            <div key={i} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg text-xs">
                                                <span style={{
                                                    background: poi.type === 'hospital' ? '#ef4444' : poi.type === 'metro' ? '#3b82f6' : poi.type === 'school' ? '#f59e0b' : poi.type === 'park' ? '#22c55e' : '#a855f7',
                                                    width: 8, height: 8, borderRadius: '50%', display: 'inline-block', flexShrink: 0
                                                }} />
                                                <span className="text-appleDark font-medium truncate">{poi.name}</span>
                                                <span className="text-gray-400 ml-auto shrink-0">{poi.distance.toFixed(1)} km</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                </div>

                {/* V19 LEAD MARKET OPT-IN B2C */}
                <div className="md:col-span-3 mt-12 mb-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-1 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-[80px] pointer-events-none" />
                    <div className="bg-white rounded-[22px] p-8 md:p-10 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 h-full">
                        <div className="flex-1">
                            <h3 className="text-3xl font-extrabold text-appleDark mb-3">Evinizi hemen bu degere yakin bir fiyattan satmak ister misiniz?</h3>
                            <p className="text-gray-500 text-lg">
                                Onayladiginiz an, bolgenizdeki <strong>Premium Kurumsal Emlak Ofisleri</strong> size ozel tekliflerle ulassin. (Tümüyle Ucretsizdir)
                            </p>
                        </div>
                        <div className="w-full md:w-auto flex-shrink-0">
                            <button
                                onClick={async (e) => {
                                    const btn = e.currentTarget;
                                    btn.disabled = true;
                                    btn.innerHTML = "Iletiliyor...";
                                    try {
                                        const res = await fetch("/api/b2bc/lead-market", {
                                            method: "POST", headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ valuationId: id })
                                        });
                                        if (res.ok) btn.innerHTML = "Talep Basariyla Iletildi! ✓";
                                        else btn.innerHTML = "Hata Olustu.";
                                    } catch (e) { btn.innerHTML = "Hata Olustu."; }
                                }}
                                className="w-full md:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg rounded-xl shadow-lg transition-transform transform hover:scale-105 active:scale-95 whitespace-nowrap"
                            >
                                Evet, Evimi Satmak Istiyorum
                            </button>
                        </div>
                    </div>
                </div>

                {/* PDF Footer - Legal Disclaimer & Logo */}
                <div className="pdf-only-item mt-12 pt-8 border-t border-gray-200 flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-2 text-appleDark font-bold mb-4 opacity-70">
                        <Hexagon size={24} className="fill-current" />
                        <span className="text-xl">Evinin Degeri</span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed max-w-4xl text-justify">
                        <strong className="text-gray-700">Yasal Uyari:</strong> Bu raporda sunulan degerleme sonucu, TCMB verileri, bolgesel enflasyon oranlari ve yapay zeka tarafindan saglanan gecmis satis istatistiklerine dayali matematiksel bir projeksiyondur. Kesinlikle bir gayrimenkul ekspertiz raporu veya herhangi bir ticari faaliyet icin <strong>yatirim tavsiyesi niteligini tasimaz</strong>. Evinin Degeri, bu rapor sonucunda dogabilecek dogrudan veya dolayli alim/satim, kiralama kaynakli maddi zararlardan hukuken sorumlu tutulamaz. Detayli piyasa kararlari icin lisansli uzmanlara basvurmaniz onerilir.
                    </p>
                    <p className="text-[10px] text-gray-400 mt-4">&copy; {new Date().getFullYear()} evindegeri.com - Tum Haklari Saklidir.</p>
                </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3 pb-4">
                <a href={`https://wa.me/?text=${encodeURIComponent(`Evimin degeri: ${formattedValue} - Detayli rapor: https://evindegeri.com/result/${id}`)}`} target="_blank" rel="noopener" className="flex items-center gap-2 px-5 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors text-sm">
                    WhatsApp
                </a>
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Evimin degeri ${formattedValue} olarak hesaplandi! Ucretsiz degerleme: evindegeri.com`)}&url=${encodeURIComponent(`https://evindegeri.com/result/${id}`)}`} target="_blank" rel="noopener" className="flex items-center gap-2 px-5 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors text-sm">
                    X (Twitter)
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://evindegeri.com/result/${id}`)}`} target="_blank" rel="noopener" className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors text-sm">
                    Facebook
                </a>
                <button onClick={() => { navigator.clipboard.writeText(`https://evindegeri.com/result/${id}`); }} className="flex items-center gap-2 px-5 py-3 bg-gray-200 text-appleDark rounded-xl font-medium hover:bg-gray-300 transition-colors text-sm">
                    Link Kopyala
                </button>
            </div>

            <div className="mt-4 flex justify-center pb-12">
                <Link href="/">
                    <button className="flex items-center px-8 py-4 bg-appleDark text-white rounded-2xl hover:bg-black transition-colors shadow-apple text-lg font-medium">
                        <MapPin size={20} className="mr-2" /> Yeni Degerleme Yap
                    </button>
                </Link>
            </div>
        </motion.div >
    );
}
