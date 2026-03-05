"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LeadModal({ isOpen, onClose, formData }: any) {
    const [lead, setLead] = useState({ fullName: "", phone: "", email: "" });
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);

    // OTP states
    const [otpStep, setOtpStep] = useState(false);
    const [otpCode, setOtpCode] = useState("");
    const [otpLoading, setOtpLoading] = useState(false);

    const router = useRouter();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const phoneRegex = /^(\+90|0)?[1-9][0-9]{9}$/;
        if (!phoneRegex.test(lead.phone.replace(/\s+/g, ''))) {
            return alert("Lütfen geçerli bir Türkiye numarası girin (Örn: 05321234567)");
        }
        if (!agreed) return alert("Lütfen KVKK ve Yapay Zeka Onay metnini kabul edin.");

        if (!otpStep) {
            // STEP 1: Request OTP
            setLoading(true);
            try {
                const res = await fetch("/api/otp/send", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: lead.email })
                });
                const data = await res.json();

                if (data.success) {
                    setOtpStep(true);
                } else {
                    alert("E-posta Gönderim Hatası: " + data.error);
                }
            } catch (err) {
                alert("Uyarı: Arka uç E-posta modülü zaman aşımına uğradı.");
            } finally {
                setLoading(false);
            }
        } else {
            // STEP 2: Verify OTP & Submit Lead
            if (otpCode.length !== 6) return alert("Lütfen 6 haneli doğrulama kodunu girin.");
            setOtpLoading(true);

            try {
                // Verify OTP
                const verifyRes = await fetch("/api/otp/verify", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: lead.email, code: otpCode })
                });
                const verifyData = await verifyRes.json();

                if (!verifyData.success) {
                    setOtpLoading(false);
                    return alert("Doğrulama Hatası: " + verifyData.error);
                }

                // Call actual valuation endpoint
                const valRes = await fetch("/api/valuation", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...formData, contactInfo: lead, agreed })
                });
                const valData = await valRes.json();

                if (valData.success) {
                    router.push(`/result/${valData.id}`);
                } else {
                    alert("Hesaplama Hatası: " + valData.error);
                    setOtpLoading(false);
                }
            } catch (err) {
                console.error(err);
                alert("Bağlantı hatası.");
                setOtpLoading(false);
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden relative"
            >
                <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                    <X size={20} />
                </button>

                <div className="p-8">
                    <div className="flex items-center justify-center w-12 h-12 bg-appleBlue/10 text-appleBlue rounded-2xl mb-6">
                        <ShieldCheck size={24} />
                    </div>

                    <h3 className="text-2xl font-semibold text-appleDark mb-2">Son Bir Adım</h3>
                    <p className="text-sm text-appleLightGray mb-6">
                        Yapay zeka analizini tamamlamak ve raporunuzu görüntülemek için lütfen bilgilerinizi girin.
                    </p>

                    {!otpStep ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-appleDark mb-1">Ad Soyad <span className="text-red-500">*</span></label>
                                <input required type="text" value={lead.fullName} onChange={e => setLead({ ...lead, fullName: e.target.value })} className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-appleBlue transition-all" placeholder="Örn: Ahmet Yılmaz" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-appleDark mb-1">Telefon Numarası <span className="text-red-500">*</span></label>
                                <input required type="tel" pattern="^(\+90|0)?[1-9][0-9]{9}$" title="Lütfen geçerli bir Türkiye numarası girin (Örn: 05321234567)" value={lead.phone} onChange={e => setLead({ ...lead, phone: e.target.value })} className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-appleBlue transition-all" placeholder="0532 000 00 00" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-appleDark mb-1">E-posta <span className="text-red-500">*</span></label>
                                <input required type="email" value={lead.email} onChange={e => setLead({ ...lead, email: e.target.value })} className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-appleBlue transition-all" placeholder="ornek@email.com" />
                                <p className="text-xs text-appleLightGray mt-1">Raporunuz bu adrese gönderilecektir. Lütfen doğru girdiğinizden emin olun.</p>
                            </div>

                            <div className="flex items-start gap-3 mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <input required type="checkbox" id="agreement" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-1 w-4 h-4 text-appleBlue rounded border-gray-300 focus:ring-appleBlue" />
                                <label htmlFor="agreement" className="text-xs text-gray-500 leading-relaxed cursor-pointer">
                                    Bu sonucun bir yapay zeka tahmini olduğunu, <Link href="/p/kullanim-kosullari" target="_blank" className="text-appleBlue hover:underline">Kullanım Koşulları</Link> kapsamında bir yatırım tavsiyesi olmadığını ve <Link href="/p/gizlilik-politikasi" target="_blank" className="text-appleBlue hover:underline">KVKK</Link> metni çerçevesinde verilerimin işlenmesini kabul ediyorum.
                                </label>
                            </div>

                            <button disabled={loading} type="submit" className="w-full mt-6 py-3 px-4 bg-appleDark text-white rounded-xl font-medium hover:bg-black transition-all shadow-apple transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center">
                                {loading ? "Doğrulama Kodu Gönderiliyor..." : "Devam Et"}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-center mb-6">
                                <ShieldCheck className="text-appleBlue mr-3" size={24} />
                                <p className="text-sm text-appleDark">
                                    <strong>{lead.email}</strong> adresinize doğrulama kodu gönderildi. Lütfen gelen (veya spam) kutunuzu kontrol edin.
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-appleDark text-center mb-2">6 Haneli Doğrulama Kodu</label>
                                <input
                                    required
                                    type="text"
                                    maxLength={6}
                                    placeholder="• • • • • •"
                                    value={otpCode}
                                    onChange={e => setOtpCode(e.target.value.replace(/\D/g, ''))}
                                    className="w-full p-4 text-center tracking-[1em] font-mono text-2xl rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-appleBlue transition-all"
                                />
                            </div>

                            <button disabled={otpLoading || otpCode.length !== 6} type="submit" className="w-full mt-6 py-4 px-4 bg-appleBlue text-white rounded-xl font-medium hover:bg-blue-600 transition-all shadow-apple transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center text-lg">
                                {otpLoading ? "Rapor Hazırlanıyor..." : "Doğrula ve Sonucu Göster"}
                            </button>
                            <button type="button" onClick={() => setOtpStep(false)} className="w-full text-center text-sm text-gray-500 hover:text-appleDark mt-4 transition-colors">
                                Geri Dön & Düzelt
                            </button>
                        </form>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
