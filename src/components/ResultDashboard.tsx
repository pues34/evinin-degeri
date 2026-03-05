"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Copy, CheckCircle, BrainCircuit, TrendingUp, MapPin, Users, Hexagon } from "lucide-react";
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
                    <p className="text-appleLightGray">Talep Numaranız: <span className="font-mono text-appleDark">#{data.requestNumber || id.split("-")[1] || id}</span></p>
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
                <div className="pdf-only-item flex-col items-center justify-center mb-10 text-center bg-appleDark text-white p-10 rounded-3xl w-full shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-appleBlue rounded-full blur-[80px] opacity-20 pointer-events-none" />
                    <div className="relative z-10 flex items-center justify-center gap-3 mb-4">
                        <span className="p-2 bg-white/10 text-white rounded-xl backdrop-blur-sm"><Hexagon size={32} className="fill-current" /></span>
                        <h2 className="text-4xl font-extrabold tracking-tight">Evinin Değeri</h2>
                    </div>
                    <p className="text-lg opacity-90 mt-1 font-medium text-blue-100">Yapay Zeka Destekli Gayrimenkul Değerleme Raporu</p>
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

                    {/* YENİ: Kira Getirisi ve Amortisman Kartı */}
                    <div className="glass-card p-6 flex flex-col justify-center">
                        <h3 className="font-semibold text-lg text-appleDark mb-4 flex items-center">
                            <TrendingUp size={20} className="mr-2 text-green-500" />
                            Kira Amortisman Analizi
                        </h3>
                        <p className="text-xs text-gray-500 mb-4">Türkiye ortalaması olan 200 ay üzerinden tahmini kira getirisi hesaplanmıştır.</p>

                        <div className="space-y-4">
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex justify-between items-center">
                                <span className="text-sm text-gray-500 font-medium">Aylık Tahmini Kira</span>
                                <span className="text-appleDark font-bold">
                                    {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(displayValue / 200)}
                                </span>
                            </div>
                            <div className="bg-green-50 rounded-xl p-4 border border-green-100 flex justify-between items-center">
                                <span className="text-sm text-green-700 font-medium">Yıllık Getiri</span>
                                <span className="text-green-800 font-bold">
                                    {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format((displayValue / 200) * 12)}
                                </span>
                            </div>
                            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 flex justify-between items-center">
                                <span className="text-sm text-blue-700 font-medium">Amortisman Süresi</span>
                                <span className="text-blue-800 font-bold">
                                    ~16.6 Yıl (200 Ay)
                                </span>
                            </div>
                        </div>
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

                {/* V19 LEAD MARKET OPT-IN B2C */}
                <div className="md:col-span-3 mt-12 mb-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-1 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-[80px] pointer-events-none" />
                    <div className="bg-white rounded-[22px] p-8 md:p-10 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 h-full">
                        <div className="flex-1">
                            <h3 className="text-3xl font-extrabold text-appleDark mb-3">Evinizi hemen bu değere yakın bir fiyattan satmak ister misiniz?</h3>
                            <p className="text-gray-500 text-lg">
                                Onayladığınız an, bölgenizdeki en iyi <strong>Premium Emlak Danışmanlarımız</strong> (Sadece PRO PLUS) size özel tekliflerle ulaşsın. Ücretsizdir.
                            </p>
                        </div>
                        <div className="w-full md:w-auto flex-shrink-0">
                            <button
                                onClick={async (e) => {
                                    const btn = e.currentTarget;
                                    btn.disabled = true;
                                    btn.innerHTML = "İletiliyor...";
                                    try {
                                        const res = await fetch("/api/b2bc/lead-market", {
                                            method: "POST", headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ valuationId: id })
                                        });
                                        if (res.ok) btn.innerHTML = "Talep Başarıyla İletildi! ✓";
                                        else btn.innerHTML = "Hata Oluştu.";
                                    } catch (e) { btn.innerHTML = "Hata Oluştu."; }
                                }}
                                className="w-full md:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg rounded-xl shadow-lg transition-transform transform hover:scale-105 active:scale-95 whitespace-nowrap"
                            >
                                Evet, Evimi Satmak İstiyorum
                            </button>
                        </div>
                    </div>
                </div>

                {/* PDF Footer - Legal Disclaimer & Logo */}
                <div className="pdf-only-item mt-12 pt-8 border-t border-gray-200 flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-2 text-appleDark font-bold mb-4 opacity-70">
                        <Hexagon size={24} className="fill-current" />
                        <span className="text-xl">Evinin Değeri</span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed max-w-4xl text-justify">
                        <strong className="text-gray-700">Yasal Uyarı:</strong> Bu raporda sunulan değerleme sonucu, TCMB verileri, bölgesel enflasyon oranları ve yapay zeka tarafından sağlanan geçmiş satış istatistiklerine dayalı matematiksel bir projeksiyondur. Kesinlikle bir gayrimenkul ekspertiz raporu veya herhangi bir ticari faaliyet için <strong>yatırım tavsiyesi niteliği taşımaz</strong>. Evinin Değeri, bu rapor sonucunda doğabilecek doğrudan veya dolaylı alım/satım, kiralama kaynaklı maddi zararlardan hukuken sorumlu tutulamaz. Detaylı piyasa kararları için lisanslı uzmanlara başvurmanız önerilir.
                    </p>
                    <p className="text-[10px] text-gray-400 mt-4">© {new Date().getFullYear()} evindegeri.com - Tüm Hakları Saklıdır.</p>
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
