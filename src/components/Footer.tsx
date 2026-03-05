import Link from "next/link";
import { Mail, MapPin, Hexagon, Instagram, Twitter, Linkedin, Building2, BarChart2, Calculator, HelpCircle, FileText } from "lucide-react";

import prisma from "@/lib/prisma";

export default async function Footer() {
    let pages: any[] = [];
    let settings: any = null;

    try {
        pages = await (prisma as any).page.findMany({ select: { id: true, title: true, slug: true } });
        settings = await prisma.systemSettings.findFirst();
    } catch (e) {
        console.error("Failed to load pages for footer", e);
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
                                <Mail size={12} className="text-appleBlue" />
                                <a href="mailto:evindestek@gmail.com" className="hover:text-appleBlue transition-colors">evindestek@gmail.com</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={12} className="text-appleBlue" />
                                <span>İstanbul, Türkiye</span>
                            </div>
                        </div>
                    </div>

                    {/* Hakkımızda */}
                    <div>
                        <h4 className="font-semibold text-appleDark text-sm mb-4">Hakkımızda</h4>
                        <ul className="space-y-2.5">
                            <li><Link href="/hakkimizda" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Hakkımızda</Link></li>
                            <li><Link href="/blog" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Emlak Güncesi</Link></li>
                            <li><Link href="/nasil-hesapliyoruz" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Nasıl Hesaplıyoruz?</Link></li>
                            {pages.map((p: any) => (
                                <li key={p.id}><Link href={`/p/${p.slug}`} className="text-gray-500 hover:text-appleBlue transition-colors text-xs">{p.title}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Çözümler */}
                    <div>
                        <h4 className="font-semibold text-appleDark text-sm mb-4">Çözümler</h4>
                        <ul className="space-y-2.5">
                            <li><Link href="/" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">🏠 Ev Değerleme</Link></li>
                            <li><Link href="/yatirim-haritasi" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">📍 Yatırım Haritası</Link></li>
                            <li><Link href="/b2b" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">🏢 Kurumsal (B2B)</Link></li>
                            <li><Link href="/b2b/pricing" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">💎 PRO Paketler</Link></li>
                        </ul>
                    </div>

                    {/* Yasal */}
                    <div>
                        <h4 className="font-semibold text-appleDark text-sm mb-4">Yasal</h4>
                        <ul className="space-y-2.5">
                            <li><Link href="/p/gizlilik-politikasi" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Gizlilik Politikası</Link></li>
                            <li><Link href="/p/kullanim-kosullari" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Kullanım Koşulları</Link></li>
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
                            <p className="text-xs text-gray-400 mt-2">Yakında!</p>
                        )}
                    </div>

                </div>

                <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Evinin Değeri. Tüm hakları saklıdır.</p>
                    <p className="mt-2 md:mt-0">Yapay Zeka Destekli Gayrimenkul Değerleme Platformu</p>
                </div>
            </div>
        </footer>
    );
}
