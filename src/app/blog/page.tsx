import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import type { Metadata } from 'next';

import prisma from "@/lib/prisma";

export const metadata: Metadata = {
    title: "Emlak Güncesi & Analizler",
    description: "Türkiye emlak piyasası, konut fiyat analizleri ve gayrimenkul yatırım stratejileri hakkında güncel blog yazıları.",
};

export default async function BlogPage() {
    // @ts-ignore
    const posts = await prisma.blogPost.findMany({
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="bg-appleGray min-h-screen pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-100 text-appleBlue rounded-2xl mb-2">
                        <BookOpen size={32} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-appleDark tracking-tight">Emlak Güncesi</h1>
                    <p className="text-lg text-appleLightGray max-w-2xl mx-auto">Sektörel trendler, yapay zeka analizli pazar öngörüleri ve gayrimenkul dünyasından en son haberler.</p>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center p-12 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <p className="text-gray-500">Henüz yayınlanmış bir makale bulunmuyor.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {posts.map((post: any) => (
                            <Link href={`/blog/${post.slug}`} key={post.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-apple transition-all duration-300 transform hover:-translate-y-1">
                                <div className="h-56 overflow-hidden relative">
                                    <img
                                        src={post.imageUrl || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-8 flex flex-col flex-1">
                                    <div className="text-xs font-semibold text-appleBlue tracking-wider uppercase mb-3 text-left">
                                        Okuma Süresi: ~{Math.ceil(post.content.length / 1000)} Dakika
                                    </div>
                                    <h2 className="text-xl font-bold text-appleDark mb-3 line-clamp-2 leading-tight">
                                        {post.title}
                                    </h2>
                                    <p className="text-appleLightGray line-clamp-3 mb-6 flex-1 text-sm leading-relaxed">
                                        {post.summary || post.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + "..."}
                                    </p>
                                    <div className="flex items-center text-appleDark font-medium text-sm group-hover:text-appleBlue transition-colors mt-auto">
                                        Makaleyi Oku <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
