import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Building2, Crown, Activity, ExternalLink, History } from "lucide-react";
import Link from "next/link";
import FastSupportForm from "@/components/FastSupportForm";

import prisma from "@/lib/prisma";

export default async function B2BDashboard() {
    const session = await getServerSession(authOptions) as any;

    if (!session || session.user.role !== "realtor") {
        redirect("/b2b/login");
    }

    const { id, isPro, name, subscriptionEnd } = session.user;

    // Check if subscription has expired
    let expired = false;
    if (isPro && subscriptionEnd) {
        if (new Date(subscriptionEnd) < new Date()) {
            expired = true;
        }
    }

    const isActivePro = isPro && !expired;

    // Fetch History
    const recentValuations = await prisma.valuationRequest.findMany({
        where: { realtorId: id },
        orderBy: { createdAt: 'desc' },
        take: 10
    });

    return (
        <div className="min-h-screen bg-appleGray pt-24 pb-12 px-4">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header Profile Card */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-blue-50 text-appleBlue rounded-2xl flex items-center justify-center">
                            <Building2 size={40} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-appleDark">{name}</h1>
                            <p className="text-gray-500 mt-1">Kurumsal B2B Paneli</p>
                        </div>
                    </div>
                    {isActivePro ? (
                        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-xl border border-green-100 font-semibold tracking-wide shadow-sm">
                            <Crown size={20} />
                            PRO ABONELİK AKTİF
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-500 rounded-xl font-semibold tracking-wide">
                                ÜCRETSİZ HESAP
                            </div>
                            <Link href="/b2b/pricing" className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-xl font-bold hover:shadow-lg transition-all shadow-md mt-1">
                                Limitsiz Ol (PRO)
                            </Link>
                        </div>
                    )}
                </div>

                {/* Dashboard Stats / Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Valuation Privilege Card */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                                <Activity size={24} />
                            </div>
                            <h2 className="text-xl font-bold text-appleDark mb-2">Limitsiz Değerleme Motoru</h2>
                            <p className="text-gray-500 mb-6">
                                PRO aboneler, günde binlerce ev sorgulamasını hiçbir IP limitine (Anti-Spam kalkanına) takılmadan, saniyeler içerisinde gerçekleştirebilir.
                            </p>
                        </div>
                        {isActivePro ? (
                            <Link href="/" className="w-full text-center py-4 bg-appleDark text-white rounded-xl font-medium hover:bg-black transition-colors block flex items-center justify-center gap-2">
                                Yeni Değerleme Başlat <ExternalLink size={18} />
                            </Link>
                        ) : (
                            <Link href="/b2b/pricing" className="w-full text-center py-4 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-colors block">
                                PRO Paket ile Kilidi Aç
                            </Link>
                        )}
                    </div>

                    {/* Report Status */}
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 border border-blue-500 shadow-xl text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold mb-2">Kurumsal Raporlama</h2>
                            <p className="text-blue-100 mb-6 opacity-90">
                                Çok yakında değerleme raporlarına kendi ofis logonuzu ekleyebileceksiniz (White-label PDF).
                            </p>
                        </div>
                        <div className="relative z-10 py-4 px-6 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 text-center font-medium">
                            Yakında Erişime Açılacak (V12)
                        </div>

                        {/* Decorative circle */}
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-5 blur-3xl"></div>
                    </div>
                </div>

                {/* Fast Support Form */}
                <FastSupportForm user={{ name, email: session.user.email || "" }} />

                {/* History Table */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-bold text-appleDark mb-6 flex items-center gap-2">
                        <History className="text-appleBlue" size={24} /> Geçmiş Değerlemelerim
                    </h2>

                    {recentValuations.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
                            Henüz değerleme yapmamışsınız. Anasayfaya giderek ilk işlemi başlatın.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="py-4 font-semibold text-gray-500 text-sm">Tarih</th>
                                        <th className="py-4 font-semibold text-gray-500 text-sm">İl / İlçe / Mahalle</th>
                                        <th className="py-4 font-semibold text-gray-500 text-sm">M² / Oda</th>
                                        <th className="py-4 font-semibold text-gray-500 text-sm">Tahmini Değer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentValuations.map((val: any) => (
                                        <tr key={val.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                            <td className="py-4 text-sm text-gray-600 whitespace-nowrap">
                                                {new Date(val.createdAt).toLocaleDateString("tr-TR")}
                                            </td>
                                            <td className="py-4 text-sm font-medium text-appleDark">
                                                {val.city}, {val.district} <span className="text-gray-400 font-normal"> / {val.neighborhood}</span>
                                            </td>
                                            <td className="py-4 text-sm text-gray-600">
                                                {val.netSqm}m² · {val.rooms}
                                            </td>
                                            <td className="py-4 text-sm font-bold text-green-600">
                                                {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(val.estimatedValue)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
