import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, FileText, Lightbulb, Map, TrendingUp } from "lucide-react";
import AdBanner from "@/components/AdBanner";
import type { Metadata } from 'next';

import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    // @ts-ignore
    const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
    if (!post) return { title: "Makale Bulunamadı" };

    return {
        title: post.title,
        description: post.summary || post.content.replace(/<[^>]*>?/gm, '').substring(0, 150),
        openGraph: {
            images: [post.imageUrl || ""],
            title: post.title,
        }
    };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    // Fetch current post
    const post = await prisma.blogPost.findUnique({
        where: { slug: params.slug }
    });

    if (!post) {
        notFound();
    }

    // Fetch popular/recent posts for the sidebar (exclude current)
    const recentPosts = await prisma.blogPost.findMany({
        where: { NOT: { id: post.id } },
        orderBy: { createdAt: 'desc' },
        take: 3
    });

    const settingsRecords = await prisma.algorithmSettings.findMany();
    const settings: Record<string, string> = {};
    settingsRecords.forEach((s: any) => settings[s.key] = s.value);

    return (
        <article className="min-h-screen bg-appleGray pb-24">
            {/* Hero Section */}
            <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden bg-black">
                <Image
                    src={post.imageUrl || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm scale-105"
                />
                <Image
                    src={post.imageUrl || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"}
                    alt={post.title}
                    layout="fill"
                    objectFit="contain"
                    className="absolute inset-0 w-full h-full object-contain opacity-90"
                />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-appleGray via-appleGray/80 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end px-4 pb-12 max-w-6xl mx-auto w-full z-10">
                    <Link href="/blog" className="inline-flex items-center text-appleDark/80 hover:text-appleBlue transition-colors mb-6 text-sm font-bold bg-white/50 backdrop-blur-md px-4 py-2 rounded-full w-fit">
                        <ArrowLeft size={16} className="mr-2" /> Blog&apos;a Dön
                    </Link>
                    {/* Date & Tip */}
                    <div className="flex items-center gap-4 text-xs font-medium text-blue-100/80 mb-6 uppercase tracking-wider translate-y-2 opacity-0 animate-fade-in" style={{ animationDelay: "150ms", animationFillMode: "forwards" }}>
                        <span className="flex items-center backdrop-blur-md bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                            <Calendar size={14} className="mr-2" />
                            {new Date(post.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                        <span className="flex items-center backdrop-blur-md bg-green-500/20 text-green-200 px-3 py-1.5 rounded-full border border-green-500/20">
                            <Lightbulb size={14} className="mr-2" /> Emlak İpucu
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-5xl font-extrabold text-appleDark tracking-tight leading-tight mb-4 drop-shadow-sm max-w-4xl">
                        {post.title}
                    </h1>
                    <div className="flex items-center text-appleDark/70 text-sm font-semibold font-mono bg-white/40 backdrop-blur-sm px-4 py-2 rounded-xl w-fit">
                        <Calendar size={16} className="mr-2" />
                        {new Date(post.createdAt).toLocaleDateString("tr-TR", { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>
            </div>

            {/* Content & Sidebar Section */}
            <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Article Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
                        {post.summary && (
                            <div className="mb-10 p-6 bg-blue-50/50 rounded-2xl border border-blue-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <FileText size={100} />
                                </div>
                                <h3 className="text-appleBlue font-bold mb-2 flex items-center gap-2">
                                    <TrendingUp size={18} /> Özet
                                </h3>
                                <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed relative z-10">
                                    {post.summary}
                                </p>
                            </div>
                        )}
                        <div
                            className="prose prose-lg prose-blue max-w-none text-appleDark prose-headings:font-bold prose-headings:tracking-tight prose-a:text-appleBlue hover:prose-a:text-blue-700 prose-img:rounded-3xl prose-img:shadow-md"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>

                    {/* Inline Call to Action */}
                    <div className="bg-gradient-to-r from-appleBlue to-blue-600 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Evinizin Değerini Merak Mı Ediyorsunuz?</h3>
                            <p className="text-blue-100 opacity-90">Yapay zeka ile sadece 30 saniyede gerçek piyasa değerini ücretsiz öğrenin.</p>
                        </div>
                        <Link href="/" className="px-8 py-4 bg-white text-appleBlue font-bold rounded-2xl hover:scale-105 transition-transform shadow-lg whitespace-nowrap">
                            Hemen Değerleme Yap
                        </Link>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-8">

                    {/* Emlak İpuçları Box */}
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-4 -mt-4 text-amber-200 opacity-50">
                            <Lightbulb size={120} />
                        </div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-4">
                                <Lightbulb size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-appleDark mb-3">Uzman İpuçları</h3>
                            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                Evinizi satmadan önce piyasa analizi yaptırmak, %15&apos;e kadar daha yüksek fiyattan alıcı bulmanızı sağlayabilir. Evinizi yapay zeka ile analiz etmeyi unutmayın.
                            </p>
                            <Link href="/yatirim-haritasi" className="text-amber-600 font-bold text-sm flex items-center hover:text-amber-700">
                                İstanbul Isı Haritasını İncele &rarr;
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-appleDark mb-4 flex items-center gap-2">
                            <TrendingUp className="text-appleBlue" size={20} /> Piyasa Değerlendirmesi
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Yapay zeka analizimiz, {post.title.split(' ')[0]} bölgesindeki gayrimenkul likiditesinin ve değer artışının önümüzdeki çeyrekte hızlanacağını öngörüyor. Detaylı bölge raporunuzu almak için anında değerleme aracımızı kullanın.
                        </p>
                        <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500 italic">
                            — Evin Değeri Veri Bilimi Ekibi
                        </div>
                        <div className="space-y-3 mt-4">
                            <Link href="/" className="block p-3 rounded-xl hover:bg-gray-50 text-gray-600 font-medium transition-colors border border-transparent hover:border-gray-100">
                                🏠 Ücretsiz Ev Değerleme
                            </Link>
                            <Link href="/yatirim-haritasi" className="block p-3 rounded-xl hover:bg-gray-50 text-gray-600 font-medium transition-colors border border-transparent hover:border-gray-100">
                                🗺️ Bölgesel Isı Haritası
                            </Link>
                            <Link href="/giris" className="block p-3 rounded-xl hover:bg-gray-50 text-gray-600 font-medium transition-colors border border-transparent hover:border-gray-100">
                                🏢 Giriş Yap
                            </Link>
                        </div>
                    </div>

                    {/* Dynamic Sidebar AdBanner */}
                    {(settings.adsenseSidebar || settings.sponsorSidebarUrl) && (
                        <div className="mb-8">
                            <AdBanner
                                adsenseId={settings.adsenseSidebar}
                                sponsorUrl={settings.sponsorSidebarUrl}
                                sponsorLink={settings.sponsorSidebarLink}
                            />
                        </div>
                    )}

                    {/* Recent Posts */}
                    {recentPosts.length > 0 && (
                        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-appleDark mb-4">Son Çıkanlar</h3>
                            <div className="space-y-4">
                                {recentPosts.map((rp: any) => (
                                    <Link key={rp.id} href={`/blog/${rp.slug}`} className="group flex gap-4 items-center">
                                        <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                                            {rp.imageUrl ? (
                                                <Image src={rp.imageUrl} alt={rp.title} layout="fill" objectFit="cover" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400"><FileText /></div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm text-appleDark group-hover:text-appleBlue transition-colors line-clamp-2 leading-snug">
                                                {rp.title}
                                            </h4>
                                            <p className="text-xs text-gray-400 mt-1 font-mono">
                                                {new Date(rp.createdAt).toLocaleDateString("tr-TR")}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </article>
    );
}
