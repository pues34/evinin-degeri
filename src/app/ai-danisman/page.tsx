"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Bot, User, Send, Sparkles, AlertCircle, Loader2 } from "lucide-react";

export default function AIAssistantPage() {
    const { data: session } = useSession();
    const isPremium = session?.user?.isPremium;

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

                {/* Premium Blocker Overlay */}
                {!isPremium && (
                    <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-md flex flex-col items-center justify-center p-4 rounded-3xl">
                        <div className="bg-white p-10 rounded-[32px] shadow-2xl max-w-xl text-center border border-indigo-100">
                            <div className="w-20 h-20 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Bot size={40} />
                            </div>
                            <h2 className="text-3xl font-extrabold text-appleDark mb-4">Size Özel AI Danışmanı</h2>
                            <p className="text-gray-500 mb-8 text-lg">Bu özellik sadece <strong>Premium Yatırımcı</strong> paketine sahip üyelerimize özeldir. Milyonlarca gayrimenkul verisiyle eğitilmiş botumuzdan saniyeler içinde tavsiye alabilirsiniz.</p>

                            <button className="w-full bg-appleDark text-white py-4 rounded-xl font-bold text-lg hover:bg-appleBlue transition shadow-sm">
                                Premium Üyeliğe Yükselt (Aylık 299 TL)
                            </button>
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
