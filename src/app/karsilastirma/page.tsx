"use client";

import { useState } from "react";
import { Search, ArrowRight, Scale, MapPin, Home, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function KarsilastirmaPage() {
    const [ids, setIds] = useState<string[]>(["", "", ""]);
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchComparison = async () => {
        setLoading(true);
        setError(null);
        const fetched: any[] = [];
        let hasError = false;

        for (const id of ids) {
            if (!id.trim()) continue;
            try {
                const cleanId = id.trim().replace(/.*result\//, '').replace(/[^a-zA-Z0-9-_]/g, '');
                if (!cleanId) {
                    hasError = true;
                    continue;
                }
                const res = await fetch(`/api/valuation/${cleanId}`);
                const data = await res.json();
                if (data.success) {
                    fetched.push(data.data);
                } else {
                    hasError = true;
                }
            } catch {
                hasError = true;
            }
        }

        if (fetched.length === 0 && hasError) {
            setError("Girilen ID'ler ile eşleşen değerleme bulunamadı. Lütfen geçerli bir değerleme ID'si veya URL'si girin.");
        } else if (hasError && fetched.length > 0) {
            setError("Bazı ID'ler geçersiz olduğu için karşılaştırma eksik olabilir.");
        }

        setResults(fetched);
        setLoading(false);
    };

    const fmt = (v: number) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(v);

    return (
        <div className="min-h-screen bg-appleGray">
            {/* Hero */}
            <div className="bg-gradient-to-br from-appleDark via-gray-900 to-appleDark text-white py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-6">
                        <Scale size={32} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Değerleme Karşılaştırma</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">Farklı mülklerin değerleme sonuçlarını yan yana karşılaştırın.</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-16">
                {/* Input Section */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8">
                    <h2 className="font-semibold text-lg text-appleDark mb-4">Karşılaştırmak istediğiniz değerleme ID&apos;lerini girin</h2>
                    <p className="text-sm text-gray-500 mb-6">Değerleme sonuç sayfanızın URL&apos;sindeki ID&apos;yi yapıştırın (en fazla 3)</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {ids.map((id, i) => (
                            <div key={i} className="relative">
                                <Home size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={id}
                                    onChange={(e) => { const n = [...ids]; n[i] = e.target.value; setIds(n); }}
                                    placeholder={`Mülk ${i + 1} ID veya URL`}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-appleBlue outline-none text-sm"
                                />
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={fetchComparison}
                        disabled={loading || ids.every(id => !id.trim())}
                        className="px-6 py-3 bg-appleBlue text-white rounded-xl font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {loading ? "Yükleniyor..." : <><Search size={16} /> Karşılaştır</>}
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 mb-8 flex items-center gap-3">
                        <AlertCircle size={20} className="shrink-0" />
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                {/* Results */}
                {results.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {results.map((r, i) => {
                            const val = r.overridenValue || r.estimatedValue;
                            return (
                                <div key={i} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                                    <div className="bg-gradient-to-r from-appleBlue to-blue-600 p-6 text-white text-center">
                                        <p className="text-sm opacity-80 mb-1">Mülk {i + 1}</p>
                                        <p className="text-2xl font-bold">{fmt(val)}</p>
                                    </div>
                                    <div className="p-6 space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Konum</span>
                                            <span className="font-medium text-appleDark text-right text-xs">{r.neighborhood}, {r.district}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Net m²</span>
                                            <span className="font-medium">{r.netSqm} m²</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">m² Fiyat</span>
                                            <span className="font-medium text-appleBlue">{fmt(Math.round(val / r.netSqm))}/m²</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Oda</span>
                                            <span className="font-medium">{r.rooms}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Bina Yaşı</span>
                                            <span className="font-medium">{r.buildingAge} yıl</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Kat</span>
                                            <span className="font-medium">{r.floor}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Aylık Kira (Tah.)</span>
                                            <span className="font-medium text-green-600">{fmt(Math.round(val / 200))}</span>
                                        </div>
                                        <div className="pt-3 border-t border-gray-100">
                                            <Link href={`/result/${r.id}`} className="text-appleBlue text-sm font-medium flex items-center gap-1 hover:underline">
                                                Detaylı Rapor <ArrowRight size={14} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {results.length === 0 && !error && (
                    <div className="text-center py-16">
                        <Scale size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-400">Karşılaştırmak için değerleme ID&apos;lerini yukarıya girin</p>
                        <p className="text-sm text-gray-300 mt-2">Değerleme yaptıktan sonra sonuç sayfanızın URL&apos;sindeki ID&apos;yi kopyalayabilirsiniz</p>
                    </div>
                )}
            </div>
        </div>
    );
}
