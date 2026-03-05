"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

// Custom marker icons for different POI types
const createIcon = (color: string) => L.divIcon({
    className: 'custom-marker',
    html: `<div style="background:${color};width:12px;height:12px;border-radius:50%;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
});

const mainIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const icons: Record<string, L.DivIcon> = {
    hospital: createIcon("#ef4444"),    // red
    metro: createIcon("#3b82f6"),       // blue
    school: createIcon("#f59e0b"),      // amber
    park: createIcon("#22c55e"),        // green
    shopping: createIcon("#a855f7"),    // purple
};

export interface POIItem {
    lat: number;
    lng: number;
    name: string;
    type: string;
    distance: number; // km
}

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

interface MapProps {
    lat: number;
    lng: number;
    onPOIsLoaded?: (pois: POIItem[]) => void;
}

export default function MapComponent({ lat, lng, onPOIsLoaded }: MapProps) {
    const [mounted, setMounted] = useState(false);
    const [pois, setPois] = useState<POIItem[]>([]);

    useEffect(() => {
        setMounted(true);

        const fetchAllPOIs = async () => {
            const allPois: POIItem[] = [];
            const radius = 5000; // 5km

            try {
                // 1. Hospitals & clinics (top 3)
                const hospQuery = `[out:json];(node["amenity"~"hospital|clinic"](around:${radius},${lat},${lng});way["amenity"~"hospital|clinic"](around:${radius},${lat},${lng}););out center 5;`;
                const hospRes = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(hospQuery)}`);
                const hospData = await hospRes.json();
                (hospData.elements || []).forEach((e: any) => {
                    const eLat = e.lat || e.center?.lat;
                    const eLon = e.lon || e.center?.lon;
                    if (eLat && eLon) {
                        allPois.push({ lat: eLat, lng: eLon, name: e.tags?.name || "Hastane", type: "hospital", distance: haversine(lat, lng, eLat, eLon) });
                    }
                });

                // 2. Metro / Metrobus / Tram (top 3)
                const metroQuery = `[out:json];(node["railway"="station"](around:${radius},${lat},${lng});node["station"="subway"](around:${radius},${lat},${lng});node["railway"="tram_stop"](around:${radius},${lat},${lng});node["public_transport"="station"](around:${radius},${lat},${lng}););out center 5;`;
                const metroRes = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(metroQuery)}`);
                const metroData = await metroRes.json();
                (metroData.elements || []).forEach((e: any) => {
                    const eLat = e.lat || e.center?.lat;
                    const eLon = e.lon || e.center?.lon;
                    if (eLat && eLon) {
                        allPois.push({ lat: eLat, lng: eLon, name: e.tags?.name || "Metro/Istasyon", type: "metro", distance: haversine(lat, lng, eLat, eLon) });
                    }
                });

                // 3. Schools (top 3)
                const schoolQuery = `[out:json];(node["amenity"~"school|university|college"](around:${radius},${lat},${lng});way["amenity"~"school|university|college"](around:${radius},${lat},${lng}););out center 5;`;
                const schoolRes = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(schoolQuery)}`);
                const schoolData = await schoolRes.json();
                (schoolData.elements || []).forEach((e: any) => {
                    const eLat = e.lat || e.center?.lat;
                    const eLon = e.lon || e.center?.lon;
                    if (eLat && eLon) {
                        allPois.push({ lat: eLat, lng: eLon, name: e.tags?.name || "Okul", type: "school", distance: haversine(lat, lng, eLat, eLon) });
                    }
                });

                // 4. Parks (top 2)
                const parkQuery = `[out:json];(node["leisure"="park"](around:${radius},${lat},${lng});way["leisure"="park"](around:${radius},${lat},${lng}););out center 3;`;
                const parkRes = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(parkQuery)}`);
                const parkData = await parkRes.json();
                (parkData.elements || []).forEach((e: any) => {
                    const eLat = e.lat || e.center?.lat;
                    const eLon = e.lon || e.center?.lon;
                    if (eLat && eLon) {
                        allPois.push({ lat: eLat, lng: eLon, name: e.tags?.name || "Park", type: "park", distance: haversine(lat, lng, eLat, eLon) });
                    }
                });

                // 5. Shopping malls (top 2)
                const shopQuery = `[out:json];(node["shop"="mall"](around:${radius},${lat},${lng});way["shop"="mall"](around:${radius},${lat},${lng});node["shop"="supermarket"](around:${radius},${lat},${lng}););out center 3;`;
                const shopRes = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(shopQuery)}`);
                const shopData = await shopRes.json();
                (shopData.elements || []).forEach((e: any) => {
                    const eLat = e.lat || e.center?.lat;
                    const eLon = e.lon || e.center?.lon;
                    if (eLat && eLon) {
                        allPois.push({ lat: eLat, lng: eLon, name: e.tags?.name || "AVM/Market", type: "shopping", distance: haversine(lat, lng, eLat, eLon) });
                    }
                });

            } catch (err) {
                console.error("POI Fetch Error:", err);
            }

            // Sort each category by distance and limit
            const grouped: Record<string, POIItem[]> = {};
            allPois.forEach(p => {
                if (!grouped[p.type]) grouped[p.type] = [];
                grouped[p.type].push(p);
            });

            const limits: Record<string, number> = { hospital: 3, metro: 3, school: 3, park: 2, shopping: 2 };
            const finalPois: POIItem[] = [];
            Object.entries(grouped).forEach(([type, items]) => {
                items.sort((a, b) => a.distance - b.distance);
                finalPois.push(...items.slice(0, limits[type] || 3));
            });

            setPois(finalPois);
            if (onPOIsLoaded) onPOIsLoaded(finalPois);
        };

        if (lat && lng) {
            fetchAllPOIs();
        }
    }, [lat, lng]);

    if (!mounted) return <div className="w-full h-full bg-appleGray rounded-2xl animate-pulse" />;

    return (
        <div>
            <MapContainer center={[lat, lng]} zoom={14} className="w-full rounded-2xl z-0" style={{ minHeight: "350px" }}>
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
                />
                <Marker position={[lat, lng]} icon={mainIcon}>
                    <Popup>Secilen Konum</Popup>
                </Marker>

                {pois.map((poi, i) => (
                    <Marker key={`poi-${i}`} position={[poi.lat, poi.lng]} icon={icons[poi.type] || icons.hospital}>
                        <Popup>
                            <div className="text-xs">
                                <strong>{poi.name}</strong>
                                <br />{poi.distance.toFixed(1)} km
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mt-3 px-2">
                {[
                    { color: "#0071E3", label: "Secilen Konum" },
                    { color: "#ef4444", label: "Hastane" },
                    { color: "#3b82f6", label: "Metro/Istasyon" },
                    { color: "#f59e0b", label: "Okul" },
                    { color: "#22c55e", label: "Park" },
                    { color: "#a855f7", label: "AVM/Market" },
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-gray-500">
                        <span style={{ background: item.color, width: 10, height: 10, borderRadius: '50%', display: 'inline-block' }} />
                        {item.label}
                    </div>
                ))}
            </div>
        </div>
    );
}
