"use client";

import { motion } from "framer-motion";
import { Sparkles, MapPin } from "lucide-react";
import ValuationForm from "@/components/ValuationForm";
import AnimatedCounter from "@/components/AnimatedCounter";

export default function HeroSection({ counterValue }: { counterValue: number }) {
    return (
        <div className="relative z-10 flex-1 flex flex-col items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl w-full mx-auto text-center mb-12"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/40 border border-white/60 rounded-full text-sm font-medium text-appleBlue mb-6 backdrop-blur-md shadow-sm"
                >
                    <Sparkles size={16} /> Yapay Zeka Destekli Değerleme
                </motion.div>

                <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-appleDark mb-6 leading-tight">
                    Evinizin <span className="text-appleBlue">Gerçek Değeri</span><br />Saniyeler İçinde
                </h1>

                <p className="text-lg md:text-xl text-appleLightGray max-w-2xl mx-auto leading-relaxed mb-6">
                    Türkiye&apos;nin dört bir yanındaki gayrimenkullerin güncel piyasa değerini, gelişmiş yapay zeka ve bölge çarpanları algoritmamızla anında hesaplayın.
                </p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="flex flex-col gap-3 items-center"
                >
                    <div className="inline-block p-4 bg-blue-50/80 backdrop-blur-sm border border-blue-100 rounded-2xl text-appleBlue font-medium shadow-sm">
                        <MapPin size={18} className="inline mr-2 -mt-1" />
                        Şu an için veritabanımız <span className="font-bold">sadece İstanbul</span> iline özel olarak optimize edilmiştir.
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center">
                        <span className="px-3 py-1 bg-white border border-gray-200 text-gray-500 rounded-full text-xs font-semibold shadow-sm">🎯 Ankara (Yakında)</span>
                        <span className="px-3 py-1 bg-white border border-gray-200 text-gray-500 rounded-full text-xs font-semibold shadow-sm">🎯 İzmir (Yakında)</span>
                        <span className="px-3 py-1 bg-white border border-gray-200 text-gray-500 rounded-full text-xs font-semibold shadow-sm">🎯 Bursa (Yakında)</span>
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                className="max-w-3xl w-full mx-auto mb-10 relative"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 transform rotate-1 rounded-3xl blur-md" />
                <ValuationForm />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5, type: "spring", stiffness: 100 }}
                className="mb-14 flex flex-col items-center relative z-20"
            >
                <div className="flex items-center gap-3 px-6 py-3 bg-white shadow-xl shadow-green-500/5 border border-green-100 rounded-full transform hover:scale-105 transition-transform">
                    <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </div>
                    <span className="text-gray-600 font-medium text-sm sm:text-base">
                        Bu ay tam <strong className="text-appleDark text-lg"><AnimatedCounter value={counterValue} /></strong> adet evin değeri hesaplandı.
                    </span>
                </div>
            </motion.div>
        </div>
    );
}
