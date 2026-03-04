"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Copy, CheckCircle, BrainCircuit, TrendingUp, MapPin, Users } from "lucide-react";
import Link from "next/link";
import PdfButton from "./PdfButton";
import AdBanner from "./AdBanner";

import ValuationChart from "./ValuationChart";

const MapComponent = dynamic(() => import("./MapComponent"), {
    ssr: false,
    loading: () => <div className="w-full h-full min-h-[300px] bg-appleGray rounded-2xl animate-pulse" />
});

export default function ResultDashboard({ id }: { id: string }) {
    const [copied, setCopied] = useState(false);
    const [data, setData] = useState<any>(null);
    const [sponsorFields, setSponsorFields] = useState<any>(null);

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

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-semibold text-appleDark mb-2">Değerleme Sonucu</h1>
                    <p className="text-appleLightGray">Talep Numaranız: <span className="font-mono text-appleDark">{id.split("-")[1] || id}</span></p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button onClick={copyLink} className="flex-1 md:flex-none flex justify-center items-center px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors text-sm font-medium text-appleDark">
                        {copied ? <CheckCircle size={16} className="mr-2 text-green-500" /> : <Copy size={16} className="mr-2 text-gray-500" />}
                        {copied ? "Kopyalandı" : "Paylaş"}
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
                <div className="hidden pdf-only-header mb-8 text-center bg-appleDark text-white p-6 rounded-2xl">
                    <h2 className="text-3xl font-bold tracking-tight">Evinin Değeri</h2>
                    <p className="text-sm opacity-80 mt-1">Profesyonel Gayrimenkul Değerleme Raporu</p>
                    <p className="text-xs opacity-60 mt-2">ID: {id.split("-")[1] || id} | Tarih: {new Date().toLocaleDateString('tr-TR')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="md:col-span-2 p-8 bg-appleDark text-white border-0 shadow-apple-hover relative overflow-hidden rounded-2xl">
                        {/* Background Decor */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-appleBlue rounded-full blur-[80px] opacity-30 pointer-events-none" />
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500 rounded-full blur-[80px] opacity-20 pointer-events-none" />

                        <div className="relative z-10">
                            <p className="text-blue-200 font-medium mb-2 opacity-100">Tahmini Piyasa Değeri</p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                                <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white opacity-100">
                                    {formattedValue}
                                </h2>
                                {data.overridenValue && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-100 border border-green-500/30">
                                        <CheckCircle size={14} className="mr-1" /> Uzman Doğruladı
                                    </span>
                                )}
                            </div>

                            <div className="flex items-start gap-4 bg-white/10 p-5 rounded-2xl backdrop-blur-md border border-white/20 mt-4">
                                <BrainCircuit className="text-white shrink-0 mt-1" size={24} />
                                <div>
                                    <h4 className="font-medium mb-1 text-white">AI Özeti</h4>
                                    <p className="text-sm text-blue-50 leading-relaxed opacity-100">{data.aiComment}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 flex flex-col justify-center items-center text-center">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                            <TrendingUp size={28} className="text-appleBlue" />
                        </div>
                        <h3 className="font-semibold text-lg text-appleDark mb-2">Detaylı Rapor</h3>
                        <p className="text-sm text-appleLightGray mb-6">Tüm çarpan analizleri ve bölge geçmişi ile hazırlanmış raporunuzu indirin.</p>

                        <PdfButton data={data} formattedValue={formattedValue} />
                    </div>

                    <div className="glass-card p-6">
                        <h3 className="font-semibold text-lg text-appleDark mb-6 flex items-center">
                            <MapPin size={20} className="mr-2 text-appleBlue" />
                            Mülk Detayları
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                <span className="text-gray-600 font-medium text-sm">Konum</span>
                                <span className="text-appleDark font-semibold text-xs text-right max-w-[150px] truncate" title={`${data.neighborhood}, ${data.district}`}>{data.neighborhood}, {data.district}</span>
                            </li>
                            <li className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                <span className="text-gray-600 font-medium text-sm">Brüt / Net m²</span>
                                <span className="text-appleDark font-semibold text-xs">{data.grossSqm} / {data.netSqm} m²</span>
                            </li>
                            <li className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                <span className="text-gray-600 font-medium text-sm">Oda / Yaş</span>
                                <span className="text-appleDark font-semibold text-xs">{data.rooms} / {data.buildingAge} Yıl</span>
                            </li>
                            <li className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                <span className="text-gray-600 font-medium text-sm">Kat</span>
                                <span className="text-appleDark font-semibold text-xs">{data.floor}. Kat (Toplam {data.totalFloors})</span>
                            </li>
                        </ul>
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
                        <h3 className="font-semibold text-lg text-appleDark mb-2 flex items-center">
                            <TrendingUp size={20} className="mr-2 text-appleBlue" />
                            Emlak Endeksi ve Gelecek Projeksiyonu
                        </h3>
                        <p className="text-sm text-gray-500 mb-6">TCMB verileri ve bölgesel enflasyon oranlarına dayalı geçmiş performans ve 2 yıllık makine öğrenmesi tahmini.</p>
                        <ValuationChart currentValue={displayValue} />
                    </div>

                    {data.demographics && (
                        <div className="md:col-span-3 glass-card p-6">
                            <h3 className="font-semibold text-lg text-appleDark mb-6 flex items-center">
                                <Users size={20} className="mr-2 text-appleBlue" />
                                Bölgesel Demografi ve Analiz (Yapay Zeka Ortalaması)
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col justify-center items-center text-center">
                                    <span className="text-gray-500 text-sm mb-2">Nüfus ve Yapılaşma</span>
                                    <span className="text-appleDark font-bold text-lg">{data.demographics.populationDensity}</span>
                                </div>
                                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 flex flex-col justify-center items-center text-center">
                                    <span className="text-blue-600/80 text-sm mb-2">Sosyo-Ekonomik Derece</span>
                                    <span className="text-appleBlue font-bold text-lg">{data.demographics.socioEconomicStatus}</span>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col justify-center items-center text-center">
                                    <span className="text-gray-500 text-sm mb-2">Kuşak Dağılımı</span>
                                    <span className="text-appleDark font-bold text-lg">{data.demographics.averageAge}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="md:col-span-3 glass-card p-2 relative min-h-[300px]">
                        <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm border border-white flex items-center">
                            <MapPin size={16} className="text-appleBlue mr-2" />
                            <span className="font-medium text-sm text-appleDark">Konum Analizi</span>
                        </div>
                        <MapComponent lat={data.location.lat} lng={data.location.lng} />
                    </div>

                </div>
            </div>

            <div className="mt-12 flex justify-center pb-12">
                <Link href="/">
                    <button className="flex items-center px-8 py-4 bg-appleDark text-white rounded-2xl hover:bg-black transition-colors shadow-apple text-lg font-medium">
                        <MapPin size={20} className="mr-2" /> Yeni Değerleme Yap
                    </button>
                </Link>
            </div>
        </motion.div >
    );
}
