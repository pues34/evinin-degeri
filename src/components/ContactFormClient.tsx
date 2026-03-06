"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactFormClient() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: "success" | "error" | null, message: string }>({ type: null, message: "" });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: null, message: "" });

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            subject: formData.get("subject"),
            message: formData.get("message"),
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const result = await res.json();

            if (res.ok && result.success) {
                setStatus({ type: "success", message: "Mesajınız başarıyla iletildi!" });
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus({ type: "error", message: result.error || "Bir hata oluştu." });
            }
        } catch (error) {
            setStatus({ type: "error", message: "Sunucu bağlantı hatası." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {status.type === "success" && (
                <div className="p-4 bg-green-50 text-green-700 rounded-xl border border-green-200">
                    {status.message}
                </div>
            )}
            {status.type === "error" && (
                <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
                    {status.message}
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adiniz Soyadiniz <span className="text-red-500">*</span></label>
                    <input type="text" name="name" required className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-appleBlue transition-all" placeholder="Ornek: Ahmet Yilmaz" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-Posta <span className="text-red-500">*</span></label>
                    <input type="email" name="email" required className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-appleBlue transition-all" placeholder="ornek@email.com" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                <input type="tel" name="phone" className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-appleBlue transition-all" placeholder="05XX XXX XX XX" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Konu <span className="text-red-500">*</span></label>
                <select name="subject" required className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-appleBlue transition-all">
                    <option value="">Konu Seciniz</option>
                    <option value="Genel Soru">Genel Soru</option>
                    <option value="Teknik Destek">Teknik Destek</option>
                    <option value="Kurumsal Isbirligi">Kurumsal Isbirligi</option>
                    <option value="Oneri / Sikayet">Oneri / Sikayet</option>
                    <option value="Diger">Diger</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mesajiniz <span className="text-red-500">*</span></label>
                <textarea name="message" rows={5} required className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-appleBlue transition-all resize-none" placeholder="Mesajinizi buraya yazin..." />
            </div>
            <p className="text-xs text-gray-400">
                * Bilgileriniz KVKK kapsaminda korunmaktadir ve ucuncu taraflarla paylasilmaz.
            </p>
            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-appleDark text-white rounded-xl font-medium hover:bg-black transition-all shadow-apple disabled:opacity-50">
                <Send size={18} />
                {loading ? "Gonderiliyor..." : "Mesaj Gonder"}
            </button>
        </form>
    );
}
