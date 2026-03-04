"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import Link from "next/link";

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Kontrol et: Daha önce onay verilmiş mi?
        const consent = localStorage.getItem("cookieAccepted");
        if (!consent) {
            // Biraz gecikmeli göster (örneğin 1 saniye sonra)
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookieAccepted", "true");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 150, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 150, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-96 z-[60] bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 overflow-hidden"
                >
                    <div className="flex items-start gap-4 relative">
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute -top-1 -right-1 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={16} />
                        </button>

                        <div className="w-10 h-10 shrink-0 bg-blue-50 rounded-full flex items-center justify-center text-appleBlue">
                            <Cookie size={20} />
                        </div>

                        <div className="flex-1 pr-4">
                            <h4 className="font-semibold text-appleDark text-sm mb-1">Çerez Kullanımı</h4>
                            <p className="text-xs text-gray-500 leading-relaxed mb-4">
                                Size daha iyi bir deneyim sunabilmek için çerezleri kullanıyoruz. Sitemizi kullanarak <Link href="/gizlilik-politikasi" className="text-appleBlue hover:underline">Gizlilik Politikamızı</Link> kabul etmiş olursunuz.
                            </p>

                            <div className="flex gap-2">
                                <button
                                    onClick={acceptCookies}
                                    className="flex-1 bg-appleDark text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-black transition-colors"
                                >
                                    Kabul Et
                                </button>
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-gray-200 transition-colors"
                                >
                                    Reddet
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
