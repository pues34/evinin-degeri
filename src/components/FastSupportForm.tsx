"use client";

import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";

interface FastSupportProps {
    user: {
        name: string;
        email: string;
    };
}

export default function FastSupportForm({ user }: FastSupportProps) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // B2B User contact info
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const phoneRegex = /^(\+90|0)?[1-9][0-9]{9}$/;
        if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
            return alert("Lütfen geçerli bir Türkiye numarası girin (Örn: 05321234567)");
        }

        setLoading(true);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    phone,
                    subject: "B2B Hızlı Destek Talebi",
                    message
                })
            });

            const data = await res.json();
            if (data.success) {
                setSuccess(true);
                setMessage("");
                setPhone("");
                setTimeout(() => setSuccess(false), 5000);
            } else {
                alert("Bir hata oluştu: " + data.error);
            }
        } catch (error) {
            console.error(error);
            alert("Bağlantı hatası.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mt-8">
            <h2 className="text-xl font-bold text-appleDark mb-2 flex items-center gap-2">
                <MessageSquare className="text-amber-500" size={24} /> Hızlı Destek Masası
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
                Kurumsal panelinizle ilgili tüm soru, öneri ve destek taleplerinizi bize hızlıca iletebilirsiniz. Ekibimiz anında geri dönüş sağlayacaktır.
            </p>

            {success ? (
                <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-100 font-medium">
                    Talebiniz başarıyla iletildi! En kısa sürede sizinle iletişime geçeceğiz.
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-appleDark mb-1">Şirket Yetkilisi</label>
                            <input type="text" disabled value={user.name} className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-appleDark mb-1">E-Posta</label>
                            <input type="text" disabled value={user.email} className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-appleDark mb-1">Telefon Numaranız <span className="text-red-500">*</span></label>
                        <input required type="tel" pattern="^(\+90|0)?[1-9][0-9]{9}$" title="Lütfen geçerli bir Türkiye numarası girin (Örn: 05321234567)" placeholder="0532 000 00 00" value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-appleBlue transition-all" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-appleDark mb-1">Destek Talebi / Konu <span className="text-red-500">*</span></label>
                        <textarea required rows={4} placeholder="Size nasıl yardımcı olabiliriz?" value={message} onChange={e => setMessage(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-appleBlue transition-all resize-none"></textarea>
                    </div>

                    <button disabled={loading} type="submit" className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-appleDark text-white rounded-xl font-medium hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? "Gönderiliyor..." : "Talebi Gönder"} <Send size={18} />
                    </button>
                </form>
            )}
        </div>
    );
}
