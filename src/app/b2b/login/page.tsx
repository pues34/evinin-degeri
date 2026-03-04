"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2 } from "lucide-react";

export default function B2BLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await signIn("realtor-login", {
            redirect: false,
            email,
            password
        });

        if (res?.error) {
            setError("E-posta veya şifre hatalı.");
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

                <form onSubmit={handleSubmit} className="space-y-6">
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
                        {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Hesabınız yok mu? <Link href="/b2b/register" className="text-appleBlue font-medium hover:underline">Hemen Kayıt Olun</Link>
                </p>
            </div>
        </div>
    );
}
