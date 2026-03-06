import Link from "next/link";
import { Mail, MapPin, Hexagon, Instagram, Twitter, Linkedin } from "lucide-react";

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
                            Evinin Degeri
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed mb-4">
                            Yapay zeka ile gayrimenkulunuzun gercek degerini aninda hesaplayin.
                        </p>
                        <div className="space-y-2 text-gray-500 text-xs">
                            <div className="flex items-center gap-2">
                                <Mail size={12} className="text-appleBlue" />
                                <a href="mailto:evindestek@gmail.com" className="hover:text-appleBlue transition-colors">evindestek@gmail.com</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={12} className="text-appleBlue" />
                                <span>Istanbul, Turkiye</span>
                            </div>
                        </div>
                    </div>

                    {/* Kurumsal */}
                    <div>
                        <h4 className="font-semibold text-appleDark text-sm mb-4">Kurumsal</h4>
                        <ul className="space-y-2.5">
                            <li><Link href="/hakkimizda" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Hakkimizda</Link></li>
                            <li><Link href="/iletisim" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Iletisim</Link></li>
                            <li><Link href="/blog" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Emlak Guncesi</Link></li>
                            <li><Link href="/sss" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Sikca Sorulan Sorular</Link></li>
                            <li><Link href="/nasil-hesapliyoruz" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Nasil Hesapliyoruz?</Link></li>
                        </ul>
                    </div>

                    {/* Cozumler */}
                    <div>
                        <h4 className="font-semibold text-appleDark text-sm mb-4">Cozumler</h4>
                        <ul className="space-y-2.5">
                            <li><Link href="/" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Ev Degerleme</Link></li>
                            <li><Link href="/karsilastirma" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Degerleme Karsilastir</Link></li>
                            <li><Link href="/gecmis" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Degerleme Gecmisim</Link></li>
                            <li><Link href="/yatirim-haritasi" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Yatirim Haritasi</Link></li>
                            <li><Link href="/b2b" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Kurumsal (B2B)</Link></li>
                        </ul>
                    </div>

                    {/* Yasal */}
                    <div>
                        <h4 className="font-semibold text-appleDark text-sm mb-4">Yasal</h4>
                        <ul className="space-y-2.5">
                            <li><Link href="/p/gizlilik-politikasi" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Gizlilik Politikasi</Link></li>
                            <li><Link href="/p/kullanim-kosullari" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Kullanim Kosullari</Link></li>
                            <li><Link href="/mesafeli-satis-sozlesmesi" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Mesafeli Satis Sozlesmesi</Link></li>
                            <li><Link href="/iptal-iade" className="text-gray-500 hover:text-appleBlue transition-colors text-xs">Iptal ve Iade Kosullari</Link></li>
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
                    </div>

                </div>

                <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Evinin Degeri. Tum haklari saklidir.</p>
                    <p className="mt-2 md:mt-0">Yapay Zeka Destekli Gayrimenkul Degerleme Platformu</p>
                </div>
            </div>
        </footer>
    );
}
