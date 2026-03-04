"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Loader2, CheckCircle } from "lucide-react";

export default function ContactWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (data.success) {
                setStatus("success");
                setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
                // Return to idle after a few seconds
                setTimeout(() => {
                    setStatus("idle");
                    setIsOpen(false);
                }, 3000);
            } else {
                setStatus("error");
                setErrorMsg(data.error || "Göderim başarısız.");
            }
        } catch (err) {
            setStatus("error");
            setErrorMsg("Bağlantı hatası.");
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Modal */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col mb-4 animate-fade-in origin-bottom-right">
                    <div className="bg-gradient-to-r from-appleBlue to-blue-600 p-6 text-white relative">
                        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                        <h3 className="font-bold text-lg mb-1">Bize Ulaşın</h3>
                        <p className="text-blue-100 text-sm opacity-90">Sorularınız, iş birlikleri veya destek için mesaj bırakın.</p>
                    </div>

                    <div className="p-6 bg-gray-50/50">
                        {status === "success" ? (
                            <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
                                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle size={32} />
                                </div>
                                <h4 className="font-bold text-appleDark mb-2">Mesajınız Alındı!</h4>
                                <p className="text-gray-500 text-sm">Uzman ekibimiz en kısa sürede sizinle iletişime geçecektir.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">Ad Soyad</label>
                                    <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} type="text" className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white transition-all" placeholder="Örn: Ahmet Yılmaz" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">E-Posta Adresi</label>
                                    <input required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} type="email" className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white transition-all" placeholder="ornek@mail.com" />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">Telefon (Opsiyonel)</label>
                                        <input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} type="tel" className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white transition-all" placeholder="05XX" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">Konu</label>
                                        <input value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} type="text" className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white transition-all" placeholder="Destek / Soru" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">Mesajınız</label>
                                    <textarea required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none bg-white resize-none h-24 transition-all" placeholder="Nasıl yardımcı olabiliriz?"></textarea>
                                </div>

                                {status === "error" && (
                                    <div className="text-red-500 text-xs font-medium px-1 bg-red-50 p-2 rounded-lg border border-red-100">{errorMsg}</div>
                                )}

                                <button disabled={status === "loading"} type="submit" className="w-full py-3 bg-appleDark text-white font-medium rounded-xl shadow-md hover:bg-black transition-all flex justify-center items-center gap-2">
                                    {status === "loading" ? (
                                        <><Loader2 size={18} className="animate-spin" /> Gönderiliyor...</>
                                    ) : (
                                        <><Send size={18} /> Gönder</>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-center p-4 rounded-full shadow-2xl transition-all duration-300 ${isOpen ? 'bg-white text-appleDark border border-gray-200 rotate-90 scale-110' : 'bg-appleBlue text-white hover:bg-blue-600 hover:scale-105'}`}
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </button>
        </div>
    );
}
