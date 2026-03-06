"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Search, Filter } from "lucide-react";

const POSTS_PER_PAGE = 6;

export default function BlogListClient({ initialPosts }: { initialPosts: any[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Tümü");
    const [currentPage, setCurrentPage] = useState(1);

    // Get unique categories from posts or use default ones
    const categories = useMemo(() => {
        const cats = new Set<string>();
        cats.add("Tümü");
        initialPosts.forEach(p => {
            if (p.category) cats.add(p.category);
        });
        // If not enough categories are extracted, we can add defaults we know
        if (cats.size === 1) {
            ["Emlak Trendleri", "Yatirim Rehberi", "Sehir Analizi", "Mevzuat"].forEach(c => cats.add(c));
        }
        return Array.from(cats);
    }, [initialPosts]);

    const filteredPosts = useMemo(() => {
        let filtered = initialPosts;

        if (selectedCategory !== "Tümü") {
            filtered = filtered.filter(p => p.category === selectedCategory || (!p.category && selectedCategory === "Emlak Trendleri"));
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(query) ||
                (p.summary && p.summary.toLowerCase().includes(query)) ||
                p.content.toLowerCase().includes(query)
            );
        }

        return filtered;
    }, [initialPosts, searchQuery, selectedCategory]);

    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const paginatedPosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

    // Reset page on filter change
    useMemo(() => { setCurrentPage(1); }, [searchQuery, selectedCategory]);

    return (
        <div className="w-full">
            {/* Search and Filter Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-10 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Makalelerde ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-appleBlue/20 text-appleDark transition-all"
                    />
                </div>
                <div className="w-full md:w-64 relative flex items-center">
                    <Filter className="absolute left-4 text-appleBlue" size={20} />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full pl-12 pr-10 py-3 rounded-2xl bg-blue-50/50 border-none outline-none focus:ring-2 focus:ring-appleBlue/20 text-appleBlue font-medium appearance-none cursor-pointer"
                    >
                        {categories.map((cat, idx) => (
                            <option key={idx} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <div className="absolute right-4 pointer-events-none">
                        <svg className="w-4 h-4 text-appleBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>

            {/* Posts Grid */}
            {paginatedPosts.length === 0 ? (
                <div className="text-center p-12 bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500">Arama kriterlerinize uygun makale bulunamadı.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {paginatedPosts.map((post: any) => (
                        <Link href={`/blog/${post.slug}`} key={post.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-apple transition-all duration-300 transform hover:-translate-y-1">
                            <div className="h-48 overflow-hidden relative bg-gray-100">
                                <img
                                    src={post.imageUrl || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    onError={(e: any) => { e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" }}
                                />
                                {post.category && (
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-appleBlue shadow-sm">
                                        {post.category}
                                    </div>
                                )}
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <div className="text-xs font-semibold text-gray-400 tracking-wider mb-2 text-left flex justify-between">
                                    <span>{new Date(post.createdAt).toLocaleDateString("tr-TR")}</span>
                                    <span>~{Math.ceil(post.content.length / 1000)} dk</span>
                                </div>
                                <h2 className="text-lg font-bold text-appleDark mb-3 line-clamp-2 leading-tight group-hover:text-appleBlue transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-gray-500 line-clamp-3 mb-6 flex-1 text-sm leading-relaxed">
                                    {post.summary || post.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + "..."}
                                </p>
                                <div className="flex items-center text-appleBlue font-medium text-sm transition-colors mt-auto">
                                    Devamını Oku <ArrowRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Geri
                    </button>
                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center font-medium transition-all ${currentPage === i + 1 ? 'bg-appleBlue text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        İleri
                    </button>
                </div>
            )}
        </div>
    );
}
