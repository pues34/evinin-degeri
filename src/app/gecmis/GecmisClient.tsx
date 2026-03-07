"use client";

import { useState } from "react";
import { History, Search, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

export default function GecmisClient() {
    const [searchType, setSearchType] = useState<"phone" | "email">("phone");
    const [searchValue, setSearchValue] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async () => {
        if (!searchValue.trim()) return;
        setLoading(true);
        setSearched(true);
        try {
            const res = await fetch(`/api/valuation/history?type=${searchType}&value=${encodeURIComponent(searchValue.trim())}`);
            const data = await res.json();
            if (data.success) setResults(data.data || []);
            else setResults([]);
        } catch {
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const fmt = (v: number) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(v);

    return (
        <div className="min-h-screen bg-appleGray">
            {/* Hero */}
            <div className="bg-gradient-to-br from-appleDark via-gray-900 to-appleDark text-white py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-6">
                        <History size={32} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Degerleme Gecmisim</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">Telefon numaraniz veya e-posta adresiniz ile onceki degerleme sonuclariniza ulasin.</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-16">
                {/* Search Box */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8">
                    <div className="flex gap-3 mb-4">
                        <button
                            onClick={() => setSearchType("phone")}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${searchType === "phone" ? "bg-appleBlue text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                        >
                            Telefon
                        </button>
                        <button
                            onClick={() => setSearchType("email")}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${searchType === "email" ? "bg-appleBlue text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                        >
                            E-posta
                        </button>
                    </div>
                    <div className="flex gap-3">
                        <input
                            type={searchType === "phone" ? "tel" : "email"}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            placeholder={searchType === "phone" ? "05XX XXX XX XX" : "ornek@email.com"}
                            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none text-sm"
                        />
                        <button
                            onClick={handleSearch}
                            disabled={loading || !searchValue.trim()}
                            className="px-6 py-3 bg-appleBlue text-white rounded-xl font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {loading ? "Araniyor..." : <><Search size={16} /> Ara</>}
                        </button>
                    </div>
                </div>

                {/* Results */}
                {searched && results.length === 0 && !loading && (
                    <div className="text-center py-12 bg-white rounded-3xl border border-gray-100">
                        <Clock size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">Bu bilgiyle eslesen degerleme bulunamadi.</p>
                        <Link href="/" className="inline-flex items-center gap-2 mt-4 text-appleBlue font-medium hover:underline">
                            Yeni Degerleme Yap <ArrowRight size={14} />
                        </Link>
                    </div>
                )}

                {results.length > 0 && (
                    <div className="space-y-4">
                        <p className="text-sm text-gray-500">{results.length} degerleme bulundu</p>
                        {results.map((r: any) => {
                            const val = r.overridenValue || r.estimatedValue;
                            return (
                                <Link key={r.id} href={`/result/${r.id}`} className="block bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-apple transition-all hover:-translate-y-0.5">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xs text-gray-400 mb-1">#{r.requestNumber} • {new Date(r.createdAt).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}</p>
                                            <p className="font-semibold text-appleDark">{r.neighborhood}, {r.district}</p>
                                            <p className="text-sm text-gray-500 mt-1">{r.rooms} • {r.netSqm} m2 • {r.floor}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-appleBlue">{fmt(val)}</p>
                                            <p className="text-xs text-gray-400 mt-1">Raporu Gor →</p>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
