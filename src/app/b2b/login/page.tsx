"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2 } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function B2BLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otpCode, setOtpCode] = useState("");
    const [step, setStep] = useState<1 | 2>(1);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/b2b/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, type: "login" })
            });
            const data = await res.json();

            if (data.success) {
                setStep(2);
            } else {
                setError(data.error || "Doğrulama kodu gönderilemedi. E-posta adresinizi kontrol edin.");
            }
        } catch (err) {
            setError("Sunucu ile iletişim kurulamadı.");
        }
        setLoading(false);
    };

    const handleVerifyAndLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otpCode.length !== 6) {
            setError("Lütfen 6 haneli doğrulama kodunu eksiksiz girin.");
            return;
        }

        setLoading(true);
        setError("");

        const res = await signIn("realtor-login", {
            redirect: false,
            email,
            password,
            otpCode
        });

        if (res?.error) {
            setError(res.error === "CredentialsSignin" ? "E-posta, şifre veya doğrulama kodu hatalı." : res.error);
            setLoading(false);
        } else {
            router.push("/b2b/dashboard");
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-appleGray p-4">
            <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-50 text-appleBlue rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Building2 size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-appleDark">Kurumsal Giriş</h1>
                    <p className="text-sm text-gray-500 mt-2">Emlak ofisleri için geliştirilmiş profesyonel platforma hoş geldiniz.</p>
                </div>

                {step === 1 ? (
                    <form onSubmit={handleSendOTP} className="space-y-6">
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl text-center">
                                {error}
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-appleDark mb-2">E-Posta Adresi</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-appleBlue bg-gray-50"
                                placeholder="ornek@sirketiniz.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-appleDark mb-2">Şifre</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-appleBlue bg-gray-50"
                                placeholder="••••••••"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-appleDark text-white rounded-xl shadow-apple font-medium hover:bg-black transition-colors"
                        >
                            {loading ? "Doğrulama Kodu Gönderiliyor..." : "Giriş Yap"}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyAndLogin} className="space-y-6">
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl text-center">
                                {error}
                            </div>
                        )}
                        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 text-center mb-6">
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold text-appleDark">{email}</span> adresine 6 haneli bir doğrulama kodu gönderildi. Lütfen gelen kutunuzu kontrol edin.
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-appleDark mb-2">Doğrulama Kodu</label>
                            <input
                                type="text"
                                required
                                maxLength={6}
                                value={otpCode}
                                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                                className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-appleBlue bg-gray-50 text-center text-xl tracking-[0.5em] font-mono"
                                placeholder="123456"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button type="button" onClick={() => setStep(1)} disabled={loading} className="py-3.5 px-6 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                                Geri
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 py-3.5 bg-appleDark text-white rounded-xl shadow-apple font-medium hover:bg-black transition-colors"
                            >
                                {loading ? "Doğrulanıyor..." : "Kodu Doğrula ve Gir"}
                            </button>
                        </div>
                    </form>
                )}

                <p className="text-center text-sm text-gray-500 mt-6">
                    Hesabınız yok mu? <Link href="/b2b/register" className="text-appleBlue font-medium hover:underline">Hemen Kayıt Olun</Link>
                </p>
            </div>
        </div>
    );
}


