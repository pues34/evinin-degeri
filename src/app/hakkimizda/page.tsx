import { Hexagon, TrendingUp, Shield, Sparkles, MoveRight, BrainCircuit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Hakkımızda | Evinin Değeri",
    description: "Türkiye'nin en gelişmiş yapay zeka destekli gayrimenkul değerleme platformu Evinin Değeri'nin kuruluş hikayesi ve vizyonu.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-appleGray flex flex-col font-sans selection:bg-appleBlue selection:text-white pb-0">

            {/* Navbar Minimal */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold text-appleDark tracking-tight">
                        <span className="p-1.5 bg-appleBlue text-white rounded-lg"><Hexagon size={20} className="fill-current" /></span>
                        <span className="hidden sm:inline">Evinin Değeri</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-sm font-semibold text-gray-600 hover:text-appleDark transition-colors">Ana Sayfa</Link>
                    </div>
                </div>
            </nav>

            <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background Orbs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-100/50 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

                <div className="max-w-4xl mx-auto relative z-10 text-center mb-24">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/40 border border-white/60 rounded-full text-sm font-medium text-appleDark mb-6 backdrop-blur-md shadow-sm">
                        <Sparkles size={16} className="text-appleBlue" /> Evinin Değeri Nasıl Doğdu?
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-appleDark tracking-tight mb-8 leading-tight">
                        Gayrimenkul Sektörüne <br className="hidden md:block" /> <span className="text-appleBlue">Şeffaflık</span> Getiriyoruz.
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Amacımız; ev alıp satarken yaşanan fiyat belirsizliklerini, gelişmiş yapay zeka algoritmalarımızla ortadan kaldırmak.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-blue-500/10 rounded-[2rem] transform rotate-3 scale-105 group-hover:rotate-6 transition-transform duration-500"></div>
                        <div className="relative h-[500px] w-full rounded-[2rem] shadow-2xl overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Evinin Değeri Ofisi" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-appleDark mb-6">Kuruluş Hikayemiz</h2>
                        <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                            <p>
                                &quot;Evinin Değeri&quot;, gayrimenkul piyasasındaki bilgi asimetrisini bitirmek amacıyla teknoloji ve emlak uzmanlarının bir araya gelmesiyle kuruldu.
                                Geleneksel değerleme süreçlerinin yavaşlığı ve emlakçıların spekülatif fiyatlama eğilimleri, insanları yanlış finansal kararlara sürüklüyordu.
                            </p>
                            <p>
                                Bunu değiştirmemiz gerektiğine inandık. Gücünü makine öğreniminden (AI) alan, milyonlarca piyasa verisini TCMB (Türkiye Cumhuriyet Merkez Bankası) enflasyon ve endeks verileriyle saniyeler içinde harmanlayan bir çekirdek algoritma yazarak yola çıktık.
                            </p>
                            <p className="font-semibold text-appleDark border-l-4 border-appleBlue pl-4">
                                &quot;Bugün, on binlerce ev sahibi veya ev almak isteyen kullanıcı, saniyeler içerisinde tarafsız ve bilimsel verilere dayanan fiyat analizine ulaşıyor.&quot;
                            </p>
                        </div>
                    </div>
                </div>

                {/* Values */}
                <div className="max-w-6xl mx-auto mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-appleDark">Bizi Farklı Kılan Değerler</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                            <div className="w-14 h-14 bg-blue-50 text-appleBlue rounded-2xl flex items-center justify-center mb-6">
                                <TrendingUp size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-appleDark mb-3">Sıfır Manipülasyon</h3>
                            <p className="text-gray-500 leading-relaxed">Algoritmamız, kişisel çıkarlara göre değil, sadece matematiksel piyasa gerçeklerine göre hareket eder.</p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                                <Shield size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-appleDark mb-3">Gizlilik Odaklı</h3>
                            <p className="text-gray-500 leading-relaxed">Değerlemesi yapılan mülklerin kimliği ve ev sahiplerinin kişisel verileri asla yetkisiz 3. şahıslarla paylaşılmaz.</p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                                <BrainCircuit size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-appleDark mb-3">Sürekli Öğrenen AI</h3>
                            <p className="text-gray-500 leading-relaxed">Mimari özelliklerden lokasyon şerefiyesine kadar onlarca parametre yapay zeka tarafından günlük güncellenir.</p>
                        </div>
                    </div>
                </div>

                {/* Medya Referanslari */}
                <div className="max-w-6xl mx-auto border-t border-gray-200 pt-16 mb-20 text-center">
                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">Guvenilir Teknoloji Altyapisi</p>
                    <div className="flex flex-wrap justify-center gap-10 md:gap-16 opacity-50">
                        {["OpenAI", "Vercel", "PostgreSQL", "Next.js", "Prisma"].map(tech => (
                            <span key={tech} className="text-lg font-bold text-gray-400 tracking-wider">{tech}</span>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
}
