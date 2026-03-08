"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import Image from "next/image";
import { Download, Share2, MapPin, Building, Activity, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function SocialMediaGenerator({ valuationData, realtorLogo }: { valuationData: any, realtorLogo?: string }) {
    const printRef = useRef<HTMLDivElement>(null);
    const [downloading, setDownloading] = useState(false);
    const [theme, setTheme] = useState<"dark" | "light" | "blue">("dark");

    const handleDownload = async () => {
        if (!printRef.current) return;
        setDownloading(true);

        try {
            const canvas = await html2canvas(printRef.current, {
                scale: 3, // High resolution for social media
                useCORS: true,
                backgroundColor: null,
            });

            const dataUrl = canvas.toDataURL("image/png");

            // Trigger download
            const link = document.createElement("a");
            link.download = `degerleme-${valuationData.neighborhood || "ev"}-evinderi.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error("Resim oluşturma hatası:", error);
            alert("Görsel oluşturulurken bir hata oluştu.");
        } finally {
            setDownloading(false);
        }
    };

    const themes = {
        dark: "bg-gradient-to-br from-gray-900 via-appleDark to-black text-white",
        light: "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-appleDark border border-gray-200",
        blue: "bg-gradient-to-br from-blue-900 via-appleBlue to-blue-600 text-white"
    };

    const textColor = theme === "light" ? "text-appleDark" : "text-white";
    const mutedTextColor = theme === "light" ? "text-gray-500" : "text-gray-300";
    const boxBg = theme === "light" ? "bg-white/80 border border-gray-100 shadow-sm" : "bg-white/10 backdrop-blur-md border border-white/20";

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-appleDark flex items-center">
                        <Share2 className="mr-2 text-appleBlue" size={20} />
                        Sosyal Medya Postu Oluştur</h3>
                    <p className="text-sm text-gray-500 mt-1">Bu ekspertizi Instagram veya WhatsApp&apos;ta paylaşmak için hazır grafiğe dönüştürün.</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Panel: Preview */}
                <div className="w-full md:w-1/2 flex justify-center bg-gray-50 rounded-xl p-4 md:p-8">
                    {/* THE SQUARE CANVAS (1080x1080 ratio) */}
                    <div
                        ref={printRef}
                        className={`w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-xl flex flex-col justify-between p-6 relative overflow-hidden ${themes[theme]}`}
                        style={{ aspectRatio: "1/1" }}
                    >
                        {/* Decorative background blur */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 blur-3xl rounded-full"></div>
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-appleBlue/20 blur-3xl rounded-full"></div>

                        {/* Top: Branding */}
                        <div className="flex items-center justify-between relative z-10">
                            {realtorLogo ? (
                                <div className="relative h-8 w-24">
                                    <Image src={realtorLogo} alt="Logo" layout="fill" objectFit="contain" className="object-contain" unoptimized />
                                </div>
                            ) : (
                                <div className={`font-bold text-lg tracking-tight ${textColor}`}>
                                    EVİNİN <span className={theme === "light" ? "text-appleBlue" : "text-blue-400"}>DEĞERİ</span>
                                </div>
                            )}
                            <div className={`text-[10px] uppercase tracking-wider font-semibold ${theme === "light" ? "bg-appleDark text-white" : "bg-white text-appleDark"} px-2 py-1 rounded-full`}>
                                EKSPERTİZ
                            </div>
                        </div>

                        {/* Middle: Data */}
                        <div className="relative z-10 my-auto">
                            <h4 className={`text-xl md:text-2xl font-black mb-1 truncate ${textColor}`}>
                                {valuationData.neighborhood} Mahallesi
                            </h4>
                            <p className={`text-sm md:text-base font-medium mb-6 ${mutedTextColor}`}>
                                {valuationData.district}, {valuationData.city}
                            </p>

                            <div className={`p-4 rounded-xl ${boxBg} mb-4`}>
                                <p className={`text-[10px] md:text-xs uppercase tracking-wide font-semibold mb-1 opacity-80 ${textColor}`}>
                                    Yapay Zeka Tahmini Değeri
                                </p>
                                <p className={`text-2xl md:text-4xl font-black tracking-tight ${textColor}`}>
                                    {new Intl.NumberFormat("tr-TR").format(valuationData.estimatedValue)} <span className="text-xl md:text-2xl font-semibold opacity-80">TL</span>
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                <div className={`flex flex-col items-center justify-center p-2 rounded-lg ${boxBg}`}>
                                    <Home size={14} className={mutedTextColor} />
                                    <span className={`text-xs font-bold mt-1 ${textColor}`}>{valuationData.rooms}</span>
                                </div>
                                <div className={`flex flex-col items-center justify-center p-2 rounded-lg ${boxBg}`}>
                                    <Activity size={14} className={mutedTextColor} />
                                    <span className={`text-xs font-bold mt-1 ${textColor}`}>{valuationData.netSqm} m²</span>
                                </div>
                                <div className={`flex flex-col items-center justify-center p-2 rounded-lg ${boxBg}`}>
                                    <Building size={14} className={mutedTextColor} />
                                    <span className={`text-xs font-bold mt-1 ${textColor}`}>{valuationData.buildingAge} Yaş</span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom: Footer */}
                        <div className="relative z-10 flex justify-center">
                            <p className={`text-[10px] opacity-60 font-medium ${textColor}`}>
                                Bu analiz Evin Değeri algoritması ile hesaplanmıştır.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Controls */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <h4 className="text-sm font-bold text-appleDark mb-4">Tema Seçimi</h4>
                    <div className="flex gap-3 mb-8">
                        <button
                            onClick={() => setTheme("dark")}
                            className={`w-12 h-12 rounded-full bg-gray-900 border-2 transition-all ${theme === "dark" ? "border-appleBlue scale-110 shadow-md" : "border-transparent"}`}
                            title="Koyu Tema"
                        />
                        <button
                            onClick={() => setTheme("light")}
                            className={`w-12 h-12 rounded-full bg-white border-2 border-gray-200 transition-all ${theme === "light" ? "border-appleBlue scale-110 shadow-md" : "border-transparent"}`}
                            title="Açık Tema"
                        />
                        <button
                            onClick={() => setTheme("blue")}
                            className={`w-12 h-12 rounded-full bg-appleBlue border-2 transition-all ${theme === "blue" ? "border-blue-300 scale-110 shadow-md" : "border-transparent"}`}
                            title="Mavi Tema"
                        />
                    </div>

                    <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                        Müşterilerinize doğrudan gönderebileceğiniz veya Instagram profilinizde başarı hikayesi olarak paylaşabileceğiniz şık bir görsel oluşturun. B2B ayarlarından kendi logonuzu eklerseniz, görselde sol üstte yer alacaktır.
                    </p>

                    <button
                        onClick={handleDownload}
                        disabled={downloading}
                        className="flex items-center justify-center w-full py-4 px-6 bg-appleDark text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg transform hover:-translate-y-0.5 disabled:opacity-70"
                    >
                        {downloading ? (
                            <span className="flex items-center animate-pulse">Oluşturuluyor...</span>
                        ) : (
                            <>
                                <Download size={20} className="mr-2" />
                                Resmi İndir (PNG)
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
