import ValuationForm from "@/components/ValuationForm";
import Footer from "@/components/Footer";
import { Sparkles, LineChart, ShieldCheck, MapPin, Crown, TrendingUp } from "lucide-react";
import TestimonialSlider from "@/components/TestimonialSlider";
import prisma from "@/lib/prisma";
import HowItWorksSection from "@/components/HowItWorksSection";

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
      <div className="relative z-10 flex-1 flex flex-col items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/40 border border-white/60 rounded-full text-sm font-medium text-appleBlue mb-6 backdrop-blur-md shadow-sm">
            <Sparkles size={16} /> Yapay Zeka Destekli Değerleme
          </div>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-appleDark mb-6 leading-tight">
            Evinizin <span className="text-appleBlue">Gerçek Değeri</span><br />Saniyeler İçinde
          </h1>
          <p className="text-lg md:text-xl text-appleLightGray max-w-2xl mx-auto leading-relaxed mb-6">
            Türkiye&apos;nin dört bir yanındaki gayrimenkullerin güncel piyasa değerini, gelişmiş yapay zeka ve bölge çarpanları algoritmamızla anında hesaplayın.
          </p>

          <div className="flex flex-col gap-3 items-center">
            <div className="inline-block p-4 bg-blue-50/80 backdrop-blur-sm border border-blue-100 rounded-2xl text-appleBlue font-medium shadow-sm">
              <MapPin size={18} className="inline mr-2 -mt-1" />
              Şu an için veritabanımız <span className="font-bold">sadece İstanbul</span> iline özel olarak optimize edilmiştir.
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-white border border-gray-200 text-gray-500 rounded-full text-xs font-semibold shadow-sm">🎯 Ankara (Yakında)</span>
              <span className="px-3 py-1 bg-white border border-gray-200 text-gray-500 rounded-full text-xs font-semibold shadow-sm">🎯 İzmir (Yakında)</span>
              <span className="px-3 py-1 bg-white border border-gray-200 text-gray-500 rounded-full text-xs font-semibold shadow-sm">🎯 Bursa (Yakında)</span>
            </div>
          </div>
        </div>

        <div className="max-w-3xl w-full mx-auto mb-10 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 transform rotate-1 rounded-3xl blur-md" />
          <ValuationForm />
        </div>

        <div className="mb-14 flex flex-col items-center relative z-20">
          <div className="flex items-center gap-3 px-6 py-3 bg-white shadow-xl shadow-green-500/5 border border-green-100 rounded-full transform hover:scale-105 transition-transform">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <span className="text-gray-600 font-medium text-sm sm:text-base">Bu ay tam <strong className="text-appleDark text-lg">{counterValue.toLocaleString('tr-TR')}</strong> adet evin değeri hesaplandı.</span>
          </div>
        </div>
      </div>

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

      {/* How it Works - Animated Component */}
      <HowItWorksSection />

      {/* B2B Promo Section / Kurumsal Çözümler */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-24 border-t border-gray-100 relative z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full blur-[100px] opacity-10 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-sm font-bold text-appleBlue mb-6">
                <Crown size={16} /> B2B Kurumsal Çözümler
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-appleDark mb-6 leading-tight">
                Emlak Ofisleri ve Danışmanlar İçin Sınırsız Güç
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Günlük değerleme limitlerine takılmadan yüzlerce portföyünüzü saniyeler içinde analiz edin. AI destekli detaylı raporları kendi müşterilerinize sunarak güven inşa edin.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-700">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-4"><ShieldCheck size={18} /></div>
                  <span className="font-medium">Sınırsız aylık değerleme hakkı</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-4"><TrendingUp size={18} /></div>
                  <span className="font-medium">Gelişmiş kira ve amortisman analizleri</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-4"><LineChart size={18} /></div>
                  <span className="font-medium">B2B panelinden geçmiş sorgu takibi</span>
                </li>
              </ul>

              <a href="/b2b" className="inline-flex items-center px-8 py-4 bg-appleBlue text-white rounded-xl shadow-apple hover:bg-blue-600 hover:-translate-y-1 transition-all font-medium">
                Kurumsal Panel&apos;e Giriş Yap &rarr;
              </a>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-appleBlue/20 to-purple-500/20 transform rotate-3 rounded-3xl blur-md" />
              <div className="bg-white p-2 rounded-2xl shadow-2xl relative z-10 border border-white/50 backdrop-blur-sm">
                <img src="/b2b-dashboard-preview.png" alt="B2B Emlakçı Paneli" className="w-full h-auto rounded-xl object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ & Trust Section */}
      <div className="bg-white py-24 border-t border-gray-100 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* FAQ */}
            <div>
              <h2 className="text-3xl font-semibold text-appleDark mb-8">Sıkça Sorulan Sorular</h2>
              <div className="space-y-4">
                <details className="group bg-gray-50 border border-gray-100 rounded-2xl open:bg-white open:ring-2 open:ring-appleBlue/20 transition-all cursor-pointer">
                  <summary className="flex justify-between items-center font-medium hover:text-appleBlue text-appleDark p-6">
                    Evinin Değeri sistemi nasıl çalışır?
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="text-gray-500 mt-2 px-6 pb-6 leading-relaxed">Sistemimiz, belirttiğiniz lokasyon, bina yaşı, metrekare ve kat gibi fiziksel özellikleri alır. Ardından İstanbul&apos;un güncel piyasa verilerini, şerefiye çarpanlarını ve TCMB enflasyon endeksini analiz ederek yapay zeka destekli en olası satış değerini size saniyeler içinde sunar.</p>
                </details>
                <details className="group bg-gray-50 border border-gray-100 rounded-2xl open:bg-white open:ring-2 open:ring-appleBlue/20 transition-all cursor-pointer">
                  <summary className="flex justify-between items-center font-medium hover:text-appleBlue text-appleDark p-6">
                    Bilgilerim güvende mi?
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="text-gray-500 mt-2 px-6 pb-6 leading-relaxed">Kesinlikle. 256-bit SSL sertifikası ile korunan altyapımızda hiçbir veriniz üçüncü şahıslarla paylaşılmaz. Tamamen KVKK uyumlu olarak sadece size özel raporlama amacıyla işlenir.</p>
                </details>
                <details className="group bg-gray-50 border border-gray-100 rounded-2xl open:bg-white open:ring-2 open:ring-appleBlue/20 transition-all cursor-pointer">
                  <summary className="flex justify-between items-center font-medium hover:text-appleBlue text-appleDark p-6">
                    Bu hizmet tamamen ücretsiz mi?
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="text-gray-500 mt-2 px-6 pb-6 leading-relaxed">Evet, bireysel kullanıcılarımız için anlık fiyat hesaplama ve detaylı gayrimenkul analiz raporu hizmetimiz tamamen ücretsizdir.</p>
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

      <Footer />
    </div>
  );
}


