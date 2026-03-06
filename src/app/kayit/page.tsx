"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, Phone, Hexagon, ArrowRight, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";

export default function UserRegisterPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Şifreler birbiriyle eşleşmiyor.");
            setLoading(false);
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W_]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            setError("Şifre en az 8 karakter olmalı, en az bir büyük harf, bir küçük harf ve bir rakam içermelidir.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Kayıt işlemi başarısız.");
            }

            setSuccess(true);
            setTimeout(() => {
                router.push("/giris");
            }, 2000);

        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-12 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-100 text-center">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                            <CheckCircle2 className="h-8 w-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Aramıza Hoş Geldiniz!</h2>
                        <p className="text-gray-500 mb-8">Hesabınız başarıyla oluşturuldu. Giriş sayfasına yönlendiriliyorsunuz...</p>
                        <Loader2 className="animate-spin h-6 w-6 text-appleBlue mx-auto" />
                    </div>
                </div>
            </div>
        );
    }

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
                    Bireysel Hesap Oluştur
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Yatırım fırsatlarını kolayca cebinizden takip edin.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-100">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 p-4 rounded-xl flex items-start">
                                <AlertCircle className="text-red-500 mr-3 shrink-0 mt-0.5" size={18} />
                                <p className="text-sm text-red-800 font-medium">{error}</p>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ad Soyad</label>
                            <div className="mt-1 relative rounded-xl shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-appleBlue focus:border-appleBlue sm:text-sm bg-gray-50 outline-none transition-colors"
                                    placeholder="Ad Soyad"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">E-posta Adresi</label>
                            <div className="mt-1 relative rounded-xl shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-appleBlue focus:border-appleBlue sm:text-sm bg-gray-50 outline-none transition-colors"
                                    placeholder="ornek@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Telefon Numarası (Opsiyonel)</label>
                            <div className="mt-1 relative rounded-xl shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-appleBlue focus:border-appleBlue sm:text-sm bg-gray-50 outline-none transition-colors"
                                    placeholder="05xx xxx xx xx"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Şifre</label>
                                <div className="mt-1 relative rounded-xl shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-appleBlue focus:border-appleBlue sm:text-sm bg-gray-50 outline-none transition-colors"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1">En az 8 kark., 1 büyük, 1 küçük harf ve rakam.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Şifre (Tekrar)</label>
                                <div className="mt-1 relative rounded-xl shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-appleBlue focus:border-appleBlue sm:text-sm bg-gray-50 outline-none transition-colors"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-appleDark hover:bg-appleBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-appleBlue transition-all disabled:opacity-70 mt-4"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                                        Hesap Oluşturuluyor...
                                    </>
                                ) : (
                                    "Kayıt Ol"
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <Link href="/giris" className="text-sm font-medium text-appleBlue hover:text-appleDark transition-colors flex items-center justify-center gap-1">
                            Zaten hesabınız var mı? Giriş Yapın <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
