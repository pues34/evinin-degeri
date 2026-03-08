import { LineChart, ShieldCheck, MapPin, Crown, TrendingUp, FileText, Target, Building2, CreditCard, ArrowRight } from "lucide-react";
import Image from "next/image";
import TestimonialSlider from "@/components/TestimonialSlider";
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
              <h3 className="text-xl font-medium text-appleDark mb-3">Tarafsız & Güvenilir</h3>
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

      {/* B1: Örnek Rapor CTA */}
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

      {/* B4: Premium Araçlar Tanıtımı */}
      <div className="bg-white py-20 border-t border-gray-100 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-appleDark mb-3">Premium Araçlar</h2>
            <p className="text-gray-500">Yapay zeka ile donatılmış üst düzey yatırım araçları.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a href="/radari" className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-3xl border border-orange-100 hover:shadow-xl hover:-translate-y-1 transition-all group block">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                <Target size={28} />
              </div>
              <h3 className="text-xl font-bold text-appleDark mb-2">Fırsat Radarı</h3>
              <p className="text-gray-500 leading-relaxed text-sm">Piyasa değerinin %10+ altında satılan kelepir gayrimenkulleri yapay zeka ile anında yakalayın.</p>
            </a>
            <a href="/yatirim-haritasi" className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-3xl border border-blue-100 hover:shadow-xl hover:-translate-y-1 transition-all group block">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                <MapPin size={28} />
              </div>
              <h3 className="text-xl font-bold text-appleDark mb-2">Isı Haritası</h3>
              <p className="text-gray-500 leading-relaxed text-sm">İstanbul&apos;un bölgesel fiyat yoğunluğunu interaktif harita üzerinde canlı olarak izleyin.</p>
            </a>
            <a href="/ilanlar" className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-3xl border border-indigo-100 hover:shadow-xl hover:-translate-y-1 transition-all group block">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                <Building2 size={28} />
              </div>
              <h3 className="text-xl font-bold text-appleDark mb-2">Ayrıcalıklı İlanlar</h3>
              <p className="text-gray-500 leading-relaxed text-sm">Sistem tarafından onaylı, yapay zeka ile değerlenmiş özel gayrimenkul portföyleri.</p>
            </a>
          </div>
        </div>
      </div>

      {/* How it Works - Animated Component */}
      <HowItWorksSection />

      {/* B2B Promo Section / Kurumsal Çözümler */}
      <div className="bg-appleDark py-24 relative z-10 overflow-hidden text-white">
        {/* Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-appleBlue rounded-full blur-[150px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-purple-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-bold text-blue-300 mb-6 backdrop-blur-md">
                <Crown size={16} /> B2B Kurumsal Çözümler
              </div>
              <h2 className="text-3xl md:text-5xl font-semibold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Emlak Danışmanları İçin Sınırsız Güç
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light">
                Günlük değerleme limitlerine takılmadan yüzlerce portföyünüzü saniyeler içinde analiz edin. AI destekli detaylı raporları kendi müşterilerinize sunarak güven inşa edin.
              </p>

              <ul className="space-y-4 mb-10">
                <li className="flex items-center text-gray-200">
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center mr-4 border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.2)]"><ShieldCheck size={20} /></div>
                  <span className="font-medium text-lg">Sınırsız aylık değerleme hakkı</span>
                </li>
                <li className="flex items-center text-gray-200">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mr-4 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]"><TrendingUp size={20} /></div>
                  <span className="font-medium text-lg">Gelişmiş kira ve amortisman analizleri</span>
                </li>
                <li className="flex items-center text-gray-200">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mr-4 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]"><LineChart size={20} /></div>
                  <span className="font-medium text-lg">B2B panelinden geçmiş sorgu takibi</span>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/b2b" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-appleBlue to-blue-600 text-white rounded-xl shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all font-semibold text-lg">
                  Kurumsal Panel&apos;e Giriş Yap &rarr;
                </a>
                <a href="/b2b/register" className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl hover:bg-white/20 transition-all font-semibold text-lg">
                  Ücretsiz Demo İste &rarr;
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-appleBlue/30 to-purple-500/30 transform rotate-6 rounded-3xl blur-xl" />
              <div className="bg-gray-900 p-2 rounded-2xl shadow-2xl relative z-10 border border-white/10 backdrop-blur-xl">
                <Image src="/b2b-dashboard-preview.png" alt="B2B Emlakçı Paneli" width={800} height={450} priority={true} className="w-full h-auto rounded-xl object-contain ring-1 ring-white/10 shadow-inner" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ & Trust Section */}
      <div className="bg-gray-50 py-24 border-t border-gray-100 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* FAQ */}
            <div>
              <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-semibold text-appleDark mb-4 tracking-tight">Merak Edilenler</h2>
                <div className="h-1 w-20 bg-appleBlue rounded-full"></div>
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
                    Bu hizmet tamamen ücretsiz mi?
                    <span className="transition-transform duration-300 group-open:rotate-180 text-appleBlue">
                      <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="text-gray-500 mt-0 px-6 pb-6 leading-relaxed">Evet, bireysel kullanıcılarımız için anlık fiyat hesaplama ve detaylı gayrimenkul analiz raporu hizmetimiz tamamen ücretsizdir.</p>
                </details>
              </div>
            </div>

            {/* Testimonials */}
            <div className="flex items-center justify-center">
              <div className="w-full">
                <TestimonialSlider />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* B2: Mini Fiyatlandırma Önizleme */}
      <div className="bg-white py-20 border-t border-gray-100 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-appleDark mb-3">Paketler</h2>
            <p className="text-gray-500">İhtiyacınıza göre seçin, hemen başlayın.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center">
              <h3 className="text-lg font-bold text-appleDark mb-2">Standart</h3>
              <div className="text-4xl font-extrabold text-appleDark mb-1">Ücretsiz</div>
              <p className="text-gray-500 text-sm mb-6">Anlık değerleme + detaylı rapor</p>
              <a href="/" className="block w-full py-3 bg-gray-200 text-appleDark rounded-xl font-medium text-sm">Hemen Başla</a>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border-2 border-appleBlue text-center relative shadow-lg">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-appleBlue text-white text-xs font-bold rounded-full">Popüler</div>
              <h3 className="text-lg font-bold text-appleDark mb-2">Premium Yatırımcı</h3>
              <div className="text-4xl font-extrabold text-appleBlue mb-1">299₺<span className="text-lg text-gray-400 font-normal">/ay</span></div>
              <p className="text-gray-500 text-sm mb-6">Radar + Harita + AI Danışman</p>
              <a href="/fiyatlandirma" className="block w-full py-3 bg-appleBlue text-white rounded-xl font-medium text-sm hover:bg-blue-600 transition-colors">Detayları Gör</a>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-3xl border border-emerald-200 text-center">
              <h3 className="text-lg font-bold text-appleDark mb-2">Kurumsal (B2B)</h3>
              <div className="text-4xl font-extrabold text-emerald-600 mb-1">İletişim</div>
              <p className="text-gray-500 text-sm mb-6">Sınırsız değerleme + lead + PDF</p>
              <a href="/b2b" className="block w-full py-3 bg-emerald-500 text-white rounded-xl font-medium text-sm hover:bg-emerald-600 transition-colors">Teklif Al</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


