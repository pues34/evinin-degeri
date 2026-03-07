import Link from "next/link";
import { Mail, MapPin, Hexagon, Instagram, Twitter, Linkedin, Phone, ShieldCheck, CreditCard } from "lucide-react";

import prisma from "@/lib/prisma";

export default async function Footer() {
    let settings: any = null;

    try {
        settings = await prisma.systemSettings.findFirst();
    } catch (e) {
        console.error("Failed to load footer settings", e);
    }

    return (
        <footer className="bg-white border-t border-gray-100 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6">

                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="inline-flex items-center gap-2 text-lg font-bold text-appleDark tracking-tight mb-4">
                            <span className="p-1.5 bg-appleDark text-white rounded-lg"><Hexagon size={16} className="fill-current" /></span>
                            Evinin Değeri
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed mb-4">
                            Yapay zeka ile gayrimenkulünüzün gerçek değerini anında hesaplayın.
                        </p>
                        <div className="space-y-2 text-gray-500 text-xs">
                            <div className="flex items-center gap-2">
                                <Mail size={12} className="text-appleBlue shrink-0" />
                                <a href="mailto:destek@evindegeri.com" className="hover:text-appleBlue transition-colors">destek@evindegeri.com</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={12} className="text-appleBlue shrink-0" />
                                <a href="tel:+905337253171" className="hover:text-appleBlue transition-colors">0533 725 3171</a>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin size={12} className="text-appleBlue shrink-0 mt-0.5" />
                                <span>Evinin Değeri Gayrimenkul Teknolojileri<br />Muratpaşa Mah. Cemiyet Cad. No:28<br />Bayrampaşa / İstanbul<br /><br /><span className="text-[10px] text-gray-400">Vergi Dairesi: Tuna<br />Vergi No: 1310852802</span></span>
                            </div>
                        </div>
                    </div>

                    {/* Kurumsal */}
                    <div>
                        <h4 className="font-semibold text-appleDark text-sm mb-4">Kurumsal</h4>
                        <ul className="space-y-2.5">
                            <li><Link href="/hakkimizda" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Hakkımızda</Link></li>
                            <li><Link href="/iletisim" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">İletişim</Link></li>
                            <li><Link href="/blog" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Emlak Güncesi</Link></li>
                            <li><Link href="/sss" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Sıkça Sorulan Sorular</Link></li>
                            <li><Link href="/nasil-hesapliyoruz" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Nasıl Hesaplıyoruz?</Link></li>
                        </ul>
                    </div>

                    {/* Cozumler */}
                    <div>
                        <h4 className="font-semibold text-appleDark text-sm mb-4">Çözümler</h4>
                        <ul className="space-y-2.5">
                            <li><Link href="/" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Ev Değerleme</Link></li>
                            <li><Link href="/kira-hesaplama" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Kira Getirisi Hesapla</Link></li>
                            <li><Link href="/amortisman-hesaplama" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Amortisman Süresi Hesapla</Link></li>
                            <li><Link href="/konut-fiyat-endeksi" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Konut Fiyat Endeksi</Link></li>
                            <li><Link href="/karsilastirma" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Değerleme Karşılaştır</Link></li>
                            <li><Link href="/gecmis" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Değerleme Geçmişim</Link></li>
                            <li><Link href="/yatirim-haritasi" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Yatırım Haritası</Link></li>
                            <li><Link href="/b2b" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Kurumsal (B2B)</Link></li>
                        </ul>
                    </div>

                    {/* Yasal */}
                    <div>
                        <h4 className="font-semibold text-appleDark text-sm mb-4">Yasal</h4>
                        <ul className="space-y-2.5">
                            <li><Link href="/gizlilik-politikasi" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Gizlilik Politikası</Link></li>
                            <li><Link href="/kullanim-kosullari" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Kullanım Koşulları</Link></li>
                            <li><Link href="/mesafeli-satis-sozlesmesi" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Mesafeli Satış Sözleşmesi</Link></li>
                            <li><Link href="/iptal-iade" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">İptal ve İade Koşulları</Link></li>
                        </ul>
                    </div>

                    {/* Bizi Takip Edin */}
                    <div>
                        <h4 className="font-semibold text-appleDark text-sm mb-4">Bizi Takip Edin</h4>
                        <div className="flex flex-wrap gap-2">
                            {settings?.instagramUrl && (
                                <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-50 rounded-full hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all text-gray-400 flex items-center justify-center">
                                    <Instagram size={16} />
                                </a>
                            )}
                            {settings?.twitterUrl && (
                                <a href={settings.twitterUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-50 rounded-full hover:bg-black hover:text-white transition-all text-gray-400 flex items-center justify-center">
                                    <Twitter size={16} />
                                </a>
                            )}
                            {settings?.linkedinUrl && (
                                <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-50 rounded-full hover:bg-blue-700 hover:text-white transition-all text-gray-400 flex items-center justify-center">
                                    <Linkedin size={16} />
                                </a>
                            )}
                        </div>
                        {(!settings?.instagramUrl && !settings?.twitterUrl && !settings?.linkedinUrl) && (
                            <p className="text-xs text-gray-400 mt-2">Yakinda!</p>
                        )}

                        <h4 className="font-semibold text-appleDark text-sm mt-8 mb-4">Güvenli Ödeme</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-green-600 text-xs font-medium">
                                <ShieldCheck size={16} /> 256-Bit SSL Koruması
                            </div>
                            <div className="flex gap-2">
                                <div className="px-2 py-1 bg-gray-50 border border-gray-200 rounded text-[10px] font-bold text-blue-800 flex items-center gap-1">
                                    <CreditCard size={12} /> VISA
                                </div>
                                <div className="px-2 py-1 bg-gray-50 border border-gray-200 rounded text-[10px] font-bold text-red-600 flex items-center gap-1">
                                    <CreditCard size={12} /> MASTER
                                </div>
                                <div className="px-2 py-1 bg-gray-50 border border-gray-200 rounded text-[10px] font-bold text-orange-500 flex items-center gap-1">
                                    <CreditCard size={12} /> TROY
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <p>&copy; {new Date().getFullYear()} Evinin Degeri. Tum haklari saklidir.</p>
                        <span className="hidden md:inline text-gray-300">|</span>
                        <p className="text-center md:text-left">
                            <strong>Evinin Değeri Bilişim Teknolojileri Tic. Ltd. Şti.</strong><br />
                            Mersis No: 0123456789000015 &bull; Kadıköy V.D. 1234567890
                        </p>
                    </div>
                    <p className="mt-4 md:mt-0 text-center md:text-right">Yapay Zeka Destekli Gayrimenkul Degerleme Platformu</p>
                </div>
            </div>
        </footer>
    );
}
