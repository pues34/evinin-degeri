import dynamic from 'next/dynamic';
import { Map, Home, TrendingUp, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

const HeatmapDisplay = dynamic(() => import('@/components/HeatmapDisplay'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 min-h-[500px] rounded-3xl border border-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-appleBlue mb-4"></div>
            <p className="text-gray-500 font-medium tracking-wide">Yatırım Haritası Hazırlanıyor...</p>
        </div>
    )
});

export const metadata: Metadata = {
    title: "İstanbul Yatırım Isı Haritası | Evinin Değeri",
    description: "İstanbul ilçe ilçe konut metrekare satış fiyatlarının makine öğrenimi tabanlı canlı bölgesel analizi.",
};

export default function HeatmapPage() {
    return (
        <div className="min-h-screen bg-appleGray pt-24 pb-12 px-4">
            <div className="max-w-6xl mx-auto space-y-8">

                <div className="flex justify-start mb-8">
                    <Link href="/">
                        <button className="flex items-center px-5 py-2.5 bg-appleBlue text-white rounded-xl hover:bg-blue-600 transition-colors shadow-sm font-medium text-sm">
                            <Home size={18} className="mr-2" />
                            Evim Ne Kadar Eder?
                        </button>
                    </Link>
                </div>

                <div className="mb-8 pt-4">
                    <h1 className="text-3xl font-bold text-appleDark mb-3 flex items-center">
                        <Map size={32} className="mr-3 text-appleBlue" />
                        İstanbul Konut Isı Haritası
                    </h1>
                    <p className="text-appleLightGray max-w-3xl text-lg">
                        Evinin Değeri yapay zekası ile hesaplanan on binlerce gayrimenkul değerleme verisine dayanarak oluşturulmuş, anlık piyasa dinamiklerini yansıtan bölgesel değer yoğunluk haritası. <span className="text-appleBlue font-medium">Kırmızı</span> alanlar yüksek ortalama birim fiyatlarını (m²), <span className="text-green-600 font-medium">Yeşil</span> alanlar ise nispeten uygun fiyatlı bölgeleri temsil eder.
                    </p>
                </div>

                {/* Info Bar */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 relative z-10">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                        <TrendingUp className="text-appleBlue shrink-0" size={24} />
                        <div>
                            <h3 className="font-bold text-appleDark mb-1">Dinamik Veri Akışı</h3>
                            <p className="text-sm text-gray-500">Her saniye yapılan değerlemeler algoritmayı eğitir. Haritadaki dairenin büyüklüğü o bölgedeki pazar canlılığını, rengi ise pahalılığı belirtir.</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                        <AlertTriangle className="text-amber-500 shrink-0" size={24} />
                        <div>
                            <h3 className="font-bold text-appleDark mb-1">Bilgilendirme</h3>
                            <p className="text-sm text-gray-500">Bu haritadaki fiyatlar bir öneri niteliği taşımaz. Yapay zeka ile son kullanıcı sorgularının sadece bölgesel yansımasıdır.</p>
                        </div>
                    </div>
                </div>

                {/* Map Wrapper */}
                <div className="relative z-0 shadow-apple overflow-hidden rounded-3xl border border-gray-100 bg-white">
                    <HeatmapDisplay />
                </div>

            </div>
        </div>
    );
}
