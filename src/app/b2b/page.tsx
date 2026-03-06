"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, Users, Crown, CheckCircle2, FileText, Hexagon, Shield, Zap, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function B2BLandingPage() {
    const [pricing, setPricing] = useState({ b2bMonthlyPrice: 500, b2bDiscountPercentage: 0 });

    useEffect(() => {
        fetch("/api/admin/settings")
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    setPricing({
                        b2bMonthlyPrice: Number(data.data.b2bMonthlyPrice) || 500,
                        b2bDiscountPercentage: Number(data.data.b2bDiscountPercentage) || 0
                    });
                }
            })
            .catch(err => console.error(err));
    }, []);

    const activePrice = Math.round(pricing.b2bMonthlyPrice * (1 - pricing.b2bDiscountPercentage / 100));
    const proPlusPrice = 750;

    return (
        <div className="min-h-screen bg-[#F5F5F7] flex flex-col font-sans selection:bg-appleBlue selection:text-white">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold text-appleDark">
                        <span className="p-1.5 bg-appleBlue text-white rounded-lg"><Hexagon size={20} className="fill-current" /></span>
                        <span className="hidden sm:inline">Evinin Değeri <span className="text-gray-400 font-normal">| Kurumsal</span></span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="#pricing" className="text-sm font-semibold text-gray-600 hover:text-appleDark transition-colors hidden sm:block">Fiyatlandırma</Link>
                        <Link href="/b2b/login" className="text-sm font-bold text-appleDark hover:text-appleBlue transition-all px-2">Giriş Yap</Link>
                        <Link href="/b2b/register" className="text-sm font-bold text-white bg-appleDark hover:bg-black px-5 py-2.5 rounded-xl transition-all shadow-md">Ücretsiz Kayıt Ol</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-4 sm:px-6 overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] translate-x-1/3 pointer-events-none" />

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 text-appleBlue font-bold text-sm mb-8 border border-blue-200 shadow-sm">
                            <Crown size={16} /> Yeni Nesil Gayrimenkul Teknolojisi
                        </div>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-5xl md:text-7xl font-extrabold text-[#1D1D1F] tracking-tight mb-8 leading-tight">
                        Emlak Ofisiniz İçin <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-appleBlue to-purple-600">Sınırsız Büyüme</span> Gücü.
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Yapay zeka ile saniyeler içinde değerleme yapın, sıcak satıcıları yakalayın ve rekabette açık ara öne geçin.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/b2b/register" className="w-full sm:w-auto px-8 py-4 bg-appleBlue text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 hover:-translate-y-1">
                            Ücretsiz Dene <ArrowRight size={20} />
                        </Link>
                        <Link href="#pricing" className="w-full sm:w-auto px-8 py-4 bg-white text-appleDark font-bold rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center shadow-sm">
                            Paketleri İncele
                        </Link>
                    </motion.div>
                </div>

                {/* Dashboard Frame Preview */}
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="max-w-6xl mx-auto mt-20 relative px-4">
                    <div className="absolute -inset-1 bg-gradient-to-b from-blue-100 to-transparent rounded-[32px] blur-sm opacity-50"></div>
                    <div className="relative rounded-[24px] overflow-hidden border border-gray-200 shadow-2xl bg-white/50 backdrop-blur-xl">
                        <div className="h-10 bg-gray-50/50 backdrop-blur-md border-b border-gray-200/50 flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        {/* We use an abstract gradient placeholder if no image exists yet, so it won't break */}
                        <div className="aspect-[16/9] bg-gradient-to-tr from-gray-50 to-gray-100 flex items-center justify-center text-gray-400 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                            <img src="/b2b-dashboard-preview.png" alt="B2B Panel" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                            <div className="absolute text-center bg-white/50 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white">
                                <BarChart3 size={48} className="mx-auto text-appleBlue mb-2" />
                                <h3 className="font-bold text-appleDark text-xl">Profesyonel Yönetim Paneli</h3>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Scrolling Marquee / Social Proof */}
            <div className="py-10 bg-white border-y border-gray-100 overflow-hidden relative flex">
                <div className="flex gap-12 items-center whitespace-nowrap animate-marquee">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-12 items-center">
                            <div className="text-xl font-bold text-gray-400">🔥 +12.000 Değerleme</div>
                            <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                            <div className="text-xl font-bold text-gray-400">📈 Sınırsız Raporlama</div>
                            <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                            <div className="text-xl font-bold text-gray-400">🤝 500+ Aktif PRO Ofis</div>
                            <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                            <div className="text-xl font-bold text-gray-400">🎯 %100 Doğruluk Payı</div>
                            <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features Modern Grid */}
            <section id="nasil-calisir" className="py-24 bg-white relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#1D1D1F] mb-6 tracking-tight">Sıradan Değerlemenin Ötesi</h2>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">Müşterilerinize güven verin, lead yakalayın ve kendi kurumsal kimliğinizle fark yaratın.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-50/50 rounded-[32px] p-8 md:p-10 border border-gray-100 hover:border-blue-200 transition-all group">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-appleBlue mb-8 group-hover:scale-110 transition-transform">
                                <BarChart3 size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#1D1D1F] mb-4">Sınırsız Aksiyon</h3>
                            <p className="text-gray-500 leading-relaxed">Limitlere takılmadan dilediğiniz kadar evin değerlemesini yapın, geçmişinizi kaydedin ve potansiyeli anında analiz edin.</p>
                        </div>

                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-[32px] p-8 md:p-10 border border-amber-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Users size={120} className="text-amber-500" />
                            </div>
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-amber-500 mb-8 shadow-sm group-hover:scale-110 transition-transform relative z-10">
                                <Zap size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-amber-900 mb-4 relative z-10">Premium Lead Yönlendirme</h3>
                            <p className="text-amber-800/80 leading-relaxed relative z-10">&quot;Evimi Satmak İstiyorum&quot; diyen onaylı ev sahiplerine doğrudan teklif getiren ilk şirket olun. (Exclusive Lead Akışı)</p>
                        </div>

                        <div className="bg-gray-50/50 rounded-[32px] p-8 md:p-10 border border-gray-100 hover:border-purple-200 transition-all group">
                            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-8 group-hover:scale-110 transition-transform">
                                <FileText size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#1D1D1F] mb-4">White-Label Raporlar</h3>
                            <p className="text-gray-500 leading-relaxed">Cihazınıza inen her PDF raporuna ofisinizin logosunu basın. Profesyonel antetli sunumlarla müşteriyi ikna edin.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section Embedded directly */}
            <section id="pricing" className="py-24 bg-[#F5F5F7] relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#1D1D1F] tracking-tight mb-6">Ofisinize Uygun Paketi Seçin</h2>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            Aylık taahhüt yok, gizli ücret yok. Büyüyen ofisler için şeffaf fiyatlandırma.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">

                        {/* STARTER TIER */}
                        <div className="bg-white rounded-[2rem] border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full transform scale-95 md:scale-90 opacity-90">
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-gray-600 mb-2">Başlangıç (Ücretsiz)</h2>
                                <p className="text-gray-400 text-sm">Platformu keşfetmek isteyen bireysel profesyoneller için.</p>
                            </div>
                            <div className="mb-8 flex items-end gap-1">
                                <span className="text-4xl font-bold text-gray-400">₺0</span>
                            </div>
                            <ul className="space-y-4 mb-8 flex-grow">
                                <li className="flex items-start gap-3 text-gray-500 text-sm"><CheckCircle2 className="w-5 h-5 opacity-50" /> 1 Saatte Max 3 Sorgu</li>
                                <li className="flex items-start gap-3 text-gray-500 text-sm"><CheckCircle2 className="w-5 h-5 opacity-50" /> Standart PDF İndirme</li>
                            </ul>
                            <Link href="/b2b/register" className="w-full py-4 rounded-xl border-2 border-gray-200 text-gray-500 font-bold hover:bg-gray-50 hover:text-gray-700 transition-all text-center">Ücretsiz Kayıt Ol</Link>
                        </div>

                        {/* PRO TIER */}
                        <div className="bg-white rounded-[2rem] border-2 border-appleBlue p-8 shadow-xl hover:shadow-2xl transition-all flex flex-col h-full relative transform scale-100 z-10">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-appleBlue text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm">
                                En Çok Tercih Edilen
                            </div>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-appleDark mb-2 flex items-center gap-2">
                                    <Zap className="text-blue-500" size={24} /> PRO B2B
                                </h2>
                                <p className="text-gray-500 text-sm">Ofis içi operasyonları hızlandırmak ve limitsiz sorgu yapmak için.</p>
                            </div>
                            <div className="mb-8 flex items-end gap-2">
                                <span className="text-5xl font-extrabold text-[#1D1D1F]">₺{activePrice}</span>
                                <span className="text-gray-500 font-medium mb-1">/ay</span>
                            </div>
                            <ul className="space-y-4 mb-8 flex-grow">
                                <li className="flex items-start gap-3 text-gray-700 font-medium text-sm"><CheckCircle2 className="text-blue-500 w-5 h-5 shrink-0" /> Sınırsız Ev Değerlemesi</li>
                                <li className="flex items-start gap-3 text-gray-700 font-medium text-sm"><CheckCircle2 className="text-blue-500 w-5 h-5 shrink-0" /> Sınırsız PDF Rapor İndirme</li>
                                <li className="flex items-start gap-3 text-gray-700 font-medium text-sm"><CheckCircle2 className="text-blue-500 w-5 h-5 shrink-0" /> Sınırsız M² Veri Erişimi</li>
                            </ul>
                            <Link href="/b2b/register" className="w-full py-4 bg-appleDark text-white font-bold rounded-xl hover:bg-black transition-all shadow-md text-center">Ücretsiz Dene & Yükselt</Link>
                        </div>

                        {/* PRO PLUS TIER */}
                        <div className="bg-gradient-to-b from-amber-50 to-white rounded-[2rem] border border-amber-200 p-8 shadow-lg hover:shadow-xl transition-all flex flex-col h-full transform scale-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl"></div>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-amber-900 mb-2 flex items-center gap-2">
                                    <Crown className="text-amber-500" size={24} /> PRO PLUS
                                </h2>
                                <p className="text-amber-800/70 text-sm">Bölgesini domine etmek ve özel marka yaratmak isteyen prestij ofisleri için.</p>
                            </div>
                            <div className="mb-8 flex items-end gap-2 relative z-10">
                                <span className="text-5xl font-extrabold text-amber-900">₺{proPlusPrice}</span>
                                <span className="text-amber-800/60 font-medium mb-1">/ay</span>
                            </div>
                            <ul className="space-y-4 mb-8 flex-grow relative z-10">
                                <li className="flex items-start gap-3 text-gray-800 font-medium text-sm">
                                    <UserPlus className="text-amber-500 w-5 h-5 shrink-0" />
                                    <span><strong className="text-amber-700">Premium Lead:</strong> Satılık Ev Taleplerine Öncelikli Yönlendirme</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-800 font-medium text-sm">
                                    <FileText className="text-amber-500 w-5 h-5 shrink-0" />
                                    <span><strong className="text-amber-700">White-Label:</strong> Kendi Markanız/Logonuzla Çıktı Alma</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-800 font-medium text-sm">
                                    <Shield className="text-amber-500 w-5 h-5 shrink-0" />
                                    PRO Paketindeki her şey dahil
                                </li>
                            </ul>
                            <Link href="/b2b/register" className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-600 text-white font-bold rounded-xl hover:from-amber-500 hover:to-amber-700 transition-all shadow-lg text-center relative z-10 border border-amber-500/50">
                                Hemen Satın Al
                            </Link>
                        </div>

                    </div>
                    <div className="text-center mt-12">
                        <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
                            <Shield size={16} /> PayTR Güvencesiyle %100 Güvenli Ödeme
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-appleDark relative overflow-hidden mt-auto">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-appleBlue/40 rounded-full blur-[120px] pointer-events-none" />
                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Geleceğin Teknolojisine Bir Adım At.</h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Hesabınızı saniyeler içinde ücretsiz oluşturun ve hemen denemeye başlayın.
                    </p>
                    <Link href="/b2b/register" className="inline-flex px-10 py-5 bg-white text-appleDark font-bold rounded-xl shadow-2xl transition-all transform hover:scale-105 items-center justify-center text-lg hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                        Hemen Ücretsiz Başla
                    </Link>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                }
            `}} />
        </div>
    );
}

