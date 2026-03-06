"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Building2, ArrowRight, Loader2 } from "lucide-react";

const INITIAL_DELAY = 3000;

interface Message {
    id: number;
    text: string;
    sender: "bot" | "user";
}

export default function SmartChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [showBadge, setShowBadge] = useState(false);
    const [hasOpened, setHasOpened] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!hasOpened) setShowBadge(true);
        }, INITIAL_DELAY);
        return () => clearTimeout(timer);
    }, [hasOpened]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const openChat = () => {
        setIsOpen(true);
        setShowBadge(false);
        setHasOpened(true);
        if (messages.length === 0) {
            setMessages([{
                id: 1,
                text: "Merhaba! 👋 Ben Evinin Degeri yapay zeka asistaniyim. Evinizin degeri, B2B uyelik veya platformumuz hakkinda her seyi sorabilirsiniz!",
                sender: "bot"
            }]);
        }
    };

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMsg: Message = { id: Date.now(), text: input.trim(), sender: "user" };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/chatbot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMsg.text, history: newMessages.slice(-8) })
            });
            const data = await res.json();

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: data.reply || "Uzgunum, cevap uretemiyorum. Lutfen daha sonra tekrar deneyin.",
                sender: "bot"
            }]);
        } catch {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "Baglanti hatasi. Lutfen tekrar deneyin.",
                sender: "bot"
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
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
                                👋 <strong>Merhaba!</strong> Emlak degerleme veya platformumuz hakkinda soru sormak ister misiniz?
                            </p>
                            <button
                                onClick={openChat}
                                className="mt-3 text-xs font-medium text-appleBlue hover:underline flex items-center gap-1"
                            >
                                Sohbete Basla <ArrowRight size={12} />
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
                        style={{ maxHeight: "520px" }}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-appleBlue to-blue-600 p-4 text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                    <Building2 size={16} />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">Evinin Degeri AI</p>
                                    <p className="text-xs text-blue-100">Yapay Zeka Asistani • Cevrimici</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: "280px", maxHeight: "350px" }}>
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                    <div
                                        className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.sender === "bot"
                                            ? "bg-gray-100 text-gray-700 rounded-bl-none"
                                            : "bg-appleBlue text-white rounded-br-none"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-100 rounded-2xl rounded-bl-none px-4 py-3">
                                        <Loader2 size={16} className="animate-spin text-appleBlue" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 border-t border-gray-100 bg-gray-50">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Bir soru sorun..."
                                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-appleBlue outline-none bg-white"
                                    disabled={loading}
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={loading || !input.trim()}
                                    className="w-10 h-10 bg-appleBlue text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors disabled:opacity-50"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                            <p className="text-[10px] text-gray-400 text-center mt-2">
                                Yapay Zeka Destekli • evindegeri.com
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
