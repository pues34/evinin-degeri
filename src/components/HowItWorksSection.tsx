"use client";

import { motion } from "framer-motion";
import { MapPin, SlidersHorizontal, FileText } from "lucide-react";

export default function HowItWorksSection() {
    const steps = [
        {
            num: "01",
            title: "Konum Girin",
            desc: "Türkiye'nin herhangi bir noktasından mülkünüzün adresini seçin.",
            icon: <MapPin size={24} className="text-appleDark" />
        },
        {
            num: "02",
            title: "Detayları Belirtin",
            desc: "Kat, yaş, metrekare ve asansör gibi fiziksel özellikleri işaretleyin.",
            icon: <SlidersHorizontal size={24} className="text-appleDark" />
        },
        {
            num: "03",
            title: "Raporu Alın",
            desc: "Gelişmiş AI size anında güncel piyasa değerini ve analizini PDF olarak sunar.",
            icon: <FileText size={24} className="text-appleDark" />
        }
    ];

    return (
        <div className="py-24 relative z-10 bg-appleGray overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold text-appleDark tracking-tight mb-4"
                    >
                        Nasıl Çalışır?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-gray-500 text-lg max-w-2xl mx-auto"
                    >
                        Yapay zeka algoritmamızla saniyeler içinde tamamen ücretsiz gayrimenkul değerleme deneyimi.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
                    {/* Connecting Line for Desktop */}
                    <div className="hidden md:block absolute top-[40%] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent z-0 overflow-hidden">
                        <motion.div
                            className="w-full h-full bg-appleBlue"
                            initial={{ x: "-100%" }}
                            whileInView={{ x: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                    </div>

                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.2 }}
                            className="relative z-10 text-center"
                        >
                            <div className="w-24 h-24 mx-auto bg-white rounded-[2rem] shadow-xl border border-gray-100 flex items-center justify-center transform hover:scale-110 transition-transform duration-300 mb-6 relative group">
                                {step.icon}
                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-appleBlue text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/30">
                                    {step.num}
                                </div>
                            </div>
                            <h4 className="text-2xl font-bold text-appleDark mb-3">{step.title}</h4>
                            <p className="text-gray-500 leading-relaxed max-w-[260px] mx-auto">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
