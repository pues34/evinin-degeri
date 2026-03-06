"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.heat';

export default function HeatmapDisplay() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        // Fix Leaflet Default Icons
        if (typeof window !== "undefined") {
            delete (L.Icon.Default.prototype as any)._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: '/marker-icon-2x.png',
                iconUrl: '/marker-icon.png',
                shadowUrl: '/marker-shadow.png',
            });
        }

        fetch("/api/heatmap")
            .then(res => res.json())
            .then(resData => {
                if (isMounted && resData.success) {
                    setData(resData.data);
                }
            })
            .catch(console.error)
            .finally(() => { if (isMounted) setLoading(false); });

        return () => { isMounted = false; };
    }, []);

    if (loading) return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 min-h-[500px] rounded-3xl border border-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-appleBlue mb-4"></div>
            <p className="text-gray-500 font-medium tracking-wide">İstanbul Yatırım Verileri Yükleniyor...</p>
        </div>
    );

    return (
        <div className="w-full h-[600px] rounded-3xl overflow-hidden shadow-sm border border-gray-100 relative group">
            {/* Legend / Info Box */}
            <div className="absolute top-4 right-4 z-[400] bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-apple border border-white">
                <h4 className="font-bold text-appleDark text-sm mb-2">Fiyat Skalası (M² Başı)</h4>
                <div className="flex items-center gap-2 mb-1">
                    <span className="w-3 h-3 rounded-full bg-red-500 shadow-sm opacity-80"></span>
                    <span className="text-xs text-gray-600 font-medium">Over ₺70,000 (Pahalı)</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="w-3 h-3 rounded-full bg-orange-500 shadow-sm opacity-80"></span>
                    <span className="text-xs text-gray-600 font-medium">₺40k - ₺70k (Ortalama)</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500 shadow-sm opacity-80"></span>
                    <span className="text-xs text-gray-600 font-medium">Under ₺40,000 (Ucuz)</span>
                </div>
            </div>

            <MapContainer
                center={[41.0082, 28.9784]}
                zoom={11}
                className="w-full h-full"
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />

                {data.map((item, idx) => (
                    <CircleMarker
                        key={idx}
                        center={item.coords}
                        radius={Math.max(15, Math.min(40, item.count * 2))} // Scale circle by frequency of sales/valuations
                        pathOptions={{
                            color: item.color,
                            fillColor: item.color,
                            fillOpacity: 0.6,
                            weight: 0
                        }}
                    >
                        <Popup className="rounded-xl overflow-hidden">
                            <div className="text-center min-w-[120px]">
                                <h3 className="font-bold text-appleDark mb-1">{item.district}</h3>
                                <p className="text-sm font-medium text-appleBlue">
                                    {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(item.avgSqmPrice)} / M²
                                </p>
                                <p className="text-xs text-gray-400 mt-1 mb-2">
                                    {item.count} Analiz Yapıldı
                                </p>
                                {item.recent && item.recent.length > 0 && (
                                    <div className="border-t border-gray-100 pt-2 text-left">
                                        <p className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Son Değerlemeler</p>
                                        <ul className="space-y-1">
                                            {item.recent.map((r: any, i: number) => (
                                                <li key={i} className="text-[11px] text-gray-600 bg-gray-50 rounded p-1">
                                                    <span className="font-medium text-appleDark">{r.rooms}</span>, {r.floor}, {r.facade}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </Popup>
                    </CircleMarker>
                ))}
            </MapContainer>
        </div>
    );
}
