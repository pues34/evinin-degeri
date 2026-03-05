"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";

const INITIAL_DELAY = 3000;

interface Message {
    id: number;
    text: string;
    sender: "bot" | "user";
    actions?: { label: string; value: string }[];
}

const botFlows: Record<string, Message> = {
    welcome: {
        id: 1,
        text: "Merhaba! 👋 Size nasıl yardımcı olabilirim?",
        sender: "bot",
        actions: [
            { label: "🏠 Evimi değerletmek istiyorum", value: "valuation" },
            { label: "🏢 B2B / Kurumsal bilgi", value: "b2b" },
            { label: "❓ Nasıl çalışıyor?", value: "how" },
        ],
    },
    valuation: {
        id: 2,
        text: "Harika! Evinizin değerini ücretsiz hesaplayabilirsiniz. Formu doldurun, yapay zeka destekli algoritmamız anında sonuç üretsin. 🚀",
        sender: "bot",
        actions: [
            { label: "Değerlemeye Başla →", value: "go_form" },
            { label: "← Ana Menü", value: "welcome" },
        ],
    },
    b2b: {
        id: 3,
        text: "Kurumsal kullanıcılarımız için limitsiz değerleme, özel raporlama ve beyaz etiket hizmetleri sunuyoruz. PRO paketlerimize göz atın!",
        sender: "bot",
        actions: [
            { label: "Paketleri İncele →", value: "go_b2b" },
            { label: "← Ana Menü", value: "welcome" },
        ],
    },
    how: {
        id: 4,
        text: "Algoritmamız; bölge çarpanları, bina yaşı, kat durumu, ısıtma, manzara gibi 20+ veri noktasını analiz eder. Sonucu sönümlemeli formülle dengeler ve yapay zeka yorumuyla destekler.",
        sender: "bot",
        actions: [
            { label: "Detaylı Bilgi →", value: "go_how" },
            { label: "← Ana Menü", value: "welcome" },
        ],
    },
};

export default function SmartChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [showBadge, setShowBadge] = useState(false);
    const [hasOpened, setHasOpened] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!hasOpened) setShowBadge(true);
        }, INITIAL_DELAY);
        return () => clearTimeout(timer);
    }, [hasOpened]);

    const openChat = () => {
        setIsOpen(true);
        setShowBadge(false);
        setHasOpened(true);
        if (messages.length === 0) {
            setMessages([botFlows.welcome]);
        }
    };

    const handleAction = (value: string) => {
        if (value === "go_form") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setIsOpen(false);
            return;
        }
        if (value === "go_b2b") {
            window.location.href = "/b2b";
            return;
        }
        if (value === "go_how") {
            window.location.href = "/nasil-hesapliyoruz";
            return;
        }

        const userMsg: Message = {
            id: Date.now(),
            text: botFlows[value]?.actions?.find(() => true)?.label || value,
            sender: "user",
        };

        const botResponse = botFlows[value];
        if (botResponse) {
            setMessages((prev) => [
                ...prev,
                { ...userMsg, text: botFlows[value] ? "..." : value },
                { ...botResponse, id: Date.now() + 1 },
            ]);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <AnimatePresence>
                    {showBadge && !isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            className="absolute bottom-16 right-0 bg-white border border-gray-200 rounded-2xl p-4 shadow-xl w-64 mb-2"
                        >
                            <button onClick={() => setShowBadge(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                                <X size={14} />
                            </button>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                👋 <strong>Merhaba!</strong> Evinizin değerini öğrenmek veya kurumsal üyelik hakkında bilgi almak ister misiniz?
                            </p>
                            <button
                                onClick={openChat}
                                className="mt-3 text-xs font-medium text-appleBlue hover:underline flex items-center gap-1"
                            >
                                Sohbete Başla <ArrowRight size={12} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => (isOpen ? setIsOpen(false) : openChat())}
                    className="w-14 h-14 bg-gradient-to-br from-appleBlue to-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow relative"
                >
                    {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
                    {showBadge && !isOpen && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                    )}
                </motion.button>
            </div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
                        style={{ maxHeight: "480px" }}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-appleBlue to-blue-600 p-4 text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                    <Building2 size={16} />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">Evinin Değeri</p>
                                    <p className="text-xs text-blue-100">Akıllı Asistan • Çevrimiçi</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: "250px" }}>
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                    <div
                                        className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.sender === "bot"
                                                ? "bg-gray-100 text-gray-700 rounded-bl-none"
                                                : "bg-appleBlue text-white rounded-br-none"
                                            }`}
                                    >
                                        {msg.text}
                                        {msg.actions && (
                                            <div className="flex flex-col gap-2 mt-3">
                                                {msg.actions.map((action) => (
                                                    <button
                                                        key={action.value}
                                                        onClick={() => handleAction(action.value)}
                                                        className="text-left px-3 py-2 bg-white text-appleBlue text-xs font-medium rounded-xl border border-blue-100 hover:bg-blue-50 transition-colors"
                                                    >
                                                        {action.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="p-3 border-t border-gray-100 bg-gray-50">
                            <p className="text-[10px] text-gray-400 text-center">
                                Evinin Değeri Akıllı Asistan • Yapay Zeka Destekli
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
