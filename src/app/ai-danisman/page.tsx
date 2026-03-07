"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Bot, User, Send, Sparkles, AlertCircle, Loader2, TrendingUp, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AIAssistantPage() {
    const { data: session } = useSession();
    const isPremium = session?.user?.isPremium || session?.user?.isPro;

    const [messages, setMessages] = useState([
        { role: "assistant", content: "Merhaba! Ben Evinin Değeri Yapay Zeka Danışmanınız. İstanbul, Ankara veya İzmir'deki kira getirileri, amortisman süreleri veya yatırım fırsatları hakkında bana her şeyi sorabilirsiniz." }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !isPremium) return;

        const userMessage = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const res = await fetch("/api/ai/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage })
            });

            const data = await res.json();

            if (res.ok) {
                setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
            } else {
                setMessages(prev => [...prev, { role: "assistant", content: "Bir hata oluştu. Lütfen tekrar deneyin." }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: "assistant", content: "Bağlantı hatası oluştu." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col pt-24 bg-gray-50 h-screen overflow-hidden">

            <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl flex flex-col h-[calc(100vh-100px)] relative">

                {/* Premium Blocker Overlay (Landing Page) */}
                {!isPremium && (
                    <div className="absolute inset-0 z-20 bg-white/70 backdrop-blur-xl flex flex-col items-center justify-center p-4 rounded-3xl overflow-y-auto">
                        <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-2xl max-w-3xl w-full text-center border border-gray-100 my-auto relative overflow-hidden">
                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-x-1/2 -translate-y-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-x-1/2 translate-y-1/2"></div>

                            <div className="relative z-10">
                                <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner border border-white">
                                    <Bot size={48} />
                                </div>
                                <h2 className="text-4xl md:text-5xl font-extrabold text-appleDark mb-6 tracking-tight">Kişisel Yapay Zeka<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-appleBlue to-purple-600">Emlak Danışmanınız</span></h2>
                                <p className="text-gray-500 mb-10 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                                    Milyonlarca satınalma verisi, kira rayiçleri ve bölgesel trendlerle eğitilmiş yapay zeka modelimiz, tüm emlak yatırımlarınızda saniyeler içinde size rehberlik eder.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
                                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/50 transition-colors">
                                        <TrendingUp className="text-appleBlue mb-4" size={28} />
                                        <h3 className="font-bold text-appleDark mb-2 text-lg">Amortisman Analizi</h3>
                                        <p className="text-gray-500 text-sm">Bölgelere göre geri dönüş sürelerini anında hesaplatın.</p>
                                    </div>
                                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-purple-100 hover:bg-purple-50/50 transition-colors">
                                        <Clock className="text-purple-500 mb-4" size={28} />
                                        <h3 className="font-bold text-appleDark mb-2 text-lg">7/24 Kesintisiz</h3>
                                        <p className="text-gray-500 text-sm">Pazar günü gece yarısı bile yatırım sorularınızı yanıtlar.</p>
                                    </div>
                                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-appleBlue hover:bg-blue-50/50 transition-colors">
                                        <ShieldCheck className="text-appleDark mb-4" size={28} />
                                        <h3 className="font-bold text-appleDark mb-2 text-lg">Veriye Dayalı Karar</h3>
                                        <p className="text-gray-500 text-sm">Duygularla değil, gerçek piyasa verileriyle hareket edin.</p>
                                    </div>
                                </div>

                                <Link href="/fiyatlandirma" className="inline-flex items-center justify-center gap-2 w-full md:w-auto bg-appleDark text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-appleBlue hover:scale-105 transition-all shadow-lg hover:shadow-xl">
                                    Premium Seçenekleri İncele <ArrowRight size={20} />
                                </Link>
                                <p className="text-sm text-gray-400 mt-6">Bu özellik Premium Yatırımcı ve Kurumsal üyelik paketlerine dahildir.</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-[32px] shadow-xl border border-gray-100 flex flex-col flex-grow overflow-hidden relative z-10">
                    {/* Chat Header */}
                    <div className="bg-appleDark text-white p-6 flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                            <Bot size={24} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold flex items-center gap-2">Evinin Değeri AI <Sparkles size={16} className="text-yellow-400" /></h2>
                            <p className="text-white/70 text-sm">Emlak & Yatırım Danışmanı</p>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-grow p-6 overflow-y-auto bg-gray-50/50 space-y-6">
                        {messages.map((message, index) => (
                            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex max-w-[80%] gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${message.role === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-appleDark text-white'}`}>
                                        {message.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                                    </div>
                                    <div className={`p-4 rounded-2xl ${message.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-white border border-gray-200 text-appleDark rounded-tl-sm shadow-sm'}`}>
                                        <p className="whitespace-pre-wrap text-[15px] leading-relaxed">{message.content}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="flex max-w-[80%] gap-3 flex-row">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-appleDark text-white">
                                        <Bot size={20} />
                                    </div>
                                    <div className="p-4 rounded-2xl bg-white border border-gray-200 text-appleDark rounded-tl-sm shadow-sm flex items-center gap-2">
                                        <Loader2 className="w-5 h-5 animate-spin text-appleBlue" />
                                        <span className="text-sm text-gray-500 font-medium">Büyük veriyi analiz ediyor...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 bg-white border-t border-gray-100">
                        <form onSubmit={handleSubmit} className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={!isPremium || isLoading}
                                placeholder={isPremium ? "Örn: Kadıköy'de 3+1 amortsman süresi nedir?" : "Bu özelliği kullanmak için Premium olmalısınız."}
                                className="flex-grow bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-appleBlue transition-all text-appleDark disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={!isPremium || isLoading || !input.trim()}
                                className="bg-appleDark text-white px-6 rounded-xl hover:bg-appleBlue transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={20} />
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
