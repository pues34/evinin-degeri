"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2 } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function B2BRegister() {
    const router = useRouter();
    const [form, setForm] = useState({ companyName: "", email: "", phone: "", password: "", otpCode: "" });
    const [step, setStep] = useState<1 | 2>(1);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/b2b/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: form.email, type: "register" })
            });
            const data = await res.json();

            if (data.success) {
                setStep(2); // Go to OTP verification step
            } else {
                setError(data.error || "Doğrulama kodu gönderilemedi.");
            }
        } catch (err) {
            setError("Sunucu ile iletişim kurulamadı.");
        }
        setLoading(false);
    };

    const handleVerifyAndRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.otpCode.length !== 6) {
            setError("Lütfen 6 haneli doğrulama kodunu eksiksiz girin.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/b2b/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form) // includes otpCode
            });
            const data = await res.json();

            if (data.success) {
                alert("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
                router.push("/b2b/login");
            } else {
                setError(data.error || "Kayıt sırasında bir hata oluştu.");
            }
        } catch (err) {
            setError("Sunucuya bağlanılamadı.");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-appleGray p-4">
            <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-50 text-appleBlue rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Building2 size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-appleDark">Kurumsal Kayıt</h1>
                    <p className="text-sm text-gray-500 mt-2">Emlak ofisinizi kaydedin, limitsiz değerleme ayrıcalıklarına katılın.</p>
                </div>

                {error && <div className="mb-4 p-3 bg-red-50 text-red-500 text-sm rounded-xl text-center">{error}</div>}

                {step === 1 ? (
                    <form onSubmit={handleSendOTP} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Şirket/Ofis Adı</label>
                            <input required type="text" value={form.companyName} onChange={e => setForm({ ...form, companyName: e.target.value })} className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-appleBlue bg-gray-50" placeholder="Örn: XYZ Gayrimenkul" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">E-Posta Adresi</label>
                            <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-appleBlue bg-gray-50" placeholder="ornek@sirket.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Telefon (Opsiyonel)</label>
                            <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-appleBlue bg-gray-50" placeholder="0555 555 55 55" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
                            <input required type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-appleBlue bg-gray-50" placeholder="••••••••" />
                        </div>

                        <button disabled={loading} type="submit" className="w-full py-3.5 bg-appleBlue text-white rounded-xl shadow-apple font-medium hover:bg-blue-600 transition-colors mt-2">
                            {loading ? "Kod Gönderiliyor..." : "Hesap Oluştur"}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyAndRegister} className="space-y-6">
                        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 text-center mb-6">
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold text-appleDark">{form.email}</span> adresine 6 haneli bir doğrulama kodu gönderildi. Lütfen gelen kutunuzu (veya Spam klasörünü) kontrol edin.
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Doğrulama Kodu</label>
                            <input required type="text" maxLength={6} value={form.otpCode} onChange={e => setForm({ ...form, otpCode: e.target.value.replace(/\D/g, '') })} className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-appleBlue bg-gray-50 text-center text-xl tracking-[0.5em] font-mono" placeholder="123456" />
                        </div>

                        <div className="flex gap-3">
                            <button type="button" onClick={() => setStep(1)} disabled={loading} className="py-3.5 px-6 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                                Geri
                            </button>
                            <button disabled={loading} type="submit" className="flex-1 py-3.5 bg-appleBlue text-white rounded-xl shadow-apple font-medium hover:bg-blue-600 transition-colors">
                                {loading ? "Doğrulanıyor..." : "Kodu Doğrula ve Kaydol"}
                            </button>
                        </div>
                    </form>
                )}

                {step === 1 && (
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Zaten hesabınız var mı? <Link href="/b2b/login" className="text-appleBlue font-medium hover:underline">Giriş Yap</Link>
                    </p>
                )}
            </div>
        </div>
    );
}


