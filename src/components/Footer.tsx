import Link from "next/link";
import { Mail, Phone, MapPin, Hexagon } from "lucide-react";

import prisma from "@/lib/prisma";

export default async function Footer() {
    let pages: any[] = [];
    try {
        pages = await (prisma as any).page.findMany({ select: { id: true, title: true, slug: true } });
    } catch (e) {
        console.error("Failed to load pages for footer", e);
    }

    return (
        <footer className="bg-white border-t border-gray-100 py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold text-appleDark tracking-tight mb-4">
                            <span className="p-1.5 bg-appleDark text-white rounded-lg"><Hexagon size={20} className="fill-current" /></span>
                            Evinin Değeri
                        </Link>
                        <p className="text-gray-500 max-w-sm leading-relaxed mb-6">
                            Yeni nesil yapay zeka ve kapsamlı piyasa verileri ile gayrimenkulünüzün gerçek değerini güvenle ve anında hesaplayın.
                        </p>
                        <div className="flex flex-col gap-3 text-gray-500 text-sm">
                            <div className="flex items-center gap-3 group">
                                <Mail size={16} className="text-appleBlue group-hover:scale-110 transition-transform" />
                                <a href="mailto:evindestek@gmail.com" className="hover:text-appleBlue transition-colors">evindestek@gmail.com</a>
                            </div>
                            <div className="flex items-center gap-3 group">
                                <MapPin size={16} className="text-appleBlue group-hover:scale-110 transition-transform" />
                                <span>İstanbul, Türkiye</span>
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold text-appleDark mb-4">Kurumsal & Servisler</h4>
                        <ul className="space-y-3">
                            <li><Link href="/yatirim-haritasi" className="text-gray-500 hover:text-appleBlue transition-colors text-sm">📍 Canlı Isı Haritası</Link></li>
                            <li><Link href="/blog" className="text-gray-500 hover:text-appleBlue transition-colors text-sm">📰 Emlak Güncesi</Link></li>
                            {pages.map((p: any) => (
                                <li key={p.id}><Link href={`/p/${p.slug}`} className="text-gray-500 hover:text-appleBlue transition-colors text-sm">{p.title}</Link></li>
                            ))}
                            <li><Link href="/b2b/login" className="text-appleBlue hover:text-blue-700 transition-colors text-sm mt-4 inline-block font-bold">🏢 B2B Kurumsal Giriş</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold text-appleDark mb-4">Yasal Sertifikalar</h4>
                        <ul className="space-y-3">
                            <li><Link href="/p/gizlilik-politikasi" className="text-gray-500 hover:text-appleBlue transition-colors text-sm">Gizlilik Politikası</Link></li>
                            <li><Link href="/p/kullanim-kosullari" className="text-gray-500 hover:text-appleBlue transition-colors text-sm">Kullanım Koşulları</Link></li>
                            <li><Link href="/mesafeli-satis-sozlesmesi" className="text-gray-500 hover:text-appleBlue transition-colors text-sm">Mesafeli Satış Sözleşmesi</Link></li>
                            <li><Link href="/iptal-iade" className="text-gray-500 hover:text-appleBlue transition-colors text-sm">İptal ve İade Koşulları</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Evinin Değeri. Tüm hakları saklıdır.</p>
                </div>
            </div>
        </footer>
    );
}
