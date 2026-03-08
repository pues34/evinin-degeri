import { LineChart, ShieldCheck, MapPin, Crown, FileText, ArrowRight, Zap, Check } from "lucide-react";
import prisma from "@/lib/prisma";
import HowItWorksSection from "@/components/HowItWorksSection";
import HeroSection from "@/components/HeroSection";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const settings = await prisma.systemSettings.findFirst();
  const counterValue = settings?.valuationCounter || 4231;

  return (
    <div className="min-h-screen flex flex-col bg-appleGray overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-100 rounded-full blur-[120px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100 rounded-full blur-[100px] opacity-40 pointer-events-none" />

      {/* Hero Section */}
      <HeroSection counterValue={counterValue} />

      {/* Features Section */}
      <div className="bg-white py-24 border-t border-gray-100 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-appleDark">Neden Biz?</h2>
            <p className="text-gray-500 mt-4">Piyasadaki en güvenilir araçlarla evinize değer biçiyoruz.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-appleBlue/20 transition-all group">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-appleBlue mb-6 group-hover:scale-110 transition-transform">
                <LineChart size={28} />
              </div>
              <h3 className="text-xl font-medium text-appleDark mb-3">Veri Odaklı Analiz</h3>
              <p className="text-gray-500 leading-relaxed">Bölgedeki son satışlar ve piyasa dinamikleri anlık olarak taranır, hata payı en aza indirilir.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-purple-200 transition-all group">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-medium text-appleDark mb-3">Tarafsız &amp; Güvenilir</h3>
              <p className="text-gray-500 leading-relaxed">Hiçbir kuruma veya emlakçıya bağlı olmadan tamamen şeffaf algoritmik bir değer sunarız.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-appleBlue/20 transition-all group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-appleBlue mb-6 group-hover:scale-110 transition-transform">
                <MapPin size={28} />
              </div>
              <h3 className="text-xl font-medium text-appleDark mb-3">Bölgesel Zeka</h3>
              <p className="text-gray-500 leading-relaxed">Şehir, İlçe ve Mahalle bazındaki şerefiyeler ve gelişmiş lokasyon çarpanlarıyla hassas hesaplama yapar.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Örnek Rapor CTA */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 py-10 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-white">
            <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
              <FileText size={28} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Yapay Zeka Raporumuzu İnceleyin</h3>
              <p className="text-blue-200 text-sm">Gerçek bir değerleme raporunun nasıl göründüğünü görün.</p>
            </div>
          </div>
          <a href="/ornek-rapor" className="shrink-0 px-8 py-3.5 bg-white text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-all shadow-lg flex items-center gap-2">
            Örnek Raporu Gör <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* How it Works - Animated Component */}
      <HowItWorksSection />

      {/* Premium CTA Section */}
      <div className="bg-appleDark py-24 relative z-10 overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-appleBlue rounded-full blur-[150px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-purple-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-bold text-blue-300 mb-6 backdrop-blur-md">
            <Crown size={16} /> Premium Üyelik
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Tüm Özelliklerin Kilidini Açın
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-10 font-light max-w-2xl mx-auto">
            Sınırsız sorgulama, PDF rapor, Fırsat Radarı, Yatırım Haritası ve daha fazlası. Tek plan, tek fiyat.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10 text-left">
            {[
              "Sınırsız değerleme sorgulama",
              "PDF rapor indirme",
              "Sınırsız ilan yayınlama",
              "Fırsat Radarı erişimi",
              "Yatırım Haritası erişimi",
              "Kira & amortisman analizleri"
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-200">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center border border-green-500/30">
                  <Check size={16} />
                </div>
                <span className="font-medium">{f}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/fiyatlandirma" className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-appleBlue to-blue-600 text-white rounded-xl shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all font-semibold text-lg">
              <Zap size={20} className="mr-2" /> Premium&apos;a Geç &rarr;
            </a>
          </div>

          <p className="text-gray-500 text-sm mt-6">
            <span className="line-through">999₺/ay</span>
            <span className="text-white font-bold text-xl ml-2">399₺/ay</span>
            <span className="text-blue-300 ml-2">lansman fiyatıyla</span>
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-24 border-t border-gray-100 relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-appleDark mb-4 tracking-tight">Merak Edilenler</h2>
            <div className="h-1 w-20 bg-appleBlue rounded-full mx-auto"></div>
          </div>
          <div className="space-y-4">
            <details className="group bg-white border border-gray-100 rounded-2xl shadow-sm open:shadow-md transition-all cursor-pointer">
              <summary className="flex justify-between items-center font-medium hover:text-appleBlue text-appleDark p-6">
                Evin Değeri sistemi nasıl çalışır?
                <span className="transition-transform duration-300 group-open:rotate-180 text-appleBlue">
                  <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-gray-500 mt-0 px-6 pb-6 leading-relaxed">Sistemimiz, belirttiğiniz lokasyon, bina yaşı, metrekare ve kat gibi fiziksel özellikleri alır. Ardından İstanbul&apos;un güncel piyasa verilerini, şerefiye çarpanlarını ve bölgesel endeksleri analiz ederek yapay zeka destekli en olası satış değerini size saniyeler içinde sunar.</p>
            </details>
            <details className="group bg-white border border-gray-100 rounded-2xl shadow-sm open:shadow-md transition-all cursor-pointer">
              <summary className="flex justify-between items-center font-medium hover:text-appleBlue text-appleDark p-6">
                Bilgilerim güvende mi?
                <span className="transition-transform duration-300 group-open:rotate-180 text-appleBlue">
                  <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-gray-500 mt-0 px-6 pb-6 leading-relaxed">Kesinlikle. 256-bit SSL sertifikası ile korunan altyapımızda hiçbir veriniz üçüncü şahıslarla paylaşılmaz. Tamamen KVKK uyumlu olarak sadece size özel raporlama amacıyla işlenir.</p>
            </details>
            <details className="group bg-white border border-gray-100 rounded-2xl shadow-sm open:shadow-md transition-all cursor-pointer">
              <summary className="flex justify-between items-center font-medium hover:text-appleBlue text-appleDark p-6">
                Ücretsiz üyelikle ne yapabilirim?
                <span className="transition-transform duration-300 group-open:rotate-180 text-appleBlue">
                  <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-gray-500 mt-0 px-6 pb-6 leading-relaxed">Ücretsiz üyelikle günde 1 sorgulama yapabilir, sonucu ekranda görebilir, ayda 1 ilan verebilir, kira getirisi ve amortisman hesaplama araçlarını kullanabilirsiniz. Premium&apos;a geçerek sınırsız sorgulama, PDF rapor indirme, Fırsat Radarı ve Yatırım Haritası gibi premium özelliklere erişebilirsiniz.</p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
