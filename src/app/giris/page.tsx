"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Hexagon, ArrowRight, AlertCircle, Loader2 } from "lucide-react";

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/portfoy";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await signIn("b2c-login", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError(res.error);
                setLoading(false);
            } else {
                router.push(callbackUrl);
                router.refresh();
            }
        } catch (err: any) {
            setError("Giriş yapılırken bir hata oluştu.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/" className="flex justify-center items-center gap-2 group mb-6">
                    <span className="p-2 bg-appleDark text-white rounded-xl group-hover:bg-appleBlue transition-colors">
                        <Hexagon size={28} className="fill-current" />
                    </span>
                    <span className="font-bold text-2xl text-appleDark tracking-tight">Evinin Değeri</span>
                </Link>
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Yatırımcı Girişi
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Portföyünüzü ve fırsatları takip edin.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-100">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 p-4 rounded-xl flex items-start">
                                <AlertCircle className="text-red-500 mr-3 shrink-0 mt-0.5" size={18} />
                                <p className="text-sm text-red-800 font-medium">{error}</p>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700">E-posta Adresi</label>
                            <div className="mt-1 relative rounded-xl shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-appleBlue focus:border-appleBlue sm:text-sm bg-gray-50 outline-none transition-colors"
                                    placeholder="ornek@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className="block text-sm font-medium text-gray-700">Şifre</label>
                                <div className="text-sm">
                                    <button
                                        type="button"
                                        onClick={() => alert("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. (Geliştirme Aşamasındadır)")}
                                        className="font-medium text-appleBlue hover:text-indigo-500"
                                    >
                                        Şifremi unuttum?
                                    </button>
                                </div>
                            </div>
                            <div className="relative rounded-xl shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-appleBlue focus:border-appleBlue sm:text-sm bg-gray-50 outline-none transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-appleDark hover:bg-appleBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-appleBlue transition-all disabled:opacity-70"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                                        Giriş Yapılıyor...
                                    </>
                                ) : (
                                    "Giriş Yap"
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <Link href="/kayit" className="text-sm font-medium text-appleBlue hover:text-appleDark transition-colors flex items-center justify-center gap-1">
                            Hesabın yok mu? Ücretsiz Kayıt Ol <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function UserLoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-appleBlue" /></div>}>
            <LoginForm />
        </Suspense>
    );
}
