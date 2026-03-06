import type { Metadata } from 'next';
import BlogListClient from "@/components/BlogListClient";

import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

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
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-appleDark tracking-tight">Emlak Güncesi</h1>
                    <p className="text-lg text-appleLightGray max-w-2xl mx-auto">Sektörel trendler, yapay zeka analizli pazar öngörüleri ve gayrimenkul dünyasından en son haberler.</p>
                </div>

                {/* Client Side Search, Filter and Pagination Component */}
                <BlogListClient initialPosts={posts} />
            </div>
        </div>
    );
}
