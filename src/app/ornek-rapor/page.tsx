import { FileText, CheckCircle, Info } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import SamplePdfButton from "@/components/SamplePdfButton";

export const metadata: Metadata = {
    title: "Örnek Ev Değer Raporu | Evin Değeri",
    description: "Sistemimizin ürettiği gayrimenkul değerleme rapor örneğini inceleyin.",
};

export default function OrnekRaporPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-100 relative overflow-hidden">
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none" />

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-appleBlue text-white rounded-2xl flex items-center justify-center shrink-0 shadow-md">
                                <FileText size={28} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold text-appleDark">Örnek Rapor (Demo)</h1>
                                <p className="text-gray-500 font-medium mt-1">Sistemimizden satın alacağınız raporun özet şablonudur.</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <SamplePdfButton />
                        </div>
                    </div>

                    {/* MOCK REPORT CONTENT */}
                    <div id="sample-report-content" className="border-2 border-gray-100 rounded-3xl p-8 bg-white relative">
                        <div className="absolute top-4 right-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <CheckCircle size={14} /> Yapay Zeka Onaylı
                        </div>

                        <div className="mb-10 text-center border-b border-gray-100 pb-8">
                            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Değerleme Sonucu</h2>
                            <p className="text-5xl font-extrabold text-appleDark mb-4">4.850.000 ₺</p>
                            <p className="text-gray-500 font-medium">Beşiktaş / İstanbul - 3+1 (120m²) - 5 Yıllık Bina</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="bg-gray-50 rounded-2xl p-6">
                                <h3 className="font-bold text-appleDark mb-4">Finansal Özet</h3>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li className="flex justify-between border-b border-gray-200 pb-2"><span>Tahmini Kira Getirisi</span> <span className="font-bold text-appleDark">28.000 ₺ / Ay</span></li>
                                    <li className="flex justify-between border-b border-gray-200 pb-2"><span>Amortisman Süresi</span> <span className="font-bold text-appleDark">14.4 Yıl (174 Ay)</span></li>
                                    <li className="flex justify-between border-b border-gray-200 pb-2"><span>Bölge m² Birim Fiyatı</span> <span className="font-bold text-appleDark">40.416 ₺ / m²</span></li>
                                </ul>
                            </div>
                            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6">
                                <h3 className="font-bold text-appleDark mb-4">Yapay Zeka Analizi</h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                    Beşiktaş bölgesinde yer alan mülk, ulaşım ağlarına ve eğitim kurumlarına olan yakınlığı sebebiyle piyasa ortalamasının <strong>%12</strong> üzerinde değerlenmiştir. Son 1 yıldaki değer artışı <strong>%68</strong> olarak gözlemlenmiştir. Amortisman süresi, ilçe geneline göre yatırım yapılabilir seviyededir.
                                </p>
                            </div>
                        </div>

                        <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-6 text-sm text-orange-800 flex items-start gap-3">
                            <Info size={20} className="shrink-0 mt-0.5 text-orange-500" />
                            <p>
                                <strong>Bilgilendirme:</strong> Bu sayfa sadece temsilidir. Gerçek PDF raporları 5 ile 8 sayfa arasında uzunluğa sahip olup; bölgesel rakip analizlerini, fiyat değişim grafiklerini, ısı haritalarını ve demografik yapı verilerini detaylı tablolar eşliğinde sunmaktadır.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
