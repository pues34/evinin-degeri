"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password
        });

        if (res?.error) {
            setError("Giriş bilgileri hatalı veya yetkisiz erişim.");
            setLoading(false);
        } else {
            router.push("/yonetim-gizli-portal");
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-appleGray p-4">
            <div className="glass-card max-w-md w-full p-8 shadow-sm">
                <div className="flex flex-col items-center justify-center mb-8">
                    <div className="w-16 h-16 bg-appleDark rounded-2xl flex items-center justify-center mb-4 text-white shadow-apple">
                        <ShieldAlert size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-appleDark">Güvenli Erişim</h1>
                    <p className="text-sm text-appleLightGray mt-2 text-center">Sadece yetkili personeller giriş yapabilir.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl text-center">
                            {error}
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-appleDark mb-2">Kurumsal E-Posta</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-appleBlue bg-gray-50/50"
                            placeholder="admin@sirketiniz.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-appleDark mb-2">Gizli Parola</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-appleBlue bg-gray-50/50"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-appleDark text-white rounded-xl shadow-apple font-medium hover:bg-black transition-colors flex items-center justify-center gap-2"
                    >
                        {loading ? "Doğrulanıyor..." : "Panele Giriş Yap"}
                    </button>
                </form>
            </div>
        </div>
    );
}
