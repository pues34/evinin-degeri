import Link from "next/link";
import { ArrowRight, BarChart3, Users, Crown, CheckCircle2, FileText, Hexagon, Shield } from "lucide-react";

export const metadata = {
    title: "B2B Emlakçı Çözümleri | Evinin Değeri",
    description: "Emlak profesyonelleri için yapay zeka destekli değerleme, sınırsız raporlama ve sıcak müşteri (Lead) havuzu.",
};

export default function B2BLandingPage() {
    return (
        <div className="min-h-screen bg-appleGray flex flex-col font-sans selection:bg-appleBlue selection:text-white">
            {/* Navbar Minimal */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold text-appleDark">
                        <span className="p-1.5 bg-appleBlue text-white rounded-lg"><Hexagon size={20} className="fill-current" /></span>
                        <span className="hidden sm:inline">Evinin Değeri <span className="text-gray-400 font-normal">| Kurumsal</span></span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/b2b/pricing" className="text-sm font-semibold text-gray-600 hover:text-appleDark transition-colors">Fiyatlandırma</Link>
                        <Link href="/b2b/login" className="text-sm font-bold text-appleBlue bg-blue-50 hover:bg-blue-100 px-5 py-2.5 rounded-xl transition-all">Giriş Yap</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-4 sm:px-6 overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 text-appleBlue font-bold text-sm mb-8 border border-blue-200">
                        <Crown size={16} /> Yeni: PRO PLUS Paketi Yayında
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-appleDark tracking-tight mb-8 leading-tight">
                        Emlak Ofisiniz İçin <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-appleBlue to-purple-600">Sınırsız Büyüme</span> Gücü.
                    </h1>

                    <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Yapay zeka destekli sınırsız değerleme raporları oluşturun, &quot;Evimi Satmak İstiyorum&quot; diyen gerçek ev sahiplerine (Lead Market) anında ulaşarak portföyünüzü katlayın.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/b2b/register" className="w-full sm:w-auto px-8 py-4 bg-appleDark text-white font-bold rounded-xl hover:bg-black transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 hover:-translate-y-1">
                            Hemen Kayıt Ol <ArrowRight size={20} />
                        </Link>
                        <Link href="#nasil-calisir" className="w-full sm:w-auto px-8 py-4 bg-white text-appleDark font-bold rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center">
                            Sistemi İncele
                        </Link>
                    </div>
                </div>

                {/* Dashboard Frame Preview */}
                <div className="max-w-6xl mx-auto mt-20 relative px-4">
                    <div className="absolute -inset-1 bg-gradient-to-b from-blue-100 to-transparent rounded-[32px] blur-sm opacity-50"></div>
                    <div className="relative rounded-[24px] overflow-hidden border border-gray-200 shadow-2xl bg-white">
                        <div className="h-10 bg-gray-50 border-b border-gray-200 flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <img src="/b2b-dashboard-preview.png" alt="B2B Panel Görünümü" className="w-full object-cover" />
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="nasil-calisir" className="py-24 bg-white relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-appleDark mb-4">Neden Kurumsal Üye Olmalısınız?</h2>
                        <p className="text-gray-500 text-lg">Sıradan bir değerleme aracından çok daha fazlası; tam donanımlı bir Lead Generation merkezi.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-appleBlue/30 transition-all group">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-appleBlue mb-6 group-hover:-translate-y-2 transition-transform">
                                <BarChart3 size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-appleDark mb-3">Sınırsız Değerleme</h3>
                            <p className="text-gray-500 leading-relaxed">Bireysel kullanıcı kotalarına takılmadan, yüzlerce müşteri portföyünüz için dilediğiniz kadar değerleme sorgusu üretin.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-gradient-to-b from-amber-50 to-white rounded-3xl p-8 border border-amber-100 hover:border-amber-300 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl font-bold"></div>
                            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:-translate-y-2 transition-transform shadow-inner">
                                <Users size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-appleDark mb-3">Müşteri Pazarı (Lead Market)</h3>
                            <p className="text-amber-800/70 leading-relaxed">Sistemde rapor alan ve &quot;Evimi bu fiyata Satmak/Kiralamak istiyorum&quot; diyen ev sahiplerinin direkt telefon numaralarına erişin. <strong className="text-amber-600">Sadece PRO PLUS</strong></p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-purple-300 transition-all group">
                            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:-translate-y-2 transition-transform">
                                <FileText size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-appleDark mb-3">Kendi Markanızla (White-Label)</h3>
                            <p className="text-gray-500 leading-relaxed">PDF raporlarından &quot;Evinin Değeri&quot; ibaresini kaldırın! Kendi ofis logonuzu ekleyerek müşterilerinize profesyonel antetli sunumlar yapın.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-appleDark relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-appleBlue/40 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-600/40 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                    <Shield size={64} className="text-white mx-auto mb-8 opacity-90" />
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Portföyünüzü Şansa Bırakmayın.</h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Bölgesinin en prestijli emlak danışmanları arasına katılın. Yapay zekanın veri gücünü arkanıza alın ve yeni portföylere herkesten önce ulaşın.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/b2b/pricing" className="px-10 py-5 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white font-bold rounded-xl shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-lg">
                            <Crown size={24} className="fill-white" /> Abonelik Paketlerini Gör
                        </Link>
                    </div>
                    <p className="text-gray-400 text-sm mt-6 flex items-center justify-center gap-2">
                        <CheckCircle2 size={16} className="text-green-400" /> Kredi Kartı ile 3D Güvenli Ödeme
                    </p>
                </div>
            </section>

            {/* Simple Footer */}
            <footer className="bg-black py-12 border-t border-gray-800 text-center">
                <p className="text-gray-500">&copy; {new Date().getFullYear()} Evinin Değeri B2B Kurumsal. Tüm hakları saklıdır.</p>
            </footer>
        </div>
    );
}
