import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Home, TrendingUp, Wallet, Star } from "lucide-react";
import Link from "next/link";
import UpgradeButton from "./UpgradeButton";

export default async function PortfoyDashboard() {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "user") {
        redirect("/giris?callbackUrl=/portfoy");
    }

    // Kullanıcının kayıtlı kendi evlerini çek
    const myProperties = await prisma.valuationRequest.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" }
    });

    const totalValue = myProperties.reduce((acc, curr) => acc + curr.estimatedValue, 0);

    return (
        <div className="min-h-screen flex flex-col pt-24 bg-gray-50">
            <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-appleDark tracking-tight">Portföyüm</h1>
                        <p className="text-gray-500 mt-1">Yatırımlarınızın güncel durumunu buradan takip edebilirsiniz.</p>
                    </div>
                    <Link href="/" className="px-6 py-3 bg-appleDark text-white rounded-xl font-bold hover:bg-appleBlue transition-colors shadow-sm inline-flex items-center gap-2">
                        <Home size={18} /> Yeni Ev Ekle
                    </Link>
                </div>

                {/* Top Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Toplam Portföy Değeri</p>
                            <p className="text-3xl font-extrabold text-appleDark">
                                {new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(totalValue)}
                            </p>
                        </div>
                        <div className="w-14 h-14 rounded-full bg-blue-50 flex flex-col items-center justify-center text-appleBlue">
                            <Wallet size={24} />
                        </div>
                    </div>

                    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Takip Edilen Mülk</p>
                            <p className="text-3xl font-extrabold text-appleDark">{myProperties.length} <span className="text-base font-medium text-gray-400">Adet</span></p>
                        </div>
                        <div className="w-14 h-14 rounded-full bg-emerald-50 flex flex-col items-center justify-center text-emerald-600">
                            <Home size={24} />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[24px] p-6 shadow-sm border border-indigo-200 flex items-center justify-between text-white relative overflow-hidden group hover:shadow-lg transition">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-[40px]" />
                        <div className="relative z-10 w-full">
                            <div className="flex justify-between items-start w-full">
                                <div>
                                    <p className="text-sm font-medium text-indigo-100 mb-1 flex justify-start"><Star className="mr-1 mt-[2px] w-4 h-4 text-yellow-300 fill-yellow-300" /> Premium Raporlar</p>
                                    <p className="text-lg font-bold leading-tight mt-2">{session.user.isPremium ? 'Aktif' : 'Özel PDF Pazar Raporları ve Yatırım Fırsatları'}</p>
                                </div>
                            </div>
                            {!session.user.isPremium && (
                                <UpgradeButton />
                            )}
                        </div>
                    </div>
                </div>

                {/* Properties List */}
                <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="text-lg font-bold text-appleDark flex items-center gap-2">
                            <TrendingUp className="text-appleBlue" size={20} /> Kayıtlı Evlerim
                        </h2>
                    </div>

                    {myProperties.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <Home size={28} className="text-gray-300" />
                            </div>
                            <h3 className="text-xl font-bold text-appleDark mb-2">Henüz portföyünüzde ev yok.</h3>
                            <p className="mb-6 max-w-md mx-auto">Ana sayfadaki değerleme aracını kullanarak evlerinizi ücretsiz olarak analiz edip buraya kaydedebilirsiniz.</p>
                            <Link href="/" className="px-6 py-3 bg-appleDark text-white rounded-xl font-bold hover:bg-appleBlue transition-colors select-none">
                                Evimin Değerini Öğren
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {myProperties.map((prop) => (
                                <div key={prop.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row justify-between md:items-center gap-4 group">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-appleBlue shrink-0">
                                            <Home size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-appleDark text-lg">{prop.district}, {prop.neighborhood}</h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {prop.rooms} • {prop.grossSqm} m² • {prop.buildingAge} Yıllık Bina
                                            </p>
                                            <p className="text-xs text-gray-400 mt-2">Eklenme: {new Date(prop.createdAt).toLocaleDateString('tr-TR')} • Talep ID: {prop.requestNumber}</p>
                                        </div>
                                    </div>

                                    <div className="text-left md:text-right flex flex-col md:items-end justify-center">
                                        <p className="text-2xl font-extrabold text-appleDark">
                                            {new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(prop.estimatedValue)}
                                        </p>
                                        <Link href={`/result/${prop.id}`} className="mt-2 text-sm font-bold text-appleBlue hover:text-indigo-600 transition-colors inline-block md:hidden group-hover:md:inline-block">Raporu Görüntüle &rarr;</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </main>        </div>
    );
}
